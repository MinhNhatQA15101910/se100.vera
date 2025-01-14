'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

const EditSongButton = ({ songId }: { songId: string | number }) => {
  const router = useRouter();

  const handleEditSong = () => {
    router.push(`/edit-song/${songId}`);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleEditSong();
      }}
    >
      <FaEdit
        className="hover:text-general-pink-hover transition-colors duration-200"
        size={20}
      />
    </button>
  );
};

export default EditSongButton;
