'use client';

import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Modal from './Modal';
import AlbumToAddModal from './AlbumToAddModal';

const AddToAlbumButton = ({ songId }: { songId: number }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleAddToAlbum = () => {
    setIsShowModal(true);
  };

  return (
    <>
      <button onClick={handleAddToAlbum}>
        <FaPlusCircle
          className="hover:text-general-pink-hover transition-colors duration-200"
          size={20}
        />
      </button>

      <Modal
        isOpen={isShowModal}
        onChange={() => {
          setIsShowModal(false);
        }}
        title="Choose Album To Add"
      >
        <AlbumToAddModal songId={songId} />
      </Modal>
    </>
  );
};

export default AddToAlbumButton;
