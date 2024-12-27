'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import SongCard from '@/components/music/SongCard';

import { getAllSongs } from '@/actions/song-actions';
import { useLoading } from '@/contexts/LoadingContext';

const MusicCards = () => {
  const { setLoadingState } = useLoading();
  const { data, isLoading } = useQuery({
    queryKey: ['songs', 'home'],
    queryFn: () => getAllSongs(2, 4),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading, setLoadingState]);

  return (
    <div className="w-[90%] flex flex-col bg-transparent text-general-white">
      <div className="flex flex-col w-full space-y-4">
        {/* Weekly Top Songs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Weekly Top <span className="text-pink-500">Songs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data?.songs
              .slice(0, 5)
              .map((song, index) => <SongCard key={index} song={song} />)}
          </div>
        </section>

        {/* New Release Songs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            New Release <span className="text-pink-500">Songs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data?.songs
              .slice(0, 5)
              .map((song, index) => <SongCard key={index} song={song} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicCards;
