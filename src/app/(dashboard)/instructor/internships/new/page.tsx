"use client";

import * as React from "react";
import { Award, Bold, BookOpen, Briefcase as Briefcase_2, Building2, Calendar as Calendar_3, Clock as Clock_2, Code, DollarSign, FileText, Italic, Layers, Link as LinkIcon, List, ListOrdered, Loader2, MapPin as MapPin_2, Minus, Quote, Redo2, RemoveFormatting, Sparkles as Sparkles_2, Undo2, UserCheck } from "lucide-react";
import React_3 from "react";
import { useEffect, useRef, useState } from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from "radix-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { format } from "date-fns";
import { LucideIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, XIcon, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import * as z_2 from "zod";
import { z } from "zod";
import { Slot, Switch as SwitchPrimitive, Dialog as SheetPrimitive } from "radix-ui";
import { ReactNode, useContext } from "react";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { DayButton, DayPicker, Locale, getDefaultClassNames } from "react-day-picker";
import { clsx as clsx_2 } from "clsx";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { Drawer as DrawerPrimitive } from "vaul";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";
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

interface TagInputProps {
  placeholder?: string;
  value?: string[];
  onChange: (value: string[]) => void;
  className?: string;
  id?: string;
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

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ placeholder, value = [], onChange, className, id, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeTag(value.length - 1);
      }
    };

    const addTag = () => {
      const trimmed = inputValue.trim().replace(/,/g, "");
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
      setInputValue("");
    };

    const removeTag = (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    };

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "border-input bg-background/50 focus-within:ring-primary/20 focus-within:border-primary/50 flex min-h-10 w-full cursor-text flex-wrap items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all duration-200 focus-within:ring-2 [&>div]:w-auto [&>div]:flex-1",
          className,
        )}
      >
        {value.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-secondary/80 border-border/40 hover:bg-secondary animate-in fade-in zoom-in-95 flex items-center gap-1 rounded-lg border py-0.5 pl-2 pr-1 font-semibold transition-all duration-150"
          >
            <span className="text-xs">{tag}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground h-4 w-4 cursor-pointer rounded p-0 transition-colors"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </Button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="h-7 min-w-[120px] border-0 bg-transparent px-0 py-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          {...props}
        />
      </div>
    );
  },
);
TagInput.displayName = "TagInput";
const internshipModeSchema = z.enum(["ONLINE", "OFFLINE", "HYBRID"]);

const internshipTypeSchema = z.enum(["PAID", "STIPEND", "FREE"]);

const internshipCategorySchema = z.enum([
      "RUNNING",
      "ON_CAMPUS",
      "VIRTUAL",
    ]);

const createInternshipSchema = z.object({
      title: z.string().min(3, "Title must be at least 3 characters").max(100),
      description: z.string().min(10, "Description must be at least 10 characters"),
      companyName: z.string().min(2, "Company name is required"),
      location: z.string().min(2, "Location is required"),
      mode: internshipModeSchema.default("OFFLINE"),
      type: internshipTypeSchema,
      category: internshipCategorySchema.default("RUNNING"),
      department: z.string().optional().nullable(),
      modules: z.array(z.string()).optional(),
      projectFocus: z.string().optional().nullable(),
      tools: z.array(z.string()).optional(),
      skills: z.array(z.string()).optional(),
      credits: z.string().optional().nullable(),
      qualification: z.string().optional().nullable(),
      timePeriod: z.string().optional().nullable(),
      facilities: z.string().optional().nullable(),
      careerOpportunity: z.string().optional().nullable(),
      contact: z.string().optional().nullable(),
      organizer: z.string().optional().nullable(),
      lastDate: z.coerce.date().optional().nullable(),
      price: z.number().nonnegative().optional().nullable(),
      stipendAmount: z.number().nonnegative().optional().nullable(),
      duration: z.string().min(1, "Duration is required"),
      startDate: z.coerce.date().optional(),
      onboardingDetails: z.string().optional(),
      instructorId: z.string().cuid("Invalid Instructor ID").optional().nullable(),
    });

