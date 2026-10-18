import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  Menu,
  X,
  CheckCircle,
  Clock,
  DollarSign,
  UserCheck,
  AlertCircle,
  XCircle
} from "lucide-react";
import { AdminUser, getDashboardStats, mockCancellationRequests, mockDepositRequests, mockVerificationRequests, mockPaymentRequests, mockWithdrawalRequests } from "../../data/admin-auth";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { UsersManagement } from "./UsersManagement";
import { PlansManagement } from "./PlansManagement";
import { SubscriptionApprovals } from "./SubscriptionApprovals";
import { CancellationApprovals } from "./CancellationApprovals";
import { VerificationApprovals } from "./VerificationApprovals";
import { TransactionsManagement } from "./TransactionsManagement";
import { PagesManagement } from "./PagesManagement";
import { PaymentApprovals } from "./PaymentApprovals";
import { WithdrawalApprovals } from "./WithdrawalApprovals";
import { DepositApprovals } from "./DepositApprovals";
import { Badge } from "../ui/badge";

interface AdminDashboardProps {
  admin: AdminUser;
  onLogout: () => void;
}

type AdminView = "overview" | "users" | "plans" | "subscriptions" | "verifications" | "cancellations" | "payments" | "withdrawals" | "deposits" | "transactions" | "pages" | "settings";

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const stats = getDashboardStats();
  const cancellationPending = mockCancellationRequests.filter(r => r.status === "pending").length;
  const verificationPending = mockVerificationRequests.filter(r => r.status === "pending").length;
  const paymentPending = mockPaymentRequests.filter(r => r.status === "pending").length;
  const withdrawalPending = mockWithdrawalRequests.filter(r => r.status === "pending").length;
  const depositPending = mockDepositRequests.filter(r => r.status === "pending").length;

  const navigation = [
    { id: "overview", name: "Overview", icon: LayoutDashboard },
    { id: "users", name: "Users", icon: Users },
    { id: "plans", name: "Plans", icon: Package },
    { id: "subscriptions", name: "Subscriptions", icon: CheckCircle, badge: stats.pendingApprovals },
    { id: "verifications", name: "Verifications", icon: UserCheck, badge: verificationPending },
    { id: "cancellations", name: "Cancellations", icon: XCircle, badge: cancellationPending },
    { id: "payments", name: "Payments", icon: DollarSign, badge: paymentPending },
    { id: "withdrawals", name: "Withdrawals", icon: DollarSign, badge: withdrawalPending },
    { id: "deposits", name: "Deposits", icon: DollarSign, badge: depositPending },
    { id: "transactions", name: "Transactions", icon: FileText },
    { id: "pages", name: "Pages", icon: FileText },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } fixed h-full z-30`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <p className="font-semibold text-gray-900 text-sm truncate">Admin Panel</p>
                  <p className="text-xs text-gray-500 truncate">forexautomationservice</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as AdminView)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge className="bg-red-500 text-white">{item.badge}</Badge>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Admin Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            {sidebarOpen && (
              <div className="mb-3 px-3">
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
            )}
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {navigation.find(n => n.id === currentView)?.name}
                </h1>
                <p className="text-sm text-gray-500">Manage and monitor your platform</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {currentView === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                    <Users className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
                    <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
                    <UserCheck className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions}</div>
                    <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Approvals</CardTitle>
                    <Clock className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
                    <p className="text-xs text-gray-500 mt-1">Requires attention</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                    <DollarSign className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</div>
                    <p className="text-xs text-green-600 mt-1">↑ 24% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => setCurrentView("subscriptions")}
                      className="w-full justify-between bg-blue-600 hover:bg-blue-700"
                    >
                      <span>Review Pending Subscriptions</span>
                      <Badge className="bg-red-500">{stats.pendingApprovals}</Badge>
                    </Button>
                    <Button 
                      onClick={() => setCurrentView("transactions")}
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span>View Pending Withdrawals</span>
                      <Badge variant="outline">{stats.pendingWithdrawals}</Badge>
                    </Button>
                    <Button 
                      onClick={() => setCurrentView("users")}
                      variant="outline"
                      className="w-full"
                    >
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Platform health and monitoring</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Trading System</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Payment Gateway</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">MT4/MT5 Integration</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Email Service</span>
                      </div>
                      <span className="text-sm font-medium text-yellow-600">Degraded</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alert */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-900">Action Required</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        You have {stats.pendingApprovals} pending subscription(s) awaiting review. 
                        Please review and approve/reject to activate user accounts.
                      </p>
                      <Button 
                        onClick={() => setCurrentView("subscriptions")}
                        size="sm"
                        className="mt-3 bg-yellow-600 hover:bg-yellow-700"
                      >
                        Review Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentView === "users" && <UsersManagement />}
          {currentView === "plans" && <PlansManagement />}
          {currentView === "subscriptions" && <SubscriptionApprovals />}
          {currentView === "verifications" && <VerificationApprovals />}
          {currentView === "cancellations" && <CancellationApprovals />}
          {currentView === "payments" && <PaymentApprovals />}
          {currentView === "withdrawals" && <WithdrawalApprovals />}
          {currentView === "deposits" && <DepositApprovals />}
          {currentView === "transactions" && <TransactionsManagement />}
          {currentView === "pages" && <PagesManagement />}
          {currentView === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Platform configuration and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}