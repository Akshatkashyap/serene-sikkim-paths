export interface TravelHub {
  id: string;
  name: string;
  type: 'airport' | 'railway' | 'bus_station';
  coordinates: [number, number];
  description: string;
  services: {
    icon: string;
    name: string;
    provider?: string;
    costRange: string;
    timeToGangtok: string;
    timeToMajorMonasteries: string;
    features: string[];
    bookingInfo?: string;
  }[];
}

export const travelHubs: TravelHub[] = [
  {
    id: "bagdogra-airport",
    name: "Bagdogra Airport",
    type: "airport",
    coordinates: [26.6812, 88.3285],
    description: "The nearest airport to Sikkim, connecting to major Indian cities",
    services: [
      {
        icon: "🚗",
        name: "Private Taxi",
        provider: "Airport Taxi Service",
        costRange: "₹2500-3500",
        timeToGangtok: "3.5-4 hours",
        timeToMajorMonasteries: "4-5 hours",
        features: ["AC Vehicle", "Professional Driver", "Direct Route", "24/7 Available"],
        bookingInfo: "Book at airport counter or pre-book online"
      },
      {
        icon: "🚐",
        name: "Shared Taxi",
        provider: "Sikkim Taxi Association",
        costRange: "₹500-800 per person",
        timeToGangtok: "4-4.5 hours",
        timeToMajorMonasteries: "4.5-5.5 hours",
        features: ["Shared Cost", "Fixed Departure Times", "Safe Travel", "Local Knowledge"],
        bookingInfo: "Available at airport taxi stand"
      },
      {
        icon: "🚌",
        name: "Airport Bus",
        provider: "West Bengal State Transport",
        costRange: "₹150-250",
        timeToGangtok: "5-6 hours",
        timeToMajorMonasteries: "6-7 hours",
        features: ["Most Economic", "Regular Service", "Multiple Stops", "Safe Journey"],
        bookingInfo: "Board from airport bus terminal"
      },
      {
        icon: "🏠",
        name: "Car Rental",
        provider: "Various Agencies",
        costRange: "₹2000-4000/day",
        timeToGangtok: "3.5-4 hours",
        timeToMajorMonasteries: "Flexible timing",
        features: ["Self Drive Option", "Flexible Schedule", "Multiple Vehicle Options", "With/Without Driver"],
        bookingInfo: "Book online or at airport rental desks"
      }
    ]
  },
  {
    id: "siliguri-junction",
    name: "New Jalpaiguri (Siliguri Junction)",
    type: "railway",
    coordinates: [26.7009, 88.3962],
    description: "Major railway junction connecting Sikkim to all parts of India",
    services: [
      {
        icon: "🚗",
        name: "Private Taxi",
        provider: "Railway Station Taxi Service",
        costRange: "₹2200-3200",
        timeToGangtok: "3-3.5 hours",
        timeToMajorMonasteries: "3.5-4.5 hours",
        features: ["Immediate Availability", "Fixed Rate", "AC Vehicles", "Experienced Drivers"],
        bookingInfo: "Available at railway station taxi stand"
      },
      {
        icon: "🚐",
        name: "Shared Sumo",
        provider: "Sikkim Nationalized Transport",
        costRange: "₹400-600 per person",
        timeToGangtok: "3.5-4 hours",
        timeToMajorMonasteries: "4-5 hours",
        features: ["Regular Service", "Fixed Route", "Local Transport", "Cost Effective"],
        bookingInfo: "SNT Counter at railway station"
      },
      {
        icon: "🚌",
        name: "State Bus",
        provider: "Sikkim Nationalized Transport",
        costRange: "₹120-200",
        timeToGangtok: "4.5-5 hours",
        timeToMajorMonasteries: "5-6 hours",
        features: ["Very Economic", "Daily Service", "Government Service", "Multiple Stops"],
        bookingInfo: "SNT bus terminal near railway station"
      },
      {
        icon: "🏎️",
        name: "Car Rental",
        provider: "Local Rental Services",
        costRange: "₹1800-3500/day",
        timeToGangtok: "3-3.5 hours",
        timeToMajorMonasteries: "Flexible",
        features: ["Self/Chauffeur Drive", "Various Car Models", "Flexible Duration", "Local Permits Included"],
        bookingInfo: "Multiple agencies near railway station"
      }
    ]
  },
  {
    id: "siliguri-bus-stand",
    name: "Siliguri Bus Terminal",
    type: "bus_station",
    coordinates: [26.7271, 88.3953],
    description: "Main bus terminal for intercity and interstate bus services",
    services: [
      {
        icon: "🚌",
        name: "Deluxe Bus",
        provider: "Private Operators",
        costRange: "₹300-500",
        timeToGangtok: "4-5 hours",
        timeToMajorMonasteries: "5-6 hours",
        features: ["Comfortable Seating", "AC Service", "Multiple Operators", "Regular Service"],
        bookingInfo: "Book at bus terminal or online"
      },
      {
        icon: "🚐",
        name: "Mini Bus",
        provider: "Local Operators",
        costRange: "₹200-350",
        timeToGangtok: "4.5-5.5 hours",
        timeToMajorMonasteries: "5.5-6.5 hours",
        features: ["Frequent Service", "Local Route", "Budget Friendly", "Mountain Experience"],
        bookingInfo: "Board from bus terminal"
      },
      {
        icon: "🚗",
        name: "Taxi from Terminal",
        provider: "Terminal Taxi Service",
        costRange: "₹2000-3000",
        timeToGangtok: "3-4 hours",
        timeToMajorMonasteries: "3.5-4.5 hours",
        features: ["Door to Door", "No Waiting", "Comfortable Journey", "Local Knowledge"],
        bookingInfo: "Available at taxi counter"
      }
    ]
  }
];

export const getTransportIcon = (type: string) => {
  switch (type) {
    case '🚗': return 'Car';
    case '🚐': return 'Van';
    case '🚌': return 'Bus';
    case '🏠': return 'Rental';
    case '🏎️': return 'Sports Car';
    default: return 'Transport';
  }
};

export const getHubTypeIcon = (type: TravelHub['type']) => {
  switch (type) {
    case 'airport': return '✈️';
    case 'railway': return '🚂';
    case 'bus_station': return '🚌';
    default: return '📍';
  }
};