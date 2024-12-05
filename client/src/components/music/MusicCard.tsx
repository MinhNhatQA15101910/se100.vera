'use client';

import React from 'react';
import Image from 'next/image';
import { AppButton } from '../ui/AppButton';
import { FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface MusicCardProps {
  title: string;
  artist: string;
  image: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ title, artist, image }) => {
  return (
    <div className="group border border-zinc-100/10 hover:bg-zinc-100/10 rounded-md hover:cursor-pointer transition-colors duration-400 relative">
      <div className="p-4">
        <div className="aspect-square relative mb-3 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={`${title} by ${artist}`}
            fill
            width={0}
            height={0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="space-y-1 min-w-0 mr-2">
            <h3 className="font-semibold text-sm text-white truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-400 truncate">{artist}</p>
          </div>
          <AppButton
            onClick={() => {
              toast.success('Play con cac a ?');
            }}
            className="transition opacity-0 rounded-full flex items-center bg-general-pink p-3 drop-shadow-md group-hover:opacity-100 hover:scale-110 hover:bg-general-pink-hover flex-shrink-0"
          >
            <FaPlay className="text-black" size={15} />
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
