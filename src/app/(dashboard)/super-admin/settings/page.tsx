"use client";

import { Activity, Lock, Sliders, User } from "lucide-react";
import React_2, { useState } from "react";
import { Activity as Activity_2, Cpu, Database, Eye, EyeOff, HardDrive, Layers, Loader2, Mail as Mail_2, Monitor, RefreshCw, Save, Server, ShieldCheck, Terminal } from "lucide-react";
import React_3 from "react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const ZSuperAdminPasswordChange = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const ZSuperAdminProfileUpdate = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
});
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

interface GetJobOpportunitiesParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface JobOpportunityPublic {
      id: string;
      companyName: string;
      address: string;
      postOpportunity: string;
      jobNature: string;
      fieldOfEmployment: string;
      minQualification: string;
      skillsRequired?: string;
      totalStaffStrength?: string;
      website?: string;
      logoUrl?: string;
      isActive: boolean;
      advtNo?: string;
      advtDate?: string;
      closingDate?: string;
      jdDocUrl?: string;
      jdDescription?: string | null;
      createdAt: string;
      updatedAt: string;
      createdById: string;
    }

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

interface GetJobApplicationsParams {
      page?: number;
      limit?: number;
      jobOpportunityId?: string;
      search?: string;
    }

interface JobApplicationPublic {
      id: string;
      jobOpportunityId: string;
      name: string;
      age: number;
      address: string;
      mobile: string;
      email: string;
      qualification: string;
      skills: string;
      resumeUrl?: string;
      status: string; 
      createdAt: string;
      updatedAt: string;
      userId: string;
      jobOpportunity?: {
        id: string;
        companyName: string;
        postOpportunity: string;
      };
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

interface MediaPhotoPublic {
      id: string;
      url: string;
      title: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaVideoPublic {
      id: string;
      youtubeId: string;
      title: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaVideoPayload {
      youtubeId: string;
      title: string;
      date: string;
      description: string;
    }

interface MediaNewspaperPublic {
      id: string;
      title: string;
      publication: string;
      date: string;
      description: string;
      imageUrl: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaOnlineLinkPublic {
      id: string;
      slNo: string;
      date: string;
      headline: string;
      agency: string;
      link: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaOnlineLinkPayload {
      slNo: string;
      date: string;
      headline: string;
      agency: string;
      link: string;
    }

interface GetBlogsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface BlogPublic {
      id: string;
      title: string;
      content: string;
      category: string;
      serialNo?: string;
      date: string;
      location?: string;
      authorName: string;
      authorRole?: string;
      authorEmail?: string;
      imageUrl?: string;
      createdAt: string;
      updatedAt: string;
    }

interface GetReviewsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface ReviewPublic {
      id: string;
      name: string;
      email: string;
      role: string;
      rating: number;
      comment: string;
      avatarUrl?: string;
      isApproved: boolean;
      approvedAt?: string;
      createdAt: string;
      updatedAt: string;
    }

interface GetDonationsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface DonationAdmin {
      id: string;
      amount: number;
      donorName: string;
      email: string;
      mobile: string;
      address: string;
      notes?: string;
      wants80G: boolean;
      panNumber?: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      status: string; 
      receiptPath?: string;
      createdAt: string;
      updatedAt: string;
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

interface ImmersionApplicationPublic {
      id: string;
      status: "PENDING" | "APPROVED" | "REJECTED";
      remarks: string | null;
      registeredAt: string;
      submittedAt?: string | null;
      createdAt?: string | null;
      studentId: string;
      immersionId: string;
      mentorId?: string | null;
      mentor?: {
        id: string;
        fullName?: string;
        name?: string;
        user?: {
          name?: string;
        };
      } | null;
      student?: {
        fullName: string;
        email: string;
      };
      immersion?: {
        id: string;
        title: string;
        description: string;
      };
      certificate?: {
        id: string;
        certificateNo: string;
        grade?: string | null;
        credits?: string | null;
      } | null;
      user?: {
        id?: string;
        name?: string;
        email?: string;
        registrationNo?: string | null;
      } | null;
    }

interface AssignMentorPayload {
      mentorId: string | null;
    }

interface TicketObject {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "CLOSED";
      createdAt: string;
    }

interface NoticePayload {
      title: string;
      content: string;
      targetRole?: "STUDENT" | "INSTRUCTOR";
      receiverId?: string;
      internshipIds?: string[];
      immersionIds?: string[];
    }

interface SuperAdminProfileUpdatePayload {
      name: string;
    }

interface SuperAdminProfileUpdateResponse {
      success: boolean;
      message?: string;
      data?: any;
    }

interface ISuperAdminService {
        getJobOpportunities: (
        params?: GetJobOpportunitiesParams,
      ) => Promise<GenericApiResponse<JobOpportunityPublic[]>>;
      getJobOpportunityById: (
        id: string,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      createJobOpportunity: (
        formData: FormData,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      updateJobOpportunity: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      deleteJobOpportunity: (id: string) => Promise<GenericApiResponse>;
      getJobApplications: (
        params?: GetJobApplicationsParams,
      ) => Promise<GenericApiResponse<JobApplicationPublic[]>>;
      exportJobApplications: (jobOpportunityId: string) => Promise<Blob>;
      updateJobApplicationStatus: (
        id: string,
        payload: {
          status: string;
          message?: string;
          pdfBase64?: string;
          link?: string;
        },
      ) => Promise<GenericApiResponse<any>>;

        getPendingInternships: () => Promise<GenericApiResponse<InternshipPublic[]>>;
      approveInternshipPosting: (id: string) => Promise<GenericApiResponse>;
      getLeadInterests: (
        internshipId: string,
      ) => Promise<GenericApiResponse<any[]>>;
      createInternship: (
        payload: any,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      updateInternship: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      getInternshipById: (
        id: string,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      deleteInternship: (id: string) => Promise<GenericApiResponse>;
      getInternshipApplications: (
        internshipId: string,
      ) => Promise<GenericApiResponse<any[]>>;
      exportInternshipApplications: (internshipId: string) => Promise<Blob>;
      approveInternshipApplication: (
        internshipId: string,
        applicationId: string,
      ) => Promise<GenericApiResponse<any>>;
      rejectInternshipApplication: (
        internshipId: string,
        applicationId: string,
      ) => Promise<GenericApiResponse<any>>;

        getMediaPhotos: () => Promise<GenericApiResponse<MediaPhotoPublic[]>>;
      createMediaPhoto: (
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaPhotoPublic>>;
      updateMediaPhoto: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaPhotoPublic>>;
      deleteMediaPhoto: (id: string) => Promise<GenericApiResponse>;

      getMediaVideos: () => Promise<GenericApiResponse<MediaVideoPublic[]>>;
      createMediaVideo: (
        payload: MediaVideoPayload,
      ) => Promise<GenericApiResponse<MediaVideoPublic>>;
      updateMediaVideo: (
        id: string,
        payload: Partial<MediaVideoPayload>,
      ) => Promise<GenericApiResponse<MediaVideoPublic>>;
      deleteMediaVideo: (id: string) => Promise<GenericApiResponse>;

      getMediaNewspapers: () => Promise<GenericApiResponse<MediaNewspaperPublic[]>>;
      createMediaNewspaper: (
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaNewspaperPublic>>;
      updateMediaNewspaper: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaNewspaperPublic>>;
      deleteMediaNewspaper: (id: string) => Promise<GenericApiResponse>;

      getMediaOnlineLinks: () => Promise<
        GenericApiResponse<MediaOnlineLinkPublic[]>
      >;
      createMediaOnlineLink: (
        payload: MediaOnlineLinkPayload,
      ) => Promise<GenericApiResponse<MediaOnlineLinkPublic>>;
      updateMediaOnlineLink: (
        id: string,
        payload: Partial<MediaOnlineLinkPayload>,
      ) => Promise<GenericApiResponse<MediaOnlineLinkPublic>>;
      deleteMediaOnlineLink: (id: string) => Promise<GenericApiResponse>;

        getBlogs: (
        params?: GetBlogsParams,
      ) => Promise<GenericApiResponse<BlogPublic[]>>;
      getBlogById: (id: string) => Promise<GenericApiResponse<BlogPublic>>;
      createBlog: (formData: FormData) => Promise<GenericApiResponse<BlogPublic>>;
      updateBlog: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<BlogPublic>>;
      deleteBlog: (id: string) => Promise<GenericApiResponse>;

        getPendingReviews: (
        params?: GetReviewsParams,
      ) => Promise<GenericApiResponse<ReviewPublic[]>>;
      approveReview: (id: string) => Promise<GenericApiResponse>;
      deleteReview: (id: string) => Promise<GenericApiResponse>;

        getDonations: (
        params?: GetDonationsParams,
      ) => Promise<GenericApiResponse<DonationAdmin[]>>;
      exportDonations: (params?: GetDonationsParams) => Promise<Blob>;

        getStudentRegistrations: (params?: any) => Promise<GenericApiResponse<any[]>>;
      getStudentRegistrationById: (id: string) => Promise<GenericApiResponse<any>>;
      updateStudentRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;
      deleteStudentRegistration: (id: string) => Promise<GenericApiResponse>;
      downloadStudentRegistration: (id: string) => Promise<Blob>;
      downloadInstructorRegistration: (id: string) => Promise<Blob>;
      downloadImmersionRegistration: (id: string) => Promise<Blob>;
      downloadRecruitRegistration: (id: string) => Promise<Blob>;
      getRecruitProfile: (userId: string) => Promise<GenericApiResponse<any>>;
      getRecruitRegistrations: (params?: any) => Promise<GenericApiResponse<any[]>>;
      deleteRecruitRegistration: (id: string) => Promise<GenericApiResponse>;
      getRecruitRegistrationById: (id: string) => Promise<GenericApiResponse<any>>;
      updateRecruitRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;

        getInstructorRegistrations: (
        params?: any,
      ) => Promise<GenericApiResponse<any[]>>;
      getInstructorRegistrationById: (
        id: string,
      ) => Promise<GenericApiResponse<any>>;
      updateInstructorRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;
      deleteInstructorRegistration: (id: string) => Promise<GenericApiResponse>;
      approveInstructorRegistration: (id: string) => Promise<GenericApiResponse>;
      rejectInstructorRegistration: (id: string) => Promise<GenericApiResponse>;

        getPendingInstructorProfiles: () => Promise<
        GenericApiResponse<PendingInstructorProfile[]>
      >;
      approveInstructorProfile: (id: string) => Promise<GenericApiResponse>;
      rejectInstructorProfile: (id: string) => Promise<GenericApiResponse>;

        getImmersionApplications: () => Promise<
        GenericApiResponse<{
          applications: ImmersionApplicationPublic[];
          pagination: any;
        }>
      >;
      getImmersionApplicationById: (
        id: string,
      ) => Promise<GenericApiResponse<ImmersionApplicationPublic>>;
      updateImmersionStatus: (
        id: string,
        payload: { status: "APPROVED" | "REJECTED"; remarks?: string },
      ) => Promise<GenericApiResponse>;
      assignImmersionMentor: (
        id: string,
        payload: AssignMentorPayload,
      ) => Promise<GenericApiResponse>;
      deleteImmersionApplication: (id: string) => Promise<GenericApiResponse>;
      exportImmersionApplications: (immersionId: string) => Promise<Blob>;

        getTickets: (params?: any) => Promise<GenericApiResponse<TicketObject[]>>;
      updateTicket: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<TicketObject>>;
      deleteTicket: (id: string) => Promise<GenericApiResponse>;

        getNotices: (params?: any) => Promise<GenericApiResponse<any[]>>;
      createNotice: (payload: NoticePayload) => Promise<GenericApiResponse>;
      deleteNotice: (id: string) => Promise<GenericApiResponse>;

        completeEnrollment: (id: string) => Promise<GenericApiResponse<any>>;
      issueCertificate: (id: string) => Promise<GenericApiResponse<any>>;
      issueImmersionCertificate: (id: string) => Promise<GenericApiResponse<any>>;

        getAllInternships: () => Promise<GenericApiResponse<any[]>>;
      getImmersions: () => Promise<GenericApiResponse<any[]>>;
      getImmersionById: (id: string) => Promise<GenericApiResponse<any>>;
      createImmersion: (payload: any) => Promise<GenericApiResponse>;
      updateImmersion: (id: string, payload: any) => Promise<GenericApiResponse>;
      deleteImmersion: (id: string) => Promise<GenericApiResponse>;
      getImmersionCategories: () => Promise<GenericApiResponse<any[]>>;
      createImmersionCategory: (payload: {
        name: string;
      }) => Promise<GenericApiResponse>;

        updateProfile: (
        id: string,
        payload: SuperAdminProfileUpdatePayload,
      ) => Promise<SuperAdminProfileUpdateResponse>;
    }

interface HealthData {
      success: boolean;
      status: "ok" | "degraded";
      timestamp: string;
      uptime: number;
      version: string;
      environment: string;
      latencyMs: number;
      system?: {
        platform: string;
        nodeVersion: string;
        cpuCount: number;
        cpuLoad1m: number;
        cpuLoad5m: number;
        cpuLoad15m: number;
        memory: {
          totalBytes: number;
          freeBytes: number;
          usedBytes: number;
          usagePercent: number;
        };
        disk?: {
          size: string;
          used: string;
          available: string;
          usagePercent: string;
        } | null;
      };
      process?: {
        memory: {
          rss: number;
          heapTotal: number;
          heapUsed: number;
          external: number;
        };
      };
      services: {
        database: {
          status: "ok" | "error";
          latencyMs?: number;
        };
        email: {
          status: "ok" | "error";
        };
      };
    }

const tabs = [
    {
      id: "profile" as const,
      label: "Profile Information",
      description: "Manage name, email & display settings",
      icon: User,
    },
    {
      id: "security" as const,
      label: "Account Security",
      description: "Update password & protect your account",
      icon: Lock,
    },
    {
      id: "system" as const,
      label: "System Health",
      description: "Monitor database and latency metrics",
      icon: Activity,
    },
  ];

const formatUptime = (seconds: number) => {
            const d = Math.floor(seconds / (3600 * 24));
            const h = Math.floor((seconds % (3600 * 24)) / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);
            return `${d}d ${h}h ${m}m ${s}s`;
          };

const formatBytes = (bytes: number, decimals = 2) => {
            if (!bytes || bytes === 0) return "0 Bytes";
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
          };


export default function SettingsPage() {
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
    const SuperAdminService: ISuperAdminService = {
        async getJobOpportunities(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobOpportunityPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITIES, { params });
        return response.data;
      },

      async getJobOpportunityById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id));
        return response.data;
      },

      async createJobOpportunity(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITIES, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateJobOpportunity(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteJobOpportunity(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id),
        );
        return response.data;
      },

      async getJobApplications(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobApplicationPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.JOB_APPLICATIONS, { params });
        return response.data;
      },

      async exportJobApplications(jobOpportunityId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_EXPORT_APPLICATIONS(
            jobOpportunityId,
          ),
          { responseType: "blob" },
        );
        return response.data;
      },

      async updateJobApplicationStatus(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.JOB_APPLICATION_STATUS(id),
          payload,
        );
        return response.data;
      },

        async getPendingInternships() {
        const response = await axiosInstance.get<
          GenericApiResponse<InternshipPublic[]>
        >(ENDPOINTS.INTERNSHIPS.PENDING);
        return response.data;
      },

      async approveInternshipPosting(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INTERNSHIPS.APPROVE_POSTING(id),
        );
        return response.data;
      },

      async getLeadInterests(internshipId) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.LEAD_INTERESTS(internshipId),
        );
        return response.data;
      },

      async createInternship(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS, payload);
        return response.data;
      },

      async updateInternship(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id), payload);
        return response.data;
      },

