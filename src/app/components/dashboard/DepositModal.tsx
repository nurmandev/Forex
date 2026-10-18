import { useState, useEffect } from "react";
import { DollarSign, Bitcoin, Phone, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { mockDepositRequests } from "../../data/admin-auth";
import { toast } from "sonner";

// Admin USDT (TRC20) deposit address - users send funds here
const ADMIN_USDT_DEPOSIT_ADDRESS = "TXYZ1234567890abcdefghijklmnopqrstuvwxyz";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { email: string; name: string };
  onDepositComplete: (amount: number, method: string, details: { cryptoWallet?: string; mpayId?: string; transactionId?: string }) => void;
}

export function DepositModal({ isOpen, onClose, user, onDepositComplete }: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");
  const [transactionId, setTransactionId] = useState("");
  const [mpayId, setMpayId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setMethod("crypto");
      setTransactionId("");
      setMpayId("");
      setIsProcessing(false);
    }
  }, [isOpen]);

  const copyWallet = () => {
    navigator.clipboard.writeText(ADMIN_USDT_DEPOSIT_ADDRESS);
    toast.success("Wallet address copied to clipboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const depositAmount = parseFloat(amount);

    if (depositAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (method === "crypto" && !transactionId.trim()) {
      toast.error("Please enter your Transaction ID");
      return;
    }

    if (method === "mpay" && !mpayId.trim()) {
      toast.error("Please enter your MPay ID");
      return;
    }

    const details: { cryptoWallet?: string; mpayId?: string; transactionId?: string } = {};
    if (method === "crypto") {
      details.transactionId = transactionId.trim();
    }
    if (method === "mpay") {
      details.mpayId = mpayId.trim();
    }

    // Record deposit request so admin can see it
    mockDepositRequests.push({
      id: `dp-${Date.now()}`,
      userId: user.email,
      userName: user.name,
      userEmail: user.email,
      amount: depositAmount,
      paymentMethod: method as "crypto" | "mpay",
      ...details,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // Notify parent to add to user's transactions and balance
    onDepositComplete(depositAmount, method, details);

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAmount("");
      setTransactionId("");
      setMpayId("");
      toast.success(`Deposit request of $${depositAmount.toFixed(2)} submitted! Pending admin approval.`);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            Add money to your wallet balance
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-2">Deposit Amount</p>
          <p className="text-3xl text-gray-900">${amount || "0.00"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Deposit ($)</Label>
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Deposit Method</Label>
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
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-indigo-900">Send USDT (TRC20) to:</h4>
                  <button
                    onClick={copyWallet}
                    className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="flex items-center gap-3 bg-white border border-indigo-100 rounded-lg p-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bitcoin className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono text-indigo-900 truncate">{ADMIN_USDT_DEPOSIT_ADDRESS}</p>
                    <p className="text-xs text-gray-500">USDT (TRC20) Deposit Address</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Send exactly <strong>$${amount || "0.00"}</strong> USDT (TRC20) to the address above.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID (TX ID) *</Label>
                <Input
                  id="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Paste your transaction ID here"
                  className="h-11"
                  required
                />
                <p className="text-xs text-gray-500">
                  After sending USDT, paste the Transaction ID (TX ID) here so our admin can verify your payment.
                </p>
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
              ⚠️ Admin will review and approve your deposit. Funds will be added to your balance once approved.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {isProcessing ? "Processing..." : "Submit Deposit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
