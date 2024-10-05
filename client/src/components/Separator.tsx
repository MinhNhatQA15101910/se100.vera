import React from "react";
import { cn } from "@/lib/utils";

interface ISeparator {
  title?: string;
  className?: string;
  sameBGColor?: string;
}

const Separator: React.FC<ISeparator> = ({ title, className, sameBGColor }) => {
  return (
    <div
      className={cn("flex mb-5 mt-5 items-center justify-center", className)}
    >
      <div
        className="relative items-center w-full"
        style={{
          backgroundColor: "var(--separator-color)",
          height: 1,
        }}
      />
      {title && (
        <div
          className="absolute z-2 pr-4 pl-4"
          style={{
            backgroundColor: sameBGColor || "",
          }}
        >
          <p
            className="text-white font-bold text-sm"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {title?.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Separator;
