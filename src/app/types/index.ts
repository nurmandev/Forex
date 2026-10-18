/** Every route/view the single-page app can render. */
export type View =
  | "home"
  | "login"
  | "register"
  | "dashboard"
  | "verification"
  | "contact"
  | "about"
  | "admin-login"
  | "admin-dashboard"
  | "custom-page";

/** Callback used by shared layout components to switch views. */
export type NavigateFn = (view: View) => void;

export interface InvestmentPlan {
  id: number;
  name: string;
  label: string;
  amount: number;
  maxAmount: number;
  dailyProfit: string;
  minDuration: number;
  withdrawalLimit: number;
  features: string[];
  recommended?: boolean;
  active?: boolean;
}

export interface Subscription {
  planId: number;
  startDate: string;
  endDate: string;
  currentProfit: number;
  totalEarned: number;
  mt4Account: string;
  mt4Username?: string;
  mt4Server?: string;
  accountType?: string;
  status: "pending" | "active" | "rejected" | "expired" | "cancelled";
  submittedAt?: string;
  approvedAt?: string;
}

export interface UserData {
  name: string;
  email: string;
  mt4Account: string;
  mt4Password: string;
  planId: number;
}
