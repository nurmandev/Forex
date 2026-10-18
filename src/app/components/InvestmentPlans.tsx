import { Check, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { InvestmentPlan } from "../types";
import { investmentPlans } from "../data/plans";

interface InvestmentPlansProps {
  onSelectPlan: (plan: InvestmentPlan) => void;
}

const planColors: Record<number, { bg: string; accent: string; badge: string }> = {
  1: { bg: "from-slate-50 to-gray-50", accent: "text-slate-700", badge: "bg-slate-200 text-slate-700" },
  2: { bg: "from-blue-50 to-indigo-50", accent: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  3: { bg: "from-blue-600 to-blue-700", accent: "text-white", badge: "bg-white/20 text-white" },
  4: { bg: "from-indigo-600 to-purple-700", accent: "text-white", badge: "bg-white/20 text-white" },
  5: { bg: "from-purple-700 to-pink-700", accent: "text-white", badge: "bg-white/20 text-white" },
  6: { bg: "from-gray-900 to-blue-900", accent: "text-white", badge: "bg-white/20 text-white" },
};

const formatRange = (plan: InvestmentPlan) =>
  plan.maxAmount >= 999999
    ? `$${plan.amount.toLocaleString()}+`
    : `$${plan.amount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}`;

export function InvestmentPlans({ onSelectPlan }: InvestmentPlansProps) {
  return (
    <section id="plans" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
            Investment Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Six tiers designed for every investor — from first-time traders to institutional-level capital. All plans deliver <strong>10–15%+ daily returns</strong> via automated MT4/MT5 execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {investmentPlans.map((plan) => {
            const colors = planColors[plan.id];
            const isDark = plan.id >= 3;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl bg-gradient-to-br ${colors.bg} overflow-hidden border ${
                  isDark ? "border-transparent" : plan.recommended ? "border-blue-400" : "border-gray-200"
                } hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                {plan.recommended && (
                  <div className="bg-white text-blue-600 text-xs font-bold text-center py-1.5 tracking-widest uppercase">
                    ★ Most Popular
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Plan label + name */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
                      Plan {plan.label}
                    </span>
                    {plan.recommended && (
                      <Badge className="bg-yellow-400 text-yellow-900 text-xs">Recommended</Badge>
                    )}
                  </div>

                  <h3 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>

                  {/* Investment range */}
                  <p className={`text-sm mb-4 ${isDark ? "text-white/60" : "text-gray-500"}`}>
                    Investment Range
                  </p>
                  <div className={`text-2xl font-extrabold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {formatRange(plan)}
                  </div>

                  {/* Returns highlight */}
                  <div className={`rounded-xl p-4 mb-5 flex items-center gap-3 ${
                    isDark ? "bg-white/15" : "bg-white border border-blue-100"
                  }`}>
                    <TrendingUp className={`w-5 h-5 flex-shrink-0 ${isDark ? "text-green-300" : "text-green-600"}`} />
                    <div>
                      <p className={`text-xs mb-0.5 ${isDark ? "text-white/60" : "text-gray-500"}`}>Daily Returns</p>
                      <p className={`text-lg font-bold ${isDark ? "text-green-300" : "text-green-600"}`}>
                        {plan.dailyProfit}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className={`text-xs mb-0.5 ${isDark ? "text-white/60" : "text-gray-500"}`}>Min. Withdrawal</p>
                      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                        ${plan.withdrawalLimit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.slice(0, 6).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? "text-green-300" : "text-blue-600"}`} />
                        <span className={isDark ? "text-white/80" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 6 && (
                      <li className={`text-xs ${isDark ? "text-white/50" : "text-gray-400"}`}>
                        +{plan.features.length - 6} more features
                      </li>
                    )}
                  </ul>

                  <Button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full font-semibold ${
                      isDark
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : plan.recommended
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            All plans include 24/7 support, SSL encryption, and automated risk management.
            Returns are generated via live forex markets — past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
}
