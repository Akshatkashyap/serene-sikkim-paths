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
    image: "monastery-3.jpg",
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
    image: "https://i.pinimg.com/1200x/23/fa/46/23fa466b078baf86c2ba8a5b4d15750a.jpg",
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
    image: "https://i.pinimg.com/1200x/47/51/e8/4751e8cc037e5bb34afa8e72416c9f0f.jpg",
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
    image: "https://i.pinimg.com/1200x/ab/bd/80/abbd80ecca51e0cae77c2127ca9eaefc.jpg",
    type: "hidden",
    founded: "1701",
    features: ["Kanchenjunga Views", "Meditation Caves", "Ancient Scripts", "Trekking Base"],
    altitude: "5,840 ft",
    nearestTown: "Yuksom (1 km)",
    accessibility: "moderate",
    bestTimeToVisit: "April to June, September to November"
  },
  {
    id: "samdruptse",
  name: "Samdruptse Monastery",
  description: "Also called 'The Wish-Fulfilling Hill', Samdruptse features a giant statue of Guru Padmasambhava and blends modern and traditional architecture. A popular pilgrimage & tourist spot around Namchi.",
  location: "Samdruptse Hill, Namchi, South Sikkim",
  coordinates: [27.1667, 88.36], // approximate location near Namchi :contentReference[oaicite:3]{index=3}
  image: "https://i.pinimg.com/1200x/bd/0b/7c/bd0b7cce0e990ae87ecbe160f5300fe4.jpg",
  type: "famous",
  founded: "1997", // foundation laid in 1997 :contentReference[oaicite:4]{index=4}
  features: ["Giant Guru Padmasambhava Statue", "Modern- Traditional Architecture", "Panoramic Views", "Pilgrimage Site"],
  altitude: "approx 7,200 ft", // some sources mention altitude around that (2,195 m) :contentReference[oaicite:5]{index=5}
  nearestTown: "Namchi (7 km)", 
  accessibility: "easy",
  bestTimeToVisit: "February to May, September to mid-December"
  },
  {
    id: "lingdum",
  name: "Lingdum Monastery (Ranka Monastery)",
  description: "A newer monastery completed in 1999, also called Ranka Monastery. Built in Zurmang Kagyu tradition. It is renowned for its serene surroundings, handsome architecture, large courtyard, prayer hall, and being a training center for monks.",
  location: "Ranka, East Sikkim",
  coordinates: [27.35, 88.70], // approximate; (this needs exact verification) :contentReference[oaicite:6]{index=6}
  image: "https://i.pinimg.com/1200x/63/a7/ef/63a7ef8797dadb6e92abf52c80e6220c.jpg",
  type: "famous",
  founded: "1999",
  features: ["Zur Mang Kagyu Sect", "Large Courtyard", "5-metre Buddha Statue", "Peace & Scenic Forests"],
  altitude: "about 4,300 ft", // ~1300m ~ 4,265 ft (sources say 1300m) :contentReference[oaicite:7]{index=7}
  nearestTown: "Gangtok (16-20 km)", 
  accessibility: "easy",
  bestTimeToVisit: "March to May, September to October"
  },
  {
    id: "bermiok",
  name: "Bermiok Monastery",
  description: "Bermiok Wosel Choling Monastery, belonging to the Karma Kagyu lineage, is located above Singtam in South Sikkim. It is an old gompa with manilakhang, restored after damage; offers insight into local Buddhist practices and architecture.",
  location: "Above Singtam, South Sikkim",
  coordinates: [27.18, 88.42], // approximate location for Bermiok area :contentReference[oaicite:8]{index=8}
  image: "https://i.pinimg.com/736x/83/f2/79/83f279ebcb2c9a35ac6ea117b8e79940.jpg",
  type: "famous",
  founded: "1873", // originally founded in 1873 :contentReference[oaicite:9]{index=9}
  features: ["Karma Kagyu Order", "Manilakhang Shrine", "Scenic Views", "Local Community Worship"],
  altitude: "about 5,000 ft", // approximate given Singtam area elevations (this may need more precision)
  nearestTown: "Singtam (a few km)", 
  accessibility: "moderate",
  bestTimeToVisit: "March to June, September to December"
  },
  {
    id: "lachung",
  name: "Lachung Monastery",
  description: "A Nyingma Buddhist gompa in the Lachung Valley, established in 1880. Surrounded by rivers and mountain scenery, it is a serene religious center in North Sikkim.",  
  location: "Lachung, Mangan District, North Sikkim",  
  coordinates: [28.6111, 88.4222],  // approximate; coordinate needs precise checking  
  image: "https://i.pinimg.com/736x/db/e2/66/dbe266a623d3497074b73ac33a9a28e0.jpg",  
  type: "famous",  
  founded: "1880",  
  features: ["Nyingma sect", "Annual mask dance festival", "Mountain-river valley scenery", "Cultural life of Lachung village"],  
  altitude: "≈ 9,600 ft (≈ 3,000 m)",  // Lachung’s elevation as village / monastery area :contentReference[oaicite:5]{index=5}  
  nearestTown: "Lachung (itself), ~50 km from Mangan town",  
  accessibility: "difficult",  // roads in North Sikkim can be tough, weather dependent :contentReference[oaicite:6]{index=6}  
  bestTimeToVisit: "April to June, September to November"
  },
  {
    id: "pelling_skywalk_chenrezig",
  name: "Chenrezig Statue & Sky Walk, Pelling",
  description: "A glass skywalk attraction paired with a 137-ft Chenrezig (Avalokiteshvara) statue near Pelling. It combines spiritual pilgrimage with adventure and panoramic views over valleys and the Kanchenjunga range.",  
  location: "Near Pelling, West Sikkim",  
  coordinates: [27.265, 88.260],  // approximate – near Pelling skywalk / Chenrezig statue area (exact coordinate needs verification)  
  image: "https://i.pinimg.com/1200x/ac/b3/b8/acb3b8f6fbe933724791a098751b20c0.jpg",  
  type: "famous",  
  founded: "2018 (statue & skywalk opened Nov 1, 2018)",  
  features: ["137 ft Chenrezig Statue", "Glass skywalk / transparent walkway", "Panoramic Himalayan views", "Prayer wheels & courtyard", "Adventure + pilgrimage mix"],  
  altitude: "≈ 7,200 ft (≈ 2,195 m) above sea level",  // as per sources for Pelling Glass Skywalk :contentReference[oaicite:0]{index=0}  
  nearestTown: "Pelling (few kilometres)",  
  accessibility: "moderate",  // road up to skywalk + some walk / stairs to statue etc. :contentReference[oaicite:1]{index=1}  
  bestTimeToVisit: "March to May, September to November"
 },
 {
  id: "khechupelri",
  name: "Khechupelri Monastery",
  description: "Monastery above Khecheopalri Lake – a lesser-known spiritual spot connected with local legends. Offers tranquility, lakeside views, forested paths, often less visited compared to the mainstream monasteries. :contentReference[oaicite:7]{index=7}",
  location: "Above Khecheopalri Lake, West Sikkim",
  coordinates: [27.326, 88.280],  // approximate; the area of Khecheopalri Lake / hill above it (needs GPS)  
  image: "https://i.pinimg.com/736x/fa/60/9b/fa609be5de573eb2146b2a3ffb4be219.jpg",
  type: "hidden",
  founded: "1760",  // year given in sources ‒ founded in 1760 AD. :contentReference[oaicite:8]{index=8}  
  features: ["Lakeside view (Wish-fulfilling Lake)", "Forest trekking path", "Lepcha legends", "Quiet & less touristy"],  
  altitude: "≈ 6,000 ft (≈ 1,830 m)",  // approximate based on hill elevation above the lake  
  nearestTown: "Khecheopalri village / Pelling area",  
  accessibility: "difficult",  // involves hill path / trail + road access to lake then climb/hike.  
  bestTimeToVisit: "March to June, September to December"
 }
];

export const getMonasteryById = (id: string): Monastery | undefined => {
  return monasteries.find(monastery => monastery.id === id);
};