export interface TravelSite {
  name: string;
  packages: Package[];
  icon: string;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Package {
  id: number;
  name: string;
  price: number;
  duration: string;
  rating: number;
  includes: string[];
  priceHistory: number[];
  breakdown: Record<string, number>;
  reviews: Review[];
}

export const travelPackages: Record<string, Package[]> = {
  goibibo: [
    {
      id: 1,
      name: "Budget Explorer",
      duration: "3 Days / 2 Nights",
      price: 12999,
      includes: ["3-Star Hotel", "Shared Transport", "Local Guide"],
      rating: 4.2,
      priceHistory: [11999, 12499, 12999, 12799, 12999, 12999],
      reviews: [
        { rating: 4, comment: "Great budget option, good service", user: "Traveler123" },
        { rating: 5, comment: "Perfect for short trips", user: "Adventurer22" }
      ],
      breakdown: {
        hotel: 6000,
        transport: 4000,
        guide: 2000,
        taxes: 999
      }
    },
    {
      id: 2,
      name: "Comfort Package",
      duration: "4 Days / 3 Nights",
      price: 18999,
      includes: ["4-Star Hotel", "Private Transport", "Expert Guide", "All Meals"],
      rating: 4.5,
      priceHistory: [17999, 18499, 18999, 18999, 18999, 18999],
      reviews: [
        { rating: 5, comment: "Excellent service and comfortable stay", user: "Explorer99" },
        { rating: 4, comment: "Great food and accommodation", user: "Mountain_Lover" }
      ],
      breakdown: {
        hotel: 9000,
        transport: 5000,
        guide: 2500,
        meals: 1500,
        taxes: 999
      }
    },
    {
      id: 3,
      name: "Luxury Retreat",
      duration: "5 Days / 4 Nights",
      price: 24999,
      includes: ["5-Star Hotel", "Luxury Transport", "Expert Guide", "All Meals", "Spa"],
      rating: 4.8,
      priceHistory: [23999, 24499, 24999, 24999, 24999, 24999],
      reviews: [
        { rating: 5, comment: "Absolutely worth every penny", user: "LuxurySeeker" },
        { rating: 5, comment: "Outstanding experience", user: "Wanderlust_Pro" }
      ],
      breakdown: {
        hotel: 12000,
        transport: 6000,
        guide: 3000,
        meals: 2000,
        spa: 1000,
        taxes: 999
      }
    }
  ],
  makemytrip: [
    {
      id: 1,
      name: "Sikkim Starter",
      duration: "3 Days / 2 Nights",
      price: 13499,
      includes: ["3-Star Hotel", "Shared Transport", "Local Guide"],
      rating: 4.3,
      priceHistory: [12999, 13299, 13499, 13499, 13399, 13499],
      reviews: [
        { rating: 4, comment: "Good introduction to Sikkim", user: "Mountain_Trekker" },
        { rating: 5, comment: "Well organized tour", user: "WanderlustSoul" }
      ],
      breakdown: {
        hotel: 6500,
        transport: 4000,
        guide: 2000,
        taxes: 999
      }
    },
    {
      id: 2,
      name: "Premium Experience",
      duration: "4 Days / 3 Nights",
      price: 19499,
      includes: ["4-Star Hotel", "Private Transport", "Expert Guide", "All Meals"],
      rating: 4.6,
      priceHistory: [18499, 18999, 19499, 19499, 19499, 19499],
      reviews: [
        { rating: 5, comment: "Amazing experience with great guide", user: "TravelPro" },
        { rating: 4, comment: "Lovely hotels and service", user: "Explorer_123" }
      ],
      breakdown: {
        hotel: 9500,
        transport: 5000,
        guide: 2500,
        meals: 1500,
        taxes: 999
      }
    },
    {
      id: 3,
      name: "Ultimate Luxury",
      duration: "5 Days / 4 Nights",
      price: 25999,
      includes: ["5-Star Hotel", "Luxury Transport", "Expert Guide", "All Meals", "Spa"],
      rating: 4.9,
      priceHistory: [24999, 25499, 25999, 25999, 25999, 25999],
      reviews: [
        { rating: 5, comment: "Best travel experience ever", user: "LuxuryExplorer" },
        { rating: 5, comment: "Worth every penny spent", user: "Wanderer_Elite" }
      ],
      breakdown: {
        hotel: 12500,
        transport: 6500,
        guide: 3000,
        meals: 2000,
        spa: 1000,
        taxes: 999
      }
    }
  ]
};
