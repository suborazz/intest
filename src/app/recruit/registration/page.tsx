"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React_4, { useEffect, useState } from "react";
import { type FieldPath, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight as ArrowRight_2, CalendarIcon, CheckCircle, Code, Download, Edit, LayoutDashboard, Mail as Mail_2, MapPin as MapPin_2, Pencil, Phone as Phone_2, Plus, Save, School, Trash2, Upload, Check } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from "radix-ui";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z_2 from "zod";
import { format } from "date-fns";
import { LucideIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useRef, useContext } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
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

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

const recruitAddressSchema = z.object({
      local: z.string().min(3, "Address line must be at least 3 characters"),
      block: z.string().optional().or(z.literal("")),
      district: z.string().min(2, "District is required"),
      state: z.string().min(2, "State is required"),
      country: z.string().min(2, "Country is required"),
      pinCode: z.string().regex(/^\d{6}$/, "Pin code must be exactly 6 digits"),
    });

const emailSchema = z
      .string({ error: "Email is required" })
      .email("Invalid email address")
      .toLowerCase()
      .trim();

const recruitAcademicDetailSchema = z.object({
      qualification: z.enum([
        "8th Pass",
        "Matriculation",
        "Intermediate",
        "Diploma",
        "Graduation",
        "Post Graduation",
        "M. Phil.",
        "PhD.",
        "Other",
      ]),
      schoolInstitute: z.string().min(2, "School/Institute is required"),
      boardUniversity: z.string().min(2, "Board/University is required"),
      startYear: z.string().min(4, "Start year is required"),
      endYear: z.string().min(4, "End year is required"),
      passingDivision: z.string().min(1, "Passing Division is required"),
      passingMarks: z.coerce
        .number()
        .min(0)
        .max(100, "Marks must be between 0 and 100"),
      subject: z.string().min(1, "Subject is required"),
      certificateBase64: z.string().min(1, "Certificate file is required"),
      certificateName: z.string().min(1, "Certificate name is required"),
    });

const recruitWorkExperienceSchema = z.object({
      employerName: z.string().min(2, "Employer Name is required"),
      designation: z.string().min(2, "Designation is required"),
      postingLocation: z.string().min(2, "Posting Location is required"),
      startDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be YYYY-MM-DD"),
      endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be YYYY-MM-DD")
        .optional()
        .nullable()
        .or(z.literal("")),
      natureOfWork: z.string().min(2, "Nature of work is required"),
      experienceYears: z.coerce.number().nonnegative(),
      certBase64: z.string().min(1, "Experience certificate is required"),
      certName: z.string().min(1, "Certificate name is required"),
    });

const recruitRegistrationSchema = z.object({
      fullName: z.string().min(2, "Full name is required").trim(),
      gender: z.enum(["Male", "Female", "Transgender"]),
      dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be YYYY-MM-DD"),
      fatherName: z.string().min(2, "Father name is required").trim(),
      motherName: z.string().min(2, "Mother name is required").trim(),
      localAddress: recruitAddressSchema,
      sameAsLocal: z.boolean(),
      permanentAddress: recruitAddressSchema,
      mobileNo: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
      email: emailSchema,
      maritalStatus: z.enum([
        "Married",
        "Unmarried",
        "Divorced",
        "Widow",
        "Widower",
      ]),
      nationality: z.string().min(2, "Nationality is required").default("Indian"),
      gotra: z.string().optional().nullable().or(z.literal("")),
      religion: z.enum([
        "Sanatan/Hindu",
        "Sikh",
        "Jain",
        "Parsi",
        "Buddhist",
        "Islam",
        "Christian",
        "Shinto",
        "Monotheism",
        "Protestantism",
        "Deism",
        "Yahudi",
        "Other",
      ]),
      category: z.enum(["Humanity", "General", "EWS", "OBC", "SC", "ST"]),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      hobby: z.string().optional().nullable().or(z.literal("")),
      languagesKnown: z.string().min(1, "Languages known is required"),
      physicallyChallenged: z.enum(["Yes", "No"]),
      aadharNo: z
        .string()
        .regex(/^\d{12}$/, "Aadhar No. must be 12 digits")
        .optional()
        .nullable()
        .or(z.literal("")),
      academics: z
        .array(recruitAcademicDetailSchema)
        .min(1, "At least one academic detail is required"),
      experiences: z.array(recruitWorkExperienceSchema).optional().default([]),
      photoBase64: z.string().min(1, "Photo is required"),
      photoName: z.string().min(1, "Photo name is required"),
      signatureBase64: z.string().min(1, "Signature is required"),
      signatureName: z.string().min(1, "Signature name is required"),
      resumeBase64: z.string().min(1, "Resume is required"),
      resumeName: z.string().min(1, "Resume name is required"),
      agreeTerms: z.literal(true, { error: "You must agree to terms" }),
    });

const ZRecruitAcademicDetail = recruitAcademicDetailSchema;

const ZRecruitWorkExperience = recruitWorkExperienceSchema.extend({
      endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format.")
        .optional()
        .nullable()
        .or(z.literal("")),
    });

