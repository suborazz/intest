"use client";

import Image from "next/image";
import Link from "next/link";
import React_2 from "react";
import { Eye, EyeOff, Lock, Mail as Mail_2, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z_2 from "zod";
import { LucideIcon, CheckIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot, Checkbox as CheckboxPrimitive } from "radix-ui";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
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

type UserRole =
      | "STUDENT"
      | "INSTITUTE"
      | "INSTRUCTOR"
      | "IMMERSION_USER"
      | "SUPER_ADMIN"
      | "RECRUIT_USER";

interface UserPublic {
      id: string;
      email: string;
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

interface AuthTokens {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    }

interface LoginResponseData {
      user: UserPublic;
      tokens: AuthTokens;
    }

type LoginResponse = GenericApiResponse<LoginResponseData>;

interface LoginPayload {
      email: string;
      password: string;
    }

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

interface RegisterResponseData {
      user: UserPublic;
      tokens: AuthTokens;
    }

type RegisterResponse = GenericApiResponse<RegisterResponseData>;

interface RegisterPayload {
      email: string;
      password: string;
      name?: string;
      role?: UserRole;
    }

type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface ProfileResponseData {
      user: UserPublic;
    }

type ProfileResponse = GenericApiResponse<ProfileResponseData>;

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

type LogoutResponse = GenericApiResponse;

type ForgotPasswordResponse = GenericApiResponse;

interface ForgotPasswordPayload {
      email: string;
    }

type ResetPasswordResponse = GenericApiResponse;

interface ResetPasswordPayload {
      token: string;
      password: string;
    }

type ChangePasswordResponse = GenericApiResponse;

interface ChangePasswordPayload {
          currentPassword?: string;
      newPassword: string;
    }

interface IAuthDataHook {
        useLogin: (
        options?: TMutationOptions<LoginResponse, Error, LoginPayload>,
      ) => TMutationReturnType<LoginResponse, LoginPayload>;

        useRegister: (
        options?: TMutationOptions<RegisterResponse, Error, RegisterPayload>,
      ) => TMutationReturnType<RegisterResponse, RegisterPayload>;

        useProfile: (
        options?: TQueryOptions<ProfileResponse, Error>,
      ) => TQueryReturnType<ProfileResponse, Error>;

        useLogout: (
        options?: TMutationOptions<LogoutResponse, Error, void>,
      ) => TMutationReturnType<LogoutResponse, void>;

        useForgotPassword: (
        options?: TMutationOptions<
          ForgotPasswordResponse,
          Error,
          ForgotPasswordPayload
        >,
      ) => TMutationReturnType<ForgotPasswordResponse, ForgotPasswordPayload>;

        useResetPassword: (
        options?: TMutationOptions<
          ResetPasswordResponse,
          Error,
          ResetPasswordPayload
        >,
      ) => TMutationReturnType<ResetPasswordResponse, ResetPasswordPayload>;

        useChangePassword: (
        options?: TMutationOptions<
          ChangePasswordResponse,
          Error,
          ChangePasswordPayload
        >,
      ) => TMutationReturnType<ChangePasswordResponse, ChangePasswordPayload>;
    }

interface RefreshPayload {
      refreshToken: string;
    }

interface RefreshResponseData {
      accessToken: string;
      expiresIn: number;
    }

type RefreshResponse = GenericApiResponse<RefreshResponseData>;

interface IAuthService {
        login: (payload: LoginPayload) => Promise<LoginResponse>;

        register: (payload: RegisterPayload) => Promise<RegisterResponse>;

        getUserProfile: () => Promise<ProfileResponse>;

        logout: () => Promise<LogoutResponse>;

        forgotPassword: (
        payload: ForgotPasswordPayload,
      ) => Promise<ForgotPasswordResponse>;

        resetPassword: (
        payload: ResetPasswordPayload,
      ) => Promise<ResetPasswordResponse>;

        changePassword: (
        payload: ChangePasswordPayload,
      ) => Promise<ChangePasswordResponse>;

        refresh: (payload: RefreshPayload) => Promise<RefreshResponse>;
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

const AUTH_KEYS = {
      ACCESS_TOKEN: "authToken",
      REFRESH_TOKEN: "refreshToken",
      USER_DATA: "userData",
    };

function setCookie(name: string, value: string, days = 7) {
      if (typeof window === "undefined") return;
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
    }

function persistSession(resData: LoginResponse | RegisterResponse) {
      if (!resData.success || !resData.data) return;
      if (typeof window === "undefined") return;

      localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, resData.data.tokens.accessToken);
      localStorage.setItem(
        AUTH_KEYS.REFRESH_TOKEN,
        resData.data.tokens.refreshToken,
      );
      localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(resData.data.user));

        setCookie("access_token", resData.data.tokens.accessToken);
      setCookie("user_role", resData.data.user.role);
    }

function removeCookie(name: string) {
      if (typeof window === "undefined") return;
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

const AUTH_QUERY_KEYS = {
      PROFILE: ["auth", "profile"] as const,
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

const emailSchema = z
      .string({ error: "Email is required" })
      .email("Invalid email address")
      .toLowerCase()
      .trim();

const ZLogin = z.object({
      email: emailSchema,
      password: z.string().min(1, { message: "Password is required." }),
      rememberMe: z.boolean().optional(),
    });

type TLogin = z.infer<typeof ZLogin>;

interface EmersionRegisterPayload {
      name: string;
      email: string;
      password: string;
      mobileNo?: string;
    }

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

type UpdateEmersionProfileResponse = ApiSuccess<EmersionProfileData>;

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

type EmersionTicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface EmersionCreateTicketPayload {
      title: string;
      description: string;
      priority?: EmersionTicketPriority;
    }

type EmersionTicketStatus =
      "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

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

interface AssignGradeRequest_2 {
      grade: string;
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

type CreateEmersionOrderPayload = Record<string, never>;

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

interface VerifyEmersionSignaturePayload {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    }

interface VerifyEmersionSignatureResponseData {
      paymentId: string;
      applicationId: string;
      status: string;
    }

interface VerifyEmersionSignatureResponse {
      success: boolean;
      data: VerifyEmersionSignatureResponseData;
    }

interface RefundEmersionPaymentPayload {
      paymentId: string;
      amount?: number;
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

interface TInstructorAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

interface TInstructorQualification {
      id?: string;
      highestQualification: string;
      specialization: string;
      universityName: string;
      yearOfCompletion: string;
      percentage: string;
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

type SubmitInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

type GetInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

interface GetInstructorsParams {
      page?: number;
      limit?: number;
      gender?: string;
      search?: string;
    }

type ListInstructorRegistrationsResponse = ApiSuccess<
      InstructorRegistrationResponse[]
    >;

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

type UpdateInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

type DeleteInstructorRegistrationResponse = ApiSuccess<{
      message: string;
    }>;

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

interface GetInternshipByIdResponse {
      success: boolean;
      data: InternshipPublic;
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

interface GradeSubmissionPayload {
      grade: string;
      feedback?: string;
    }

interface GradeSubmissionResponse {
      success: boolean;
      message?: string;
      data?: ProjectSubmissionObject;
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

interface CreateNoticePayload {
      title: string;
      content: string;
      category?: string;
      published?: boolean;
    }

interface CreateNoticeResponse {
      success: boolean;
      data: Notice;
    }

interface TicketObject {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "CLOSED";
      createdAt: string;
    }

type ListTicketsResponse = ApiSuccess<TicketObject[]>;

interface CreateTicketPayload_2 {
      title: string;
      description: string;
    }

type CreateTicketResponse_2 = ApiSuccess<TicketObject>;

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

interface TAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
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

type SubmitStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

type GetStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

type ListStudentRegistrationsResponse = ApiSuccess<
      StudentRegistrationResponse[]
    >;

type StudentRegistrationUpdatePayload =
      Partial<StudentRegistrationPayload>;

type UpdateStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

type DeleteStudentRegistrationResponse = ApiSuccess<{ message: string }>;

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


export default function LoginPage() {
    const AuthService: IAuthService = {
        async login(payload) {
        const response = await axiosInstance.post<LoginResponse>(
          ENDPOINTS.AUTH.LOGIN,
          payload,
        );
        const resData = response.data;

        persistSession(resData);
        return resData;
      },

        async register(payload) {
        const response = await axiosInstance.post<RegisterResponse>(
          ENDPOINTS.AUTH.REGISTER,
          payload,
        );
        const resData = response.data;

        persistSession(resData);
        return resData;
      },

        async getUserProfile() {
        const response = await axiosInstance.get<ProfileResponse>(
          ENDPOINTS.AUTH.ME,
        );
        return response.data;
      },

        async logout() {
        const response = await axiosInstance.post<LogoutResponse>(
          ENDPOINTS.AUTH.LOGOUT,
        );
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(AUTH_KEYS.USER_DATA);

                removeCookie("access_token");
          removeCookie("user_role");
        }
        return response.data;
      },

        async forgotPassword(payload) {
        const response = await axiosInstance.post<ForgotPasswordResponse>(
          ENDPOINTS.AUTH.FORGOT_PASSWORD,
          payload,
        );
        return response.data;
      },

        async resetPassword(payload) {
        const response = await axiosInstance.post<ResetPasswordResponse>(
          ENDPOINTS.AUTH.RESET_PASSWORD,
          payload,
        );
        return response.data;
      },

        async changePassword(payload) {
        const response = await axiosInstance.post<ChangePasswordResponse>(
          ENDPOINTS.AUTH.CHANGE_PASSWORD,
          payload,
        );
        return response.data;
      },

        async refresh(payload) {
        const response = await axiosInstance.post<RefreshResponse>(
          ENDPOINTS.AUTH.REFRESH,
          payload,
        );
        return response.data;
      },
    };
    const AuthDataHook: IAuthDataHook = {
        useLogin(options) {
        return useMutation({
          mutationFn: async (data) => await AuthService.login(data),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success(
              (data as { message?: string })?.message || "Login successful!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to login.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useRegister(options) {
        return useMutation({
          mutationFn: async (data) => await AuthService.register(data),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success(
              (data as { message?: string })?.message ||
                "Account created successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to register.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useProfile(options) {
        return useQuery({
          queryKey: AUTH_QUERY_KEYS.PROFILE,
          queryFn: async () => await AuthService.getUserProfile(),
          ...options,
        });
      },

        useLogout(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async () => await AuthService.logout(),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.clear();
            toast.success(
              (data as { message?: string })?.message || "Logged out successfully",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to logout.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useForgotPassword(options) {
        return useMutation({
          mutationFn: async (data) => await AuthService.forgotPassword(data),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success(
              (data as { message?: string })?.message ||
                "Password reset request sent successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to send password reset request.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useResetPassword(options) {
        return useMutation({
          mutationFn: async (data) => await AuthService.resetPassword(data),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success(
              (data as { message?: string })?.message ||
                "Password has been reset successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to reset password.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useChangePassword(options) {
        return useMutation({
          mutationFn: async (data) => await AuthService.changePassword(data),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success(
              (data as { message?: string })?.message ||
                "Password updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update password.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };
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

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<TLogin>({
            resolver: zodResolver(ZLogin),
            defaultValues: {
              email: "student@hilux.com",
              password: "",
              rememberMe: false,
            },
          });
    const { mutate: login, isPending } = AuthDataHook.useLogin({
            onSuccess: async (data) => {
              console.log("Backend Response:", data);
              console.log("User Role:", data.data?.user.role);
              const userRole = data.data?.user.role;
              const userId = data.data?.user.id ?? "";

              const checkAndRedirect = async (
                serviceCall: () => Promise<any>,
                storageKey: string,
                dashboardPath: string,
                registrationPath: string,
                errorLogMsg: string,
                isRegistered: (data: any) => boolean = (data) =>
                  Array.isArray(data) ? data.length > 0 : !!data,
              ) => {
                try {
                  const res = await serviceCall();
                  if (res?.success && isRegistered(res.data)) {
                    localStorage.setItem(storageKey, "true");
                    router.replace(dashboardPath);
                  } else {
                    localStorage.removeItem(storageKey);
                    router.replace(registrationPath);
                  }
                } catch (error: any) {
                  if (
                    (error as { response?: { status?: number } })?.response?.status ===
                    404
                  ) {
                    localStorage.removeItem(storageKey);
                    router.replace(registrationPath);
                    return;
                  }
                  console.error(errorLogMsg, error);
                  const isComplete = localStorage.getItem(storageKey) === "true";
                  router.replace(isComplete ? dashboardPath : registrationPath);
                }
              };

              if (userRole === "STUDENT") {
                await checkAndRedirect(
                  StudentRegistrationService.getMyRegistration,
                  `student_registration_complete_${userId}`,
                  "/student/dashboard",
                  "/student/registration",
                  "Failed to fetch student registration status:",
                );
              } else if (userRole === "INSTRUCTOR") {
                await checkAndRedirect(
                  InstructorService.getMyRegistration,
                  `instructor_registration_complete_${userId}`,
                  "/instructor/dashboard",
                  "/instructor/registration",
                  "Failed to fetch instructor registration status:",
                );
              } else if (userRole === "IMMERSION_USER") {
                await checkAndRedirect(
                  EmersionService.getMyApplication,
                  `immersion_registration_complete_${userId}`,
                  "/immersion/dashboard",
                  "/immersion/registration",
                  "Failed to fetch immersion registration status:",
                            (data) => {
                    const app = pickPrimaryImmersionApplication(
                      Array.isArray(data) ? data : data ? [data] : [],
                    );
                    return !!app && app.status !== "DRAFT";
                  },
                );
              } else if (userRole === "RECRUIT_USER") {
                await checkAndRedirect(
                  RecruitService.getMyProfile,
                  `recruit_registration_complete_${userId}`,
                  "/recruit/dashboard",
                  "/recruit/registration",
                  "Failed to fetch recruitment profile status:",
                                                (data) => !!data && !!(data as { id?: string }).id,
                );
              } else if (userRole === "SUPER_ADMIN")
                router.replace("/super-admin/dashboard");
              else router.replace("/");
            },
          });
    const onSubmit = async (values: TLogin) => {
            login({
              email: values.email,
              password: values.password,
            });
          };


  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col font-sans md:flex-row">
      {}
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-none bg-zinc-950 p-6 md:h-auto md:w-1/2 md:p-12">
        {}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth-bg.png"
            alt="Secure Authentication Background"
            fill
            priority
            className="duration-10000 object-cover opacity-90 transition-transform hover:scale-105"
          />
          <div className="from-primary/30 to-background/20 absolute inset-0 bg-gradient-to-tr via-transparent mix-blend-overlay" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {}
        <div className="relative z-10 hidden w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl transition-all hover:border-white/25 md:block">
          <div className="flex flex-col space-y-6">
            {}
            <div className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/10">
              <svg className="size-4 fill-white" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.627-4.765 5.986h4.754V21h-9.967zm-11 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.765 2.627-4.765 5.986h4.753V21H3.017z" />
              </svg>
            </div>

            <p className="text-lg font-medium leading-relaxed tracking-wide text-white/95">
              &ldquo;iiInternship connects ambitious students with verified
              international internships. Build your global career, gain hands-on
              experience, and unlock worldwide opportunities.&rdquo;
            </p>

            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white">Global Placement Cell</p>
              <p className="text-xs text-white/60">
                International Institute of Internship
              </p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-background relative z-10 -mt-6 flex w-full flex-col justify-center rounded-t-[30px] px-6 pb-8 pt-5 md:mt-0 md:w-1/2 md:rounded-none md:px-12 md:py-8 lg:px-20 xl:px-24">
        {}
        <div className="mx-auto w-full max-w-[400px]">
          {}
          <div className="mb-6 space-y-1 text-center">
            <h1 className="text-foreground text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to manage your internship profile and dashboard.
            </p>
          </div>

          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                              {}
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-foreground text-sm font-medium">
                                      Email ID
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        icon={Mail_2}
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                        className="border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 h-11"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {}
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="text-foreground text-sm font-medium">
                                      Password
                                    </FormLabel>
                                    <div className="relative">
                                      <FormControl>
                                        <Input
                                          icon={Lock}
                                          type={showPassword ? "text" : "password"}
                                          placeholder="••••••••••••"
                                          {...field}
                                          className="border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 h-11 pr-10"
                                        />
                                      </FormControl>
                                      <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 z-10 -translate-y-1/2 p-1 outline-none transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                      >
                                        {showPassword ? (
                                          <EyeOff className="size-4" />
                                        ) : (
                                          <Eye className="size-4" />
                                        )}
                                      </button>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {}
                              <div className="flex items-center justify-between">
                                <FormField
                                  control={form.control}
                                  name="rememberMe"
                                  render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-muted-foreground cursor-pointer select-none text-sm font-medium leading-none">
                                          Remember for 30 days
                                        </FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                <Link
                                  href="/forgot-password"
                                  className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
                                >
                                  Forgot password
                                </Link>
                              </div>

                              {}
                              <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-primary text-primary-foreground hover:bg-primary/95 h-11 w-full font-semibold shadow-md transition-all active:scale-[0.98]"
                              >
                                {isPending ? (
                                  <span className="flex items-center gap-2">
                                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Signing in...
                                  </span>
                                ) : (
                                  "Sign in"
                                )}
                              </Button>
                            </form>
                          </Form>

          {}
          <div className="text-muted-foreground mt-8 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
