"use client"

import React from 'react';
import Link from 'next/link';
import DynamicImage from '../custom/DynamicImage';
import { User } from '@/types/global';

interface ArtistCardProps {
  artist: User;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Link href={`/artist-detail?userId=${artist.id}`}>
      <div className="artist-card flex flex-col items-center text-center">
        {/* Artist Image */}
        <div className="rounded-full overflow-hidden w-36 h-36 mb-4 shadow-lg">
          <DynamicImage
            src={artist.photoUrl || ""}
            alt={artist.artistName || ""}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white text-md font-medium">{artist.artistName}</span>
      </div>
    </Link>
  );
};

export default ArtistCard;
