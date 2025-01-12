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
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from '@/components/custom/DynamicImage';
import PaginationButtons from '@/components/PaginatedButtons';
import StatusToggleButton from '@/components/StatusToggleButton';
import { getAllAlbums } from '@/actions/album-actions';
import DeleteAlbumButton from '@/app/(app)/(artitst)/manage-songs/_components/DeleteAlbumButton';
import ViewAlbumDetailButton from '@/app/(app)/(artitst)/manage-songs/_components/ViewAlbumDetailButton';
import AdminSearchSongBar from '@/components/AdminSearchBar';

const AdminAlbumList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // State to hold search keyword
  const { setLoadingState } = useLoading();

  // Fetch albums based on search keyword, currentPage, and pageSize
  const { data, isLoading } = useQuery({
    queryKey: ['albums', currentPage, pageSize, searchKeyword],
    queryFn: async () => {
      const response = await getAllAlbums(currentPage, pageSize, searchKeyword);
      console.log(response); // Check if response is correct
      return response || { albums: [] }; // Return empty array if no data
    },
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchKeyword(value); // Update search keyword
  };

  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full pt-10 space-y-4">
      <AdminSearchSongBar onSearchChange={handleSearchChange} />
      <div className="flex-col items-center justify-center text-general-white w-[90%] manage-songs-table">
        {/* Search bar component */}

        <Table>
          <TableHeader>
            <TableRow className="border-none pointer-events-none text-center">
              <TableHead className="w-[100px] text-white text-center">
                No
              </TableHead>
              <TableHead className="w-[100px] text-white text-left">
                Album name
              </TableHead>
              <TableHead className="w-[100px] text-white text-center">
                Listen hours
              </TableHead>
              <TableHead className="hidden md:table-cell text-white text-center">
                Release Date
              </TableHead>
              <TableHead className="hidden md:table-cell text-white text-center">
                Songs
              </TableHead>
              <TableHead className="hidden lg:table-cell text-white text-center">
                Total Time
              </TableHead>
              <TableHead className="text-white text-center">Status</TableHead>
              <TableHead className="text-white text-center">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.albums.map((album, index) => (
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
                        album.photoUrl ||
                        'https://picsum.photos/400/400?random=42'
                      }
                      className="w-14 h-14 flex items-center"
                    />
                    <div>
                      <div className="font-semibold text-nowrap">
                        {album.albumName}
                      </div>
                      <div className="text-sm text-gray-400 text-nowrap">
                        {album.artists[0].artistName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400 group-hover:bg-[#595959] text-center">
                  {album.totalListeningHours}
                </TableCell>
                <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400 group-hover:bg-[#595959] text-center">
                  {album.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate text-center">
                  {album.totalSongs}
                </TableCell>
                <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] text-center">
                  <span className="text-gray-400">{album.totalDuration}</span>
                </TableCell>
                <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959]">
                  <StatusToggleButton
                    id={album.id}
                    type={'album'}
                    initialState={album.state}
                  />
                </TableCell>
                <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959] space-x-2">
                  <DeleteAlbumButton albumId={album.id} />
                  <ViewAlbumDetailButton albumId={album.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Buttons */}
        <PaginationButtons
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={data?.pagination.totalItems || 0}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminAlbumList;
