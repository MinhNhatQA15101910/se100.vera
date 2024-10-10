"use client";

import React from "react";

import { useUser } from "@/contexts/UserContext";

const page = () => {
  const { logout } = useUser();
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen app-background">
      <button className="bg-red-400" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default page;
