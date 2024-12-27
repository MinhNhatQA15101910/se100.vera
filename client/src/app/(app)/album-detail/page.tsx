'use client';

import { useState } from 'react';
import { GoPlay } from 'react-icons/go';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';
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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import AddToPlaylistButton from '@/components/ui/addToPlaylistButton';
import FavouriteButton from '@/components/ui/favouriteButton';
import LikeButton from '@/components/music/LikeButton';

const AlbumDetailDemo: React.FC = () => {
  const albumImage = 'https://via.placeholder.com/268';
  const albumTitle = 'Album 1';
  const albumDescription =
    'tate mcree, nightmares, the neighberhood, doja cat and tate mcree, nightmares, the neighberhood, doja cat and tate mcree, nightmares, the neighberhood, doja cat and ';
  const initialSongs = [
    {
      id: 1,
      title: 'Sorforc',
      releaseDate: 'Nov 4, 2023',
      genre: 'Pop',
      views: '1.2M',
      duration: '2:36',
    },
    {
      id: 1,
      title: 'Sorforc',
      releaseDate: 'Nov 4, 2023',
      genre: 'Pop',
      views: '1.2M',
      duration: '2:36',
    },
    {
      id: 1,
      title: 'Sorforc',
      releaseDate: 'Nov 4, 2023',
      genre: 'Pop',
      views: '1.2M',
      duration: '2:36',
    },
    {
      id: 1,
      title: 'Sorforc',
      releaseDate: 'Nov 4, 2023',
      genre: 'Pop',
      views: '1.2M',
      duration: '2:36',
    },
    {
      id: 1,
      title: 'Sorforc',
      releaseDate: 'Nov 4, 2023',
      genre: 'Pop',
      views: '1.2M',
      duration: '2:36',
    },
  ];

  const [songs, setSongs] = useState(initialSongs);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.key !== column) return null;

    return sortConfig.direction === 'ascending' ? (
      <FaSortAmountUpAlt className="text-white" />
    ) : (
      <FaSortAmountDown className="text-white" />
    );
  };

  const sortSongs = (key: keyof (typeof initialSongs)[0]) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    const sortedSongs = [...songs].sort((a, b) => {
      const valueA =
        key === 'views' ? parseFloat(a[key].replace('M', '')) : a[key];
      const valueB =
        key === 'views' ? parseFloat(b[key].replace('M', '')) : b[key];

      if (valueA < valueB) return direction === 'ascending' ? -1 : 1;
      if (valueA > valueB) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setSongs(sortedSongs);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

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
                    src={albumImage}
                    alt={albumTitle}
                    width={268}
                    height={268}
                    className="col-span-3 rounded-md object-cover shadow-2xl"
                  />
                  <div className="flex flex-col col-span-6 h-56 text-white">
                    <h1 className="text-3xl font-bold mb-8">{albumTitle}</h1>
                    <p className="text-muted-foreground mt-2 line-clamp-3 text-white">
                      {albumDescription}
                    </p>
                    <div className="flex items-center space-x-2 mt-auto">
                      <p className="text-lg font-bold">20 songs</p>
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
                      onClick={() => sortSongs('title')}
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Title</span>
                      {getSortIcon('title')}
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      onClick={() => sortSongs('releaseDate')}
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Release</span>
                      {getSortIcon('releaseDate')}
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      onClick={() => sortSongs('genre')}
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Genre</span>
                      {getSortIcon('genre')}
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      onClick={() => sortSongs('views')}
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Views</span>
                      {getSortIcon('views')}
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      onClick={() => sortSongs('duration')}
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Time</span>
                      {getSortIcon('duration')}
                    </Button>
                  </TableHead>
                </TableHeader>
                <TableBody>
                  {songs.map((song, index) => (
                    <TableRow
                      key={song.id}
                      className="border-none cursor-pointer hover:bg-transparent group"
                    >
                      <TableCell className="font-bold text-lg">
                        {index + 1}
                      </TableCell>
                      <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                        <div className="flex items-center space-x-4">
                          <Image
                            src="https://via.placeholder.com/50"
                            alt={`${song.title} Thumbnail`}
                            width={55}
                            height={55}
                            className="rounded-md"
                          />
                          <div>
                            <p className="font-bold text-white">{song.title}</p>
                            <p className="text-muted-foreground text-sm text-white">
                              Artist Name
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.releaseDate}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.genre}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.views}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        <div className="flex items-center">
                          <span>{song.duration}</span>
                          <div className="ml-4">
                            <LikeButton songId={''} />
                          </div>
                          <div className="ml-4">
                            <AddToPlaylistButton songId={''} />
                          </div>
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

export default AlbumDetailDemo;
