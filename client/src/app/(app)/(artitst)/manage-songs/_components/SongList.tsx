'use client';

import React, { useEffect } from 'react';

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';

import LikeButton from '@/components/music/LikeButton';

import EditSongButton from './EditSongButton';
import DeleteSongButton from './DeleteSongButton';
import AddToAlbumButton from '@/components/AddToAlbumButton';

import { getArtistSongsByArtistId } from '@/actions/song-actions';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from '@/components/custom/DynamicImage';
import usePlayerStore from '@/stores/player-store';

const SongList = () => {
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();
  const { setActiveTrack, setPlaylist } = usePlayerStore();
  const { data, isLoading } = useQuery({
    queryKey: ['mysongs'],
    queryFn: async () => await getArtistSongsByArtistId(userDetails?.id || -1),
  });

  useEffect(() => {
    setPlaylist(data?.songs || []);
    setLoadingState(isLoading);
  }, [isLoading, data]);

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
          {data?.songs.map((song, index) => (
            <TableRow
              key={index}
              className="border-none cursor-pointer hover:bg-transparent group"
              onClick={() => setActiveTrack(song)}
            >
              <TableCell className="font-medium">#{index + 1}</TableCell>
              <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                <div className="flex items-center space-x-4">
                  <DynamicImage
                    alt="Artist Image"
                    src={
                      song.photoUrl ||
                      'https://picsum.photos/400/400?random=42'
                    }
                    className="w-14 h-14 flex items-center"
                  />
                  <div>
                    <div className="font-semibold text-nowrap">
                      {song.songName}
                    </div>
                    <div className="text-sm text-gray-400 text-nowrap">
                      {song.publisherName}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden bg-[#2E2E2E] md:table-cell text-gray-400  group-hover:bg-[#595959] text-right">
                {song.createdAt.slice(0, 10)}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate text-right">
                {song.totalListeningHours}
              </TableCell>
              <TableCell className="text-right bg-[#2E2E2E] group-hover:bg-[#595959]">
                <div className="flex items-center justify-end space-x-2">
                  <LikeButton songId={1} />
                  <span className="text-gray-400 mx-auto">
                    {song.duration.slice(-5)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center bg-[#2E2E2E] group-hover:bg-[#595959] space-x-2">
                <EditSongButton songId={song.id} />
                <DeleteSongButton songId={song.id} />
                <AddToAlbumButton songId={song.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongList;
