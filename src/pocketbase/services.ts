import { BGMIID } from '../context/IDContext';

// PocketBase record type for BGMI IDs
export interface PocketBaseBGMIID {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  level: number;
  skins: string[];
  rank: string;
  kd: number;
  matches: number;
  available: boolean;
  created: string;
  updated: string;
}

// Local storage key for temporary data storage
const STORAGE_KEY = 'bgmi-ids-temp';

// Helper function to get IDs from localStorage
const getIdsFromStorage = (): BGMIID[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Helper function to save IDs to localStorage
const saveIdsToStorage = (ids: BGMIID[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Add a new BGMI ID
export const addBGMIID = async (newID: Omit<BGMIID, 'id' | 'createdAt'>): Promise<string> => {
  try {
    // Create a new ID with timestamp
    const id = 'id-' + Date.now();
    const createdAt = new Date().toISOString();
    
    const bgmiID: BGMIID = {
      ...newID,
      id,
      createdAt,
    };
    
    // Get existing IDs and add new one
    const existingIds = getIdsFromStorage();
    existingIds.push(bgmiID);
    saveIdsToStorage(existingIds);
    
    console.log('BGMI ID added successfully with ID:', id);
    return id;
  } catch (error) {
    console.error('Error adding BGMI ID:', error);
    throw error;
  }
};

// Get all BGMI IDs
export const getAllBGMIIDs = async (): Promise<BGMIID[]> => {
  try {
    const ids = getIdsFromStorage();
    console.log('Retrieved', ids.length, 'BGMI IDs from localStorage');
    return ids;
  } catch (error) {
    console.error('Error getting BGMI IDs:', error);
    return [];
  }
};

// Update a BGMI ID
export const updateBGMIID = async (id: string, updates: Partial<BGMIID>): Promise<void> => {
  try {
    const existingIds = getIdsFromStorage();
    const index = existingIds.findIndex(item => item.id === id);
    
    if (index !== -1) {
      existingIds[index] = { ...existingIds[index], ...updates };
      saveIdsToStorage(existingIds);
      console.log('BGMI ID updated successfully:', id);
    } else {
      throw new Error('BGMI ID not found');
    }
  } catch (error) {
    console.error('Error updating BGMI ID:', error);
    throw error;
  }
};

// Delete a BGMI ID
export const deleteBGMIID = async (id: string): Promise<void> => {
  try {
    const existingIds = getIdsFromStorage();
    const filteredIds = existingIds.filter(item => item.id !== id);
    saveIdsToStorage(filteredIds);
    console.log('BGMI ID deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting BGMI ID:', error);
    throw error;
  }
};

// Mark a BGMI ID as sold
export const markBGMIIDAsSold = async (id: string): Promise<void> => {
  try {
    const existingIds = getIdsFromStorage();
    const index = existingIds.findIndex(item => item.id === id);
    
    if (index !== -1) {
      existingIds[index].available = false;
      saveIdsToStorage(existingIds);
      console.log('BGMI ID marked as sold:', id);
    } else {
      throw new Error('BGMI ID not found');
    }
  } catch (error) {
    console.error('Error marking BGMI ID as sold:', error);
    throw error;
  }
};

// Get a single BGMI ID by ID
export const getBGMIIDById = async (id: string): Promise<BGMIID | undefined> => {
  try {
    const existingIds = getIdsFromStorage();
    const found = existingIds.find(item => item.id === id);
    console.log('BGMI ID get by ID requested:', id, found ? 'found' : 'not found');
    return found;
  } catch (error) {
    console.error('Error getting BGMI ID by ID:', error);
    return undefined;
  }
};

// Real-time subscription for live updates
export const subscribeToBGMIIDs = (callback: (ids: BGMIID[]) => void) => {
  // For now, return a no-op subscription until PocketBase is properly set up
  // This will be replaced with actual PocketBase operations
  console.log('Real-time subscription requested (mock)');
  
  // Initial call with current data
  const currentIds = getIdsFromStorage();
  callback(currentIds);
  
  return () => {
    console.log('Real-time subscription cancelled (mock)');
  };
};
