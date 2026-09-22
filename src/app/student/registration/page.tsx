"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React_4, { useEffect, useState } from "react";
import {
  type FieldPath,
  type Resolver,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft, ArrowRight as ArrowRight_2, CalendarIcon, CheckCircle, Code, Download, Edit, Edit2, GraduationCap as GraduationCap_2, MapPin as MapPin_2, Pencil, Plus, Printer, Save, ShieldCheck, Trash2, Upload, Check } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from "radix-ui";
import { ControllerRenderProps, FieldErrors, useFormContext } from "react-hook-form";
import * as z_2 from "zod";
import { format } from "date-fns";
import { LucideIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useRef, useContext } from "react";
import { ScrollArea as ScrollAreaPrimitive, Slot, Checkbox as CheckboxPrimitive, Accordion as AccordionPrimitive } from "radix-ui";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { DayButton, DayPicker, Locale, getDefaultClassNames } from "react-day-picker";
import { clsx as clsx_2 } from "clsx";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldValues, FormProvider } from "react-hook-form";
import { AuthContext } from "@/x/8789d6dc";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";
import { axiosInstance } from "@/x/acfb3dca";
import { processUploadedFile } from "@/lib/fileCompressor";
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

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground pl-1 text-xs opacity-70", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

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

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-1.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none select-none p-px transition-colors",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface ApiSuccess<T> {
      success: boolean;
      data: T;
      message?: string;
    }

interface TAcademicDetail {
      qualification: string;
      stream: string;
      subject: string;
      instituteName: string;
      universityName: string;
      sessionYear: string;
      gradeDivision: string;
      status: "Pass Out" | "Persuing";
    }

interface StudentRegistrationResponse {
      id: string;
      studentId: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      category: string;
      localAddressLocal: string;
      localAddressDistrict: string;
      localAddressState: string;
      localAddressCountry: string;
      localAddressPinCode: string;
      sameAsLocal: boolean;
      permAddressLocal: string;
      permAddressDistrict: string;
      permAddressState: string;
      permAddressCountry: string;
      permAddressPinCode: string;
      mobileNo: string;
      internshipGoal:
        | "Job"
        | "Freelancing"
        | "Higher Studies"
        | "Startup"
        | "Skill Enhancement"
        | "Other";
      aadharNo?: string;
      photoUrl: string;
      photoName: string;
      signatureUrl: string;
      signatureName: string;
      agreeTerms: boolean;
      createdAt: string;
      updatedAt: string;
      userId: string;
      academics: TAcademicDetail[];
      skills?: any[];
    }

type GetStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

type SubmitStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

interface TAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

interface StudentRegistrationPayload {
      fullName: string;
      fatherName: string;
      motherName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      category: string;
      localAddress: TAddress;
      sameAsLocal: boolean;
      permanentAddress: TAddress;
      mobileNo: string;
      academics: TAcademicDetail[];
      internshipGoal:
        | "Job"
        | "Freelancing"
        | "Higher Studies"
        | "Startup"
        | "Skill Enhancement"
        | "Other";
      aadharNo?: string;
      photoBase64: string;
      photoName: string;
      signatureBase64: string;
      signatureName: string;
      agreeTerms: boolean;
    }

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

type ListStudentRegistrationsResponse = ApiSuccess<
      StudentRegistrationResponse[]
    >;

type UpdateStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

type StudentRegistrationUpdatePayload =
      Partial<StudentRegistrationPayload>;

type DeleteStudentRegistrationResponse = ApiSuccess<{ message: string }>;

interface IStudentRegistrationDataHooks {
      useStudentRegistrationMe: (
        options?: TQueryOptions<GetStudentRegistrationResponse, Error>,
      ) => TQueryReturnType<GetStudentRegistrationResponse, Error>;

      useStudentRegistrationSubmit: (
        options?: TMutationOptions<
          SubmitStudentRegistrationResponse,
          Error,
          StudentRegistrationPayload
        >,
      ) => TMutationReturnType<
        SubmitStudentRegistrationResponse,
        StudentRegistrationPayload
      >;

      useStudentRegistrationAdminList: (
        options?: TQueryOptions<ListStudentRegistrationsResponse, Error>,
      ) => TQueryReturnType<ListStudentRegistrationsResponse, Error>;

      useStudentRegistrationDetails: (
        id: string,
        options?: TQueryOptions<GetStudentRegistrationResponse, Error>,
      ) => TQueryReturnType<GetStudentRegistrationResponse, Error>;

      useStudentRegistrationUpdate: (
        options?: TMutationOptions<
          UpdateStudentRegistrationResponse,
          Error,
          { id: string; payload: StudentRegistrationUpdatePayload }
        >,
      ) => TMutationReturnType<
        UpdateStudentRegistrationResponse,
        { id: string; payload: StudentRegistrationUpdatePayload }
      >;

      useStudentRegistrationDelete: (
        options?: TMutationOptions<
          DeleteStudentRegistrationResponse,
          Error,
          string
        >,
      ) => TMutationReturnType<DeleteStudentRegistrationResponse, string>;
    }

const STUDENT_REGISTRATION_QUERY_KEYS = {
      ALL: ["student-registrations"] as const,
      ME: ["student-registrations", "me"] as const,
      LIST: ["student-registrations", "list"] as const,
      DETAILS: (id: string) => ["student-registrations", "details", id] as const,
    };

interface IStudentRegistrationService {
      submitRegistration: (
        payload: StudentRegistrationPayload,
      ) => Promise<SubmitStudentRegistrationResponse>;
      getMyRegistration: () => Promise<GetStudentRegistrationResponse>;
      listAllRegistrations: () => Promise<ListStudentRegistrationsResponse>;
      getRegistrationById: (id: string) => Promise<GetStudentRegistrationResponse>;
      updateRegistration: (
        id: string,
        payload: StudentRegistrationUpdatePayload,
      ) => Promise<UpdateStudentRegistrationResponse>;
      deleteRegistration: (
        id: string,
      ) => Promise<DeleteStudentRegistrationResponse>;
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

const addressSchema = z.object({
      local: z.string().min(3, "Address line must be at least 3 characters"),
      block: z.string().optional().or(z.literal("")),
      district: z.string().min(2, "District is required"),
      state: z.string().min(2, "State is required"),
      country: z.string().min(2, "Country is required"),
      pinCode: z.string().regex(/^\d{6}$/, "Pin code must be exactly 6 digits"),
    });

const academicDetailSchema = z.object({
      qualification: z.string().min(1, "Qualification is required"),
      stream: z.string().min(1, "Stream is required"),
      subject: z.string().min(1, "Subject is required"),
      instituteName: z
        .string()
        .min(2, "Institute name must be at least 2 characters"),
      universityName: z
        .string()
        .min(2, "University name must be at least 2 characters"),
      sessionYear: z.string().min(1, "Session year is required"),
      gradeDivision: z.string().min(1, "Grade/Division is required"),
      status: z.preprocess(
        (val) => {
          if (typeof val === "string") {
            const s = val.trim();
            if (
              s === "Pass_Out" ||
              s === "PASS_OUT" ||
              s === "Pass Out" ||
              s === "PassOut"
            ) {
              return "Pass Out";
            }
            if (s === "Persuing" || s === "Pursuing" || s === "PURSUING") {
              return "Persuing";
            }
          }
          return val;
        },
        z.enum(["Pass Out", "Persuing"]),
      ),
    });

const studentSkillSchema = z.object({
      skillName: z.string().min(1, "Skill name/area is required"),
      description: z
        .string()
        .min(5, "Description must be at least 5 characters")
        .max(3000),
      certifyingBody: z.string().optional().or(z.literal("")),
      certYear: z.string().optional().or(z.literal("")),
    });

const MAX_BASE64_CHARS = 800_000;

const studentRegistrationSchema = z.object({
      fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),
      fatherName: z
        .string()
        .min(2, "Father name must be at least 2 characters")
        .trim(),
      motherName: z
        .string()
        .min(2, "Mother name must be at least 2 characters")
        .trim(),
      dob: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
      gender: z.enum(["Male", "Female", "Transgender"]),
      category: z.string().min(1, "Category is required"),
      localAddress: addressSchema,
      sameAsLocal: z.boolean(),
      permanentAddress: addressSchema.optional().or(z.any()),
      mobileNo: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
      academics: z
        .array(academicDetailSchema)
        .min(1, "At least one academic qualification is required"),
      skills: z.array(studentSkillSchema).optional().default([]),
      internshipGoal: z.enum([
        "Job",
        "Freelancing",
        "Higher Studies",
        "Startup",
        "Skill Enhancement",
        "Other",
      ]),
      aadharNo: z
        .string()
        .regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
        .optional()
        .nullable()
        .or(z.literal("")),
      photoBase64: z
        .string()
        .min(1, "Photo is required")
        .max(MAX_BASE64_CHARS, "Photo must be under 500 KB"),
      photoName: z.string().min(1, "Photo filename is required"),
      signatureBase64: z
        .string()
        .min(1, "Signature is required")
        .max(MAX_BASE64_CHARS, "Signature must be under 500 KB"),
      signatureName: z.string().min(1, "Signature filename is required"),
      agreeTerms: z.literal(true, {
        error: "You must agree to terms and conditions",
      }),
    });

