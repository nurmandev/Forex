import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  User as UserIcon,
  LogOut,
  Search,
  ChevronDown,
  DollarSign,
  ArrowUpCircle,
  Download,
  Activity,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Zap,
  Bell,
  Mail,
  Phone,
  Edit2,
  Save,
  RefreshCw,
  ArrowRight,
  Home,
  Menu,
  X,
  Upload,
  ShieldCheck
} from "lucide-react";
import { AuthUser } from "../../data/auth";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import { investmentPlans } from "../../data/plans";
import { mockCancellationRequests, mockSubscriptionRequests, mockVerificationRequests } from "../../data/admin-auth";
import { WithdrawModal } from "./WithdrawModal";
import { DepositModal } from "./DepositModal";
import { PaymentModal } from "./PaymentModal";
import { ProfitChart } from "./ProfitChart";
import { mockPaymentRequests } from "../../data/admin-auth";

interface DashboardProps {
  user: AuthUser;
  onLogout: () => void;
  onGoHome?: () => void;
  isNewUser?: boolean;
  onVerify?: () => void;
}

type Tab = "dashboard" | "transactions" | "plans" | "my-plans" | "wallet" | "profile";

const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "transactions", icon: CreditCard, label: "Transactions" },
  { id: "plans", icon: Zap, label: "Plans" },
  { id: "my-plans", icon: Activity, label: "My Plans" },
  { id: "wallet", icon: Wallet, label: "Wallet" },
  { id: "profile", icon: UserIcon, label: "Profile" },
];

