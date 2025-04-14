
import React from 'react';

interface HomeHeaderProps {
  date: string;
  userName?: string;
  streakDays: number;
}

const HomeHeader = ({ date, userName, streakDays }: HomeHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Welcome back{userName ? `, ${userName}` : ''}
        </h1>
        <p className="text-slate-500">{date}</p>
      </div>
      <div className="bg-emerald-100 rounded-full p-3">
        <span className="text-emerald-600 font-semibold">{streakDays} days</span>
      </div>
    </header>
  );
};

export default HomeHeader;
