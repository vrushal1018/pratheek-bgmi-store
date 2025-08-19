import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { useAdmin, useAdminReady } from '../context/AdminContext';
import AdminLogin from './AdminLogin';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const isAdminReady = useAdminReady();
  const { isAdmin, logout } = useAdmin();

  // Prevent modal from closing when admin state changes
  useEffect(() => {
    if (isAdmin && showAdminLogin) {
      // Keep modal open briefly to show success, then close
      setTimeout(() => {
        setShowAdminLogin(false);
      }, 500);
    }
  }, [isAdmin, showAdminLogin]);

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-gaming font-bold text-lg">BG</span>
            </div>
            <span className="text-white font-gaming font-bold text-xl hidden sm:block">
              BGMI Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            
            <button
              onClick={() => {
                const whatsappUrl = "https://wa.me/919663998885?text=Hi! I'm interested in BGMI IDs";
                window.location.href = whatsappUrl;
              }}
              className="btn-primary"
            >
              Contact Us
            </button>
            
            {isAdminReady && (
              isAdmin ? (
                <div className="flex items-center space-x-2">
                  <Link to="/admin" className="btn-secondary flex items-center space-x-2">
                    <Settings size={20} />
                    <span>Admin Panel</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="px-4 py-2 bg-gray-600/20 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                >
                  Admin
                </button>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-primary-400 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-primary-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <button 
                onClick={() => {
                  const whatsappUrl = "https://wa.me/919663998885?text=Hi! I'm interested in BGMI IDs";
                  window.location.href = whatsappUrl;
                  setIsMenuOpen(false);
                }}
                className="btn-primary text-center"
              >
                Contact Us
              </button>
              
              {isAdminReady && (
                isAdmin ? (
                  <div className="space-y-2">
                    <Link 
                      to="/admin" 
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-secondary w-full text-center flex items-center justify-center space-x-2"
                    >
                      <Settings size={20} />
                      <span>Admin Panel</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAdminLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gray-600/20 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                  >
                    Admin
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin 
          onClose={() => {
            setShowAdminLogin(false);
          }} 
        />
      )}
    </nav>
  );
};

export default Navbar;
