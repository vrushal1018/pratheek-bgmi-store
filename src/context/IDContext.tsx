import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { 
  addBGMIID, 
  getAllBGMIIDs, 
  updateBGMIID, 
  deleteBGMIID, 
  markBGMIIDAsSold, 
  getBGMIIDById 
} from '../firebase/services';

export interface BGMIID {
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
  createdAt: string;
}

interface IDContextType {
  ids: BGMIID[];
  filteredIds: BGMIID[];
  budgetFilter: number;
  setBudgetFilter: (budget: number) => void;
  addNewID: (newID: Omit<BGMIID, 'id' | 'createdAt'>) => void;
  updateID: (id: string, updates: Partial<BGMIID>) => void;
  deleteID: (id: string) => void;
  markAsSold: (id: string) => void;
  getIDById: (id: string) => BGMIID | undefined;
  clearAllIDs: () => void;
  debugStorage: () => void;
  restoreFromStorage: () => void;
  forceSaveToStorage: () => void;
}

const IDContext = createContext<IDContextType | undefined>(undefined);

export const useIDContext = () => {
  const context = useContext(IDContext);
  if (!context) {
    throw new Error('useIDContext must be used within an IDProvider');
  }
  return context;
};

interface IDProviderProps {
  children: ReactNode;
}

export const IDProvider: React.FC<IDProviderProps> = ({ children }) => {
  const [ids, setIds] = useState<BGMIID[]>([]);

  const [budgetFilter, setBudgetFilter] = useState<number>(0);

  // Sample IDs that will show for all users (including hosted version)
  const sampleIds: BGMIID[] = [
    {
      id: 'sample-1',
      title: 'Pro Conqueror Account',
      description: 'High-level BGMI account with rare skins, excellent stats, and competitive gameplay. Perfect for serious players.',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      level: 85,
      skins: ['M416 Glacier', 'AKM Dragon', 'Kar98k Golden Dragon', 'AWM Dragon'],
      rank: 'Conqueror',
      kd: 4.2,
      matches: 1250,
      available: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      title: 'Ace Level Account',
      description: 'Mid-tier BGMI account with good skins and balanced stats. Great for casual to competitive players.',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      level: 65,
      skins: ['M416 Glacier', 'AKM Dragon', 'Kar98k Golden Dragon'],
      rank: 'Ace',
      kd: 3.1,
      matches: 850,
      available: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-3',
      title: 'Crown Rank Account',
      description: 'Entry-level BGMI account with basic skins and decent stats. Perfect for beginners and casual players.',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      level: 45,
      skins: ['M416 Glacier', 'AKM Dragon'],
      rank: 'Crown',
      kd: 2.5,
      matches: 500,
      available: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const filteredIds = useMemo(() => 
    budgetFilter > 0 
      ? ids.filter(id => id.price <= budgetFilter && id.available)
      : ids.filter(id => id.available),
    [ids, budgetFilter]
  );

  const addNewID = useCallback(async (newID: Omit<BGMIID, 'id' | 'createdAt'>) => {
    try {
      console.log('Adding new ID to Firebase:', newID);
      
      // Add to Firebase
      const firebaseId = await addBGMIID(newID);
      console.log('Successfully added to Firebase with ID:', firebaseId);
      
      // Update local state with the new ID from Firebase
      const newIDWithMetadata = { 
        ...newID, 
        id: firebaseId, 
        createdAt: new Date().toISOString() 
      };
      
      setIds(prev => [...prev, newIDWithMetadata]);
      console.log('Updated local state with new ID');
      
    } catch (error) {
      console.error('Error adding new ID:', error);
      throw error;
    }
  }, []);

  const updateID = async (id: string, updates: Partial<BGMIID>) => {
    try {
      await updateBGMIID(id, updates);
      setIds(prev => prev.map(idItem => 
        idItem.id === id ? { ...idItem, ...updates } : idItem
      ));
    } catch (error) {
      console.error('Error updating ID:', error);
      throw error;
    }
  };

  const deleteID = async (id: string) => {
    try {
      await deleteBGMIID(id);
      setIds(prev => prev.filter(idItem => idItem.id !== id));
    } catch (error) {
      console.error('Error deleting ID:', error);
      throw error;
    }
  };

  const markAsSold = async (id: string) => {
    try {
      await markBGMIIDAsSold(id);
      setIds(prev => prev.map(idItem => 
        idItem.id === id ? { ...idItem, available: false } : idItem
      ));
    } catch (error) {
      console.error('Error marking ID as sold:', error);
      throw error;
    }
  };

  const getIDById = (id: string) => {
    return ids.find(idItem => idItem.id === id);
  };

  const clearAllIDs = () => {
    setIds([]);
    localStorage.removeItem('bgmi-ids');
    console.log('All IDs cleared');
  };

  const debugStorage = () => {
    const savedIds = localStorage.getItem('bgmi-ids');
    console.log('=== DEBUG STORAGE ===');
    console.log('Current state ids:', ids);
    console.log('localStorage savedIds:', savedIds);
    if (savedIds) {
      try {
        const parsed = JSON.parse(savedIds);
        console.log('Parsed localStorage:', parsed);
        console.log('localStorage size:', new Blob([savedIds]).size, 'bytes');
      } catch (error) {
        console.error('Error parsing localStorage:', error);
      }
    }
    console.log('localStorage available:', navigator.storage ? 'Yes' : 'Unknown');
    console.log('=====================');
  };

  const restoreFromStorage = () => {
    console.log('Manually restoring from localStorage...');
    const savedIds = localStorage.getItem('bgmi-ids');
    if (savedIds) {
      try {
        const parsedIds = JSON.parse(savedIds);
        if (Array.isArray(parsedIds) && parsedIds.length > 0) {
          setIds(parsedIds);
          console.log('Successfully restored', parsedIds.length, 'IDs');
        } else {
          console.log('No valid IDs found in localStorage');
        }
      } catch (error) {
        console.error('Error restoring from localStorage:', error);
      }
    } else {
      console.log('No saved IDs found in localStorage');
    }
  };

  const forceSaveToStorage = () => {
    console.log('Force saving current IDs to localStorage...');
    try {
      localStorage.setItem('bgmi-ids', JSON.stringify(ids));
      console.log('Successfully force saved', ids.length, 'IDs');
    } catch (error) {
      console.error('Error force saving to localStorage:', error);
    }
  };

  // Load data from Firebase on mount
  useEffect(() => {
    const loadIdsFromFirebase = async () => {
      try {
        console.log('Loading IDs from Firebase...');
        const firebaseIds = await getAllBGMIIDs();
        
        if (firebaseIds.length > 0) {
          setIds(firebaseIds);
          console.log('Successfully loaded', firebaseIds.length, 'IDs from Firebase');
        } else {
          console.log('No IDs found in Firebase, using sample IDs');
          setIds(sampleIds);
        }
      } catch (error) {
        console.error('Error loading IDs from Firebase:', error);
        console.log('Using sample IDs due to Firebase error');
        setIds(sampleIds);
      }
    };

    // Load immediately
    loadIdsFromFirebase();
  }, []);

  // Firebase automatically handles data persistence, no need for localStorage saving

  const value: IDContextType = {
    ids,
    filteredIds,
    budgetFilter,
    setBudgetFilter,
    addNewID,
    updateID,
    deleteID,
    markAsSold,
    getIDById,
    clearAllIDs,
    debugStorage,
    restoreFromStorage,
    forceSaveToStorage,
  };

  return (
    <IDContext.Provider value={value}>
      {children}
    </IDContext.Provider>
  );
};
