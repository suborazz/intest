"use client";

import { createContext, useContext } from "react";

import { AuthDataHook } from "@/x/0da0a87b";
import type { UserPublic, UserRole } from "@/x/c0183428";

interface AuthContextType {
  user: UserPublic | undefined;
  role: UserRole | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  role: undefined,
  isLoading: true,
  isAuthenticated: false,
});

export function AuthProvider({
  children,
  initialRole,
}: {
  children: React.ReactNode;
  initialRole?: string;
}) {
  const { data: profileData, isLoading } = AuthDataHook.useProfile();

  const user = profileData?.data?.user;
  const role = user?.role || (initialRole as UserRole);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
