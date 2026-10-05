import { TrendingUp, Target, Award, Users, Shield, Zap, Globe, BarChart3, CheckCircle2, LineChart } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface AboutUsProps {
  onNavigate?: (view: "home" | "contact") => void;
}

export function AboutUs({ onNavigate }: AboutUsProps = {}) {
  const stats = [
    { value: "10,000+", label: "Active Investors" },
    { value: "$50M+", label: "Total Trading Volume" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Bank-level encryption and secure trading protocols protect your investments at all times.",
    },
    {
      icon: Target,
      title: "Precision Trading",
      description: "Advanced algorithms and expert strategies ensure optimal trade execution and profit maximization.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your success is our priority. We provide personalized support and transparent communication.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology and continuous improvement keep us ahead in the forex market.",
    },
  ];

  const team = [
    {
      name: "Michael Roberts",
      role: "CEO & Founder",
      expertise: "15+ years in Forex Trading",
      description: "Former investment banker with expertise in automated trading systems and risk management.",
    },
    {
      name: "Sarah Chen",
      role: "Chief Trading Officer",
      expertise: "Algorithmic Trading Expert",
      description: "PhD in Financial Engineering, specialized in developing high-frequency trading algorithms.",
    },
    {
      name: "David Martinez",
      role: "Head of Technology",
      expertise: "FinTech Innovation Leader",
      description: "Built trading platforms for top-tier financial institutions with focus on security and performance.",
    },
    {
      name: "Emma Thompson",
      role: "Customer Success Director",
      expertise: "Client Relations Specialist",
      description: "Dedicated to ensuring every investor achieves their financial goals with our platform.",
    },
  ];

  const milestones = [
    { year: "2019", event: "Company Founded", description: "Started with a vision to democratize forex trading" },
    { year: "2020", event: "1,000 Investors", description: "Reached our first major milestone" },
    { year: "2022", event: "Platform 2.0 Launch", description: "Introduced advanced AI trading algorithms" },
    { year: "2024", event: "Global Expansion", description: "Extended services to 50+ countries" },
    { year: "2025", event: "10,000+ Users", description: "Became a trusted leader in automated forex trading" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 pt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              About forexautomationservice
            </Badge>
            <h1 className="mb-6">
              Empowering Investors Through Automated Forex Trading
            </h1>
            <p className="text-xl opacity-90 mb-8">
              We're a team of passionate forex experts and technology innovators dedicated to 
              making professional-grade trading accessible to everyone. Our mission is to help 
              you achieve financial freedom through smart, automated investment strategies.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Trusted Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                  Our Mission
                </Badge>
                <h2 className="mb-6">
                  Making Professional Forex Trading Accessible to All
                </h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2019, forexautomationservice was born from a simple belief: everyone 
                  deserves access to the same sophisticated trading tools used by professional 
                  investors and hedge funds.
                </p>
                <p className="text-gray-600 mb-6">
                  We've combined cutting-edge artificial intelligence, decades of trading expertise, 
                  and institutional-grade infrastructure to create a platform that works tirelessly 
                  on your behalf. Our automated systems monitor markets 24/7, executing trades with 
                  precision and managing risk intelligently.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-900">Consistent Growth</div>
                    <div className="text-sm text-gray-600">5-15% monthly returns on average</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                  <Globe className="w-10 h-10 text-blue-600 mb-4" />
                  <h4 className="mb-2">Global Reach</h4>
                  <p className="text-sm text-gray-600">
                    Serving investors across 50+ countries worldwide
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                  <Award className="w-10 h-10 text-purple-600 mb-4" />
                  <h4 className="mb-2">Award Winning</h4>
                  <p className="text-sm text-gray-600">
                    Recognized for innovation in fintech
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100">
                  <BarChart3 className="w-10 h-10 text-cyan-600 mb-4" />
                  <h4 className="mb-2">Proven Track Record</h4>
                  <p className="text-sm text-gray-600">
                    98% success rate over 5+ years
                  </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                  <LineChart className="w-10 h-10 text-indigo-600 mb-4" />
                  <h4 className="mb-2">$50M+ Volume</h4>
                  <p className="text-sm text-gray-600">
                    Total trading volume managed
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                Our Values
              </Badge>
              <h2 className="mb-4">What Drives Us Forward</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our core values guide every decision we make and ensure we always 
                put our investors' interests first.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                Our Team
              </Badge>
              <h2 className="mb-4">Meet the Experts Behind Your Success</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our leadership team brings together decades of experience in forex trading, 
                financial technology, and customer success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{member.name}</h3>
                      <div className="text-blue-600 mb-1">{member.role}</div>
                      <Badge className="mb-3 bg-gray-100 text-gray-700 border-gray-200 text-xs">
                        {member.expertise}
                      </Badge>
                      <p className="text-gray-600 text-sm">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                Our Journey
              </Badge>
              <h2 className="mb-4">Milestones That Shaped Us</h2>
              <p className="text-gray-600">
                From humble beginnings to becoming a trusted leader in automated forex trading.
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {milestone.year}
                    </div>
                    {index !== milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-blue-600 to-indigo-600 mt-2" />
                    )}
                  </div>
                  <Card className="flex-1 p-6 mb-4">
                    <h3 className="mb-2 text-blue-600">{milestone.event}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none">
              <h2 className="mb-4 text-white">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of investors who trust forexautomationservice 
                to grow their wealth through smart, automated trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onNavigate?.("home")}
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View Investment Plans
                </button>
                <button 
                  onClick={() => onNavigate?.("contact")}
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact Our Team
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}