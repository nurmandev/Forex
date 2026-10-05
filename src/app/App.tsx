import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { InvestmentPlans } from "./components/InvestmentPlans";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { SubscriptionModal } from "./components/SubscriptionModal";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ContactUs } from "./components/ContactUs";
import { AboutUs } from "./components/AboutUs";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { CustomPageView } from "./components/CustomPageView";
import { InvestmentPlan, UserData } from "./types";
import { AuthUser } from "./data/auth";
import { AdminUser } from "./data/admin-auth";
import { mockPages } from "./data/pages";
import { toast } from "sonner";

type View = "home" | "login" | "register" | "dashboard" | "contact" | "about" | "admin-login" | "admin-dashboard" | "custom-page";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPageSlug, setCurrentPageSlug] = useState<string | null>(null);

  const handleGetStarted = () => {
    // Check if user is logged in
    if (currentUser) {
      const plansSection = document.getElementById("plans");
      if (plansSection) {
        plansSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setCurrentView("login");
    }
  };

  const handleSelectPlan = (plan: InvestmentPlan) => {
    if (currentUser) {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    } else {
      toast.info("Please login to subscribe to a plan");
      setCurrentView("login");
    }
  };

  const handleConfirmSubscription = (userData: UserData) => {
    console.log("Subscription confirmed:", userData);
    
    toast.success(
      `Subscription submitted successfully! Your MT4/MT5 credentials are being reviewed by our admin team. You'll receive an email notification once approved (typically within 1-2 business hours).`,
      {
        duration: 7000,
      }
    );
    
    setIsModalOpen(false);
    setSelectedPlan(null);
    
    // Switch to dashboard after subscription
    if (currentUser) {
      setCurrentView("dashboard");
    }
  };

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("home");
    toast.success("Logged out successfully");
  };

  const handleAdminLogin = (admin: AdminUser) => {
    setCurrentAdmin(admin);
    setCurrentView("admin-dashboard");
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    setCurrentView("home");
    toast.success("Admin logged out successfully");
  };

  const handlePageView = (slug: string) => {
    setCurrentPageSlug(slug);
    setCurrentView("custom-page");
  };

  // Render based on current view
  if (currentView === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentView("register")}
      />
    );
  }

  if (currentView === "register") {
    return (
      <Register
        onSwitchToLogin={() => setCurrentView("login")}
      />
    );
  }

  if (currentView === "dashboard" && currentUser) {
    return (
      <Dashboard
        user={currentUser}
        onLogout={handleLogout}
        onGoHome={() => setCurrentView("home")}
      />
    );
  }

  if (currentView === "contact") {
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigate={setCurrentView} onPageView={handlePageView} />
        <ContactUs />
        <Footer onNavigate={setCurrentView} onPageView={handlePageView} />
      </div>
    );
  }

  if (currentView === "about") {
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigate={setCurrentView} onPageView={handlePageView} />
        <AboutUs onNavigate={setCurrentView} />
        <Footer onNavigate={setCurrentView} onPageView={handlePageView} />
      </div>
    );
  }

  if (currentView === "admin-login") {
    return (
      <AdminLogin
        onLogin={handleAdminLogin}
      />
    );
  }

  if (currentView === "admin-dashboard" && currentAdmin) {
    return (
      <AdminDashboard
        admin={currentAdmin}
        onLogout={handleAdminLogout}
      />
    );
  }

  if (currentView === "custom-page" && currentPageSlug) {
    const page = mockPages.find(p => p.slug === currentPageSlug);
    if (page) {
      return (
        <CustomPageView
          page={page}
          onBack={() => setCurrentView("home")}
        />
      );
    }
  }

  // Default home view
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={setCurrentView} onPageView={handlePageView} />
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <Features />
        <InvestmentPlans onSelectPlan={handleSelectPlan} />
        <Testimonials />
      </main>
      <Footer onNavigate={setCurrentView} onPageView={handlePageView} />
      
      <SubscriptionModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlan(null);
        }}
        onConfirm={handleConfirmSubscription}
      />

      {/* Login/Dashboard Button */}
      {currentUser ? (
        <button
          onClick={() => setCurrentView("dashboard")}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50"
        >
          My Dashboard
        </button>
      ) : (
        <button
          onClick={() => setCurrentView("login")}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50"
        >
          Login / Sign Up
        </button>
      )}
    </div>
  );
}