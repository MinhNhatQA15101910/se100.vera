'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tableV2';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import React from 'react';
import { getAllArtists } from '@/actions/user-actions';
import DynamicImage from '@/components/custom/DynamicImage';
export default function ManageArtists() {
  const { setLoadingState } = useLoading();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['artists', currentPage, pageSize],
    queryFn: async () => {
      const response = await getAllArtists();
      return response;
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  React.useEffect(() => {
    setLoadingState(isLoading);
    console.log(data?.artists);
  }, [isLoading]);

  return (
    <div className="flex-col min-h-screen w-full overflow-hidden">
      <div className="w-full flex flex-col bg-transparent text-general-white items-center custom1-table p-12 ">
        <div className="flex justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Manage <span className="text-pink-500">Artists</span>
            </h2>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableHead
              className="text-white text-lg font-bold"
              style={{ width: '5%' }}
            >
              #
            </TableHead>
            <TableHead style={{ width: '25%' }}>
              <span className="text-white text-lg font-bold">Artist</span>
            </TableHead>
            <TableHead style={{ width: '18%' }}>
              <span className="text-white text-lg font-bold">Created Date</span>
            </TableHead>
            <TableHead style={{ width: '18%' }}>
              <span className="text-white text-lg font-bold">
                Date of Birth
              </span>
            </TableHead>
            <TableHead style={{ width: '14%' }}>
              <span className="text-white text-lg font-bold">Gender</span>
            </TableHead>
            <TableHead style={{ width: '20%' }}>
              <span className="text-white text-lg font-bold">Email</span>
            </TableHead>
          </TableHeader>
          <TableBody>
            {data?.artists?.slice(0, 10).map((artist, index) => (
              <TableRow
                key={artist.id}
                className="border-none cursor-pointer hover:bg-transparent group"
              >
                <TableCell className="font-bold text-lg">{index + 1}</TableCell>
                <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                  <div className="flex items-center space-x-4">
                    <DynamicImage
                      src={artist.photoUrl || ''}
                      alt={`X`}
                      className="w-14 h-14 rounded-md"
                    />
                    <div>
                      <p className="font-bold text-white text-nowrap truncate">
                        {artist.artistName}
                      </p>
                      <p className="text-muted-foreground text-sm text-white">{`${artist.firstName} ${artist.lastName}`}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {artist.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {artist.dateOfBirth.slice(0, 10)}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {artist.gender || 'N/A'}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {artist.email || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