const ZRecruitRegistration = recruitRegistrationSchema.extend({
      gotra: z.string().optional().or(z.literal("")),
      hobby: z.string().optional().or(z.literal("")),
      aadharNo: z
        .string()
        .regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits.")
        .optional()
        .or(z.literal("")),
      academics: z
        .array(ZRecruitAcademicDetail)
        .min(1, "At least one academic detail is required."),
      experiences: z.array(ZRecruitWorkExperience).optional().default([]),
      photoBase64: z.string().min(1, "Photo is required."),
      photoName: z.string().min(1, "Photo name is required."),
      signatureBase64: z.string().min(1, "Signature is required."),
      signatureName: z.string().min(1, "Signature name is required."),
      resumeBase64: z.string().min(1, "Resume is required."),
      resumeName: z.string().min(1, "Resume name is required."),
      agreeTerms: z
        .boolean()
        .refine((val) => val === true, { message: "You must agree to terms" }),
    });

type TRecruitRegistration = z.infer<typeof ZRecruitRegistration>;

const ZRecruitRegistrationEdit = ZRecruitRegistration.extend({
      photoBase64: z.string().optional().or(z.literal("")),
      photoName: z.string().optional().or(z.literal("")),
      signatureBase64: z.string().optional().or(z.literal("")),
      signatureName: z.string().optional().or(z.literal("")),
      resumeBase64: z.string().optional().or(z.literal("")),
      resumeName: z.string().optional().or(z.literal("")),
      academics: z
        .array(
          ZRecruitAcademicDetail.extend({
            certificateBase64: z.string().optional().or(z.literal("")),
          }),
        )
        .min(1, "At least one academic detail is required."),
      experiences: z
        .array(
          ZRecruitWorkExperience.extend({
            certBase64: z.string().optional().or(z.literal("")),
          }),
        )
        .optional()
        .default([]),
    });

function mapReligionBack(r: string): string {
      const map: Record<string, string> = {
        Sanatan_Hindu: "Sanatan/Hindu",
      };
      return map[r] ?? r;
    }

function mapBloodGroupBack(b: string): string {
      const map: Record<string, string> = {
        A_POS: "A+",
        A_NEG: "A-",
        B_POS: "B+",
        B_NEG: "B-",
        AB_POS: "AB+",
        AB_NEG: "AB-",
        O_POS: "O+",
        O_NEG: "O-",
      };
      return map[b] ?? b;
    }

function mapQualificationBack(q: string): string {
      const map: Record<string, string> = {
        Pass_8th: "8th Pass",
        Post_Graduation: "Post Graduation",
        M_Phil: "M. Phil.",
        PhD: "PhD.",
      };
      return map[q] ?? q;
    }

interface RegistrationPreviewProps_3 {
      data: TRecruitRegistration;
      photoPreview: string | null;
      signaturePreview: string | null;
      appId: string;
      onPrint: () => void;
      onGoToDashboard: () => void;
    }

function formatAddress(
      address?: Partial<TRecruitRegistration["localAddress"]> | null,
    ): string {
      if (!address) return "—";
      const line = [address.local, address.district, address.state]
        .filter(Boolean)
        .join(", ");
      const parts = [line, address.pinCode].filter(Boolean);
      return parts.length ? parts.join(" - ") : "—";
    }

interface StepDocumentsProps_3 {
      photoPreview: string | null;
      signaturePreview: string | null;
      resumeName: string | null;
      handleFileChange: (
        e: React_3.ChangeEvent<HTMLInputElement>,
        fieldName: FieldPath<TRecruitRegistration>,
        nameField: FieldPath<TRecruitRegistration>,
        setPreview?: React_3.Dispatch<React_3.SetStateAction<string | null>>,
      ) => void;
      onPrev: () => void;
      isPending: boolean;
    }

interface StepEducationProps_3 {
      onNext: () => void;
      onPrev: () => void;
    }

