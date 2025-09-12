import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { AudioControls } from "@/components/AudioControls";
import { monasteries } from "@/data/monasteries";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { generateShortNarration } from "@/data/monasteryNarrations";
import { MapPin, Mountain, Clock, Search, Filter, Volume2, VolumeX } from "lucide-react";

const MonasteriesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "famous" | "hidden">("all");
  const [filterAccessibility, setFilterAccessibility] = useState<"all" | "easy" | "moderate" | "difficult">("all");
  const [autoNarrationEnabled, setAutoNarrationEnabled] = useState(true);

  const {
    isSupported,
    isPlaying,
    isPaused,
    volume,
    speed,
    selectedVoice,
    voices,
    speak,
    pause,
    resume,
    stop,
    setVolume,
    setSpeed,
    setVoice,
  } = useTextToSpeech();

  // Auto-narrate page introduction
  useEffect(() => {
    if (isSupported && autoNarrationEnabled) {
      const introText = `Welcome to the Monasteries of Sikkim page. Here you can explore all ${monasteries.length} sacred monasteries across the Land of the Thunder Dragon. Use the search and filter options to find monasteries by name, location, or features.`;
      setTimeout(() => speak(introText), 1000);
    }
  }, [isSupported, autoNarrationEnabled, speak]);

  const handleMonasteryNarration = (monastery: typeof monasteries[0]) => {
    if (isSupported) {
      const narrationText = generateShortNarration(monastery);
      speak(narrationText);
    }
  };

  const filteredMonasteries = monasteries.filter(monastery => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monastery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monastery.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || monastery.type === filterType;
    const matchesAccessibility = filterAccessibility === "all" || monastery.accessibility === filterAccessibility;
    
    return matchesSearch && matchesType && matchesAccessibility;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-foreground">
                All Monasteries in Sikkim
              </h1>
              {isSupported && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAutoNarrationEnabled(!autoNarrationEnabled)}
                    className="p-2"
                    title={autoNarrationEnabled ? "Disable auto-narration" : "Enable auto-narration"}
                  >
                    {autoNarrationEnabled ? (
                      <Volume2 className="h-5 w-5 text-blue-600" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                  <AudioControls
                    isPlaying={isPlaying}
                    isPaused={isPaused}
                    volume={volume}
                    speed={speed}
                    selectedVoice={selectedVoice}
                    voices={voices}
                    onPlayPause={() => isPlaying ? (isPaused ? resume() : pause()) : undefined}
                    onStop={stop}
                    onVolumeChange={setVolume}
                    onSpeedChange={setSpeed}
                    onVoiceChange={setVoice}
                  />
                </div>
              )}
            </div>
            <p className="text-xl text-muted-foreground">
              Discover sacred sites across the Land of the Thunder Dragon
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search monasteries by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="famous">Famous</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterAccessibility} onValueChange={(value: any) => setFilterAccessibility(value)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Accessibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy Access</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Showing {filteredMonasteries.length} of {monasteries.length} monasteries
            </div>
          </div>

          {/* Monasteries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredMonasteries.map((monastery) => (
              <Card key={monastery.id} className="overflow-hidden soft-shadow hover:monastery-shadow monastery-transition">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={monastery.image} 
                    alt={monastery.name}
                    className="w-full h-full object-cover hover:scale-105 monastery-transition"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{monastery.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={monastery.type === 'famous' ? 'default' : 'secondary'}>
                        {monastery.type}
                      </Badge>
                      {isSupported && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMonasteryNarration(monastery)}
                          className="p-1 h-auto"
                          title="Listen to description"
                        >
                          <Volume2 className="h-4 w-4 text-blue-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {monastery.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-monastery-red" />
                      <span className="text-sm">{monastery.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-mountain-blue" />
                      <span className="text-sm">{monastery.altitude}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-monastery-gold" />
                      <span className="text-sm">Founded {monastery.founded}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {monastery.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {monastery.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{monastery.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/monastery/${monastery.id}`} className="flex-1">
                      <Button variant="monastery" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                    <Link to="/map">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMonasteries.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No monasteries found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button 
                variant="monastery" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterAccessibility("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Plan your spiritual journey through Sikkim's sacred landscapes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/map">
                <Button variant="prayer" size="lg">
                  View Interactive Map
                </Button>
              </Link>
              <Button variant="mountain" size="lg">
                Download Travel Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonasteriesList;