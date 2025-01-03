'use client';

import Link from 'next/link';
import Image from 'next/image';

type PlaylistCardProps = {
  image: string;
  title: string;
  songCount: number;
  totalDuration: string;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  image,
  title,
  songCount,
  totalDuration,
}) => {
  return (
    <Link href="/album-detail">
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          className="w-full rounded-md"
        />
        <h3 className="text-white text-lg font-bold mt-3">{title}</h3>
        <p className="text-gray-400 text-sm">
          {songCount} songs • {totalDuration}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
