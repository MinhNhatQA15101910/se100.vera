"use client";

import React, { ReactNode, useEffect } from "react";
import { Inter } from "next/font/google";

import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

import { UserProvider } from "@/contexts/UserContext";

interface IProtectedRoute {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/signup", "/verify-code", "/reset-password"];

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/login");
    } else if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <UserProvider>
        {/* Only apply ProtectedRoute to protect non-public routes */}
        <ProtectedRoute>{children}</ProtectedRoute>
      </UserProvider>
    </div>
  );
}
