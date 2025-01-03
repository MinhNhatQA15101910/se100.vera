'use client';

import React from 'react';


const Header = () => {

  return (
    <div className="flex flex-row justify-between w-[90%] items-center pt-2">
      <h2 className="text-2xl font-bold mb-4">
        Most <span className="text-pink-500">Played</span>
      </h2>
    </div>
  );
};

export default Header;
