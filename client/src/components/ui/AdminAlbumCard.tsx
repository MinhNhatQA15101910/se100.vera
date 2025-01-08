'use client';

import React from 'react';
import DynamicImage from '../custom/DynamicImage';
import { Album } from '@/types/global';

type AdminAlbumCardProps = {
  albumCard: Album;
};

const AdminAlbumCard: React.FC<AdminAlbumCardProps> = ({ albumCard }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm('Do you want to delete this album?');
    if (confirmDelete) {
    }
  };

  return (
    <div
      className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition"
      onClick={handleDelete}
    >
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
  );
};

export default AdminAlbumCard;
