
import React from 'react';

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

export default ProgressCard;
