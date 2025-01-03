import React from 'react';
import MostPlayed from './_components/MostPlayed';
import Header from './_components/Header';
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <Header />
      <div className="flex h-full w-full justify-center">
        <MostPlayed />
      </div>
    </div>
  );
};

export default page;
