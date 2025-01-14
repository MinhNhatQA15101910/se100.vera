'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/Input';
import UserDropDown from './UserDropDown';
import NotificationButton from './NotificationButton';

interface AdminNoSearchBarProps {}

const AdminSearchSongBar: React.FC<AdminNoSearchBarProps> = ({}) => {
  const handleSearch = (value: string) => {};

  return (
    <div className="flex flex-row items-center justify-between bg-[url('/music-landing-bg.webp')] bg-cover bg-center w-full rounded-lg p-2">
      <div className="relative flex-1 pl-10">
        <h1 className="text-3xl lg:text-3xl font-bold leading-tight">
          Welcome back <span className="text-pink-600">Admin!</span>
        </h1>
      </div>
      <UserDropDown />
      <NotificationButton />
    </div>
  );
};

export default AdminSearchSongBar;