const ZStudentRegistration = studentRegistrationSchema.extend({
      studentId: z.string(),
    });

type TStudentRegistration = z.infer<typeof ZStudentRegistration>;

const ZAcademicDetail =
      studentRegistrationSchema.shape.academics.element;

type TAcademicDetail_2 = z.infer<typeof ZAcademicDetail>;

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

const qualificationsList_2 = [
      "Under Graduate",
      "Graduate Pass Out",
      "Under Post Graduate",
      "Post Graduate Pass Out",
      "Under Ph.D",
      "Ph.D Pass Out",
    ];

const getInitials = (name: string): string => {
      if (!name) return "XX";
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "XX";
      if (parts.length === 1) {
        const word = parts[0];
        if (word.length >= 2) {
          return word.slice(0, 2).toUpperCase();
        }
        return (word[0] + "X").toUpperCase();
      }
      const first = parts[0][0] || "";
      const last = parts[parts.length - 1][0] || "";
      return (first + last).toUpperCase();
    };

const normalizeGender = (
      gender?: string,
    ): "Male" | "Female" | "Transgender" => {
      if (!gender) return "Male";
      const normalized = gender.trim().toLowerCase();
      if (normalized === "female" || normalized === "f") return "Female";
      if (normalized === "transgender" || normalized === "other")
        return "Transgender";
      return "Male";
    };

const normalizeCategory = (category?: string): string => {
      if (!category) return "General";
      const trimmed = category.trim();
      const lower = trimmed.toLowerCase();

      const categoryMap: Record<string, string> = {
        general: "General",
        obc: "OBC",
        sc: "SC",
        st: "ST",
        "sc/st": "SC/ST",
        sc_st: "SC/ST",
        ews: "EWS",
        humanity: "Humanity",
      };

      return categoryMap[lower] || trimmed;
    };

const normalizeInternshipGoal = (
      goal?: string,
    ):
      | "Job"
      | "Freelancing"
      | "Higher Studies"
      | "Startup"
      | "Skill Enhancement"
      | "Other" => {
      if (!goal) return "Job";
      const map: Record<
        string,
        | "Job"
        | "Freelancing"
        | "Higher Studies"
        | "Startup"
        | "Skill Enhancement"
        | "Other"
      > = {
        Job: "Job",
        Freelancing: "Freelancing",
        "Higher Studies": "Higher Studies",
        Higher_Studies: "Higher Studies",
        Startup: "Startup",
        "Skill Enhancement": "Skill Enhancement",
        Skill_Enhancement: "Skill Enhancement",
        Other: "Other",
      };
      return map[goal] || "Job";
    };

const normalizeAcademicStatus = (status?: string): "Pass Out" | "Persuing" => {
      if (!status) return "Pass Out";
      const s = String(status).trim();
      if (
        s === "Pass_Out" ||
        s === "PASS_OUT" ||
        s === "Pass Out" ||
        s === "PassOut"
      ) {
        return "Pass Out";
      }
      if (s === "Persuing" || s === "Pursuing" || s === "PURSUING") {
        return "Persuing";
      }
      return "Pass Out";
    };

const mapResponseToForm = (
      data: StudentRegistrationResponse,
    ): TStudentRegistration => {
      return {
        studentId: data.studentId || "",
        fullName: data.fullName || "",
        fatherName: data.fatherName || "",
        motherName: data.motherName || "",
        dob: data.dob || "",
        gender: normalizeGender(data.gender),
        category: normalizeCategory(data.category),
        localAddress: {
          local: data.localAddressLocal || "",
          district: data.localAddressDistrict || "",
          state: data.localAddressState || "",
          country: data.localAddressCountry || "India",
          pinCode: data.localAddressPinCode || "",
        },
        sameAsLocal:
          Boolean(data.sameAsLocal) ||
          (!!data.localAddressLocal &&
            data.localAddressLocal === data.permAddressLocal &&
            data.localAddressDistrict === data.permAddressDistrict &&
            data.localAddressState === data.permAddressState &&
            data.localAddressPinCode === data.permAddressPinCode),
        permanentAddress: {
          local: data.permAddressLocal || "",
          district: data.permAddressDistrict || "",
          state: data.permAddressState || "",
          country: data.permAddressCountry || "India",
          pinCode: data.permAddressPinCode || "",
        },
        mobileNo: data.mobileNo || "",
        academics: (data.academics || []).map((ac) => ({
          ...ac,
          status: normalizeAcademicStatus(ac.status),
        })),
        skills: data.skills || [],
        internshipGoal: normalizeInternshipGoal(data.internshipGoal),
        aadharNo: data.aadharNo || "",
        photoBase64: data.photoUrl || "",
        signatureBase64: data.signatureUrl || "",
        photoName: data.photoName || "",
        signatureName: data.signatureName || "",
        agreeTerms: !!data.agreeTerms as unknown as true,
      };
    };

interface RegistrationPreviewProps_4 {
      studentData: TStudentRegistration;
      photoPreview: string | null;
      signaturePreview: string | null;
      handlePrint: () => void;
      handleEditSubmission: () => void;
      handleBackToDashboard: () => void;
    }

interface StepAcademicDetailsProps {
      academicFields: (TAcademicDetail_2 & { id: string })[];
      removeAcademic: (index: number) => void;
      tempAcademic: TAcademicDetail_2;
      setTempAcademic: React_3.Dispatch<React_3.SetStateAction<TAcademicDetail_2>>;
      handleAddAcademic: () => void;
      qualificationsList: string[];
      onNext: () => void;
      onPrev: () => void;
    }

