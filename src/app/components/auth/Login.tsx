import { useState } from "react";
import { Mail, Lock, TrendingUp, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { authenticateUser, AuthUser } from "../../data/auth";
import { toast } from "sonner";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LoginProps {
  onLogin: (user: AuthUser) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = authenticateUser(email, password);
      
      if (user) {
        toast.success("Login successful! Welcome back.");
        onLogin(user);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
      
      setIsLoading(false);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setEmail("webcrowdofficial@gmail.com");
    setPassword("1234");
    toast.info("Demo credentials filled. Click Login to continue.");
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
                Start your<br />forex trading<br />journey today
              </h1>
              <p className="text-xl text-blue-100 max-w-md">
                Take control of your trading journey with our professionally managed forex trading plans and a transparent account management process.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold">2,500+</div>
                <p className="text-blue-200 text-sm mt-1">Active Users</p>
              </div>
              <div>
                <div className="text-3xl font-bold">$5M+</div>
                <p className="text-blue-200 text-sm mt-1">Managed</p>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <p className="text-blue-200 text-sm mt-1">Success Rate</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to access your dashboard and track your profits</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50"
              onClick={fillDemoCredentials}
            >
              Use Demo Account
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo Login Credentials:</p>
            <p className="text-sm text-blue-700">Email: webcrowdofficial@gmail.com</p>
            <p className="text-sm text-blue-700">Password: 1234</p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
