import SearchBar from '@/components/SearchBar';
import React from 'react';
import TableHeader from './_components/TableHeader';
import FavoriteSongs from './_components/FavoriteSongs';

const YourFavoritesPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <SearchBar />
      <TableHeader />
      <div className="flex h-full w-full justify-center">
        <FavoriteSongs />
      </div>
    </div>
  );
};

export default YourFavoritesPage;
