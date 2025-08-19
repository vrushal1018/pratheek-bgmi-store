import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminLogin: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Test if component is rendering
  console.log('AdminLogin: Component rendering with email:', email, 'password:', password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in both email and password fields.');
      return;
    }

    if (!login || typeof login !== 'function') {
      setError('Login system not ready. Please try again.');
      return;
    }

    setError('');

    try {
      const loginResult = await login(email, password);
      if (loginResult) {
        onClose();
      } else {
        setError('Invalid credentials. Please try again.');
        setPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
      minHeight: '100vh',
      width: '100vw'
    }}>
      <div style={{
        backgroundColor: '#1f2937',
        border: '3px solid #4b5563',
        borderRadius: '12px',
        padding: '24px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: '0'
      }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '2px solid #4b5563',
          paddingBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '28px' }}>🔒</span>
            <span>Admin Login</span>
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '0' }}>
          
          {/* EMAIL FIELD - ALWAYS VISIBLE */}
          <div style={{ 
            marginBottom: '20px',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            position: 'relative',
            zIndex: 1
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '16px',
              visibility: 'visible',
              opacity: 1
            }}>
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#374151',
                border: '2px solid #6b7280',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                display: 'block',
                visibility: 'visible',
                opacity: 1,
                position: 'relative',
                zIndex: 1,
                minHeight: '48px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#6b7280';
                e.currentTarget.style.boxShadow = 'none';
              }}
              placeholder="Enter your email address"
              required
              autoFocus
            />
          </div>

          {/* PASSWORD FIELD - ALWAYS VISIBLE */}
          <div style={{ 
            marginBottom: '20px',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            position: 'relative',
            zIndex: 1
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '16px',
              visibility: 'visible',
              opacity: 1
            }}>
              🔑 Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '48px',
                  backgroundColor: '#374151',
                  border: '2px solid #6b7280',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  display: 'block',
                  visibility: 'visible',
                  opacity: 1,
                  position: 'relative',
                  zIndex: 1,
                  minHeight: '48px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#6b7280';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px',
                  fontSize: '20px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Debug Info */}
          <div style={{
            padding: '12px',
            backgroundColor: '#374151',
            border: '1px solid #6b7280',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>
              Debug: Email="{email}" | Password="{password ? '***' : 'empty'}" | Button disabled={!email || !password ? 'Yes' : 'No'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#7f1d1d',
              border: '2px solid #dc2626',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#fca5a5', fontSize: '14px', margin: 0 }}>
                ❌ {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={!email || !password}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: !email || !password ? '#6b7280' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: !email || !password ? 'not-allowed' : 'pointer',
              opacity: !email || !password ? 0.5 : 1,
              transition: 'all 0.2s',
              minHeight: '48px'
            }}
            onMouseEnter={(e) => {
              if (!(!email || !password)) {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!(!email || !password)) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            🔒 Login
          </button>
        </form>

        {/* Test Connection */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#374151',
          border: '1px solid #6b7280',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', margin: '0 0 12px 0' }}>
            Need help? Test the connection
          </p>
          <button
            type="button"
            onClick={async () => {
              try {
                const { testPocketBaseConnection } = await import('../pocketbase/test-connection');
                await testPocketBaseConnection();
              } catch (err) {
                console.error('Test connection failed:', err);
              }
            }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#047857';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🔧 Test Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
