import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  checkAuth: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  try {
    const context = useContext(AdminContext);
    if (context === undefined) {
      // Return a safe fallback instead of throwing an error
      console.warn('useAdmin called outside of AdminProvider, using fallback values');
      return {
        isAdmin: false,
        login: (password: string) => {
          console.warn('Login attempted outside of AdminProvider');
          return false;
        },
        logout: () => {
          console.warn('Logout attempted outside of AdminProvider');
        },
        checkAuth: () => {
          console.warn('checkAuth called outside of AdminProvider');
        },
      };
    }
    return context;
  } catch (error) {
    console.error('Error in useAdmin hook:', error);
    // Return fallback values if there's any error
    return {
      isAdmin: false,
      login: (password: string) => false,
      logout: () => {},
      checkAuth: () => {},
    };
  }
};

// Add a hook to check if the context is ready
export const useAdminReady = () => {
  try {
    const context = useContext(AdminContext);
    return context !== undefined;
  } catch {
    return false;
  }
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Admin password - in production, this should be stored securely on the server
  const ADMIN_PASSWORD = 'bgmi2024';

  const login = (password: string): boolean => {
    console.log('AdminContext: Login attempt with password:', password === ADMIN_PASSWORD ? 'CORRECT' : 'INCORRECT');
    if (password === ADMIN_PASSWORD) {
      console.log('AdminContext: Setting isAdmin to true');
      setIsAdmin(true);
      try {
        localStorage.setItem('bgmi-admin-auth', 'true');
        console.log('AdminContext: Saved to localStorage');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      return true;
    }
    console.log('AdminContext: Login failed');
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('bgmi-admin-auth');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  const checkAuth = () => {
    try {
      const auth = localStorage.getItem('bgmi-admin-auth');
      if (auth === 'true') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      // Clear any corrupted localStorage data
      try {
        localStorage.removeItem('bgmi-admin-auth');
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
    }
  };

  useEffect(() => {
    console.log('AdminContext: Initializing...');
    try {
      checkAuth();
    } catch (error) {
      console.error('Error during AdminContext initialization:', error);
    }
    setIsInitialized(true);
    console.log('AdminContext: Initialized, isAdmin:', isAdmin);
  }, []);

  const value: AdminContextType = {
    isAdmin,
    login,
    logout,
    checkAuth,
  };

  // Don't render until context is fully initialized
  if (!isInitialized) {
    return (
      <AdminContext.Provider value={value}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Initializing Admin System...</p>
            <p className="text-sm text-gray-400 mt-2">Please wait...</p>
          </div>
        </div>
      </AdminContext.Provider>
    );
  }

  try {
    return (
      <AdminContext.Provider value={value}>
        {children}
      </AdminContext.Provider>
    );
  } catch (error) {
    console.error('Error rendering AdminProvider:', error);
    // Fallback render if there's an error
    return (
      <AdminContext.Provider value={value}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Something went wrong</h3>
            <p className="text-gray-400 mb-6">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </AdminContext.Provider>
    );
  }
};
