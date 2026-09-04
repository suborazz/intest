"use client";

import React_5, { Suspense } from "react";
import { AlertTriangle, Award, Calendar, CreditCard, Download, ExternalLink, FolderOpen, GraduationCap as GraduationCap_2, HeartIcon, Info, Loader2, Mail as Mail_2, MapPin as MapPin_2, MessageSquare, MoreHorizontal, Phone as Phone_2, Plus, School, Send, ShieldCheck, Trash2, User, AlertCircle as AlertCircle_2, CheckCircle2 as CheckCircle2_2, Clock, FileText as FileText_2, Search, XCircle as XCircle_2 } from "lucide-react";
import Link from "next/link";
import * as React_4 from "react";
import React_3 from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog as SheetPrimitive, DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import axios from "axios";
import { toast } from "sonner";
import { clsx as clsx_2, ClassValue as ClassValue_2 } from "clsx";
import { twMerge as twMerge_2 } from "tailwind-merge";
import { ColumnDef as ColumnDef_2 } from "@tanstack/react-table";
import { LucideIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, XIcon, SearchIcon, ChevronsLeftIcon, ChevronsRightIcon, TableIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import React_2 from "react";
import { useCallback, useRef, ReactNode, useLayoutEffect, useContext, Dispatch, SetStateAction, useMemo } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Select as SelectPrimitive, Slot, Separator as SeparatorPrimitive, Label as LabelPrimitive } from "radix-ui";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { join } from "path";
import { Cell, ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { set } from "date-fns";
import { ClassValue } from "clsx";
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

interface DonationAdmin {
  id: string;
  amount: number;
  donorName: string;
  email: string;
  mobile: string;
  address: string;
  notes?: string;
  wants80G: boolean;
  panNumber?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: string; 
  receiptPath?: string;
  createdAt: string;
  updatedAt: string;
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
      const newParams = new URLSearchParams(params?.toString());
      if (searchTerm === "") {
        newParams.delete(searchKey);
      } else {
        newParams.set(searchKey, searchTerm);
        newParams.set("page", "1");
      }
      router.push(path + "?" + newParams.toString());
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
interface GetJobOpportunitiesParams {
      page?: number;
      limit?: number;
      search?: string;
    }

type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface GenericApiResponse<T = undefined> {
      success: boolean;
      message?: string;
      data?: T;
    }

interface JobOpportunityPublic {
      id: string;
      companyName: string;
      address: string;
      postOpportunity: string;
      jobNature: string;
      fieldOfEmployment: string;
      minQualification: string;
      skillsRequired?: string;
      totalStaffStrength?: string;
      website?: string;
      logoUrl?: string;
      isActive: boolean;
      advtNo?: string;
      advtDate?: string;
      closingDate?: string;
      jdDocUrl?: string;
      jdDescription?: string | null;
      createdAt: string;
      updatedAt: string;
      createdById: string;
    }

const SUPER_ADMIN_QUERY_KEYS = {
      ALL: ["super-admin"] as const,
      JOB_OPPORTUNITIES: (params?: any) =>
        ["super-admin", "job-opportunities", params] as const,
      JOB_OPPORTUNITY_DETAIL: (id: string) =>
        ["super-admin", "job-opportunity-detail", id] as const,
      JOB_APPLICATIONS: (params?: any) =>
        ["super-admin", "job-applications", params] as const,
      PENDING_INTERNSHIPS: ["super-admin", "pending-internships"] as const,
      INTERNSHIP_APPLICATIONS: (id: string) =>
        ["super-admin", "internship-applications", id] as const,
      LEAD_INTERESTS: (id: string) =>
        ["super-admin", "lead-interests", id] as const,
      MEDIA_PHOTOS: ["super-admin", "media-photos"] as const,
      MEDIA_VIDEOS: ["super-admin", "media-videos"] as const,
      MEDIA_NEWSPAPERS: ["super-admin", "media-newspapers"] as const,
      MEDIA_ONLINE_LINKS: ["super-admin", "media-online-links"] as const,
      BLOGS: (params?: any) => ["super-admin", "blogs", params] as const,
      BLOG_DETAIL: (id: string) => ["super-admin", "blog-detail", id] as const,
      PENDING_REVIEWS: (params?: any) =>
        ["super-admin", "pending-reviews", params] as const,
      DONATIONS: (params?: any) => ["super-admin", "donations", params] as const,
      STUDENT_REGISTRATIONS: (params?: any) =>
        ["super-admin", "student-registrations", params] as const,
      STUDENT_REGISTRATION_DETAIL: (id: string) =>
        ["super-admin", "student-registration-detail", id] as const,
      INSTRUCTOR_REGISTRATIONS: (params?: any) =>
        ["super-admin", "instructor-registrations", params] as const,
      INSTRUCTOR_REGISTRATION_DETAIL: (id: string) =>
        ["super-admin", "instructor-registration-detail", id] as const,
      PENDING_INSTRUCTOR_PROFILES: [
        "super-admin",
        "pending-instructor-profiles",
      ] as const,
      IMMERSION_APPLICATIONS: ["super-admin", "immersion-applications"] as const,
      IMMERSION_APPLICATION_DETAIL: (id: string) =>
        ["super-admin", "immersion-application-detail", id] as const,
      TICKETS: (params?: any) => ["super-admin", "tickets", params] as const,
      RECRUIT_REGISTRATIONS: (params?: any) =>
        ["super-admin", "recruit-registrations", params] as const,
    };

interface GetJobApplicationsParams {
      page?: number;
      limit?: number;
      jobOpportunityId?: string;
      search?: string;
    }

interface JobApplicationPublic {
      id: string;
      jobOpportunityId: string;
      name: string;
      age: number;
      address: string;
      mobile: string;
      email: string;
      qualification: string;
      skills: string;
      resumeUrl?: string;
      status: string; 
      createdAt: string;
      updatedAt: string;
      userId: string;
      jobOpportunity?: {
        id: string;
        companyName: string;
        postOpportunity: string;
      };
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

interface MediaPhotoPublic {
      id: string;
      url: string;
      title: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaVideoPublic {
      id: string;
      youtubeId: string;
      title: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaVideoPayload {
      youtubeId: string;
      title: string;
      date: string;
      description: string;
    }

interface MediaNewspaperPublic {
      id: string;
      title: string;
      publication: string;
      date: string;
      description: string;
      imageUrl: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaOnlineLinkPublic {
      id: string;
      slNo: string;
      date: string;
      headline: string;
      agency: string;
      link: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaOnlineLinkPayload {
      slNo: string;
      date: string;
      headline: string;
      agency: string;
      link: string;
    }

interface GetBlogsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface BlogPublic {
      id: string;
      title: string;
      content: string;
      category: string;
      serialNo?: string;
      date: string;
      location?: string;
      authorName: string;
      authorRole?: string;
      authorEmail?: string;
      imageUrl?: string;
      createdAt: string;
      updatedAt: string;
    }

interface GetReviewsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface ReviewPublic {
      id: string;
      name: string;
      email: string;
      role: string;
      rating: number;
      comment: string;
      avatarUrl?: string;
      isApproved: boolean;
      approvedAt?: string;
      createdAt: string;
      updatedAt: string;
    }

interface GetDonationsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

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

interface ImmersionApplicationPublic {
      id: string;
      status: "PENDING" | "APPROVED" | "REJECTED";
      remarks: string | null;
      registeredAt: string;
      submittedAt?: string | null;
      createdAt?: string | null;
      studentId: string;
      immersionId: string;
      mentorId?: string | null;
      mentor?: {
        id: string;
        fullName?: string;
        name?: string;
        user?: {
          name?: string;
        };
      } | null;
      student?: {
        fullName: string;
        email: string;
      };
      immersion?: {
        id: string;
        title: string;
        description: string;
      };
      certificate?: {
        id: string;
        certificateNo: string;
        grade?: string | null;
        credits?: string | null;
      } | null;
      user?: {
        id?: string;
        name?: string;
        email?: string;
        registrationNo?: string | null;
      } | null;
    }

interface AssignMentorPayload {
      mentorId: string | null;
    }

interface TicketObject {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "CLOSED";
      createdAt: string;
    }

interface NoticePayload {
      title: string;
      content: string;
      targetRole?: "STUDENT" | "INSTRUCTOR";
      receiverId?: string;
      internshipIds?: string[];
      immersionIds?: string[];
    }

interface SuperAdminProfileUpdatePayload {
      name: string;
    }

interface SuperAdminProfileUpdateResponse {
      success: boolean;
      message?: string;
      data?: any;
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

type TMeta_11 = {
      total: number;
      limit: number;
      page: number;
    };

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
        if (window.Razorpay) return resolve(true);
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

function formatCurrencyINR_3(amount?: number | null): string {
      return `₹${(amount ?? 0).toLocaleString("en-IN")}`;
    }

interface IStatusChipProps_2 {
      status?: string;
    }

function cn_15(...inputs: ClassValue_2[]) {
      return twMerge_2(clsx_2(inputs));
    }

const STATUS_STYLES: Record<string, string> = {
      SUCCESS:
        "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
      FAILED:
        "bg-destructive/10 text-destructive dark:bg-destructive/20 border-destructive/20",
      PENDING:
        "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
    };

const StatusChip_13: React_4.FunctionComponent<IStatusChipProps_2> = ({ status }) => {
      const key = (status || "").toUpperCase();

      return (
        <Badge
          variant="outline"
          className={cn_15(
            "text-[9px] font-bold uppercase tracking-wider",
            STATUS_STYLES[key] ?? "bg-muted",
          )}
        >
          {status || "Unknown"}
        </Badge>
      );
    };

const StatusChip_14 = StatusChip_13;

function formatHumanReadableDate_16(date?: string | null): string {
      if (!date) return "N/A";
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) return "N/A";
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

function formatCurrencyINR_4(amount?: number | null): string {
      return `₹${(amount ?? 0).toLocaleString("en-IN")}`;
    }


export default function SuperAdminDonationsPage() {
    interface ISuperAdminService {
        getJobOpportunities: (
        params?: GetJobOpportunitiesParams,
      ) => Promise<GenericApiResponse<JobOpportunityPublic[]>>;
      getJobOpportunityById: (
        id: string,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      createJobOpportunity: (
        formData: FormData,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      updateJobOpportunity: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      deleteJobOpportunity: (id: string) => Promise<GenericApiResponse>;
      getJobApplications: (
        params?: GetJobApplicationsParams,
      ) => Promise<GenericApiResponse<JobApplicationPublic[]>>;
      exportJobApplications: (jobOpportunityId: string) => Promise<Blob>;
      updateJobApplicationStatus: (
        id: string,
        payload: {
          status: string;
          message?: string;
          pdfBase64?: string;
          link?: string;
        },
      ) => Promise<GenericApiResponse<any>>;

        getPendingInternships: () => Promise<GenericApiResponse<InternshipPublic[]>>;
      approveInternshipPosting: (id: string) => Promise<GenericApiResponse>;
      getLeadInterests: (
        internshipId: string,
      ) => Promise<GenericApiResponse<any[]>>;
      createInternship: (
        payload: any,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      updateInternship: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      getInternshipById: (
        id: string,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      deleteInternship: (id: string) => Promise<GenericApiResponse>;
      getInternshipApplications: (
        internshipId: string,
      ) => Promise<GenericApiResponse<any[]>>;
      exportInternshipApplications: (internshipId: string) => Promise<Blob>;
      approveInternshipApplication: (
        internshipId: string,
        applicationId: string,
      ) => Promise<GenericApiResponse<any>>;
      rejectInternshipApplication: (
        internshipId: string,
        applicationId: string,
      ) => Promise<GenericApiResponse<any>>;

        getMediaPhotos: () => Promise<GenericApiResponse<MediaPhotoPublic[]>>;
      createMediaPhoto: (
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaPhotoPublic>>;
      updateMediaPhoto: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaPhotoPublic>>;
      deleteMediaPhoto: (id: string) => Promise<GenericApiResponse>;

      getMediaVideos: () => Promise<GenericApiResponse<MediaVideoPublic[]>>;
      createMediaVideo: (
        payload: MediaVideoPayload,
      ) => Promise<GenericApiResponse<MediaVideoPublic>>;
      updateMediaVideo: (
        id: string,
        payload: Partial<MediaVideoPayload>,
      ) => Promise<GenericApiResponse<MediaVideoPublic>>;
      deleteMediaVideo: (id: string) => Promise<GenericApiResponse>;

      getMediaNewspapers: () => Promise<GenericApiResponse<MediaNewspaperPublic[]>>;
      createMediaNewspaper: (
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaNewspaperPublic>>;
      updateMediaNewspaper: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaNewspaperPublic>>;
      deleteMediaNewspaper: (id: string) => Promise<GenericApiResponse>;

      getMediaOnlineLinks: () => Promise<
        GenericApiResponse<MediaOnlineLinkPublic[]>
      >;
      createMediaOnlineLink: (
        payload: MediaOnlineLinkPayload,
      ) => Promise<GenericApiResponse<MediaOnlineLinkPublic>>;
      updateMediaOnlineLink: (
        id: string,
        payload: Partial<MediaOnlineLinkPayload>,
      ) => Promise<GenericApiResponse<MediaOnlineLinkPublic>>;
      deleteMediaOnlineLink: (id: string) => Promise<GenericApiResponse>;

        getBlogs: (
        params?: GetBlogsParams,
      ) => Promise<GenericApiResponse<BlogPublic[]>>;
      getBlogById: (id: string) => Promise<GenericApiResponse<BlogPublic>>;
      createBlog: (formData: FormData) => Promise<GenericApiResponse<BlogPublic>>;
      updateBlog: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<BlogPublic>>;
      deleteBlog: (id: string) => Promise<GenericApiResponse>;

        getPendingReviews: (
        params?: GetReviewsParams,
      ) => Promise<GenericApiResponse<ReviewPublic[]>>;
      approveReview: (id: string) => Promise<GenericApiResponse>;
      deleteReview: (id: string) => Promise<GenericApiResponse>;

        getDonations: (
        params?: GetDonationsParams,
      ) => Promise<GenericApiResponse<DonationAdmin[]>>;
      exportDonations: (params?: GetDonationsParams) => Promise<Blob>;

        getStudentRegistrations: (params?: any) => Promise<GenericApiResponse<any[]>>;
      getStudentRegistrationById: (id: string) => Promise<GenericApiResponse<any>>;
      updateStudentRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;
      deleteStudentRegistration: (id: string) => Promise<GenericApiResponse>;
      downloadStudentRegistration: (id: string) => Promise<Blob>;
      downloadInstructorRegistration: (id: string) => Promise<Blob>;
      downloadImmersionRegistration: (id: string) => Promise<Blob>;
      downloadRecruitRegistration: (id: string) => Promise<Blob>;
      getRecruitProfile: (userId: string) => Promise<GenericApiResponse<any>>;
      getRecruitRegistrations: (params?: any) => Promise<GenericApiResponse<any[]>>;
      deleteRecruitRegistration: (id: string) => Promise<GenericApiResponse>;
      getRecruitRegistrationById: (id: string) => Promise<GenericApiResponse<any>>;
      updateRecruitRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;

        getInstructorRegistrations: (
        params?: any,
      ) => Promise<GenericApiResponse<any[]>>;
      getInstructorRegistrationById: (
        id: string,
      ) => Promise<GenericApiResponse<any>>;
      updateInstructorRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;
      deleteInstructorRegistration: (id: string) => Promise<GenericApiResponse>;
      approveInstructorRegistration: (id: string) => Promise<GenericApiResponse>;
      rejectInstructorRegistration: (id: string) => Promise<GenericApiResponse>;

        getPendingInstructorProfiles: () => Promise<
        GenericApiResponse<PendingInstructorProfile[]>
      >;
      approveInstructorProfile: (id: string) => Promise<GenericApiResponse>;
      rejectInstructorProfile: (id: string) => Promise<GenericApiResponse>;

        getImmersionApplications: () => Promise<
        GenericApiResponse<{
          applications: ImmersionApplicationPublic[];
          pagination: any;
        }>
      >;
      getImmersionApplicationById: (
        id: string,
      ) => Promise<GenericApiResponse<ImmersionApplicationPublic>>;
      updateImmersionStatus: (
        id: string,
        payload: { status: "APPROVED" | "REJECTED"; remarks?: string },
      ) => Promise<GenericApiResponse>;
      assignImmersionMentor: (
        id: string,
        payload: AssignMentorPayload,
      ) => Promise<GenericApiResponse>;
      deleteImmersionApplication: (id: string) => Promise<GenericApiResponse>;
      exportImmersionApplications: (immersionId: string) => Promise<Blob>;

        getTickets: (params?: any) => Promise<GenericApiResponse<TicketObject[]>>;
      updateTicket: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<TicketObject>>;
      deleteTicket: (id: string) => Promise<GenericApiResponse>;

        getNotices: (params?: any) => Promise<GenericApiResponse<any[]>>;
      createNotice: (payload: NoticePayload) => Promise<GenericApiResponse>;
      deleteNotice: (id: string) => Promise<GenericApiResponse>;

        completeEnrollment: (id: string) => Promise<GenericApiResponse<any>>;
      issueCertificate: (id: string) => Promise<GenericApiResponse<any>>;
      issueImmersionCertificate: (id: string) => Promise<GenericApiResponse<any>>;

        getAllInternships: () => Promise<GenericApiResponse<any[]>>;
      getImmersions: () => Promise<GenericApiResponse<any[]>>;
      getImmersionById: (id: string) => Promise<GenericApiResponse<any>>;
      createImmersion: (payload: any) => Promise<GenericApiResponse>;
      updateImmersion: (id: string, payload: any) => Promise<GenericApiResponse>;
      deleteImmersion: (id: string) => Promise<GenericApiResponse>;
      getImmersionCategories: () => Promise<GenericApiResponse<any[]>>;
      createImmersionCategory: (payload: {
        name: string;
      }) => Promise<GenericApiResponse>;

        updateProfile: (
        id: string,
        payload: SuperAdminProfileUpdatePayload,
      ) => Promise<SuperAdminProfileUpdateResponse>;
    }

    const SuperAdminService: ISuperAdminService = {
        async getJobOpportunities(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobOpportunityPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITIES, { params });
        return response.data;
      },

      async getJobOpportunityById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id));
        return response.data;
      },

      async createJobOpportunity(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITIES, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateJobOpportunity(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteJobOpportunity(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id),
        );
        return response.data;
      },

      async getJobApplications(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobApplicationPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.JOB_APPLICATIONS, { params });
        return response.data;
      },

      async exportJobApplications(jobOpportunityId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_EXPORT_APPLICATIONS(
            jobOpportunityId,
          ),
          { responseType: "blob" },
        );
        return response.data;
      },

      async updateJobApplicationStatus(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.JOB_APPLICATION_STATUS(id),
          payload,
        );
        return response.data;
      },

        async getPendingInternships() {
        const response = await axiosInstance.get<
          GenericApiResponse<InternshipPublic[]>
        >(ENDPOINTS.INTERNSHIPS.PENDING);
        return response.data;
      },

      async approveInternshipPosting(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INTERNSHIPS.APPROVE_POSTING(id),
        );
        return response.data;
      },

      async getLeadInterests(internshipId) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.LEAD_INTERESTS(internshipId),
        );
        return response.data;
      },

      async createInternship(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS, payload);
        return response.data;
      },

      async updateInternship(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id), payload);
        return response.data;
      },

      async getInternshipById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id));
        return response.data;
      },

      async deleteInternship(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id),
        );
        return response.data;
      },

      async getInternshipApplications(internshipId) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INTERNSHIPS.APPLICATIONS(internshipId),
        );
        return response.data;
      },

      async exportInternshipApplications(internshipId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.INTERNSHIPS.EXPORT_APPLICATIONS(internshipId),
          { responseType: "blob" },
        );
        return response.data;
      },

      async approveInternshipApplication(internshipId, applicationId) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.APPROVE_APPLICATION(internshipId, applicationId),
        );
        return response.data;
      },

      async rejectInternshipApplication(internshipId, applicationId) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REJECT_APPLICATION(internshipId, applicationId),
        );
        return response.data;
      },

        async getMediaPhotos() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaPhotoPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS);
        return response.data;
      },

      async createMediaPhoto(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaPhotoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateMediaPhoto(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaPhotoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteMediaPhoto(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaVideos() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaVideoPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS);
        return response.data;
      },

      async createMediaVideo(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaVideoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS, payload);
        return response.data;
      },

      async updateMediaVideo(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaVideoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS_BY_ID(id), payload);
        return response.data;
      },

      async deleteMediaVideo(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaNewspapers() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaNewspaperPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS);
        return response.data;
      },

      async createMediaNewspaper(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaNewspaperPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateMediaNewspaper(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaNewspaperPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteMediaNewspaper(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaOnlineLinks() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaOnlineLinkPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS);
        return response.data;
      },

      async createMediaOnlineLink(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaOnlineLinkPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS, payload);
        return response.data;
      },

      async updateMediaOnlineLink(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaOnlineLinkPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS_BY_ID(id), payload);
        return response.data;
      },

      async deleteMediaOnlineLink(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS_BY_ID(id),
        );
        return response.data;
      },

        async getBlogs(params) {
        const response = await axiosInstance.get<GenericApiResponse<BlogPublic[]>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS,
          { params },
        );
        return response.data;
      },

      async getBlogById(id) {
        const response = await axiosInstance.get<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
        );
        return response.data;
      },

      async createBlog(formData) {
        const response = await axiosInstance.post<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      },

      async updateBlog(id, formData) {
        const response = await axiosInstance.patch<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      },

      async deleteBlog(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
        );
        return response.data;
      },

        async getPendingReviews(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<ReviewPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.REVIEWS_PENDING, { params });
        return response.data;
      },

      async approveReview(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.REVIEW_APPROVE(id),
        );
        return response.data;
      },

      async deleteReview(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.REVIEW_BY_ID(id),
        );
        return response.data;
      },

        async getDonations(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<DonationAdmin[]>
        >(ENDPOINTS.SUPER_ADMIN.DONATIONS_ADMIN, { params });
        return response.data;
      },

      async exportDonations(params) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.DONATIONS_ADMIN_EXPORT,
          { params, responseType: "blob" },
        );
        return response.data;
      },

        async getStudentRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.STUDENTS.REGISTER_ADMIN,
          { params },
        );
        return response.data;
      },

      async getStudentRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateStudentRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteStudentRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async downloadStudentRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.STUDENTS.REGISTER_DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadInstructorRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `/instructor/register/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadImmersionRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `/immersion/applications/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadRecruitRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async getRecruitProfile(userId) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          `${ENDPOINTS.RECRUIT.PROFILE}`,
          { params: { userId } },
        );
        return response.data;
      },

      async getRecruitRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS,
          { params },
        );
        return response.data;
      },

      async deleteRecruitRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
        );
        return response.data;
      },

      async getRecruitRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
        );
        return response.data;
      },

      async updateRecruitRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
          payload,
        );
        return response.data;
      },

        async getInstructorRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_ADMIN,
          { params },
        );
        return response.data;
      },

      async getInstructorRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateInstructorRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteInstructorRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async approveInstructorRegistration(id) {
        const response = await axiosInstance.post<GenericApiResponse>(
          `${ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id)}/approve`,
        );
        return response.data;
      },

      async rejectInstructorRegistration(id) {
        const response = await axiosInstance.post<GenericApiResponse>(
          `${ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id)}/reject`,
        );
        return response.data;
      },

        async getPendingInstructorProfiles() {
        const response = await axiosInstance.get<
          GenericApiResponse<PendingInstructorProfile[]>
        >(ENDPOINTS.INSTRUCTOR.PROFILES_PENDING);
        return response.data;
      },

      async approveInstructorProfile(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_APPROVE(id),
        );
        return response.data;
      },

      async rejectInstructorProfile(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_REJECT(id),
        );
        return response.data;
      },

        async getImmersionApplications() {
        const response = await axiosInstance.get<
          GenericApiResponse<{
            applications: ImmersionApplicationPublic[];
            pagination: any;
          }>
        >(ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATIONS);
        return response.data;
      },

      async getImmersionApplicationById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<ImmersionApplicationPublic>
        >(ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATION_BY_ID(id));
        return response.data;
      },

      async updateImmersionStatus(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_STATUS(id),
          payload,
        );
        return response.data;
      },

      async assignImmersionMentor(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_ASSIGN_MENTOR(id),
          payload,
        );
        return response.data;
      },

      async deleteImmersionApplication(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATION_BY_ID(id),
        );
        return response.data;
      },

      async exportImmersionApplications(immersionId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_EXPORT_APPLICATIONS(immersionId),
          { responseType: "blob" },
        );
        return response.data;
      },

        async getTickets(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<TicketObject[]>
        >(ENDPOINTS.SUPER_ADMIN.TICKETS_ADMIN, { params });
        return response.data;
      },

      async updateTicket(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<TicketObject>
        >(ENDPOINTS.TICKETS.BY_ID(id), payload);
        return response.data;
      },

      async deleteTicket(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.TICKETS.BY_ID(id),
        );
        return response.data;
      },

        async getNotices(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.NOTICES.BASE,
          { params },
        );
        return response.data;
      },

      async createNotice(payload) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.NOTICES.BASE,
          payload,
        );
        return response.data;
      },

      async deleteNotice(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.NOTICES.BY_ID(id),
        );
        return response.data;
      },

        async completeEnrollment(id) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.ENROLLMENTS.COMPLETE(id),
        );
        return response.data;
      },

      async issueCertificate(id) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.ENROLLMENTS.ISSUE_CERTIFICATE(id),
        );
        return response.data;
      },

      async issueImmersionCertificate(applicationId: string) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_ISSUE_CERTIFICATE(applicationId),
        );
        return response.data;
      },

        async getAllInternships() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INTERNSHIPS.BASE,
          { params: { limit: 100 } },
        );
        return response.data;
      },

      async getImmersions() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS,
        );
        return response.data;
      },

      async getImmersionById(id: string) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
        );
        return response.data;
      },

      async createImmersion(payload: any) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS,
          payload,
        );
        return response.data;
      },

      async updateImmersion(id: string, payload: any) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteImmersion(id: string) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
        );
        return response.data;
      },

      async getImmersionCategories() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_CATEGORIES,
        );
        return response.data;
      },

      async createImmersionCategory(payload: { name: string }) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_CATEGORIES,
          payload,
        );
        return response.data;
      },

      async updateProfile(id, payload) {
        const response = await axiosInstance.patch<SuperAdminProfileUpdateResponse>(
          ENDPOINTS.USERS.BY_ID(id),
          payload,
        );
        return response.data;
      },
    };
    const SuperAdminDataHooks = {
        useJobOpportunities(
        params?: GetJobOpportunitiesParams,
        options?: TQueryOptions<GenericApiResponse<JobOpportunityPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_OPPORTUNITIES(params),
          queryFn: async () => await SuperAdminService.getJobOpportunities(params),
          ...options,
        });
      },

      useJobOpportunityDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<JobOpportunityPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_OPPORTUNITY_DETAIL(id),
          queryFn: async () => await SuperAdminService.getJobOpportunityById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateJobOpportunity(
        options?: TMutationOptions<
          GenericApiResponse<JobOpportunityPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createJobOpportunity(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateJobOpportunity(
        options?: TMutationOptions<
          GenericApiResponse<JobOpportunityPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateJobOpportunity(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteJobOpportunity(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteJobOpportunity(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useJobApplications(
        params?: GetJobApplicationsParams,
        options?: TQueryOptions<GenericApiResponse<JobApplicationPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_APPLICATIONS(params),
          queryFn: async () => await SuperAdminService.getJobApplications(params),
          ...options,
        });
      },

      useExportJobApplications(options?: TMutationOptions<Blob, Error, string>) {
        return useMutation({
          mutationFn: async (jobOpportunityId) =>
            await SuperAdminService.exportJobApplications(jobOpportunityId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateJobApplicationStatus(options?: any) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: {
              status: string;
              message?: string;
              pdfBase64?: string;
              link?: string;
            };
          }) => await SuperAdminService.updateJobApplicationStatus(id, payload),
          onSuccess: (data: any, variables: any, context: any) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success("Job application status updated successfully!");
            options?.onSuccess?.(data, variables, context);
          },
          onError: (err: any, variables: any, context: any) => {
            toast.error(err.message || "Failed to update job application status.");
            options?.onError?.(err, variables, context);
          },
        });
      },

      useRecruitProfile(userId: string, options?: any) {
        return useQuery({
          queryKey: ["super-admin", "recruit-profile", userId],
          queryFn: async () => await SuperAdminService.getRecruitProfile(userId),
          enabled: !!userId,
          ...options,
        });
      },

        usePendingInternships(
        options?: TQueryOptions<GenericApiResponse<InternshipPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INTERNSHIPS,
          queryFn: async () => await SuperAdminService.getPendingInternships(),
          ...options,
        });
      },

      useInternshipDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<InternshipPublic>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "internship-detail", id],
          queryFn: async () => await SuperAdminService.getInternshipById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateInternship(
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          any
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createInternship(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateInternship(
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateInternship(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInternshipPosting(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(
              data.message || "Internship posting approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve internship posting.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteInternship(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteInternship(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useLeadInterests(
        internshipId: string,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.LEAD_INTERESTS(internshipId),
          queryFn: async () =>
            await SuperAdminService.getLeadInterests(internshipId),
          enabled: !!internshipId,
          ...options,
        });
      },

      useInternshipApplications(
        internshipId: string,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(internshipId),
          queryFn: async () =>
            await SuperAdminService.getInternshipApplications(internshipId),
          enabled: !!internshipId,
          ...options,
        });
      },

      useExportInternshipApplications(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (internshipId) =>
            await SuperAdminService.exportInternshipApplications(internshipId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInternshipApplication(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await SuperAdminService.approveInternshipApplication(
              internshipId,
              applicationId,
            ),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(
                variables.internshipId,
              ),
            });
            toast.success(data.message || "Application approved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve application.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInternshipApplication(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await SuperAdminService.rejectInternshipApplication(
              internshipId,
              applicationId,
            ),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(
                variables.internshipId,
              ),
            });
            toast.success(data.message || "Application rejected.");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject application.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useMediaPhotos(
        options?: TQueryOptions<GenericApiResponse<MediaPhotoPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
          queryFn: async () => await SuperAdminService.getMediaPhotos(),
          ...options,
        });
      },

      useCreateMediaPhoto(
        options?: TMutationOptions<
          GenericApiResponse<MediaPhotoPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaPhoto(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item uploaded successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to upload photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaPhoto(
        options?: TMutationOptions<
          GenericApiResponse<MediaPhotoPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateMediaPhoto(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaPhoto(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteMediaPhoto(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaVideos(
        options?: TQueryOptions<GenericApiResponse<MediaVideoPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
          queryFn: async () => await SuperAdminService.getMediaVideos(),
          ...options,
        });
      },

      useCreateMediaVideo(
        options?: TMutationOptions<
          GenericApiResponse<MediaVideoPublic>,
          Error,
          MediaVideoPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaVideo(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to add video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaVideo(
        options?: TMutationOptions<
          GenericApiResponse<MediaVideoPublic>,
          Error,
          { id: string; payload: Partial<MediaVideoPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateMediaVideo(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaVideo(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteMediaVideo(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaNewspapers(
        options?: TQueryOptions<GenericApiResponse<MediaNewspaperPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
          queryFn: async () => await SuperAdminService.getMediaNewspapers(),
          ...options,
        });
      },

      useCreateMediaNewspaper(
        options?: TMutationOptions<
          GenericApiResponse<MediaNewspaperPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaNewspaper(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item uploaded successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to upload newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaNewspaper(
        options?: TMutationOptions<
          GenericApiResponse<MediaNewspaperPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateMediaNewspaper(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaNewspaper(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteMediaNewspaper(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaOnlineLinks(
        options?: TQueryOptions<GenericApiResponse<MediaOnlineLinkPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
          queryFn: async () => await SuperAdminService.getMediaOnlineLinks(),
          ...options,
        });
      },

      useCreateMediaOnlineLink(
        options?: TMutationOptions<
          GenericApiResponse<MediaOnlineLinkPublic>,
          Error,
          MediaOnlineLinkPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaOnlineLink(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to add online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaOnlineLink(
        options?: TMutationOptions<
          GenericApiResponse<MediaOnlineLinkPublic>,
          Error,
          { id: string; payload: Partial<MediaOnlineLinkPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateMediaOnlineLink(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaOnlineLink(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteMediaOnlineLink(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useBlogs(
        params?: GetBlogsParams,
        options?: TQueryOptions<GenericApiResponse<BlogPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.BLOGS(params),
          queryFn: async () => await SuperAdminService.getBlogs(params),
          ...options,
        });
      },

      useBlogDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<BlogPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.BLOG_DETAIL(id),
          queryFn: async () => await SuperAdminService.getBlogById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateBlog(
        options?: TMutationOptions<GenericApiResponse<BlogPublic>, Error, FormData>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) => await SuperAdminService.createBlog(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateBlog(
        options?: TMutationOptions<
          GenericApiResponse<BlogPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateBlog(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteBlog(options?: TMutationOptions<GenericApiResponse, Error, string>) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteBlog(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        usePendingReviews(
        params?: GetReviewsParams,
        options?: TQueryOptions<GenericApiResponse<ReviewPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_REVIEWS(params),
          queryFn: async () => await SuperAdminService.getPendingReviews(params),
          ...options,
        });
      },

      useApproveReview(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.approveReview(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Review approved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve review.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteReview(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteReview(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Review deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete review.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useDonations(
        params?: GetDonationsParams,
        options?: TQueryOptions<GenericApiResponse<DonationAdmin[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.DONATIONS(params),
          queryFn: async () => await SuperAdminService.getDonations(params),
          ...options,
        });
      },

      useExportDonations(
        options?: TMutationOptions<Blob, Error, GetDonationsParams | undefined>,
      ) {
        return useMutation({
          mutationFn: async (params) =>
            await SuperAdminService.exportDonations(params),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export donations ledger.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useStudentRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.STUDENT_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getStudentRegistrations(params),
          ...options,
        });
      },

      useStudentRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.STUDENT_REGISTRATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getStudentRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateStudentRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateStudentRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Student registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update student registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteStudentRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteStudentRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Student registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete student registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadStudentRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadStudentRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to download registration PDF.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadInstructorRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadInstructorRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download instructor registration PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadImmersionRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadImmersionRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download immersion application PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadRecruitRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadRecruitRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download recruit registration PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useInstructorRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INSTRUCTOR_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getInstructorRegistrations(params),
          ...options,
        });
      },

      useInstructorRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INSTRUCTOR_REGISTRATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getInstructorRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateInstructorRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateInstructorRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to approve instructor registration.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.rejectInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useRecruitRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.RECRUIT_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getRecruitRegistrations(params),
          ...options,
        });
      },

      useDeleteRecruitRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteRecruitRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Recruit registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete recruit registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRecruitRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "recruit-registration-detail", id],
          queryFn: async () =>
            await SuperAdminService.getRecruitRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateRecruitRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateRecruitRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Recruit registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update recruit registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        usePendingInstructorProfiles(
        options?: TQueryOptions<GenericApiResponse<PendingInstructorProfile[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
          queryFn: async () =>
            await SuperAdminService.getPendingInstructorProfiles(),
          ...options,
        });
      },

      useApproveInstructorProfile(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInstructorProfile(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
            });
            toast.success(
              data.message || "Instructor onboarding profile approved!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve instructor onboarding.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInstructorProfile(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.rejectInstructorProfile(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
            });
            toast.success(
              data.message || "Instructor onboarding profile rejected.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject instructor onboarding.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useImmersionApplications(
        options?: TQueryOptions<
          GenericApiResponse<{
            applications: ImmersionApplicationPublic[];
            pagination: any;
          }>
        >,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
          queryFn: async () => await SuperAdminService.getImmersionApplications(),
          ...options,
        });
      },

      useExportImmersionApplications(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (immersionId) =>
            await SuperAdminService.exportImmersionApplications(immersionId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useImmersionApplicationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<ImmersionApplicationPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getImmersionApplicationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateImmersionStatus(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          {
            id: string;
            payload: { status: "APPROVED" | "REJECTED"; remarks?: string };
          }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateImmersionStatus(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(
                variables.id,
              ),
            });
            toast.success(data.message || "Immersion status updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update status.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useAssignImmersionMentor(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: AssignMentorPayload }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.assignImmersionMentor(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(
                variables.id,
              ),
            });
            toast.success(data.message || "Mentor assigned successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to assign mentor.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteImmersionApplication(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteImmersionApplication(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            toast.success(
              data.message || "Immersion registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete immersion registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useTickets(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<TicketObject[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.TICKETS(params),
          queryFn: async () => await SuperAdminService.getTickets(params),
          ...options,
        });
      },

      useUpdateTicket(
        options?: TMutationOptions<
          GenericApiResponse<TicketObject>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateTicket(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Ticket updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update ticket.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteTicket(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteTicket(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Ticket deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete ticket.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useNotices(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>, Error>,
      ) {
        return useQuery({
          queryKey: ["notices", params],
          queryFn: async () => await SuperAdminService.getNotices(params),
          ...options,
        });
      },

      useCreateNotice(
        options?: TMutationOptions<GenericApiResponse, Error, NoticePayload>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) => await SuperAdminService.createNotice(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(
              data.message || "Notice announcement broadcasted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to broadcast notice.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteNotice(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteNotice(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(data.message || "Notice deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete notice.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useCompleteEnrollment(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.completeEnrollment(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Enrollment marked as completed successfully.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to complete enrollment.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useIssueCertificate(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.issueCertificate(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Certificate issued successfully.");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to issue certificate.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useIssueImmersionCertificate(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.issueImmersionCertificate(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            toast.success(
              data.message || "Immersion certificate issued successfully.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to issue immersion certificate.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useAdminInternships(options?: TQueryOptions<GenericApiResponse<any[]>>) {
        return useQuery({
          queryKey: ["super-admin", "all-internships"],
          queryFn: async () => await SuperAdminService.getAllInternships(),
          ...options,
        });
      },

      useAdminImmersions(options?: TQueryOptions<GenericApiResponse<any[]>>) {
        return useQuery({
          queryKey: ["super-admin", "immersions"],
          queryFn: async () => await SuperAdminService.getImmersions(),
          ...options,
        });
      },

      useImmersionDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "immersion-detail", id],
          queryFn: async () => await SuperAdminService.getImmersionById(id),
          ...options,
        });
      },

      useCreateImmersion(
        options?: TMutationOptions<GenericApiResponse, Error, any>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await SuperAdminService.createImmersion(payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program created successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateImmersion(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateImmersion(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersion-detail", variables.id],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteImmersion(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteImmersion(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useAdminImmersionCategories(
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "immersion-categories"],
          queryFn: async () => await SuperAdminService.getImmersionCategories(),
          ...options,
        });
      },

      useCreateImmersionCategory(
        options?: TMutationOptions<GenericApiResponse, Error, { name: string }>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await SuperAdminService.createImmersionCategory(payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersion-categories"],
            });
            toast.success(
              data.message || "Immersion category created successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create category.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateProfile(
        options?: TMutationOptions<
          SuperAdminProfileUpdateResponse,
          Error,
          { id: string; payload: SuperAdminProfileUpdatePayload }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateProfile(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success(data.message || "Profile updated successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

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

        const rzp = new window.Razorpay({
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

    interface DonationAdmin {
      id: string;
      amount: number;
      donorName: string;
      email: string;
      mobile: string;
      address: string;
      notes?: string;
      wants80G: boolean;
      panNumber?: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      status: string; 
      receiptPath?: string;
      createdAt: string;
      updatedAt: string;
    }

    const columns_5 = (): ColumnDef_2<DonationAdmin>[] => [
      {
        accessorKey: "donorName",
        header: "Donor Details",
        cell: ({ row }) => (
          <div>
            <div className="text-foreground font-semibold">
              {row.original.donorName}
            </div>
            <div className="text-muted-foreground mt-0.5 text-[10px] font-medium">
              {row.original.email} • {row.original.mobile}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Contribution Amount",
        cell: ({ row }) => (
          <div className="text-foreground text-sm font-extrabold">
            {formatCurrencyINR_3(row.original.amount)}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusChip_14 status={row.original.status} />,
      },
      {
        accessorKey: "notes",
        header: "Message / Reference note",
        cell: ({ row }) => (
          <div className="text-muted-foreground line-clamp-2 max-w-sm text-xs font-medium leading-relaxed">
            {row.original.notes || (
              <span className="text-muted-foreground/50 italic">
                No note provided
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Logged Date",
        cell: ({ row }) => (
          <div className="text-foreground text-xs font-medium">
            {formatHumanReadableDate_16(row.original.createdAt)}
          </div>
        ),
      },
    ];
    const DonationsListingTable = () => {
      const searchParams = useSearchParams();

        const page = Number(searchParams?.get("page")) || 1;
      const limit = Number(searchParams?.get("size")) || 10;
      const search = searchParams?.get("filter") || undefined;

      const [meta, setMeta] = useState<TMeta_11>({ total: 0, limit, page });

      const { data: donationsResponse, isLoading } =
        SuperAdminDataHooks.useDonations({
          page,
          limit,
          search,
        });

      const donationsList = donationsResponse?.data || [];

      const { mutate: exportDonations, isPending: isExporting } =
        SuperAdminDataHooks.useExportDonations({
          onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `donations-ledger-${new Date().toISOString().split("T")[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          },
        });

      useEffect(() => {
        const total = (donationsResponse as { meta?: { total?: number } })?.meta
          ?.total;
        setMeta((prev) => ({
          ...prev,
          page,
          limit,
          total: typeof total === "number" ? total : donationsList.length,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [donationsResponse, page, limit]);

      const totalInPage = donationsList.reduce(
        (acc, d) => acc + (d.amount || 0),
        0,
      );

      return (
        <div>
          <PageHeaderLayout>
            <div className="flex w-full flex-col gap-4">
              <Heading
                title="Donations & Financial Ledger"
                description="View registered donor details, financial contributions, and associated reference notes logged onto the system."
              />
            </div>
          </PageHeaderLayout>

          <div className="w-full min-w-0">
            <DataTable
              isLoading={isLoading}
              columns={columns_5()}
              data={donationsList}
              meta={meta}
              setMeta={setMeta}
              toolbar={
                <div className="flex items-center gap-2">
                  <DataTableSearch
                    searchKey="filter"
                    placeholder="Search by donor name or email"
                    small
                  />
                  <div className="border-primary/20 bg-primary/5 flex shrink-0 items-center gap-2 rounded-xl border px-3 py-1.5">
                    <HeartIcon className="text-primary size-4" />
                    <div className="leading-tight">
                      <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                        Total in Page
                      </span>
                      <span className="text-foreground text-sm font-extrabold">
                        {formatCurrencyINR_4(totalInPage)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isExporting}
                    onClick={() => exportDonations({ search })}
                    className="h-9 shrink-0 cursor-pointer gap-1.5 text-xs font-semibold"
                  >
                    <Download className="size-3.5" />
                    {isExporting ? "Exporting..." : "Export as Excel"}
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      );
    };

  return (
    <main className="">
      <>
        {}
        <Suspense fallback={null}>
          <DonationsListingTable />
        </Suspense>
      </>
    </main>
  );
}
