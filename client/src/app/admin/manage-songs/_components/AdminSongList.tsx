'use client';

import React, { useEffect, useState } from 'react';

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';

import LikeButton from '@/components/music/LikeButton';

import AddToAlbumButton from '@/components/AddToAlbumButton';

import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from '@/components/custom/DynamicImage';
import DeleteSongButton from '@/app/(app)/(artitst)/manage-songs/_components/DeleteSongButton';
import { getAllSongs } from '@/actions/song-actions';
import PaginationButtons from '@/components/PaginatedButtons';
import StatusToggleButton from '@/components/StatusToggleButton'; // Import component toggle

const AdminSongList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();
  const { data, isLoading } = useQuery({
    queryKey: ['songs', currentPage, pageSize],
    queryFn: async () => await getAllSongs(currentPage, pageSize),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex-col items-center justify-center text-general-white w-[90%] manage-songs-table">
      <Table>
        <TableHeader>
          <TableRow className="border-none pointer-events-none">
            <TableHead className="w-[100px] text-white">No</TableHead>
            <TableHead className="w-[100px] text-white">Song Name</TableHead>
            <TableHead className="w-[100px] text-white text-right">
              Genre
            </TableHead>
            <TableHead className="hidden md:table-cell text-white text-right">
              Release Date
            </TableHead>
            <TableHead className="hidden md:table-cell text-white text-right">
              Total View
            </TableHead>
            <TableHead className="hidden lg:table-cell text-white text-center">
              Time
            </TableHead>
            <TableHead className="text-white text-center">Manage</TableHead>
            <TableHead className="text-white text-center">
              Status
            </TableHead>{' '}
            {/* Header mới */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.songs.map((song, index) => (
            <TableRow
              key={index}
              className="border-none cursor-pointer hover:bg-transparent group"
            >
              <TableCell className="font-medium">#{index + 1}</TableCell>
              <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                <div className="flex items-center space-x-4">
                  <DynamicImage
                    alt="Artist Image"
                    src={
                      song.songPhotoUrl ||
                      'https://picsum.photos/400/400?random=42'
                    }
                    className="w-14 h-14 flex items-center"
                  />
                  <div>
                    <div className="font-semibold text-nowrap">
                      {song.songName}
                    </div>
                    <div className="text-sm text-gray-400 text-nowrap">
                      {song.publisherName}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400  group-hover:bg-[#595959] text-right">
                {song.genres}
              </TableCell>
              <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400  group-hover:bg-[#595959] text-right">
                {song.createdAt.slice(0, 10)}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate text-right">
                {song.totalListeningHours}
              </TableCell>
              <TableCell className=" bg-[#2E2E2E] group-hover:bg-[#595959]">
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-gray-400 mx-auto">
                    {song.duration.slice(-5)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959] space-x-2">
                <DeleteSongButton songId={song.id} />
              </TableCell>
              <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959]">
              <StatusToggleButton
                  id={song.id}
                  type="song"
                  isActivated={true}
                />
              </TableCell>
            </TableRow>
          ))}
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
};

export default AdminSongList;
