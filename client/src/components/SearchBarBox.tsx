'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/Input';

interface ISearchBarBoxProps {
  className?: string;
  searchKeyword?: string;
  onSearchChange?: (value: string) => void;
}

const SearchBarBox: React.FC<ISearchBarBoxProps> = ({ className }) => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?keyword=${encodeURIComponent(searchKeyword || '')}`);
    }
  };

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
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBarBox;
