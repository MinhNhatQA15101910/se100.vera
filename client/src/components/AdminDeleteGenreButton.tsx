'use client';

import { useDeleteGenreMutation } from '@/hooks/useGenreMutation';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

interface DeleteButtonProps {
  genreId: number;
  genreName: string;
}

const AdminDeleteGenreButton: React.FC<DeleteButtonProps> = ({
  genreId,
  genreName,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const deleteGenreMutation = useDeleteGenreMutation();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the genre "${genreName}"?`
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteGenreMutation.mutateAsync(genreId);
      alert(`Genre "${genreName}" has been deleted successfully.`);
    } catch (error) {
      console.error('Error deleting genre:', error);
      alert('Failed to delete genre. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
    >
      <MdDelete size="24" />
      {isDeleting && <span className="ml-2 text-sm">Deleting...</span>}
    </button>
  );
};

export default AdminDeleteGenreButton;
