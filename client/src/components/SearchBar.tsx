'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import SearchBarBox from './SearchBarBox';
import UserDropDown from './UserDropDown';
import NotificationButton from './NotificationButton';

const SearchBar = () => {
  const { userDetails } = useUser();
  return (
    <div className="flex flex-row items-center justify-between bg-[url('/music-landing-bg.webp')] bg-cover bg-center w-[95%] rounded-lg p-2">
      <SearchBarBox />
      <UserDropDown />
      <NotificationButton userId={1} />
    </div>
  );
};

export default SearchBar;
