'use client';

import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

type FavouriteProps = {
  songId: string;
};

const FavouriteButton: React.FC<FavouriteProps> = ({ songId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    console.log(`Song ID: ${songId}, Favorite: ${!isFavorite}`);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-general-pink text-2xl hover:text-white focus:outline-none"
      aria-label={`Mark song ${isFavorite ? 'as not favorite' : 'as favorite'}`}
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  );
};

export default FavouriteButton;
