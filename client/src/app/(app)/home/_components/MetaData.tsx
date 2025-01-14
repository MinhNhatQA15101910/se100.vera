'use client';

import { AppButton } from '@/components/ui/AppButton';
import AlbumCard from '@/components/ui/AlbumCard';
import ArtistCard from '@/components/ui/ArtistCard';

import { Plus } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import { getAllPlaylists } from '@/actions/playlist-actions';
import { getAllAlbums } from '@/actions/album-actions';
import { getAllArtists } from '@/actions/user-actions';
import { useLoading } from '@/contexts/LoadingContext';
import { useEffect } from 'react';
import { Album, User } from '@/types/global';

const ViewAllFeature = ({ link }: { link: string }) => {
  const router = useRouter();

  return (
    <AppButton
      className={`flex flex-col items-center justify-center space-y-2 group w-[10%] `}
      onClick={() => {
        router.push(link);
      }}
    >
      <div className="p-2 rounded-full bg-[#1E1E1E] group-hover:bg-[#434343] transition-colors duration-200 mt-6">
        <Plus className="text-general-white group-hover:text-general-pink-hover transition-colors duration-200" />
      </div>
      <p className="font-[16px] text-general-white group-hover:text-general-pink-hover transition-colors duration-200">
        View All
      </p>
    </AppButton>
  );
};

export default function MetaData() {
  const [
    { data: albums, isLoading: albumIsLoading },
    { data: playlists, isLoading: playlistIsLoading },
    { data: artists, isLoading: artistIsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['albums'],
        queryFn: async () => await getAllAlbums(),
      },
      {
        queryKey: ['playlists'],
        queryFn: async () => await getAllPlaylists(),
      },
      {
        queryKey: ['artists'],
        queryFn: async () => await getAllArtists(),
      },
    ],
  });
  const { setLoadingState } = useLoading();

  useEffect(() => {
    setLoadingState(albumIsLoading || artistIsLoading || playlistIsLoading);
  }, [albumIsLoading, artistIsLoading]);

  return (
    <div className="text-white space-y-8 w-[90%] flex flex-col">
      <section className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-4">
          Popular <span className="text-pink-500">Artists</span>
        </h2>
        <div className="flex flex-row items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
            {(artists?.artists || [])
              .slice(0, 6)
              .map((artist: User, idx: number) => (
                <ArtistCard key={idx} artist={artist} />
              ))}
          </div>
          {(artists?.artists?.length || 0) > 6 ? (
            <ViewAllFeature link="/artists" />
          ) : (
            <div className="flex w-[10%]" />
          )}
        </div>
      </section>
      <section className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-4">
          Top <span className="text-pink-500">Albums</span>
        </h2>
        <div className="flex flex-row items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
            {(albums?.albums || [])
              .slice(0, 5)
              .map((album: Album, idx: number) => (
                <AlbumCard key={idx} albumCard={album} />
              ))}
          </div>
          {(albums?.albums?.length || 0) > 5 ? (
            <ViewAllFeature link={'/discover/top-albums'} />
          ) : (
            <div className="flex w-[10%]" />
          )}
        </div>
      </section>
    </div>
  );
}
