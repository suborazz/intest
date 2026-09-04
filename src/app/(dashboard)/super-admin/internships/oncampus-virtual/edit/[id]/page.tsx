"use client";

import * as React from "react";
import { Bold, Code, Edit, Italic, Link as LinkIcon, List, ListOrdered, Minus, Quote, Redo2, RemoveFormatting, Undo2 } from "lucide-react";
import React_3 from "react";
import { useEffect, useRef, useState } from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { Select as SelectPrimitive } from "radix-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z_3 from "zod";
import { LucideIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Loader2Icon, XIcon, LoaderIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import * as z_2 from "zod";
import { z } from "zod";
import { Slot, Switch as SwitchPrimitive, Dialog as SheetPrimitive } from "radix-ui";
import { ReactNode, useContext } from "react";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
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

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
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

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

interface GenericApiResponse<T = undefined> {
      success: boolean;
      message?: string;
      data?: T;
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

type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

const ZCreateOnCampusVirtual = z_2.object({
      title: z_2.string().min(1, "Title is required"),
      duration: z_2.string().min(1, "Duration is required"),
      type: z_2.literal("FREE").default("FREE"),
      category: z_2.enum(["ON_CAMPUS", "VIRTUAL"]),
      description: z_2.string().min(1, "Description is required"),
      department: z_2.string().optional(),
      project: z_2.string().optional(),
      modules: z_2.union([z_2.string(), z_2.array(z_2.string())]).optional(), 
      tools: z_2.union([z_2.string(), z_2.array(z_2.string())]).optional(),
    });

type TCreateOnCampusVirtual = z_2.infer<typeof ZCreateOnCampusVirtual>;

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

const ZCreateOnCampusVirtual_2 = z_3.object({
      title: z_3.string().min(1, "Title is required"),
      duration: z_3.string().min(1, "Duration is required"),
      type: z_3.literal("FREE").default("FREE"),
      category: z_3.enum(["ON_CAMPUS", "VIRTUAL"]),
      description: z_3.string().min(1, "Description is required"),
      department: z_3.string().optional(),
      project: z_3.string().optional(),
      modules: z_3.union([z_3.string(), z_3.array(z_3.string())]).optional(), 
      tools: z_3.union([z_3.string(), z_3.array(z_3.string())]).optional(),
    });

interface AdminInternshipDetail {
      id: string;
      title: string;
      duration: string;
      type: string;
      category: "ON_CAMPUS" | "VIRTUAL";
      description: string;
      department?: string | null;
      projectFocus?: string | null;
      project?: string | null;
      modules?: string[] | string | null;
      tools?: string[] | string | null;
    }

function Select_22({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_22({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
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


export default function EditOnCampusVirtualInternshipPage({
  params,
}: {
    params: Promise<{ id: string }>;
}) {
    interface IOnCampusVirtualService {
      createInternship: (
        data: Record<string, unknown>,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      getInternshipById: (
        id: string,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      updateInternship: (
        id: string,
        data: Record<string, unknown>,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
    }

    const OnCampusVirtualService: IOnCampusVirtualService = {
      createInternship: async (data: Record<string, unknown>) => {
        const response = await axiosInstance.post(
          `/oncampus-virtual/internships`,
          data,
        );
        return response.data;
      },
      getInternshipById: async (id: string) => {
        const response = await axiosInstance.get(
          `/oncampus-virtual/internships/${id}`,
        );
        return response.data;
      },
      updateInternship: async (id: string, data: Record<string, unknown>) => {
        const response = await axiosInstance.put(
          `/oncampus-virtual/internships/${id}`,
          data,
        );
        return response.data;
      },
    };

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
    const ONCAMPUS_VIRTUAL_QUERY_KEYS = {
      DETAIL: (id: string) => ["oncampus-virtual", "detail", id] as const,
    };

    const OnCampusVirtualDataHooks = {
      useCreateInternship: (
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          Record<string, unknown>
        >,
      ) => {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data: Record<string, unknown>) => {
            return OnCampusVirtualService.createInternship(data);
          },
          onSuccess: (res, variables, context, mutationContext) => {
            toast.success(res.message || "Internship created successfully.");
                    queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"], 
            });
            if (options?.onSuccess) {
              options.onSuccess(res, variables, context, mutationContext);
            }
          },
          onError: (
            err: Error & { response?: { data?: { message?: string } } },
            variables,
            context,
            mutationContext,
          ) => {
            toast.error(
              err.response?.data?.message || "Failed to create internship.",
            );
            if (options?.onError) {
              options.onError(err, variables, context, mutationContext);
            }
          },
        });
      },
      useInternshipDetail: (
        id: string,
        options?: TQueryOptions<GenericApiResponse<InternshipPublic>>,
      ) => {
        return useQuery({
          queryKey: ONCAMPUS_VIRTUAL_QUERY_KEYS.DETAIL(id),
          queryFn: async () => {
            return OnCampusVirtualService.getInternshipById(id);
          },
          ...options,
        });
      },
      useUpdateInternship: (
        id: string,
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          Record<string, unknown>
        >,
      ) => {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data: Record<string, unknown>) => {
            return OnCampusVirtualService.updateInternship(id, data);
          },
          onSuccess: (res, variables, context, mutationContext) => {
            toast.success(res.message || "Internship updated successfully.");
            queryClient.invalidateQueries({
              queryKey: ONCAMPUS_VIRTUAL_QUERY_KEYS.DETAIL(id),
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            if (options?.onSuccess) {
              options.onSuccess(res, variables, context, mutationContext);
            }
          },
          onError: (
            err: Error & { response?: { data?: { message?: string } } },
            variables,
            context,
            mutationContext,
          ) => {
            toast.error(
              err.response?.data?.message || "Failed to update internship.",
            );
            if (options?.onError) {
              options.onError(err, variables, context, mutationContext);
            }
          },
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

    function EditForm_10({ internshipId }: { internshipId: string }) {
      const [showDialog, setShowDialog] = React_3.useState(true);
      const router = useRouter();

      const { data: internshipResp, isLoading } =
        OnCampusVirtualDataHooks.useInternshipDetail(internshipId);

      const form = useForm<TCreateOnCampusVirtual>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(ZCreateOnCampusVirtual_2) as any,
        defaultValues: {
          title: "",
          duration: "",
          type: "FREE",
          category: "ON_CAMPUS",
          description: "",
          department: "",
          project: "",
          modules: "",
          tools: "",
        },
      });

      useEffect(() => {
        const response = internshipResp as
          { data?: AdminInternshipDetail } | undefined;
        if (response?.data) {
          const { data } = response;

          const modulesStr = Array.isArray(data.modules)
            ? data.modules.join(", ")
            : data.modules || "";
          const toolsStr = Array.isArray(data.tools)
            ? data.tools.join(", ")
            : data.tools || "";

          form.reset({
            title: data.title || "",
            duration: data.duration || "",
            type: "FREE",
            category: (data.category as "ON_CAMPUS" | "VIRTUAL") || "ON_CAMPUS",
            description: data.description || "",
            department: data.department || "",
            project: data.projectFocus || data.project || "",
            modules: modulesStr,
            tools: toolsStr,
          });
        }
      }, [internshipResp, form]);

      const { mutate: updateInternship, isPending } =
        OnCampusVirtualDataHooks.useUpdateInternship(internshipId, {
          onSuccess: () => {
            router.back();
            router.refresh();
            setShowDialog(false);
          },
        });

      const handleClose = () => {
        setShowDialog(false);
        router.back();
      };

      function onSubmit(values: TCreateOnCampusVirtual) {
        const modulesArray =
          typeof values.modules === "string"
            ? values.modules
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : Array.isArray(values.modules)
              ? values.modules
              : [];

        const toolsArray =
          typeof values.tools === "string"
            ? values.tools
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : Array.isArray(values.tools)
              ? values.tools
              : [];

        updateInternship({
          ...values,
          modules: modulesArray.length > 0 ? modulesArray : undefined,
          tools: toolsArray.length > 0 ? toolsArray : undefined,
        });
      }

      const currentCategory = form.watch("category");

      return (
        <ResponsiveDialog
          isOpen={showDialog}
          setIsOpen={(open) => !open && handleClose()}
          title={
            currentCategory === "VIRTUAL"
              ? "Admin: Edit Virtual Internship"
              : "Admin: Edit On-Campus Internship"
          }
          description="Update existing internship details."
        >
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-2"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-semibold">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g. Machine Learning Virtual Intern"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-semibold">
                          Program Category *
                        </FormLabel>
                        <Select_22 onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue_22 placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ON_CAMPUS">
                              On Campus Cohort
                            </SelectItem>
                            <SelectItem value="VIRTUAL">
                              Virtual / Online Cohort
                            </SelectItem>
                          </SelectContent>
                        </Select_22>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-semibold">
                          Duration
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="E.g. 3 Months" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-semibold">
                        Project (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g. Real-time Object Detection Pipeline"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-semibold">
                        Description
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
                  name="modules"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-semibold">
                        Modules (Comma-separated)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Neural Networks, CNNs and RNNs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-semibold">
                        Tools (Comma-separated)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Python, PyTorch, OpenCV" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full font-semibold"
                  >
                    {isPending ? (
                      <>
                        <Spinner className="mr-2" />
                        Updating Internship...
                      </>
                    ) : (
                      "Update Internship"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </ResponsiveDialog>
      );
    }

  const { id } = React.use(params);
  return <EditForm_10 internshipId={id} />;
}
