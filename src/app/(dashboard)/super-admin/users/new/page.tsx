"use client";

import * as React from "react";
import { Copy, Eye, EyeOff, Key, User } from "lucide-react";
import React_3 from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { LucideIcon, CheckIcon, CopyIcon, Loader2Icon, BanIcon, ChevronsUpDownIcon, Loader2 as Loader2Icon_2, XIcon, SearchIcon, Search, ArrowUpIcon, CopyCheckIcon, LoaderIcon } from "lucide-react";
import React_2 from "react";
import { useRef, ReactNode, useEffect, useContext } from "react";
import { useMutation, useQuery, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { JetBrains_Mono } from "next/font/google";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot, Popover as PopoverPrimitive, Tooltip as TooltipPrimitive, Dialog as SheetPrimitive } from "radix-ui";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import Link from "next/link";
import { Command as CommandPrimitive } from "cmdk";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
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

type UserRole =
  | "STUDENT"
  | "INSTITUTE"
  | "INSTRUCTOR"
  | "IMMERSION_USER"
  | "SUPER_ADMIN"
  | "RECRUIT_USER";

interface GetUsersParams {
  page?: number;
  limit?: number;
  role?: UserRole;
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

interface UserPublic {
  id: string;
  email: string;
  mobile: string;
  name: string | null;
  registrationNo?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  studentRegistration?: { id: string; deletedAt: string | null } | null;
  instructorRegistration?: { id: string; deletedAt: string | null } | null;
  immersionParticipantProfile?: { id: string } | null;
  recruitProfile?: { id: string } | null;
}

type GetUsersResponse = GenericApiResponse<UserPublic[]>;

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

type CreateUserResponse = GenericApiResponse<UserPublic>;

interface AdminCreateUserRequest {
  email: string;
  mobile: string;
  name?: string;
  role?: UserRole;
  password?: string;
}

type TMutationReturnType<
  TData,
  TVariables,
  TError = Error,
  TContext = unknown,
> = UseMutationResult<TData, TError, TVariables, TContext>;

type GetUserByIdResponse = GenericApiResponse<{ user: UserPublic }>;

type UpdateUserResponse = GenericApiResponse<{ user: UserPublic }>;

interface UserUpdatePayload {
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

type DeleteUserResponse = GenericApiResponse;

interface IUserDataHook {
    useUsers: (
    params?: GetUsersParams,
    options?: TQueryOptions<GetUsersResponse, Error>,
  ) => TQueryReturnType<GetUsersResponse, Error>;

    useCreateUser: (
    options?: TMutationOptions<
      CreateUserResponse,
      Error,
      AdminCreateUserRequest
    >,
  ) => TMutationReturnType<CreateUserResponse, AdminCreateUserRequest>;

    useUserDetail: (
    id: string,
    options?: TQueryOptions<GetUserByIdResponse, Error>,
  ) => TQueryReturnType<GetUserByIdResponse, Error>;

    useUpdateUser: (
    options?: TMutationOptions<
      UpdateUserResponse,
      Error,
      { id: string; payload: UserUpdatePayload }
    >,
  ) => TMutationReturnType<
    UpdateUserResponse,
    { id: string; payload: UserUpdatePayload }
  >;

    useDeleteUser: (
    options?: TMutationOptions<DeleteUserResponse, Error, string>,
  ) => TMutationReturnType<DeleteUserResponse, string>;
}

const USERS_QUERY_KEYS = {
  ALL: ["users"] as const,
  LIST: (params?: GetUsersParams) => ["users", "list", params] as const,
  DETAIL: (id: string) => ["users", "detail", id] as const,
};

interface IUserService {
    getUsers: (params?: GetUsersParams) => Promise<GetUsersResponse>;

    createUser: (payload: AdminCreateUserRequest) => Promise<CreateUserResponse>;

    getUserById: (id: string) => Promise<GetUserByIdResponse>;

    updateUser: (
    id: string,
    payload: UserUpdatePayload,
  ) => Promise<UpdateUserResponse>;

