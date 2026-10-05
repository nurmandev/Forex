export interface InvestmentPlan {
  id: number;
  name: string;
  amount: number;
  dailyProfit: string;
  minDuration: number;
  withdrawalLimit: number;
  features: string[];
  recommended?: boolean;
}

export interface Subscription {
  planId: number;
  startDate: string;
  currentProfit: number;
  totalEarned: number;
}

export interface UserData {
  name: string;
  email: string;
  mt4Account: string;
  mt4Password: string;
  planId: number;
}
