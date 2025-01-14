'use client';

import React, { useState } from 'react';
import { useToggleLockArtistMutation } from '@/app/(app)/(artitst)/upload-song/_hooks/useUserMutation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ArtistStatusToggleButtonProps {
  artistId: number;
  initialState: string;
}

const ArtistStatusToggleButton: React.FC<ArtistStatusToggleButtonProps> = ({
  artistId,
  initialState,
}) => {
  const validStates = ['Inactive', 'Active'] as const;

  const normalizeState = (state: string): 'Inactive' | 'Active' => {
    return validStates.includes(state as any)
      ? (state as 'Inactive' | 'Active')
      : 'Inactive';
  };

  const [state, setState] = useState<'Inactive' | 'Active'>(
    normalizeState(initialState)
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleLockMutation = useToggleLockArtistMutation();

  const handleConfirmToggle = async () => {
    try {
      setIsProcessing(true);
      const newState = state === 'Active' ? 'Inactive' : 'Active';
      await toggleLockMutation.mutateAsync(artistId);
      setState(newState);
    } catch (error) {
      console.error(`Failed to toggle artist state:`, error);
    } finally {
      setIsProcessing(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsDialogOpen(true)}
        className={`w-[140px] px-4 py-2 rounded-3xl text-white transition-colors duration-200 ${
          state === 'Active'
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-red-500 hover:bg-red-600'
        } ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : state}
      </button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-general-theme border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-general-pink-hover">
              {`Confirm ${state === 'Active' ? 'Deactivation' : 'Activation'}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{' '}
              {state === 'Active' ? 'deactivate' : 'activate'} this artist? This
              action can be reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="mr-4 px-4 py-2 rounded-lg bg-transparent border-general-pink-border text-general-pink 
                hover:text-general-white hover:border-transparent hover:bg-general-pink-hover"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-general-pink rounded-lg hover:bg-general-pink-hover"
              onClick={handleConfirmToggle}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArtistStatusToggleButton;
