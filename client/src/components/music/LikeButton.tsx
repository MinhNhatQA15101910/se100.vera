'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

interface LikeButtonProps {
  songId: number;
  size?: number; // Optional size prop for flexibility
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, size = 20 }) => {
  const router = useRouter();
  const { userDetails } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!userDetails?.id) {
      return;
    }
  }, [songId]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    router.refresh();
  };

  return (
    <button onClick={handleLike}>
      {isLiked ? (
        <MdFavorite
          size={size} // Use the size prop here
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      ) : (
        <MdFavoriteBorder
          size={size} // Use the size prop here
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      )}
    </button>
  );
};

export default LikeButton;
