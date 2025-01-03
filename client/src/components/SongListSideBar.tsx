'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/tableV2';
import Image from 'next/image';
import usePlayerStore from '@/stores/player-store';


const SongListSideBar = ({ paddingBottom = '0' }) => {
  const {playlist: songs} = usePlayerStore();

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
                          alt={`${song.songName} Thumbnail`}
                          width={45}
                          height={45}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-bold text-white text-[12px] truncate ">
                            {song.songName}
                          </p>
                          <p className="text-muted-foreground text-[12px] text-white truncate ">
                            Artist Name
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-400 group-hover:bg-[#595959]">
                      <div className="flex items-center text-[12px]">
                        <span></span>
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
