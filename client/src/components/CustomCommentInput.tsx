'use client';

import { useState } from 'react';
import { Input } from './ui/Input';
import Image from 'next/image';
import { Button } from './ui/button';

interface ICommentInputProps {
  artistImage?: string;
  onCommentSubmit: (content: string) => void;
}

const CustomCommentInput: React.FC<ICommentInputProps> = ({
  artistImage,
  onCommentSubmit,
}) => {

  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      onCommentSubmit?.(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-slate-900 text-white placeholder:text-muted-foreground rounded-lg p-2 w-auto">
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="ml-4 mr-4 px-4 py-1 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700"
        >
          Comment
        </Button>
      </div>
    </form>
  );
};

export default CustomCommentInput;
