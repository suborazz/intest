"use client";

import React_4, { Suspense } from "react";
import { Calendar, Edit, ExternalLink, Image as ImageIcon_2, Link as LinkIcon, LucideIcon, Newspaper as Newspaper_2, Pencil, Plus, Save, ShieldAlert, Trash2, Upload, Video as Video_2, Newspaper, Video } from "lucide-react";
import Link from "next/link";
import React_3 from "react";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import React_2 from "react";
import { ReactNode, useEffect, useLayoutEffect, useContext, Dispatch, SetStateAction, useMemo } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { XIcon } from "lucide-react";
import { Slot, Label as LabelPrimitive, Dialog as SheetPrimitive } from "radix-ui";
import { set } from "date-fns";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { Drawer as DrawerPrimitive } from "vaul";
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

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
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

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
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

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
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

interface MediaVideoPayload {
      youtubeId: string;
      title: string;
      date: string;
      description: string;
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

type TSectionItems_2 = {
      id: string;
      label: string;
      href: string;
      link?: string;
      icon?: LucideIcon;
      count?: number;
    };

const MEDIA_TABS: TSectionItems_2[] = [
      {
        id: "photos",
        label: "Photos",
        href: "photos",
        link: "/super-admin/media?tab=photos",
      },
      {
        id: "videos",
        label: "Videos",
        href: "videos",
        link: "/super-admin/media?tab=videos",
      },
      {
        id: "newspapers",
        label: "Newspaper Clippings",
        href: "newspapers",
        link: "/super-admin/media?tab=newspapers",
      },
      {
        id: "online-links",
        label: "Online Links",
        href: "online-links",
        link: "/super-admin/media?tab=online-links",
      },
    ];


export default function SuperAdminMediaDeskPage() {
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

    function VideosTab_2() {
      const {
        data: response,
        isLoading,
        isError,
      } = SuperAdminDataHooks.useMediaVideos();
      const list = response?.data || [];

      const { mutate: createVideo, isPending: isCreating } =
        SuperAdminDataHooks.useCreateMediaVideo();
      const { mutate: updateVideo, isPending: isUpdating } =
        SuperAdminDataHooks.useUpdateMediaVideo();
      const { mutate: deleteVideo } = SuperAdminDataHooks.useDeleteMediaVideo();

      const [isOpen, setIsOpen] = useState(false);
      const [editingId, setEditingId] = useState<string | null>(null);
      const [title, setTitle] = useState("");
      const [date, setDate] = useState("");
      const [description, setDescription] = useState("");
      const [youtubeId, setYoutubeId] = useState("");

      const isEditing = editingId !== null;
      const isSaving = isCreating || isUpdating;

      const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDate("");
        setDescription("");
        setYoutubeId("");
      };

      const openCreate = () => {
        resetForm();
        setIsOpen(true);
      };

      const openEdit = (video: MediaVideoPublic) => {
        setEditingId(video.id);
        setTitle(video.title || "");
        setDate(video.date ? new Date(video.date).toISOString().split("T")[0] : "");
        setDescription(video.description || "");
        setYoutubeId(video.youtubeId || "");
        setIsOpen(true);
      };

      const handleSubmit = (e: React_3.FormEvent) => {
        e.preventDefault();
        if (!title || !date || !description || !youtubeId) return;

        const payload = { title, date, description, youtubeId };
        const onSuccess = () => {
          setIsOpen(false);
          resetForm();
        };

        if (isEditing && editingId) {
          updateVideo({ id: editingId, payload }, { onSuccess });
        } else {
          createVideo(payload, { onSuccess });
        }
      };

      const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this video?")) {
          deleteVideo(id);
        }
      };

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-sm font-bold">
                Videos Directory
              </h3>
              <p className="text-muted-foreground text-xs">
                Manage and add promotional YouTube video links.
              </p>
            </div>
            <Button
              onClick={openCreate}
              className="h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold"
            >
              <Plus className="size-4" />
              Add Video
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-card border-border/50 flex flex-col items-center justify-center space-y-2 rounded-2xl border p-8 text-center">
              <ShieldAlert className="size-10 text-red-500" />
              <h4 className="text-foreground text-sm font-bold">
                Failed to Load Videos
              </h4>
            </div>
          ) : list.length === 0 ? (
            <div className="bg-muted/10 flex flex-col items-center justify-center space-y-2 rounded-2xl border border-dashed p-12 text-center">
              <Video_2 className="text-muted-foreground size-10 animate-pulse" />
              <h4 className="text-foreground text-xs font-bold">
                No Videos Uploaded
              </h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {list.map((video) => (
                <div
                  key={video.id}
                  className="bg-card border-border/50 group relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full"
                    ></iframe>
                    <div className="absolute right-2.5 top-2.5 flex gap-1.5">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => openEdit(video)}
                        className="h-8 w-8 cursor-pointer rounded-lg shadow-sm transition-transform hover:scale-105"
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(video.id)}
                        className="h-8 w-8 cursor-pointer rounded-lg bg-red-600 text-white shadow-sm transition-transform hover:scale-105 hover:bg-red-700"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-foreground truncate text-xs font-bold">
                        {video.title}
                      </h4>
                      <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-[9px] font-bold">
                        <Calendar className="size-3" />
                        {new Date(video.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-[10px] font-medium leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {}
          <ResponsiveDialog
            isOpen={isOpen}
            setIsOpen={(open) => {
              setIsOpen(open);
              if (!open) resetForm();
            }}
            title={isEditing ? "Edit Video Item" : "Add Video Item"}
            description="Insert a YouTube video ID to load onto the public list."
          >
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="video-ytid"
                  className="text-foreground text-xs font-semibold"
                >
                  YouTube Video ID
                </Label>
                <Input
                  id="video-ytid"
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                  placeholder="dQw4w9WgXcQ"
                  required
                />
                <p className="text-muted-foreground block text-[9px] font-medium">
                  The alphanumeric string at the end of the video link (e.g.
                  watch?v=ID)
                </p>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="video-title"
                  className="text-foreground text-xs font-semibold"
                >
                  Title
                </Label>
                <Input
                  id="video-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="IIInternship Placement Success Story"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="video-date"
                  className="text-foreground text-xs font-semibold"
                >
                  Date Published
                </Label>
                <Input
                  id="video-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="video-desc"
                  className="text-foreground text-xs font-semibold"
                >
                  Short Description
                </Label>
                <Textarea
                  id="video-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a summary description of the video contents..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="cursor-pointer font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="cursor-pointer font-semibold"
                >
                  {isSaving
                    ? isEditing
                      ? "Saving..."
                      : "Adding..."
                    : isEditing
                      ? "Save Changes"
                      : "Add Video"}
                </Button>
              </div>
            </form>
          </ResponsiveDialog>
        </div>
      );
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

    function NewspapersTab_2() {
      const {
        data: response,
        isLoading,
        isError,
      } = SuperAdminDataHooks.useMediaNewspapers();
      const list = response?.data || [];

      const { mutate: createNewspaper, isPending: isCreating } =
        SuperAdminDataHooks.useCreateMediaNewspaper();
      const { mutate: updateNewspaper, isPending: isUpdating } =
        SuperAdminDataHooks.useUpdateMediaNewspaper();
      const { mutate: deleteNewspaper } =
        SuperAdminDataHooks.useDeleteMediaNewspaper();

      const [isOpen, setIsOpen] = useState(false);
      const [editingId, setEditingId] = useState<string | null>(null);
      const [title, setTitle] = useState("");
      const [publication, setPublication] = useState("");
      const [date, setDate] = useState("");
      const [description, setDescription] = useState("");
      const [imageFile, setImageFile] = useState<File | null>(null);
      const [preview, setPreview] = useState<string | null>(null);

      const isEditing = editingId !== null;
      const isSaving = isCreating || isUpdating;

      const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setPublication("");
        setDate("");
        setDescription("");
        setImageFile(null);
        setPreview(null);
      };

      const openCreate = () => {
        resetForm();
        setIsOpen(true);
      };

      const openEdit = (item: MediaNewspaperPublic) => {
        setEditingId(item.id);
        setTitle(item.title || "");
        setPublication(item.publication || "");
        setDate(item.date ? new Date(item.date).toISOString().split("T")[0] : "");
        setDescription(item.description || "");
        setImageFile(null);
        setPreview(item.imageUrl || null);
        setIsOpen(true);
      };

      const handleFileChange = (e: React_3.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImageFile(file);
          setPreview(URL.createObjectURL(file));
        }
      };

      const handleSubmit = (e: React_3.FormEvent) => {
        e.preventDefault();
            if (!title || !publication || !date || !description) return;
        if (!isEditing && !imageFile) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("publication", publication);
        formData.append("date", date);
        formData.append("description", description);
        if (imageFile) formData.append("image", imageFile);

        const onSuccess = () => {
          setIsOpen(false);
          resetForm();
        };

        if (isEditing && editingId) {
          updateNewspaper({ id: editingId, formData }, { onSuccess });
        } else {
          createNewspaper(formData, { onSuccess });
        }
      };

      const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this newspaper item?")) {
          deleteNewspaper(id);
        }
      };

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-sm font-bold">
                Newspaper Clippings
              </h3>
              <p className="text-muted-foreground text-xs">
                Manage and upload scans of newspaper highlights and press clippings.
              </p>
            </div>
            <Button
              onClick={openCreate}
              className="h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold"
            >
              <Plus className="size-4" />
              Add Clipping
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-card border-border/50 flex flex-col items-center justify-center space-y-2 rounded-2xl border p-8 text-center">
              <ShieldAlert className="size-10 text-red-500" />
              <h4 className="text-foreground text-sm font-bold">
                Failed to Load Clippings
              </h4>
            </div>
          ) : list.length === 0 ? (
            <div className="bg-muted/10 flex flex-col items-center justify-center space-y-2 rounded-2xl border border-dashed p-12 text-center">
              <Newspaper_2 className="text-muted-foreground size-10 animate-pulse" />
              <h4 className="text-foreground text-xs font-bold">
                No Clippings Uploaded
              </h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border-border/50 group relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md"
                >
                  <div className="bg-muted border-border/60 relative h-44 w-full overflow-hidden border-b">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute right-2.5 top-2.5 flex gap-1.5">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => openEdit(item)}
                        className="h-8 w-8 cursor-pointer rounded-lg shadow-sm transition-transform hover:scale-105"
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 cursor-pointer rounded-lg bg-red-600 text-white shadow-sm transition-transform hover:scale-105 hover:bg-red-700"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                        {item.publication}
                      </span>
                      <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-[9px] font-bold">
                        <Calendar className="size-3" />
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-foreground truncate text-xs font-bold">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground line-clamp-2 text-[10px] font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {}
          <ResponsiveDialog
            isOpen={isOpen}
            setIsOpen={(open) => {
              setIsOpen(open);
              if (!open) resetForm();
            }}
            title={isEditing ? "Edit Newspaper Clipping" : "Add Newspaper Clipping"}
            description={
              isEditing
                ? "Update the clipping details. Leave the image unchanged to keep the current one."
                : "Upload a scan/newspaper clip print."
            }
          >
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-foreground text-xs font-semibold">
                  Select Clipping Image
                </Label>
                <div className="bg-muted/5 flex items-center gap-4 rounded-xl border border-dashed p-4">
                  <div className="bg-muted relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <ImageIcon_2 className="text-muted-foreground size-6" />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="clipping-file"
                      className="bg-background text-foreground hover:bg-muted/10 animate-in inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold shadow-sm"
                    >
                      <Upload className="size-3.5" />
                      {isEditing ? "Change Image" : "Upload Image"}
                      <input
                        id="clipping-file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!isEditing}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="clipping-pub"
                    className="text-foreground text-xs font-semibold"
                  >
                    Publication Name
                  </Label>
                  <Input
                    id="clipping-pub"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                    placeholder="Times of India"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="clipping-date"
                    className="text-foreground text-xs font-semibold"
                  >
                    Publication Date
                  </Label>
                  <Input
                    id="clipping-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="clipping-title"
                  className="text-foreground text-xs font-semibold"
                >
                  Title / Headline
                </Label>
                <Input
                  id="clipping-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="IIInternship Launches New Global Cohorts"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="clipping-desc"
                  className="text-foreground text-xs font-semibold"
                >
                  Short Description
                </Label>
                <Textarea
                  id="clipping-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of the article clipping details..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="cursor-pointer font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="cursor-pointer font-semibold"
                >
                  {isSaving
                    ? isEditing
                      ? "Saving..."
                      : "Uploading..."
                    : isEditing
                      ? "Save Changes"
                      : "Upload Clipping"}
                </Button>
              </div>
            </form>
          </ResponsiveDialog>
        </div>
      );
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

    function OnlineLinksTab_2() {
      const {
        data: response,
        isLoading,
        isError,
      } = SuperAdminDataHooks.useMediaOnlineLinks();
      const list = response?.data || [];

      const { mutate: createLink, isPending: isCreating } =
        SuperAdminDataHooks.useCreateMediaOnlineLink();
      const { mutate: updateLink, isPending: isUpdating } =
        SuperAdminDataHooks.useUpdateMediaOnlineLink();
      const { mutate: deleteLink } = SuperAdminDataHooks.useDeleteMediaOnlineLink();

      const [isOpen, setIsOpen] = useState(false);
      const [editingId, setEditingId] = useState<string | null>(null);
      const [headline, setHeadline] = useState("");
      const [link, setLink] = useState("");
      const [agency, setAgency] = useState("");
      const [date, setDate] = useState("");
      const [slNo, setSlNo] = useState("");

      const isEditing = editingId !== null;
      const isSaving = isCreating || isUpdating;

      const resetForm = () => {
        setEditingId(null);
        setHeadline("");
        setLink("");
        setAgency("");
        setDate("");
        setSlNo("");
      };

      const openCreate = () => {
        resetForm();
        setIsOpen(true);
      };

      const openEdit = (item: MediaOnlineLinkPublic) => {
        setEditingId(item.id);
        setHeadline(item.headline || "");
        setLink(item.link || "");
        setAgency(item.agency || "");
        setDate(item.date ? new Date(item.date).toISOString().split("T")[0] : "");
        setSlNo(item.slNo != null ? String(item.slNo) : "");
        setIsOpen(true);
      };

      const handleSubmit = (e: React_3.FormEvent) => {
        e.preventDefault();
        if (!headline || !link || !agency || !date || !slNo) return;

        const payload = { headline, link, agency, date, slNo };
        const onSuccess = () => {
          setIsOpen(false);
          resetForm();
        };

        if (isEditing && editingId) {
          updateLink({ id: editingId, payload }, { onSuccess });
        } else {
          createLink(payload, { onSuccess });
        }
      };

      const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this link?")) {
          deleteLink(id);
        }
      };

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-sm font-bold">
                Online Coverage Links
              </h3>
              <p className="text-muted-foreground text-xs">
                Manage and link external online articles and press coverage.
              </p>
            </div>
            <Button
              onClick={openCreate}
              className="h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold"
            >
              <Plus className="size-4" />
              Add Link
            </Button>
          </div>

          {isLoading ? (
            <div className="border-border/50 bg-card space-y-4 rounded-2xl border p-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-full rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-card border-border/50 flex flex-col items-center justify-center space-y-2 rounded-2xl border p-8 text-center">
              <ShieldAlert className="size-10 text-red-500" />
              <h4 className="text-foreground text-sm font-bold">
                Failed to Load Links
              </h4>
            </div>
          ) : list.length === 0 ? (
            <div className="bg-muted/10 flex flex-col items-center justify-center space-y-2 rounded-2xl border border-dashed p-12 text-center">
              <LinkIcon className="text-muted-foreground size-10 animate-pulse" />
              <h4 className="text-foreground text-xs font-bold">
                No Links Uploaded
              </h4>
            </div>
          ) : (
            <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm">
              <Table>
                <TableHeader className="bg-muted/10 border-border/60 border-b">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-muted-foreground w-16 px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                      Sl No.
                    </TableHead>
                    <TableHead className="text-muted-foreground px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                      Headline / Source
                    </TableHead>
                    <TableHead className="text-muted-foreground px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                      Agency
                    </TableHead>
                    <TableHead className="text-muted-foreground px-5 py-3 text-[10px] font-bold uppercase tracking-wider">
                      Date Linked
                    </TableHead>
                    <TableHead className="text-muted-foreground px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-muted/10 border-border/60 border-b transition-colors last:border-b-0"
                    >
                      <TableCell className="text-foreground px-5 py-3.5 text-xs font-semibold">
                        {item.slNo}
                      </TableCell>
                      <TableCell className="px-5 py-3.5">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary flex items-center gap-1.5 text-xs font-semibold transition-colors"
                        >
                          {item.headline}
                          <ExternalLink className="text-muted-foreground size-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-muted-foreground px-5 py-3.5 text-xs font-medium">
                        {item.agency}
                      </TableCell>
                      <TableCell className="text-muted-foreground px-5 py-3.5 text-xs font-medium">
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEdit(item)}
                            className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8 cursor-pointer rounded-lg"
                            title="Edit"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {}
          <ResponsiveDialog
            isOpen={isOpen}
            setIsOpen={(open) => {
              setIsOpen(open);
              if (!open) resetForm();
            }}
            title={
              isEditing ? "Edit Online Coverage Link" : "Add Online Coverage Link"
            }
            description="Link to external media reviews or press releases."
          >
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="link-sl"
                    className="text-foreground text-xs font-semibold"
                  >
                    Serial Number
                  </Label>
                  <Input
                    id="link-sl"
                    value={slNo}
                    onChange={(e) => setSlNo(e.target.value)}
                    placeholder="1"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="link-date"
                    className="text-foreground text-xs font-semibold"
                  >
                    Publish Date
                  </Label>
                  <Input
                    id="link-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="link-agency"
                  className="text-foreground text-xs font-semibold"
                >
                  Press Agency / Publisher
                </Label>
                <Input
                  id="link-agency"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="Hindustan Times"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="link-headline"
                  className="text-foreground text-xs font-semibold"
                >
                  Headline
                </Label>
                <Input
                  id="link-headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Global Internships Platform Empowers Rural Students"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="link-url"
                  className="text-foreground text-xs font-semibold"
                >
                  Article Link URL
                </Label>
                <Input
                  id="link-url"
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://hindustantimes.com/news/123"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="cursor-pointer font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="cursor-pointer font-semibold"
                >
                  {isSaving
                    ? isEditing
                      ? "Saving..."
                      : "Adding..."
                    : isEditing
                      ? "Save Changes"
                      : "Add Link"}
                </Button>
              </div>
            </form>
          </ResponsiveDialog>
        </div>
      );
    }

    function SuperAdminMediaDesk_2() {
      const searchParams = useSearchParams();
      const activeTab = searchParams?.get("tab") || "photos";

      return (
        <>
          <PageHeaderLayout>
            <Heading
              title="Public Media Desk"
              description="Manage promotional press, online article coverage, newspaper highlights, and gallery assets."
            />
            <Sections sections={MEDIA_TABS} activeHref={activeTab} />
          </PageHeaderLayout>

          <div className="mt-3 px-4">
            {activeTab === "photos" && (<div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-foreground text-sm font-bold">
                                  Photos Directory
                                </h3>
                                <p className="text-muted-foreground text-xs">
                                  Manage and upload promotional or event gallery photos.
                                </p>
                              </div>
                              <Button
                                onClick={openCreate}
                                className="h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold"
                              >
                                <Plus className="size-4" />
                                Add Photo
                              </Button>
                            </div>

                            {isLoading ? (
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                  <Skeleton key={i} className="h-48 rounded-2xl" />
                                ))}
                              </div>
                            ) : isError ? (
                              <div className="bg-card border-border/50 flex flex-col items-center justify-center space-y-2 rounded-2xl border p-8 text-center">
                                <ShieldAlert className="size-10 text-red-500" />
                                <h4 className="text-foreground text-sm font-bold">
                                  Failed to Load Photos
                                </h4>
                              </div>
                            ) : list.length === 0 ? (
                              <div className="bg-muted/10 flex flex-col items-center justify-center space-y-2 rounded-2xl border border-dashed p-12 text-center">
                                <ImageIcon_2 className="text-muted-foreground size-10 animate-pulse" />
                                <h4 className="text-foreground text-xs font-bold">
                                  No Photos Uploaded
                                </h4>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {list.map((photo) => (
                                  <div
                                    key={photo.id}
                                    className="bg-card border-border/50 group relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md"
                                  >
                                    <div className="bg-muted relative h-44 w-full overflow-hidden">
                                      <img
                                        src={photo.url}
                                        alt={photo.title}
                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                      <div className="absolute right-2.5 top-2.5 flex gap-1.5">
                                        <Button
                                          size="icon"
                                          variant="secondary"
                                          onClick={() => openEdit(photo)}
                                          className="h-8 w-8 cursor-pointer rounded-lg shadow-sm transition-transform hover:scale-105"
                                          title="Edit"
                                        >
                                          <Pencil className="size-4" />
                                        </Button>
                                        <Button
                                          size="icon"
                                          variant="destructive"
                                          onClick={() => handleDelete(photo.id)}
                                          className="h-8 w-8 cursor-pointer rounded-lg bg-red-600 text-white shadow-sm transition-transform hover:scale-105 hover:bg-red-700"
                                          title="Delete"
                                        >
                                          <Trash2 className="size-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="space-y-2 p-4">
                                      <div className="flex items-center justify-between gap-2">
                                        <h4 className="text-foreground truncate text-xs font-bold">
                                          {photo.title}
                                        </h4>
                                        <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-[9px] font-bold">
                                          <Calendar className="size-3" />
                                          {new Date(photo.date).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-muted-foreground line-clamp-2 text-[10px] font-medium leading-relaxed">
                                        {photo.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {}
                            <ResponsiveDialog
                              isOpen={isOpen}
                              setIsOpen={(open) => {
                                setIsOpen(open);
                                if (!open) resetForm();
                              }}
                              title={isEditing ? "Edit Photo Item" : "Upload Photo Item"}
                              description={
                                isEditing
                                  ? "Update the photo details. Leave the image unchanged to keep the current one."
                                  : "Upload a photo clipping with metadata for the public gallery."
                              }
                            >
                              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                                <div className="space-y-2">
                                  <Label className="text-foreground text-xs font-semibold">
                                    Select Photo File
                                  </Label>
                                  <div className="bg-muted/5 flex items-center gap-4 rounded-xl border border-dashed p-4">
                                    <div className="bg-muted relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
                                      {preview ? (
                                        <img
                                          src={preview}
                                          alt="Preview"
                                          className="size-full object-cover"
                                        />
                                      ) : (
                                        <ImageIcon_2 className="text-muted-foreground size-6" />
                                      )}
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="photo-file"
                                        className="bg-background text-foreground hover:bg-muted/10 animate-in inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold shadow-sm"
                                      >
                                        <Upload className="size-3.5" />
                                        {isEditing ? "Change Image" : "Upload Image"}
                                        <input
                                          id="photo-file"
                                          type="file"
                                          accept="image/*"
                                          onChange={handleFileChange}
                                          className="hidden"
                                          required={!isEditing}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <Label
                                    htmlFor="photo-title"
                                    className="text-foreground text-xs font-semibold"
                                  >
                                    Title / Headline
                                  </Label>
                                  <Input
                                    id="photo-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Summer Camp 2026 Event"
                                    required
                                  />
                                </div>

                                <div className="space-y-1.5">
                                  <Label
                                    htmlFor="photo-date"
                                    className="text-foreground text-xs font-semibold"
                                  >
                                    Date Taken
                                  </Label>
                                  <Input
                                    id="photo-date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                  />
                                </div>

                                <div className="space-y-1.5">
                                  <Label
                                    htmlFor="photo-desc"
                                    className="text-foreground text-xs font-semibold"
                                  >
                                    Short Description
                                  </Label>
                                  <Textarea
                                    id="photo-desc"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief summary of the picture details..."
                                    required
                                  />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      setIsOpen(false);
                                      resetForm();
                                    }}
                                    className="cursor-pointer font-semibold"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="cursor-pointer font-semibold"
                                  >
                                    {isSaving
                                      ? isEditing
                                        ? "Saving..."
                                        : "Uploading..."
                                      : isEditing
                                        ? "Save Changes"
                                        : "Upload Item"}
                                  </Button>
                                </div>
                              </form>
                            </ResponsiveDialog>
                          </div>)}
            {activeTab === "videos" && <VideosTab_2 />}
            {activeTab === "newspapers" && <NewspapersTab_2 />}
            {activeTab === "online-links" && <OnlineLinksTab_2 />}
          </div>
        </>
      );
    }
    const {
            data: response,
            isLoading,
            isError,
          } = SuperAdminDataHooks.useMediaPhotos();
    const list = response?.data || [];
    const { mutate: createPhoto, isPending: isCreating } =
            SuperAdminDataHooks.useCreateMediaPhoto();
    const { mutate: updatePhoto, isPending: isUpdating } =
            SuperAdminDataHooks.useUpdateMediaPhoto();
    const { mutate: deletePhoto } = SuperAdminDataHooks.useDeleteMediaPhoto();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const isEditing = editingId !== null;
    const isSaving = isCreating || isUpdating;
    const resetForm = () => {
            setEditingId(null);
            setTitle("");
            setDate("");
            setDescription("");
            setPhotoFile(null);
            setPreview(null);
          };
    const openCreate = () => {
            resetForm();
            setIsOpen(true);
          };
    const openEdit = (photo: MediaPhotoPublic) => {
            setEditingId(photo.id);
            setTitle(photo.title || "");
            setDate(photo.date ? new Date(photo.date).toISOString().split("T")[0] : "");
            setDescription(photo.description || "");
            setPhotoFile(null);
            setPreview(photo.url || null);
            setIsOpen(true);
          };
    const handleFileChange = (e: React_3.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setPhotoFile(file);
              setPreview(URL.createObjectURL(file));
            }
          };
    const handleSubmit = (e: React_3.FormEvent) => {
            e.preventDefault();
                    if (!title || !date || !description) return;
            if (!isEditing && !photoFile) return;

            const formData = new FormData();
            formData.append("title", title);
            formData.append("date", date);
            formData.append("description", description);
            if (photoFile) formData.append("photo", photoFile);

            const onSuccess = () => {
              setIsOpen(false);
              resetForm();
            };

            if (isEditing && editingId) {
              updatePhoto({ id: editingId, formData }, { onSuccess });
            } else {
              createPhoto(formData, { onSuccess });
            }
          };
    const handleDelete = (id: string) => {
            if (confirm("Are you sure you want to delete this photo?")) {
              deletePhoto(id);
            }
          };


  return (
    <main className="">
      <h1 className="sr-only">Media Desk Management</h1>
      <Suspense fallback={null}>
        <SuperAdminMediaDesk_2 />
      </Suspense>
    </main>
  );
}
