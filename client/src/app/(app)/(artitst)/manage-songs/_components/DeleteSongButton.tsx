'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteSongButton = ({ songId }: { songId: string | number }) => {
  const handleDeleteSong = () => {};

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
