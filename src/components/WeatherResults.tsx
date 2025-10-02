import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, AlertTriangle, CheckCircle, Cloud } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data for demonstration
const temperatureData = [
  { month: "Jan", avg: 45, high: 65, low: 25, probability: 15 },
  { month: "Feb", avg: 48, high: 68, low: 28, probability: 12 },
  { month: "Mar", avg: 55, high: 75, low: 35, probability: 18 },
  { month: "Apr", avg: 65, high: 85, low: 45, probability: 25 },
  { month: "May", avg: 75, high: 95, low: 55, probability: 35 },
  { month: "Jun", avg: 85, high: 105, low: 65, probability: 45 },
  { month: "Jul", avg: 90, high: 110, low: 70, probability: 55 },
  { month: "Aug", avg: 88, high: 108, low: 68, probability: 50 },
  { month: "Sep", avg: 80, high: 100, low: 60, probability: 40 },
  { month: "Oct", avg: 68, high: 88, low: 48, probability: 28 },
  { month: "Nov", avg: 55, high: 75, low: 35, probability: 20 },
  { month: "Dec", avg: 48, high: 68, low: 28, probability: 16 },
];

const precipitationData = [
  { month: "Jan", rainfall: 3.5, probability: 25 },
  { month: "Feb", rainfall: 3.0, probability: 22 },
  { month: "Mar", rainfall: 4.2, probability: 30 },
  { month: "Apr", rainfall: 3.8, probability: 28 },
  { month: "May", rainfall: 4.5, probability: 35 },
  { month: "Jun", rainfall: 3.2, probability: 24 },
  { month: "Jul", rainfall: 2.8, probability: 20 },
  { month: "Aug", rainfall: 3.0, probability: 22 },
  { month: "Sep", rainfall: 3.5, probability: 26 },
  { month: "Oct", rainfall: 4.0, probability: 30 },
  { month: "Nov", rainfall: 4.2, probability: 32 },
  { month: "Dec", rainfall: 3.8, probability: 28 },
];

const WeatherResults = () => {
  const handleExport = (format: 'csv' | 'json') => {
    // Mock export functionality
    console.log(`Exporting data as ${format.toUpperCase()}`);
  };

  return (
    <section id="results-section" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Weather Probability Analysis</h2>
            <p className="text-muted-foreground text-lg">
              Historical data analysis for your selected location and timeframe
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Extreme Heat Risk</div>
                  <div className="text-3xl font-bold text-primary">45%</div>
                  <div className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>High probability</span>
                  </div>
                </div>
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Precipitation Risk</div>
                  <div className="text-3xl font-bold text-accent">28%</div>
                  <div className="text-sm flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    <span>Moderate chance</span>
                  </div>
                </div>
                <Cloud className="w-8 h-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Favorable Conditions</div>
                  <div className="text-3xl font-bold" style={{ color: 'hsl(var(--success))' }}>72%</div>
                  <div className="text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Good weather likely</span>
                  </div>
                </div>
                <CheckCircle className="w-8 h-8" style={{ color: 'hsl(var(--success))' }} />
              </div>
            </Card>
          </div>

          {/* Temperature Analysis Chart */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-[var(--shadow-card)]">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Temperature Probability Analysis</h3>
                <p className="text-muted-foreground">
                  Historical temperature ranges and extreme heat probability by month
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureData}>
                    <defs>
                      <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="probability"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorProb)"
                      name="Extreme Heat Probability (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Avg Temperature (°F)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Precipitation Analysis Chart */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-[var(--shadow-card)]">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Precipitation Probability</h3>
                <p className="text-muted-foreground">
                  Historical rainfall patterns and heavy precipitation likelihood
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={precipitationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="rainfall" fill="hsl(var(--accent))" name="Avg Rainfall (inches)" />
                    <Bar dataKey="probability" fill="hsl(var(--primary))" name="Heavy Rain Probability (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Export Analysis Results</h3>
                <p className="text-muted-foreground">
                  Download the complete dataset with metadata and source links
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => handleExport('csv')} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button variant="default" onClick={() => handleExport('json')} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export JSON
                </Button>
              </div>
            </div>
          </Card>

          {/* Data Sources */}
          <Card className="p-6 bg-gradient-to-br from-secondary/50 to-secondary/20 border-border/50">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Data Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-semibold text-primary">NASA POWER Project</div>
                  <a
                    href="https://power.larc.nasa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary underline block"
                  >
                    power.larc.nasa.gov
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-primary">NASA Earth Data</div>
                  <a
                    href="https://www.earthdata.nasa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary underline block"
                  >
                    earthdata.nasa.gov
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-primary">NASA Open Data</div>
                  <a
                    href="https://data.nasa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary underline block"
                  >
                    data.nasa.gov
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-primary">NASA API Portal</div>
                  <a
                    href="https://api.nasa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary underline block"
                  >
                    api.nasa.gov
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeatherResults;