const mockTransactions = [
  { id: "TXN-001", type: "profit", description: "Daily Trading Profit", date: "Oct 9, 2026", amount: 12.50, status: "completed" },
  { id: "TXN-002", type: "profit", description: "Daily Trading Profit", date: "Oct 8, 2026", amount: 15.80, status: "completed" },
  { id: "TXN-003", type: "withdrawal", description: "Withdrawal to Bank", date: "Oct 7, 2026", amount: -100.00, status: "completed" },
  { id: "TXN-004", type: "profit", description: "Daily Trading Profit", date: "Oct 7, 2026", amount: 10.20, status: "completed" },
  { id: "TXN-005", type: "profit", description: "Daily Trading Profit", date: "Oct 6, 2026", amount: 13.90, status: "completed" },
  { id: "TXN-006", type: "profit", description: "Daily Trading Profit", date: "Oct 5, 2026", amount: 11.40, status: "completed" },
  { id: "TXN-007", type: "profit", description: "Daily Trading Profit", date: "Oct 4, 2026", amount: 14.60, status: "completed" },
  { id: "TXN-008", type: "withdrawal", description: "Withdrawal to Bank", date: "Oct 3, 2026", amount: -50.00, status: "pending" },
  { id: "TXN-009", type: "profit", description: "Daily Trading Profit", date: "Oct 3, 2026", amount: 12.80, status: "completed" },
  { id: "TXN-010", type: "deposit", description: "Plan Subscription - Professional", date: "Oct 1, 2026", amount: 200.00, status: "completed" },
];
export function Dashboard({ user, onLogout, onGoHome, isNewUser = false, onVerify }: DashboardProps) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [txFilter, setTxFilter] = useState<"all" | "profit" | "withdrawal" | "deposit">("all");
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImageUrl ?? null);
  const [profileImageName, setProfileImageName] = useState<string>("");
  const [profileImageInput, setProfileImageInput] = useState<HTMLInputElement | null>(null);
  const [showRiskWarning, setShowRiskWarning] = useState(isNewUser);
  const [cancelTick, setCancelTick] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<typeof investmentPlans[0] | null>(null);
  const [localSubscriptions, setLocalSubscriptions] = useState<any[]>(user.subscriptions || []);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [walletBalance, setWalletBalance] = useState(user.wallet.balance);
  const [withdrawable, setWithdrawable] = useState(user.wallet.withdrawable);

  useEffect(() => {
    if (isNewUser) setShowRiskWarning(true);
  }, [isNewUser]);

  const subscriptions = localSubscriptions;
  const activeSubscriptions = subscriptions.filter(s => s.status === "active");
  const primarySubscription = activeSubscriptions[0] || subscriptions[0] || null;
  const currentPlan = primarySubscription ? investmentPlans.find(p => p.id === primarySubscription.planId) : null;

  const totalEarned = subscriptions.reduce((sum, s) => sum + s.totalEarned, 0);
  const totalCurrentProfit = activeSubscriptions.reduce((sum, s) => sum + s.currentProfit, 0);

  const getDaysRemaining = (sub: typeof subscriptions[0]) => {
    if (!sub) return 0;
    const end = new Date(sub.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = getDaysRemaining(primarySubscription);
  const progressPercentage = primarySubscription ? ((30 - daysRemaining) / 30) * 100 : 0;

  const handleCancelPlan = (planId: number) => {
    const sub = subscriptions.find(s => s.planId === planId);
    const plan = investmentPlans.find(p => p.id === planId);
    if (!sub || !plan) return;
    const existing = mockCancellationRequests.find(r => r.userEmail === user.email && r.planId === planId && r.status === "pending");
    if (existing) {
      toast.info("A cancellation request is already pending admin approval for this plan.");
      return;
    }
    mockCancellationRequests.push({
      id: `cr-${Date.now()}`,
      userId: user.email,
      userName: user.name,
      userEmail: user.email,
      planId: sub.planId,
      planName: plan.name,
      amount: plan.amount,
      status: "pending",
      requestedAt: new Date().toISOString(),
    });
    // Mark subscription as cancellation-pending for immediate UI feedback
    setLocalSubscriptions(prev =>
      prev.map(s =>
        s.planId === planId ? { ...s, status: "cancellation_pending" } : s
      )
    );
    setCancelTick(v => v + 1);
    setActiveTab("my-plans");
    toast.success(`Cancellation request sent for ${plan.name}. Pending admin approval.`);
  };

  const handlePaymentConfirm = (
    planId: number,
    paymentMethod: string,
    details: { cryptoWallet?: string; mpayId?: string }
  ) => {
    const plan = investmentPlans.find(p => p.id === planId);
    if (!plan) return;

    // Prevent duplicate pending payment requests for the same plan
    const alreadyPending = mockPaymentRequests.some(
      r => r.userEmail === user.email && r.planId === planId && r.status === "pending"
    );
    if (alreadyPending) {
      toast.info("You already have a pending payment request for this plan. Please wait for admin approval.");
      return;
    }

    const newRequest: typeof mockPaymentRequests[0] = {
      id: `pay-${Date.now()}`,
      userId: user.email,
      userName: user.name,
      userEmail: user.email,
      planId: plan.id,
      planName: plan.name,
      amount: plan.amount,
      paymentMethod: paymentMethod as "crypto" | "mpay",
      cryptoWallet: details.cryptoWallet,
      mpayId: details.mpayId,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    mockPaymentRequests.push(newRequest);

    // One plan per user: mark all existing subscriptions as expired/replaced
    setLocalSubscriptions(prev =>
      prev.map(s => ({
        ...s,
        status: s.status === "active" ? "expired" : s.status,
      }))
    );

    // Add the new (upgraded) pending subscription
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    setLocalSubscriptions(prev => [...prev, {
      planId: plan.id,
      startDate,
      endDate,
      currentProfit: 0,
      totalEarned: 0,
      mt4Account: `MT4-${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: "pending",
      submittedAt: startDate,
    }]);

    // Redirect user to My Plans to see their pending request
    setActiveTab("my-plans");

    const methodLabel = paymentMethod === "crypto" ? "USDT (TRC20)" : `MPay ID: ${details.mpayId}`;
    toast.success(
      `Payment request submitted! Redirecting to My Plans...`,
      { duration: 3000 }
    );
  };

  const handleWithdrawalComplete = (
    amount: number,
    method: string,
    details: { cryptoWallet?: string; mpayId?: string }
  ) => {
    const methodLabel =
      method === "crypto"
        ? `Crypto (USDT) - ${details.cryptoWallet}`
        : `MPay ID - ${details.mpayId}`;

    // Add pending withdrawal transaction to user's transaction history
    setTransactions(prev => [
      ...prev,
      {
        id: `txn-${Date.now()}`,
        type: "withdrawal",
        description: `Withdrawal to ${methodLabel}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        amount: -amount,
        status: "pending",
      },
    ]);

    // Reduce wallet balances
    setWalletBalance(prev => prev - amount);
    setWithdrawable(prev => prev - amount);

    // Redirect to Transactions tab to see the pending withdrawal
    setActiveTab("transactions");

    toast.success(
      `Withdrawal request of $${amount.toFixed(2)} submitted! Pending admin approval.`,
      { duration: 3000 }
    );
  };

  const handleDepositComplete = (
    amount: number,
    method: string,
    details: { cryptoWallet?: string; mpayId?: string }
  ) => {
    const methodLabel =
      method === "crypto"
        ? `Crypto (USDT) - ${details.cryptoWallet}`
        : `MPay ID - ${details.mpayId}`;

    // Add pending deposit transaction to user's transaction history
    setTransactions(prev => [
      ...prev,
      {
        id: `txn-${Date.now()}`,
        type: "deposit",
        description: `Deposit via ${methodLabel}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        amount: amount,
        status: "pending",
      },
    ]);

    // Add to wallet balance (one main balance for all funds)
    setWalletBalance(prev => prev + amount);
    setWithdrawable(prev => prev + amount);

    // Redirect to Wallet tab to see the pending deposit
    setActiveTab("wallet");

    toast.success(
      `Deposit request of $${amount.toFixed(2)} submitted! Pending admin approval.`,
      { duration: 3000 }
    );
  };

  const handleProfileImageUpload = () => {
    profileImageInput?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
      setProfileImageName(file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleProfileImageRemove = () => {
    setProfileImage(null);
    setProfileImageName("");
  };

  const getDailyAverage = (sub: typeof subscriptions[0]) => {
    if (!sub) return 0;
    const startDate = new Date(sub.startDate);
    const now = new Date();
    const daysPassed = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    return sub.totalEarned / daysPassed;
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const filteredTx = txFilter === "all"
    ? transactions
    : transactions.filter(t => t.type === txFilter);

  const statusIcon = (s: string) => {
    if (s === "completed") return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (s === "pending") return <Clock className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  // ── TAB CONTENT ─────────────────────────────────────────────────────────────

  const renderDashboard = () => {
    const isVerified = !!user.verified || mockVerificationRequests.some(r => r.userEmail === user.email && r.status === "approved");
    const pendingVerification = mockVerificationRequests.find(r => r.userEmail === user.email && r.status === "pending");
    return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-xl p-5 border border-gray-100 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-t-4 border-t-blue-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Total Earned</p>
              <p className="text-2xl font-bold text-gray-900">${totalEarned.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +{getDailyAverage(primarySubscription).toFixed(2)} avg/day
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 border border-gray-100 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-t-4 border-t-green-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Daily Profit</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-green-600">15%</p>
                <p className="text-sm font-semibold text-gray-900">${totalCurrentProfit.toFixed(2)}</p>
              </div>
              <p className="text-xs text-gray-400">Today's earnings</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 shadow-sm bg-blue-600 text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-blue-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-100 mb-0.5 font-medium">Wallet Balance</p>
              <p className="text-2xl font-bold">${user.wallet.balance.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <Download className="w-3 h-3" /> {user.wallet.withdrawable.toFixed(2)} withdrawable
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 border border-gray-100 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-t-4 border-t-purple-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Plan Status</p>
              <p className="text-xl font-bold text-gray-900">{currentPlan?.name || "No Plan"}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  daysRemaining > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                }`}>
                  {daysRemaining} days left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Profit Overview</h3>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">This month</span>
            </div>
            <ProfitChart />
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">Latest activity</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.slice().reverse().slice(0, 8).map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-500">{tx.date}</td>
                      <td className="px-5 py-4">
                        <span className="text-gray-900">{tx.description}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs capitalize font-medium ${
                          tx.type === "profit" ? "text-green-600" :
                          tx.type === "withdrawal" ? "text-yellow-600" :
                          tx.type === "deposit" ? "text-blue-600" :
                          "text-gray-600"
                        }`}>{tx.type}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>
{tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          {statusIcon(tx.status)}
                          <span className="capitalize text-gray-600 text-xs">{tx.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-4 text-center text-gray-500">
                        No transactions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Quick Actions</h3>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={user.wallet.withdrawable < (currentPlan?.withdrawalLimit || 0)}
              >
                <Download className="w-4 h-4 mr-2" />
                Withdraw Funds
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("plans")}>
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
              {!isVerified && !pendingVerification && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onVerify && onVerify()}
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Verify Account
                </Button>
              )}
              {pendingVerification && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Verification pending</p>
                      <p className="text-xs text-yellow-700">
                        Your identity verification is awaiting admin approval. Full access will be unlocked once it is reviewed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {isVerified && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Account Verified</p>
                      <p className="text-xs text-green-700">
                        Your identity has been verified. You have full access to all platform features.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Withdrawal Threshold</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Minimum Required</span>
                <span className="font-medium">${currentPlan?.withdrawalLimit || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="text-green-600 font-medium">${user.wallet.withdrawable.toFixed(2)}</span>
              </div>
              <Progress
                value={currentPlan ? Math.min((user.wallet.withdrawable / currentPlan.withdrawalLimit) * 100, 100) : 0}
                className="h-2"
              />
              {user.wallet.withdrawable >= (currentPlan?.withdrawalLimit || 0) ? (
                <p className="text-sm text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Ready to withdraw</p>
              ) : (
                <p className="text-sm text-gray-500">${((currentPlan?.withdrawalLimit || 0) - user.wallet.withdrawable).toFixed(2)} more needed</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl p-6 text-white">
            <h3 className="text-base font-semibold mb-4">Account Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Status</span>
                <Badge className="bg-green-500 text-white text-xs">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Member Since</span>
                <span>{primarySubscription ? new Date(primarySubscription.startDate).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Withdrawals</span>
                <span>$150.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">ROI</span>
                <span className="text-green-400">
                  +{currentPlan ? ((totalEarned / currentPlan.amount) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Summary strip */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
          <div className="p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">Total In</p>
            <p className="text-xl font-bold text-green-600">
              +${transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Out</p>
            <p className="text-xl font-bold text-red-500">
              -${Math.abs(transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0)).toFixed(2)}
            </p>
          </div>
          <div className="p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">Net</p>
            <p className="text-xl font-bold text-blue-600">
              ${transactions.reduce((s, t) => s + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 flex-wrap">
          {(["all", "profit", "withdrawal", "deposit"] as const).map(f => (
            <button
              key={f}
              onClick={() => setTxFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                txFilter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">{filteredTx.length} records</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-gray-400">{tx.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        tx.type === "profit" ? "bg-green-50" :
                        tx.type === "withdrawal" ? "bg-red-50" : "bg-blue-50"
                      }`}>
                        {tx.type === "profit" && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {tx.type === "withdrawal" && <Download className="w-4 h-4 text-red-500" />}
                        {tx.type === "deposit" && <DollarSign className="w-4 h-4 text-blue-600" />}
                      </div>
                      <span className="text-gray-900">{tx.description}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{tx.date}</td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(tx.status)}
                      <span className="capitalize text-gray-600">{tx.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const formatRange = (plan: typeof investmentPlans[0]) =>
    plan.maxAmount >= 999999
      ? `$${plan.amount.toLocaleString()}+`
      : `$${plan.amount.toLocaleString()} – $${plan.maxAmount.toLocaleString()}`;

  const renderPlans = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Investment Plans</h2>
        <p className="text-sm text-gray-500 mt-1">Six tiers delivering 10–15%+ daily returns via automated MT4/MT5 trading</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {investmentPlans.map((plan) => {
          const isActive = subscriptions.some(s => s.planId === plan.id && s.status === "active");
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 bg-white transition-shadow flex flex-col ${
                isActive
                  ? "border-green-500 shadow-md shadow-green-100"
                  : plan.recommended
                    ? "border-blue-500 shadow-md shadow-blue-100"
                    : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {/* Top banner */}
              {isActive && (
                <div className="bg-green-600 text-white text-xs font-bold text-center py-1.5 tracking-widest uppercase rounded-t-xl">
                  ✓ Current Plan
                </div>
              )}
              {!isActive && plan.recommended && (
                <div className="bg-blue-600 text-white text-xs font-bold text-center py-1.5 tracking-widest uppercase rounded-t-xl">
                  ★ Most Popular
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Plan badge + name */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Plan {plan.label}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">{plan.name}</h3>
                </div>

                {/* Range */}
                <p className="text-xl font-extrabold text-gray-900 mb-1">{formatRange(plan)}</p>
                <p className="text-xs text-gray-400 mb-4">Investment Range</p>

                {/* Returns */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 mb-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Daily Returns</p>
                    <p className="text-lg font-bold text-blue-600">{plan.dailyProfit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Min. Withdrawal</p>
                    <p className="text-sm font-semibold text-gray-900">${plan.withdrawalLimit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 flex-1 mb-4">
                  {plan.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-xs text-gray-400 pl-6">+{plan.features.length - 5} more features</li>
                  )}
                </ul>

                {isActive ? (
                  <button disabled className="w-full py-2.5 rounded-xl bg-green-100 text-green-700 text-sm font-semibold cursor-not-allowed">
                    Current Plan
                  </button>
                ) : activeSubscriptions.length > 0 ? (
                  <Button
                    onClick={() => {
                      setSelectedPlanForPayment(plan);
                      setPaymentModalOpen(true);
                    }}
                    className={`w-full ${plan.recommended ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                  >
                    Upgrade Plan
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setSelectedPlanForPayment(plan);
                      setPaymentModalOpen(true);
                    }}
                    className={`w-full ${plan.recommended ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                  >
                    Add Plan
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Profit Calculator */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Smart Profit Calculator</h3>
        <p className="text-sm text-gray-500 mb-4">Estimated monthly returns at minimum investment per plan</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {investmentPlans.map((plan) => {
            const parts = plan.dailyProfit.replace("%+", "").replace("%", "").split("-");
            const minRate = parseFloat(parts[0]) / 100;
            const maxRate = parts[1] ? parseFloat(parts[1]) / 100 : minRate * 1.1;
            const minMonthly = (plan.amount * minRate * 30).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            const maxMonthly = (plan.amount * maxRate * 30).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            return (
              <div key={plan.id} className={`rounded-xl p-4 ${subscriptions.some(s => s.planId === plan.id && s.status === "active") ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-bold text-gray-500">Plan {plan.label}</span>
                  {subscriptions.some(s => s.planId === plan.id && s.status === "active") && <span className="text-xs text-blue-600 font-semibold">• Active</span>}
                </div>
                <p className="text-xs font-medium text-gray-700 mb-2">{plan.name}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Min. invest</span><span>${plan.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Rate</span><span>{plan.dailyProfit}</span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-600 pt-1.5 border-t border-gray-200 mt-1">
                    <span>Est. /month</span><span>${minMonthly}–${maxMonthly}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMyPlans = () => {
    const isVerified = !!user.verified || mockVerificationRequests.some(r => r.userEmail === user.email && r.status === "approved");
    const pendingVerification = mockVerificationRequests.find(r => r.userEmail === user.email && r.status === "pending");

    const activeSubs = subscriptions.filter(s => s.status === "active");
    const otherSubs = subscriptions.filter(s => s.status !== "active");

    // Pending payment requests for this user
    const pendingPayments = mockPaymentRequests.filter(r => r.userEmail === user.email && r.status === "pending");

    return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Account Verification</h3>
            <p className="text-sm text-gray-500 mt-1">
              {isVerified
                ? "Your account is verified."
                : pendingVerification
                  ? "Verification pending admin approval."
                  : "Verify your account to unlock full access."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isVerified && <Badge className="bg-green-600 text-white">Account Verified</Badge>}
            {pendingVerification && <Badge className="bg-yellow-500 text-white">Pending</Badge>}
            {!isVerified && !pendingVerification && (
              <Button onClick={() => onVerify && onVerify()} className="bg-blue-600 hover:bg-blue-700">
                Verify Account
              </Button>
            )}
          </div>
        </div>
      </div>

      {!subscriptions.length && !pendingPayments.length ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Subscription</h3>
          <p className="text-sm text-gray-500 mb-6">You haven't subscribed to any plan yet. Browse our plans to get started.</p>
          <Button onClick={() => setActiveTab("plans")} className="bg-blue-600 hover:bg-blue-700">
            Browse Plans <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pending Payment Requests */}
          {pendingPayments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Payment Requests</h3>
              <div className="space-y-3">
                {pendingPayments.map((req) => {
                  const plan = investmentPlans.find(p => p.id === req.planId);
                  return (
                    <div key={req.id} className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">Pending</Badge>
                          <span className="text-xs text-gray-500 ml-2">{new Date(req.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{req.planName}</h4>
                        <p className="text-sm text-gray-600">Amount: ${req.amount} • Method: {req.paymentMethod === "crypto" ? "Crypto (USDT)" : "MPay ID"}</p>
                        {req.mpayId && (
                          <p className="text-xs text-gray-500 mt-1">MPay ID: {req.mpayId}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Waiting for admin to review and activate your plan.</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Plans Grid */}
          {activeSubs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Active Plans ({activeSubs.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activeSubs.map((sub) => {
                  const plan = investmentPlans.find(p => p.id === sub.planId);
                  const daysLeft = getDaysRemaining(sub);
                  return (
                    <div key={sub.planId} className="rounded-2xl border-2 p-6 flex flex-col min-h-[340px] bg-white transition-shadow shadow-sm border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="text-xs font-bold px-2.5 py-1 bg-green-100 text-green-700 rounded-full">
                            Plan {plan?.label}
                          </span>
                        </div>
                        <Badge className="bg-green-600 text-white text-xs">Active</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{plan?.name}</h3>
                      <p className="text-xl font-extrabold text-gray-900 mb-1">{plan ? formatRange(plan) : "$0"}</p>
                      <p className="text-xs text-gray-400 mb-4">Investment Range</p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Daily Profit</p>
                          <p className="text-lg font-bold text-blue-600">{plan?.dailyProfit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Days Left</p>
                          <p className="text-sm font-semibold text-gray-900">{daysLeft}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <Button
                          variant="destructive"
                          onClick={() => handleCancelPlan(sub.planId)}
                          className="w-full z-10 relative"
                        >
                          Cancel Plan
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Plans (Pending / Expired / Cancelled) */}
          {otherSubs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherSubs.map((sub) => {
                  const plan = investmentPlans.find(p => p.id === sub.planId);
                  const statusColor = sub.status === "pending" ? "bg-yellow-100 text-yellow-700" : sub.status === "cancellation_pending" ? "bg-yellow-100 text-yellow-700" : sub.status === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700";
                  const statusLabel = sub.status === "pending" ? "Pending" : sub.status === "cancellation_pending" ? "Cancellation Pending" : sub.status === "rejected" ? "Rejected" : "Expired";
                  return (
                    <div key={sub.planId} className="rounded-2xl border-2 p-6 flex flex-col min-h-[340px] bg-white transition-shadow shadow-sm border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-gray-600" />
                          </div>
                          <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                            Plan {plan?.label}
                          </span>
                        </div>
                        <Badge className={`${statusColor} text-xs`}>{statusLabel}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{plan?.name}</h3>
                      <p className="text-xl font-extrabold text-gray-900 mb-1">{plan ? formatRange(plan) : "$0"}</p>
                      <p className="text-xs text-gray-400 mb-4">Investment Range</p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        {sub.status === "pending" || sub.status === "cancellation_pending" ? (
                          <span className="text-sm text-yellow-600">Awaiting admin approval</span>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleCancelPlan(sub.planId)}
                            className="w-full text-gray-600 z-10 relative"
                          >
                            Remove Plan
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    );
  }

  const renderWallet = () => {
    const totalDeposits = transactions
      .filter(t => t.type === "deposit")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = transactions
      .filter(t => t.type === "withdrawal")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const pendingWithdrawals = transactions
      .filter(t => t.type === "withdrawal" && t.status === "pending")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return (
    <div className="space-y-8">
      {/* Wallet Header - White Full Width */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Wallet Overview</h2>
            </div>
            <p className="text-gray-600 text-sm">Manage your funds and view transaction history</p>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-gray-500 text-xs uppercase tracking-wider">Total Balance</p>
              <p className="text-4xl font-bold text-gray-900">${walletBalance.toFixed(2)}</p>
            </div>
            <Button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Balance Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Available Balance</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${withdrawable.toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Deposited</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">+${totalDeposits.toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Withdrawn</p>
                <p className="text-3xl font-bold text-rose-600 mt-1">-${totalWithdrawals.toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-rose-600" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">${pendingWithdrawals.toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Withdrawal Notice */}
        {pendingWithdrawals > 0 && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-amber-800 text-sm font-medium">Pending Withdrawal</p>
              <p className="text-amber-700 text-xs mt-1">You have ${pendingWithdrawals.toFixed(2)} awaiting admin approval.</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions - Full Width Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 hover:bg-indigo-100 hover:border-indigo-200 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-all">
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-lg font-semibold text-indigo-900 mb-1">Deposit Funds</h4>
            <p className="text-sm text-indigo-700">Add money to your wallet</p>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="mt-4 text-indigo-600 text-sm font-medium hover:underline"
            >
              Deposit Funds →
            </button>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 hover:bg-emerald-100 hover:border-emerald-200 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-all">
              <Download className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-emerald-900 mb-1">Withdraw Funds</h4>
            <p className="text-sm text-emerald-700">Request a withdrawal</p>
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="mt-4 text-emerald-600 text-sm font-medium hover:underline"
            >
              Request Withdrawal →
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 hover:bg-purple-100 hover:border-purple-200 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-all">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-purple-900 mb-1">Upgrade Plan</h4>
            <p className="text-sm text-purple-700">Invest in a new plan</p>
            <button
              onClick={() => setActiveTab("my-plans")}
              className="mt-4 text-purple-600 text-sm font-medium hover:underline"
            >
              View Plans →
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              <p className="text-sm text-gray-500 mt-1">All your deposits, withdrawals, and profits</p>
            </div>
            <div className="flex items-center gap-2">
              {(["all", "deposit", "withdrawal", "profit"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTxFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    txFilter === f ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTx.length > 0 ? (
                filteredTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-400">{tx.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{tx.description}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        tx.type === "profit" ? "bg-emerald-100 text-emerald-700" :
                        tx.type === "withdrawal" ? "bg-rose-100 text-rose-700" :
                        tx.type === "deposit" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        tx.amount > 0 ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {tx.amount > 0 ? "+" : "-"}$ ${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                        tx.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Activity className="w-10 h-10 text-gray-300" />
                      <p className="text-sm text-gray-500">No transactions found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }

  const renderProfile = () => (
    <div className="space-y-6 max-w-2xl">
      {/* Avatar / header card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white flex items-center gap-5">
        <Avatar className="w-20 h-20 flex-shrink-0">
          {profileImage ? (
            <AvatarImage src={profileImage} alt={`${user.name}'s profile image`} />
          ) : (
            <AvatarFallback className="bg-white/20">
              <UserIcon className="w-10 h-10" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0">
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-blue-200 text-sm">{user.email}</p>
          <div className="flex gap-2 mt-2">
            {primarySubscription?.status === "active" && (
              <Badge className="bg-green-500 text-white text-xs">Active Subscriber</Badge>
            )}
            <Badge className="bg-white/20 text-white text-xs">{currentPlan?.name || "No Plan"}</Badge>
          </div>

          {/* Profile image upload */}
          <div className="mt-4 max-w-xs">
            {profileImage ? (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                  <img src={profileImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-blue-100 truncate">Profile picture set</p>
                  <p className="text-xs text-blue-200 truncate">{profileImageName}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-blue-100">No profile picture uploaded yet.</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20"
                onClick={handleProfileImageUpload}
              >
                <Upload className="w-4 h-4" />
                {profileImage ? "Upload new" : "Upload image"}
              </Button>
              {profileImage && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-100 hover:bg-white/10 hover:text-white"
                  onClick={handleProfileImageRemove}
                >
                  Remove
                </Button>
              )}
            </div>
            <input
              ref={setProfileImageInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
      </div>

      {/* Verification */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {(() => {
          const isVerified = !!user.verified || mockVerificationRequests.some(r => r.userEmail === user.email && r.status === "approved");
          const pendingVerification = mockVerificationRequests.find(r => r.userEmail === user.email && r.status === "pending");
          return (
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Account Verification</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isVerified
                    ? "Your account is verified."
                    : pendingVerification
                      ? "Verification pending admin approval."
                      : "Verify your account to unlock full access."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {isVerified && <Badge className="bg-green-600 text-white">Account Verified</Badge>}
                {pendingVerification && <Badge className="bg-yellow-500 text-white">Pending</Badge>}
                {!isVerified && !pendingVerification && (
                  <Button onClick={() => onVerify && onVerify()} className="bg-blue-600 hover:bg-blue-700">
                    Verify Account
                  </Button>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Info form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProfileEdit(!profileEdit)}
            className="gap-1.5"
          >
            {profileEdit ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {profileEdit ? "Save" : "Edit"}
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Full Name</label>
            {profileEdit ? (
              <input
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center gap-2 text-gray-900 text-sm bg-gray-50 px-3 py-2.5 rounded-lg">
                <UserIcon className="w-4 h-4 text-gray-400" />
                {profileName}
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Email Address</label>
            {profileEdit ? (
              <input
                value={profileEmail}
                onChange={e => setProfileEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center gap-2 text-gray-900 text-sm bg-gray-50 px-3 py-2.5 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400" />
                {profileEmail}
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Phone (optional)</label>
            <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-50 px-3 py-2.5 rounded-lg">
              <Phone className="w-4 h-4" />
              Not provided
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Security</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 text-sm">
            <Bell className="w-4 h-4" /> Enable Two-Factor Authentication
          </Button>
        </div>
      </div>

      <Button
        onClick={onLogout}
        variant="outline"
        className="border-red-200 text-red-600 hover:bg-red-50 w-full gap-2"
      >
        <LogOut className="w-4 h-4" /> Sign Out
      </Button>
    </div>
  );

  const tabContent: Record<Tab, () => React.ReactNode> = {
    dashboard: () => renderDashboard(),
    transactions: () => renderTransactions(),
    plans: () => renderPlans(),
    "my-plans": () => renderMyPlans(),
    wallet: () => renderWallet(),
    profile: () => renderProfile(),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-200 lg:transform-none ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-blue-400">Forex</span>Automation
          </h1>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-10">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {onGoHome && (
            <button
              onClick={onGoHome}
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" /> Go Home
            </button>
          )}

          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition-colors"
              onClick={() => setActiveTab("profile")}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </div>
              <span className="text-sm font-medium hidden sm:block">{user.name.split(" ")[0]}</span>
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Page title */}
          <div className="mb-8">
            <div className={`rounded-2xl p-6 md:p-8 shadow-lg border border-white/20 text-white ${
              activeTab === "dashboard"
                ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                : activeTab === "transactions"
                  ? "bg-gradient-to-br from-emerald-600 to-teal-700"
                  : activeTab === "plans"
                    ? "bg-gradient-to-br from-purple-600 to-fuchsia-700"
                    : activeTab === "my-plans"
                      ? "bg-gradient-to-br from-amber-600 to-orange-700"
                      : activeTab === "wallet"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-700"
                        : "bg-gradient-to-br from-slate-700 to-slate-900"
            }`}>
              {(() => {
                const tab = tabs.find(t => t.id === activeTab);
                const TabIcon = tab?.icon;
                return (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                          {TabIcon ? <TabIcon className="w-5 h-5 text-white" /> : null}
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">{tab?.label}</h2>
                      </div>
                      {activeTab === "dashboard" && (
                        <p className="text-blue-100 text-sm leading-relaxed">
                          Welcome back, <span className="font-semibold">{user.name.split(" ")[0]}</span>! Here's how your trading is performing today.
                        </p>
                      )}
                      {activeTab === "transactions" && (
                        <p className="text-emerald-100 text-sm">Track your deposits, profits, and withdrawals across all plans.</p>
                      )}
                      {activeTab === "plans" && (
                        <p className="text-purple-100 text-sm">Choose an investment tier that matches your trading goals.</p>
                      )}
                      {activeTab === "my-plans" && (
                        <p className="text-amber-100 text-sm">Manage your active subscription and verify your account.</p>
                      )}
                      {activeTab === "wallet" && (
                        <p className="text-indigo-100 text-sm">Manage your wallet balance, deposits, withdrawals, and transaction history.</p>
                      )}
                      {activeTab === "profile" && (
                        <p className="text-slate-200 text-sm">Keep your personal and security information up to date.</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {tabContent[activeTab]()}
        </main>
      </div>

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={withdrawable}
        minimumWithdrawal={currentPlan?.withdrawalLimit || 0}
        user={{ email: user.email, name: user.name }}
        onWithdrawalComplete={handleWithdrawalComplete}
      />
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        user={{ email: user.email, name: user.name }}
        onDepositComplete={handleDepositComplete}
      />
      <PaymentModal
        plan={selectedPlanForPayment}
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setSelectedPlanForPayment(null);
        }}
        onConfirm={(planId, paymentMethod, details) => {
          setPaymentModalOpen(false);
          setSelectedPlanForPayment(null);
          handlePaymentConfirm(planId, paymentMethod, details);
        }}
      />

      {/* Risk Warning Modal */}
      {showRiskWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Red header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">!</span>
              </div>
              <div>
                <h2 className="text-white text-lg font-bold">Risk Warning</h2>
                <p className="text-red-100 text-xs">Please read carefully before proceeding</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Forex trading carries a high level of risk</strong> and may not be suitable for all investors. Before deciding to trade foreign exchange, carefully consider your investment objectives, experience level, and risk tolerance.
              </p>

              <ul className="space-y-2">
                {[
                  "Past performance does not guarantee future results.",
                  "You may lose some or all of your invested capital.",
                  "Only invest funds you can afford to lose.",
                  "Automated trading does not eliminate market risk.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-red-600">✕</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800 font-medium mb-1">Account Verification Required</p>
                <p className="text-xs text-blue-700">
                  To comply with financial regulations and protect your account, you must verify your identity before accessing full platform features.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowRiskWarning(false);
                  if (onVerify) onVerify();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                I Understand — Verify My Account
              </button>
              <button
                onClick={() => setShowRiskWarning(false)}
                className="w-full py-2.5 text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Remind me later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

