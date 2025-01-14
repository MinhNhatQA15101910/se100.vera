'use client';

import Link from 'next/link';
import DynamicImage from '../custom/DynamicImage';
import { Album } from '@/types/global';

type AlbumCardProps = {
  albumCard: Album;
  isEditible?: boolean;
};

const AlbumCard: React.FC<AlbumCardProps> = ({
  albumCard,
}) => {

  console.log("adkfalkfjdlkafjlkadsjfkladjflkdasj", albumCard)

  return (
    <Link href={`/album-detail/${albumCard.id}`}>
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <div className="relative w-full aspect-square">
          <DynamicImage
            src={albumCard.photoUrl || ''}
            alt={albumCard.albumName || ''}
            className="object-cover rounded-md"
          />
        </div>
        <h3 className="text-white text-lg font-bold mt-3 text-nowrap truncate">
          {albumCard.albumName || ''}
        </h3>
        <p className="text-gray-400 text-sm">
          By {albumCard.publisher.artistName || ''}
        </p>
      </div>
    </Link>
  );
};

export default AlbumCard;
