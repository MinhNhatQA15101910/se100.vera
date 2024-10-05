export enum Role {
  Admin = "Admin",
  Artist = "Artist",
  User = "User",
}

export interface Photo {
  id?: number;
  url: string;
  isMain: boolean;
  publicId?: string; 
  appUserId: number;
}

export interface AppUser {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  artistName?: string;
  gender: string;
  dateOfBirth: string;
  about?: string;
  role: Role;
  photos: Photo[];
  token: string
}
