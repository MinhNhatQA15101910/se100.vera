'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { MdEdit } from 'react-icons/md';
import Modal from './Modal';
import AddUpdateGenresCard from './AddUpdateGenresCard';

interface UpdateButtonProps {
  genreId: number;
  genreName: string;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({
  genreId: genreId,
  genreName: genreName,
}) => {
  const [isAddGenreModalOpen, setIsAddGenreModalOpen] = useState(false);
  const router = useRouter();
  const { userDetails } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!userDetails?.id) {
      return;
    }
  }, [genreId]);

  return (
    <div>
      <button
        onClick={() => {
          setIsAddGenreModalOpen(true);
        }}
      >
        <MdEdit
          size="24"
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      </button>
      <Modal
        onChange={() => {
          setIsAddGenreModalOpen(false);
        }}
        isOpen={isAddGenreModalOpen}
        title="ADD A GENRE"
      >
        <AddUpdateGenresCard
          defaultGenreId={genreId}
          defaultGenreName={genreName}
        />
      </Modal>
    </div>
  );
};

export default UpdateButton;
