import { useState, useEffect } from "react";
import { Bitcoin, CreditCard, Copy, Check, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { InvestmentPlan } from "../../types";
import { mockPaymentRequests } from "../../data/admin-auth";
import { toast } from "sonner";

// Admin crypto wallet address (USDT TRC20)
const ADMIN_CRYPTO_WALLET = "TXYZ1234567890abcdefghijklmnopqrstuvwxyz";

interface PaymentModalProps {
  plan: InvestmentPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (planId: number, paymentMethod: "crypto" | "mpay", details: { cryptoWallet?: string; mpayId?: string }) => void;
}

export function PaymentModal({ plan, isOpen, onClose, onConfirm }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "mpay" | null>(null);
  const [mpayId, setMpayId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset payment state when modal opens so it always shows fresh options
  useEffect(() => {
    if (isOpen) {
      setPaymentMethod(null);
      setMpayId("");
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!plan) return null;

  const handleSubmit = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (paymentMethod === "mpay" && !mpayId.trim()) {
      toast.error("Please enter your MPay ID");
      return;
    }

    const method = paymentMethod;
    setIsProcessing(true);
    const details: { cryptoWallet?: string; mpayId?: string } = {};

    if (method === "crypto") {
      details.cryptoWallet = ADMIN_CRYPTO_WALLET;
    } else {
      details.mpayId = mpayId.trim();
    }

    // Simulate processing then confirm
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(plan.id, method, details);
      onClose();
    }, 1500);
  };

  const copyWallet = () => {
    navigator.clipboard.writeText(ADMIN_CRYPTO_WALLET);
    toast.success("Wallet address copied to clipboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment for {plan.name}</DialogTitle>
          <DialogDescription>
            Securely complete your investment to activate the plan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-1">{plan.name}</h4>
                <p className="text-gray-600">
                  {plan.maxAmount >= 999999
                    ? `$${plan.amount.toLocaleString()}+`
                    : `$${plan.amount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 text-3xl font-bold">{plan.dailyProfit}</p>
                <p className="text-gray-600 text-sm">Daily Profit</p>
              </div>
            </div>
            <div className="flex justify-between text-sm mt-4">
              <span className="text-gray-500">Amount to Pay</span>
              <span className="font-bold text-gray-900">${plan.amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          {!paymentMethod && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Choose Payment Method</h4>

              <div className="space-y-3">
                {/* Option 1: Direct Crypto */}
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`w-full border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "crypto"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Bitcoin className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Direct Crypto</p>
                      <p className="text-sm text-gray-500">Pay with USDT (TRC20)</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-600">Select</span>
                </button>

                {/* Option 2: MPay ID */}
                <button
                  onClick={() => setPaymentMethod("mpay")}
                  className={`w-full border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "mpay"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">MPay ID</p>
                      <p className="text-sm text-gray-500">Verify ID from partner website</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-600">Select</span>
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-900 text-sm">
                  <strong>Note:</strong> For this demo, payment processing is simulated. Admin will review
                  and approve your payment request.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Select a method above
                </Button>
              </div>
            </div>
          )}

          {/* Crypto Payment Details */}
          {paymentMethod === "crypto" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Send USDT (TRC20) to:</h4>
                <button
                  onClick={copyWallet}
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Bitcoin className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-mono text-gray-900 truncate">{ADMIN_CRYPTO_WALLET}</p>
                  <p className="text-xs text-gray-500">USDT TRC20 Wallet Address</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-900 text-sm">
                  <strong>Important:</strong> Send exactly <strong>${plan.amount.toLocaleString()}</strong> USDT (TRC20) to the address above.
                  Admin will verify the transaction and activate your plan.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setPaymentMethod(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" /> Submit Payment Request
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* MPay ID Payment */}
          {paymentMethod === "mpay" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Enter MPay ID</h4>
                <p className="text-gray-600 text-sm">
                  Provide your MPay ID registered on our partner website for verification.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mpayId">MPay ID *</Label>
                  <Input
                    id="mpayId"
                    type="text"
                    value={mpayId}
                    onChange={(e) => setMpayId(e.target.value)}
                    placeholder="Enter your MPay ID"
                    className="h-11"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Your MPay ID must be registered on the partner payment website.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-purple-900 text-sm">
                    <strong>How it works:</strong> Enter your MPay ID below. Our admin team will verify
                    the ID on the partner website and approve your payment once confirmed.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setPaymentMethod(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing || !mpayId.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" /> Submit Payment Request
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
