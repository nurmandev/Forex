import { useState } from "react";
import { Shield, Lock, User, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { authenticateAdmin, AdminUser } from "../../data/admin-auth";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: (admin: AdminUser) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const admin = authenticateAdmin(username, password);
      
      if (admin) {
        toast.success("Admin login successful!");
        onLogin(admin);
      } else {
        toast.error("Invalid admin credentials. Please try again.");
      }
      
      setIsLoading(false);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setUsername("admin");
    setPassword("1234");
    toast.info("Demo admin credentials filled.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg font-semibold">forexautomationservice</span>
              </div>
              <p className="text-blue-200 text-sm">Admin Panel</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Administrator Access</h1>
          <p className="text-blue-200">Sign in to manage the platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In as Admin"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50"
              onClick={fillDemoCredentials}
            >
              Use Demo Admin Account
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo Admin Credentials:</p>
            <p className="text-sm text-blue-700">Username: admin</p>
            <p className="text-sm text-blue-700">Password: 1234</p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-3 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>This is a secure admin area. All actions are logged and monitored.</p>
          </div>
        </div>

        {/* Back to Site Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-white hover:text-blue-200 text-sm">
            ← Back to Main Site
          </a>
        </div>
      </div>
    </div>
  );
}
