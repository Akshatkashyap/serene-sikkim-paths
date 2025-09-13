import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, MapPin, Camera, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Mountain,
      title: t('home.spiritualJourney'),
      description: t('home.spiritualJourneyDesc')
    },
    {
      icon: MapPin,
      title: t('home.culturalHeritage'),
      description: t('home.culturalHeritageDesc')
    },
    {
      icon: Camera,
      title: t('home.naturalBeauty'),
      description: t('home.naturalBeautyDesc')
    },
    {
      icon: Users,
      title: t('home.guidedTours'),
      description: t('home.guidedToursDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero-monastery.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-red-900/70" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-500">
            <div>{t('home.heroTitleLine1')}</div>
            <div className="text-yellow-400">{t('home.heroTitleLine2')}</div>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('home.heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/map">
              <Button variant="hero" size="xl">
                {t('home.viewMap')}
              </Button>
            </Link>
            <Link to="/monasteries">
              <Button variant="mountain" size="xl">
                {t('home.exploreMonasteries')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.featuresDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t('home.previewTitle')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.previewDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: "/monastery-1.jpg", title: t('home.preview1Title'), desc: t('home.preview1Desc') },
              { image: "/monastery-2.jpg", title: t('home.preview2Title'), desc: t('home.preview2Desc') },
              { image: "/monastery-3.jpg", title: t('home.preview3Title'), desc: t('home.preview3Desc') }
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/monasteries">
              <Button variant="monastery" size="lg">
                {t('home.exploreAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('home.ctaDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/map">
                <Button variant="prayer" size="lg">
                  {t('home.startExploring')}
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                {t('home.downloadGuide')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;