    deleteUser: (id: string) => Promise<DeleteUserResponse>;
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

const UserService: IUserService = {
    async getUsers(params) {
    const response = await axiosInstance.get<GetUsersResponse>(
      ENDPOINTS.USERS.BASE,
      {
        params,
      },
    );
    return response.data;
  },

    async createUser(payload) {
    const response = await axiosInstance.post<CreateUserResponse>(
      ENDPOINTS.USERS.BASE,
      payload,
    );
    return response.data;
  },

    async getUserById(id) {
    const response = await axiosInstance.get<GetUserByIdResponse>(
      ENDPOINTS.USERS.BY_ID(id),
    );
    return response.data;
  },

    async updateUser(id, payload) {
    const response = await axiosInstance.patch<UpdateUserResponse>(
      ENDPOINTS.USERS.BY_ID(id),
      payload,
    );
    return response.data;
  },

    async deleteUser(id) {
    const response = await axiosInstance.delete<DeleteUserResponse>(
      ENDPOINTS.USERS.BY_ID(id),
    );
    return response.data;
  },
};

const UserDataHook: IUserDataHook = {
    useUsers(params, options) {
    return useQuery({
      queryKey: USERS_QUERY_KEYS.LIST(params),
      queryFn: async () => await UserService.getUsers(params),
      ...options,
    });
  },

    useCreateUser(options) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data) => await UserService.createUser(data),
      ...options,
      onSuccess: (data, variables, context, mutation) => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.ALL });
        toast.success(
          (data as { message?: string })?.message ||
            "User created successfully!",
        );
        options?.onSuccess?.(data, variables, context, mutation);
      },
      onError: (error, variables, context, mutation) => {
        toast.error(error.message || "Failed to create user.");
        options?.onError?.(error, variables, context, mutation);
      },
    });
  },

    useUserDetail(id, options) {
    return useQuery({
      queryKey: USERS_QUERY_KEYS.DETAIL(id),
      queryFn: async () => await UserService.getUserById(id),
      enabled: !!id,
      ...options,
    });
  },

    useUpdateUser(options) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload }) =>
        await UserService.updateUser(id, payload),
      ...options,
      onSuccess: (data, variables, context, mutation) => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.ALL });
        queryClient.invalidateQueries({
          queryKey: USERS_QUERY_KEYS.DETAIL(variables.id),
        });
        toast.success(
          (data as { message?: string })?.message ||
            "User profile updated successfully!",
        );
        options?.onSuccess?.(data, variables, context, mutation);
      },
      onError: (error, variables, context, mutation) => {
        toast.error(error.message || "Failed to update user profile.");
        options?.onError?.(error, variables, context, mutation);
      },
    });
  },

    useDeleteUser(options) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id) => await UserService.deleteUser(id),
      ...options,
      onSuccess: (data, variables, context, mutation) => {
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.ALL });
        queryClient.invalidateQueries({
          queryKey: USERS_QUERY_KEYS.DETAIL(variables),
        });
        toast.success(
          (data as { message?: string })?.message ||
            "User deleted successfully!",
        );
        options?.onSuccess?.(data, variables, context, mutation);
      },
      onError: (error, variables, context, mutation) => {
        toast.error(error.message || "Failed to delete user.");
        options?.onError?.(error, variables, context, mutation);
      },
    });
  },
};

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

const emailSchema = z
  .string({ error: "Email is required" })
  .email("Invalid email address")
  .toLowerCase()
  .trim();

const nameSchema = z
  .string()
  .min(1, "Name cannot be empty")
  .max(100, "Name must be at most 100 characters")
  .trim();

