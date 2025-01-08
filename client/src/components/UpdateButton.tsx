'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { MdEdit } from 'react-icons/md';

interface UpdateButtonProps {
  genreId: number;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ genreId: songId }) => {
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
      <MdEdit
        size="24"
        className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
      />
    </button>
  );
};

export default UpdateButton;
