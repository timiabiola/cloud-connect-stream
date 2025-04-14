
import React from 'react';
import { BookHeart, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { RecentActivityType } from '@/services/homeService';
import ActivityCard from './ActivityCard';

interface RecentActivityProps {
  activity: RecentActivityType;
}

const RecentActivity = ({ activity }: RecentActivityProps) => {
  const hasActivity = (activity.journals && activity.journals.length > 0) || 
                     (activity.meals && activity.meals.length > 0);
  
  return (
    <section className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-slate-800">Recent Activity</h2>
        <button className="text-sm text-emerald-600 flex items-center">
          View all <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-3">
        {activity.meals && activity.meals.map(meal => (
          <ActivityCard 
            key={meal.id}
            icon={<UtensilsCrossed size={16} className="text-emerald-600" />}
            title={meal.type}
            subtitle={meal.items || "No items"}
            time={meal.time}
          />
        ))}
        
        {activity.journals && activity.journals.map(entry => (
          <ActivityCard 
            key={entry.id}
            icon={<BookHeart size={16} className="text-blue-600" />}
            title={entry.title || "Journal Entry"}
            subtitle={`${entry.type}${entry.mood ? ` • Mood: ${entry.mood}` : ''}`}
            time={entry.time}
          />
        ))}
        
        {!hasActivity && (
          <div className="text-center py-4 text-slate-500">
            <p className="font-medium">Start tracking your wellness journey</p>
            <p className="text-sm">Log meals and journal your thoughts to see them here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
