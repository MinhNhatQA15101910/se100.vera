'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface IAppButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

export const AppButton: React.FC<IAppButtonProps> = ({
  children,
  className,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={cn('', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
