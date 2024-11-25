import React from "react";

import AnimatedPage from "@/components/AnimatedPage";
interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen app-background">
      <AnimatedPage>{children}</AnimatedPage>
    </div>
  );
};

export default Layout;
