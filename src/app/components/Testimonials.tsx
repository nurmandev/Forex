import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const testimonials = [
  {
    name: "Michael Rodriguez",
    location: "New York, USA",
    role: "Business Owner",
    rating: 5,
    profit: "$8,450",
    text: "I started with the $200 plan and couldn't be happier! The automated trading system works flawlessly. I've earned over $8,000 in just 4 months.",
    initials: "MR",
  },
  {
    name: "Sarah Chen",
    location: "Singapore",
    role: "Software Engineer",
    rating: 5,
    profit: "$15,200",
    text: "As someone with zero trading experience, ForexPro AI has been a game-changer. The transparency and daily profit reports give me complete peace of mind.",
    initials: "SC",
  },
  {
    name: "James Williams",
    location: "London, UK",
    role: "Financial Consultant",
    rating: 5,
    profit: "$22,800",
    text: "I upgraded to the Premium plan after seeing consistent results. The ROI is incredible, and the customer support team is always responsive.",
    initials: "JW",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
            Loved by traders worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied investors earning passive income through our automated platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-bold">{testimonial.profit}</p>
                    <p className="text-xs text-gray-500">Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">2,500+</div>
              <p className="text-gray-600">Active Investors</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">$5M+</div>
              <p className="text-gray-600">Managed Funds</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
