'use client';

import React, { useState } from 'react';
import AdminHeader from './_components/AdminHeader';
import AdminSongList from './_components/AdminSongList';
import AdminSearchSongBar from '@/components/AdminSearchBar';

const ManageSongs = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full pt-10 space-y-4">
      <AdminSearchSongBar onSearchChange={handleSearchChange} />
      <AdminHeader />
      <AdminSongList searchKeyword={searchKeyword} />
    </div>
  );
};

export default ManageSongs;
