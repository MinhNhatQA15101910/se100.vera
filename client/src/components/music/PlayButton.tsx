'use client';

import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { AppButton } from '../ui/AppButton';

const PlayButton = () => {
  return (
    <AppButton className="transition opacity-0 rounded-full flex items-center bg-general-pink p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="text-black" />
    </AppButton>
  );
};
export default PlayButton;
