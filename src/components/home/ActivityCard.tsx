
import React from 'react';

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

export default ActivityCard;
