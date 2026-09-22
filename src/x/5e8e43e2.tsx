"use client";

import { Button } from "@/x/3458df31";
import {
  ChevronsUpDown,
  Edit2Icon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React_2 from "react";

import { useAuth } from "@/x/8789d6dc";
import { cn } from "@/x/a85a9c0c";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/x/8d4b4fae";
import { Avatar, AvatarFallback, AvatarImage } from "@/x/b4e015c3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/x/b5394efa";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/x/959524ce";

export interface NavUserProps {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  onSignOut?: () => void;
}

export function NavUser({ user, onSignOut }: NavUserProps) {
  const { isMobile, open: sidebarOpen } = useSidebar();
  const { user: authUser } = useAuth();
  const role = authUser?.role;

  const router = useRouter();

  const [open, setOpen] = React_2.useState(false);
  const [showSignOut, setShowSignOut] = React_2.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React_2.useState(false);

  React_2.useEffect(() => {
    setMounted(true);
  }, []);

      const EDIT_PROFILE_PATH: Record<string, string> = {
    SUPER_ADMIN: "/super-admin/settings",
    STUDENT: "/student/settings",
    INSTRUCTOR: "/instructor/profile",
    IMMERSION_USER: "/immersion/profile",
    RECRUIT_USER: "/recruit/profile",
  };

  const editProfilePath = role ? EDIT_PROFILE_PATH[role] : undefined;

  const handleEditProfile = () => {
    if (editProfilePath) router.push(editProfilePath);
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem
          className={cn(sidebarOpen ? "pl-1 " : "-translate-x-1.5 pl-2")}
        >
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild id="nav-user-dropdown-trigger">
              <SidebarMenuButton
                id="nav-user-dropdown-button"
                suppressHydrationWarning
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <Avatar className="size-8 rounded-lg">
                  {user?.image && (
                    <AvatarImage src={user.image} alt={user?.name ?? ""} />
                  )}
                  <AvatarFallback className="rounded-lg">
                    {(user?.name ?? user?.email ?? "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-lg">
                    {user?.image && (
                      <AvatarImage src={user.image} alt={user?.name ?? ""} />
                    )}
                    <AvatarFallback className="rounded-lg">
                      {(user?.name ?? user?.email ?? "U")
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              {editProfilePath && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={handleEditProfile}
                      className="cursor-pointer"
                    >
                      <Edit2Icon size={14} className="mr-4" /> Edit Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && theme === "dark" ? (
                  <SunIcon size={14} className="mr-4" />
                ) : (
                  <MoonIcon size={14} className="mr-4" />
                )}
                {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowSignOut(true)}>
                <LogOutIcon size={14} className="mr-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
        <AlertDialog open={showSignOut} onOpenChange={setShowSignOut}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to sign out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You can sign back in anytime to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                            >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant={"destructive"}
                  className="bg-destructive text-background hover:bg-destructive/90 shadow-sm"
                  onClick={() => onSignOut?.()}
                >
                  Sign Out
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenu>
    </>
  );
}
