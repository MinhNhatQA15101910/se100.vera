import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DynamicImage from '../custom/DynamicImage';

interface ArtistCardProps {
  imageUrl: string;
  name: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ imageUrl, name }) => {
  return (
    <Link href="/artist-detail">
      <div className="artist-card flex flex-col items-center text-center ">
        <div className="relative rounded-full overflow-hidden shadow-lg mb-4">
          <DynamicImage src="https://via.placeholder.com/200" alt={name} />
        </div>
        <span className="text-white text-md font-medium">{name}</span>
      </div>
    </Link>
  );
};

export default ArtistCard;
