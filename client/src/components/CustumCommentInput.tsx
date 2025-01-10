'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/Input';
import Image from 'next/image';

interface ICommentInputProps {
  className?: string;
  comment?: string;
  artistImage?: string;
  onCommentChange?: (value: string) => void;
  onCommentSubmit?: () => void;
}

const CustomCommentInput: React.FC<ICommentInputProps> = ({
  className,
  comment,
  artistImage,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <div
      className={cn(
        'flex items-center bg-zinc-900/90 text-sm text-white placeholder:text-muted-foreground rounded-lg p-2 w-auto',
        className
      )}
    >
      <Image
        src={artistImage || 'https://picsum.photos/400/400?random=4'}
        alt="Artist"
        width={48}
        height={48}
        className="rounded-full ml-4"
      />

      <div className="flex-1 ml-4">
        <Input
          className=" bg-transparent text-white placeholder:text-muted-foreground border-none outline-none"
          placeholder="Leave a comment..."
          type="text"
          value={comment}
          onChange={(e) => onCommentChange && onCommentChange(e.target.value)}
        />
      </div>

      <button
        onClick={onCommentSubmit}
        className="ml-4 mr-4 px-4 py-1 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700"
      >
        Comment
      </button>
    </div>
  );
};

export default CustomCommentInput;
