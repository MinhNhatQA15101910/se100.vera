'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPlaylists } from '@/actions/playlist-actions';
import { useLoading } from '@/contexts/LoadingContext';
import PlaylistCard from '@/components/ui/PlaylistCard';

// TODO: handle total duration with hook and parse the approriate string
const YourPlaylist = () => {
  // const { setLoadingState } = useLoading();

  // const { data, isLoading } = useQuery({
  //   queryKey: ['user_playlists'],
  //   queryFn: async () => await getAllPlaylists(),
  // });

  // useEffect(() => {
  //   setLoadingState(isLoading);
  // });

  return (
    <div className="h-fit flex w-[90%] ">
      <h2 className="text-2xl font-bold mb-4">
        Your <span className="text-pink-500">Playlists</span>
      </h2>

      <div className="grid grid-cols-6">
        {/* {data?.map((playlist, idx) => {
          return (
            <PlaylistCard
            key={idx}
            playlist={playlist}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default YourPlaylist;
