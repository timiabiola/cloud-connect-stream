
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, BookHeart, Calendar } from 'lucide-react';

const MindfulnessJournalScreen = () => {
  // Placeholder data - will be replaced with real data from Supabase
  const recentEntries = [
    {
      id: '1',
      title: 'Morning Reflection',
      content: 'Today I am feeling energized and motivated. My breakfast was nutritious and I feel prepared for the day ahead.',
      date: 'Today, 8:45 AM',
      mood: 'Energized',
      type: 'reflection'
    },
    {
      id: '2',
      title: 'Meal Mindfulness',
      content: 'I noticed I was eating too quickly at lunch. Taking a moment to slow down helped me enjoy my food more and feel more satisfied.',
      date: 'Yesterday, 1:15 PM',
      mood: 'Thoughtful',
      type: 'food'
    }
  ];

  // Journal entry types for quick add
  const entryTypes = [
    { id: 'reflection', name: 'General Reflection', icon: <Edit /> },
    { id: 'food', name: 'Food Relationship', icon: <UtensilsIcon /> },
    { id: 'gratitude', name: 'Gratitude', icon: <Heart /> },
    { id: 'mood', name: 'Mood Check-in', icon: <Smile /> }
  ];

  // Custom utensils icon component
  function UtensilsIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    );
  }

  // Custom heart icon component
  function Heart() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }

  // Custom smile icon component
  function Smile() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    );
  }

  return (
    <div className="container px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Mindfulness Journal</h1>
        <Button size="sm" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700">
          <Plus size={16} /> New Entry
        </Button>
      </div>

      {/* Calendar Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-800">April 2025</h2>
            <Button variant="ghost" size="sm">
              <Calendar size={16} className="mr-1" /> View Calendar
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-xs font-medium text-slate-500 py-1">{day}</div>
            ))}
            {Array.from({ length: 30 }).map((_, index) => {
              const day = index + 1;
              const hasEntry = day === 14 || day === 13; // Example days with entries
              const isToday = day === 14; // Example today
              
              return (
                <div 
                  key={index} 
                  className={`
                    py-1 rounded-full text-xs
                    ${isToday ? 'bg-emerald-100 text-emerald-700 font-bold' : ''}
                    ${hasEntry && !isToday ? 'bg-slate-100 font-medium' : ''}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Recent Entries</h2>
      <div className="space-y-3 mb-6">
        {recentEntries.map(entry => (
          <Card key={entry.id}>
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1 bg-pink-100 p-2 rounded">
                  <BookHeart className="h-5 w-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-slate-800">{entry.title}</p>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{entry.mood}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-1">{entry.content}</p>
                  <p className="text-xs text-slate-400">{entry.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Add Entry Types */}
      <h2 className="text-lg font-semibold text-slate-800 mb-3">New Entry</h2>
      <div className="grid grid-cols-2 gap-3">
        {entryTypes.map(type => (
          <Button key={type.id} variant="outline" className="h-auto py-3 justify-start">
            <div className="mr-3 text-emerald-600">
              {type.icon}
            </div>
            <span>{type.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MindfulnessJournalScreen;
