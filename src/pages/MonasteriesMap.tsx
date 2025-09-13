import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { monasteries } from "@/data/monasteries";
import { generateMapMarkerNarration } from "@/data/monasteryNarrations";
import { MapPin, Mountain, Clock, Navigation as NavigationIcon, Volume2, VolumeX } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// Custom monastery icon (normal)
const monasteryIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path fill="#B91C1C" stroke="#FFFFFF" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
      <circle fill="#FCD34D" cx="12.5" cy="12.5" r="7"/>
      <path fill="#B91C1C" d="M12.5 7l1.5 3 3 0.5-2 2 0.5 3-3-1.5-3 1.5 0.5-3-2-2 3-0.5z"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

// Custom highlighted monastery icon (selected)
const highlightedMonasteryIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="35" height="55" viewBox="0 0 35 55" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path fill="#059669" stroke="#FFFFFF" stroke-width="3" filter="url(#glow)" d="M17.5 0C7.84 0 0 7.84 0 17.5c0 17.5 17.5 37.5 17.5 37.5s17.5-20 17.5-37.5C35 7.84 27.16 0 17.5 0z"/>
      <circle fill="#FDE047" cx="17.5" cy="17.5" r="10"/>
      <path fill="#059669" d="M17.5 9l2.5 5 5 0.5-3.5 3.5 0.5 5-4.5-2.5-4.5 2.5 0.5-5-3.5-3.5 5-0.5z"/>
    </svg>
  `),
  iconSize: [35, 55],
  iconAnchor: [17.5, 55],
  popupAnchor: [0, -55],
});

// Routing Component
const RoutingMachine = ({ from, to }: { from: L.LatLng; to: L.LatLng }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [from, to],
      lineOptions: {
        styles: [{ color: "#dc2626", weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      show: false,
      addWaypoints: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, from, to]);

  return null;
};

const MonasteriesMap = () => {
  const [searchParams] = useSearchParams();
  const monasteryId = searchParams.get('monastery');
  
  // Find the monastery from URL parameter, fallback to first monastery
  const initialMonastery = monasteryId 
    ? monasteries.find(m => m.id === monasteryId) || monasteries[0]
    : monasteries[0];
    
  const [selectedMonastery, setSelectedMonastery] = useState(initialMonastery);
  const [mapCenter] = useState<[number, number]>([27.5, 88.45]); // Better center of Sikkim to show all monasteries
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [autoNarrationEnabled, setAutoNarrationEnabled] = useState(true);

  // Text-to-speech hook for map markers
  const {
    speak,
    stop,
    isPlaying,
    isSupported,
    speed,
    setSpeed,
    volume,
    setVolume
  } = useTextToSpeech({
    speed: 1.0,
    volume: 0.7
  });

  // Handle monastery selection and narration
  const handleMonasterySelect = (monastery: typeof monasteries[0]) => {
    console.log('Selecting monastery:', monastery.name, 'Previous:', selectedMonastery.name);
    setSelectedMonastery(monastery);
    
    // Auto-narrate when a monastery is selected
    if (autoNarrationEnabled && isSupported) {
      stop(); // Stop any current narration
      const narrationText = generateMapMarkerNarration(monastery);
      setTimeout(() => speak(narrationText), 300); // Small delay for better UX
    }
  };

  // Update selected monastery when URL parameter changes
  useEffect(() => {
    if (monasteryId) {
      const monastery = monasteries.find(m => m.id === monasteryId);
      if (monastery && monastery.id !== selectedMonastery.id) {
        console.log('URL parameter changed, selecting monastery:', monastery.name);
        setSelectedMonastery(monastery);
      }
    }
  }, [monasteryId, selectedMonastery.id]);

  // Narrate selected monastery on load
  useEffect(() => {
    console.log('Available monasteries:', monasteries.length, monasteries.map(m => m.name));
    console.log('Selected monastery:', selectedMonastery?.name);
    
    if (autoNarrationEnabled && isSupported && selectedMonastery) {
      const narrationText = generateMapMarkerNarration(selectedMonastery);
      setTimeout(() => speak(narrationText), 1000);
    }
  }, [autoNarrationEnabled, isSupported, speak, selectedMonastery]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setUserLocation(L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon)));
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Sikkim Monasteries
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Navigate through sacred sites on our interactive map
              {monasteryId && (
                <span className="block text-base text-blue-600 font-medium mt-1">
                  Showing: {selectedMonastery.name}
                </span>
              )}
            </p>

            {/* Audio Narration Toggle */}
            {isSupported && (
              <div className="mt-4 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoNarrationEnabled(!autoNarrationEnabled)}
                  className={`flex items-center gap-2 ${autoNarrationEnabled ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  {autoNarrationEnabled ? (
                    <Volume2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">
                    Audio Guide {autoNarrationEnabled ? 'ON' : 'OFF'}
                  </span>
                </Button>
                
                {isPlaying && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stop}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Stop Narration</span>
                  </Button>
                )}
              </div>
            )}

            {/* Search bar */}
            <div className="mt-4 max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Enter location name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={isSearching ? "pr-10" : ""}
                    disabled={isSearching}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && !isSearching) {
                        handleSearch();
                      }
                    }}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">
                      <svg
                        className="w-5 h-5 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                          5.291A7.962 7.962 0 014 12H0c0 
                          3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isSearching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 
                        4 4 0 000-8zM2 8a6 6 0 
                        1110.89 3.476l4.817 4.817a1 1 0 
                        01-1.414 1.414l-4.816-4.816A6 
                        6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {isSearching
                  ? "Finding location and generating route..."
                  : "Press Enter or click Search"}
              </p>
            </div>
          </div>

          {/* Responsive Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="shadow-lg rounded-lg overflow-hidden bg-white">
                <div className="h-[60vh] sm:h-[70vh] lg:h-[600px] xl:h-[700px] w-full">
                  <MapContainer
                    center={mapCenter}
                    zoom={8}
                    zoomControl={true}
                    scrollWheelZoom={true}
                    touchZoom={true}
                    doubleClickZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                    bounds={[
                      [27.0, 88.0], // Southwest corner of Sikkim
                      [28.2, 88.9]  // Northeast corner of Sikkim
                    ]}
                    boundsOptions={{ padding: [20, 20] }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {userLocation && selectedMonastery && (
                      <RoutingMachine
                        from={userLocation}
                        to={L.latLng(
                          selectedMonastery.coordinates[0],
                          selectedMonastery.coordinates[1]
                        )}
                      />
                    )}

                    {userLocation && (
                      <Marker position={userLocation}>
                        <Popup>Your Location</Popup>
                      </Marker>
                    )}

                    {monasteries.map((monastery, index) => (
                      <Marker
                        key={monastery.id}
                        position={monastery.coordinates}
                        icon={selectedMonastery.id === monastery.id ? highlightedMonasteryIcon : monasteryIcon}
                        eventHandlers={{
                          click: () => {
                            console.log('Marker clicked:', monastery.name);
                            handleMonasterySelect(monastery);
                          },
                        }}
                      >
                        <Popup maxWidth={300} minWidth={250}>
                          <div className="p-2">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg">
                                {monastery.name}
                              </h3>
                              {isSupported && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const narrationText = generateMapMarkerNarration(monastery);
                                    speak(narrationText);
                                  }}
                                  className="p-1 h-auto"
                                  title="Listen to description"
                                >
                                  <Volume2 className="h-4 w-4 text-blue-600" />
                                </Button>
                              )}
                            </div>
                            <img
                              src={monastery.image}
                              alt={monastery.name}
                              className="w-full h-32 object-cover rounded mb-2"
                            />
                            <p className="text-sm text-gray-600 mb-3">
                              {monastery.description.substring(0, 100)}...
                            </p>
                            <div className="flex gap-2">
                              <Link to={`/monastery/${monastery.id}`} className="flex-1">
                                <button className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm">
                                  View Details
                                </button>
                              </Link>
                              {isSupported && autoNarrationEnabled && (
                                <div className="flex items-center px-2 bg-blue-50 rounded">
                                  <Volume2 className="h-3 w-3 text-blue-600" />
                                </div>
                              )}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="order-1 lg:order-2 space-y-4 lg:space-y-6">
              <Card className="shadow-lg" key={selectedMonastery.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl lg:text-2xl leading-tight">
                      {selectedMonastery.name}
                    </CardTitle>
                    <Badge
                      variant={
                        selectedMonastery.type === "famous"
                          ? "default"
                          : "secondary"
                      }
                      className="shrink-0"
                    >
                      {selectedMonastery.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img
                    src={selectedMonastery.image}
                    alt={selectedMonastery.name}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg"
                  />
                  <p className="text-muted-foreground text-sm lg:text-base">
                    {selectedMonastery.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                      <span className="text-sm">
                        {selectedMonastery.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-sm">
                        {selectedMonastery.altitude}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600 shrink-0" />
                      <span className="text-sm">
                        Founded {selectedMonastery.founded}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <NavigationIcon className="h-4 w-4 text-green-600 shrink-0" />
                      <span className="text-sm">
                        {selectedMonastery.nearestTown}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedMonastery.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Link to={`/monastery/${selectedMonastery.id}`} className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      View Full Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Legend */}
              <Card className="shadow-lg hidden sm:block">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Map Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm">Monastery Location</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="default">Famous</Badge>
                      <span className="text-sm">Well-known monasteries</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">Hidden</Badge>
                      <span className="text-sm">Lesser-known gems</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonasteriesMap;
