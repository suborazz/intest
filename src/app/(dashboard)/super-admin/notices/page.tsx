"use client";

import React_4, { Suspense } from "react";
import { Bell, CalendarDays, Check, Download, Edit, ExternalLink, Filter, Info, Loader2, Mail as Mail_2, Paperclip, Search, Send, Tag, Target as Target_2, Trash2, User, Target, X } from "lucide-react";
import React_3 from "react";
import { useState } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as z_2 } from "zod";
import { toast } from "sonner";
import { LucideIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import React_2 from "react";
import { ReactNode, useLayoutEffect, useContext, Dispatch, SetStateAction, useMemo } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot, Checkbox as CheckboxPrimitive, Tabs as TabsPrimitive } from "radix-ui";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";
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

const Form = FormProvider;

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot_2>,
  React.ComponentPropsWithoutRef<typeof Slot_2>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot_2
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

interface FormLabelProps extends React.ComponentPropsWithoutRef<
  typeof LabelPrimitive_2.Root
> {
  required?: boolean;
  loading?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, loading, ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
      <LabelPrimitive_2.Root
        ref={ref}
        className={cn(
          className,
          "text-foreground ml-1 flex items-center text-[0.75rem] font-semibold uppercase",
        )}
        htmlFor={formItemId}
        {...props}
      >
        {props.children}
        {required && (
          <span className="text-destructive ml-0.5 text-sm font-semibold">
            *
          </span>
        )}
        {loading && (
          <div className="animate-pulse">
            <Loader2Icon className="text-muted-foreground ml-1 size-3.5 animate-spin" />
          </div>
        )}
      </LabelPrimitive_2.Root>
    );
  },
);
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

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

interface NoticePayload {
  title: string;
  content: string;
  description?: string;
  category?: string;
  targetRole?: "STUDENT" | "INSTRUCTOR" | "IMMERSION_USER" | "RECRUIT_USER";
  receiverId?: string;
  internshipIds?: string[];
  immersionIds?: string[];
  pdfUrl?: string | null;
  linkUrl?: string | null;
  file?: File | null;
}

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs data-horizontal:flex-col flex gap-2",
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "text-foreground/60 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:py-[calc(--spacing(1.25))] hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium transition-all focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:bg-foreground group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100 after:absolute after:opacity-0 after:transition-opacity",
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

