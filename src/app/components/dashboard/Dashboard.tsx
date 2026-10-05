import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  User as UserIcon,
  Settings,
  FileText,
  Bell,
  MessageSquare,
  HelpCircle,
  LogOut,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ArrowUpCircle,
  Download,
  Activity,
  Calendar as CalendarIcon
} from "lucide-react";
import { AuthUser } from "../../data/auth";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { investmentPlans } from "../../data/plans";
import { WithdrawModal } from "./WithdrawModal";
import { UpgradeModal } from "./UpgradeModal";
import { ProfitChart } from "./ProfitChart";

interface DashboardProps {
  user: AuthUser;
  onLogout: () => void;
  onGoHome?: () => void;
}

export function Dashboard({ user, onLogout, onGoHome }: DashboardProps) {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const subscription = user.subscription;
  const currentPlan = subscription ? investmentPlans.find(p => p.id === subscription.planId) : null;

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!subscription) return 0;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = getDaysRemaining();
  const progressPercentage = subscription ? ((30 - daysRemaining) / 30) * 100 : 0;

  // Calculate daily average
  const getDailyAverage = () => {
    if (!subscription) return 0;
    const startDate = new Date(subscription.startDate);
    const now = new Date();
    const daysPassed = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    return subscription.totalEarned / daysPassed;
  };

  // Calendar helper
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const today = new Date();
  const isCurrentMonth =
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: UserIcon, label: 'Profile' },
    { id: 'subscription', icon: Activity, label: 'Subscription' },
    { id: 'notification', icon: Bell, label: 'Notification' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'help', icon: HelpCircle, label: 'Help Center' },
    { id: 'settings', icon: Settings, label: 'Setting' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">

      {/* Left Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">LOGO</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b h-16 flex items-center px-4 lg:px-6 gap-2 lg:gap-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-blue-600 text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Header Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            <span className="text-xs lg:text-sm font-medium hidden sm:block">{user.name.toUpperCase()}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-blue-600" />
            </div>
            <ChevronDown className="w-4 h-4 hidden sm:block" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-gray-100 p-4 lg:p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
            {/* Total Earned */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Earned</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${subscription?.totalEarned.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">+{getDailyAverage().toFixed(2)} avg/day</div>
                </div>
              </div>
            </div>

            {/* Today's Profit */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Today's Profit</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${subscription?.currentProfit.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">↑ {currentPlan?.dailyProfit || "0%"}</div>
                </div>
              </div>
            </div>

            {/* Wallet Balance - Blue Background */}
            <div className="bg-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-blue-100 mb-1">Wallet Balance</div>
                  <div className="text-2xl font-bold">
                    ${user.wallet.balance.toFixed(2)}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">${user.wallet.withdrawable.toFixed(2)} withdrawable</div>
                </div>
              </div>
            </div>

            {/* Plan Status */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Plan Status</div>
                  <div className="text-xl font-bold text-gray-900">{currentPlan?.name || "No Plan"}</div>
                  <div className="text-xs text-gray-400 mt-1">{daysRemaining} days remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profit Chart */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Overview</h3>
                <ProfitChart />
              </div>

              {/* Subscription Details */}
              {subscription && currentPlan && (
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">My Subscription</h3>
                      <p className="text-sm text-gray-500">Current plan details and performance</p>
                    </div>
                    <Badge className={`${
                      subscription.status === 'active' ? 'bg-green-600' :
                      subscription.status === 'pending' ? 'bg-yellow-600' :
                      subscription.status === 'rejected' ? 'bg-red-600' :
                      'bg-gray-600'
                    }`}>
                      {subscription.status === 'active' ? 'Active' :
                       subscription.status === 'pending' ? 'Pending Approval' :
                       subscription.status === 'rejected' ? 'Rejected' :
                       'Expired'}
                    </Badge>
                  </div>

                  {/* Status Alerts */}
                  {subscription.status === 'pending' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-yellow-900 text-sm font-medium mb-1">⏳ Awaiting Admin Approval</p>
                      <p className="text-yellow-700 text-sm">
                        Your subscription is being reviewed by our team. You'll receive an email notification once approved.
                        This typically takes 1-2 business hours.
                      </p>
                      <p className="text-yellow-600 text-xs mt-2">
                        Submitted: {subscription.submittedAt ? new Date(subscription.submittedAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  )}

                  {subscription.status === 'rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-red-900 text-sm font-medium mb-1">❌ Subscription Rejected</p>
                      <p className="text-red-700 text-sm">
                        Your subscription could not be approved. Please contact support for more information or try resubmitting with correct credentials.
                      </p>
                    </div>
                  )}

                  {subscription.status === 'active' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <p className="text-green-900 text-sm font-medium mb-1">✓ Subscription Active</p>
                      <p className="text-green-700 text-sm">
                        Your account is active and automated trading is enabled. Your profits are being tracked in real-time.
                      </p>
                      {subscription.approvedAt && (
                        <p className="text-green-600 text-xs mt-2">
                          Approved: {new Date(subscription.approvedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Subscription Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Plan Name</p>
                      <p className="text-gray-900">{currentPlan.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Investment Amount</p>
                      <p className="text-gray-900">${currentPlan.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Daily Profit Rate</p>
                      <p className="text-blue-600">{currentPlan.dailyProfit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Start Date</p>
                      <p className="text-gray-900">{new Date(subscription.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expiration Date</p>
                      <p className="text-gray-900">{new Date(subscription.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account Type</p>
                      <p className="text-gray-900">{subscription.accountType || 'MT4/MT5'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account Username</p>
                      <p className="text-gray-900">{subscription.mt4Username || subscription.mt4Account}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Server</p>
                      <p className="text-gray-900">{subscription.mt4Server || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Plan Duration Progress</p>
                      <p className="text-sm text-gray-900">{daysRemaining} days left</p>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-renews on {new Date(subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">Plan Features</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      <ArrowUpCircle className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              )}

              {/* Calendar */}
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
                        setCurrentMonth(newMonth);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
                        setCurrentMonth(newMonth);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const dayNum = i + 1;
                    const isToday = isCurrentMonth && dayNum === today.getDate();

                    return (
                      <button
                        key={dayNum}
                        className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          isToday
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Profit History</h3>
                <div className="space-y-3">
                  {[
                    { date: "May 11, 2026", profit: 12.50, status: "completed" },
                    { date: "May 10, 2026", profit: 15.80, status: "completed" },
                    { date: "May 9, 2026", profit: 10.20, status: "completed" },
                    { date: "May 8, 2026", profit: 13.90, status: "completed" },
                    { date: "May 7, 2026", profit: 11.40, status: "completed" },
                    { date: "May 6, 2026", profit: 14.60, status: "completed" },
                    { date: "May 5, 2026", profit: 12.80, status: "completed" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Daily Trading Profit</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600">+${transaction.profit.toFixed(2)}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={user.wallet.withdrawable < (currentPlan?.withdrawalLimit || 0)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Withdraw Funds
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </div>

              {/* Withdrawal Threshold */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Threshold</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Minimum Required</span>
                    <span className="text-gray-900 font-medium">${currentPlan?.withdrawalLimit || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Available</span>
                    <span className="text-green-600 font-medium">${user.wallet.withdrawable.toFixed(2)}</span>
                  </div>
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${currentPlan ? Math.min((user.wallet.withdrawable / currentPlan.withdrawalLimit) * 100, 100) : 0}%` }}
                      />
                    </div>
                    {user.wallet.withdrawable >= (currentPlan?.withdrawalLimit || 0) ? (
                      <p className="text-sm text-green-600">✓ You can withdraw now!</p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        ${((currentPlan?.withdrawalLimit || 0) - user.wallet.withdrawable).toFixed(2)} more to withdraw
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Summary */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Status</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm text-gray-900">
                      {subscription ? new Date(subscription.startDate).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Withdrawals</span>
                    <span className="text-sm text-gray-900">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className="text-sm text-green-600">
                      +{currentPlan ? ((subscription!.totalEarned / currentPlan.amount) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is available 24/7 to assist you
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={user.wallet.withdrawable}
        minimumWithdrawal={currentPlan?.withdrawalLimit || 0}
      />
      
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlanId={subscription?.planId || 0}
      />
    </div>
  );
}