function Select_9({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_9({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

const getAcademicErrorMessage = (
      errors: FieldErrors<TStudentRegistration>,
    ): string | null => {
      if (!errors.academics) return null;
      if (
        "message" in errors.academics &&
        typeof errors.academics.message === "string"
      ) {
        return errors.academics.message;
      }

      const academicsErrors = errors.academics as Record<string, unknown>;
      const keys = Object.keys(academicsErrors);
      for (const key of keys) {
        const itemError = academicsErrors[key];
        if (itemError && typeof itemError === "object") {
          const itemErrorRecord = itemError as Record<string, unknown>;
          const fieldKeys = Object.keys(itemErrorRecord);
          for (const fieldKey of fieldKeys) {
            const fieldError = itemErrorRecord[fieldKey];
            if (
              fieldError &&
              typeof fieldError === "object" &&
              "message" in fieldError &&
              typeof (fieldError as Record<string, unknown>).message === "string"
            ) {
              const rowNum = parseInt(key) + 1;
              return `Row ${isNaN(rowNum) ? key : rowNum}: ${(fieldError as Record<string, unknown>).message}`;
            }
          }
        }
      }

      return "Please check the entered academic details.";
    };

interface StepBasicProfileProps {
      sameAsLocal: boolean;
      onNext: () => void;
    }

function Popover_4({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Root>) {
      return <PopoverPrimitive.Root data-slot="popover" {...props} />;
    }

function PopoverTrigger_4({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Trigger>) {
      return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
    }

function cn_10(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

function Select_10({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_10({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

interface StepDocumentsProps_4 {
      photoPreview: string | null;
      signaturePreview: string | null;
      handleFileChange: (
        e: React_3.ChangeEvent<HTMLInputElement>,
        fieldName: "photoBase64" | "signatureBase64",
        nameField: "photoName" | "signatureName",
      ) => void;
      onPrev: () => void;
      isPending?: boolean;
    }

interface StepIndicatorProps_4 {
      currentStep: number;
      stepsInfo: { title: string; desc: string }[];
    }

interface StepSkillsProps {
      onNext: () => void;
      onPrev: () => void;
    }

function Select_11({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_11({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

const StepSkills: React_3.FC<StepSkillsProps> = ({ onNext, onPrev }) => {
      const { control } = useFormContext<TStudentRegistration>();

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              3. Internship Goals
            </h2>
            <p className="text-muted-foreground text-xs">
              Select your internship goals and career objectives.
            </p>
          </div>

          {}
          <FormField
            control={control}
            name="internshipGoal"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-foreground font-bold">
                  What are Your Goals After the Internship?{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <Select_11
                  key={field.value || "goal-select"}
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue_11 placeholder="Select Goals" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Job">Job</SelectItem>
                    <SelectItem value="Freelancing">Freelancing</SelectItem>
                    <SelectItem value="Higher Studies">Higher Studies</SelectItem>
                    <SelectItem value="Startup">Startup</SelectItem>
                    <SelectItem value="Skill Enhancement">
                      Skill Enhancement
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select_11>
                <FormMessage />
              </FormItem>
            )}
          />

          {}
          <div className="border-border flex w-full items-center gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="h-10 flex-1 gap-2 px-4 sm:flex-initial"
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button
              type="button"
              onClick={onNext}
              className="bg-primary hover:bg-primary/95 active:scale-98 h-10 flex-1 gap-2 px-4 text-white shadow-md transition-all sm:flex-initial"
            >
              Save & Next <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };

const handlePrint = () => {
    window.print();
  };

const stepsInfo = [
    { title: "Basic Profile", desc: "Identification & Contacts" },
    { title: "Academic Details", desc: "Qualifications & History" },
    { title: "Goals", desc: "Internship Objectives" },
    { title: "Documents", desc: "Uploads & Declarations" },
  ];


const StudentRegistrationService: IStudentRegistrationService = {
      async submitRegistration(payload) {
        const response =
          await axiosInstance.post<SubmitStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER,
            payload,
          );
        return response.data;
      },

      async getMyRegistration() {
        try {
          const response = await axiosInstance.get<GetStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER_ME,
          );
          return response.data;
        } catch (error: any) {
          if (error?.response?.status === 404) {
            return {
              success: false,
              data: null,
              message: "No student registration found",
            } as unknown as GetStudentRegistrationResponse;
          }
          throw error;
        }
      },

      async listAllRegistrations() {
        const response = await axiosInstance.get<ListStudentRegistrationsResponse>(
          ENDPOINTS.STUDENTS.REGISTER_ADMIN,
        );
        return response.data;
      },

      async getRegistrationById(id) {
        const response = await axiosInstance.get<GetStudentRegistrationResponse>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateRegistration(id, payload) {
        const response =
          await axiosInstance.patch<UpdateStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
            payload,
          );
        return response.data;
      },

      async deleteRegistration(id) {
        const response =
          await axiosInstance.delete<DeleteStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
          );
        return response.data;
      },
    };

    const StudentRegistrationDataHooks: IStudentRegistrationDataHooks = {
      useStudentRegistrationMe(options) {
        return useQuery({
          queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
          queryFn: async () => await StudentRegistrationService.getMyRegistration(),
          retry: false,
          ...options,
        });
      },

      useStudentRegistrationSubmit(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentRegistrationService.submitRegistration(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Profile registration completed successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            let msg = error.message || "Failed to submit registration.";
            if (typeof msg === "string" && (msg.includes("<html") || msg.includes("413"))) {
              msg = "फ़ाइल का साइज़ बहुत बड़ा है (File size too large). कृपया छोटे साइज़ की फ़ोटो या फ़ाइल अपलोड करें।";
            } else if (typeof msg === "string" && msg.toLowerCase().includes("timeout")) {
              msg = "अनुरोध का समय समाप्त हो गया (Request timed out). कृपया अपना इंटरनेट जांचें और पुनः प्रयास करें।";
            }
            toast.error(msg);
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useStudentRegistrationAdminList(options) {
        return useQuery({
          queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
          queryFn: async () =>
            await StudentRegistrationService.listAllRegistrations(),
          ...options,
        });
      },

      useStudentRegistrationDetails(id, options) {
        return useQuery({
          queryKey: STUDENT_REGISTRATION_QUERY_KEYS.DETAILS(id),
          queryFn: async () =>
            await StudentRegistrationService.getRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useStudentRegistrationUpdate(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await StudentRegistrationService.updateRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.DETAILS(variables.id),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Registration profile updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            let msg = error.message || "Failed to update registration profile.";
            if (typeof msg === "string" && (msg.includes("<html") || msg.includes("413"))) {
              msg = "फ़ाइल का साइज़ बहुत बड़ा है (File size too large). कृपया छोटे साइज़ की फ़ोटो या फ़ाइल अपलोड करें।";
            } else if (typeof msg === "string" && msg.toLowerCase().includes("timeout")) {
              msg = "अनुरोध का समय समाप्त हो गया (Request timed out). कृपया अपना इंटरनेट जांचें और पुनः प्रयास करें।";
            }
            toast.error(msg);
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useStudentRegistrationDelete(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await StudentRegistrationService.deleteRegistration(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.DETAILS(variables),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Registration profile deleted successfully.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to delete registration profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

    function useAuth() {
      return useContext(AuthContext);
    }

    const RegistrationPreview_4: React_3.FC<RegistrationPreviewProps_4> = ({
      studentData,
      photoPreview,
      signaturePreview,
      handlePrint,
      handleEditSubmission,
      handleBackToDashboard,
    }) => {
      const { user } = useAuth();
      const displayPhoto = photoPreview || studentData.photoBase64;
      const displaySignature = signaturePreview || studentData.signatureBase64;

      const [photoError, setPhotoError] = React_3.useState(false);
      const [sigError, setSigError] = React_3.useState(false);

      React_3.useEffect(() => {
        setPhotoError(false);
      }, [displayPhoto]);

      React_3.useEffect(() => {
        setSigError(false);
      }, [displaySignature]);

      return (
        <div className="bg-card border-border/80 animate-in fade-in overflow-hidden rounded-2xl border shadow-lg duration-300 print:border-0 print:bg-transparent print:shadow-none">
          {}
          <div className="flex flex-col items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white md:flex-row print:hidden">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <ShieldCheck className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  Profile Registration Completed
                </h2>
                <p className="mt-0.5 text-sm text-white/80">
                  Your internship profile details are verified and finalized.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-1.5 border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Printer className="size-4" /> Download PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditSubmission}
                className="gap-1.5 border-white/35 bg-white/15 text-white hover:bg-white/30"
              >
                <Edit2 className="size-3.5" /> Edit/Update
              </Button>
            </div>
          </div>

          {}
          <div className="mb-6 mt-4 hidden items-center justify-between border-b-2 border-emerald-600 pb-4 print:flex">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="iiInternship Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="text-right">
              <h2 className="text-foreground text-base font-bold uppercase">
                Student Registration Profile
              </h2>
              <p className="text-muted-foreground mt-0.5 text-[10px]">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-8 p-8 print:space-y-4 print:p-0">
            {}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 print:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-foreground pb-1 text-lg font-bold">
                  Personal Details
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm print:gap-y-1.5">
                  {[
                    { label: "Full Name", value: studentData.fullName },
                    {
                      label: "Student ID",
                      value: studentData.studentId,
                      className: "font-mono text-primary font-bold",
                    },
                    { label: "Father's Name", value: studentData.fatherName },
                    { label: "Mother's Name", value: studentData.motherName },
                    { label: "Date of Birth", value: studentData.dob },
                    { label: "Gender", value: studentData.gender },
                    { label: "Category", value: studentData.category },
                    {
                      label: "Aadhar No.",
                      value: studentData.aadharNo
                        ? `XXXX-XXXX-${studentData.aadharNo.slice(-4)}`
                        : "Not Declared",
                      className: "font-mono",
                    },
                    { label: "Mobile No.", value: studentData.mobileNo },
                    { label: "Email ID", value: user?.email || "Not Available" },
                  ].map((detail, idx) => (
                    <div key={idx}>
                      <span className="text-muted-foreground block text-xs">
                        {detail.label}
                      </span>
                      <span
                        className={`text-foreground font-semibold ${detail.className || ""}`}
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 print:col-span-1 print:justify-start">
                {}
                <div className="flex flex-col items-center gap-0.5">
                  <img
                    src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${studentData.studentId}&scale=2&rotate=N`}
                    alt="Student ID Barcode"
                    className="h-8 w-36 bg-white object-contain"
                  />
                  <span className="text-muted-foreground font-mono text-[9px] tracking-widest">
                    {studentData.studentId}
                  </span>
                </div>

                {}
                <div className="flex flex-col items-center gap-1.5">
                  {displayPhoto && !photoError ? (
                    <img
                      src={displayPhoto}
                      alt="Student Photo"
                      onError={() => setPhotoError(true)}
                      className="h-36 w-32 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="bg-muted text-muted-foreground flex h-36 w-32 items-center justify-center rounded-xl border border-dashed text-xs">
                      Photo Unavailable
                    </div>
                  )}
                  <span className="text-foreground text-xs font-bold">
                    Student Photo ID
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:break-inside-avoid print:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30 print:break-inside-avoid">
                <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold">
                  <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <MapPin_2 className="size-4" />
                  </div>
                  Local Address
                </h4>
                <div className="text-muted-foreground space-y-1.5 text-xs">
                  <p>
                    <span className="text-foreground font-medium">
                      Street/Local:
                    </span>{" "}
                    {studentData.localAddress?.local}
                  </p>
                  <p>
                    <span className="text-foreground font-medium">District:</span>{" "}
                    {studentData.localAddress?.district} (
                    {studentData.localAddress?.pinCode})
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      State/Country:
                    </span>{" "}
                    {studentData.localAddress?.state},{" "}
                    {studentData.localAddress?.country}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30 print:break-inside-avoid">
                <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold">
                  <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <MapPin_2 className="size-4" />
                  </div>
                  Permanent Address
                </h4>
                <div className="text-muted-foreground space-y-1.5 text-xs">
                  <p>
                    <span className="text-foreground font-medium">
                      Street/Local:
                    </span>{" "}
                    {studentData.permanentAddress?.local}
                  </p>
                  <p>
                    <span className="text-foreground font-medium">District:</span>{" "}
                    {studentData.permanentAddress?.district} (
                    {studentData.permanentAddress?.pinCode})
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      State/Country:
                    </span>{" "}
                    {studentData.permanentAddress?.state},{" "}
                    {studentData.permanentAddress?.country}
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-4 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30 print:break-inside-avoid print:space-y-2.5 print:p-4">
              <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <GraduationCap_2 className="size-4" />
                </div>
                Academic Qualifications
              </h4>
              <div className="bg-background overflow-hidden rounded-xl border border-zinc-200/60 shadow-inner dark:border-zinc-800/50">
                <ScrollArea className="w-full">
                  <table className="w-full min-w-[700px] caption-bottom text-sm">
                    <TableHeader>
                      <TableRow className="bg-muted hover:bg-muted text-muted-foreground text-xs font-bold">
                        <TableHead className="p-3">Qualification</TableHead>
                        <TableHead className="p-3">Course / Branch</TableHead>
                        <TableHead className="p-3">College & University</TableHead>
                        <TableHead className="p-3">Session / Year</TableHead>
                        <TableHead className="p-3">Grade / CGPA</TableHead>
                        <TableHead className="p-3 text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentData.academics?.map((ac, idx) => (
                        <TableRow
                          key={idx}
                          className="hover:bg-muted/10 border-b text-xs transition-colors last:border-0"
                        >
                          <TableCell className="text-foreground p-3 font-semibold">
                            {ac.qualification}
                          </TableCell>
                          <TableCell className="p-3">
                            {ac.stream} / {ac.subject}
                          </TableCell>
                          <TableCell className="p-3">
                            {ac.instituteName} / {ac.universityName}
                          </TableCell>
                          <TableCell className="p-3 font-mono">
                            {ac.sessionYear}
                          </TableCell>
                          <TableCell className="p-3">{ac.gradeDivision}</TableCell>
                          <TableCell className="p-3 text-right">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                ac.status === "Persuing"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                              }`}
                            >
                              {ac.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:break-inside-avoid print:grid-cols-2">
              <div className="space-y-3 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30 print:break-inside-avoid">
                <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <CheckCircle className="size-4" />
                  </div>
                  Post-Internship Objectives
                </h4>
                <div className="text-muted-foreground space-y-1.5 text-xs">
                  <p>What are Your Goals After the Internship?</p>
                  <p className="text-primary text-base font-bold">
                    {studentData.internshipGoal}
                  </p>
                </div>
              </div>
              {displaySignature && !sigError ? (
                <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30 print:break-inside-avoid print:gap-2 print:p-4">
                  <img
                    src={displaySignature}
                    alt="Signature Preview"
                    onError={() => setSigError(true)}
                    className="h-12 w-auto max-w-full object-contain"
                  />
                  <span className="text-foreground text-xs font-bold">
                    Finalized Signature Upload
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30 print:break-inside-avoid print:gap-2 print:p-4">
                  <span className="text-muted-foreground text-xs font-medium">
                    Signature Unavailable
                  </span>
                </div>
              )}
            </div>

            {}
            <div className="hidden items-center justify-between border-t-2 border-emerald-600 bg-white pb-1 pt-3 print:fixed print:bottom-0 print:left-0 print:right-0 print:flex">
              <p className="text-muted-foreground text-[10px]">
                © {new Date().getFullYear()} iiInternship. All rights reserved.
              </p>
              <p className="text-muted-foreground text-[10px]">
                This is a system-generated profile summary.
              </p>
            </div>

            {}
            <div className="border-border flex justify-end gap-3 border-t pt-6 print:hidden">
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
                className="h-10 gap-2 px-6"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    };
    const StepAcademicDetails: React_3.FC<StepAcademicDetailsProps> = ({
      academicFields,
      removeAcademic,
      tempAcademic,
      setTempAcademic,
      handleAddAcademic,
      qualificationsList,
      onNext,
      onPrev,
    }) => {
      const {
        formState: { errors },
      } = useFormContext<TStudentRegistration>();

      const handleEditAcademic = (index: number) => {
        const item = academicFields[index];
        if (!item) return;
        setTempAcademic({
          qualification: item.qualification || "",
          stream: item.stream || "",
          subject: item.subject || "",
          instituteName: item.instituteName || "",
          universityName: item.universityName || "",
          sessionYear: item.sessionYear || "",
          gradeDivision: item.gradeDivision || "",
          status: item.status || "Pass Out",
        });
        removeAcademic(index);
        toast.info("Qualification loaded into form for editing.");
      };

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              2. Academic Details
            </h2>
            <p className="text-muted-foreground text-xs">
              Add your qualifications list below. Add at least one record to
              continue.
            </p>
          </div>

          <Accordion type="multiple" className="w-full space-y-4">
            {}
            <AccordionItem
              value="add-qualification"
              className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Plus className="text-primary size-4" />
                  <span className="text-foreground text-sm font-bold">
                    Add New Qualification
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-border/60 h-auto space-y-4 border-t px-4 pb-4 pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Qualification <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select_9
                      value={tempAcademic.qualification}
                      onValueChange={(val) =>
                        setTempAcademic((prev) => ({ ...prev, qualification: val }))
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue_9 placeholder="Select Qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualificationsList.map((q) => (
                          <SelectItem key={q} value={q}>
                            {q}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select_9>
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Course / Degree Name{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. B.Tech, BCA, B.Sc, MCA, MBA"
                      value={tempAcademic.stream}
                      onChange={(e) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          stream: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Branch / Specialization{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. Computer Science Engineering, Finance, Economics"
                      value={tempAcademic.subject}
                      onChange={(e) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      College / Institute Name{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. Techno College"
                      value={tempAcademic.instituteName}
                      onChange={(e) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          instituteName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      University Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. MAKAUT"
                      value={tempAcademic.universityName}
                      onChange={(e) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          universityName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Session / Year <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. 2022-26 or 2024"
                      value={tempAcademic.sessionYear}
                      onChange={(e) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          sessionYear: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Grade / Percentage / CGPA{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. 85% or 9.0 CGPA"
                      value={tempAcademic.gradeDivision}
                      onChange={(e) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          gradeDivision: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Student Status <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select_9
                      value={tempAcademic.status}
                      onValueChange={(val) =>
                        setTempAcademic((prev) => ({
                          ...prev,
                          status: val as "Pass Out" | "Persuing",
                        }))
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue_9 placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pass Out">Pass Out</SelectItem>
                        <SelectItem value="Persuing">Persuing</SelectItem>
                      </SelectContent>
                    </Select_9>
                    <p className="text-muted-foreground text-[10px] italic">
                      Auto Selected Regarding Qualification Type
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={handleAddAcademic}
                    className="bg-primary hover:bg-primary/90 flex h-10 w-full items-center justify-center gap-1.5 px-6 font-semibold text-white shadow-sm sm:w-auto"
                  >
                    <Plus className="size-4" /> Add Qualification
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {}
            {academicFields.length > 0 && (
              <AccordionItem
                value="academics-list"
                className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30"
              >
                <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <GraduationCap_2 className="text-primary size-4" />
                    <span className="text-foreground text-sm font-bold">
                      Added Academic Qualifications (Total: {academicFields.length})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-border/60 h-auto border-t p-0">
                  <ScrollArea className="w-full">
                    <table className="w-full min-w-[750px] caption-bottom text-sm">
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted text-muted-foreground font-bold">
                          <TableHead className="p-3">Qualification</TableHead>
                          <TableHead className="p-3">Course / Branch</TableHead>
                          <TableHead className="p-3">Institute</TableHead>
                          <TableHead className="p-3">Year</TableHead>
                          <TableHead className="p-3">Status</TableHead>
                          <TableHead className="p-3 text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {academicFields.map((ac, idx) => (
                          <TableRow
                            key={ac.id}
                            className="hover:bg-muted/30 border-b last:border-0"
                          >
                            <TableCell className="text-foreground p-3 font-semibold">
                              {ac.qualification}
                            </TableCell>
                            <TableCell className="p-3">
                              {ac.stream} / {ac.subject}
                            </TableCell>
                            <TableCell className="p-3">
                              {ac.instituteName}
                            </TableCell>
                            <TableCell className="p-3 font-mono">
                              {ac.sessionYear}
                            </TableCell>
                            <TableCell className="p-3">
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                  ac.status === "Persuing"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                                }`}
                              >
                                {ac.status}
                              </span>
                            </TableCell>
                            <TableCell className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon-xs"
                                  onClick={() => handleEditAcademic(idx)}
                                  title="Edit Qualification"
                                  className="border-border hover:bg-accent hover:text-accent-foreground h-7 w-7 p-0"
                                >
                                  <Pencil className="size-3.5 text-blue-600 dark:text-blue-400" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon-xs"
                                  onClick={() => removeAcademic(idx)}
                                  title="Delete Qualification"
                                  className="h-7 w-7 p-0"
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          {}
          {errors.academics && (
            <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 rounded-lg border p-3 text-xs">
              <AlertCircle className="size-4" />
              <span>{getAcademicErrorMessage(errors)}</span>
            </div>
          )}

          {}
          <div className="border-border flex w-full items-center gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="h-10 flex-1 gap-2 px-4 sm:flex-initial"
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button
              type="button"
              onClick={onNext}
              className="bg-primary hover:bg-primary/95 active:scale-98 h-10 flex-1 gap-2 px-4 text-white shadow-md transition-all sm:flex-initial"
            >
              Save & Next <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };
    const StepBasicProfile: React_3.FC<StepBasicProfileProps> = ({
      sameAsLocal,
      onNext,
    }) => {
      const { control } = useFormContext<TStudentRegistration>();
      const [isCalendarOpen, setIsCalendarOpen] = React_3.useState(false);

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              1. Student Basic Profile
            </h2>
            <p className="text-muted-foreground text-xs">
              Please fill out your identity and contact coordinates.
            </p>
          </div>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="fullName"
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...formField} />
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
                  <Popover_4 open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger_4 asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn_10(
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
                    </PopoverTrigger_4>
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
                  </Popover_4>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fatherName"
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    Father&apos;s Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter father's name" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="motherName"
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    Mother&apos;s Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mother's name" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_10
                    key={field.value || "gender-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_10 placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                    </SelectContent>
                  </Select_10>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_10
                    key={field.value || "category-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_10 placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="SC/ST">SC/ST</SelectItem>
                      <SelectItem value="EWS">EWS</SelectItem>
                      <SelectItem value="Humanity">Humanity</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select_10>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <Accordion
            type="multiple"
            defaultValue={["local-address", "permanent-address"]}
            className="w-full space-y-4"
          >
            {}
            <AccordionItem
              value="local-address"
              className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin_2 className="text-primary size-4" />
                  <span className="text-foreground text-sm font-bold">
                    Local Address Details
                  </span>
                  <span className="text-destructive">*</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-border/60 h-auto space-y-4 border-t px-4 pb-4 pt-4">
                <FormField
                  control={control}
                  name="localAddress.local"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        House/Street/Local Address{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter street/area details"
                          className="focus-visible:bg-background border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      name: "localAddress.district",
                      label: "District",
                      placeholder: "District",
                    },
                    {
                      name: "localAddress.state",
                      label: "State",
                      placeholder: "State",
                    },
                    {
                      name: "localAddress.country",
                      label: "Country",
                      placeholder: "Country",
                    },
                    {
                      name: "localAddress.pinCode",
                      label: "Pin/Zip Code",
                      placeholder: "6-digit ZIP",
                      maxLength: 6,
                    },
                  ].map((subField) => (
                    <FormField
                      key={subField.name}
                      control={control}
                      name={
                        subField.name as
                          | "localAddress.district"
                          | "localAddress.state"
                          | "localAddress.country"
                          | "localAddress.pinCode"
                      }
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>
                            {subField.label}{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              maxLength={subField.maxLength}
                              placeholder={subField.placeholder}
                              className="focus-visible:bg-background border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                              {...formField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {}
            <FormField
              control={control}
              name="sameAsLocal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 px-1 py-1">
                  <FormControl>
                    <Checkbox
                      id="sameAsLocal"
                      checked={Boolean(field.value)}
                      onCheckedChange={(val) => field.onChange(Boolean(val))}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="sameAsLocal"
                    className="text-foreground cursor-pointer select-none text-xs font-semibold"
                  >
                    Same As Local Address
                  </FormLabel>
                </FormItem>
              )}
            />

            {}
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
                        House/Street/Permanent Address{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter street/area details"
                          disabled={sameAsLocal}
                          className="focus-visible:bg-background border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      name: "permanentAddress.district",
                      label: "District",
                      placeholder: "District",
                    },
                    {
                      name: "permanentAddress.state",
                      label: "State",
                      placeholder: "State",
                    },
                    {
                      name: "permanentAddress.country",
                      label: "Country",
                      placeholder: "Country",
                    },
                    {
                      name: "permanentAddress.pinCode",
                      label: "Pin/Zip Code",
                      placeholder: "6-digit ZIP",
                      maxLength: 6,
                    },
                  ].map((subField) => (
                    <FormField
                      key={subField.name}
                      control={control}
                      name={
                        subField.name as
                          | "permanentAddress.district"
                          | "permanentAddress.state"
                          | "permanentAddress.country"
                          | "permanentAddress.pinCode"
                      }
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>
                            {subField.label}{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              maxLength={subField.maxLength}
                              placeholder={subField.placeholder}
                              disabled={sameAsLocal}
                              className="focus-visible:bg-background border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                              {...formField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="mobileNo"
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    Mobile No. <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      maxLength={10}
                      type="tel"
                      placeholder="10-digit number"
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-border flex w-full justify-end border-t pt-4">
            <Button
              type="button"
              onClick={onNext}
              className="bg-primary hover:bg-primary/95 active:scale-98 h-10 w-full gap-2 px-6 text-white shadow-md transition-all sm:w-auto"
            >
              Save & Next <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };
    const StepDocuments_4: React_3.FC<StepDocumentsProps_4> = ({
      photoPreview,
      signaturePreview,
      handleFileChange,
      onPrev,
      isPending,
    }) => {
      const {
        control,
        watch,
        formState: { errors },
      } = useFormContext<TStudentRegistration>();

      const currentPhoto = watch("photoBase64");
      const currentPhotoName = watch("photoName");
      const currentSignature = watch("signatureBase64");
      const currentSignatureName = watch("signatureName");

      const [photoError, setPhotoError] = React_3.useState(false);
      const [sigError, setSigError] = React_3.useState(false);

      const displayPhoto = photoPreview || currentPhoto;
      const displaySignature = signaturePreview || currentSignature;
      const displayPhotoName = currentPhotoName || "Photo uploaded";
      const displaySignatureName = currentSignatureName || "Signature uploaded";

      React_3.useEffect(() => {
        setPhotoError(false);
      }, [displayPhoto]);

      React_3.useEffect(() => {
        setSigError(false);
      }, [displaySignature]);

      const onPhotoFileChange = (e: React_3.ChangeEvent<HTMLInputElement>) => {
        setPhotoError(false);
        handleFileChange(e, "photoBase64", "photoName");
      };

      const onSigFileChange = (e: React_3.ChangeEvent<HTMLInputElement>) => {
        setSigError(false);
        handleFileChange(e, "signatureBase64", "signatureName");
      };

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              4. Document & Uploads
            </h2>
            <p className="text-muted-foreground text-xs">
              Upload identification details and support documents (
              <span className="font-bold">Max 500 KB</span> per file).
            </p>
          </div>

          <FormField
            control={control}
            name="aadharNo"
            render={({
              field,
            }: {
              field: ControllerRenderProps<TStudentRegistration, "aadharNo">;
            }) => (
              <FormItem>
                <FormLabel>
                  Aadhar No.{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="12-digit UIDAI Number"
                    maxLength={12}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {}
            <div className="space-y-2">
              <FormLabel className="block text-sm font-semibold">
                Photo (Max. 500 KB) <span className="text-destructive">*</span>
              </FormLabel>

              <div className="border-border/80 hover:border-primary/50 bg-muted/10 relative flex min-h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPhotoFileChange}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                {displayPhoto && !photoError ? (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={displayPhoto}
                      alt="Photo Preview"
                      onError={() => setPhotoError(true)}
                      className="h-24 w-20 rounded border object-cover shadow-sm"
                    />
                    <span className="text-muted-foreground block max-w-[180px] truncate text-[10px] font-medium">
                      {displayPhotoName}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-1.5">
                    <div className="bg-primary/10 text-primary mb-1 rounded-full p-2.5">
                      <Upload className="size-5" />
                    </div>
                    <span className="text-foreground text-xs font-bold">
                      Choose Student Photo
                    </span>
                    <span className="text-muted-foreground block text-[10px]">
                      PNG, JPG or JPEG (Max. 500 KB)
                    </span>
                  </div>
                )}
              </div>

              {errors.photoBase64 && (
                <p className="text-destructive mt-1 text-xs font-medium">
                  {errors.photoBase64.message}
                </p>
              )}
            </div>

            {}
            <div className="space-y-2">
              <FormLabel className="block text-sm font-semibold">
                Signature (Max. 500 KB) <span className="text-destructive">*</span>
              </FormLabel>

              <div className="border-border/80 hover:border-primary/50 bg-muted/10 relative flex min-h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSigFileChange}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                {displaySignature && !sigError ? (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={displaySignature}
                      alt="Signature Preview"
                      onError={() => setSigError(true)}
                      className="h-12 w-auto max-w-[180px] rounded border bg-white object-contain p-1"
                    />
                    <span className="text-muted-foreground mt-1 block max-w-[180px] truncate text-[10px] font-medium">
                      {displaySignatureName}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-1.5">
                    <div className="bg-primary/10 text-primary mb-1 rounded-full p-2.5">
                      <Upload className="size-5" />
                    </div>
                    <span className="text-foreground text-xs font-bold">
                      Choose Student Signature
                    </span>
                    <span className="text-muted-foreground block text-[10px]">
                      PNG, JPG or JPEG (Max. 500 KB)
                    </span>
                  </div>
                )}
              </div>

              {errors.signatureBase64 && (
                <p className="text-destructive mt-1 text-xs font-medium">
                  {errors.signatureBase64.message}
                </p>
              )}
            </div>
          </div>

          {}
          <div className="bg-primary/[0.02] border-primary/20 space-y-3 rounded-xl border p-4">
            <h4 className="text-primary text-xs font-bold uppercase tracking-wider">
              Declaration & Terms
            </h4>

            <FormField
              control={control}
              name="agreeTerms"
              render={({
                field,
              }: {
                field: ControllerRenderProps<TStudentRegistration, "agreeTerms">;
              }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="leading-tight">
                    <FormLabel className="text-foreground cursor-pointer select-none text-xs font-bold">
                      I hereby declare that all values, certificates and documents
                      loaded are true to my knowledge.
                    </FormLabel>
                    <FormDescription className="mt-0.5 text-[10px]">
                      Agreeing to the Terms & Conditions of International Institute
                      of Internship
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {errors.agreeTerms && (
              <p className="text-destructive mt-1 text-xs font-semibold">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          {}
          <div className="border-border flex w-full items-center gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={onPrev}
              className="h-10 flex-1 gap-2 px-4 sm:flex-initial"
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/95 active:scale-98 h-10 flex-1 gap-2 px-6 text-white shadow-md sm:flex-initial"
            >
              {isPending ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  Final Submission <CheckCircle className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      );
    };
    const StepIndicator_4: React_2.FC<StepIndicatorProps_4> = ({
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
                  {}
                  {idx > 0 && (
                    <div
                      className={`absolute left-[-50%] right-[50%] top-5 -z-10 h-[3px] -translate-y-1/2 transition-all duration-500 ${
                        isCompleted || isActive ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}

                  {}
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

                  {}
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

export default function RegistrationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

    const [tempAcademic, setTempAcademic] = useState({
    qualification: "",
    stream: "",
    subject: "",
    instituteName: "",
    universityName: "",
    sessionYear: "",
    gradeDivision: "",
    status: "Pass Out" as "Pass Out" | "Persuing",
  });

    const form = useForm<TStudentRegistration>({
    resolver: zodResolver(
      ZStudentRegistration,
    ) as unknown as Resolver<TStudentRegistration>,
    defaultValues: {
      studentId: "",
      fullName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "" as any,
      category: "",
      localAddress: {
        local: "",
        district: "",
        state: "",
        country: "India",
        pinCode: "",
      },
      sameAsLocal: false,
      permanentAddress: {
        local: "",
        district: "",
        state: "",
        country: "India",
        pinCode: "",
      },
      mobileNo: "",
      academics: [],
      skills: [],
      internshipGoal: "Job",
      aadharNo: "",
      photoBase64: "",
      signatureBase64: "",
      photoName: "",
      signatureName: "",
      agreeTerms: false as unknown as true,
    },
  });

  const {
    fields: academicFields,
    append: appendAcademic,
    remove: removeAcademic,
  } = useFieldArray({
    control: form.control,
    name: "academics",
  });

  const [randomIdDigits, setRandomIdDigits] = useState<number | null>(null);

    const { data: regMeResponse, isLoading: isRegLoading } =
    StudentRegistrationDataHooks.useStudentRegistrationMe({
      enabled: !!userId,
    });

  const submitMutation =
    StudentRegistrationDataHooks.useStudentRegistrationSubmit();
  const updateMutation =
    StudentRegistrationDataHooks.useStudentRegistrationUpdate();

    useEffect(() => {
    if (isRegLoading || !userId) return;

    if (regMeResponse && regMeResponse.success && regMeResponse.data) {
      const mapped = mapResponseToForm(regMeResponse.data);
      form.reset(mapped);
      if (regMeResponse.data.photoUrl) {
        setPhotoPreview(regMeResponse.data.photoUrl);
        form.setValue("photoBase64", regMeResponse.data.photoUrl);
      }
      if (regMeResponse.data.signatureUrl) {
        setSignaturePreview(regMeResponse.data.signatureUrl);
        form.setValue("signatureBase64", regMeResponse.data.signatureUrl);
      }
      if (regMeResponse.data.photoName) {
        form.setValue("photoName", regMeResponse.data.photoName);
      }
      if (regMeResponse.data.signatureName) {
        form.setValue("signatureName", regMeResponse.data.signatureName);
      }

            if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("edit") === "true") {
          setIsFinalSubmitted(false);
          setCurrentStep(1);
          return;
        }
      }
      setIsFinalSubmitted(true);
    } else {
            const dataKey = `student_registration_data_${userId}`;
      const savedData = localStorage.getItem(dataKey);

      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          form.reset(parsed);
          if (parsed.photoBase64) setPhotoPreview(parsed.photoBase64);
          if (parsed.signatureBase64)
            setSignaturePreview(parsed.signatureBase64);
          toast.info("Restored registration progress from draft.");
        } catch (e) {
          console.error(e);
        }
      } else {
        if (user?.name) {
          form.setValue("fullName", user.name);
        }
        if (user?.mobile) {
          form.setValue("mobileNo", user.mobile);
        }
      }
    }
  }, [regMeResponse, isRegLoading, userId, form, user?.name, user?.mobile]);

    useEffect(() => {
    if (!userId || isRegLoading) return;
    if (regMeResponse && regMeResponse.success && regMeResponse.data) return; 

    const dataKey = `student_registration_data_${userId}`;
    const savedData = localStorage.getItem(dataKey);
    let digits = Math.floor(10000 + Math.random() * 90000); 

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.studentId) {
          const match = parsed.studentId.match(/\d+$/);
          if (match) {
            let extractedDigits = match[0];
            if (extractedDigits.length < 5) {
              extractedDigits = extractedDigits.padEnd(5, "1");
            } else if (extractedDigits.length > 5) {
              extractedDigits = extractedDigits.slice(-5);
            }
            digits = parseInt(extractedDigits, 10);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    setRandomIdDigits(digits);
  }, [userId, isRegLoading, regMeResponse]);

  const fullName = form.watch("fullName");

    useEffect(() => {
    if (randomIdDigits === null) return;
    const currentYear = new Date().getFullYear();
    const initials = getInitials(fullName);
    const generatedId = `S${currentYear}${initials}${randomIdDigits}`;
    form.setValue("studentId", generatedId);
  }, [fullName, randomIdDigits, form]);

    const saveDraft = () => {
    const currentValues = form.getValues();
    localStorage.setItem(
      `student_registration_data_${userId}`,
      JSON.stringify(currentValues),
    );
  };

    const sameAsLocal = form.watch("sameAsLocal");
  const localAddressValues = form.watch("localAddress");

  useEffect(() => {
    if (sameAsLocal) {
      form.setValue("permanentAddress", {
        local: localAddressValues.local || "",
        district: localAddressValues.district || "",
        state: localAddressValues.state || "",
        country: localAddressValues.country || "India",
        pinCode: localAddressValues.pinCode || "",
      });
    }
  }, [sameAsLocal, localAddressValues, form]);

    useEffect(() => {
    const qual = tempAcademic.qualification;
    if (qual.startsWith("Under")) {
      setTempAcademic((prev) => ({ ...prev, status: "Persuing" }));
    } else if (qual) {
      setTempAcademic((prev) => ({ ...prev, status: "Pass Out" }));
    }
  }, [tempAcademic.qualification]);

    const handleAddAcademic = () => {
    const validationResult = ZAcademicDetail.safeParse(tempAcademic);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      toast.error(firstError.message);
      return;
    }

    const {
      qualification,
      stream,
      subject,
      instituteName,
      universityName,
      sessionYear,
      gradeDivision,
      status,
    } = tempAcademic;

    appendAcademic({
      qualification,
      stream,
      subject,
      instituteName,
      universityName,
      sessionYear,
      gradeDivision,
      status,
    });

        setTempAcademic({
      qualification: "",
      stream: "",
      subject: "",
      instituteName: "",
      universityName: "",
      sessionYear: "",
      gradeDivision: "",
      status: "Pass Out",
    });
    toast.success("Academic qualification details added successfully.");
    saveDraft();
  };

    const handleFileChange = async (
    e: React_4.ChangeEvent<HTMLInputElement>,
    fieldName: "photoBase64" | "signatureBase64",
    nameField: "photoName" | "signatureName",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const toastId = toast.loading(`Compressing ${file.name}...`);
      const result = await processUploadedFile(file, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.72,
        maxPdfSizeKb: 1024,
      });

      form.setValue(fieldName, result.base64);
      form.setValue(nameField, result.fileName);

      if (fieldName === "photoBase64") {
        setPhotoPreview(result.base64);
      } else {
        setSignaturePreview(result.base64);
      }
      toast.dismiss(toastId);
      toast.success(
        result.isCompressed
          ? `${result.fileName} compressed & uploaded successfully (${result.fileSizeKb} KB).`
          : `${result.fileName} uploaded successfully (${result.fileSizeKb} KB).`,
      );
      saveDraft();
    } catch (err: any) {
      toast.error(err.message || "Failed to process file.");
      e.target.value = "";
    }
  };

    const handleNextStep = async () => {
    let fieldsToValidate: FieldPath<TStudentRegistration>[] = [];

    if (currentStep === 1) {
      if (sameAsLocal) {
        form.setValue("permanentAddress", { ...form.getValues("localAddress") });
      }
      fieldsToValidate = [
        "fullName",
        "fatherName",
        "motherName",
        "dob",
        "gender",
        "category",
        "localAddress.local",
        "localAddress.district",
        "localAddress.state",
        "localAddress.country",
        "localAddress.pinCode",
        "mobileNo",
      ];
      if (!sameAsLocal) {
        fieldsToValidate.push(
          "permanentAddress.local",
          "permanentAddress.district",
          "permanentAddress.state",
          "permanentAddress.country",
          "permanentAddress.pinCode",
        );
      }
    } else if (currentStep === 2) {
      const isTempAcademicFilled = Object.values(tempAcademic).some(
        (val) =>
          typeof val === "string" &&
          val.trim() !== "" &&
          val !== "Pass Out" &&
          val !== "Persuing",
      );
      if (academicFields.length === 0 && isTempAcademicFilled) {
        toast.warning(
          "Please click '+ Add Qualification' to add your qualification details before proceeding.",
        );
        return;
      }
      fieldsToValidate = ["academics"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["internshipGoal"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      saveDraft();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill all mandatory fields correctly to continue.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    const onSubmit = (values: TStudentRegistration) => {
    if (values.sameAsLocal && values.localAddress) {
      values.permanentAddress = {
        local: values.localAddress.local,
        block: values.localAddress.block || "",
        district: values.localAddress.district,
        state: values.localAddress.state,
        country: values.localAddress.country || "India",
        pinCode: values.localAddress.pinCode,
      };
    }
    if (regMeResponse && regMeResponse.success && regMeResponse.data) {
            const updatePayload: StudentRegistrationUpdatePayload = {
        fullName: values.fullName,
        fatherName: values.fatherName,
        motherName: values.motherName,
        dob: values.dob,
        gender: values.gender,
        category: values.category,
        localAddress: values.localAddress,
        sameAsLocal: values.sameAsLocal,
        permanentAddress: values.permanentAddress,
        mobileNo: values.mobileNo,
        academics: values.academics,
        internshipGoal: values.internshipGoal,
        aadharNo: values.aadharNo ?? undefined,
        agreeTerms: values.agreeTerms,
        photoBase64: values.photoBase64 || undefined,
        photoName: values.photoName || undefined,
        signatureBase64: values.signatureBase64 || undefined,
        signatureName: values.signatureName || undefined,
      };

      updateMutation.mutate(
        { id: regMeResponse.data.id, payload: updatePayload },
        {
          onSuccess: () => {
            setIsFinalSubmitted(true);
            localStorage.removeItem(`student_registration_data_${userId}`);
            if (typeof window !== "undefined") {
              const params = new URLSearchParams(window.location.search);
              if (params.get("edit") === "true") {
                router.push("/student/profile");
              }
            }
          },
        },
      );
    } else {
            const submitPayload: StudentRegistrationPayload = {
        fullName: values.fullName,
        fatherName: values.fatherName,
        motherName: values.motherName,
        dob: values.dob,
        gender: values.gender,
        category: values.category,
        localAddress: values.localAddress,
        sameAsLocal: values.sameAsLocal,
        permanentAddress: values.permanentAddress,
        mobileNo: values.mobileNo,
        academics: values.academics,
        internshipGoal: values.internshipGoal,
        aadharNo: values.aadharNo ?? undefined,
        photoBase64: values.photoBase64,
        photoName: values.photoName,
        signatureBase64: values.signatureBase64,
        signatureName: values.signatureName,
        agreeTerms: values.agreeTerms,
      };

      submitMutation.mutate(submitPayload, {
        onSuccess: () => {
          setIsFinalSubmitted(true);
          localStorage.removeItem(`student_registration_data_${userId}`);
        },
      });
    }
  };

  const handleEditSubmission = () => {
    setIsFinalSubmitted(false);
    setCurrentStep(1);
    toast.info("You can now update your registration profile fields.");
  };
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToDashboard = () => {
    router.replace("/student/dashboard");
  };
  if (isRegLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
        <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground text-sm font-medium">
          Loading registration profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl py-4 space-y-8">
      {isFinalSubmitted ? (
        <RegistrationPreview_4
          studentData={form.getValues()}
          photoPreview={photoPreview}
          signaturePreview={signaturePreview}
          handlePrint={handlePrint}
          handleEditSubmission={handleEditSubmission}
          handleBackToDashboard={handleBackToDashboard}
        />
      ) : (
        <div ref={formRef} id="registration-form-section" className="space-y-6 pt-4">
            <div className="space-y-1">
              <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                Student Registration Form
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm">
                Please complete your student profile registration details below.
              </p>
            </div>

            <StepIndicator_4 currentStep={currentStep} stepsInfo={stepsInfo} />

            <div className="bg-card/80 border-border/60 rounded-2xl border px-4 py-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl sm:p-6 md:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {currentStep === 1 && (
                    <StepBasicProfile
                      sameAsLocal={sameAsLocal}
                      onNext={handleNextStep}
                    />
                  )}

                  {currentStep === 2 && (
                    <StepAcademicDetails
                      academicFields={academicFields}
                      removeAcademic={removeAcademic}
                      tempAcademic={tempAcademic}
                      setTempAcademic={setTempAcademic}
                      handleAddAcademic={handleAddAcademic}
                      qualificationsList={qualificationsList_2}
                      onNext={handleNextStep}
                      onPrev={handlePrevStep}
                    />
                  )}

                  {currentStep === 3 && (
                    <StepSkills onNext={handleNextStep} onPrev={handlePrevStep} />
                  )}

                  {currentStep === 4 && (
                    <StepDocuments_4
                      photoPreview={photoPreview}
                      signaturePreview={signaturePreview}
                      handleFileChange={handleFileChange}
                      onPrev={handlePrevStep}
                      isPending={
                        submitMutation.isPending || updateMutation.isPending
                      }
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
