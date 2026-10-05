import { useState } from "react";
import { DollarSign, CreditCard, Building2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  minimumWithdrawal: number;
}

export function WithdrawModal({ isOpen, onClose, availableBalance, minimumWithdrawal }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount < minimumWithdrawal) {
      toast.error(`Minimum withdrawal amount is $${minimumWithdrawal}`);
      return;
    }
    
    if (withdrawAmount > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Withdrawal of $${withdrawAmount.toFixed(2)} initiated! Funds will be processed within 24-48 hours.`);
      setIsProcessing(false);
      setAmount("");
      onClose();
    }, 1500);
  };

  const setMaxAmount = () => {
    setAmount(availableBalance.toFixed(2));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Request a withdrawal from your wallet balance
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-2">Available Balance</p>
          <p className="text-3xl text-gray-900">${availableBalance.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">Minimum withdrawal: ${minimumWithdrawal}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Withdrawal Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-10"
                required
              />
              <button
                type="button"
                onClick={setMaxAmount}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
              >
                Max
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Withdrawal Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </div>
                </SelectItem>
                <SelectItem value="card">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Debit Card</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {method === "bank" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input
                  id="accountName"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="1234567890"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="Your Bank"
                  required
                />
              </div>
            </>
          )}

          {method === "card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  required
                />
              </div>
            </>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Processing time: 24-48 hours. A $2 processing fee applies to withdrawals under $100.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing || !amount || parseFloat(amount) < minimumWithdrawal}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isProcessing ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}