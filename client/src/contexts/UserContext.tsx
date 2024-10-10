"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IUserContext {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  login: (token: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  const login = (token: string | null) => {
    localStorage.setItem("authToken", token || "");
    setToken(token);
    setIsAuthenticated(true);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  const value = { login, logout, token, setToken, isAuthenticated };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
