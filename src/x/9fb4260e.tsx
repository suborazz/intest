"use client";

import type React_2 from "react";

import { useAuth } from "@/x/8789d6dc";
import { cn } from "@/x/a85a9c0c";

import { SidebarTrigger } from "@/x/959524ce";

import { BreadcrumbNav } from "@/x/d2ebfaf0";

interface HeaderProps extends React_2.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
}

export function Header({ className, fixed = true, ...props }: HeaderProps) {
  useAuth();

  return (
    <header
      className={cn(
        "bg-background flex items-center justify-between px-1 pb-2 pt-4 md:pl-6",
        fixed && "sticky top-0 z-50",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5 md:gap-2">
        {}
        <SidebarTrigger
          className="bg-primary/10 text-primary hover:bg-primary/20 mr-0 flex h-8 w-8 items-center justify-center rounded-md transition-all md:hidden"
          aria-label="Open sidebar"
        />
        <BreadcrumbNav />
      </div>

      {}
    </header>
  );
}
