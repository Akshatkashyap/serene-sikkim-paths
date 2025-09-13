import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  showLoginModal: boolean;
  login: () => void;
  logout: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    if (loginStatus === 'true' && loginTime) {
      // Check if login is still valid (24 hours)
      const now = new Date();
      const loginDate = new Date(loginTime);
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setIsLoggedIn(true);
      } else {
        // Session expired
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
        setShowLoginModal(true);
      }
    } else {
      // Show login modal for new users
      const hasSeenLogin = localStorage.getItem('hasSeenLogin');
      if (!hasSeenLogin) {
        setShowLoginModal(true);
        localStorage.setItem('hasSeenLogin', 'true');
      }
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const value = {
    isLoggedIn,
    showLoginModal,
    login,
    logout,
    closeLoginModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};