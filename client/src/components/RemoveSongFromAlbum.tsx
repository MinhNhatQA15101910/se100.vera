'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { Edit2Icon } from 'lucide-react';
import { useRemoveSongFromAlbumMutation } from '@/hooks/useAlbumMutation';
import { IoRemoveCircle } from 'react-icons/io5';

interface RemoveSongFromAlbumProps {
  songId: number;
  albumId: number;
  size?: number;
}

const RemoveSongFromAlbum: React.FC<RemoveSongFromAlbumProps> = ({
  songId,
  albumId,
  size = 20,
}) => {
  const removeSongFromAlbumMutation = useRemoveSongFromAlbumMutation();

  const handleEdit = async () => {
    removeSongFromAlbumMutation.mutate(
      {
        songId: songId,
        albumId: albumId,
      },
      {
        onSuccess: () => {
          toast.success('Song removed from album succesfully');
        },
        onError: () => {
          toast.error('Something went wrong with Server!');
        },
      }
    );
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleEdit();
      }}
      className="relative"
    >
      <IoRemoveCircle size={size} className='text-general-pink hover:text-general-blue transition-colors duration-200'/>
    </button>
  );
};

export default RemoveSongFromAlbum;
