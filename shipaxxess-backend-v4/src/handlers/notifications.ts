import { db } from '@schemas/drizzle-orm';
import { notifications } from '@schemas/notifications';
import { sql } from 'drizzle-orm/sql';
// Utility function to generate a UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Create a notification
export const createNotification = async (title: string, description: string, type: 'global' | 'user', userId?: number) => {
  // Generate a UUID
  const uuid = generateUUID();

  // Construct values object
  const values: { 
    uuid: string;
    title: string;
    description: string;
    type: 'global' | 'user';
    user_id?: number;
    query: string;
  } = {
    uuid,
    title,
    description,
    type,
    query: '',
  };

  // Only include user_id if type is 'user'
  if (type === 'user' && userId !== undefined) {
    values.user_id = userId;
  }

  // Insert values and return the inserted rows
  return db.insert(notifications).values([values]).returning();
};

// Get notifications for a specific user
export const getUserNotifications = async (userId: number) => {
  return db.select()
    .from(notifications)
    .where(sql`user_id = ${userId}`);
};

// Delete a notification
export const deleteNotification = async (id: number) => {
  return db.delete(notifications).where(sql`id = ${id}`);
};
