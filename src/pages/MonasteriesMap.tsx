import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { monasteries } from "@/data/monasteries";
import { MapPin, Mountain, Clock, Navigation as NavigationIcon } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Custom monastery icon
const monasteryIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
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

const MonasteriesMap = () => {
  const [selectedMonastery, setSelectedMonastery] = useState(monasteries[0]);
  const [mapCenter] = useState<[number, number]>([27.3333, 88.4333]); // Center of Sikkim

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
            </p>
          </div>

          {/* Mobile-first responsive layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Map Container - Mobile: full width, Desktop: 2/3 width */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="shadow-lg rounded-lg overflow-hidden bg-white">
                <div className="h-[60vh] sm:h-[70vh] lg:h-[600px] xl:h-[700px] w-full">
                  <MapContainer
                    center={mapCenter}
                    zoom={9}
                    zoomControl={true}
                    scrollWheelZoom={true}
                    touchZoom={true}
                    doubleClickZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {monasteries.map((monastery) => (
                      <Marker
                        key={monastery.id}
                        position={monastery.coordinates}
                        icon={monasteryIcon}
                        eventHandlers={{
                          click: () => setSelectedMonastery(monastery),
                        }}
                      >
                        <Popup maxWidth={300} minWidth={250}>
                          <div className="p-2">
                            <h3 className="font-semibold text-lg mb-2">{monastery.name}</h3>
                            <img 
                              src={monastery.image} 
                              alt={monastery.name}
                              className="w-full h-32 object-cover rounded mb-2"
                            />
                            <p className="text-sm text-gray-600 mb-3">
                              {monastery.description.substring(0, 100)}...
                            </p>
                            <Link to={`/monastery/${monastery.id}`}>
                              <button className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm">
                                View Details
                              </button>
                            </Link>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Monastery Details Panel - Mobile: above map, Desktop: right side */}
            <div className="order-1 lg:order-2 space-y-4 lg:space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl lg:text-2xl leading-tight">{selectedMonastery.name}</CardTitle>
                    <Badge variant={selectedMonastery.type === 'famous' ? 'default' : 'secondary'} className="shrink-0">
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
                      <span className="text-sm">{selectedMonastery.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-sm">{selectedMonastery.altitude}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600 shrink-0" />
                      <span className="text-sm">Founded {selectedMonastery.founded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <NavigationIcon className="h-4 w-4 text-green-600 shrink-0" />
                      <span className="text-sm">{selectedMonastery.nearestTown}</span>
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

              {/* Legend - Hidden on very small screens, shown on sm+ */}
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