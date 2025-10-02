import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, MapPin, Search, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface WeatherVariable {
  id: string;
  label: string;
  description: string;
  unit: string;
}

const weatherVariables: WeatherVariable[] = [
  { id: "temp", label: "Temperature", description: "Air temperature extremes", unit: "°F" },
  { id: "precip", label: "Precipitation", description: "Rainfall and snowfall", unit: "mm" },
  { id: "wind", label: "Wind Speed", description: "Wind velocity", unit: "mph" },
  { id: "humidity", label: "Humidity", description: "Relative humidity", unit: "%" },
  { id: "pressure", label: "Air Pressure", description: "Atmospheric pressure", unit: "hPa" },
  { id: "cloud", label: "Cloud Cover", description: "Cloud coverage percentage", unit: "%" },
];

const WeatherQuery = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [selectedVariables, setSelectedVariables] = useState<string[]>(["temp", "precip"]);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleVariableToggle = (variableId: string) => {
    setSelectedVariables((prev) =>
      prev.includes(variableId)
        ? prev.filter((id) => id !== variableId)
        : [...prev, variableId]
    );
  };

  const handleQuery = async () => {
    if (!location || !date) return;
    
    setIsQuerying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsQuerying(false);
    
    // Scroll to results
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="query-section" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Configure Your Weather Query</h2>
            <p className="text-muted-foreground text-lg">
              Select location, date, and weather variables to analyze historical probabilities
            </p>
          </div>

          {/* Query Form */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-[var(--shadow-card)]">
            <div className="space-y-8">
              {/* Location Input */}
              <div className="space-y-3">
                <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Enter city name or coordinates (e.g., New York or 40.7128,-74.0060)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 bg-background/50 border-primary/30 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a location name or latitude/longitude coordinates
                </p>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Target Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal bg-background/50 border-primary/30 hover:border-primary",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-primary/30" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground">
                  Select the date you want to analyze weather probabilities for
                </p>
              </div>

              {/* Weather Variables Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Weather Variables</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weatherVariables.map((variable) => (
                    <Card
                      key={variable.id}
                      className={cn(
                        "p-4 cursor-pointer transition-all border-2",
                        selectedVariables.includes(variable.id)
                          ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]"
                          : "border-border hover:border-primary/50 bg-card/30"
                      )}
                      onClick={() => handleVariableToggle(variable.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedVariables.includes(variable.id)}
                          onCheckedChange={() => handleVariableToggle(variable.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="font-semibold">{variable.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {variable.description}
                          </div>
                          <div className="text-xs text-primary">Unit: {variable.unit}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleQuery}
                  disabled={!location || !date || selectedVariables.length === 0 || isQuerying}
                  className="flex-1 min-w-[200px]"
                >
                  {isQuerying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing Data...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Analyze Weather Probability
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  disabled={!location || !date}
                  className="gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export Query
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeatherQuery;
