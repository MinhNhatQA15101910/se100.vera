'use client';
import React from 'react';
import AlbumCard from '@/components/ui/AlbumCard';
import { useState } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import Image from 'next/image';

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
    id: 2,
    title: 'Skyfall Beats',
    releaseDate: 'Oct 24, 2023',
    genre: 'Electronic',
    views: '980K',
    duration: '2:56',
  },
  {
    id: 3,
    title: 'Greedy',
    releaseDate: 'Nov 30, 2023',
    genre: 'R&B',
    views: '1.5M',
    duration: '3:12',
  },
  {
    id: 4,
    title: 'Lovin On Me',
    releaseDate: 'Dec 15, 2023',
    genre: 'Hip-Hop',
    views: '850K',
    duration: '2:47',
  },
  {
    id: 5,
    title: 'Pain The Town Red',
    releaseDate: 'Dec 29, 2023',
    genre: 'Rap',
    views: '2.1M',
    duration: '2:52',
  },
  {
    id: 6,
    title: 'Dancing in the Moonlight',
    releaseDate: 'Jan 5, 2024',
    genre: 'Pop',
    views: '1.0M',
    duration: '3:15',
  },
  {
    id: 7,
    title: 'Electronic Symphony',
    releaseDate: 'Feb 10, 2024',
    genre: 'Electronic',
    views: '900K',
    duration: '2:50',
  },
  {
    id: 8,
    title: 'Heartstrings',
    releaseDate: 'Mar 12, 2024',
    genre: 'Country',
    views: '700K',
    duration: '3:40',
  },
  {
    id: 9,
    title: 'Beyond the Horizon',
    releaseDate: 'Apr 20, 2024',
    genre: 'Rock',
    views: '1.3M',
    duration: '4:00',
  },
  {
    id: 10,
    title: 'Summer Breeze',
    releaseDate: 'May 15, 2024',
    genre: 'Indie',
    views: '500K',
    duration: '3:05',
  },
  {
    id: 11,
    title: 'City Nights',
    releaseDate: 'Jun 25, 2024',
    genre: 'Jazz',
    views: '450K',
    duration: '4:15',
  },
  {
    id: 12,
    title: 'Dreamcatcher',
    releaseDate: 'Jul 8, 2024',
    genre: 'Chill',
    views: '650K',
    duration: '3:30',
  },
  {
    id: 13,
    title: 'Rhythm of Love',
    releaseDate: 'Aug 2, 2024',
    genre: 'Dance',
    views: '2.3M',
    duration: '3:45',
  },
  {
    id: 14,
    title: 'Ethereal Echoes',
    releaseDate: 'Sep 18, 2024',
    genre: 'Ambient',
    views: '700K',
    duration: '4:20',
  },
  {
    id: 15,
    title: 'Rising Sun',
    releaseDate: 'Oct 10, 2024',
    genre: 'World',
    views: '600K',
    duration: '3:10',
  },
];

const albums = [
  { id: 1, image: 'https://via.placeholder.com/150', title: 'The Eminem Show' },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Music to Be Murdered By',
  },
  { id: 3, image: 'https://via.placeholder.com/150', title: 'Recovery' },
  { id: 4, image: 'https://via.placeholder.com/150', title: 'Revival' },
];

const allAlbums = [
  {
    id: 5,
    image: 'https://via.placeholder.com/200',
    title: 'Beauty Behind',
    artist: 'Eminem',
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/200',
    title: 'Thriller',
    artist: 'Eminem',
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Adele 21',
    artist: 'Eminem',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Eminem',
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Adele 21',
    artist: 'Eminem',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Eminem',
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Adele 21',
    artist: 'Eminem',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Eminem',
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Adele 21',
    artist: 'Eminem',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Eminem',
  },
];

export default function ArtistDetailPage() {
  // Move state declarations here
  const [songs, setSongs] = useState(initialSongs);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.key !== column) return null;

    return sortConfig.direction === 'ascending' ? (
      <FaSortAmountUpAlt className="text-[#EE10B0]" />
    ) : (
      <FaSortAmountDown className="text-[#EE10B0]" />
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

  const [visibleSongs, setVisibleSongs] = useState(5);

  const handleShowMore = () => {
    setVisibleSongs((prev) => prev + 5);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Artist Header */}
            <div className="flex-col items-center gap-8 mb-8 relative">
              <div className="relative w-full">
                <Image
                  src="https://via.placeholder.com/1000"
                  alt="Eminem"
                  width={1000} // Provide the width explicitly
                  height={400} // Provide the height explicitly
                  className="w-full h-80 object-cover rounded-md shadow-lg"
                />

                <div className="flex absolute top-4 left-0 right-0 w-full justify-between px-4">
                  <a href="/artists">
                    <IoArrowBack className="text-white text-4xl" />
                  </a>
                  <FiMoreHorizontal className="text-white text-4xl" />
                </div>
              </div>
              <div className="-mt-16 ml-4">
                <h1 className="text-8xl font-bold text-white drop-shadow-lg">
                  Eminem
                </h1>
              </div>
            </div>

            {/* Popular Tracks */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Popular</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 text-white">#</th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs('title')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Title</span>
                        {getSortIcon('title')}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs('releaseDate')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Release Date</span>
                        {getSortIcon('releaseDate')}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs('genre')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Genre</span>
                        {getSortIcon('genre')}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs('views')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Views</span>
                        {getSortIcon('views')}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs('duration')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Time</span>
                        {getSortIcon('duration')}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {songs.slice(0, visibleSongs).map((song, index) => (
                    <tr
                      key={song.id}
                      className="border-b border-gray-700 hover:bg-gray-800 transition "
                    >
                      <td className="p-3 text-white">{index + 1}</td>
                      <td className="p-3 flex items-center space-x-3">
                        <Image
                          src="https://via.placeholder.com/50"
                          alt={`${song.title} Thumbnail`}
                          width={0}
                          height={0}
                          className="w-12 h-12 rounded-md"
                        />
                        <div>
                          <p className="text-white font-medium">{song.title}</p>
                          <p className="text-gray-400 text-sm">Artist Name</p>
                        </div>
                      </td>
                      <td className="p-3 text-white">{song.releaseDate}</td>
                      <td className="p-3 text-white">{song.genre}</td>
                      <td className="p-3 text-white">{song.views}</td>
                      <td>
                        <div className="flex items-center">
                          <p className="p-3 text-white">{song.duration}</p>
                          <button
                            onClick={() => toggleFavorite(song.id)}
                            className="text-[#EE10B0] text-2xl"
                          >
                            {favorites.includes(song.id) ? (
                              <MdOutlineFavorite />
                            ) : (
                              <MdOutlineFavoriteBorder />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-6">
                {visibleSongs < songs.length && (
                  <button
                    onClick={handleShowMore}
                    className="bg-[#EE10B0] text-white px-4 py-2 rounded-md"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>

            {/* Albums Section */}
            <div className="mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  <span className="text-white">{"Artist's"}</span>{' '}
                  <span className="text-[#EE10B0]">Albums</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {allAlbums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      image={album.image}
                      title={album.title}
                      artist={album.artist}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>{' '}
    </div>
  );
}
