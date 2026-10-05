import { InvestmentPlan } from "../types";

export const investmentPlans: InvestmentPlan[] = [
  {
    id: 1,
    name: "Starter Plan",
    amount: 100,
    dailyProfit: "2-3%",
    minDuration: 30,
    withdrawalLimit: 20,
    features: [
      "MT4/MT5 Integration",
      "Daily Profit Reports",
      "Email Support",
      "Basic Analytics",
      "Withdraw After 30 Days",
    ],
  },
  {
    id: 2,
    name: "Professional Plan",
    amount: 200,
    dailyProfit: "3-5%",
    minDuration: 30,
    withdrawalLimit: 40,
    recommended: true,
    features: [
      "MT4/MT5 Integration",
      "Real-Time Profit Tracking",
      "Priority Support",
      "Advanced Analytics",
      "Flexible Withdrawals",
      "Risk Management Tools",
    ],
  },
  {
    id: 3,
    name: "Premium Plan",
    amount: 500,
    dailyProfit: "5-8%",
    minDuration: 30,
    withdrawalLimit: 100,
    features: [
      "MT4/MT5 Integration",
      "Live Trading Insights",
      "24/7 VIP Support",
      "Premium Analytics Dashboard",
      "Instant Withdrawals",
      "Dedicated Account Manager",
      "Custom Trading Strategies",
    ],
  },
];
