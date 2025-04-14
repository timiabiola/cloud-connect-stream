
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getTodayProgress, 
  getRecentActivity, 
  getUpcomingReminders,
  TodayProgressType,
  RecentActivityType,
  ReminderType
} from '@/services/homeService';

// Import refactored components
import HomeHeader from '@/components/home/HomeHeader';
import TodayProgress from '@/components/home/TodayProgress';
import QuickActions from '@/components/home/QuickActions';
import RecentActivity from '@/components/home/RecentActivity';
import UpcomingReminders from '@/components/home/UpcomingReminders';
import HomeLoading from '@/components/home/HomeLoading';

// HomeScreen Component
const HomeScreen = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [todayProgress, setTodayProgress] = useState<TodayProgressType>({
    meals: 0,
    journals: 0,
    totalMeals: 0,
    totalJournals: 3,
    streakDays: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivityType>({
    meals: [],
    journals: []
  });
  const [upcomingReminders, setUpcomingReminders] = useState<ReminderType[]>([]);
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Fetch data when component mounts or user changes
  useEffect(() => {
    const fetchHomeData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch today's progress
        const progressData = await getTodayProgress(user.id);
        if (progressData) {
          setTodayProgress(progressData);
        }
        
        // Fetch recent activity
        const activityData = await getRecentActivity(user.id);
        if (activityData) {
          setRecentActivity(activityData);
        }
        
        // Fetch upcoming reminders
        const remindersData = await getUpcomingReminders(user.id);
        if (remindersData) {
          setUpcomingReminders(remindersData);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: "Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHomeData();
  }, [user, toast]);

  // Handle quick action button clicks
  const handleQuickAction = (action: string) => {
    // Navigate to the appropriate screen based on action
    switch(action) {
      case 'journal':
        window.location.hash = 'journal';
        break;
      case 'meals':
        window.location.hash = 'meals';
        break;
      case 'voice':
        // Already handled in QuickActions component
        break;
      default:
        break;
    }
  };

  // Loading state
  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <div className="p-4 pt-8 space-y-6">
      <HomeHeader 
        date={formattedDate} 
        userName={profile?.full_name ? profile.full_name.split(' ')[0] : undefined}
        streakDays={todayProgress.streakDays} 
      />
      
      <TodayProgress progress={todayProgress} />
      
      <QuickActions onActionSelect={handleQuickAction} />
      
      <RecentActivity activity={recentActivity} />
      
      <UpcomingReminders reminders={upcomingReminders} />
    </div>
  );
};

export default HomeScreen;
