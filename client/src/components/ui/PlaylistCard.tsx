'use client';

import Link from 'next/link';
import { Playlist } from '@/types/global';
import DynamicImage from '../custom/DynamicImage';

type PlaylistCardProps = {
  playlist: Playlist;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link href={`/playlist-detail/${playlist.id}`}>
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <div className="relative w-full aspect-square">
          <DynamicImage
            src={playlist.songs[0].songPhotoUrl || '/vera-icon.png'}
            alt={playlist.playlistName}
            className="object-cover rounded-md items-center flex"
          />
        </div>
        <h3 className="text-white text-lg font-bold mt-3 text-nowrap truncate">
          {playlist.playlistName}
        </h3>
        <p className="text-gray-400 text-sm">
          {playlist.songs.length} songs • {playlist.totalListeningHours}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
