'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOwnPlaylist } from '@/actions/playlist-actions';
import { useLoading } from '@/contexts/LoadingContext';
import PlaylistCard from '@/components/ui/PlaylistCard';
import { useUser } from '@/contexts/UserContext';

const YourPlaylist = () => {
  const { setLoadingState } = useLoading();
  const { userDetails } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ['user_playlists'],
    queryFn: async () => await getOwnPlaylist(userDetails?.id || 1),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  });

  return (
    <div className="h-fit flex w-[90%] flex-col">
      <h2 className="text-2xl font-bold mb-4">
        Your <span className="text-pink-500">Playlists</span>
      </h2>

      <div className="grid grid-cols-6 gap-4">
        {data?.map((playlist, idx) => {
          return <PlaylistCard key={idx} playlist={playlist} />;
        })}
      </div>
    </div>
  );
};

export default YourPlaylist;
