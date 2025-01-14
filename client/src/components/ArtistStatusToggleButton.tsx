'use client';

import React, { useState } from 'react';
import { useToggleLockArtistMutation } from '@/app/(app)/(artitst)/upload-song/_hooks/useUserMutation';

interface ArtistStatusToggleButtonProps {
  artistId: number;
  initialState: string;
}

const ArtistStatusToggleButton: React.FC<ArtistStatusToggleButtonProps> = ({
  artistId,
  initialState,
}) => {
  console.log('Status:', { initialState });
  const validStates = ['Inactive', 'Active'] as const;
  const normalizeState = (state: string): 'Inactive' | 'Active' => {
    if (validStates.includes(state as any)) {
      return state as 'Inactive' | 'Active';
    }
    return 'Inactive';
  };
  const [state, setState] = useState<'Inactive' | 'Active'>(
    normalizeState(initialState)
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const toggleLockMutation = useToggleLockArtistMutation(); // Mutation for activating artist

  const toggleState = async () => {
    try {
      setIsProcessing(true);
      const newState = state === 'Active' ? 'Inactive' : 'Active';
      await toggleLockMutation.mutateAsync(artistId);

      setState(newState);
    } catch (error) {
      console.error(`Failed to toggle artist state:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={toggleState}
      className={`w-[140px] px-4 py-2 rounded-3xl text-white transition-colors duration-200 ${
        state === 'Active'
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-red-500 hover:bg-red-600'
      } ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={isProcessing}
    >
      {isProcessing ? 'Processing...' : state}
    </button>
  );
};

export default ArtistStatusToggleButton;
