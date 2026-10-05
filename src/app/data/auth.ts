export interface User {
  email: string;
  name: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
  subscription?: {
    planId: number;
    startDate: string;
    endDate: string;
    currentProfit: number;
    totalEarned: number;
    mt4Account: string;
    mt4Username?: string;
    mt4Server?: string;
    accountType?: string;
    status: "pending" | "active" | "rejected" | "expired";
    submittedAt?: string;
    approvedAt?: string;
  };
  wallet: {
    balance: number;
    withdrawable: number;
  };
}

// Demo user data with active subscription
export const demoUser: AuthUser = {
  email: "webcrowdofficial@gmail.com",
  name: "John Doe",
  subscription: {
    planId: 2,
    startDate: "2024-11-01",
    endDate: "2024-12-01",
    currentProfit: 245.80,
    totalEarned: 1547.60,
    mt4Account: "MT4-1234567890",
    mt4Username: "demo_trader_001",
    mt4Server: "ICMarkets-Demo01",
    accountType: "MT4",
    status: "active",
    submittedAt: "2024-11-01T10:30:00Z",
    approvedAt: "2024-11-01T15:45:00Z",
  },
  wallet: {
    balance: 1547.60,
    withdrawable: 1507.60,
  },
};

export const users: User[] = [
  {
    email: "webcrowdofficial@gmail.com",
    name: "John Doe",
    password: "1234",
  },
];

export function authenticateUser(email: string, password: string): AuthUser | null {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user && email === "webcrowdofficial@gmail.com") {
    return demoUser;
  }
  return null;
}

export function registerUser(email: string, name: string, password: string): boolean {
  const exists = users.find((u) => u.email === email);
  if (exists) return false;
  
  users.push({ email, name, password });
  return true;
}
