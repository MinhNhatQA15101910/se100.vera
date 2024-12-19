'use client';

import React from 'react';
import { FaEdit } from 'react-icons/fa';

const EditSongButton = ({ songId }: { songId: string | number }) => {
  const handleEditSong = () => {};

  return (
    <button onClick={handleEditSong}>
      <FaEdit
        className="hover:text-general-pink-hover transition-colors duration-200"
        size={20}
      />
    </button>
  );
};

export default EditSongButton;
