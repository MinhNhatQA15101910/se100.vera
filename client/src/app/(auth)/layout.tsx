'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ILayoutProps {
  children: React.ReactNode;
}

const MotionDiv = motion.div

const basicVariants = {
  hidden: { opacity: 0, x: 100 },  
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },  
  exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },  
};

const layout: React.FC<ILayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen app-background">
      <AnimatePresence mode="wait" initial={false}>
        <MotionDiv
          key={pathname} 
          variants={basicVariants} 
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default layout;
