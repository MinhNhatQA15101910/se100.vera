"use client";

import { useState } from "react";
import { GoPlay } from "react-icons/go";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";

const AlbumDetailDemo: React.FC = () => {
  const albumImage = "https://via.placeholder.com/268";
  const albumTitle = "Album 1";
  const albumDescription =
    "tate mcree, nightmares, the neighberhood, doja cat and tate mcree, nightmares, the neighberhood, doja cat and tate mcree, nightmares, the neighberhood, doja cat and ";
  const initialSongs = [
    {
      id: 1,
      title: "Sorforc",
      releaseDate: "Nov 4, 2023",
      genre: "Pop",
      views: "1.2M",
      duration: "2:36",
    },
    {
      id: 2,
      title: "Skyfall Beats",
      releaseDate: "Oct 24, 2023",
      genre: "Electronic",
      views: "980K",
      duration: "2:56",
    },
    {
      id: 3,
      title: "Greedy",
      releaseDate: "Nov 30, 2023",
      genre: "R&B",
      views: "1.5M",
      duration: "3:12",
    },
    {
      id: 4,
      title: "Lovin On Me",
      releaseDate: "Dec 15, 2023",
      genre: "Hip-Hop",
      views: "850K",
      duration: "2:47",
    },
    {
      id: 5,
      title: "Pain The Town Red",
      releaseDate: "Dec 29, 2023",
      genre: "Rap",
      views: "2.1M",
      duration: "2:52",
    },
    {
      id: 6,
      title: "Dancing in the Moonlight",
      releaseDate: "Jan 5, 2024",
      genre: "Pop",
      views: "1.0M",
      duration: "3:15",
    },
    {
      id: 7,
      title: "Electronic Symphony",
      releaseDate: "Feb 10, 2024",
      genre: "Electronic",
      views: "900K",
      duration: "2:50",
    },
    {
      id: 8,
      title: "Heartstrings",
      releaseDate: "Mar 12, 2024",
      genre: "Country",
      views: "700K",
      duration: "3:40",
    },
    {
      id: 9,
      title: "Beyond the Horizon",
      releaseDate: "Apr 20, 2024",
      genre: "Rock",
      views: "1.3M",
      duration: "4:00",
    },
    {
      id: 10,
      title: "Summer Breeze",
      releaseDate: "May 15, 2024",
      genre: "Indie",
      views: "500K",
      duration: "3:05",
    },
    {
      id: 11,
      title: "City Nights",
      releaseDate: "Jun 25, 2024",
      genre: "Jazz",
      views: "450K",
      duration: "4:15",
    },
    {
      id: 12,
      title: "Dreamcatcher",
      releaseDate: "Jul 8, 2024",
      genre: "Chill",
      views: "650K",
      duration: "3:30",
    },
    {
      id: 13,
      title: "Rhythm of Love",
      releaseDate: "Aug 2, 2024",
      genre: "Dance",
      views: "2.3M",
      duration: "3:45",
    },
    {
      id: 14,
      title: "Ethereal Echoes",
      releaseDate: "Sep 18, 2024",
      genre: "Ambient",
      views: "700K",
      duration: "4:20",
    },
    {
      id: 15,
      title: "Rising Sun",
      releaseDate: "Oct 10, 2024",
      genre: "World",
      views: "600K",
      duration: "3:10",
    },
  ];

  const [songs, setSongs] = useState(initialSongs);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.key !== column) return null;

    return sortConfig.direction === "ascending" ? (
      <FaSortAmountUpAlt className="text-[#EE10B0]" />
    ) : (
      <FaSortAmountDown className="text-[#EE10B0]" />
    );
  };

  const sortSongs = (key: keyof (typeof initialSongs)[0]) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedSongs = [...songs].sort((a, b) => {
      const valueA =
        key === "views" ? parseFloat(a[key].replace("M", "")) : a[key];
      const valueB =
        key === "views" ? parseFloat(b[key].replace("M", "")) : b[key];

      if (valueA < valueB) return direction === "ascending" ? -1 : 1;
      if (valueA > valueB) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setSongs(sortedSongs);
  };

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-full p-6 bg-blue-gradient rounded-lg shadow-md">
            {/* Album Header */}
            <div className="flex justify-between items-center mb-8">
              <a href="/albums">
                <IoArrowBack className="text-white text-4xl" />
              </a>
              <FiMoreHorizontal className="text-white text-4xl" />
            </div>
            <div className="grid grid-cols-12 items-start gap-12 mb-8">
              <img
                src={albumImage}
                alt={albumTitle}
                className="col-span-3 rounded-md object-cover shadow-2xl"
              />
              <div className="flex flex-col col-span-6 h-56">
                <h1 className="text-white text-3xl font-bold mb-8">
                  {albumTitle}
                </h1>
                <p className="text-gray-200 mt-2 line-clamp-3">
                  {albumDescription}
                </p>
                <div className="flex items-center space-x-2 text-white mt-auto">
                  <p className="text-lg font-bold">20 songs</p>
                  <span className="text-[#EE10B0] leading-none">●</span>
                  <p className="text-lg font-bold">1h 36m</p>
                </div>
              </div>
              <div className="flex h-60 col-span-3 justify-end items-end">
                <div className="flex justify-end items-center space-x-2">
                  <p className="text-lg text-[#EE10B0] font-medium">Play all</p>
                  <GoPlay className="text-[#EE10B0] text-6xl" />
                </div>
              </div>
            </div>

            {/* Song List in Table Format */}
            <div className="rounded-lg overflow-hidden bg-black bg-opacity-30">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 text-white">#</th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs("title")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Title</span>
                        {getSortIcon("title")}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs("releaseDate")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Release Date</span>
                        {getSortIcon("releaseDate")}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs("genre")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Genre</span>
                        {getSortIcon("genre")}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs("views")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Views</span>
                        {getSortIcon("views")}
                      </div>
                    </th>
                    <th
                      className="p-3 text-white cursor-pointer"
                      onClick={() => sortSongs("duration")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Time</span>
                        {getSortIcon("duration")}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {songs.map((song, index) => (
                    <tr
                      key={song.id}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="p-3 text-white">{index + 1}</td>
                      <td className="p-3 flex items-center space-x-3">
                        <img
                          src="https://via.placeholder.com/50"
                          alt={`${song.title} Thumbnail`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailDemo;
