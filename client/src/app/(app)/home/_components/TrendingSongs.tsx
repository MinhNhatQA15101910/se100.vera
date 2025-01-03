'use client';

import React from 'react';
import LikeButton from '@/components/music/LikeButton';
import { AppButton } from '@/components/ui/AppButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import { getAllSongs } from '@/actions/song-actions';
export default function TrendingSongs() {
  const { data, isLoading } = useQuery({
    queryKey: ['songs', 'home'],
    queryFn: async () => {
      const data = await getAllSongs(2, 4);
      return data;
    },
  });
  const { setLoadingState } = useLoading();
  React.useEffect(() => {
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
          {data?.songs?.slice(0, 10).map((song, idx) => {
            return (
              <TableRow
                key={song.id}
                className="border-none cursor-pointer hover:bg-transparent group"
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
                        {'Unknown Artist'}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {/* {new Date(song.releaseDate).toLocaleDateString() || 'N/A'} */}
                  N/A
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate">
                  {song.songName}
                </TableCell>
                <TableCell className="text-right bg-[#2E2E2E] group-hover:bg-[#595959]">
                  <div className="flex items-center justify-end space-x-4">
                    <LikeButton songId={song.id} />
                    <span className="text-gray-400 mx-auto">{'N/A'}</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <AppButton
        className={`flex flex-row w-fit space-x-1 items-center hover:bg-slate-700/10 py-1 px-3 rounded-sm group duration-200 transition-colors ${!data?.songs || data.songs.length < 10 ? 'hidden' : ''}`}
      >
        <Plus className="text-general-white/50 h-5 w-5 group-hover:text-general-white duration-200 transition-colors" />
        <span className="text-general-white/50 group-hover:text-general-white duration-200 transition-colors">
          View
        </span>
      </AppButton>
    </div>
  );
}
