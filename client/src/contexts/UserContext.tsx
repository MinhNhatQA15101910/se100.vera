'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from './LoadingContext';

import client from '@/services/client';
import { toast } from 'react-toastify';

import {
  LoginCredentials,
  SignupCredentials,
  ResetPasswordCredentials,
  UserDto,
  SendEmailDto,
  ValidateType,
} from '@/types/auth';

interface IUserContext {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  userDetails: UserDto | null;
  setUserDetails: (userDetails: UserDto | null) => void;
  login: (loginCreds: LoginCredentials | null) => Promise<void>;
  validateSignup: (signupCreds: SignupCredentials) => Promise<ValidateType>;
  signup: (pincode: string) => Promise<void>;
  verifyEmailSignup: (signupCreds: SignupCredentials) => Promise<void>;
  resetPassword: (
    resetPasswordCreds: ResetPasswordCredentials
  ) => Promise<void>;
  logout: () => void;
  checkEmailExists: (email: string) => Promise<boolean>;
  sendEmail: (sendEmailDto: SendEmailDto) => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tempTokenSignUp, setTempTokenSignUp] = useState<string>('');
  const [userDetails, setUserDetails] = useState<UserDto | null>(null);
  const { setLoadingState } = useLoading();

  const router = useRouter();

  const sendEmail = async (sendEmailDto: SendEmailDto): Promise<void> => {
    setLoadingState(true);
    try {
      await client<SendEmailDto>('/api/auth/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(sendEmailDto),
      });
    } catch (error) {
      console.error('Send email error:', error);
    } finally {
      setLoadingState(false);
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    if (!email) {
      throw new Error('Email is required');
    }

    try {
      const response = await client<boolean>('/api/auth/email-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return response.data;
    } catch (error) {
      console.error('Email check failed:', error);
      throw error;
    }
  };

  const verifyEmailSignup = async (
    signupCreds: SignupCredentials
  ): Promise<void> => {
    if (await checkEmailExists(signupCreds.email)) {
      throw new Error('Email already exists!');
    }

    setLoadingState(true);
    try {
      await client('/api/auth/validate-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupCreds),
      });
    } catch (error) {
      console.error('Verify email failed:', error);
    } finally {
      setLoadingState(false);
    }
  };

  const validateSignup = async (
    signupCreds: SignupCredentials
  ): Promise<ValidateType> => {
    setLoadingState(true);

    try {
      const response = await client<ValidateType>(`/api/auth/validate-signup`, {
        method: 'POST',
        body: JSON.stringify(signupCreds),
      });

      setTempTokenSignUp(response.data.token);

      router.push('/verify-code');
      return response.data;
    } catch (error) {
      console.error('Validate Signup failed:', error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const signup = async (pincode: string): Promise<void> => {
    setLoadingState(true);

    try {
      const response = await client<UserDto>('/api/auth/verify-pincode', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tempTokenSignUp}`,
        },
        body: JSON.stringify({ pincode: pincode }),
      });

      if (!response || !response.data.token) {
        throw new Error('Invalid response from server');
      }

      setToken(response.data.token);
      setIsAuthenticated(true);
      setUserDetails(response.data);
      router.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const login = async (loginCreds: LoginCredentials | null): Promise<void> => {
    setLoadingState(true);
    if (!loginCreds) {
      throw new Error('Login credentials are required');
    }

    try {
      const response = await client<UserDto>('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCreds),
      });

      if (!response || !response.data.token) {
        throw new Error('Invalid response from server');
      }
      if (loginCreds.rememberMe) {
        document.cookie = `auth_token=${response.data.token}; path=/; max-age=604800; SameSite=Strict; Secure`;
        document.cookie = `userDetails=${encodeURIComponent(JSON.stringify(response.data))}; path=/; max-age=604800; SameSite=Strict; Secure`;
      } else {
        document.cookie = `auth_token=${response.data.token}; path=/; SameSite=Strict; Secure`;
        document.cookie = `userDetails=${encodeURIComponent(JSON.stringify(response.data))}; path=/; SameSite=Strict; Secure`;
      }

      setToken(response.data.token);
      setIsAuthenticated(true);
      setUserDetails(response.data);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const resetPassword = async (
    resetPasswordCreds: ResetPasswordCredentials
  ): Promise<void> => {
    if (!resetPasswordCreds || !resetPasswordCreds.email) {
      throw new Error('Email is required for password reset');
    }

    try {
      await client<UserDto>('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetPasswordCreds),
      });
      toast.success(
        `Password reset email sent to: ${resetPasswordCreds.email}`
      );
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };
  const logout = (): void => {
    setLoadingState(true);
    try {
      document.cookie =
        'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure';
      document.cookie =
        'userDetails=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure';
      setToken(null);
      setIsAuthenticated(false);
      setUserDetails(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    setLoadingState(true);
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
      return null;
    };

    const authToken = getCookie('auth_token');
    const userDetailsCookie = getCookie('userDetails');

    if (authToken && userDetailsCookie) {
      try {
        const parsedUserDetails = JSON.parse(
          decodeURIComponent(userDetailsCookie)
        ) as UserDto;
        setToken(authToken);
        setIsAuthenticated(true);
        setUserDetails(parsedUserDetails);
      } catch (error) {
        console.error('Error parsing stored user details:', error);
        setToken(null);
        setIsAuthenticated(false);
        setUserDetails(null);
      }
    } else {
      setToken(null);
      setIsAuthenticated(false);
      setUserDetails(null);

      const publicRoutes = /\/(login|signup|verify-code|reset-password)/;
      if (!publicRoutes.test(window.location.pathname)) {
        router.push('/login');
      }
    }
    setLoadingState(false);
  }, [router]);

  useEffect(() => {
    if (userDetails) {
      document.cookie = `userDetails=${encodeURIComponent(
        JSON.stringify(userDetails)
      )}; path=/; SameSite=Strict; Secure`;
    }
  }, [userDetails]);

  const value = {
    login,
    signup,
    logout,
    token,
    setToken,
    resetPassword,
    isAuthenticated,
    checkEmailExists,
    userDetails,
    sendEmail,
    verifyEmailSignup,
    validateSignup,
    setUserDetails
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
