"use client";

import Image from "next/image";
import React_2 from "react";
import * as React from "react";
import { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { AuthContext } from "@/x/8789d6dc";
import { axiosInstance } from "@/x/acfb3dca";

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

const AUTH_QUERY_KEYS = {
  PROFILE: ["auth", "profile"] as const,
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

function AuthProvider({
  children,
  initialRole,
}: {
  children: React.ReactNode;
  initialRole?: string;
}) {
  const { data: profileData, isLoading } = AuthDataHook.useProfile();

  const user = profileData?.data?.user;
  const role = user?.role || (initialRole as UserRole);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function StudentLayout({
  children,
}: {
  children: React_2.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="bg-background text-foreground flex min-h-screen w-full flex-col font-sans md:flex-row print:block print:min-h-0 print:bg-white print:p-0">
        {}
        <div className="relative flex h-[280px] w-full shrink-0 flex-col justify-between overflow-hidden bg-zinc-950 p-6 md:h-auto md:w-1/2 md:p-12 print:hidden">
          {}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/auth-bg.png"
              alt="Secure Registration Background"
              fill
              priority
              className="duration-10000 object-cover opacity-90 transition-transform hover:scale-105"
            />
            <div className="from-primary/30 to-background/20 absolute inset-0 bg-gradient-to-tr via-transparent mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {}
          <div className="relative z-10 flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg bg-white px-4 py-3 shadow-md">
              <Image
                src="/logo.png"
                alt="iiInternship Logo"
                width={180}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {}
          <div className="relative z-10 hidden rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl transition-all hover:border-white/25 md:block">
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Register your details to start applying for verified international
              internships. Fill out basic info, academic credentials, and
              required documents.
            </p>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold text-white">Student Portal</p>
              <p className="text-[10px] text-white/50">Verification & Setup</p>
            </div>
          </div>
        </div>

        {}
        <div className="relative z-10 -mt-6 flex w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden rounded-t-[30px] bg-zinc-50 shadow-2xl transition-colors duration-500 md:mt-0 md:max-h-screen md:w-1/2 md:rounded-none dark:bg-zinc-950 print:-mt-0 print:max-h-none print:w-full print:bg-white print:shadow-none print:dark:bg-white">
          {}
          <div className="bg-primary/5 dark:bg-primary/10 pointer-events-none absolute right-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full blur-[130px]" />

          <div className="z-10 flex w-full flex-1 flex-col justify-center px-4 pb-6 pt-12 sm:p-6 md:p-10 print:p-0">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
