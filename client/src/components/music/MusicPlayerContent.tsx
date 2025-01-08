'use client';

import * as React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import {
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Repeat,
  Pause,
  Mic2,
  ListMusic,
  Loader2,
} from 'lucide-react';

import { AppButton } from '../ui/AppButton';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DynamicImage from '../custom/DynamicImage';
import usePlayerStore from '@/stores/player-store';
import useSound from 'use-sound';
import { formatTime } from '@/lib/utils';

interface PlaybackControlProps {
  isPlaying: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

const PlaybackControl = ({
  isPlaying,
  onClick,
  isLoading,
}: PlaybackControlProps) => (
  <Tooltip>
    <TooltipTrigger>
      <AppButton
        className="h-9 w-9 bg-general-pink text-general-white hover:bg-general-pink-hover hover:scale-110 rounded-full group"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4 group-hover:scale-110" />
        ) : (
          <Play fill="#FFF" className="h-4 w-4 group-hover:scale-110" />
        )}
      </AppButton>
    </TooltipTrigger>
    <TooltipContent>
      {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
    </TooltipContent>
  </Tooltip>
);

interface ControlButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  tooltip?: string;
  iconColor?: string;
  disabled?: boolean;
}

const ControlButton = ({
  icon: Icon,
  onClick,
  tooltip,
  iconColor = 'white',
  disabled = false,
}: ControlButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <AppButton
        className="h-9 w-9 group"
        onClick={onClick}
        disabled={disabled}
      >
        <Icon
          className={`h-4 w-4 ${iconColor === 'white' ? 'text-white' : 'text-general-pink'} group-hover:scale-110 group-hover:text-general-pink-hover transition-transform ${disabled ? 'opacity-50' : ''}`}
        />
      </AppButton>
    </TooltipTrigger>
    {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
  </Tooltip>
);

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  disabled?: boolean;
}

const VolumeControl = ({
  volume,
  onVolumeChange,
  disabled = false,
}: VolumeControlProps) => {
  const toggleMute = () => onVolumeChange(volume === 0 ? 75 : 0);

  return (
    <div className="flex items-center gap-2">
      <AppButton className="h-9 w-9" onClick={toggleMute} disabled={disabled}>
        {volume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </AppButton>
      <Slider
        value={[volume]}
        max={100}
        step={1}
        className="w-20 text-general-pink"
        onValueChange={(value) => onVolumeChange(value[0])}
        disabled={disabled}
      />
    </div>
  );
};

const MusicPlayerContent = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);

  const {
    isPlaying,
    isLyricVisibility,
    isPlaylistVisibility,
    onPause,
    onPlay,
    volume,
    setVolume,
    onPrevious,
    onNext,
    activeSong,
    setCurrentDuration,
    toggleLyricMode,
    togglePlaylistMode,
    playlist,
  } = usePlayerStore();

  const [play, { pause, sound }] = useSound(activeSong?.musicUrl || '', {
    volume: volume,
    onplay: () => {
      setIsLoading(false);
      onPlay();
    },
    onend: () => {
      setProgress(0);
      const currentIndex = playlist.findIndex(
        (song) => song.id === activeSong?.id
      );
      if (currentIndex >= 0 && currentIndex < playlist.length - 1) {
        onNext();
      }
    },
    onpause: () => onPause(),
    format: ['mp3'],
    onload: () => {
      setIsLoading(false);
      play();
    },
    onloaderror: () => {
      setIsLoading(false);
      console.error('Error loading audio');
      alert('Failed to load the audio. Please try again.');
    },
  });

  const handlePlayPause = React.useCallback((): void => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const handleVolumeChange = React.useCallback(
    (value: number): void => {
      setVolume(value / 100);
    },
    [setVolume]
  );

  React.useEffect(() => {
    if (!sound) {
      setCurrentDuration(0);
      return;
    }

    const interval = setInterval(() => {
      try {
        if (sound.playing()) {
          const currentProgress = (sound.seek() / sound.duration()) * 100 || 0;
          setProgress(currentProgress);
          setCurrentDuration(sound.seek());
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [sound]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  React.useEffect(() => {
    if (sound) {
      sound.unload();
    }
    if (activeSong) {
      setIsLoading(true);
      play();
    }
  }, [activeSong, play, sound]);

  React.useEffect(() => {
    if (!sound) return;

    return () => {
      sound.unload();
    };
  }, [sound]);

  if (!mounted || !activeSong) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t border-general-pink/50 bg-general-theme`}
    >
      <div className="flex items-center justify-between py-4 px-2">
        {/* Now Playing */}
        <div className="flex w-1/4 min-w-[180px] h-full items-center gap-3">
          <DynamicImage
            alt="Artist Image"
            src={
              activeSong.songPhotoUrl ||
              'https://picsum.photos/400/400?random=42'
            }
            className="w-14 h-14"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-general-pink">
              {activeSong.songName}
            </span>
            <span className="text-xs text-muted-foreground">
              {activeSong.artists[0].artistName}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            {playlist.length > 1 && (
              <ControlButton
                icon={Shuffle}
                tooltip="Shuffle"
                disabled={isLoading}
              />
            )}
            {playlist.length > 1 && (
              <ControlButton
                icon={SkipBack}
                onClick={onPrevious}
                tooltip="Previous"
                disabled={isLoading}
              />
            )}
            <PlaybackControl
              isPlaying={isPlaying}
              onClick={handlePlayPause}
              isLoading={isLoading}
            />
            {playlist.length > 1 && (
              <ControlButton
                icon={SkipForward}
                onClick={onNext}
                tooltip="Next"
                disabled={isLoading}
              />
            )}
            {playlist.length > 1 && (
              <ControlButton
                icon={Repeat}
                tooltip="Repeat"
                disabled={isLoading}
              />
            )}
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="text-xs tabular-nums text-muted-foreground">
              {sound ? formatTime(sound.seek()) : '0:00'}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="w-full min-w-[250px]"
              disabled={isLoading || !sound}
              onValueChange={(value) => {
                if (sound && sound.duration()) {
                  const newPosition = (value[0] / 100) * sound.duration();
                  sound.seek(newPosition);
                  setProgress(value[0]);
                }
              }}
            />
            <span className="text-xs tabular-nums text-muted-foreground">
              {sound ? formatTime(sound.duration()) : '0:00'}
            </span>
          </div>
        </div>

        {/* Volume & Additional Controls */}
        <div className="flex w-1/4 min-w-[180px] justify-end gap-4">
          <ControlButton
            icon={ListMusic}
            tooltip="Playlist"
            onClick={togglePlaylistMode}
            iconColor={isPlaylistVisibility ? 'general-pink' : 'white'}
            disabled={isLoading}
          />
          <ControlButton
            icon={Mic2}
            tooltip="Lyrics"
            onClick={toggleLyricMode}
            iconColor={isLyricVisibility ? 'general-pink' : 'white'}
            disabled={isLoading}
          />
          <VolumeControl
            volume={volume * 100}
            onVolumeChange={handleVolumeChange}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerContent;
