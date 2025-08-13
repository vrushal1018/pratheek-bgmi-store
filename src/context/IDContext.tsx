import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

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

  const filteredIds = useMemo(() => 
    budgetFilter > 0 
      ? ids.filter(id => id.price <= budgetFilter && id.available)
      : ids.filter(id => id.available),
    [ids, budgetFilter]
  );

  const addNewID = useCallback((newID: Omit<BGMIID, 'id' | 'createdAt'>) => {
    // Generate a unique ID based on timestamp and random number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const id = `${timestamp}-${random}`;
    const createdAt = new Date().toISOString();
    
    const newIDWithMetadata = { ...newID, id, createdAt };
    console.log('Adding new ID:', newIDWithMetadata);
    
    setIds(prev => {
      const updatedIds = [...prev, newIDWithMetadata];
      // Immediately save to localStorage to ensure persistence
      try {
        localStorage.setItem('bgmi-ids', JSON.stringify(updatedIds));
        console.log('Immediately saved new ID to localStorage');
      } catch (error) {
        console.error('Error immediately saving to localStorage:', error);
      }
      return updatedIds;
    });
  }, []);

  const updateID = (id: string, updates: Partial<BGMIID>) => {
    setIds(prev => prev.map(idItem => 
      idItem.id === id ? { ...idItem, ...updates } : idItem
    ));
  };

  const deleteID = (id: string) => {
    setIds(prev => prev.filter(idItem => idItem.id !== id));
  };

  const markAsSold = (id: string) => {
    setIds(prev => prev.map(idItem => 
      idItem.id === id ? { ...idItem, available: false } : idItem
    ));
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

  // Load data from localStorage on mount
  useEffect(() => {
    const loadSavedIds = () => {
      try {
        const savedIds = localStorage.getItem('bgmi-ids');
        console.log('Loading from localStorage:', savedIds);
        
        if (savedIds && savedIds !== 'null' && savedIds !== 'undefined') {
          const parsedIds = JSON.parse(savedIds);
          console.log('Parsed IDs from localStorage:', parsedIds);
          
          // Validate that parsedIds is an array and has content
          if (Array.isArray(parsedIds) && parsedIds.length > 0) {
            setIds(parsedIds);
            console.log('Successfully loaded', parsedIds.length, 'IDs');
          } else {
            console.log('Parsed IDs is not a valid array or is empty');
            setIds([]);
          }
        } else {
          console.log('No saved IDs found in localStorage');
          setIds([]);
        }
      } catch (error) {
        console.error('Error loading saved IDs:', error);
        // If there's an error, clear localStorage and start fresh
        localStorage.removeItem('bgmi-ids');
        setIds([]);
      }
    };

    // Load immediately
    loadSavedIds();
    
    // Also listen for storage events (in case localStorage changes in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bgmi-ids') {
        console.log('Storage changed, reloading IDs');
        loadSavedIds();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save data to localStorage whenever ids change - with debouncing
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (ids.length > 0) {
        console.log('Saving IDs to localStorage:', ids);
        try {
          localStorage.setItem('bgmi-ids', JSON.stringify(ids));
          console.log('Successfully saved', ids.length, 'IDs to localStorage');
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      } else {
        console.log('No IDs to save, clearing localStorage');
        localStorage.removeItem('bgmi-ids');
      }
    }, 100); // Small delay to ensure state is stable

    return () => clearTimeout(saveTimeout);
  }, [ids]);

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
