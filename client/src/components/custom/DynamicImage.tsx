'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IDynamicImageProps {
  src: string;
  alt: string;
  className?: string;
}

const DynamicImage: React.FC<IDynamicImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <div
      className={cn(
        'aspect-square relative rounded-md overflow-hidden',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={1}
        height={1}
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
};

export default DynamicImage;
