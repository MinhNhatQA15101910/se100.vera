'use client';

import usePlayerStore from '@/stores/player-store';
import Image from 'next/image';

const TrackInfo = () => {
  const { activeTrack } = usePlayerStore();

  if (!activeTrack) return null;

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">{activeTrack.title}</h3>
      <p className="text-sm text-gray-500">{activeTrack.artist}</p>
      {activeTrack.cover && (
        <Image
          src={activeTrack.cover}
          alt={activeTrack.title}
          className="w-32 h-32 object-cover mt-2"
        />
      )}
    </div>
  );
};

export default TrackInfo;
