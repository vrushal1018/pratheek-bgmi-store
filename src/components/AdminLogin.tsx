import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Lock, Eye, EyeOff, X } from 'lucide-react';

const AdminLogin: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  console.log('AdminLogin: Component rendered, attempts:', attempts, 'isLocked:', isLocked, 'error:', error);

  // Prevent component from unmounting unexpectedly
  useEffect(() => {
    console.log('AdminLogin: Component mounted');
    return () => {
      console.log('AdminLogin: Component unmounting');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('AdminLogin: handleSubmit called, attempts:', attempts, 'isLocked:', isLocked);
    
    // Check if account is locked
    if (isLocked) {
      setError('Account is temporarily locked. Please wait before trying again.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const loginResult = await login(email, password);
    console.log('AdminLogin: login result:', loginResult);

    if (loginResult) {
      // Reset attempts on successful login
      setAttempts(0);
      setError('');
      console.log('AdminLogin: Login successful, closing modal');
      // Add a small delay to ensure state updates properly
      setTimeout(() => {
        onClose();
      }, 100);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      console.log('AdminLogin: Login failed, new attempts:', newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setError('Too many failed attempts. Account locked for 5 minutes.');
        console.log('AdminLogin: Account locked');
        // Unlock after 5 minutes
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
          setError('');
          console.log('AdminLogin: Account unlocked');
        }, 5 * 60 * 1000);
      } else {
        const remainingAttempts = 3 - newAttempts;
        setError(`Invalid credentials. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`);
        setPassword('');
        console.log('AdminLogin: Password cleared, attempts remaining:', remainingAttempts);
        // IMPORTANT: Modal should stay open here - do NOT call onClose()
        console.log('AdminLogin: Modal staying open for retry');
      }
    }
    setIsLoading(false);
  };

  // Show loading if context is not ready
  if (!login || typeof login !== 'function') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="card max-w-md w-full">
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Lock className="text-primary-400" size={24} />
            <span>Admin Access</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter admin email"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Admin Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-12"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm border ${
              isLocked 
                ? 'bg-orange-600/20 border-orange-500/30 text-orange-400' 
                : 'bg-red-600/20 border-red-500/30 text-red-400'
            }`}>
              {error}
            </div>
          )}

          {/* Attempts Counter */}
          {attempts > 0 && !isLocked && (
            <div className="p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm text-center">
              Attempts: {attempts}/3
            </div>
          )}

          {/* Lock Status */}
          {isLocked && (
            <div className="p-3 bg-orange-600/20 border border-orange-500/30 rounded-lg text-orange-400 text-sm text-center">
              🔒 Account temporarily locked
            </div>
          )}

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isLoading || !email || !password || isLocked}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : isLocked ? (
                <>
                  <Lock size={20} />
                  <span>Account Locked</span>
                </>
              ) : (
                <>
                  <Lock size={20} />
                  <span>Login</span>
                </>
              )}
            </button>

            {isLocked && (
              <button
                type="button"
                onClick={() => {
                  setIsLocked(false);
                  setAttempts(0);
                  setError('');
                  setEmail('');
                  setPassword('');
                }}
                className="w-full px-4 py-2 bg-orange-600/20 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors"
              >
                Reset & Try Again
              </button>
            )}
            
            {/* Try Again Button for Failed Attempts */}
            {!isLocked && attempts > 0 && (
              <div className="space-y-2">
                <button
                  type="button"
                                  onClick={() => {
                  setAttempts(0);
                  setError('');
                  setEmail('');
                  setPassword('');
                }}
                  className="w-full px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                >
                  Try Again
                </button>
                <button
                  type="button"
                                  onClick={() => {
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                  className="w-full px-4 py-2 bg-gray-600/20 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                >
                  Clear Password
                </button>
              </div>
            )}
          </div>
        </form>

        <div className="mt-6 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm text-center">
            Contact the store owner for admin access
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
