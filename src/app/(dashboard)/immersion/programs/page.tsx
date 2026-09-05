"use client";

import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertTriangle, Building2, CalendarDays, CheckCircle2, Compass, CreditCard, LayoutGrid, List, Loader2, MapPin as MapPin_2, ShieldCheck, Sparkles as Sparkles_2, Timer, Search } from "lucide-react";
import Link from "next/link";
import * as React_4 from "react";
import React_3 from "react";
import React_2 from "react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog as SheetPrimitive } from "radix-ui";
import Image_2 from "next/image";
import { LucideIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, Loader2Icon, XIcon, SearchIcon, ArrowUpIcon, FilterIcon, FilterXIcon, CopyCheckIcon } from "lucide-react";
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
import { Slot, Checkbox as CheckboxPrimitive, Separator as SeparatorPrimitive, Accordion as AccordionPrimitive, Tooltip as TooltipPrimitive } from "radix-ui";
import { join } from "path";
import { set } from "date-fns";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { Drawer as DrawerPrimitive } from "vaul";
import { LayoutContext } from "@/x/72be5b4f";
import { axiosInstance } from "@/x/acfb3dca";
import { SidebarFiltersContext } from "@/x/d50b23c8";

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

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-md border",
        className,
      )}
      {...props}
    />
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden px-2 text-xs/relaxed"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) [&_a]:underline-offset-3 [&_a]:hover:text-foreground pb-4 pt-0 [&_a]:underline [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b data-open:bg-muted/50", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between gap-6 border border-transparent p-2 text-left text-xs/relaxed font-medium outline-none transition-all hover:underline disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
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

const SidebarFilters: React_2.FC<
  { children: React_2.ReactNode } & React_2.HTMLAttributes<HTMLDivElement>
