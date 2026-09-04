import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/x/c0183428";
import {
  TMutationOptions,
  TMutationReturnType,
  TQueryOptions,
  TQueryReturnType,
} from "@/x/bbf12b6c";

import { AuthService } from "@/x/f648d1a0";

export const AUTH_QUERY_KEYS = {
  PROFILE: ["auth", "profile"] as const,
};

export interface IAuthDataHook {
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

export const AuthDataHook: IAuthDataHook = {
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
