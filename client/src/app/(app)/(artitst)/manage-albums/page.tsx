import React from 'react';

import SearchBar from '@/components/SearchBar';
import AlbumHeader from './_components/AlbumHeader';
import AlbumList from './_components/AlbumList';

const ManageSongs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full pt-10 space-y-4">
      <SearchBar />
      <AlbumHeader />
      <AlbumList />
    </div>
  );
};

export default ManageSongs;
