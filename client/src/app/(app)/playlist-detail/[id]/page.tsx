'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import { getPlaylistById } from '@/actions/playlist-actions';

import { GoPlay } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tableV2';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LikeButton from '@/components/music/LikeButton';

const PlaylistDetail = () => {
  const params = useParams();
  const { id } = params;
  const { setLoadingState } = useLoading();

  const { data: playlistDetail, isLoading } = useQuery({
    queryKey: ['playlistDetail'],
    queryFn: async () => await getPlaylistById(Number(id)),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-dark-blue-gradient rounded-lg">
            <div className="w-full bg-blue-gradient rounded-lg">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <Link href="/albums">
                    <IoArrowBack className="text-4xl text-white" />
                  </Link>
                  <FiMoreHorizontal className="text-4xl text-white" />
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-12 items-start gap-12 mb-8">
                  <Image
                    src={
                      playlistDetail?.songs[0].songPhotoUrl ||
                      'https://picsum.photos/400/400?random=4'
                    }
                    alt={playlistDetail?.playlistName || 'X'}
                    width={268}
                    height={268}
                    className="col-span-3 rounded-md object-cover shadow-2xl"
                  />
                  <div className="flex flex-col col-span-6 h-56 text-white">
                    <h1 className="text-3xl font-bold mb-8">
                      {playlistDetail?.playlistName}
                    </h1>
                    <p className="text-muted-foreground mt-2 line-clamp-3 text-white">
                      {playlistDetail?.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-auto">
                      <p className="text-lg font-bold">
                        {playlistDetail?.totalSongs} songs
                      </p>
                      <span className="leading-none text-[#EE10B0]">●</span>
                      <p className="text-lg font-bold">1h 36m</p>
                    </div>
                  </div>
                  <div className="flex h-60 col-span-3 justify-end items-end mr-6">
                    <button className="flex justify-center items-center space-x-2 focus:outline-none">
                      <span className="text-lg font-medium text-[#EE10B0]">
                        Play all
                      </span>
                      <GoPlay className="text-6xl text-[#EE10B0]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-opacity-30"
                    >
                      <span>Title</span>
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-opacity-30"
                    >
                      <span>Release</span>
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-opacity-30"
                    >
                      <span>Total Listening Hours</span>
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-opacity-30"
                    >
                      <span>Actions</span>
                    </Button>
                  </TableHead>
                </TableHeader>
                <TableBody>
                  {playlistDetail?.songs.map((song, index) => (
                    <TableRow
                      key={index}
                      className="border-none cursor-pointer hover:bg-transparent group"
                    >
                      <TableCell className="font-bold text-lg">
                        {index + 1}
                      </TableCell>
                      <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                        <div className="flex items-center space-x-4">
                          <Image
                            src="https://via.placeholder.com/50"
                            alt={`${song.songName} Thumbnail`}
                            width={55}
                            height={55}
                            className="rounded-md"
                          />
                          <div>
                            <p className="font-bold text-white text-nowrap truncate">
                              {song.songName}
                            </p>
                            <p className="text-muted-foreground text-sm text-white">
                              {song.publisherName || ''}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {playlistDetail?.createdAt?.slice(0, 10) || 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        <div className="flex flex-row h-full items-center justify-around">
                          {song.totalListeningHours || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] md:flex-row group-hover:bg-[#595959]">
                        <div className="flex flex-row h-full items-center justify-around">
                          <LikeButton songId={3} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
