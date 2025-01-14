'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDeleteSongMutation } from '@/hooks/useSongMutation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const DeleteSongButton = ({ songId }: { songId: number }) => {
  const router = useRouter()
  const deleteSongMutation = useDeleteSongMutation();

  const handleDeleteSong = () => {
    const confirmValue = confirm('Do you really want to delete this song?');

    if (!confirmValue) return;

    deleteSongMutation.mutate(songId, {
      onSuccess: () => {
        toast.success('Song Deleted Succesfully!');
        router.refresh()
      },
      onError: () => {
        toast.error('Server went wrong, delete is not working!');
      },
    });
  };

  return (
    <button onClick={handleDeleteSong}>
      <FaTrash
        className="hover:text-general-pink-hover transition-colors duration-200"
        size={20}
      />
    </button>
  );
};

export default DeleteSongButton;
