import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/tableV2';
import AddToPlaylistButton from './ui/addToPlaylistButton';
import LikeButton from './music/LikeButton';
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

const SongListSideBar = ({ paddingBottom = '0' }) => {
  const [songs, setSongs] = useState(initialSongs);

  return (
    <div
      className="h-screen hidden sticky top-0 md:flex bg-[#181818] text-white flex-col min-h-screen border-l border-l-general-pink shadow-[8px_0px_24.2px_0px_rgba(238,16,176,0.15)] animate-[border-pulse_2s_ease-in-out_infinite]"
      style={{
        width: '300px',
        paddingBottom,
      }}
    >
      <div className="overflow-y-scroll">
        <div className="">
          <div className="w-full flex flex-col bg-transparent text-general-white items-center custom1-table p-4">
            <Table>
              <TableBody>
                {songs.map((song, index) => (
                  <TableRow
                    key={song.id}
                    className="border-none cursor-pointer hover:bg-transparent group"
                  >
                    <TableCell className="font-bold text-sm">
                      {index + 1}
                    </TableCell>

                    <TableCell className="group-hover:bg-[#595959]">
                      <div className="flex items-center space-x-2">
                        <Image
                          src="https://via.placeholder.com/50"
                          alt={`${song.title} Thumbnail`}
                          width={45}
                          height={45}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-bold text-white text-[12px] truncate ">
                            {song.title}
                          </p>
                          <p className="text-muted-foreground text-[12px] text-white truncate ">
                            Artist Name
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-400 group-hover:bg-[#595959]">
                      <div className="flex items-center text-[12px]">
                        <span>{song.duration}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongListSideBar;
