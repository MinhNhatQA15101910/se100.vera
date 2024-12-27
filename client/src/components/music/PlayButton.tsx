'use client';

import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { AppButton } from '../ui/AppButton';

interface IPLayButtonProps {
  onClick: () => void;
}

const PlayButton: React.FC<IPLayButtonProps> = ({onClick}) => {
  return (
    <AppButton
      onClick={onClick}
      className="transition opacity-0 rounded-full w-10 h-10 flex items-center justify-center bg-general-pink p-3 drop-shadow-md group-hover:opacity-100 hover:scale-110 hover:bg-general-pink-hover flex-shrink-0"
    >
      <FaPlay className="text-black" />
    </AppButton>
  );
};
export default PlayButton;
