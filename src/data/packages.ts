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

export const packages: Package[] = [
  {
    id: 1,
    name: "Monastery Exploration Package",
    price: 15000,
    duration: "3 Days, 2 Nights",
    rating: 4.5,
    includes: ["Hotel", "Transport", "Guide", "Meals"],
    priceHistory: [14000, 14500, 15000, 15000, 15000, 14800],
    breakdown: {
      accommodation: 6000,
      transport: 4000,
      guide: 3000,
      meals: 2000
    },
    reviews: [
      { user: "Rahul S.", rating: 4.5, comment: "Great introduction to Sikkim's monasteries. Guide was very knowledgeable." },
      { user: "Priya M.", rating: 4.0, comment: "Well organized tour, comfortable accommodations. Would recommend." }
    ]
  },
  {
    id: 2,
    name: "Cultural Immersion Tour",
    price: 22000,
    duration: "5 Days, 4 Nights",
    rating: 4.8,
    includes: ["Hotel", "Transport", "Guide", "Meals", "Activities"],
    priceHistory: [20000, 21000, 21500, 22000, 22000, 22000],
    breakdown: {
      accommodation: 9000,
      transport: 5000,
      guide: 4000,
      meals: 3000,
      activities: 1000
    },
    reviews: [
      { user: "Amit P.", rating: 5.0, comment: "Incredible cultural experience. The activities were the highlight!" },
      { user: "Sarah K.", rating: 4.5, comment: "Loved learning about Buddhist culture. Great value for money." }
    ]
  },
  {
    id: 3,
    name: "Budget Monastery Tour",
    price: 8000,
    duration: "2 Days, 1 Night",
    rating: 4.2,
    includes: ["Transport", "Guide"],
    priceHistory: [7500, 7800, 8000, 8000, 7900, 8000],
    breakdown: {
      transport: 4500,
      guide: 3500
    },
    reviews: [
      { user: "Deepak R.", rating: 4.0, comment: "Perfect for a quick weekend trip. Good value." },
      { user: "Maya N.", rating: 4.5, comment: "Basic but well-organized tour. Guide was excellent." }
    ]
  },
  {
    id: 4,
    name: "Luxury Monastery Experience",
    price: 35000,
    duration: "4 Days, 3 Nights",
    rating: 4.9,
    includes: ["Luxury Hotel", "Private Transport", "Expert Guide", "Gourmet Meals", "Spa"],
    priceHistory: [33000, 34000, 34500, 35000, 35000, 35000],
    breakdown: {
      accommodation: 15000,
      transport: 8000,
      guide: 5000,
      meals: 4000,
      spa: 3000
    },
    reviews: [
      { user: "Rajan K.", rating: 5.0, comment: "Exceptional service and accommodations. Worth every rupee!" },
      { user: "Lisa M.", rating: 4.8, comment: "Luxurious and peaceful. The spa treatments were amazing." }
    ]
  }
];
