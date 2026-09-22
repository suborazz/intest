"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React_2, { useState } from "react";
import { Award, BookOpen, Briefcase as Briefcase_2, Building as Building_2, Calendar, CheckCircle2, Clock as Clock_2, Coffee, GraduationCap as GraduationCap_2, HelpCircle, Key, Layers, MapPin as MapPin_2, Phone as Phone_2, Send, Share2, Shield, Sparkles as Sparkles_2, Terminal, User, Check } from "lucide-react";
import * as React from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Select as SelectPrimitive } from "radix-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LucideIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, XIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import * as z_2 from "zod";
import { z } from "zod";
import { Slot, Dialog as SheetPrimitive } from "radix-ui";
import { ReactNode, useEffect, useContext } from "react";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { clsx as clsx_2 } from "clsx";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { Drawer as DrawerPrimitive } from "vaul";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";
import { axiosInstance } from "@/x/acfb3dca";
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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

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

const emailSchema = z
      .string({ error: "Email is required" })
      .email("Invalid email address")
      .toLowerCase()
      .trim();

const createInternshipInterestSchema = z.object({
      name: z.string().min(2, "Name must be at least 2 characters").trim(),
      address: z.string().min(5, "Address must be at least 5 characters").trim(),
      education: z.string().min(2, "Education level is required").trim(),
      mobile: z.string().min(10, "Mobile must be at least 10 digits").trim(),
      email: emailSchema,
    });

const ZInternshipInterest = createInternshipInterestSchema;

type TInternshipInterest = z_2.infer<typeof ZInternshipInterest>;

