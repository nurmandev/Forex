import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { InvestmentPlan } from "../types";
import { investmentPlans } from "../data/plans";

interface InvestmentPlansProps {
  onSelectPlan: (plan: InvestmentPlan) => void;
}

export function InvestmentPlans({ onSelectPlan }: InvestmentPlansProps) {
  return (
    <section id="plans" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
            Choose Your Investment Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All plans include professional management, real-time tracking, and secure withdrawals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {investmentPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 ${
                plan.recommended ? 'border-blue-600' : 'border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="p-8 pb-6">
                <h3 className="text-2xl text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.amount}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Initial Investment
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Daily Returns</span>
                    <span className="text-blue-600 font-semibold">{plan.dailyProfit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Min. Withdrawal</span>
                    <span className="text-gray-900 font-semibold">${plan.withdrawalLimit}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full ${
                    plan.recommended 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900'
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            All plans include 24/7 support, SSL encryption, and automated risk management. 
            <a href="#" className="text-blue-600 hover:text-blue-700 ml-1 underline">
              Compare plans in detail →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
