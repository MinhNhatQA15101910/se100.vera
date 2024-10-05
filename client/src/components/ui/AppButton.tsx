"use client";

import React from "react";
import { IconClipboard } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface IAppButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
}

export const AppButton: React.FC<IAppButtonProps> = ({
  children,
  className,
  onClick,
  type,
}) => {
  return (
    <button type={type} className={cn("", className)} onClick={onClick}>
      {children}
    </button>
  );
};
