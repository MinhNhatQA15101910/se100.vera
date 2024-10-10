import Sidebar from "@/components/Sidebar";
import React from "react";

interface ILayoutProps {
  children: React.ReactNode
}

const layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row  h-screen app-background">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
