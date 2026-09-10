import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'alkabeer_user_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage error
    }
  }, [user]);

  const login = (credentials) => {
    const defaultUser = {
      name: credentials?.name || 'Tariq Ahmed',
      email: credentials?.identifier?.includes('@')
        ? credentials.identifier
        : 'tariq.ahmed@example.com',
      phone: !credentials?.identifier?.includes('@') && credentials?.identifier
        ? credentials.identifier
        : '9002461519',
      address: 'Mollar Chawk, Sarkarpara More, Bhagabatipur, Hooghly - 712701',
    };

    setUser(defaultUser);
    return defaultUser;
  };

  const logout = () => {
    setUser(null);
    setPendingAction(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const clearPendingAction = () => {
    setPendingAction(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        pendingAction,
        setPendingAction,
        clearPendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
