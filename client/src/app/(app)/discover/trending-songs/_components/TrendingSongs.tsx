'use client';

import React, { useState } from 'react';
import LikeButton from '@/components/music/LikeButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationButtons from '@/components/PaginatedButtons';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import { getAllSongs } from '@/actions/song-actions';
import usePlayerStore from '@/stores/player-store';

export default function TrendingSongs() {
  const { setLoadingState } = useLoading();
  const { setPlaylist, setActiveTrack } = usePlayerStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['songs', currentPage, pageSize],
    queryFn: async () => {
      const response = await getAllSongs(currentPage, pageSize);
      return response;
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  React.useEffect(() => {
    setPlaylist(data?.songs || []);
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="w-[90%] flex flex-col bg-transparent text-general-white items-center custom1-table">
      <Table>
        <TableHeader>
          <TableRow className="border-none pointer-events-none">
            <TableHead className="w-[100px] text-white" colSpan={2}>
              <h2 className="text-2xl font-bold mb-4">
                Trending <span className="text-pink-500">Songs</span>
              </h2>
            </TableHead>
            <TableHead className="hidden md:table-cell text-white">
              Release Date
            </TableHead>
            <TableHead className="hidden lg:table-cell text-white">
              Album
            </TableHead>
            <TableHead className="text-right text-white">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.songs?.slice(0, 7).map((song, idx) => {
            return (
              <TableRow
                key={song.id}
                className="border-none cursor-pointer hover:bg-transparent group"
                onClick={() => setActiveTrack(song)}
              >
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-[55px] h-[55px]">
                      <Image
                        src={
                          song.songPhotoUrl || 'https://via.placeholder.com/55'
                        }
                        alt={song.songName}
                        fill
                        sizes="55px"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{song.songName}</div>
                      <div className="text-sm text-gray-400">
                        {song.artists[0].artistName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {song.createdAt.slice(0, 10) || 'N/A'}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate">
                  {song.songName}
                </TableCell>
                <TableCell className="text-right bg-[#2E2E2E] group-hover:bg-[#595959]">
                  <div className="flex items-center justify-end space-x-4">
                    <LikeButton songId={song.id} />
                    <span className="text-gray-400 mx-auto">
                      {song.duration.slice(-5)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <PaginationButtons
        pageSize={pageSize}
        currentPage={currentPage}
        totalCount={data?.pagination.totalItems || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
