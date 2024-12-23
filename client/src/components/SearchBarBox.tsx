'use client';

import React from 'react';
import { Input } from './ui/Input';

const SearchBarBox = () => {
  return (
    <div className="relative flex-1 pr-10">
      <Input
        className="w-full bg-zinc-900/90 text-sm text-white placeholder:text-muted-foreground rounded-lg"
        placeholder="🔍 Search For Musics, Artists..."
        type="search"
      />
    </div>
  );
};

export default SearchBarBox;
