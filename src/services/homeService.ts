
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetches today's progress for a user from Supabase
 * @param userId - The user's ID
 * @returns Object containing today's progress data
 */
export const getTodayProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .rpc('get_today_progress', { user_id: userId });
    
    if (error) {
      console.error('Error fetching today progress:', error);
      return null;
    }
    
    return data || {
      meals: 0,
      journals: 0,
      totalMeals: 3,
      totalJournals: 3,
      streakDays: 0
    };
  } catch (error) {
    console.error('Error fetching today progress:', error);
    return null;
  }
};

/**
 * Fetches recent activity for a user from Supabase
 * @param userId - The user's ID
 * @returns Object containing recent meals and journal entries
 */
export const getRecentActivity = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .rpc('get_recent_activity', { user_id: userId });
    
    if (error) {
      console.error('Error fetching recent activity:', error);
      return { meals: [], journals: [] };
    }
    
    return data || { meals: [], journals: [] };
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return { meals: [], journals: [] };
  }
};

/**
 * Fetches upcoming reminders for a user from Supabase
 * @param userId - The user's ID
 * @returns Array of upcoming reminders
 */
export const getUpcomingReminders = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .rpc('get_upcoming_reminders', { user_id: userId });
    
    if (error) {
      console.error('Error fetching upcoming reminders:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching upcoming reminders:', error);
    return [];
  }
};
