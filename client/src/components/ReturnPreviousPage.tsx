"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ReturnPreviousPage = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };

  return (
    <button
      onClick={handleReturn}
      className="mt-4 text-blue-600 hover:text-blue-800 underline cursor-pointer"
    >
      Return to Previous Page
    </button>
  );
};

export default ReturnPreviousPage;
