
import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, BookHeart, Mic, ChevronRight, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  getTodayProgress, 
  getRecentActivity, 
  getUpcomingReminders,
  TodayProgressType,
  RecentActivityType,
  ReminderType
} from '@/services/homeService';

// HomeScreen Component
const HomeScreen = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [todayProgress, setTodayProgress] = useState<TodayProgressType>({
    meals: 0,
    journals: 0,
    totalMeals: 3,
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
      case 'meal':
        window.location.hash = 'meal';
        break;
      case 'journal':
        window.location.hash = 'journal';
        break;
      case 'voice':
        // For future implementation
        toast({
          title: "Coming Soon",
          description: "Voice notes will be available in a future update."
        });
        break;
      default:
        break;
    }
  };

  // Loading state placeholder
  if (isLoading) {
    return (
      <div className="p-4 pt-8 space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 pt-8 space-y-6">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-slate-500">{formattedDate}</p>
        </div>
        <div className="bg-emerald-100 rounded-full p-3">
          <span className="text-emerald-600 font-semibold">{todayProgress.streakDays} days</span>
        </div>
      </header>
      
      {/* Daily Progress */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-medium text-slate-800 mb-3">Today's Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <ProgressCard 
            icon={<UtensilsCrossed size={20} className="text-emerald-600" />}
            title="Meals Logged"
            progress={todayProgress.meals}
            total={todayProgress.totalMeals}
          />
          <ProgressCard 
            icon={<BookHeart size={20} className="text-emerald-600" />}
            title="Journals Done"
            progress={todayProgress.journals}
            total={todayProgress.totalJournals}
          />
        </div>
      </section>
      
      {/* Quick Actions */}
      <section className="grid grid-cols-3 gap-3">
        <QuickActionButton 
          icon={<UtensilsCrossed size={20} />}
          label="Log Meal"
          color="bg-emerald-600"
          onClick={() => handleQuickAction('meal')}
        />
        <QuickActionButton 
          icon={<BookHeart size={20} />}
          label="Journal"
          color="bg-blue-600"
          onClick={() => handleQuickAction('journal')}
        />
        <QuickActionButton 
          icon={<Mic size={20} />}
          label="Voice Note"
          color="bg-purple-600"
          onClick={() => handleQuickAction('voice')}
        />
      </section>
      
      {/* Recent Activity */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-slate-800">Recent Activity</h2>
          <button className="text-sm text-emerald-600 flex items-center">
            View all <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentActivity.meals && recentActivity.meals.length > 0 ? (
            recentActivity.meals.map(meal => (
              <ActivityCard 
                key={meal.id}
                icon={<UtensilsCrossed size={16} className="text-emerald-600" />}
                title={meal.type}
                subtitle={meal.items}
                time={meal.time}
              />
            ))
          ) : (
            <div className="text-sm text-slate-500 italic text-center py-2">
              No meals logged yet today
            </div>
          )}
          
          {recentActivity.journals && recentActivity.journals.length > 0 ? (
            recentActivity.journals.map(entry => (
              <ActivityCard 
                key={entry.id}
                icon={<BookHeart size={16} className="text-blue-600" />}
                title={entry.title || "Journal Entry"}
                subtitle={`${entry.type}${entry.mood ? ` • Mood: ${entry.mood}` : ''}`}
                time={entry.time}
              />
            ))
          ) : (
            <div className="text-sm text-slate-500 italic text-center py-2">
              No journal entries yet today
            </div>
          )}
          
          {(!recentActivity.meals || recentActivity.meals.length === 0) && 
           (!recentActivity.journals || recentActivity.journals.length === 0) && (
            <div className="text-center py-4 text-slate-500">
              <p className="font-medium">Start tracking your nutrition journey</p>
              <p className="text-sm">Log meals and journal entries to see them here</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Upcoming Reminders */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-medium text-slate-800 mb-3">Upcoming</h2>
        {upcomingReminders && upcomingReminders.length > 0 ? (
          upcomingReminders.map(reminder => (
            <div key={reminder.id} className="flex items-center space-x-3 text-slate-600">
              <Calendar size={20} className="text-emerald-600" />
              <div>
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-slate-500">Today at {reminder.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-slate-500 italic">
            No reminders scheduled for today
          </div>
        )}
      </section>
    </div>
  );
};

interface ProgressCardProps {
  icon: React.ReactNode;
  title: string;
  progress: number;
  total: number;
}

const ProgressCard = ({ icon, title, progress, total }: ProgressCardProps) => {
  const percentage = total > 0 ? (progress / total) * 100 : 0;
  
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <div className="flex items-center mb-2">
        {icon}
        <span className="ml-2 text-sm font-medium text-slate-700">{title}</span>
      </div>
      <div className="relative h-2 bg-slate-200 rounded overflow-hidden">
        <div 
          className="absolute h-full bg-emerald-500 rounded" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">
        {progress} of {total} completed
      </p>
    </div>
  );
};

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

const QuickActionButton = ({ icon, label, color, onClick }: QuickActionButtonProps) => {
  return (
    <button 
      className={`${color} rounded-xl flex flex-col items-center justify-center p-4 text-white`}
      onClick={onClick}
    >
      <div className="bg-white/20 rounded-full p-2 mb-1">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
}

const ActivityCard = ({ icon, title, subtitle, time }: ActivityCardProps) => {
  return (
    <div className="flex items-center p-3 bg-slate-50 rounded-lg">
      <div className="bg-white p-2 rounded-full mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <span className="text-xs text-slate-400">{time}</span>
    </div>
  );
};

export default HomeScreen;
