'use client';

import { useState } from 'react';
import { PiPlaylistBold } from 'react-icons/pi';
import Modal from '../Modal';
import ChoosePlaylistCard from './ChoosePlaylistCard';

type AddToPlaylistProps = {
  songId: string;
};

const AddToPlaylistButton: React.FC<AddToPlaylistProps> = ({ songId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="">
        <PiPlaylistBold
          className="text-general-pink hover:text-pink-600 focus:outline-none"
          size={24}
        />
      </button>

      {/* Modal for ChoosePlaylistCard */}
      <Modal
        isOpen={isModalOpen}
        onChange={setIsModalOpen}
        title="CHOOSE YOUR PLAYLIST"
        description=""
      >
        <ChoosePlaylistCard />
      </Modal>
    </>
  );
};

export default AddToPlaylistButton;
