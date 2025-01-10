import React, { useState } from 'react';

interface StatusToggleButtonProps {
  id: number; // songId, albumId, or artistId
  type: 'song' | 'album' | 'artist'; // Loại id
  isActivated: boolean; // Trạng thái ban đầu
}

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({
  id,
  type,
  isActivated,
}) => {
  const [activated, setActivated] = useState(isActivated);

  const handleClick = () => {
    setActivated(!activated);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-[110px] px-4 py-2 text-white rounded-3xl transition-colors ${
        activated
          ? 'bg-pink-500 hover:bg-pink-600'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {activated ? 'Activated' : 'Deactivated'}
    </button>
  );
};

export default StatusToggleButton;