const ZCreateInternship = createInternshipSchema.extend({
      startDate: z_2.union([z_2.string(), z_2.date()]).optional().nullable(),
      lastDate: z_2.union([z_2.string(), z_2.date()]).optional().nullable(),
      department: z_2.string().optional().nullable(),
      contact: z_2.string().optional().nullable(),
      organizer: z_2.string().optional().nullable(),
      projectFocus: z_2.string().optional().nullable(),
      timePeriod: z_2.string().optional().nullable(),
      credits: z_2.string().optional().nullable(),
      qualification: z_2.string().optional().nullable(),
      facilities: z_2.string().optional().nullable(),
      careerOpportunity: z_2.string().optional().nullable(),
      onboardingDetails: z_2.string().optional().nullable(),
      instructorId: z_2.string().optional().nullable(),
      modules: z_2.union([z_2.string(), z_2.array(z_2.string())]).optional(),
      tools: z_2.union([z_2.string(), z_2.array(z_2.string())]).optional(),
      skills: z_2.union([z_2.string(), z_2.array(z_2.string())]).optional(),
    });

type TCreateInternship = z_2.infer<typeof ZCreateInternship>;

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

function Switch({
      className,
      size = "default",
      ...props
    }: React.ComponentProps<typeof SwitchPrimitive.Root> & {
      size?: "sm" | "default";
    }) {
      return (
        <SwitchPrimitive.Root
          data-slot="switch"
          data-size={size}
          className={cn(
            "group/switch focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50 peer relative inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-2 data-[size=default]:h-[16.6px] data-[size=sm]:h-[14px] data-[size=default]:w-[28px] data-[size=sm]:w-[24px]",
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className="bg-background group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3"
          />
        </SwitchPrimitive.Root>
      );
    }

interface AddFormProps extends React_3.FormHTMLAttributes<HTMLFormElement> {
      isOpen?: boolean;
      setIsOpen?: (isOpen: boolean) => void;
    }

function cn_13(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

function Select_15({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_15({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

function Popover_5({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Root>) {
      return <PopoverPrimitive.Root data-slot="popover" {...props} />;
    }

function PopoverTrigger_5({
      ...props
    }: React_3.ComponentProps<typeof PopoverPrimitive.Trigger>) {
      return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
    }

interface RichTextEditorProps {
      value?: string;
      onChange?: (html: string) => void;
    }

type ToolButton =
      | { type: "sep" }
      | {
          type: "btn";
          label: string;
          icon?: React_3.ReactNode;
          text?: string;
          run: () => void;
        };

function cn_14(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }


export default function PostInternshipPage() {
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
            toast.error(error.message || "Failed to submit registration.");
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
            toast.error(error.message || "Failed to update registration.");
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

    function RichTextEditor_2({
      value = "",
      onChange,
    }: RichTextEditorProps) {
      const editorRef = useRef<HTMLDivElement>(null);
      const [showHtml, setShowHtml] = useState(false);
      const [html, setHtml] = useState(value);
      const didInit = useRef(false);

        useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
          editorRef.current.innerHTML = value || "";
          setHtml(value || "");
        }
      }, [value]);

      const emit = (next: string) => {
        setHtml(next);
        onChange?.(next);
      };

      const syncFromEditor = () => {
        if (editorRef.current) emit(editorRef.current.innerHTML);
      };

      const exec = (command: string, arg?: string) => {
        editorRef.current?.focus();
                document.execCommand(command, false, arg);
        syncFromEditor();
      };

      const formatBlock = (tag: string) => exec("formatBlock", tag);

      const addLink = () => {
        const url = window.prompt("Enter URL");
        if (url) exec("createLink", url);
      };

      const tools: ToolButton[] = [
        {
          type: "btn",
          label: "Bold (Ctrl+B)",
          icon: <Bold className="size-4" />,
          run: () => exec("bold"),
        },
        {
          type: "btn",
          label: "Italic (Ctrl+I)",
          icon: <Italic className="size-4" />,
          run: () => exec("italic"),
        },
        { type: "sep" },
        {
          type: "btn",
          label: "Heading 2",
          text: "H₂",
          run: () => formatBlock("h2"),
        },
        {
          type: "btn",
          label: "Heading 3",
          text: "H₃",
          run: () => formatBlock("h3"),
        },
        {
          type: "btn",
          label: "Paragraph",
          text: "P",
          run: () => formatBlock("p"),
        },
        { type: "sep" },
        {
          type: "btn",
          label: "Bullet list",
          icon: <List className="size-4" />,
          run: () => exec("insertUnorderedList"),
        },
        {
          type: "btn",
          label: "Numbered list",
          icon: <ListOrdered className="size-4" />,
          run: () => exec("insertOrderedList"),
        },
        {
          type: "btn",
          label: "Quote",
          icon: <Quote className="size-4" />,
          run: () => formatBlock("blockquote"),
        },
        {
          type: "btn",
          label: "Code block",
          icon: <Code className="size-4" />,
          run: () => formatBlock("pre"),
        },
        {
          type: "btn",
          label: "Divider",
          icon: <Minus className="size-4" />,
          run: () => exec("insertHorizontalRule"),
        },
        { type: "sep" },
        {
          type: "btn",
          label: "Insert link",
          icon: <LinkIcon className="size-4" />,
          run: addLink,
        },
        {
          type: "btn",
          label: "Clear formatting",
          icon: <RemoveFormatting className="size-4" />,
          run: () => exec("removeFormat"),
        },
        { type: "sep" },
        {
          type: "btn",
          label: "Undo",
          icon: <Undo2 className="size-4" />,
          run: () => exec("undo"),
        },
        {
          type: "btn",
          label: "Redo",
          icon: <Redo2 className="size-4" />,
          run: () => exec("redo"),
        },
      ];

      const toggleHtml = () => {
        if (showHtml) {
                if (editorRef.current) editorRef.current.innerHTML = html;
        } else {
                if (editorRef.current) setHtml(editorRef.current.innerHTML);
        }
        setShowHtml((s) => !s);
      };

      return (
        <div className="bg-background overflow-hidden rounded-xl border">
          {}
          <div className="border-border/60 flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5">
            {tools.map((tool, i) =>
              tool.type === "sep" ? (
                <span
                  key={`sep-${i}`}
                  className="bg-border/70 mx-1 h-5 w-px"
                  aria-hidden
                />
              ) : (
                <button
                  key={tool.label}
                  type="button"
                  title={tool.label}
                  aria-label={tool.label}
                  disabled={showHtml}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={tool.run}
                  className="text-muted-foreground hover:bg-muted/60 hover:text-foreground flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-xs font-semibold transition-colors disabled:opacity-40"
                >
                  {tool.icon ?? tool.text}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={toggleHtml}
              className={cn_14(
                "ml-auto flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors",
                showHtml
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Code className="size-3.5" /> HTML
            </button>
          </div>

          {}
          {showHtml ? (
            <textarea
              value={html}
              onChange={(e) => emit(e.target.value)}
              spellCheck={false}
              className="min-h-80 w-full resize-y bg-transparent p-4 font-mono text-xs leading-relaxed outline-none"
              placeholder="<p>Write raw HTML here…</p>"
            />
          ) : (
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={syncFromEditor}
              data-placeholder="Write your article…"
              className={cn_14(
                "prose prose-sm dark:prose-invert text-foreground dark:text-foreground [&_*]:text-foreground max-w-none",
                "min-h-80 w-full p-4 text-sm leading-relaxed outline-none",
                "empty:before:text-muted-foreground/70 empty:before:content-[attr(data-placeholder)]",
              )}
            />
          )}

          {}
          <div className="border-border/60 text-muted-foreground border-t px-4 py-2 text-[11px]">
            Tip: Use toolbar or keyboard shortcuts — Ctrl+B Bold, Ctrl+I Italic.
            Switch to HTML view for raw editing.
          </div>
        </div>
      );
    }

    function AddForm_7({
      isOpen,
      setIsOpen,
      className,
      ...props
    }: AddFormProps) {
      const router = useRouter();
      const [showDialog, setShowDialog] = React_3.useState(true);
      const [isStartDateOpen, setIsStartDateOpen] = React_3.useState(false);
      const [isLastDateOpen, setIsLastDateOpen] = React_3.useState(false);

      const { mutate: createRunningInternship, isPending } =
        InstructorDataHooks.useCreateRunningInternship();

      const form = useForm<TCreateInternship>({
        resolver: zodResolver(
          ZCreateInternship,
        ) as unknown as Resolver<TCreateInternship>,
        defaultValues: {
          title: "",
          description: "",
          companyName: "",
          location: "",
          type: "FREE",
          price: null,
          stipendAmount: null,
          duration: "",
          startDate: "",
          lastDate: "",
          onboardingDetails: "",
          category: "RUNNING",
          mode: "OFFLINE",
          department: "",
          modules: [],
          tools: [],
          skills: [],
          projectFocus: "",
          credits: "",
          contact: "",
          timePeriod: "",
          qualification: "",
          facilities: "",
          careerOpportunity: "",
          organizer: "",
        },
      });

      const selectedType = form.watch("type");
      const selectedMode = form.watch("mode");

      React_3.useEffect(() => {
        if (selectedMode === "ONLINE") {
          form.setValue("location", "Online");
        } else if (form.getValues("location") === "Online") {
          form.setValue("location", "");
        }
      }, [selectedMode, form]);

      const onSubmit = (values: TCreateInternship) => {
        const formatList = (val: string | string[] | undefined): string[] => {
          if (!val) return [];
          if (Array.isArray(val)) return val;
          return val
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        };

        const payload: CreateInternshipPayload = {
          title: values.title,
          description: values.description,
          companyName: values.companyName,
          location: values.location,
          type: values.type,
          price: values.type === "PAID" ? values.price : null,
          stipendAmount: values.type === "STIPEND" ? values.stipendAmount : null,
          duration: values.duration,
          startDate: values.startDate
            ? new Date(values.startDate).toISOString()
            : undefined,
          lastDate: values.lastDate
            ? new Date(values.lastDate).toISOString()
            : undefined,
          onboardingDetails: values.onboardingDetails || undefined,
          category: "RUNNING",
          mode: (values.mode as "OFFLINE" | "ONLINE" | "HYBRID") || "OFFLINE",
          department: values.department || undefined,
          modules: formatList(values.modules),
          tools: formatList(values.tools),
          skills: formatList(values.skills),
          projectFocus: values.projectFocus || undefined,
          credits: values.credits ? String(values.credits) : undefined,
          contact: values.contact || undefined,
          timePeriod: values.timePeriod || undefined,
          qualification: values.qualification || undefined,
          facilities: values.facilities || undefined,
          careerOpportunity: values.careerOpportunity || undefined,
          organizer: values.organizer || undefined,
        };

        createRunningInternship(payload, {
          onSuccess: () => {
            form.reset();
            setShowDialog(false);
            router.back();
          },
        });
      };

      const handleClose = () => {
        setShowDialog(false);
        router.back();
      };

      const formContent = (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn_13("space-y-6 pb-2 pt-4", className)}
            {...props}
          >
            {}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <Briefcase_2 className="text-primary size-4" />
                <h3 className="text-foreground text-sm font-bold">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Internship Title *
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="e.g. Software Engineering Practice (Full-Stack)"
                          icon={Briefcase_2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Company Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="companyName"
                          placeholder="e.g. IIIT Center of Excellence"
                          icon={Building2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Internship Mode *
                      </FormLabel>
                      <Select_15
                        onValueChange={field.onChange}
                        defaultValue={field.value || "OFFLINE"}
                      >
                        <FormControl>
                          <SelectTrigger id="mode">
                            <SelectValue_15 placeholder="Select Mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ONLINE">Online (Remote)</SelectItem>
                          <SelectItem value="OFFLINE">
                            Offline (In-Person)
                          </SelectItem>
                          <SelectItem value="HYBRID">Hybrid</SelectItem>
                        </SelectContent>
                      </Select_15>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedMode === "OFFLINE" || selectedMode === "HYBRID" ? (
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">
                          Location *
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="location"
                            placeholder="e.g. Bangalore Campus (IIIT)"
                            icon={MapPin_2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="hidden sm:block" />
                )}

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Duration *
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="duration"
                          placeholder="e.g. 3 Months"
                          icon={Clock_2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1 text-xs font-semibold">
                        Start Date
                      </FormLabel>
                      <Popover_5
                        open={isStartDateOpen}
                        onOpenChange={setIsStartDateOpen}
                      >
                        <PopoverTrigger_5 asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn_13(
                                "border-input bg-background h-10 w-full justify-start border pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <Calendar_3 className="mr-2 h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger_5>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date ? date.toISOString() : null);
                              setIsStartDateOpen(false);
                            }}
                            disabled={(date) => date < new Date("1900-01-01")}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover_5>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1 text-xs font-semibold">
                        Last Date to Apply
                      </FormLabel>
                      <Popover_5
                        open={isLastDateOpen}
                        onOpenChange={setIsLastDateOpen}
                      >
                        <PopoverTrigger_5 asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn_13(
                                "border-input bg-background h-10 w-full justify-start border pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <Calendar_3 className="mr-2 h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger_5>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date ? date.toISOString() : null);
                              setIsLastDateOpen(false);
                            }}
                            disabled={(date) => date < new Date("1900-01-01")}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover_5>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <DollarSign className="size-4 text-emerald-600" />
                <h3 className="text-foreground text-sm font-bold">
                  Compensation & Type
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem
                      className={cn_13(selectedType === "FREE" ? "sm:col-span-2" : "")}
                    >
                      <FormLabel className="text-xs font-semibold">
                        Internship Type *
                      </FormLabel>
                      <Select_15
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="type">
                            <SelectValue_15 placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FREE">Free (No fees)</SelectItem>
                          <SelectItem value="STIPEND">
                            Stipend-based (Paid to Student)
                          </SelectItem>
                          <SelectItem value="PAID">
                            Paid (Enrollment Fee Required)
                          </SelectItem>
                        </SelectContent>
                      </Select_15>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedType === "PAID" && (
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">
                          Enrollment Fee (INR) *
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="price"
                            type="number"
                            placeholder="e.g. 2999"
                            icon={DollarSign}
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value),
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedType === "STIPEND" && (
                  <FormField
                    control={form.control}
                    name="stipendAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">
                          Stipend Amount (INR / Month) *
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="stipendAmount"
                            type="number"
                            placeholder="e.g. 5000"
                            icon={DollarSign}
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value),
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            {}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <Layers className="size-4 text-amber-600" />
                <h3 className="text-foreground text-sm font-bold">
                  Cohort & Academic Metadata
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Program Category *
                      </FormLabel>
                      <Select_15
                        disabled
                        onValueChange={field.onChange}
                        value="RUNNING"
                      >
                        <FormControl>
                          <SelectTrigger
                            id="category"
                            className="bg-muted/50 cursor-not-allowed"
                          >
                            <SelectValue_15 placeholder="Running Program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="RUNNING">Running Program</SelectItem>
                        </SelectContent>
                      </Select_15>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Academic Department
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="department"
                          placeholder="e.g. Engineering"
                          icon={Building2}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Time Period / Housing
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="timePeriod"
                          placeholder="e.g. Non-Residential"
                          icon={Clock_2}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Academic Credits
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="credits"
                          placeholder="e.g. 4 Credits"
                          icon={Award}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Organizer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="organizer"
                          placeholder="e.g. IIIT Center of Excellence"
                          icon={Building2}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Contact Details
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="contact"
                          placeholder="e.g. Mr. Rajan Kumar (+91 9472351693)"
                          icon={UserCheck}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel className="text-xs font-semibold">
                        Eligibility / Qualification Required
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="qualification"
                          placeholder="e.g. B.Tech/M.Tech (CS/IT) 3rd/4th Year"
                          icon={BookOpen}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                <FileText className="size-4 text-purple-600" />
                <h3 className="text-foreground text-sm font-bold">
                  Details, Facilities & Career Opportunities
                </h3>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Job Description *
                      </FormLabel>
                      <FormControl>
                        <RichTextEditor_2
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectFocus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Project Focus Area
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="projectFocus"
                          placeholder="e.g. Real-time Telemetry Dashboard"
                          icon={Sparkles_2}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Facilities Provided
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="facilities"
                          placeholder="e.g. Access to high-performance computing lab, library subscription, and lunch coupons"
                          className="min-h-16"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="careerOpportunity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Career Opportunities
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="careerOpportunity"
                          placeholder="e.g. Pre-placement interview (PPI) opportunity with partner tech firms"
                          className="min-h-16"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onboardingDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Onboarding Instructions
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="onboardingDetails"
                          placeholder="Provide onboarding details such as setup commands, document links, etc."
                          className="min-h-20"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="modules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Modules
                      </FormLabel>
                      <FormControl>
                        <TagInput
                          id="modules"
                          placeholder="e.g. Microservices Architecture, Docker & Kubernetes, CI/CD Setup"
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className="text-[10px]">
                        Press Enter or Comma after typing each module.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Tools Required
                      </FormLabel>
                      <FormControl>
                        <TagInput
                          id="tools"
                          placeholder="e.g. Next.js, Go, Docker, Kubernetes, Prometheus"
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className="text-[10px]">
                        Press Enter or Comma after typing each tool.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">
                        Skills Imparted
                      </FormLabel>
                      <FormControl>
                        <TagInput
                          id="skills"
                          placeholder="e.g. TypeScript, Golang, Docker basics"
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className="text-[10px]">
                        Press Enter or Comma after typing each skill.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="border-border hover:bg-muted h-10 cursor-pointer px-5 font-semibold"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-primary-foreground h-10 cursor-pointer gap-2 px-6 font-semibold"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Create & Post Internship"
                )}
              </Button>
            </div>
          </form>
        </Form>
      );

      return (
        <ResponsiveDialog
          isOpen={showDialog}
          setIsOpen={(open) => !open && handleClose()}
          title="Propose Running Internship"
          description="Fill in the details below to propose a new running internship cohort."
          className="sm:max-w-4xl"
        >
          {formContent}
        </ResponsiveDialog>
      );
    }

  return <AddForm_7 />;
}
