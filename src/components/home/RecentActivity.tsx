
import React from 'react';
import { BookHeart, ChevronRight } from 'lucide-react';
import { RecentActivityType } from '@/services/homeService';
import ActivityCard from './ActivityCard';

interface RecentActivityProps {
  activity: RecentActivityType;
}

const RecentActivity = ({ activity }: RecentActivityProps) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-slate-800">Recent Activity</h2>
        <button className="text-sm text-emerald-600 flex items-center">
          View all <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-3">
        {activity.journals && activity.journals.length > 0 ? (
          activity.journals.map(entry => (
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
        
        {(!activity.journals || activity.journals.length === 0) && (
          <div className="text-center py-4 text-slate-500">
            <p className="font-medium">Start tracking your wellness journey</p>
            <p className="text-sm">Journal your thoughts and feelings to see them here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
