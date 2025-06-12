"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Profile {
  id: string;
  username: string;
  email: string;
  fullname: string;
  role: string;
  avatar?: string;
}

interface AuthContextProps {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  refreshProfile: () => void;
  refreshCount: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const refreshProfile = () => setRefreshCount((prev) => prev + 1);

  return (
    <AuthContext.Provider value={{ profile, setProfile, refreshProfile, refreshCount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}