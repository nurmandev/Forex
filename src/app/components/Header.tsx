import { useState } from "react";
import { TrendingUp, Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { mockPages } from "../data/pages";
import { AuthUser } from "../data/auth";
import { NavigateFn } from "../types";

interface HeaderProps {
  currentUser?: AuthUser | null;
  onLoginClick?: () => void;
  onNavigate?: NavigateFn;
  onPageView?: (pageSlug: string) => void;
}

export function Header({ currentUser, onLoginClick, onNavigate, onPageView }: HeaderProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get published pages that should show in header
  const headerPages = mockPages.filter(page => page.showInHeader && page.status === "published");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate("home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };
  
  const handlePageClick = (slug: string) => {
    if (onPageView) {
      onPageView(slug);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">forexautomationservice</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("hero")} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection("plans")} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Pricing
            </button>
            <button onClick={() => onNavigate?.("about")} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              About
            </button>
            <button onClick={() => onNavigate?.("contact")} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Contact
            </button>
            {/* Custom Pages */}
            {headerPages.map(page => (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.slug)}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {page.title}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <Button
                onClick={() => onNavigate?.("dashboard")}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Button>
            ) : (
              <Button onClick={() => scrollToSection("plans")} className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            )}
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
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("hero")} className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2">
                Home
              </button>
              <button onClick={() => scrollToSection("plans")} className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2">
                Pricing
              </button>
              <button onClick={() => onNavigate?.("about")} className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2">
                About
              </button>
              <button onClick={() => onNavigate?.("contact")} className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2">
                Contact
              </button>
              {/* Custom Pages */}
              {headerPages.map(page => (
                <button
                  key={page.id}
                  onClick={() => handlePageClick(page.slug)}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
                >
                  {page.title}
                </button>
              ))}
              {currentUser ? (
                <Button
                  onClick={() => onNavigate?.("dashboard")}
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-2 flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Button>
              ) : (
                <Button onClick={() => scrollToSection("plans")} className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                  Get Started
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}