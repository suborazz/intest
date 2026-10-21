"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Award,
  ArrowRight,
  Pencil,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileBadge2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/x/8789d6dc";
import { axiosInstance } from "@/x/acfb3dca";
import { Button } from "@/x/3458df31";
import { Input } from "@/x/09497c69";
import { cn } from "@/x/a85a9c0c";

export function AccountOverviewTab() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch recruit profile data
  const { data: profileResponse, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["recruit", "my-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recruit-user/profile");
      return res.data;
    },
    staleTime: 60000,
  });

  const profileData = profileResponse?.data;

  // Calculate profile completion metrics
  const completionStats = useMemo(() => {
    if (!profileData) {
      return {
        percentage: user?.name ? 40 : 20,
        completedSteps: ["Account Created"],
        pendingSteps: ["Personal Details", "Educational Records", "Experience Details", "Documents & Resume"],
      };
    }

    const completed: string[] = ["Account Credentials"];
    const pending: string[] = [];

    if (profileData.fullName && profileData.dob && profileData.fatherName) {
      completed.push("Personal Information");
    } else {
      pending.push("Personal Information");
    }

    if (profileData.academics && profileData.academics.length > 0) {
      completed.push(`Academic Details (${profileData.academics.length} entries)`);
    } else {
      pending.push("Educational Records");
    }

    if (profileData.experiences && profileData.experiences.length > 0) {
      completed.push(`Work Experience (${profileData.experiences.length} entries)`);
    } else {
      pending.push("Work Experience");
    }

    if (profileData.photoUrl && profileData.resumeUrl) {
      completed.push("Verified Documents & Resume");
    } else {
      pending.push("Document Uploads");
    }

    const totalExpected = 5;
    const percentage = Math.round((completed.length / totalExpected) * 100);

    return { percentage, completedSteps: completed, pendingSteps: pending };
  }, [profileData, user]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      await axiosInstance.patch(`/users/${user.id}`, {
        name: displayName.trim(),
      });
      toast.success("Profile display name updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update profile";
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const registrationCode =
    user?.registrationNo || profileData?.id || "REG-APPLICANT";

  return (
    <div className="space-y-6">
      {/* Identity Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-border/70 pb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white font-bold text-xl shadow-xs overflow-hidden">
              {profileData?.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileData.photoUrl}
                  alt={user?.name || "Candidate Avatar"}
                  className="size-full object-cover"
                />
              ) : (
                <span>
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">
                  {user?.name || profileData?.fullName || "Candidate"}
                </h2>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  Job Applicant
                </span>
                <span className="flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 text-[11px] font-semibold text-blue-800 dark:text-blue-300">
                  <ShieldCheck className="size-3 text-blue-600" />
                  Verified Applicant
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileBadge2 className="size-3.5 text-emerald-600" />
                  <strong className="text-foreground">App ID:</strong> {registrationCode}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  Joined {memberSince}
                </span>
              </div>
            </div>
          </div>

          <Link href="/recruit/profile" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto h-9 text-xs font-semibold gap-1.5 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              <span>View Full Profile</span>
              <ExternalLink className="size-3.5" />
            </Button>
          </Link>
        </div>

        {/* Profile Completion Widget */}
        <div className="mt-6 rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                Recruitment Profile Completion
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Completed profiles receive higher shortlisting priority from hiring managers.
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-extrabold",
                completionStats.percentage >= 80
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
              )}
            >
              {completionStats.percentage}% Complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                completionStats.percentage >= 80 ? "bg-emerald-600" : "bg-amber-500"
              )}
              style={{ width: `${completionStats.percentage}%` }}
            />
          </div>

          {/* Pending items checklist */}
          {completionStats.pendingSteps.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/60">
              <p className="text-[11px] font-semibold text-muted-foreground">
                Remaining steps to complete:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {completionStats.pendingSteps.map((step) => (
                  <Link
                    key={step}
                    href="/recruit/profile"
                    className="inline-flex items-center gap-1 rounded-lg border border-amber-300/80 dark:border-amber-900 bg-amber-50/80 dark:bg-amber-950/30 px-2 py-1 text-[11px] font-medium text-amber-900 dark:text-amber-300 hover:bg-amber-100 transition-colors"
                  >
                    <AlertCircle className="size-3 text-amber-600" />
                    <span>Complete {step}</span>
                    <ArrowRight className="size-2.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Details Form */}
        <div className="mt-6 pt-5 border-t border-border/70 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              Candidate Account Information
            </h3>
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDisplayName(user?.name || "");
                  setIsEditing(true);
                }}
                className="h-8 gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold"
              >
                <Pencil className="size-3.5" />
                Edit Name
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="h-8 text-xs text-muted-foreground"
              >
                Cancel
              </Button>
            )}
          </div>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Full Name / Display Name
                </label>
                {isEditing ? (
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-9 text-xs"
                    required
                  />
                ) : (
                  <div className="flex items-center h-9 px-3 rounded-md bg-muted/30 border border-border text-xs font-medium text-foreground">
                    {user?.name || "Not set"}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Registered Email Address
                </label>
                <div className="flex items-center justify-between h-9 px-3 rounded-md bg-muted/40 border border-border text-xs text-muted-foreground cursor-not-allowed">
                  <span className="truncate">{user?.email || "candidate@hilux.com"}</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="size-3" />
                    Verified
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Primary identifier managed by system authentication.
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-9 px-4 gap-1.5"
                >
                  {isSaving ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Save className="size-3.5" />
                  )}
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
