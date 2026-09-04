"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Briefcase, Download, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import React_3 from "react";
import { toast } from "sonner";
import { LucideIcon as LucideIcon_2 } from "lucide-react";
import * as React_4 from "react";
import { clsx as clsx_2, ClassValue as ClassValue_2 } from "clsx";
import { twMerge as twMerge_2 } from "tailwind-merge";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import React_2 from "react";
import { useCallback, useRef, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, ChevronsLeftIcon, ChevronsRightIcon, TableIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { Select as SelectPrimitive, Slot, DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { join } from "path";
import { Cell, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { set } from "date-fns";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "@/x/acfb3dca";
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
const RECRUIT_QUERY_KEYS = {
      PROFILE: ["recruit-profile"] as const,
      APPLICATIONS: ["recruit-applications"] as const,
      SETTINGS: ["recruit-settings"] as const,
      OPENINGS: ["recruit-openings"] as const,
      EDUCATION: ["recruit-education"] as const,
      EXPERIENCE: ["recruit-experience"] as const,
      DOCUMENTS: ["recruit-documents"] as const,
      REFERENCES: ["recruit-references"] as const,
      SPECIFIC_INFO: ["recruit-specific-info"] as const,
    };

interface GenericApiResponse<T = undefined> {
      success: boolean;
      message?: string;
      data?: T;
    }

type TGender = "MALE" | "FEMALE" | "TRANSGENDER";

interface TRecruitAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

type TMaritalStatus =
      "MARRIED" | "UNMARRIED" | "DIVORCED" | "WIDOW" | "WIDOWER";

type TReligion =
      | "HINDU"
      | "SIKH"
      | "JAIN"
      | "PARSI"
      | "BUDDHIST"
      | "ISLAM"
      | "CHRISTIAN"
      | "SHINTO"
      | "MONOTHEISM"
      | "PROTESTANTISM"
      | "DEISM"
      | "YAHUDI"
      | "OTHER";

type TCategory = "GENERAL" | "EWS" | "OBC" | "SC" | "ST" | "HUMANITY";

type TBloodGroup =
      | "A_POSITIVE"
      | "A_NEGATIVE"
      | "B_POSITIVE"
      | "B_NEGATIVE"
      | "AB_POSITIVE"
      | "AB_NEGATIVE"
      | "O_POSITIVE"
      | "O_NEGATIVE";

type TQualification =
      | "EIGHTH_PASS"
      | "MATRICULATION"
      | "INTERMEDIATE"
      | "DIPLOMA"
      | "GRADUATION"
      | "POST_GRADUATION"
      | "MPHIL"
      | "PHD"
      | "OTHER";

interface TRecruitEducation {
      id: string;
      profileId: string;
      qualification: TQualification;
      instituteName: string;
      boardUniversity: string;
      startYear: number;
      endYear: number;
      division: string;
      percentage: number;
      subject: string;
      certificateUrl: string;
      createdAt: string;
    }

interface TRecruitExperience {
      id: string;
      profileId: string;
      employerName: string;
      designation: string;
      postingLocation: string;
      startDate: string;
      endDate?: string | null;
      natureOfWork: string;
      totalExperience: number;
      certificateUrl: string;
      createdAt: string;
    }

interface TRecruitReference {
      id: string;
      profileId: string;
      name: string;
      designation: string;
      organisation: string;
      relation: string;
      mobile: string;
      email: string;
      address?: string | null;
      createdAt: string;
    }

interface TRecruitSpecificInfo {
      id?: string;
      profileId?: string;
      isGovernmentEmployee: boolean;
      isEverConvicted: boolean;
      convictionDetails?: string | null;
      isEverDismissed: boolean;
      dismissalDetails?: string | null;
      hasRelativeInOrganisation: boolean;
      relativeDetails?: string | null;
      willingToRelocate: boolean;
      expectedSalary?: string | null;
      noticePeriod?: string | null;
      declarationAccepted: boolean;
      updatedAt?: string;
    }

interface TRecruitProfile {
      id: string;
      userId: string;
      name: string;
      gender: TGender;
      dob: string;
      fatherName: string;
      motherName: string;
      permanentAddress: TRecruitAddress;
      currentAddress: TRecruitAddress;
      mobile: string;
      email: string;
      maritalStatus: TMaritalStatus;
      nationality: string;
      gotra?: string | null;
      religion: TReligion;
      category: TCategory;
      bloodGroup: TBloodGroup;
      hobby?: string | null;
      languageKnown: string;
      physicalChallenged: boolean;
      adharNo: string;
      profileCompleted: boolean;
      photoUrl?: string | null;
      signatureUrl?: string | null;
      resumeUrl?: string | null;
      createdAt: string;
      updatedAt: string;
      educationDetails?: TRecruitEducation[];
      experienceDetails?: TRecruitExperience[];
      references?: TRecruitReference[];
      specificInfo?: TRecruitSpecificInfo | null;
    }

type TOpeningStatus = "ACTIVE" | "ARCHIVED";

interface TRecruitOpening {
      id: string;
      slNo: number;
      advtNoAndDate: string;
      postName: string;
      jobDescriptionText: string;
      jobDescriptionPdfUrl?: string | null;
      closingDate: string;
      status: TOpeningStatus;
      totalApplications?: number;
      createdAt?: string;
        advtNo?: string | null;
      advtDate?: string | null;
      postOpportunity?: string;
      minQualification?: string;
      jobNature?: string;
      skillsRequired?: string | null;
      jdDocUrl?: string | null;
    }

type TApplicationStatus =
      "SUBMITTED" | "UNDER_REVIEW" | "SHORTLISTED" | "REJECTED" | "SELECTED";

interface TRecruitApplication {
      id: string;
      applicationId: string;
      openingId: string;
      profileId: string;
      opening?: TRecruitOpening;
      status: TApplicationStatus;
      pdfUrl?: string | null;
      submittedAt: string;
      updatedAt: string;
    }

type TRecruitEducationPayload = Omit<
      TRecruitEducation,
      "id" | "profileId" | "createdAt"
    >;

type TRecruitExperiencePayload = Omit<
      TRecruitExperience,
      "id" | "profileId" | "createdAt"
    >;

interface TRecruitDocuments {
      photoUrl?: string | null;
      signatureUrl?: string | null;
      resumeUrl?: string | null;
      adharUrl?: string | null;
      casteCertificateUrl?: string | null;
      otherDocuments?: { label: string; url: string }[];
    }

type TRecruitReferencePayload = Omit<
      TRecruitReference,
      "id" | "profileId" | "createdAt"
    >;

type TRecruitSpecificInfoPayload = Omit<
      TRecruitSpecificInfo,
      "id" | "profileId" | "updatedAt"
    >;

interface IRecruitService {
        submitProfile: (
        payload: Record<string, unknown>,
      ) => Promise<GenericApiResponse<Record<string, unknown>>>;
      getMyProfile: () => Promise<GenericApiResponse<Record<string, unknown>>>;
      updateProfile: (
        payload: Record<string, unknown>,
      ) => Promise<GenericApiResponse<TRecruitProfile>>;

        getOpenings: () => Promise<GenericApiResponse<TRecruitOpening[]>>;
      applyJob: (
        jobOpportunityId: string,
      ) => Promise<GenericApiResponse<Record<string, unknown>>>;
      getMyApplications: () => Promise<
        GenericApiResponse<Record<string, unknown>[]>
      >;
      getApplication: (
        applicationId: string,
      ) => Promise<GenericApiResponse<TRecruitApplication>>;

        getEducation: () => Promise<GenericApiResponse<TRecruitEducation[]>>;
      addEducation: (
        payload: TRecruitEducationPayload,
      ) => Promise<GenericApiResponse<TRecruitEducation>>;
      updateEducation: (
        id: string,
        payload: Partial<TRecruitEducationPayload>,
      ) => Promise<GenericApiResponse<TRecruitEducation>>;
      deleteEducation: (id: string) => Promise<GenericApiResponse<null>>;

        getExperience: () => Promise<GenericApiResponse<TRecruitExperience[]>>;
      addExperience: (
        payload: TRecruitExperiencePayload,
      ) => Promise<GenericApiResponse<TRecruitExperience>>;
      updateExperience: (
        id: string,
        payload: Partial<TRecruitExperiencePayload>,
      ) => Promise<GenericApiResponse<TRecruitExperience>>;
      deleteExperience: (id: string) => Promise<GenericApiResponse<null>>;

        getDocuments: () => Promise<GenericApiResponse<TRecruitDocuments>>;
      saveDocuments: (
        payload: TRecruitDocuments,
      ) => Promise<GenericApiResponse<TRecruitDocuments>>;

        getReferences: () => Promise<GenericApiResponse<TRecruitReference[]>>;
      addReference: (
        payload: TRecruitReferencePayload,
      ) => Promise<GenericApiResponse<TRecruitReference>>;
      updateReference: (
        id: string,
        payload: Partial<TRecruitReferencePayload>,
      ) => Promise<GenericApiResponse<TRecruitReference>>;
      deleteReference: (id: string) => Promise<GenericApiResponse<null>>;

        getSpecificInfo: () => Promise<GenericApiResponse<TRecruitSpecificInfo>>;
      saveSpecificInfo: (
        payload: TRecruitSpecificInfoPayload,
      ) => Promise<GenericApiResponse<TRecruitSpecificInfo>>;

        getSettings: () => Promise<GenericApiResponse<Record<string, unknown>>>;
      saveSettings: (payload: {
        isExperienceCompulsory: boolean;
      }) => Promise<GenericApiResponse<Record<string, unknown>>>;
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

interface RecruitSectionShellProps {
      title: string;
      description?: string;
      icon?: LucideIcon_2;
        actions?: React_4.ReactNode;
      children: React_4.ReactNode;
      className?: string;
    }

function cn_5(...inputs: ClassValue_2[]) {
      return twMerge_2(clsx_2(inputs));
    }

function RecruitSectionShell({
      title,
      description,
      icon: Icon,
      actions,
      children,
      className,
    }: RecruitSectionShellProps) {
      return (
        <div className={cn_5("mx-auto max-w-6xl space-y-6 p-4 md:p-6", className)}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              {Icon && (
                <div className="bg-primary/10 text-primary hidden rounded-2xl p-2.5 sm:block">
                  <Icon className="size-5" />
                </div>
              )}
              <div className="space-y-0.5">
                <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                  {title}
                </h1>
                {description && (
                  <p className="text-muted-foreground max-w-2xl text-sm">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex shrink-0 items-center gap-2 print:hidden">
                {actions}
              </div>
            )}
          </div>
          {children}
        </div>
      );
    }


export default function RecruitOpeningsPage() {
    const RecruitService: IRecruitService = {
        async submitProfile(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.PROFILE,
          payload,
        );
        return response.data;
      },

      async getMyProfile() {
        try {
          const response = await axiosInstance.get(ENDPOINTS.RECRUIT.PROFILE);
          return response.data;
        } catch (error) {
                                  const response = (
            error as { response?: { status?: number; data?: GenericApiResponse } }
          )?.response;
          if (response?.status === 404 && response.data) return response.data;
          throw error;
        }
      },

      async updateProfile(payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.PROFILE,
          payload,
        );
        return response.data;
      },

        async getOpenings() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.OPENINGS);
        return response.data;
      },

      async applyJob(jobOpportunityId) {
        const response = await axiosInstance.post(ENDPOINTS.RECRUIT.APPLICATIONS, {
          jobOpportunityId,
        });
        return response.data;
      },

      async getMyApplications() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.APPLICATIONS);
        return response.data;
      },

      async getApplication(applicationId) {
        const response = await axiosInstance.get(
          ENDPOINTS.RECRUIT.APPLICATION_BY_ID(applicationId),
        );
        return response.data;
      },

        async getEducation() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.EDUCATION);
        return response.data;
      },

      async addEducation(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.EDUCATION,
          payload,
        );
        return response.data;
      },

      async updateEducation(id, payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.EDUCATION_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteEducation(id) {
        const response = await axiosInstance.delete(
          ENDPOINTS.RECRUIT.EDUCATION_BY_ID(id),
        );
        return response.data;
      },

        async getExperience() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.EXPERIENCE);
        return response.data;
      },

      async addExperience(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.EXPERIENCE,
          payload,
        );
        return response.data;
      },

      async updateExperience(id, payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.EXPERIENCE_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteExperience(id) {
        const response = await axiosInstance.delete(
          ENDPOINTS.RECRUIT.EXPERIENCE_BY_ID(id),
        );
        return response.data;
      },

        async getDocuments() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.DOCUMENTS);
        return response.data;
      },

      async saveDocuments(payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.DOCUMENTS,
          payload,
        );
        return response.data;
      },

        async getReferences() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.REFERENCES);
        return response.data;
      },

      async addReference(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.REFERENCES,
          payload,
        );
        return response.data;
      },

      async updateReference(id, payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.REFERENCE_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteReference(id) {
        const response = await axiosInstance.delete(
          ENDPOINTS.RECRUIT.REFERENCE_BY_ID(id),
        );
        return response.data;
      },

        async getSpecificInfo() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.SPECIFIC_INFO);
        return response.data;
      },

      async saveSpecificInfo(payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.SPECIFIC_INFO,
          payload,
        );
        return response.data;
      },

        async getSettings() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.SETTINGS);
        return response.data;
      },

      async saveSettings(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.SETTINGS,
          payload,
        );
        return response.data;
      },
    };
    const RecruitDataHooks = {
      useProfile() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.PROFILE,
          queryFn: async () => await RecruitService.getMyProfile(),
          retry: false,
        });
      },

      useSubmitProfile(
        options?: TMutationOptions<
          GenericApiResponse<Record<string, unknown>>,
          Error,
          Record<string, unknown>
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: Record<string, unknown>) =>
            await RecruitService.submitProfile(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Profile submitted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to submit profile.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useApplyJob(
        options?: TMutationOptions<
          GenericApiResponse<Record<string, unknown>>,
          Error,
          string
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (jobId: string) => await RecruitService.applyJob(jobId),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.APPLICATIONS,
            });
            toast.success("Applied to job opportunity successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to apply for job.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useMyApplications() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.APPLICATIONS,
          queryFn: async () => await RecruitService.getMyApplications(),
        });
      },

      useSettings() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.SETTINGS,
          queryFn: async () => await RecruitService.getSettings(),
        });
      },

      useSaveSettings(
        options?: TMutationOptions<
          GenericApiResponse<Record<string, unknown>>,
          Error,
          { isExperienceCompulsory: boolean }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: { isExperienceCompulsory: boolean }) =>
            await RecruitService.saveSettings(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.SETTINGS,
            });
            toast.success("Settings updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to save settings.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useOpenings() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.OPENINGS,
          queryFn: async () => await RecruitService.getOpenings(),
        });
      },

        useEducation() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
          queryFn: async () => await RecruitService.getEducation(),
        });
      },

      useAddEducation(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitEducation>,
          Error,
          TRecruitEducationPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitEducationPayload) =>
            await RecruitService.addEducation(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
            });
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Education record added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to add education record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useUpdateEducation(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitEducation>,
          Error,
          { id: string; payload: Partial<TRecruitEducationPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: Partial<TRecruitEducationPayload>;
          }) => await RecruitService.updateEducation(id, payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
            });
            toast.success("Education record updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update education record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useDeleteEducation(
        options?: TMutationOptions<GenericApiResponse<null>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id: string) =>
            await RecruitService.deleteEducation(id),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
            });
            toast.success("Education record deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to delete education record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useExperience() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
          queryFn: async () => await RecruitService.getExperience(),
        });
      },

      useAddExperience(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitExperience>,
          Error,
          TRecruitExperiencePayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitExperiencePayload) =>
            await RecruitService.addExperience(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
            });
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Experience record added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to add experience record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useUpdateExperience(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitExperience>,
          Error,
          { id: string; payload: Partial<TRecruitExperiencePayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: Partial<TRecruitExperiencePayload>;
          }) => await RecruitService.updateExperience(id, payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
            });
            toast.success("Experience record updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update experience record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useDeleteExperience(
        options?: TMutationOptions<GenericApiResponse<null>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id: string) =>
            await RecruitService.deleteExperience(id),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
            });
            toast.success("Experience record deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to delete experience record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useDocuments() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.DOCUMENTS,
          queryFn: async () => await RecruitService.getDocuments(),
        });
      },

      useSaveDocuments(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitDocuments>,
          Error,
          TRecruitDocuments
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitDocuments) =>
            await RecruitService.saveDocuments(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.DOCUMENTS,
            });
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Documents saved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to save documents.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useReferences() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
          queryFn: async () => await RecruitService.getReferences(),
        });
      },

      useAddReference(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitReference>,
          Error,
          TRecruitReferencePayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitReferencePayload) =>
            await RecruitService.addReference(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
            });
            toast.success("Reference added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to add reference.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useUpdateReference(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitReference>,
          Error,
          { id: string; payload: Partial<TRecruitReferencePayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: Partial<TRecruitReferencePayload>;
          }) => await RecruitService.updateReference(id, payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
            });
            toast.success("Reference updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update reference.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useDeleteReference(
        options?: TMutationOptions<GenericApiResponse<null>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id: string) =>
            await RecruitService.deleteReference(id),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
            });
            toast.success("Reference deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to delete reference.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useSpecificInfo() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.SPECIFIC_INFO,
          queryFn: async () => await RecruitService.getSpecificInfo(),
        });
      },

      useSaveSpecificInfo(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitSpecificInfo>,
          Error,
          TRecruitSpecificInfoPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitSpecificInfoPayload) =>
            await RecruitService.saveSpecificInfo(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.SPECIFIC_INFO,
            });
            toast.success("Information saved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to save information.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useUpdateProfile(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitProfile>,
          Error,
          Record<string, unknown>
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: Record<string, unknown>) =>
            await RecruitService.updateProfile(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Profile updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update profile.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },
    };
  const router = useRouter();
  const { data: profileResponse, isLoading: isProfileLoading } =
    RecruitDataHooks.useProfile();
  const { data: openingsResponse, isLoading: isOpeningsLoading } =
    RecruitDataHooks.useOpenings();
  const { data: applicationsResponse, isLoading: isApplicationsLoading } =
    RecruitDataHooks.useMyApplications();

  const { mutate: applyJob, isPending: isApplying } =
    RecruitDataHooks.useApplyJob({
      onSuccess: () => {
        toast.success("Successfully applied for the job opening!");
      },
    });

  const hasProfile = !!profileResponse?.success && !!profileResponse.data;
  const openings = (openingsResponse?.data ?? []) as TRecruitOpening[];
  const myApplications = (applicationsResponse?.data ?? []) as any[];

    const appliedJobIds = React_3.useMemo(() => {
    return new Set(myApplications.map((app) => app.jobOpportunityId));
  }, [myApplications]);

  const openingsColumns = (): ColumnDef<TRecruitOpening>[] => [
    {
      id: "advt",
      header: "Advt. No. & Date",
      cell: ({ row }) => {
        const { advtNo, advtDate } = row.original;
        return (
          <div className="flex flex-col text-xs font-semibold">
            <span>{advtNo || "N/A"}</span>
            <span className="text-muted-foreground font-normal">
              {advtDate ? formatDate(advtDate) : "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "postOpportunity",
      header: "Name of the Post",
      cell: ({ row }) => (
        <span className="text-sm font-semibold">
          {row.original.postOpportunity}
        </span>
      ),
    },
    {
      id: "jobDescription",
      header: "Job Description",
      cell: ({ row }) => {
        const { skillsRequired, minQualification, jobNature, jdDocUrl } =
          row.original;
        return (
          <div className="flex max-w-[320px] flex-col gap-2 py-1">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Required Skills: {skillsRequired || "N/A"}. Qualification:{" "}
              {minQualification || "N/A"}. Nature: {jobNature || "N/A"}.
            </p>
            {jdDocUrl && (
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="h-8 gap-1.5 self-start bg-[#e2f0ed] text-xs font-bold text-[#006e52] transition-colors hover:bg-[#d0e6e1]"
              >
                <a href={jdDocUrl} target="_blank" rel="noreferrer">
                  <Download className="size-3.5" /> Download JD
                </a>
              </Button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "closingDate",
      header: "Closing Date",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-rose-500">
          {row.original.closingDate
            ? formatDate(row.original.closingDate)
            : "N/A"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => {
        const jobId = row.original.id;
        const isAlreadyApplied = appliedJobIds.has(jobId);

        return (
          <div className="flex justify-end">
            {isAlreadyApplied ? (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400">
                Applied
              </span>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs font-semibold"
                disabled={isApplying}
                onClick={() => {
                  if (!hasProfile) {
                    toast.error(
                      "Please complete your registration profile before applying.",
                    );
                    router.push("/recruit/profile");
                    return;
                  }
                  applyJob(jobId);
                }}
              >
                Apply Now
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <RecruitSectionShell
      title="Job Openings"
      description="Browse through the active recruitment notices and submit your expression of interest."
      icon={Briefcase}
      actions={null}
    >
      <div className="w-full min-w-0">
        <DataTable
          isLoading={
            isOpeningsLoading || isApplicationsLoading || isProfileLoading
          }
          columns={openingsColumns()}
          data={openings}
          full={true}
        />
      </div>
    </RecruitSectionShell>
  );
}