      async getInternshipById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id));
        return response.data;
      },

      async deleteInternship(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id),
        );
        return response.data;
      },

      async getInternshipApplications(internshipId) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INTERNSHIPS.APPLICATIONS(internshipId),
        );
        return response.data;
      },

      async exportInternshipApplications(internshipId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.INTERNSHIPS.EXPORT_APPLICATIONS(internshipId),
          { responseType: "blob" },
        );
        return response.data;
      },

      async approveInternshipApplication(internshipId, applicationId) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.APPROVE_APPLICATION(internshipId, applicationId),
        );
        return response.data;
      },

      async rejectInternshipApplication(internshipId, applicationId) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REJECT_APPLICATION(internshipId, applicationId),
        );
        return response.data;
      },

        async getMediaPhotos() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaPhotoPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS);
        return response.data;
      },

      async createMediaPhoto(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaPhotoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateMediaPhoto(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaPhotoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteMediaPhoto(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaVideos() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaVideoPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS);
        return response.data;
      },

      async createMediaVideo(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaVideoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS, payload);
        return response.data;
      },

      async updateMediaVideo(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaVideoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS_BY_ID(id), payload);
        return response.data;
      },

      async deleteMediaVideo(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaNewspapers() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaNewspaperPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS);
        return response.data;
      },

      async createMediaNewspaper(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaNewspaperPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateMediaNewspaper(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaNewspaperPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteMediaNewspaper(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaOnlineLinks() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaOnlineLinkPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS);
        return response.data;
      },

      async createMediaOnlineLink(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaOnlineLinkPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS, payload);
        return response.data;
      },

      async updateMediaOnlineLink(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaOnlineLinkPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS_BY_ID(id), payload);
        return response.data;
      },

      async deleteMediaOnlineLink(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS_BY_ID(id),
        );
        return response.data;
      },

        async getBlogs(params) {
        const response = await axiosInstance.get<GenericApiResponse<BlogPublic[]>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS,
          { params },
        );
        return response.data;
      },

      async getBlogById(id) {
        const response = await axiosInstance.get<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
        );
        return response.data;
      },

      async createBlog(formData) {
        const response = await axiosInstance.post<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      },

      async updateBlog(id, formData) {
        const response = await axiosInstance.patch<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      },

      async deleteBlog(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
        );
        return response.data;
      },

        async getPendingReviews(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<ReviewPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.REVIEWS_PENDING, { params });
        return response.data;
      },

      async approveReview(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.REVIEW_APPROVE(id),
        );
        return response.data;
      },

      async deleteReview(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.REVIEW_BY_ID(id),
        );
        return response.data;
      },

        async getDonations(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<DonationAdmin[]>
        >(ENDPOINTS.SUPER_ADMIN.DONATIONS_ADMIN, { params });
        return response.data;
      },

      async exportDonations(params) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.DONATIONS_ADMIN_EXPORT,
          { params, responseType: "blob" },
        );
        return response.data;
      },

        async getStudentRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.STUDENTS.REGISTER_ADMIN,
          { params },
        );
        return response.data;
      },

      async getStudentRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateStudentRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteStudentRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async downloadStudentRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.STUDENTS.REGISTER_DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadInstructorRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `/instructor/register/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadImmersionRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `/immersion/applications/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadRecruitRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async getRecruitProfile(userId) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          `${ENDPOINTS.RECRUIT.PROFILE}`,
          { params: { userId } },
        );
        return response.data;
      },

      async getRecruitRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS,
          { params },
        );
        return response.data;
      },

      async deleteRecruitRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
        );
        return response.data;
      },

      async getRecruitRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
        );
        return response.data;
      },

      async updateRecruitRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
          payload,
        );
        return response.data;
      },

        async getInstructorRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_ADMIN,
          { params },
        );
        return response.data;
      },

      async getInstructorRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateInstructorRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteInstructorRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async approveInstructorRegistration(id) {
        const response = await axiosInstance.post<GenericApiResponse>(
          `${ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id)}/approve`,
        );
        return response.data;
      },

      async rejectInstructorRegistration(id) {
        const response = await axiosInstance.post<GenericApiResponse>(
          `${ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id)}/reject`,
        );
        return response.data;
      },

        async getPendingInstructorProfiles() {
        const response = await axiosInstance.get<
          GenericApiResponse<PendingInstructorProfile[]>
        >(ENDPOINTS.INSTRUCTOR.PROFILES_PENDING);
        return response.data;
      },

      async approveInstructorProfile(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_APPROVE(id),
        );
        return response.data;
      },

      async rejectInstructorProfile(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_REJECT(id),
        );
        return response.data;
      },

        async getImmersionApplications() {
        const response = await axiosInstance.get<
          GenericApiResponse<{
            applications: ImmersionApplicationPublic[];
            pagination: any;
          }>
        >(ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATIONS);
        return response.data;
      },

      async getImmersionApplicationById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<ImmersionApplicationPublic>
        >(ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATION_BY_ID(id));
        return response.data;
      },

      async updateImmersionStatus(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_STATUS(id),
          payload,
        );
        return response.data;
      },

      async assignImmersionMentor(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_ASSIGN_MENTOR(id),
          payload,
        );
        return response.data;
      },

      async deleteImmersionApplication(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATION_BY_ID(id),
        );
        return response.data;
      },

      async exportImmersionApplications(immersionId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_EXPORT_APPLICATIONS(immersionId),
          { responseType: "blob" },
        );
        return response.data;
      },

        async getTickets(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<TicketObject[]>
        >(ENDPOINTS.SUPER_ADMIN.TICKETS_ADMIN, { params });
        return response.data;
      },

      async updateTicket(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<TicketObject>
        >(ENDPOINTS.TICKETS.BY_ID(id), payload);
        return response.data;
      },

      async deleteTicket(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.TICKETS.BY_ID(id),
        );
        return response.data;
      },

        async getNotices(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.NOTICES.BASE,
          { params },
        );
        return response.data;
      },

      async createNotice(payload) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.NOTICES.BASE,
          payload,
        );
        return response.data;
      },

      async deleteNotice(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.NOTICES.BY_ID(id),
        );
        return response.data;
      },

        async completeEnrollment(id) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.ENROLLMENTS.COMPLETE(id),
        );
        return response.data;
      },

      async issueCertificate(id) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.ENROLLMENTS.ISSUE_CERTIFICATE(id),
        );
        return response.data;
      },

      async issueImmersionCertificate(applicationId: string) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_ISSUE_CERTIFICATE(applicationId),
        );
        return response.data;
      },

        async getAllInternships() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INTERNSHIPS.BASE,
          { params: { limit: 100 } },
        );
        return response.data;
      },

      async getImmersions() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS,
        );
        return response.data;
      },

      async getImmersionById(id: string) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
        );
        return response.data;
      },

      async createImmersion(payload: any) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS,
          payload,
        );
        return response.data;
      },

      async updateImmersion(id: string, payload: any) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteImmersion(id: string) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
        );
        return response.data;
      },

      async getImmersionCategories() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_CATEGORIES,
        );
        return response.data;
      },

      async createImmersionCategory(payload: { name: string }) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_CATEGORIES,
          payload,
        );
        return response.data;
      },

      async updateProfile(id, payload) {
        const response = await axiosInstance.patch<SuperAdminProfileUpdateResponse>(
          ENDPOINTS.USERS.BY_ID(id),
          payload,
        );
        return response.data;
      },
    };

    const SuperAdminDataHooks = {
        useJobOpportunities(
        params?: GetJobOpportunitiesParams,
        options?: TQueryOptions<GenericApiResponse<JobOpportunityPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_OPPORTUNITIES(params),
          queryFn: async () => await SuperAdminService.getJobOpportunities(params),
          ...options,
        });
      },

      useJobOpportunityDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<JobOpportunityPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_OPPORTUNITY_DETAIL(id),
          queryFn: async () => await SuperAdminService.getJobOpportunityById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateJobOpportunity(
        options?: TMutationOptions<
          GenericApiResponse<JobOpportunityPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createJobOpportunity(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateJobOpportunity(
        options?: TMutationOptions<
          GenericApiResponse<JobOpportunityPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateJobOpportunity(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteJobOpportunity(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteJobOpportunity(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useJobApplications(
        params?: GetJobApplicationsParams,
        options?: TQueryOptions<GenericApiResponse<JobApplicationPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_APPLICATIONS(params),
          queryFn: async () => await SuperAdminService.getJobApplications(params),
          ...options,
        });
      },

      useExportJobApplications(options?: TMutationOptions<Blob, Error, string>) {
        return useMutation({
          mutationFn: async (jobOpportunityId) =>
            await SuperAdminService.exportJobApplications(jobOpportunityId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateJobApplicationStatus(options?: any) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: {
              status: string;
              message?: string;
              pdfBase64?: string;
              link?: string;
            };
          }) => await SuperAdminService.updateJobApplicationStatus(id, payload),
          onSuccess: (data: any, variables: any, context: any) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success("Job application status updated successfully!");
            options?.onSuccess?.(data, variables, context);
          },
          onError: (err: any, variables: any, context: any) => {
            toast.error(err.message || "Failed to update job application status.");
            options?.onError?.(err, variables, context);
          },
        });
      },

      useRecruitProfile(userId: string, options?: any) {
        return useQuery({
          queryKey: ["super-admin", "recruit-profile", userId],
          queryFn: async () => await SuperAdminService.getRecruitProfile(userId),
          enabled: !!userId,
          ...options,
        });
      },

        usePendingInternships(
        options?: TQueryOptions<GenericApiResponse<InternshipPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INTERNSHIPS,
          queryFn: async () => await SuperAdminService.getPendingInternships(),
          ...options,
        });
      },

      useInternshipDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<InternshipPublic>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "internship-detail", id],
          queryFn: async () => await SuperAdminService.getInternshipById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateInternship(
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          any
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createInternship(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateInternship(
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateInternship(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInternshipPosting(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(
              data.message || "Internship posting approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve internship posting.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteInternship(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteInternship(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useLeadInterests(
        internshipId: string,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.LEAD_INTERESTS(internshipId),
          queryFn: async () =>
            await SuperAdminService.getLeadInterests(internshipId),
          enabled: !!internshipId,
          ...options,
        });
      },

      useInternshipApplications(
        internshipId: string,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(internshipId),
          queryFn: async () =>
            await SuperAdminService.getInternshipApplications(internshipId),
          enabled: !!internshipId,
          ...options,
        });
      },

      useExportInternshipApplications(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (internshipId) =>
            await SuperAdminService.exportInternshipApplications(internshipId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInternshipApplication(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await SuperAdminService.approveInternshipApplication(
              internshipId,
              applicationId,
            ),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(
                variables.internshipId,
              ),
            });
            toast.success(data.message || "Application approved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve application.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInternshipApplication(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await SuperAdminService.rejectInternshipApplication(
              internshipId,
              applicationId,
            ),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(
                variables.internshipId,
              ),
            });
            toast.success(data.message || "Application rejected.");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject application.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useMediaPhotos(
        options?: TQueryOptions<GenericApiResponse<MediaPhotoPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
          queryFn: async () => await SuperAdminService.getMediaPhotos(),
          ...options,
        });
      },

      useCreateMediaPhoto(
        options?: TMutationOptions<
          GenericApiResponse<MediaPhotoPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaPhoto(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item uploaded successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to upload photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaPhoto(
        options?: TMutationOptions<
          GenericApiResponse<MediaPhotoPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateMediaPhoto(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaPhoto(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteMediaPhoto(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaVideos(
        options?: TQueryOptions<GenericApiResponse<MediaVideoPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
          queryFn: async () => await SuperAdminService.getMediaVideos(),
          ...options,
        });
      },

      useCreateMediaVideo(
        options?: TMutationOptions<
          GenericApiResponse<MediaVideoPublic>,
          Error,
          MediaVideoPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaVideo(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to add video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaVideo(
        options?: TMutationOptions<
          GenericApiResponse<MediaVideoPublic>,
          Error,
          { id: string; payload: Partial<MediaVideoPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateMediaVideo(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaVideo(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteMediaVideo(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaNewspapers(
        options?: TQueryOptions<GenericApiResponse<MediaNewspaperPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
          queryFn: async () => await SuperAdminService.getMediaNewspapers(),
          ...options,
        });
      },

      useCreateMediaNewspaper(
        options?: TMutationOptions<
          GenericApiResponse<MediaNewspaperPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaNewspaper(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item uploaded successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to upload newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaNewspaper(
        options?: TMutationOptions<
          GenericApiResponse<MediaNewspaperPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateMediaNewspaper(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaNewspaper(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteMediaNewspaper(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaOnlineLinks(
        options?: TQueryOptions<GenericApiResponse<MediaOnlineLinkPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
          queryFn: async () => await SuperAdminService.getMediaOnlineLinks(),
          ...options,
        });
      },

      useCreateMediaOnlineLink(
        options?: TMutationOptions<
          GenericApiResponse<MediaOnlineLinkPublic>,
          Error,
          MediaOnlineLinkPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaOnlineLink(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to add online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaOnlineLink(
        options?: TMutationOptions<
          GenericApiResponse<MediaOnlineLinkPublic>,
          Error,
          { id: string; payload: Partial<MediaOnlineLinkPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateMediaOnlineLink(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaOnlineLink(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteMediaOnlineLink(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useBlogs(
        params?: GetBlogsParams,
        options?: TQueryOptions<GenericApiResponse<BlogPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.BLOGS(params),
          queryFn: async () => await SuperAdminService.getBlogs(params),
          ...options,
        });
      },

      useBlogDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<BlogPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.BLOG_DETAIL(id),
          queryFn: async () => await SuperAdminService.getBlogById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateBlog(
        options?: TMutationOptions<GenericApiResponse<BlogPublic>, Error, FormData>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) => await SuperAdminService.createBlog(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateBlog(
        options?: TMutationOptions<
          GenericApiResponse<BlogPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateBlog(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteBlog(options?: TMutationOptions<GenericApiResponse, Error, string>) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteBlog(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        usePendingReviews(
        params?: GetReviewsParams,
        options?: TQueryOptions<GenericApiResponse<ReviewPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_REVIEWS(params),
          queryFn: async () => await SuperAdminService.getPendingReviews(params),
          ...options,
        });
      },

      useApproveReview(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.approveReview(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Review approved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve review.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteReview(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteReview(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Review deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete review.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useDonations(
        params?: GetDonationsParams,
        options?: TQueryOptions<GenericApiResponse<DonationAdmin[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.DONATIONS(params),
          queryFn: async () => await SuperAdminService.getDonations(params),
          ...options,
        });
      },

      useExportDonations(
        options?: TMutationOptions<Blob, Error, GetDonationsParams | undefined>,
      ) {
        return useMutation({
          mutationFn: async (params) =>
            await SuperAdminService.exportDonations(params),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export donations ledger.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useStudentRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.STUDENT_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getStudentRegistrations(params),
          ...options,
        });
      },

      useStudentRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.STUDENT_REGISTRATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getStudentRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateStudentRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateStudentRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Student registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update student registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteStudentRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteStudentRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Student registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete student registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadStudentRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadStudentRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to download registration PDF.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadInstructorRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadInstructorRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download instructor registration PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadImmersionRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadImmersionRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download immersion application PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadRecruitRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadRecruitRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download recruit registration PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useInstructorRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INSTRUCTOR_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getInstructorRegistrations(params),
          ...options,
        });
      },

      useInstructorRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INSTRUCTOR_REGISTRATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getInstructorRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateInstructorRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateInstructorRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to approve instructor registration.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.rejectInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useRecruitRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.RECRUIT_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getRecruitRegistrations(params),
          ...options,
        });
      },

      useDeleteRecruitRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteRecruitRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Recruit registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete recruit registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRecruitRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "recruit-registration-detail", id],
          queryFn: async () =>
            await SuperAdminService.getRecruitRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateRecruitRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateRecruitRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Recruit registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update recruit registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        usePendingInstructorProfiles(
        options?: TQueryOptions<GenericApiResponse<PendingInstructorProfile[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
          queryFn: async () =>
            await SuperAdminService.getPendingInstructorProfiles(),
          ...options,
        });
      },

      useApproveInstructorProfile(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInstructorProfile(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
            });
            toast.success(
              data.message || "Instructor onboarding profile approved!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve instructor onboarding.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInstructorProfile(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.rejectInstructorProfile(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
            });
            toast.success(
              data.message || "Instructor onboarding profile rejected.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject instructor onboarding.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useImmersionApplications(
        options?: TQueryOptions<
          GenericApiResponse<{
            applications: ImmersionApplicationPublic[];
            pagination: any;
          }>
        >,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
          queryFn: async () => await SuperAdminService.getImmersionApplications(),
          ...options,
        });
      },

      useExportImmersionApplications(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (immersionId) =>
            await SuperAdminService.exportImmersionApplications(immersionId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useImmersionApplicationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<ImmersionApplicationPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getImmersionApplicationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateImmersionStatus(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          {
            id: string;
            payload: { status: "APPROVED" | "REJECTED"; remarks?: string };
          }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateImmersionStatus(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(
                variables.id,
              ),
            });
            toast.success(data.message || "Immersion status updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update status.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useAssignImmersionMentor(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: AssignMentorPayload }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.assignImmersionMentor(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(
                variables.id,
              ),
            });
            toast.success(data.message || "Mentor assigned successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to assign mentor.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteImmersionApplication(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteImmersionApplication(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            toast.success(
              data.message || "Immersion registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete immersion registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useTickets(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<TicketObject[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.TICKETS(params),
          queryFn: async () => await SuperAdminService.getTickets(params),
          ...options,
        });
      },

      useUpdateTicket(
        options?: TMutationOptions<
          GenericApiResponse<TicketObject>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateTicket(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Ticket updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update ticket.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteTicket(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteTicket(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Ticket deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete ticket.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useNotices(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>, Error>,
      ) {
        return useQuery({
          queryKey: ["notices", params],
          queryFn: async () => await SuperAdminService.getNotices(params),
          ...options,
        });
      },

      useCreateNotice(
        options?: TMutationOptions<GenericApiResponse, Error, NoticePayload>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) => await SuperAdminService.createNotice(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(
              data.message || "Notice announcement broadcasted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to broadcast notice.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteNotice(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteNotice(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(data.message || "Notice deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete notice.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useCompleteEnrollment(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.completeEnrollment(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Enrollment marked as completed successfully.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to complete enrollment.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useIssueCertificate(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.issueCertificate(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Certificate issued successfully.");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to issue certificate.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useIssueImmersionCertificate(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.issueImmersionCertificate(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            toast.success(
              data.message || "Immersion certificate issued successfully.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to issue immersion certificate.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useAdminInternships(options?: TQueryOptions<GenericApiResponse<any[]>>) {
        return useQuery({
          queryKey: ["super-admin", "all-internships"],
          queryFn: async () => await SuperAdminService.getAllInternships(),
          ...options,
        });
      },

      useAdminImmersions(options?: TQueryOptions<GenericApiResponse<any[]>>) {
        return useQuery({
          queryKey: ["super-admin", "immersions"],
          queryFn: async () => await SuperAdminService.getImmersions(),
          ...options,
        });
      },

      useImmersionDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "immersion-detail", id],
          queryFn: async () => await SuperAdminService.getImmersionById(id),
          ...options,
        });
      },

      useCreateImmersion(
        options?: TMutationOptions<GenericApiResponse, Error, any>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await SuperAdminService.createImmersion(payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program created successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateImmersion(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateImmersion(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersion-detail", variables.id],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteImmersion(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteImmersion(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useAdminImmersionCategories(
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "immersion-categories"],
          queryFn: async () => await SuperAdminService.getImmersionCategories(),
          ...options,
        });
      },

      useCreateImmersionCategory(
        options?: TMutationOptions<GenericApiResponse, Error, { name: string }>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await SuperAdminService.createImmersionCategory(payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersion-categories"],
            });
            toast.success(
              data.message || "Immersion category created successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create category.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateProfile(
        options?: TMutationOptions<
          SuperAdminProfileUpdateResponse,
          Error,
          { id: string; payload: SuperAdminProfileUpdatePayload }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateProfile(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success(data.message || "Profile updated successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

    function useAuth() {
      return useContext(AuthContext);
    }

    type TSuperAdminPasswordChange = z.infer<
      typeof ZSuperAdminPasswordChange
    >;

    type TSuperAdminProfileUpdate = z.infer<typeof ZSuperAdminProfileUpdate>;
    const ZSuperAdminPasswordChange = z_2
      .object({
        currentPassword: z_2.string().optional(),
        newPassword: z_2.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z_2
          .string()
          .min(6, "Password must be at least 6 characters"),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    function PasswordInput_4({
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

    const ZSuperAdminProfileUpdate = z_2.object({
      name: z_2.string().min(2, "Name must be at least 2 characters").max(100),
    });

    function ProfileForm_6() {
      const { user } = useAuth();
      const { mutate: updateProfile, isPending } =
        SuperAdminDataHooks.useUpdateProfile();

      const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
      } = useForm<TSuperAdminProfileUpdate>({
        resolver: zodResolver(ZSuperAdminProfileUpdate),
        defaultValues: { name: user?.name ?? "" },
      });

      const onSubmit = (values: TSuperAdminProfileUpdate) => {
        if (!user?.id) return;
        updateProfile(
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
                htmlFor="name"
                className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
              >
                Display Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                className={`h-10 ${errors.name ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="w-full font-semibold sm:w-auto"
            >
              {isPending ? (
                "Saving Changes..."
              ) : (
                <>
                  <Save className="mr-2 size-4" /> Save Changes
                </>
              )}
            </Button>
          </form>
        </div>
      );
    }

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "system">(
    "profile",
  );
    const [data, setData] = useState<HealthData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchHealth = async () => {
            setIsLoading(true);
            setError(null);
            try {
              const token =
                typeof window !== "undefined"
                  ? localStorage.getItem("authToken")
                  : null;
              const headers: Record<string, string> = {};
              if (token) {
                headers["Authorization"] = `Bearer ${token}`;
              }
              const res = await fetch("/api/health", { headers });
              const json = await res.json();
              setData(json);
            } catch (err: any) {
              setError(err?.message || "Failed to load health status.");
            } finally {
              setIsLoading(false);
            }
          };
    useEffect(() => {
            fetchHealth();
          }, []);
    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
          } = useForm<TSuperAdminPasswordChange>({
            resolver: zodResolver(ZSuperAdminPasswordChange),
          });
    const { mutate, isPending } = AuthDataHook.useChangePassword({
            onSuccess: () => {
              reset();
            },
          });
    const onSubmit = (values: TSuperAdminPasswordChange) => {
            mutate({
              newPassword: values.newPassword,
            });
          };



  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      {}
      <div className="border-border/40 border-b pb-5">
        <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          System Control & Settings
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm">
          Configure admin profile details, update passwords, and check server
          metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {}
        <div className="flex flex-col gap-2 md:col-span-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 border-primary/20 text-primary shadow-xs border"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                <Icon
                  className={`mt-0.5 size-5 shrink-0 ${isActive ? "text-primary" : ""}`}
                />
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold leading-none">
                    {tab.label}
                  </span>
                  <span className="block text-[10px] leading-tight opacity-80">
                    {tab.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {}
        <div className="space-y-6 md:col-span-3">
          {activeTab === "profile" && (
            <div className="animate-in fade-in-50 duration-200">
              <ProfileForm_6 />
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-in fade-in-50 duration-200">
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
                                        <PasswordInput_4
                                          id="new-password"
                                          placeholder="••••••••"
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
                                        <PasswordInput_4
                                          id="confirm-password"
                                          placeholder="••••••••"
                                          error={errors.confirmPassword?.message}
                                          {...register("confirmPassword")}
                                        />
                                      </div>

                                      <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full font-semibold sm:w-auto"
                                      >
                                        {isPending ? (
                                          <>
                                            <Loader2 className="mr-2 size-4 animate-spin" /> Updating...
                                          </>
                                        ) : (
                                          <>
                                            <ShieldCheck className="mr-2 size-4" /> Update Password
                                          </>
                                        )}
                                      </Button>
                                    </form>
                                  </div>
            </div>
          )}

          {activeTab === "system" && (
            <div className="animate-in fade-in-50 duration-200">
              <div className="bg-card border-border/80 space-y-6 rounded-2xl border p-6 shadow-sm">
                                    <div className="flex items-center justify-between border-b pb-4">
                                      <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                                          <Activity_2 className="size-5" />
                                        </div>
                                        <div>
                                          <h2 className="text-foreground text-base font-bold">
                                            System Health Status
                                          </h2>
                                          <p className="text-muted-foreground text-xs">
                                            Monitor active services, memory usage, CPU load, and API
                                            performance
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="icon-sm"
                                        onClick={fetchHealth}
                                        disabled={isLoading}
                                        title="Refresh health check"
                                        className="cursor-pointer"
                                      >
                                        <RefreshCw
                                          className={`size-3.5 ${isLoading ? "animate-spin" : ""}`}
                                        />
                                      </Button>
                                    </div>

                                    {isLoading && !data ? (
                                      <div className="flex flex-col items-center justify-center space-y-2 py-10">
                                        <div className="border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" />
                                        <p className="text-muted-foreground text-xs font-semibold">
                                          Fetching health metrics...
                                        </p>
                                      </div>
                                    ) : error ? (
                                      <div className="rounded-xl border border-dashed border-red-500/20 bg-red-500/5 p-4 text-center">
                                        <p className="text-xs font-semibold text-red-500">{error}</p>
                                      </div>
                                    ) : data ? (
                                      <div className="space-y-6">
                                        {}
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                          <div className="bg-muted/35 border-border/40 rounded-xl border p-3 text-center">
                                            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                                              System Status
                                            </span>
                                            <span
                                              className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                                                data.status === "ok"
                                                  ? "bg-emerald-500/10 text-emerald-500"
                                                  : "bg-amber-500/10 text-amber-500"
                                              }`}
                                            >
                                              {data.status === "ok" ? "Healthy" : "Degraded"}
                                            </span>
                                          </div>

                                          <div className="bg-muted/35 border-border/40 rounded-xl border p-3 text-center">
                                            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                                              API Latency
                                            </span>
                                            <span className="text-foreground mt-1.5 block text-sm font-semibold">
                                              {data.latencyMs} ms
                                            </span>
                                          </div>

                                          <div className="bg-muted/35 border-border/40 rounded-xl border p-3 text-center">
                                            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                                              Uptime
                                            </span>
                                            <span className="text-foreground mt-1.5 block truncate text-xs font-semibold">
                                              {formatUptime(data.uptime)}
                                            </span>
                                          </div>

                                          <div className="bg-muted/35 border-border/40 rounded-xl border p-3 text-center">
                                            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                                              App Version
                                            </span>
                                            <span className="text-foreground mt-1.5 block truncate text-xs font-semibold">
                                              v{data.version} ({data.environment})
                                            </span>
                                          </div>
                                        </div>

                                        {}
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                          {}
                                          <div className="bg-muted/20 border-border/30 flex items-center justify-between rounded-xl border p-4">
                                            <div className="flex items-center gap-3">
                                              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                <Database className="size-4.5" />
                                              </div>
                                              <div>
                                                <p className="text-foreground text-xs font-bold">
                                                  Database Connectivity
                                                </p>
                                                <p className="text-muted-foreground text-[10px]">
                                                  Prisma schema connectivity latency
                                                </p>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <span
                                                className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                  data.services.database.status === "ok"
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-red-500/10 text-red-500"
                                                }`}
                                              >
                                                {data.services.database.status === "ok"
                                                  ? "Connected"
                                                  : "Error"}
                                              </span>
                                              {data.services.database.latencyMs !== undefined && (
                                                <p className="text-muted-foreground mt-0.5 text-[10px]">
                                                  {data.services.database.latencyMs} ms
                                                </p>
                                              )}
                                            </div>
                                          </div>

                                          {}
                                          <div className="bg-muted/20 border-border/30 flex items-center justify-between rounded-xl border p-4">
                                            <div className="flex items-center gap-3">
                                              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <Mail_2 className="size-4.5" />
                                              </div>
                                              <div>
                                                <p className="text-foreground text-xs font-bold">
                                                  Email / SMTP Server
                                                </p>
                                                <p className="text-muted-foreground text-[10px]">
                                                  Nodemailer SMTP handshake check
                                                </p>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <span
                                                className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                  data.services.email.status === "ok"
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-red-500/10 text-red-500"
                                                }`}
                                              >
                                                {data.services.email.status === "ok" ? "Active" : "Offline"}
                                              </span>
                                              <p className="text-muted-foreground mt-0.5 text-[10px]">
                                                Verified
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {data.system && (
                                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {}
                                            <div className="border-border/45 bg-muted/10 space-y-4 rounded-xl border p-4">
                                              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                                                <Cpu className="size-4 text-amber-500" />
                                                <h3 className="text-foreground text-xs font-bold">
                                                  OS & CPU Status
                                                </h3>
                                              </div>

                                              <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div>
                                                  <span className="text-muted-foreground block text-[10px]">
                                                    Platform
                                                  </span>
                                                  <span className="text-foreground font-semibold capitalize">
                                                    {data.system.platform}
                                                  </span>
                                                </div>
                                                <div>
                                                  <span className="text-muted-foreground block text-[10px]">
                                                    CPU Cores
                                                  </span>
                                                  <span className="text-foreground font-semibold">
                                                    {data.system.cpuCount} Cores
                                                  </span>
                                                </div>
                                              </div>

                                              <div className="space-y-1.5">
                                                <span className="text-muted-foreground block text-[10px]">
                                                  CPU Load Average (1m / 5m / 15m)
                                                </span>
                                                <div className="flex gap-2 text-xs">
                                                  <span className="bg-muted text-foreground rounded px-2 py-0.5 font-mono text-[11px]">
                                                    1m: {data.system.cpuLoad1m.toFixed(2)}
                                                  </span>
                                                  <span className="bg-muted text-foreground rounded px-2 py-0.5 font-mono text-[11px]">
                                                    5m: {data.system.cpuLoad5m.toFixed(2)}
                                                  </span>
                                                  <span className="bg-muted text-foreground rounded px-2 py-0.5 font-mono text-[11px]">
                                                    15m: {data.system.cpuLoad15m.toFixed(2)}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>

                                            {}
                                            <div className="border-border/45 bg-muted/10 space-y-4 rounded-xl border p-4">
                                              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                                                <Server className="size-4 text-blue-500" />
                                                <h3 className="text-foreground text-xs font-bold">
                                                  OS Memory Status
                                                </h3>
                                              </div>

                                              <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                  <span className="text-muted-foreground">Memory Usage</span>
                                                  <span className="text-foreground font-semibold">
                                                    {data.system.memory.usagePercent}%
                                                  </span>
                                                </div>
                                                <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                                                  <div
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                      data.system.memory.usagePercent > 85
                                                        ? "bg-red-500"
                                                        : data.system.memory.usagePercent > 60
                                                          ? "bg-amber-500"
                                                          : "bg-emerald-500"
                                                    }`}
                                                    style={{ width: `${data.system.memory.usagePercent}%` }}
                                                  />
                                                </div>
                                                <div className="text-muted-foreground flex justify-between text-[10px]">
                                                  <span>
                                                    Used: {formatBytes(data.system.memory.usedBytes)}
                                                  </span>
                                                  <span>
                                                    Total: {formatBytes(data.system.memory.totalBytes)}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {}
                                        {data.system && data.process && (
                                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {}
                                            <div className="border-border/45 bg-muted/10 space-y-4 rounded-xl border p-4">
                                              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                                                <HardDrive className="size-4 text-emerald-500" />
                                                <h3 className="text-foreground text-xs font-bold">
                                                  Filesystem Disk Space
                                                </h3>
                                              </div>

                                              {data.system.disk ? (
                                                <div className="space-y-2">
                                                  <div className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">
                                                      Disk Space Usage
                                                    </span>
                                                    <span className="text-foreground font-semibold">
                                                      {data.system.disk.usagePercent}
                                                    </span>
                                                  </div>
                                                  <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                                                    <div
                                                      className={`h-full rounded-full transition-all duration-500 ${
                                                        parseFloat(data.system.disk.usagePercent) > 85
                                                          ? "bg-red-500"
                                                          : parseFloat(data.system.disk.usagePercent) > 60
                                                            ? "bg-amber-500"
                                                            : "bg-emerald-500"
                                                      }`}
                                                      style={{ width: data.system.disk.usagePercent }}
                                                    />
                                                  </div>
                                                  <div className="text-muted-foreground flex justify-between text-[10px]">
                                                    <span>Used: {data.system.disk.used}</span>
                                                    <span>
                                                      Available: {data.system.disk.available} (
                                                      {data.system.disk.size} total)
                                                    </span>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="text-muted-foreground text-xs italic">
                                                  Disk metrics not available on this platform.
                                                </div>
                                              )}
                                            </div>

                                            {}
                                            <div className="border-border/45 bg-muted/10 space-y-3 rounded-xl border p-4">
                                              <div className="border-border/30 flex items-center gap-2 border-b pb-2">
                                                <Layers className="size-4 text-indigo-500" />
                                                <h3 className="text-foreground text-xs font-bold">
                                                  Node.js Process Memory
                                                </h3>
                                              </div>

                                              <div className="grid grid-cols-2 gap-x-2 gap-y-4 font-mono text-xs">
                                                <div>
                                                  <span className="text-muted-foreground block font-sans text-[10px]">
                                                    RSS
                                                  </span>
                                                  <span className="text-foreground font-semibold">
                                                    {formatBytes(data.process.memory.rss)}
                                                  </span>
                                                </div>
                                                <div>
                                                  <span className="text-muted-foreground block font-sans text-[10px]">
                                                    Heap Total
                                                  </span>
                                                  <span className="text-foreground font-semibold">
                                                    {formatBytes(data.process.memory.heapTotal)}
                                                  </span>
                                                </div>
                                                <div>
                                                  <span className="text-muted-foreground block font-sans text-[10px]">
                                                    Heap Used
                                                  </span>
                                                  <span className="text-foreground font-semibold">
                                                    {formatBytes(data.process.memory.heapUsed)}
                                                  </span>
                                                </div>
                                                <div>
                                                  <span className="text-muted-foreground block font-sans text-[10px]">
                                                    External
                                                  </span>
                                                  <span className="text-foreground font-semibold">
                                                    {formatBytes(data.process.memory.external)}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {data.system && (
                                          <div className="text-muted-foreground flex items-center gap-1.5 pt-2 text-[10px]">
                                            <Terminal className="size-3.5" />
                                            <span>Node Version: {data.system.nodeVersion}</span>
                                            <span className="mx-1">•</span>
                                            <span>Checked: {new Date(data.timestamp).toLocaleString()}</span>
                                          </div>
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
