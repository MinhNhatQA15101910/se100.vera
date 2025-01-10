'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { MdDelete } from 'react-icons/md';

interface UpdateButtonProps {
  genreId: number;
  genreName: String;
}

const DeleteButton: React.FC<UpdateButtonProps> = ({ genreId, genreName }) => {
  const router = useRouter();
  const { userDetails } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!userDetails?.id) {
      return;
    }
  }, [genreId]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    router.refresh();
  };

  return (
    <button onClick={handleLike}>
      <MdDelete
        size="24"
        className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
      />
    </button>
  );
};

export default DeleteButton;
