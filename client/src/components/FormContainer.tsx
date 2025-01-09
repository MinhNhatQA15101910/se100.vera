import React from "react";

import { cn } from "@/lib/utils";

interface IFormContainerProps {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const FormContainer: React.FC<IFormContainerProps> = ({
  children,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn(`flex flex-col items-center justify-center`, className)}>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default FormContainer;
