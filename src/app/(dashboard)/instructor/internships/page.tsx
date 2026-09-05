"use client";

import type { Metadata } from "next";
import React_2, { Suspense } from "react";
import { AlertTriangle, Award, Calendar, Check as Check_2, CheckCircle2, CreditCard, Download, ExternalLink, Eye, FileText, FolderOpen, GraduationCap as GraduationCap_2, Info, Layers, Loader2, LucideIcon, Mail as Mail_2, MapPin as MapPin_2, MessageSquare, MoreHorizontal, Phone as Phone_2, Plus, School, Send, ShieldCheck, Sparkles as Sparkles_2, Trash2, User, Users as Users_2, X, XCircle, AlertCircle as AlertCircle_2, CheckCircle2 as CheckCircle2_2, Clock, FileText as FileText_2, Search, XCircle as XCircle_2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import * as React_4 from "react";
import React_3 from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog as SheetPrimitive, DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import axios from "axios";
import { toast } from "sonner";
import { ColumnDef, ColumnDef as ColumnDef_2 } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, XIcon, SearchIcon, ChevronsLeftIcon, ChevronsRightIcon, TableIcon } from "lucide-react";
import { useCallback, useRef, ReactNode, useLayoutEffect, useContext, Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Select as SelectPrimitive, Slot, Separator as SeparatorPrimitive, Label as LabelPrimitive } from "radix-ui";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { join } from "path";
import { Cell, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { set } from "date-fns";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { Drawer as DrawerPrimitive } from "vaul";
import { AuthContext } from "@/x/8789d6dc";
import { axiosInstance } from "@/x/acfb3dca";
import { LayoutContext } from "@/x/72be5b4f";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 text-xs/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 text-xs/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-5 text-sm/relaxed has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
}

function Input({ className, type, icon: Icon, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-input/20 file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border px-3 py-1.5 text-sm outline-none transition-colors file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xs/relaxed",
        Icon && "pl-8",
        className,
      )}
      {...props}
    />
  );

  if (!Icon) return input;

  return (
    <div className="relative flex w-full items-center">
      <Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4" />
      {input}
    </div>
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content border-input bg-input/20 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex min-h-16 w-full resize-none rounded-md border px-2 py-2 text-sm outline-none transition-colors focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-xs/relaxed",
        className,
      )}
      {...props}
    />
  );
}

function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

function Dialog({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/80 duration-100",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <SheetPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 text-xs/relaxed outline-none ring-1 duration-100 sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-2"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground text-xs/relaxed",
        className,
      )}
      {...props}
    />
  );
}

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/80",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content text-popover-foreground before:border-border before:bg-popover fixed z-50 flex h-auto flex-col bg-transparent p-2 text-xs/relaxed before:absolute before:inset-2 before:-z-10 before:rounded-xl before:border data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-1.5 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-foreground text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-xs/relaxed", className)}
      {...props}
    />
  );
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function ResponsiveDialog({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  className?: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[550px]",
            className,
          )}
        >
          <div className="shrink-0 p-4 pb-2">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          </div>
          <div className="overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className={cn("max-h-[90vh]", className)}>
        <DrawerHeader className="relative pr-10 text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          {children}
        </div>
        <div className="absolute right-4 top-4">
          <DrawerClose asChild>
            <button className="bg-muted/50 hover:bg-muted rounded-full p-2 transition-colors">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface ApplicationIdChipProps extends React_2.HTMLAttributes<HTMLSpanElement> {
    id: string;
    createdAt?: string | Date | null;
  className?: string;
  type?: "default" | "registration" | "application";
}

function generateRecruitRegistrationCode(
  profileId: string,
  createdAt?: string | Date | null,
): string {
  if (!profileId) return "";
  const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

  let hash = 0;
  for (let i = 0; i < profileId.length; i++) {
    hash = (hash * 31 + profileId.charCodeAt(i)) >>> 0;
  }

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;
  const h3 = Math.floor(h2 / 26);
  const c3 = ALPHA[h3 % 26]!;

  const h4 = Math.floor(h3 / 26);
  const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

  return `REG${year}${c1}${c2}${c3}${numeric}`;
}

function generateJobApplicationCode(
  applicationId: string,
  createdAt?: string | Date | null,
): string {
  if (!applicationId) return "";
  const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

  let hash = 0;
  for (let i = 0; i < applicationId.length; i++) {
    hash = (hash * 31 + applicationId.charCodeAt(i)) >>> 0;
  }

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;

  const h3 = Math.floor(h2 / 26);
  const numeric = String(1000 + (h3 % 9000)).padStart(4, "0");

  return `APP${year}${c1}${c2}${numeric}`;
}

function generateApplicationCode(
  id: string,
  createdAt?: string | Date | null,
): string {
    const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

    let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0; 
  }

    const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;
  const h3 = Math.floor(h2 / 26);
  const c3 = ALPHA[h3 % 26]!;

    const h4 = Math.floor(h3 / 26);
  const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

  return `${year}${c1}${c2}${c3}${numeric}`;
}

function ApplicationIdChip({
  id,
  createdAt,
  className,
  type = "default",
  ...props
}: ApplicationIdChipProps) {
  if (!id) return null;

  let code = "";
  if (type === "registration") {
    code = generateRecruitRegistrationCode(id, createdAt);
  } else if (type === "application") {
    code = generateJobApplicationCode(id, createdAt);
  } else {
    code = generateApplicationCode(id, createdAt);
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-violet-200/70 bg-violet-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-violet-700 transition-colors dark:border-violet-800/50 dark:bg-violet-950/40 dark:text-violet-300",
        className,
      )}
      {...props}
    >
      {code}
    </span>
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </SheetPrimitive.Close>
      )}
    </div>
  );
}

enum ESlotName {
  APP_SIDEBAR = "app-sidebar",
  BREADCRUMB = "breadcrumb",
  NAV_TABS = "nav-tabs",
  SUB_NAV_TABS = "sub-nav-tabs",
  LEFT_SIDEBAR = "left-sidebar",
  LEFT_FILTER = "left-filter",
  RIGHT_FILTER = "right-filter",
  DETAIL_SIDEBAR = "detail-sidebar",
  PAGE_HEADER = "page-header",
}

interface LayoutContextProps {
  isFilterOpen: boolean;
  isDetailsSidebarOpen: boolean;
  isLeftSidebarOpen: boolean;
  noPadding: boolean;

  setIsFilterOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  setIsDetailsSidebarOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  setIsLeftSidebarOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
          requestNoPadding: () => () => void;

  slots: Record<ESlotName, React_2.ReactNode>;
  setSlot: (name: ESlotName, content: React_2.ReactNode) => void;
}

const DEFAULT_TEST_SLOTS: Record<ESlotName, React_2.ReactNode> = {
  [ESlotName.APP_SIDEBAR]: null,
  [ESlotName.BREADCRUMB]: null,
  [ESlotName.NAV_TABS]: null,
  [ESlotName.SUB_NAV_TABS]: null,
  [ESlotName.LEFT_FILTER]: null,
  [ESlotName.RIGHT_FILTER]: null,
  [ESlotName.DETAIL_SIDEBAR]: null,
  [ESlotName.PAGE_HEADER]: null,
  [ESlotName.LEFT_SIDEBAR]: null,
};

const DEFAULT_TEST_CONTEXT: LayoutContextProps = {
  isFilterOpen: false,
  isDetailsSidebarOpen: false,
  isLeftSidebarOpen: false,
  noPadding: false,
  setIsFilterOpen: () => {},
  setIsDetailsSidebarOpen: () => {},
  setIsLeftSidebarOpen: () => {},
  requestNoPadding: () => () => {},
  slots: DEFAULT_TEST_SLOTS,
  setSlot: () => {},
};

const useLayoutContext = () => {
  const context = React_2.useContext(LayoutContext);
  if (!context) {
        if (process.env.NODE_ENV === "test") {
      return DEFAULT_TEST_CONTEXT;
    }
    throw new Error(
      "useLayoutContext must be used within a LayoutContextProvider",
    );
  }
  return context;
};

const useSlot = (name: ESlotName, content: React_2.ReactNode) => {
  const { setSlot } = useLayoutContext();
    useLayoutEffect(() => {
    setSlot(name, content);
    return () => setSlot(name, null);
  }, [name, content, setSlot]);
};

const PageHeaderLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const content = React_2.useMemo(
    () => (
      <div className="bg-background flex w-full min-w-0 flex-col border-b px-6 print:hidden">
        {children}
      </div>
    ),
    [children],
  );
  useSlot(ESlotName.PAGE_HEADER, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

interface IHeadingProps {
  title: React.ReactNode;
  description: string;
}

const Heading: React.FunctionComponent<IHeadingProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-1 pb-4">
      <h2 className="text-foreground text-lg font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
};

