import { useState } from "react";
import { Shield, AlertCircle, CreditCard, Building2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { InvestmentPlan, UserData } from "../types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface SubscriptionModalProps {
  plan: InvestmentPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userData: UserData) => void;
}

export function SubscriptionModal({ plan, isOpen, onClose, onConfirm }: SubscriptionModalProps) {
  const [step, setStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mt4Username: "",
    mt4Password: "",
    confirmPassword: "",
    mt4Server: "",
    accountType: "MT4",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plan && formData.mt4Password === formData.confirmPassword) {
      onConfirm({
        name: formData.name,
        email: formData.email,
        mt4Account: formData.mt4Username,
        mt4Password: formData.mt4Password,
        planId: plan.id,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setStep(1);
    setAgreedToTerms(false);
    setPaymentMethod("card");
    setFormData({
      name: "",
      email: "",
      mt4Username: "",
      mt4Password: "",
      confirmPassword: "",
      mt4Server: "",
      accountType: "MT4",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Subscribe to {plan.name}</DialogTitle>
          <DialogDescription>
            Complete your subscription in a few simple steps
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className="text-xs text-gray-600">Plan Details</span>
          </div>
          <div className={`h-1 flex-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className="text-xs text-gray-600">Payment</span>
          </div>
          <div className={`h-1 flex-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 3 ? <Check className="w-5 h-5" /> : '3'}
            </div>
            <span className="text-xs text-gray-600">MT4/MT5</span>
          </div>
          <div className={`h-1 flex-1 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 4 ? <Check className="w-5 h-5" /> : '4'}
            </div>
            <span className="text-xs text-gray-600">Confirm</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Plan Details & Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{plan.name}</h4>
                    <p className="text-gray-600">Investment Range: <span className="font-semibold">{plan.maxAmount >= 999999 ? `$${plan.amount.toLocaleString()}+` : `$${plan.amount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}`}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 text-3xl font-bold">{plan.dailyProfit}</p>
                    <p className="text-gray-600 text-sm">Daily Profit</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-gray-500 mb-1">Min. Duration</p>
                    <p className="text-gray-900 font-semibold">{plan.minDuration} days</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-gray-500 mb-1">Min. Withdrawal</p>
                    <p className="text-gray-900 font-semibold">${plan.withdrawalLimit}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-gray-500 mb-1">Total Features</p>
                    <p className="text-gray-900 font-semibold">{plan.features.length}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      className="h-11"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-900 text-sm font-medium mb-1">Your Privacy Matters</p>
                  <p className="text-blue-700 text-sm">
                    We use bank-level encryption to protect your data. Your information is never shared with third parties.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!formData.name || !formData.email}
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h4>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Credit/Debit Card</p>
                              <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or Amex</p>
                            </div>
                          </Label>
                        </div>
                        {paymentMethod === 'card' && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>

                    <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'bank' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="cursor-pointer flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Bank Transfer</p>
                              <p className="text-sm text-gray-500">Direct transfer from your bank</p>
                            </div>
                          </Label>
                        </div>
                        {paymentMethod === 'bank' && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>

                    <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'crypto' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="cursor-pointer flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-bold">₿</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Cryptocurrency</p>
                              <p className="text-sm text-gray-500">Pay with Bitcoin, Ethereum, or USDT</p>
                            </div>
                          </Label>
                        </div>
                        {paymentMethod === 'crypto' && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-900 text-sm">
                  <strong>Note:</strong> For this demo, payment processing is simulated. In production, you would be redirected to a secure payment gateway.
                </p>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setStep(3)} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: MT4/MT5 Credentials */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Trading Account</h4>
                <p className="text-gray-600 text-sm">Enter your MT4 or MT5 credentials to link your trading account</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-900 text-sm font-medium mb-1">Important Information</p>
                  <p className="text-yellow-700 text-sm">
                    We need read-only access to your MT4/MT5 account to execute automated trades. Your credentials are encrypted with military-grade security and will be reviewed by our admin team.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type *</Label>
                  <RadioGroup value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MT4" id="mt4" />
                        <Label htmlFor="mt4" className="cursor-pointer">MetaTrader 4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MT5" id="mt5" />
                        <Label htmlFor="mt5" className="cursor-pointer">MetaTrader 5</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mt4Username">Account Username/Login *</Label>
                  <Input
                    id="mt4Username"
                    value={formData.mt4Username}
                    onChange={(e) => handleInputChange("mt4Username", e.target.value)}
                    placeholder="Enter your MT4/MT5 username or login ID"
                    className="h-11"
                    required
                  />
                  <p className="text-xs text-gray-500">This is your account login ID or username</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mt4Server">Server Name *</Label>
                  <Input
                    id="mt4Server"
                    value={formData.mt4Server}
                    onChange={(e) => handleInputChange("mt4Server", e.target.value)}
                    placeholder="e.g., ICMarkets-Demo01"
                    className="h-11"
                    required
                  />
                  <p className="text-xs text-gray-500">Your broker's server name (found in MT4/MT5 settings)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mt4Password">Account Password *</Label>
                  <Input
                    id="mt4Password"
                    type="password"
                    value={formData.mt4Password}
                    onChange={(e) => handleInputChange("mt4Password", e.target.value)}
                    placeholder="Enter your MT4/MT5 password"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Re-enter your password"
                    className="h-11"
                    required
                  />
                </div>

                {formData.mt4Password && formData.confirmPassword && formData.mt4Password !== formData.confirmPassword && (
                  <p className="text-red-600 text-sm">Passwords do not match</p>
                )}
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setStep(4)} 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={
                    !formData.mt4Username || 
                    !formData.mt4Server || 
                    !formData.mt4Password || 
                    formData.mt4Password !== formData.confirmPassword
                  }
                >
                  Review Order
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Review & Confirm</h4>
                <p className="text-gray-600 text-sm">Please review your subscription details before confirming</p>
              </div>

              <div className="space-y-4">
                {/* Plan Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Plan Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium text-gray-900">{plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Range:</span>
                      <span className="font-medium text-gray-900">{plan.maxAmount >= 999999 ? `$${plan.amount.toLocaleString()}+` : `$${plan.amount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Profit:</span>
                      <span className="font-medium text-blue-600">{plan.dailyProfit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min. Duration:</span>
                      <span className="font-medium text-gray-900">{plan.minDuration} days</span>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Personal Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{formData.email}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Payment Method</h5>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 capitalize">{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Cryptocurrency'}</span>
                  </div>
                </div>

                {/* Trading Account */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Trading Account</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Type:</span>
                      <span className="font-medium text-gray-900">{formData.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Username:</span>
                      <span className="font-medium text-gray-900">{formData.mt4Username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Server:</span>
                      <span className="font-medium text-gray-900">{formData.mt4Server}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy. I understand that:
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Forex trading involves risk and I may lose my investment</li>
                    <li>• My credentials will be securely stored and reviewed by admin</li>
                    <li>• Subscription will be in "Pending" status until admin approval</li>
                    <li>• Past performance does not guarantee future results</li>
                  </ul>
                </Label>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={!agreedToTerms}
                  className="bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Complete Subscription
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
