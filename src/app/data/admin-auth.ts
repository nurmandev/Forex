export interface AdminUser {
  username: string;
  password: string;
  email: string;
  name: string;
}

export const adminUsers: AdminUser[] = [
  {
    username: "admin",
    password: "1234",
    email: "admin@forexautomation.com",
    name: "Admin User",
  },
];

export function authenticateAdmin(username: string, password: string): AdminUser | null {
  const admin = adminUsers.find((a) => a.username === username && a.password === password);
  return admin || null;
}

// Mock data for admin dashboard
export interface UserManagement {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "suspended" | "pending";
  subscription?: {
    planName: string;
    status: string;
    amount: number;
  };
  totalEarned: number;
  walletBalance: number;
}

export interface SubscriptionRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: number;
  planName: string;
  amount: number;
  mt4Username: string;
  mt4Server: string;
  accountType: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: "deposit" | "withdrawal" | "profit" | "subscription";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  description: string;
}

export const mockUsers: UserManagement[] = [
  {
    id: "1",
    name: "John Doe",
    email: "webcrowdofficial@gmail.com",
    joinDate: "2024-11-01",
    status: "active",
    subscription: {
      planName: "Professional",
      status: "active",
      amount: 200,
    },
    totalEarned: 1547.60,
    walletBalance: 1547.60,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    joinDate: "2024-10-15",
    status: "active",
    subscription: {
      planName: "Premium",
      status: "active",
      amount: 500,
    },
    totalEarned: 3250.40,
    walletBalance: 2890.20,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    joinDate: "2024-11-20",
    status: "pending",
    totalEarned: 0,
    walletBalance: 0,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    joinDate: "2024-10-28",
    status: "active",
    subscription: {
      planName: "Starter",
      status: "active",
      amount: 100,
    },
    totalEarned: 450.80,
    walletBalance: 450.80,
  },
  {
    id: "5",
    name: "David Martinez",
    email: "d.martinez@example.com",
    joinDate: "2024-09-12",
    status: "suspended",
    subscription: {
      planName: "Professional",
      status: "suspended",
      amount: 200,
    },
    totalEarned: 890.20,
    walletBalance: 890.20,
  },
];

export const mockSubscriptionRequests: SubscriptionRequest[] = [
  {
    id: "sr001",
    userId: "3",
    userName: "Michael Chen",
    userEmail: "m.chen@example.com",
    planId: 1,
    planName: "Starter Plan",
    amount: 100,
    mt4Username: "mchen_trader",
    mt4Server: "ICMarkets-Live02",
    accountType: "MT4",
    status: "pending",
    submittedAt: "2024-11-20T14:30:00Z",
  },
  {
    id: "sr002",
    userId: "6",
    userName: "Lisa Anderson",
    userEmail: "lisa.a@example.com",
    planId: 3,
    planName: "Premium Plan",
    amount: 500,
    mt4Username: "lisa_forex_pro",
    mt4Server: "XM-Real16",
    accountType: "MT5",
    status: "pending",
    submittedAt: "2024-11-21T09:15:00Z",
  },
  {
    id: "sr003",
    userId: "1",
    userName: "John Doe",
    userEmail: "webcrowdofficial@gmail.com",
    planId: 2,
    planName: "Professional Plan",
    amount: 200,
    mt4Username: "demo_trader_001",
    mt4Server: "ICMarkets-Demo01",
    accountType: "MT4",
    status: "approved",
    submittedAt: "2024-11-01T10:30:00Z",
    reviewedAt: "2024-11-01T15:45:00Z",
    reviewedBy: "admin",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx001",
    userId: "1",
    userName: "John Doe",
    type: "subscription",
    amount: 200,
    status: "completed",
    date: "2024-11-01T10:30:00Z",
    description: "Professional Plan Subscription",
  },
  {
    id: "tx002",
    userId: "1",
    userName: "John Doe",
    type: "profit",
    amount: 45.80,
    status: "completed",
    date: "2024-11-15T00:00:00Z",
    description: "Daily Profit",
  },
  {
    id: "tx003",
    userId: "2",
    userName: "Sarah Johnson",
    type: "subscription",
    amount: 500,
    status: "completed",
    date: "2024-10-15T11:20:00Z",
    description: "Premium Plan Subscription",
  },
  {
    id: "tx004",
    userId: "2",
    userName: "Sarah Johnson",
    type: "withdrawal",
    amount: 360.20,
    status: "completed",
    date: "2024-11-10T14:30:00Z",
    description: "Wallet Withdrawal",
  },
  {
    id: "tx005",
    userId: "4",
    userName: "Emma Wilson",
    type: "subscription",
    amount: 100,
    status: "completed",
    date: "2024-10-28T09:45:00Z",
    description: "Starter Plan Subscription",
  },
  {
    id: "tx006",
    userId: "1",
    userName: "John Doe",
    type: "withdrawal",
    amount: 40.00,
    status: "pending",
    date: "2024-11-20T16:20:00Z",
    description: "Pending Withdrawal Request",
  },
];

export interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  pendingApprovals: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
}

export const getDashboardStats = (): DashboardStats => {
  return {
    totalUsers: mockUsers.length,
    activeSubscriptions: mockUsers.filter(u => u.subscription?.status === "active").length,
    pendingApprovals: mockSubscriptionRequests.filter(sr => sr.status === "pending").length,
    totalRevenue: 1700,
    monthlyRevenue: 800,
    totalWithdrawals: 400.20,
    pendingWithdrawals: 1,
  };
};
