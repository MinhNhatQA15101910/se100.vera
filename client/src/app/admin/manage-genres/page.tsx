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

const Page: React.FC = () => {
  const initialGenres = [
    {
      id: '1',
      genreName: 'Jazz',
      createdAt: 'Dec 30, 2023',
      views: 12345,
    },
    {
      id: '2',
      genreName: 'Pop',
      createdAt: 'Jan 15, 2024',
      views: 10234,
    },
    {
      id: '3',
      genreName: 'Rock',
      createdAt: 'Feb 10, 2024',
      views: 8901,
    },
    {
      id: '4',
      genreName: 'Hip-Hop',
      createdAt: 'Mar 5, 2024',
      views: 7567,
    },
    {
      id: '5',
      genreName: 'Electronic',
      createdAt: 'Apr 20, 2024',
      views: 6543,
    },
  ];

  const [genres] = useState(initialGenres);
  const [sortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.key !== column) return null;

    return sortConfig.direction === 'ascending' ? (
      <FaSortAmountUpAlt className="text-white" />
    ) : (
      <FaSortAmountDown className="text-white" />
    );
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="w-full flex flex-col bg-transparent text-general-white items-center custom1-table p-12 ">
        <div className="flex justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Manage <span className="text-pink-500">Genres</span>
            </h2>
          </div>
          <div>
            <Button className="bg-general-blue hover:bg-general-blue-hover text-lg">
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
                {getSortIcon('genreName')}
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
            {genres.map((genre, index) => (
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
                  {genre.createdAt}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                  {genre.views}
                </TableCell>
                <TableCell className="text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] ">
                  <div className="flex items-center space-x-2">
                    <UpdateButton genreId={genre.id} />
                    <DeleteButton genreId={genre.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
