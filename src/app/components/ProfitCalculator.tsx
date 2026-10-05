import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ProfitCalculator() {
  const [investment, setInvestment] = useState(200);
  const [duration, setDuration] = useState(90);
  const [profitRate, setProfitRate] = useState(4);

  const calculateProfit = () => {
    const dailyProfit = (investment * profitRate) / 100;
    const totalProfit = dailyProfit * duration;
    const totalAmount = investment + totalProfit;
    return { dailyProfit, totalProfit, totalAmount };
  };

  const { dailyProfit, totalProfit, totalAmount } = calculateProfit();

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Profit Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate your potential earnings before you invest. Adjust the parameters to see how your profits can grow.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  Configure Your Investment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Amount */}
                <div className="space-y-3">
                  <Label htmlFor="investment">Investment Amount</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-green-600 min-w-[100px]">${investment}</span>
                    <Slider
                      id="investment"
                      min={100}
                      max={1000}
                      step={50}
                      value={[investment]}
                      onValueChange={(value) => setInvestment(value[0])}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$100</span>
                    <span>$1,000</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <Label htmlFor="duration">Investment Duration (Days)</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-green-600 min-w-[100px]">{duration}</span>
                    <Slider
                      id="duration"
                      min={30}
                      max={365}
                      step={15}
                      value={[duration]}
                      onValueChange={(value) => setDuration(value[0])}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>30 days</span>
                    <span>365 days</span>
                  </div>
                </div>

                {/* Profit Rate */}
                <div className="space-y-2">
                  <Label htmlFor="profitRate">Expected Daily Profit Rate</Label>
                  <Select value={profitRate.toString()} onValueChange={(val) => setProfitRate(Number(val))}>
                    <SelectTrigger id="profitRate">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2% - Conservative</SelectItem>
                      <SelectItem value="3">3% - Moderate</SelectItem>
                      <SelectItem value="4">4% - Balanced</SelectItem>
                      <SelectItem value="5">5% - Aggressive</SelectItem>
                      <SelectItem value="6">6% - High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Disclaimer: Calculations are estimates based on historical performance. Actual results may vary.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Projected Returns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-green-100 text-sm mb-1">Daily Profit</p>
                    <p className="text-3xl">${dailyProfit.toFixed(2)}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-green-100 text-sm mb-1">Total Profit ({duration} days)</p>
                    <p className="text-3xl">${totalProfit.toFixed(2)}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-green-100 text-sm mb-1">Total Amount (Investment + Profit)</p>
                    <p className="text-4xl">${totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-green-100 text-sm">ROI</p>
                      <p className="text-2xl">{((totalProfit / investment) * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-green-100 text-sm">Avg. Monthly</p>
                      <p className="text-2xl">${((totalProfit / duration) * 30).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm">
                    📈 Based on {profitRate}% daily profit rate over {duration} days, you could potentially earn ${totalProfit.toFixed(2)} in profit!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Ready to start earning? Choose a plan and begin your journey to financial freedom.
            </p>
            <button
              onClick={() => {
                const plans = document.getElementById("plans");
                if (plans) plans.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              View Investment Plans
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
