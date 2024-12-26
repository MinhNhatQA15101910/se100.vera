import { Role } from './declaration';

export interface Song {
  id: number;
  songName: string;
  description: string | null;
  totalView: number; // nho sua lai ko la bu
  musicUrl: string;
  createdAt: string;
  updatedAt: string;
  musicPublicId: string;
  lyricUrl: string | null;
  image: string;
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

export interface PaginatedResponses<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
