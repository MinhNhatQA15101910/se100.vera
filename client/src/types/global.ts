export enum Role {
  Admin = 'Admin',
  Artist = 'Artist',
  Listener = 'Listener',
}

export enum Gender {
  male = "male",
  female = "female"
}

export interface Song {
  id: number;
  songName: string;
  description: string | null;
  publisherName: string;
  publisherImageUrl: string;
  genres: string[];
  totalListeningHours: number;
  totalViews: number;
  musicUrl: string;
  musicPublicId: string | null;
  lyricUrl: string | null;
  lyricPublicId: string | null;
  photoUrl: string;
  songPhotoPublicId: string | null;
  artists: User[];
  createdAt: string;
  duration: string;
  state: string;
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
  totalDuration: string;
  createdAt: string;
  photoUrl: string;
  photos: string[];
  songs: {
    song: Song;
    order: number;
  }[];
  publisher: User;
  state: string;
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
  artistName: string;
  photoUrl: string;
  gender: string;
  dateOfBirth: string;
  about: string | '';
  createdAt: string;
  state: string;
  photos: Array<{ id: number; url: string; isMain: boolean }>;
  token: string | null;
}

export interface Comment {
  id: number;
  content: string;
  publisherName: string;
  publisherPhotoUrl: string;
  createdAt: string;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  notifyEntityId: number;
  createdAt: string;
}

export interface PaginatedResponses<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
