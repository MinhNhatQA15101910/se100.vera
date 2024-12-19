import React from 'react';

import SongList from './_components/SongList';

const ManageSongs = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen h-full w-full'>
      <SongList />
    </div>
  );
};

export default ManageSongs;
