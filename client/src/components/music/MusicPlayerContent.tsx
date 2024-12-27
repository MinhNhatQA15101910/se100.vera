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

interface PlaybackControlProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlaybackControl = ({ isPlaying, onClick }: PlaybackControlProps) => (
  <Tooltip>
    <TooltipTrigger>
      <AppButton
        className="h-9 w-9 bg-general-pink text-general-white hover:bg-general-pink-hover hover:scale-110 rounded-full group"
        onClick={onClick}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 group-hover:scale-110" />
        ) : (
          <Play fill="#FFF" className="h-4 w-4 group-hover:scale-110" />
        )}
      </AppButton>
    </TooltipTrigger>
    <TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent>
  </Tooltip>
);

interface ControlButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  tooltip?: string;
}

const ControlButton = ({
  icon: Icon,
  onClick,
  tooltip,
}: ControlButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <AppButton className="h-9 w-9 group" onClick={onClick}>
        <Icon className="h-4 w-4 group-hover:scale-110 group-hover:text-general-pink-hover" />
      </AppButton>
    </TooltipTrigger>
    {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
  </Tooltip>
);

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  const toggleMute = () => onVolumeChange(volume === 0 ? 75 : 0);

  return (
    <div className="flex items-center gap-2">
      <AppButton className="h-9 w-9" onClick={toggleMute}>
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
      />
    </div>
  );
};

const MusicPlayerContent = () => {
  const [mounted, setMounted] = React.useState(false);
  const {
    isPlaying,
    onPause,
    onPlay,
    volume,
    setVolume,
    onPrevious,
    onNext,
    activeSong,
  } = usePlayerStore();

  const [progress, setProgress] = React.useState(0);

  const [play, { pause, sound }] = useSound(activeSong?.musicUrl || "/sounds/robber-vtas.mp3", {
    volume: volume,
    onplay: () => onPlay(),
    onend: () => {
      onPause();
      setProgress(0);
    },
    onpause: () => onPause(),
    format: ['mp3'],
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleVolumeChange = (value: number) => setVolume(value / 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    if (!sound) return;

    const interval = setInterval(() => {
      const currentProgress = (sound.seek() / sound.duration()) * 100 || 0;
      setProgress(currentProgress);
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
    if (activeSong?.musicUrl) {
      play();
    }
  }, [activeSong]);

  if (!mounted || !activeSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-general-pink/50 bg-general-theme">
      <div className="flex items-center justify-between py-4 px-2">
        {/* Now Playing */}
        <div className="flex w-1/4 min-w-[180px] h-full items-center gap-3">
          <DynamicImage
            alt="Artist Image"
            src={"https://picsum.photos/400/400?random=42"}
            className="w-14 h-14"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-general-pink">
              {activeSong.songName}
            </span>
            <span className="text-xs text-muted-foreground">
              {activeSong.description}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <ControlButton icon={Shuffle} tooltip="Shuffle" />
            <ControlButton
              icon={SkipBack}
              onClick={onPrevious}
              tooltip="Previous"
            />
            <PlaybackControl isPlaying={isPlaying} onClick={handlePlayPause} />
            <ControlButton icon={SkipForward} onClick={onNext} tooltip="Next" />
            <ControlButton icon={Repeat} tooltip="Repeat" />
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="text-xs tabular-nums text-muted-foreground">
              {sound ? formatTime(sound.seek()) : '0:00'}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="w-full"
              onValueChange={(value) => {
                if (sound) {
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
          <ControlButton icon={Mic2} tooltip="Lyrics" />
          <VolumeControl volume={volume * 100} onVolumeChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerContent;
