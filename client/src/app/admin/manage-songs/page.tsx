import React from 'react';

import SearchBar from '@/components/SearchBar';
import AdminHeader from './_components/AdminHeader';
import AdminSongList from './_components/AdminSongList';

const ManageSongs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full pt-10 space-y-4">
      <SearchBar />
      <AdminHeader />
      <AdminSongList />
    </div>
  );
};

export default ManageSongs;
