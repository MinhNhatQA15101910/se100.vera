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
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from '@/components/custom/DynamicImage';
import DeleteSongButton from '@/app/(app)/(artitst)/manage-songs/_components/DeleteSongButton';
import { getAllSongs } from '@/actions/song-actions';
import PaginationButtons from '@/components/PaginatedButtons';
import StatusToggleButton from '@/components/StatusToggleButton';
import ViewSongDetailButton from '@/app/(app)/(artitst)/manage-songs/_components/ViewSongDetailButton';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminSongListProps {
  searchKeyword: string;
}

const AdminSongList: React.FC<AdminSongListProps> = ({ searchKeyword }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('createAt');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const pageSize = 10;
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();

  // Update query to include sorting parameters
  const { data, isLoading } = useQuery({
    queryKey: [
      'songs',
      currentPage,
      pageSize,
      searchKeyword,
      sortBy,
      sortOrder,
    ],
    queryFn: async () =>
      await getAllSongs(
        currentPage,
        pageSize,
        searchKeyword,
        sortBy,
        sortOrder
      ),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="flex-col items-center justify-center text-general-white w-[90%] manage-songs-table">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-lg"> </h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-pink-500 text-white py-2 px-4 rounded-md cursor-pointer">
            Sort By
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sort Order</DropdownMenuSubTrigger>
              <DropdownMenuItem
                onClick={() => handleSortChange('songName', 'asc')}
              >
                Song Name Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange('songName', 'desc')}
              >
                Song Name Desc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange('artistName', 'asc')}
              >
                Artist Name Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange('artistName', 'desc')}
              >
                Artist Name Desc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange('createdAt', 'asc')}
              >
                Created Date Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange('createdAt', 'desc')}
              >
                Created Date Desc
              </DropdownMenuItem>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-none pointer-events-none text-center">
            <TableHead className="w-[100px] text-white text-center">
              No
            </TableHead>
            <TableHead className="w-[100px] text-white text-left">
              Song Name
            </TableHead>
            <TableHead className="w-[100px] text-white text-center">
              Genre
            </TableHead>
            <TableHead className="hidden md:table-cell text-white text-center">
              Release Date
            </TableHead>
            <TableHead className="hidden md:table-cell text-white text-center">
              Total View
            </TableHead>
            <TableHead className="hidden lg:table-cell text-white text-center">
              Time
            </TableHead>
            <TableHead className="text-white text-center">Status</TableHead>
            <TableHead className="text-white text-center">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.songs.map((song, index) => (
            <TableRow
              key={index}
              className="border-none cursor-pointer hover:bg-transparent group text-center"
            >
              <TableCell className="font-medium text-center">
                #{index + 1}
              </TableCell>
              <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0 text-left">
                <div className="flex items-center space-x-4 justify-start">
                  <DynamicImage
                    alt="Artist Image"
                    src={
                      song.photoUrl ||
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
              <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400 group-hover:bg-[#595959] text-center">
                {song.genres}
              </TableCell>
              <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400 group-hover:bg-[#595959] text-center">
                {song.createdAt.slice(0, 10)}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate text-center">
                {song.totalViews}
              </TableCell>
              <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] text-center">
                <span className="text-gray-400">{song.duration.slice(-5)}</span>
              </TableCell>
              <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959]">
                <StatusToggleButton
                  id={song.id}
                  type={'song'}
                  initialState={song.state}
                />
              </TableCell>
              <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959] space-x-2">
                <DeleteSongButton songId={song.id} />
                <ViewSongDetailButton songId={song.id} />
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
