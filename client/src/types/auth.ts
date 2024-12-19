import { Role } from "./declaration";

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
  role?: 'Listener' | 'Artist'; 
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
  gender: string;
  dateOfBirth: string;
  about: string | null;
  created: string;
  photos: string[];
  token: string;
}

export interface SendEmailDto {
    email: string;
    pincode: string
}
