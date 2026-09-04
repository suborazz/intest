"use client";

import { usePathname } from "next/navigation";

import { ThemeProvider_2 } from "@/x/30dbb267";

const THEMED_ROUTE_PREFIXES = [
  "/student",
  "/instructor",
  "/instructors",
  "/institute",
  "/recruit",
  "/super-admin",
  "/immersion/",
  "/docs",
];

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isThemedRoute = THEMED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  return (
    <ThemeProvider_2
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      forcedTheme={isThemedRoute ? undefined : "light"}
    >
      {children}
    </ThemeProvider_2>
  );
}
