import type { Metadata } from "next";
import { cookies } from "next/headers";
import * as React from "react";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthProvider, AuthContext, useAuth } from "@/x/8789d6dc";
import { AuthDataHook } from "@/x/0da0a87b";
import { DashboardContent } from "@/x/1bbdc76f";
import { useLayoutContext, LayoutContextProvider, LayoutContext } from "@/x/72be5b4f";
import { SidebarFiltersProvider } from "@/x/d50b23c8";
import { Header } from "@/x/9fb4260e";
import { SidebarTrigger, useSidebar, Sidebar, SidebarMenuButton, SidebarProvider, SidebarContext } from "@/x/959524ce";
import { BreadcrumbNav } from "@/x/d2ebfaf0";
import { AppSidebar } from "@/x/ff39d6c6";
import { SidebarItems } from "@/x/cdd86013";
import { NavUser } from "@/x/5e8e43e2";
import { useIsMobile } from "@/x/455ba32a";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export const metadata: Metadata = {
  title: "International Institute of Internship™",
  description: "India International Internship Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar:state")?.value;
  const defaultOpen =
    sidebarState === undefined ? true : sidebarState === "true";
  const userRole = cookieStore.get("user_role")?.value;

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="to-primary relative h-svh overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800"
    >
      {}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
      {}
      <AuthProvider initialRole={userRole}>
        <AppSidebar />
        <SidebarInset className="bg-background z-10 h-full min-h-0 overflow-hidden md:my-2 md:ml-0 md:mr-2 md:rounded-2xl md:border md:shadow-sm">
          <Header />
          <LayoutContextProvider>
            <DashboardContent>{children}</DashboardContent>
          </LayoutContextProvider>
        </SidebarInset>
      </AuthProvider>
    </SidebarProvider>
  );
}
