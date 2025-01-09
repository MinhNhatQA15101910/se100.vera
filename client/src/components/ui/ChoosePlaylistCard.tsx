'use client';

import React, { useEffect } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useLoading } from '@/contexts/LoadingContext';
import { useQuery } from '@tanstack/react-query';
import { getOwnPlaylist } from '@/actions/playlist-actions';
import { useUser } from '@/contexts/UserContext';

export default function ChoosePlaylistCard({ songId }: { songId: number }) {
  const { setLoadingState } = useLoading();
  const { userDetails } = useUser();
  const { data: ownPlaylists, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => await getOwnPlaylist(userDetails?.id || -1),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div>
      <div className="p-6 h-96 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-[#EE10B0] text-white rounded-full flex justify-center items-center text-4xl font-bold">
              <IoAddOutline />
            </div>
            <h3 className="text-white text-md font-lg mt-4">
              Create a Playlist
            </h3>
          </div>

          {/* Existing playlists */}
          {ownPlaylists?.map((playlist, index) => <div key={index}></div>)}
        </div>
      </div>
    </div>
  );
}
