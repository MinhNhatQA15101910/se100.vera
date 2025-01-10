'use client';

import React, { useEffect } from 'react';

import { useUser } from '@/contexts/UserContext';
import { useLikeSongMutation } from '@/app/(app)/(artitst)/upload-song/_hooks/useSongMutation';
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
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();
  const likeSongMutation = useLikeSongMutation();

  const { data, isLoading } = useQuery({
    queryKey: ['is_fav_song', `${songId}`],
    queryFn: async () => await isFavoriteSong(songId),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!userDetails?.id) {
      return;
    }
  }, [songId]);

  const handleLike = async () => {
    likeSongMutation.mutate(userDetails?.id || -1, {
      onSuccess: () => {},
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <button onClick={handleLike}>
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
