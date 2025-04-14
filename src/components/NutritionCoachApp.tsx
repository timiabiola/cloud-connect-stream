
import React, { useState, useEffect } from 'react';
import { Home, BookHeart, BarChart2, User, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

// Import screen components
import HomeScreen from '@/components/screens/HomeScreen';
import MindfulnessJournalScreen from '@/components/screens/MindfulnessJournalScreen';
import InsightsScreen from '@/components/screens/InsightsScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import MealTrackingScreen from '@/components/screens/MealTrackingScreen';

// Navigation Button Component
const NavButton = ({ icon, label, isActive, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center w-full py-1 ${
        isActive ? 'text-emerald-600' : 'text-slate-500'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

// Main App Component
const NutritionCoachApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();
  
  // Initialize app and check authentication
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check URL hash on load and when it changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'journal', 'insights', 'profile', 'meals'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    
    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Update hash when tab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);
  
  // If user is not authenticated, redirect to login
  if (!user && !isLoading) {
    return <Navigate to="/auth" />;
  }
  
  // Screen rendering based on active tab
  const renderScreen = () => {
    switch(activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'journal':
        return <MindfulnessJournalScreen />;
      case 'insights':
        return <InsightsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'meals':
        return <MealTrackingScreen />;
      default:
        return <HomeScreen />;
    }
  };
  
  // Loading screen
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse mb-4">
          <BookHeart size={32} className="text-emerald-600" />
        </div>
        <h1 className="text-xl font-semibold text-slate-800 mb-2">Nutrition Coach</h1>
        <p className="text-slate-500">Loading your wellness journey...</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16">
        {renderScreen()}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white shadow-lg rounded-t-xl">
        <div className="flex justify-around items-center h-16">
          <NavButton 
            icon={<Home size={24} />} 
            label="Home" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavButton 
            icon={<UtensilsCrossed size={24} />} 
            label="Meals" 
            isActive={activeTab === 'meals'} 
            onClick={() => setActiveTab('meals')} 
          />
          <NavButton 
            icon={<BookHeart size={24} />} 
            label="Journal" 
            isActive={activeTab === 'journal'} 
            onClick={() => setActiveTab('journal')} 
          />
          <NavButton 
            icon={<BarChart2 size={24} />} 
            label="Insights" 
            isActive={activeTab === 'insights'} 
            onClick={() => setActiveTab('insights')} 
          />
          <NavButton 
            icon={<User size={24} />} 
            label="Profile" 
            isActive={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
        </div>
      </nav>
    </div>
  );
};

export default NutritionCoachApp;
