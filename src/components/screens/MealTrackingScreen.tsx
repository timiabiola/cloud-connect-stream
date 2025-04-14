
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight, UtensilsCrossed } from 'lucide-react';

const MealTrackingScreen = () => {
  // Placeholder data - will be replaced with real data from Supabase
  const todaysMeals = [
    {
      id: '1',
      type: 'breakfast',
      name: 'Greek Yogurt with Berries',
      time: '8:30 AM',
      calories: 320,
      protein: 18,
      carbs: 40,
      fat: 10
    },
    {
      id: '2',
      type: 'lunch',
      name: 'Grilled Chicken Salad',
      time: '12:30 PM',
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 15
    }
  ];

  return (
    <div className="container px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Meal Tracking</h1>
        <Button size="sm" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700">
          <Plus size={16} /> Add Meal
        </Button>
      </div>

      {/* Today's Summary */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Today's Summary</h2>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-sm text-slate-500">Calories</p>
              <p className="text-lg font-semibold text-slate-800">
                {todaysMeals.reduce((sum, meal) => sum + meal.calories, 0)}
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-sm text-slate-500">Protein</p>
              <p className="text-lg font-semibold text-slate-800">
                {todaysMeals.reduce((sum, meal) => sum + meal.protein, 0)}g
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-sm text-slate-500">Carbs</p>
              <p className="text-lg font-semibold text-slate-800">
                {todaysMeals.reduce((sum, meal) => sum + meal.carbs, 0)}g
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded">
              <p className="text-sm text-slate-500">Fat</p>
              <p className="text-lg font-semibold text-slate-800">
                {todaysMeals.reduce((sum, meal) => sum + meal.fat, 0)}g
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Today's Meals</h2>
      <div className="space-y-3 mb-6">
        {todaysMeals.map(meal => (
          <Card key={meal.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 bg-emerald-100 p-2 rounded">
                    <UtensilsCrossed className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 capitalize">{meal.type}</p>
                    <p className="text-sm text-slate-500">{meal.name}</p>
                    <p className="text-xs text-slate-400">{meal.time} • {meal.calories} kcal</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add meal card */}
        <Button variant="outline" className="w-full justify-start h-auto py-3 border-dashed">
          <div className="flex items-center">
            <div className="mr-3 bg-slate-100 p-2 rounded">
              <Plus className="h-5 w-5 text-slate-500" />
            </div>
            <span>Add another meal</span>
          </div>
        </Button>
      </div>

      {/* Quick Add Buttons */}
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Quick Add</h2>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-3 justify-start">
          <div className="text-left">
            <p className="font-medium">Breakfast</p>
            <p className="text-xs text-slate-500">Morning meal</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto py-3 justify-start">
          <div className="text-left">
            <p className="font-medium">Lunch</p>
            <p className="text-xs text-slate-500">Midday meal</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto py-3 justify-start">
          <div className="text-left">
            <p className="font-medium">Dinner</p>
            <p className="text-xs text-slate-500">Evening meal</p>
          </div>
        </Button>
        <Button variant="outline" className="h-auto py-3 justify-start">
          <div className="text-left">
            <p className="font-medium">Snack</p>
            <p className="text-xs text-slate-500">Between meals</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default MealTrackingScreen;
