'use client';

import React, { useState } from 'react';
import SongCard from '@/components/music/SongCard';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Song } from '@/types/global';

const genres = [
  { id: 1, name: 'Pop' },
  { id: 2, name: 'Rock' },
  { id: 3, name: 'Jazz' },
  { id: 4, name: 'Classical' },
];

const releaseYears = ['2023', '2022', '2021', '2020', '2019'];
const nations = ['USA', 'UK', 'Korea', 'Japan', 'France'];
const sortByOptions = ['Most Popular', 'Newest', 'Oldest', 'Alphabetical'];

const songResult: Song[] = [
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
  {
    id: 3,
    songName: 'Adele 21 Deluxe',
    description: 'Deluxe version of Adele’s debut album',
    totalListeningHours: 600,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21-deluxe',
    lyricUrl: null,
  },
  {
    id: 4,
    songName: 'Views',
    description: 'Drake’s Views from the 6',
    totalListeningHours: 900,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'views',
    lyricUrl: null,
  },
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
  {
    id: 3,
    songName: 'Adele 21 Deluxe',
    description: 'Deluxe version of Adele’s debut album',
    totalListeningHours: 600,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21-deluxe',
    lyricUrl: null,
  },
  {
    id: 4,
    songName: 'Views',
    description: 'Drake’s Views from the 6',
    totalListeningHours: 900,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'views',
    lyricUrl: null,
  },
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
  {
    id: 3,
    songName: 'Adele 21 Deluxe',
    description: 'Deluxe version of Adele’s debut album',
    totalListeningHours: 600,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21-deluxe',
    lyricUrl: null,
  },
  {
    id: 4,
    songName: 'Views',
    description: 'Drake’s Views from the 6',
    totalListeningHours: 900,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'views',
    lyricUrl: null,
  },
];

const durations = ['< 2m', '2-4m', '4-6m', '6-8m', '> 8m'];

export default function AlbumsPage() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedNation, setSelectedNation] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>('Most Popular');

  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isNationDropdownOpen, setIsNationDropdownOpen] = useState(false);
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);

  const handleGenreToggle = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Dropdown Menus */}
            <div className="grid grid-cols-5 gap-8 mb-8">
              {/* Genre Dropdown */}
              <div className="flex flex-col items-start">
                <span className="mb-2 font-semibold text-gray-700 truncate">
                  Genre
                </span>
                <DropdownMenu
                  onOpenChange={(isOpen) => setIsGenreDropdownOpen(isOpen)}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between px-4 py-2 bg-general-pink text-white rounded-lg w-full">
                      <span className="truncate">
                        {selectedGenres.length > 0
                          ? `Selected: ${selectedGenres.length} Genre(s)`
                          : 'Select Genres'}
                      </span>
                      {isGenreDropdownOpen ? (
                        <MdExpandLess className="ml-2 text-xl" />
                      ) : (
                        <MdExpandMore className="ml-2 text-xl" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full text-left">
                    {genres.map((genre) => (
                      <DropdownMenuCheckboxItem
                        key={genre.id}
                        checked={selectedGenres.includes(genre.id)}
                        onCheckedChange={() => handleGenreToggle(genre.id)}
                      >
                        {genre.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Release Year Dropdown */}
              <div className="flex flex-col items-start">
                <span className="mb-2 font-semibold text-gray-700 truncate">
                  Release Year
                </span>
                <DropdownMenu
                  onOpenChange={(isOpen) => setIsYearDropdownOpen(isOpen)}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between px-4 py-2 bg-general-pink text-white rounded-lg w-full">
                      <span className="truncate">
                        {selectedYear || 'Select Release Year'}
                      </span>
                      {isYearDropdownOpen ? (
                        <MdExpandLess className="ml-2 text-xl" />
                      ) : (
                        <MdExpandMore className="ml-2 text-xl" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full text-left">
                    <DropdownMenuLabel>Release Year</DropdownMenuLabel>
                    {releaseYears.map((year) => (
                      <DropdownMenuRadioItem
                        key={year}
                        value={year}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Nation Dropdown */}
              <div className="flex flex-col items-start">
                <span className="mb-2 font-semibold text-gray-700 truncate">
                  Nation
                </span>
                <DropdownMenu
                  onOpenChange={(isOpen) => setIsNationDropdownOpen(isOpen)}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between px-4 py-2 bg-general-pink text-white rounded-lg w-full">
                      <span className="truncate">
                        {selectedNation || 'Select Nation'}
                      </span>
                      {isNationDropdownOpen ? (
                        <MdExpandLess className="ml-2 text-xl" />
                      ) : (
                        <MdExpandMore className="ml-2 text-xl" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full text-left">
                    <DropdownMenuLabel>Nation</DropdownMenuLabel>
                    {nations.map((nation) => (
                      <DropdownMenuRadioItem
                        key={nation}
                        value={nation}
                        onClick={() => setSelectedNation(nation)}
                      >
                        {nation}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Song Duration Dropdown */}
              <div className="flex flex-col items-start">
                <span className="mb-2 font-semibold text-gray-700 truncate">
                  Song Duration
                </span>
                <DropdownMenu
                  onOpenChange={(isOpen) => setIsDurationDropdownOpen(isOpen)}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between px-4 py-2 bg-general-pink text-white rounded-lg w-full">
                      <span className="truncate">
                        {selectedDuration || 'Select Song Duration'}
                      </span>
                      {isDurationDropdownOpen ? (
                        <MdExpandLess className="ml-2 text-xl" />
                      ) : (
                        <MdExpandMore className="ml-2 text-xl" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full text-left">
                    <DropdownMenuLabel>Song Duration</DropdownMenuLabel>
                    {durations.map((duration) => (
                      <DropdownMenuRadioItem
                        key={duration}
                        value={duration}
                        onClick={() => setSelectedDuration(duration)}
                      >
                        {duration}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex flex-col items-start">
                <span className="mb-2 font-semibold text-gray-700 truncate">
                  Sort By
                </span>
                <DropdownMenu
                  onOpenChange={(isOpen) => setIsSortByDropdownOpen(isOpen)}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between px-4 py-2 bg-general-pink text-white rounded-lg w-full">
                      <span className="truncate">{sortBy || 'Sort By'}</span>
                      {isSortByDropdownOpen ? (
                        <MdExpandLess className="ml-2 text-xl" />
                      ) : (
                        <MdExpandMore className="ml-2 text-xl" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full text-left">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    {sortByOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option}
                        value={option}
                        onClick={() => setSortBy(option)}
                      >
                        {option}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Recommended Songs */}
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Recommended</span>{' '}
                  <span className="text-[#EE10B0]">Songs</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {songResult.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
