"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React_4, { useEffect, useState } from "react";
import { type FieldPath, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z as z_2 } from "zod";
import { AlertCircle, ArrowLeft, ArrowRight as ArrowRight_2, Briefcase as Briefcase_2, CalendarIcon, CheckCircle, Code, Download, Edit, Edit2, FileBadge, GraduationCap as GraduationCap_2, List, MapPin as MapPin_2, Pencil, Phone as Phone_2, Plus, Printer, Save, School, ShieldCheck, Trash2, Upload, Users as Users_2, Check, Clock, CalendarDays, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from "radix-ui";
import { FieldErrors, useFieldArray, useFormContext } from "react-hook-form";
import * as z_3 from "zod";
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

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

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

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

interface ApiSuccess<T> {
      success: boolean;
      data: T;
      message?: string;
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

type ImmersionApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

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

const ZInstructorAddress = z.object({
      local: z
        .string()
        .min(3, { message: "Local Address must be at least 3 characters." }),
      district: z.string().min(2, { message: "District is required." }),
      state: z.string().min(2, { message: "State is required." }),
      country: z.string().min(2, { message: "Country is required." }),
      pinCode: z
        .string()
        .regex(/^\d{6}$/, { message: "Pin code must be exactly 6 digits." }),
    });

const ZInstructorQualification = z.object({
      highestQualification: z
        .string()
        .min(1, { message: "Qualification is required." }),
      specialization: z
        .string()
        .min(1, { message: "Subject / Specialization is required." }),
      universityName: z
        .string()
        .min(2, { message: "University / Institution name is required." }),
      yearOfCompletion: z
        .string()
        .min(4, { message: "Year of Completion is required." }),
      percentage: z.string().min(1, { message: "Percentage / Grade is required." }),
    });

const ZInstructorRegistration = z.object({
      instructorId: z.string(),

        fullName: z
        .string()
        .min(2, { message: "Full Name must be at least 2 characters." }),
      fatherSpouseName: z
        .string()
        .min(2, { message: "Father's / Spouse's Name is required." }),
      dob: z.string().min(1, { message: "Date of Birth is required." }),
      gender: z.enum(["Male", "Female", "Transgender"], {
        message: "Gender is required.",
      }),
      mobileNo: z
        .string()
        .regex(/^\d{10}$/, { message: "Mobile No. must be 10 digits." }),
      alternateMobileNo: z
        .string()
        .regex(/^\d{10}$/, { message: "Alternate Mobile must be 10 digits." })
        .or(z.string().length(0))
        .optional(),
      currentAddress: ZInstructorAddress,
      sameAsCurrentAddress: z.boolean().default(false),
      permanentAddress: ZInstructorAddress.optional().or(z.any()),

        qualifications: z
        .array(ZInstructorQualification)
        .min(1, { message: "Please add at least one educational qualification." }),

        currentOrganization: z.string().optional().default(""),
      currentDesignation: z.string().optional().default(""),
      totalWorkExperience: z.string().optional().default(""),
      teachingExperience: z.string().optional().default(""),
      internshipExperience: z.string().optional().default(""),

        mentorshipAreas: z.string().min(5, {
        message: "Please describe your mentorship areas (min 5 chars).",
      }),
      preferredInternLevel: z
        .array(
          z.enum([
            "School Level",
            "Graduate Level",
            "Postgraduate Level",
            "Research/Professional Level",
          ]),
        )
        .min(1, { message: "Select at least one intern level." }),
      maxInterns: z
        .string()
        .min(1, { message: "Maximum number of interns is required." }),
      mentorshipMode: z
        .array(z.enum(["Online", "Offline/On Campus", "Hybrid"]))
        .min(1, { message: "Select at least one mentorship mode." }),
      availabilityDays: z
        .string()
        .min(1, { message: "Please specify availability (days)." }),
      availabilityTimeSlots: z
        .string()
        .min(1, { message: "Please specify availability (time slots)." }),
      availability: z
        .string()
        .min(3, { message: "Please specify your availability (days/time slots)." }),
      selfIntroduction: z.string().min(150, {
        message: "Self-introduction must be at least 150 words (characters).",
      }),

        photoBase64: z
        .string()
        .min(1, { message: "Passport size photo is required." }),
      photoName: z.string().min(1),
      identityProofBase64: z.string().optional().default(""),
      identityProofName: z.string().optional().default(""),
      educationCertBase64: z.string().optional().default(""),
      educationCertName: z.string().optional().default(""),
      experienceCertBase64: z.string().optional().default(""),
      experienceCertName: z.string().optional().default(""),

        agreeTerms: z.literal(true, {
        message: "You must agree to the declaration.",
      }),
    });

type TInstructorRegistration = z.infer<typeof ZInstructorRegistration>;

type FileField =
      | "photoBase64"
      | "identityProofBase64"
      | "educationCertBase64"
      | "experienceCertBase64";

type NameField =
      | "photoName"
      | "identityProofName"
      | "educationCertName"
      | "experienceCertName";

const ZInstructorQualification_2 = z_2.object({
      highestQualification: z_2
        .string()
        .min(1, { message: "Qualification is required." }),
      specialization: z_2
        .string()
        .min(1, { message: "Subject / Specialization is required." }),
      universityName: z_2
        .string()
        .min(2, { message: "University / Institution name is required." }),
      yearOfCompletion: z_2
        .string()
        .min(4, { message: "Year of Completion is required." }),
      percentage: z_2.string().min(1, { message: "Percentage / Grade is required." }),
    });

const mapResponseToForm = (data: InstructorRegistrationResponse) => {
      return {
        instructorId: data.instructorId || "",
        fullName: data.fullName || "",
        fatherSpouseName: data.fatherSpouseName || "",
        dob: data.dob || "",
        gender: (data.gender || "Male") as "Male" | "Female" | "Transgender",
        mobileNo: data.mobileNo || "",
        alternateMobileNo: data.alternateMobileNo || "",
        currentAddress: {
          local: data.currentAddressLocal || "",
          district: data.currentAddressDistrict || "",
          state: data.currentAddressState || "",
          country: data.currentAddressCountry || "India",
          pinCode: data.currentAddressPinCode || "",
        },
        sameAsCurrentAddress: data.sameAsCurrentAddress || false,
        permanentAddress: {
          local: data.permAddressLocal || "",
          district: data.permAddressDistrict || "",
          state: data.permAddressState || "",
          country: data.permAddressCountry || "India",
          pinCode: data.permAddressPinCode || "",
        },
        qualifications: data.qualifications || [],
        currentOrganization: data.currentOrganization || "",
        currentDesignation: data.currentDesignation || "",
        totalWorkExperience: data.totalWorkExperience || "",
        teachingExperience: data.teachingExperience || "",
        internshipExperience: data.internshipExperience || "",
        mentorshipAreas: data.mentorshipAreas || "",
        preferredInternLevel: (data.preferredInternLevel || []) as (
          | "School Level"
          | "Graduate Level"
          | "Postgraduate Level"
          | "Research/Professional Level"
        )[],
        maxInterns: data.maxInterns || "",
        mentorshipMode: (data.mentorshipMode || []) as (
          "Online" | "Offline/On Campus" | "Hybrid"
        )[],
        availabilityDays: (data.availability || "").split(", ")[0] || data.availability || "",
        availabilityTimeSlots: (data.availability || "").split(", ").slice(1).join(", ") || "",
        availability: data.availability || "",
        selfIntroduction: data.selfIntroduction || "",
        photoBase64: data.photoUrl || "",
        photoName: data.photoName || "",
        identityProofBase64: data.identityProofUrl || "",
        identityProofName: data.identityProofName || "",
        educationCertBase64: data.educationCertUrl || "",
        educationCertName: data.educationCertName || "",
        experienceCertBase64: data.experienceCertUrl || "",
        experienceCertName: data.experienceCertName || "",
        agreeTerms: !!data.agreeTerms as unknown as true,
      };
    };

const getInitials = (name: string): string => {
      if (!name) return "XX";
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "XX";
      if (parts.length === 1) {
        const word = parts[0];
        return word.length >= 2
          ? word.slice(0, 2).toUpperCase()
          : (word[0] + "X").toUpperCase();
      }
      return (
        (parts[0][0] || "") + (parts[parts.length - 1][0] || "")
      ).toUpperCase();
    };

type FileField_2 =
      | "photoBase64"
      | "identityProofBase64"
      | "educationCertBase64"
      | "experienceCertBase64";

type NameField_2 =
      | "photoName"
      | "identityProofName"
      | "educationCertName"
      | "experienceCertName";

interface RegistrationPreviewProps_2 {
      data: TInstructorRegistration;
      photoPreview: string | null;
      handlePrint: () => void;
      handleEditSubmission: () => void;
      handleBackToDashboard: () => void;
    }

interface StepDocumentsProps_2 {
      photoPreview: string | null;
      identityProofName: string;
      educationCertName: string;
      experienceCertName: string;
      handleFileChange: (
        e: React_3.ChangeEvent<HTMLInputElement>,
        fieldName: FileField,
        nameField: NameField,
        acceptedType?: "image" | "pdf" | "any",
      ) => void;
      onPrev: () => void;
      isSubmitting?: boolean;
    }

interface TempQualification {
      highestQualification: string;
      specialization: string;
      universityName: string;
      yearOfCompletion: string;
      percentage: string;
    }

interface StepEducationProps_2 {
      tempQualification: TempQualification;
      setTempQualification: React_3.Dispatch<React_3.SetStateAction<TempQualification>>;
      onAddQualification: () => void;
      onNext: () => void;
      onPrev: () => void;
    }

function Select_6({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_6({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

const qualificationOptions = [
      "Matriculation",
      "Intermediate",
      "Diploma",
      "Polytechnic",
      "Graduation",
      "Post Graduation",
      "M. Phil.",
      "Ph. D",
    ];

const getEducationErrorMessage = (
      errors: FieldErrors<TInstructorRegistration>,
    ): string | null => {
      if (!errors.qualifications) return null;
      if (
        "message" in errors.qualifications &&
        typeof errors.qualifications.message === "string"
      ) {
        return errors.qualifications.message;
      }

      const qualErrors = errors.qualifications as Record<string, unknown>;
      const keys = Object.keys(qualErrors);
      for (const key of keys) {
        const itemError = qualErrors[key];
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

      return "Please check the entered qualification details.";
    };

interface StepIndicatorProps_2 {
      currentStep: number;
      stepsInfo: { title: string; desc: string }[];
    }

interface StepPersonalInfoProps_2 {
      sameAsCurrentAddress: boolean;
      onNext: () => void;
    }

function Popover_2({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Root>) {
      return <PopoverPrimitive.Root data-slot="popover" {...props} />;
    }

function PopoverTrigger_2({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Trigger>) {
      return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
    }

function cn_8(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

function Select_7({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_7({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

interface StepProfessionalProps_2 {
      onNext: () => void;
      onPrev: () => void;
    }

const internLevels = [
      "School Level",
      "Graduate Level",
      "Postgraduate Level",
      "Research/Professional Level",
    ] as const;

const mentorshipModes = ["Online", "Offline/On Campus", "Hybrid"] as const;

const WEEKDAYS = [
  { key: "Mon", label: "Mon", full: "Monday" },
  { key: "Tue", label: "Tue", full: "Tuesday" },
  { key: "Wed", label: "Wed", full: "Wednesday" },
  { key: "Thu", label: "Thu", full: "Thursday" },
  { key: "Fri", label: "Fri", full: "Friday" },
  { key: "Sat", label: "Sat", full: "Saturday" },
  { key: "Sun", label: "Sun", full: "Sunday" },
];

const DAY_PRESETS = [
  { label: "Weekdays (Mon-Fri)", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  { label: "Weekends (Sat-Sun)", days: ["Sat", "Sun"] },
  { label: "Mon - Sat", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
  { label: "All 7 Days", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
];

const TIME_SLOT_PRESETS = [
  {
    slot: "09:00 AM – 12:00 PM",
    label: "Morning",
    desc: "09:00 AM – 12:00 PM",
    icon: Sunrise,
  },
  {
    slot: "02:00 PM – 05:00 PM",
    label: "Afternoon",
    desc: "02:00 PM – 05:00 PM",
    icon: Sun,
  },
  {
    slot: "04:00 PM – 06:00 PM",
    label: "Evening",
    desc: "04:00 PM – 06:00 PM",
    icon: Sunset,
  },
  {
    slot: "07:00 PM – 09:00 PM",
    label: "Night",
    desc: "07:00 PM – 09:00 PM",
    icon: Moon,
  },
  {
    slot: "Flexible Hours",
    label: "Flexible",
    desc: "Mutual Discussion",
    icon: Clock,
  },
];

const StepProfessional_2: React_3.FC<StepProfessionalProps_2> = ({
      onNext,
      onPrev,
    }) => {
      const { control, setValue, getValues, watch } =
        useFormContext<TInstructorRegistration>();

      const availabilityVal = watch("availability");
      const daysVal = watch("availabilityDays");
      const timeVal = watch("availabilityTimeSlots");

      React_3.useEffect(() => {
        if (availabilityVal && (!daysVal || !timeVal)) {
          const parts = availabilityVal.split(", ");
          if (!daysVal && parts[0]) {
            setValue("availabilityDays", parts[0], { shouldValidate: true });
          }
          if (!timeVal && parts.length > 1) {
            setValue("availabilityTimeSlots", parts.slice(1).join(", "), {
              shouldValidate: true,
            });
          }
        }
      }, [availabilityVal, daysVal, timeVal, setValue]);

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          {}
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              C. Professional Experience
            </h2>
            <p className="text-muted-foreground text-xs">
              Your professional background and teaching/training experience.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/30">
            <div className="text-foreground flex items-center gap-2">
              <Briefcase_2 className="text-primary size-4" />
              <span className="text-sm font-bold">Work Experience</span>
              <span className="text-muted-foreground text-xs">
                (All fields optional)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={control}
                name="currentOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Organization / Institution</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. XYZ University"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="currentDesignation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Designation / Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Assistant Professor"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="totalWorkExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Work Experience (in years)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 5"
                        type="number"
                        min={0}
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="teachingExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teaching / Training Experience (if any)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 3 years college teaching"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="internshipExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Previous Experience in Internship / Field-Based Training
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of any previous internship or field training experience..."
                      className="bg-background min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <div className="border-border border-b pb-3 pt-2">
            <h2 className="text-foreground text-xl font-bold">
              D. Mentorship Details
            </h2>
            <p className="text-muted-foreground text-xs">
              Define your mentorship preferences and availability.
            </p>
          </div>

          <div className="space-y-4">
            {}
            <FormField
              control={control}
              name="mentorshipAreas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Areas you can provide mentorship{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription className="text-[11px]">
                    e.g., Education, Social Work, Research, Administration,
                    Technology, Media, Management, etc.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="List all the domains / areas you can mentor in..."
                      className="bg-background min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {}
            <FormField
              control={control}
              name="preferredInternLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preferred level of interns you wish to mentor{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {internLevels.map((level) => (
                      <div
                        key={level}
                        className="border-border/60 hover:border-primary/40 flex items-center space-x-2 rounded-lg border bg-zinc-50/50 p-2.5 transition-colors dark:bg-zinc-900/30"
                      >
                        <Checkbox
                          id={`level-${level}`}
                          checked={field.value?.includes(level)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), level]);
                            } else {
                              field.onChange(
                                field.value?.filter((v) => v !== level) || [],
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`level-${level}`}
                          className="cursor-pointer select-none text-sm font-medium"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {}
              <FormField
                control={control}
                name="maxInterns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Max. number of interns you can mentor at a time{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users_2 className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                          type="number"
                          min={1}
                          placeholder="e.g. 5"
                          className="bg-background pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <div className="space-y-6 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/30">
              {/* AVAILABILITY (DAYS) */}
              <FormField
                control={control}
                name="availabilityDays"
                render={({ field }) => {
                  const currentDaysStr = field.value || "";
                  const selectedDays = WEEKDAYS.filter((d) =>
                    currentDaysStr.includes(d.key) ||
                    (currentDaysStr.toLowerCase().includes("weekday") && ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(d.key)) ||
                    (currentDaysStr.toLowerCase().includes("weekend") && ["Sat", "Sun"].includes(d.key)) ||
                    (currentDaysStr.toLowerCase().includes("all") && true)
                  ).map((d) => d.key);

                  const toggleDay = (dayKey: string) => {
                    let newSelected: string[];
                    if (selectedDays.includes(dayKey)) {
                      newSelected = selectedDays.filter((d) => d !== dayKey);
                    } else {
                      newSelected = [...selectedDays, dayKey].sort(
                        (a, b) =>
                          WEEKDAYS.findIndex((w) => w.key === a) -
                          WEEKDAYS.findIndex((w) => w.key === b)
                      );
                    }
                    const formatted = newSelected.join(", ");
                    field.onChange(formatted);
                    const time = getValues("availabilityTimeSlots") || "";
                    setValue("availability", formatted && time ? `${formatted}, ${time}` : formatted || time, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  };

                  const applyPreset = (presetDays: string[]) => {
                    const formatted = presetDays.join(", ");
                    field.onChange(formatted);
                    const time = getValues("availabilityTimeSlots") || "";
                    setValue("availability", formatted && time ? `${formatted}, ${time}` : formatted || time, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  };

                  return (
                    <FormItem className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <FormLabel className="flex items-center gap-1.5 font-bold text-foreground">
                          <CalendarDays className="size-4 text-primary" />
                          AVAILABILITY (DAYS) <span className="text-destructive">*</span>
                        </FormLabel>
                        {field.value && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                            {field.value}
                          </span>
                        )}
                      </div>

                      {/* Quick Presets */}
                      <div className="flex flex-wrap gap-1.5">
                        {DAY_PRESETS.map((p) => {
                          const isPresetActive =
                            p.days.length === selectedDays.length &&
                            p.days.every((d) => selectedDays.includes(d));
                          return (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => applyPreset(p.days)}
                              className={cn(
                                "text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all cursor-pointer",
                                isPresetActive
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm font-semibold"
                                  : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border/70"
                              )}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Individual Weekday Pills */}
                      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                        {WEEKDAYS.map((w) => {
                          const isSelected = selectedDays.includes(w.key);
                          return (
                            <button
                              key={w.key}
                              type="button"
                              onClick={() => toggleDay(w.key)}
                              className={cn(
                                "flex flex-col items-center justify-center py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                                isSelected
                                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-102"
                                  : "bg-background hover:bg-muted/60 text-foreground border-border/80 hover:border-primary/40"
                              )}
                            >
                              <span>{w.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* AVAILABILITY (TIME SLOTS) */}
              <FormField
                control={control}
                name="availabilityTimeSlots"
                render={({ field }) => {
                  const currentTime = field.value || "";
                  const isCustom =
                    currentTime !== "" &&
                    !TIME_SLOT_PRESETS.some((p) => p.slot === currentTime);

                  const selectSlot = (slot: string) => {
                    field.onChange(slot);
                    const days = getValues("availabilityDays") || "";
                    setValue(
                      "availability",
                      days && slot ? `${days}, ${slot}` : days || slot,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    );
                  };

                  return (
                    <FormItem className="space-y-3 pt-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <FormLabel className="flex items-center gap-1.5 font-bold text-foreground">
                          <Clock className="size-4 text-primary" />
                          AVAILABILITY (TIME SLOTS){" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        {field.value && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                            {field.value}
                          </span>
                        )}
                      </div>

                      {/* Time Slot Cards */}
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {TIME_SLOT_PRESETS.map((p) => {
                          const isSelected = currentTime === p.slot;
                          const Icon = p.icon;
                          return (
                            <button
                              key={p.slot}
                              type="button"
                              onClick={() => selectSlot(p.slot)}
                              className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                                isSelected
                                  ? "bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary"
                                  : "bg-background hover:bg-muted/40 text-foreground border-border/80 hover:border-primary/40"
                              )}
                            >
                              <div
                                className={cn(
                                  "p-2 rounded-lg shrink-0",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                <Icon className="size-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold">{p.label}</div>
                                <div className="text-[11px] text-muted-foreground truncate">
                                  {p.desc}
                                </div>
                              </div>
                              {isSelected && (
                                <CheckCircle className="size-4 text-primary shrink-0 ml-auto" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Time Slot Input */}
                      <div className="pt-1">
                        <Input
                          placeholder="Or type custom time (e.g. 05:30 PM – 07:30 PM)"
                          value={isCustom ? currentTime : ""}
                          className="bg-background text-xs"
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val);
                            const days = getValues("availabilityDays") || "";
                            setValue(
                              "availability",
                              days && val ? `${days}, ${val}` : days || val,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              }
                            );
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {}
            <FormField
              control={control}
              name="mentorshipMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preferred mode of mentorship{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {mentorshipModes.map((mode) => (
                      <div
                        key={mode}
                        className="border-border/60 hover:border-primary/40 flex items-center space-x-2 rounded-lg border bg-zinc-50/50 p-2.5 transition-colors dark:bg-zinc-900/30"
                      >
                        <Checkbox
                          id={`mode-${mode}`}
                          checked={field.value?.includes(mode)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), mode]);
                            } else {
                              field.onChange(
                                field.value?.filter((v) => v !== mode) || [],
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`mode-${mode}`}
                          className="cursor-pointer select-none text-sm font-medium"
                        >
                          {mode}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {}
            <FormField
              control={control}
              name="selfIntroduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Brief Self-Introduction / Your Perspective as a Mentor{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription className="text-[11px]">
                    150–1000 characters. Share your vision, approach, and motivation
                    for mentoring.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief self-introduction (150–1000 characters)..."
                      className="bg-background min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="mt-1 flex items-center justify-between">
                    <FormMessage />
                    <span
                      className={`ml-auto text-[10px] ${
                        (field.value?.length || 0) < 150
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {field.value?.length || 0} / 1000
                    </span>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="border-border flex items-center gap-3 border-t pt-4">
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
              className="bg-primary hover:bg-primary/95 h-10 flex-1 gap-2 px-6 text-white shadow-md sm:flex-initial"
            >
              Save & Next <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };

const handlePrint = () => window.print();

const stepsInfo = [
    { title: "Personal Info", desc: "Identity & Contacts" },
    { title: "Education", desc: "Qualifications" },
    { title: "Professional", desc: "Experience & Mentorship" },
    { title: "Documents", desc: "Uploads & Declaration" },
  ];

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
          retry: false,
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
            let msg = error.message || "Failed to update registration.";
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

    function useAuth() {
      return useContext(AuthContext);
    }

    const RegistrationPreview_2: React_3.FC<RegistrationPreviewProps_2> = ({
      data,
      photoPreview,
      handlePrint,
      handleEditSubmission,
      handleBackToDashboard,
    }) => {
      const { user } = useAuth();

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
                  Instructor Registration Completed
                </h2>
                <p className="mt-0.5 text-sm text-white/80">
                  Your profile has been finalized successfully.
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
                Instructor Registration Profile
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
                    { label: "Full Name", value: data.fullName },
                    {
                      label: "Instructor ID",
                      value: data.instructorId,
                      className: "font-mono text-primary font-bold",
                    },
                    {
                      label: "Father's / Spouse's Name",
                      value: data.fatherSpouseName,
                    },
                    { label: "Date of Birth", value: data.dob },
                    { label: "Gender", value: data.gender },
                    { label: "Mobile No.", value: data.mobileNo },
                    {
                      label: "Alternate Mobile",
                      value: data.alternateMobileNo || "Not Provided",
                    },
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
              <div className="flex flex-col items-center justify-start gap-4">
                {}
                <div className="flex flex-col items-center gap-0.5">
                  <img
                    src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${data.instructorId}&scale=2&rotate=N`}
                    alt="Instructor ID Barcode"
                    className="h-8 w-36 bg-white object-contain"
                  />
                  <span className="text-muted-foreground font-mono text-[9px] tracking-widest">
                    {data.instructorId}
                  </span>
                </div>
                {}
                <div className="flex flex-col items-center gap-1.5">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Instructor Photo"
                      className="h-36 w-32 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="bg-muted text-muted-foreground flex h-36 w-32 items-center justify-center rounded-xl border border-dashed text-xs">
                      Photo Unavailable
                    </div>
                  )}
                  <span className="text-foreground text-xs font-bold">
                    Instructor Photo
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:break-inside-avoid print:grid-cols-2">
              {[
                {
                  label: "Current Address",
                  addr: data.currentAddress,
                },
                {
                  label: "Permanent Address",
                  addr: data.permanentAddress,
                },
              ].map((a) => (
                <div
                  key={a.label}
                  className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30"
                >
                  <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold">
                    <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
                      <MapPin_2 className="size-4" />
                    </div>
                    {a.label}
                  </h4>
                  <div className="text-muted-foreground space-y-1.5 text-xs">
                    <p>
                      <span className="text-foreground font-medium">
                        Street/Local:
                      </span>{" "}
                      {a.addr?.local}
                    </p>

                    <p>
                      <span className="text-foreground font-medium">District:</span>{" "}
                      {a.addr?.district} ({a.addr?.pinCode})
                    </p>
                    <p>
                      <span className="text-foreground font-medium">
                        State/Country:
                      </span>{" "}
                      {a.addr?.state}, {a.addr?.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {}
            <div className="space-y-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30">
              <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap_2 className="size-4" />
                </div>
                Educational Qualifications
              </h4>
              <div className="bg-background overflow-hidden rounded-xl border border-zinc-200/60 shadow-inner dark:border-zinc-800/50">
                <ScrollArea className="w-full">
                  <table className="w-full min-w-[600px] caption-bottom text-sm">
                    <thead>
                      <tr className="bg-muted text-muted-foreground text-xs font-bold">
                        <th className="p-3 text-left">Qualification</th>
                        <th className="p-3 text-left">Specialization</th>
                        <th className="p-3 text-left">University / Institution</th>
                        <th className="p-3 text-left">Year</th>
                        <th className="p-3 text-left">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.qualifications?.map((q, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-muted/10 border-b text-xs transition-colors last:border-0"
                        >
                          <td className="text-foreground p-3 font-semibold">
                            {q.highestQualification}
                          </td>
                          <td className="p-3">{q.specialization}</td>
                          <td className="p-3">{q.universityName}</td>
                          <td className="p-3 font-mono">{q.yearOfCompletion}</td>
                          <td className="p-3">{q.percentage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30">
                <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
                    <Briefcase_2 className="size-4" />
                  </div>
                  Professional Experience
                </h4>
                <div className="text-muted-foreground space-y-1.5 text-xs">
                  {data.currentOrganization && (
                    <p>
                      <span className="text-foreground font-medium">
                        Organization:
                      </span>{" "}
                      {data.currentOrganization}
                    </p>
                  )}
                  {data.currentDesignation && (
                    <p>
                      <span className="text-foreground font-medium">
                        Designation:
                      </span>{" "}
                      {data.currentDesignation}
                    </p>
                  )}
                  {data.totalWorkExperience && (
                    <p>
                      <span className="text-foreground font-medium">
                        Total Experience:
                      </span>{" "}
                      {data.totalWorkExperience} years
                    </p>
                  )}
                  {data.teachingExperience && (
                    <p>
                      <span className="text-foreground font-medium">
                        Teaching Exp.:
                      </span>{" "}
                      {data.teachingExperience}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30">
                <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
                    <Users_2 className="size-4" />
                  </div>
                  Mentorship Details
                </h4>
                <div className="text-muted-foreground space-y-1.5 text-xs">
                  <p>
                    <span className="text-foreground font-medium">
                      Max Interns:
                    </span>{" "}
                    {data.maxInterns}
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      Availability:
                    </span>{" "}
                    {data.availability}
                  </p>
                  <p>
                    <span className="text-foreground font-medium">Mode:</span>{" "}
                    {data.mentorshipMode?.join(", ")}
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      Intern Level:
                    </span>{" "}
                    {data.preferredInternLevel?.join(", ")}
                  </p>
                  <p>
                    <span className="text-foreground font-medium">Areas:</span>{" "}
                    {data.mentorshipAreas}
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="bg-muted/30 border-border/40 flex items-center justify-between gap-3 rounded-xl border p-4 text-xs">
              <span className="mx-auto font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Declaration Agreed
              </span>
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
    const StepDocuments_2: React_3.FC<StepDocumentsProps_2> = ({
      photoPreview,
      identityProofName,
      educationCertName,
      experienceCertName,
      handleFileChange,
      onPrev,
      isSubmitting = false,
    }) => {
      const {
        control,
        formState: { errors },
      } = useFormContext<TInstructorRegistration>();

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          {}
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              E. Document Upload
            </h2>
            <p className="text-muted-foreground text-xs">
              Upload required documents. Max{" "}
              <span className="font-bold">500 KB</span> per file.
            </p>
          </div>

          {}
          <div className="space-y-2">
            <FormLabel className="block text-sm font-semibold">
              Passport Size Photograph <span className="text-destructive">*</span>
            </FormLabel>
            <div className="border-border/80 hover:border-primary/50 bg-muted/10 relative flex min-h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e, "photoBase64", "photoName", "image")
                }
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              />
              {photoPreview ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={photoPreview}
                    alt="Photo Preview"
                    className="h-24 w-20 rounded border object-cover shadow-sm"
                  />
                  <span className="text-muted-foreground text-[10px] font-medium">
                    Photo uploaded ✓
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="bg-primary/10 text-primary mb-1 rounded-full p-2.5">
                    <Upload className="size-5" />
                  </div>
                  <span className="text-foreground text-xs font-bold">
                    Choose Passport Size Photo
                  </span>
                  <span className="text-muted-foreground text-[10px]">
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
          <div className="space-y-4">
            {[
              {
                label: "Identity Proof (Aadhaar / Any Valid ID)",
                required: false,
                fileField: "identityProofBase64" as FileField,
                nameField: "identityProofName" as NameField,
                currentName: identityProofName,
                accept: "any" as const,
                placeholder: "PDF, JPG, PNG (Max. 500 KB)",
                icon: FileBadge,
              },
              {
                label: "Educational Certificates (PDF)",
                required: false,
                fileField: "educationCertBase64" as FileField,
                nameField: "educationCertName" as NameField,
                currentName: educationCertName,
                accept: "pdf" as const,
                placeholder: "PDF file (Max. 500 KB)",
                icon: FileBadge,
              },
              {
                label: "Experience Certificates",
                required: false,
                fileField: "experienceCertBase64" as FileField,
                nameField: "experienceCertName" as NameField,
                currentName: experienceCertName,
                accept: "any" as const,
                placeholder: "PDF, JPG, PNG (Max. 500 KB)",
                icon: FileBadge,
              },
            ].map((doc) => (
              <div
                key={doc.fileField}
                className="border-border/60 flex items-center justify-between gap-4 rounded-xl border bg-zinc-50/50 p-4 dark:bg-zinc-900/30"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
                    <doc.icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-semibold">
                      {doc.label}
                      {!doc.required && (
                        <span className="text-muted-foreground ml-1 text-xs font-normal">
                          (Optional)
                        </span>
                      )}
                    </p>
                    <p className="text-muted-foreground truncate text-[10px]">
                      {doc.currentName ? (
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          ✓ {doc.currentName}
                        </span>
                      ) : (
                        doc.placeholder
                      )}
                    </p>
                  </div>
                </div>
                <label className="shrink-0">
                  <span className="text-primary border-primary/30 bg-primary/5 hover:bg-primary/10 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors">
                    <Upload className="size-3.5" /> Add
                  </span>
                  <input
                    type="file"
                    accept={
                      doc.accept === "pdf"
                        ? "application/pdf"
                        : "image/*,application/pdf"
                    }
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e, doc.fileField, doc.nameField, doc.accept)
                    }
                  />
                </label>
              </div>
            ))}
          </div>

          {}
          <div className="border-border border-b pb-3 pt-2">
            <h2 className="text-foreground text-xl font-bold">F. Declaration</h2>
          </div>

          <div className="bg-primary/[0.02] border-primary/20 space-y-4 rounded-xl border p-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              I declare that all the information provided above is true to the best
              of my knowledge. I agree to the rules and objectives of the
              International Institute of Internship and commit to following all
              guidelines. I am committed to maintaining discipline, punctuality, and
              ethical conduct with students and trainees. I am also willing to
              cooperate in the feedback, evaluation, and certification process at
              the end of the internship period.
            </p>
            <p className="text-primary text-xs font-semibold italic">
              I am excited to work as a mentor/instructor at the International
              Institute of Internship.
            </p>

            <FormField
              control={control}
              name="agreeTerms"
              render={({ field }) => (
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
                      I Agree to the above declaration.
                    </FormLabel>
                    <FormDescription className="mt-0.5 text-[10px]">
                      Agreeing to the Terms & Conditions of India International
                      Internship.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {errors.agreeTerms && (
              <p className="text-destructive text-xs font-semibold">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          {}
          <div className="border-border flex items-center gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="h-10 flex-1 gap-2 px-4 sm:flex-initial"
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/95 h-10 flex-1 cursor-pointer gap-2 px-4 text-white shadow-md sm:flex-initial"
            >
              {isSubmitting ? "Submitting..." : "Final Submission"}{" "}
              <CheckCircle className="size-4" />
            </Button>
          </div>
        </div>
      );
    };
    const StepEducation_2: React_3.FC<StepEducationProps_2> = ({
      tempQualification,
      setTempQualification,
      onAddQualification,
      onNext,
      onPrev,
    }) => {
      const {
        control,
        formState: { errors },
      } = useFormContext<TInstructorRegistration>();
      const { fields, remove } = useFieldArray({
        control,
        name: "qualifications",
      });

      const handleEditQualification = (index: number) => {
        const item = fields[index];
        if (!item) return;
        setTempQualification({
          highestQualification: item.highestQualification || "",
          specialization: item.specialization || "",
          universityName: item.universityName || "",
          yearOfCompletion: item.yearOfCompletion || "",
          percentage: item.percentage || "",
        });
        remove(index);
        toast.info("Qualification loaded into form for editing.");
      };

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              B. Educational Qualifications
            </h2>
            <p className="text-muted-foreground text-xs">
              Add all your educational qualifications. At least one is required to
              continue.
            </p>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["add-qualification"]}
            className="w-full space-y-4"
          >
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
                      Highest Qualification{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select_6
                      value={tempQualification.highestQualification}
                      onValueChange={(val) =>
                        setTempQualification((p) => ({
                          ...p,
                          highestQualification: val,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue_6 placeholder="Select Qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualificationOptions.map((q) => (
                          <SelectItem key={q} value={q}>
                            {q}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select_6>
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Subject / Area of Specialization{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. Computer Science, Sociology"
                      value={tempQualification.specialization}
                      onChange={(e) =>
                        setTempQualification((p) => ({
                          ...p,
                          specialization: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Name of University / Institution{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="University or College name"
                      value={tempQualification.universityName}
                      onChange={(e) =>
                        setTempQualification((p) => ({
                          ...p,
                          universityName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2">
                    <FormLabel>
                      Year of Completion <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. 2020"
                      maxLength={4}
                      value={tempQualification.yearOfCompletion}
                      onChange={(e) =>
                        setTempQualification((p) => ({
                          ...p,
                          yearOfCompletion: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {}
                  <div className="space-y-2 sm:col-span-2">
                    <FormLabel>
                      Percentage / Grade <span className="text-destructive">*</span>
                    </FormLabel>
                    <Input
                      placeholder="e.g. 75%, A+, 8.5 CGPA"
                      value={tempQualification.percentage}
                      onChange={(e) =>
                        setTempQualification((p) => ({
                          ...p,
                          percentage: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={onAddQualification}
                    className="bg-primary hover:bg-primary/90 flex h-10 w-full items-center justify-center gap-1.5 px-6 font-semibold text-white shadow-sm sm:w-auto"
                  >
                    <Plus className="size-4" /> Add Qualification
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {}
            {fields.length > 0 && (
              <AccordionItem
                value="academics-list"
                className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner transition-colors duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/30"
              >
                <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <GraduationCap_2 className="text-primary size-4" />
                    <span className="text-foreground text-sm font-bold">
                      Added Academic Qualifications (Total: {fields.length})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-border/60 h-auto border-t p-0">
                  <ScrollArea className="w-full">
                    <table className="w-full min-w-[750px] caption-bottom text-sm">
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted text-muted-foreground font-bold">
                          <TableHead className="p-3">Qualification</TableHead>
                          <TableHead className="p-3">Specialization</TableHead>
                          <TableHead className="p-3">
                            Institute/University
                          </TableHead>
                          <TableHead className="p-3">Year</TableHead>
                          <TableHead className="p-3">Grade</TableHead>
                          <TableHead className="p-3 text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fields.map((field, idx) => (
                          <TableRow
                            key={field.id}
                            className="hover:bg-muted/30 border-b last:border-0"
                          >
                            <TableCell className="text-foreground p-3 font-semibold">
                              {field.highestQualification}
                            </TableCell>
                            <TableCell className="p-3">
                              {field.specialization}
                            </TableCell>
                            <TableCell className="p-3">
                              {field.universityName}
                            </TableCell>
                            <TableCell className="p-3 font-mono">
                              {field.yearOfCompletion}
                            </TableCell>
                            <TableCell className="p-3">
                              {field.percentage}
                            </TableCell>
                            <TableCell className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon-xs"
                                  onClick={() => handleEditQualification(idx)}
                                  title="Edit Qualification"
                                  className="border-border hover:bg-accent hover:text-accent-foreground h-7 w-7 p-0"
                                >
                                  <Pencil className="size-3.5 text-blue-600 dark:text-blue-400" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon-xs"
                                  onClick={() => {
                                    remove(idx);
                                    toast.info("Qualification removed.");
                                  }}
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
          {errors.qualifications && (
            <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 rounded-lg border p-3 text-xs">
              <AlertCircle className="size-4" />
              <span>{getEducationErrorMessage(errors)}</span>
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
              className="bg-primary hover:bg-primary/95 active:scale-98 h-10 flex-1 gap-2 px-6 text-white shadow-md transition-all sm:flex-initial"
            >
              Save & Next <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };
    const StepIndicator_2: React_2.FC<StepIndicatorProps_2> = ({
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
    const StepPersonalInfo_2: React_3.FC<StepPersonalInfoProps_2> = ({
      sameAsCurrentAddress,
      onNext,
    }) => {
      const { control } = useFormContext<TInstructorRegistration>();
      const [isCalendarOpen, setIsCalendarOpen] = React_3.useState(false);

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              A. Personal Information
            </h2>
            <p className="text-muted-foreground text-xs">
              Please fill out your identity and contact details.
            </p>
          </div>

          {}
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
                    <Input placeholder="Enter your full name" {...field} />
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
                  <Popover_2 open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger_2 asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn_8(
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
                    </PopoverTrigger_2>
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
                  </Popover_2>
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
                    Father&apos;s / Spouse&apos;s Name{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter father's or spouse's name"
                      {...field}
                    />
                  </FormControl>
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
                  <Select_7
                    key={field.value || "gender-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_7 placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                    </SelectContent>
                  </Select_7>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mobile Number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone_2 className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        maxLength={10}
                        type="tel"
                        placeholder="10-digit number"
                        className="pl-9"
                        {...field}
                      />
                    </div>
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
                  <FormLabel>
                    Alternate Mobile Number{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone_2 className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        maxLength={10}
                        type="tel"
                        placeholder="10-digit number"
                        className="pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <Accordion
            type="multiple"
            defaultValue={["current-address", "permanent-address"]}
            className="w-full space-y-4"
          >
            {}
            <AccordionItem
              value="current-address"
              className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin_2 className="text-primary size-4" />
                  <span className="text-foreground text-sm font-bold">
                    Current Address
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
                        House / Street / Local{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter street/area details"
                          className="border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
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
                      name: "currentAddress.district",
                      label: "District",
                      placeholder: "District",
                    },
                    {
                      name: "currentAddress.state",
                      label: "State",
                      placeholder: "State",
                    },
                    {
                      name: "currentAddress.country",
                      label: "Country",
                      placeholder: "Country",
                    },
                    {
                      name: "currentAddress.pinCode",
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
                          | "currentAddress.district"
                          | "currentAddress.state"
                          | "currentAddress.country"
                          | "currentAddress.pinCode"
                      }
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel>
                            {subField.label}{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              maxLength={subField.maxLength}
                              placeholder={subField.placeholder}
                              className="border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                              {...f}
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
              name="sameAsCurrentAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 px-1 py-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-muted-foreground cursor-pointer select-none text-xs font-semibold">
                    Permanent Address same as Current Address
                  </FormLabel>
                </FormItem>
              )}
            />

            {}
            <AccordionItem
              value="permanent-address"
              className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin_2 className="text-primary size-4" />
                  <span className="text-foreground text-sm font-bold">
                    Permanent Address (if different)
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
                        House / Street / Local{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter street/area details"
                          disabled={sameAsCurrentAddress}
                          className="border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
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
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel>
                            {subField.label}{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              maxLength={subField.maxLength}
                              placeholder={subField.placeholder}
                              disabled={sameAsCurrentAddress}
                              className="border border-zinc-200/80 bg-zinc-100/60 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                              {...f}
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

          <div className="border-border flex justify-end border-t pt-4">
            <Button
              type="button"
              onClick={onNext}
              className="bg-primary hover:bg-primary/95 h-10 w-full gap-2 px-6 text-white shadow-md transition-all sm:w-auto"
            >
              Save & Next <ArrowRight_2 className="size-4" />
            </Button>
          </div>
        </div>
      );
    };

export default function InstructorRegistrationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

  const { data: regMeResponse, isLoading: isRegLoading } =
    InstructorDataHooks.useInstructorRegistrationMe({
      enabled: !!userId,
    });

  const { mutate: submitRegistration, isPending: isSubmitting } =
    InstructorDataHooks.useSubmitInstructorRegistration();
  const { mutate: updateRegistration, isPending: isUpdating } =
    InstructorDataHooks.useUpdateInstructorRegistration();

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [identityProofName, setIdentityProofName] = useState("");
  const [educationCertName, setEducationCertName] = useState("");
  const [experienceCertName, setExperienceCertName] = useState("");

    const [tempQualification, setTempQualification] = useState({
    highestQualification: "",
    specialization: "",
    universityName: "",
    yearOfCompletion: "",
    percentage: "",
  });

  const [randomIdDigits, setRandomIdDigits] = useState<number | null>(null);

    const form = useForm<TInstructorRegistration>({
    resolver: zodResolver(
      ZInstructorRegistration,
    ) as unknown as Resolver<TInstructorRegistration>,
    defaultValues: {
      instructorId: "",
      fullName: "",
      fatherSpouseName: "",
      dob: "",
      gender: "Male",
      mobileNo: "",
      alternateMobileNo: "",
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
      currentOrganization: "",
      currentDesignation: "",
      totalWorkExperience: "",
      teachingExperience: "",
      internshipExperience: "",
      mentorshipAreas: "",
      preferredInternLevel: [],
      maxInterns: "",
      mentorshipMode: [],
      availabilityDays: "",
      availabilityTimeSlots: "",
      availability: "",
      selfIntroduction: "",
      photoBase64: "",
      photoName: "",
      identityProofBase64: "",
      identityProofName: "",
      educationCertBase64: "",
      educationCertName: "",
      experienceCertBase64: "",
      experienceCertName: "",
      agreeTerms: false as unknown as true,
    },
  });

    useEffect(() => {
    if (isRegLoading || !userId) return;

    const isEditMode =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("edit") === "true";

    if (regMeResponse && regMeResponse.success && regMeResponse.data) {
      const mapped = mapResponseToForm(regMeResponse.data);
      form.reset(mapped);
      if (regMeResponse.data.photoUrl)
        setPhotoPreview(regMeResponse.data.photoUrl);
      if (regMeResponse.data.identityProofName)
        setIdentityProofName(regMeResponse.data.identityProofName);
      if (regMeResponse.data.educationCertName)
        setEducationCertName(regMeResponse.data.educationCertName);
      if (regMeResponse.data.experienceCertName)
        setExperienceCertName(regMeResponse.data.experienceCertName);

      localStorage.setItem(
        `instructor_registration_complete_${userId}`,
        "true",
      );

      if (isEditMode) {
        setIsFinalSubmitted(false);
        setCurrentStep(1);
      } else {
        setIsFinalSubmitted(true);
      }
    } else {
      const dataKey = `instructor_registration_data_${userId}`;
      const completeKey = `instructor_registration_complete_${userId}`;

      const savedData = localStorage.getItem(dataKey);
      const isCompleted = localStorage.getItem(completeKey);

            if (isCompleted === "true" && !isEditMode) {
        router.replace("/instructor/dashboard");
        return;
      }

      let digits = Math.floor(10000 + Math.random() * 90000);

      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.instructorId) {
            const match = parsed.instructorId.match(/\d+$/);
            if (match) {
              let extracted = match[0];
              if (extracted.length < 5) extracted = extracted.padEnd(5, "1");
              else if (extracted.length > 5) extracted = extracted.slice(-5);
              digits = parseInt(extracted, 10);
            }
          }
          form.reset(parsed);
          if (parsed.photoBase64) setPhotoPreview(parsed.photoBase64);
          if (parsed.identityProofName)
            setIdentityProofName(parsed.identityProofName);
          if (parsed.educationCertName)
            setEducationCertName(parsed.educationCertName);
          if (parsed.experienceCertName)
            setExperienceCertName(parsed.experienceCertName);
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

      setRandomIdDigits(digits);
    }
  }, [form, router, userId, isRegLoading, regMeResponse, user?.name, user?.mobile]);

    const fullName = form.watch("fullName");
  useEffect(() => {
    if (randomIdDigits === null) return;
    const year = new Date().getFullYear();
    const initials = getInitials(fullName);
    form.setValue("instructorId", `I${year}${initials}${randomIdDigits}`);
  }, [fullName, randomIdDigits, form]);

    const sameAsCurrentAddress = form.watch("sameAsCurrentAddress");
  const currentAddressValues = form.watch("currentAddress");
  useEffect(() => {
    if (sameAsCurrentAddress) {
      form.setValue("permanentAddress", {
        local: currentAddressValues.local || "",
        district: currentAddressValues.district || "",
        state: currentAddressValues.state || "",
        country: currentAddressValues.country || "India",
        pinCode: currentAddressValues.pinCode || "",
      });
    }
  }, [sameAsCurrentAddress, currentAddressValues, form]);

    const saveDraft = () => {
    localStorage.setItem(
      `instructor_registration_data_${userId}`,
      JSON.stringify(form.getValues()),
    );
  };

    const handleFileChange = async (
    e: React_4.ChangeEvent<HTMLInputElement>,
    fieldName: FileField_2,
    nameField: NameField_2,
    _acceptedType?: "image" | "pdf" | "any",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (_acceptedType && _acceptedType !== "any") {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";
      if (_acceptedType === "image" && !isImage) {
        toast.error("Please upload an image file (PNG/JPG).");
        e.target.value = "";
        return;
      }
      if (_acceptedType === "pdf" && !isPdf) {
        toast.error("Please upload a PDF file.");
        e.target.value = "";
        return;
      }
    }

    try {
      const isImage = file.type.startsWith("image/");
      const toastId = toast.loading(
        isImage ? `Compressing and preparing ${file.name}...` : `Uploading ${file.name}...`,
      );

      const result = await processUploadedFile(file, {
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 0.72,
        maxPdfSizeKb: 1024,
      });

      form.setValue(fieldName, result.base64);
      form.setValue(nameField, result.fileName);

      if (fieldName === "photoBase64") setPhotoPreview(result.base64);
      if (nameField === "identityProofName") setIdentityProofName(result.fileName);
      if (nameField === "educationCertName") setEducationCertName(result.fileName);
      if (nameField === "experienceCertName") setExperienceCertName(result.fileName);

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

    const handleAddQualification = () => {
    const result = ZInstructorQualification_2.safeParse(tempQualification);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const existing = form.getValues("qualifications") || [];
    form.setValue("qualifications", [...existing, tempQualification]);
    setTempQualification({
      highestQualification: "",
      specialization: "",
      universityName: "",
      yearOfCompletion: "",
      percentage: "",
    });
    toast.success("Qualification added successfully.");
    saveDraft();
  };

    const handleNextStep = async () => {
    let fieldsToValidate: FieldPath<TInstructorRegistration>[] = [];

    if (currentStep === 1) {
      if (form.getValues("sameAsCurrentAddress")) {
        form.setValue("permanentAddress", { ...form.getValues("currentAddress") });
      }
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
      if (!form.getValues("sameAsCurrentAddress")) {
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
      fieldsToValidate = [
        "mentorshipAreas",
        "preferredInternLevel",
        "maxInterns",
        "mentorshipMode",
        "availabilityDays",
        "availabilityTimeSlots",
        "availability",
        "selfIntroduction",
      ];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((p) => p + 1);
      saveDraft();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill all mandatory fields correctly to continue.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    const onSubmit = (values: TInstructorRegistration) => {
    if (values.sameAsCurrentAddress && values.currentAddress) {
      values.permanentAddress = { ...values.currentAddress };
    }
    if (!values.availability) {
      const parts = [values.availabilityDays, values.availabilityTimeSlots].filter(Boolean);
      if (parts.length > 0) {
        values.availability = parts.join(", ");
      }
    }
    if (regMeResponse && regMeResponse.success && regMeResponse.data) {
      const updatePayload: InstructorRegistrationUpdatePayload = {
        fullName: values.fullName,
        fatherSpouseName: values.fatherSpouseName,
        dob: values.dob,
        gender: values.gender,
        mobileNo: values.mobileNo,
        alternateMobileNo: values.alternateMobileNo || undefined,
        currentAddress: values.currentAddress,
        sameAsCurrentAddress: values.sameAsCurrentAddress,
        permanentAddress: values.permanentAddress,
        qualifications: values.qualifications,
        currentOrganization: values.currentOrganization || undefined,
        currentDesignation: values.currentDesignation || undefined,
        totalWorkExperience: values.totalWorkExperience || undefined,
        teachingExperience: values.teachingExperience || undefined,
        internshipExperience: values.internshipExperience || undefined,
        mentorshipAreas: values.mentorshipAreas,
        preferredInternLevel: values.preferredInternLevel,
        maxInterns: values.maxInterns,
        mentorshipMode: values.mentorshipMode,
        availability: values.availability,
        selfIntroduction: values.selfIntroduction,
        agreeTerms: values.agreeTerms,
      };

      updateRegistration(
        { id: regMeResponse.data.id, payload: updatePayload },
        {
          onSuccess: () => {
            localStorage.removeItem(`instructor_registration_data_${userId}`);
            localStorage.setItem(
              `instructor_registration_complete_${userId}`,
              "true",
            );
            router.push("/instructor/profile");
          },
        },
      );
    } else {
      submitRegistration(values as unknown as InstructorRegistrationPayload, {
        onSuccess: () => {
          localStorage.setItem(
            `instructor_registration_data_${userId}`,
            JSON.stringify(values),
          );
          localStorage.setItem(
            `instructor_registration_complete_${userId}`,
            "true",
          );
          setIsFinalSubmitted(true);
        },
      });
    }
  };

  const handleEditSubmission = () => {
    setIsFinalSubmitted(false);
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?edit=true`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
    setCurrentStep(1);
    toast.info("You can now update your registration profile.");
  };
  const handleBackToDashboard = () => router.replace("/instructor/dashboard");
  if (isRegLoading) {
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
        <RegistrationPreview_2
          data={form.getValues()}
          photoPreview={photoPreview}
          handlePrint={handlePrint}
          handleEditSubmission={handleEditSubmission}
          handleBackToDashboard={handleBackToDashboard}
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              Instructor Registration
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              Please complete your instructor profile registration details.
            </p>
          </div>

          <StepIndicator_2 currentStep={currentStep} stepsInfo={stepsInfo} />

          <div className="bg-card/80 border-border/60 rounded-2xl border px-4 py-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl sm:p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {currentStep === 1 && (
                  <StepPersonalInfo_2
                    sameAsCurrentAddress={sameAsCurrentAddress}
                    onNext={handleNextStep}
                  />
                )}
                {currentStep === 2 && (
                  <StepEducation_2
                    tempQualification={tempQualification}
                    setTempQualification={setTempQualification}
                    onAddQualification={handleAddQualification}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}
                {currentStep === 3 && (
                  <StepProfessional_2
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}
                {currentStep === 4 && (
                  <StepDocuments_2
                    photoPreview={photoPreview}
                    identityProofName={identityProofName}
                    educationCertName={educationCertName}
                    experienceCertName={experienceCertName}
                    handleFileChange={handleFileChange}
                    onPrev={handlePrevStep}
                    isSubmitting={isSubmitting || isUpdating}
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
