'use client';

import React from 'react';
import { Button } from './button';

interface IAppButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  asChild?: boolean;
}

export const AppButton: React.FC<IAppButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  asChild = false,
}) => {
  return (
    <Button
      asChild={asChild}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
