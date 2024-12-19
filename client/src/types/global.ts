import { Role } from "./declaration";

export interface Song {
  id: number;
  songName: string;
  description: string | null;
  totalListeningHours: number;
  musicUrl: string;
  musicPublicId: string;
  lyricUrl: string | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  artistName: string | null;
  photoUrl: string | null;
  gender: string;
  dateOfBirth: string;
  about: string | null;
  created: string;
  photos: Array<{ id: number; url: string; isMain: boolean }>;
  token: string;
}
