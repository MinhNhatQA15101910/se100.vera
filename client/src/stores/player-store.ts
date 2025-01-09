import { create } from 'zustand';
import { Song } from '@/types/global';

interface PlayerState {
  playlist: Song[];
  activeSong?: Song;
  isVisible: boolean;
  isLyricVisibility: boolean;
  isPlaylistVisibility: boolean;
  isPlaying: boolean;
  volume: number;
  currentDuration: number;
  setPlaylist: (songs: Song[]) => void;
  setActiveTrack: (song: Song) => void;
  onPlay: () => void;
  onPause: () => void;
  toggleLyricMode: () => void;
  togglePlaylistMode: () => void;
  onNext: () => void;
  onPrevious: () => void;
  setVolume: (volume: number) => void;
  toggleVisibility: () => void;
  setCurrentDuration: (duration: number) => void;
  reset: () => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist: [],
  activeSong: undefined,
  isVisible: false,
  isLyricVisibility: false,
  isPlaylistVisibility: false,
  isPlaying: false,
  volume: 0.8,
  currentDuration: 0,

  setPlaylist: (songs) => {
    if (!Array.isArray(songs)) return;
    set({ playlist: songs });
  },

  setActiveTrack: (song) => {
    if (song) {
      set({ activeSong: song });
    }
  },

  onPlay: () => set({ isPlaying: true }),

  onPause: () => set({ isPlaying: false }),

  toggleLyricMode: () =>
    set((state) => ({
      isLyricVisibility: !state.isLyricVisibility,
    })),

  togglePlaylistMode: () =>
    set((state) => ({
      isPlaylistVisibility: !state.isPlaylistVisibility,
    })),

  onNext: () => {
    const { playlist, activeSong } = get();
    if (!activeSong || playlist.length <= 1) return;
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    if (currentIndex === -1) return;
    const nextSong = playlist[(currentIndex + 1) % playlist.length];
    set({ activeSong: nextSong });
  },

  onPrevious: () => {
    const { playlist, activeSong } = get();
    if (!activeSong || playlist.length <= 1) return;
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    if (currentIndex === -1) return;
    const prevSong =
      playlist[(currentIndex - 1 + playlist.length) % playlist.length];
    set({ activeSong: prevSong });
  },

  setVolume: (volume) => {
    if (volume < 0 || volume > 1) return;
    set({ volume });
  },

  toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),

  setCurrentDuration: (duration) => {
    if (duration < 0) return;
    set({ currentDuration: duration });
  },

  reset: () =>
    set({
      playlist: [],
      activeSong: undefined,
      isVisible: false,
      isPlaying: false,
      isLyricVisibility: false,
      isPlaylistVisibility: false,
      volume: 0.8,
      currentDuration: 0,
    }),
}));

export default usePlayerStore;
