import React from 'react';
import MusicLanding from './_components/MusicLanding';
import MusicCards from './_components/MusicCards';
import TrendingSongs from './_components/TrendingSongs';
import MetaData from './_components/MetaData';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-screen space-y-4">
      <MusicLanding />
      <MusicCards />
      <TrendingSongs />
      <MetaData />
    </div>
  );
};

export default page;
