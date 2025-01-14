'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDeleteAlbumMutation } from '@/hooks/useAlbumMutation';

const DeleteAlbumButton = ({ albumId }: { albumId: number }) => {
  const router = useRouter();
  const deleteAlbumMutation = useDeleteAlbumMutation(); // Hook để xoá album

  const handleDeleteAlbum = () => {
    const confirmValue = confirm('Do you really want to delete this album?');

    if (!confirmValue) return;

    deleteAlbumMutation.mutate(albumId, {
      onSuccess: () => {
        toast.success('Album Deleted Successfully!');
        router.refresh(); // Tải lại trang hoặc điều hướng lại nếu cần
      },
      onError: () => {
        toast.error('Server went wrong, delete is not working!');
      },
    });
  };

  return (
    <button onClick={handleDeleteAlbum}>
      <FaTrash
        className="hover:text-general-pink-hover transition-colors duration-200"
        size={20}
      />
    </button>
  );
};

export default DeleteAlbumButton;