const StepEducation_3: React_3.FC<StepEducationProps_3> = ({
      onNext,
      onPrev,
    }) => {
      const { control } = useFormContext<TRecruitRegistration>();
      const { fields, append, remove, update } = useFieldArray({
        control,
        name: "academics",
      });

      const [editingIndex, setEditingIndex] = useState<number | null>(null);
      const [tempAcademic, setTempAcademic] = useState({
        qualification: "Graduation" as
          | "8th Pass"
          | "Matriculation"
          | "Intermediate"
          | "Diploma"
          | "Graduation"
          | "Post Graduation"
          | "M. Phil."
          | "PhD."
          | "Other",
        schoolInstitute: "",
        boardUniversity: "",
        startYear: "",
        endYear: "",
        passingDivision: "",
        passingMarks: 0,
        subject: "",
        certificateBase64: "",
        certificateName: "",
      });

      const handleAddAcademic = () => {
        const check = ZRecruitAcademicDetail.safeParse(tempAcademic);
        if (!check.success) {
          toast.error(check.error.issues[0].message);
          return;
        }
        if (editingIndex !== null) {
          update(editingIndex, tempAcademic);
          setEditingIndex(null);
          toast.success("Academic qualification record updated!");
        } else {
          append(tempAcademic);
          toast.success("Academic qualification record added!");
        }
        setTempAcademic({
          qualification: "Graduation",
          schoolInstitute: "",
          boardUniversity: "",
          startYear: "",
          endYear: "",
          passingDivision: "",
          passingMarks: 0,
          subject: "",
          certificateBase64: "",
          certificateName: "",
        });
      };

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              B. Educational Qualification Details
            </h2>
            <p className="text-muted-foreground text-xs">
              Please add all your educational qualifications, starting with
              matriculation or higher.
            </p>
          </div>

          {}
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="bg-muted/20 flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <div className="font-bold">
                    {item.qualification} - {item.subject}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {item.schoolInstitute} | {item.boardUniversity} (
                    {item.startYear} - {item.endYear})
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() => {
                      setTempAcademic({
                        qualification: item.qualification as any,
                        schoolInstitute: item.schoolInstitute || "",
                        boardUniversity: item.boardUniversity || "",
                        startYear: item.startYear || "",
                        endYear: item.endYear || "",
                        passingDivision: item.passingDivision || "",
                        passingMarks: item.passingMarks || 0,
                        subject: item.subject || "",
                        certificateBase64: item.certificateBase64 || "",
                        certificateName: item.certificateName || "",
                      });
                      setEditingIndex(index);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      remove(index);
                      if (editingIndex === index) {
                        setEditingIndex(null);
                        setTempAcademic({
                          qualification: "Graduation",
                          schoolInstitute: "",
                          boardUniversity: "",
                          startYear: "",
                          endYear: "",
                          passingDivision: "",
                          passingMarks: 0,
                          subject: "",
                          certificateBase64: "",
                          certificateName: "",
                        });
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="bg-muted/10 space-y-4 rounded-2xl border p-4">
            <h4 className="flex items-center gap-1.5 text-sm font-bold">
              {editingIndex !== null ? (
                <>
                  <Pencil className="size-4" /> Edit Qualification
                </>
              ) : (
                <>
                  <Plus className="size-4" /> Add Qualification
                </>
              )}
            </h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <FormLabel>Qualification*</FormLabel>
                <select
                  className="bg-background border-input h-10 w-full rounded-md border p-2 text-sm"
                  value={tempAcademic.qualification}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      qualification: e.target.value as
                        | "8th Pass"
                        | "Matriculation"
                        | "Intermediate"
                        | "Diploma"
                        | "Graduation"
                        | "Post Graduation"
                        | "M. Phil."
                        | "PhD."
                        | "Other",
                    }))
                  }
                >
                  <option value="8th Pass">8th Pass</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Post Graduation">Post Graduation</option>
                  <option value="M. Phil.">M. Phil.</option>
                  <option value="PhD.">PhD.</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <FormLabel>School/College/Institute*</FormLabel>
                <Input
                  placeholder="Institute Name"
                  value={tempAcademic.schoolInstitute}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      schoolInstitute: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Board/University*</FormLabel>
                <Input
                  placeholder="Board / University"
                  value={tempAcademic.boardUniversity}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      boardUniversity: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Start Year*</FormLabel>
                <Input
                  placeholder="e.g. 2020"
                  value={tempAcademic.startYear}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      startYear: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>End Year*</FormLabel>
                <Input
                  placeholder="e.g. 2023"
                  value={tempAcademic.endYear}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      endYear: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Passing Division*</FormLabel>
                <Input
                  placeholder="e.g. 1st / A Grade"
                  value={tempAcademic.passingDivision}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      passingDivision: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Passing Marks (%)*</FormLabel>
                <Input
                  type="number"
                  placeholder="e.g. 85"
                  value={tempAcademic.passingMarks || ""}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      passingMarks: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Subject*</FormLabel>
                <Input
                  placeholder="e.g. Computer Science"
                  value={tempAcademic.subject}
                  onChange={(e) =>
                    setTempAcademic((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Attach Certificate*</FormLabel>
                <div className="bg-background flex h-10 items-center gap-2 rounded-md border p-1">
                  <Input
                    type="file"
                    className="hidden"
                    id="acad-cert"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTempAcademic((prev) => ({
                            ...prev,
                            certificateBase64: reader.result as string,
                            certificateName: file.name,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("acad-cert")?.click()}
                  >
                    <Upload className="mr-1 size-3.5" /> Upload
                  </Button>
                  <span className="text-muted-foreground flex-1 truncate text-[10px]">
                    {tempAcademic.certificateName || "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <Button type="button" size="sm" onClick={handleAddAcademic}>
                {editingIndex !== null ? "Update Qualification" : "+ Save & Add"}
              </Button>
              {editingIndex !== null && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingIndex(null);
                    setTempAcademic({
                      qualification: "Graduation",
                      schoolInstitute: "",
                      boardUniversity: "",
                      startYear: "",
                      endYear: "",
                      passingDivision: "",
                      passingMarks: 0,
                      subject: "",
                      certificateBase64: "",
                      certificateName: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="border-border flex justify-between border-t pt-4">
            <Button type="button" variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 size-4" /> Previous
            </Button>
            <Button type="button" onClick={onNext}>
              Save & Next <ArrowRight_2 className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      );
    };

interface StepIndicatorProps_3 {
      currentStep: number;
      stepsInfo: { title: string; desc: string }[];
    }

interface StepPersonalInfoProps_3 {
      sameAsLocal: boolean;
      onNext: () => void;
    }

function Select_8({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_8({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

function Popover_3({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Root>) {
      return <PopoverPrimitive.Root data-slot="popover" {...props} />;
    }

function PopoverTrigger_3({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Trigger>) {
      return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
    }

function cn_9(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

interface StepProfessionalProps_3 {
      isExperienceCompulsory: boolean;
      onNext: () => void;
      onPrev: () => void;
    }

const stepsInfo = [
    { title: "Basic Info", desc: "Identity & contacts" },
    { title: "Education", desc: "Qualifications list" },
    { title: "Experience", desc: "Employment history" },
    { title: "Documents", desc: "Attachments & declare" },
  ];


export default function RecruitRegistrationPage() {
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

    function useAuth() {
      return useContext(AuthContext);
    }

    function toFormValues(
      api: Record<string, unknown>,
    ): Partial<TRecruitRegistration> {
      const str = (key: string, fallback = "") =>
        typeof api[key] === "string" ? (api[key] as string) : fallback;

      const localAddress = {
        local: str("currAddressLocal"),
        block: str("currAddressBlock"),
        district: str("currAddressDistrict"),
        state: str("currAddressState"),
        country: str("currAddressCountry", "India"),
        pinCode: str("currAddressPinCode"),
      };
      const permanentAddress = {
        local: str("permAddressLocal"),
        block: str("permAddressBlock"),
        district: str("permAddressDistrict"),
        state: str("permAddressState"),
        country: str("permAddressCountry", "India"),
        pinCode: str("permAddressPinCode"),
      };

      const sameAsLocal =
        localAddress.local === permanentAddress.local &&
        localAddress.district === permanentAddress.district &&
        localAddress.state === permanentAddress.state &&
        localAddress.pinCode === permanentAddress.pinCode;

      const rawReligion =
        typeof api["religion"] === "string" ? (api["religion"] as string) : "";
      const religion = mapReligionBack(rawReligion) || "Sanatan/Hindu";

      const rawBloodGroup =
        typeof api["bloodGroup"] === "string" ? (api["bloodGroup"] as string) : "";
      const bloodGroup = mapBloodGroupBack(rawBloodGroup) || "O+";

      let physicallyChallenged = "No";
      if (typeof api["physicallyChallenged"] === "boolean") {
        physicallyChallenged = api["physicallyChallenged"] ? "Yes" : "No";
      } else if (typeof api["physicallyChallenged"] === "string") {
        physicallyChallenged =
          api["physicallyChallenged"] === "true" ||
          api["physicallyChallenged"] === "Yes"
            ? "Yes"
            : "No";
      }

      const rawAcademics = Array.isArray(api["academics"]) ? api["academics"] : [];
      const academics = rawAcademics.map((ac: any) => ({
        ...ac,
        qualification: mapQualificationBack(ac.qualification || ""),
      }));

      return {
        ...(api as Partial<TRecruitRegistration>),
        gotra: typeof api["gotra"] === "string" ? api["gotra"] : "",
        hobby: typeof api["hobby"] === "string" ? api["hobby"] : "",
        aadharNo: typeof api["aadharNo"] === "string" ? api["aadharNo"] : "",
        localAddress,
        permanentAddress,
        sameAsLocal,
        religion: religion as any,
        bloodGroup: bloodGroup as any,
        physicallyChallenged: physicallyChallenged as any,
            academics: academics as any,
        experiences: Array.isArray(api["experiences"])
          ? (api["experiences"] as TRecruitRegistration["experiences"]).map(
              (exp) => ({
                ...exp,
                            endDate: exp.endDate ?? "",
              }),
            )
          : [],
                photoBase64: "",
        signatureBase64: "",
        resumeBase64: "",
            agreeTerms: true,
      };
    }

    const RegistrationPreview_3: React_3.FC<RegistrationPreviewProps_3> = ({
      data,
      photoPreview,
      signaturePreview,
      appId,
      onPrint,
      onGoToDashboard,
    }) => {
      return (
        <div className="bg-card border-border animate-in fade-in space-y-6 rounded-3xl border p-6 text-center shadow-xl duration-300 md:p-8">
          <div className="flex justify-center">
            <CheckCircle className="size-16 animate-bounce text-emerald-500" />
          </div>
          <h2 className="text-foreground text-2xl font-extrabold md:text-3xl">
            Registration Profile Completed
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg">
            Your recruiter application is successfully registered. Keep a copy of
            your application details.
          </p>

          {}
          <div className="printable-area mx-auto max-w-2xl space-y-6 rounded-2xl border bg-white p-6 text-left font-sans shadow-inner dark:bg-zinc-900">
            <div className="space-y-1 border-b pb-4 text-center">
              <h2 className="text-xl font-extrabold">
                International Institute of Internship [i3]
              </h2>
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                Job Applicant Profile Registration Form
              </p>
              <div className="text-muted-foreground flex items-center justify-center gap-1 text-[11px] font-semibold">
                Reg ID:{" "}
                <ApplicationIdChip
                  id={appId}
                  type="registration"
                  className="text-[10px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2 text-xs">
                  <h3 className="text-primary text-sm font-extrabold uppercase">
                    1. Basic Information
                  </h3>
                  <div>
                    Name: <span className="font-bold">{data.fullName}</span>
                  </div>
                  <div>
                    DOB: <span className="font-bold">{data.dob}</span>
                  </div>
                  <div>
                    Gender: <span className="font-bold">{data.gender}</span>
                  </div>
                  <div>
                    Mobile No: <span className="font-bold">{data.mobileNo}</span>
                  </div>
                  <div>
                    Email ID: <span className="font-bold">{data.email}</span>
                  </div>
                  <div>
                    Marital Status:{" "}
                    <span className="font-bold">{data.maritalStatus}</span>
                  </div>
                  <div>
                    Religion: <span className="font-bold">{data.religion}</span>
                  </div>
                  <div>
                    Category: <span className="font-bold">{data.category}</span>
                  </div>
                  <div>
                    Blood Group:{" "}
                    <span className="font-bold">{data.bloodGroup}</span>
                  </div>
                </div>
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="profile preview"
                    className="size-20 shrink-0 rounded border object-cover"
                  />
                )}
              </div>

              <div className="space-y-2 text-xs">
                <h3 className="text-primary text-sm font-extrabold uppercase">
                  2. Address Details
                </h3>
                <div>
                  Current Address:{" "}
                  <span className="font-bold">
                    {formatAddress(data.localAddress)}
                  </span>
                </div>
                <div>
                  Permanent Address:{" "}
                  <span className="font-bold">
                    {formatAddress(data.permanentAddress)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h3 className="text-primary text-sm font-extrabold uppercase">
                  3. Academic Details
                </h3>
                {(data.academics ?? []).map((ac, idx) => (
                  <div key={idx} className="border-primary/50 border-l-2 pl-2">
                    <span className="font-bold">
                      {ac.qualification} in {ac.subject}
                    </span>{" "}
                    ({ac.startYear} - {ac.endYear})
                    <div className="text-muted-foreground text-[10px]">
                      {ac.schoolInstitute} | Board/Uni: {ac.boardUniversity} |
                      Marks: {ac.passingMarks}%
                    </div>
                  </div>
                ))}
              </div>

              {data.experiences && data.experiences.length > 0 && (
                <div className="space-y-2 text-xs">
                  <h3 className="text-primary text-sm font-extrabold uppercase">
                    4. Work History
                  </h3>
                  {data.experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-emerald-500/50 pl-2"
                    >
                      <span className="font-bold">
                        {exp.designation} at {exp.employerName}
                      </span>{" "}
                      ({exp.startDate} to {exp.endDate || "Present"})
                      <div className="text-muted-foreground text-[10px]">
                        {exp.postingLocation} | Role: {exp.natureOfWork} |{" "}
                        {exp.experienceYears} Years
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {signaturePreview && (
                <div className="flex flex-col items-end pt-4">
                  <img
                    src={signaturePreview}
                    alt="signature"
                    className="h-8 w-24 border bg-zinc-50 object-contain"
                  />
                  <span className="text-muted-foreground block pr-4 text-[9px]">
                    Authorized Signature
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button onClick={onPrint} className="flex items-center gap-2">
              <Download className="size-4" /> Download PDF Form
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/recruit/registration?edit=true";
                }
              }}
              className="flex items-center gap-2"
            >
              <Download className="hidden size-4 opacity-0" /> Edit Details
            </Button>
            <Button
              variant="outline"
              onClick={onGoToDashboard}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="size-4" /> Go to Dashboard
            </Button>
          </div>
        </div>
      );
    };
    const StepDocuments_3: React_3.FC<StepDocumentsProps_3> = ({
      photoPreview,
      signaturePreview,
      resumeName,
      handleFileChange,
      onPrev,
      isPending,
    }) => {
      const { control } = useFormContext<TRecruitRegistration>();

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              D. Documents Attachment & Declaration
            </h2>
            <p className="text-muted-foreground text-xs">
              Please upload your profile photo, signature spec, and current resume.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {}
            <div className="border-border space-y-3 rounded-2xl border border-dashed p-4 text-center">
              <div className="text-sm font-semibold">Attached Resume*</div>
              <Input
                type="file"
                className="hidden"
                id="resume-upload"
                onChange={(e) => handleFileChange(e, "resumeBase64", "resumeName")}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("resume-upload")?.click()}
              >
                <Upload className="mr-2 size-4" /> Upload Resume
              </Button>
              <div className="text-muted-foreground truncate text-xs">
                {resumeName || "No file chosen"}
              </div>
            </div>

            {}
            <div className="border-border space-y-3 rounded-2xl border border-dashed p-4 text-center">
              <div className="text-sm font-semibold">Upload Photo*</div>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="photo preview"
                  className="mx-auto size-20 rounded-full border object-cover"
                />
              )}
              <Input
                type="file"
                className="hidden"
                id="photo-upload"
                onChange={(e) => handleFileChange(e, "photoBase64", "photoName")}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                <Upload className="mr-2 size-4" /> Upload Photo
              </Button>
            </div>

            {}
            <div className="border-border space-y-3 rounded-2xl border border-dashed p-4 text-center">
              <div className="text-sm font-semibold">Upload Signature*</div>
              {signaturePreview && (
                <img
                  src={signaturePreview}
                  alt="signature preview"
                  className="mx-auto h-12 w-28 border object-contain"
                />
              )}
              <Input
                type="file"
                className="hidden"
                id="signature-upload"
                onChange={(e) =>
                  handleFileChange(e, "signatureBase64", "signatureName")
                }
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("signature-upload")?.click()}
              >
                <Upload className="mr-2 size-4" /> Upload Signature
              </Button>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <FormField
              control={control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-muted-foreground cursor-pointer select-none text-sm">
                      I accept all the terms and conditions and declare that all the
                      details provided are correct and accurate.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="border-border flex justify-between border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              disabled={isPending}
            >
              <ArrowLeft className="mr-2 size-4" /> Previous
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 px-6 font-bold text-white shadow-md hover:bg-emerald-700"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Final Submit"}
            </Button>
          </div>
        </div>
      );
    };
    const StepIndicator_3: React_2.FC<StepIndicatorProps_3> = ({
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
    const StepPersonalInfo_3: React_3.FC<StepPersonalInfoProps_3> = ({
      sameAsLocal,
      onNext,
    }) => {
      const { control } = useFormContext<TRecruitRegistration>();
      const [isCalendarOpen, setIsCalendarOpen] = React_3.useState(false);

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-xl font-bold">
              A. Personal Information
            </h2>
            <p className="text-muted-foreground text-xs">
              Please fill out your identity, contact details, and basic address
              parameters.
            </p>
          </div>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select_8
                    key={field.value || "gender-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_8 placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                    </SelectContent>
                  </Select_8>
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
                  <Popover_3 open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger_3 asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn_9(
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
                    </PopoverTrigger_3>
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
                  </Popover_3>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Father's Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Father's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="motherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mother's Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Mother's name" {...field} />
                  </FormControl>
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
                    <div className="relative">
                      <Phone_2 className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        maxLength={10}
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

            {}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email ID <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail_2 className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="pl-9"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status*</FormLabel>
                  <Select_8
                    key={field.value || "maritalStatus-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_8 placeholder="Select Marital Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Unmarried">Unmarried</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widow">Widow</SelectItem>
                      <SelectItem value="Widower">Widower</SelectItem>
                    </SelectContent>
                  </Select_8>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gotra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gotra</FormLabel>
                  <FormControl>
                    <Input placeholder="Gotra (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion*</FormLabel>
                  <Select_8
                    key={field.value || "religion-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_8 placeholder="Select Religion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sanatan/Hindu">Sanatan/Hindu</SelectItem>
                      <SelectItem value="Sikh">Sikh</SelectItem>
                      <SelectItem value="Jain">Jain</SelectItem>
                      <SelectItem value="Parsi">Parsi</SelectItem>
                      <SelectItem value="Buddhist">Buddhist</SelectItem>
                      <SelectItem value="Islam">Islam</SelectItem>
                      <SelectItem value="Christian">Christian</SelectItem>
                      <SelectItem value="Shinto">Shinto</SelectItem>
                      <SelectItem value="Monotheism">Monotheism</SelectItem>
                      <SelectItem value="Protestantism">Protestantism</SelectItem>
                      <SelectItem value="Deism">Deism</SelectItem>
                      <SelectItem value="Yahudi">Yahudi</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select_8>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category*</FormLabel>
                  <Select_8
                    key={field.value || "category-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_8 placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Humanity">Humanity</SelectItem>
                      <SelectItem value="EWS">EWS</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                    </SelectContent>
                  </Select_8>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group*</FormLabel>
                  <Select_8
                    key={field.value || "bloodGroup-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_8 placeholder="Select Blood Group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select_8>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="hobby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobby</FormLabel>
                  <FormControl>
                    <Input placeholder="Hobby" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="languagesKnown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages Known*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. English, Hindi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="physicallyChallenged"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Physically Challenged*</FormLabel>
                  <Select_8
                    key={field.value || "physicallyChallenged-select"}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue_8 placeholder="Select Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select_8>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="aadharNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Aadhar No.{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="12 digit number" {...field} />
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
                  name="localAddress.local"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address Line 1 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Flat / street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={control}
                    name="localAddress.district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District*</FormLabel>
                        <FormControl>
                          <Input placeholder="District" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="localAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State*</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="localAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="localAddress.pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin Code*</FormLabel>
                        <FormControl>
                          <Input placeholder="6 digits" {...field} />
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
                    Permanent Address same as Current Address
                  </FormLabel>
                </FormItem>
              )}
            />

            <AccordionItem
              value="permanent-address"
              className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/50 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900/30"
            >
              <AccordionTrigger className="hover:bg-muted/10 px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin_2 className="text-primary size-4" />
                  <span className="text-foreground text-sm font-bold">
                    Permanent Address
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
                        Address Line 1 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Flat / street"
                          disabled={sameAsLocal}
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
                        <FormLabel>District*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="District"
                            disabled={sameAsLocal}
                            {...field}
                          />
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
                        <FormLabel>State*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="State"
                            disabled={sameAsLocal}
                            {...field}
                          />
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
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Country"
                            disabled={sameAsLocal}
                            {...field}
                          />
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
                        <FormLabel>Pin Code*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="6 digits"
                            disabled={sameAsLocal}
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
    const StepProfessional_3: React_3.FC<StepProfessionalProps_3> = ({
      isExperienceCompulsory,
      onNext,
      onPrev,
    }) => {
      const { control } = useFormContext<TRecruitRegistration>();
      const { fields, append, remove, update } = useFieldArray({
        control,
        name: "experiences",
      });

      const [editingIndex, setEditingIndex] = useState<number | null>(null);
      const [tempExperience, setTempExperience] = useState({
        employerName: "",
        designation: "",
        postingLocation: "",
        startDate: "",
        endDate: "",
        natureOfWork: "",
        experienceYears: 0,
        certBase64: "",
        certName: "",
      });

        useEffect(() => {
        if (tempExperience.startDate) {
          const start = new Date(tempExperience.startDate);
          const end = tempExperience.endDate
            ? new Date(tempExperience.endDate)
            : new Date();
          if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffYears = parseFloat(
              (diffTime / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1),
            );
            setTempExperience((prev) => ({ ...prev, experienceYears: diffYears }));
          }
        }
      }, [tempExperience.startDate, tempExperience.endDate]);

      const handleAddExperience = () => {
        const check = ZRecruitWorkExperience.safeParse(tempExperience);
        if (!check.success) {
          toast.error(check.error.issues[0].message);
          return;
        }
        if (editingIndex !== null) {
          update(editingIndex, tempExperience);
          setEditingIndex(null);
          toast.success("Work experience record updated!");
        } else {
          append(tempExperience);
          toast.success("Work experience record added!");
        }
        setTempExperience({
          employerName: "",
          designation: "",
          postingLocation: "",
          startDate: "",
          endDate: "",
          natureOfWork: "",
          experienceYears: 0,
          certBase64: "",
          certName: "",
        });
      };

      return (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="border-border flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-foreground text-xl font-bold">
                C. Work Experience Details
              </h2>
              <p className="text-muted-foreground text-xs">
                Please add your past employment records.
              </p>
            </div>
            {isExperienceCompulsory && (
              <span className="rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-xs font-bold uppercase text-red-500">
                Mandatory
              </span>
            )}
          </div>

          {}
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="bg-muted/20 flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <div className="font-bold">
                    {item.employerName} - {item.designation}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {item.postingLocation} ({item.startDate} to{" "}
                    {item.endDate || "Present"}) | {item.experienceYears} Years
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() => {
                      setTempExperience({
                        employerName: item.employerName || "",
                        designation: item.designation || "",
                        postingLocation: item.postingLocation || "",
                        startDate: item.startDate || "",
                        endDate: item.endDate || "",
                        natureOfWork: item.natureOfWork || "",
                        experienceYears: item.experienceYears || 0,
                        certBase64: item.certBase64 || "",
                        certName: item.certName || "",
                      });
                      setEditingIndex(index);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      remove(index);
                      if (editingIndex === index) {
                        setEditingIndex(null);
                        setTempExperience({
                          employerName: "",
                          designation: "",
                          postingLocation: "",
                          startDate: "",
                          endDate: "",
                          natureOfWork: "",
                          experienceYears: 0,
                          certBase64: "",
                          certName: "",
                        });
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="bg-muted/10 space-y-4 rounded-2xl border p-4">
            <h4 className="flex items-center gap-1.5 text-sm font-bold">
              {editingIndex !== null ? (
                <>
                  <Pencil className="size-4" /> Edit Experience
                </>
              ) : (
                <>
                  <Plus className="size-4" /> Add Experience
                </>
              )}
            </h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <FormLabel>Employer Name*</FormLabel>
                <Input
                  placeholder="Company Name"
                  value={tempExperience.employerName}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      employerName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Designation*</FormLabel>
                <Input
                  placeholder="e.g. Software Developer"
                  value={tempExperience.designation}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      designation: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Posting Location*</FormLabel>
                <Input
                  placeholder="e.g. Noida, Delhi"
                  value={tempExperience.postingLocation}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      postingLocation: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Start Date*</FormLabel>
                <Input
                  type="date"
                  value={tempExperience.startDate}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={tempExperience.endDate}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Nature of Work*</FormLabel>
                <Input
                  placeholder="Responsibilities / Techstack"
                  value={tempExperience.natureOfWork}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      natureOfWork: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <FormLabel>Total Experience (Years)</FormLabel>
                <Input
                  type="number"
                  disabled
                  placeholder="Auto Calculated"
                  value={tempExperience.experienceYears || ""}
                />
              </div>
              <div>
                <FormLabel>Attached Experience Certificate*</FormLabel>
                <div className="bg-background flex h-10 items-center gap-2 rounded-md border p-1">
                  <Input
                    type="file"
                    className="hidden"
                    id="exp-cert"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTempExperience((prev) => ({
                            ...prev,
                            certBase64: reader.result as string,
                            certName: file.name,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("exp-cert")?.click()}
                  >
                    <Upload className="mr-1 size-3.5" /> Upload
                  </Button>
                  <span className="text-muted-foreground flex-1 truncate text-[10px]">
                    {tempExperience.certName || "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <Button type="button" size="sm" onClick={handleAddExperience}>
                {editingIndex !== null ? "Update Experience" : "+ Save & Add"}
              </Button>
              {editingIndex !== null && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingIndex(null);
                    setTempExperience({
                      employerName: "",
                      designation: "",
                      postingLocation: "",
                      startDate: "",
                      endDate: "",
                      natureOfWork: "",
                      experienceYears: 0,
                      certBase64: "",
                      certName: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="border-border flex justify-between border-t pt-4">
            <Button type="button" variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 size-4" /> Previous
            </Button>
            <Button type="button" onClick={onNext}>
              Save & Next <ArrowRight_2 className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      );
    };

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
    const _userId = user?.id ?? "";
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);

    const { data: settingsData } = RecruitDataHooks.useSettings();
  const isExperienceCompulsory = Boolean(
    settingsData?.data?.isExperienceCompulsory,
  );

        const isEditMode = searchParams.get("edit") === "true";

  const form = useForm<TRecruitRegistration>({
    resolver: zodResolver(
      isEditMode ? ZRecruitRegistrationEdit : ZRecruitRegistration,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any,
    defaultValues: {
      fullName: "",
      gender: "Male",
      dob: "",
      fatherName: "",
      motherName: "",
      localAddress: {
        local: "",
        block: "",
        district: "",
        state: "",
        country: "India",
        pinCode: "",
      },
      sameAsLocal: false,
      permanentAddress: {
        local: "",
        block: "",
        district: "",
        state: "",
        country: "India",
        pinCode: "",
      },
      mobileNo: "",
      email: user?.email ?? "",
      maritalStatus: "Unmarried",
      nationality: "Indian",
      gotra: "",
      religion: "Sanatan/Hindu",
      category: "General",
      bloodGroup: "O+",
      hobby: "",
      languagesKnown: "",
      physicallyChallenged: "No",
      aadharNo: "",
      academics: [],
      experiences: [],
      photoBase64: "",
      photoName: "",
      signatureBase64: "",
      signatureName: "",
      resumeBase64: "",
      resumeName: "",
      agreeTerms: false,
    },
  });

  const sameAsLocal = form.watch("sameAsLocal");
  const localAddressValues = form.watch("localAddress");
  useEffect(() => {
    if (sameAsLocal) {
      form.setValue("permanentAddress", {
        local: localAddressValues.local || "",
        block: localAddressValues.block || "",
        district: localAddressValues.district || "",
        state: localAddressValues.state || "",
        country: localAddressValues.country || "India",
        pinCode: localAddressValues.pinCode || "",
      });
    }
  }, [sameAsLocal, localAddressValues, form]);

        useEffect(() => {
    if (user?.email && !form.getValues("email")) {
      form.setValue("email", user.email);
    }
  }, [user?.email, form]);

  const { data: profileResponse, isLoading: isProfileLoading } =
    RecruitDataHooks.useProfile();
  const submitProfileMutation = RecruitDataHooks.useSubmitProfile();
  const updateProfileMutation = RecruitDataHooks.useUpdateProfile();

  useEffect(() => {
    if (profileResponse?.success && profileResponse?.data) {
      if (isEditMode) {
        setIsFinalSubmitted(false);
        setCurrentStep(1);
      } else {
        setIsFinalSubmitted(true);
      }
      setAppId((profileResponse.data.id as string) || "APP-RECRUIT-001");
      form.reset(toFormValues(profileResponse.data));
      if (profileResponse.data.photoUrl)
        setPhotoPreview(profileResponse.data.photoUrl as string);
      if (profileResponse.data.signatureUrl)
        setSignaturePreview(profileResponse.data.signatureUrl as string);
      if (profileResponse.data.resumeName)
        setResumeName(profileResponse.data.resumeName as string);
    }
  }, [profileResponse, form, isEditMode]);

  const handleFileChange = (
    e: React_4.ChangeEvent<HTMLInputElement>,
    fieldName: FieldPath<TRecruitRegistration>,
    nameField: FieldPath<TRecruitRegistration>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      form.setValue(fieldName, base64);
      form.setValue(nameField, file.name);
      if (fieldName === "photoBase64") setPhotoPreview(base64);
      if (fieldName === "signatureBase64") setSignaturePreview(base64);
      if (fieldName === "resumeBase64") setResumeName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = async () => {
    let fields: FieldPath<TRecruitRegistration>[] = [];
    if (currentStep === 1) {
      fields = [
        "fullName",
        "gender",
        "dob",
        "fatherName",
        "motherName",
        "localAddress.local",
        "localAddress.district",
        "localAddress.state",
        "localAddress.country",
        "localAddress.pinCode",
                                        "permanentAddress.local",
        "permanentAddress.district",
        "permanentAddress.state",
        "permanentAddress.country",
        "permanentAddress.pinCode",
        "mobileNo",
        "email",
        "maritalStatus",
        "nationality",
        "religion",
        "category",
        "bloodGroup",
        "languagesKnown",
        "physicallyChallenged",
      ];
    } else if (currentStep === 2) {
      if (form.getValues("academics").length === 0) {
        toast.error("Please add at least one educational qualification.");
        return;
      }
      fields = ["academics"];
    } else if (currentStep === 3) {
      if (
        isExperienceCompulsory &&
        form.getValues("experiences").length === 0
      ) {
        toast.error("Work experience is mandatory based on admin settings.");
        return;
      }
      fields = ["experiences"];
    }
    const ok = await form.trigger(fields);
    if (ok) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please complete all required fields correctly.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (values: TRecruitRegistration) => {
    const handleSaved = (id?: string) => {
      setAppId(id || "APP-RECRUIT-001");
      setIsFinalSubmitted(true);
    };

    if (isEditMode) {
      updateProfileMutation.mutate(values, {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          router.push("/recruit/personal-information");
        },
      });
    } else {
      submitProfileMutation.mutate(values, {
        onSuccess: (res) => handleSaved(res.data?.id as string | undefined),
      });
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
        <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground text-sm font-medium">
          Loading registration details...
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {isFinalSubmitted ? (
        <RegistrationPreview_3
          data={form.getValues()}
          photoPreview={photoPreview}
          signaturePreview={signaturePreview}
          appId={appId}
          onPrint={() => window.print()}
          onGoToDashboard={() => router.replace("/recruit/dashboard")}
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              Job Applicant Registration
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm">
              Please complete your job applicant profile registration details.
            </p>
          </div>

          <StepIndicator_3 currentStep={currentStep} stepsInfo={stepsInfo} />

          <div className="bg-card border-border rounded-2xl border p-6 shadow-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.error("Validation Errors:", errors);
                  const errorFields = Object.keys(errors).join(", ");
                  toast.error(
                    `Please correct the errors in the form before submitting: ${errorFields}`,
                  );
                })}
                className="space-y-6"
              >
                {currentStep === 1 && (
                  <StepPersonalInfo_3
                    sameAsLocal={sameAsLocal}
                    onNext={handleNextStep}
                  />
                )}

                {currentStep === 2 && (
                  <StepEducation_3
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}

                {currentStep === 3 && (
                  <StepProfessional_3
                    isExperienceCompulsory={isExperienceCompulsory}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}

                {currentStep === 4 && (
                  <StepDocuments_3
                    photoPreview={photoPreview}
                    signaturePreview={signaturePreview}
                    resumeName={resumeName}
                    handleFileChange={handleFileChange}
                    onPrev={handlePrevStep}
                    isPending={
                      submitProfileMutation.isPending ||
                      updateProfileMutation.isPending
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
