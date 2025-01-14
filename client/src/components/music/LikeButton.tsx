'use client';

import React, { useEffect } from 'react';
import { useLikeSongMutation } from '@/hooks/useSongMutation';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { isFavoriteSong } from '@/actions/song-actions';
import { useLoading } from '@/contexts/LoadingContext';

interface LikeButtonProps {
  songId: number;
  size?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, size = 20 }) => {
  const { setLoadingState } = useLoading();
  const likeSongMutation = useLikeSongMutation();

  const { data, isLoading } = useQuery({
    queryKey: ['fav_song', `${songId}`],
    queryFn: async () => await isFavoriteSong(songId),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  const handleLike = async () => {
    likeSongMutation.mutate(songId, {
      onSuccess: () => {
        toast.success(
          !data ? 'Song added to Favorites!' : 'Song removed from Favorites!'
        );
      },
      onError: () => {
        toast.error('Something went wrong with Server!');
      },
    });
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
      className="relative"
    >
      {data ? (
        <MdFavorite
          size={size}
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      ) : (
        <MdFavoriteBorder
          size={size}
          className="text-general-pink hover:text-general-pink-hover transition-colors duration-200"
        />
      )}
    </button>
  );
};

export default LikeButton;
