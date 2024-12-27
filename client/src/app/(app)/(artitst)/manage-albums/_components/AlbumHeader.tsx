'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { AppButton } from '@/components/ui/AppButton';
import { FaPlus } from 'react-icons/fa';

const AlbumHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between w-[90%] items-center pt-2">
      <h2 className="text-2xl font-bold mb-4">
        Manage <span className="text-pink-500">Albums</span>
      </h2>
      <AppButton
        onClick={() => {
          router.push('/upload-album');
        }}
        className="flex flex-row items-center justify-between p-2  bg-general-blue rounded-lg hover:bg-general-blue-hover"
      >
        <FaPlus size={15} />
        <span>Upload album</span>
      </AppButton>
    </div>
  );
};

export default AlbumHeader;
