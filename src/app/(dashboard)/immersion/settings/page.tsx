"use client";

import type { Metadata } from "next";
import { Eye, EyeOff, Loader2, Lock, Save, ShieldCheck, User } from "lucide-react";
import React_3 from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z_3 from "zod";
import { z as z_2 } from "zod";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot, Label as LabelPrimitive } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthContext } from "@/x/8789d6dc";
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

const ZStudentProfileUpdate = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be at most 100 characters." }),
});

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex select-none items-center gap-2 text-xs/relaxed font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
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

const passwordSchema = z
      .string({ error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number");

const ZStudentPasswordChange = z
      .object({
        currentPassword: z.string().optional(),
        newPassword: passwordSchema,
        confirmPassword: z
          .string()
          .min(1, { message: "Please confirm your password." }),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });

type TStudentPasswordChange = z.infer<typeof ZStudentPasswordChange>;

interface GetUsersParams {
      page?: number;
      limit?: number;
      role?: UserRole;
      search?: string;
    }

type GetUsersResponse = GenericApiResponse<UserPublic[]>;

type CreateUserResponse = GenericApiResponse<UserPublic>;

interface AdminCreateUserRequest {
      email: string;
      name?: string;
      role?: UserRole;
      password?: string;
    }

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


export default function ImmersionSettingsPage() {
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

    function useAuth() {
      return useContext(AuthContext);
    }

    type TStudentProfileUpdate = z.infer<typeof ZStudentProfileUpdate>;
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

    function PasswordInput({
      id,
      placeholder,
      error,
      ...props
    }: React_3.InputHTMLAttributes<HTMLInputElement> & {
      id: string;
      placeholder?: string;
      error?: string;
    }) {
      const [show, setShow] = useState(false);
      return (
        <div className="space-y-1.5">
          <div className="relative">
            <Input
              id={id}
              type={show ? "text" : "password"}
              placeholder={placeholder}
              className={`h-10 pr-10 ${error ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              {...props}
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              onClick={() => setShow((p) => !p)}
              tabIndex={-1}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      );
    }

    const ZStudentProfileUpdate = z_2.object({
      name: z_2
        .string()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(100, { message: "Name must be at most 100 characters." }),
    });

    function ProfileForm_4() {
      const { user } = useAuth();
      const { mutate: updateUser, isPending } = UserDataHook.useUpdateUser();

      const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
      } = useForm<TStudentProfileUpdate>({
        resolver: zodResolver(ZStudentProfileUpdate),
        defaultValues: { name: user?.name ?? "" },
      });

      const onSubmit = (values: TStudentProfileUpdate) => {
        if (!user?.id) return;
        updateUser(
          {
            id: user.id,
            payload: { name: values.name },
          },
          {
            onSuccess: () => {
              toast.success("Profile details updated successfully!");
            },
          },
        );
      };

      return (
        <div className="bg-card border-border/80 space-y-5 rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
              <User className="size-5" />
            </div>
            <div>
              <h2 className="text-foreground text-base font-bold">
                Profile Information
              </h2>
              <p className="text-muted-foreground text-xs">
                View and update your profile details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {}
            <div className="space-y-1.5">
              <Label
                htmlFor="email-display"
                className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="email-display"
                value={user?.email ?? ""}
                readOnly
                disabled
                className="bg-muted/50 text-muted-foreground h-10 cursor-not-allowed"
              />
              <p className="text-muted-foreground text-[11px]">
                Email cannot be changed.
              </p>
            </div>

            {}
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Role
              </Label>
              <Input
                value={user?.role ?? ""}
                readOnly
                disabled
                className="bg-muted/50 text-muted-foreground h-10 cursor-not-allowed"
              />
            </div>

            {}
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-name"
                className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
              >
                Display Name
              </Label>
              <Input
                id="profile-name"
                placeholder="Enter your full name"
                className={`h-10 ${errors.name ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Button
              id="save-profile-btn"
              type="submit"
              disabled={!isDirty || isPending}
              className="h-10 gap-2"
            >
              <Save className="size-4" />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      );
    }
    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
          } = useForm<TStudentPasswordChange>({
            resolver: zodResolver(ZStudentPasswordChange),
          });
    const { mutate, isPending } = AuthDataHook.useChangePassword({
            onSuccess: () => {
              reset();
            },
          });
    const onSubmit = (values: TStudentPasswordChange) => {
            mutate({
              newPassword: values.newPassword,
            });
          };


  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your profile and account security.
        </p>
      </div>
      <ProfileForm_4 />
      <div className="bg-card border-border/80 space-y-5 rounded-2xl border p-6 shadow-sm">
                    <div className="flex items-center gap-3 border-b pb-4">
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                        <Lock className="size-5" />
                      </div>
                      <div>
                        <h2 className="text-foreground text-base font-bold">
                          Change Password
                        </h2>
                        <p className="text-muted-foreground text-xs">
                          Keep your account secure with a strong password
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="new-password"
                          className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                        >
                          New Password
                        </Label>
                        <PasswordInput
                          id="new-password"
                          placeholder="At least 8 characters"
                          error={errors.newPassword?.message}
                          {...register("newPassword")}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="confirm-password"
                          className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                        >
                          Confirm New Password
                        </Label>
                        <PasswordInput
                          id="confirm-password"
                          placeholder="Re-enter new password"
                          error={errors.confirmPassword?.message}
                          {...register("confirmPassword")}
                        />
                      </div>

                      {}
                      <div className="bg-muted/50 text-muted-foreground space-y-1 rounded-xl p-3 text-xs">
                        <p className="text-foreground font-semibold">
                          Password must include:
                        </p>
                        <ul className="list-inside list-disc space-y-0.5">
                          <li>At least 8 characters</li>
                          <li>One uppercase letter (A–Z)</li>
                          <li>One lowercase letter (a–z)</li>
                          <li>One digit (0–9)</li>
                        </ul>
                      </div>

                      <Button
                        id="change-password-btn"
                        type="submit"
                        disabled={isPending}
                        className="h-10 gap-2"
                      >
                        {isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ShieldCheck className="size-4" />
                        )}
                        Update Password
                      </Button>
                    </form>
                  </div>
    </div>
  );
}
