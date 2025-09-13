import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar as CalendarIcon,
  Sun,
  Cloud,
  Snowflake,
  Umbrella,
  Users,
  Info,
  Map,
  Check,
  TrendingUp,
} from "lucide-react";
import { monasteries } from "@/data/monasteries";
import { travelPackages } from "@/data/tourPackages";

// Season information
const seasons = [
  {
    name: "Spring (March-May)",
    icon: Sun,
    description: "Pleasant weather, clear skies, and blooming rhododendrons. Perfect for photography and outdoor activities.",
    recommendation: "Highly Recommended",
    temp: "10°C to 22°C",
    rainfall: "Moderate",
    crowding: "Moderate",
    events: ["Losar Festival (Tibetan New Year)", "Saga Dawa"],
  },
  {
    name: "Summer (June-August)",
    icon: Cloud,
    description: "Monsoon season with frequent rainfall. Some roads may be affected, but landscapes are lush and green.",
    recommendation: "Plan Carefully",
    temp: "15°C to 25°C",
    rainfall: "Heavy",
    crowding: "Low",
    events: ["Drukpa Tsheshi", "Phang Lhabsol"],
  },
  {
    name: "Autumn (September-November)",
    icon: Sun,
    description: "Clear skies, comfortable temperatures, and excellent mountain views. Best time for photography.",
    recommendation: "Most Recommended",
    temp: "7°C to 20°C",
    rainfall: "Low",
    crowding: "High",
    events: ["Lhabab Duchen", "Kagyed Dance"],
  },
  {
    name: "Winter (December-February)",
    icon: Snowflake,
    description: "Cold temperatures with occasional snow. Some passes may be closed, but unique winter festivities.",
    recommendation: "For Adventure Seekers",
    temp: "-5°C to 10°C",
    rainfall: "Low (Snow)",
    crowding: "Low",
    events: ["Losar Festival", "Tsechu"],
  },
];

// Essential items list
const essentials = [
  {
    category: "Documentation",
    items: [
      "Valid ID proof",
      "Inner Line Permit (for restricted areas)",
      "Travel insurance",
      "Emergency contact numbers",
    ]
  },
  {
    category: "Clothing",
    items: [
      "Warm layers",
      "Waterproof jacket",
      "Comfortable walking shoes",
      "Traditional modest attire for monastery visits",
      "Sun hat",
    ]
  },
  {
    category: "Accessories",
    items: [
      "Sunscreen and sunglasses",
      "First aid kit",
      "Power bank",
      "Camera",
      "Water bottle",
    ]
  },
];

// Monastery etiquette
const etiquette = [
  {
    rule: "Dress Modestly",
    description: "Wear clothing that covers shoulders and knees. Remove shoes before entering temples.",
  },
  {
    rule: "Respect Silence",
    description: "Maintain quiet in prayer halls and during meditation times.",
  },
  {
    rule: "Photography Rules",
    description: "Ask permission before taking photos inside monasteries. Some areas may be restricted.",
  },
  {
    rule: "Clock-wise Direction",
    description: "Walk clockwise around religious structures and prayer wheels.",
  },
  {
    rule: "Sacred Objects",
    description: "Do not touch sacred objects or climb on religious structures.",
  },
];

