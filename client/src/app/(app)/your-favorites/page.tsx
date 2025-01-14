import React from 'react';
import FavoriteSongs from './_components/FavoriteSongs';

const YourFavoritesPage = () => {
  return (
    <div className="flex flex-col pt-10 h-screen items-center">
      <FavoriteSongs />
    </div>
  );
};

export default YourFavoritesPage;
