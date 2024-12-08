"use client";

import { useState } from "react";
import { GoPlay } from "react-icons/go";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

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
    // ... rest of the songs array
  ];

  const [songs, setSongs] = useState(initialSongs);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.key !== column) return null;

    return sortConfig.direction === "ascending" ? (
      <FaSortAmountUpAlt className="text-primary" />
    ) : (
      <FaSortAmountDown className="text-primary" />
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

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <Card className="w-full bg-blue-gradient">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Link href="/albums">
                  <Button variant="ghost" size="icon">
                    <IoArrowBack className="text-4xl" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <FiMoreHorizontal className="text-4xl" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-12 items-start gap-12 mb-8">
                <Image
                  src={albumImage}
                  alt={albumTitle}
                  width={268}
                  height={268}
                  className="col-span-3 rounded-md object-cover shadow-2xl"
                />
                <div className="flex flex-col col-span-6 h-56">
                  <h1 className="text-3xl font-bold mb-8">{albumTitle}</h1>
                  <p className="text-muted-foreground mt-2 line-clamp-3">
                    {albumDescription}
                  </p>
                  <div className="flex items-center space-x-2 mt-auto">
                    <p className="text-lg font-bold">20 songs</p>
                    <span className="text-primary leading-none">●</span>
                    <p className="text-lg font-bold">1h 36m</p>
                  </div>
                </div>
                <div className="flex h-60 col-span-3 justify-end items-end">
                  <Button variant="ghost" className="space-x-2">
                    <span className="text-lg text-primary font-medium">
                      Play all
                    </span>
                    <GoPlay className="text-primary text-6xl" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden bg-black/30">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortSongs("title")}
                          className="flex items-center space-x-1"
                        >
                          <span>Title</span>
                          {getSortIcon("title")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortSongs("releaseDate")}
                          className="flex items-center space-x-1"
                        >
                          <span>Release Date</span>
                          {getSortIcon("releaseDate")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortSongs("genre")}
                          className="flex items-center space-x-1"
                        >
                          <span>Genre</span>
                          {getSortIcon("genre")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortSongs("views")}
                          className="flex items-center space-x-1"
                        >
                          <span>Views</span>
                          {getSortIcon("views")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => sortSongs("duration")}
                          className="flex items-center space-x-1"
                        >
                          <span>Time</span>
                          {getSortIcon("duration")}
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {songs.map((song, index) => (
                      <TableRow key={song.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src="https://via.placeholder.com/50"
                              alt={`${song.title} Thumbnail`}
                              width={48}
                              height={48}
                              className="rounded-md"
                            />
                            <div>
                              <p className="font-medium">{song.title}</p>
                              <p className="text-muted-foreground text-sm">
                                Artist Name
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{song.releaseDate}</TableCell>
                        <TableCell>{song.genre}</TableCell>
                        <TableCell>{song.views}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-3">{song.duration}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(song.id)}
                              className="text-primary text-2xl"
                            >
                              {favorites.includes(song.id) ? (
                                <MdOutlineFavorite />
                              ) : (
                                <MdOutlineFavoriteBorder />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailDemo;