function cn_6(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

function Select_2({
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_2({
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
    }

interface InternshipDetailsProps {
      internship: {
        projectFocus?: string;
        modules: string[];
        tools: string[];
        skills: string[];
        facilities?: string;
        careerOpportunity?: string;
      };
    }

interface InternshipHeroProps {
      internship: {
        id: string;
        title: string;
        type: string;
        categoryLabel: string;
        department?: string;
        companyName: string;
        imageUrl?: string | null;
      };
      setIsOpen: (open: boolean) => void;
    }

interface InternshipSidebarProps {
      internship: {
        fee: string;
        location: string;
        duration: string;
        startDate: string;
        lastDate: string;
        credits?: string;
        qualification: string;
        mentor?: string;
        organizer: string;
        contact: string;
        type?: string;
      };
      setIsOpen: (open: boolean) => void;
    }

let categoryLabel = "Free of Cost";

let typeLabel = "Full Time";

const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A";
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

const parseList = (val: string[] | string | null | undefined): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (_e) {}
    return [String(val)];
  };


export default function InternshipDetailPage() {
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

    interface ApplyInternshipFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
      isOpen: boolean;
      setIsOpen: (isOpen: boolean) => void;
      internshipId: string;
      internshipTitle?: string;
    }

    const ApplyInternshipForm_2: React.FunctionComponent<
      ApplyInternshipFormProps
    > = ({
      isOpen,
      setIsOpen,
      className,
      internshipId,
      internshipTitle,
      ...props
    }) => {
      const form = useForm<TInternshipInterest>({
        resolver: zodResolver(ZInternshipInterest),
        defaultValues: {
          name: "",
          address: "",
          education: undefined,
          mobile: "",
          email: "",
        },
      });

      const { mutate: submitInterest, isPending } =
        StudentDataHook.useSubmitInternshipInterest({
          onSuccess: () => {
            form.reset();
            setIsOpen(false);
          },
        });

      function onSubmit(values: TInternshipInterest) {
        submitInterest({ id: internshipId, payload: values });
      }

      return (
        <ResponsiveDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Interest Send"
          description={`Express your interest in the "${internshipTitle || "Internship"}" program.`}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn_6("grid gap-4 pb-0 pt-4", className)}
              {...props}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-semibold">
                      Name *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-semibold">
                      Address *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-semibold">
                      Education *
                    </FormLabel>
                    <Select_2
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full text-left">
                          <SelectValue_2 placeholder="Select education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Matriculation">Matriculation</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Under Graduate">
                          Under Graduate
                        </SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="Under Post Graduate">
                          Under Post Graduate
                        </SelectItem>
                        <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                        <SelectItem value="M.Phil.">M.Phil.</SelectItem>
                        <SelectItem value="Ph.D">Ph.D</SelectItem>
                      </SelectContent>
                    </Select_2>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-semibold">
                        Mobile No. *
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="+91 xxxxxxxxxx" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-sm font-semibold">
                        Email ID *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-1 mt-1 w-full">
                <button
                  disabled={isPending}
                  type="submit"
                  className="bg-linear-to-r from-primary hover:from-primary/90 text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg border-0 to-emerald-500 px-6 py-2.5 font-bold shadow-md transition-all duration-300 hover:to-emerald-500/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{isPending ? "Sending..." : "Interest Send"}</span>
                </button>
              </div>
            </form>
          </Form>
        </ResponsiveDialog>
      );
    };

    const ApplyInternshipForm_3 = ApplyInternshipForm_2;
    const InternshipDetails_2 = ({ internship }: InternshipDetailsProps) => {
      return (
        <div className="space-y-10 px-1 py-4">
          {}
          {internship.projectFocus && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Project Focus & Outcome
              </h3>
              <p className="text-foreground/80 pl-7 text-sm font-medium leading-relaxed sm:text-base">
                {internship.projectFocus}
              </p>
            </div>
          )}

          {}
          {internship.modules.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-foreground flex items-center gap-2 text-lg font-bold">
                <Layers className="text-primary h-5 w-5" />
                Structure & Key Modules
              </h3>
              <div className="grid grid-cols-1 gap-3 pl-7 sm:grid-cols-2">
                {internship.modules.map((mod, idx) => (
                  <div
                    key={mod}
                    className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/80 dark:bg-zinc-800/40"
                  >
                    <span className="bg-primary/10 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-foreground/80 text-sm font-semibold leading-snug">
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {(internship.tools.length > 0 || internship.skills.length > 0) && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {}
              {internship.tools.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-foreground flex items-center gap-2 text-lg font-bold">
                    <Terminal className="h-5 w-5 text-amber-500" />
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {internship.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-primary/10 text-primary border-primary/5 hover:bg-primary/15 cursor-default rounded-xl border px-4 py-1.5 text-xs font-bold transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}

              {}
              {internship.skills.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-foreground flex items-center gap-2 text-lg font-bold">
                    <BookOpen className="h-5 w-5 text-teal-500" />
                    Skills & Prerequisites
                  </h3>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {internship.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl border border-teal-500/10 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-600 dark:text-teal-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          )}

          {}
          {(internship.facilities || internship.careerOpportunity) && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {}
              {internship.facilities ? (
                <div className="space-y-3">
                  <h3 className="text-foreground flex items-center gap-2 text-lg font-bold">
                    <Coffee className="h-5 w-5 text-orange-500" />
                    Facilities & Benefits
                  </h3>
                  <div className="ml-7 flex gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
                      <Sparkles_2 className="h-3.5 w-3.5 text-amber-600" />
                    </span>
                    <p className="text-foreground/90 text-sm font-semibold leading-relaxed">
                      {internship.facilities}
                    </p>
                  </div>
                </div>
              ) : (
                <div />
              )}

              {}
              {internship.careerOpportunity ? (
                <div className="space-y-3">
                  <h3 className="text-foreground flex items-center gap-2 text-lg font-bold">
                    <Award className="h-5 w-5 text-emerald-500" />
                    Career Scope & Placements
                  </h3>
                  <div className="ml-7 flex gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                    <p className="text-foreground/90 text-sm font-semibold leading-relaxed">
                      {internship.careerOpportunity}
                    </p>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      );
    };
    const InternshipHero = ({
      internship,
      setIsOpen,
    }: InternshipHeroProps) => {
      return (
        <div className="relative mb-6 py-2">
          {internship.imageUrl && (
            <div className="relative mb-6 w-full overflow-hidden rounded-2xl border border-border/40 shadow-sm">
              <div className="aspect-16/9 sm:aspect-21/9 max-h-72 w-full overflow-hidden bg-muted/40">
                <img
                  src={internship.imageUrl}
                  alt={internship.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold uppercase">
                  <Briefcase_2 className="h-3 w-3" />
                  {internship.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                  <Sparkles_2 className="h-3 w-3" />
                  {internship.categoryLabel}
                </span>
                {internship.department && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                    {internship.department}
                  </span>
                )}
              </div>
              <h1 className="text-foreground text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {internship.title}
              </h1>
              {!(
                internship.type === "Virtual" || internship.type === "On-Campus"
              ) && (
                <p className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                  <Building_2 className="text-primary h-4 w-4" />
                  {internship.companyName}
                </p>
              )}
            </div>

            <div className="flex min-w-[200px] flex-col gap-3 sm:flex-row md:flex-col">
              {internship.type === "Running" ? (
                <Link
                  href="/sign-up?role=STUDENT"
                  className="bg-linear-to-r from-primary hover:from-primary/95 flex items-center justify-center gap-2 rounded-xl to-emerald-500 px-6 py-3 text-center font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:to-emerald-500/95"
                >
                  <Send className="h-4 w-4" />
                  Apply Now
                </Link>
              ) : (
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-linear-to-r from-primary hover:from-primary/95 flex items-center justify-center gap-2 rounded-xl to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:to-emerald-500/95"
                >
                  <Send className="h-4 w-4" />
                  Express Interest
                </button>
              )}
              <button
                onClick={() => {
                  const url = window.location.href;
                  const shareText = `Check out this Internship Opportunity: "${internship.title}" at ${internship.companyName}\nCategory: ${internship.categoryLabel}\nType: ${internship.type}\n\nApply Link: ${url}`;
                  if (navigator.share) {
                    navigator
                      .share({
                        title: internship.title,
                        text: shareText,
                        url: url,
                      })
                      .catch(console.error);
                  } else {
                    navigator.clipboard.writeText(shareText);
                    toast.success("Internship details & apply link copied!");
                  }
                }}
                className="text-foreground flex items-center justify-center gap-2 rounded-xl border border-zinc-200/80 px-6 py-3 font-semibold transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80"
                title="Share Internship"
              >
                <Share2 className="h-4 w-4" />
                Share Internship
              </button>
            </div>
          </div>
        </div>
      );
    };
    const InternshipSidebar = ({
      internship,
      setIsOpen,
    }: InternshipSidebarProps) => {
      const isOnCampusVirtual =
        internship.type === "Virtual" || internship.type === "On-Campus";

      return (
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {}
          <div className="space-y-6 rounded-2xl border border-white/60 bg-white/50 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
            <h3 className="text-foreground border-border/50 flex items-center gap-2 border-b pb-3 text-lg font-bold">
              <Shield className="text-primary h-5 w-5" />
              Quick Overview
            </h3>

            {}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {isOnCampusVirtual ? (
                            <div className="col-span-2 flex flex-col">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                    <Clock_2 className="h-3.5 w-3.5 text-blue-500" />
                    Duration
                  </span>
                  <span className="text-foreground/80 mt-0.5 text-sm font-bold">
                    {internship.duration}
                  </span>
                </div>
              ) : (
                <>
                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <Sparkles_2 className="h-3.5 w-3.5 text-amber-500" />
                      Fee structure
                    </span>
                    <span className="mt-0.5 text-sm font-extrabold uppercase text-amber-600 dark:text-amber-400">
                      {internship.fee}
                    </span>
                  </div>

                  {internship.fee && internship.fee !== "Free" && (
                    <div className="col-span-2 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-3">
                      <p className="text-muted-foreground text-xs font-medium leading-relaxed">
                        The internship program is completely free of charge. The
                        contribution fee being collected is for the special personal
                        amenities and other essential services provided during the
                        internship.
                      </p>
                    </div>
                  )}

                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <MapPin_2 className="h-3.5 w-3.5 text-emerald-500" />
                      Location
                    </span>
                    <span className="text-foreground/80 mt-0.5 truncate text-sm font-bold">
                      {internship.location}
                    </span>
                  </div>

                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <Clock_2 className="h-3.5 w-3.5 text-blue-500" />
                      Duration
                    </span>
                    <span className="text-foreground/80 mt-0.5 text-sm font-bold">
                      {internship.duration}
                    </span>
                  </div>

                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <Calendar className="h-3.5 w-3.5 text-violet-500" />
                      Start Date
                    </span>
                    <span className="text-foreground/80 mt-0.5 text-sm font-bold">
                      {internship.startDate}
                    </span>
                  </div>

                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <Calendar className="h-3.5 w-3.5 text-rose-500" />
                      Last Date
                    </span>
                    <span className="mt-0.5 text-sm font-bold text-rose-600 dark:text-rose-400">
                      {internship.lastDate}
                    </span>
                  </div>

                  {}
                  {internship.credits && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                        <Award className="h-3.5 w-3.5 text-cyan-500" />
                        Credits
                      </span>
                      <span className="text-foreground/80 mt-0.5 text-sm font-bold">
                        {internship.credits}
                      </span>
                    </div>
                  )}

                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <GraduationCap_2 className="h-3.5 w-3.5 text-indigo-500" />
                      Qualification
                    </span>
                    <span className="text-foreground/80 mt-0.5 text-xs font-bold leading-snug">
                      {internship.qualification}
                    </span>
                  </div>

                  {}
                  {internship.mentor ? (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                        <User className="h-3.5 w-3.5 text-orange-500" />
                        Mentor
                      </span>
                      <span className="text-foreground/80 mt-0.5 text-xs font-bold leading-snug">
                        {internship.mentor}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                        <Building_2 className="h-3.5 w-3.5 text-sky-500" />
                        Organizer
                      </span>
                      <span className="text-foreground/80 mt-0.5 text-xs font-bold leading-snug">
                        {internship.organizer}
                      </span>
                    </div>
                  )}

                  {}
                  {internship.mentor && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                        <Building_2 className="h-3.5 w-3.5 text-sky-500" />
                        Organizer
                      </span>
                      <span className="text-foreground/80 mt-0.5 text-xs font-bold leading-snug">
                        {internship.organizer}
                      </span>
                    </div>
                  )}

                  {}
                  <div className="flex flex-col">
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                      <Phone_2 className="h-3.5 w-3.5 text-teal-500" />
                      Contact
                    </span>
                    <span className="text-foreground/80 mt-0.5 text-xs font-bold leading-snug">
                      {internship.contact}
                    </span>
                  </div>
                </>
              )}
            </div>

            {}
            {internship.type === "Running" ? (
              <Link
                href="/sign-up?role=STUDENT"
                className="bg-linear-to-r from-primary hover:from-primary/95 mt-4 flex w-full items-center justify-center gap-2 rounded-xl to-emerald-500 py-3 text-center font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:to-emerald-500/95"
              >
                <Send className="h-4 w-4" />
                Apply Now
              </Link>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="bg-linear-to-r from-primary hover:from-primary/95 mt-4 flex w-full items-center justify-center gap-2 rounded-xl to-emerald-500 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:to-emerald-500/95"
              >
                <Send className="h-4 w-4" />
                Express Interest Now
              </button>
            )}
          </div>

          {}
          {!isOnCampusVirtual && (
            <div className="space-y-3 rounded-2xl border border-white/60 bg-white/40 p-6 backdrop-blur-md dark:border-white/10 dark:bg-black/20">
              <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                <HelpCircle className="text-primary h-4 w-4" />
                Need Assistance?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                If you have any questions regarding the internship syllabus, dates,
                registration fees, or certificates, please reach out via the
                official helpdesk or contact details listed above.
              </p>
            </div>
          )}
        </div>
      );
    };

  const { id } = useParams() as { id: string };
  const { data: res, isLoading } = StudentDataHook.useInternships();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm font-semibold">
            Loading Internship Details...
          </p>
        </div>
      </main>
    );
  }

    const rawInternships = res?.data || [];
  const foundRaw = rawInternships.find((i) => i.id === id);

  if (!foundRaw) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-md rounded-2xl border border-white/60 bg-white/50 p-8 text-center shadow-xl backdrop-blur-md dark:border-white/20 dark:bg-black/40">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-rose-500" />
          <h1 className="text-foreground mb-2 text-2xl font-bold">
            Internship Not Found
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            The internship program you are looking for might have expired, been
            removed, or the link is incorrect.
          </p>
          <Link
            href="/internship/running-internship"
            className="bg-primary text-primary-foreground hover:bg-primary/95 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Internships
          </Link>
        </div>
      </main>
    );
  }
  if (foundRaw.type === "PAID") categoryLabel = "By Paying Fees";
  else if (foundRaw.type === "STIPEND") categoryLabel = "Stipend";
  if (foundRaw.mode === "ONLINE") typeLabel = "Virtual";
  else if (foundRaw.mode === "HYBRID") typeLabel = "Part Time";
  const internship = {
    id: foundRaw.id,
    title: foundRaw.title,
    description: foundRaw.description,
    companyName: foundRaw.companyName || "IIInternship Partner",
    location: foundRaw.location || "Remote",
    type:
      foundRaw.category === "VIRTUAL"
        ? "Virtual"
        : foundRaw.category === "ON_CAMPUS"
          ? "On-Campus"
          : "Running",
    duration: foundRaw.duration || "8 Weeks",
    department:
      foundRaw.category === "ON_CAMPUS" || foundRaw.category === "VIRTUAL"
        ? foundRaw.category
        : foundRaw.department || "Engineering",
    projectFocus: foundRaw.projectFocus || "",
    modules: parseList(foundRaw.modules),
    tools: parseList(foundRaw.tools),
    skills: parseList(foundRaw.skills),
    credits: foundRaw.credits ? String(foundRaw.credits) : "4 Credits",
    contact: foundRaw.contact || "Program Desk (+91 9472351693)",
    organizer: foundRaw.companyName || "IIIT Center of Excellence",
    startDate: foundRaw.startDate
      ? formatDate(foundRaw.startDate)
      : "Immediate",
    lastDate: (foundRaw as unknown as { lastDate?: string | null }).lastDate
      ? formatDate(
          (foundRaw as unknown as { lastDate?: string | null }).lastDate,
        )
      : "Open Until Filled",
    fee: foundRaw.price ? `₹${foundRaw.price.toLocaleString()}` : "Free",
    categoryLabel,
    typeLabel,
    imageUrl: (foundRaw as unknown as { imageUrl?: string | null }).imageUrl || null,
    timePeriod:
      (foundRaw as unknown as Record<string, string>).timePeriod ||
      "Non-Residential",
    facilities:
      (foundRaw as unknown as Record<string, string>).facilities || "",
    careerOpportunity:
      (foundRaw as unknown as Record<string, string>).careerOpportunity || "",
    mentor: foundRaw.mentor?.name || "Senior Instructor",
    qualification:
      (foundRaw as unknown as Record<string, string>).qualification ||
      "B.Tech/M.Tech (CS/IT) or equivalent",
  };

  return (
    <main className="bg-background relative min-h-screen pb-24 pt-[20px]">
      {}
      <div className="pointer-events-none absolute left-[-10%] top-40 h-[400px] w-[400px] rounded-full bg-yellow-400 opacity-10 mix-blend-multiply blur-[150px] filter"></div>
      <div className="bg-primary pointer-events-none absolute bottom-40 right-[-10%] h-[500px] w-[500px] rounded-full opacity-10 mix-blend-multiply blur-[180px] filter"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {}
        <InternshipHero internship={internship} setIsOpen={setIsOpen} />

        {}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {}
          <div className="space-y-6 lg:col-span-2">
            {}
            <div className="space-y-3 px-1">
              <h2 className="text-foreground border-border/50 border-b pb-2 text-xl font-bold">
                About the Internship
              </h2>
              <div
                className="text-foreground/90 prose prose-sm dark:prose-invert max-w-none text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: internship.description }}
              />
            </div>
            <InternshipDetails_2 internship={internship} />
          </div>

          {}
          <div className="lg:col-span-1">
            <InternshipSidebar internship={internship} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      <ApplyInternshipForm_3
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        internshipId={internship.id}
        internshipTitle={internship.title}
      />
    </main>
  );
}
