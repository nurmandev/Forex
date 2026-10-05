import { TrendingUp, Menu, X, LogOut, User, Home } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { AuthUser } from "../../data/auth";

interface DashboardHeaderProps {
  user: AuthUser;
  onLogout: () => void;
  onGoHome?: () => void;
}

export function DashboardHeader({ user, onLogout, onGoHome }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">forexautomationservice</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {onGoHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onGoHome}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            )}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              {onGoHome && (
                <Button
                  variant="ghost"
                  onClick={onGoHome}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}