type TMeta = {
  total: number;
  limit: number;
  page: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  meta?: TMeta;
  setMeta?: Dispatch<SetStateAction<TMeta>>;
  reset?: boolean;
  selectedRows?: TData[];
  setSelectedRows?: (model: TData[]) => void;
  tableClassName?: string;
  url?: (row: TData) => string;
  onRowClick?: (row: TData) => void;
  full?: boolean;
  columnBorder?: boolean;
  activeRowId?: string;
  renderSubRow?: (row: Row<TData>) => React_2.ReactNode;
    hideHeader?: boolean;
    toolbar?: React_2.ReactNode;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({
  onPointerDown,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger suppressHydrationWarning
      data-slot="dropdown-menu-trigger"
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown?.(e);
      }}
    />
  );
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-40 overflow-hidden rounded-lg p-1 shadow-md border border-border/50 transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset, onSelect, ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7.5 data-disabled:pointer-events-none data-disabled:opacity-50 relative flex min-h-7 cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-xs [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      checked={checked}
      onSelect={(e) => {
        e.preventDefault();
        onSelect?.(e);
      }}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

interface TableOverflowProps extends React.ComponentProps<"div"> {
  maxHeight?: string;
}

function TableOverflow({
  className,
  children,
  maxHeight,
  style,
  ...props
}: TableOverflowProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateEdges = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth,
    );
  }, []);

  React.useEffect(() => {
    updateEdges();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  return (
    <div className="relative min-w-0">
      <div
        ref={ref}
        onScroll={updateEdges}
        className={cn("custom-scrollbar min-w-0 overflow-auto", className)}
        style={{ maxHeight, ...style }}
        {...props}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "from-background pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r to-transparent transition-opacity",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "from-background pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l to-transparent transition-opacity",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-xs", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

interface INoDataProps {
  children?: React.ReactNode;
  className?: string;
  full?: boolean;
}

const NoData: React.FunctionComponent<INoDataProps> = ({
  children,
  className,
  full,
}) => {
  return (
    <div
      className={cn(
        full ? "h-[calc(80vh-10rem)]" : "h-36",
        "flex w-full items-center justify-center",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-md items-center justify-center gap-2 py-4 text-center",
          className,
        )}
      >
        {}
        <TableIcon size={14} />
        <p className="text-muted-foreground text-xs">No results found.</p>
        {children}
      </div>
    </div>
  );
};

const XE75bf90a_2 = NoData;

interface ILoadingProps {
  full?: boolean;
}

const Loading: React.FunctionComponent<ILoadingProps> = ({ full }) => {
  return (
    <div
      className={cn(
        full ? "h-[calc(80vh-10rem)]" : "h-36",
        "flex w-full items-center justify-center",
      )}
    >
      <div className="flex items-center justify-center py-4">
        <Loader2Icon className="text-primary animate-spin" size={16} />{" "}
      </div>
    </div>
  );
};

const XC28cd1d8_2 = Loading;

interface DataTablePaginationProps_2 {
  meta: TMeta;
  setMeta: React.Dispatch<React.SetStateAction<TMeta>>;
  setPageSize?: (size: number) => void;
  selectionEnabled?: boolean;
  selectedRows?: number;
}

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input bg-input/20 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex w-fit items-center justify-between gap-1.5 whitespace-nowrap rounded-md border px-3 py-2 text-xs/relaxed outline-none transition-colors focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-3.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn(
          "max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded-lg shadow-md ring-1 duration-100 data-[align-trigger=true]:animate-none",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:min-w-(--radix-select-trigger-width) p-1 data-[position=popper]:w-full",
            position === "popper" && "",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex min-h-7 w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function DataTablePagination_2({
  meta,
  setMeta,
  selectionEnabled = false,
  selectedRows,
}: DataTablePaginationProps_2) {
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();

    const searchPage = Number(params?.get("page")) || 1;
  const searchLimit = Number(params?.get("size")) || 10;

    const totalPage = Math.max(1, Math.ceil(meta.total / meta.limit));
  const [tablePageSize, setTablePageSize] = useState<number>(searchLimit);
  const [tablePage, setTablePage] = useState<number>(searchPage);

  useEffect(() => {
    setMeta((prev) => ({
      ...prev,
      page: searchPage,
      limit: searchLimit,
    }));
    setTablePageSize(searchLimit);
    setTablePage(searchPage);
  }, [searchPage, searchLimit, setMeta]);

  const updateSearchParams = (page: number, limit: number) => {
    const newParams = new URLSearchParams(params?.toString());
    newParams.set("page", page.toString());
    newParams.set("size", limit.toString());
    router.push(path + "?" + newParams.toString());
  };

  const handlePageChange = (page: number) => {
    setMeta((prev) => ({ ...prev, page }));
    updateSearchParams(page, meta.limit);
    setTablePage(searchPage);
  };

  const handleLimitChange = (limit: number) => {
    const page = Math.min(meta.page, Math.ceil(meta.total / limit));
    setMeta((prev) => ({ ...prev, limit, page: page !== 0 ? page : 1 }));
    updateSearchParams(page !== 0 ? page : 1, limit);
    setTablePageSize(searchLimit);
  };

  function getPaginationText({
    selectionEnabled,
    selectedRows,
    meta,
  }: {
    selectionEnabled: boolean;
    selectedRows: number | undefined;
    meta: TMeta;
  }): React.ReactNode {
    if (selectionEnabled && selectedRows !== undefined && selectedRows > 0) {
      return (
        <p>
          <span className="font-medium">{selectedRows}</span> of{" "}
          <span className="font-medium">{meta.total}</span>{" "}
          {meta.total === 1 ? "row" : "rows"} selected.
        </p>
      );
    }

    return <></>;
  }
  return (
    <div className="my-2 flex flex-col items-center gap-3 px-2 sm:flex-row sm:justify-between">
      <div className="flex items-center text-sm font-normal tracking-wide">
        {getPaginationText({
          selectionEnabled,
          selectedRows,
          meta,
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
          <Select
            value={`${tablePageSize}`}
            onValueChange={(value) => handleLimitChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={tablePageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {tablePage} of {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={tablePage <= 1}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(tablePage - 1)}
            disabled={tablePage <= 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(tablePage + 1)}
            disabled={tablePage >= totalPage}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPage)}
            disabled={tablePage >= totalPage}
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataTable<TData, TValue>({
  data,
  meta,
  columns,
  setMeta,
  isLoading = false,
  reset,
  selectedRows,
  setSelectedRows,
  url,
  onRowClick,
  tableClassName = "",
  full = true,
  columnBorder = false,
  activeRowId,
  renderSubRow,
  hideHeader = false,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  const [selectionEnabled] = useState<boolean>(
    selectedRows !== undefined && setSelectedRows !== undefined,
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
    enableRowSelection: selectionEnabled,
    onRowSelectionChange: setRowSelection,
    getRowId: (row: TData, index: number) =>
      (
        ((row as Record<string, unknown>).id ||
          (row as Record<string, unknown>).name ||
          index) as string | number
      ).toString(),
  });

  useEffect(() => {
    if (reset) {
      table.toggleAllPageRowsSelected(false);
      table.setRowSelection({});
      setSelectedRows?.([]);
    }
  }, [reset, setSelectedRows, table]);

  useEffect(() => {
        const stillSelectedRows =
      selectedRows?.filter((row) => {
        const rowId = (
          ((row as Record<string, unknown>).id ||
            (row as Record<string, unknown>).name ||
            "") as string | number
        ).toString();
        return rowId && rowSelection[rowId];
      }) || [];

        const updatedSelectedRows = [...stillSelectedRows];
    data.forEach((row, index) => {
      const rowId = (
        ((row as Record<string, unknown>).id ||
          (row as Record<string, unknown>).name ||
          index) as string | number
      ).toString();
      if (
        rowSelection[rowId] &&
        !updatedSelectedRows.find((r) => {
          const rId = (
            ((r as Record<string, unknown>).id ||
              (r as Record<string, unknown>).name ||
              "") as string | number
          ).toString();
          return rId === rowId;
        })
      ) {
        updatedSelectedRows.push(row);
      }
    });

        const currentIds = (selectedRows || [])
      .map((r) =>
        (
          ((r as Record<string, unknown>).id ||
            (r as Record<string, unknown>).name ||
            "") as string | number
        ).toString(),
      )
      .sort()
      .join(",");
    const nextIds = updatedSelectedRows
      .map((r) =>
        (
          ((r as Record<string, unknown>).id ||
            (r as Record<string, unknown>).name ||
            "") as string | number
        ).toString(),
      )
      .sort()
      .join(",");

    if (currentIds !== nextIds) {
      setSelectedRows?.(updatedSelectedRows || []);
    }
  }, [rowSelection, data, selectedRows, setSelectedRows]);

  useEffect(() => {
    if (meta?.limit) {
      table.setPageSize(meta?.limit || 10);
    }
  }, [meta?.limit, table]);

  function renderFunctionRows(row: Row<TData>) {
    return (
      <TableRow
        key={row.id}
        data-state={
          (row.getIsSelected() || (activeRowId && row.id === activeRowId)) &&
          "selected"
        }
        className={cn(
          "border-border/40 hover:bg-secondary/40 border-b transition-colors",
          onRowClick ? "cursor-pointer" : "cursor-default",
        )}
        onClick={() => {
          if (onRowClick) {
            onRowClick(row.original);
          }
        }}
      >
        {row
          .getVisibleCells()
          .map((cell, index) => renderFunctionCell(row, cell, index))}
      </TableRow>
    );
  }

  function renderFunctionCell(
    row: Row<TData>,
    cell: Cell<TData, unknown>,
    index: number,
  ) {
    const excludedIndexes = columns
      .map((col, i) =>
        col.id && ["actions", "select"].includes(col.id) ? i : -1,
      )
      .filter((i) => i !== -1);

    const isLink = url !== undefined && !excludedIndexes.includes(index);

    return (
      <TableCell
        key={cell.id}
        style={{
          minWidth: cell.column.columnDef.minSize,
          maxWidth: cell.column.columnDef.maxSize,
        }}
        onClick={(e) => {
          if (isLink && url) {
            e.stopPropagation();
            router.push(url(row.original));
          }
        }}
        className={cn(
          "px-4 py-2",
          cell.column.columnDef.minSize === 20
            ? "max-w-60 text-clip text-nowrap"
            : "line-clamp-3",
          isLink && "cursor-pointer",
        )}
      >
        <span className="select-text">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </span>
      </TableCell>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 pt-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">{toolbar}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex shrink-0 items-center gap-1.5 font-semibold"
            >
              <ChevronDownIcon className="size-4" />
              <span className="hidden sm:inline">View Columns</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card w-[180px] border">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const header = column.columnDef.header;
                const label =
                  typeof header === "string"
                    ? header
                    : typeof header === "function"
                      ? column.id
                      : column.id;

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="cursor-pointer text-xs font-semibold capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {label || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TableOverflow className="w-full">
        <Table
          className={cn(
            "relative",
            columnBorder &&
              "rounded-2xl [&_td:last-child]:border-r-0 [&_td]:border-r [&_th:last-child]:border-r-0 [&_th]:border-r",
            tableClassName,
          )}
        >
          <TableHeader
            className={cn(
              "bg-secondary sticky top-0 z-10",
              hideHeader && "hidden",
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/60 border-b hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground h-9 px-4 text-[0.7rem] font-semibold uppercase tracking-wider"
                    >
                      {header.column.columnDef.enableSorting ? (
                        <Button
                          variant="ghost"
                          className="flex w-full items-center justify-start p-0 capitalize hover:bg-transparent"
                          onClick={() =>
                            header.column.toggleSorting(
                              header.column.getIsSorted() === "asc",
                            )
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <div className="ml-3">
                            <ChevronUpIcon
                              className={cn(
                                "translate-y-0.5",
                                header.column.getIsSorted() === "asc"
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                              size={10}
                            />
                            <ChevronDownIcon
                              className={cn(
                                "-translate-y-0.5",
                                header.column.getIsSorted() === "desc"
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                              size={10}
                            />
                          </div>
                        </Button>
                      ) : header.isPlaceholder ? null : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <React_2.Fragment key={row.id}>
                      {renderFunctionRows(row)}
                      {renderSubRow && renderSubRow(row)}
                    </React_2.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      <XE75bf90a_2 full={full} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow className="cursor-pointer hover:bg-transparent">
                <TableCell colSpan={columns.length} className="text-center">
                  <XC28cd1d8_2 full={full} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableOverflow>
      {meta &&
        setMeta &&
        meta.total >= 10 &&
        table.getRowModel().rows?.length !== 0 && (
          <DataTablePagination_2
            meta={meta}
            setMeta={setMeta}
            selectionEnabled={selectionEnabled}
            selectedRows={selectedRows?.length}
          />
        )}
    </div>
  );
}

interface IDataTableSearchProps {
  small?: boolean;
  xSmall?: boolean;
  full?: boolean;
  placeholder?: string;
  thin?: boolean;
  searchKey?: string;
}

function DataTableSearch({
  small = false,
  xSmall = false,
  placeholder = "Search by name...",
  full = false,
  thin = true,
  searchKey = "filter",
}: IDataTableSearchProps) {
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(params?.get(searchKey) || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentVal = params?.get(searchKey) || "";
      if (searchTerm.trim() === currentVal.trim()) {
        return;
      }

      const newParams = new URLSearchParams(params?.toString());
      if (searchTerm.trim() === "") {
        newParams.delete(searchKey);
      } else {
        newParams.set(searchKey, searchTerm.trim());
        newParams.set("page", "1");
      }

      const currentQuery = params?.toString() || "";
      const newQuery = newParams.toString();
      if (newQuery !== currentQuery) {
        router.push(path + (newQuery ? `?${newQuery}` : ""));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, path, router, params, searchKey]);

  const sizeClasses = xSmall
    ? "w-full sm:w-[250px]"
    : small
      ? "w-full sm:w-[300px]"
      : full
        ? "w-full"
        : "w-full sm:w-[400px]";

  return (
    <div
      className={cn(
        "bg-background relative flex items-center rounded-md border transition-all",
        thin ? "h-8" : "h-9",
        sizeClasses,
      )}
    >
      <SearchIcon
        size={thin ? 12 : 14}
        className={cn(
          "text-muted-foreground absolute left-2 transition-all",
          thin && "left-2",
        )}
      />
      <Input
        placeholder={placeholder}
        className={cn(
          "w-full border-none bg-transparent py-1 pl-8 text-xs transition-all",
          thin ? "h-7 text-[11px] placeholder:text-[11px]" : "h-9",
        )}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant="outline"
        className={cn(
          "invisible absolute right-1",
          thin ? "h-7 w-7" : "h-9 w-9",
        )}
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 data-[variant=destructive]:*:[svg]:text-destructive relative flex min-h-7 cursor-default select-none items-center gap-2 rounded-md px-2 py-1 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border/50 -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-2.5!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border bg-input/20 text-foreground dark:bg-input/30 [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex select-none items-center gap-2 text-xs/relaxed font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

type ImmersionApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

interface InternshipIdChipProps extends React_2.HTMLAttributes<HTMLSpanElement> {
  code?: string | null;
  companyName?: string | null;
  className?: string;
}

function formatInternshipCode(
  code?: string | null,
  companyName?: string | null,
): string {
  if (!code) return "IN2026XX10001";

  const trimmed = code.trim();
  if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const sourceText = companyName && companyName.trim() ? companyName : trimmed;
  const words = sourceText
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  let initials = "HT";
  if (words.length === 1 && words[0]!.length >= 2) {
    initials = words[0]!.slice(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
  }
  const numericSuffix = (Math.abs(hash) % 90000) + 10000;

  return `IN2026${initials}${numericSuffix}`;
}

function InternshipIdChip({
  code,
  companyName,
  className,
  ...props
}: InternshipIdChipProps) {
  if (!code && !companyName) return null;

  const formattedCode = formatInternshipCode(code, companyName);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300",
        className,
      )}
      {...props}
    >
      {formattedCode}
    </span>
  );
}

type TSectionItems = {
  id: string;
  label: string;
  href: string;
  link?: string;
  icon?: LucideIcon;
  count?: number;
};

interface ISectionsProps {
  sections: TSectionItems[];
  condition?: string;
  pathname?: string;
        activeHref?: string;
}

const Sections: React.FunctionComponent<ISectionsProps> = ({
  sections,
  condition,
  pathname: _pathname,
  activeHref,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const __pathname = usePathname();

  const pathname = _pathname || __pathname;

  const pathnameList = pathname?.split("/") ?? [];

  const last = pathnameList[pathnameList.length - 1];

  const tab = condition && last === condition ? "" : last;

  const handleNavigation = (to: string) => {
    const validPaths = sections.map((item) => item.href);

    if (validPaths.some((path) => pathname?.endsWith(`/${path}`))) {
      const newPath =
        pathname?.substring(0, pathname.lastIndexOf("/")) + `/${to}`;
      router.push(newPath);
    } else {
      router.push(pathname + "/" + to);
    }
  };

  const handleLinkNavigation = (link: string) => {
    const url = new URL(link, window.location.origin);

    const paramsToPreserve = ["entity_id"];

    paramsToPreserve.forEach((param) => {
      const currentValue = searchParams?.get(param);
      if (currentValue && !url.searchParams.has(param)) {
        url.searchParams.set(param, currentValue);
      }
    });

    router.push(url.pathname + url.search);
  };

  return (
    <div id="sections" className="bg-background/60 min-w-0 px-0 pb-0">
      <div className="scrollbar-none flex min-w-0 items-center gap-1 overflow-x-auto">
        {sections.map((item: TSectionItems) => {
          const isActive =
            activeHref !== undefined
              ? activeHref === item.href
              : tab === item.href;
          const Icon = item.icon;
          return (
            <button
              data-testid={`tab-${item.label.replaceAll(" ", "-").toLowerCase()}`}
              key={item.id}
              className={cn(
                "-mb-px flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-t-md border-b-2 px-3 py-2 text-[0.8rem] font-semibold transition-colors",
                isActive
                  ? "border-primary text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent",
              )}
              onClick={() =>
                item.link
                  ? handleLinkNavigation(item.link)
                  : handleNavigation(item.href)
              }
            >
              {Icon && <Icon className="size-4 opacity-80" />}
              {item.label}
              {item.count !== undefined && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "ms-0.5 min-w-5 px-1 text-[0.65rem] tabular-nums transition-opacity",
                    !isActive && "opacity-50",
                  )}
                >
                  {item.count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

interface ApiSuccess<T> {
      success: boolean;
      data: T;
      message?: string;
    }

interface EmersionRegisterData {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    }

type EmersionRegisterResponse = ApiSuccess<EmersionRegisterData>;

interface EmersionRegisterPayload {
      name: string;
      email: string;
      password: string;
      mobileNo?: string;
    }

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface EmersionDashboardStats {
      totalApplications: number;
      applicationStatus: string;
      profileCompletion: number;
      totalImmersionDays: number;
      totalHoursLogged?: number;
      totalProjectsSubmitted?: number;
    }

interface EmersionDashboardRecentActivity {
      id: string;
      type: string;
      title: string;
      description?: string;
      createdAt: string;
    }

type EmersionRegStatus =
      "NOT_REGISTERED" | "PENDING" | "APPROVED" | "REJECTED";

interface EmersionDashboardApplication {
      id: string;
      status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
      remarks?: string | null;
      preferredDuration?: string | null;
      preferredLocation?: string | null;
      preferredStartDate?: string | null;
      submittedAt?: string | null;
      approvedAt?: string | null;
      immersionId?: string | null;
      immersion?: {
        id: string;
        title: string;
        location: string;
        startDate: string;
        endDate: string;
        status: string;
      } | null;
      assignedMentor?: {
        id: string;
        name: string;
        email: string;
      } | null;
    }

interface EmersionDashboardData {
      stats: EmersionDashboardStats;
      recentActivities?: EmersionDashboardRecentActivity[];
      registrationStatus?: EmersionRegStatus;
      applicationStatus?: EmersionRegStatus;
      applicationId?: string | null;
      application?: EmersionDashboardApplication | null;
    }

type EmersionDashboardResponse = ApiSuccess<EmersionDashboardData>;

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

interface EmersionProfileData {
      id: string;
      userId: string;
      emersionId?: string;

        fullName: string;
      fatherSpouseName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      mobileNo: string;
      alternateMobileNo?: string | null;
      emailAddress?: string | null;
      photoUrl?: string | null;
      photoName?: string | null;
      identityProofUrl?: string | null;
      identityProofName?: string | null;
      educationCertUrl?: string | null;
      educationCertName?: string | null;

        currentAddressLocal: string;
      currentAddressDistrict: string;
      currentAddressState: string;
      currentAddressCountry: string;
      currentAddressPinCode: string;
      sameAsCurrentAddress: boolean;
      permAddressLocal: string;
      permAddressDistrict: string;
      permAddressState: string;
      permAddressCountry: string;
      permAddressPinCode: string;

        availability?: string | null;
      preferredMode?: string[] | null;
      selfIntroduction?: string | null;

      createdAt: string;
      updatedAt: string;
    }

type EmersionProfileResponse = ApiSuccess<EmersionProfileData>;

type UpdateEmersionProfileResponse = ApiSuccess<EmersionProfileData>;

interface TEmersionAddress_2 {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

interface UpdateEmersionProfilePayload {
      fullName?: string;
      fatherSpouseName?: string;
      dob?: string;
      gender?: "Male" | "Female" | "Transgender";
      mobileNo?: string;
      alternateMobileNo?: string;
      emailAddress?: string;
      photoBase64?: string;
      photoName?: string;
      currentAddress?: TEmersionAddress_2;
      sameAsCurrentAddress?: boolean;
      permanentAddress?: TEmersionAddress_2;
      availability?: string;
      preferredMode?: string[];
      selfIntroduction?: string;
    }

interface EmersionAcademicDetail {
      id?: string;
      qualification: string; 
      stream: string;
      subject: string;
      instituteName: string;
      universityName: string;
      sessionYear: string;
      gradeDivision: string;
      studentStatus: string; 
    }

interface EmersionApplicationData {
      id: string;
      userId: string;
      status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "DRAFT";
      remarks?: string | null;

        preferredDuration?: string | null;
      customDuration?: string | null;
      preferredLocation?: string | null;
      preferredStartDate?: string | null;

        expectedLearning?: string | null;
      careerGoal?: string | null;
      specialTalentSkill?: string | null;
      languagesKnown?: string | null;

        presenceType?: string | null;
      fieldVisitsComfort?: boolean | null;
      workType?: string | null;

        emergencyContactName?: string | null;
      emergencyRelationship?: string | null;
      emergencyMobile?: string | null;

        declarationAccepted: boolean;
      rulesAccepted: boolean;

        academicDetails: EmersionAcademicDetail[];

        immersionId?: string | null;
      immersion?: {
        id: string;
        title: string;
        location: string;
        startDate: string;
        endDate: string;
      } | null;

        assignedMentor?: {
        id: string;
        name: string;
        email: string;
      } | null;

      submittedAt?: string | null;
      approvedAt?: string | null;
      createdAt: string;
      updatedAt: string;
    }

type EmersionApplicationResponse = ApiSuccess<EmersionApplicationData>;

const ZEmersionAddress = z.object({
      local: z
        .string()
        .min(3, { message: "Local address must be at least 3 characters." }),
      district: z.string().min(2, { message: "District is required." }),
      state: z.string().min(2, { message: "State is required." }),
      country: z.string().min(2, { message: "Country is required." }),
      pinCode: z
        .string()
        .regex(/^\d{6}$/, { message: "Pin code must be exactly 6 digits." }),
    });

const ZEmersionQualification = z.object({
      highestQualification: z
        .string()
        .min(1, { message: "Qualification is required." }),
      specialization: z.string().min(1, { message: "Specialization is required." }),
      universityName: z
        .string()
        .min(2, { message: "University / Institution name is required." }),
      yearOfCompletion: z
        .string()
        .min(4, { message: "Year of completion is required." }),
      percentage: z.string().min(1, { message: "Percentage / Grade is required." }),
    });

const ZEmersionProfessionalExperience = z.object({
      organization: z
        .string()
        .min(2, { message: "Organization name is required." }),
      designation: z.string().min(2, { message: "Designation is required." }),
      duration: z.string().min(1, { message: "Duration is required." }),
      description: z.string().optional().default(""),
    });

const ZEmersionProjectSample = z.object({
      title: z.string().min(2, { message: "Project title is required." }),
      description: z.string().min(10, {
        message: "Project description must be at least 10 characters.",
      }),
      link: z
        .string()
        .url({ message: "Please enter a valid URL." })
        .optional()
        .or(z.literal(""))
        .optional(),
      techStack: z.array(z.string()).optional().default([]),
    });

const ZEmersionReference = z.object({
      name: z.string().min(2, { message: "Reference name is required." }),
      designation: z.string().min(2, { message: "Designation is required." }),
      organization: z.string().min(2, { message: "Organization is required." }),
      contact: z.string().min(5, { message: "Contact info is required." }),
    });

const ZEmersionApplication = z
      .object({
            fullName: z
          .string()
          .min(2, { message: "Full name must be at least 2 characters." }),
        fatherSpouseName: z
          .string()
          .min(2, { message: "Father's / Spouse's name is required." }),
        dob: z.string().min(1, { message: "Date of birth is required." }),
        gender: z.enum(["Male", "Female", "Transgender"], {
          message: "Gender is required.",
        }),
        mobileNo: z
          .string()
          .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
        alternateMobileNo: z
          .string()
          .regex(/^\d{10}$/, { message: "Alternate mobile must be 10 digits." })
          .or(z.string().length(0))
          .optional(),
        emailAddress: z
          .string()
          .email({ message: "Please enter a valid email." })
          .or(z.string().length(0))
          .optional(),
        photoBase64: z.string().optional().default(""),
        photoName: z.string().optional().default(""),

            currentAddress: ZEmersionAddress,
        sameAsCurrentAddress: z.boolean().default(false),
        permanentAddress: z
          .object({
            local: z.string().optional().default(""),
            district: z.string().optional().default(""),
            state: z.string().optional().default(""),
            country: z.string().optional().default("India"),
            pinCode: z.string().optional().default(""),
          })
          .optional()
          .default({
            local: "",
            district: "",
            state: "",
            country: "India",
            pinCode: "",
          }),

            qualifications: z.array(ZEmersionQualification).min(1, {
          message: "Please add at least one educational qualification.",
        }),

            professionalExperiences: z
          .array(ZEmersionProfessionalExperience)
          .optional()
          .default([]),
        totalWorkExperience: z.string().optional().default(""),

            technicalSkills: z.array(z.string()).optional().default([]),
        softSkills: z.array(z.string()).optional().default([]),
        programmingLanguages: z.array(z.string()).optional().default([]),
        tools: z.array(z.string()).optional().default([]),
        certifications: z.array(z.string()).optional().default([]),

            projects: z.array(ZEmersionProjectSample).optional().default([]),

            references: z.array(ZEmersionReference).optional().default([]),

                                    preferredMode: z
          .array(z.enum(["Online", "Offline/On Campus", "Hybrid"]))
          .min(1, { message: "Select at least one preferred mode." }),

            fieldVisitsComfort: z.boolean().default(true),
        workType: z
          .enum([
            "GOVT_JOB",
            "NGO_JOB",
            "SOCIAL_WORK",
            "STUDENT",
            "RESEARCHER",
            "OTHER",
          ])
          .default("STUDENT"),

            emergencyContactName: z.string().optional().default(""),
        emergencyRelationship: z.string().optional().default(""),
        emergencyMobile: z.string().optional().default(""),

            identityProofBase64: z.string().optional().default(""),
        identityProofName: z.string().optional().default(""),
        educationCertBase64: z.string().optional().default(""),
        educationCertName: z.string().optional().default(""),
        experienceCertBase64: z.string().optional().default(""),
        experienceCertName: z.string().optional().default(""),
        agreeTerms: z.literal(true, {
          message: "You must agree to the declaration.",
        }),
      })
      .superRefine((data, ctx) => {
        if (!data.sameAsCurrentAddress) {
          const res = ZEmersionAddress.safeParse(data.permanentAddress);
          if (!res.success) {
            res.error.issues.forEach((issue) => {
              ctx.addIssue({
                ...issue,
                path: ["permanentAddress", ...issue.path],
              });
            });
          }
        }
      });

type TEmersionApplication = z.infer<typeof ZEmersionApplication>;

type EmersionMyApplicationResponse = ApiSuccess<
      EmersionApplicationData[]
    >;

interface EmersionApplicationStatusData {
      status: EmersionRegStatus;
      applicationId?: string | null;
      profileId?: string | null;
      remarks?: string | null;
      submittedAt?: string | null;
      reviewedAt?: string | null;
      assignedMentor?: { id: string; name: string; email: string } | null;
      immersion?: {
        id: string;
        title: string;
        location: string;
        startDate: string;
        endDate: string;
      } | null;
    }

type EmersionApplicationStatusResponse =
      ApiSuccess<EmersionApplicationStatusData>;

interface EmersionNotice {
      id: string;
      noticeNumber: string;
      date: string;
      title: string;
      category: string;
      description: string;
      pdfUrl?: string | null;
      pdfPublicId?: string | null;
      senderId: string;
      sender?: {
        id: string;
        name: string;
        email: string;
        role: string;
      } | null;
      createdAt: string;
      updatedAt: string;
      content?: string;
    }

interface EmersionListNoticesResponse {
      success: boolean;
      data: EmersionNotice[];
    }

type EmersionTicketStatus =
      "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

type EmersionTicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface EmersionSupportTicket {
      id: string;
      ticketNo: string;
      title: string;
      description: string;
      status: EmersionTicketStatus;
      priority: EmersionTicketPriority;
      createdAt: string;
      updatedAt: string;
      userId: string;
      subject?: string;
      message?: string;
    }

interface EmersionCreateTicketResponse {
      success: boolean;
      data: EmersionSupportTicket;
    }

interface EmersionCreateTicketPayload {
      title: string;
      description: string;
      priority?: EmersionTicketPriority;
    }

interface EmersionListMyTicketsResponse {
      success: boolean;
      data: EmersionSupportTicket[];
    }

interface EmersionDeleteTicketResponse {
      success: boolean;
      message: string;
    }

interface EmersionCertificate {
      id: string;
      certificateNo: string;
      studentId?: string;
      issuedAt: string;
      grade?: string | null;
      credits?: string | null;
      program: {
        id: string;
        title: string;
        location: string;
        period: string;
      };
      issuedBy: {
        id: string;
        name: string;
      };
    }

interface ListEmersionCertificatesResponse {
      success: boolean;
      data: EmersionCertificate[];
    }

interface AssignGradeResponse_2 {
      success: boolean;
      message: string;
      data: {
        id: string;
        certificateNo: string;
        grade: string;
        credits: string | null;
      };
    }

interface AssignGradeRequest_2 {
      grade: string;
    }

interface EmersionIDCard {
      cardNo: string;
      issuedAt: string;
      studentId: string;
      studentName: string;
      studentEmail: string;
      studentMobile: string;
      studentAddress: string;
      photoUrl?: string;
      programId: string;
      programTitle: string;
      programLocation: string;
      programStartDate?: string | null;
      programEndDate?: string | null;
      programStatus?: "UPCOMING" | "ACTIVE" | "COMPLETED";
    }

interface GetEmersionIDCardResponse {
      success: boolean;
      data: EmersionIDCard;
    }

interface ListMyEmersionPaymentsParams {
      page?: number;
      limit?: number;
      status?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
      search?: string;
    }

interface EmersionPaymentProgramSummary {
      id: string;
      title: string;
      location: string;
      period: string;
    }

interface EmersionPaymentPublic {
      id: string;
      amount: number;
      currency: string;
      status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
      razorpayOrderId: string;
      razorpayPaymentId: string | null;
      razorpaySignature: string | null;
      refundId: string | null;
      createdAt: string;
      updatedAt: string;
      userId: string;
      applicationId: string;
      application?: {
        id: string;
        immersion?: EmersionPaymentProgramSummary | null;
      };
    }

interface ListMyEmersionPaymentsResponse {
      success: boolean;
      data: EmersionPaymentPublic[];
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }

interface EmersionPaymentReceiptData {
      id: string;
      amount: number;
      status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
      createdAt: string;
      razorpayOrderId: string;
      razorpayPaymentId: string | null;
      user?: {
        id: string;
        name: string;
        email: string;
      };
      application?: {
        id: string;
        immersion?: EmersionPaymentProgramSummary | null;
      };
    }

interface GetEmersionPaymentReceiptResponse {
      success: boolean;
      data: EmersionPaymentReceiptData;
    }

interface CreateEmersionOrderResponseData {
      paymentId: string;
      razorpayOrderId: string;
      amount: number;
      currency: string;
      keyId: string;
      isMockMode: boolean;
    }

interface CreateEmersionOrderResponse {
      success: boolean;
      data: CreateEmersionOrderResponseData;
    }

type CreateEmersionOrderPayload = Record<string, never>;

interface VerifyEmersionSignatureResponseData {
      paymentId: string;
      applicationId: string;
      status: string;
    }

interface VerifyEmersionSignatureResponse {
      success: boolean;
      data: VerifyEmersionSignatureResponseData;
    }

interface VerifyEmersionSignaturePayload {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    }

interface RefundEmersionPaymentResponseData {
      paymentId: string;
      refundId: string;
      refundedAmount: number;
      status: string;
    }

interface RefundEmersionPaymentResponse {
      success: boolean;
      data: RefundEmersionPaymentResponseData;
    }

interface RefundEmersionPaymentPayload {
      paymentId: string;
      amount?: number;
    }

interface EmersionProgramCategory {
      id: string;
      name: string;
    }

interface EmersionProgramInstructor {
      id: string;
      name: string;
      email: string;
    }

interface EmersionProgram {
      id: string;
      code?: string | null;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      location: string;
      period: string;
      facilities?: string | null;
      benefits?: string | null;
      fees: number;
      categoryId?: string | null;
      category?: EmersionProgramCategory | null;
      instructorId?: string | null;
      instructor?: EmersionProgramInstructor | null;
      createdAt: string;
      updatedAt: string;
    }

interface ListEmersionProgramsResponse {
      success: boolean;
      data: EmersionProgram[];
    }

type ApplyToEmersionProgramResponse =
      ApiSuccess<EmersionApplicationData>;

interface IEmersionDataHooks {
      useEmersionRegister: (
        options?: TMutationOptions<
          EmersionRegisterResponse,
          Error,
          EmersionRegisterPayload
        >,
      ) => TMutationReturnType<EmersionRegisterResponse, EmersionRegisterPayload>;

      useEmersionDashboard: (
        options?: TQueryOptions<EmersionDashboardResponse, Error>,
      ) => TQueryReturnType<EmersionDashboardResponse, Error>;

      useEmersionProfile: (
        options?: TQueryOptions<EmersionProfileResponse, Error>,
      ) => TQueryReturnType<EmersionProfileResponse, Error>;

      useUpdateEmersionProfile: (
        options?: TMutationOptions<
          UpdateEmersionProfileResponse,
          Error,
          UpdateEmersionProfilePayload
        >,
      ) => TMutationReturnType<
        UpdateEmersionProfileResponse,
        UpdateEmersionProfilePayload
      >;

        useSubmitEmersionApplication: (
        options?: TMutationOptions<
          EmersionApplicationResponse,
          Error,
          TEmersionApplication
        >,
      ) => TMutationReturnType<EmersionApplicationResponse, TEmersionApplication>;

      useMyEmersionApplication: (
        options?: TQueryOptions<EmersionMyApplicationResponse, Error>,
      ) => TQueryReturnType<EmersionMyApplicationResponse, Error>;

      useEmersionApplicationStatus: (
        options?: TQueryOptions<EmersionApplicationStatusResponse, Error>,
      ) => TQueryReturnType<EmersionApplicationStatusResponse, Error>;

      useDownloadEmersionApplication: (
        options?: TMutationOptions<Blob, Error, void>,
      ) => TMutationReturnType<Blob, void>;

      useNotices: (
        options?: TQueryOptions<EmersionListNoticesResponse, Error>,
      ) => TQueryReturnType<EmersionListNoticesResponse, Error>;

      useCreateSupportTicket: (
        options?: TMutationOptions<
          EmersionCreateTicketResponse,
          Error,
          EmersionCreateTicketPayload
        >,
      ) => TMutationReturnType<
        EmersionCreateTicketResponse,
        EmersionCreateTicketPayload
      >;

      useMySupportTickets: (
        options?: TQueryOptions<EmersionListMyTicketsResponse, Error>,
      ) => TQueryReturnType<EmersionListMyTicketsResponse, Error>;

      useDeleteSupportTicket: (
        options?: TMutationOptions<EmersionDeleteTicketResponse, Error, string>,
      ) => TMutationReturnType<EmersionDeleteTicketResponse, string>;

        useMyEmersionCertificates: (
        options?: TQueryOptions<ListEmersionCertificatesResponse, Error>,
      ) => TQueryReturnType<ListEmersionCertificatesResponse, Error>;

      useDownloadEmersionCertificate: (
        options?: TMutationOptions<Blob, Error, string>,
      ) => TMutationReturnType<Blob, string>;

      useAssignEmersionGrade: (
        options?: TMutationOptions<
          AssignGradeResponse_2,
          Error,
          { id: string; payload: AssignGradeRequest_2 }
        >,
      ) => TMutationReturnType<
        AssignGradeResponse_2,
        { id: string; payload: AssignGradeRequest_2 }
      >;

        useEmersionIDCard: (
        options?: TQueryOptions<GetEmersionIDCardResponse, Error>,
      ) => TQueryReturnType<GetEmersionIDCardResponse, Error>;

        useApplicationIDCard: (
        applicationId: string,
        options?: TQueryOptions<GetEmersionIDCardResponse, Error>,
      ) => TQueryReturnType<GetEmersionIDCardResponse, Error>;

      useDownloadEmersionIDCard: (
        options?: TMutationOptions<Blob, Error, string>,
      ) => TMutationReturnType<Blob, string>;

        useMyEmersionPayments: (
        params?: ListMyEmersionPaymentsParams,
        options?: TQueryOptions<ListMyEmersionPaymentsResponse, Error>,
      ) => TQueryReturnType<ListMyEmersionPaymentsResponse, Error>;

      useEmersionPaymentReceipt: (
        id: string,
        options?: TQueryOptions<GetEmersionPaymentReceiptResponse, Error>,
      ) => TQueryReturnType<GetEmersionPaymentReceiptResponse, Error>;

      useCreateEmersionPaymentOrder: (
        options?: TMutationOptions<
          CreateEmersionOrderResponse,
          Error,
          CreateEmersionOrderPayload
        >,
      ) => TMutationReturnType<
        CreateEmersionOrderResponse,
        CreateEmersionOrderPayload
      >;

      useVerifyEmersionPaymentSignature: (
        options?: TMutationOptions<
          VerifyEmersionSignatureResponse,
          Error,
          VerifyEmersionSignaturePayload
        >,
      ) => TMutationReturnType<
        VerifyEmersionSignatureResponse,
        VerifyEmersionSignaturePayload
      >;

      useRefundEmersionPayment: (
        options?: TMutationOptions<
          RefundEmersionPaymentResponse,
          Error,
          RefundEmersionPaymentPayload
        >,
      ) => TMutationReturnType<
        RefundEmersionPaymentResponse,
        RefundEmersionPaymentPayload
      >;

        usePrograms: (
        params?: {
          search?: string;
          filter?: string;
          type?: string;
          categoryId?: string;
        },
        options?: TQueryOptions<ListEmersionProgramsResponse, Error>,
      ) => TQueryReturnType<ListEmersionProgramsResponse, Error>;

      useApplyToProgram: (
        options?: TMutationOptions<ApplyToEmersionProgramResponse, Error, string>,
      ) => TMutationReturnType<ApplyToEmersionProgramResponse, string>;
    }

interface IEmersionService {
      register: (
        payload: EmersionRegisterPayload,
      ) => Promise<EmersionRegisterResponse>;
      getDashboard: () => Promise<EmersionDashboardResponse>;
      getProfile: () => Promise<EmersionProfileResponse>;
      updateProfile: (
        payload: UpdateEmersionProfilePayload,
      ) => Promise<UpdateEmersionProfileResponse>;
      submitApplication: (
        payload: TEmersionApplication,
      ) => Promise<EmersionApplicationResponse>;
      getMyApplication: () => Promise<EmersionMyApplicationResponse>;
      getApplicationStatus: () => Promise<EmersionApplicationStatusResponse>;
      downloadApplication: () => Promise<Blob>;

        listNotices: () => Promise<EmersionListNoticesResponse>;

        createSupportTicket: (
        payload: EmersionCreateTicketPayload,
      ) => Promise<EmersionCreateTicketResponse>;
      listMySupportTickets: () => Promise<EmersionListMyTicketsResponse>;
      deleteSupportTicket: (id: string) => Promise<EmersionDeleteTicketResponse>;

        listMyCertificates: () => Promise<ListEmersionCertificatesResponse>;
      downloadCertificate: (id: string) => Promise<Blob>;
      assignGrade: (
        id: string,
        payload: AssignGradeRequest_2,
      ) => Promise<AssignGradeResponse_2>;

        getMyIDCard: () => Promise<GetEmersionIDCardResponse>;
      getApplicationIDCard: (
        applicationId: string,
      ) => Promise<GetEmersionIDCardResponse>;
      downloadIDCard: (id: string) => Promise<Blob>;

        listMyPayments: (
        params?: ListMyEmersionPaymentsParams,
      ) => Promise<ListMyEmersionPaymentsResponse>;
      getPaymentReceipt: (id: string) => Promise<GetEmersionPaymentReceiptResponse>;
      createPaymentOrder: (
        payload: CreateEmersionOrderPayload,
      ) => Promise<CreateEmersionOrderResponse>;
      verifyPaymentSignature: (
        payload: VerifyEmersionSignaturePayload,
      ) => Promise<VerifyEmersionSignatureResponse>;
      refundPayment: (
        payload: RefundEmersionPaymentPayload,
      ) => Promise<RefundEmersionPaymentResponse>;

        listPrograms: (params?: {
        search?: string;
        filter?: string;
        type?: string;
        categoryId?: string;
      }) => Promise<ListEmersionProgramsResponse>;
      applyToProgram: (
        programId: string,
      ) => Promise<ApplyToEmersionProgramResponse>;
    }

const ENDPOINTS = {
      AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        ME: "/auth/me",
        REFRESH: "/auth/refresh",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
        CHANGE_PASSWORD: "/auth/change-password",
        LOGOUT: "/auth/logout",
      },
      USERS: {
        BASE: "/users",
        BY_ID: (id: string) => `/users/${id}`,
      },
      HEALTH: {
        BASE: "/health",
      },
        STUDENTS: {
        DASHBOARD: "/student/dashboard",
        REGISTER: "/student/register",
        REGISTER_ME: "/student/register/me",
        REGISTER_ADMIN: "/student/register/admin",
        REGISTER_BY_ID: (id: string) => `/student/register/${id}`,
        REGISTER_DOWNLOAD: (id: string) => `/student/register/${id}/download`,
      },
        INTERNSHIPS: {
        BASE: "/internships",
        BY_ID: (id: string) => `/internships/${id}`,
        APPLY: (id: string) => `/internships/${id}/apply`,
        ENROLL: (id: string) => `/internships/${id}/enroll`,
        MY_APPLICATIONS: "/internships/applications/my-applications",
        APPROVE_POSTING: (id: string) => `/internships/${id}/approve-posting`,
        REJECT_POSTING: (id: string) => `/internships/${id}/reject-posting`,
        APPLICATIONS: (id: string) => `/internships/${id}/applications`,
        EXPORT_APPLICATIONS: (id: string) =>
          `/internships/${id}/applications/export`,
        PENDING: "/internships/pending",
      },
        ENROLLMENTS: {
        MY_ENROLLMENTS: "/enrollments/my-enrollments",
        ID_CARD: (id: string) => `/enrollments/${id}/id-card`,
        COMPLETE: (id: string) => `/enrollments/${id}/complete`,
        ISSUE_CERTIFICATE: (id: string) => `/enrollments/${id}/issue-certificate`,
        SUBMISSIONS: (id: string) => `/enrollments/${id}/submissions`,
        SUBMISSION_BY_ID: (id: string, submissionId: string) =>
          `/enrollments/${id}/submissions/${submissionId}`,
      },
        CERTIFICATES: {
        MY_CERTIFICATES: "/certificates/my-certificates",
        DOWNLOAD: (id: string) => `/certificates/${id}/download`,
        GRADE: (id: string) => `/certificates/${id}/grade`,
      },
        PAYMENTS: {
        MY_PAYMENTS: "/payments/my-payments",
        RECEIPT: (id: string) => `/payments/${id}`,
        CREATE_ORDER: "/payments/create-order",
        VERIFY_SIGNATURE: "/payments/verify-signature",
        REFUND: "/payments/refund",
        ADMIN_LIST: "/payments",
        WEBHOOK: "/payments/webhook",
      },
        TICKETS: {
        BASE: "/tickets",
        MY_TICKETS: "/tickets/my-tickets",
        BY_ID: (id: string) => `/tickets/${id}`,
      },
        NOTICES: {
        BASE: "/notices",
        BY_ID: (id: string) => `/notices/${id}`,
      },
        INSTRUCTOR: {
        REGISTER: "/instructor/register",
        REGISTER_ME: "/instructor/register/me",
        REGISTER_ADMIN: "/instructor/register/admin",
        REGISTER_BY_ID: (id: string) => `/instructor/register/${id}`,
        IMMERSIONS: "/instructor/immersions",
        IMMERSION_ACCEPT: (id: string) => `/instructor/immersions/${id}/accept`,
        IMMERSION_REJECT: (id: string) => `/instructor/immersions/${id}/reject`,
        SUBMISSIONS: "/instructor/submissions",
        SUBMISSIONS_GRADE: (id: string) => `/instructor/submissions/${id}/grade`,
        DASHBOARD: "/instructor/dashboard",
        PROFILE: "/instructor/profile",
        PROFILES_PENDING: "/instructor/profiles/pending",
        PROFILES_APPROVE: (id: string) => `/instructor/profiles/${id}/approve`,
        PROFILES_REJECT: (id: string) => `/instructor/profiles/${id}/reject`,
        MY_INTERNSHIPS: "/instructor/my-internships",
        MY_STUDENTS: "/instructor/my-students",
        ID_CARD: "/instructor/id-card",
        DOWNLOAD_ID_CARD: "/instructor/id-card/download",
        APPROVE_APPLICATION: (id: string, appId: string) =>
          `/internships/${id}/applications/${appId}/approve`,
        REJECT_APPLICATION: (id: string, appId: string) =>
          `/internships/${id}/applications/${appId}/reject`,
        RUNNING_INTERNSHIPS: "/internships",
      },
        EMERSION: {
        REGISTER: "/immersion/register",
        DASHBOARD: "/immersion-participant/dashboard",
        PROFILE: "/immersion-participant/profile",
        APPLICATION: "/immersion-participant/application",
        APPLICATION_MY: "/immersion-participant/application/my",
        APPLICATION_STATUS: "/immersion-participant/application-status",
        APPLICATION_DOWNLOAD: "/immersion-participant/application/download",
        CERTIFICATES: {
          MY: "/immersion/certificates/my",
          DOWNLOAD: (id: string) => `/immersion/certificates/${id}/download`,
          GRADE: (id: string) => `/immersion/certificates/${id}/grade`,
        },
        ID_CARD: {
          MY: "/immersion-participant/id-card",
          BY_APPLICATION_ID: (id: string) =>
            `/immersion/applications/${id}/id-card`,
          DOWNLOAD: (id: string) => `/immersion-id-cards/${id}/download`,
        },
        PAYMENTS: {
          MY_PAYMENTS: "/immersion/payments/my-payments",
          RECEIPT: (id: string) => `/immersion/payments/${id}`,
          CREATE_ORDER: "/immersion/payments/create-order",
          VERIFY_SIGNATURE: "/immersion/payments/verify-signature",
          REFUND: "/immersion/payments/refund",
        },
        PROGRAMS: {
          LIST: "/immersion",
          APPLY: (id: string) => `/immersion/programs/${id}/apply`,
        },
      },
      RECRUIT: {
        REGISTER: "/recruit-user/register",
        PROFILE: "/recruit-user/profile",
        APPLICATIONS: "/recruit-user/applications",
        APPLICATION_BY_ID: (id: string) => `/recruit-user/applications/${id}`,
        APPLICATION_PDF: (id: string) => `/recruit-user/applications/${id}/pdf`,
        SETTINGS: "/recruit-user/settings",
        OPENINGS: "/recruit-user/openings",
        APPLY: (openingId: string) => `/recruit-user/openings/${openingId}/apply`,
        EDUCATION: "/recruit-user/profile/education",
        EDUCATION_BY_ID: (id: string) => `/recruit-user/profile/education/${id}`,
        EXPERIENCE: "/recruit-user/profile/experience",
        EXPERIENCE_BY_ID: (id: string) => `/recruit-user/profile/experience/${id}`,
        DOCUMENTS: "/recruit-user/profile/documents",
        REFERENCES: "/recruit-user/profile/references",
        REFERENCE_BY_ID: (id: string) => `/recruit-user/profile/references/${id}`,
        SPECIFIC_INFO: "/recruit-user/profile/specific-info",
      },
        SUPER_ADMIN: {
        RECRUIT_REGISTRATIONS: "/recruit-user/profile/admin",
        JOB_OPPORTUNITIES: "/job-opportunities",
        JOB_OPPORTUNITY_BY_ID: (id: string) => `/job-opportunities/${id}`,
        JOB_OPPORTUNITY_EXPORT_APPLICATIONS: (id: string) =>
          `/job-opportunities/${id}/applications/export`,
        JOB_APPLICATIONS: "/job-applications",
        JOB_APPLICATION_STATUS: (id: string) => `/job-applications/${id}/status`,
        MEDIA_PHOTOS: "/media/photos",
        MEDIA_PHOTOS_BY_ID: (id: string) => `/media/photos/${id}`,
        MEDIA_VIDEOS: "/media/videos",
        MEDIA_VIDEOS_BY_ID: (id: string) => `/media/videos/${id}`,
        MEDIA_NEWSPAPERS: "/media/newspapers",
        MEDIA_NEWSPAPERS_BY_ID: (id: string) => `/media/newspapers/${id}`,
        MEDIA_ONLINE_LINKS: "/media/online-links",
        MEDIA_ONLINE_LINKS_BY_ID: (id: string) => `/media/online-links/${id}`,
        BLOGS: "/blogs",
        BLOGS_BY_ID: (id: string) => `/blogs/${id}`,
        REVIEWS_PENDING: "/reviews/pending",
        REVIEW_APPROVE: (id: string) => `/reviews/${id}/approve`,
        REVIEW_BY_ID: (id: string) => `/reviews/${id}`,
        DONATIONS_ADMIN: "/donations/admin",
        DONATIONS_ADMIN_EXPORT: "/donations/admin/export",
        TICKETS_ADMIN: "/tickets/admin",
        IMMERSION_APPLICATIONS: "/immersion/applications",
        IMMERSION_APPLICATION_BY_ID: (id: string) =>
          `/immersion/applications/${id}`,
        IMMERSION_STATUS: (id: string) => `/immersion/applications/${id}/status`,
        IMMERSION_ASSIGN_MENTOR: (id: string) =>
          `/immersion/applications/${id}/assign-mentor`,
        IMMERSION_ISSUE_CERTIFICATE: (id: string) =>
          `/immersion/applications/${id}/issue-certificate`,
        IMMERSIONS: "/immersion",
        IMMERSIONS_BY_ID: (id: string) => `/immersion/${id}`,
        IMMERSION_EXPORT_APPLICATIONS: (id: string) =>
          `/immersion/${id}/applications/export`,
        IMMERSION_CATEGORIES: "/immersion/categories",
        LEAD_INTERESTS: (id: string) => `/internships/${id}/interests`,
        RUNNING_INTERNSHIPS: "/internships",
        RUNNING_INTERNSHIPS_BY_ID: (id: string) => `/internships/${id}`,
      },
      REVIEWS: {
        MY_REVIEWS: "/reviews/my-reviews",
      },
      FEEDBACK: {
        BASE: "/feedback",
        MY_FEEDBACKS: "/feedback/my-feedbacks",
      },
      ID_CARDS: {
        BY_ID: (id: string) => `/id-cards/${id}`,
      },
    };

function mapBackendProfileToFrontend(
      profile: Record<string, unknown> | null,
    ): Record<string, unknown> | null {
      if (!profile) return null;
      return {
        id: profile.id,
        userId: profile.userId,
        emersionId:
          ((profile.user as Record<string, unknown>)?.registrationNo as string) ||
          (profile.emersionId as string) ||
          "",
        fullName: profile.fullName,
        fatherSpouseName: profile.fatherMotherName,
        dob: profile.dateOfBirth
          ? new Date(profile.dateOfBirth as string | number | Date)
              .toISOString()
              .split("T")[0]
          : "",
        gender:
          profile.gender === "MALE"
            ? "Male"
            : profile.gender === "FEMALE"
              ? "Female"
              : "Transgender",
        mobileNo: profile.mobileNumber,
        alternateMobileNo: profile.alternateMobileNo ?? null,
        emailAddress: profile.emailAddress ?? "",
        photoUrl: profile.passportPhotoUrl,
        photoName: profile.passportPhotoUrl ? "passport_photo.jpg" : null,
        signatureUrl: profile.signatureUrl,
        signatureName: profile.signatureUrl ? "signature.jpg" : null,
        agreeTerms: profile.agreeTerms ?? false,
        academicDetails: (profile.academicDetail as Record<string, unknown>)
          ? [
              {
                schoolCollegeName:
                  (profile.academicDetail as Record<string, unknown>)
                    ?.schoolCollegeName || "",
                boardUniversity:
                  (profile.academicDetail as Record<string, unknown>)
                    ?.boardUniversity || "",
                yearOfPassing:
                  (profile.academicDetail as Record<string, unknown>)
                    ?.yearOfPassing || "",
                gradeDivision:
                  (profile.academicDetail as Record<string, unknown>)
                    ?.gradeDivision || "",
              },
            ]
          : [],
        identityProofUrl: profile.resumeUrl || null,
        identityProofName: profile.resumeUrl ? "resume.pdf" : null,
        educationCertUrl: profile.nocUrl || null,
        educationCertName: profile.nocUrl ? "noc.pdf" : null,
        currentAddressLocal:
          (profile.currentAddressSameAsPerm
            ? profile.permLocalArea
            : profile.currLocalArea) || "",
        currentAddressDistrict:
          (profile.currentAddressSameAsPerm
            ? profile.permDistrict
            : profile.currDistrict) || "",
        currentAddressState:
          (profile.currentAddressSameAsPerm
            ? profile.permState
            : profile.currState) || "",
        currentAddressCountry:
          (profile.currentAddressSameAsPerm
            ? profile.permCountry
            : profile.currCountry) || "India",
        currentAddressPinCode:
          (profile.currentAddressSameAsPerm
            ? profile.permPinCode
            : profile.currPinCode) || "",
        sameAsCurrentAddress: profile.currentAddressSameAsPerm,
        permAddressLocal: (profile.permLocalArea || "") as string,
        permAddressDistrict: (profile.permDistrict || "") as string,
        permAddressState: (profile.permState || "") as string,
        permAddressCountry: (profile.permCountry || "India") as string,
        permAddressPinCode: (profile.permPinCode || "") as string,
      };
    }

const mapQualEnum = (q: string): string => {
      const val = q.toUpperCase().replace(/\s+/g, "_").replace(/\./g, "");
      if (val.includes("MATRICULATION")) return "MATRICULATION";
      if (val.includes("INTERMEDIATE")) return "INTERMEDIATE";
      if (val.includes("PHD_PASS_OUT")) return "PHD_PASS_OUT";
      if (val.includes("UNDER_PHD") || val.includes("UNDER_PH_D"))
        return "UNDER_PHD";
      if (val.includes("MPHIL_PASS_OUT") || val.includes("M_PHIL_PASS_OUT"))
        return "MPHIL_PASS_OUT";
      if (val.includes("UNDER_MPHIL") || val.includes("UNDER_M_PHIL"))
        return "UNDER_MPHIL";
      if (val.includes("POST_GRADUATE_PASS_OUT")) return "POST_GRADUATE_PASS_OUT";
      if (val.includes("UNDER_POST_GRADUATE")) return "UNDER_POST_GRADUATE";
      if (val.includes("GRADUATE_PASS_OUT")) return "GRADUATE_PASS_OUT";
      if (val.includes("UNDER_GRADUATE")) return "UNDER_GRADUATE";
      return "UNDER_GRADUATE";
    };

const EMERSION_QUERY_KEYS = {
      ALL: ["emersion"] as const,
      DASHBOARD: () => ["emersion", "dashboard"] as const,
      PROFILE: () => ["emersion", "profile"] as const,
      APPLICATION_MY: () => ["emersion", "application", "my"] as const,
      APPLICATION_STATUS: () => ["emersion", "application-status"] as const,
      NOTICES: () => ["emersion", "notices"] as const,
      MY_TICKETS: () => ["emersion", "my-tickets"] as const,
      MY_CERTIFICATES: () => ["emersion", "my-certificates"] as const,
      MY_ID_CARD: () => ["emersion", "my-id-card"] as const,
      APPLICATION_ID_CARD: (applicationId: string) =>
        ["emersion", "id-card", applicationId] as const,
      MY_PAYMENTS: (params?: ListMyEmersionPaymentsParams) =>
        ["emersion", "my-payments", params] as const,
      PAYMENT_RECEIPT: (id: string) => ["emersion", "payment-receipt", id] as const,
      PROGRAMS: (params?: {
        search?: string;
        filter?: string;
        type?: string;
        categoryId?: string;
      }) => ["emersion", "programs", params] as const,
    };

interface InstructorDashboardStatsData {
      totalInternshipsAssignedByI3: number;
      totalInternshipsPostYourself: number;
      myTotalInterns: number;
      totalInternshipDoneByMe: number;
      totalImmersionDoneByMe: number;
      totalPaymentEarnings: number;
    }

interface StudentApplication {
      id: string;
      internshipId?: string;
      internship?: {
        id: string;
      };
      studentName?: string;
      student?: {
        fullName: string;
        email: string;
      };
      studentEmail?: string;
      appliedAt?: string;
      status?: string;
    }

interface ProjectSubmissionObject {
      id: string;
      enrollmentId: string;
      projectTitle: string;
      projectUrl: string;
      comments: string | null;
      status: "PENDING" | "GRADED";
      grade: string | null;
      feedback: string | null;
      gradedById: string | null;
      gradedAt: string | null;
      createdAt: string;
      updatedAt: string;
      student?: {
        fullName: string;
        email: string;
      };
    }

interface InstructorDashboardStatsResponse {
      success: boolean;
      data: {
        stats: InstructorDashboardStatsData;
        recentApplications: StudentApplication[];
        recentStudents: Record<string, unknown>[];
        assignedInternships: Record<string, unknown>[];
        recentNotices: Record<string, unknown>[];
        recentSubmissions: ProjectSubmissionObject[];
        recentFeedbacks: Record<string, unknown>[];
        assignedImmersions: Record<string, unknown>[];
        recentImmersionRegistrations: Record<string, unknown>[];
      };
    }

interface InstructorProfileData {
      qualification: string;
      isApproved: boolean;
      experience?: string;
      specialization?: string;
      bio?: string;
      resumeUrl?: string;
    }

interface InstructorProfileResponse {
      success: boolean;
      data: InstructorProfileData;
    }

interface TInstructorQualification {
      id?: string;
      highestQualification: string;
      specialization: string;
      universityName: string;
      yearOfCompletion: string;
      percentage: string;
    }

interface InstructorRegistrationResponse {
      id: string;
      instructorId: string;
      fullName: string;
      fatherSpouseName: string;
      dob: string;
      gender: string;
      mobileNo: string;
      alternateMobileNo: string | null;
      currentAddressLocal: string;
      currentAddressDistrict: string;
      currentAddressState: string;
      currentAddressCountry: string;
      currentAddressPinCode: string;
      sameAsCurrentAddress: boolean;
      permAddressLocal: string;
      permAddressDistrict: string;
      permAddressState: string;
      permAddressCountry: string;
      permAddressPinCode: string;
      currentOrganization: string;
      currentDesignation: string;
      totalWorkExperience: string;
      teachingExperience: string;
      internshipExperience: string;
      mentorshipAreas: string;
      preferredInternLevel: string[];
      maxInterns: string;
      mentorshipMode: string[];
      availability: string;
      selfIntroduction: string;
      photoUrl: string;
      photoName: string;
      identityProofUrl: string | null;
      identityProofName: string | null;
      educationCertUrl: string | null;
      educationCertName: string | null;
      experienceCertUrl: string | null;
      experienceCertName: string | null;
      agreeTerms: boolean;
      createdAt: string;
      updatedAt: string;
      userId: string;
      qualifications: TInstructorQualification[];
    }

type GetInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

type SubmitInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

interface TInstructorAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

interface InstructorRegistrationPayload {
      fullName: string;
      fatherSpouseName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      mobileNo: string;
      alternateMobileNo?: string;
      currentAddress: TInstructorAddress;
      sameAsCurrentAddress: boolean;
      permanentAddress: TInstructorAddress;
      qualifications: TInstructorQualification[];
      currentOrganization?: string;
      currentDesignation?: string;
      totalWorkExperience?: string;
      teachingExperience?: string;
      internshipExperience?: string;
      mentorshipAreas: string;
      preferredInternLevel: string[];
      maxInterns: string;
      mentorshipMode: string[];
      availability: string;
      selfIntroduction: string;
      photoBase64: string;
      photoName: string;
      identityProofBase64?: string;
      identityProofName?: string;
      educationCertBase64?: string;
      educationCertName?: string;
      experienceCertBase64?: string;
      experienceCertName?: string;
      agreeTerms: boolean;
    }

type UpdateInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

type InstructorRegistrationUpdatePayload = Partial<
      Omit<
        InstructorRegistrationPayload,
        | "photoBase64"
        | "photoName"
        | "identityProofBase64"
        | "identityProofName"
        | "educationCertBase64"
        | "educationCertName"
        | "experienceCertBase64"
        | "experienceCertName"
      >
    >;

interface ListMyInternshipsParams {
      source?: "i3" | "self";
    }

type InternshipType = "PAID" | "STIPEND" | "FREE";

interface InternshipMentor {
      id: string;
      name: string;
      email: string;
    }

interface InternshipPublic {
      id: string;
      title: string;
      description: string;
      companyName: string;
      location: string;
      type: InternshipType;
      price: number | null;
      stipendAmount: number | null;
      duration: string;
      isActive: boolean;
      startDate: string | null;
      onboardingDetails: string | null;
      createdAt: string;
      updatedAt: string;
      createdById: string;
      mentorId: string | null;
      mentor: InternshipMentor | null;

        category: "RUNNING" | "ON_CAMPUS" | "VIRTUAL";
      department?: string | null;
      modules?: string[] | string | null;
      tools?: string[] | string | null;
      skills?: string[] | string | null;
      projectFocus?: string | null;
      credits?: number | string | null;
      contact?: string | null;
      mode?: string | null;
      remoteDetails?: string | null;
      isApproved?: boolean;
      approvedAt?: string | null;
    }

interface ListInternshipsResponse {
      success: boolean;
      data: InternshipPublic[];
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }

interface GetInternshipByIdResponse {
      success: boolean;
      data: InternshipPublic;
    }

interface CreateInternshipPayload {
      title: string;
      description: string;
      companyName: string;
      location: string;
      type: InternshipType;
      price?: number | null;
      stipendAmount?: number | null;
      duration: string;
      startDate?: string | null;
      lastDate?: string | null;
      onboardingDetails?: string | null;
      category: "RUNNING" | "ON_CAMPUS" | "VIRTUAL";

      department?: string;
      modules?: string[] | string;
      tools?: string[] | string;
      skills?: string[] | string;
      projectFocus?: string;
      credits?: number | string;
      contact?: string;

      timePeriod?: string;
      qualification?: string;
      facilities?: string;
      careerOpportunity?: string;
      organizer?: string;
      instructorId?: string;

      mode?: string;
      remoteDetails?: string;
    }

interface ListMyStudentsParams {
      status?: string;
    }

interface ImmersionRegistrationObject {
      id: string;
      status: "PENDING" | "APPROVED" | "REJECTED";
      remarks: string | null;
      registeredAt: string;
      studentId: string;
      immersionId: string;
      student?: {
        fullName: string;
        email: string;
      };
    }

interface UpdateImmersionStatusPayload {
      status: "APPROVED" | "REJECTED";
      remarks?: string;
    }

interface ListSubmissionsResponse {
      success: boolean;
      data: ProjectSubmissionObject[];
    }

interface GradeSubmissionResponse {
      success: boolean;
      message?: string;
      data?: ProjectSubmissionObject;
    }

interface GradeSubmissionPayload {
      grade: string;
      feedback?: string;
    }

interface Notice {
      id: string;
      noticeNumber: string;
      date: string;
      title: string;
      category: string;
      description: string;
      pdfUrl?: string | null;
      pdfPublicId?: string | null;
      senderId: string;
      sender?: {
        id: string;
        name: string;
        email: string;
        role: string;
      } | null;
      createdAt: string;
      updatedAt: string;
      content?: string;
    }

interface ListNoticesResponse {
      success: boolean;
      data: Notice[];
    }

interface CreateNoticeResponse {
      success: boolean;
      data: Notice;
    }

interface CreateNoticePayload {
      title: string;
      content: string;
      category?: string;
      published?: boolean;
    }

interface TicketObject {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "CLOSED";
      createdAt: string;
    }

type ListTicketsResponse = ApiSuccess<TicketObject[]>;

type CreateTicketResponse_2 = ApiSuccess<TicketObject>;

interface CreateTicketPayload_2 {
      title: string;
      description: string;
    }

const INSTRUCTOR_QUERY_KEYS = {
      ALL: ["instructors"] as const,
      STATS: () => ["instructors", "stats"] as const,
      PROFILE: () => ["instructors", "profile"] as const,
      REGISTRATION_ME: () => ["instructors", "registration", "me"] as const,
      INTERNSHIPS: (params?: ListMyInternshipsParams) =>
        ["instructors", "internships", params] as const,
      PENDING_INTERNSHIPS: ["instructors", "internships", "pending"] as const,
      INTERNSHIP_APPLICATIONS: (id: string) =>
        ["instructors", "internship", id, "applications"] as const,
      STUDENTS: (params?: ListMyStudentsParams) =>
        ["instructors", "students", params] as const,
      IMMERSIONS: () => ["instructors", "immersions"] as const,
      IMMERSION_REGS: (immersionId: string) =>
        ["instructors", "immersions", immersionId, "registrations"] as const,
      SUBMISSIONS: () => ["instructors", "submissions"] as const,
      NOTICES: () => ["instructors", "notices"] as const,
      TICKETS: () => ["instructors", "tickets"] as const,
      ID_CARD: () => ["instructors", "id-card"] as const,
    };

interface GetInstructorsParams {
      page?: number;
      limit?: number;
      gender?: string;
      search?: string;
    }

type ListInstructorRegistrationsResponse = ApiSuccess<
      InstructorRegistrationResponse[]
    >;

type DeleteInstructorRegistrationResponse = ApiSuccess<{
      message: string;
    }>;

interface PendingInstructorProfile {
      id: string;
      isApproved: boolean;
      qualification: string;
      experience?: string;
      specialization?: string;
      bio?: string;
      resumeUrl?: string;
      user?: {
        name: string;
        email: string;
      };
    }

interface ListPendingInstructorsResponse {
      success: boolean;
      data: PendingInstructorProfile[];
    }

type ApproveInstructorResponse = ApiSuccess<{ message: string }>;

type RejectInstructorResponse = ApiSuccess<{ message: string }>;

type TMeta_8 = {
      total: number;
      limit: number;
      page: number;
    };

type TSectionItems_3 = {
      id: string;
      label: string;
      href: string;
      link?: string;
      icon?: LucideIcon;
      count?: number;
    };

function formatInternshipCode_5(
      code?: string | null,
      companyName?: string | null,
    ): string {
      if (!code) return "IN2026XX10001";

      const trimmed = code.trim();
      if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }

      const sourceText = companyName && companyName.trim() ? companyName : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }

      let hash = 0;
      for (let i = 0; i < trimmed.length; i++) {
        hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
      }
      const numericSuffix = (Math.abs(hash) % 90000) + 10000;

      return `IN2026${initials}${numericSuffix}`;
    }

const PostInternshipButton = () => {
      return (
        <Link href="/instructor/internships/new" className="w-full sm:w-auto">
          <Button className="h-9 w-full cursor-pointer justify-center gap-2 font-semibold sm:w-auto">
            <Sparkles_2 className="size-4" />
            Post New Internship
          </Button>
        </Link>
      );
    };

type TMeta_7 = {
      total: number;
      limit: number;
      page: number;
    };

function formatImmersionCode_11(
      code?: string | null,
      programTitle?: string | null,
    ): string {
      if (!code) return "IM2026XX10001";
      const trimmed = code.trim();
      if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }
      const sourceText =
        programTitle && programTitle.trim() ? programTitle : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }
      const numericPart = code.replace(/[^0-9]/g, "");
      let index = "81251";
      if (numericPart.length >= 5) {
        index = numericPart.slice(-5);
      } else if (numericPart.length > 0) {
        index = numericPart.padStart(5, "0");
      } else {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
          hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        index = Math.abs((hash % 90000) + 10000).toString();
      }
      return `IM2026${initials}${index}`;
    }

interface ImmersionProgram {
      id: string;
      category: string;
      title: string;
      description: string;
      location: string;
      period: string;
      facilities: string[];
      benefits: string[];
      fees: string;
    }

const IMMERSION_PROGRAMS: ImmersionProgram[] = [
      {
        id: "rural-dev",
        category: "Rural Development Immersion",
        title: "Rural Livelihoods & Enterprise Immersion",
        description:
          "Work with rural cooperatives, self-help groups, and micro-enterprises to understand village economy structures, supply chains, and grassroots sustainable models.",
        location: "Rajasthan / Madhya Pradesh",
        period: "3 Weeks",
        facilities: [
          "Shared community homestays",
          "Traditional home-cooked meals",
          "Local field coordination support",
          "Language translators",
        ],
        benefits: [
          "Field experience in rural microfinance",
          "Understanding agricultural value chains",
          "Community Development Certificate",
          "Guidance from senior NGO experts",
        ],
        fees: "₹5,000 / $75",
      },
      {
        id: "village-imm",
        category: "Village Immersion",
        title: "Village Life & Culture Immersion",
        description:
          "Experience authentic rural living, traditional agricultural practices, water harvesting systems, and local community-led resource management in remote areas.",
        location: "Uttarakhand Himalayan Villages",
        period: "2 Weeks",
        facilities: [
          "Homestays with local families",
          "Traditional mountain food",
          "Trekking and field navigation guides",
          "Emergency medical kit access",
        ],
        benefits: [
          "Cultural adaptation and survival skills",
          "Insight into mountain agriculture systems",
          "Himalayan Heritage Certificate",
          "Opportunities for local volunteer projects",
        ],
        fees: "₹4,000 / $60",
      },
      {
        id: "social-work",
        category: "Social Work Immersion",
        title: "Community Empowerment & Social Work",
        description:
          "Partner with local NGOs and community centers to support welfare campaigns, youth mentoring, educational drives, and women's empowerment initiatives.",
        location: "Delhi NCR / Maharashtra Urban Slums",
        period: "4 Weeks",
        facilities: [
          "Hostel accommodation",
          "Co-working space & internet access",
          "Shared kitchen facilities",
          "Daily transport to site",
        ],
        benefits: [
          "Social impact documentation skills",
          "Hands-on experience in advocacy & counseling",
          "Social Impact Leadership Certificate",
          "Reference letter from a registered NGO",
        ],
        fees: "₹4,500 / $65",
      },
      {
        id: "research",
        category: "Research Immersion",
        title: "Socio-Economic Research & Policy Evaluation",
        description:
          "Undertake empirical research, conduct field surveys, collect qualitative/quantitative data, and draft case studies on critical socio-economic development topics.",
        location: "Hybrid / Partner Academic Centers",
        period: "6 Weeks",
        facilities: [
          "Access to academic libraries & archives",
          "Co-working desk space",
          "High-speed internet & printer usage",
          "Mentorship from PhD researchers",
        ],
        benefits: [
          "Potential co-authorship on research papers",
          "Mastery in research methodology & tools",
          "Academic Research Certificate",
          "Access to i3 data repositories",
        ],
        fees: "₹6,000 / $90",
      },
      {
        id: "gov-policy",
        category: "Governance/Policy Immersion",
        title: "Grassroots Governance & Panchayati Raj Systems",
        description:
          "Study grassroots administration, policy execution, and rural governance systems. Observe how Central/State schemes are implemented by Panchayats.",
        location: "District Headquarters in Uttar Pradesh / Bihar",
        period: "3 Weeks",
        facilities: [
          "Government guest house stay",
          "Local liaison & administrative permissions",
          "Transport to block and Panchayat offices",
          "Briefing materials on local governance",
        ],
        benefits: [
          "Deep understanding of public policy challenges",
          "Networking with local administrative officers",
          "Grassroots Governance Certificate",
          "Recommendation letter from local authorities",
        ],
        fees: "₹5,500 / $80",
      },
      {
        id: "education",
        category: "Education Immersion",
        title: "Primary Education & Creative Learning Outreach",
        description:
          "Teach at underserved or rural primary schools using creative pedagogical tools, design low-cost teaching aids, and run extracurricular learning camps.",
        location: "Rural Karnataka / Tamil Nadu",
        period: "4 Weeks",
        facilities: [
          "School staff quarters boarding",
          "School cafeteria meal plan",
          "Teaching supplies and creative kit",
          "Pre-immersion teacher training",
        ],
        benefits: [
          "Pedagogy and classroom management skills",
          "Insights into child psychology & rural education",
          "Educational Outreach Certificate",
          "Appreciation certificate from school management",
        ],
        fees: "₹4,000 / $60",
      },
      {
        id: "health-med",
        category: "Health & Medicine Immersion",
        title: "Public Health & Rural Medical Care Outreach",
        description:
          "Assist in rural health camps, participate in public health awareness drives, compile medical registries, and study local community healthcare delivery.",
        location: "Primary Health Centers in Gujarat / Kerala",
        period: "4 Weeks",
        facilities: [
          "Medical center dormitory stay",
          "Meals at health center mess",
          "Clinical mentor and coordinator support",
          "Safety gear & immunization instructions",
        ],
        benefits: [
          "Exposure to low-resource healthcare delivery",
          "Understanding of community & preventive medicine",
          "Public Health Immersion Certificate",
          "Hands-on health campaign planning",
        ],
        fees: "₹6,000 / $90",
      },
      {
        id: "nature-env",
        category: "Nature & Environment Immersion",
        title: "Ecology, Forestry & Sustainable Agriculture",
        description:
          "Participate in conservation efforts, organic farming workshops, waste management programs, biodiversity mapping, and sustainable forestry projects.",
        location: "Western Ghats / Eco-farms in Himachal Pradesh",
        period: "2 Weeks",
        facilities: [
          "Eco-cottages / Camping tent stay",
          "Organic farm-fresh meals",
          "Outdoor safety gear and boots",
          "Guided forest hikes",
        ],
        benefits: [
          "Hands-on conservation and organic farming skills",
          "Understanding biodiversity & sustainable ecosystems",
          "Environmental Conservation Certificate",
          "Field training in permaculture",
        ],
        fees: "₹5,000 / $75",
      },
      {
        id: "spiritual",
        category: "Spiritual Immersion",
        title: "Heritage, Yoga & Spiritual Mindfulness",
        description:
          "Discover ancient spiritual heritage, participate in daily yoga & meditation practices, study local traditions, and experience holistic wellness routines.",
        location: "Rishikesh / Varanasi",
        period: "1 Week",
        facilities: [
          "Ashram accommodation",
          "Strictly vegetarian Satvik meals",
          "Yoga mats and instruction guide",
          "Guided visits to spiritual landmarks",
        ],
        benefits: [
          "Holistic wellness and stress management",
          "Deep understanding of Indian spiritual heritage",
          "Spiritual & Mindfulness Certificate",
          "Daily practice guidelines for post-program",
        ],
        fees: "₹7,500 / $110",
      },
      {
        id: "ngo-field",
        category: "NGO Field Immersion",
        title: "NGO Operations & Grassroots Project Management",
        description:
          "Learn the administrative and execution aspects of non-profits, including fundraising campaigns, donor relations, program design, and field reporting.",
        location: "Major Indian Cities / NGO Rural Hubs",
        period: "5 Weeks",
        facilities: [
          "Shared NGO accommodation",
          "Dedicated office desk space",
          "Daily field coordinator guidance",
          "Local travel reimbursement for project work",
        ],
        benefits: [
          "Insights into non-profit business models",
          "Hands-on experience in community organizing",
          "NGO Operations Certificate",
          "Letter of Recommendation from NGO Trustees",
        ],
        fees: "₹5,000 / $75",
      },
      {
        id: "other",
        category: "Other",
        title: "Custom Immersion Projects",
        description:
          "Work with our academic and field coordinators to design a custom experiential program that fits your specific learning objectives or research project.",
        location: "Tailored based on request",
        period: "Flexible (1-8 Weeks)",
        facilities: [
          "Customizable accommodation & food",
          "Dedicated coordinator and field guide",
          "Specialized equipment based on project",
          "Liaison with local authorities",
        ],
        benefits: [
          "Tailored learning outcomes matching your curriculum",
          "Unique fieldwork exposure in your niche",
          "Custom Immersion Certificate",
          "One-on-one professional mentorship",
        ],
        fees: "Based on project scope",
      },
    ];

function formatImmersionCode_8(
      code?: string | null,
      programTitle?: string | null,
    ): string {
      if (!code) return "IM2026XX10001";
      const trimmed = code.trim();
      if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }
      const sourceText =
        programTitle && programTitle.trim() ? programTitle : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }
      const numericPart = code.replace(/[^0-9]/g, "");
      let index = "81251";
      if (numericPart.length >= 5) {
        index = numericPart.slice(-5);
      } else if (numericPart.length > 0) {
        index = numericPart.padStart(5, "0");
      } else {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
          hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        index = Math.abs((hash % 90000) + 10000).toString();
      }
      return `IM2026${initials}${index}`;
    }

function formatHumanReadableDate_13(date?: string | null): string {
      if (!date) return "N/A";
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) return "N/A";
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

interface IEmersionStatusChipProps {
      status?: string | null;
    }

const EmersionStatusChip: React_4.FunctionComponent<IEmersionStatusChipProps> = ({
      status,
    }) => {
      switch (status) {
        case "APPROVED":
          return (
            <Badge className="gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 font-semibold text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
              <CheckCircle2_2 className="size-3" />
              Approved
            </Badge>
          );
        case "UNDER_REVIEW":
          return (
            <Badge className="gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 font-semibold text-blue-600 hover:bg-blue-500/15 dark:text-blue-400">
              <FileText_2 className="size-3" />
              Under Review
            </Badge>
          );
        case "SUBMITTED":
          return (
            <Badge className="gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 font-semibold text-amber-600 hover:bg-amber-500/15 dark:text-amber-400">
              <Clock className="size-3" />
              Submitted
            </Badge>
          );
        case "REJECTED":
          return (
            <Badge
              variant="destructive"
              className="gap-1 rounded-full font-semibold"
            >
              <XCircle_2 className="size-3" />
              Rejected
            </Badge>
          );
        default:
          return (
            <Badge className="gap-1 rounded-full border border-gray-500/20 bg-gray-500/10 font-semibold text-gray-600 hover:bg-gray-500/15 dark:text-gray-400">
              <AlertCircle_2 className="size-3" />
              Draft
            </Badge>
          );
      }
    };

const StatusChip_10 = EmersionStatusChip;

interface ApplicationActionsProps {
      application: EmersionApplicationData;
    }

interface MockSubmission {
      id: string;
      projectTitle: string;
      projectUrl: string;
      comments?: string;
      submittedAt: string;
      status: string;
    }

function DropdownMenu_4({
      ...props
    }: React_3.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
      return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
    }

function DropdownMenuTrigger_4({
      ...props
    }: React_3.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
      return (
        <DropdownMenuPrimitive.Trigger suppressHydrationWarning
          data-slot="dropdown-menu-trigger"
          {...props}
        />
      );
    }

interface ApplicationDetailDialogProps {
      application: EmersionApplicationData | null;
      open: boolean;
      onOpenChange: (open: boolean) => void;
    }

function formatHumanReadableDate(date?: string | null): string {
      if (!date) return "N/A";
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) return "N/A";
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

function formatImmersionCode(
      code?: string | null,
      programTitle?: string | null,
    ): string {
      if (!code) return "IM2026XX10001";
      const trimmed = code.trim();
      if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }
      const sourceText =
        programTitle && programTitle.trim() ? programTitle : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }
      const numericPart = code.replace(/[^0-9]/g, "");
      let index = "81251";
      if (numericPart.length >= 5) {
        index = numericPart.slice(-5);
      } else if (numericPart.length > 0) {
        index = numericPart.padStart(5, "0");
      } else {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
          hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        index = Math.abs((hash % 90000) + 10000).toString();
      }
      return `IM2026${initials}${index}`;
    }

interface PaymentModalProps {
      program: EmersionProgram;
      applicationId: string;
      open: boolean;
      onClose: () => void;
      onCancel: () => void;
    }

function loadRazorpayScript_2(): Promise<boolean> {
      return new Promise((resolve) => {
        if ((window as any).Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    }

interface RazorpayResponse {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }

function Dialog_11({
      ...props
    }: React_3.ComponentProps<typeof SheetPrimitive.Root>) {
      return <SheetPrimitive.Root data-slot="dialog" {...props} />;
    }

function formatHumanReadableDate_12(date?: string | null): string {
      if (!date) return "N/A";
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) return "N/A";
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

interface ImmersionColumnsProps {
      onAccept: (id: string) => void;
      onReject: (id: string) => void;
      isAccepting?: boolean;
      isRejecting?: boolean;
    }

function formatImmersionCode_10(
      code?: string | null,
      programTitle?: string | null,
    ): string {
      if (!code) return "IM2026XX10001";
      const trimmed = code.trim();
      if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }
      const sourceText =
        programTitle && programTitle.trim() ? programTitle : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }
      const numericPart = code.replace(/[^0-9]/g, "");
      let index = "81251";
      if (numericPart.length >= 5) {
        index = numericPart.slice(-5);
      } else if (numericPart.length > 0) {
        index = numericPart.padStart(5, "0");
      } else {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
          hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        index = Math.abs((hash % 90000) + 10000).toString();
      }
      return `IM2026${initials}${index}`;
    }

function DropdownMenu_5({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
      return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
    }

function DropdownMenuTrigger_5({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
      return (
        <DropdownMenuPrimitive.Trigger suppressHydrationWarning
          data-slot="dropdown-menu-trigger"
          {...props}
        />
      );
    }

interface ColumnsProps {
      onReviewDetails: (item: InternshipPublic) => void;
      onApprove?: (id: string) => void;
      onReject?: (id: string) => void;
      isApproving?: boolean;
      isRejecting?: boolean;
    }

function formatDate_5(
      date: Date | string | number | undefined | null,
      options?: Intl.DateTimeFormatOptions,
    ): string {
      if (!date) return "";
      const d =
        typeof date === "string" || typeof date === "number"
          ? new Date(date)
          : date;
      if (isNaN(d.getTime())) return "";
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...options,
      });
    }

interface ITypeChipProps {
      type?: string;
    }

const TypeChip_2: React_4.FunctionComponent<ITypeChipProps> = ({ type }) => {
      const isPaid = type?.toUpperCase() === "PAID";
      return (
        <Badge
          variant="outline"
          className={
            isPaid
              ? "rounded-full border-emerald-500/30 bg-emerald-500/10 px-2 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
              : "rounded-full border-slate-200 bg-slate-100 px-2 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400"
          }
        >
          {type || "FREE"}
        </Badge>
      );
    };

const TypeChip_3 = TypeChip_2;

function DropdownMenu_6({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
      return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
    }

function DropdownMenuTrigger_6({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
      return (
        <DropdownMenuPrimitive.Trigger suppressHydrationWarning
          data-slot="dropdown-menu-trigger"
          {...props}
        />
      );
    }

const columns_2 = ({
      onReviewDetails,
      onApprove,
      onReject,
      isApproving,
      isRejecting,
    }: ColumnsProps): ColumnDef<InternshipPublic>[] => [
      {
        id: "srNo",
        header: "Sr. No.",
        cell: ({ row }) => (
          <span className="text-muted-foreground text-xs font-medium">
            {row.index + 1}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Post Date",
        cell: ({ row }) => (
          <span className="text-foreground text-xs font-medium">
            {formatDate_5(row.original.createdAt)}
          </span>
        ),
      },
      {
        id: "internshipId",
        header: "Internship ID",
        cell: ({ row }) => (
          <InternshipIdChip
            code={row.original.id}
            companyName={row.original.companyName}
          />
        ),
      },
      {
        accessorKey: "title",
        header: "Internship Name",
        cell: ({ row }) => (
          <div>
            <div
              className="text-foreground hover:text-primary cursor-pointer font-semibold transition-colors"
              onClick={() => onReviewDetails(row.original)}
            >
              {row.original.title}
            </div>
            {}
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Category / Type",
        cell: ({ row }) => <TypeChip_3 type={row.original.type} />,
      },
      {
        id: "creator_instructor",
        header: "Created By / Mentor",
        cell: ({ row }) => {
          const item = row.original as any;
          const createdBy =
            item.createdBy?.role ||
            (item.createdById &&
            item.instructorId &&
            item.createdById === item.instructorId
              ? "INSTRUCTOR"
              : "SUPER_ADMIN");

          const instName =
            item.instructor?.name ||
            item.instructor?.fullName ||
            item.instructorId ||
            "Senior Instructor";

          return (
            <div className="space-y-0.5 text-xs">
              <Badge
                variant={createdBy === "SUPER_ADMIN" ? "default" : "secondary"}
                className="px-1.5 py-0 text-[9px] font-bold uppercase tracking-wider"
              >
                {createdBy}
              </Badge>
              <div className="text-muted-foreground max-w-[120px] truncate text-[10px] font-medium">
                Mentor: {instName}
              </div>
            </div>
          );
        },
      },
      {
        id: "duration-stipend",
        header: "Duration / Pricing",
        cell: ({ row }) => (
          <div className="text-foreground text-xs font-medium">
            {row.original.duration || "N/A"} •{" "}
            {row.original.type === "PAID"
              ? row.original.price
                ? `₹${row.original.price.toLocaleString("en-IN")}`
                : "₹4,999"
              : row.original.stipendAmount
                ? `₹${row.original.stipendAmount.toLocaleString("en-IN")}`
                : "Free"}
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location / Mode",
        cell: ({ row }) => (
          <div className="text-foreground text-xs font-medium">
            {row.original.location || "Remote"} ({row.original.mode || "OFFLINE"})
          </div>
        ),
      },
      {
        id: "status_badges",
        header: "Approval Status",
        cell: ({ row }) => {
          const item = row.original as any;
          const createdBy =
            item.createdBy?.role ||
            (item.createdById &&
            item.instructorId &&
            item.createdById === item.instructorId
              ? "INSTRUCTOR"
              : "SUPER_ADMIN");

          const isInstructorCreated = createdBy === "INSTRUCTOR";

          let superAdminStatus = "PENDING";
          let instructorStatus = "PENDING";

          if (isInstructorCreated) {
            instructorStatus = item.instructorApprovalStatus || "APPROVED";
            superAdminStatus =
              item.superAdminApprovalStatus ||
              (item.isApproved ? "APPROVED" : "PENDING");
          } else {
            superAdminStatus = item.superAdminApprovalStatus || "APPROVED";
            instructorStatus =
              item.instructorApprovalStatus ||
              (item.isInstructorApproved
                ? "APPROVED"
                : !item.isApproved
                  ? "REJECTED"
                  : item.approvedAt
                    ? "APPROVED"
                    : "PENDING");
          }

          let overallStatus = "PENDING";
          if (superAdminStatus === "APPROVED" && instructorStatus === "APPROVED") {
            overallStatus = "APPROVED";
          } else if (
            superAdminStatus === "REJECTED" ||
            instructorStatus === "REJECTED"
          ) {
            overallStatus = "REJECTED";
          } else if (
            superAdminStatus === "APPROVED" &&
            instructorStatus === "PENDING"
          ) {
            overallStatus = "WAITING FOR INSTRUCTOR";
          } else if (
            superAdminStatus === "PENDING" &&
            instructorStatus === "APPROVED"
          ) {
            overallStatus = "WAITING FOR ADMIN";
          }

          return (
            <div className="flex items-center">
              <Badge
                className={
                  overallStatus === "APPROVED"
                    ? "border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-600"
                    : overallStatus === "REJECTED"
                      ? "border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-rose-600"
                      : "border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-amber-600"
                }
              >
                {overallStatus}
              </Badge>
            </div>
          );
        },
      },
      {
        id: "review_action",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const item = row.original as any;
          const createdBy =
            item.createdBy?.role ||
            (item.createdById &&
            item.instructorId &&
            item.createdById === item.instructorId
              ? "INSTRUCTOR"
              : "SUPER_ADMIN");

          const isInstructorCreated = createdBy === "INSTRUCTOR";
          const instructorStatus =
            item.instructorApprovalStatus ||
            (!isInstructorCreated
              ? item.isInstructorApproved
                ? "APPROVED"
                : !item.isApproved
                  ? "REJECTED"
                  : item.approvedAt
                    ? "APPROVED"
                    : "PENDING"
              : "APPROVED");

          const isPendingReview = instructorStatus === "PENDING";
          const isApproved = instructorStatus === "APPROVED";
          const isRejected = instructorStatus === "REJECTED";

          return (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-end"
            >
              <DropdownMenu_6>
                <DropdownMenuTrigger_6 asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-accent hover:text-foreground h-8 w-8 cursor-pointer rounded-lg p-0"
                    title="Actions menu"
                  >
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger_6>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem
                    onClick={() => onReviewDetails(row.original)}
                    className="cursor-pointer font-semibold"
                  >
                    <Eye className="text-primary mr-2 size-3.5" />
                    <span>View Full Details</span>
                  </DropdownMenuItem>

                  {isApproved && (
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer font-semibold"
                    >
                      <Link
                        href={`/instructor/internships/${row.original.id}/applications`}
                      >
                        <Users_2 className="mr-2 size-3.5 text-blue-500" />
                        <span>View Applications</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {!isInstructorCreated && (
                    <>
                      <DropdownMenuSeparator />
                      {(isPendingReview || isRejected) && onApprove && (
                        <DropdownMenuItem
                          disabled={isApproving}
                          onClick={() => onApprove(item.id)}
                          className="cursor-pointer font-semibold text-emerald-600 dark:text-emerald-400"
                        >
                          <Check_2 className="mr-2 size-3.5 text-emerald-500" />
                          <span>Approve Internship</span>
                        </DropdownMenuItem>
                      )}
                      {(isPendingReview || isApproved) && onReject && (
                        <DropdownMenuItem
                          disabled={isRejecting}
                          onClick={() => onReject(item.id)}
                          className="cursor-pointer font-semibold text-rose-600 dark:text-rose-400"
                        >
                          <X className="mr-2 size-3.5 text-rose-500" />
                          <span>Reject Internship</span>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu_6>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ];

interface InternshipDetailDialogProps_2 {
      isOpen: boolean;
      onClose: () => void;
      internship: InternshipPublic | null;
      isInstructorMode?: boolean;
      onApprove?: (id: string) => void;
      onReject?: (id: string) => void;
      isActionPending?: boolean;
    }

interface AdminInternshipPublic_2 extends InternshipPublic {
      createdBy?: {
        role?: string;
      } | null;
      instructorId?: string | null;
      superAdminApprovalStatus?: "PENDING" | "APPROVED" | "REJECTED";
      isApproved?: boolean;
      instructor?: {
        id: string;
        name?: string;
        fullName?: string;
      } | null;
      project?: string | null;
      instructorApprovalStatus?: string;
      isInstructorApproved?: boolean;
      lastDate?: string | null;
      timePeriod?: string | null;
      organizer?: string | null;
      contact?: string | null;
      qualification?: string | null;
      facilities?: string | null;
      careerOpportunity?: string | null;
    }

function formatInternshipCode_4(
      code?: string | null,
      companyName?: string | null,
    ): string {
      if (!code) return "IN2026XX10001";

      const trimmed = code.trim();
      if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }

      const sourceText = companyName && companyName.trim() ? companyName : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }

      let hash = 0;
      for (let i = 0; i < trimmed.length; i++) {
        hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
      }
      const numericSuffix = (Math.abs(hash) % 90000) + 10000;

      return `IN2026${initials}${numericSuffix}`;
    }

function formatDate(value?: string | null): string {
      if (!value) return "—";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

function formatCurrencyINR_2(amount?: number | null): string {
      return `₹${(amount ?? 0).toLocaleString("en-IN")}`;
    }

const InternshipDetailDialog_3: React_3.FC<InternshipDetailDialogProps_2> = ({
      isOpen,
      onClose,
      internship,
      isInstructorMode = false,
      onApprove,
      onReject,
      isActionPending = false,
    }) => {
      if (!internship) return null;

        const item = internship as AdminInternshipPublic_2;
      const createdByRole =
        item.createdBy?.role ||
        (item.createdById &&
        item.instructorId &&
        item.createdById === item.instructorId
          ? "INSTRUCTOR"
          : "SUPER_ADMIN");

      const isInstructorCreated = createdByRole === "INSTRUCTOR";

      let superAdminApprovalStatus = "PENDING";
      let instructorApprovalStatus = "PENDING";

      if (isInstructorCreated) {
        instructorApprovalStatus = item.instructorApprovalStatus || "APPROVED";
        superAdminApprovalStatus =
          item.superAdminApprovalStatus ||
          (internship.isApproved ? "APPROVED" : "PENDING");
      } else {
        superAdminApprovalStatus = item.superAdminApprovalStatus || "APPROVED";
        instructorApprovalStatus =
          item.instructorApprovalStatus ||
          (item.isInstructorApproved
            ? "APPROVED"
            : !item.isApproved
              ? "REJECTED"
              : item.approvedAt
                ? "APPROVED"
                : "PENDING");
      }

      let overallStatus = "PENDING";
      if (
        superAdminApprovalStatus === "APPROVED" &&
        instructorApprovalStatus === "APPROVED"
      ) {
        overallStatus = "APPROVED";
      } else if (
        superAdminApprovalStatus === "REJECTED" ||
        instructorApprovalStatus === "REJECTED"
      ) {
        overallStatus = "REJECTED";
      } else if (
        superAdminApprovalStatus === "APPROVED" &&
        instructorApprovalStatus === "PENDING"
      ) {
        overallStatus = "WAITING FOR INSTRUCTOR";
      } else if (
        superAdminApprovalStatus === "PENDING" &&
        instructorApprovalStatus === "APPROVED"
      ) {
        overallStatus = "WAITING FOR ADMIN";
      }

        const getArrayItems = (val: unknown): string[] => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (typeof val === "string") {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed;
          } catch (_e) {
            return val
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          }
        }
        return [];
      };

      const modules = getArrayItems(internship.modules);
      const tools = getArrayItems(internship.tools);
      const skills = getArrayItems(internship.skills);
      const internshipCode = formatInternshipCode_4(
        internship.id,
        internship.companyName,
      );

      const formatDate = (dateVal?: string | Date | null) => {
        if (!dateVal) return "N/A";
        try {
          return new Date(dateVal).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch {
          return String(dateVal);
        }
      };

      return (
        <ResponsiveDialog
          isOpen={isOpen}
          setIsOpen={(open) => !open && onClose()}
          title="Internship Payload Details"
          description={`${internshipCode ? internshipCode + " — " : ""}Full breakdown of cohort specification and responses.`}
          className="sm:max-w-4xl"
        >
          <div className="space-y-6 pb-4 pr-1 pt-2">
            {}
            <div className="bg-muted/40 border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-xs font-semibold">
                  Approval Status:
                </span>
                <Badge
                  className={
                    overallStatus === "APPROVED"
                      ? "border-emerald-500/20 bg-emerald-500/10 font-bold uppercase text-emerald-600 dark:text-emerald-400"
                      : overallStatus === "REJECTED"
                        ? "border-rose-500/20 bg-rose-500/10 font-bold uppercase text-rose-600 dark:text-rose-400"
                        : "border-amber-500/20 bg-amber-500/10 font-bold uppercase text-amber-600 dark:text-amber-400"
                  }
                >
                  {overallStatus}
                </Badge>
              </div>
            </div>

            {}
            <div className="bg-card border-border/50 space-y-4 rounded-xl border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-foreground text-lg font-bold">
                      {internship.title}
                    </h2>
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold uppercase"
                    >
                      {internship.category || "RUNNING"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-xs font-medium">
                    {internship.companyName} • {internship.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block text-xs font-semibold">
                    Type & Pricing
                  </span>
                  <span className="text-foreground text-sm font-bold">
                    {internship.type === "FREE"
                      ? "FREE"
                      : internship.type === "PAID"
                        ? formatCurrencyINR_2(internship.price || 0)
                        : `Stipend: ${formatCurrencyINR_2(internship.stipendAmount || 0)}`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                <div className="bg-muted/30 rounded-lg p-2.5">
                  <span className="text-muted-foreground block font-medium">
                    Mode
                  </span>
                  <span className="text-foreground font-semibold">
                    {internship.mode}
                  </span>
                </div>
                <div className="bg-muted/30 rounded-lg p-2.5">
                  <span className="text-muted-foreground block font-medium">
                    Duration
                  </span>
                  <span className="text-foreground font-semibold">
                    {internship.duration}
                  </span>
                </div>
                <div className="bg-muted/30 rounded-lg p-2.5">
                  <span className="text-muted-foreground block font-medium">
                    Start Date
                  </span>
                  <span className="text-foreground font-semibold">
                    {formatDate(internship.startDate)}
                  </span>
                </div>
                <div className="bg-muted/30 rounded-lg p-2.5">
                  <span className="text-muted-foreground block font-medium">
                    Last Date to Apply
                  </span>
                  <span className="text-foreground font-semibold">
                    {formatDate((internship as AdminInternshipPublic_2).lastDate)}
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="bg-card border-border/50 space-y-3 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <Layers className="size-4 text-amber-600" />
                <h3 className="text-foreground text-sm font-bold">
                  Program & Academic Specifications
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <span className="text-muted-foreground block font-medium">
                    Internship ID:
                  </span>
                  <div className="pt-1">
                    <InternshipIdChip
                      code={internship.id}
                      companyName={internship.companyName}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground block font-medium">
                    Department:
                  </span>
                  <span className="text-foreground font-semibold">
                    {internship.department || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-medium">
                    Academic Credits:
                  </span>
                  <span className="text-foreground font-semibold">
                    {internship.credits || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-medium">
                    Housing / Time Period:
                  </span>
                  <span className="text-foreground font-semibold">
                    {(internship as AdminInternshipPublic_2).timePeriod || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-medium">
                    Organizer:
                  </span>
                  <span className="text-foreground font-semibold">
                    {(internship as AdminInternshipPublic_2).organizer ||
                      internship.companyName ||
                      "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-medium">
                    Contact Person / Details:
                  </span>
                  <span className="text-foreground font-semibold">
                    {(internship as AdminInternshipPublic_2).contact || "N/A"}
                  </span>
                </div>
                <div className="sm:col-span-2 md:col-span-3">
                  <span className="text-muted-foreground block font-medium">
                    Eligibility / Qualification:
                  </span>
                  <span className="text-foreground font-semibold">
                    {(internship as AdminInternshipPublic_2).qualification || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="bg-card border-border/50 space-y-3 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <FileText className="size-4 text-purple-600" />
                <h3 className="text-foreground text-sm font-bold">
                  Description & Opportunities
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground mb-1 block font-medium">
                    Description:
                  </span>
                  <p className="text-foreground bg-muted/20 border-border/30 whitespace-pre-line rounded-lg border p-2.5 leading-relaxed">
                    {internship.description}
                  </p>
                </div>

                {internship.projectFocus && (
                  <div>
                    <span className="text-muted-foreground mb-1 block font-medium">
                      Project Focus Area:
                    </span>
                    <p className="text-foreground bg-muted/20 border-border/30 rounded-lg border p-2 font-semibold">
                      {internship.projectFocus}
                    </p>
                  </div>
                )}

                {(internship as AdminInternshipPublic_2).facilities && (
                  <div>
                    <span className="text-muted-foreground mb-1 block font-medium">
                      Facilities Provided:
                    </span>
                    <p className="text-foreground bg-muted/20 border-border/30 rounded-lg border p-2">
                      {(internship as AdminInternshipPublic_2).facilities}
                    </p>
                  </div>
                )}

                {(internship as AdminInternshipPublic_2).careerOpportunity && (
                  <div>
                    <span className="text-muted-foreground mb-1 block font-medium">
                      Career Opportunities:
                    </span>
                    <p className="text-foreground bg-muted/20 border-border/30 rounded-lg border p-2">
                      {(internship as AdminInternshipPublic_2).careerOpportunity}
                    </p>
                  </div>
                )}

                {internship.onboardingDetails && (
                  <div>
                    <span className="text-muted-foreground mb-1 block font-medium">
                      Onboarding Details:
                    </span>
                    <p className="text-foreground bg-muted/20 border-border/30 whitespace-pre-line rounded-lg border p-2">
                      {internship.onboardingDetails}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {}
            <div className="bg-card border-border/50 space-y-3 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <Sparkles_2 className="size-4 text-teal-600" />
                <h3 className="text-foreground text-sm font-bold">
                  Curriculum, Tools & Skills
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-muted-foreground mb-1.5 block font-medium">
                    Modules:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {modules.length > 0 ? (
                      modules.map((m, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="px-2 py-0.5 font-medium"
                        >
                          {m}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        No modules listed
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground mb-1.5 block font-medium">
                    Tools Required:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.length > 0 ? (
                      tools.map((t, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-muted/40 px-2 py-0.5 font-medium"
                        >
                          {t}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No tools listed</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground mb-1.5 block font-medium">
                    Skills Imparted:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.length > 0 ? (
                      skills.map((s, i) => (
                        <Badge
                          key={i}
                          variant="default"
                          className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-2 py-0.5 font-medium"
                        >
                          {s}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        No skills listed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
              {(isInstructorMode || onApprove || onReject) && (
                <div className="flex items-center gap-2">
                  {onApprove && (
                    <Button
                      size="sm"
                      disabled={isActionPending}
                      onClick={() => onApprove(internship.id)}
                      className="gap-1.5 bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="size-4" />
                      Accept & Approve Internship
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isActionPending}
                      onClick={() => onReject(internship.id)}
                      className="gap-1.5 text-xs font-bold"
                    >
                      <XCircle className="size-4" />
                      Reject Internship
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </ResponsiveDialog>
      );
    };


export default function InstructorInternshipsPage() {
    function useAuth() {
      return useContext(AuthContext);
    }

    const EmersionService: IEmersionService = {
      async register(payload) {
        const response = await axiosInstance.post<EmersionRegisterResponse>(
          ENDPOINTS.EMERSION.REGISTER,
          payload,
        );
        return response.data;
      },

      async getDashboard() {
        const response = await axiosInstance.get<EmersionDashboardResponse>(
          ENDPOINTS.EMERSION.DASHBOARD,
        );
        return response.data;
      },

      async getProfile() {
        const response = await axiosInstance.get<{ data: Record<string, unknown> }>(
          ENDPOINTS.EMERSION.PROFILE,
        );
        return {
          ...response.data,
          data: mapBackendProfileToFrontend(
            response.data.data as Record<string, unknown> | null,
          ),
        } as unknown as EmersionProfileResponse;
      },

      async updateProfile(payload) {
        const mappedPayload: Record<string, unknown> = {
          fullName: payload.fullName,
          fatherMotherName: payload.fatherSpouseName,
          dateOfBirth: payload.dob
            ? new Date(payload.dob).toISOString()
            : undefined,
          gender:
            payload.gender === "Male"
              ? "MALE"
              : payload.gender === "Female"
                ? "FEMALE"
                : "OTHER",
          mobileNumber: payload.mobileNo,
          alternateMobileNo: payload.alternateMobileNo ?? undefined,
          emailAddress: payload.emailAddress ?? undefined,
          currentAddressSameAsPerm: payload.sameAsCurrentAddress,
                permLocalArea: payload.permanentAddress?.local,
          permDistrict: payload.permanentAddress?.district,
          permState: payload.permanentAddress?.state,
          permCountry: payload.permanentAddress?.country,
          permPinCode: payload.permanentAddress?.pinCode,
                currLocalArea: payload.sameAsCurrentAddress
            ? undefined
            : payload.currentAddress?.local,
          currDistrict: payload.sameAsCurrentAddress
            ? undefined
            : payload.currentAddress?.district,
          currState: payload.sameAsCurrentAddress
            ? undefined
            : payload.currentAddress?.state,
          currCountry: payload.sameAsCurrentAddress
            ? undefined
            : payload.currentAddress?.country,
          currPinCode: payload.sameAsCurrentAddress
            ? undefined
            : payload.currentAddress?.pinCode,
        };

        const response = await axiosInstance.patch<{
          data: Record<string, unknown>;
        }>(ENDPOINTS.EMERSION.PROFILE, mappedPayload);
        return {
          ...response.data,
          data: mapBackendProfileToFrontend(response.data.data),
        } as unknown as UpdateEmersionProfileResponse;
      },

          async submitApplication(payload: TEmersionApplication) {
            const hasPhoto = !!payload.photoBase64;
        const hasIdentityProof = !!payload.identityProofBase64;
        const hasEducationCert = !!payload.educationCertBase64;

            const base64ToBlob = (dataUrl: string): Blob => {
          const [meta, b64] = dataUrl.split(",");
          const mime = meta.match(/:(.*?);/)?.[1] ?? "application/octet-stream";
          const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
          return new Blob([bytes], { type: mime });
        };

        if (hasPhoto || hasIdentityProof || hasEducationCert) {
                const formData = new FormData();
          formData.append("fullName", payload.fullName ?? "");
          formData.append("fatherMotherName", payload.fatherSpouseName ?? "");
          if (payload.dob)
            formData.append("dateOfBirth", new Date(payload.dob).toISOString());
          formData.append(
            "gender",
            payload.gender === "Male"
              ? "MALE"
              : payload.gender === "Female"
                ? "FEMALE"
                : "OTHER",
          );
          formData.append("mobileNumber", payload.mobileNo ?? "");
          formData.append("alternateMobileNo", payload.alternateMobileNo ?? "");
          formData.append("emailAddress", payload.emailAddress ?? "");
          formData.append(
            "currentAddressSameAsPerm",
            String(payload.sameAsCurrentAddress ?? false),
          );
                formData.append("permLocalArea", payload.permanentAddress?.local ?? "");
          formData.append("permDistrict", payload.permanentAddress?.district ?? "");
          formData.append("permState", payload.permanentAddress?.state ?? "");
          formData.append(
            "permCountry",
            payload.permanentAddress?.country ?? "India",
          );
          formData.append("permPinCode", payload.permanentAddress?.pinCode ?? "");
                if (!payload.sameAsCurrentAddress) {
            formData.append("currLocalArea", payload.currentAddress?.local ?? "");
            formData.append("currDistrict", payload.currentAddress?.district ?? "");
            formData.append("currState", payload.currentAddress?.state ?? "");
            formData.append(
              "currCountry",
              payload.currentAddress?.country ?? "India",
            );
            formData.append("currPinCode", payload.currentAddress?.pinCode ?? "");
          }
                if (hasPhoto) {
            const blob = base64ToBlob(payload.photoBase64!);
            formData.append(
              "passportPhoto",
              blob,
              payload.photoName || "photo.jpg",
            );
          }
          if (hasIdentityProof) {
            const blob = base64ToBlob(payload.identityProofBase64!);
            formData.append(
              "resume",
              blob,
              payload.identityProofName || "resume.pdf",
            );
          }
          if (hasEducationCert) {
            const blob = base64ToBlob(payload.educationCertBase64!);
            formData.append("noc", blob, payload.educationCertName || "noc.pdf");
          }

          await axiosInstance.patch(ENDPOINTS.EMERSION.PROFILE, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
                await this.updateProfile({
            fullName: payload.fullName,
            fatherSpouseName: payload.fatherSpouseName,
            dob: payload.dob,
            gender: payload.gender,
            mobileNo: payload.mobileNo,
            alternateMobileNo: payload.alternateMobileNo,
            emailAddress: payload.emailAddress,
            currentAddress: payload.currentAddress,
            sameAsCurrentAddress: payload.sameAsCurrentAddress,
            permanentAddress: payload.permanentAddress,
          });
        }

            const academicDetails = (payload.qualifications ?? []).map((q) => ({
          qualification: mapQualEnum(q.highestQualification),
          stream: q.specialization || "General",
          subject: q.specialization || "General",
          instituteName: q.universityName || "Institution",
          universityName: q.universityName || "University",
          sessionYear: q.yearOfCompletion || "2026",
          gradeDivision: q.percentage || "First Class",
        }));

                                        const applicationPayload: Record<string, unknown> = {
          academicDetails,
                preferredDuration: "DAYS_30",
          preferredLocation: payload.currentAddress?.district || "General",
                expectedLearning: "To be discussed with assigned mentor.",
          languagesKnown: "English, Hindi",
                presenceType: (() => {
            const mode = (payload.preferredMode ?? [])[0];
            if (mode === "Offline/On Campus") return "FULL_TIME";
            if (mode === "Hybrid") return "HYBRID";
            return "PART_TIME"; 
          })(),
          fieldVisitsComfort: payload.fieldVisitsComfort ?? true,
          workType: payload.workType ?? "STUDENT",
                emergencyContactName: payload.emergencyContactName ?? "",
          emergencyRelationship: payload.emergencyRelationship ?? "",
          emergencyMobile: payload.emergencyMobile ?? "",
                declarationAccepted: payload.agreeTerms === true,
          rulesAccepted: payload.agreeTerms === true,
        };

        const response = await axiosInstance.post<EmersionApplicationResponse>(
          ENDPOINTS.EMERSION.APPLICATION,
          applicationPayload,
        );
        return response.data;
      },

      async getMyApplication() {
        try {
          const response = await axiosInstance.get<EmersionMyApplicationResponse>(
            ENDPOINTS.EMERSION.APPLICATION_MY,
          );
          return response.data;
        } catch (error: any) {
          if (error.response?.status === 404) {
            return {
              success: true,
              data: null,
            } as unknown as EmersionMyApplicationResponse;
          }
          throw error;
        }
      },

      async getApplicationStatus() {
        const response = await axiosInstance.get<EmersionApplicationStatusResponse>(
          ENDPOINTS.EMERSION.APPLICATION_STATUS,
        );
        return response.data;
      },

      async downloadApplication() {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.EMERSION.APPLICATION_DOWNLOAD,
          { responseType: "blob" },
        );
        return response.data;
      },

        async listNotices() {
        const response = await axiosInstance.get<EmersionListNoticesResponse>(
          ENDPOINTS.NOTICES.BASE,
        );
        return response.data;
      },

        async createSupportTicket(payload) {
        const response = await axiosInstance.post<EmersionCreateTicketResponse>(
          ENDPOINTS.TICKETS.BASE,
          payload,
        );
        return response.data;
      },

      async listMySupportTickets() {
        const response = await axiosInstance.get<EmersionListMyTicketsResponse>(
          ENDPOINTS.TICKETS.MY_TICKETS,
        );
        return response.data;
      },

      async deleteSupportTicket(id) {
        const response = await axiosInstance.delete<EmersionDeleteTicketResponse>(
          ENDPOINTS.TICKETS.BY_ID(id),
        );
        return response.data;
      },

        async listMyCertificates() {
        const response = await axiosInstance.get<ListEmersionCertificatesResponse>(
          ENDPOINTS.EMERSION.CERTIFICATES.MY,
        );
        return response.data;
      },

      async downloadCertificate(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.EMERSION.CERTIFICATES.DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

      async assignGrade(id, payload) {
        const response = await axiosInstance.patch<AssignGradeResponse_2>(
          ENDPOINTS.EMERSION.CERTIFICATES.GRADE(id),
          payload,
        );
        return response.data;
      },

        async getMyIDCard() {
        const response = await axiosInstance.get<GetEmersionIDCardResponse>(
          ENDPOINTS.EMERSION.ID_CARD.MY,
        );
        return response.data;
      },

      async getApplicationIDCard(applicationId) {
        const response = await axiosInstance.get<GetEmersionIDCardResponse>(
          ENDPOINTS.EMERSION.ID_CARD.BY_APPLICATION_ID(applicationId),
        );
        return response.data;
      },

      async downloadIDCard(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.EMERSION.ID_CARD.DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

        async listMyPayments(params) {
        const response = await axiosInstance.get<ListMyEmersionPaymentsResponse>(
          ENDPOINTS.EMERSION.PAYMENTS.MY_PAYMENTS,
          { params },
        );
        return response.data;
      },

      async getPaymentReceipt(id) {
        const response = await axiosInstance.get<GetEmersionPaymentReceiptResponse>(
          ENDPOINTS.EMERSION.PAYMENTS.RECEIPT(id),
        );
        return response.data;
      },

      async createPaymentOrder(payload) {
        const response = await axiosInstance.post<CreateEmersionOrderResponse>(
          ENDPOINTS.EMERSION.PAYMENTS.CREATE_ORDER,
          payload,
        );
        return response.data;
      },

      async verifyPaymentSignature(payload) {
        const response = await axiosInstance.post<VerifyEmersionSignatureResponse>(
          ENDPOINTS.EMERSION.PAYMENTS.VERIFY_SIGNATURE,
          payload,
        );
        return response.data;
      },

      async refundPayment(payload) {
        const response = await axiosInstance.post<RefundEmersionPaymentResponse>(
          ENDPOINTS.EMERSION.PAYMENTS.REFUND,
          payload,
        );
        return response.data;
      },

        async listPrograms(params) {
        const response = await axiosInstance.get<ListEmersionProgramsResponse>(
          ENDPOINTS.EMERSION.PROGRAMS.LIST,
          { params },
        );
        return response.data;
      },

      async applyToProgram(programId) {
        const response = await axiosInstance.post<ApplyToEmersionProgramResponse>(
          ENDPOINTS.EMERSION.PROGRAMS.APPLY(programId),
        );
        return response.data;
      },
    };
    const EmersionDataHooks: IEmersionDataHooks = {
      useEmersionRegister(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) => await EmersionService.register(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: EMERSION_QUERY_KEYS.ALL });
            toast.success(
              (data as { message?: string })?.message ||
                "Account created successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to create account.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useEmersionDashboard(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.DASHBOARD(),
          queryFn: async () => await EmersionService.getDashboard(),
          ...options,
        });
      },

      useEmersionProfile(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.PROFILE(),
          queryFn: async () => await EmersionService.getProfile(),
          ...options,
        });
      },

      useUpdateEmersionProfile(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await EmersionService.updateProfile(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.PROFILE(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.DASHBOARD(),
            });
            queryClient.invalidateQueries({
              queryKey: ["auth", "profile"],
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Profile updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useSubmitEmersionApplication(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await EmersionService.submitApplication(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.APPLICATION_MY(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.APPLICATION_STATUS(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.DASHBOARD(),
            });
            queryClient.invalidateQueries({
              queryKey: ["auth", "profile"],
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Application submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit application.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useMyEmersionApplication(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.APPLICATION_MY(),
          queryFn: async () => await EmersionService.getMyApplication(),
          ...options,
        });
      },

      useEmersionApplicationStatus(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.APPLICATION_STATUS(),
          queryFn: async () => await EmersionService.getApplicationStatus(),
          ...options,
        });
      },

      useDownloadEmersionApplication(options) {
        return useMutation({
          mutationFn: async () => await EmersionService.downloadApplication(),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success("Download started!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to download application form.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useNotices(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.NOTICES(),
          queryFn: async () => await EmersionService.listNotices(),
          ...options,
        });
      },

      useCreateSupportTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await EmersionService.createSupportTicket(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.MY_TICKETS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Support ticket created successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to create support ticket.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useMySupportTickets(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.MY_TICKETS(),
          queryFn: async () => await EmersionService.listMySupportTickets(),
          ...options,
        });
      },

      useDeleteSupportTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await EmersionService.deleteSupportTicket(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.MY_TICKETS(),
            });
            toast.success(
              (data as { message?: string })?.message || "Support ticket deleted.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to delete support ticket.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useMyEmersionCertificates(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.MY_CERTIFICATES(),
          queryFn: async () => await EmersionService.listMyCertificates(),
          ...options,
        });
      },

      useDownloadEmersionCertificate(options) {
        return useMutation({
          mutationFn: async (id) => await EmersionService.downloadCertificate(id),
          ...options,
        });
      },

      useAssignEmersionGrade(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await EmersionService.assignGrade(id, payload),
          onSuccess: async (data, variables, context) => {
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ["instructors"] }),
              queryClient.invalidateQueries({ queryKey: ["students"] }),
              queryClient.invalidateQueries({ queryKey: ["emersion"] }),
              queryClient.invalidateQueries({ queryKey: ["super-admin"] }),
            ]);
            if (options?.onSuccess) {
              await (options.onSuccess as any)(data, variables, context);
            }
          },
          ...options,
        });
      },

      useEmersionIDCard(options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.MY_ID_CARD(),
          queryFn: async () => await EmersionService.getMyIDCard(),
          ...options,
        });
      },

      useApplicationIDCard(applicationId, options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.APPLICATION_ID_CARD(applicationId),
          queryFn: async () =>
            await EmersionService.getApplicationIDCard(applicationId),
          enabled: !!applicationId,
          ...options,
        });
      },

      useDownloadEmersionIDCard(options) {
        return useMutation({
          mutationFn: async (id) => await EmersionService.downloadIDCard(id),
          ...options,
        });
      },

        useMyEmersionPayments(params, options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.MY_PAYMENTS(params),
          queryFn: async () => await EmersionService.listMyPayments(params),
          ...options,
        });
      },

      useEmersionPaymentReceipt(id, options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.PAYMENT_RECEIPT(id),
          queryFn: async () => await EmersionService.getPaymentReceipt(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateEmersionPaymentOrder(options) {
        return useMutation({
          mutationFn: async (payload) =>
            await EmersionService.createPaymentOrder(payload),
          ...options,
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to create payment order.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useVerifyEmersionPaymentSignature(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await EmersionService.verifyPaymentSignature(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.MY_PAYMENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.APPLICATION_MY(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.DASHBOARD(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Payment verified successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to verify payment.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useRefundEmersionPayment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await EmersionService.refundPayment(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.MY_PAYMENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.DASHBOARD(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Refund processed successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to process refund.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        usePrograms(params, options) {
        return useQuery({
          queryKey: EMERSION_QUERY_KEYS.PROGRAMS(params),
          queryFn: async () => await EmersionService.listPrograms(params),
          ...options,
        });
      },

      useApplyToProgram(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (programId) =>
            await EmersionService.applyToProgram(programId),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.APPLICATION_MY(),
            });
            queryClient.invalidateQueries({
              queryKey: EMERSION_QUERY_KEYS.DASHBOARD(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Applied to program successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to apply to program.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

    interface ImmersionObject {
      id: string;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      status: "UPCOMING" | "ACTIVE" | "COMPLETED";
      instructorId: string | null;
        instructorApprovalStatus?: ImmersionApprovalStatus;
      instructorApprovedAt?: string | null;
      instructorRemarks?: string | null;
      createdAt: string;
      updatedAt: string;
    }

    interface ListImmersionsResponse {
      success: boolean;
      data: ImmersionObject[];
    }

    interface IInstructorDataHooks {
        useInstructorDashboardStats: (
        options?: TQueryOptions<InstructorDashboardStatsResponse, Error>,
      ) => TQueryReturnType<InstructorDashboardStatsResponse, Error>;

      useInstructorProfile: (
        options?: TQueryOptions<InstructorProfileResponse, Error>,
      ) => TQueryReturnType<InstructorProfileResponse, Error>;

      useCreateUpdateInstructorProfile: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          FormData
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, FormData>;

        useInstructorRegistrationMe: (
        options?: TQueryOptions<GetInstructorRegistrationResponse, Error>,
      ) => TQueryReturnType<GetInstructorRegistrationResponse, Error>;

      useSubmitInstructorRegistration: (
        options?: TMutationOptions<
          SubmitInstructorRegistrationResponse,
          Error,
          InstructorRegistrationPayload
        >,
      ) => TMutationReturnType<
        SubmitInstructorRegistrationResponse,
        InstructorRegistrationPayload
      >;

      useUpdateInstructorRegistration: (
        options?: TMutationOptions<
          UpdateInstructorRegistrationResponse,
          Error,
          { id: string; payload: InstructorRegistrationUpdatePayload }
        >,
      ) => TMutationReturnType<
        UpdateInstructorRegistrationResponse,
        { id: string; payload: InstructorRegistrationUpdatePayload }
      >;

        useInstructorInternships: (
        params?: ListMyInternshipsParams,
        options?: TQueryOptions<ListInternshipsResponse, Error>,
      ) => TQueryReturnType<ListInternshipsResponse, Error>;

      usePostInternship: (
        options?: TMutationOptions<
          GetInternshipByIdResponse,
          Error,
          CreateInternshipPayload
        >,
      ) => TMutationReturnType<GetInternshipByIdResponse, CreateInternshipPayload>;

      useCreateRunningInternship: (
        options?: TMutationOptions<
          { success: boolean; data: Record<string, unknown>; message: string },
          Error,
          CreateInternshipPayload | Record<string, unknown>
        >,
      ) => TMutationReturnType<
        { success: boolean; data: Record<string, unknown>; message: string },
        CreateInternshipPayload | Record<string, unknown>
      >;

      useApproveInternshipPosting: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useRejectInternshipPosting: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useInternshipApplications: (
        id: string,
        options?: TQueryOptions<
          { success: boolean; data: StudentApplication[] },
          Error
        >,
      ) => TQueryReturnType<
        { success: boolean; data: StudentApplication[] },
        Error
      >;

      usePendingInternships: (
        options?: TQueryOptions<ListInternshipsResponse, Error>,
      ) => TQueryReturnType<ListInternshipsResponse, Error>;

      useInstructorStudents: (
        params?: ListMyStudentsParams,
        options?: TQueryOptions<
          { success: boolean; data: StudentApplication[] },
          Error
        >,
      ) => TQueryReturnType<
        { success: boolean; data: StudentApplication[] },
        Error
      >;

      useApproveRejectApplication: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          { id: string; appId: string; action: "approve" | "reject" }
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        { id: string; appId: string; action: "approve" | "reject" }
      >;

        useInstructorImmersions: (
        options?: TQueryOptions<ListImmersionsResponse, Error>,
      ) => TQueryReturnType<ListImmersionsResponse, Error>;

      useImmersionRegistrations: (
        immersionId: string,
        options?: TQueryOptions<
          { success: boolean; data: ImmersionRegistrationObject[] },
          Error
        >,
      ) => TQueryReturnType<
        { success: boolean; data: ImmersionRegistrationObject[] },
        Error
      >;

      useUpdateImmersionStatus: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          { regId: string; payload: UpdateImmersionStatusPayload }
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        { regId: string; payload: UpdateImmersionStatusPayload }
      >;

      useAcceptImmersionAssignment: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useRejectImmersionAssignment: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          { id: string; remarks?: string }
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        { id: string; remarks?: string }
      >;

        useInstructorSubmissions: (
        options?: TQueryOptions<ListSubmissionsResponse, Error>,
      ) => TQueryReturnType<ListSubmissionsResponse, Error>;

      useGradeSubmission: (
        options?: TMutationOptions<
          GradeSubmissionResponse,
          Error,
          { id: string; payload: GradeSubmissionPayload }
        >,
      ) => TMutationReturnType<
        GradeSubmissionResponse,
        { id: string; payload: GradeSubmissionPayload }
      >;

      useCompleteEnrollment: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useIssueCertificate: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          | {
              enrollmentId: string;
              signatureUrl?: string;
              grade?: string;
              credits?: string;
            }
          | string
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        | {
            enrollmentId: string;
            signatureUrl?: string;
            grade?: string;
            credits?: string;
          }
        | string
      >;

        useInstructorNotices: (
        options?: TQueryOptions<ListNoticesResponse, Error>,
      ) => TQueryReturnType<ListNoticesResponse, Error>;

      usePostNotice: (
        options?: TMutationOptions<
          CreateNoticeResponse,
          Error,
          CreateNoticePayload
        >,
      ) => TMutationReturnType<CreateNoticeResponse, CreateNoticePayload>;

        useMyTickets: (
        options?: TQueryOptions<ListTicketsResponse, Error>,
      ) => TQueryReturnType<ListTicketsResponse, Error>;

      useCreateTicket: (
        options?: TMutationOptions<
          CreateTicketResponse_2,
          Error,
          CreateTicketPayload_2
        >,
      ) => TMutationReturnType<CreateTicketResponse_2, CreateTicketPayload_2>;

        useInstructorIDCard: (
        options?: TQueryOptions<{ success: boolean; data: any }, Error>,
      ) => TQueryReturnType<{ success: boolean; data: any }, Error>;

      useDownloadInstructorIDCard: (
        options?: TMutationOptions<Blob, Error, void>,
      ) => TMutationReturnType<Blob, void>;
    }

    interface IInstructorService {
        submitRegistration: (
        payload: InstructorRegistrationPayload,
      ) => Promise<SubmitInstructorRegistrationResponse>;
      getMyRegistration: () => Promise<GetInstructorRegistrationResponse>;
      listAllRegistrations: (
        params?: GetInstructorsParams,
      ) => Promise<ListInstructorRegistrationsResponse>;
      getRegistrationById: (
        id: string,
      ) => Promise<GetInstructorRegistrationResponse>;
      updateRegistration: (
        id: string,
        payload: InstructorRegistrationUpdatePayload,
      ) => Promise<UpdateInstructorRegistrationResponse>;
      deleteRegistration: (
        id: string,
      ) => Promise<DeleteInstructorRegistrationResponse>;

        submitOnboardingProfile: (
        formData: FormData,
      ) => Promise<{ success: boolean; message: string }>;
      getMyProfile: () => Promise<InstructorProfileResponse>;
      getPendingProfiles: () => Promise<ListPendingInstructorsResponse>;
      approveProfile: (id: string) => Promise<ApproveInstructorResponse>;
      rejectProfile: (id: string) => Promise<RejectInstructorResponse>;

        getDashboardStats: () => Promise<InstructorDashboardStatsResponse>;

        getMyInternships: (
        params?: ListMyInternshipsParams,
      ) => Promise<ListInternshipsResponse>;
      postInternship: (
        payload: CreateInternshipPayload,
      ) => Promise<GetInternshipByIdResponse>;
      createRunningInternship: (
        payload: CreateInternshipPayload | Record<string, unknown>,
      ) => Promise<{
        success: boolean;
        data: Record<string, unknown>;
        message: string;
      }>;
      getMyStudents: (
        params?: ListMyStudentsParams,
      ) => Promise<{ success: boolean; data: StudentApplication[] }>;
      approveApplication: (
        id: string,
        appId: string,
      ) => Promise<{ success: boolean; message: string }>;
      rejectApplication: (
        id: string,
        appId: string,
      ) => Promise<{ success: boolean; message: string }>;
      approveInternshipPosting: (
        id: string,
      ) => Promise<{ success: boolean; message: string }>;
      rejectInternshipPosting: (
        id: string,
      ) => Promise<{ success: boolean; message: string }>;
      getInternshipApplications: (
        id: string,
      ) => Promise<{ success: boolean; data: StudentApplication[] }>;
      getPendingInternships: () => Promise<ListInternshipsResponse>;

        getMyImmersions: () => Promise<ListImmersionsResponse>;
      getImmersionRegistrations: (
        immersionId: string,
      ) => Promise<{ success: boolean; data: ImmersionRegistrationObject[] }>;
      updateImmersionStatus: (
        regId: string,
        payload: UpdateImmersionStatusPayload,
      ) => Promise<{ success: boolean; message: string }>;
      acceptImmersionAssignment: (
        immersionId: string,
      ) => Promise<{ success: boolean; message: string }>;
      rejectImmersionAssignment: (
        immersionId: string,
        remarks?: string,
      ) => Promise<{ success: boolean; message: string }>;

        getMySubmissions: () => Promise<ListSubmissionsResponse>;
      gradeSubmission: (
        id: string,
        payload: GradeSubmissionPayload,
      ) => Promise<GradeSubmissionResponse>;
      completeEnrollment: (
        enrollmentId: string,
      ) => Promise<{ success: boolean; message: string }>;
      issueCertificate: (
        payload:
          | {
              enrollmentId: string;
              signatureUrl?: string;
              grade?: string;
              credits?: string;
            }
          | string,
      ) => Promise<{ success: boolean; message: string }>;

        listNotices: () => Promise<ListNoticesResponse>;
      createNotice: (payload: CreateNoticePayload) => Promise<CreateNoticeResponse>;

        getMyTickets: () => Promise<ListTicketsResponse>;
      createTicket: (payload: CreateTicketPayload_2) => Promise<CreateTicketResponse_2>;
      getIDCard: () => Promise<{ success: boolean; data: any }>;
      downloadIDCard: () => Promise<Blob>;
    }

    const InstructorService: IInstructorService = {
        async submitRegistration(payload) {
        const response =
          await axiosInstance.post<SubmitInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER,
            payload,
          );
        return response.data;
      },

      async getMyRegistration() {
        try {
          const response = await axiosInstance.get<GetInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_ME,
          );
          return response.data;
        } catch (error: any) {
          if (error?.response?.status === 404) {
            return {
              success: false,
              data: null,
              message: "No instructor registration found",
            } as unknown as GetInstructorRegistrationResponse;
          }
          throw error;
        }
      },

      async listAllRegistrations(params) {
        const response =
          await axiosInstance.get<ListInstructorRegistrationsResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_ADMIN,
            { params },
          );
        return response.data;
      },

      async getRegistrationById(id) {
        const response = await axiosInstance.get<GetInstructorRegistrationResponse>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateRegistration(id, payload) {
        const response =
          await axiosInstance.patch<UpdateInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
            payload,
          );
        return response.data;
      },

      async deleteRegistration(id) {
        const response =
          await axiosInstance.delete<DeleteInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
          );
        return response.data;
      },

        async submitOnboardingProfile(formData) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.PROFILE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      },

      async getMyProfile() {
        const response = await axiosInstance.get<InstructorProfileResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILE,
        );
        return response.data;
      },

      async getPendingProfiles() {
        const response = await axiosInstance.get<ListPendingInstructorsResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_PENDING,
        );
        return response.data;
      },

      async approveProfile(id) {
        const response = await axiosInstance.patch<ApproveInstructorResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_APPROVE(id),
        );
        return response.data;
      },

      async rejectProfile(id) {
        const response = await axiosInstance.patch<RejectInstructorResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_REJECT(id),
        );
        return response.data;
      },

        async getDashboardStats() {
        const response = await axiosInstance.get<InstructorDashboardStatsResponse>(
          ENDPOINTS.INSTRUCTOR.DASHBOARD,
        );
        return response.data;
      },

        async getMyInternships(params) {
        const response = await axiosInstance.get<ListInternshipsResponse>(
          ENDPOINTS.INSTRUCTOR.MY_INTERNSHIPS,
          { params },
        );
        return response.data;
      },

      async postInternship(payload) {
        const response = await axiosInstance.post<GetInternshipByIdResponse>(
          ENDPOINTS.INTERNSHIPS.BASE,
          payload,
        );
        return response.data;
      },

      async createRunningInternship(payload) {
        const response = await axiosInstance.post<{
          success: boolean;
          data: Record<string, unknown>;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.RUNNING_INTERNSHIPS, payload);
        return response.data;
      },

      async approveInternshipPosting(id) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INTERNSHIPS.APPROVE_POSTING(id));
        return response.data;
      },

      async rejectInternshipPosting(id) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INTERNSHIPS.REJECT_POSTING(id));
        return response.data;
      },

      async getInternshipApplications(id) {
        const response = await axiosInstance.get<{
          success: boolean;
          data: StudentApplication[];
        }>(ENDPOINTS.INTERNSHIPS.APPLICATIONS(id));
        return response.data;
      },

      async getPendingInternships() {
        const response = await axiosInstance.get<ListInternshipsResponse>(
          ENDPOINTS.INTERNSHIPS.PENDING,
        );
        return response.data;
      },

      async getMyStudents(params) {
        const response = await axiosInstance.get<{
          success: boolean;
          data: StudentApplication[];
        }>(ENDPOINTS.INSTRUCTOR.MY_STUDENTS, { params });
        return response.data;
      },

      async approveApplication(id, appId) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.APPROVE_APPLICATION(id, appId));
        return response.data;
      },

      async rejectApplication(id, appId) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.REJECT_APPLICATION(id, appId));
        return response.data;
      },

        async getMyImmersions() {
        const response = await axiosInstance.get<ListImmersionsResponse>(
          ENDPOINTS.INSTRUCTOR.IMMERSIONS,
        );
        return response.data;
      },

      async getImmersionRegistrations(immersionId) {
        void immersionId;
        const response = await axiosInstance.get<{
          success: boolean;
          data: ImmersionRegistrationObject[];
        }>(`/immersion/registrations/my`);
        return response.data;
      },

      async acceptImmersionAssignment(immersionId) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.IMMERSION_ACCEPT(immersionId));
        return response.data;
      },

      async rejectImmersionAssignment(immersionId, remarks) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.IMMERSION_REJECT(immersionId), { remarks });
        return response.data;
      },

      async updateImmersionStatus(regId, payload) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(`/immersion/registrations/${regId}/status`, payload);
        return response.data;
      },

        async getMySubmissions() {
        const response = await axiosInstance.get<ListSubmissionsResponse>(
          ENDPOINTS.INSTRUCTOR.SUBMISSIONS,
        );
        return response.data;
      },

      async gradeSubmission(id, payload) {
        const response = await axiosInstance.post<GradeSubmissionResponse>(
          ENDPOINTS.INSTRUCTOR.SUBMISSIONS_GRADE(id),
          payload,
        );
        return response.data;
      },

      async completeEnrollment(enrollmentId) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(`/enrollments/${enrollmentId}/complete`);
        return response.data;
      },

      async issueCertificate(
        payload:
          | {
              enrollmentId: string;
              signatureUrl?: string;
              grade?: string;
              credits?: string;
            }
          | string,
      ) {
        const enrollmentId =
          typeof payload === "string" ? payload : payload.enrollmentId;
        const signatureUrl =
          typeof payload === "object" ? payload.signatureUrl : undefined;
        const grade = typeof payload === "object" ? payload.grade : undefined;
        const credits = typeof payload === "object" ? payload.credits : undefined;
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(`/enrollments/${enrollmentId}/issue-certificate`, {
          signatureUrl,
          grade,
          credits,
        });
        return response.data;
      },

        async listNotices() {
        const response = await axiosInstance.get<ListNoticesResponse>(
          ENDPOINTS.NOTICES.BASE,
        );
        return response.data;
      },

      async createNotice(payload) {
        const response = await axiosInstance.post<CreateNoticeResponse>(
          ENDPOINTS.NOTICES.BASE,
          payload,
        );
        return response.data;
      },

        async getMyTickets() {
        const response = await axiosInstance.get<ListTicketsResponse>(
          ENDPOINTS.TICKETS.MY_TICKETS,
        );
        return response.data;
      },

      async createTicket(payload) {
        const response = await axiosInstance.post<CreateTicketResponse_2>(
          ENDPOINTS.TICKETS.BASE,
          payload,
        );
        return response.data;
      },

      async getIDCard() {
        const response = await axiosInstance.get<{ success: boolean; data: any }>(
          ENDPOINTS.INSTRUCTOR.ID_CARD,
        );
        return response.data;
      },

      async downloadIDCard() {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.INSTRUCTOR.DOWNLOAD_ID_CARD,
          { responseType: "blob" },
        );
        return response.data;
      },
    };

    const InstructorDataHooks: IInstructorDataHooks = {
        useInstructorDashboardStats(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
          queryFn: async () => await InstructorService.getDashboardStats(),
          ...options,
        });
      },

        useInstructorProfile(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.PROFILE(),
          queryFn: async () => await InstructorService.getMyProfile(),
          ...options,
        });
      },

      useCreateUpdateInstructorProfile(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (formData) =>
            await InstructorService.submitOnboardingProfile(formData),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PROFILE(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Onboarding profile saved successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit onboarding profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorRegistrationMe(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.REGISTRATION_ME(),
          queryFn: async () => await InstructorService.getMyRegistration(),
          ...options,
        });
      },

      useSubmitInstructorRegistration(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.submitRegistration(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.REGISTRATION_ME(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Instructor registration submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit registration.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useUpdateInstructorRegistration(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await InstructorService.updateRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.REGISTRATION_ME(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update registration.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorInternships(params, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(params),
          queryFn: async () => await InstructorService.getMyInternships(params),
          ...options,
        });
      },

      usePostInternship(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.postInternship(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship listing posted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to post internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useCreateRunningInternship(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.createRunningInternship(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Running Internship proposed successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to propose running internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useApproveInternshipPosting(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await InstructorService.approveInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship posting approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to approve internship posting.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useRejectInternshipPosting(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await InstructorService.rejectInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship posting rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to reject internship posting.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useInternshipApplications(id, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIP_APPLICATIONS(id),
          queryFn: async () =>
            await InstructorService.getInternshipApplications(id),
          enabled: !!id,
          ...options,
        });
      },

      usePendingInternships(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
          queryFn: async () => await InstructorService.getPendingInternships(),
          ...options,
        });
      },

      useInstructorStudents(params, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(params),
          queryFn: async () => await InstructorService.getMyStudents(params),
          ...options,
        });
      },

      useApproveRejectApplication(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, appId, action }) => {
            if (action === "approve") {
              return await InstructorService.approveApplication(id, appId);
            } else {
              return await InstructorService.rejectApplication(id, appId);
            }
          },
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIP_APPLICATIONS(variables.id),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                `Application ${variables.action}d successfully!`,
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(
              error.message || `Failed to ${variables.action} application.`,
            );
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorImmersions(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSIONS(),
          queryFn: async () => await InstructorService.getMyImmersions(),
          ...options,
        });
      },

      useImmersionRegistrations(immersionId, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSION_REGS(immersionId),
          queryFn: async () =>
            await InstructorService.getImmersionRegistrations(immersionId),
          enabled: !!immersionId,
          ...options,
        });
      },

      useUpdateImmersionStatus(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ regId, payload }) =>
            await InstructorService.updateImmersionStatus(regId, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: INSTRUCTOR_QUERY_KEYS.ALL });
            toast.success(
              (data as { message?: string })?.message ||
                "Immersion status updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update status.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useAcceptImmersionAssignment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await InstructorService.acceptImmersionAssignment(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSIONS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Immersion program accepted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to accept immersion program.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useRejectImmersionAssignment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, remarks }) =>
            await InstructorService.rejectImmersionAssignment(id, remarks),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSIONS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Immersion program rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to reject immersion program.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorSubmissions(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.SUBMISSIONS(),
          queryFn: async () => await InstructorService.getMySubmissions(),
          ...options,
        });
      },

      useGradeSubmission(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await InstructorService.gradeSubmission(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.SUBMISSIONS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Submission graded successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to grade submission.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useCompleteEnrollment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (enrollmentId) =>
            await InstructorService.completeEnrollment(enrollmentId),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: ["instructors", "internship"],
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship marked as completed!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to complete internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useIssueCertificate(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (
            payload:
              | {
                  enrollmentId: string;
                  signatureUrl?: string;
                  grade?: string;
                  credits?: string;
                }
              | string,
          ) => await InstructorService.issueCertificate(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: ["instructors", "internship"],
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Certificate issued successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to issue certificate.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorNotices(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.NOTICES(),
          queryFn: async () => await InstructorService.listNotices(),
          ...options,
        });
      },

      usePostNotice(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.createNotice(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.NOTICES(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Notice published successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to publish notice.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useMyTickets(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.TICKETS(),
          queryFn: async () => await InstructorService.getMyTickets(),
          ...options,
        });
      },

      useCreateTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.createTicket(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.TICKETS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Support ticket raised successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to raise support ticket.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorIDCard(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.ID_CARD(),
          queryFn: async () => await InstructorService.getIDCard(),
          ...options,
        });
      },

      useDownloadInstructorIDCard(options) {
        return useMutation({
          mutationFn: async () => await InstructorService.downloadIDCard(),
          ...options,
        });
      },
    };
    type ImmersionApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

    interface InstructorImmersionRow {
      id: string;
      title: string;
      description: string;
      status: "UPCOMING" | "ACTIVE" | "COMPLETED";
      location?: string;
      period?: string;
      fees?: number;
      instructorId: string | null;
      categoryName?: string;
      approvalStatus: ImmersionApprovalStatus;
      approvalRemarks?: string | null;
    }

    function Dialog({
      ...props
    }: React_3.ComponentProps<typeof SheetPrimitive.Root>) {
      return <SheetPrimitive.Root data-slot="dialog" {...props} />;
    }

    function ApplicationDetailDialog_2({
      application,
      open,
      onOpenChange,
    }: ApplicationDetailDialogProps) {
      const { user } = useAuth();

      const { data: profileResponse } = EmersionDataHooks.useEmersionProfile({
        enabled: !!user?.id && open,
        retry: false,
      });

      const profile = profileResponse?.success ? profileResponse.data : null;

      const { mutate: downloadPdf, isPending: isDownloading } =
        EmersionDataHooks.useDownloadEmersionApplication({
          onSuccess: (blob) => {
            toast.dismiss();
            if (blob) {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `Immersion_Application_${application?.id}.pdf`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
              toast.success("Application PDF downloaded successfully!");
            } else {
              toast.error("Failed to retrieve PDF download.");
            }
          },
          onError: (err: any) => {
            toast.dismiss();
            toast.error(err.message || "Failed to download application PDF.");
          },
        });

      const handleGeneratePDF = () => {
        if (!application) return;
        toast.loading("Generating application PDF...");
        downloadPdf();
      };

      if (!application) return null;

      const matchedStatic = IMMERSION_PROGRAMS.find(
        (p) => p.id === application.immersionId,
      );

      const programTitle =
        application.immersion?.title ||
        matchedStatic?.title ||
        "Custom Immersion Projects";
      const programCategory = matchedStatic?.category || "Immersion Program";
      const programLocation =
        application.immersion?.location || matchedStatic?.location || "Remote";
      const programDuration =
        application.preferredDuration || matchedStatic?.period || "Flexible";
      const fees = (application.immersion as any)?.fees ?? matchedStatic?.fees ?? 0;
      const isPaid = fees > 0;

      const isEnrolled = application.status === "APPROVED";

      console.log("Application Immersion Data:", application.immersion);

      const statusColors: Record<string, string> = {
        DRAFT: "bg-muted text-muted-foreground border-border",
        SUBMITTED:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
        UNDER_REVIEW:
          "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30",
        APPROVED:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
        REJECTED:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30",
      };

      const statusLabel: Record<string, string> = {
        DRAFT: "Draft",
        SUBMITTED: "Submitted — Pending Review",
        UNDER_REVIEW: "Under Review",
        APPROVED: "Approved",
        REJECTED: "Rejected / Not Selected",
      };

      const academics = application.academicDetails || [];

      const currentAddress = profile
        ? [
            profile.currentAddressLocal,
            profile.currentAddressDistrict,
            profile.currentAddressState,
            profile.currentAddressCountry,
            profile.currentAddressPinCode,
          ]
            .filter(Boolean)
            .join(", ")
        : "";

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
            <DialogHeader className="border-muted border-b p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <DialogTitle className="font-heading dark:text-foreground text-xl font-bold text-emerald-950">
                    Application Details
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-1">
                    Overview of your immersion application and registration profile.
                  </DialogDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGeneratePDF}
                  disabled={isDownloading}
                  className="w-full shrink-0 gap-2 self-start border-emerald-600 text-emerald-700 hover:bg-emerald-50/50 hover:text-emerald-800 sm:w-auto sm:self-center dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
                >
                  {isDownloading ? (
                    <Loader2 className="size-4 animate-spin text-emerald-600" />
                  ) : (
                    <Download className="size-4" />
                  )}
                  Generate PDF
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6 p-6">
              {}
              <div className="grid grid-cols-1 gap-4 rounded-xl border border-emerald-100/50 bg-emerald-50/30 p-4 sm:grid-cols-2 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-400/80">
                    {isEnrolled ? "Enrollment ID" : "Application ID"}
                  </span>
                  <div className="pt-0.5">
                    <ApplicationIdChip
                      id={application.id}
                      createdAt={application.submittedAt || application.createdAt}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-400/80">
                    Applied Date
                  </span>
                  <p className="text-sm font-medium text-emerald-950 dark:text-emerald-100">
                    {formatHumanReadableDate(
                      application.submittedAt || application.createdAt,
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between space-y-1 border-t border-emerald-100/40 pt-3 sm:col-span-2 dark:border-emerald-900/20">
                  <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                      statusColors[application.status] || "bg-muted text-foreground"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        application.status === "APPROVED"
                          ? "bg-emerald-600"
                          : application.status === "REJECTED"
                            ? "bg-red-600"
                            : "bg-amber-600"
                      }`}
                    />
                    {statusLabel[application.status] || application.status}
                  </span>
                </div>
              </div>

              {}
              <div className="border-muted space-y-3 rounded-xl border p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-emerald-950 dark:text-emerald-400">
                  <User className="size-4 text-emerald-600 dark:text-emerald-400" />
                  Immersion Details
                </h3>
                <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Immersion ID
                    </span>
                    <div className="pt-0.5">
                      <span className="inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {formatImmersionCode(application.immersionId, programTitle)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Duration
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {programDuration || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Program Name
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {programTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Category / Organization
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {programCategory}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Type / Mode
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {isPaid ? "PAID" : "FREE"} /{" "}
                      {application.presenceType === "ONLINE" ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Location
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {programLocation}
                    </span>
                  </div>
                </div>
              </div>

              {}
              <div className="border-muted space-y-3 rounded-xl border p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-emerald-950 dark:text-emerald-400">
                  <User className="size-4 text-emerald-600 dark:text-emerald-400" />
                  Candidate Information
                </h3>
                <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Full Name
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {profile?.fullName || user?.name || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Immersion ID
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {profile?.emersionId || user?.registrationNo || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Father / Spouse Name
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {profile?.fatherSpouseName || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block flex items-center gap-1 font-sans text-[10px]">
                      <Calendar className="text-muted-foreground size-3" />
                      Date of Birth / Gender
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {profile?.dob ? formatHumanReadableDate(profile.dob) : "—"} /{" "}
                      {profile?.gender || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block flex items-center gap-1 font-sans text-[10px]">
                      <Mail_2 className="text-muted-foreground size-3" />
                      Email Address
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {profile?.emailAddress || user?.email || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block flex items-center gap-1 font-sans text-[10px]">
                      <Phone_2 className="text-muted-foreground size-3" />
                      Mobile / Alternate
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {profile?.mobileNo || "—"}
                      {profile?.alternateMobileNo
                        ? ` / ${profile.alternateMobileNo}`
                        : ""}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block flex items-center gap-1 font-sans text-[10px]">
                      <MapPin_2 className="text-muted-foreground size-3" />
                      Current Address
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {currentAddress || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {}
              <div className="border-muted space-y-3 rounded-xl border p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-emerald-950 dark:text-emerald-400">
                  <GraduationCap_2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                  Academics
                </h3>
                <div className="max-h-[200px] space-y-3 overflow-y-auto pr-1">
                  {academics && academics.length > 0 ? (
                    academics.map((acad: any, idx: number) => (
                      <div
                        key={acad.id || idx}
                        className="border-muted border-b pb-2 text-xs last:border-0 last:pb-0"
                      >
                        <p className="font-semibold text-emerald-950 dark:text-emerald-100">
                          {acad.qualification} ({acad.stream || "N/A"})
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          {acad.instituteName || "N/A"} |{" "}
                          {acad.universityName || "N/A"}
                        </p>
                        <p className="text-muted-foreground text-[10px]">
                          Year: {acad.sessionYear || "N/A"} | Grade:{" "}
                          {acad.gradeDivision || "N/A"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-xs italic">
                      No academic records.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="border-muted bg-muted/20 border-t p-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    function PaymentModal_3({
      program,
      applicationId,
      open,
      onClose,
      onCancel,
    }: PaymentModalProps) {
      const [orderData, setOrderData] = useState<{
        paymentId: string;
        razorpayOrderId: string;
        amount: number;
        currency: string;
        keyId: string;
        isMockMode: boolean;
      } | null>(null);
      const [paymentError, setPaymentError] = useState<string | null>(null);
      const [isProcessing, setIsProcessing] = useState(false);

      const { mutate: createOrder, isPending: isCreatingOrder } =
        EmersionDataHooks.useCreateEmersionPaymentOrder({
          onSuccess: (data) => {
            if (data.success && data.data) {
              setOrderData(data.data);
            }
          },
        });

      const { mutate: verifyPayment, isPending: isVerifying } =
        EmersionDataHooks.useVerifyEmersionPaymentSignature({
          onSuccess: () => onClose(),
        });

      const handleCreateOrder = () => {
        setPaymentError(null);
        createOrder({ applicationId } as any);
      };

      const handleOpenRazorpay = async () => {
        if (!orderData) return;
        setIsProcessing(true);
        setPaymentError(null);

        const loaded = await loadRazorpayScript_2();
        if (!loaded) {
          setPaymentError(
            "Failed to load payment gateway. Please try the mock payment option.",
          );
          setIsProcessing(false);
          return;
        }

        const rzp = new (window as any).Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "IIInternship",
          description: program.title,
          order_id: orderData.razorpayOrderId,
          handler: (response: RazorpayResponse) => {
            verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
          },
          theme: { color: "#059669" },
        });

        rzp.open();
        setIsProcessing(false);
      };

      const handleMockPayment = () => {
        if (!orderData) return;
        verifyPayment({
          razorpayOrderId: orderData.razorpayOrderId,
          razorpayPaymentId: `mock_pay_${Date.now()}`,
          razorpaySignature: `mock_sig_${Date.now()}`,
        });
      };

      const isLoading = isCreatingOrder || isVerifying || isProcessing;

      return (
        <ResponsiveDialog
          isOpen={open}
          setIsOpen={(o) => !o && onCancel()}
          title={
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                <CreditCard className="size-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-lg font-bold">Complete Payment</span>
                <p className="text-muted-foreground mt-0.5 text-xs font-normal">
                  Secure enrollment via Razorpay
                </p>
              </div>
            </div>
          }
        >
          <div className="mt-2 space-y-5">
            {}
            <div className="bg-muted/50 space-y-3 rounded-xl p-4">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Order Summary
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Program</span>
                  <span className="text-foreground font-medium">
                    {program.title}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ₹{program.fees?.toLocaleString() ?? "0"}
                  </span>
                </div>
              </div>
            </div>

            {}
            {paymentError && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-700 dark:bg-red-900/10 dark:text-red-400">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <p>{paymentError}</p>
              </div>
            )}

            {}
            {!orderData ? (
              <Button
                id="create-order-btn"
                className="h-11 w-full gap-2"
                onClick={handleCreateOrder}
                disabled={isLoading}
              >
                {isCreatingOrder ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CreditCard className="size-4" />
                )}
                Proceed to Pay
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-700 dark:bg-emerald-900/10">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Order created! Complete payment to get enrolled.
                  </p>
                </div>

                <Button
                  id="razorpay-pay-btn"
                  className="h-11 w-full gap-2"
                  onClick={handleOpenRazorpay}
                  disabled={isLoading}
                >
                  {isProcessing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CreditCard className="size-4" />
                  )}
                  Pay with Razorpay
                </Button>

                {}
                {orderData.isMockMode && (
                  <div className="space-y-2">
                    <Separator />
                    <p className="text-muted-foreground text-center text-[11px]">
                      This is running in{" "}
                      <span className="font-semibold text-amber-500">
                        Mock Mode
                      </span>
                      .
                    </p>
                    <Button
                      id="mock-pay-btn"
                      variant="outline"
                      className="h-10 w-full gap-2 border-amber-300 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                      onClick={handleMockPayment}
                      disabled={isLoading}
                    >
                      {isVerifying ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="size-4" />
                      )}
                      Simulate Payment (Mock)
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </ResponsiveDialog>
      );
    }

    function ApplicationActions({ application }: ApplicationActionsProps) {
      const [showDetails, setShowDetails] = useState(false);
      const [showPayment, setShowPayment] = useState(false);
      const [isDownloading, setIsDownloading] = useState(false);

        const [showSubmitDialog, setShowSubmitDialog] = useState(false);
      const [showSubmissionsDialog, setShowSubmissionsDialog] = useState(false);
      const [submissions, setSubmissions] = useState<MockSubmission[]>([]);

        const localStorageKey = `immersion_projects_${application.id}`;

      const loadSubmissions = () => {
        const saved = localStorage.getItem(localStorageKey);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setSubmissions(parsed);
            } else if (parsed && typeof parsed === "object") {
                        setSubmissions([{ id: "1", ...parsed }]);
            }
          } catch (e) {
            setSubmissions([]);
          }
        } else {
                const oldSaved = localStorage.getItem(
            `immersion_project_${application.id}`,
          );
          if (oldSaved) {
            try {
              const parsed = JSON.parse(oldSaved);
              if (parsed) {
                const list = [{ id: "1", ...parsed }];
                localStorage.setItem(localStorageKey, JSON.stringify(list));
                setSubmissions(list);
              }
            } catch (e) {
              setSubmissions([]);
            }
          } else {
            setSubmissions([]);
          }
        }
      };

      useEffect(() => {
        loadSubmissions();
      }, [localStorageKey, showSubmitDialog, showSubmissionsDialog]);

      const handleDownloadPDF = async () => {
        setIsDownloading(true);
        toast.loading("Generating payment invoice / PDF...");
        try {
          const response = await axios.get(
            `/api/v1/immersion-participant/application/download?id=${application.id}`,
            { responseType: "blob" },
          );
          toast.dismiss();

          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `immersion-invoice-${application.id}.pdf`;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          toast.success("Payment Invoice downloaded successfully!");
        } catch (err: any) {
          toast.dismiss();
          toast.error(err.message || "Failed to download payment invoice.");
        } finally {
          setIsDownloading(false);
        }
      };

      const matchedStatic = IMMERSION_PROGRAMS.find(
        (p) => p.id === application.immersionId,
      );
      const programSummary = {
        id: application.immersionId || "",
        title: application.immersion?.title || matchedStatic?.title || "Program",
        fees: (matchedStatic as any)?.fees || 0,
      };
      const paymentProgramObj = (matchedStatic || application.immersion) as any;

      const isApproved = application.status === "APPROVED";

        const handleProjectSubmit = (e: React_3.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const projectTitle = formData.get("projectTitle") as string;
        const projectUrl = formData.get("projectUrl") as string;
        const comments = formData.get("comments") as string;

        if (!projectTitle || !projectUrl) {
          toast.error("Please fill in all required fields.");
          return;
        }

        const newSub: MockSubmission = {
          id: Math.random().toString(36).substring(7),
          projectTitle,
          projectUrl,
          comments,
          submittedAt: new Date().toISOString(),
          status: "WAITING_FOR_ADMIN",
        };

        const updated = [...submissions, newSub];
        localStorage.setItem(localStorageKey, JSON.stringify(updated));
        setSubmissions(updated);
        setShowSubmitDialog(false);
        toast.success("Project submitted successfully (Simulated)!");
      };

      const handleProjectDelete = (id: string) => {
        const updated = submissions.filter((sub) => sub.id !== id);
        localStorage.setItem(localStorageKey, JSON.stringify(updated));
        setSubmissions(updated);
        toast.success("Submission deleted successfully (Simulated)!");
      };

      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-end"
        >
          <DropdownMenu_4>
            <DropdownMenuTrigger_4 asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger_4>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setShowDetails(true)}
                className="cursor-pointer"
              >
                <Info className="mr-2 h-3.5 w-3.5" />
                <span>Application Details</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="cursor-pointer"
              >
                <Download className="mr-2 h-3.5 w-3.5" />
                <span>Payment Invoice</span>
              </DropdownMenuItem>

              {application.status === "DRAFT" && (
                <DropdownMenuItem
                  onClick={() => setShowPayment(true)}
                  className="cursor-pointer font-semibold text-emerald-600 focus:text-emerald-700"
                >
                  <CreditCard className="mr-2 h-3.5 w-3.5" />
                  <span>Pay Fees</span>
                </DropdownMenuItem>
              )}

              {isApproved && (
                <DropdownMenuItem
                  onClick={() => setShowSubmitDialog(true)}
                  className="cursor-pointer font-semibold text-emerald-600 focus:text-emerald-700"
                >
                  <Send className="mr-2 h-3.5 w-3.5" />
                  <span>Submit Project</span>
                </DropdownMenuItem>
              )}

              {isApproved && submissions.length > 0 && (
                <DropdownMenuItem
                  onClick={() => setShowSubmissionsDialog(true)}
                  className="cursor-pointer font-semibold text-indigo-600 focus:text-indigo-700"
                >
                  <FolderOpen className="mr-2 h-3.5 w-3.5" />
                  <span>Show Submitted Projects</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu_4>

          <ApplicationDetailDialog_2
            application={application}
            open={showDetails}
            onOpenChange={setShowDetails}
          />

          {showPayment && (
            <PaymentModal_3
              program={paymentProgramObj}
              applicationId={application.id}
              open={showPayment}
              onClose={() => setShowPayment(false)}
              onCancel={() => setShowPayment(false)}
            />
          )}

          {}
          <Dialog_11 open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-foreground text-base font-bold">
                  Submit Immersion Project
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs">
                  Provide your project deliverables for{" "}
                  <span className="text-foreground font-semibold">
                    {programSummary.title}
                  </span>
                  .
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleProjectSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="projectTitle" className="text-xs">
                    Project Title *
                  </Label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    required
                    placeholder="e.g. Rural Water Management Analysis"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="projectUrl" className="text-xs">
                    Project URL *
                  </Label>
                  <Input
                    id="projectUrl"
                    name="projectUrl"
                    type="url"
                    required
                    placeholder="e.g. https://github.com/yourusername/project"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="comments" className="text-xs">
                    Comments (Optional)
                  </Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder="Any special notes or instructions for the mentor..."
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="h-10 w-full gap-2">
                    <Send className="size-4" />
                    Submit Project
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog_11>

          {}
          <Dialog_11
            open={showSubmissionsDialog}
            onOpenChange={setShowSubmissionsDialog}
          >
            <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
              <DialogHeader className="flex flex-row items-center justify-between">
                <div>
                  <DialogTitle className="text-foreground text-base font-bold">
                    Submitted Projects
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-xs">
                    All project submissions you have made for{" "}
                    <span className="text-foreground font-semibold">
                      {programSummary.title}
                    </span>
                    .
                  </DialogDescription>
                </div>
                <Button
                  size="sm"
                  className="gap-1 font-semibold"
                  onClick={() => {
                    setShowSubmissionsDialog(false);
                    setShowSubmitDialog(true);
                  }}
                >
                  <Plus className="size-3.5" />
                  Add Project
                </Button>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-muted/50 space-y-3 rounded-2xl border p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-foreground text-sm font-bold leading-normal">
                          {submission.projectTitle}
                        </h4>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          Submitted on{" "}
                          {formatHumanReadableDate_12(submission.submittedAt)}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="border-amber-200/50 bg-amber-100 font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                      >
                        {submission.status.replace(/_/g, " ")}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-card flex items-center justify-between rounded-lg border p-2 text-xs">
                        <span className="text-muted-foreground max-w-[220px] truncate">
                          {submission.projectUrl}
                        </span>
                        <a
                          href={submission.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary flex items-center gap-1 font-semibold hover:underline"
                        >
                          Visit Link <ExternalLink className="size-3" />
                        </a>
                      </div>

                      {submission.comments && (
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-[10px] font-semibold">
                            Comments
                          </p>
                          <div className="bg-card text-muted-foreground rounded-lg border p-2.5 text-xs">
                            <p className="flex items-start gap-1.5 leading-relaxed">
                              <MessageSquare className="mt-0.5 size-3 shrink-0" />
                              {submission.comments}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2 border-t pt-2">
                        <div className="flex flex-1 items-center gap-1.5 text-xs">
                          <Award className="size-4 text-violet-500" />
                          <span className="text-muted-foreground">Grade:</span>
                          <span className="font-semibold text-violet-600 dark:text-violet-400">
                            —
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20"
                          onClick={() => handleProjectDelete(submission.id)}
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog_11>
        </div>
      );
    }

    const columns = (
      userName?: string,
    ): ColumnDef_2<EmersionApplicationData>[] => [
      {
        id: "programId",
        header: "Immersion Program ID",
        cell: ({ row }) => {
          const matchedStatic = IMMERSION_PROGRAMS.find(
            (p) => p.id === row.original.immersionId,
          );
          const title = row.original.immersion?.title || matchedStatic?.title || "";
          const code = formatImmersionCode_8(
            row.original.immersionId || row.original.id,
            title,
          );
          return (
            <span className="inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              {code}
            </span>
          );
        },
      },
      {
        id: "applicationId",
        header: "Application ID",
        cell: ({ row }) => (
          <ApplicationIdChip
            id={row.original.id}
            createdAt={row.original.submittedAt || row.original.createdAt}
          />
        ),
      },
      {
        id: "programName",
        header: "Immersion Program Name",
        cell: ({ row }) => {
          const matchedStatic = IMMERSION_PROGRAMS.find(
            (p) => p.id === row.original.immersionId,
          );
          return (
            <span className="text-foreground font-semibold">
              {row.original.immersion?.title ||
                matchedStatic?.title ||
                "Not selected yet"}
            </span>
          );
        },
      },
      {
        id: "location",
        header: "Location",
        cell: ({ row }) => {
          const matchedStatic = IMMERSION_PROGRAMS.find(
            (p) => p.id === row.original.immersionId,
          );
          const displayAddress =
            row.original.preferredLocation ||
            row.original.immersion?.location ||
            matchedStatic?.location ||
            "Remote";
          return (
            <span className="text-muted-foreground text-xs">{displayAddress}</span>
          );
        },
      },
      {
        id: "typeMode",
        header: "Type & Mode",
        cell: ({ row }) => {
          const matchedStatic = IMMERSION_PROGRAMS.find(
            (p) => p.id === row.original.immersionId,
          );
          const fees =
            (row.original.immersion as any)?.fees ??
            (matchedStatic as any)?.fees ??
            0;
          const isPaid = fees > 0;
          const typeLabel = isPaid ? "Paid" : "Free";

          const presenceType = row.original.presenceType;
          const modeLabel =
            presenceType === "ONLINE"
              ? "Virtual"
              : presenceType === "OFFLINE"
                ? "Physical"
                : "Hybrid";

          return (
            <div className="flex flex-wrap gap-1">
              <span className="inline-block rounded-md border border-emerald-100 bg-emerald-50/50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-400">
                {typeLabel}
              </span>
              {presenceType && (
                <span className="inline-block rounded-md border border-purple-100 bg-purple-50/50 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:border-purple-950 dark:bg-purple-950/30 dark:text-purple-400">
                  {modeLabel}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "participantName",
        header: "Student Name",
        cell: ({ row }) => (
          <span className="text-foreground text-xs font-medium">
            {userName || "Participant"}
          </span>
        ),
      },
      {
        accessorKey: "submittedAt",
        header: "Applied Date",
        cell: ({ row }) => (
          <span className="text-muted-foreground text-xs">
            {row.original.submittedAt
              ? formatHumanReadableDate_13(row.original.submittedAt)
              : "—"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusChip_10 status={row.original.status} />,
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => <ApplicationActions application={row.original} />,
        enableSorting: false,
        enableHiding: false,
      },
    ];

    interface InstructorImmersionActionsProps {
      program: InstructorImmersionRow;
      onAccept: (id: string) => void;
      onReject: (id: string) => void;
      isAccepting?: boolean;
      isRejecting?: boolean;
    }

    const InstructorImmersionActions: React.FC<
      InstructorImmersionActionsProps
    > = ({ program, onAccept, onReject, isAccepting, isRejecting }) => {
      const approvalStatus = program.approvalStatus;
      const isPendingReview = approvalStatus === "PENDING";
      const isAccepted = approvalStatus === "APPROVED";
      const isRejected = approvalStatus === "REJECTED";

          const hasApplicationsAccess = !!program.instructorId && isAccepted;
      const appsHref = `/super-admin/immersions/${program.id}/applications`;

      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-end"
        >
          <DropdownMenu_5>
            <DropdownMenuTrigger_5 asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-accent hover:text-foreground h-8 w-8 cursor-pointer rounded-lg p-0"
                title="Actions menu"
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger_5>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild className="cursor-pointer font-semibold">
                <Link href={appsHref} target="_blank" rel="noopener noreferrer">
                  <Eye className="text-primary mr-2 size-3.5" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>

              {hasApplicationsAccess && (
                <DropdownMenuItem asChild className="cursor-pointer font-semibold">
                  <Link href={appsHref}>
                    <Users_2 className="mr-2 size-3.5 text-blue-500" />
                    <span>View Applications</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {(isPendingReview || isRejected) && (
                <DropdownMenuItem
                  disabled={isAccepting}
                  onClick={() => onAccept(program.id)}
                  className="cursor-pointer font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  <Check_2 className="mr-2 size-3.5 text-emerald-500" />
                  <span>Accept Program</span>
                </DropdownMenuItem>
              )}

              {(isPendingReview || isAccepted) && (
                <DropdownMenuItem
                  disabled={isRejecting}
                  onClick={() => onReject(program.id)}
                  className="cursor-pointer font-semibold text-rose-600 dark:text-rose-400"
                >
                  <X className="mr-2 size-3.5 text-rose-500" />
                  <span>Reject Program</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu_5>
        </div>
      );
    };

    const immersionColumns = ({
      onAccept,
      onReject,
      isAccepting,
      isRejecting,
    }: ImmersionColumnsProps): ColumnDef<InstructorImmersionRow>[] => [
      {
        id: "programId",
        header: "Immersion Program ID",
        cell: ({ row }) => {
          const code = formatImmersionCode_10(row.original.id, row.original.title);
          return (
            <span className="inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              {code}
            </span>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Program Title",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-foreground max-w-[220px] truncate text-xs font-bold leading-snug">
              {row.getValue("title")}
            </span>
            <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
              {row.original.categoryName || "Immersion Program"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <span className="text-foreground/80 text-xs font-semibold">
            {(row.getValue("location") as string) || "—"}
          </span>
        ),
      },
      {
        accessorKey: "period",
        header: "Duration",
        cell: ({ row }) => (
          <span className="text-foreground/80 text-xs font-semibold">
            {(row.getValue("period") as string) || "—"}
          </span>
        ),
      },
      {
        accessorKey: "fees",
        header: "Fees",
        cell: ({ row }) => {
          const val = (row.getValue("fees") as number) ?? 0;
          return (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {val === 0 ? "Free" : `₹${val.toLocaleString()}`}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const colors: Record<string, string> = {
            ACTIVE:
              "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50",
            UPCOMING:
              "bg-blue-50 text-blue-700 border-blue-200/70 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50",
            COMPLETED: "bg-muted text-muted-foreground border-border/60",
          };
          return (
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[status] ?? colors.COMPLETED}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "approvalStatus",
        header: "Approval Status",
        cell: ({ row }) => {
          const status = row.original.approvalStatus;
          const colors: Record<ImmersionApprovalStatus, string> = {
            APPROVED:
              "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            REJECTED:
              "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
            PENDING:
              "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
          };
          return (
            <div className="flex flex-col gap-0.5">
              <span
                className={`inline-flex w-fit items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[status]}`}
              >
                {status === "PENDING" ? "PENDING ACCEPTANCE" : status}
              </span>
              {status === "REJECTED" && row.original.approvalRemarks && (
                <span className="text-muted-foreground max-w-[180px] truncate text-[10px] font-medium">
                  {row.original.approvalRemarks}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <InstructorImmersionActions
            program={row.original}
            onAccept={onAccept}
            onReject={onReject}
            isAccepting={isAccepting}
            isRejecting={isRejecting}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ];

    const InstructorImmersionsTable = () => {
      const searchParams = useSearchParams();

      const page = Number(searchParams?.get("page")) || 1;
      const limit = Number(searchParams?.get("size")) || 10;
      const searchRaw = (searchParams?.get("filter") || "").toLowerCase();
      const search = searchRaw
        .replace(/^internship id\s*:\s*/i, "")
        .replace(/^immersion program id\s*:\s*/i, "")
        .replace(/^program id\s*:\s*/i, "")
        .replace(/^application id\s*:\s*/i, "")
        .trim();

      const [meta, setMeta] = useState<TMeta_7>({ total: 0, limit, page });

      const { data: response, isLoading } =
        InstructorDataHooks.useInstructorImmersions();

      const { mutate: acceptProgram, isPending: isAccepting } =
        InstructorDataHooks.useAcceptImmersionAssignment();

      const { mutate: rejectProgram, isPending: isRejecting } =
        InstructorDataHooks.useRejectImmersionAssignment();

      const allImmersions = useMemo<InstructorImmersionRow[]>(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = (response?.data as any[]) || [];
        return raw.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? "",
          status: item.status ?? "UPCOMING",
          location: item.location ?? "",
          period: item.period ?? "",
          fees: item.fees ?? 0,
          instructorId: item.instructorId ?? null,
          categoryName: item.category?.name ?? undefined,
          approvalStatus: item.instructorApprovalStatus ?? "PENDING",
          approvalRemarks: item.instructorRemarks ?? null,
        }));
      }, [response]);

      const filteredList = useMemo(() => {
        if (!search) return allImmersions;
        return allImmersions.filter((i) => {
          const formattedId = formatImmersionCode_11(i.id, i.title);
          return (
            i.title.toLowerCase().includes(search) ||
            i.id.toLowerCase().includes(search) ||
            formattedId.toLowerCase().includes(search) ||
            (i.location ?? "").toLowerCase().includes(search) ||
            (i.categoryName ?? "").toLowerCase().includes(search)
          );
        });
      }, [allImmersions, search]);

      const paginatedList = useMemo(
        () => filteredList.slice((page - 1) * limit, page * limit),
        [filteredList, page, limit],
      );

      useEffect(() => {
        setMeta((prev) => ({ ...prev, page, limit, total: filteredList.length }));
      }, [filteredList.length, page, limit]);

      return (
        <div className="w-full min-w-0">
          <DataTable
            columns={immersionColumns({
              onAccept: (id) => acceptProgram(id),
              onReject: (id) => rejectProgram({ id }),
              isAccepting,
              isRejecting,
            })}
            data={paginatedList}
            isLoading={isLoading}
            meta={meta}
            setMeta={setMeta}
            toolbar={
              <div className="flex items-center gap-2">
                <DataTableSearch
                  searchKey="filter"
                  placeholder="Search immersion programs..."
                  small
                />
              </div>
            }
          />
        </div>
      );
    };
    const InternshipsListingTable = () => {
      const searchParams = useSearchParams();

      const page = Number(searchParams?.get("page")) || 1;
      const limit = Number(searchParams?.get("size")) || 10;
      const searchRaw = (searchParams?.get("filter") || "").toLowerCase();
      const search = searchRaw
        .replace(/^internship id\s*:\s*/i, "")
        .replace(/^immersion program id\s*:\s*/i, "")
        .replace(/^program id\s*:\s*/i, "")
        .replace(/^application id\s*:\s*/i, "")
        .trim();

      const [meta, setMeta] = useState<TMeta_8>({ total: 0, limit, page });
      const [selectedInternship, setSelectedInternship] =
        useState<InternshipPublic | null>(null);
      const [isDetailOpen, setIsDetailOpen] = useState(false);

      const activeTab = searchParams?.get("type") || "i3";

      const { data, isLoading } = InstructorDataHooks.useInstructorInternships();
      const { data: immersionsData } =
        InstructorDataHooks.useInstructorImmersions();

      const tabs = useMemo<TSectionItems_3[]>(() => {
        const baseTabs: TSectionItems_3[] = [
          {
            id: "i3",
            label: "Assigned by i3 (Super Admin)",
            href: "i3",
            link: "/instructor/internships?type=i3",
          },
          {
            id: "normal",
            label: "Normal (Proposed by Me)",
            href: "normal",
            link: "/instructor/internships?type=normal",
          },
        ];

        const hasImmersions =
          immersionsData?.data && (immersionsData.data as any[]).length > 0;

        if (hasImmersions) {
          baseTabs.push({
            id: "immersions",
            label: "Immersion Programs",
            href: "immersions",
            link: "/instructor/internships?type=immersions",
          });
        }

        return baseTabs;
      }, [immersionsData]);

      const { mutate: approvePosting, isPending: isApproving } =
        InstructorDataHooks.useApproveInternshipPosting({
          onSuccess: () => {
            setIsDetailOpen(false);
          },
        });

      const { mutate: rejectPosting, isPending: isRejecting } =
        InstructorDataHooks.useRejectInternshipPosting({
          onSuccess: () => {
            setIsDetailOpen(false);
          },
        });

      const handleReviewDetails = (item: InternshipPublic) => {
        setSelectedInternship(item);
        setIsDetailOpen(true);
      };

      const handleApprove = (id: string) => {
        approvePosting(id);
      };

      const handleReject = (id: string) => {
        rejectPosting(id);
      };

      const allInternships = useMemo<InternshipPublic[]>(
        () => data?.data || [],
        [data],
      );

      const tabFilteredList = useMemo(() => {
        return allInternships.filter((i) => {
          const creatorRole = (i as any).createdBy?.role || "SUPER_ADMIN";
          if (activeTab === "i3") {
            return creatorRole === "SUPER_ADMIN";
          } else {
            return creatorRole === "INSTRUCTOR";
          }
        });
      }, [allInternships, activeTab]);

      const filteredList = useMemo(() => {
        if (!search) return tabFilteredList;
        return tabFilteredList.filter((i) => {
          const formattedId = formatInternshipCode_5(i.id, i.companyName);
          return (
            i.id?.toLowerCase().includes(search) ||
            formattedId.toLowerCase().includes(search) ||
            i.title?.toLowerCase().includes(search) ||
            i.companyName?.toLowerCase().includes(search) ||
            i.location?.toLowerCase().includes(search)
          );
        });
      }, [tabFilteredList, search]);

      const paginatedList = useMemo(
        () => filteredList.slice((page - 1) * limit, page * limit),
        [filteredList, page, limit],
      );

      useEffect(() => {
        setMeta((prev) => ({ ...prev, page, limit, total: filteredList.length }));
      }, [filteredList.length, page, limit]);

      const isImmersionsTab = activeTab === "immersions";

      return (
        <div>
          <PageHeaderLayout>
            <div className="mb-4 flex w-full flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              <Heading
                title="Internship Management Portal"
                description="Manage your assigned cohorts, review proposed payloads, and approve/reject Super Admin assigned internships."
              />
              <div className="w-full shrink-0 sm:w-auto">
                {!isImmersionsTab && <PostInternshipButton />}
              </div>
            </div>
            <Sections sections={tabs} activeHref={activeTab} />
          </PageHeaderLayout>

          {isImmersionsTab ? (
            <InstructorImmersionsTable />
          ) : (
            <div className="w-full min-w-0">
              <DataTable
                isLoading={isLoading}
                columns={columns_2({
                  onReviewDetails: handleReviewDetails,
                  onApprove: handleApprove,
                  onReject: handleReject,
                  isApproving,
                  isRejecting,
                })}
                data={paginatedList}
                meta={meta}
                setMeta={setMeta}
                toolbar={
                  <div className="flex items-center gap-2">
                    <DataTableSearch
                      searchKey="filter"
                      placeholder="Search by ID, title, company or location"
                      small
                    />
                  </div>
                }
              />
            </div>
          )}

          <InternshipDetailDialog_3
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            internship={selectedInternship}
            isInstructorMode={
              selectedInternship
                ? (selectedInternship as any).instructorApprovalStatus ===
                    "PENDING" || !(selectedInternship as any).isApproved
                : false
            }
            onApprove={handleApprove}
            onReject={handleReject}
            isActionPending={isApproving || isRejecting}
          />
        </div>
      );
    };

  return (
    <main className="">
      <>
        {}
        <Suspense fallback={null}>
          <InternshipsListingTable />
        </Suspense>
      </>
    </main>
  );
}
