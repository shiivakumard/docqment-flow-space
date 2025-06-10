
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoginMutation, useSignupMutation, useLogoutMutation } from '@/store/api/authApi';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll simulate the API call since we don't have a real backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      
      // In a real app, you would use:
      // const result = await loginMutation({ email, password }).unwrap();
      // setUser(result.user);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock-jwt-token');
      
      // In a real app, you would use:
      // const result = await signupMutation(userData).unwrap();
      // setUser(result.user);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // In a real app, you would also call:
    // logoutMutation();
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
