
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Leaf, Droplets, Heart } from 'lucide-react';

const HomeScreen = () => {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  // Placeholder data until we implement the full functionality
  const todaysStats = {
    calories: 1200,
    totalCalorieGoal: 2000,
    waterIntake: 3,
    waterGoal: 8,
    mealCount: 2,
    journalEntries: 1
  };

  return (
    <div className="container px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Hello, {firstName}!</h1>
        <p className="text-slate-500">Welcome to your wellness dashboard</p>
      </div>

      {/* Today's summary card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Today's Overview</CardTitle>
          <CardDescription>Your progress so far</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Calories progress */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700">Calories</span>
                <span className="text-sm text-slate-500">
                  {todaysStats.calories} / {todaysStats.totalCalorieGoal} kcal
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${Math.min(100, (todaysStats.calories / todaysStats.totalCalorieGoal) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Water intake */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700">Water</span>
                <span className="text-sm text-slate-500">
                  {todaysStats.waterIntake} / {todaysStats.waterGoal} glasses
                </span>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: todaysStats.waterGoal }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 flex-1 rounded ${i < todaysStats.waterIntake ? 'bg-blue-400' : 'bg-slate-100'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => window.location.hash = 'meal'}>
          <div className="flex flex-col items-center w-full">
            <UtensilsCrossed className="h-6 w-6 mb-2 text-emerald-600" />
            <span>Log a Meal</span>
          </div>
        </Button>
        <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => window.location.hash = 'journal'}>
          <div className="flex flex-col items-center w-full">
            <Heart className="h-6 w-6 mb-2 text-pink-500" />
            <span>Add Journal Entry</span>
          </div>
        </Button>
        <Button variant="outline" className="h-auto py-4 justify-start">
          <div className="flex flex-col items-center w-full">
            <Droplets className="h-6 w-6 mb-2 text-blue-500" />
            <span>Log Water</span>
          </div>
        </Button>
        <Button variant="outline" className="h-auto py-4 justify-start">
          <div className="flex flex-col items-center w-full">
            <Leaf className="h-6 w-6 mb-2 text-green-500" />
            <span>Log Exercise</span>
          </div>
        </Button>
      </div>

      {/* Recent activity - placeholder for now */}
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Recent Activity</h2>
      <div className="space-y-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="mr-4 bg-emerald-100 p-2 rounded">
                <UtensilsCrossed className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Breakfast</p>
                <p className="text-sm text-slate-500">Today, 8:30 AM • 420 kcal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="mr-4 bg-pink-100 p-2 rounded">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Wellness Journal Entry</p>
                <p className="text-sm text-slate-500">Today, 9:15 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
