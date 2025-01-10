'use client';

import ArtistCard from '@/components/ui/ArtistCard';

import { useQuery } from '@tanstack/react-query';
import { getAllArtists } from '@/actions/user-actions';
import { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

export default function ArtistsPage() {
  const { setLoadingState } = useLoading();
  const { data: artistsData, isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: async () => await getAllArtists(),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Top</span>{' '}
                  <span className="text-[#EE10B0]">Artists</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {artistsData
                  ?.slice(0, 5)
                  .map((artist, idx) => (
                    <ArtistCard key={idx} artist={artist} />
                  ))}
              </div>
            </div>

            {/* New Release Artists Section */}
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">New Debut</span>{' '}
                  <span className="text-[#EE10B0]">Artists</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {artistsData
                  ?.slice(0, 5)
                  .map((artist, idx) => (
                    <ArtistCard key={idx} artist={artist} />
                  ))}
              </div>
            </div>

            {/* All Artists Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                <span className="text-white">All</span>{' '}
                <span className="text-[#EE10B0]">Artists</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {artistsData
                  ? [...artistsData, ...artistsData].map((artist, index) => (
                      <ArtistCard key={index} artist={artist} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
