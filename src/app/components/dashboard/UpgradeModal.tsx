import { ArrowUpCircle, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { investmentPlans } from "../../data/plans";
import { toast } from "sonner";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlanId: number;
}

export function UpgradeModal({ isOpen, onClose, currentPlanId }: UpgradeModalProps) {
  const availablePlans = investmentPlans.filter(plan => plan.id > currentPlanId);

  const handleUpgrade = (planName: string) => {
    toast.success(`Plan upgrade to ${planName} initiated! Our team will contact you within 24 hours to complete the upgrade.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Increase your profit potential with a higher-tier investment plan
          </DialogDescription>
        </DialogHeader>

        {availablePlans.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">You're on the Best Plan!</h3>
            <p className="text-gray-600">
              You're already subscribed to our premium plan with the highest profit potential.
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
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl text-gray-900">${plan.amount}</span>
                    <span className="text-gray-500">investment</span>
                  </div>
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
                    onClick={() => handleUpgrade(plan.name)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <ArrowUpCircle className="w-4 h-4 mr-2" />
                    Upgrade to {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-blue-900 mb-2">Upgrade Benefits:</p>
          <ul className="text-sm text-blue-800 space-y-1 ml-4">
            <li>• Higher daily profit percentages</li>
            <li>• Enhanced features and analytics</li>
            <li>• Priority customer support</li>
            <li>• Your current profits are preserved</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}