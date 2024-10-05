"use client";

import { useState } from "react";

const SegmentedControl = () => {
  const [isSelected, setIsSelected] = useState<"Listener" | "Artist">(
    "Listener"
  );

  return (
    <div className=" flex flex-col items-start space-x-2">
      <span className="text-general-white mb-1 text-[13px]">Register as</span>
      <div className="relative flex items-center bg-gray-200 rounded-full p-1">
        <button
          type="button"
          onClick={() => setIsSelected("Listener")}
          className={`${
            isSelected === "Listener"
              ? "bg-general-pink text-white"
              : "text-gray-500"
          } px-4 py-2 rounded-full duration-300 ease-in-out transform transition-colors`}
        >
          Listener
        </button>
        <button
          type="button"
          onClick={() => setIsSelected("Artist")}
          className={`${
            isSelected === "Artist"
              ? "bg-general-pink text-white"
              : "text-gray-500"
          } px-4 py-2 rounded-full duration-300 ease-in-out transform transition-colors`}
        >
          Artist
        </button>
      </div>
    </div>
  );
};

export default SegmentedControl;
