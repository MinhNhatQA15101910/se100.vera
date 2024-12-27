import { create } from 'zustand';

import { Song } from '@/types/global';

interface PlayerState {
  playlist: Song[];
  activeSong?: Song;
  isVisible: boolean;
  isPlaying: boolean;
  volume: number;
  setPlaylist: (songs: Song[]) => void;
  setActiveTrack: (song: Song) => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  setVolume: (volume: number) => void;
  toggleVisibility: () => void;
  reset: () => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist: [],
  activeSong: undefined,
  isVisible: false,
  isPlaying: false,
  volume: 0.8,
  setPlaylist: (songs) => set({ playlist: songs }),
  setActiveTrack: (song) => {
    if (song) {
      set({ activeSong: song });
    }
  },
  onPlay: () => set({ isPlaying: true }),
  onPause: () => set({ isPlaying: false }),
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
  reset: () =>
    set({
      playlist: [],
      activeSong: undefined,
      isVisible: false,
      isPlaying: false,
      volume: 0.8,
    }),
}));

export default usePlayerStore;
