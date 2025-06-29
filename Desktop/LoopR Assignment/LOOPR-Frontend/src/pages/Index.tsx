import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { DashboardCards } from "@/components/DashboardCards";
import { ChartSection } from "@/components/ChartSection";
import { TransactionTable } from "@/components/TransactionTable";
import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm"; // ✅ Import SignupForm

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // ✅ Toggle login/signup

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        {showLogin ? (
          <>
            <LoginForm onLogin={() => setIsAuthenticated(true)} />
            <p className="text-sm text-gray-400 mt-0">
              Don't have an account?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-green-500 underline"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupForm onSignupSuccess={() => setShowLogin(true)} />
            <p className="text-sm text-gray-400 mt-0">
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-green-500 underline"
              >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <DashboardCards />
          <ChartSection />
          <TransactionTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
