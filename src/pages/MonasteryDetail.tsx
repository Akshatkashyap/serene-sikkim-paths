import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { getMonasteryById } from "@/data/monasteries";
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
  TreePine
} from "lucide-react";

const MonasteryDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/monasteries" replace />;
  }
  
  const monastery = getMonasteryById(id);
  
  if (!monastery) {
    return <Navigate to="/monasteries" replace />;
  }

  const accessibilityConfig = {
    easy: { color: "text-green-600", icon: "🟢", label: "Easy Access" },
    moderate: { color: "text-yellow-600", icon: "🟡", label: "Moderate Trek" },
    difficult: { color: "text-red-600", icon: "🔴", label: "Challenging Journey" }
  };

  const access = accessibilityConfig[monastery.accessibility];

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
                variant={monastery.type === 'famous' ? 'default' : 'secondary'}
                className="bg-background/20 text-monastery-white border-monastery-white/20"
              >
                {monastery.type} monastery
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-monastery-white mb-4">
              {monastery.name}
            </h1>
            <p className="text-xl text-monastery-white/90 max-w-2xl">
              {monastery.description}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
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
                    Founded in {monastery.founded}, this {monastery.type} monastery represents centuries 
                    of Buddhist tradition in the heart of the Himalayas. Located at an altitude of {monastery.altitude}, 
                    it offers visitors a unique spiritual experience combined with breathtaking mountain views.
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
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
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
                    Virtual Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg aspect-video flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        3D Virtual Tour Coming Soon
                      </h3>
                      <p className="text-muted-foreground">
                        Experience this monastery in immersive 3D
                      </p>
                    </div>
                  </div>
                  <Button variant="monastery" className="w-full" disabled>
                    Launch Virtual Tour (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Essential Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-monastery-red" />
                      <div>
                        <div className="font-medium">{monastery.location}</div>
                        <div className="text-sm text-muted-foreground">{monastery.nearestTown}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mountain className="h-5 w-5 text-mountain-blue" />
                      <div>
                        <div className="font-medium">{monastery.altitude}</div>
                        <div className="text-sm text-muted-foreground">Above sea level</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-monastery-gold" />
                      <div>
                        <div className="font-medium">Founded {monastery.founded}</div>
                        <div className="text-sm text-muted-foreground">Years of heritage</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Accessibility className={`h-5 w-5 ${access.color}`} />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <span>{access.icon}</span>
                          {access.label}
                        </div>
                        <div className="text-sm text-muted-foreground">Difficulty level</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-prayer-green" />
                      <div>
                        <div className="font-medium">Best Time</div>
                        <div className="text-sm text-muted-foreground">{monastery.bestTimeToVisit}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Plan Your Visit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/map">
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
                    <strong className="text-green-800 dark:text-green-200">Best Weather:</strong>
                    <p className="text-green-700 dark:text-green-300 mt-1">
                      {monastery.bestTimeToVisit} offers the clearest mountain views
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <strong className="text-blue-800 dark:text-blue-200">Getting There:</strong>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                      Nearest town: {monastery.nearestTown}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <strong className="text-yellow-800 dark:text-yellow-200">What to Bring:</strong>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                      Warm clothes, comfortable shoes, camera, and respect for sacred spaces
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