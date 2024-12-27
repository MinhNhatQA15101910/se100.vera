'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import SearchBarBox from './SearchBarBox';
import UserDropDown from './UserDropDown';

const SearchBar = () => {
  const { userDetails } = useUser();
  return (
    <div className="flex flex-row items-center justify-between bg-[url('/music-landing-bg.webp')] bg-cover bg-center w-[90%] rounded-lg p-2">
      <SearchBarBox />
      <UserDropDown />
    </div>
  );
};

export default SearchBar;
