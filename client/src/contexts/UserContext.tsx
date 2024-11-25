'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import client from '@/services/client';
import { useLoading } from './LoadingContext';
import { toast } from 'react-toastify';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  role?: 'Listener' | 'Artist';
}

interface ResetPasswordCredentials {
  email: string;
}

interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  artistName: string | null;
  photoUrl: string | null;
  gender: string;
  dateOfBirth: string;
  about: string | null;
  created: string;
  photos: Array<{ id: number; url: string; isMain: boolean }>;
  token: string;
}

interface IUserContext {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  login: (loginCreds: LoginCredentials | null) => Promise<void>;
  signup: (signupCreds: SignupCredentials) => Promise<void>;
  resetPassword: (
    resetPasswordCreds: ResetPasswordCredentials
  ) => Promise<void>;
  logout: () => void;
  checkEmailExists: (email: string) => Promise<boolean>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setIsLoading } = useLoading();

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken && storedToken !== '') {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);

      if (
        !window.location.pathname.match(
          /\/(login|signup|verify-code|reset-password)/
        )
      ) {
        router.push('/login');
      }
    }
  }, [router]);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const repsonse = await client<boolean>('/api/auth/email-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return repsonse;
    } catch (error) {
      console.error('Email check failed:', error);
      throw error;
    }
  };

  const signup = async (signupCreds: SignupCredentials): Promise<void> => {
    try {
      const response = await client<UserDto>('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupCreds),
      });

      if (response.token) {
        setToken(response.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const login = async (loginCreds: LoginCredentials | null): Promise<void> => {
    try {
      const response = await client<UserDto>('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCreds),
      });

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        setToken(response.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  const resetPassword = async (
    resetPasswordCreds: ResetPasswordCredentials
  ) => {
    try {
      await client<UserDto>('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetPasswordCreds),
      });
      toast(`password resested:  ${resetPasswordCreds.email}`);
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  const logout = (): void => {
    setIsLoading(true);
    try {
      localStorage.removeItem('authToken');
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const value = {
    login,
    signup,
    logout,
    token,
    setToken,
    resetPassword,
    isAuthenticated,
    checkEmailExists,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
