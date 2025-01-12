'use client';

import React, { useEffect } from 'react';
import AlbumCard from '@/components/ui/AlbumCard';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tableV2';
import { Button } from '@/components/ui/button';
import LikeButton from '@/components/music/LikeButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import { getArtistSongsByArtistId } from '@/actions/song-actions';
import { getArtistAlbums } from '@/actions/album-actions';
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from '@/components/custom/DynamicImage';
import AddToPlaylistButton from '@/components/ui/addToPlaylistButton';

export default function ArtistDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const { setLoadingState } = useLoading();

  const [
    { data: theArtist, isLoading: artistLoading },
    { data: artistAlbums, isLoading: albumsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['theArtist', userId],
        queryFn: async () => await getArtistSongsByArtistId(Number(userId)),
      },
      {
        queryKey: ['artistAlbums', userId],
        queryFn: async () => await getArtistAlbums(Number(userId)),
      },
    ],
  });

  const [visibleSongs, setVisibleSongs] = useState(5);

  const handleShowMore = () => {
    setVisibleSongs((prev) => prev + 5);
  };

  useEffect(() => {
    setLoadingState(artistLoading || albumsLoading);
  }, [artistLoading, albumsLoading]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-transparent min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Artist Header */}
            <div className="flex-col items-center gap-8 mb-8 relative">
              <div className="relative w-full">
                <div className="flex w-full h-80 items-center justify-center relative">
                  <DynamicImage
                    src={
                      theArtist?.songs[0].publisherImageUrl ||
                      '/placeholder-artist.jpg'
                    }
                    alt={theArtist?.songs[0].publisherName || 'Artist image'}
                    className="object-contain rounded-full"
                  />
                </div>

                <div className="flex absolute top-4 left-0 right-0 w-full justify-between px-4 ">
                  <IoArrowBack
                    className="text-white text-4xl hover:text-general-pink transition-colors cursor-pointer duration-200"
                    onClick={() => {
                      router.back()
                    }}
                  />
                </div>
              </div>
              <div className="-mt-16 ml-4">
                <h1 className="text-8xl font-bold text-general-pink drop-shadow-lg">
                  {theArtist?.songs[0]?.publisherName || ''}
                </h1>
              </div>
            </div>

            {/* Popular Tracks */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Popular</h2>
              <div className="w-full flex flex-col bg-transparent text-general-white items-center custom1-table p-4">
                <Table>
                  <TableHeader>
                    <TableHead
                      className=" text-white text-lg font-bold"
                      style={{ width: '5%' }}
                    >
                      #
                    </TableHead>
                    <TableHead style={{ width: '35%' }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                      >
                        <span>Title</span>
                      </Button>
                    </TableHead>
                    <TableHead style={{ width: '15%' }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                      >
                        <span>Release</span>
                      </Button>
                    </TableHead>
                    <TableHead style={{ width: '15%' }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                      >
                        <span>Genre</span>
                      </Button>
                    </TableHead>
                    <TableHead style={{ width: '15%' }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                      >
                        <span>Views</span>
                      </Button>
                    </TableHead>
                    <TableHead style={{ width: '15%' }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                      >
                        <span>Time</span>
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                      >
                        <span>Actions</span>
                      </Button>
                    </TableHead>
                  </TableHeader>
                  <TableBody>
                    {theArtist?.songs.map((song, index) => (
                      <TableRow
                        key={song.id}
                        className="border-none cursor-pointer hover:bg-transparent group"
                      >
                        <TableCell className="font-bold text-lg">
                          {index + 1}
                        </TableCell>
                        <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                          <div className="flex items-center space-x-4">
                            <DynamicImage
                              alt="Artist Image"
                              src={
                                song.photoUrl ||
                                'https://picsum.photos/400/400?random=42'
                              }
                              className="w-14 h-14 "
                            />
                            <div>
                              <p className="font-bold text-white">
                                {song.songName}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                          {song.createdAt.slice(0, 10)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                          {song.genres.map((genre, index) => (
                            <span key={index}>
                              {genre}
                              {index < song.genres.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                          {song.totalListeningHours}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                          <div className="flex items-center">
                            <span>{song.duration.slice(-5)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                          <div className="ml-4 flex flex-row justify-around">
                            <LikeButton songId={song.id} />
                            <AddToPlaylistButton songId={song.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-center mt-6">
                {visibleSongs < (theArtist?.songs.length || 0) && (
                  <button
                    onClick={handleShowMore}
                    className="bg-[#EE10B0] text-white px-4 py-2 rounded-md"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>

            {/* Albums Section */}
            <div className="mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  <span className="text-white">{"Artist's"}</span>{' '}
                  <span className="text-[#EE10B0]">Albums</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {artistAlbums?.map((album) => (
                    <AlbumCard key={album.id} albumCard={album} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>{' '}
    </div>
  );
}
