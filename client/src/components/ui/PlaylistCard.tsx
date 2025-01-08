'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Playlist } from '@/types/global';
import DynamicImage from '../custom/DynamicImage';

type PlaylistCardProps = {
  playlist: Playlist;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link href="/album-detail">
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <div className=" relative w-full aspect-square">
          <DynamicImage
            src={playlist.songs[0].songPhotoUrl || '/vera-icon.png'}
            alt={playlist.playlistName}
            className="object-cover rounded-md items-center flex"
          />
        </div>
        <h3 className="text-white text-lg font-bold mt-3">
          {playlist.playlistName}
        </h3>
        <p className="text-gray-400 text-sm">
          {playlist.songs.length} songs • {playlist.totalDuration}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
