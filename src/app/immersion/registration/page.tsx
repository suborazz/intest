"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React_4, { useEffect, useState } from "react";
import { type FieldPath, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight as ArrowRight_2, Award, Briefcase as Briefcase_2, CalendarIcon, ChevronLeft, Code, Edit, Edit2, GraduationCap as GraduationCap_2, List, MapPin as MapPin_2, Pencil, Phone as Phone_2, Plus, Printer, Save, ShieldCheck, Trash2, Upload, User, Check } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from "radix-ui";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z_2 from "zod";
import { format } from "date-fns";
import { LucideIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useRef, useContext } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot, Checkbox as CheckboxPrimitive, Accordion as AccordionPrimitive } from "radix-ui";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { DayButton, DayPicker, Locale, getDefaultClassNames } from "react-day-picker";
import { clsx as clsx_2 } from "clsx";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldValues, FormProvider } from "react-hook-form";
import { AuthContext } from "@/x/8789d6dc";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";
import { axiosInstance } from "@/x/acfb3dca";
const Form = FormProvider;

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

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "min-w-(--cell-size) group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground relative isolate z-10 flex aspect-square size-auto w-full flex-col gap-1 border-0 font-normal leading-none data-[range-middle=true]:rounded-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-3 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(6)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day,
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end,
        ),
        today: cn(
          "rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="size-(--cell-size) flex items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "origin-(--radix-popover-content-transform-origin) bg-popover text-popover-foreground ring-foreground/10 outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 flex-col gap-4 rounded-lg p-2.5 text-xs shadow-md ring-1 duration-100",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
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

const IMMERSION_STATUS_RANK: Record<string, number> = {
      APPROVED: 4,
      UNDER_REVIEW: 3,
      SUBMITTED: 3,
      REJECTED: 2,
      DRAFT: 1,
    };

function pickPrimaryImmersionApplication<
      T extends { status: string; createdAt?: Date | string | null },
    >(applications: readonly T[]): T | null {
      if (applications.length === 0) return null;

      return applications.reduce((best, current) => {
        const bestRank = IMMERSION_STATUS_RANK[best.status] ?? 0;
        const currentRank = IMMERSION_STATUS_RANK[current.status] ?? 0;
        if (currentRank !== bestRank)
          return currentRank > bestRank ? current : best;

        const bestTime = best.createdAt ? new Date(best.createdAt).getTime() : 0;
        const currentTime = current.createdAt
          ? new Date(current.createdAt).getTime()
          : 0;
        return currentTime > bestTime ? current : best;
      });
    }

interface RegistrationPreviewProps {
      data: TEmersionApplication;
      photoPreview: string | null;
      handlePrint: () => void;
      handleEditSubmission: () => void;
      handleBackToDashboard: () => void;
    }

interface StepDocumentsProps {
      photoPreview: string | null;
      resumePreview: string | null;
      nocPreview: string | null;
      handleFileChange: (
        e: React_3.ChangeEvent<HTMLInputElement>,
        fieldName: "photoBase64" | "identityProofBase64" | "educationCertBase64",
        nameField: "photoName" | "identityProofName" | "educationCertName",
      ) => void;
      onPrev: () => void;
      onBeforeSubmit?: () => void;
      isPending: boolean;
    }

interface StepEducationProps {
      tempAcademic: {
        highestQualification: string;
        specialization: string;
        universityName: string;
        yearOfCompletion: string;
        percentage: string;
      };
      setTempAcademic: React_3.Dispatch<
        React_3.SetStateAction<{
          highestQualification: string;
          specialization: string;
          universityName: string;
          yearOfCompletion: string;
          percentage: string;
        }>
      >;
      onAddAcademic: () => void;
      onNext: () => void;
      onPrev: () => void;
    }

function Select_3({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_3({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

const qualificationsList = [
      "Matriculation",
      "Intermediate",
      "Under Graduate",
      "Graduate Pass Out",
      "Under Post Graduate",
      "Post Graduate Pass Out",
      "Under M. Phil.",
      "M. Phil. Pass Out",
      "Under Ph.D",
      "Ph.D Pass Out",
    ];

interface StepIndicatorProps {
      currentStep: number;
      stepsInfo: { title: string; desc: string }[];
    }

interface StepPersonalInfoProps {
      sameAsCurrentAddress: boolean;
      onNext: () => void;
    }

function Popover({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Root>) {
      return <PopoverPrimitive.Root data-slot="popover" {...props} />;
    }

function PopoverTrigger({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Trigger>) {
      return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
    }

function cn_7(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

function Select_4({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_4({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

interface StepProfessionalProps {
      onNext: () => void;
      onPrev: () => void;
    }

function Select_5({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_5({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

const StepProfessional: React_3.FC<StepProfessionalProps> = ({
      onNext,
      onPrev,
    }) => {
      const { control } = useFormContext<TEmersionApplication>();

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border flex items-center gap-1.5 border-b pb-3">
            <Briefcase_2 className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 6: Availability & Your Work
              </h2>
              <p className="text-muted-foreground text-xs">
                Define your routine and work type.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="preferredMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your Presence During Immersion{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_5
                    key={field.value?.[0] || "presence-select"}
                    onValueChange={(val) => field.onChange([val])}
                    value={field.value?.[0] || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_5 placeholder="Select Presence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline/On Campus">
                        Offline / On Campus
                      </SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select_5>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fieldVisitsComfort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are you comfortable with field visits?{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_5
                    key={
                      field.value !== undefined
                        ? field.value
                          ? "Yes"
                          : "No"
                        : "field-visits-select"
                    }
                    onValueChange={(val) => field.onChange(val === "Yes")}
                    value={
                      field.value !== undefined ? (field.value ? "Yes" : "No") : ""
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_5 placeholder="Select Field Visits Comfort" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select_5>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="workType"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>
                    What is Your Work? <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_5
                    key={field.value || "work-type-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_5 placeholder="Select Work Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GOVT_JOB">
                        Job in Government Sector
                      </SelectItem>
                      <SelectItem value="NGO_JOB">
                        Job in Non-Government Sector/NGO
                      </SelectItem>
                      <SelectItem value="SOCIAL_WORK">Social Work</SelectItem>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="RESEARCHER">Researcher</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select_5>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-border flex items-center gap-1.5 border-b pb-3 pt-4">
            <Phone_2 className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 7: Emergency Contact
              </h2>
              <p className="text-muted-foreground text-xs">Emergency references.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="emergencyRelationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Father" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="emergencyMobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Mobile Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="10-digit number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between border-t pt-4">
            <Button
              type="button"
              onClick={onPrev}
              variant="outline"
              className="h-10 gap-1.5 rounded-xl px-5 font-semibold"
            >
              <ChevronLeft className="size-4" /> Back
            </Button>
            <Button
              type="button"
              onClick={onNext}
              className="h-10 gap-1.5 rounded-xl px-6 font-semibold"
            >
              Save & Continue <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };

const stepsInfo = [
    { title: "Basic Profile", desc: "Identity & Addresses" },
    { title: "Education Details", desc: "Qualifications" },
    { title: "Availability & Work", desc: "Routine & Emergency" },
    { title: "Uploads", desc: "Documents & Done" },
  ];


export default function ImmersionRegistrationPage() {
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

    function useAuth() {
      return useContext(AuthContext);
    }

    const RegistrationPreview: React_3.FC<RegistrationPreviewProps> = ({
      data,
      photoPreview,
      handlePrint,
      handleEditSubmission,
      handleBackToDashboard,
    }) => {
      return (
        <div className="bg-card/85 border-border/60 space-y-6 rounded-3xl border p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="border-border/60 flex flex-col items-center justify-between gap-4 border-b pb-5 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-7" />
              </div>
              <div>
                <h3 className="text-foreground text-lg font-bold">
                  Registration Complete
                </h3>
                <p className="text-muted-foreground text-xs">
                  Your onboarding details have been registered successfully.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="h-9 gap-1 rounded-xl px-3"
              >
                <Printer className="size-4" /> Print Form
              </Button>
              <Button
                onClick={handleEditSubmission}
                variant="outline"
                size="sm"
                className="h-9 gap-1 rounded-xl px-3"
              >
                <Edit2 className="size-4" /> Edit Details
              </Button>
              <Button
                onClick={handleBackToDashboard}
                size="sm"
                className="h-9 rounded-xl px-4"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-3">
                <h4 className="text-primary border-primary/25 border-b pb-1 text-xs font-extrabold uppercase tracking-widest">
                  Basic Profile Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                      Full Name
                    </span>
                    <span className="text-foreground font-semibold">
                      {data.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                      Father/Spouse Name
                    </span>
                    <span className="text-foreground font-semibold">
                      {data.fatherSpouseName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                      Date of Birth
                    </span>
                    <span className="text-foreground font-semibold">
                      {data.dob}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                      Gender
                    </span>
                    <span className="text-foreground font-semibold">
                      {data.gender}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                      Mobile Number
                    </span>
                    <span className="text-foreground font-semibold">
                      {data.mobileNo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-primary border-primary/25 border-b pb-1 text-xs font-extrabold uppercase tracking-widest">
                  Address Coordinates
                </h4>
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                      Permanent Address
                    </span>
                    <p className="text-foreground font-medium leading-relaxed">
                      {data.permanentAddress.local},{" "}
                      {data.permanentAddress.district},{" "}
                      {data.permanentAddress.state}, {data.permanentAddress.country}{" "}
                      - {data.permanentAddress.pinCode}
                    </p>
                  </div>
                  {!data.sameAsCurrentAddress && (
                    <div>
                      <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                        Current Address
                      </span>
                      <p className="text-foreground font-medium leading-relaxed">
                        {data.currentAddress.local}, {data.currentAddress.district},{" "}
                        {data.currentAddress.state}, {data.currentAddress.country} -{" "}
                        {data.currentAddress.pinCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-primary border-primary/25 border-b pb-1 text-xs font-extrabold uppercase tracking-widest">
                  Academic Qualifications
                </h4>
                <div className="bg-muted/10 w-full overflow-hidden rounded-xl border">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="bg-muted/40 border-b">
                        <th className="text-muted-foreground p-2.5 font-bold uppercase tracking-wider">
                          Qualification
                        </th>
                        <th className="text-muted-foreground p-2.5 font-bold uppercase tracking-wider">
                          Specialization
                        </th>
                        <th className="text-muted-foreground p-2.5 font-bold uppercase tracking-wider">
                          University
                        </th>
                        <th className="text-muted-foreground p-2.5 font-bold uppercase tracking-wider">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.qualifications.map((q, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="text-foreground p-2.5 font-semibold">
                            {q.highestQualification}
                          </td>
                          <td className="text-muted-foreground p-2.5 font-medium">
                            {q.specialization}
                          </td>
                          <td className="text-muted-foreground p-2.5 font-medium">
                            {q.universityName}
                          </td>
                          <td className="text-foreground p-2.5 font-semibold">
                            {q.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {photoPreview && (
                <div className="bg-muted/10 flex flex-col items-center space-y-2 rounded-2xl border p-4">
                  {}
                  <img
                    src={photoPreview}
                    alt="Passport Photo"
                    className="h-36 w-32 rounded-lg border object-cover shadow-sm"
                  />
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                    Passport Photograph
                  </span>
                </div>
              )}

              <div className="bg-muted/10 space-y-3 rounded-2xl border p-4">
                <h5 className="text-foreground border-b pb-1 text-[10px] font-extrabold uppercase tracking-widest">
                  Preferences
                </h5>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[9px] font-bold uppercase">
                      Preferred Mode
                    </span>
                    <span className="font-semibold">
                      {data.preferredMode?.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const StepDocuments: React_3.FC<StepDocumentsProps> = ({
      photoPreview,
      resumePreview,
      nocPreview,
      handleFileChange,
      onPrev,
      onBeforeSubmit,
      isPending,
    }) => {
      const { control } = useFormContext<TEmersionApplication>();

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border flex items-center gap-1.5 border-b pb-3">
            <Award className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 8: Document Upload
              </h2>
              <p className="text-muted-foreground text-xs">
                Upload required document verification files.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <FormLabel>
                Upload Passport Size Photo{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photoBase64", "photoName")}
                className="text-muted-foreground file:bg-primary/10 file:text-primary w-full text-xs font-semibold file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-xs file:font-semibold"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Passport Photo Preview"
                  className="mt-2 h-28 w-24 rounded-lg border object-cover shadow-sm"
                />
              )}
            </div>

            <div className="space-y-1.5">
              <FormLabel>Upload Resume/CV (PDF/Image)</FormLabel>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) =>
                  handleFileChange(e, "identityProofBase64", "identityProofName")
                }
                className="text-muted-foreground file:bg-primary/10 file:text-primary w-full text-xs font-semibold file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-xs file:font-semibold"
              />
              {resumePreview && (
                <div className="mt-2 text-xs">
                  <span className="text-muted-foreground mr-1.5">
                    Current file:
                  </span>
                  <a
                    href={resumePreview}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    View current Resume/CV
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <FormLabel>Upload NOC from Institution (If Required)</FormLabel>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) =>
                  handleFileChange(e, "educationCertBase64", "educationCertName")
                }
                className="text-muted-foreground file:bg-primary/10 file:text-primary w-full text-xs font-semibold file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-xs file:font-semibold"
              />
              {nocPreview && (
                <div className="mt-2 text-xs">
                  <span className="text-muted-foreground mr-1.5">
                    Current file:
                  </span>
                  <a
                    href={nocPreview}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    View current NOC Document
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="border-border flex items-center gap-1.5 border-b pb-3 pt-4">
            <ShieldCheck className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 9: Declaration
              </h2>
              <p className="text-muted-foreground text-xs">
                Terms and program rules declaration.
              </p>
            </div>
          </div>

          <FormField
            control={control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="bg-muted/10 space-y-2 rounded-xl border p-4">
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground cursor-pointer text-xs font-bold">
                      I hereby declare that the information provided by me is true
                      and correct. I agree to follow the rules and guidelines of the
                      Immersion Program.
                    </FormLabel>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between border-t pt-4">
            <Button
              type="button"
              onClick={onPrev}
              variant="outline"
              className="h-10 gap-1.5 rounded-xl px-5 font-semibold"
            >
              <ChevronLeft className="size-4" /> Back
            </Button>
            <Button
              type="submit"
              onClick={onBeforeSubmit}
              disabled={isPending}
              className="h-10 cursor-pointer gap-1.5 rounded-xl px-6 font-semibold"
            >
              {isPending ? "Submitting Application..." : "Submit Application"}
            </Button>
          </div>
        </div>
      );
    };
    const StepEducation: React_3.FC<StepEducationProps> = ({
      tempAcademic,
      setTempAcademic,
      onAddAcademic,
      onNext,
      onPrev,
    }) => {
      const { control } = useFormContext<TEmersionApplication>();
      const { fields, remove } = useFieldArray({
        control,
        name: "qualifications",
      });

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border flex items-center gap-1.5 border-b pb-3">
            <GraduationCap_2 className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 3: Academic Details
              </h2>
              <p className="text-muted-foreground text-xs">
                List your academic qualifications.
              </p>
            </div>
          </div>

          {fields.length > 0 && (
            <div className="animate-in fade-in mb-4 w-full overflow-hidden rounded-xl border duration-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>University / Board</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell className="font-semibold">
                        {field.highestQualification}
                      </TableCell>
                      <TableCell>{field.specialization}</TableCell>
                      <TableCell>{field.universityName}</TableCell>
                      <TableCell>{field.yearOfCompletion}</TableCell>
                      <TableCell className="font-semibold">
                        {field.percentage}%
                      </TableCell>
                      <TableCell className="space-x-1 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setTempAcademic({
                              highestQualification:
                                field.highestQualification || "",
                              specialization: field.specialization || "",
                              universityName: field.universityName || "",
                              yearOfCompletion: field.yearOfCompletion || "",
                              percentage: field.percentage || "",
                            });
                            remove(index);
                          }}
                          className="text-muted-foreground hover:bg-muted h-8 w-8"
                          title="Edit Qualification"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-destructive hover:bg-destructive/10 h-8 w-8"
                          title="Delete Entry"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="bg-muted/10 space-y-4 rounded-2xl border p-4">
            <h4 className="text-foreground text-xs font-bold uppercase tracking-wide">
              Add Qualification Entry
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FormLabel>
                  Qualification <span className="text-destructive">*</span>
                </FormLabel>
                <Select_3
                  value={tempAcademic.highestQualification || undefined}
                  onValueChange={(val) =>
                    setTempAcademic((p) => ({ ...p, highestQualification: val }))
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue_3 placeholder="Select Qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualificationsList.map((q) => (
                      <SelectItem key={q} value={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select_3>
              </div>

              <div className="space-y-1.5">
                <FormLabel>
                  Stream / Specialization{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <Input
                  placeholder="e.g. Science / Arts"
                  value={tempAcademic.specialization}
                  onChange={(e) =>
                    setTempAcademic((p) => ({
                      ...p,
                      specialization: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <FormLabel>
                  University / Board <span className="text-destructive">*</span>
                </FormLabel>
                <Input
                  placeholder="e.g. Delhi University"
                  value={tempAcademic.universityName}
                  onChange={(e) =>
                    setTempAcademic((p) => ({
                      ...p,
                      universityName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <FormLabel>
                  Session / Year <span className="text-destructive">*</span>
                </FormLabel>
                <Input
                  placeholder="e.g. 2024"
                  value={tempAcademic.yearOfCompletion}
                  onChange={(e) =>
                    setTempAcademic((p) => ({
                      ...p,
                      yearOfCompletion: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <FormLabel>
                  Grade / Percentage <span className="text-destructive">*</span>
                </FormLabel>
                <Input
                  placeholder="e.g. 85%"
                  value={tempAcademic.percentage}
                  onChange={(e) =>
                    setTempAcademic((p) => ({ ...p, percentage: e.target.value }))
                  }
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={onAddAcademic}
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 rounded-xl border-dashed px-4 font-semibold"
            >
              <Plus className="size-4" /> Add Qualification Entry
            </Button>
          </div>

          <div className="flex justify-between border-t pt-4">
            <Button
              type="button"
              onClick={onPrev}
              variant="outline"
              className="h-10 gap-1.5 rounded-xl px-5 font-semibold"
            >
              <ChevronLeft className="size-4" /> Back
            </Button>
            <Button
              type="button"
              onClick={onNext}
              className="h-10 gap-1.5 rounded-xl px-6 font-semibold"
            >
              Save & Continue <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };
    const StepIndicator: React_2.FC<StepIndicatorProps> = ({
      currentStep,
      stepsInfo,
    }) => {
      return (
        <div className="bg-card/85 border-border/60 w-full rounded-2xl border p-4 shadow-none backdrop-blur-md sm:p-6">
          <div className="relative flex w-full items-center justify-between">
            {stepsInfo.map((s, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;

              return (
                <div
                  key={stepNum}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {idx > 0 && (
                    <div
                      className={`absolute left-[-50%] right-[50%] top-5 -z-10 h-[3px] -translate-y-1/2 transition-all duration-500 ${
                        isCompleted || isActive ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-center">
                    {isCompleted ? (
                      <div className="bg-primary text-primary-foreground ring-card flex size-10 items-center justify-center rounded-full text-sm font-bold shadow-md ring-4 transition-all duration-300">
                        <Check className="size-5 stroke-[3]" />
                      </div>
                    ) : (
                      <div
                        className={`ring-card flex size-10 items-center justify-center rounded-full text-sm font-bold ring-4 transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground scale-105 shadow-md"
                            : "bg-muted text-muted-foreground border-border border"
                        }`}
                      >
                        {stepNum}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 space-y-0.5 text-center leading-none">
                    <span
                      className={`block text-[11px] font-bold transition-colors duration-200 sm:text-xs ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      Step {stepNum}
                    </span>
                    <span className="text-muted-foreground/80 hidden max-w-[120px] truncate text-[10px] font-medium sm:block">
                      {s.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    const StepPersonalInfo: React_3.FC<StepPersonalInfoProps> = ({
      sameAsCurrentAddress,
      onNext,
    }) => {
      const { control } = useFormContext<TEmersionApplication>();
      const [isCalendarOpen, setIsCalendarOpen] = useState(false);

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border flex items-center gap-1.5 border-b pb-3">
            <User className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 1: Basic Information
              </h2>
              <p className="text-muted-foreground text-xs">
                Identity and contact details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Rahul Kumar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fatherSpouseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Father’s/Mother’s Name{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Suresh Kumar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel className="mb-2">
                    Date of Birth <span className="text-destructive">*</span>
                  </FormLabel>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn_7(
                            "bg-background border-input h-10 w-full border pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="bg-background w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        className="w-full"
                        captionLayout="dropdown"
                        startMonth={new Date(1930, 0)}
                        endMonth={new Date()}
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(format(date, "yyyy-MM-dd"));
                          } else {
                            field.onChange("");
                          }
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_4
                    key={field.value || "gender-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_4 placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                    </SelectContent>
                  </Select_4>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mobile Number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="alternateMobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit alternate mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. alternate@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-border flex items-center gap-1.5 border-b pb-3 pt-4">
            <MapPin_2 className="text-primary size-5" />
            <div>
              <h2 className="text-foreground text-base font-bold">
                Section 2: Address Details
              </h2>
              <p className="text-muted-foreground text-xs">
                Permanent and current contact locations.
              </p>
            </div>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["current-address", "permanent-address"]}
            className="w-full space-y-4"
          >
            <AccordionItem
              value="current-address"
              className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin_2 className="text-primary size-4" />
                  <span className="text-foreground text-sm font-bold">
                    Current Address Details
                  </span>
                  <span className="text-destructive">*</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-border/60 h-auto space-y-4 border-t px-4 pb-4 pt-4">
                <FormField
                  control={control}
                  name="currentAddress.local"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        House/Street/Local Address{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street/area details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={control}
                    name="currentAddress.district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          District <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="District" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          State <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Pin Code <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Pin Code" maxLength={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <FormField
              control={control}
              name="sameAsCurrentAddress"
              render={({ field }) => (
                <FormItem className="bg-muted/10 flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-foreground cursor-pointer text-xs font-bold">
                      Permanent Address same as Current Address
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {!sameAsCurrentAddress && (
              <AccordionItem
                value="permanent-address"
                className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30"
              >
                <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <MapPin_2 className="text-primary size-4" />
                    <span className="text-foreground text-sm font-bold">
                      Permanent Address Details
                    </span>
                    <span className="text-destructive">*</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-border/60 h-auto space-y-4 border-t px-4 pb-4 pt-4">
                  <FormField
                    control={control}
                    name="permanentAddress.local"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          House/Street/Local Address{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter street/area details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={control}
                      name="permanentAddress.district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            District <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="District" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="permanentAddress.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            State <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="permanentAddress.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Country <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="permanentAddress.pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Pin Code <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Pin Code"
                              maxLength={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="flex justify-end border-t pt-4">
            <Button
              type="button"
              onClick={onNext}
              className="h-10 gap-1.5 rounded-xl px-6 font-semibold"
            >
              Save & Continue <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [nocPreview, setNocPreview] = useState<string | null>(null);
    const [resetKey, setResetKey] = useState(0);

  const [tempAcademic, setTempAcademic] = useState({
    highestQualification: "",
    specialization: "",
    universityName: "",
    yearOfCompletion: "",
    percentage: "",
  });

  const form = useForm<TEmersionApplication>({
    resolver: zodResolver(
      ZEmersionApplication,
    ) as unknown as Resolver<TEmersionApplication>,
    defaultValues: {
      fullName: "",
      fatherSpouseName: "",
      dob: "",
      gender: "Male",
      mobileNo: "",
      alternateMobileNo: "",
      emailAddress: "",
      currentAddress: {
        local: "",
        district: "",
        state: "",
        country: "India",
        pinCode: "",
      },
      sameAsCurrentAddress: false,
      permanentAddress: {
        local: "",
        district: "",
        state: "",
        country: "India",
        pinCode: "",
      },
      qualifications: [],
      preferredMode: [],
      fieldVisitsComfort: true,
      workType: "STUDENT",
      emergencyContactName: "",
      emergencyRelationship: "",
      emergencyMobile: "",
      photoBase64: "",
      photoName: "",
      identityProofBase64: "",
      identityProofName: "",
      educationCertBase64: "",
      educationCertName: "",
      agreeTerms: false as unknown as true,
    },
  });

  const { data: appResponse, isLoading: isAppLoading } =
    EmersionDataHooks.useMyEmersionApplication({
      enabled: !!userId,
    });

  const { data: profileResponse, isLoading: isProfileLoading } =
    EmersionDataHooks.useEmersionProfile({
      enabled: !!userId,
    });

  const submitMutation = EmersionDataHooks.useSubmitEmersionApplication();

  useEffect(() => {
    if (isAppLoading || isProfileLoading || !userId) return;

        console.log("[EditMode] appResponse:", appResponse);
    console.log("[EditMode] profileResponse:", profileResponse);

        const prof = profileResponse?.data;
                const applications = appResponse?.data;
    let app: { [key: string]: unknown } | null = null;
    if (Array.isArray(applications) && applications.length > 0) {
            const generalApps = (
        applications as { immersionId?: unknown; createdAt?: string | null }[]
      )
        .filter((a) => a.immersionId == null)
        .sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        });
      app = (generalApps[0] ??
        pickPrimaryImmersionApplication(applications)) as {
        [key: string]: unknown;
      } | null;
    } else if (applications && !Array.isArray(applications)) {
      app = applications as { [key: string]: unknown };
    }

    const isEditMode =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("edit") === "true";

    if (app) {
            form.reset({
        fullName: prof?.fullName || "",
        fatherSpouseName: prof?.fatherSpouseName || "",
        dob: prof?.dob || "",
        gender: (prof?.gender || "Male") as "Male" | "Female" | "Transgender",
        mobileNo: prof?.mobileNo || "",
        alternateMobileNo: prof?.alternateMobileNo ?? "",
        emailAddress: prof?.emailAddress ?? "",
        currentAddress: {
          local:
            (prof?.sameAsCurrentAddress
              ? prof?.permAddressLocal
              : prof?.currentAddressLocal) || "",
          district:
            (prof?.sameAsCurrentAddress
              ? prof?.permAddressDistrict
              : prof?.currentAddressDistrict) || "",
          state:
            (prof?.sameAsCurrentAddress
              ? prof?.permAddressState
              : prof?.currentAddressState) || "",
          country:
            (prof?.sameAsCurrentAddress
              ? prof?.permAddressCountry
              : prof?.currentAddressCountry) || "India",
          pinCode:
            (prof?.sameAsCurrentAddress
              ? prof?.permAddressPinCode
              : prof?.currentAddressPinCode) || "",
        },
        sameAsCurrentAddress: prof?.sameAsCurrentAddress || false,
        permanentAddress: {
          local: prof?.permAddressLocal || "",
          district: prof?.permAddressDistrict || "",
          state: prof?.permAddressState || "",
          country: prof?.permAddressCountry || "India",
          pinCode: prof?.permAddressPinCode || "",
        },
                qualifications: (
          (app.academicDetails as {
            qualification: string;
            stream: string;
            universityName: string;
            sessionYear: string;
            gradeDivision: string;
          }[]) ?? []
        ).map((d) => ({
          highestQualification: d.qualification,
          specialization: d.stream,
          universityName: d.universityName,
          yearOfCompletion: d.sessionYear,
          percentage: d.gradeDivision,
        })),
                preferredMode: (() => {
          const presenceType = app.presenceType as string | null;
          if (presenceType === "FULL_TIME")
            return ["Offline/On Campus"] as (
              "Online" | "Offline/On Campus" | "Hybrid"
            )[];
          if (presenceType === "PART_TIME")
            return ["Online"] as ("Online" | "Offline/On Campus" | "Hybrid")[];
          if (presenceType === "HYBRID")
            return ["Hybrid"] as ("Online" | "Offline/On Campus" | "Hybrid")[];
                    if (
            prof?.preferredMode &&
            (prof.preferredMode as string[]).length > 0
          )
            return prof.preferredMode as (
              "Online" | "Offline/On Campus" | "Hybrid"
            )[];
          return [] as ("Online" | "Offline/On Campus" | "Hybrid")[];
        })(),
        fieldVisitsComfort: (app.fieldVisitsComfort as boolean | null) ?? true,
        workType: ((app.workType as string) || "STUDENT") as
          | "STUDENT"
          | "GOVT_JOB"
          | "NGO_JOB"
          | "SOCIAL_WORK"
          | "RESEARCHER"
          | "OTHER",
        emergencyContactName: (app.emergencyContactName as string) ?? "",
        emergencyRelationship: (app.emergencyRelationship as string) ?? "",
        emergencyMobile: (app.emergencyMobile as string) ?? "",
        agreeTerms: true,
      });
            setResetKey((k) => k + 1);

      if (prof?.photoUrl) setPhotoPreview(prof.photoUrl);
      if (prof?.identityProofUrl)
        setResumePreview(prof.identityProofUrl as string);
      if (prof?.educationCertUrl)
        setNocPreview(prof.educationCertUrl as string);
      if (isEditMode) {
        setIsFinalSubmitted(false);
        setCurrentStep(1);
      } else {
        setIsFinalSubmitted(true);
      }
    } else if (prof) {
            form.reset({
        fullName: prof.fullName || "",
        fatherSpouseName: prof.fatherSpouseName || "",
        dob: prof.dob || "",
        gender: (prof.gender || "Male") as "Male" | "Female" | "Transgender",
        mobileNo: prof.mobileNo || "",
        alternateMobileNo: prof.alternateMobileNo ?? "",
        emailAddress: prof.emailAddress ?? "",
        currentAddress: {
          local:
            (prof.sameAsCurrentAddress
              ? prof.permAddressLocal
              : prof.currentAddressLocal) || "",
          district:
            (prof.sameAsCurrentAddress
              ? prof.permAddressDistrict
              : prof.currentAddressDistrict) || "",
          state:
            (prof.sameAsCurrentAddress
              ? prof.permAddressState
              : prof.currentAddressState) || "",
          country:
            (prof.sameAsCurrentAddress
              ? prof.permAddressCountry
              : prof.currentAddressCountry) || "India",
          pinCode:
            (prof.sameAsCurrentAddress
              ? prof.permAddressPinCode
              : prof.currentAddressPinCode) || "",
        },
        sameAsCurrentAddress: prof.sameAsCurrentAddress || false,
        permanentAddress: {
          local: prof.permAddressLocal || "",
          district: prof.permAddressDistrict || "",
          state: prof.permAddressState || "",
          country: prof.permAddressCountry || "India",
          pinCode: prof.permAddressPinCode || "",
        },
        qualifications: [],
        preferredMode: (prof.preferredMode || []) as (
          "Online" | "Offline/On Campus" | "Hybrid"
        )[],
        fieldVisitsComfort: true,
        workType: "STUDENT",
        emergencyContactName: "",
        emergencyRelationship: "",
        emergencyMobile: "",
      });
      setResetKey((k) => k + 1);
      if (prof.photoUrl) setPhotoPreview(prof.photoUrl);
      if (prof.identityProofUrl)
        setResumePreview(prof.identityProofUrl as string);
      if (prof.educationCertUrl) setNocPreview(prof.educationCertUrl as string);
    } else {
      if (user?.name) {
        form.setValue("fullName", user.name);
      }
    }
  }, [
    appResponse,
    profileResponse,
    isAppLoading,
    isProfileLoading,
    userId,
    form,
    user?.name,
  ]);

  const sameAsCurrentAddress = form.watch("sameAsCurrentAddress");
  const currentLocal = form.watch("currentAddress.local");
  const currentDistrict = form.watch("currentAddress.district");
  const currentState = form.watch("currentAddress.state");
  const currentCountry = form.watch("currentAddress.country");
  const currentPinCode = form.watch("currentAddress.pinCode");

  useEffect(() => {
    if (sameAsCurrentAddress) {
      form.setValue("permanentAddress", {
        local: currentLocal || "",
        district: currentDistrict || "",
        state: currentState || "",
        country: currentCountry || "India",
        pinCode: currentPinCode || "",
      });
    }
  }, [
    sameAsCurrentAddress,
    currentLocal,
    currentDistrict,
    currentState,
    currentCountry,
    currentPinCode,
    form,
  ]);

  const handleAddAcademic = () => {
    if (
      !tempAcademic.highestQualification ||
      !tempAcademic.specialization ||
      !tempAcademic.universityName ||
      !tempAcademic.yearOfCompletion ||
      !tempAcademic.percentage
    ) {
      toast.error("Please fill all qualification fields before adding.");
      return;
    }
    const currentQuals = form.getValues("qualifications") || [];
    form.setValue("qualifications", [...currentQuals, tempAcademic]);
    setTempAcademic({
      highestQualification: "",
      specialization: "",
      universityName: "",
      yearOfCompletion: "",
      percentage: "",
    });
    toast.success("Qualification entry added.");
  };

  const handleFileChange = (
    e: React_4.ChangeEvent<HTMLInputElement>,
    fieldName: "photoBase64" | "identityProofBase64" | "educationCertBase64",
    nameField: "photoName" | "identityProofName" | "educationCertName",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      toast.error(`File is too large! Maximum limit is 500 KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      form.setValue(fieldName, base64);
      form.setValue(nameField, file.name);
      if (fieldName === "photoBase64") {
        setPhotoPreview(base64);
      } else if (fieldName === "identityProofBase64") {
        setResumePreview(base64);
      } else if (fieldName === "educationCertBase64") {
        setNocPreview(base64);
      }
      toast.success(`${file.name} uploaded successfully.`);
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = async () => {
    let fieldsToValidate: FieldPath<TEmersionApplication>[] = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        "fullName",
        "fatherSpouseName",
        "dob",
        "gender",
        "mobileNo",
        "currentAddress.local",
        "currentAddress.district",
        "currentAddress.state",
        "currentAddress.country",
        "currentAddress.pinCode",
      ];

      const sameAs = form.getValues("sameAsCurrentAddress");
      if (!sameAs) {
        fieldsToValidate.push(
          "permanentAddress.local",
          "permanentAddress.district",
          "permanentAddress.state",
          "permanentAddress.country",
          "permanentAddress.pinCode",
        );
      }
    } else if (currentStep === 2) {
      fieldsToValidate = ["qualifications"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["preferredMode"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill all mandatory fields correctly to continue.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitClick = () => {
        if (form.getValues("sameAsCurrentAddress")) {
      const curr = form.getValues("currentAddress");
      form.setValue("permanentAddress", {
        local: curr.local || "",
        district: curr.district || "",
        state: curr.state || "",
        country: curr.country || "India",
        pinCode: curr.pinCode || "",
      });
    }
  };

  const onSubmit = (values: TEmersionApplication) => {
    const finalValues = { ...values };
    if (finalValues.sameAsCurrentAddress) {
      finalValues.permanentAddress = { ...finalValues.currentAddress };
    }
    const isEditMode =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("edit") === "true";

    submitMutation.mutate(finalValues, {
      onSuccess: () => {
        toast.success("Immersion application updated successfully!");
        if (isEditMode) {
          router.push("/immersion/profile");
        } else {
          setIsFinalSubmitted(true);
        }
      },
    });
  };
  if (isAppLoading || isProfileLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="border-primary size-12 animate-spin rounded-full border-4 border-t-transparent shadow-md" />
        <p className="text-muted-foreground animate-pulse text-sm font-semibold">
          Loading registration profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl py-4">
      {isFinalSubmitted ? (
        <RegistrationPreview
          data={form.getValues()}
          photoPreview={photoPreview}
          handlePrint={() => window.print()}
          handleEditSubmission={() => {
            setIsFinalSubmitted(false);
            setCurrentStep(1);
          }}
          handleBackToDashboard={() => router.replace("/immersion/dashboard")}
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              Immersion Registration
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              Please complete your immersion program registration details.
            </p>
          </div>

          <StepIndicator currentStep={currentStep} stepsInfo={stepsInfo} />

          <div className="bg-card/80 border-border/60 rounded-2xl border px-4 py-4 shadow-xl backdrop-blur-md sm:p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (err) => {
                  console.log("FORM VALIDATION ERRORS:", err);
                  const getErrors = (obj: any): string[] => {
                    const messages: string[] = [];
                    const walk = (o: any) => {
                      if (!o) return;
                      if (typeof o.message === "string") {
                        messages.push(o.message);
                        return;
                      }
                      for (const key in o) {
                        if (typeof o[key] === "object") {
                          walk(o[key]);
                        }
                      }
                    };
                    walk(obj);
                    return messages;
                  };
                  const msgs = getErrors(err);
                  if (msgs.length > 0) {
                    toast.error(`Validation error: ${msgs.join(" | ")}`);
                  } else {
                    toast.error(
                      "Form validation failed. Please check all fields.",
                    );
                  }
                })}
                className="space-y-8"
              >
                {currentStep === 1 && (
                  <StepPersonalInfo
                    key={resetKey}
                    sameAsCurrentAddress={sameAsCurrentAddress}
                    onNext={handleNextStep}
                  />
                )}
                {currentStep === 2 && (
                  <StepEducation
                    tempAcademic={tempAcademic}
                    setTempAcademic={setTempAcademic}
                    onAddAcademic={handleAddAcademic}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}
                {currentStep === 3 && (
                  <StepProfessional
                    key={resetKey}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}
                {currentStep === 4 && (
                  <StepDocuments
                    photoPreview={photoPreview}
                    resumePreview={resumePreview}
                    nocPreview={nocPreview}
                    handleFileChange={handleFileChange}
                    onPrev={handlePrevStep}
                    onBeforeSubmit={handleSubmitClick}
                    isPending={submitMutation.isPending}
                  />
                )}
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
