import type { Subscription } from "../types";

export interface User {
  email: string;
  name: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
  verified?: boolean;
  profileImageUrl?: string;
  subscriptions?: Subscription[];
  wallet: {
    balance: number;
    withdrawable: number;
  };
}

// Demo user data with multiple active subscriptions
export const demoUser: AuthUser = {
  email: "webcrowdofficial@gmail.com",
  name: "John Doe",
  verified: false,
  subscriptions: [
    {
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
    {
      planId: 4,
      startDate: "2024-10-15",
      endDate: "2024-11-14",
      currentProfit: 120.40,
      totalEarned: 890.20,
      mt4Account: "MT4-0987654321",
      mt4Username: "demo_trader_002",
      mt4Server: "ICMarkets-Demo02",
      accountType: "MT4",
      status: "active",
      submittedAt: "2024-10-15T09:00:00Z",
      approvedAt: "2024-10-15T14:20:00Z",
    },
  ],
  wallet: {
    balance: 2437.80,
    withdrawable: 2397.80,
  },
};

// Re-exported from the shared types module so all views use one definition.
export type { Subscription } from "../types";

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
