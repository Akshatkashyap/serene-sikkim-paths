import { Monastery } from './monasteries';

export interface MonasteryNarration {
  id: string;
  introduction: string;
  fullDescription: string;
  locationInfo: string;
  historicalInfo: string;
  featuresInfo: string;
  visitingInfo: string;
  conclusion: string;
}

export const monasteryNarrations: Record<string, MonasteryNarration> = {
  rumtek: {
    id: "rumtek",
    introduction: "Welcome to Rumtek Monastery, also known as the Dharma Chakra Centre.",
    fullDescription: "Rumtek Monastery is one of the most significant monasteries in Sikkim and the largest in the state. The Dharma Chakra Centre, as it is formally known, serves as the seat of the Karmapa and is a center of the Kagyu school of Tibetan Buddhism.",
    locationInfo: "Located in Rumtek, East Sikkim, this magnificent monastery sits at an altitude of 5,800 feet, just 24 kilometers from Gangtok.",
    historicalInfo: "Founded in 1966, Rumtek was built as the main seat of His Holiness the 16th Karmapa in exile. The monastery was constructed to replicate the original Tsurphu Monastery in Tibet.",
    featuresInfo: "The monastery is renowned for its Golden Stupa, traditional Prayer Wheels, exquisite Buddhist Art, and serene Meditation Hall. The architecture combines traditional Tibetan and modern elements beautifully.",
    visitingInfo: "Rumtek is easily accessible and welcomes visitors throughout the year. The best time to visit is from March to June and September to December when the weather is pleasant.",
    conclusion: "Rumtek Monastery stands as a beacon of Buddhist spirituality and Tibetan culture in Sikkim, offering visitors a profound spiritual experience."
  },

  pemayangtse: {
    id: "pemayangtse",
    introduction: "Welcome to Pemayangtse Monastery, one of the oldest and most premier monasteries of Sikkim.",
    fullDescription: "Pemayangtse Monastery holds the distinction of being one of the oldest monasteries in Sikkim, built specifically for 'ta-tshang' monks, meaning the pure monks of the Nyingma order.",
    locationInfo: "Situated in Pelling, West Sikkim, this historic monastery stands at 6,840 feet above sea level, just 2 kilometers from Pelling town.",
    historicalInfo: "Founded in 1705, Pemayangtse has over 300 years of spiritual heritage. The name 'Pemayangtse' means 'Perfect Sublime Lotus', reflecting its spiritual significance.",
    featuresInfo: "The monastery is famous for its remarkable Seven-tiered Sculpture depicting various aspects of heaven and hell, Ancient Murals that tell Buddhist stories, Sacred Texts, and breathtaking Mountain Views of the Kanchenjunga range.",
    visitingInfo: "The monastery offers moderate accessibility and is best visited from April to June and October to December. The mountain views are particularly spectacular during clear weather.",
    conclusion: "Pemayangtse Monastery represents the rich spiritual heritage of Sikkim and offers visitors a glimpse into centuries-old Buddhist traditions."
  },

  tashiding: {
    id: "tashiding",
    introduction: "Welcome to Tashiding Monastery, one of the most sacred places in Sikkim.",
    fullDescription: "Perched dramatically on a conical hill between the Rathong and Rangeet rivers, Tashiding Monastery is considered one of the holiest Buddhist sites in Sikkim.",
    locationInfo: "Located in Tashiding, West Sikkim, this sacred monastery sits at 4,500 feet altitude, 19 kilometers from Yuksom.",
    historicalInfo: "Established in 1717, Tashiding has been a place of pilgrimage for over 300 years. According to legend, Guru Padmasambhava blessed this site and prophesied that a monastery would be built here.",
    featuresInfo: "The monastery is renowned for its Sacred Chortens or stupas, Holy Water Springs believed to have healing properties, Panoramic Views of the surrounding valleys, and Ancient Stupas that hold religious significance.",
    visitingInfo: "Due to its remote location, accessing Tashiding can be challenging, but the spiritual reward is immense. The best time to visit is from March to May and October to November.",
    conclusion: "Tashiding Monastery offers one of the most spiritual and scenic experiences in Sikkim, making the difficult journey worthwhile for devotees and travelers alike."
  },

  enchey: {
    id: "enchey",
    introduction: "Welcome to Enchey Monastery, a sacred site built on ground blessed by Lama Druptob Karpo.",
    fullDescription: "Enchey Monastery is built on a site that was blessed by Lama Druptob Karpo, a renowned tantric master. The monastery is particularly known for its tantric rituals and sacred dances.",
    locationInfo: "Located in Gangtok, East Sikkim, at an altitude of 6,200 feet, this monastery is conveniently situated just 3 kilometers from Gangtok city center.",
    historicalInfo: "Founded in 1909, Enchey is relatively newer compared to other monasteries but has quickly become an important center for tantric Buddhism in Sikkim.",
    featuresInfo: "The monastery is famous for its powerful Tantric Rituals, spectacular Sacred Dances performed during festivals, Ancient Statues of Buddhist deities, and colorful Prayer Flags that flutter in the mountain breeze.",
    visitingInfo: "Enchey is easily accessible from Gangtok and welcomes visitors year-round. The ideal visiting time is from April to June and September to November.",
    conclusion: "Enchey Monastery provides visitors with an accessible introduction to the mystical aspects of Tibetan Buddhism right in the heart of Sikkim's capital region."
  },

  phodong: {
    id: "phodong",
    introduction: "Welcome to Phodong Monastery, a hidden gem that was lovingly rebuilt after destruction.",
    fullDescription: "Phodong Monastery is a hidden treasure that was carefully rebuilt after the original structure was destroyed. Today, it stands as a testament to the resilience of Buddhist faith and is known for its beautiful murals and peaceful atmosphere.",
    locationInfo: "Situated in Phodong, North Sikkim, at 4,500 feet altitude, this serene monastery is located 28 kilometers from Mangan town.",
    historicalInfo: "Originally founded in 1740, the monastery was rebuilt in 1961 after being destroyed. This reconstruction represents the community's dedication to preserving their spiritual heritage.",
    featuresInfo: "The monastery showcases stunning Ancient Murals that have been carefully restored, beautiful Buddha Statues, Peaceful Gardens perfect for meditation, and scenic Mountain Trails for spiritual walks.",
    visitingInfo: "Phodong offers moderate accessibility and is best visited from March to June and September to December when the weather permits comfortable travel to North Sikkim.",
    conclusion: "Phodong Monastery embodies the spirit of renewal and offers visitors a peaceful retreat surrounded by the natural beauty of North Sikkim."
  },

  labrang: {
    id: "labrang",
    introduction: "Welcome to Labrang Monastery, a serene sanctuary offering spectacular views of the mighty Kanchenjunga.",
    fullDescription: "Labrang Monastery is a serene spiritual center that offers some of the most spectacular views of the Kanchenjunga range. It serves as a perfect destination for meditation and contemplation.",
    locationInfo: "Located in Yuksam, West Sikkim, at an elevation of 5,840 feet, this monastery sits just 1 kilometer from the historic town of Yuksom.",
    historicalInfo: "Founded in 1701, Labrang Monastery has over 320 years of spiritual history. Yuksom itself is significant as the place where the first Chogyal of Sikkim was crowned.",
    featuresInfo: "The monastery is blessed with breathtaking Kanchenjunga Views, ancient Meditation Caves used by monks for solitary practice, precious Ancient Scripts and manuscripts, and serves as a Trekking Base for various Himalayan expeditions.",
    visitingInfo: "The monastery has moderate accessibility and is ideally visited from April to June and September to November. It's also a starting point for several trekking routes.",
    conclusion: "Labrang Monastery combines spiritual practice with natural grandeur, offering visitors an unforgettable experience of Buddhist culture against the backdrop of the world's third-highest mountain."
  },

  samdruptse: {
    id: "samdruptse",
    introduction: "Welcome to Samdruptse Monastery, also known as 'The Wish-Fulfilling Hill'.",
    fullDescription: "Samdruptse, meaning 'The Wish-Fulfilling Hill', is a modern spiritual complex that features a giant statue of Guru Padmasambhava. It beautifully blends modern and traditional architecture and has become a popular pilgrimage and tourist destination around Namchi.",
    locationInfo: "Located on Samdruptse Hill in Namchi, South Sikkim, at approximately 7,200 feet altitude, this impressive site is 7 kilometers from Namchi town.",
    historicalInfo: "The foundation was laid in 1997, making it one of the newer additions to Sikkim's spiritual landscape. Despite its recent construction, it has quickly become a significant pilgrimage site.",
    featuresInfo: "The complex is dominated by a Giant Guru Padmasambhava Statue that can be seen from miles away, innovative Modern-Traditional Architecture that respects Buddhist principles while incorporating contemporary design, Panoramic Views of the surrounding hills, and serves as an important Pilgrimage Site for Buddhists.",
    visitingInfo: "Samdruptse is easily accessible and welcomes visitors throughout the year. The best time to visit is from February to May and September to mid-December.",
    conclusion: "Samdruptse represents the evolution of Buddhist architecture in Sikkim while maintaining its spiritual essence, making it a must-visit destination for those seeking both devotion and architectural wonder."
  },

  lingdum: {
    id: "lingdum",
    introduction: "Welcome to Lingdum Monastery, also known as Ranka Monastery.",
    fullDescription: "Lingdum Monastery, also called Ranka Monastery, is a newer monastery completed in 1999. Built in the Zurmang Kagyu tradition, it is renowned for its serene surroundings, handsome architecture, large courtyard, prayer hall, and serves as an important training center for monks.",
    locationInfo: "Situated in Ranka, East Sikkim, at about 4,300 feet altitude, this beautiful monastery is located 16 to 20 kilometers from Gangtok.",
    historicalInfo: "Completed in 1999, Lingdum represents modern monastery construction while maintaining traditional Buddhist architectural principles and spiritual practices.",
    featuresInfo: "The monastery belongs to the Zur Mang Kagyu Sect, features a spacious Large Courtyard perfect for ceremonies, houses an impressive 5-metre Buddha Statue, and is surrounded by Peace and Scenic Forests that enhance the meditative atmosphere.",
    visitingInfo: "Lingdum is easily accessible from Gangtok and is best visited from March to May and September to October when the weather is most favorable.",
    conclusion: "Lingdum Monastery demonstrates how traditional Buddhist values can be preserved in modern construction, offering visitors a peaceful retreat close to Sikkim's capital."
  },

  bermiok: {
    id: "bermiok",
    introduction: "Welcome to Bermiok Monastery, officially known as Bermiok Wosel Choling Monastery.",
    fullDescription: "Bermiok Wosel Choling Monastery belongs to the Karma Kagyu lineage and is located above Singtam in South Sikkim. This old gompa features a manilakhang and has been restored after suffering damage, offering valuable insights into local Buddhist practices and architecture.",
    locationInfo: "Located above Singtam in South Sikkim, at about 5,000 feet altitude, this monastery is just a few kilometers from Singtam town.",
    historicalInfo: "Originally founded in 1873, Bermiok has over 150 years of spiritual heritage. Despite facing damage over the years, it has been carefully restored to preserve its historical and religious significance.",
    featuresInfo: "The monastery follows the Karma Kagyu Order, houses a traditional Manilakhang Shrine, offers beautiful Scenic Views of the surrounding landscape, and serves the Local Community Worship needs of the area.",
    visitingInfo: "Bermiok has moderate accessibility and is best visited from March to June and September to December. The monastery provides a more intimate experience compared to larger tourist destinations.",
    conclusion: "Bermiok Monastery represents the grassroots level of Buddhist practice in Sikkim, showing how local communities maintain their spiritual traditions across generations."
  },

  lachung: {
    id: "lachung",
    introduction: "Welcome to Lachung Monastery, a serene Nyingma Buddhist gompa in the beautiful Lachung Valley.",
    fullDescription: "Lachung Monastery is a Nyingma Buddhist gompa established in 1880 in the picturesque Lachung Valley. Surrounded by rivers and spectacular mountain scenery, it serves as a serene religious center in North Sikkim.",
    locationInfo: "Located in Lachung, Mangan District, North Sikkim, at approximately 9,600 feet or 3,000 meters altitude. The monastery is situated in Lachung itself, about 50 kilometers from Mangan town.",
    historicalInfo: "Founded in 1880, this monastery has served the Lachung community for over 140 years, maintaining the Nyingma tradition of Tibetan Buddhism in this remote Himalayan valley.",
    featuresInfo: "The monastery follows the Nyingma sect of Buddhism, hosts an Annual mask dance festival that attracts visitors from across the region, is blessed with Mountain-river valley scenery of exceptional beauty, and is deeply integrated into the Cultural life of Lachung village.",
    visitingInfo: "Due to its high altitude and remote location, accessing Lachung can be difficult, especially during winter. The best time to visit is from April to June and September to November, though roads in North Sikkim can be challenging and weather-dependent.",
    conclusion: "Lachung Monastery offers one of the most authentic and remote Buddhist experiences in Sikkim, set against some of the most breathtaking Himalayan scenery in the region."
  },

  pelling_skywalk_chenrezig: {
    id: "pelling_skywalk_chenrezig",
    introduction: "Welcome to the Chenrezig Statue and Sky Walk in Pelling, a unique combination of spirituality and adventure.",
    fullDescription: "The Chenrezig Statue and Sky Walk near Pelling is a modern attraction that pairs a magnificent 137-foot Chenrezig or Avalokiteshvara statue with a glass skywalk. This innovative site combines spiritual pilgrimage with adventure tourism, offering panoramic views over valleys and the majestic Kanchenjunga range.",
    locationInfo: "Located near Pelling in West Sikkim, at approximately 7,200 feet or 2,195 meters above sea level, this attraction is just a few kilometers from Pelling town.",
    historicalInfo: "The statue and skywalk were opened on November 1st, 2018, making this one of the newest additions to Sikkim's spiritual landscape. Despite its recent construction, it has quickly become a major attraction.",
    featuresInfo: "The site features a towering 137-foot Chenrezig Statue representing the Buddhist deity of compassion, an innovative Glass skywalk or transparent walkway offering thrilling views, spectacular Panoramic Himalayan views including Kanchenjunga, traditional Prayer wheels and courtyard areas, creating a unique Adventure and pilgrimage mix.",
    visitingInfo: "The site has moderate accessibility, requiring some walking and stairs to reach the statue and skywalk. The best visiting time is from March to May and September to November when the mountain views are clearest.",
    conclusion: "The Chenrezig Statue and Sky Walk represents Sikkim's innovative approach to combining traditional Buddhism with modern tourism, creating an unforgettable experience that honors both spiritual devotion and adventure."
  },

  khechupelri: {
    id: "khechupelri",
    introduction: "Welcome to Khechupelri Monastery, a hidden spiritual sanctuary above the sacred Khecheopalri Lake.",
    fullDescription: "Khechupelri Monastery is situated above the famous Khecheopalri Lake, known as the wish-fulfilling lake. This lesser-known spiritual spot is deeply connected with local legends and offers exceptional tranquility, lakeside views, and forested paths. It remains refreshingly less visited compared to mainstream monasteries.",
    locationInfo: "Located above Khecheopalri Lake in West Sikkim, at approximately 6,000 feet or 1,830 meters altitude, in the Khecheopalri village area near Pelling.",
    historicalInfo: "Founded in 1760 AD, this monastery has over 260 years of spiritual heritage. It is intimately connected with the sacred lake below, which holds special significance in both Buddhist and local Lepcha traditions.",
    featuresInfo: "The monastery offers a beautiful Lakeside view of the wish-fulfilling lake, access to Forest trekking paths through pristine wilderness, connections to ancient Lepcha legends and local folklore, and maintains a Quiet and less touristy atmosphere perfect for contemplation.",
    visitingInfo: "Accessing Khechupelri can be challenging as it involves hill paths and trails, plus road access to the lake followed by a climb or hike. The best time to visit is from March to June and September to December.",
    conclusion: "Khechupelri Monastery offers one of the most peaceful and authentic spiritual experiences in Sikkim, where visitors can connect with both Buddhist teachings and the pristine natural environment of the sacred lake region."
  }
};

export function generateFullNarration(monastery: Monastery): string {
  const narration = monasteryNarrations[monastery.id];
  
  if (!narration) {
    return `Welcome to ${monastery.name}. ${monastery.description}`;
  }

  return [
    narration.introduction,
    narration.fullDescription,
    narration.locationInfo,
    narration.historicalInfo,
    narration.featuresInfo,
    narration.visitingInfo,
    narration.conclusion
  ].join(' ');
}

export function generateShortNarration(monastery: Monastery): string {
  const narration = monasteryNarrations[monastery.id];
  
  if (!narration) {
    return `${monastery.name}. ${monastery.description}`;
  }

  return [
    narration.introduction,
    narration.fullDescription,
    narration.locationInfo
  ].join(' ');
}

export function generateMapMarkerNarration(monastery: Monastery): string {
  const narration = monasteryNarrations[monastery.id];
  
  if (!narration) {
    return `${monastery.name}, located in ${monastery.location}`;
  }

  return `${narration.introduction} ${narration.locationInfo}`;
}
