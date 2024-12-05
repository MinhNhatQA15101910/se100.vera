'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { toast } from 'react-toastify';

interface LikeButtonProps {
  songId: string;
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

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    //TODO: implement liking here and update the heart
    toast.success("Hello my love! <3♠")
    setIsLiked(!isLiked);
    router.refresh();
  };

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? '#22c55e' : '#ffffff'} size={25} />
    </button>
  );
};

export default LikeButton;
