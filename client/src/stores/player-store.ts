import { create } from 'zustand';

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

interface PlayerState {
  playlist: Song[];
  activeSong?: Song;
  isVisible: boolean;
  isPlaying: boolean;
  volume: number;
  setPlaylist: (tracks: Song[]) => void;
  setActiveTrack: (trackId: string) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
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
  setPlaylist: (tracks) => set({ playlist: tracks }),
  setActiveTrack: (trackId) => {
    const track = get().playlist.find((t) => t.id === trackId);
    if (track) set({ activeSong: track });
  },
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  next: () => {
    const { playlist, activeSong } = get();
    if (!activeSong) return;
    const currentIndex = playlist.findIndex((t) => t.id === activeSong.id);
    const nextTrack = playlist[(currentIndex + 1) % playlist.length];
    set({ activeSong: nextTrack });
  },
  previous: () => {
    const { playlist, activeSong } = get();
    if (!activeSong) return;
    const currentIndex = playlist.findIndex((t) => t.id === activeSong.id);
    const prevTrack =
      playlist[(currentIndex - 1 + playlist.length) % playlist.length];
    set({ activeSong: prevTrack });
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
