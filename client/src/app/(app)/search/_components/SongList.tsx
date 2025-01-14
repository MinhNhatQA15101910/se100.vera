'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import LikeButton from '@/components/music/LikeButton';
import AddToPlaylistButton from '@/components/ui/addToPlaylistButton';
import { getAllSongs } from '@/actions/song-actions';
import PaginationButtons from '@/components/PaginatedButtons';
import usePlayerStore from '@/stores/player-store';
import { useDebounce } from '@/hooks/useDebounce';

export interface SongListProps {
  keyword: string;
}

const SongList: React.FC<SongListProps> = ({ keyword }) => {
  const { setActiveTrack } = usePlayerStore();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 6;

  // Debounce the keyword to reduce frequent API calls
  const debouncedKeyword = useDebounce(keyword, 300); // 300ms debounce delay

  const { data } = useQuery({
    queryKey: ['songs', currentPage, pageSize, debouncedKeyword],
    queryFn: async () => {
      const response = await getAllSongs(
        currentPage,
        pageSize,
        debouncedKeyword
      );
      return response;
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-[90%] min-h-screen flex flex-col bg-transparent text-general-white items-center custom1-table">
      {data?.songs.length === 0 ? (
        <h2 className="text-2xl font-bold mb-4">No results found</h2>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="border-none pointer-events-none">
                <TableHead className="w-[100px] text-white" colSpan={2}>
                  <h2 className="text-2xl font-bold mb-4">
                    <span className="text-pink-500">Songs</span>
                  </h2>
                </TableHead>
                <TableHead className="hidden md:table-cell text-white">
                  Release Date
                </TableHead>
                <TableHead className="hidden lg:table-cell text-white">
                  Album
                </TableHead>
                <TableHead className="text-right text-white">Time</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.songs?.map((song, idx) => {
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
                                song.photoUrl ||
                                'https://via.placeholder.com/55'
                              }
                              alt={song.songName}
                              fill
                              sizes="55px"
                            />
                          </div>
                          <div>
                            <div className="font-semibold">{song.songName}</div>
                            <div className="text-sm text-gray-400">
                              {song.publisherName}
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
                          <span className="text-gray-400 mx-auto">
                            {song.duration.slice(-5)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right bg-[#2E2E2E] group-hover:bg-[#595959]">
                        <div className="flex items-center justify-end space-x-4">
                          <LikeButton songId={song.id} />
                          <AddToPlaylistButton songId={song.id} />
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
        </>
      )}
    </div>
  );
};

export default SongList;
