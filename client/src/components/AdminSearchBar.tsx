'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/Input';
import UserDropDown from './UserDropDown';
import NotificationButton from './NotificationButton';

interface AdminSearchSongBarProps {
  onSearchChange: (value: string) => void;
}

const AdminSearchSongBar: React.FC<AdminSearchSongBarProps> = ({
  onSearchChange,
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    onSearchChange(value);
  };

  return (
    <div className="flex flex-row items-center justify-between bg-[url('/music-landing-bg.webp')] bg-cover bg-center w-[95%] rounded-lg p-2">
      <div className="relative flex-1 pr-10">
        <Input
          className={cn(
            'w-full bg-zinc-900/90 text-sm text-white placeholder:text-muted-foreground rounded-lg'
          )}
          placeholder="🔍 Search For Musics, Artists..."
          type="search"
          value={searchKeyword}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <UserDropDown />
      <NotificationButton />
    </div>
  );
};

export default AdminSearchSongBar;