const passwordSchema = z
  .string({ error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const mobileSchema = z
  .string({ error: "Mobile number is required" })
  .trim()
  .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits");

const adminCreateUserSchema = z.object({
  email: emailSchema,
  mobile: mobileSchema,
  name: nameSchema.optional(),
  role: z
    .enum([
      "STUDENT",
      "INSTRUCTOR",
      "IMMERSION_USER",
      "SUPER_ADMIN",
      "RECRUIT_USER",
    ])
    .default("STUDENT"),
  password: passwordSchema.optional(),
});

const ZCreateUser = z
  .object({
    email: adminCreateUserSchema.shape.email,
    mobile: adminCreateUserSchema.shape.mobile,
    name: adminCreateUserSchema.shape.name,
    role: z
      .enum([
        "STUDENT",
        "INSTITUTE",
        "INSTRUCTOR",
        "IMMERSION_USER",
        "SUPER_ADMIN",
        "RECRUIT_USER",
      ] as const)
      .default("STUDENT"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TCreateUserInput = z.input<typeof ZCreateUser>;

type TSearchComboboxItem = {
  id: string;
  name: string;
  icon?: React_2.ReactNode;
  description?: string;
  [key: string]: unknown; 
};

interface ISearchComboboxProps {
  items: TSearchComboboxItem[];
  label: string;
  disabled?: boolean;
  value: TSearchComboboxItem | null;
  values?: TSearchComboboxItem[];
  onSelect: (value: TSearchComboboxItem | null) => void;
  onSelectMultiple?: (value: TSearchComboboxItem[] | null) => void;
    hasMore?: boolean;
  onLoadMore?: () => Promise<void> | void;
  loading?: boolean;
    onQueryChange?: (query: string) => void;
  ServerSearch?: boolean;
  multiple?: boolean;
  popoverClassName?: string;
  small?: boolean;
  largePopover?: boolean;
  deletedFunction?: (item: TSearchComboboxItem) => boolean;
}

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
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

interface ITruncatedTextProps extends React_2.HTMLAttributes<HTMLDivElement> {
  width?: number;
  icon?: React_2.ReactNode;
  label: string;
  link?: string;
  bottom?: boolean;
  mono?: boolean;
  isSql?: boolean;
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

const jetBrainsMono_2 = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "origin-(--radix-tooltip-content-transform-origin) bg-foreground text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 inline-flex w-fit max-w-xs items-center gap-1.5 rounded-md px-3 py-1.5 text-xs",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

interface ICopyButtonProps {
  value: string | number;
  label?: string;
  large?: boolean;
}

const CopyButton: React.FunctionComponent<ICopyButtonProps> = ({
  value,
  label,
  large = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(value.toString());

    setCopied(true);
    toast.success(
      label ? `${label} copied to the clipboard.` : "Copied to the clipboard.",
    );

    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-1 transition-transform duration-300 hover:scale-105",
        large ? "border-border rounded-lg border px-3 py-1.5 text-sm" : "p-2",
      )}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <>
          <CopyCheckIcon className="!size-3.5 text-green-600" />
        </>
      ) : (
        <CopyIcon className="!size-3.5" />
      )}

      {large && <span className="ml-2">{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
};

const TruncatedText: React_2.FunctionComponent<ITruncatedTextProps> = ({
  width,
  className,
  icon = null,
  label,
  link,
  bottom = false,
  mono = false,
  isSql = false,
}) => {
  const { resolvedTheme } = useTheme();
  const syntaxTheme = resolvedTheme === "dark" ? oneDark : oneLight;
  const normalizedLabel = isSql ? label.replace(/\s+/g, " ").trim() : label;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

    const checkTruncation = () => {
    if (textRef.current) {
      const isTruncated =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsTruncated(isTruncated);
    }
  };

  useEffect(() => {
    checkTruncation();
  }, [label, width]);

  useEffect(() => {
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return (
    <div className="flex min-w-0 items-center gap-2">
      {icon}
      {isTruncated ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex min-w-0 items-center gap-2">
                {link ? (
                  <Link
                    href={link}
                    className="group flex flex-row items-center gap-1"
                  >
                    <p
                      ref={textRef}
                      style={
                        width
                          ? {
                              maxWidth: `${width}px`,
                            }
                          : {}
                      }
                      className={cn(
                        className,
                        (mono || isSql) && jetBrainsMono_2.className,
                        "group-hover:text-primary truncate",
                      )}
                    >
                      {label}
                    </p>
                    <div className="rotate-45">
                      <ArrowUpIcon className="text-muted-foreground hover:text-primary group-hover:text-primary size-3.5 transition-colors duration-200 ease-in-out group-hover:animate-bounce" />
                    </div>
                  </Link>
                ) : (
                  <p
                    ref={textRef}
                    style={
                      width
                        ? {
                            maxWidth: `${width}px`,
                          }
                        : {}
                    }
                    className={cn(
                      className,
                      (mono || isSql) && jetBrainsMono_2.className,
                      "truncate",
                    )}
                  >
                    {label}
                  </p>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "relative z-[200] py-1.5",
                isSql ? "w-96 max-w-96 p-0" : "flex flex-row items-start",
              )}
              onClick={(e) => e.stopPropagation()}
              side={bottom ? "bottom" : "top"}
            >
              {isSql ? (
                <div className="relative w-full">
                  <div className="absolute right-1.5 top-1.5 z-10">
                    <CopyButton value={label} label="" />
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <SyntaxHighlighter
                      language="sql"
                      style={syntaxTheme}
                      wrapLongLines
                      customStyle={{
                        margin: 0,
                        padding: "0.5rem 2.5rem 0.5rem 0.75rem",
                        background: "transparent",
                        fontSize: "0.75rem",
                        whiteSpace: "normal",
                        width: "100%",
                        fontFamily: "inherit",
                      }}
                      codeTagProps={{
                        style: { whiteSpace: "normal" },
                        className: cn(jetBrainsMono_2.className, "font-semibold"),
                      }}
                      PreTag="div"
                    >
                      {normalizedLabel}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ) : (
                <>
                  <p className="max-h-40 w-fit max-w-60 overflow-y-auto text-wrap break-all">
                    {label}
                  </p>
                  <div className="mt-0.5 translate-x-4 pt-0.5">
                    <CopyButton value={label} label="" />
                  </div>
                </>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : link ? (
        <Link href={link!} className="group flex flex-row items-center gap-1">
          <p
            ref={textRef}
            style={
              width
                ? {
                    maxWidth: `${width}px`,
                  }
                : {}
            }
            className={cn(
              className,
              (mono || isSql) && jetBrainsMono_2.className,
              "group-hover:text-primary truncate",
            )}
          >
            {label}
          </p>
          <div className="rotate-45">
            <ArrowUpIcon className="text-muted-foreground hover:text-primary group-hover:text-primary size-3.5 transition-colors duration-200 ease-in-out group-hover:animate-bounce" />
          </div>
        </Link>
      ) : (
        <p
          ref={textRef}
          style={
            width
              ? {
                  maxWidth: `${width}px`,
                }
              : {}
          }
          className={cn(
            className,
            (mono || isSql) && jetBrainsMono_2.className,
            "truncate",
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
};

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

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-xl p-1",
        className,
      )}
      {...props}
    />
  );
}

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input bg-input/20 in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-md has-data-[align=block-start]:rounded-md has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/30 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 relative flex h-7 w-full min-w-0 items-center rounded-md border outline-none transition-colors has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[textarea]:rounded-md has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-2 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-1 py-2 text-xs/relaxed font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-[calc(var(--radius-sm)-2px)] **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:text-[0.625rem] [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.275rem] has-[>kbd]:ml-[-0.275rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.275rem] has-[>kbd]:mr-[-0.275rem]",
        "block-start":
          "order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! bg-input/20 dark:bg-input/30">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "outline-hidden w-full text-xs/relaxed disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-3.5 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden outline-none",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-xs/relaxed", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:px-2.5 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1",
        className,
      )}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item outline-hidden in-data-[slot=dialog-content]:rounded-md data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex min-h-7 cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-xs/relaxed data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon className="group-has-data-[slot=command-shortcut]/command-item:hidden ml-auto opacity-0 group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

const SearchCombobox: React_2.FunctionComponent<ISearchComboboxProps> = ({
  value,
  values = [],
  items,
  label,
  disabled,
  onSelect,
  onSelectMultiple,
  hasMore = false,
  onLoadMore,
  loading = false,
  onQueryChange,
  ServerSearch = false,
  multiple = false,
  popoverClassName = "",
  small = false,
  largePopover = false,
  deletedFunction,
}) => {
  const [open, setOpen] = React_2.useState<boolean>(false);
  const [query, setQuery] = React_2.useState<string>("");

  const selected = items.find((item) => item.id === value?.id);

  const selectedMultiple = items.filter((item) =>
    values.map((item) => item.id).includes(item.id),
  );

    const displayItems = React_2.useMemo(() => {
    if (ServerSearch) return items;
    return items.filter((item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [items, query, ServerSearch]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (ServerSearch && onQueryChange) {
      onQueryChange(value);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <div className={cn(popoverClassName)}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            type="button"
            className={cn(
              "w-full justify-between disabled:opacity-75",
              !value && !selected && "text-muted-foreground",
              selected?.icon ? "pl-2" : "pl-4",
              small && "h-8 text-sm",
            )}
          >
            {multiple ? (
              <div>
                {selectedMultiple.length > 0 ? (
                  <p className="text-muted-foreground pl-1 lowercase">
                    {selectedMultiple.length} {label}
                    {selectedMultiple.length != 1 && "s"} selected
                  </p>
                ) : (
                  <p>Select {label}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-hidden">
                {selected?.icon}
                <p
                  className={cn(
                    "whitespace-nowrap text-sm font-medium",
                    selected &&
                      deletedFunction &&
                      deletedFunction(selected) &&
                      "text-rose-800 line-through",
                  )}
                >
                  {selected
                    ? selected.name
                    : value?.name
                      ? value.name
                      : `Select ${label}`}
                </p>
                {selected?.description && (
                  <p className="text-muted-foreground flex-1 truncate text-xs">
                    {selected.description}
                  </p>
                )}
              </div>
            )}
            {disabled ? (
              <BanIcon className="opacity-50" />
            ) : (
              <ChevronsUpDownIcon className="opacity-50" />
            )}
          </Button>
        </PopoverTrigger>

        {multiple && onSelectMultiple && (
          <div className="mt-2 flex w-full flex-wrap gap-1">
            {selectedMultiple.map((item) => (
              <Badge
                key={item.id}
                variant="outline"
                className="flex h-6 w-fit cursor-pointer items-center gap-1"
              >
                <div className="-ml-1">
                  <TruncatedText
                    className={cn("cursor-pointer text-xs")}
                    label={item.name}
                    width={200}
                    icon={<div className="scale-90">{item.icon}</div>}
                  />
                </div>

                <Button
                  type="button"
                  variant={"ghost"}
                  size="icon"
                  className="flex h-4 w-4 translate-x-1.5 items-center justify-center p-0"
                  onClick={() =>
                    onSelectMultiple(
                      selectedMultiple.filter((item2) => item2.id !== item?.id),
                    )
                  }
                >
                  <XIcon className="!size-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      <PopoverContent
        className={cn("p-0", {
          "w-auto": largePopover,
          "w-[var(--radix-popover-trigger-width)]": !largePopover,
        })}
        align="start"
      >
        <Command className="flex w-full">
          <CommandInput
            className="h-9"
            placeholder={`Search ${label}`}
            value={query}
            onValueChange={handleSearch}
          />
          <CommandList className="max-h-[300px] w-full">
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup className="h-auto w-full p-1">
              {displayItems.map((item) => {
                return (
                  <CommandItem
                    className={cn(
                      "hover:bg-accent! transition-colors! min-h-9 py-0.5",
                      !multiple && selected?.id === item.id && "bg-primary/10",
                      multiple &&
                        selectedMultiple
                          .map((item) => item.id)
                          .includes(item.id) &&
                        "bg-primary/10",
                    )}
                    key={item.id}
                    value={item.name}
                    onSelect={(currentValue) => {
                      if (multiple && onSelectMultiple) {
                        const selectedItem = items.find(
                          (item) => item.name === currentValue,
                        );

                        if (
                          selectedMultiple
                            .map((item) => item.id)
                            .includes(item.id)
                        ) {
                          onSelectMultiple(
                            selectedMultiple.filter(
                              (item) => item.id !== selectedItem?.id,
                            ),
                          );
                        } else {
                          if (selectedItem)
                            onSelectMultiple([...values, selectedItem]);
                        }
                      } else {
                        const selectedItem = items.find(
                          (item) => item.name.trim() === currentValue,
                        );

                        onSelect(selectedItem ?? null);
                      }
                      if (!multiple) {
                        setOpen(false);
                      }
                    }}
                  >
                    <div className="flex w-full items-center gap-2">
                      {item.icon && (
                        <div className="bg-muted/40 group-hover:bg-primary/10 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors">
                          {item.icon}
                        </div>
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p
                          className={cn(
                            "text-foreground/90 group-hover:text-foreground truncate text-[0.8rem] font-bold tracking-tight transition-colors",
                            deletedFunction &&
                              deletedFunction(item) &&
                              "text-rose-800 line-through",
                          )}
                        >
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-muted-foreground/60 truncate text-[0.65rem] font-medium uppercase tracking-wider">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <CheckIcon
                      size={18}
                      className={cn(
                        "ml-auto",
                        !multiple && selected?.id === item.id
                          ? "opacity-100"
                          : "opacity-0",
                        multiple &&
                          selectedMultiple
                            .map((item) => item.id)
                            .includes(item.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
              {hasMore && !query && (
                <div className="flex w-full justify-center py-2">
                  {loading ? (
                    <Loader2Icon_2 className="text-muted-foreground h-4 w-4 animate-spin" />
                  ) : (
                    onLoadMore && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground text-xs"
                        onClick={() => onLoadMore()}
                      >
                        Load more
                      </Button>
                    )
                  )}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const generateAutoPassword = () => {
  const randomHex = Math.random().toString(36).substring(2, 10);
  return `Temp!${randomHex}A1`;
};

type UserRole_2 =
  | "STUDENT"
  | "INSTITUTE"
  | "INSTRUCTOR"
  | "IMMERSION_USER"
  | "SUPER_ADMIN"
  | "RECRUIT_USER";

interface IRoleSelectProps {
  value: UserRole_2;
  onChange: (value: UserRole_2) => void;
  disabled?: boolean;
}

type TSearchComboboxItem_2 = {
  id: string;
  name: string;
  icon?: React_3.ReactNode;
  description?: string;
  [key: string]: unknown; 
};

const ROLE_ITEMS: TSearchComboboxItem_2[] = [
  { id: "STUDENT", name: "Student" },
  { id: "INSTRUCTOR", name: "Instructor" },
  { id: "IMMERSION_USER", name: "Immersion User" },
  { id: "RECRUIT_USER", name: "Job Applicant User" },
  { id: "SUPER_ADMIN", name: "Super Admin" },
];

const RoleSelect = ({ value, onChange, disabled }: IRoleSelectProps) => (
  <SearchCombobox
    label="role"
    items={ROLE_ITEMS}
    value={ROLE_ITEMS.find((r) => r.id === value) ?? null}
    disabled={disabled}
    onSelect={(item) => item && onChange(item.id as UserRole_2)}
  />
);

const AddForm_12: React_3.FunctionComponent = () => {
  const [showDialog, setShowDialog] = React_3.useState(true);
  const [showPassword, setShowPassword] = React_3.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React_3.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const autoPassword = React_3.useMemo(() => generateAutoPassword(), []);

  const form = useForm<TCreateUserInput>({
    resolver: zodResolver(ZCreateUser),
    defaultValues: {
      email: "",
      mobile: "",
      name: "",
      role: "STUDENT",
      password: autoPassword,
      confirmPassword: autoPassword,
    },
  });

  const { mutate: createUser, isPending } = UserDataHook.useCreateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/super-admin/users");
      router.refresh();
      setShowDialog(false);
      form.reset();
    },
  });

  const handleClose = () => {
    setShowDialog(false);
    router.back();
  };

  function onSubmit(values: TCreateUserInput) {
    createUser({
      email: values.email,
      mobile: values.mobile,
      name: values.name || undefined,
      role: values.role,
      password: values.password,
    });
  }

  return (
    <ResponsiveDialog
      isOpen={showDialog}
      setIsOpen={(open) => !open && handleClose()}
      title="Admin: Create User Account"
      description="Manually registers a new account on the database."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold">
                  Mobile Number*
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold">
                  Display Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold">
                  Assigned Role
                </FormLabel>
                <FormControl>
                  <RoleSelect
                    value={field.value || "STUDENT"}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs font-medium text-amber-600 dark:bg-amber-500/5 dark:text-amber-400">
            <div className="flex items-center gap-2 overflow-hidden">
              <Key className="size-4 shrink-0 animate-pulse text-amber-500" />
              <span className="truncate">
                Auto-generated Password:{" "}
                <strong className="text-foreground bg-background border-border select-all rounded border px-1.5 py-0.5 font-mono font-semibold">
                  {autoPassword}
                </strong>
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 rounded-lg text-amber-600 hover:bg-amber-500/15 hover:text-amber-700"
              onClick={() => {
                navigator.clipboard.writeText(autoPassword);
                toast.success("Password copied to clipboard!");
              }}
            >
              <Copy className="size-3.5" />
            </Button>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted text-muted-foreground absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-md"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted text-muted-foreground absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-md"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
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
                  Creating Account...
                </>
              ) : (
                "Register User"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};

const AddForm_13 = AddForm_12;

const NewUserPage: React.FunctionComponent = () => {
  return <AddForm_13 />;
};

export default NewUserPage;