const createNoticeSchema = z.object({
      noticeNumber: z.string().min(1, "Notice number is required").trim(),
      date: z.string().min(1, "Date is required").trim(),
      title: z.string().min(3, "Title is required").trim(),
      category: z.enum([
        "Important",
        "General",
        "Result",
        "Schedule",
        "Guidelines",
      ]),
      description: z.string().min(5, "Description is required").trim(),
      targetRole: z
        .enum(["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "RECRUIT_USER"])
        .optional()
        .nullable(),
      receiverId: z.string().optional().nullable(),
      pdfUrl: z.string().optional().nullable(),
      pdfPublicId: z.string().optional().nullable(),
    });

const NoticeSchema = z.object({
      title: z.string().min(3, "Title is required").trim(),
      content: z.string().min(5, "Content is required").trim(),
      category: z.enum([
        "Important",
        "General",
        "Result",
        "Schedule",
        "Guidelines",
      ]),
      targetRole: z
        .enum(["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "RECRUIT_USER"])
        .optional(),
      receiverId: z.string().optional(),
      linkUrl: z.string().optional(),
      internshipIds: z.array(z.string()).optional(),
      immersionIds: z.array(z.string()).optional(),
    });

type NoticeFormValues = z.infer<typeof NoticeSchema>;

type TargetType = "role" | "internship" | "immersion";

interface NoticeItem {
      id: string;
      noticeNumber?: string;
      title: string;
      category?: string;
      targetRole?: string;
      receiverId?: string;
      receiver?: {
        id: string;
        name?: string | null;
        email?: string;
        registrationNo?: string | null;
      } | null;
      createdAt: string;
      description?: string;
      content?: string;
      pdfUrl?: string | null;
      pdfPublicId?: string | null;
      linkUrl?: string | null;
    }

function Select_13({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_13({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }


export default function SuperAdminNoticesPage() {
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
      createNotice: (payload: any) => Promise<GenericApiResponse>;
      updateNotice: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse>;
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

      async createNotice(payload: any) {
        const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.NOTICES.BASE,
          payload,
          isFormData ? { headers: { "Content-Type": undefined } } : undefined,
        );
        return response.data;
      },

      async updateNotice(id: string, payload: any) {
        const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.NOTICES.BY_ID(id),
          payload,
          isFormData ? { headers: { "Content-Type": undefined } } : undefined,
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
        options?: TMutationOptions<GenericApiResponse, Error, any>,
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

      useUpdateNotice(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateNotice(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(data.message || "Notice updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update notice.");
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

    interface NoticePayload {
      title: string;
      content: string;
      description?: string;
      category?: string;
      targetRole?: "STUDENT" | "INSTRUCTOR" | "IMMERSION_USER" | "RECRUIT_USER";
      receiverId?: string;
      internshipIds?: string[];
      immersionIds?: string[];
      pdfUrl?: string | null;
      linkUrl?: string | null;
      file?: File | null;
    }

    interface EditNoticeModalProps {
      notice: NoticeItem | null;
      isOpen: boolean;
      onClose: () => void;
      onSave: (id: string, payload: Partial<NoticePayload>) => Promise<void>;
      isUpdating: boolean;
    }

    function EditNoticeModal({
      notice,
      isOpen,
      onClose,
      onSave,
      isUpdating,
    }: EditNoticeModalProps) {
      const [title, setTitle] = React_3.useState("");
      const [category, setCategory] = React_3.useState("General");
      const [content, setContent] = React_3.useState("");
      const [targetRole, setTargetRole] = React_3.useState<string>("ALL");
      const [receiverId, setReceiverId] = React_3.useState("");

      React_3.useEffect(() => {
        if (notice) {
          setTitle(notice.title || "");
          setCategory(notice.category || "General");
          setContent(notice.description || notice.content || "");
          setTargetRole(notice.targetRole || "ALL");
          setReceiverId(notice.receiver?.email || notice.receiverId || "");
        }
      }, [notice, isOpen]);

      if (!isOpen || !notice) return null;

      const handleSubmit = async (e: React_3.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
          toast.error("Notice title is required.");
          return;
        }
        if (!content.trim()) {
          toast.error("Notice content is required.");
          return;
        }

        await onSave(notice.id, {
          title: title.trim(),
          category,
          content: content.trim(),
          targetRole: targetRole === "ALL" ? undefined : (targetRole as any),
          receiverId: receiverId.trim() ? receiverId.trim() : undefined,
        });
      };

      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150"
          onClick={onClose}
        >
          <div
            className="bg-card border-border w-full max-w-lg rounded-2xl border p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-border/60 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground text-sm font-bold flex items-center gap-1.5">
                    <Edit className="size-4 text-primary" /> Edit Notice / Update Announcement
                  </h3>
                  {notice.noticeNumber && (
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {notice.noticeNumber}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-[10px]">
                  Update headline, category type, notice content, or target audience.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isUpdating}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-foreground text-[10px] font-semibold">
                  Notice Title / Headline *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule Maintenance Update"
                  className="h-9 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                  <Tag className="size-3 text-primary" /> Notice Category / Filter Type *
                </label>
                <Select_13 value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9 cursor-pointer text-xs">
                    <SelectValue_13 placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Important">Important (महत्वपूर्ण)</SelectItem>
                    <SelectItem value="General">General (सामान्य)</SelectItem>
                    <SelectItem value="Result">Result (परिणाम)</SelectItem>
                    <SelectItem value="Schedule">Schedule (समय सारिणी)</SelectItem>
                    <SelectItem value="Guidelines">Guidelines (दिशा-निर्देश)</SelectItem>
                  </SelectContent>
                </Select_13>
              </div>

              <div className="space-y-1">
                <label className="text-foreground text-[10px] font-semibold">
                  Notice Content / Message Body *
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the updated notice announcement here..."
                  className="min-h-[120px] resize-y text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                  <Target_2 className="size-3" /> Target Audience
                </label>
                <Select_13 value={targetRole} onValueChange={setTargetRole}>
                  <SelectTrigger className="h-9 cursor-pointer text-xs">
                    <SelectValue_13 placeholder="Target Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Everyone (Platform-wide)</SelectItem>
                    <SelectItem value="STUDENT">Students Only</SelectItem>
                    <SelectItem value="INSTRUCTOR">Instructors Only</SelectItem>
                    <SelectItem value="RECRUIT_USER">Only Job Applicants User</SelectItem>
                    <SelectItem value="IMMERSION_USER">Only Immersion User</SelectItem>
                  </SelectContent>
                </Select_13>
              </div>

              <div className="space-y-1">
                <label className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                  <Mail_2 className="size-3" /> Target Specific User (Optional)
                </label>
                <Input
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  placeholder="e.g. user@gmail.com, Reg No, or leave blank"
                  className="h-9 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  disabled={isUpdating}
                  className="text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdating}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="size-3.5" />
                      Update Notice
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    function NoticesPanel_2() {
      const {
        data: noticesResponse,
        isLoading: isNoticesLoading,
        isError: isNoticesError,
      } = SuperAdminDataHooks.useNotices();

      const notices = noticesResponse?.data || [];

      const { mutate: createNotice, isPending: isCreating } =
        SuperAdminDataHooks.useCreateNotice();

      const { mutate: deleteNotice } = SuperAdminDataHooks.useDeleteNotice();
      const { mutate: updateNotice, isPending: isUpdatingNotice } =
        SuperAdminDataHooks.useUpdateNotice();

      const [editingNotice, setEditingNotice] =
        React_3.useState<NoticeItem | null>(null);
      const [expandedNoticeIds, setExpandedNoticeIds] = React_3.useState<
        Record<string, boolean>
      >({});

      const toggleExpand = (id: string) => {
        setExpandedNoticeIds((prev) => ({ ...prev, [id]: !prev[id] }));
      };

      const handleSaveEdit = async (
        id: string,
        payload: Partial<NoticePayload>,
      ) => {
        return new Promise<void>((resolve) => {
          updateNotice(
            { id, payload },
            {
              onSuccess: () => {
                setEditingNotice(null);
                resolve();
              },
              onError: () => {
                resolve();
              },
            },
          );
        });
      };

      const [targetType, setTargetType] = React_3.useState<TargetType>("role");
      const [filterCategory, setFilterCategory] = React_3.useState<string>("All");
      const [searchQuery, setSearchQuery] = React_3.useState<string>("");

      const categoryList = [
        "All",
        "Important",
        "General",
        "Result",
        "Schedule",
        "Guidelines",
      ] as const;

      const { data: internshipsResponse, isLoading: isInternshipsLoading } =
        SuperAdminDataHooks.useAdminInternships({
          enabled: targetType === "internship",
        });
      const { data: immersionsResponse, isLoading: isImmersionsLoading } =
        SuperAdminDataHooks.useAdminImmersions({
          enabled: targetType === "immersion",
        });

      const internships = internshipsResponse?.data || [];
      const immersions = immersionsResponse?.data || [];

      const filteredNotices = useMemo(() => {
        return notices.filter((notice: NoticeItem) => {
          const matchesCategory =
            filterCategory === "All" ||
            (notice.category || "General").toLowerCase() ===
              filterCategory.toLowerCase();

          const query = searchQuery.trim().toLowerCase();
          const matchesSearch =
            !query ||
            notice.title?.toLowerCase().includes(query) ||
            notice.noticeNumber?.toLowerCase().includes(query) ||
            (notice.description || notice.content || "").toLowerCase().includes(query);

          return matchesCategory && matchesSearch;
        });
      }, [notices, filterCategory, searchQuery]);

      const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);
      const fileInputRef = React.useRef<HTMLInputElement | null>(null);

      const form = useForm<NoticeFormValues>({
        resolver: zodResolver(NoticeSchema),
        defaultValues: {
          title: "",
          content: "",
          category: "General",
          targetRole: undefined,
          receiverId: "",
          linkUrl: "",
          internshipIds: [],
          immersionIds: [],
        },
      });

      const selectedInternshipIds = form.watch("internshipIds") || [];
      const selectedImmersionIds = form.watch("immersionIds") || [];

      const handleTargetTypeChange = (type: TargetType) => {
        setTargetType(type);
        form.setValue("internshipIds", []);
        form.setValue("immersionIds", []);
        if (type !== "role") {
          form.setValue("targetRole", undefined);
          form.setValue("receiverId", "");
        }
      };

      const toggleId = (
        fieldName: "internshipIds" | "immersionIds",
        id: string,
        checked: boolean,
      ) => {
        const current =
          (form.getValues(fieldName) as string[] | undefined) ?? ([] as string[]);
        form.setValue(
          fieldName,
          checked ? [...current, id] : current.filter((item) => item !== id),
        );
      };

      const handleStartEdit = (notice: NoticeItem) => {
        setEditingNotice(notice);
        setExistingFileUrl(notice.pdfUrl || null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        form.reset({
          title: notice.title || "",
          content: notice.description || notice.content || "",
          category: (notice.category as any) || "General",
          targetRole: (notice.targetRole as any) || undefined,
          receiverId: notice.receiver?.email || notice.receiverId || "",
          linkUrl: notice.linkUrl || "",
          internshipIds: [],
          immersionIds: [],
        });
        setTargetType("role");
        const el = document.getElementById("notice-composer-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      const handleCancelEdit = () => {
        setEditingNotice(null);
        setExistingFileUrl(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        form.reset({
          title: "",
          content: "",
          category: "General",
          targetRole: undefined,
          receiverId: "",
          linkUrl: "",
          internshipIds: [],
          immersionIds: [],
        });
        setTargetType("role");
      };

      const onSubmit = (values: NoticeFormValues) => {
        let normalizedLink: string | null = null;
        if (values.linkUrl && values.linkUrl.trim()) {
          let l = values.linkUrl.trim();
          if (!/^https?:\/\//i.test(l)) {
            l = `https://${l}`;
          }
          normalizedLink = l;
        }

        if (selectedFile) {
          const formData = new FormData();
          formData.append("title", values.title.trim());
          formData.append("content", values.content.trim());
          formData.append("description", values.content.trim());
          formData.append("category", values.category || "General");
          if (normalizedLink) formData.append("linkUrl", normalizedLink);
          formData.append("file", selectedFile);

          if (targetType === "internship") {
            if (!values.internshipIds?.length) {
              toast.error("Select at least one internship to target.");
              return;
            }
            formData.append("internshipIds", JSON.stringify(values.internshipIds));
          } else if (targetType === "immersion") {
            if (!values.immersionIds?.length) {
              toast.error("Select at least one immersion program to target.");
              return;
            }
            formData.append("immersionIds", JSON.stringify(values.immersionIds));
          } else {
            if (values.targetRole) formData.append("targetRole", values.targetRole);
            if (values.receiverId?.trim()) formData.append("receiverId", values.receiverId.trim());
          }

          if (editingNotice) {
            updateNotice(
              { id: editingNotice.id, payload: formData },
              {
                onSuccess: () => {
                  handleCancelEdit();
                },
              },
            );
          } else {
            createNotice(formData, {
              onSuccess: () => {
                handleCancelEdit();
              },
            });
          }
        } else {
          const payload: NoticePayload = {
            title: values.title.trim(),
            content: values.content.trim(),
            description: values.content.trim(),
            category: values.category || "General",
            linkUrl: normalizedLink,
            pdfUrl: existingFileUrl,
          };

          if (targetType === "internship") {
            if (!values.internshipIds?.length) {
              toast.error("Select at least one internship to target.");
              return;
            }
            payload.internshipIds = values.internshipIds;
          } else if (targetType === "immersion") {
            if (!values.immersionIds?.length) {
              toast.error("Select at least one immersion program to target.");
              return;
            }
            payload.immersionIds = values.immersionIds;
          } else {
            if (values.targetRole) {
              payload.targetRole = values.targetRole;
            }
            if (values.receiverId?.trim()) {
              payload.receiverId = values.receiverId.trim();
            }
          }

          if (editingNotice) {
            updateNotice(
              { id: editingNotice.id, payload },
              {
                onSuccess: () => {
                  handleCancelEdit();
                },
              },
            );
          } else {
            createNotice(payload, {
              onSuccess: () => {
                handleCancelEdit();
              },
            });
          }
        }
      };

      const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this notice?")) {
          deleteNotice(id);
          if (editingNotice?.id === id) {
            handleCancelEdit();
          }
        }
      };

      const getCategoryBadgeClass = (category?: string) => {
        switch (category) {
          case "Important":
            return "bg-rose-500/10 text-rose-600 border border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400";
          case "Result":
            return "bg-purple-500/10 text-purple-600 border border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400";
          case "Schedule":
            return "bg-sky-500/10 text-sky-600 border border-sky-500/30 dark:bg-sky-500/20 dark:text-sky-400";
          case "Guidelines":
            return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400";
          case "General":
          default:
            return "bg-primary/10 text-primary border border-primary/30";
        }
      };

      return (
        <div className="space-y-6">
          {/* 1. TOP SECTION: COMPOSE / EDIT NOTICE ANNOUNCEMENT */}
          <div
            id="notice-composer-section"
            className={cn(
              "bg-card rounded-2xl border p-4 sm:p-5 shadow-xs transition-all",
              editingNotice
                ? "border-primary/80 ring-2 ring-primary/20 bg-primary/2 dark:bg-primary/5"
                : "border-border/60",
            )}
          >
            <div className="border-border/60 border-b pb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-foreground flex items-center gap-2 text-sm sm:text-base font-bold">
                  {editingNotice ? (
                    <>
                      <Edit className="text-primary size-4.5" />
                      <span>Edit Notice Announcement</span>
                      {editingNotice.noticeNumber && (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                          {editingNotice.noticeNumber}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <Bell className="text-primary size-4.5" />
                      <span>Compose Announcement</span>
                    </>
                  )}
                </h3>
                <p className="text-muted-foreground text-[11px] font-medium mt-0.5">
                  {editingNotice
                    ? "Modify notice details below and click 'Update Notice' to save changes."
                    : "Draft and broadcast notice board feeds to students or instructors."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {editingNotice ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="text-xs font-semibold h-7 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3.5 mr-1" /> Cancel Edit
                  </Button>
                ) : (
                  <span
                    className="shrink-0 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-600/30"
                    title="Yearly auto-incremented notice numbering (Resets to 01 each year)"
                  >
                    Auto: NTC/{String(new Date().getFullYear()).slice(-2)}01
                  </span>
                )}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-[10px] font-semibold">
                          Notice Title / Headline *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Schedule Maintenance Update"
                            className="h-9 text-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                          <Tag className="size-3 text-primary" /> Notice Category / Filter Type (प्रकार) *
                        </FormLabel>
                        <Select_13
                          onValueChange={field.onChange}
                          value={field.value || "General"}
                        >
                          <FormControl>
                            <SelectTrigger className="h-9 cursor-pointer text-xs">
                              <SelectValue_13 placeholder="Select Notice Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Important">Important (महत्वपूर्ण)</SelectItem>
                            <SelectItem value="General">General (सामान्य)</SelectItem>
                            <SelectItem value="Result">Result (परिणाम)</SelectItem>
                            <SelectItem value="Schedule">Schedule (समय सारिणी)</SelectItem>
                            <SelectItem value="Guidelines">Guidelines (दिशा-निर्देश)</SelectItem>
                          </SelectContent>
                        </Select_13>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-[10px] font-semibold">
                        Notice Content / Message Body *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write the details of the announcement here..."
                          className="min-h-[110px] resize-y text-xs leading-relaxed"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-1.5">
                  <label className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                    <Target_2 className="size-3" /> Target Announcement Type
                  </label>
                  <Tabs
                    value={targetType}
                    onValueChange={(val) =>
                      handleTargetTypeChange(val as TargetType)
                    }
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3 max-w-md">
                      <TabsTrigger value="role" className="cursor-pointer text-xs">
                        Platform Wide
                      </TabsTrigger>
                      <TabsTrigger
                        value="internship"
                        className="cursor-pointer text-xs"
                      >
                        Internship
                      </TabsTrigger>
                      <TabsTrigger
                        value="immersion"
                        className="cursor-pointer text-xs"
                      >
                        Immersion
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {targetType === "internship" && (
                  <div className="animate-in fade-in space-y-2 duration-200">
                    <div className="flex items-center justify-between">
                      <label className="text-foreground text-[10px] font-semibold">
                        Select Internship(s)
                      </label>
                      {internships.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const allSelected = internships.every((i: any) =>
                              selectedInternshipIds.includes(i.id),
                            );
                            if (allSelected) {
                              form.setValue("internshipIds", []);
                            } else {
                              form.setValue(
                                "internshipIds",
                                internships.map((i: any) => i.id),
                              );
                            }
                          }}
                          className="text-primary text-[10px] font-bold hover:underline"
                        >
                          {internships.every((i: any) =>
                            selectedInternshipIds.includes(i.id),
                          )
                            ? "Deselect All"
                            : "Select All"}
                        </button>
                      )}
                    </div>
                    {isInternshipsLoading ? (
                      <div className="text-muted-foreground py-4 text-center text-xs">
                        Loading internships...
                      </div>
                    ) : internships.length === 0 ? (
                      <div className="text-muted-foreground py-4 text-center text-xs">
                        No internships found.
                      </div>
                    ) : (
                      <div className="border-border/80 bg-background max-h-40 space-y-2.5 overflow-y-auto rounded-xl border p-3">
                        {internships.map((internship: any) => {
                          const isChecked = selectedInternshipIds.includes(
                            internship.id,
                          );
                          return (
                            <div
                              key={internship.id}
                              className="flex cursor-pointer select-none items-start gap-2.5 text-xs font-semibold"
                              onClick={() =>
                                toggleId("internshipIds", internship.id, !isChecked)
                              }
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  toggleId(
                                    "internshipIds",
                                    internship.id,
                                    !!checked,
                                  )
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="space-y-0.5 leading-none">
                                <span className="text-foreground block">
                                  {internship.title}
                                </span>
                                <span className="text-muted-foreground block text-[10px]">
                                  {internship.companyName}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {targetType === "immersion" && (
                  <div className="animate-in fade-in space-y-2 duration-200">
                    <div className="flex items-center justify-between">
                      <label className="text-foreground text-[10px] font-semibold">
                        Select Immersion Program(s)
                      </label>
                      {immersions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const allSelected = immersions.every((i: any) =>
                              selectedImmersionIds.includes(i.id),
                            );
                            if (allSelected) {
                              form.setValue("immersionIds", []);
                            } else {
                              form.setValue(
                                "immersionIds",
                                immersions.map((i: any) => i.id),
                              );
                            }
                          }}
                          className="text-primary text-[10px] font-bold hover:underline"
                        >
                          {immersions.every((i: any) =>
                            selectedImmersionIds.includes(i.id),
                          )
                            ? "Deselect All"
                            : "Select All"}
                        </button>
                      )}
                    </div>
                    {isImmersionsLoading ? (
                      <div className="text-muted-foreground py-4 text-center text-xs">
                        Loading immersion programs...
                      </div>
                    ) : immersions.length === 0 ? (
                      <div className="text-muted-foreground py-4 text-center text-xs">
                        No immersion programs found.
                      </div>
                    ) : (
                      <div className="border-border/80 bg-background max-h-40 space-y-2.5 overflow-y-auto rounded-xl border p-3">
                        {immersions.map((immersion: any) => {
                          const isChecked = selectedImmersionIds.includes(
                            immersion.id,
                          );
                          return (
                            <div
                              key={immersion.id}
                              className="flex cursor-pointer select-none items-start gap-2.5 text-xs font-semibold"
                              onClick={() =>
                                toggleId("immersionIds", immersion.id, !isChecked)
                              }
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  toggleId("immersionIds", immersion.id, !!checked)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="space-y-0.5 leading-none">
                                <span className="text-foreground block">
                                  {immersion.title}
                                </span>
                                <span className="text-muted-foreground block text-[10px]">
                                  {immersion.location || "Remote"}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                    targetType === "role" ? "" : "hidden"
                  }`}
                >
                  <FormField
                    control={form.control}
                    name="targetRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                          <Target_2 className="size-3" /> Target Audience
                        </FormLabel>
                        <Select_13
                          onValueChange={(val) =>
                            field.onChange(val === "ALL" ? undefined : val)
                          }
                          value={field.value || "ALL"}
                        >
                          <FormControl>
                            <SelectTrigger className="h-9 cursor-pointer text-xs">
                              <SelectValue_13 placeholder="Broadcast to Everyone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ALL">Everyone</SelectItem>
                            <SelectItem value="STUDENT">Students Only</SelectItem>
                            <SelectItem value="INSTRUCTOR">
                              Instructors Only
                            </SelectItem>
                            <SelectItem value="RECRUIT_USER">
                              Only Job Applicants User
                            </SelectItem>
                            <SelectItem value="IMMERSION_USER">
                              Only Immersion User
                            </SelectItem>
                          </SelectContent>
                        </Select_13>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="receiverId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                          <Mail_2 className="size-3" /> Target User (Email / Reg No / User ID) (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. user@gmail.com, Reg No, or User ID"
                            className="h-9 text-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Optional File Attachment & External Link Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border border-dashed border-border/80 bg-muted/15 p-3.5">
                  {/* File Attachment Upload */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                        <Paperclip className="size-3 text-primary" /> Optional File Upload (PDF, Document, Image)
                      </label>
                      {selectedFile && (
                        <span className="text-emerald-600 text-[10px] font-bold">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 5 * 1024 * 1024) {
                          toast.error("File size cannot exceed 5MB");
                          e.target.value = "";
                          return;
                        }
                        setSelectedFile(file);
                      }}
                      className="hidden"
                      id="notice-file-input"
                    />

                    {!selectedFile && !existingFileUrl ? (
                      <label
                        htmlFor="notice-file-input"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-card/60 px-3 transition-colors hover:border-primary/60 hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                          <Paperclip className="size-3.5 text-primary" />
                          <span>Click to attach document / PDF</span>
                        </div>
                        <span className="text-muted-foreground/70 text-[9px]">Max size: 5MB (PDF, DOC, Images)</span>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-500/30 bg-emerald-50/60 p-2 text-xs dark:bg-emerald-950/20">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <Paperclip className="size-3.5 shrink-0 text-emerald-600" />
                          <span className="truncate font-semibold text-foreground text-[11px]">
                            {selectedFile ? selectedFile.name : "Attached Document (Current)"}
                          </span>
                          {existingFileUrl && !selectedFile && (
                            <a
                              href={existingFileUrl}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="text-primary hover:underline text-[10px] font-bold shrink-0 ml-1 inline-flex items-center gap-0.5"
                            >
                              <Download className="size-2.5" /> View
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <label
                            htmlFor="notice-file-input"
                            className="text-primary hover:bg-primary/10 cursor-pointer rounded px-1.5 py-0.5 text-[10px] font-bold"
                          >
                            Change
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setExistingFileUrl(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="text-destructive hover:bg-destructive/10 cursor-pointer rounded p-1"
                            title="Remove attachment"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* External Link Field */}
                  <FormField
                    control={form.control}
                    name="linkUrl"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-foreground flex items-center gap-1.5 text-[10px] font-semibold">
                          <ExternalLink className="size-3 text-blue-600" /> Optional External Link / Website URL
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g. https://meet.google.com/xyz or application link"
                              className="h-9 text-xs pr-8"
                              {...field}
                              value={field.value || ""}
                            />
                            {field.value && (
                              <a
                                href={field.value.startsWith("http") ? field.value : `https://${field.value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Test link in new tab"
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                              >
                                <ExternalLink className="size-3.5" />
                              </a>
                            )}
                          </div>
                        </FormControl>
                        <p className="text-muted-foreground text-[9px] leading-tight">
                          Opens in a new tab when clicked on frontend notice board.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="text-muted-foreground bg-muted/20 border-border/50 rounded-xl border p-3 text-[10px] leading-relaxed">
                  {targetType === "role"
                    ? 'Note: If Target Audience is "Everyone" and Target User is blank, this announcement will be broadcast globally. Enter an email or registration number to send a targeted message.'
                    : "Note: This announcement is delivered only to participants enrolled in the selected program(s)."}
                </div>

                <div className="border-border/50 flex justify-end gap-3 border-t pt-4">
                  {editingNotice ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={isUpdatingNotice}
                        className="h-9 cursor-pointer px-4 text-xs font-semibold"
                      >
                        Cancel Edit
                      </Button>
                      <Button
                        type="submit"
                        disabled={isUpdatingNotice}
                        className="bg-primary hover:bg-primary/95 text-primary-foreground h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold"
                      >
                        {isUpdatingNotice ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" />
                            Updating Notice...
                          </>
                        ) : (
                          <>
                            <Check className="size-3.5" />
                            Update Notice
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="h-9 cursor-pointer px-4 text-xs font-semibold"
                      >
                        Clear
                      </Button>
                      <Button
                        type="submit"
                        disabled={isCreating}
                        className="bg-primary hover:bg-primary/95 text-primary-foreground h-9 cursor-pointer gap-1.5 px-4 text-xs font-semibold"
                      >
                        <Send className="size-3" />
                        {isCreating ? "Broadcasting..." : "Broadcast"}
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
          </div>

          {/* 2. BOTTOM SECTION: ALL NOTICES SEQUENTIALLY LISTED BELOW ("नीचे सूचीबद्ध") */}
          <div
            id="all-notices-directory"
            className="bg-card border-border/60 rounded-2xl border p-4 sm:p-5 shadow-xs space-y-4"
          >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-border/60 border-b pb-3">
              <div>
                <h3 className="text-foreground text-sm sm:text-base font-bold flex items-center gap-1.5">
                  <Bell className="size-4 text-primary" /> All Published Notices Directory (सभी नोटिस - क्रम अनुसार सूचीबद्ध)
                </h3>
                <p className="text-muted-foreground text-[11px]">
                  Showing {filteredNotices.length} of {notices.length} published notices • किसी भी नोटिस को कभी भी एडिट या अपडेट करें
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notices by title or content..."
                  className="h-8 pl-8 text-xs bg-background"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-muted-foreground hover:text-foreground absolute right-2.5 top-1/2 -translate-y-1/2 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Notice Type Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              <span className="text-muted-foreground text-[10px] font-semibold flex items-center gap-1 mr-1">
                <Filter className="size-3" /> Filter by Type:
              </span>
              {categoryList.map((cat) => {
                const count =
                  cat === "All"
                    ? notices.length
                    : notices.filter(
                        (n: NoticeItem) =>
                          (n.category || "General").toLowerCase() ===
                          cat.toLowerCase(),
                      ).length;
                const isActive = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={cn(
                      "cursor-pointer text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground border-border/80",
                    )}
                  >
                    <span>{cat}</span>
                    <span
                      className={cn(
                        "text-[9px] px-1 py-0.2 rounded-full",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted-foreground/15 text-muted-foreground",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {isNoticesLoading ? (
              <div className="flex flex-col items-center justify-center space-y-2 py-12">
                <div className="border-primary border-3 size-7 animate-spin rounded-full border-t-transparent" />
                <p className="text-muted-foreground animate-pulse text-xs font-semibold">
                  Loading active notices...
                </p>
              </div>
            ) : isNoticesError ? (
              <div className="rounded-xl border border-dashed border-red-500/20 bg-red-500/5 p-8 text-center">
                <Info className="mx-auto mb-2 size-8 text-red-500" />
                <p className="text-foreground text-xs font-bold">Sync Error</p>
                <p className="text-muted-foreground text-[10px]">
                  Could not fetch notices. Please refresh.
                </p>
              </div>
            ) : notices.length === 0 ? (
              <div className="bg-muted/10 space-y-2 rounded-xl border border-dashed p-10 text-center">
                <Info className="text-muted-foreground mx-auto size-8" />
                <p className="text-foreground text-xs font-bold">
                  Notice Board is Empty
                </p>
                <p className="text-muted-foreground text-[10px]">
                  No broadcasts published yet. Use the composer form above to post one.
                </p>
              </div>
            ) : filteredNotices.length === 0 ? (
              <div className="bg-muted/10 space-y-2 rounded-xl border border-dashed p-8 text-center">
                <Info className="text-muted-foreground mx-auto size-7" />
                <p className="text-foreground text-xs font-bold">
                  No matching notices found
                </p>
                <p className="text-muted-foreground text-[10px]">
                  No notices found matching category &quot;{filterCategory}&quot;
                  {searchQuery ? ` and search &quot;${searchQuery}&quot;` : ""}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-2 text-xs"
                >
                  Clear Filter
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotices.map((notice: NoticeItem, idx: number) => {
                  const isExpanded = !!expandedNoticeIds[notice.id];
                  const text = notice.description || notice.content || "";
                  const isLongText = text.length > 200 || text.includes("\n");
                  const isCurrentlyEditing = editingNotice?.id === notice.id;

                  return (
                    <div
                      key={notice.id}
                      className={cn(
                        "border-border/70 bg-card group flex flex-col justify-between gap-2.5 rounded-xl border p-4 transition-all shadow-2xs hover:shadow-xs",
                        isCurrentlyEditing
                          ? "border-primary/80 ring-2 ring-primary/20 bg-primary/5"
                          : "hover:border-primary/50",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground border border-border">
                              #{idx + 1}
                            </span>
                            <span className="text-foreground group-hover:text-primary text-xs sm:text-sm font-bold transition-colors">
                              {notice.title}
                            </span>
                            {notice.noticeNumber && (
                              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700/50">
                                {notice.noticeNumber}
                              </span>
                            )}
                            {isCurrentlyEditing && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground animate-pulse">
                                Currently Editing
                              </span>
                            )}
                          </div>
                          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-[9px] font-semibold">
                            <span
                              className={cn(
                                "rounded px-2 py-0.5 font-bold",
                                getCategoryBadgeClass(notice.category),
                              )}
                            >
                              {notice.category || "General"}
                            </span>
                            {notice.targetRole && (
                              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-500 font-semibold">
                                Target:{" "}
                                {notice.targetRole === "STUDENT"
                                  ? "Students"
                                  : notice.targetRole === "INSTRUCTOR"
                                  ? "Instructors"
                                  : notice.targetRole === "RECRUIT_USER"
                                  ? "Job Applicants"
                                  : notice.targetRole === "IMMERSION_USER"
                                  ? "Immersion Users"
                                  : notice.targetRole}
                              </span>
                            )}
                            {notice.receiver ? (
                              <span
                                className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-500"
                                title={`Target: ${notice.receiver.email}`}
                              >
                                Direct to: {notice.receiver.name || notice.receiver.email}
                              </span>
                            ) : notice.receiverId ? (
                              <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-500">
                                Direct message
                              </span>
                            ) : null}
                            <span className="flex items-center gap-1">
                              <CalendarDays className="size-3" />
                              {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons: Edit and Delete */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Button
                            variant={isCurrentlyEditing ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleStartEdit(notice)}
                            className={cn(
                              "h-7 px-2.5 text-[11px] font-semibold gap-1 cursor-pointer shadow-2xs",
                              isCurrentlyEditing
                                ? "bg-primary text-primary-foreground"
                                : "text-primary hover:bg-primary/10 border-primary/30",
                            )}
                            title="Edit this notice in the composer above"
                          >
                            <Edit className="size-3" />
                            <span>{isCurrentlyEditing ? "Editing" : "Edit"}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(notice.id)}
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-7 w-7 rounded-lg transition-colors cursor-pointer"
                            title="Delete this notice"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1 border-t border-border/40">
                        {isExpanded ? (
                          <div className="space-y-2 text-muted-foreground text-xs leading-relaxed">
                            {(() => {
                              const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
                              const hasDoubleNewline = /\n\s*\n/.test(normalized);
                              const paragraphs = hasDoubleNewline
                                ? normalized.split(/\n\s*\n+/)
                                : normalized.split(/\n+/);
                              return paragraphs.map((p, i) => (
                                <p key={i} className="whitespace-pre-line leading-relaxed text-justify">
                                  {p.trim()}
                                </p>
                              ));
                            })()}
                          </div>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line text-xs leading-relaxed transition-all line-clamp-3">
                            {text}
                          </p>
                        )}
                        {isLongText && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(notice.id)}
                            className="text-primary hover:underline text-[11px] font-semibold cursor-pointer pt-0.5 inline-block"
                          >
                            {isExpanded ? "Show Less" : "Read Full Notice..."}
                          </button>
                        )}
                        {(notice.pdfUrl || notice.linkUrl) && (
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
                            {notice.pdfUrl && (
                              <a
                                href={notice.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800 hover:bg-emerald-100 transition-colors dark:bg-emerald-950/40 dark:text-emerald-300"
                              >
                                <Download className="size-3 text-emerald-600" /> Download File
                              </a>
                            )}
                            {notice.linkUrl && (
                              <a
                                href={notice.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/30 bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-800 hover:bg-blue-100 transition-colors dark:bg-blue-950/40 dark:text-blue-300"
                              >
                                <ExternalLink className="size-3 text-blue-600" /> Open Link ↗
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <EditNoticeModal
            notice={editingNotice}
            isOpen={false}
            onClose={() => setEditingNotice(null)}
            onSave={handleSaveEdit}
            isUpdating={isUpdatingNotice}
          />
        </div>
      );
    }

  return (
    <main className="">
      <h1 className="sr-only">Announcements & Notices</h1>
      <>
        <PageHeaderLayout>
          <Heading
            title="Notice Board Announcements"
            description="Create announcements and broadcast notifications targeted by user role or specific profiles."
          />
        </PageHeaderLayout>

        <Suspense fallback={null}>
          <NoticesPanel_2 />
        </Suspense>
      </>
    </main>
  );
}
