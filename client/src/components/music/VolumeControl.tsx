import { Slider } from '@/components/ui/slider';
import usePlayerStore from '@/stores/player-store';

const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore();

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume / 100);
    console.log(`Volume set to: ${newVolume}%`);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">Volume</span>
      <Slider
        value={[volume * 100]}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
        className="w-32"
      />
      <span className="text-sm text-gray-700">{volume * 100}%</span>
    </div>
  );
};

export default VolumeControl;
