"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowLeft,
  Calendar,
  Download,
  Mail,
  MapPin,
  Phone,
  School,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React_3, { useMemo, useState } from "react";
import axios from "axios";
import { AxiosInstance } from "axios";
import { LucideIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, SearchIcon, Search, ChevronsLeftIcon, ChevronsRightIcon, TableIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";
import React_2 from "react";
import { useCallback, useRef, ReactNode, useEffect, useLayoutEffect, useContext, Dispatch, SetStateAction } from "react";
import { Select as SelectPrimitive, Slot, DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { join } from "path";
import { Cell, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { set } from "date-fns";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { LayoutContext } from "@/x/72be5b4f";
import { axiosInstance } from "@/x/acfb3dca";

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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

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

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card gap-(--card-spacing) bg-card py-(--card-spacing) text-card-foreground ring-foreground/10 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg flex flex-col overflow-hidden rounded-lg text-xs/relaxed ring-1 [--card-spacing:--spacing(4)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)]",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

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
function formatDate(
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

type TMeta_2 = {
      total: number;
      limit: number;
      page: number;
    };

interface LeadItem {
      id: string;
      internshipId: string;
      name: string;
      email: string;
      mobile: string;
      education: string;
      address?: string;
      createdAt: string;
    }


export default function InternshipLeadsPage() {
  const params = useParams();
  const router = useRouter();
  const internshipId = params?.id as string;

  const [meta, setMeta] = useState<TMeta_2>({ page: 1, limit: 10, total: 0 });
  const [isExporting, setIsExporting] = useState(false);
  const searchParams = useSearchParams();
  const search = (searchParams?.get("filter") || "").toLowerCase();

    const { data: internshipResp, isLoading: isInternshipLoading } = useQuery({
    queryKey: ["oncampus-virtual-detail", internshipId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/oncampus-virtual/internships/${internshipId}`,
      );
      return res.data;
    },
    enabled: !!internshipId,
  });

    const { data: leadsResp, isLoading: isLeadsLoading } = useQuery({
    queryKey: ["oncampus-virtual-leads", internshipId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/oncampus-virtual/internships/${internshipId}/leads`,
      );
      return res.data;
    },
    enabled: !!internshipId,
  });

  const internship = internshipResp?.data;
  const rawLeads: LeadItem[] = useMemo(
    () => leadsResp?.data || [],
    [leadsResp],
  );

  const filteredLeads = useMemo(() => {
    if (!search) return rawLeads;
    const q = search.toLowerCase();
    return rawLeads.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.mobile?.toLowerCase().includes(q) ||
        l.education?.toLowerCase().includes(q),
    );
  }, [rawLeads, search]);

  const columns = useMemo<ColumnDef<LeadItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Applicant Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full text-xs font-bold">
              {row.original.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-foreground text-xs font-semibold">
                {row.original.name}
              </div>
              <div className="text-muted-foreground text-[10px]">
                ID: {row.original.id.substring(0, 8)}...
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email Address",
        cell: ({ row }) => (
          <div className="text-foreground flex items-center gap-1.5 text-xs font-medium">
            <Mail className="text-muted-foreground size-3.5 shrink-0" />
            <a
              href={`mailto:${row.original.email}`}
              className="hover:text-primary hover:underline"
            >
              {row.original.email}
            </a>
          </div>
        ),
      },
      {
        accessorKey: "mobile",
        header: "Contact Mobile",
        cell: ({ row }) => (
          <div className="text-foreground flex items-center gap-1.5 text-xs font-medium">
            <Phone className="text-muted-foreground size-3.5 shrink-0" />
            <a href={`tel:${row.original.mobile}`} className="hover:underline">
              {row.original.mobile}
            </a>
          </div>
        ),
      },
      {
        accessorKey: "education",
        header: "Education / Qualification",
        cell: ({ row }) => (
          <div className="text-foreground flex items-center gap-1.5 text-xs font-medium">
            <School className="text-muted-foreground size-3.5 shrink-0" />
            <span>{row.original.education || "N/A"}</span>
          </div>
        ),
      },
      {
        accessorKey: "address",
        header: "Location / Address",
        cell: ({ row }) => (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <MapPin className="text-muted-foreground size-3.5 shrink-0" />
            <span>{row.original.address || "N/A"}</span>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Submission Date",
        cell: ({ row }) => (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <Calendar className="text-muted-foreground size-3.5 shrink-0" />
            <span>{formatDate(row.original.createdAt)}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const handleExportExcel = async () => {
    if (rawLeads.length === 0) return;

    setIsExporting(true);
    try {
      const response = await axiosInstance.get(
        `/oncampus-virtual/internships/${internshipId}/leads/export`,
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `leads-${internshipId}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeaderLayout>
        <div className="flex w-full flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Heading
              title={
                internship?.title
                  ? `Leads: ${internship.title}`
                  : "Program Leads & Expressions of Interest"
              }
              description="Review all student submissions and expressions of interest for this cohort."
            />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center gap-1.5 text-xs font-semibold sm:w-auto"
              onClick={handleExportExcel}
              disabled={rawLeads.length === 0 || isExporting}
            >
              <Download className="size-3.5" />
              {isExporting ? "Exporting..." : "Export as Excel"}
            </Button>
          </div>
        </div>
      </PageHeaderLayout>

      {}
      {internship && (
        <Card className="border-border/60 bg-muted/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary text-xs font-bold">
                    {internship.category === "VIRTUAL"
                      ? "VIRTUAL COHORT"
                      : "ON CAMPUS COHORT"}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-semibold">
                    {internship.type || "FREE"}
                  </Badge>
                </div>
                <h2 className="text-foreground mt-2 text-lg font-bold">
                  {internship.title}
                </h2>
                <p className="text-muted-foreground mt-1 line-clamp-2 max-w-2xl text-xs">
                  {internship.description}
                </p>
              </div>

              <div className="border-border/40 flex items-center gap-6 border-l pl-6">
                <div>
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase tracking-wider">
                    Total Leads
                  </span>
                  <span className="text-primary text-2xl font-extrabold">
                    {rawLeads.length}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase tracking-wider">
                    Duration
                  </span>
                  <span className="text-foreground text-sm font-semibold">
                    {internship.duration || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {}
      <div className="w-full min-w-0">
        <DataTable
          isLoading={isLeadsLoading || isInternshipLoading}
          columns={columns}
          data={filteredLeads}
          meta={{ ...meta, total: filteredLeads.length }}
          setMeta={setMeta}
          toolbar={
            <div className="flex items-center gap-2">
              <DataTableSearch
                searchKey="filter"
                placeholder="Search by student name, email or mobile"
                small
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
