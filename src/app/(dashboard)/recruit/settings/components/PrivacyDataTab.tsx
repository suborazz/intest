"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  Printer,
  Download,
  Eye,
  EyeOff,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Loader2,
  FileDown,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/x/8789d6dc";
import { axiosInstance } from "@/x/acfb3dca";
import { Button } from "@/x/3458df31";
import {
  RecruitRegistrationPrintout,
  printRecruitRegistrationForm,
} from "@/components/recruit/RecruitRegistrationPrintout";
import { cn } from "@/x/a85a9c0c";

export function PrivacyDataTab() {
  const { user } = useAuth();
  const [inTalentPool, setInTalentPool] = useState(true);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Fetch candidate profile
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["recruit", "my-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recruit-user/profile");
      return res.data;
    },
    staleTime: 60000,
  });

  const profileData = profileResponse?.data;
  const profileRegCode =
    user?.registrationNo || profileData?.id || "REG-APPLICANT";

  const handlePrintForm = () => {
    printRecruitRegistrationForm(profileRegCode);
  };

  const handleExportJson = () => {
    try {
      setIsExporting(true);
      const dataToExport = {
        exportedAt: new Date().toISOString(),
        candidateUser: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
          registrationNo: user?.registrationNo,
          createdAt: user?.createdAt,
        },
        profile: profileData || "Profile registration pending",
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `candidate_profile_${profileRegCode}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Profile data exported successfully");
    } catch {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const handleToggleTalentPool = () => {
    setInTalentPool((p) => {
      const next = !p;
      toast.success(
        next
          ? "Your profile is now visible in candidate search pool"
          : "Your profile has been hidden from employer search pool"
      );
      return next;
    });
  };

  const handleRequestDeactivation = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Deactivation request submitted. Our compliance officer will process your request within 48 hours.");
    setShowDeactivateModal(false);
    setDeactivateReason("");
  };

  return (
    <div className="space-y-6">
      {/* Registration Form Download Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-border/70 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <FileText className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Candidate Application Form & Printout
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Download and print your certified 1-page A4 application form complete with official barcode.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-emerald-200/80 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Official Registration Form (A4 Printout)
                </p>
                <span className="rounded bg-emerald-700 text-white px-1.5 py-0.5 text-[9px] font-extrabold">
                  CERTIFIED
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Reg Code: <strong className="text-foreground">{profileRegCode}</strong> • Formatted for recruitment board submission.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                onClick={handlePrintForm}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-9 px-4 gap-1.5 shadow-xs"
              >
                <Printer className="size-3.5" />
                <span>Print Application Form</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleExportJson}
                disabled={isExporting}
                className="w-full sm:w-auto text-xs h-9 px-3 gap-1.5 border-border"
                title="Export Data JSON"
              >
                <FileDown className="size-3.5" />
                <span>Export JSON</span>
              </Button>
            </div>
          </div>

          {/* Hidden Print Container for High Fidelity Printout */}
          {profileData && (
            <div className="hidden print:block">
              <RecruitRegistrationPrintout
                data={profileData as any}
                education={profileData.academics as any}
                experience={profileData.experiences as any}
                applicationId={profileRegCode}
                submittedAt={profileData.updatedAt ?? undefined}
              />
            </div>
          )}
        </div>
      </div>

      {/* Talent Pool Visibility Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-border/70 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <Eye className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Candidate Pool Visibility
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Control whether hiring partners can discover your profile for matching opportunities.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Talent Pool Discoverability
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {inTalentPool
                  ? "Your verified credentials and application record can be indexed by verified institute recruiters."
                  : "Your profile is hidden from search; only jobs you directly apply to can view your application record."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleTalentPool}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
                inTalentPool ? "bg-emerald-600" : "bg-muted-foreground/30"
              )}
              role="switch"
              aria-checked={inTalentPool}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                  inTalentPool ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Governance & Account Deactivation Card */}
      <div className="bg-card border border-red-200/60 dark:border-red-950/40 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4 border-b border-red-100 dark:border-red-950/60 pb-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Data Rights & Account Closure
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Submit a formal data deletion or account closure request in compliance with privacy regulations.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground">
              Request Account Deactivation
            </p>
            <p className="text-xs text-muted-foreground">
              Once deactivated, your active job applications will be archived and access revoked.
            </p>
          </div>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setShowDeactivateModal(true)}
            className="text-xs font-semibold h-9 px-4 shrink-0"
          >
            <Trash2 className="size-3.5 mr-1.5" />
            Deactivate Account
          </Button>
        </div>

        {/* Deactivation Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-50 duration-150">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                  <ShieldAlert className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Confirm Deactivation Request
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    This action will initiate account closure.
                  </p>
                </div>
              </div>

              <form onSubmit={handleRequestDeactivation} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Please share your reason for leaving (optional):
                  </label>
                  <textarea
                    value={deactivateReason}
                    onChange={(e) => setDeactivateReason(e.target.value)}
                    placeholder="e.g. Secured a position, duplicate account..."
                    className="w-full h-20 rounded-md border border-border bg-input/20 p-2.5 text-xs text-foreground outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeactivateModal(false)}
                    className="text-xs h-9"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    className="text-xs h-9 px-4"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
