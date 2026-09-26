"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React_2 from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LucideIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
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
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
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

const forgotSchema = z.object({
      email: z.string().email("Please enter a valid email address"),
    });

type TForgot = z.infer<typeof forgotSchema>;


export default function ForgotPasswordPage() {
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
  const form = useForm<TForgot>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isPending } = AuthDataHook.useForgotPassword({
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = (values: TForgot) => {
    forgotPassword({ email: values.email });
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col font-sans md:flex-row">
      {}
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-none bg-zinc-950 p-6 md:h-auto md:w-1/2 md:p-12">
        {}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth-banner.webp"
            alt="Secure Authentication Background"
            fill
            priority
            className="duration-10000 object-cover opacity-90 transition-transform hover:scale-105"
          />
          <div className="from-primary/30 to-background/20 absolute inset-0 bg-gradient-to-tr via-transparent mix-blend-overlay" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Center Quote/Testimonial Card */}
        <div className="relative z-10 hidden w-full max-w-md rounded-2xl border border-emerald-500/25 bg-emerald-950/40 p-8 text-white shadow-2xl backdrop-blur-2xl transition-all hover:border-emerald-400/40 md:block">
          <div className="flex flex-col space-y-6">
            <div className="inline-flex size-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
              <svg className="size-4 fill-emerald-400" viewBox="0 0 24 24">
                <path d="M12.89 10.43v-3.9c0-3 2.11-5.11 5.11-5.11h.9c.55 0 1 .45 1 1s-.45 1-1 1h-.9c-1.8 0-3.11 1.31-3.11 3.11v3.9h4c.55 0 1 .45 1 1s-.45 1-1 1h-4v9c0 .55-.45 1-1 1s-1-.45-1-1v-9h-2c-.55 0-1-.45-1-1s.45-1 1-1h2z" />
              </svg>
            </div>

            <p className="text-lg font-medium leading-relaxed tracking-wide text-white/95">
              &ldquo;No worries, we will help you get back on track. Just enter
              your registered email address and we will send you a secure link
              to reset your password.&rdquo;
            </p>

            <div className="border-t border-emerald-500/20 pt-4">
              <p className="font-semibold text-emerald-300">Global Placement Cell</p>
              <p className="text-xs text-emerald-100/70">
                International Institute of Internship™
              </p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-background relative z-10 -mt-6 flex w-full flex-col justify-center rounded-t-[30px] px-6 pb-8 pt-5 md:mt-0 md:w-1/2 md:rounded-none md:px-12 md:py-8 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-[400px]">
          {}
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {}
          <div className="mb-6 space-y-1">
            <h1 className="text-foreground text-2xl font-semibold tracking-tight">
              Forgot password?
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                      <Input id="forgot-email-input" icon={Mail} type="email" autoComplete="email" placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full font-bold"
                disabled={isPending}
              >
                {isPending ? "Sending link..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
