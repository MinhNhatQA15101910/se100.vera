'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Playlist } from '@/types/global';

type PlaylistCardProps = {
  playlist: Playlist;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link href="/album-detail">
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <Image
          src={playlist.songs[0].songPhotoUrl || "/vera-icon.png"}
          alt={playlist.playlistName}
          width={0}
          height={0}
          className="w-full rounded-md"
        />
        <h3 className="text-white text-lg font-bold mt-3">{playlist.playlistName}</h3>
        <p className="text-gray-400 text-sm">
          {playlist.songs.length} songs • {playlist.totalDuration}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
