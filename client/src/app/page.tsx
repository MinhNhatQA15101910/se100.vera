"use client"

import React from "react";

import { useUser } from "@/contexts/UserContext";

import Sidebar from "@/components/Sidebar";

const MainApp = () => {
  const { logout } = useUser();

  return (
    <div className="flex flex-row  h-full min-h-screen app-background">
      <Sidebar />
    </div>
  );
};

export default MainApp;
