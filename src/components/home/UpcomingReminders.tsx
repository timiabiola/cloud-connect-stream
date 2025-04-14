
import React from 'react';
import { Calendar } from 'lucide-react';
import { ReminderType } from '@/services/homeService';

interface UpcomingRemindersProps {
  reminders: ReminderType[];
}

const UpcomingReminders = ({ reminders }: UpcomingRemindersProps) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-medium text-slate-800 mb-3">Upcoming</h2>
      {reminders && reminders.length > 0 ? (
        reminders.map(reminder => (
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
  );
};

export default UpcomingReminders;
