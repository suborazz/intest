"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftToLine } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { AuthDataHook } from "@/x/0da0a87b";
import { sidebarData } from "@/x/ad01f202";
import { useAuth } from "@/x/8789d6dc";
import { NavGroup } from "@/x/80a83887";
import { cn, deleteCookie } from "@/x/a85a9c0c";

import { Separator } from "@/x/406e493f";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/x/959524ce";

import { SidebarItems, type TMenu } from "@/x/cdd86013";
import { NavUser } from "@/x/5e8e43e2";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

function toMenu(items: NavGroup["items"], pathname: string): TMenu[] {
  return items.map((item) => {
    const url = "url" in item ? item.url : "";
    const hasMoreSpecificMatch = items.some((otherItem) => {
      const otherUrl = "url" in otherItem ? otherItem.url : "";
      return (
        otherUrl !== url &&
        otherUrl.startsWith(url + "/") &&
        (pathname === otherUrl || pathname.startsWith(otherUrl + "/"))
      );
    });

    return {
      href: url.replace(/^\//, ""),
      label: item.title,
      active:
        (pathname === url || pathname.startsWith(url + "/")) &&
        !hasMoreSpecificMatch,
      icon: item.icon
        ? (LucideIcons[item.icon as keyof typeof LucideIcons] as TMenu["icon"])
        : undefined,
    };
  });
}

export function AppSidebar(props: AppSidebarProps) {
  const { user, role, isLoading } = useAuth();
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: logout } = AuthDataHook.useLogout();

  const userRole = role?.toUpperCase();
  const showSkeleton = isLoading || !userRole;
  const navGroups = showSkeleton
    ? []
    : (sidebarData.navGroups as Record<string, NavGroup[]>)[userRole] || [];

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    deleteCookie("access_token");
    deleteCookie("user_role");
    queryClient.clear();
    logout();
    router.replace("/login");
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r-0! z-30 print:hidden"
      {...props}
    >
      {}
      <SidebarHeader className="flex items-center justify-center border-none px-2 py-2.5 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
        <div className="flex h-14 w-full items-center justify-center rounded-lg border border-white/10 bg-white/95 p-5 pr-2 shadow-sm transition-all duration-300 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:rounded-md group-data-[collapsible=icon]:bg-white group-data-[collapsible=icon]:p-1">
          <Image
            src="/logo.png"
            alt="Logo"
            width={110}
            height={30}
            className="object-contain transition-all duration-300 group-data-[collapsible=icon]:hidden"
            priority
          />
          <div className="hidden h-7 w-7 items-center justify-start overflow-hidden rounded-sm group-data-[collapsible=icon]:flex">
            <Image
              src="/logo.png"
              alt="Logo"
              width={78}
              height={28}
              className="max-w-none origin-left scale-[1.3] object-contain object-left"
              priority
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {showSkeleton
          ? [1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2 px-4 py-2">
                <div className="bg-primary/5 h-8 w-full animate-pulse rounded-lg" />
              </div>
            ))
          : navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                <SidebarItems
                  title={group.title}
                  menu={toMenu(group.items, pathname)}
                />
              </div>
            ))}
      </SidebarContent>

      <SidebarFooter className="mb-1 px-0">
        <div className="space-y-2 px-2">
          <NavUser
            user={{ name: user?.name, email: user?.email }}
            onSignOut={handleSignOut}
          />
          <SidebarMenu className="hidden md:flex">
            <SidebarMenuItem className="-translate-x-1.5 pl-2">
              <SidebarMenuButton tooltip={"Collapse"} onClick={toggleSidebar}>
                <ArrowLeftToLine
                  className={cn(
                    "shrink-0 transition-transform duration-300 ease-in-out",
                    "size-6 ",
                  )}
                  style={{
                    transform: !open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                <span>Collapse</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
