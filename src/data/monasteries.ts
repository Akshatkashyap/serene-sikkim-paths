export interface Monastery {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  image: string;
  type: "famous" | "hidden";
  founded: string;
  features: string[];
  altitude: string;
  nearestTown: string;
  accessibility: "easy" | "moderate" | "difficult";
  bestTimeToVisit: string;
}

export const monasteries: Monastery[] = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    description: "The Dharma Chakra Centre, also known as Rumtek Monastery, is one of the most significant monasteries in Sikkim and the largest in the state.",
    location: "Rumtek, East Sikkim",
    coordinates: [27.3839, 88.5632],
    image: "/monastery-2.jpg",
    type: "famous",
    founded: "1966",
    features: ["Golden Stupa", "Prayer Wheels", "Buddhist Art", "Meditation Hall"],
    altitude: "5,800 ft",
    nearestTown: "Gangtok (24 km)",
    accessibility: "easy",
    bestTimeToVisit: "March to June, September to December"
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    description: "One of the oldest and premier monasteries of Sikkim, built for 'ta-tshang' monks - the pure monks of the Nyingma order.",
    location: "Pelling, West Sikkim", 
    coordinates: [27.2167, 88.2167],
    image: "/monastery-1.jpg",
    type: "famous",
    founded: "1705",
    features: ["Seven-tiered Sculpture", "Ancient Murals", "Sacred Texts", "Mountain Views"],
    altitude: "6,840 ft",
    nearestTown: "Pelling (2 km)",
    accessibility: "moderate",
    bestTimeToVisit: "April to June, October to December"
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    description: "Perched on a conical hill between the Rathong and Rangeet rivers, considered one of the most sacred places in Sikkim.",
    location: "Tashiding, West Sikkim",
    coordinates: [27.3333, 88.2833],
    image: "/monastery-3.jpg",
    type: "hidden",
    founded: "1717",
    features: ["Sacred Chortens", "Holy Water Springs", "Panoramic Views", "Ancient Stupas"],
    altitude: "4,500 ft",
    nearestTown: "Yuksom (19 km)",
    accessibility: "difficult",
    bestTimeToVisit: "March to May, October to November"
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    description: "Built on a site blessed by Lama Druptob Karpo, known for its tantric rituals and sacred dances.",
    location: "Gangtok, East Sikkim",
    coordinates: [27.3525, 88.6233],
    image: "/monastery-1.jpg",
    type: "hidden",
    founded: "1909",
    features: ["Tantric Rituals", "Sacred Dances", "Ancient Statues", "Prayer Flags"],
    altitude: "6,200 ft",
    nearestTown: "Gangtok (3 km)",
    accessibility: "easy",
    bestTimeToVisit: "April to June, September to November"
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    description: "A hidden gem rebuilt after the original was destroyed, known for its beautiful murals and peaceful atmosphere.",
    location: "Phodong, North Sikkim",
    coordinates: [27.4167, 88.5833],
    image: "/monastery-2.jpg",
    type: "hidden",
    founded: "1740 (rebuilt 1961)",
    features: ["Ancient Murals", "Buddha Statues", "Peaceful Gardens", "Mountain Trails"],
    altitude: "4,500 ft",
    nearestTown: "Mangan (28 km)",
    accessibility: "moderate",
    bestTimeToVisit: "March to June, September to December"
  },
  {
    id: "labrang",
    name: "Labrang Monastery",
    description: "A serene monastery offering spectacular views of the Kanchenjunga range, perfect for meditation and contemplation.",
    location: "Yuksam, West Sikkim",
    coordinates: [27.3667, 88.2333],
    image: "/monastery-3.jpg",
    type: "hidden",
    founded: "1701",
    features: ["Kanchenjunga Views", "Meditation Caves", "Ancient Scripts", "Trekking Base"],
    altitude: "5,840 ft",
    nearestTown: "Yuksom (1 km)",
    accessibility: "moderate",
    bestTimeToVisit: "April to June, September to November"
  }
];

export const getMonasteryById = (id: string): Monastery | undefined => {
  return monasteries.find(monastery => monastery.id === id);
};