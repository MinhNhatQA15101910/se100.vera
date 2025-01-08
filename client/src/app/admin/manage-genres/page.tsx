'use client';

import { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tableV2';
import { Button } from '@/components/ui/button';
import UpdateButton from '@/components/UpdateButton';
import DeleteButton from '@/components/DeleteButton';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import React from 'react';
import { getAllGenres } from '@/actions/genre-actions';
import PaginationButtons from '@/components/PaginatedButtons';
import AddPlaylistModal from '@/components/AddPlaylistModal';
import Modal from '@/components/Modal';
import AddUpdateGenresCard from '@/components/AddUpdateGenresCard';

export default function ManageGenres() {
  const [isAddGenreModalOpen, setIsAddGenreModalOpen] = useState(false);
  const { setLoadingState } = useLoading();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['genres', currentPage, pageSize],
    queryFn: async () => {
      const response = await getAllGenres(currentPage, pageSize);
      return response;
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  React.useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="flex-col min-h-screen w-full overflow-hidden">
      <div className="w-full flex flex-col bg-transparent text-general-white items-center custom1-table p-12 ">
        <div className="flex justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Manage <span className="text-pink-500">Genres</span>
            </h2>
          </div>
          <div>
            <Button
              className="bg-general-blue hover:bg-general-blue-hover text-lg"
              onClick={() => {
                setIsAddGenreModalOpen(true);
              }}
            >
              Add a genre
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableHead
              className="text-white text-lg font-bold"
              style={{ width: '3%' }}
            >
              #
            </TableHead>
            <TableHead style={{ width: '35%' }}>
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
                <span>Release</span>
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
                <span>Manage</span>
              </Button>
            </TableHead>
          </TableHeader>
          <TableBody>
            {data?.genres?.slice(0, 10).map((genre, index) => (
              <TableRow
                key={genre.id}
                className="border-none cursor-pointer hover:bg-transparent group"
              >
                <TableCell className="font-bold text-lg">{index + 1}</TableCell>
                <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                  <div className="flex items-center space-x-4 p-4">
                    <p className="font-bold text-white">{genre.genreName}</p>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {genre.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {getRandomNumber(10, 1000)}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] ">
                  <div className="flex items-center space-x-2">
                    <UpdateButton
                      genreId={genre.id}
                      genreName={genre.genreName}
                    />
                    <DeleteButton
                      genreId={genre.id}
                      genreName={genre.genreName}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        onChange={() => {
          setIsAddGenreModalOpen(false);
        }}
        isOpen={isAddGenreModalOpen}
        title="ADD A GENRE"
      >
        <AddUpdateGenresCard />
      </Modal>
      <PaginationButtons
        pageSize={pageSize}
        currentPage={currentPage}
        totalCount={data?.pagination.totalItems || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
