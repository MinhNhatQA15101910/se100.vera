'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/Input';

interface ISearchBarBoxProps {
  className?: string;
  searchKeyword?: string;
  onSearchChange?: (value: string) => void;
}

const SearchBarBox: React.FC<ISearchBarBoxProps> = ({ className, searchKeyword, onSearchChange }) => {
  return (
    <div className="relative flex-1 pr-10">
      <Input
        className={cn(
          'w-full bg-zinc-900/90 text-sm text-white placeholder:text-muted-foreground rounded-lg',
          className
        )}
        placeholder="🔍 Search For Musics, Artists..."
        type="search"
        value={searchKeyword}
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBarBox;
