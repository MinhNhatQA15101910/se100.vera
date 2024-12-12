'use client';

import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface IAppButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

export const AppButton: React.FC<IAppButtonProps> = ({
  children,
  className,
  onClick,
  type,
  variant,
  disabled,
}) => {
  return (
    <Button
      type={type}
      className={cn('', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
