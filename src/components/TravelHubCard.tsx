import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Clock, 
  IndianRupee, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Users,
  Calendar,
  Phone
} from 'lucide-react';
import { TravelHub, getHubTypeIcon } from '@/data/travelHubs';

interface TravelHubCardProps {
  hub: TravelHub;
  className?: string;
}

const TravelHubCard: React.FC<TravelHubCardProps> = ({ hub, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getHubIcon = () => {
    switch (hub.type) {
      case 'airport':
        return <Plane className="h-5 w-5 text-blue-600" />;
      case 'railway':
        return <Train className="h-5 w-5 text-green-600" />;
      case 'bus_station':
        return <Bus className="h-5 w-5 text-orange-600" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getHubColor = () => {
    switch (hub.type) {
      case 'airport':
        return 'border-blue-200 bg-blue-50';
      case 'railway':
        return 'border-green-200 bg-green-50';
      case 'bus_station':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getServiceIcon = (iconEmoji: string) => {
    switch (iconEmoji) {
      case '🚗':
        return <Car className="h-4 w-4 text-blue-600" />;
      case '🚐':
        return <Users className="h-4 w-4 text-green-600" />;
      case '🚌':
        return <Bus className="h-4 w-4 text-orange-600" />;
      case '🏠':
      case '🏎️':
        return <Car className="h-4 w-4 text-purple-600" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`${className} ${getHubColor()} border-2`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          {getHubIcon()}
          <div>
            <div className="flex items-center gap-2">
              <span>{hub.name}</span>
              <span className="text-lg">{getHubTypeIcon(hub.type)}</span>
            </div>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {hub.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Badge variant="outline" className="justify-center py-1">
            <Clock className="h-3 w-3 mr-1" />
            3-6 hrs to Gangtok
          </Badge>
          <Badge variant="outline" className="justify-center py-1">
            <IndianRupee className="h-3 w-3 mr-1" />
            ₹120-4000
          </Badge>
        </div>

        {/* Services Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Transportation Options</span>
            <Badge variant="secondary" className="text-xs">
              {hub.services.length} options
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {hub.services.slice(0, 4).map((service, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                {getServiceIcon(service.icon)}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium truncate">{service.name}</div>
                  <div className="text-xs text-muted-foreground">{service.costRange}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Detailed Information */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>View Detailed Information</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-4">
            {hub.services.map((service, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getServiceIcon(service.icon)}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm">{service.name}</h4>
                        {service.provider && (
                          <p className="text-xs text-muted-foreground">{service.provider}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            <span className="font-medium">Cost: {service.costRange}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>To Gangtok: {service.timeToGangtok}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>To Monasteries: {service.timeToMajorMonasteries}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-medium">Features:</h5>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-0">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {service.bookingInfo && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <div className="flex items-start gap-1">
                            <Phone className="h-3 w-3 text-blue-600 mt-0.5 shrink-0" />
                            <p className="text-xs text-blue-700">
                              <span className="font-medium">Booking: </span>
                              {service.bookingInfo}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                <div className="text-xs text-yellow-700">
                  <p className="font-medium mb-1">Travel Tips:</p>
                  <ul className="space-y-0.5">
                    <li>• Book in advance during peak season (Mar-May, Oct-Dec)</li>
                    <li>• Carry valid ID and permits for Sikkim entry</li>
                    <li>• Weather can affect travel times in mountains</li>
                    <li>• Early morning departures recommended for better views</li>
                  </ul>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default TravelHubCard;