> = ({ children, className }) => {
  return (
    <div className={cn("flex h-full flex-row", className)}>{children}</div>
  );
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

type TAlertFilter_2 = {
      icon?: React_4.ReactNode;
      value: string;
      label: string;
      count: number | null;
      type?: string;
    };

const TYPE_FILTERS: TAlertFilter_2[] = [
      { label: "Paid", value: "PAID", count: null },
      { label: "Free", value: "FREE", count: null },
    ];

const ProgramsSidebarFilters = () => {
      return (
        <SidebarFiltersHeader className="mr-0 px-3">
          <SidebarCheckBoxFilter
            header="type"
            filters={TYPE_FILTERS}
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

interface ProgramCardProps {
      program: EmersionProgram;
      isApplied: boolean;
      hasPaid: boolean;
      isApplying: boolean;
      onApply: (id: string) => void;
      onPay: (program: EmersionProgram) => void;
      onViewDetails: (program: EmersionProgram) => void;
    }

function formatImmersionCode_4(
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

function formatDate_3(dateStr: string | null | undefined) {
      if (!dateStr) return "";
      try {
        return new Date(dateStr).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } catch {
        return String(dateStr);
      }
    }

function ProgramCard({
      program,
      isApplied,
      hasPaid,
      isApplying,
      onApply,
      onPay,
      onViewDetails,
    }: ProgramCardProps) {
      const fee = program.fees ? `₹${program.fees.toLocaleString()}` : "Free";

      let actionButton: React_3.ReactNode;

      if (isApplied && hasPaid) {
        actionButton = (
          <Button
            size="sm"
            className="flex-1 gap-1.5 border border-emerald-200 bg-emerald-100 font-semibold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
            disabled
          >
            <CheckCircle2 className="size-3.5" />
            Applied
          </Button>
        );
      } else if (isApplied && !hasPaid) {
        actionButton = (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 font-semibold"
            onClick={() => onPay(program)}
          >
            Pay Fees
          </Button>
        );
      } else {
            if (program.fees && program.fees > 0) {
          actionButton = (
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 font-semibold"
              onClick={() => onApply(program.id)}
              disabled={isApplying}
            >
              {isApplying && <Loader2 className="size-3.5 animate-spin" />}
              Pay & Enroll
            </Button>
          );
        } else {
          actionButton = (
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 gap-1.5 font-semibold"
              onClick={() => onApply(program.id)}
              disabled={isApplying}
            >
              {isApplying && <Loader2 className="size-3.5 animate-spin" />}
              Apply Now
            </Button>
          );
        }
      }

      return (
        <div className="shadow-xs hover:border-primary/30 group flex h-fit flex-col gap-3.5 rounded-2xl border border-zinc-200/80 bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="bg-primary/5 border-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
              <Sparkles_2 className="h-5.5 w-5.5 text-primary" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="text-foreground group-hover:text-primary truncate text-base font-extrabold leading-tight tracking-tight transition-colors">
                {program.title}
              </h3>
              {program.category?.name && (
                <p className="text-muted-foreground mt-0.5 truncate text-xs font-semibold">
                  {program.category.name}
                </p>
              )}
            </div>
          </div>

          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              {formatImmersionCode_4(program.code || program.id, program.title)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400">
              <MapPin_2 className="size-3" />
              {program.location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400">
              <Timer className="size-3" />
              {program.period}
            </span>
            {program.instructor?.name && (
              <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-400">
                <Building2 className="size-3" />
                {program.instructor.name}
              </span>
            )}
          </div>

          <div
            className="text-muted-foreground description-rich-text line-clamp-3 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: program.description || "" }}
          />

          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <CalendarDays className="size-3.5" />
            {formatDate_3(program.startDate)} — {formatDate_3(program.endDate)}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/[0.04] p-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10">
              <Sparkles_2 className="h-3 w-3 text-amber-600" />
            </span>
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
              Program Fees:
            </span>
            <span className="text-foreground text-sm font-extrabold text-amber-600 dark:text-amber-500">
              {fee}
            </span>
          </div>

          {}
          {(() => {
            const facilities: string[] =
              typeof program.facilities === "string"
                ? program.facilities
                    .split(",")
                    .map((f: string) => f.trim())
                    .filter(Boolean)
                : [];

            const benefits: string[] =
              typeof program.benefits === "string"
                ? program.benefits
                    .split(",")
                    .map((b: string) => b.trim())
                    .filter(Boolean)
                : [];

            if (facilities.length === 0 && benefits.length === 0) return null;

            return (
              <div className="mt-1">
                <Accordion type="single" collapsible className="w-full border-none">
                  <AccordionItem value="details" className="border-none">
                    <AccordionTrigger className="text-primary cursor-pointer justify-start gap-1.5 py-2 text-xs font-bold hover:no-underline">
                      View Program Details
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 border-none pb-0 pt-2">
                      {}
                      {facilities.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-muted-foreground/80 dark:text-muted-foreground/60 block text-[10px] font-semibold uppercase tracking-wider">
                            Facilities Provided
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {facilities.map((fac, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                <span className="text-foreground/85 dark:text-foreground/80 truncate text-xs">
                                  {fac}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {}
                      {benefits.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-muted-foreground/80 dark:text-muted-foreground/60 block text-[10px] font-semibold uppercase tracking-wider">
                            Benefits of Immersion
                          </span>
                          <div className="space-y-2">
                            {benefits.map((ben, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                <span className="text-foreground/85 dark:text-foreground/80 text-xs leading-relaxed">
                                  {ben}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })()}

          <div className="mt-auto flex w-full items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary flex-1 font-semibold transition-all"
              onClick={() => onViewDetails(program)}
            >
              View Details
            </Button>
            {actionButton}
          </div>
        </div>
      );
    }

interface ProgramListItemProps {
      program: EmersionProgram;
      isApplied: boolean;
      hasPaid: boolean;
      isApplying: boolean;
      onApply: (id: string) => void;
      onPay: (program: EmersionProgram) => void;
      onViewDetails: (program: EmersionProgram) => void;
    }

function formatImmersionCode_6(
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

function formatDate_4(dateStr: string | null | undefined) {
      if (!dateStr) return "";
      try {
        return new Date(dateStr).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } catch {
        return String(dateStr);
      }
    }

function ProgramListItem({
      program,
      isApplied,
      hasPaid,
      isApplying,
      onApply,
      onPay,
      onViewDetails,
    }: ProgramListItemProps) {
      const fee = program.fees ? `₹${program.fees.toLocaleString()}` : "Free";

      let actionButton: React_3.ReactNode;

      if (isApplied && hasPaid) {
        actionButton = (
          <Button
            size="sm"
            className="w-full gap-1.5 border border-emerald-200 bg-emerald-100 font-semibold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700 sm:w-auto md:w-full dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
            disabled
          >
            <CheckCircle2 className="size-3.5" />
            Applied
          </Button>
        );
      } else if (isApplied && !hasPaid) {
        actionButton = (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-semibold sm:w-auto md:w-full"
            onClick={() => onPay(program)}
          >
            Pay Fees
          </Button>
        );
      } else {
            if (program.fees && program.fees > 0) {
          actionButton = (
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-semibold sm:w-auto md:w-full"
              onClick={() => onApply(program.id)}
              disabled={isApplying}
            >
              {isApplying && <Loader2 className="size-3.5 animate-spin" />}
              Pay & Enroll
            </Button>
          );
        } else {
          actionButton = (
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-1.5 font-semibold sm:w-auto md:w-full"
              onClick={() => onApply(program.id)}
              disabled={isApplying}
            >
              {isApplying && <Loader2 className="size-3.5 animate-spin" />}
              Apply Now
            </Button>
          );
        }
      }

      return (
        <div className="shadow-xs hover:border-primary/30 group flex flex-col justify-between gap-5 rounded-2xl border border-zinc-200/80 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-md md:flex-row dark:border-zinc-800/80 dark:bg-zinc-900/60">
          {}
          <div className="flex flex-1 items-start gap-4">
            <div className="bg-primary/5 border-primary/10 mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
              <Sparkles_2 className="text-primary h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-foreground group-hover:text-primary text-lg font-extrabold leading-tight tracking-tight transition-colors">
                  {program.title}
                </h3>
              </div>
              {program.category?.name && (
                <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                  {program.category.name}
                </p>
              )}

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {formatImmersionCode_6(program.code || program.id, program.title)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400">
                  <MapPin_2 className="size-3" />
                  {program.location}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400">
                  <Timer className="size-3" />
                  {program.period}
                </span>
                {program.instructor?.name && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-400">
                    <Building2 className="size-3" />
                    {program.instructor.name}
                  </span>
                )}
              </div>

              <div
                className="text-muted-foreground description-rich-text mt-3 line-clamp-2 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: program.description || "" }}
              />

              {}
              {(() => {
                const facilities: string[] =
                  typeof program.facilities === "string"
                    ? program.facilities
                        .split(",")
                        .map((f: string) => f.trim())
                        .filter(Boolean)
                    : [];

                const benefits: string[] =
                  typeof program.benefits === "string"
                    ? program.benefits
                        .split(",")
                        .map((b: string) => b.trim())
                        .filter(Boolean)
                    : [];

                if (facilities.length === 0 && benefits.length === 0) return null;

                return (
                  <div className="mt-2">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full border-none"
                    >
                      <AccordionItem value="details" className="border-none">
                        <AccordionTrigger className="text-primary cursor-pointer justify-start gap-1.5 py-1 text-xs font-bold hover:no-underline">
                          View Program Details
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 border-none pb-0 pt-2">
                          {}
                          {facilities.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-muted-foreground/80 dark:text-muted-foreground/60 block text-[10px] font-semibold uppercase tracking-wider">
                                Facilities Provided
                              </span>
                              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                {facilities.map((fac, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                    <span className="text-foreground/85 dark:text-foreground/80 truncate text-xs">
                                      {fac}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {}
                          {benefits.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-muted-foreground/80 dark:text-muted-foreground/60 block text-[10px] font-semibold uppercase tracking-wider">
                                Benefits of Immersion
                              </span>
                              <div className="space-y-2">
                                {benefits.map((ben, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                    <span className="text-foreground/85 dark:text-foreground/80 text-xs leading-relaxed">
                                      {ben}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                );
              })()}
            </div>
          </div>

          {}
          <div className="flex shrink-0 flex-col items-stretch justify-between gap-4 border-zinc-200/60 pt-4 sm:flex-row sm:pt-0 md:min-w-[220px] md:flex-col md:items-end md:justify-center md:border-l md:pl-5 dark:border-zinc-800/80">
            <div className="flex w-full flex-col gap-2 md:items-end">
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium md:justify-end">
                <CalendarDays className="size-3.5 shrink-0" />
                <span>
                  {formatDate_4(program.startDate)} — {formatDate_4(program.endDate)}
                </span>
              </div>

              <div className="flex w-full items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/[0.04] p-2 md:max-w-[200px]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10">
                  <Sparkles_2 className="h-3 w-3 text-amber-600" />
                </span>
                <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                  Fees:
                </span>
                <span className="text-foreground ml-auto text-sm font-extrabold text-amber-600 dark:text-amber-500">
                  {fee}
                </span>
              </div>
            </div>

            <div className="flex w-full items-center gap-2 sm:self-end md:self-auto">
              <Button
                size="sm"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary w-full font-semibold transition-all sm:w-auto md:w-full"
                onClick={() => onViewDetails(program)}
              >
                View Details
              </Button>
              {actionButton}
            </div>
          </div>
        </div>
      );
    }

interface ProgramDetailDialogProps {
      program: EmersionProgram;
      open: boolean;
      onClose: () => void;
      actionButton: React_3.ReactNode;
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

function Dialog_3({
      ...props
    }: React_3.ComponentProps<typeof SheetPrimitive.Root>) {
      return <SheetPrimitive.Root data-slot="dialog" {...props} />;
    }

function formatImmersionCode_5(
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

function ProgramDetailDialog_2({
      program,
      open,
      onClose,
      actionButton,
    }: ProgramDetailDialogProps) {
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

      const feeLabel = program.fees ? `₹${program.fees.toLocaleString()}` : "Free";

      return (
        <Dialog_3 open={open} onOpenChange={(o) => !o && onClose()}>
          <DialogContent className="max-h-[90vh] w-[92vw] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary border-primary/20 flex size-12 shrink-0 items-center justify-center rounded-2xl border">
                  <Compass className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-2xl font-extrabold leading-tight tracking-tight">
                    {program.title}
                  </DialogTitle>
                  {program.category?.name && (
                    <div className="mt-1">
                      <span className="text-muted-foreground text-sm font-semibold">
                        {program.category.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="mt-3 space-y-6">
              {}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                  {formatImmersionCode_5(program.code || program.id, program.title)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/30 dark:text-purple-400">
                  <MapPin_2 className="size-3" /> {program.location}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                  <Timer className="size-3" /> {program.period}
                </span>
                {program.instructor?.name && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/30 dark:text-teal-400">
                    <Building2 className="size-3" /> {program.instructor.name}
                  </span>
                )}
              </div>

              {}
              <div className="flex items-center gap-2.5 rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-4 dark:bg-amber-500/[0.02]">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                  <Sparkles_2 className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                    Program Fees
                  </p>
                  <p className="text-foreground text-lg font-extrabold text-amber-600 dark:text-amber-500">
                    {feeLabel}
                  </p>
                </div>
              </div>

              <Separator />

              {}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                    Start Date
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="size-4 text-emerald-500" />
                    <span>{formatDate(program.startDate)}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                    End Date
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="size-4 text-emerald-500" />
                    <span>{formatDate(program.endDate)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {}
              <div className="space-y-2">
                <h4 className="text-foreground text-sm font-bold uppercase tracking-wider">
                  About the Program
                </h4>
                <div
                  className="text-muted-foreground prose prose-sm dark:prose-invert description-rich-text max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: program.description || "" }}
                />
              </div>

              {}
              {(() => {
                const facilities: string[] =
                  typeof program.facilities === "string"
                    ? program.facilities
                        .split(",")
                        .map((f: string) => f.trim())
                        .filter(Boolean)
                    : [];

                if (facilities.length === 0) return null;

                return (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="text-foreground text-sm font-bold uppercase tracking-wider">
                        Facilities Provided
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {facilities.map((fac, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                            <span className="text-muted-foreground text-sm leading-relaxed">
                              {fac}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}

              {}
              {(() => {
                const benefits: string[] =
                  typeof program.benefits === "string"
                    ? program.benefits
                        .split(",")
                        .map((b: string) => b.trim())
                        .filter(Boolean)
                    : [];

                if (benefits.length === 0) return null;

                return (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="text-foreground text-sm font-bold uppercase tracking-wider">
                        Program Benefits
                      </h4>
                      <div className="space-y-2">
                        {benefits.map((ben, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                            <span className="text-muted-foreground text-sm leading-relaxed">
                              {ben}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <div className="flex min-w-[120px]">{actionButton}</div>
            </div>
          </DialogContent>
        </Dialog_3>
      );
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


export default function ImmersionProgramsPage() {
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

    function ProgramsGrid() {
      const searchParams = useSearchParams();
      const search = searchParams?.get("filter") || undefined;
      const type = searchParams?.get("type") || undefined;

      const [viewMode, setViewMode] = useState<"list" | "grid">("list");

      const params = useMemo(
        () => ({
          search,
          type,
        }),
        [search, type],
      );

      const { data: programsResponse, isLoading: isLoadingPrograms } =
        EmersionDataHooks.usePrograms(params);
      const { data: appResponse, isLoading: isLoadingApp } =
        EmersionDataHooks.useMyEmersionApplication({ retry: false });
      const { data: paymentsResponse, isLoading: isLoadingPayments } =
        EmersionDataHooks.useMyEmersionPayments();

      const [selectedProgram, setSelectedProgram] =
        useState<EmersionProgram | null>(null);
      const [paymentProgram, setPaymentProgram] = useState<{
        program: EmersionProgram;
        appId: string;
      } | null>(null);

      const {
        mutate: applyToProgram,
        isPending: isApplying,
        variables,
      } = EmersionDataHooks.useApplyToProgram();

      const programs = useMemo(
        () => programsResponse?.data ?? [],
        [programsResponse],
      );

      const myApplications = appResponse?.data ?? [];
      const completedPaymentAppIds = useMemo(() => {
        const payments = paymentsResponse?.data ?? [];
        return payments
          .filter((p) => p.status === "COMPLETED")
          .map((p) => p.applicationId);
      }, [paymentsResponse]);

      const isLoading = isLoadingPrograms || isLoadingApp || isLoadingPayments;

      const sidebarContent = useMemo(() => <ProgramsSidebarFilters />, []);

      if (isLoading) {
        return <XC28cd1d8_2 full />;
      }

      const hasActiveFilters = !!search || !!type;

      return (
        <>
          <FilterLayout>{sidebarContent}</FilterLayout>

          <div className="mb-3 flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SidebarFiltersTrigger />
              <DataTableSearch
                searchKey="filter"
                placeholder="Search by ID, title or location"
                small
              />
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-950/40">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("list")}
                className={`h-7 w-7 cursor-pointer p-0 transition-all ${
                  viewMode === "list"
                    ? "text-foreground shadow-xs bg-white dark:bg-zinc-900"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className={`h-7 w-7 cursor-pointer p-0 transition-all ${
                  viewMode === "grid"
                    ? "text-foreground shadow-xs bg-white dark:bg-zinc-900"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
          </div>

          {!programs.length ? (
            hasActiveFilters ? (
              <NoDataFound_2
                title="No Programs Found"
                description="No immersion programs match your search or filter criteria. Try clearing the filters to see all available opportunities."
                action={
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/immersion/programs">Clear Filters</Link>
                  </Button>
                }
              />
            ) : (
              <div className="bg-card/85 border-border/50 mx-auto my-12 flex max-w-md flex-col items-center space-y-3 rounded-2xl border p-8 text-center shadow-lg backdrop-blur-md">
                <Compass className="text-muted-foreground size-10" />
                <h4 className="text-foreground text-base font-bold">
                  No Programs Available
                </h4>
                <p className="text-muted-foreground text-xs leading-normal">
                  There are no immersion programs open right now. Please check back
                  later.
                </p>
              </div>
            )
          ) : (
            <>
              <p className="text-muted-foreground mb-3 text-xs font-medium">
                Showing {programs.length} program
                {programs.length !== 1 ? "s" : ""}
              </p>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {programs.map((program) => {
                    const myApp = myApplications.find(
                      (app) => app.immersionId === program.id,
                    );
                    const isApplied = !!myApp;
                    const hasPaid =
                      program.fees <= 0 ||
                      (myApp && completedPaymentAppIds.includes(myApp.id));

                    return (
                      <ProgramCard
                        key={program.id}
                        program={program}
                        isApplied={isApplied}
                        hasPaid={!!hasPaid}
                        isApplying={isApplying && variables === program.id}
                        onApply={(id) => {
                          applyToProgram(id, {
                            onSuccess: (res: any) => {
                              if (
                                program.fees &&
                                program.fees > 0 &&
                                res?.data?.id
                              ) {
                                setPaymentProgram({ program, appId: res.data.id });
                              }
                            },
                          });
                        }}
                        onPay={(p) =>
                          setPaymentProgram({ program: p, appId: myApp?.id || "" })
                        }
                        onViewDetails={setSelectedProgram}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {programs.map((program) => {
                    const myApp = myApplications.find(
                      (app) => app.immersionId === program.id,
                    );
                    const isApplied = !!myApp;
                    const hasPaid =
                      program.fees <= 0 ||
                      (myApp && completedPaymentAppIds.includes(myApp.id));

                    return (
                      <ProgramListItem
                        key={program.id}
                        program={program}
                        isApplied={isApplied}
                        hasPaid={!!hasPaid}
                        isApplying={isApplying && variables === program.id}
                        onApply={(id) => {
                          applyToProgram(id, {
                            onSuccess: (res: any) => {
                              if (
                                program.fees &&
                                program.fees > 0 &&
                                res?.data?.id
                              ) {
                                setPaymentProgram({ program, appId: res.data.id });
                              }
                            },
                          });
                        }}
                        onPay={(p) =>
                          setPaymentProgram({ program: p, appId: myApp?.id || "" })
                        }
                        onViewDetails={setSelectedProgram}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}

          {selectedProgram &&
            (() => {
              const myApp = myApplications.find(
                (app) => app.immersionId === selectedProgram.id,
              );
              const isApplied = !!myApp;
              const hasPaid =
                selectedProgram.fees <= 0 ||
                (myApp && completedPaymentAppIds.includes(myApp.id));

              let dialogActionButton: React_3.ReactNode;
              if (isApplied && hasPaid) {
                dialogActionButton = (
                  <Button className="font-semibold" disabled>
                    Applied
                  </Button>
                );
              } else if (isApplied && !hasPaid) {
                dialogActionButton = (
                  <Button
                    className="font-semibold"
                    onClick={() => {
                      setPaymentProgram({
                        program: selectedProgram,
                        appId: myApp?.id || "",
                      });
                      setSelectedProgram(null);
                    }}
                  >
                    Pay Fees
                  </Button>
                );
              } else {
                dialogActionButton = (
                  <Button
                    className="font-semibold"
                    onClick={() => {
                      applyToProgram(selectedProgram.id, {
                        onSuccess: (res: any) => {
                          setSelectedProgram(null);
                          if (
                            selectedProgram.fees &&
                            selectedProgram.fees > 0 &&
                            res?.data?.id
                          ) {
                            setPaymentProgram({
                              program: selectedProgram,
                              appId: res.data.id,
                            });
                          }
                        },
                      });
                    }}
                    disabled={isApplying}
                  >
                    {selectedProgram.fees && selectedProgram.fees > 0
                      ? "Pay & Enroll"
                      : "Apply Now"}
                  </Button>
                );
              }

              return (
                <ProgramDetailDialog_2
                  program={selectedProgram}
                  open={!!selectedProgram}
                  onClose={() => setSelectedProgram(null)}
                  actionButton={dialogActionButton}
                />
              );
            })()}

          {paymentProgram && (
            <PaymentModal_3
              program={paymentProgram.program}
              applicationId={paymentProgram.appId}
              open={!!paymentProgram}
              onClose={() => setPaymentProgram(null)}
              onCancel={() => setPaymentProgram(null)}
            />
          )}
        </>
      );
    }

  return (
    <div className="mx-auto space-y-6 p-4 px-0">
      <PageHeaderLayout>
        <Heading
          title="Browse Programs"
          description="Explore available immersion programs and apply with a single click."
        />
      </PageHeaderLayout>

      <Suspense fallback={null}>
        <ProgramsGrid />
      </Suspense>
    </div>
  );
}
