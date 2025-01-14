
import { useApproveAlbumMutation, useRejectAlbumMutation } from '@/hooks/useAlbumMutation';
import { useApproveSongMutation, useRejectSongMutation } from '@/hooks/useSongMutation';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface StatusToggleButtonProps {
  id: number; // songId, albumId, or artistId
  type: 'song' | 'album' | 'artist'; // Loại id
  initialState: string; // Trạng thái ban đầu (dạng string)
}

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({
  id,
  type,
  initialState,
}) => {
  const validStates = ['Pending', 'Approved', 'Rejected'] as const;

  const normalizeState = (
    state: string
  ): 'Pending' | 'Approved' | 'Rejected' => {
    if (validStates.includes(state as any)) {
      return state as 'Pending' | 'Approved' | 'Rejected';
    }
    return 'Pending'; // Giá trị mặc định nếu không hợp lệ
  };

  const [state, setState] = useState<'Pending' | 'Approved' | 'Rejected'>(
    normalizeState(initialState)
  );
  const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý API
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newState, setNewState] = useState<'Approved' | 'Rejected' | null>(
    null
  );

  // Hook mutation song
  const approveSongMutation = useApproveSongMutation();
  const rejectSongMutation = useRejectSongMutation();

  // Hook mutation album
  const approveAlbumMutation = useApproveAlbumMutation();
  const rejectAlbumMutation = useRejectAlbumMutation();

  const handleStateChange = async () => {
    if (!newState) return;

    try {
      setIsProcessing(true);

      if (type === 'song') {
        if (newState === 'Approved') {
          await approveSongMutation.mutateAsync(id);
        } else if (newState === 'Rejected') {
          await rejectSongMutation.mutateAsync(id);
        }
      } else if (type === 'album') {
        if (newState === 'Approved') {
          await approveAlbumMutation.mutateAsync(id);
        } else if (newState === 'Rejected') {
          await rejectAlbumMutation.mutateAsync(id);
        }
      }

      setState(newState); // Update UI state
    } catch (error) {
      console.error(`Failed to ${newState.toLowerCase()} the ${type}:`, error);
    } finally {
      setIsProcessing(false);
      setIsDialogOpen(false);
      setNewState(null);
    }
  };

  const openDialog = (state: 'Approved' | 'Rejected') => {
    setNewState(state);
    setIsDialogOpen(true);
  };

  return (
    <div className="relative inline-block">
      {state === 'Pending' ? (
        <button
          onClick={() => openDialog('Approved')}
          className={`w-[140px] px-4 py-2 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600 ${
            isProcessing ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pending'}
        </button>
      ) : (
        <button
          onClick={() =>
            openDialog(state === 'Approved' ? 'Rejected' : 'Approved')
          }
          className={`w-[140px] px-4 py-2 rounded-3xl text-white ${
            state === 'Approved'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
            } ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : state}
        </button>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent className="bg-general-theme border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-general-pink-hover">
              Confirm State Change
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to {newState}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="mr-4 px-4 py-2 rounded-lg bg-transparent border-general-pink-border text-general-pink 
                hover:text-general-white hover:border-transparent hover:bg-general-pink-hover"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-general-pink rounded-lg hover:bg-general-pink-hover"
              onClick={handleStateChange}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StatusToggleButton;
