'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import client from '@/services/client';
import { useLoading } from './LoadingContext';
import { toast } from 'react-toastify';

import {
  LoginCredentials,
  SignupCredentials,
  ResetPasswordCredentials,
  UserDto,
  SendEmailDto,
} from '@/types/auth';
import { generatePincode } from '@/lib/utils';

interface IUserContext {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  pincode: string;
  userDetails: UserDto | null;
  login: (loginCreds: LoginCredentials | null) => Promise<void>;
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
  const [pincode, setPincode] = useState<string>('');
  const [tempSignupCreds, setTempSignupCreds] = useState<SignupCredentials>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    role: 'Listener'
  });
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
        cache: "no-store",
        body: JSON.stringify(sendEmailDto),
      });
    } catch (error) {
      console.error('Send email error:', error);
      if (error instanceof SyntaxError) {
        toast.error('Invalid response from server. Please try again.');
      } else {
        toast.error('Failed to send verification email. Please try again.');
      }
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
      return response;
    } catch (error) {
      console.error('Email check failed:', error);
      throw error;
    }
  };

  const verifyEmailSignup = async (
    signupCreds: SignupCredentials
  ): Promise<void> => {
    if (await checkEmailExists(signupCreds.email)) {
      throw new Error("Email already exists!")
    }

    setLoadingState(true);
    const generatedPincode = generatePincode();
    try {
      setPincode(generatedPincode);
      setTempSignupCreds(signupCreds);

      await sendEmail({ email: signupCreds.email, pincode: generatedPincode });
      router.push('/verify-code');
    } catch (error) {
      console.error('Verify email failed:', error);
      toast.error('Failed to send verification email');
    } finally {
      setLoadingState(false);
    }
  };

  const signup = async (pincode: string): Promise<void> => {
    if (!tempSignupCreds) {
      throw new Error('Signup credentials are required');
    }

    if (pincode !== pincode) {
      throw new Error('Invalid verification code');
    }

    setLoadingState(true);
    try {
      const response = await client<UserDto>('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: "no-store",
        body: JSON.stringify(tempSignupCreds),
      });

      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }

      setToken(response.token);
      setIsAuthenticated(true);
      setUserDetails(response);
      router.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoadingState(false);
    }
  };

  const login = async (loginCreds: LoginCredentials | null): Promise<void> => {
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

      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }

      if (loginCreds.rememberMe) {
        localStorage.setItem('userDetails', JSON.stringify(response));
        localStorage.setItem('rememberedEmail', loginCreds.email);
      }

      setToken(response.token);
      setIsAuthenticated(true);
      setUserDetails(response);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
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
      toast.error('Failed to reset password. Please try again.');
      throw error;
    }
  };

  const logout = (): void => {
    setLoadingState(true);
    try {
      localStorage.removeItem('userDetails');
      localStorage.removeItem('rememberedEmail');
      setToken(null);
      setIsAuthenticated(false);
      setUserDetails(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to logout. Please try again.');
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');

    if (storedUserDetails) {
      try {
        const parsedUserDetails = JSON.parse(storedUserDetails);
        if (parsedUserDetails && parsedUserDetails.token) {
          setToken(parsedUserDetails.token);
          setIsAuthenticated(true);
          setUserDetails(parsedUserDetails);
        } else {
          localStorage.removeItem('userDetails');
          setIsAuthenticated(false);
          setUserDetails(null);
        }
      } catch (error) {
        console.error('Error parsing stored user details:', error);
        localStorage.removeItem('userDetails');
        setIsAuthenticated(false);
        setUserDetails(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserDetails(null);

      const publicRoutes = /\/(login|signup|verify-code|reset-password)/;
      if (!publicRoutes.test(window.location.pathname)) {
        router.push('/login');
      }
    }
  }, [router]);

  const value = {
    login,
    signup,
    logout,
    token,
    pincode,
    setToken,
    resetPassword,
    isAuthenticated,
    checkEmailExists,
    userDetails,
    sendEmail,
    verifyEmailSignup,
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
