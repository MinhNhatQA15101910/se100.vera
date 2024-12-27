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
  songPhotoUrl: string;
  image: string;
}

export interface Genre {
  id: number;
  genreName: string;
}

export interface Album {
  id: number,
  albumName: string;
  description: string;
  totalListeningHours: number,
  totalSongs: number;
  createdAt: string;
  updatedAt: string;
  publisherId: number
}

export interface Playlist {
  id: number
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  artistName: string | "";
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
