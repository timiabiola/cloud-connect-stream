
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Plus, Search, Save, UtensilsCrossed, Coffee, Apple, Pizza, IceCream, ArrowRight, BookHeart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Meal, 
  MealItem, 
  FoodItem, 
  getMealsByDate, 
  searchFoods,
  saveMeal 
} from '@/services/mealService';

// Helper components - These could be moved to separate files for better organization
const MealTypeIcon = ({ type }: { type: string }) => {
  switch(type.toLowerCase()) {
    case 'breakfast':
      return <div className="bg-amber-100 p-2 rounded-full"><Coffee size={20} className="text-amber-600" /></div>;
    case 'lunch':
      return <div className="bg-emerald-100 p-2 rounded-full"><UtensilsCrossed size={20} className="text-emerald-600" /></div>;
    case 'dinner':
      return <div className="bg-blue-100 p-2 rounded-full"><Pizza size={20} className="text-blue-600" /></div>;
    case 'snack':
      return <div className="bg-purple-100 p-2 rounded-full"><Apple size={20} className="text-purple-600" /></div>;
    default:
      return <div className="bg-slate-100 p-2 rounded-full"><IceCream size={20} className="text-slate-600" /></div>;
  }
};

const NutritionCard = ({ label, value, unit }: { label: string, value: number | string, unit: string }) => {
  return (
    <div className="bg-slate-100 rounded-lg p-2 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">
        {value}<span className="text-xs ml-1">{unit}</span>
      </p>
    </div>
  );
};

// Helper functions
const calculateTotalCalories = (items: MealItem[]) => {
  return items.reduce((sum, item) => sum + item.calories, 0);
};

