'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

import { FaHeart } from 'react-icons/fa';
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
      <FaHeart
        size={25}
        className={`hover:text-general-pink-hover transition-colors duration-200 ${isLiked ? 'text-general-pink' : ''}`}
      />
    </button>
  );
};

export default LikeButton;
