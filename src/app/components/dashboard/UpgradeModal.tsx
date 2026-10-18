import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { investmentPlans } from "../../data/plans";
import { InvestmentPlan } from "../../types";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePlanIds: number[];
  onAddPlan: (planId: number) => void;
}

export function UpgradeModal({ isOpen, onClose, activePlanIds, onAddPlan }: UpgradeModalProps) {
  const availablePlans = investmentPlans.filter(plan => !activePlanIds.includes(plan.id));
  const isSubscribedToAll = availablePlans.length === 0;

  const handleAddPlan = (plan: InvestmentPlan) => {
    onAddPlan(plan.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Investment Plan</DialogTitle>
          <DialogDescription>
            Add more investment plans to diversify your portfolio and increase profit potential
          </DialogDescription>
        </DialogHeader>

        {isSubscribedToAll ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">You're on All Plans!</h3>
            <p className="text-gray-600">
              You're already subscribed to every available investment plan.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {availablePlans.map((plan) => (
              <Card key={plan.id} className="relative">
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
                  <h3 className="text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.maxAmount >= 999999
                        ? `$${plan.amount.toLocaleString()}+`
                        : `$${plan.amount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Investment Range</p>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Daily Profit Range</span>
                      <span className="text-blue-600">{plan.dailyProfit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">Min. Withdrawal</span>
                      <span className="text-gray-900 text-sm">${plan.withdrawalLimit}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => handleAddPlan(plan)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Add {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-blue-900 mb-2">Benefits of Multiple Plans:</p>
          <ul className="text-sm text-blue-800 space-y-1 ml-4">
            <li>• Diversify across different investment tiers</li>
            <li>• Combine profit rates from multiple plans</li>
            <li>• Higher total withdrawal potential</li>
            <li>• Each plan managed independently</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
