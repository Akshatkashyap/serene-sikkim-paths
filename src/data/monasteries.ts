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
    description:
      "The Dharma Chakra Centre, also known as Rumtek Monastery, is the largest functioning monastery in Sikkim and the main seat of the Karma Kagyu lineage of Tibetan Buddhism. Built by the 16th Karmapa as a replica of Tibet's Tsurphu Monastery, it houses sacred relics and serves as a premier center for Buddhist studies.",
    location: "Rumtek, East Sikkim",
    coordinates: [27.3839, 88.5632],
    image: "/monastery-2.jpg",
    type: "famous",
    founded: "1966",
    features: [
      "Golden Stupa with 16th Karmapa's relics",
      "Traditional Prayer Wheels",
      "Intricate Tibetan Buddhist Art & Murals",
      "Main Prayer Hall with Thangkas",
      "Karma Shri Nalanda Institute",
      "Sacred Mandala of Chakra Sambara",
      "Annual Cham Dance Festivals",
      "Buddhist Manuscript Library",
    ],
    altitude: "5,800 ft",
    nearestTown: "Gangtok (24 km)",
    accessibility: "easy",
    bestTimeToVisit: "March to June, September to December",
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    description:
      "One of Sikkim's oldest and most prestigious monasteries, founded exclusively for 'ta-tshang' (pure monks) of the Nyingma order. Located at the highest altitude among major monasteries, it offers spectacular views of Kanchenjunga and houses the famous seven-tiered wooden sculpture depicting Guru Rinpoche's celestial palace.",
    location: "Pelling, West Sikkim",
    coordinates: [27.2167, 88.2167],
    image: "/monastery-1.jpg",
    type: "famous",
    founded: "1705",
    features: [
      "Seven-tiered Zangdok Palri sculpture",
      "Ancient Nyingma order murals",
      "Rare Buddhist manuscripts collection",
      "Panoramic Kanchenjunga views",
      "Royal coronation throne",
      "Traditional butter sculptures",
      "Sacred dance courtyard",
      "Historic prayer wheels collection",
    ],
    altitude: "6,840 ft",
    nearestTown: "Pelling (2 km)",
    accessibility: "moderate",
    bestTimeToVisit: "April to June, October to December",
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    description:
      "The 'Devoted Central Glory' monastery sits majestically on a heart-shaped hill between two sacred rivers. Legend says that a sight of this monastery alone can cleanse sins. It's the site of the annual Bum Chu (holy water) festival, one of Sikkim's most significant religious events.",
    location: "Tashiding, West Sikkim",
    coordinates: [27.3333, 88.2833],
    image: "/monastery-3.jpg",
    type: "hidden",
    founded: "1717",
    features: [
      "108 sacred chortens complex",
      "Holy Bum Chu water ceremony",
      "River confluence viewpoint",
      "Ancient meditation caves",
      "Guru Rinpoche footprint",
      "Traditional mandala designs",
      "Sacred juniper trees",
      "Pilgrimage circuit path",
    ],
    altitude: "4,500 ft",
    nearestTown: "Yuksom (19 km)",
    accessibility: "difficult",
    bestTimeToVisit: "March to May, October to November",
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    description:
      "The 'Solitary Temple' was built on a site blessed by the flying lama Druptob Karpo. This Nyingma monastery is famous for its annual Cham dances and tantric practices. Its proximity to Gangtok makes it easily accessible while maintaining its spiritual tranquility amidst urban surroundings.",
    location: "Gangtok, East Sikkim",
    coordinates: [27.3525, 88.6233],
    image: "/monastery-1.jpg",
    type: "hidden",
    founded: "1909",
    features: [
      "Annual Cham dance festival",
      "Tantric meditation practices",
      "Mahakala deity statues",
      "Colorful prayer flag displays",
      "Traditional Tibetan architecture",
      "Sacred mask collection",
      "City view meditation terrace",
      "Local pilgrimage center",
    ],
    altitude: "6,200 ft",
    nearestTown: "Gangtok (3 km)",
    accessibility: "easy",
    bestTimeToVisit: "April to June, September to November",
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    description:
      "Rising from the ashes of its destroyed predecessor, this 'Blooming Lotus' monastery represents resilience and renewal. Located in North Sikkim's pristine landscape, it serves as a gateway to the region's remote Buddhist culture. The monastery is renowned for its traditional architecture and serves as a rest point for pilgrims heading to higher altitudes.",
    location: "Phodong, North Sikkim",
    coordinates: [27.4167, 88.5833],
    image: "/monastery-2.jpg",
    type: "hidden",
    founded: "1740 (rebuilt 1961)",
    features: [
      "Restored traditional murals",
      "Gold-plated Buddha statues",
      "Terraced meditation gardens",
      "North Sikkim gateway location",
      "Alpine rhododendron surroundings",
      "Traditional monastery school",
      "Himalayan wildlife sanctuary",
      "Pilgrimage route waypoint",
    ],
    altitude: "4,500 ft",
    nearestTown: "Mangan (28 km)",
    accessibility: "moderate",
    bestTimeToVisit: "March to June, September to December",
  },
  {
    id: "labrang",
    name: "Labrang Monastery",
    description:
      "The 'Lama's Residence' monastery sits in the historic first capital of Sikkim, Yuksom. This sacred site is closely connected to Guru Rinpoche's consecration of Sikkim and serves as a spiritual preparation point for the famous Kanchenjunga trek. The monastery maintains strong ties to Bhutanese Buddhist traditions.",
    location: "Yuksam, West Sikkim",
    coordinates: [27.3667, 88.2333],
    image: "/monastery-3.jpg",
    type: "hidden",
    founded: "1701",
    features: [
      "Kanchenjunga base camp views",
      "Guru Rinpoche meditation caves",
      "Historic coronation site nearby",
      "Dzongkha manuscript collection",
      "Traditional Bhutanese architecture",
      "Sacred lake pilgrimage trail",
      "High-altitude acclimatization point",
      "Indigenous Lepcha cultural center",
    ],
    altitude: "5,840 ft",
    nearestTown: "Yuksom (1 km)",
    accessibility: "moderate",
    bestTimeToVisit: "April to June, September to November",
  },
];

export const getMonasteryById = (id: string): Monastery | undefined => {
  return monasteries.find((monastery) => monastery.id === id);
};

//nice data by akshat kasshap
//
