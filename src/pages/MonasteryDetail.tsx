import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import LazyModel3D from "@/components/LazyModel3D";
import { AudioControls } from "@/components/AudioControls";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { getMonasteryById } from "@/data/monasteries";
// import { MapPin, Mountain, Clock, Volume2 } from "lucide-react";
import { generateFullNarration } from "@/data/monasteryNarrations";
import {
  MapPin,
  Mountain,
  Clock,
  Navigation as NavigationIcon,
  Accessibility,
  Calendar,
  Star,
  ArrowLeft,
  Camera,
  Users,
  TreePine,
  Volume2,
} from "lucide-react";
import WeatherChart from "@/components/WeatherChart";

interface WeatherDataPoint {
  month: string;
  temperature: number;
  rainfall: number;
  visitors: number;
  suitability: number;
}

const MonasteryDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/monasteries" replace />;
  }

  const monastery = getMonasteryById(id);

  if (!monastery) {
    return <Navigate to="/monasteries" replace />;
  }

  // Initialize text-to-speech with auto-play
  const {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    isSupported,
    speed,
    setSpeed,
    volume,
    setVolume,
    voices,
    currentVoice,
    setVoice,
  } = useTextToSpeech({
    speed: 0.9, // Slightly slower for better comprehension
    volume: 0.8,
  });

  // Generate narration text
  const narrationText = generateFullNarration(monastery);

  // Auto-start narration when page loads
  useEffect(() => {
    if (isSupported && narrationText) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        speak(narrationText);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [monastery.id, isSupported, narrationText, speak]);

  const handlePlayNarration = () => {
    if (isPlaying && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(narrationText);
    }
  };

  const accessibilityConfig = {
    easy: { color: "text-green-600", icon: "🟢", label: "Easy Access" },
    moderate: { color: "text-yellow-600", icon: "🟡", label: "Moderate Trek" },
    difficult: {
      color: "text-red-600",
      icon: "🔴",
      label: "Challenging Journey",
    },
  };

  const access = accessibilityConfig[monastery.accessibility];

  // Weather data for all monasteries (based on location-specific research)
  const getWeatherData = (monasteryId: string) => {
    const weatherDataMap: Record<string, WeatherDataPoint[]> = {
      rumtek: [
        {
          month: "Jan",
          temperature: 10,
          rainfall: 18,
          visitors: 30,
          suitability: 40,
        },
        {
          month: "Feb",
          temperature: 13,
          rainfall: 25,
          visitors: 40,
          suitability: 60,
        },
        {
          month: "Mar",
          temperature: 17,
          rainfall: 30,
          visitors: 70,
          suitability: 85,
        },
        {
          month: "Apr",
          temperature: 20,
          rainfall: 60,
          visitors: 85,
          suitability: 90,
        },
        {
          month: "May",
          temperature: 22,
          rainfall: 120,
          visitors: 90,
          suitability: 85,
        },
        {
          month: "Jun",
          temperature: 23,
          rainfall: 240,
          visitors: 75,
          suitability: 70,
        },
        {
          month: "Jul",
          temperature: 24,
          rainfall: 370,
          visitors: 40,
          suitability: 25,
        },
        {
          month: "Aug",
          temperature: 24,
          rainfall: 340,
          visitors: 35,
          suitability: 30,
        },
        {
          month: "Sep",
          temperature: 22,
          rainfall: 150,
          visitors: 65,
          suitability: 80,
        },
        {
          month: "Oct",
          temperature: 19,
          rainfall: 40,
          visitors: 85,
          suitability: 95,
        },
        {
          month: "Nov",
          temperature: 15,
          rainfall: 10,
          visitors: 80,
          suitability: 90,
        },
        {
          month: "Dec",
          temperature: 12,
          rainfall: 18,
          visitors: 50,
          suitability: 70,
        },
      ],
      pemayangtse: [
        {
          month: "Jan",
          temperature: 7,
          rainfall: 116,
          visitors: 25,
          suitability: 35,
        },
        {
          month: "Feb",
          temperature: 9,
          rainfall: 178,
          visitors: 35,
          suitability: 50,
        },
        {
          month: "Mar",
          temperature: 11,
          rainfall: 284,
          visitors: 65,
          suitability: 75,
        },
        {
          month: "Apr",
          temperature: 14,
          rainfall: 356,
          visitors: 80,
          suitability: 85,
        },
        {
          month: "May",
          temperature: 16,
          rainfall: 538,
          visitors: 85,
          suitability: 80,
        },
        {
          month: "Jun",
          temperature: 18,
          rainfall: 712,
          visitors: 70,
          suitability: 60,
        },
        {
          month: "Jul",
          temperature: 18,
          rainfall: 924,
          visitors: 30,
          suitability: 20,
        },
        {
          month: "Aug",
          temperature: 18,
          rainfall: 890,
          visitors: 25,
          suitability: 25,
        },
        {
          month: "Sep",
          temperature: 16,
          rainfall: 650,
          visitors: 50,
          suitability: 60,
        },
        {
          month: "Oct",
          temperature: 14,
          rainfall: 320,
          visitors: 90,
          suitability: 95,
        },
        {
          month: "Nov",
          temperature: 11,
          rainfall: 150,
          visitors: 85,
          suitability: 90,
        },
        {
          month: "Dec",
          temperature: 8,
          rainfall: 88,
          visitors: 40,
          suitability: 60,
        },
      ],
      tashiding: [
        {
          month: "Jan",
          temperature: 8,
          rainfall: 45,
          visitors: 20,
          suitability: 30,
        },
        {
          month: "Feb",
          temperature: 10,
          rainfall: 65,
          visitors: 30,
          suitability: 45,
        },
        {
          month: "Mar",
          temperature: 13,
          rainfall: 95,
          visitors: 70,
          suitability: 85,
        },
        {
          month: "Apr",
          temperature: 16,
          rainfall: 180,
          visitors: 85,
          suitability: 90,
        },
        {
          month: "May",
          temperature: 19,
          rainfall: 290,
          visitors: 90,
          suitability: 85,
        },
        {
          month: "Jun",
          temperature: 21,
          rainfall: 420,
          visitors: 65,
          suitability: 60,
        },
        {
          month: "Jul",
          temperature: 22,
          rainfall: 580,
          visitors: 35,
          suitability: 20,
        },
        {
          month: "Aug",
          temperature: 22,
          rainfall: 520,
          visitors: 30,
          suitability: 25,
        },
        {
          month: "Sep",
          temperature: 20,
          rainfall: 380,
          visitors: 55,
          suitability: 70,
        },
        {
          month: "Oct",
          temperature: 17,
          rainfall: 120,
          visitors: 80,
          suitability: 95,
        },
        {
          month: "Nov",
          temperature: 13,
          rainfall: 55,
          visitors: 75,
          suitability: 90,
        },
        {
          month: "Dec",
          temperature: 10,
          rainfall: 35,
          visitors: 35,
          suitability: 55,
        },
      ],
      enchey: [
        {
          month: "Jan",
          temperature: 9,
          rainfall: 20,
          visitors: 40,
          suitability: 50,
        },
        {
          month: "Feb",
          temperature: 12,
          rainfall: 30,
          visitors: 50,
          suitability: 70,
        },
        {
          month: "Mar",
          temperature: 16,
          rainfall: 35,
          visitors: 75,
          suitability: 85,
        },
        {
          month: "Apr",
          temperature: 19,
          rainfall: 70,
          visitors: 85,
          suitability: 90,
        },
        {
          month: "May",
          temperature: 21,
          rainfall: 130,
          visitors: 90,
          suitability: 85,
        },
        {
          month: "Jun",
          temperature: 22,
          rainfall: 250,
          visitors: 75,
          suitability: 70,
        },
        {
          month: "Jul",
          temperature: 23,
          rainfall: 380,
          visitors: 45,
          suitability: 30,
        },
        {
          month: "Aug",
          temperature: 23,
          rainfall: 350,
          visitors: 40,
          suitability: 35,
        },
        {
          month: "Sep",
          temperature: 21,
          rainfall: 160,
          visitors: 70,
          suitability: 80,
        },
        {
          month: "Oct",
          temperature: 18,
          rainfall: 50,
          visitors: 85,
          suitability: 95,
        },
        {
          month: "Nov",
          temperature: 14,
          rainfall: 15,
          visitors: 80,
          suitability: 90,
        },
        {
          month: "Dec",
          temperature: 11,
          rainfall: 20,
          visitors: 55,
          suitability: 75,
        },
      ],
      phodong: [
        {
          month: "Jan",
          temperature: 6,
          rainfall: 35,
          visitors: 15,
          suitability: 25,
        },
        {
          month: "Feb",
          temperature: 8,
          rainfall: 50,
          visitors: 25,
          suitability: 40,
        },
        {
          month: "Mar",
          temperature: 11,
          rainfall: 80,
          visitors: 60,
          suitability: 75,
        },
        {
          month: "Apr",
          temperature: 14,
          rainfall: 150,
          visitors: 75,
          suitability: 80,
        },
        {
          month: "May",
          temperature: 17,
          rainfall: 250,
          visitors: 80,
          suitability: 75,
        },
        {
          month: "Jun",
          temperature: 19,
          rainfall: 380,
          visitors: 60,
          suitability: 55,
        },
        {
          month: "Jul",
          temperature: 20,
          rainfall: 520,
          visitors: 25,
          suitability: 15,
        },
        {
          month: "Aug",
          temperature: 20,
          rainfall: 480,
          visitors: 20,
          suitability: 20,
        },
        {
          month: "Sep",
          temperature: 18,
          rainfall: 320,
          visitors: 45,
          suitability: 60,
        },
        {
          month: "Oct",
          temperature: 15,
          rainfall: 100,
          visitors: 75,
          suitability: 90,
        },
        {
          month: "Nov",
          temperature: 11,
          rainfall: 45,
          visitors: 70,
          suitability: 85,
        },
        {
          month: "Dec",
          temperature: 8,
          rainfall: 30,
          visitors: 30,
          suitability: 50,
        },
      ],
      labrang: [
        {
          month: "Jan",
          temperature: 5,
          rainfall: 60,
          visitors: 20,
          suitability: 30,
        },
        {
          month: "Feb",
          temperature: 7,
          rainfall: 85,
          visitors: 30,
          suitability: 45,
        },
        {
          month: "Mar",
          temperature: 10,
          rainfall: 140,
          visitors: 65,
          suitability: 80,
        },
        {
          month: "Apr",
          temperature: 13,
          rainfall: 220,
          visitors: 80,
          suitability: 85,
        },
        {
          month: "May",
          temperature: 16,
          rainfall: 320,
          visitors: 85,
          suitability: 80,
        },
        {
          month: "Jun",
          temperature: 18,
          rainfall: 450,
          visitors: 65,
          suitability: 55,
        },
        {
          month: "Jul",
          temperature: 19,
          rainfall: 650,
          visitors: 30,
          suitability: 20,
        },
        {
          month: "Aug",
          temperature: 19,
          rainfall: 620,
          visitors: 25,
          suitability: 25,
        },
        {
          month: "Sep",
          temperature: 17,
          rainfall: 420,
          visitors: 50,
          suitability: 65,
        },
        {
          month: "Oct",
          temperature: 14,
          rainfall: 180,
          visitors: 85,
          suitability: 90,
        },
        {
          month: "Nov",
          temperature: 10,
          rainfall: 90,
          visitors: 80,
          suitability: 85,
        },
        {
          month: "Dec",
          temperature: 7,
          rainfall: 65,
          visitors: 35,
          suitability: 55,
        },
      ],
    };

    return weatherDataMap[monasteryId] || weatherDataMap.rumtek;
  };

  const weatherData = getWeatherData(monastery.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={monastery.image}
            alt={monastery.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />

          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/monasteries">
                <Button variant="hero" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Monasteries
                </Button>
              </Link>
              <Badge
                variant={monastery.type === "famous" ? "default" : "secondary"}
                className="bg-background/20 text-monastery-white border-monastery-white/20"
              >
                {monastery.type} monastery
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-monastery-white mb-4">
              {monastery.name}
            </h1>
            <p className="text-xl text-monastery-white/90 max-w-2xl mb-6">
              {monastery.description}
            </p>

            {/* Audio Controls in Hero Section */}
            {isSupported && (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="h-5 w-5 text-monastery-white" />
                  <span className="text-monastery-white font-medium">
                    Audio Guide
                  </span>
                </div>
                <AudioControls
                  isPlaying={isPlaying}
                  isPaused={isPaused}
                  isSupported={isSupported}
                  speed={speed}
                  volume={volume}
                  voices={voices}
                  currentVoice={currentVoice}
                  onPlay={handlePlayNarration}
                  onPause={pause}
                  onResume={resume}
                  onStop={stop}
                  onSpeedChange={setSpeed}
                  onVolumeChange={setVolume}
                  onVoiceChange={setVoice}
                  className="bg-white/90 backdrop-blur-sm"
                  showAdvancedControls={true}
                />
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Audio Guide Card - Mobile Alternative */}
              {isSupported && (
                <Card className="soft-shadow lg:hidden">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-monastery-red" />
                      Audio Guide
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Listen to a detailed narration about {monastery.name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <AudioControls
                      isPlaying={isPlaying}
                      isPaused={isPaused}
                      isSupported={isSupported}
                      speed={speed}
                      volume={volume}
                      voices={voices}
                      currentVoice={currentVoice}
                      onPlay={handlePlayNarration}
                      onPause={pause}
                      onResume={resume}
                      onStop={stop}
                      onSpeedChange={setSpeed}
                      onVolumeChange={setVolume}
                      onVoiceChange={setVoice}
                      showAdvancedControls={true}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Overview */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TreePine className="h-6 w-6 text-monastery-red" />
                    About This Sacred Place
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {monastery.description}
                  </p>
                  <p className="text-muted-foreground">
                    Founded in {monastery.founded}, this {monastery.type}{" "}
                    monastery represents centuries of Buddhist tradition in the
                    heart of the Himalayas. Located at an altitude of{" "}
                    {monastery.altitude}, it offers visitors a unique spiritual
                    experience combined with breathtaking mountain views.
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Star className="h-6 w-6 text-monastery-gold" />
                    Sacred Features & Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {monastery.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="w-8 h-8 monastery-gradient rounded-full flex items-center justify-center">
                          <span className="text-monastery-white text-sm font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Virtual Tour Preview */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Camera className="h-6 w-6 text-mountain-blue" />
                    Immersive 3D Virtual Tour
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Experience the monastery's sacred architecture in stunning
                    3D detail
                  </p>
                </CardHeader>
                <CardContent>
                  {monastery.id === "rumtek" ||
                  monastery.id === "pemayangtse" ? (
                    <>
                      <LazyModel3D
                        modelPath="/model.glb"
                        className="rounded-lg overflow-hidden"
                      />

                      <div className="mt-6 p-4 bg-gradient-to-r from-monastery-red/10 to-mountain-blue/10 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          🏛️ Virtual Tour Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-monastery-red rounded-full"></span>
                            <span>360° Interactive Exploration</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-mountain-blue rounded-full"></span>
                            <span>Detailed Architectural Views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-prayer-green rounded-full"></span>
                            <span>Sacred Space Visualization</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-monastery-gold rounded-full"></span>
                            <span>Immersive Lighting Effects</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-muted/50 rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          3D Virtual Tour Coming Soon
                        </h3>
                        <p className="text-muted-foreground">
                          We're working on creating an immersive 3D experience
                          for this monastery
                        </p>
                        <div className="mt-4 text-sm text-monastery-red font-medium">
                          Available now for Rumtek & Pemayangtse Monasteries
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Audio Guide Card */}
              {isSupported && (
                <Card className="soft-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-monastery-red" />
                      Audio Guide
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Listen to a detailed narration about {monastery.name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <AudioControls
                      isPlaying={isPlaying}
                      isPaused={isPaused}
                      isSupported={isSupported}
                      speed={speed}
                      volume={volume}
                      voices={voices}
                      currentVoice={currentVoice}
                      onPlay={handlePlayNarration}
                      onPause={pause}
                      onResume={resume}
                      onStop={stop}
                      onSpeedChange={setSpeed}
                      onVolumeChange={setVolume}
                      onVoiceChange={setVoice}
                      showAdvancedControls={true}
                    />

                    {/* Quick narration info */}
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>🔊 Auto-narration starts when page loads</div>
                        <div>
                          ⏱️ Estimated duration:{" "}
                          {Math.ceil(narrationText.length / 200)} minutes
                        </div>
                        <div>🎧 Best experienced with headphones</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Info */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Essential Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-monastery-red" />
                      <div>
                        <div className="font-medium">{monastery.location}</div>
                        <div className="text-sm text-muted-foreground">
                          {monastery.nearestTown}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mountain className="h-5 w-5 text-mountain-blue" />
                      <div>
                        <div className="font-medium">{monastery.altitude}</div>
                        <div className="text-sm text-muted-foreground">
                          Above sea level
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-monastery-gold" />
                      <div>
                        <div className="font-medium">
                          Founded {monastery.founded}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Years of heritage
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Accessibility className={`h-5 w-5 ${access.color}`} />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <span>{access.icon}</span>
                          {access.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Difficulty level
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-prayer-green" />
                      <div>
                        <div className="font-medium">Best Time</div>
                        <div className="text-sm text-muted-foreground">
                          {monastery.bestTimeToVisit}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Information and Best Time to Visit */}
              <WeatherChart
                weatherData={weatherData}
                monasteryName={monastery.name}
              />

              {/* Actions */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Plan Your Visit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to={`/map?monastery=${monastery.id}`}>
                    <Button variant="monastery" className="w-full">
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </Link>

                  <Button variant="prayer" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Join Guided Tour
                  </Button>

                  <Button variant="mountain" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Visit
                  </Button>

                  <Separator />

                  <Button variant="outline" className="w-full">
                    Download Brochure
                  </Button>

                  <Button variant="outline" className="w-full">
                    Share This Place
                  </Button>
                </CardContent>
              </Card>

              {/* Travel Tips */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Travel Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <strong className="text-green-800 dark:text-green-200">
                      Best Weather:
                    </strong>
                    <p className="text-green-700 dark:text-green-300 mt-1">
                      {monastery.bestTimeToVisit} offers the clearest mountain
                      views
                      {monastery.id === "rumtek" &&
                        " with temperatures ranging 17-22°C"}
                      {monastery.id === "pemayangtse" &&
                        " with cooler temperatures (11-16°C)"}
                      {monastery.id === "enchey" &&
                        " with pleasant temperatures (16-21°C)"}
                      {monastery.id === "tashiding" &&
                        " with mild temperatures (13-19°C)"}
                      {monastery.id === "phodong" &&
                        " with cooler mountain air (11-17°C)"}
                      {monastery.id === "labrang" &&
                        " with crisp mountain weather (10-16°C)"}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <strong className="text-blue-800 dark:text-blue-200">
                      Getting There:
                    </strong>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                      Nearest town: {monastery.nearestTown}
                      {monastery.id === "rumtek" &&
                        ". Shared taxis available from Deorali Taxi Stand."}
                      {monastery.id === "pemayangtse" &&
                        ". Regular buses from Pelling town center."}
                      {monastery.id === "enchey" &&
                        ". Walking distance from Gangtok center."}
                      {monastery.id === "tashiding" &&
                        ". Requires trek from road head."}
                      {monastery.id === "phodong" &&
                        ". Local transport from Mangan."}
                      {monastery.id === "labrang" &&
                        ". Short walk from Yuksom village."}
                    </p>
                  </div>

                  {(monastery.id === "rumtek" ||
                    monastery.id === "pemayangtse" ||
                    monastery.id === "tashiding") && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <strong className="text-orange-800 dark:text-orange-200">
                        Monsoon Advisory:
                      </strong>
                      <p className="text-orange-700 dark:text-orange-300 mt-1">
                        {monastery.id === "rumtek" &&
                          "Avoid July-August (370mm+ rainfall). Roads can be slippery and views obscured."}
                        {monastery.id === "pemayangtse" &&
                          "Avoid July-August (900mm+ rainfall). Heavy rains in West Sikkim."}
                        {monastery.id === "tashiding" &&
                          "Avoid July-August (580mm rainfall). Difficult trek conditions."}
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <strong className="text-yellow-800 dark:text-yellow-200">
                      What to Bring:
                    </strong>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                      Warm clothes, comfortable shoes, camera, and respect for
                      sacred spaces
                      {monastery.id === "rumtek" &&
                        ". Entry fee: ₹10 for locals"}
                      {monastery.id === "pemayangtse" &&
                        ". Extra warm clothing for higher altitude"}
                      {monastery.id === "enchey" &&
                        ". Light jacket sufficient in summer"}
                      {monastery.id === "tashiding" &&
                        ". Sturdy trekking shoes essential"}
                      {monastery.id === "phodong" &&
                        ". Heavy woolens in winter months"}
                      {monastery.id === "labrang" &&
                        ". Layers recommended for varying temperatures"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Monasteries */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Other Sacred Places to Explore
            </h2>
            <div className="text-center">
              <Link to="/monasteries">
                <Button variant="prayer" size="lg">
                  Discover More Monasteries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonasteryDetail;
