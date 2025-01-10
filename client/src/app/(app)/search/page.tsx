'use client';

import { getAllAlbums } from '@/actions/album-actions';
import { getAllSongs } from '@/actions/song-actions';
import SongCard from '@/components/music/SongCard';
import AlbumCard from '@/components/ui/AlbumCard';
import ArtistCard from '@/components/ui/ArtistCard';
import { useQueries } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import { getAllArtists } from '@/actions/user-actions';
import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const params = useSearchParams();
  const { setLoadingState } = useLoading();

  const [
    { data: albumData, isLoading: albumIsLoading },
    { data: songData, isLoading: songIsLoading },
    { data: artistsData, isLoading: artistIsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['all_albums'],
        queryFn: async () => await getAllAlbums(),
      },
      {
        queryKey: ['songs'],
        queryFn: async () => await getAllSongs(),
      },
      {
        queryKey: ['artists'],
        queryFn: async () => await getAllArtists(),
      },
    ],
  });

  useEffect(() => {
    setLoadingState(albumIsLoading || songIsLoading || artistIsLoading);
  }, [albumIsLoading, songIsLoading, artistIsLoading, setLoadingState]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Song</span>{' '}
                  <span className="text-[#EE10B0]">Results</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {songData?.songs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Artist</span>{' '}
                  <span className="text-[#EE10B0]">Results</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {artistsData?.map((artist, idx) => (
                  <ArtistCard key={idx} artist={artist} />
                ))}
              </div>
            </div>
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Top</span>{' '}
                  <span className="text-[#EE10B0]">Albums</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {albumData?.map((album, idx) => (
                  <AlbumCard key={idx} albumCard={album} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
