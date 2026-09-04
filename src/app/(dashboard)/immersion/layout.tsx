"use client";

import { useRouter } from "next/navigation";
import React_2, { useEffect } from "react";
import * as React from "react";
import { useContext } from "react";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { LoaderIcon } from "lucide-react";
import { AuthContext } from "@/x/8789d6dc";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export default function ImmersionDashboardLayout({
  children,
}: {
  children: React_2.ReactNode;
}) {
    function useAuth() {
      return useContext(AuthContext);
    }

  const router = useRouter();
  const { user, isLoading } = useAuth();

  const hasProfile = !!user?.immersionParticipantProfile;

  useEffect(() => {
    if (!isLoading && !hasProfile) {
      router.replace("/immersion/registration");
    }
  }, [hasProfile, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
        <Spinner className="text-primary h-8 w-8" />
        <p className="text-muted-foreground text-sm font-medium">
          Loading portal context...
        </p>
      </div>
    );
  }

  if (!hasProfile) {
        return null;
  }

  return <>{children}</>;
}
