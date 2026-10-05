import { UserPlus, Link2, TrendingUp, Wallet, BarChart3, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Choose Your Plan",
    description: "Select from our $100, $200, or $500 investment plans based on your goals and budget.",
  },
  {
    icon: Link2,
    title: "Connect MT4/MT5",
    description: "Securely submit your MetaTrader credentials. Our system uses encrypted connections for maximum safety.",
  },
  {
    icon: TrendingUp,
    title: "Auto Trading Begins",
    description: "Our expert traders and AI algorithms start managing your account immediately with proven strategies.",
  },
  {
    icon: BarChart3,
    title: "Track Your Profits",
    description: "Monitor real-time earnings through your dashboard with detailed charts and daily performance reports.",
  },
  {
    icon: Wallet,
    title: "Withdraw Anytime",
    description: "Request withdrawals once you reach the minimum threshold. Funds are processed within 24-48 hours.",
  },
  {
    icon: RefreshCw,
    title: "Upgrade or Manage",
    description: "Scale up your investment, pause, or cancel your subscription at any time with full flexibility.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start earning passive income from forex trading in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-transparent -ml-4" />
                )}
                
                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>
                  
                  <h3 className="text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-2">🔐 Bank-Level Security</div>
              <p className="text-green-100 text-sm">256-bit SSL encryption</p>
            </div>
            <div>
              <div className="mb-2">⚡ Lightning Fast</div>
              <p className="text-green-100 text-sm">Trades executed in milliseconds</p>
            </div>
            <div>
              <div className="mb-2">📊 Transparent Reporting</div>
              <p className="text-green-100 text-sm">Real-time profit tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
