import React from 'react';

import Image from 'next/image';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';

import LikeButton from '@/components/music/LikeButton';

import { trendingSongs } from './dummyTrendingSongs';
import EditSongButton from './EditSongButton';
import DeleteSongButton from './DeleteSongButton';

const SongList = () => {
  return (
    <div className="flex items-center justify-center text-general-white w-[90%] manage-songs-table">
      <Table>
        <TableHeader>
          <TableRow className="border-none pointer-events-none">
            <TableHead className="w-[100px] text-white">No</TableHead>
            <TableHead className="w-[100px] text-white">Song Name</TableHead>
            <TableHead className="hidden md:table-cell text-white text-right">
              Release Date
            </TableHead>
            <TableHead className="hidden md:table-cell text-white text-right">
              Total View
            </TableHead>
            <TableHead className="hidden lg:table-cell text-white text-right">
              Time
            </TableHead>
            <TableHead className="text-white text-center">Manage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trendingSongs.map((song) => (
            <TableRow
              key={song.rank}
              className="border-none cursor-pointer hover:bg-transparent group"
            >
              <TableCell className="font-medium">#{song.rank}</TableCell>
              <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                <div className="flex items-center space-x-4">
                  <Image
                    src={song.image}
                    alt={song.title}
                    width={55}
                    height={55}
                    className=" object-cover"
                  />
                  <div>
                    <div className="font-semibold text-nowrap">
                      {song.title}
                    </div>
                    <div className="text-sm text-gray-400 text-nowrap">
                      {song.artist}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400  group-hover:bg-[#595959] text-right">
                {song.releaseDate}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate text-right">
                {song.totalView}
              </TableCell>
              <TableCell className="text-right bg-[#2E2E2E] group-hover:bg-[#595959]">
                <div className="flex items-center justify-end space-x-2">
                  <LikeButton songId={'KEKEKEEKE'} />
                  <span className="text-gray-400 mx-auto">{song.duration}</span>
                </div>
              </TableCell>
              <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959] space-x-2">
                <EditSongButton songId={song.id} />
                <DeleteSongButton songId={song.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongList;
