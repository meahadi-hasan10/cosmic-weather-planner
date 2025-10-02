import Hero from "@/components/Hero";
import WeatherQuery from "@/components/WeatherQuery";
import WeatherResults from "@/components/WeatherResults";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WeatherQuery />
      <WeatherResults />
      <Footer />
    </div>
  );
};

export default Index;
