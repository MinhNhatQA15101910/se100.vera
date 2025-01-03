'use client';

import React from 'react';

const TableHeader = () => {
  return (
    <div className="flex flex-row justify-between w-[90%] items-center pt-2">
      <h2 className="text-2xl font-bold mb-4">
        Favorites <span className="text-pink-500">Songs</span>
      </h2>
    </div>
  );
};

export default TableHeader;