const PlanVisit = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedSeason, setSelectedSeason] = useState("autumn");
  const [showPriceComparison, setShowPriceComparison] = useState(false);

  const handleGenerateItinerary = () => {
    setShowPriceComparison(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plan Your Visit
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to know for a meaningful monastery visit
          </p>
        </div>

        <Tabs defaultValue="when" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-2">
            <TabsTrigger value="when" className="text-sm md:text-base">
              When to Visit
            </TabsTrigger>
            <TabsTrigger value="prepare" className="text-sm md:text-base">
              What to Bring
            </TabsTrigger>
            <TabsTrigger value="etiquette" className="text-sm md:text-base">
              Monastery Etiquette
            </TabsTrigger>
            <TabsTrigger value="planner" className="text-sm md:text-base">
              Trip Planner
            </TabsTrigger>
          </TabsList>

          {/* When to Visit Tab */}
          <TabsContent value="when" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasons.map((season) => {
                const SeasonIcon = season.icon;
                return (
                  <Card key={season.name} className="transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SeasonIcon className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-xl">{season.name}</CardTitle>
                        </div>
                        <Badge variant={
                          season.recommendation === "Most Recommended" ? "default" :
                          season.recommendation === "Highly Recommended" ? "secondary" :
                          "outline"
                        }>
                          {season.recommendation}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {season.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold">Temperature</p>
                          <p>{season.temp}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Rainfall</p>
                          <p>{season.rainfall}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Crowd Level</p>
                          <p>{season.crowding}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Key Events</p>
                          <ul className="list-disc list-inside">
                            {season.events.map((event, index) => (
                              <li key={index}>{event}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* What to Bring Tab */}
          <TabsContent value="prepare" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {essentials.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Additional Considerations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Remember to check the weather forecast before your visit and pack accordingly.
                  Some monasteries are located at high altitudes, so acclimatization may be necessary.
                  It's also recommended to carry some cash as not all places accept cards.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monastery Etiquette Tab */}
          <TabsContent value="etiquette" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Respectful Visiting Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {etiquette.map((rule) => (
                  <div key={rule.rule} className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{rule.rule}</h3>
                      <p className="text-muted-foreground text-sm">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Monasteries are active places of worship. Please be mindful of ongoing ceremonies
                  and prayer times. Some monasteries may have specific visiting hours or may be
                  closed during certain ceremonies. It's always good to check in advance.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trip Planner Tab */}
          <TabsContent value="planner" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    Select Monasteries
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Packages</SelectItem>
                        <SelectItem value="budget">Budget Friendly</SelectItem>
                        <SelectItem value="comfort">Comfort</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {monasteries.map((monastery) => (
                      <div
                        key={monastery.id}
                        className="flex items-start p-4 rounded-lg border hover:bg-accent cursor-pointer"
                      >
                        <img
                          src={monastery.image}
                          alt={monastery.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{monastery.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {monastery.nearestTown}
                              </p>
                            </div>
                            <Badge variant="outline">Popular</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>2-3 hours visit</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4 text-muted-foreground" />
                              <span>Easy access</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-950 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Trip Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-blue-700 dark:text-blue-300">Select Dates</label>
                        <div className="overflow-x-auto -mx-6 px-6 py-2">
                          <div className="min-w-fit bg-gradient-to-br from-white to-blue-50 dark:from-slate-950 dark:to-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg shadow-sm">
                            <Calendar
                              mode="range"
                              selected={dateRange || { from: undefined, to: undefined }}
                              onSelect={(range) => setDateRange(range)}
                              numberOfMonths={2}
                              className="rounded-lg border shadow-sm bg-white dark:bg-slate-950"
                              classNames={{
                                months: "flex gap-4",
                                head_cell: "text-slate-500 font-medium text-sm",
                                cell: cn(
                                  "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
                                ),
                                day: cn(
                                  buttonVariants({ variant: "ghost" }),
                                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 dark:hover:bg-blue-800/30"
                                ),
                                day_range_start: "aria-selected:bg-blue-600 aria-selected:text-white hover:bg-blue-600 hover:text-white",
                                day_range_end: "aria-selected:bg-blue-600 aria-selected:text-white hover:bg-blue-600 hover:text-white",
                                day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Season</label>
                        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spring">Spring (March-May)</SelectItem>
                            <SelectItem value="summer">Summer (June-August)</SelectItem>
                            <SelectItem value="autumn">Autumn (September-November)</SelectItem>
                            <SelectItem value="winter">Winter (December-February)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Group Size</label>
                        <Select defaultValue="2">
                          <SelectTrigger>
                            <SelectValue placeholder="Number of travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3">3 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="5+">5+ People</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Preferences</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <Users className="h-4 w-4" /> Family Friendly
                          </Button>
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <Map className="h-4 w-4" /> Adventure
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                      onClick={handleGenerateItinerary}
                    >
                      Find Perfect Package
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-slate-950 border-indigo-200 dark:border-indigo-800">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      Price Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current Average</span>
                        <span className="font-medium">₹18,500</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Best Time to Book</span>
                        <Badge variant="outline" className="text-green-600">October</Badge>
                      </div>
                      <div className="h-[100px] w-full bg-muted/20 rounded-lg p-2 mt-4">
                        <div className="relative h-full w-full">
                          {[15000, 16000, 18500, 19000, 18500, 17000].map((price, i) => (
                            <div
                              key={i}
                              className="absolute bottom-0 bg-blue-600"
                              style={{
                                left: `${(i / 5) * 100}%`,
                                height: `${(price / 19000) * 100}%`,
                                width: '4px',
                              }}
                              title={`₹${price}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {showPriceComparison && (
              <div className="mt-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                      Price Comparison
                      <div className="flex items-center gap-4">
                        <img
                          src="https://www.goibibo.com/favicon.ico"
                          alt="Goibibo"
                          className="h-8 w-8"
                        />
                        <span className="text-lg">vs</span>
                        <img
                          src="https://www.makemytrip.com/favicon.ico"
                          alt="MakeMyTrip"
                          className="h-8 w-8"
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Goibibo Packages */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-600">Goibibo Packages</h3>
                        <div className="space-y-4">
                          {travelPackages.goibibo.map((pkg, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg border hover:border-blue-200 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{pkg.name}</h4>
                                <Badge variant="outline">{pkg.rating} ★</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{pkg.duration}</p>
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                {pkg.includes.map((item, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-blue-600">₹{pkg.price.toLocaleString()}</p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">View Details</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>{pkg.name} - Details</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4 space-y-6">
                                      {/* Price History Graph */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Price History</h4>
                                        <div className="h-[100px] w-full bg-muted/20 rounded-lg p-2">
                                          <div className="relative h-full w-full">
                                            {pkg.priceHistory.map((price, i) => (
                                              <div
                                                key={i}
                                                className="absolute bottom-0 bg-blue-600"
                                                style={{
                                                  left: `${(i / (pkg.priceHistory.length - 1)) * 100}%`,
                                                  height: `${(price / Math.max(...pkg.priceHistory)) * 100}%`,
                                                  width: '4px',
                                                }}
                                                title={`₹${price}`}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Package Breakdown */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Cost Breakdown</h4>
                                        <div className="space-y-2">
                                          {Object.entries(pkg.breakdown).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center">
                                              <span className="capitalize">{key}</span>
                                              <span>₹{value.toLocaleString()}</span>
                                            </div>
                                          ))}
                                          <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                                            <span>Total</span>
                                            <span>₹{pkg.price.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Reviews Section */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Reviews</h4>
                                        <div className="space-y-3">
                                          {pkg.reviews.map((review, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-muted/20">
                                              <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium">{review.user}</span>
                                                <Badge variant="outline">{review.rating} ★</Badge>
                                              </div>
                                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* MakeMyTrip Packages */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">MakeMyTrip Packages</h3>
                        <div className="space-y-4">
                          {travelPackages.makemytrip.map((pkg, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg border hover:border-red-200 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{pkg.name}</h4>
                                <Badge variant="outline">{pkg.rating} ★</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{pkg.duration}</p>
                              <div className="flex items-center gap-2 mb-3">
                                {pkg.includes.map((item, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-red-600">₹{pkg.price.toLocaleString()}</p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">View Details</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>{pkg.name} - Details</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4 space-y-6">
                                      {/* Price History Graph */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Price History</h4>
                                        <div className="h-[100px] w-full bg-muted/20 rounded-lg p-2">
                                          <div className="relative h-full w-full">
                                            {pkg.priceHistory.map((price, i) => (
                                              <div
                                                key={i}
                                                className="absolute bottom-0 bg-red-600"
                                                style={{
                                                  left: `${(i / (pkg.priceHistory.length - 1)) * 100}%`,
                                                  height: `${(price / Math.max(...pkg.priceHistory)) * 100}%`,
                                                  width: '4px',
                                                }}
                                                title={`₹${price}`}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Package Breakdown */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Cost Breakdown</h4>
                                        <div className="space-y-2">
                                          {Object.entries(pkg.breakdown).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center">
                                              <span className="capitalize">{key}</span>
                                              <span>₹{value.toLocaleString()}</span>
                                            </div>
                                          ))}
                                          <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                                            <span>Total</span>
                                            <span>₹{pkg.price.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Reviews Section */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Reviews</h4>
                                        <div className="space-y-3">
                                          {pkg.reviews.map((review, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-muted/20">
                                              <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium">{review.user}</span>
                                                <Badge variant="outline">{review.rating} ★</Badge>
                                              </div>
                                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

              <div className="mt-6 flex gap-4 justify-center">
                      <a href="https://www.goibibo.com/hotels/hotels-in-sikkim-india-ct/" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          View on Goibibo
                        </Button>
                      </a>
                      <a href="https://www.makemytrip.com/hotels/sikkim-hotels.html" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                          View on MakeMyTrip
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlanVisit;