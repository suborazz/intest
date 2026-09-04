"use client";

import { Separator } from "@/x/406e493f";
import { ArrowLeftToLine, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type * as React from "react";

import { cn } from "@/x/a85a9c0c";

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

interface SettingsSidebarProps extends React.ComponentProps<typeof Sidebar> {
  baseMenu?: TMenu[];
  user?: { name?: string | null; email?: string | null; image?: string | null };
  onSignOut?: () => void;
  backEndpoint?: string;
}

export function SettingsSidebar({
  baseMenu = [],
  user,
  onSignOut,
  backEndpoint = "/",
  ...props
}: SettingsSidebarProps) {
  const { open, toggleSidebar } = useSidebar();
  const router = useRouter();

  return (
    <Sidebar className="z-30" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu className={cn("my-[5px]", !open && "my-[13px]")}>
          <SidebarMenuItem className={cn(open ? "pl-1" : "pl-2")}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-accent data-[state=open]:text-foreground"
              onClick={() => {
                router.push(backEndpoint);
              }}
            >
              <div className="border-primary flex aspect-square size-8 items-center justify-center rounded-lg border">
                <ChevronLeft size={16} />
              </div>
              <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Settings</span>
                <span className="truncate text-[0.7rem] capitalize">
                  Back to app
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator
        className="mx-auto mb-1"
        style={{ width: open ? "100%" : "70%" }}
      />

      <SidebarContent>
        <div className="space-y-1">
          <SidebarItems title={""} menu={baseMenu} />
          <Separator
            className="mx-auto"
            style={{ width: open ? "100%" : "70%" }}
          />
        </div>
      </SidebarContent>

      <SidebarFooter className="mb-1 px-0">
        <div className="space-y-2 px-2">
          <NavUser user={user} onSignOut={onSignOut} />
          <SidebarMenu>
            <SidebarMenuItem className="pl-2">
              <SidebarMenuButton tooltip={"Expand"} onClick={toggleSidebar}>
                <ArrowLeftToLine
                  className={cn(
                    "shrink-0 transition-transform duration-300 ease-in-out",
                    "size-6 -translate-x-[1px]",
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
