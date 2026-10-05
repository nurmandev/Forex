import { Shield, TrendingUp, Clock, DollarSign, BarChart3, Lock, Zap, Headphones, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit SSL encryption protects all your data and trading credentials",
  },
  {
    icon: TrendingUp,
    title: "Consistent Profits",
    description: "Expert traders deliver steady returns with proven strategies",
  },
  {
    icon: Clock,
    title: "24/7 Trading",
    description: "Automated trades execute around the clock across global markets",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Monitor profits with live dashboards and detailed reports",
  },
  {
    icon: DollarSign,
    title: "Flexible Withdrawals",
    description: "Access earnings anytime with fast 24-48 hour processing",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "24/7 dedicated support team available via email, chat, and phone",
  },
];

export function Features() {
  return (
    <>
      {/* Automate Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div>
                <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
                  Automate all of your trading operations
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Connect your MT4/MT5 account and let our AI-powered system handle everything. 
                  From market analysis to trade execution, we've got you covered.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">Automated Trade Execution</p>
                      <p className="text-gray-600 text-sm">Smart algorithms execute trades at optimal times</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">Risk Management</p>
                      <p className="text-gray-600 text-sm">Built-in risk controls protect your capital</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">Real-Time Monitoring</p>
                      <p className="text-gray-600 text-sm">Track every trade and profit in real-time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="bg-blue-600 rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <BarChart3 className="w-48 h-48 text-white opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Placeholder */}
              <div className="bg-slate-800 rounded-2xl p-12 h-80"></div>

              {/* Right - Content */}
              <div>
                <h2 className="text-4xl md:text-5xl mb-6">
                  Increase team efficiency with VoiceFlow
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Our intelligent trading system learns from market patterns and adapts to maximize your returns. 
                  Experience the power of AI-driven forex automation.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Automate. Integrate. Streamline.
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to succeed in forex trading, all in one powerful platform
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Devices Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Accessible through all devices
            </h2>
            <p className="text-lg text-gray-600">
              Trade on the go with our fully responsive platform. Access your dashboard from any device, anywhere.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Device Mockups */}
              <div className="flex items-end justify-center gap-8">
                {/* Mobile */}
                <div className="w-24 h-48 bg-white border-4 border-gray-900 rounded-3xl shadow-xl"></div>
                
                {/* Desktop */}
                <div className="w-96 h-64 bg-white border-4 border-gray-900 rounded-2xl shadow-xl"></div>
                
                {/* Tablet */}
                <div className="w-32 h-48 bg-white border-4 border-gray-900 rounded-3xl shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Key Features
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lock, title: "Secure Encryption", desc: "Military-grade security for all transactions" },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Detailed insights and performance metrics" },
              { icon: Zap, title: "Lightning Fast", desc: "Execute trades in milliseconds" },
              { icon: TrendingUp, title: "High Returns", desc: "Consistent profit generation" },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer assistance" },
              { icon: DollarSign, title: "Low Fees", desc: "Competitive pricing and transparent costs" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Backbone Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">
              The Backbone of remote operations
            </h2>
            <p className="text-lg text-gray-300">
              Built for traders who demand reliability, security, and consistent performance
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "99%", label: "Uptime" },
              { value: "50K+", label: "Users" },
              { value: "$10M+", label: "Managed" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Try our 7-days free trial today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start earning with zero risk. No credit card required.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
