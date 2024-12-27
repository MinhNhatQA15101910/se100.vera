'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

interface LikeButtonProps {
  songId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
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
          size={20}
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      ) : (
        <MdFavoriteBorder
          size={20}
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      )}
    </button>
  );
};

export default LikeButton;
