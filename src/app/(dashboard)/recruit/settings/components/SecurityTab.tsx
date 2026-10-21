"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Laptop,
  Smartphone,
  Globe,
  Clock,
  LogOut,
  CheckCircle2,
  XCircle,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { AuthDataHook } from "@/x/0da0a87b";
import { AuthService } from "@/x/f648d1a0";
import { Button } from "@/x/3458df31";
import { Input } from "@/x/09497c69";
import { cn } from "@/x/a85a9c0c";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required to verify your identity"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export function SecurityTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const newPasswordValue = watch("newPassword", "");

  // Real-time password requirement checklist
  const requirements: PasswordRequirement[] = useMemo(() => {
    return [
      {
        id: "length",
        label: "At least 8 characters",
        met: newPasswordValue.length >= 8,
      },
      {
        id: "uppercase",
        label: "One uppercase letter (A-Z)",
        met: /[A-Z]/.test(newPasswordValue),
      },
      {
        id: "lowercase",
        label: "One lowercase letter (a-z)",
        met: /[a-z]/.test(newPasswordValue),
      },
      {
        id: "number",
        label: "At least one number (0-9)",
        met: /[0-9]/.test(newPasswordValue),
      },
      {
        id: "special",
        label: "One special character (!@#$%...)",
        met: /[^A-Za-z0-9]/.test(newPasswordValue),
      },
    ];
  }, [newPasswordValue]);

  const metCount = requirements.filter((r) => r.met).length;
  const strengthPercentage = Math.round((metCount / requirements.length) * 100);

  const strengthColor = useMemo(() => {
    if (strengthPercentage <= 20) return "bg-red-500";
    if (strengthPercentage <= 40) return "bg-orange-500";
    if (strengthPercentage <= 70) return "bg-amber-500";
    return "bg-emerald-600";
  }, [strengthPercentage]);

  const strengthLabel = useMemo(() => {
    if (strengthPercentage === 0) return "Not entered";
    if (strengthPercentage <= 40) return "Weak";
    if (strengthPercentage <= 70) return "Medium";
    return "Strong";
  }, [strengthPercentage]);

  const { mutate: changePassword, isPending } = AuthDataHook.useChangePassword({
    onSuccess: () => {
      toast.success("Your password has been updated securely!");
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update password. Please check your current password.");
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const handleGlobalLogout = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.logout();
      toast.success("Logged out successfully");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch {
      toast.error("Logout request completed");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-border/70 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Lock className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Change Account Password
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Ensure your recruitment account remains secure with an encrypted, unique password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="currentPassword"
              className="block text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current account password"
                autoComplete="current-password"
                className={cn(
                  "pr-10 h-10 text-sm",
                  errors.currentPassword && "border-red-400 focus-visible:ring-red-200"
                )}
                {...register("currentPassword")}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showCurrent ? "Hide current password" : "Show current password"}
              >
                {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="newPassword"
              className="block text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                placeholder="Create a strong new password"
                autoComplete="new-password"
                className={cn(
                  "pr-10 h-10 text-sm",
                  errors.newPassword && "border-red-400 focus-visible:ring-red-200"
                )}
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.newPassword.message}
              </p>
            )}

            {/* Strength Meter Bar */}
            {newPasswordValue.length > 0 && (
              <div className="pt-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Password Strength:</span>
                  <span className={cn("font-bold text-xs", strengthPercentage > 70 ? "text-emerald-600" : "text-amber-600")}>
                    {strengthLabel} ({strengthPercentage}%)
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full transition-all duration-300", strengthColor)}
                    style={{ width: `${strengthPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Password Requirements Checklist */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 text-xs">
              {requirements.map((req) => (
                <div key={req.id} className="flex items-center gap-1.5">
                  {req.met ? (
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="size-3.5 text-muted-foreground/50 shrink-0" />
                  )}
                  <span className={cn(req.met ? "text-foreground font-medium" : "text-muted-foreground")}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-foreground uppercase tracking-wider"
            >
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                className={cn(
                  "pr-10 h-10 text-sm",
                  errors.confirmPassword && "border-red-400 focus-visible:ring-red-200"
                )}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
              After updating your password, your current session stays active securely.
            </p>
            <Button
              type="submit"
              disabled={isPending || metCount < 4}
              className="w-full sm:w-auto h-10 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl order-1 sm:order-2 shrink-0 shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Updating Password...
                </>
              ) : (
                <>
                  <KeyRound className="size-4 mr-2" />
                  Update Password
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Active Session & Device Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-border/70 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Laptop className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Current Session & Security
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Review your current authenticated session and active login credentials.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <Globe className="size-5" />
                <span className="absolute -top-1 -right-1 flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    Web Browser Client
                  </p>
                  <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                    Active Now
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                  <span>SSL/TLS Encrypted Connection</span>
                  <span>•</span>
                  <span>JWT Token Authenticated</span>
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGlobalLogout}
              disabled={isLoggingOut}
              className="h-8 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/50"
            >
              {isLoggingOut ? (
                <Loader2 className="size-3.5 animate-spin mr-1.5" />
              ) : (
                <LogOut className="size-3.5 mr-1.5" />
              )}
              Log Out Session
            </Button>
          </div>

          <div className="rounded-xl border border-border/60 p-4 bg-muted/10 flex items-start gap-3">
            <ShieldAlert className="size-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Security Recommendation: </span>
              Never share your applicant credentials. The International Institute of Internship™ administrative team will never request your account password.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
