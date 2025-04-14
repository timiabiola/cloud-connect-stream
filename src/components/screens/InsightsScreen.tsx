
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronDown, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const InsightsScreen = () => {
  // Placeholder data - will be replaced with real data from Supabase
  const nutrientData = {
    calories: {
      average: 1850,
      goal: 2000,
      trend: 'down'
    },
    protein: {
      average: 95,
      goal: 100,
      trend: 'up'
    },
    carbs: {
      average: 210,
      goal: 250,
      trend: 'down'
    },
    fat: {
      average: 65,
      goal: 70,
      trend: 'stable'
    }
  };

  return (
    <div className="container px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Insights</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          Last 7 Days <ChevronDown size={16} />
        </Button>
      </div>

      <Tabs defaultValue="nutrition" className="mb-6">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mood">Mood & Hunger</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nutrition">
          {/* Nutrition Summary */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nutrition Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Calories */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">Daily Calories</span>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 mr-2">
                        {nutrientData.calories.average} / {nutrientData.calories.goal} kcal
                      </span>
                      {nutrientData.calories.trend === 'down' ? (
                        <ArrowDown size={14} className="text-red-500" />
                      ) : (
                        <ArrowUp size={14} className="text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        nutrientData.calories.average >= nutrientData.calories.goal
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (nutrientData.calories.average / nutrientData.calories.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Protein */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">Daily Protein</span>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 mr-2">
                        {nutrientData.protein.average} / {nutrientData.protein.goal}g
                      </span>
                      {nutrientData.protein.trend === 'up' ? (
                        <ArrowUp size={14} className="text-green-500" />
                      ) : (
                        <ArrowDown size={14} className="text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (nutrientData.protein.average / nutrientData.protein.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Carbs */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">Daily Carbs</span>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 mr-2">
                        {nutrientData.carbs.average} / {nutrientData.carbs.goal}g
                      </span>
                      {nutrientData.carbs.trend === 'down' ? (
                        <ArrowDown size={14} className="text-red-500" />
                      ) : (
                        <ArrowUp size={14} className="text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (nutrientData.carbs.average / nutrientData.carbs.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Fat */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">Daily Fat</span>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 mr-2">
                        {nutrientData.fat.average} / {nutrientData.fat.goal}g
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600">Stable</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (nutrientData.fat.average / nutrientData.fat.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        
          {/* Placeholder for charts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nutrition Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                {/* This would be a chart in the real implementation */}
                <div className="w-32 h-32 rounded-full border-8 border-emerald-500 border-r-slate-200 mb-4 transform rotate-45"></div>
                <p className="text-slate-500">Macronutrient distribution</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm">Protein 25%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Carbs 50%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-sm">Fat 25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mood">
          {/* Placeholder for mood & hunger tracking */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Mood & Hunger Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-10">
                <p className="text-slate-500 mb-4">Start tracking your meals with mood and hunger levels to see patterns here.</p>
                <Button>Start Tracking</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          {/* Placeholder for progress tracking */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-10">
                <p className="text-slate-500 mb-4">Track your weight, measurements, and other metrics to visualize your progress.</p>
                <Button>Add Progress Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Trends and Insights */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Trends & Insights</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-3 h-3 mt-1 rounded-full bg-emerald-500 mr-2"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">You're meeting your protein goals consistently</p>
                  <p className="text-xs text-slate-500">Keep it up! Protein helps with muscle recovery and feeling full.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 mt-1 rounded-full bg-amber-500 mr-2"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Your calorie intake is trending downward</p>
                  <p className="text-xs text-slate-500">Make sure you're still getting enough nutrients by focusing on nutrient-dense foods.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 mt-1 rounded-full bg-blue-500 mr-2"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">You tend to skip breakfast on weekdays</p>
                  <p className="text-xs text-slate-500">Consider preparing quick breakfast options the night before.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsScreen;
