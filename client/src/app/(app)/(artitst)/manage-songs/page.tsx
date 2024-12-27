import React from 'react';

import SongList from './_components/SongList';
import SearchBar from '@/components/SearchBar';
import TableHeader from './_components/TableHeader';

const ManageSongs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen h-full w-full pt-10 space-y-4">
      <SearchBar />
      <TableHeader />
      <SongList />
    </div>
  );
};

export default ManageSongs;
