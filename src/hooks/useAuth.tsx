import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = 'fitness_auth_user';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          setAuthState(prev => ({ ...prev, user, loading: false }));
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        setAuthState(prev => ({ ...prev, loading: false, error: 'Erro ao carregar dados do usuário' }));
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email === 'user@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email,
          name: 'Usuário Teste',
          hasCompletedOnboarding: false, // New users haven't completed onboarding
          createdAt: new Date().toISOString(),
        };
        
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        setAuthState({ user, loading: false, error: null });
        return {};
      } else if (email === 'existing@example.com' && password === 'password') {
        // Existing user who already completed onboarding
        const user: User = {
          id: '2',
          email,
          name: 'Usuário Existente',
          hasCompletedOnboarding: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        };
        
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        setAuthState({ user, loading: false, error: null });
        return {};
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao fazer login';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { error: { message: errorMessage } };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        email,
        name: name || 'Novo Usuário',
        hasCompletedOnboarding: false, // New users always start without onboarding
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      setAuthState({ user, loading: false, error: null });
      return {};
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao criar conta';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setAuthState({ user: null, loading: false, error: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const completeOnboarding = async () => {
    if (!authState.user) return;
    
    try {
      const updatedUser = {
        ...authState.user,
        hasCompletedOnboarding: true,
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!authState.user) return;
    
    try {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const value: AuthContextType = {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signUp,
    signOut,
    completeOnboarding,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};