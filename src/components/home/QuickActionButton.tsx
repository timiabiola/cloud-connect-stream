
import React from 'react';

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

export default QuickActionButton;
