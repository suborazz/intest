"use client";

import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertTriangle, Briefcase as Briefcase_2, Building as Building_2, CheckCircle, CheckCircle2, Clock as Clock_2, Coffee, CreditCard, DollarSign, Gift, GraduationCap as GraduationCap_2, Info, Key, Layers, List, Loader2, Phone as Phone_2, ShieldCheck, Sparkles as Sparkles_2, XCircle, Zap, Search } from "lucide-react";
import * as React_4 from "react";
import React_3 from "react";
import React_2 from "react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog as SheetPrimitive } from "radix-ui";
import Image_2 from "next/image";
import { LucideIcon, CheckIcon, CopyIcon, XIcon, SearchIcon, ArrowUpIcon, FilterIcon, FilterXIcon, CopyCheckIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useCallback, useRef, ReactNode, useEffect, useLayoutEffect, useContext, Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { JetBrains_Mono } from "next/font/google";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot, Checkbox as CheckboxPrimitive, Separator as SeparatorPrimitive, Tooltip as TooltipPrimitive } from "radix-ui";
import Link from "next/link";
import { join } from "path";
import { set } from "date-fns";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { Drawer as DrawerPrimitive } from "vaul";
import { axiosInstance } from "@/x/acfb3dca";
import { LayoutContext } from "@/x/72be5b4f";
import { SidebarFiltersContext } from "@/x/d50b23c8";

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

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
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

const SidebarFilters: React_2.FC<
  { children: React_2.ReactNode } & React_2.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div className={cn("flex h-full flex-row", className)}>{children}</div>
  );
};

const useSlot = (name: ESlotName, content: React_2.ReactNode) => {
  const { setSlot } = useLayoutContext();
    useLayoutEffect(() => {
    setSlot(name, content);
    return () => setSlot(name, null);
  }, [name, content, setSlot]);
};

