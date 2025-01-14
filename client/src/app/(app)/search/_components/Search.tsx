'use client';

import React, { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';

const Search = ({ setKeyword }: { setKeyword: (keyword: string) => void }) => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useQueryState('keyword', {
    defaultValue: searchParams.get('keyword') || '',
  });

  useEffect(() => {
    setKeyword(query);
  }, [query, setKeyword]);

  return (
    <Input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      className={cn(
        'w-full bg-zinc-900/90 text-sm text-white placeholder:text-muted-foreground rounded-lg'
      )}
    />
  );
};

export default Search;
