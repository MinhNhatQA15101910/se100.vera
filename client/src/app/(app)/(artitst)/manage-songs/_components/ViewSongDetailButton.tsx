'use client';

import React from 'react';
import { FaAlignJustify } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ViewSongDetailButton = ({ songId }: { songId: number }) => {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push(`/song-detail/${songId}`);
  };

  return (
    <button onClick={handleViewDetail}>
      <FaAlignJustify
        className="hover:text-general-pink-hover transition-colors duration-200"
        size={20}
      />
    </button>
  );
};

export default ViewSongDetailButton;
