import { useState } from "react";
import { Mail, Lock, User, TrendingUp, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { registerUser } from "../../data/auth";
import { toast } from "sonner";

interface RegisterProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: (email: string, name: string) => void;
}

export function Register({ onSwitchToLogin, onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const success = registerUser(formData.email, formData.name, formData.password);
      
      if (success) {
        toast.success("Account created successfully! Welcome aboard.");
        onRegisterSuccess(formData.email, formData.name);
      } else {
        toast.error("An account with this email already exists.");
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">forexautomationservice</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Join thousands<br />of successful<br />traders
              </h1>
              <p className="text-xl text-blue-100 max-w-md">
                Create your account and start earning consistent profits with our AI-powered forex automation.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Automated Trading</p>
                  <p className="text-blue-200 text-sm">AI-powered system handles everything</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Real-Time Tracking</p>
                  <p className="text-blue-200 text-sm">Monitor profits 24/7 on your dashboard</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Secure & Transparent</p>
                  <p className="text-blue-200 text-sm">Bank-level security for your funds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-blue-200 text-sm">
            © 2025 ForexPro AI. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button for Mobile */}
          <button 
            onClick={() => window.history.back()}
            className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">forexautomationservice</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Join thousands of investors earning passive income</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Re-enter your password"
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-600 text-sm">Passwords do not match</p>
            )}

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>.
                I understand that forex trading involves risk.
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to receive marketing emails from ForexPro AI. 
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
