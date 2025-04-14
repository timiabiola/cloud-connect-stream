
import { supabase } from '@/integrations/supabase/client';

export type MealItem = {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
};

export type Meal = {
  id: string;
  type: string;
  time: string;
  date: string;
  items: MealItem[];
};

export type FoodItem = {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  serving: string;
};

/**
 * Fetches meals for a specific date
 * @param userId - The user's ID
 * @param date - Date to fetch meals for (defaults to current date)
 * @returns Array of meals for the specified date
 */
export const getMealsByDate = async (
  userId: string, 
  date: Date = new Date()
): Promise<Meal[]> => {
  try {
    const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
    const { data, error } = await supabase
      .rpc('get_meals_by_date', { 
        user_id: userId,
        date_param: dateStr
      });
    
    if (error) {
      console.error('Error fetching meals by date:', error);
      return [];
    }
    
    return data as Meal[] || [];
  } catch (error) {
    console.error('Error fetching meals by date:', error);
    return [];
  }
};

/**
 * Fetches recent meals for a user
 * @param userId - The user's ID
 * @param limit - Maximum number of meals to return
 * @returns Array of recent meals
 */
export const getRecentMeals = async (
  userId: string,
  limit: number = 5
): Promise<Meal[]> => {
  try {
    const { data, error } = await supabase
      .rpc('get_recent_meals', { 
        user_id: userId,
        limit_count: limit
      });
    
    if (error) {
      console.error('Error fetching recent meals:', error);
      return [];
    }
    
    return data as Meal[] || [];
  } catch (error) {
    console.error('Error fetching recent meals:', error);
    return [];
  }
};

/**
 * Searches for food items in the database
 * @param searchTerm - Text to search for
 * @param limit - Maximum number of results to return
 * @returns Array of matching food items
 */
export const searchFoods = async (
  searchTerm: string,
  limit: number = 10
): Promise<FoodItem[]> => {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }
    
    const { data, error } = await supabase
      .rpc('search_foods', { 
        search_term: searchTerm,
        limit_count: limit
      });
    
    if (error) {
      console.error('Error searching foods:', error);
      return [];
    }
    
    return data as FoodItem[] || [];
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};

/**
 * Saves a new meal with its items
 * @param userId - The user's ID
 * @param mealType - Type of meal (Breakfast, Lunch, Dinner, Snack)
 * @param mealTime - Time of the meal (HH:MM format)
 * @param mealDate - Date of the meal (defaults to current date)
 * @param mealItems - Array of food items in the meal
 * @returns The created meal ID if successful, null otherwise
 */
export const saveMeal = async (
  userId: string,
  mealType: string,
  mealTime: string,
  mealItems: MealItem[],
  mealDate: Date = new Date()
): Promise<string | null> => {
  try {
    // Format date as YYYY-MM-DD
    const dateStr = mealDate.toISOString().split('T')[0];
    
    // Format time as HH:MM:SS
    let timeStr = mealTime;
    if (mealTime.includes('AM') || mealTime.includes('PM')) {
      // Convert from 12-hour to 24-hour format if needed
      const [timePart, ampm] = mealTime.split(' ');
      const [hours, minutes] = timePart.split(':').map(Number);
      let hour = hours;
      
      if (ampm === 'PM' && hours < 12) {
        hour += 12;
      } else if (ampm === 'AM' && hours === 12) {
        hour = 0;
      }
      
      timeStr = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    }
    
    // First, create the meal log
    const { data: mealData, error: mealError } = await supabase
      .from('meal_logs')
      .insert({
        user_id: userId,
        meal_type: mealType,
        meal_time: timeStr,
        meal_date: dateStr
      })
      .select('id')
      .single();
    
    if (mealError || !mealData) {
      console.error('Error creating meal log:', mealError);
      return null;
    }
    
    const mealId = mealData.id;
    
    // Then, insert all meal items
    const mealItemsToInsert = mealItems.map(item => ({
      meal_log_id: mealId,
      food_name: item.name,
      quantity: item.quantity,
      calories: item.calories,
      protein_g: item.protein_g || null,
      carbs_g: item.carbs_g || null,
      fat_g: item.fat_g || null
    }));
    
    const { error: itemsError } = await supabase
      .from('meal_items')
      .insert(mealItemsToInsert);
    
    if (itemsError) {
      console.error('Error creating meal items:', itemsError);
      // If items fail to insert, remove the meal log to avoid orphaned records
      await supabase.from('meal_logs').delete().eq('id', mealId);
      return null;
    }
    
    return mealId;
  } catch (error) {
    console.error('Error saving meal:', error);
    return null;
  }
};

/**
 * Deletes a meal and all its items
 * @param mealId - ID of the meal to delete
 * @returns True if deletion was successful, false otherwise
 */
export const deleteMeal = async (mealId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('meal_logs')
      .delete()
      .eq('id', mealId);
    
    if (error) {
      console.error('Error deleting meal:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting meal:', error);
    return false;
  }
};
