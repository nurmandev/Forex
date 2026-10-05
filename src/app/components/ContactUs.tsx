import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, HeadphonesIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { toast } from "sonner";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">24/7 Support Available</span>
            </div>
            <h1 className="mb-6 text-5xl md:text-6xl">Let's Talk</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We're here to answer your questions and help you get started with automated forex trading.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600 bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get help via email
                </p>
                <a href="mailto:support@forexpro.ai" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  support@forexpro.ai
                </a>
              </Card>

              <Card className="p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-600 bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl">Call Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Mon-Fri, 8am-8pm GMT
                </p>
                <a href="tel:+442079460958" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  +44 20 7946 0958
                </a>
              </Card>

              <Card className="p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-600 bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl">Visit Office</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Financial District
                </p>
                <p className="text-blue-600 font-medium text-sm">
                  London, UK EC2N 2AN
                </p>
              </Card>

              <Card className="p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-pink-600 bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <HeadphonesIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Instant support
                </p>
                <p className="text-blue-600 font-medium text-sm">
                  Available 24/7
                </p>
              </Card>
            </div>

            {/* Contact Form & Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left Side - Contact Form */}
              <div className="lg:col-span-3">
                <Card className="p-10 shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-white">
                  <div className="mb-8">
                    <h2 className="mb-3">Send Us a Message</h2>
                    <p className="text-gray-600">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="mb-3 text-2xl text-blue-600">Message Sent Successfully!</h3>
                      <p className="text-gray-600 text-lg">
                        Thank you for reaching out. We'll respond shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full h-12 bg-white"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full h-12 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          required
                          className="w-full h-12 bg-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your inquiry..."
                          rows={8}
                          required
                          className="w-full resize-none bg-white"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </Card>
              </div>

              {/* Right Side - Why Contact Us */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h3 className="mb-6 text-2xl">Why Reach Out?</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Expert Guidance</h4>
                        <p className="text-gray-600 text-sm">
                          Get personalized advice from our forex trading experts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Quick Response</h4>
                        <p className="text-gray-600 text-sm">
                          Average response time of less than 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Secure & Private</h4>
                        <p className="text-gray-600 text-sm">
                          Your information is encrypted and kept confidential.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border border-pink-100">
                      <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Custom Solutions</h4>
                        <p className="text-gray-600 text-sm">
                          We tailor our services to meet your specific needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Support Hours Card */}
                  <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-blue-400" />
                      <h4 className="text-lg font-semibold">Support Hours</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monday - Friday</span>
                        <span className="font-medium">8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Saturday</span>
                        <span className="font-medium">10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-700">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Emergency Support</span>
                          <span className="font-medium text-blue-400">24/7 Available</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-4">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="mb-4 text-4xl">Common Questions</h2>
              <p className="text-gray-600 text-lg">
                Quick answers to questions you may have
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-white border-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">?</span>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">How quickly will I get a response?</h4>
                    <p className="text-gray-600">
                      We aim to respond to all inquiries within 24 hours during business days. 
                      For urgent matters, please call our support hotline.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-white border-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">?</span>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">What should I include in my message?</h4>
                    <p className="text-gray-600">
                      Please provide your name, email, and a detailed description of your inquiry. 
                      If you're an existing customer, include your account information.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-white border-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">?</span>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">Do you offer live chat support?</h4>
                    <p className="text-gray-600">
                      Yes! Our live chat is available 24/7 for all registered users. 
                      Log in to your dashboard to access instant support.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-white border-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">?</span>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">Can I schedule a consultation?</h4>
                    <p className="text-gray-600">
                      Absolutely! Mention your preferred time in the message, and our team 
                      will reach out to schedule a one-on-one consultation.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}