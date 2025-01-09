'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { AppButton } from '@/components/ui/AppButton';
import { FaPlus } from 'react-icons/fa';

const AdminHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between w-[90%] items-center pt-2">
      <h2 className="text-2xl font-bold mb-4">
        Manage <span className="text-pink-500">Songs</span>
      </h2>
    </div>
  );
};

export default AdminHeader;
