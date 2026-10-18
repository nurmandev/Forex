import { useState, useEffect } from "react";
import { DollarSign, Bitcoin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { mockWithdrawalRequests } from "../../data/admin-auth";
import { toast } from "sonner";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  minimumWithdrawal: number;
  user: { email: string; name: string };
  onWithdrawalComplete: (amount: number, method: string, details: { cryptoWallet?: string; mpayId?: string }) => void;
}

export function WithdrawModal({ isOpen, onClose, availableBalance, minimumWithdrawal, user, onWithdrawalComplete }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");
  const [cryptoWallet, setCryptoWallet] = useState("");
  const [mpayId, setMpayId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setMethod("crypto");
      setCryptoWallet("");
      setMpayId("");
      setIsProcessing(false);
    }
  }, [isOpen]);

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

    const details: { cryptoWallet?: string; mpayId?: string } = {};
    if (method === "crypto") details.cryptoWallet = cryptoWallet.trim();
    if (method === "mpay") details.mpayId = mpayId.trim();

    // Record withdrawal request so admin can see it
    mockWithdrawalRequests.push({
      id: `wd-${Date.now()}`,
      userId: user.email,
      userName: user.name,
      userEmail: user.email,
      amount: withdrawAmount,
      paymentMethod: method as "crypto" | "mpay",
      ...details,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // Notify parent to add to user's transactions and redirect
    onWithdrawalComplete(withdrawAmount, method, details);

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAmount("");
      setCryptoWallet("");
      setMpayId("");
      toast.success(`Withdrawal request of $${withdrawAmount.toFixed(2)} submitted! Pending admin approval.`);
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
                <SelectItem value="crypto">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4" />
                    <span>Crypto (USDT TRC20)</span>
                  </div>
                </SelectItem>
                <SelectItem value="mpay">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>MPay ID</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {method === "crypto" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cryptoWallet">USDT (TRC20) Wallet Address</Label>
                <Input
                  id="cryptoWallet"
                  placeholder="TXYZ1234567890..."
                  value={cryptoWallet}
                  onChange={(e) => setCryptoWallet(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Withdrawal will be sent to this USDT TRC20 wallet address.</p>
              </div>
            </>
          )}

          {method === "mpay" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="mpayId">MPay ID</Label>
                <Input
                  id="mpayId"
                  placeholder="Enter your MPay ID"
                  value={mpayId}
                  onChange={(e) => setMpayId(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Provide your MPay ID registered on our partner website.</p>
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
