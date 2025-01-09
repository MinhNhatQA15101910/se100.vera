import { Role } from './declaration';

export interface Song {
  id: number;
  songName: string;
  description: string | null;
  publisherName: string;
  publisherImageUrl: string;
  genres: string[];
  totalListeningHours: number;
  musicUrl: string;
  musicPublicId: string | null;
  lyricUrl: string | null;
  lyricPublicId: string | null;
  songPhotoUrl: string;
  songPhotoPublicId: string | null;
  artists: User[];
  createdAt: string;
  duration: string;
}

export interface Genre {
  id: number;
  genreName: string;
  createdAt: string;

}

export interface Album {
  id: number;
  albumName: string;
  description: string;
  totalListeningHours: number;
  totalSongs: number;
  createdAt: string;
  photoUrl: string;
  photos: string[];
  songs: {
    song: Song;
    order: number;
  }[];
  publisher: User;
  artists: {
    id: number;
    artistName: string;
  }[];
}

export interface Playlist {
  id: number;
  playlistName: string;
  description: string;
  totalListeningHours: number;
  totalSongs: number;
  createdAt: string;
  publisher: User;
  songs: Song[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  artistName: string | null;
  photoUrl: string;
  gender: string;
  dateOfBirth: string;
  about: string | '';
  createdAt: string;
  photos: Array<{ id: number; url: string; isMain: boolean }>;
  token: string | null;
}

export interface PaginatedResponses<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
