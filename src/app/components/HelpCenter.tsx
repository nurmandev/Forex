import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  CreditCard, 
  Shield, 
  DollarSign, 
  Settings, 
  MessageCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
  Zap,
  Users,
  BarChart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail
} from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HelpCenterProps {
  onNavigate?: (view: string) => void;
}

export function HelpCenter({ onNavigate }: HelpCenterProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "getting-started",
      icon: Zap,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      color: "blue",
      articles: 12,
    },
    {
      id: "subscriptions",
      icon: CreditCard,
      title: "Subscriptions & Plans",
      description: "Information about our investment plans",
      color: "indigo",
      articles: 8,
    },
    {
      id: "trading",
      icon: BarChart,
      title: "Trading & Profits",
      description: "How our automated trading works",
      color: "purple",
      articles: 15,
    },
    {
      id: "withdrawals",
      icon: DollarSign,
      title: "Withdrawals & Payments",
      description: "Managing your funds and withdrawals",
      color: "pink",
      articles: 10,
    },
    {
      id: "account",
      icon: Settings,
      title: "Account Settings",
      description: "Managing your profile and preferences",
      color: "cyan",
      articles: 7,
    },
    {
      id: "security",
      icon: Shield,
      title: "Security & Privacy",
      description: "Keep your account safe and secure",
      color: "green",
      articles: 6,
    },
  ];

  const popularArticles = [
    {
      title: "How do I create an account?",
      category: "Getting Started",
      views: "2.5k",
      icon: Users,
    },
    {
      title: "What are the minimum investment requirements?",
      category: "Subscriptions",
      views: "1.8k",
      icon: CreditCard,
    },
    {
      title: "How long does subscription approval take?",
      category: "Subscriptions",
      views: "1.6k",
      icon: Clock,
    },
    {
      title: "When can I withdraw my profits?",
      category: "Withdrawals",
      views: "1.4k",
      icon: DollarSign,
    },
    {
      title: "How do I connect my MT4/MT5 account?",
      category: "Trading",
      views: "1.2k",
      icon: BarChart,
    },
    {
      title: "Is my data secure?",
      category: "Security",
      views: "1.1k",
      icon: Shield,
    },
  ];

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click the 'Login / Sign Up' button in the header and select 'Create Account'. Fill in your details including email and password, then verify your email address.",
        },
        {
          q: "What are the minimum requirements?",
          a: "You need a valid MT4 or MT5 trading account and a minimum investment based on your chosen plan ($100, $200, or $500).",
        },
        {
          q: "Do I need trading experience?",
          a: "No! Our automated system handles all trading for you. No prior forex experience is required.",
        },
      ],
    },
    {
      category: "Subscriptions & Plans",
      questions: [
        {
          q: "What plans do you offer?",
          a: "We offer three plans: Starter ($100), Professional ($200), and Premium ($500). Each plan offers 5-15% monthly returns with different profit thresholds.",
        },
        {
          q: "How long does approval take?",
          a: "Subscription approvals typically take 1-2 business hours after you submit your MT4/MT5 credentials and complete payment.",
        },
        {
          q: "Can I upgrade my plan?",
          a: "Yes! You can upgrade your plan at any time from your dashboard. The upgrade takes effect immediately after approval.",
        },
      ],
    },
    {
      category: "Trading & Profits",
      questions: [
        {
          q: "How does automated trading work?",
          a: "Our advanced algorithms monitor forex markets 24/7 and execute trades on your behalf using proven strategies to maximize returns while managing risk.",
        },
        {
          q: "What returns can I expect?",
          a: "Our system targets 5-15% monthly returns. Actual returns may vary based on market conditions.",
        },
        {
          q: "Can I see my trading activity?",
          a: "Yes! Your dashboard shows detailed profit tracking, charts, and your complete trading history.",
        },
      ],
    },
    {
      category: "Withdrawals & Payments",
      questions: [
        {
          q: "When can I withdraw?",
          a: "Withdrawals are available once you meet the minimum threshold for your plan (Starter: $50, Professional: $100, Premium: $200).",
        },
        {
          q: "How long do withdrawals take?",
          a: "Withdrawal requests are processed within 24-48 hours and transferred to your registered payment method.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept Bank Transfer, PayPal, Cryptocurrency, and Credit/Debit Cards for both deposits and withdrawals.",
        },
      ],
    },
  ];

  const videos = [
    {
      title: "Getting Started with Forex Automation",
      duration: "5:32",
      thumbnail: "blue",
    },
    {
      title: "How to Choose the Right Plan",
      duration: "3:45",
      thumbnail: "indigo",
    },
    {
      title: "Understanding Your Dashboard",
      duration: "6:15",
      thumbnail: "purple",
    },
    {
      title: "Making Your First Withdrawal",
      duration: "4:20",
      thumbnail: "pink",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        icon: "text-blue-600",
        badge: "bg-blue-100 text-blue-700 border-blue-200",
      },
      indigo: {
        bg: "from-indigo-500 to-indigo-600",
        icon: "text-indigo-600",
        badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        icon: "text-purple-600",
        badge: "bg-purple-100 text-purple-700 border-purple-200",
      },
      pink: {
        bg: "from-pink-500 to-pink-600",
        icon: "text-pink-600",
        badge: "bg-pink-100 text-pink-700 border-pink-200",
      },
      cyan: {
        bg: "from-cyan-500 to-cyan-600",
        icon: "text-cyan-600",
        badge: "bg-cyan-100 text-cyan-700 border-cyan-200",
      },
      green: {
        bg: "from-green-500 to-green-600",
        icon: "text-green-600",
        badge: "bg-green-100 text-green-700 border-green-200",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Help & Support</span>
            </div>
            <h1 className="mb-6 text-5xl md:text-6xl">How can we help you?</h1>
            <p className="text-xl opacity-90 mb-10">
              Search our knowledge base or browse categories below
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for articles, guides, and answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-16 pr-6 text-lg rounded-2xl bg-white text-gray-900 border-0 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const colorClasses = getColorClasses(category.color);
                const Icon = category.icon;
                
                return (
                  <Card
                    key={category.id}
                    className="p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-white border-0 shadow-xl"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.articles} articles</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-4">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Most Viewed</span>
              </div>
              <h2 className="mb-4 text-4xl">Popular Articles</h2>
              <p className="text-gray-600 text-lg">
                The most helpful resources based on user views
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => {
                const Icon = article.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group bg-white border-0 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.views} views</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-4">
                <PlayCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Video Guides</span>
              </div>
              <h2 className="mb-4 text-4xl">Video Tutorials</h2>
              <p className="text-gray-600 text-lg">
                Watch step-by-step guides to get the most out of our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => {
                const colors = ["blue", "indigo", "purple", "pink"];
                const colorClasses = getColorClasses(colors[index]);
                
                return (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-0 shadow-lg"
                  >
                    <div className={`h-48 bg-gradient-to-br ${colorClasses.bg} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <PlayCircle className="w-8 h-8 text-blue-600" />
                      </div>
                      <Badge className="absolute top-4 right-4 bg-black/50 text-white border-0">
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h4 className="text-gray-900 group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </h4>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-4">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="mb-4 text-4xl">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="mb-6 text-2xl text-gray-900">{section.category}</h3>
                  <div className="space-y-4">
                    {section.questions.map((item, itemIndex) => (
                      <Card key={itemIndex} className="p-6 bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-2 text-lg font-semibold text-gray-900">{item.q}</h4>
                            <p className="text-gray-600">{item.a}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 text-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="mb-4 text-white text-3xl">Still Need Help?</h2>
              <p className="text-xl mb-8 opacity-90">
                Can't find what you're looking for? Our support team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onNavigate?.("contact")}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg h-auto"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg h-auto bg-transparent"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Chat
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm">Quick Response</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
