import { TrendingUp, ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section id="hero" className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
            Automate your forex trading in one space
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Let our expert traders and AI algorithms manage your MT4/MT5 account. 
            Earn consistent daily profits with zero trading experience required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              onClick={() => {
                const calc = document.getElementById("calculator");
                if (calc) calc.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-600 hover:text-gray-900 px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYzOTg3MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Forex Trading Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-24 text-center">
          <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider">
            Trusted by companies all over the world
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
            <div className="text-2xl font-bold text-gray-400">Binance</div>
            <div className="text-2xl font-bold text-gray-400">OANDA</div>
            <div className="text-2xl font-bold text-gray-400">MetaTrader</div>
            <div className="text-2xl font-bold text-gray-400">eToro</div>
            <div className="text-2xl font-bold text-gray-400">Plus500</div>
          </div>
        </div>
      </div>
    </section>
  );
}
