'use client';

import Link from 'next/link';
import Image from 'next/image';
import DynamicImage from '../custom/DynamicImage';

type AlbumCardProps = {
  image: string;
  title: string;
  artist: string;
};

const AlbumCard: React.FC<AlbumCardProps> = ({ image, title, artist }) => {
  return (
    <Link href="/album-detail">
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <div className="relative w-full aspect-square">
          <DynamicImage
            src={image}
            alt={title}
            className="object-cover rounded-md"
          />
        </div>
        <h3 className="text-white text-lg font-bold mt-3 text-nowrap">
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{artist}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
