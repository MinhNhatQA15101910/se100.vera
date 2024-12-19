'use client';

import { Search } from 'lucide-react';
import React from 'react';
import { Input } from './ui/Input';

const SearchBarBox = () => {
  return (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="pl-10 bg-zinc-900 border-none text-white placeholder:text-muted-foreground"
        placeholder="Search For Musics, Artists, ..."
      />
    </div>
  );
};

export default SearchBarBox;
