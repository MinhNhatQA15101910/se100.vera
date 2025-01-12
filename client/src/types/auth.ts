import { Role } from './declaration';
import { Gender } from './global';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  role?: 'Listener' | 'Artist' | 'Admin';
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  artistName: string | null;
  photoUrl: string | null;
  gender: Gender;
  dateOfBirth: string;
  about: string | null;
  created: string;
  photos: string[];
  token: string;
}

export interface ValidateType {
  token: string;
}

export interface SendEmailDto {
  email: string;
  pincode: string;
}