// Main Screen Components
const MealListView = ({ 
  meals, 
  onAddMeal, 
  onViewMeal 
}: {
  meals: Meal[],
  onAddMeal: () => void,
  onViewMeal: (meal: Meal) => void
}) => {
  // Group meals by date
  const groupedMeals = meals.reduce((groups: {[key: string]: Meal[]}, meal) => {
    const date = meal.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(meal);
    return groups;
  }, {});
  
  return (
    <div className="p-4 pt-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Your Meals</h1>
        <button 
          onClick={onAddMeal}
          className="bg-emerald-600 rounded-full w-10 h-10 flex items-center justify-center text-white shadow-sm"
        >
          <Plus size={20} />
        </button>
      </header>
      
      <div className="space-y-6">
        {Object.keys(groupedMeals).length > 0 ? (
          Object.entries(groupedMeals).map(([date, mealsForDate]) => (
            <div key={date}>
              <h2 className="text-sm font-medium text-slate-500 mb-3">{date}</h2>
              <div className="space-y-3">
                {mealsForDate.map(meal => (
                  <div 
                    key={meal.id}
                    className="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
                    onClick={() => onViewMeal(meal)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MealTypeIcon type={meal.type} />
                        <div className="ml-3">
                          <h3 className="font-medium text-slate-800">{meal.type}</h3>
                          <p className="text-xs text-slate-500">
                            {meal.items ? `${meal.items.length} items · ${calculateTotalCalories(meal.items)} cal` : 'No items'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-slate-400">
                        <Clock size={14} className="mr-1" />
                        <span className="text-xs">{meal.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">No meals logged yet</h3>
            <p className="text-slate-500 mb-4">Start tracking your nutrition journey</p>
            <button 
              onClick={onAddMeal}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Log Your First Meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AddMealView = ({ 
  onBack, 
  selectedFoods, 
  setSelectedFoods, 
  mealType, 
  setMealType,
  searchQuery,
  setSearchQuery,
  filteredFoods,
  onSave,
  isLoading
}: {
  onBack: () => void, 
  selectedFoods: FoodItem[], 
  setSelectedFoods: React.Dispatch<React.SetStateAction<FoodItem[]>>, 
  mealType: string, 
  setMealType: React.Dispatch<React.SetStateAction<string>>,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  filteredFoods: FoodItem[],
  onSave: () => void,
  isLoading: boolean
}) => {
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  );
  
  const addFood = (food: FoodItem) => {
    setSelectedFoods(prev => [...prev, food]);
    setSearchQuery('');
  };
  
  const removeFood = (foodId: string) => {
    setSelectedFoods(prev => prev.filter(food => food.id !== foodId));
  };
  
  const totalCalories = selectedFoods.reduce((sum, food) => sum + food.calories, 0);
  
  return (
    <div className="h-full">
      {/* Header */}
      <header className="p-4 flex items-center border-b border-slate-200">
        <button 
          onClick={onBack}
          className="mr-3 text-slate-500"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-slate-800">Log Meal</h1>
      </header>
      
      {/* Meal Type Selection */}
      <section className="p-4 border-b border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">Meal Type</label>
        <div className="grid grid-cols-4 gap-2">
          {mealTypes.map(type => (
            <button
              key={type}
              className={`p-2 rounded-lg text-sm font-medium ${
                mealType === type 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}
              onClick={() => setMealType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </section>
      
      {/* Time Selection */}
      <section className="p-4 border-b border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          When did you eat?
        </label>
        <div className="flex items-center bg-slate-100 p-2 rounded-lg">
          <Clock size={20} className="text-slate-500 mr-2" />
          <input 
            type="time"
            className="bg-transparent outline-none text-slate-800"
            value={currentTime}
            onChange={(e) => {
              // Convert 24h format to 12h format with AM/PM
              const timeValue = e.target.value;
              const [hours, minutes] = timeValue.split(':').map(Number);
              
              const date = new Date();
              date.setHours(hours, minutes);
              const formattedTime = date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
              });
              
              setCurrentTime(formattedTime);
            }}
          />
        </div>
      </section>
      
      {/* Food Search */}
      <section className="p-4 border-b border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Add Food Items
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search foods..."
            className="w-full p-3 pl-10 rounded-lg bg-slate-100 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        </div>
        
        {searchQuery && (
          <div className="mt-2 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredFoods.length > 0 ? (
              filteredFoods.map(food => (
                <div 
                  key={food.id}
                  className="p-3 border-b border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-50"
                  onClick={() => addFood(food)}
                >
                  <div>
                    <p className="font-medium text-slate-800">{food.name}</p>
                    <p className="text-xs text-slate-500">{food.serving} · {food.calories} cal</p>
                  </div>
                  <Plus size={18} className="text-emerald-600" />
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-slate-500">
                No foods found. Try another search.
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* Selected Foods */}
      <section className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-medium text-slate-800 mb-3">Your Meal</h2>
        {selectedFoods.length > 0 ? (
          <div className="space-y-3">
            {selectedFoods.map(food => (
              <div 
                key={food.id}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-800">{food.name}</p>
                  <p className="text-xs text-slate-500">{food.serving} · {food.calories} cal</p>
                </div>
                <button 
                  onClick={() => removeFood(food.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center p-3 mt-2 bg-emerald-50 rounded-lg">
              <span className="font-semibold text-slate-800">Total Calories</span>
              <span className="font-semibold text-emerald-600">{totalCalories} cal</span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 bg-slate-50 rounded-lg">
            <p className="text-slate-500">No foods added yet.</p>
            <p className="text-sm text-slate-400">Use the search above to add food items.</p>
          </div>
        )}
      </section>
      
      {/* Save Button */}
      <div className="p-4">
        <button
          className={`w-full py-3 rounded-lg flex items-center justify-center ${
            selectedFoods.length > 0 && mealType 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-200 text-slate-400'
          }`}
          disabled={selectedFoods.length === 0 || !mealType || isLoading}
          onClick={onSave}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Save size={18} className="mr-2" />
          )}
          Save Meal
        </button>
      </div>
    </div>
  );
};

const MealDetailsView = ({ meal, onBack }: { meal: Meal, onBack: () => void }) => {
  const totalCalories = calculateTotalCalories(meal.items);
  
  // Calculate nutrition totals - these would be more accurate with actual data
  const totalProtein = meal.items.reduce((sum, item) => sum + (item.protein_g || 0), 0);
  const totalCarbs = meal.items.reduce((sum, item) => sum + (item.carbs_g || 0), 0);
  const totalFat = meal.items.reduce((sum, item) => sum + (item.fat_g || 0), 0);
  
  return (
    <div>
      {/* Header */}
      <header className="p-4 border-b border-slate-200 flex items-center">
        <button 
          onClick={onBack}
          className="mr-3 text-slate-500"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">{meal.type}</h1>
          <div className="flex items-center text-sm text-slate-500">
            <Clock size={14} className="mr-1" />
            <span>{meal.time}</span>
          </div>
        </div>
      </header>
      
      {/* Nutritional Summary */}
      <section className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-medium text-slate-800 mb-3">Nutrition Summary</h2>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <NutritionCard label="Calories" value={totalCalories} unit="cal" />
          <NutritionCard label="Protein" value={Math.round(totalProtein)} unit="g" />
          <NutritionCard label="Carbs" value={Math.round(totalCarbs)} unit="g" />
          <NutritionCard label="Fat" value={Math.round(totalFat)} unit="g" />
        </div>
      </section>
      
      {/* Food Items */}
      <section className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-medium text-slate-800 mb-3">Food Items</h2>
        <div className="space-y-3">
          {meal.items && meal.items.map(item => (
            <div 
              key={item.id}
              className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">{item.quantity}</p>
              </div>
              <span className="text-sm text-slate-600">{item.calories} cal</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Journal Entry Link */}
      <section className="p-4">
        <button
          className="w-full py-3 rounded-lg bg-blue-600 text-white flex items-center justify-center"
          onClick={() => {
            // Navigate to journal entry screen - would be implemented in actual app
            window.location.hash = 'journal';
          }}
        >
          <BookHeart size={18} className="mr-2" />
          Add Journal Entry
        </button>
      </section>
    </div>
  );
};

// Main Component
const MealTrackingScreen: React.FC = () => {
  const [step, setStep] = useState('list'); // 'list', 'add', 'details'
  const [mealType, setMealType] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch meals on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const mealsData = await getMealsByDate(user.id);
        setMeals(mealsData);
      } catch (error) {
        console.error('Error loading meals:', error);
        toast({
          variant: "destructive",
          title: "Failed to load meals",
          description: "Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMeals();
  }, [user, toast]);
  
  // Search for foods when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setFilteredFoods([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await searchFoods(searchQuery);
        setFilteredFoods(results);
      } catch (error) {
        console.error('Error searching foods:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    
    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);
  
  const handleSaveMeal = async () => {
    if (!user || !mealType || selectedFoods.length === 0) return;
    
    setIsLoading(true);
    try {
      // Prepare items for saving with proper format
      const items: MealItem[] = selectedFoods.map(food => ({
        id: '', // Will be generated by DB
        name: food.name,
        quantity: food.serving,
        calories: food.calories,
        protein_g: food.protein_g,
        carbs_g: food.carbs_g,
        fat_g: food.fat_g
      }));
      
      const mealId = await saveMeal(user.id, mealType, currentTime(), items);
      
      if (mealId) {
        toast({
          title: "Meal saved",
          description: `Your ${mealType.toLowerCase()} has been logged successfully.`
        });
        
        // Refresh meals list
        const updatedMeals = await getMealsByDate(user.id);
        setMeals(updatedMeals);
        
        // Reset form and go back to list view
        setSelectedFoods([]);
        setMealType('');
        setSearchQuery('');
        setStep('list');
      } else {
        throw new Error('Failed to save meal');
      }
    } catch (error) {
      console.error('Error saving meal:', error);
      toast({
        variant: "destructive",
        title: "Failed to save meal",
        description: "Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to get current time in 12-hour format
  const currentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  const renderScreen = () => {
    switch(step) {
      case 'list':
        return <MealListView 
          meals={meals} 
          onAddMeal={() => setStep('add')} 
          onViewMeal={(meal) => {
            setSelectedMeal(meal);
            setStep('details');
          }}
        />;
      case 'add':
        return <AddMealView 
          onBack={() => setStep('list')}
          selectedFoods={selectedFoods}
          setSelectedFoods={setSelectedFoods}
          mealType={mealType}
          setMealType={setMealType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredFoods={filteredFoods}
          onSave={handleSaveMeal}
          isLoading={isLoading}
        />;
      case 'details':
        return selectedMeal ? (
          <MealDetailsView 
            meal={selectedMeal} 
            onBack={() => setStep('list')}
          />
        ) : (
          <div className="p-4">
            <button onClick={() => setStep('list')} className="text-emerald-600">
              Back to meals
            </button>
            <p className="text-center p-4">Meal not found</p>
          </div>
        );
      default:
        return <MealListView meals={meals} onAddMeal={() => setStep('add')} onViewMeal={() => {}} />;
    }
  };
  
  return (
    <div className="pb-4">
      {isLoading && step === 'list' ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500">Loading your meals...</p>
        </div>
      ) : (
        renderScreen()
      )}
    </div>
  );
};

export default MealTrackingScreen;
