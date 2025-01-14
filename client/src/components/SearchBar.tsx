import React from 'react';
import SearchBarBox from './SearchBarBox';
import UserDropDown from './UserDropDown';
import NotificationButton from './NotificationButton';

const SearchBar = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-[url('/music-landing-bg.webp')] bg-cover bg-center w-[95%] rounded-lg p-2">
      <SearchBarBox />
      <UserDropDown />
      <NotificationButton />
    </div>
  );
};

export default SearchBar;
