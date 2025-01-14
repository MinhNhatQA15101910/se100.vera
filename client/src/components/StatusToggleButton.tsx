
import { useApproveAlbumMutation, useRejectAlbumMutation } from '@/hooks/useAlbumMutation';
import { useApproveSongMutation, useRejectSongMutation } from '@/hooks/useSongMutation';
import React, { useState } from 'react';

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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý API

  // Hook mutation song
  const approveSongMutation = useApproveSongMutation();
  const rejectSongMutation = useRejectSongMutation();

  // Hook mutation album
  const approveAlbumMutation = useApproveAlbumMutation();
  const rejectAlbumMutation = useRejectAlbumMutation();

  // Xử lý thay đổi trạng thái (approve/reject)
  const handleStateChange = async (newState: 'Approved' | 'Rejected') => {
    try {
      setIsProcessing(true);

      if (type === 'song') {
        // Nếu type là song, gọi mutation cho song
        if (newState === 'Approved') {
          await approveSongMutation.mutateAsync(id);
        } else if (newState === 'Rejected') {
          await rejectSongMutation.mutateAsync(id);
        }
      } else if (type === 'album') {
        // Nếu type là album, gọi mutation cho album
        if (newState === 'Approved') {
          await approveAlbumMutation.mutateAsync(id);
        } else if (newState === 'Rejected') {
          await rejectAlbumMutation.mutateAsync(id);
        }
      }

      setState(newState); // Cập nhật trạng thái UI
    } catch (error) {
      console.error(`Failed to ${newState.toLowerCase()} the ${type}:`, error);
    } finally {
      setIsProcessing(false); // Kết thúc trạng thái xử lý
      setIsDropdownVisible(false);
    }
  };

  // Chuyển trạng thái giữa Approved và Rejected
  const toggleState = async () => {
    try {
      const newState = state === 'Approved' ? 'Rejected' : 'Approved';
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

      setState(newState);
    } catch (error) {
      console.error(`Failed to toggle the ${type} state:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative inline-block">
      {state === 'Pending' ? (
        <>
          <button
            onClick={() => setIsDropdownVisible((prev) => !prev)}
            className={`w-[140px] px-4 py-2 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600 ${isProcessing ? 'cursor-not-allowed opacity-50' : ''
              }`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pending'}
          </button>
          {isDropdownVisible && (
            <div className="absolute flex-col top-full mt-2 bg-[#181818] w-[140px] rounded-md shadow-lg z-50 items-center justify-center">
              <button
                onClick={() => handleStateChange('Approved')}
                className="block px-4 py-2 text-white hover:bg-general-pink w-full text-center"
              >
                Approved
              </button>
              <button
                onClick={() => handleStateChange('Rejected')}
                className="block px-4 py-2 text-white hover:bg-general-pink w-full text-center"
              >
                Rejected
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={toggleState}
          className={`w-[140px] px-4 py-2 rounded-3xl text-white ${state === 'Approved'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
            } ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : state}
        </button>
      )}
    </div>
  );
};

export default StatusToggleButton;
