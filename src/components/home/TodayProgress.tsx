
import React from 'react';
import { UtensilsCrossed, BookHeart } from 'lucide-react';
import { TodayProgressType } from '@/services/homeService';
import ProgressCard from './ProgressCard';

interface TodayProgressProps {
  progress: TodayProgressType;
}

const TodayProgress = ({ progress }: TodayProgressProps) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-medium text-slate-800 mb-3">Today's Progress</h2>
      <div className="grid grid-cols-2 gap-4">
        <ProgressCard 
          icon={<UtensilsCrossed size={20} className="text-emerald-600" />}
          title="Meals Logged"
          progress={progress.meals}
          total={progress.totalMeals}
        />
        <ProgressCard 
          icon={<BookHeart size={20} className="text-emerald-600" />}
          title="Journals Done"
          progress={progress.journals}
          total={progress.totalJournals}
        />
      </div>
    </section>
  );
};

export default TodayProgress;
