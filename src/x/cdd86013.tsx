"use client";

import { type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/x/a85a9c0c";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/x/959524ce";

export type TMenu = {
  href: string;
  label: string;
  active: boolean;
  icon?: LucideIcon;
  submenus?: { href: string; label: string; active: boolean }[];
};

export function SidebarItems({
  title,
  menu,
}: {
  menu: TMenu[];
  title?: string;
}) {
  const router = useRouter();
  const { open, isMobile, setOpenMobile } = useSidebar();

  const openInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  const handleNavigate = (href: string) => {
    if (href.includes("http")) {
      openInNewTab(href);
    } else {
      router.push("/" + href);
    }
        if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup className="py-0.5">
      {title && open && (
        <SidebarGroupLabel className="mb-0.5 pl-5">{title}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {menu.map((item) => (
                                                                      <SidebarMenuItem key={item.label} className="-translate-x-1.5 pl-2">
            {}
            <SidebarMenuButton
              tooltip={item.label}
              onClick={() => handleNavigate(item.href)}
              className={cn(
                "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                item.active &&
                  "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              {item.icon && (
                <item.icon
                  className={cn(
                    "size-6",
                    item.active
                      ? "text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80",
                  )}
                />
              )}
              <span className={cn(item.active && "font-medium")}>
                {item.label}
              </span>
              {}
            </SidebarMenuButton>
            {}
          </SidebarMenuItem>
                  ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