const FilterLayout = ({
  children,
  right = false,
}: {
  children: React_2.ReactNode;
  right?: boolean;
}) => {
  const { isFilterOpen } = useLayoutContext();

  const content = React_2.useMemo(
    () => (
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden pt-2 transition-all duration-300 ease-in-out",
          isFilterOpen && right ? "pr-2" : "pl-3",
          !isFilterOpen
            ? "pointer-events-none w-0 opacity-0"
            : "w-64 opacity-100",
        )}
      >
        <div className="h-full w-64 overflow-hidden">
          <SidebarFilters>{children}</SidebarFilters>
        </div>
      </div>
    ),
    [children, isFilterOpen, right],
  );

  useSlot(right ? ESlotName.RIGHT_FILTER : ESlotName.LEFT_FILTER, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
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

interface IDataTableSearchProps {
  small?: boolean;
  xSmall?: boolean;
  full?: boolean;
  placeholder?: string;
  thin?: boolean;
  searchKey?: string;
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

type TAlertFilter = {
  icon?: React_2.ReactNode;
  value: string;
  label: string;
  count: number | null;
  type?: string;
};

interface ISidebarFiltersContextProps {
  open: boolean;
  setOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  selectedFilters: {
    header: string;
    filter_name: string;
    filters: TAlertFilter[];
  }[];
  setSelectedFilter: (
    header: string,
    filter_name: string,
    filters: TAlertFilter[],
  ) => void;
}

const DEFAULT_TEST_FILTERS_CONTEXT: ISidebarFiltersContextProps = {
  open: false,
  setOpen: (() => {}) as React_2.Dispatch<React_2.SetStateAction<boolean>>,
  selectedFilters: [],
  setSelectedFilter: () => {},
};

const useSidebarFilters = () => {
  const context = React_2.useContext(SidebarFiltersContext);
  if (!context) {
    if (process.env.NODE_ENV === "test") {
      return DEFAULT_TEST_FILTERS_CONTEXT;
    }
    throw new Error(
      "useSidebarFilters must be used within a SidebarFiltersProvider",
    );
  }
  return context;
};

const SidebarFiltersTrigger: React_2.FC<{ asChild?: boolean }> = () => {
  const { open, setOpen } = useSidebarFilters();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex justify-between gap-2"
      onClick={() => setOpen(!open)}
    >
      {open ? (
        <FilterXIcon className="h-3.5 w-3.5" />
      ) : (
        <FilterIcon className="h-3.5 w-3.5" />
      )}
      {open ? "Hide Filters" : "Show Filters"}
    </Button>
  );
};

function FilterHeading({ children }: { children: string }) {
  return (
    <label className="pl-1 pt-1 text-[0.8rem] capitalize">
      {children.replace("_filters", "").split("_").join(" ")}
    </label>
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

const ClearFilter = ({ onClick }: { onClick: () => void }) => {
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer rounded-sm px-1 text-[0.7rem] font-normal"
      onClick={onClick}
    >
      Clear filter
    </Badge>
  );
};

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "border-input group-has-disabled/field:opacity-50 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border outline-none transition-shadow after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

interface ITruncatedTextProps extends React_2.HTMLAttributes<HTMLDivElement> {
  width?: number;
  icon?: React_2.ReactNode;
  label: string;
  link?: string;
  bottom?: boolean;
  mono?: boolean;
  isSql?: boolean;
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

const jetBrainsMono_2 = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "origin-(--radix-tooltip-content-transform-origin) bg-foreground text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 inline-flex w-fit max-w-xs items-center gap-1.5 rounded-md px-3 py-1.5 text-xs",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

interface ICopyButtonProps {
  value: string | number;
  label?: string;
  large?: boolean;
}

const CopyButton: React.FunctionComponent<ICopyButtonProps> = ({
  value,
  label,
  large = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(value.toString());

    setCopied(true);
    toast.success(
      label ? `${label} copied to the clipboard.` : "Copied to the clipboard.",
    );

    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-1 transition-transform duration-300 hover:scale-105",
        large ? "border-border rounded-lg border px-3 py-1.5 text-sm" : "p-2",
      )}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <>
          <CopyCheckIcon className="!size-3.5 text-green-600" />
        </>
      ) : (
        <CopyIcon className="!size-3.5" />
      )}

      {large && <span className="ml-2">{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
};

const TruncatedText: React_2.FunctionComponent<ITruncatedTextProps> = ({
  width,
  className,
  icon = null,
  label,
  link,
  bottom = false,
  mono = false,
  isSql = false,
}) => {
  const { resolvedTheme } = useTheme();
  const syntaxTheme = resolvedTheme === "dark" ? oneDark : oneLight;
  const normalizedLabel = isSql ? label.replace(/\s+/g, " ").trim() : label;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

    const checkTruncation = () => {
    if (textRef.current) {
      const isTruncated =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsTruncated(isTruncated);
    }
  };

  useEffect(() => {
    checkTruncation();
  }, [label, width]);

  useEffect(() => {
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return (
    <div className="flex min-w-0 items-center gap-2">
      {icon}
      {isTruncated ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex min-w-0 items-center gap-2">
                {link ? (
                  <Link
                    href={link}
                    className="group flex flex-row items-center gap-1"
                  >
                    <p
                      ref={textRef}
                      style={
                        width
                          ? {
                              maxWidth: `${width}px`,
                            }
                          : {}
                      }
                      className={cn(
                        className,
                        (mono || isSql) && jetBrainsMono_2.className,
                        "group-hover:text-primary truncate",
                      )}
                    >
                      {label}
                    </p>
                    <div className="rotate-45">
                      <ArrowUpIcon className="text-muted-foreground hover:text-primary group-hover:text-primary size-3.5 transition-colors duration-200 ease-in-out group-hover:animate-bounce" />
                    </div>
                  </Link>
                ) : (
                  <p
                    ref={textRef}
                    style={
                      width
                        ? {
                            maxWidth: `${width}px`,
                          }
                        : {}
                    }
                    className={cn(
                      className,
                      (mono || isSql) && jetBrainsMono_2.className,
                      "truncate",
                    )}
                  >
                    {label}
                  </p>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "relative z-[200] py-1.5",
                isSql ? "w-96 max-w-96 p-0" : "flex flex-row items-start",
              )}
              onClick={(e) => e.stopPropagation()}
              side={bottom ? "bottom" : "top"}
            >
              {isSql ? (
                <div className="relative w-full">
                  <div className="absolute right-1.5 top-1.5 z-10">
                    <CopyButton value={label} label="" />
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <SyntaxHighlighter
                      language="sql"
                      style={syntaxTheme}
                      wrapLongLines
                      customStyle={{
                        margin: 0,
                        padding: "0.5rem 2.5rem 0.5rem 0.75rem",
                        background: "transparent",
                        fontSize: "0.75rem",
                        whiteSpace: "normal",
                        width: "100%",
                        fontFamily: "inherit",
                      }}
                      codeTagProps={{
                        style: { whiteSpace: "normal" },
                        className: cn(jetBrainsMono_2.className, "font-semibold"),
                      }}
                      PreTag="div"
                    >
                      {normalizedLabel}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ) : (
                <>
                  <p className="max-h-40 w-fit max-w-60 overflow-y-auto text-wrap break-all">
                    {label}
                  </p>
                  <div className="mt-0.5 translate-x-4 pt-0.5">
                    <CopyButton value={label} label="" />
                  </div>
                </>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : link ? (
        <Link href={link!} className="group flex flex-row items-center gap-1">
          <p
            ref={textRef}
            style={
              width
                ? {
                    maxWidth: `${width}px`,
                  }
                : {}
            }
            className={cn(
              className,
              (mono || isSql) && jetBrainsMono_2.className,
              "group-hover:text-primary truncate",
            )}
          >
            {label}
          </p>
          <div className="rotate-45">
            <ArrowUpIcon className="text-muted-foreground hover:text-primary group-hover:text-primary size-3.5 transition-colors duration-200 ease-in-out group-hover:animate-bounce" />
          </div>
        </Link>
      ) : (
        <p
          ref={textRef}
          style={
            width
              ? {
                  maxWidth: `${width}px`,
                }
              : {}
          }
          className={cn(
            className,
            (mono || isSql) && jetBrainsMono_2.className,
            "truncate",
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
};

const SidebarCheckBoxFilter: React_2.FC<{
  header: string;
  filters: TAlertFilter[];
  filter_name: string;
}> = ({ header, filters, filter_name }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { selectedFilters, setSelectedFilter } = useSidebarFilters();

  useEffect(() => {
    const selectedValues = searchParams?.get(header)?.split(",") || [];

    setSelectedFilter(
      header,
      filter_name,
      filters
        .filter((filter) => selectedValues.includes(filter.value))
        .map(
          (filter) =>
            ({
              label: filter.label,
              value: filter.value,
              icon: filter.icon,
            }) as TAlertFilter,
        ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, header, filters]);

  const updateSearchParams = React_2.useCallback(
    (value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams?.toString());

      const existingValues = params.get(header)?.split(",") ?? [];
      const updatedValues = checked
        ? [...existingValues, value]
        : existingValues.filter((v) => v !== value);

      if (updatedValues.length > 0) {
        params.set(header, updatedValues.join(","));
        params.set("page", "1");
      } else {
        params.delete(header);
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace, header],
  );

  const removeSearchParams = React_2.useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(header);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, replace, header]);

  const selectedFilter = selectedFilters.find((item) => item.header === header);

  return (
    <div className="space-y-1 rounded-md border border-dashed px-2 py-2">
      <div className="mb-2 flex items-center justify-between">
        <FilterHeading>{filter_name}</FilterHeading>
        {selectedFilter && selectedFilter.filters.length > 0 && (
          <ClearFilter onClick={removeSearchParams} />
        )}
      </div>
      {filters.map((filter) => {
        const isSelected = (selectedFilter?.filters ?? [])
          .map((item) => item.value)
          .includes(filter.value);
        return (
          <div
            key={filter.value}
            onClick={() => updateSearchParams(filter.value, !isSelected)}
            className={cn(
              "hover:bg-accent flex cursor-pointer items-center justify-between rounded-md py-1 pl-1 pr-2 transition-colors",
            )}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                                className="scale-75"
                checked={isSelected}
                onCheckedChange={(checked) =>
                  updateSearchParams(filter.value, checked === true)
                }
              />

              <TruncatedText
                width={190}
                label={filter.label}
                className={"text-[0.8rem] capitalize"}
                icon={filter.icon}
              />
            </div>
            <span className="text-muted-foreground text-xs">
              {filter.count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const SidebarFiltersHeader: React_2.FC<
  {
    children: React_2.ReactNode;
    bordered?: boolean;
    title?: string;
    left?: boolean;
    width?: string;
  } & React_2.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  className = "mr-0 px-3",
  bordered = false,
  left = true,
  width = "w-full",
}) => {
  const { open } = useSidebarFilters();

  return (
    <div
      className={cn(
        "h-full overflow-hidden py-0 transition-all duration-300 will-change-auto [transition-timing-function:cubic-bezier(0.31,0.1,0.08,0.96)]",
        open ? width : "w-0 opacity-0",
        !open && "mr-0",
      )}
    >
      <div
        className={cn(
          "customScroll mr-4 flex h-full shrink-0 flex-col gap-2 overflow-y-auto rounded-lg pb-4 pr-2 pt-1",
          bordered && "border-border border-r",
          left ? "pl-1" : "pl-3",
          className,
        )}
      >
        {}
        {children}
      </div>
    </div>
  );
};

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
type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface DashboardStats {
      totalApplied: number;
      totalEnrolled: number;
      totalCompleted: number;
      totalCertificates: number;
    }

type ApplicationStatus =
      "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "WAITING";

interface DashboardRecentApplication {
      id: string;
      status: ApplicationStatus;
      appliedAt: string;
      internship: {
        id: string;
        title: string;
        companyName: string;
      };
    }

interface DashboardRecentEnrollment {
      id: string;
      createdAt: string;
      internship: {
        id: string;
        title: string;
        companyName: string;
        location: string;
        mode: string;
        duration: string;
        startDate: string | null;
        instructor: { id: string; name: string; email: string } | null;
      };
    }

interface DashboardRecentCertificate {
      id: string;
      certificateNo: string;
      issuedAt: string;
    }

interface DashboardRecentNotice {
      id: string;
      title: string;
      description: string;
      content?: string;
      category: string;
      createdAt: string;
      sender: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }

interface DashboardRecentSubmission {
      id: string;
      projectTitle: string;
      projectUrl: string;
      comments: string | null;
      status: "PENDING" | "GRADED";
      grade: string | null;
      feedback: string | null;
      createdAt: string;
      enrollment: {
        internship: {
          title: string;
        };
      };
      gradedBy: {
        name: string;
      } | null;
    }

interface StudentDashboardData {
      stats: DashboardStats;
      recentApplications: DashboardRecentApplication[];
      recentEnrollments: DashboardRecentEnrollment[];
      recentCertificates: DashboardRecentCertificate[];
      recentNotices: DashboardRecentNotice[];
      recentSubmissions: DashboardRecentSubmission[];
    }

interface GetStudentDashboardResponse {
      success: boolean;
      data: StudentDashboardData;
    }

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

type InternshipType = "PAID" | "STIPEND" | "FREE";

interface ListInternshipsParams {
      page?: number;
      limit?: number;
      type?: InternshipType;
      search?: string;
      category?: string;
    }

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

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

interface ApplyForInternshipResponse {
      success: boolean;
      message: string;
      data: {
        id: string;
        status: ApplicationStatus;
        appliedAt: string;
      };
    }

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

interface CheckApplicationStatusResponse {
      success: boolean;
      data: {
        id: string;
        status: ApplicationStatus;
        reviewNote: string | null;
      };
    }

interface ApplicationInternshipSummary {
      id?: string;
      title: string;
      companyName: string;
      type?: InternshipType;
      mode?: string;
      location?: string;
      duration?: string;
    }

interface InternshipApplication {
      id: string;
      status: ApplicationStatus;
      appliedAt: string;
      reviewNote?: string | null;
      internship: ApplicationInternshipSummary;
      studentName?: string;
      address?: string;
      student?: {
        id: string;
        name?: string | null;
        email?: string | null;
        studentRegistration?: {
          fullName?: string | null;
          localAddressLocal?: string | null;
          localAddressBlock?: string | null;
          localAddressDistrict?: string | null;
          localAddressState?: string | null;
          localAddressCountry?: string | null;
          localAddressPinCode?: string | null;
        } | null;
      } | null;
    }

interface ListMyApplicationsResponse {
      success: boolean;
      data: InternshipApplication[];
    }

interface EnrollmentInternshipSummary {
      id: string;
      title: string;
      companyName: string;
      mentor?: { name: string } | null;
    }

interface MyEnrollment {
      id: string;
      createdAt: string;
      completedAt: string | null;
      internship: EnrollmentInternshipSummary;
    }

interface ListMyEnrollmentsResponse {
      success: boolean;
      data: MyEnrollment[];
    }

interface DirectEnrollResponse {
      success: boolean;
      data: {
        enrollmentId: string;
        internshipId: string;
        createdAt: string;
      };
    }

interface EnrollmentIDCard {
      cardNo: string;
      issuedAt: string;
      studentId: string;
      studentName: string;
      studentEmail: string;
      studentMobile: string;
      studentAddress: string;
      photoUrl?: string;
      internshipId: string;
      internshipTitle: string;
      internshipLocation: string;
    }

interface GetEnrollmentIDCardResponse {
      success: boolean;
      data: EnrollmentIDCard;
    }

interface MyCertificate {
      id: string;
      certificateNo: string;
      issuedAt: string;
      signatureUrl?: string | null;
      studentId?: string | null;
      grade?: string | null;
      credits?: string | null;
      internship: {
        id: string;
        title: string;
        companyName: string;
        location: string;
        duration: string;
        mode: string;
        credits?: string | null;
      };
      issuedBy: {
        id: string;
        name: string;
      };
    }

interface ListMyCertificatesResponse {
      success: boolean;
      data: MyCertificate[];
    }

interface AssignGradeResponse {
      success: boolean;
      message: string;
      data: {
        id: string;
        certificateNo: string;
        grade: string;
        credits: string | null;
      };
    }

interface AssignGradeRequest {
      grade: string;
    }

type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

interface ListMyPaymentsParams {
      page?: number;
      limit?: number;
      status?: PaymentStatus;
      search?: string;
    }

interface PaymentPublic {
      id: string;
      amount: number;
      currency: string;
      status: PaymentStatus;
      razorpayOrderId: string;
      razorpayPaymentId: string | null;
      razorpaySignature: string | null;
      refundId: string | null;
      createdAt: string;
      updatedAt: string;
      userId: string;
      internshipId: string;
    }

interface ListMyPaymentsResponse {
      success: boolean;
      data: PaymentPublic[];
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }

interface PaymentReceiptData {
      id: string;
      amount: number;
      status: PaymentStatus;
      createdAt: string;
      razorpayOrderId: string;
      razorpayPaymentId: string | null;
      user?: {
        id: string;
        name: string;
        email: string;
      };
      internship?: {
        id: string;
        title: string;
        companyName: string;
        duration: string;
      };
    }

interface GetPaymentReceiptResponse {
      success: boolean;
      data: PaymentReceiptData;
    }

interface CreateOrderResponseData {
      paymentId: string;
      razorpayOrderId: string;
      amount: number;
      currency: string;
      keyId: string;
      isMockMode: boolean;
    }

interface CreateOrderResponse {
      success: boolean;
      data: CreateOrderResponseData;
    }

interface CreateOrderPayload {
      internshipId: string;
    }

interface VerifySignatureResponseData {
      paymentId: string;
      enrollmentId: string;
      status: string;
    }

interface VerifySignatureResponse {
      success: boolean;
      data: VerifySignatureResponseData;
    }

interface VerifySignaturePayload {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    }

interface RefundResponseData {
      id: string;
      paymentId: string;
      amount: number;
      status: string;
      createdAt: string;
    }

interface RefundResponse {
      success: boolean;
      data: RefundResponseData;
    }

interface RefundPayload {
      paymentId: string;
      amount?: number;
    }

interface ListAllPaymentsResponse {
      success: boolean;
      data: PaymentPublic[];
    }

type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface SupportTicket {
      id: string;
      ticketNo: string;
      title: string;
      description: string;
      status: TicketStatus;
      priority: TicketPriority;
      createdAt: string;
      updatedAt: string;
      userId: string;
      subject?: string;
      message?: string;
    }

interface CreateTicketResponse {
      success: boolean;
      data: SupportTicket;
    }

interface CreateTicketPayload {
      title: string;
      description: string;
      priority?: TicketPriority;
    }

interface ListMyTicketsResponse {
      success: boolean;
      data: SupportTicket[];
    }

interface DeleteTicketResponse {
      success: boolean;
      message: string;
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

interface Feedback {
      id: string;
      enrollmentId: string;
      senderId: string;
      receiverId: string;
      type: "STUDENT_TO_INSTRUCTOR" | "INSTRUCTOR_TO_STUDENT";
      rating: number;
      comments: string;
      createdAt: string;
      updatedAt: string;
    }

interface FeedbackResponse {
      success: boolean;
      data: Feedback;
      message?: string;
    }

interface FeedbackPayload {
      enrollmentId: string;
      rating: number;
      comments: string;
    }

interface MyFeedbacksResponse {
      success: boolean;
      data: {
        sent: Feedback[];
        received: Feedback[];
      };
    }

interface Review {
      id: string;
      name: string;
      email: string;
      role: string | null;
      rating: number;
      comment: string;
      avatarUrl: string | null;
      isApproved: boolean;
      approvedAt: string | null;
      createdAt: string;
      updatedAt: string;
    }

interface MyReviewsResponse {
      success: boolean;
      data: Review[];
    }

interface VerifyIDCardResponse {
      success: boolean;
      data: {
        cardNo: string;
        status: string;
      };
    }

interface ProjectSubmission {
      id: string;
      enrollmentId: string;
      projectTitle: string;
      projectUrl: string;
      comments: string | null;
      status: "PENDING" | "GRADED";
      grade: string | null;
      feedback: string | null;
      createdAt: string;
      updatedAt: string;
      gradedBy?: {
        name: string;
      } | null;
    }

interface SubmitProjectResponse {
      success: boolean;
      message?: string;
      data: ProjectSubmission;
    }

interface SubmitProjectPayload {
      enrollmentId: string;
      projectTitle: string;
      projectUrl: string;
      comments?: string;
    }

interface ListEnrollmentSubmissionsResponse {
      success: boolean;
      message?: string;
      data: ProjectSubmission[];
    }

interface UpdateSubmissionResponse {
      success: boolean;
      message?: string;
      data: ProjectSubmission;
    }

interface UpdateSubmissionPayload {
      projectTitle: string;
      projectUrl: string;
      comments?: string;
    }

interface DeleteSubmissionResponse {
      success: boolean;
      message?: string;
      data: null;
    }

interface IStudentDataHook {
        useStudentDashboard: (
        options?: TQueryOptions<GetStudentDashboardResponse, Error>,
      ) => TQueryReturnType<GetStudentDashboardResponse, Error>;

        useInternships: (
        params?: ListInternshipsParams,
        options?: TQueryOptions<ListInternshipsResponse, Error>,
      ) => TQueryReturnType<ListInternshipsResponse, Error>;

        useInternship: (
        id: string,
        options?: TQueryOptions<GetInternshipByIdResponse, Error>,
      ) => TQueryReturnType<GetInternshipByIdResponse, Error>;

        useApplyInternship: (
        options?: TMutationOptions<ApplyForInternshipResponse, Error, string>,
      ) => TMutationReturnType<ApplyForInternshipResponse, string>;

        useCheckApplicationStatus: (
        id: string,
        options?: TQueryOptions<CheckApplicationStatusResponse, Error>,
      ) => TQueryReturnType<CheckApplicationStatusResponse, Error>;

        useMyApplications: (
        options?: TQueryOptions<ListMyApplicationsResponse, Error>,
      ) => TQueryReturnType<ListMyApplicationsResponse, Error>;

        useMyEnrollments: (
        options?: TQueryOptions<ListMyEnrollmentsResponse, Error>,
      ) => TQueryReturnType<ListMyEnrollmentsResponse, Error>;

        useDirectEnroll: (
        options?: TMutationOptions<DirectEnrollResponse, Error, string>,
      ) => TMutationReturnType<DirectEnrollResponse, string>;

        useEnrollmentIDCard: (
        id: string,
        options?: TQueryOptions<GetEnrollmentIDCardResponse, Error>,
      ) => TQueryReturnType<GetEnrollmentIDCardResponse, Error>;

        useMyCertificates: (
        options?: TQueryOptions<ListMyCertificatesResponse, Error>,
      ) => TQueryReturnType<ListMyCertificatesResponse, Error>;

        useDownloadCertificate: (
        options?: TMutationOptions<Blob, Error, string>,
      ) => TMutationReturnType<Blob, string>;

        useAssignGrade: (
        options?: TMutationOptions<
          AssignGradeResponse,
          Error,
          { id: string; payload: AssignGradeRequest }
        >,
      ) => TMutationReturnType<
        AssignGradeResponse,
        { id: string; payload: AssignGradeRequest }
      >;

        useDownloadApplicationPDF: (
        options?: TMutationOptions<
          Blob,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) => TMutationReturnType<
        Blob,
        { internshipId: string; applicationId: string }
      >;

        useMyPayments: (
        params?: ListMyPaymentsParams,
        options?: TQueryOptions<ListMyPaymentsResponse, Error>,
      ) => TQueryReturnType<ListMyPaymentsResponse, Error>;

        usePaymentReceipt: (
        id: string,
        options?: TQueryOptions<GetPaymentReceiptResponse, Error>,
      ) => TQueryReturnType<GetPaymentReceiptResponse, Error>;

        useCreatePaymentOrder: (
        options?: TMutationOptions<CreateOrderResponse, Error, CreateOrderPayload>,
      ) => TMutationReturnType<CreateOrderResponse, CreateOrderPayload>;

        useVerifyPaymentSignature: (
        options?: TMutationOptions<
          VerifySignatureResponse,
          Error,
          VerifySignaturePayload
        >,
      ) => TMutationReturnType<VerifySignatureResponse, VerifySignaturePayload>;

        useRefundPayment: (
        options?: TMutationOptions<RefundResponse, Error, RefundPayload>,
      ) => TMutationReturnType<RefundResponse, RefundPayload>;

        useAllPayments: (
        options?: TQueryOptions<ListAllPaymentsResponse, Error>,
      ) => TQueryReturnType<ListAllPaymentsResponse, Error>;

        useCreateSupportTicket: (
        options?: TMutationOptions<
          CreateTicketResponse,
          Error,
          CreateTicketPayload
        >,
      ) => TMutationReturnType<CreateTicketResponse, CreateTicketPayload>;

        useMySupportTickets: (
        options?: TQueryOptions<ListMyTicketsResponse, Error>,
      ) => TQueryReturnType<ListMyTicketsResponse, Error>;

        useDeleteSupportTicket: (
        options?: TMutationOptions<DeleteTicketResponse, Error, string>,
      ) => TMutationReturnType<DeleteTicketResponse, string>;

        useNotices: (
        options?: TQueryOptions<ListNoticesResponse, Error>,
      ) => TQueryReturnType<ListNoticesResponse, Error>;

        useCreateNotice: (
        options?: TMutationOptions<
          CreateNoticeResponse,
          Error,
          CreateNoticePayload
        >,
      ) => TMutationReturnType<CreateNoticeResponse, CreateNoticePayload>;

        useSubmitFeedback: (
        options?: TMutationOptions<FeedbackResponse, Error, FeedbackPayload>,
      ) => TMutationReturnType<FeedbackResponse, FeedbackPayload>;

        useMyFeedbacks: (
        options?: TQueryOptions<MyFeedbacksResponse, Error>,
      ) => TQueryReturnType<MyFeedbacksResponse, Error>;

        useMyReviews: (
        options?: TQueryOptions<MyReviewsResponse, Error>,
      ) => TQueryReturnType<MyReviewsResponse, Error>;

        useVerifyIdCard: (
        id: string,
        options?: TQueryOptions<VerifyIDCardResponse, Error>,
      ) => TQueryReturnType<VerifyIDCardResponse, Error>;

        useSubmitProject: (
        options?: TMutationOptions<
          SubmitProjectResponse,
          Error,
          SubmitProjectPayload
        >,
      ) => TMutationReturnType<SubmitProjectResponse, SubmitProjectPayload>;

        useEnrollmentSubmissions: (
        enrollmentId: string,
        options?: TQueryOptions<ListEnrollmentSubmissionsResponse, Error>,
      ) => TQueryReturnType<ListEnrollmentSubmissionsResponse, Error>;

        useUpdateSubmission: (
        options?: TMutationOptions<
          UpdateSubmissionResponse,
          Error,
          {
            enrollmentId: string;
            submissionId: string;
            payload: UpdateSubmissionPayload;
          }
        >,
      ) => TMutationReturnType<
        UpdateSubmissionResponse,
        {
          enrollmentId: string;
          submissionId: string;
          payload: UpdateSubmissionPayload;
        }
      >;

        useDeleteSubmission: (
        options?: TMutationOptions<
          DeleteSubmissionResponse,
          Error,
          { enrollmentId: string; submissionId: string }
        >,
      ) => TMutationReturnType<
        DeleteSubmissionResponse,
        { enrollmentId: string; submissionId: string }
      >;

        usePublicNewspapers: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicOnlineLinks: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicPhotos: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicVideos: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicPartners: (
        type: "educational-institutes" | "job-placement" | "training-support",
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicBlogs: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicDonations: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicImmersions: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      useSubmitInternshipInterest: (
        options?: TMutationOptions<
          Record<string, unknown>,
          Error,
          { id: string; payload: Record<string, unknown> }
        >,
      ) => TMutationReturnType<
        Record<string, unknown>,
        { id: string; payload: Record<string, unknown> }
      >;
      useSubmitPlacementInterest: (
        options?: TMutationOptions<
          Record<string, unknown>,
          Error,
          { id: string; formData: FormData }
        >,
      ) => TMutationReturnType<
        Record<string, unknown>,
        { id: string; formData: FormData }
      >;
    }

const STUDENT_QUERY_KEYS = {
      ALL: ["students"] as const,
      DASHBOARD: ["students", "dashboard"] as const,
      INTERNSHIPS: (params?: ListInternshipsParams) =>
        ["students", "internships", params] as const,
      INTERNSHIP: (id: string) => ["students", "internship", id] as const,
      APPLICATION_STATUS: (id: string) =>
        ["students", "application-status", id] as const,
      MY_APPLICATIONS: ["students", "my-applications"] as const,
      MY_ENROLLMENTS: ["students", "my-enrollments"] as const,
      ENROLLMENT_ID_CARD: (id: string) => ["students", "id-card", id] as const,
      MY_CERTIFICATES: ["students", "my-certificates"] as const,
      MY_PAYMENTS: (params?: ListMyPaymentsParams) =>
        ["students", "my-payments", params] as const,
      PAYMENT_RECEIPT: (id: string) => ["students", "payment-receipt", id] as const,
      ALL_PAYMENTS: ["payments"] as const,
      MY_TICKETS: ["students", "my-tickets"] as const,
      NOTICES: ["notices"] as const,
      FEEDBACKS: ["students", "feedbacks"] as const,
      MY_REVIEWS: ["students", "my-reviews"] as const,
      VERIFY_ID_CARD: (id: string) => ["id-card", "verify", id] as const,
      ENROLLMENT_SUBMISSIONS: (id: string) =>
        ["students", "enrollment-submissions", id] as const,
    };

interface IStudentService {
        getDashboardSummary: () => Promise<GetStudentDashboardResponse>;

        listInternships: (
        params?: ListInternshipsParams,
      ) => Promise<ListInternshipsResponse>;
      getInternshipById: (id: string) => Promise<GetInternshipByIdResponse>;

        applyForInternship: (id: string) => Promise<ApplyForInternshipResponse>;
      checkApplicationStatus: (
        id: string,
      ) => Promise<CheckApplicationStatusResponse>;
      listMyApplications: () => Promise<ListMyApplicationsResponse>;
      downloadApplicationPDF: (
        internshipId: string,
        applicationId: string,
      ) => Promise<Blob>;

        listMyEnrollments: () => Promise<ListMyEnrollmentsResponse>;
      directEnroll: (id: string) => Promise<DirectEnrollResponse>;
      getEnrollmentIDCard: (id: string) => Promise<GetEnrollmentIDCardResponse>;

        listMyCertificates: () => Promise<ListMyCertificatesResponse>;
      downloadCertificate: (id: string) => Promise<Blob>;
      assignGrade: (
        id: string,
        payload: AssignGradeRequest,
      ) => Promise<AssignGradeResponse>;

        listMyPayments: (
        params?: ListMyPaymentsParams,
      ) => Promise<ListMyPaymentsResponse>;
      getPaymentReceipt: (id: string) => Promise<GetPaymentReceiptResponse>;
      createPaymentOrder: (
        payload: CreateOrderPayload,
      ) => Promise<CreateOrderResponse>;
      verifyPaymentSignature: (
        payload: VerifySignaturePayload,
      ) => Promise<VerifySignatureResponse>;
      refundPayment: (payload: RefundPayload) => Promise<RefundResponse>;
      listAllPayments: () => Promise<ListAllPaymentsResponse>;

        createSupportTicket: (
        payload: CreateTicketPayload,
      ) => Promise<CreateTicketResponse>;
      listMySupportTickets: () => Promise<ListMyTicketsResponse>;
      deleteSupportTicket: (id: string) => Promise<DeleteTicketResponse>;

        listNotices: () => Promise<ListNoticesResponse>;
      createNotice: (payload: CreateNoticePayload) => Promise<CreateNoticeResponse>;

        submitFeedback: (payload: FeedbackPayload) => Promise<FeedbackResponse>;
      getMyFeedbacks: () => Promise<MyFeedbacksResponse>;
      listMyReviews: () => Promise<MyReviewsResponse>;
      verifyIdCard: (id: string) => Promise<VerifyIDCardResponse>;
      submitProject: (
        payload: SubmitProjectPayload,
      ) => Promise<SubmitProjectResponse>;
      listEnrollmentSubmissions: (
        enrollmentId: string,
      ) => Promise<ListEnrollmentSubmissionsResponse>;
      updateSubmission: (
        enrollmentId: string,
        submissionId: string,
        payload: UpdateSubmissionPayload,
      ) => Promise<UpdateSubmissionResponse>;
      deleteSubmission: (
        enrollmentId: string,
        submissionId: string,
      ) => Promise<DeleteSubmissionResponse>;

        getPublicNewspapers: () => Promise<Record<string, unknown>[]>;
      getPublicOnlineLinks: () => Promise<Record<string, unknown>[]>;
      getPublicPhotos: () => Promise<Record<string, unknown>[]>;
      getPublicVideos: () => Promise<Record<string, unknown>[]>;
      getPublicPartners: (
        type: "educational-institutes" | "job-placement" | "training-support",
      ) => Promise<Record<string, unknown>[]>;
      getPublicBlogs: () => Promise<Record<string, unknown>[]>;
      getPublicDonations: () => Promise<Record<string, unknown>[]>;
      getPublicImmersions: () => Promise<Record<string, unknown>[]>;
      submitInternshipInterest: (
        id: string,
        payload: Record<string, unknown>,
      ) => Promise<Record<string, unknown>>;
      submitPlacementInterest: (
        id: string,
        formData: FormData,
      ) => Promise<Record<string, unknown>>;
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

type InternshipType_2 = "PAID" | "STIPEND" | "FREE";

type TAlertFilter_3 = {
      icon?: React_4.ReactNode;
      value: string;
      label: string;
      count: number | null;
      type?: string;
    };

const TYPE_FILTERS_2: TAlertFilter_3[] = [
      { label: "Paid", value: "PAID", count: null },
      { label: "Stipend", value: "STIPEND", count: null },
      { label: "Free", value: "FREE", count: null },
    ];

const InternshipsSidebarFilters = () => {
      return (
        <SidebarFiltersHeader className="mr-0 px-3">
          <SidebarCheckBoxFilter
            header="type"
            filters={TYPE_FILTERS_2}
            filter_name="Type"
          />
        </SidebarFiltersHeader>
      );
    };

interface NoDataFoundProps {
      title: string;
      description?: string;
      action?: React_2.ReactNode;
    }

function NoDataFound_2({
      title,
      description,
      action,
    }: NoDataFoundProps) {
      return (
        <div className="flex flex-col items-center justify-center space-y-5 py-16 text-center">
          <div className="pointer-events-none relative h-52 w-52 select-none">
            <Image_2
              src="/images/no-data-found.png"
              alt="No data found"
              fill
              className="object-contain opacity-90"
              priority={false}
            />
          </div>

          <div className="max-w-xs space-y-2">
            <p className="text-foreground text-base font-bold">{title}</p>
            {description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      );
    }

type ApplicationStatus_2 =
      "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "WAITING";

interface InternshipCardProps_2 {
      internship: InternshipPublic;
      onViewDetails: (i: InternshipPublic) => void;
      isEnrolled: boolean;
      applicationStatus?: ApplicationStatus_2;
      isApplying: boolean;
      onApply: (id: string) => void;
      onPay: (i: InternshipPublic) => void;
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

function InternshipCard_2({
      internship,
      onViewDetails,
      isEnrolled,
      applicationStatus,
      isApplying,
      onApply,
      onPay,
    }: InternshipCardProps_2) {
        const categoryLabel =
        internship.type === "PAID"
          ? "By Paying Fees"
          : internship.type === "STIPEND"
            ? "Stipend"
            : "Free of Cost";

      const typeLabel =
        internship.mode === "ONLINE"
          ? "Virtual"
          : internship.mode === "HYBRID"
            ? "Part Time"
            : "Full Time";

      const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return "";
        try {
          return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        } catch (_e) {
          return String(dateStr);
        }
      };

      const timePeriod = (internship as any).timePeriod || "Non-Residential";
      const qualification =
        (internship as any).qualification || "B.Tech/M.Tech (CS/IT)";
      const lastDate = (internship as any).lastDate;
      const organizer =
        (internship as any).organizer || "IIIT Center of Excellence";
      const contact = internship.contact || "Program Desk (+91 9472351693)";
      const mentor = internship.mentor?.name || "Senior Instructor";
      const facilities = (internship as any).facilities || "";
      const careerOpportunity = (internship as any).careerOpportunity || "";
      const projectFocus = internship.projectFocus || "";

      const modules = Array.isArray(internship.modules)
        ? internship.modules
        : internship.modules
          ? [internship.modules]
          : [];

      const tools = Array.isArray(internship.tools)
        ? internship.tools
        : internship.tools
          ? [internship.tools]
          : [];

      const skills = Array.isArray(internship.skills)
        ? internship.skills
        : internship.skills
          ? [internship.skills]
          : [];

      const fee = internship.price
        ? `₹${internship.price.toLocaleString()}`
        : "Free";

        let actionButton = null;

      if (isEnrolled) {
        actionButton = (
          <Button
            size="sm"
            className="flex-1 border border-emerald-200 bg-emerald-100 font-semibold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
            disabled
          >
            Enrolled
          </Button>
        );
      } else if (applicationStatus) {
        const statusLabels: Record<ApplicationStatus_2, string> = {
          UNDER_REVIEW: "Applied",
          APPROVED: "Approved",
          REJECTED: "Rejected",
          WAITING: "Waiting List",
        };
        const statusClasses: Record<ApplicationStatus_2, string> = {
          UNDER_REVIEW:
            "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 border border-amber-200 dark:border-amber-900/50",
          APPROVED:
            "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50",
          REJECTED:
            "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-400 border border-red-200 dark:border-red-900/50",
          WAITING:
            "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 border border-blue-200 dark:border-blue-900/50",
        };
        actionButton = (
          <Button
            size="sm"
            className={`flex-1 font-semibold ${statusClasses[applicationStatus] || ""}`}
            disabled
          >
            {statusLabels[applicationStatus] || "Applied"}
          </Button>
        );
      } else if (internship.type === "PAID") {
        actionButton = (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 font-semibold"
            onClick={() => onPay(internship)}
          >
            Pay & Enroll
          </Button>
        );
      } else {
        actionButton = (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 gap-1.5 font-semibold"
            onClick={() => onApply(internship.id)}
            disabled={isApplying}
          >
            {isApplying && <Loader2 className="size-3.5 animate-spin" />}
            Apply Now
          </Button>
        );
      }

      return (
        <div className="shadow-xs hover:border-primary/30 group flex h-fit flex-col gap-3.5 rounded-2xl border border-zinc-200/80 bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/60">
          {}
          <div className="flex items-center gap-3">
            <div className="bg-primary/5 border-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
              <Briefcase_2 className="h-5.5 w-5.5 text-primary" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="text-foreground group-hover:text-primary truncate text-base font-extrabold leading-tight tracking-tight transition-colors">
                {internship.title}
              </h3>
              <p className="text-muted-foreground mt-0.5 truncate text-xs font-semibold">
                {internship.companyName}
              </p>
            </div>
          </div>

          {}
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <InternshipIdChip
              code={internship.id}
              companyName={internship.companyName}
            />
            <span className="inline-block rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400">
              {typeLabel}
            </span>
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
              {categoryLabel}
            </span>
            <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400">
              {timePeriod}
            </span>
            {internship.department && (
              <span className="inline-block rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-400">
                {internship.department}
              </span>
            )}
          </div>

          {}
          <div>
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {internship.description?.replace(/<[^>]*>/g, "")}
            </p>
          </div>

          {}
          <div className="flex items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/[0.04] p-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10">
              <Sparkles_2 className="h-3 w-3 text-amber-600" />
            </span>
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
              Facilitation & Package Fee:
            </span>
            <span className="text-foreground text-sm font-extrabold text-amber-600 dark:text-amber-500">
              {fee}
            </span>
          </div>

          {}
          <div className="group/btn mt-auto flex w-full items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary flex-1 font-semibold transition-all"
              onClick={() => onViewDetails(internship)}
            >
              View Details
            </Button>
            {actionButton}
          </div>
        </div>
      );
    }

interface InternshipDetailDialogProps {
      internship: InternshipPublic;
      open: boolean;
      onClose: () => void;
    }

type ApplicationStatus_3 =
      "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "WAITING";

function Dialog_10({
      ...props
    }: React_3.ComponentProps<typeof SheetPrimitive.Root>) {
      return <SheetPrimitive.Root data-slot="dialog" {...props} />;
    }

function StatusBadge({ status }: { status: ApplicationStatus_3 }) {
      const map: Record<
        ApplicationStatus_3,
        { label: string; className: string; icon: React_3.ReactNode }
      > = {
        UNDER_REVIEW: {
          label: "Under Review",
          className: "text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20",
          icon: <Clock_2 className="size-3" />,
        },
        APPROVED: {
          label: "Approved",
          className: "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/20",
          icon: <CheckCircle className="size-3" />,
        },
        REJECTED: {
          label: "Rejected",
          className: "text-red-700 bg-red-100 dark:bg-red-900/20",
          icon: <XCircle className="size-3" />,
        },
        WAITING: {
          label: "Waiting List",
          className: "text-blue-700 bg-blue-100 dark:bg-blue-900/20",
          icon: <Clock_2 className="size-3" />,
        },
      };
      const cfg = map[status];
      if (!cfg) return null;
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${cfg.className}`}
        >
          {cfg.icon} {cfg.label}
        </span>
      );
    }

interface PaymentModalProps_2 {
      internship: InternshipPublic;
      open: boolean;
      onClose: () => void;
      onCancel: () => void;
    }

function loadRazorpayScript_3(): Promise<boolean> {
      return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    }

interface RazorpayResponse_2 {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }


export default function InternshipsNewPage() {
    const StudentService: IStudentService = {
        async getDashboardSummary() {
        const response = await axiosInstance.get<GetStudentDashboardResponse>(
          ENDPOINTS.STUDENTS.DASHBOARD,
        );
        return response.data;
      },

        async listInternships(params) {
        const response = await axiosInstance.get<ListInternshipsResponse>(
          ENDPOINTS.INTERNSHIPS.BASE,
          { params },
        );
        return response.data;
      },

      async getInternshipById(id) {
        const response = await axiosInstance.get<GetInternshipByIdResponse>(
          ENDPOINTS.INTERNSHIPS.BY_ID(id),
        );
        return response.data;
      },

        async applyForInternship(id) {
        const response = await axiosInstance.post<ApplyForInternshipResponse>(
          ENDPOINTS.INTERNSHIPS.APPLY(id),
        );
        return response.data;
      },

      async checkApplicationStatus(id) {
        const response = await axiosInstance.get<CheckApplicationStatusResponse>(
          ENDPOINTS.INTERNSHIPS.APPLY(id),
        );
        return response.data;
      },

      async listMyApplications() {
        const response = await axiosInstance.get<ListMyApplicationsResponse>(
          ENDPOINTS.INTERNSHIPS.MY_APPLICATIONS,
        );
        return response.data;
      },

      async downloadApplicationPDF(internshipId, applicationId) {
        const response = await axiosInstance.get<Blob>(
          `/internships/${internshipId}/applications/${applicationId}/download`,
          {
            responseType: "blob",
          },
        );
        return response.data;
      },

        async listMyEnrollments() {
        const response = await axiosInstance.get<ListMyEnrollmentsResponse>(
          ENDPOINTS.ENROLLMENTS.MY_ENROLLMENTS,
        );
        return response.data;
      },

      async directEnroll(id) {
        const response = await axiosInstance.post<DirectEnrollResponse>(
          ENDPOINTS.INTERNSHIPS.ENROLL(id),
        );
        return response.data;
      },

      async getEnrollmentIDCard(id) {
        const response = await axiosInstance.get<GetEnrollmentIDCardResponse>(
          ENDPOINTS.ENROLLMENTS.ID_CARD(id),
        );
        return response.data;
      },

        async listMyCertificates() {
        const response = await axiosInstance.get<ListMyCertificatesResponse>(
          `${ENDPOINTS.CERTIFICATES.MY_CERTIFICATES}?t=${Date.now()}`,
        );
        return response.data;
      },

      async downloadCertificate(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.CERTIFICATES.DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

      async assignGrade(id, payload) {
        const response = await axiosInstance.patch<AssignGradeResponse>(
          ENDPOINTS.CERTIFICATES.GRADE(id),
          payload,
        );
        return response.data;
      },

        async listMyPayments(params) {
        const response = await axiosInstance.get<ListMyPaymentsResponse>(
          ENDPOINTS.PAYMENTS.MY_PAYMENTS,
          { params },
        );
        return response.data;
      },

      async getPaymentReceipt(id) {
        const response = await axiosInstance.get<GetPaymentReceiptResponse>(
          ENDPOINTS.PAYMENTS.RECEIPT(id),
        );
        return response.data;
      },

      async createPaymentOrder(payload) {
        const response = await axiosInstance.post<CreateOrderResponse>(
          ENDPOINTS.PAYMENTS.CREATE_ORDER,
          payload,
        );
        return response.data;
      },

      async verifyPaymentSignature(payload) {
        const response = await axiosInstance.post<VerifySignatureResponse>(
          ENDPOINTS.PAYMENTS.VERIFY_SIGNATURE,
          payload,
        );
        return response.data;
      },

      async refundPayment(payload) {
        const response = await axiosInstance.post<RefundResponse>(
          ENDPOINTS.PAYMENTS.REFUND,
          payload,
        );
        return response.data;
      },

      async listAllPayments() {
        const response = await axiosInstance.get<ListAllPaymentsResponse>(
          ENDPOINTS.PAYMENTS.ADMIN_LIST,
        );
        return response.data;
      },

        async createSupportTicket(payload) {
        const response = await axiosInstance.post<CreateTicketResponse>(
          ENDPOINTS.TICKETS.BASE,
          payload,
        );
        return response.data;
      },

      async listMySupportTickets() {
        const response = await axiosInstance.get<ListMyTicketsResponse>(
          ENDPOINTS.TICKETS.MY_TICKETS,
        );
        return response.data;
      },

      async deleteSupportTicket(id) {
        const response = await axiosInstance.delete<DeleteTicketResponse>(
          ENDPOINTS.TICKETS.BY_ID(id),
        );
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

        async submitFeedback(payload) {
        const response = await axiosInstance.post<FeedbackResponse>(
          ENDPOINTS.FEEDBACK.BASE,
          payload,
        );
        return response.data;
      },

      async getMyFeedbacks() {
        const response = await axiosInstance.get<MyFeedbacksResponse>(
          ENDPOINTS.FEEDBACK.MY_FEEDBACKS,
        );
        return response.data;
      },

      async listMyReviews() {
        const response = await axiosInstance.get<MyReviewsResponse>(
          ENDPOINTS.REVIEWS.MY_REVIEWS,
        );
        return response.data;
      },

      async verifyIdCard(id) {
        const response = await axiosInstance.get<VerifyIDCardResponse>(
          ENDPOINTS.ID_CARDS.BY_ID(id),
        );
        return response.data;
      },

      async submitProject(payload) {
        const response = await axiosInstance.post<SubmitProjectResponse>(
          ENDPOINTS.INSTRUCTOR.SUBMISSIONS,
          payload,
        );
        return response.data;
      },

      async listEnrollmentSubmissions(enrollmentId) {
        const response = await axiosInstance.get<ListEnrollmentSubmissionsResponse>(
          ENDPOINTS.ENROLLMENTS.SUBMISSIONS(enrollmentId),
        );
        return response.data;
      },

      async updateSubmission(enrollmentId, submissionId, payload) {
        const response = await axiosInstance.patch<UpdateSubmissionResponse>(
          ENDPOINTS.ENROLLMENTS.SUBMISSION_BY_ID(enrollmentId, submissionId),
          payload,
        );
        return response.data;
      },

      async deleteSubmission(enrollmentId, submissionId) {
        const response = await axiosInstance.delete<DeleteSubmissionResponse>(
          ENDPOINTS.ENROLLMENTS.SUBMISSION_BY_ID(enrollmentId, submissionId),
        );
        return response.data;
      },

        async getPublicNewspapers() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/newspapers");
        return response.data?.data || [];
      },

      async getPublicOnlineLinks() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/online-links");
        return response.data?.data || [];
      },

      async getPublicPhotos() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/photos");
        return response.data?.data || [];
      },

      async getPublicVideos() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/videos");
        return response.data?.data || [];
      },

      async getPublicPartners(type) {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>(`/partners/${type}`);
        const data = response.data?.data || [];
        return data.map((item) => ({
          ...item,
          logoUrl: item.logo || item.logoUrl,
          photoUrl: item.photo || item.photoUrl,
        }));
      },

      async getPublicBlogs() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/blogs");
        return response.data?.data || [];
      },

      async getPublicDonations() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/donations");
        return response.data?.data || [];
      },

      async getPublicImmersions() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/immersion");
        return response.data?.data || [];
      },

      async submitInternshipInterest(id, payload) {
        const response = await axiosInstance.post(
          `/internships/${id}/interest`,
          payload,
        );
        return response.data;
      },

      async submitPlacementInterest(id, formData) {
        const response = await axiosInstance.post(
          `/partners/job-placement/${id}/interest`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        return response.data;
      },
    };

    const StudentDataHook: IStudentDataHook = {
        useStudentDashboard(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
          queryFn: async () => await StudentService.getDashboardSummary(),
          ...options,
        });
      },

        useInternships(params, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.INTERNSHIPS(params),
          queryFn: async () => await StudentService.listInternships(params),
          ...options,
        });
      },

        useInternship(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.INTERNSHIP(id),
          queryFn: async () => await StudentService.getInternshipById(id),
          enabled: !!id,
          ...options,
        });
      },

        useApplyInternship(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await StudentService.applyForInternship(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Application submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to apply for internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useCheckApplicationStatus(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.APPLICATION_STATUS(id),
          queryFn: async () => await StudentService.checkApplicationStatus(id),
          enabled: !!id,
          ...options,
        });
      },

        useMyApplications(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_APPLICATIONS,
          queryFn: async () => await StudentService.listMyApplications(),
          ...options,
        });
      },

        useMyEnrollments(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
          queryFn: async () => await StudentService.listMyEnrollments(),
          ...options,
        });
      },

        useDirectEnroll(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await StudentService.directEnroll(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message || "Enrolled successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to enroll.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useEnrollmentIDCard(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_ID_CARD(id),
          queryFn: async () => await StudentService.getEnrollmentIDCard(id),
          enabled: !!id,
          ...options,
        });
      },

        useMyCertificates(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_CERTIFICATES,
          queryFn: async () => await StudentService.listMyCertificates(),
          ...options,
        });
      },

        useDownloadCertificate(options) {
        return useMutation({
          mutationFn: async (id) => await StudentService.downloadCertificate(id),
          ...options,
        });
      },

        useAssignGrade(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await StudentService.assignGrade(id, payload),
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

        useDownloadApplicationPDF(options) {
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await StudentService.downloadApplicationPDF(
              internshipId,
              applicationId,
            ),
          ...options,
        });
      },

        useMyPayments(params, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_PAYMENTS(params),
          queryFn: async () => await StudentService.listMyPayments(params),
          ...options,
        });
      },

        usePaymentReceipt(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.PAYMENT_RECEIPT(id),
          queryFn: async () => await StudentService.getPaymentReceipt(id),
          enabled: !!id,
          ...options,
        });
      },

        useCreatePaymentOrder(options) {
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.createPaymentOrder(payload),
          ...options,
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to create payment order.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useVerifyPaymentSignature(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.verifyPaymentSignature(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_PAYMENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Payment verified! You are now enrolled.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to verify payment.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useRefundPayment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.refundPayment(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_PAYMENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.ALL_PAYMENTS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
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

        useAllPayments(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.ALL_PAYMENTS,
          queryFn: async () => await StudentService.listAllPayments(),
          ...options,
        });
      },

        useCreateSupportTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.createSupportTicket(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_TICKETS,
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
          queryKey: STUDENT_QUERY_KEYS.MY_TICKETS,
          queryFn: async () => await StudentService.listMySupportTickets(),
          ...options,
        });
      },

        useDeleteSupportTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await StudentService.deleteSupportTicket(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_TICKETS,
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

        useNotices(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.NOTICES,
          queryFn: async () => await StudentService.listNotices(),
          ...options,
        });
      },

        useCreateNotice(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) => await StudentService.createNotice(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEYS.NOTICES });
            toast.success(
              (data as { message?: string })?.message ||
                "Notice posted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to post notice.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useSubmitFeedback(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.submitFeedback(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.FEEDBACKS,
            });
            toast.success(
              (data.message as string) || "Feedback submitted successfully.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit feedback.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useMyFeedbacks(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.FEEDBACKS,
          queryFn: async () => await StudentService.getMyFeedbacks(),
          ...options,
        });
      },

        useMyReviews(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_REVIEWS,
          queryFn: async () => await StudentService.listMyReviews(),
          ...options,
        });
      },

        useVerifyIdCard(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.VERIFY_ID_CARD(id),
          queryFn: async () => await StudentService.verifyIdCard(id),
          enabled: !!id,
          ...options,
        });
      },

        useSubmitProject(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.submitProject(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
            });
            toast.success(
              (data.message as string) || "Project submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit project.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useEnrollmentSubmissions(enrollmentId, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_SUBMISSIONS(enrollmentId),
          queryFn: async () =>
            await StudentService.listEnrollmentSubmissions(enrollmentId),
          enabled: !!enrollmentId,
          ...options,
        });
      },

        useUpdateSubmission(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ enrollmentId, submissionId, payload }) =>
            await StudentService.updateSubmission(
              enrollmentId,
              submissionId,
              payload,
            ),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_SUBMISSIONS(
                variables.enrollmentId,
              ),
            });
            toast.success(data.message || "Submission updated successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update submission.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useDeleteSubmission(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ enrollmentId, submissionId }) =>
            await StudentService.deleteSubmission(enrollmentId, submissionId),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_SUBMISSIONS(
                variables.enrollmentId,
              ),
            });
            toast.success(data.message || "Submission deleted successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to delete submission.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        usePublicNewspapers(options) {
        return useQuery({
          queryKey: ["public", "newspapers"],
          queryFn: async () => await StudentService.getPublicNewspapers(),
          ...options,
        });
      },

      usePublicOnlineLinks(options) {
        return useQuery({
          queryKey: ["public", "online-links"],
          queryFn: async () => await StudentService.getPublicOnlineLinks(),
          ...options,
        });
      },

      usePublicPhotos(options) {
        return useQuery({
          queryKey: ["public", "photos"],
          queryFn: async () => await StudentService.getPublicPhotos(),
          ...options,
        });
      },

      usePublicVideos(options) {
        return useQuery({
          queryKey: ["public", "videos"],
          queryFn: async () => await StudentService.getPublicVideos(),
          ...options,
        });
      },

      usePublicPartners(type, options) {
        return useQuery({
          queryKey: ["public", "partners", type],
          queryFn: async () => await StudentService.getPublicPartners(type),
          ...options,
        });
      },

      usePublicBlogs(options) {
        return useQuery({
          queryKey: ["public", "blogs"],
          queryFn: async () => await StudentService.getPublicBlogs(),
          ...options,
        });
      },

      usePublicDonations(options) {
        return useQuery({
          queryKey: ["public", "donations"],
          queryFn: async () => await StudentService.getPublicDonations(),
          ...options,
        });
      },

      usePublicImmersions(options) {
        return useQuery({
          queryKey: ["public", "immersions"],
          queryFn: async () => await StudentService.getPublicImmersions(),
          ...options,
        });
      },

      useSubmitInternshipInterest(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await StudentService.submitInternshipInterest(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data.message as string) || "Application submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error, variables, context) => {
            toast.error(error.message || "Failed to submit application.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useSubmitPlacementInterest(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await StudentService.submitPlacementInterest(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data.message as string) || "Interest registered successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error, variables, context) => {
            toast.error(error.message || "Failed to submit interest.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },
    };

    function PaymentModal_4({
      internship,
      open,
      onClose,
      onCancel,
    }: PaymentModalProps_2) {
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
        StudentDataHook.useCreatePaymentOrder({
          onSuccess: (data) => {
            if (data.success && data.data) {
              setOrderData(data.data);
            }
          },
        });

      const { mutate: verifyPayment, isPending: isVerifying } =
        StudentDataHook.useVerifyPaymentSignature({
          onSuccess: () => onClose(),
        });

      const handleCreateOrder = () => {
        setPaymentError(null);
        createOrder({ internshipId: internship.id });
      };

      const handleOpenRazorpay = async () => {
        if (!orderData) return;
        setIsProcessing(true);
        setPaymentError(null);

        const loaded = await loadRazorpayScript_3();
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
          description: internship.title,
          order_id: orderData.razorpayOrderId,
          handler: (response: RazorpayResponse_2) => {
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
                  <span className="text-muted-foreground">Internship</span>
                  <span className="text-foreground font-medium">
                    {internship.title}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company</span>
                  <span className="text-foreground font-medium">
                    {internship.companyName}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ₹{internship.price?.toLocaleString() ?? "0"}
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
                {}
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

    function InternshipDetailDialog_2({
      internship,
      open,
      onClose,
    }: InternshipDetailDialogProps) {
        const { data: statusData } = StudentDataHook.useCheckApplicationStatus(
        internship.id,
      );
      const applicationStatus = statusData?.data?.status;

        const { data: enrollsData } = StudentDataHook.useMyEnrollments();
      const enrollments = enrollsData?.data ?? [];
      const isEnrolled = enrollments.some((e) => e.internship.id === internship.id);

        const { mutate: applyInternship, isPending: isApplying } =
        StudentDataHook.useApplyInternship();
      const [showPayment, setShowPayment] = useState(false);

      const handleApply = () => {
        applyInternship(internship.id);
      };

      const companyName = internship.companyName || "N/A";
      const timePeriod = (internship as any).timePeriod || "N/A";
      const qualification = (internship as any).qualification || "N/A";
      const lastDate = (internship as any).lastDate;
      const organizer =
        (internship as any).organizer || internship.companyName || "N/A";
      const contact = internship.contact || "N/A";
      const mentorName = internship.mentor?.name || "Senior Instructor";
      const mentorEmail = internship.mentor?.email;
      const facilities = (internship as any).facilities || "";
      const careerOpportunity = (internship as any).careerOpportunity || "";
      const projectFocus = internship.projectFocus || "";
      const modeLabel =
        internship.mode === "ONLINE"
          ? "Virtual"
          : internship.mode === "HYBRID"
            ? "Part Time"
            : "Full Time";

      const modules = Array.isArray(internship.modules)
        ? internship.modules
        : internship.modules
          ? [internship.modules]
          : [];

      const tools = Array.isArray(internship.tools)
        ? internship.tools
        : internship.tools
          ? [internship.tools]
          : [];

      const skills = Array.isArray(internship.skills)
        ? internship.skills
        : internship.skills
          ? [internship.skills]
          : [];

      const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return "N/A";
        try {
          return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        } catch (_e) {
          return String(dateStr);
        }
      };

      const typeIcon =
        internship.type === "PAID" ? (
          <DollarSign className="size-4 text-emerald-500" />
        ) : internship.type === "STIPEND" ? (
          <Gift className="size-4 text-blue-500" />
        ) : (
          <Zap className="size-4 text-amber-500" />
        );

      let actionButton = null;

      if (isEnrolled) {
        actionButton = (
          <Button
            className="w-full border border-emerald-200 bg-emerald-100 font-semibold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
            disabled
          >
            Enrolled (Active)
          </Button>
        );
      } else if (applicationStatus) {
        const statusLabels: Record<ApplicationStatus_3, string> = {
          UNDER_REVIEW: "Application Submitted (Under Review)",
          APPROVED: "Application Approved",
          REJECTED: "Application Rejected",
          WAITING: "Waiting List",
        };
        const statusClasses: Record<ApplicationStatus_3, string> = {
          UNDER_REVIEW:
            "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50",
          APPROVED:
            "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50",
          REJECTED:
            "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50",
          WAITING:
            "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50",
        };
        actionButton = (
          <Button
            className={`w-full font-semibold ${statusClasses[applicationStatus] || ""}`}
            disabled
          >
            {statusLabels[applicationStatus] || "Applied"}
          </Button>
        );
      } else {
        if (internship.type === "PAID") {
          actionButton = (
            <Button
              className="w-full font-semibold"
              onClick={() => setShowPayment(true)}
            >
              Pay & Enroll (₹{internship.price?.toLocaleString()})
            </Button>
          );
        } else {
          actionButton = (
            <Button
              className="w-full gap-2 font-semibold"
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying && <Loader2 className="size-4 animate-spin" />}
              Apply Now
            </Button>
          );
        }
      }

      return (
        <>
          <Dialog_10 open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-h-[90vh] w-[92vw] overflow-y-auto sm:max-w-3xl">
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary border-primary/20 flex size-12 shrink-0 items-center justify-center rounded-2xl border">
                    <Briefcase_2 className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="text-2xl font-extrabold leading-tight tracking-tight">
                      {internship.title}
                    </DialogTitle>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-muted-foreground text-sm font-semibold">
                        {internship.companyName}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <InternshipIdChip
                        code={internship.id}
                        companyName={companyName}
                      />
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-3 space-y-6">
                {}
                <div className="flex flex-wrap gap-2">
                  {internship.type && (
                    <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold">
                      {typeIcon}
                      {internship.type.charAt(0) +
                        internship.type.slice(1).toLowerCase()}
                    </span>
                  )}
                  {modeLabel && (
                    <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold">
                      <Briefcase_2 className="size-3" /> {modeLabel}
                    </span>
                  )}
                  {timePeriod && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/30 dark:text-purple-400">
                      <Clock_2 className="size-3" /> {timePeriod}
                    </span>
                  )}
                  {internship.department && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/30 dark:text-teal-400">
                      <Layers className="size-3" /> {internship.department}
                    </span>
                  )}
                  {internship.isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <CheckCircle className="size-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/20 dark:text-red-400">
                      <XCircle className="size-3" /> Inactive
                    </span>
                  )}
                </div>

                {}
                {internship.type === "PAID" && internship.price !== null && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                    <div className="flex items-center gap-2">
                      <Sparkles_2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                        Facilitation & Package Fee: ₹
                        {internship.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-1 pl-7 text-xs">
                      The internship program is completely free of charge. The
                      contribution fee being collected is for the special personal
                      amenities and other essential services provided during the
                      internship.
                    </p>
                  </div>
                )}
                {internship.type === "STIPEND" &&
                  internship.stipendAmount !== null && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                      <div className="flex items-center gap-2">
                        <Sparkles_2 className="size-5 text-blue-600 dark:text-blue-400" />
                        <p className="text-base font-extrabold text-blue-700 dark:text-blue-400">
                          Monthly Stipend: ₹
                          {internship.stipendAmount.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-muted-foreground mt-1 pl-7 text-xs">
                        A stipend will be provided monthly to successful candidates
                        based on project completion and attendance.
                      </p>
                    </div>
                  )}
                {internship.type === "FREE" && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
                    <div className="flex items-center gap-2">
                      <Sparkles_2 className="size-5 text-amber-600 dark:text-amber-400" />
                      <p className="text-base font-extrabold text-amber-700 dark:text-amber-400">
                        Free Internship Program
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-1 pl-7 text-xs">
                      This program has no enrollment fee and is sponsored by the
                      department.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {}
                  <div className="space-y-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/20">
                    <h4 className="text-foreground flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider">
                      <Clock_2 className="text-primary size-4" /> Key Parameters
                    </h4>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                          Location
                        </span>
                        <span className="text-foreground/90 mt-0.5 block truncate font-semibold">
                          {internship.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                          Duration
                        </span>
                        <span className="text-foreground/90 mt-0.5 block truncate font-semibold">
                          {internship.duration}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                          Start Date
                        </span>
                        <span className="text-foreground/90 mt-0.5 block truncate font-semibold">
                          {formatDate(internship.startDate)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                          Last Date Apply
                        </span>
                        <span className="mt-0.5 block truncate font-semibold text-rose-600 dark:text-rose-400">
                          {formatDate(lastDate)}
                        </span>
                      </div>
                      {internship.credits && (
                        <div>
                          <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                            No. of Credits
                          </span>
                          <span className="text-foreground/90 mt-0.5 block font-semibold">
                            {internship.credits}
                          </span>
                        </div>
                      )}
                      {modeLabel && (
                        <div>
                          <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                            Attendance Mode
                          </span>
                          <span className="text-foreground/90 mt-0.5 block font-semibold">
                            {modeLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {}
                  <div className="space-y-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/20">
                    <h4 className="text-foreground flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider">
                      <Building_2 className="text-primary size-4" /> Logistics &
                      Contacts
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2">
                        <Building_2 className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                            Organizer
                          </span>
                          <span className="text-foreground/90 font-semibold">
                            {organizer}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone_2 className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                            Contact Person
                          </span>
                          <span className="text-foreground/90 font-semibold">
                            {contact}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <GraduationCap_2 className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                            Qualification Required
                          </span>
                          <span className="text-foreground/90 font-semibold">
                            {qualification}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-foreground mb-2 flex items-center gap-2 text-sm font-bold">
                      <Briefcase_2 className="text-primary size-4" /> About the
                      Internship
                    </h3>
                    <div
                      className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none pl-6 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: internship.description || "",
                      }}
                    />
                  </div>

                  {internship.onboardingDetails && (
                    <div>
                      <h3 className="text-foreground mb-2 flex items-center gap-2 text-sm font-bold">
                        <CheckCircle2 className="text-primary size-4" /> Onboarding
                        & Joining Info
                      </h3>
                      <div
                        className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none pl-6 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: internship.onboardingDetails || "",
                        }}
                      />
                    </div>
                  )}

                  {facilities && (
                    <div>
                      <h3 className="text-foreground mb-2 flex items-center gap-2 text-sm font-bold">
                        <Coffee className="text-primary size-4" /> Facilities
                        Provided
                      </h3>
                      <p className="text-muted-foreground pl-6 text-sm leading-relaxed">
                        {facilities}
                      </p>
                    </div>
                  )}

                  {careerOpportunity && (
                    <div>
                      <h3 className="text-foreground mb-2 flex items-center gap-2 text-sm font-bold">
                        <Sparkles_2 className="text-primary size-4" /> Career
                        Opportunities
                      </h3>
                      <p className="text-muted-foreground pl-6 text-sm leading-relaxed">
                        {careerOpportunity}
                      </p>
                    </div>
                  )}
                </div>

                {}
                {(modules.length > 0 ||
                  tools.length > 0 ||
                  skills.length > 0 ||
                  projectFocus) && (
                  <div className="space-y-4 rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/20">
                    <h4 className="text-foreground flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider">
                      <Layers className="text-primary size-4" /> Curriculum & Skills
                    </h4>

                    <div className="space-y-4 text-xs">
                      {projectFocus && (
                        <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] p-2.5">
                          <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            Project Focus
                          </span>
                          <span className="text-foreground/90 font-semibold">
                            {projectFocus}
                          </span>
                        </div>
                      )}

                      {modules.length > 0 && (
                        <div>
                          <span className="text-muted-foreground mb-2 block text-[10px] font-bold uppercase tracking-wider">
                            Key Modules
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {modules.map((mod) => (
                              <span
                                key={mod}
                                className="text-foreground/80 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-950"
                              >
                                {mod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {tools.length > 0 && (
                        <div>
                          <span className="text-muted-foreground mb-2 block text-[10px] font-bold uppercase tracking-wider">
                            Tools & Technologies
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {tools.map((tool) => (
                              <span
                                key={tool}
                                className="bg-primary/5 text-primary border-primary/10 rounded-md border px-2.5 py-1 text-xs font-semibold"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <span className="text-muted-foreground mb-2 block text-[10px] font-bold uppercase tracking-wider">
                            Skills Acquired
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-teal-500/10 bg-teal-500/5 px-2.5 py-1 text-xs font-semibold text-teal-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {}
                <div className="bg-muted/30 border-border/30 flex items-center gap-3.5 rounded-xl border p-4">
                  <div className="bg-primary/10 border-primary/20 text-primary flex size-10 shrink-0 items-center justify-center rounded-full border text-base font-extrabold">
                    {mentorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">
                      Assigned Mentor / Instructor
                    </span>
                    <p className="text-foreground mt-0.5 text-sm font-bold">
                      {mentorName}
                    </p>
                    {mentorEmail && (
                      <p className="text-muted-foreground mt-0.5 truncate text-xs">
                        {mentorEmail}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {}
                {applicationStatus && (
                  <div className="bg-muted/10 border-border/40 flex items-center justify-between rounded-xl border p-3">
                    <span className="text-foreground text-sm font-semibold">
                      Your Application Status:
                    </span>
                    <StatusBadge status={applicationStatus} />
                  </div>
                )}

                {}
                <div className="border-border/40 border-t pt-4">{actionButton}</div>
              </div>
            </DialogContent>
          </Dialog_10>

          {}
          {showPayment && (
            <PaymentModal_4
              internship={internship}
              open={showPayment}
              onClose={() => {
                setShowPayment(false);
              }}
              onCancel={() => setShowPayment(false)}
            />
          )}
        </>
      );
    }

    function InternshipList_3() {
      const searchParams = useSearchParams();

        const search = searchParams?.get("filter") || undefined;
      const type =
        (searchParams?.get("type")?.split(",")[0] as InternshipType_2 | undefined) ||
        undefined;

      const [selectedInternship, setSelectedInternship] =
        useState<InternshipPublic | null>(null);
      const [paymentInternship, setPaymentInternship] =
        useState<InternshipPublic | null>(null);
      const [applyingId, setApplyingId] = useState<string | null>(null);

      const params: ListInternshipsParams = {
        search,
        type,
        category: "RUNNING",
      };

      const { data, isLoading, isError } = StudentDataHook.useInternships(params);
      const internships: InternshipPublic[] = data?.data ?? [];

      const { data: appsData } = StudentDataHook.useMyApplications();
      const { data: enrollsData } = StudentDataHook.useMyEnrollments();
      const applications = appsData?.data ?? [];
      const enrollments = enrollsData?.data ?? [];

      const { mutate: applyInternship } = StudentDataHook.useApplyInternship();

      const handleApply = (id: string) => {
        setApplyingId(id);
        applyInternship(id, { onSettled: () => setApplyingId(null) });
      };

      const sidebarContent = useMemo(() => <InternshipsSidebarFilters />, []);

      return (
        <div className="space-y-6">
          <PageHeaderLayout>
            <div className="flex w-full flex-col gap-4">
              <Heading
                title="Browse Internships"
                description="Discover opportunities and apply to kick-start your career."
              />
            </div>
          </PageHeaderLayout>

          <FilterLayout>{sidebarContent}</FilterLayout>

          <div className="mb-3 flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SidebarFiltersTrigger />
              <DataTableSearch
                searchKey="filter"
                placeholder="Search by ID, title or company"
                small
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
                            ))}
                          </div>
          ) : isError ? (
            <div className="text-muted-foreground py-16 text-center text-sm">
              Failed to load internships. Please try again.
            </div>
          ) : internships.length === 0 ? (
            <NoDataFound_2
              title="No Internships Found"
              description="No internships match your search or filter criteria. Try clearing the filters to see all available opportunities."
              action={
                <Button variant="outline" size="sm" asChild>
                  <a href="/student/internships">Clear Filters</a>
                </Button>
              }
            />
          ) : (
            <>
              <p className="text-muted-foreground text-xs font-medium">
                Showing {internships.length} internship
                {internships.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
                {internships.map((internship) => {
                  const isEnrolled = enrollments.some(
                    (e) => e.internship.id === internship.id,
                  );
                  const applicationStatus = applications.find(
                    (a) => a.internship.id === internship.id,
                  )?.status;
                  return (
                    <InternshipCard_2
                      key={internship.id}
                      internship={internship}
                      onViewDetails={setSelectedInternship}
                      isEnrolled={isEnrolled}
                      applicationStatus={applicationStatus}
                      isApplying={applyingId === internship.id}
                      onApply={handleApply}
                      onPay={setPaymentInternship}
                    />
                  );
                })}
              </div>
            </>
          )}

          {selectedInternship && (
            <InternshipDetailDialog_2
              internship={selectedInternship}
              open={!!selectedInternship}
              onClose={() => setSelectedInternship(null)}
            />
          )}

          {paymentInternship && (
            <PaymentModal_4
              internship={paymentInternship}
              open={!!paymentInternship}
              onClose={() => setPaymentInternship(null)}
              onCancel={() => setPaymentInternship(null)}
            />
          )}
        </div>
      );
    }

  return (
    <div className="mx-auto space-y-6 p-4 px-0">
      {}
      <Suspense fallback={null}>
        <InternshipList_3 />
      </Suspense>
    </div>
  );
}
