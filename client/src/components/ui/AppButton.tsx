'use client';

import React from 'react';
import { Button } from './button';

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
    <Button
      variant={'default'}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
