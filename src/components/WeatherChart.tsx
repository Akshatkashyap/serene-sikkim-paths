import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, CloudRain, Thermometer } from "lucide-react";

interface WeatherDataPoint {
  month: string;
  temperature: number;
  rainfall: number;
  visitors: number;
  suitability: number;
}

interface WeatherChartProps {
  weatherData: WeatherDataPoint[];
  monasteryName?: string;
}

const WeatherChart = ({
  weatherData,
  monasteryName = "monastery",
}: WeatherChartProps) => {
  return (
    <Card className="soft-shadow">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Sun className="h-5 w-5 text-monastery-gold" />
          Best Time to Visit - Weather Guide
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on weather conditions and tourist season data for{" "}
          {monasteryName}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tourist Suitability Chart */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">
            Tourist Suitability Index
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "suitability")
                    return [`${value}%`, "Visit Suitability"];
                  if (name === "visitors")
                    return [`${value}%`, "Tourist Volume"];
                  return [value, name];
                }}
                labelStyle={{ color: "#1f2937" }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="suitability" fill="#dc2626" radius={2} />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
              <Legend />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Weather Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-sm text-green-800 dark:text-green-200">
                Peak Season
              </span>
            </div>
            <p className="text-xs text-green-700 dark:text-green-300">
              {monasteryName.includes("Pemayangtse")
                ? "April-May, Oct-Nov"
                : monasteryName.includes("Tashiding")
                  ? "March-May, Oct"
                  : monasteryName.includes("Phodong")
                    ? "Apr-May, Oct-Nov"
                    : "March-May, Oct-Nov"}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              {monasteryName.includes("Pemayangtse")
                ? "Clear mountain views, cool weather"
                : monasteryName.includes("Enchey")
                  ? "Perfect urban monastery visits"
                  : "Clear skies, perfect weather"}
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <CloudRain className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-sm text-blue-800 dark:text-blue-200">
                Monsoon
              </span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {monasteryName.includes("Pemayangtse")
                ? "June-September"
                : monasteryName.includes("Phodong")
                  ? "July-September"
                  : "June-September"}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {monasteryName.includes("Pemayangtse")
                ? "Heaviest rainfall in Sikkim"
                : monasteryName.includes("Tashiding")
                  ? "River crossings difficult"
                  : "Heavy rainfall, limited access"}
            </p>
          </div>
        </div>

        {/* Monthly Highlights */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Monthly Highlights</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-monastery-red/10 rounded">
              <span className="font-medium text-monastery-red">
                {monasteryName.includes("Pemayangtse")
                  ? "April-May:"
                  : monasteryName.includes("Phodong")
                    ? "April-May:"
                    : "March-May:"}
              </span>
              <span>
                {monasteryName.includes("Pemayangtse")
                  ? "Cool mountain air, Kanchenjunga views, rhododendron blooms"
                  : monasteryName.includes("Enchey")
                    ? "Pleasant urban visits, clear city views, comfortable walking"
                    : monasteryName.includes("Tashiding")
                      ? "Sacred festivals season, river confluence views, pilgrimage time"
                      : monasteryName.includes("Phodong")
                        ? "Gateway to North Sikkim, alpine flowers, clear trails"
                        : monasteryName.includes("Labrang")
                          ? "Trekking preparation season, Kanchenjunga base views"
                          : "Ideal weather, blooming rhododendrons, clear mountain views"}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-mountain-blue/10 rounded">
              <span className="font-medium text-mountain-blue">
                October-November:
              </span>
              <span>
                {monasteryName.includes("Pemayangtse")
                  ? "Spectacular autumn colors, crystal clear peak views"
                  : monasteryName.includes("Enchey")
                    ? "Perfect for Gangtok city exploration, comfortable temperatures"
                    : monasteryName.includes("Tashiding")
                      ? "Post-monsoon river beauty, sacred water ceremonies"
                      : monasteryName.includes("Phodong")
                        ? "Pre-winter tranquility, last chance before heavy snow"
                        : monasteryName.includes("Labrang")
                          ? "Post-trek recovery, historical site exploration"
                          : "Post-monsoon clarity, perfect for photography, pleasant temperatures"}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
              <span className="font-medium">December-February:</span>
              <span>
                {monasteryName.includes("Pemayangtse")
                  ? "Snow-capped peaks, winter meditation retreats, fewer crowds"
                  : monasteryName.includes("Enchey")
                    ? "Winter festivals in Gangtok, cozy monastery visits"
                    : monasteryName.includes("Phodong")
                      ? "Harsh winters, limited access, local festivals only"
                      : "Cold but clear, fewer crowds, winter festivals"}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Temperature and Rainfall Details */}
        <div>
          <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Weather Overview
          </h4>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis yAxisId="temp" fontSize={10} />
              <YAxis yAxisId="rain" orientation="right" fontSize={10} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "temperature")
                    return [`${value}°C`, "Temperature"];
                  if (name === "rainfall") return [`${value}mm`, "Rainfall"];
                  return [value, name];
                }}
                labelStyle={{ color: "#1f2937" }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
              <Bar
                yAxisId="rain"
                dataKey="rainfall"
                fill="#3b82f6"
                opacity={0.7}
                radius={2}
              />
              <Legend />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Weather Tips */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Location-Specific Tips</h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded">
              <span className="font-medium text-yellow-800 dark:text-yellow-200">
                Best Photography:
              </span>
              <span className="text-yellow-700 dark:text-yellow-300 ml-1">
                {monasteryName.includes("Pemayangtse")
                  ? "Early morning for Kanchenjunga sunrise, October-November"
                  : monasteryName.includes("Enchey")
                    ? "Evening golden hour from city viewpoint, March-May"
                    : monasteryName.includes("Tashiding")
                      ? "Sacred chortens at sunset, March-April"
                      : monasteryName.includes("Phodong")
                        ? "Alpine backdrop shots, April-May before monsoon"
                        : monasteryName.includes("Labrang")
                          ? "Historic coronation site, April-May clear weather"
                          : "October-November for clearest mountain views"}
              </span>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
              <span className="font-medium text-blue-800 dark:text-blue-200">
                Access Advisory:
              </span>
              <span className="text-blue-700 dark:text-blue-300 ml-1">
                {monasteryName.includes("Pemayangtse")
                  ? "Steep mountain roads, avoid monsoons (900mm+ rain)"
                  : monasteryName.includes("Enchey")
                    ? "Easy city access, only light rain concerns"
                    : monasteryName.includes("Tashiding")
                      ? "River crossing required, dangerous during monsoons"
                      : monasteryName.includes("Phodong")
                        ? "Remote North Sikkim location, heavy snow in winter"
                        : monasteryName.includes("Labrang")
                          ? "Trek preparation needed, check trail conditions"
                          : "Roads may be slippery during July-August"}
              </span>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded">
              <span className="font-medium text-purple-800 dark:text-purple-200">
                Cultural Events:
              </span>
              <span className="text-purple-700 dark:text-purple-300 ml-1">
                {monasteryName.includes("Pemayangtse")
                  ? "Chaam dance in December, Losar in February"
                  : monasteryName.includes("Enchey")
                    ? "Annual Cham festival in November-December"
                    : monasteryName.includes("Tashiding")
                      ? "Sacred Bum Chu festival in January-February"
                      : monasteryName.includes("Phodong")
                        ? "Traditional North Sikkim festivals in winter"
                        : monasteryName.includes("Labrang")
                          ? "Historical reenactments, coronation anniversary"
                          : "February for Losar, May-June for Buddhist festivals"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
