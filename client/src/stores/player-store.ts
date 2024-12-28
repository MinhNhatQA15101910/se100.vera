import { create } from 'zustand';

import { Song } from '@/types/global';

interface PlayerState {
  playlist: Song[];
  activeSong?: Song;
  isVisible: boolean;
  isLyricMode: boolean;
  isPlaying: boolean;
  volume: number;
  currentDuration: number;
  setPlaylist: (songs: Song[]) => void;
  setActiveTrack: (song: Song) => void;
  onPlay: () => void;
  onPause: () => void;
  toggleLyricMode: () => void;
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
  isLyricMode: false,
  isPlaying: false,
  volume: 0.8,
  currentDuration: 0,
  setPlaylist: (songs) => set({ playlist: songs }),
  setActiveTrack: (song) => {
    if (song) {
      set({ activeSong: song });
    }
  },
  onPlay: () => set({ isPlaying: true }),
  onPause: () => set({ isPlaying: false }),
  toggleLyricMode:()=>set((state) => ({ isLyricMode: !state.isLyricMode })),
  onNext: () => {
    const { playlist, activeSong } = get();
    if (!activeSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    const nextSong = playlist[(currentIndex + 1) % playlist.length];
    set({ activeSong: nextSong });
  },
  onPrevious: () => {
    const { playlist, activeSong } = get();
    if (!activeSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    const prevSong =
      playlist[(currentIndex - 1 + playlist.length) % playlist.length];
    set({ activeSong: prevSong });
  },
  setVolume: (volume) => set({ volume }),
  toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
  setCurrentDuration: (duration) => set({ currentDuration: duration }),
  reset: () =>
    set({
      playlist: [],
      activeSong: undefined,
      isVisible: false,
      isPlaying: false,
      isLyricMode: false,
      volume: 0.8,
      currentDuration: 0,
    }),
}));

export default usePlayerStore;
