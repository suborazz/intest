"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Briefcase,
  Calendar,
  Clock,
  Download,
  Printer,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Clock3,
  ExternalLink,
  ChevronRight,
  Building2,
  FileCheck2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/x/acfb3dca";
import { cn } from "@/x/a85a9c0c";
import {
  RecruitRegistrationPrintout,
  printRecruitRegistrationForm,
} from "@/components/recruit/RecruitRegistrationPrintout";
import { Button } from "@/x/3458df31";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-xs", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

interface TJobOpportunity {
  id: string;
  companyName: string;
  postOpportunity: string;
  jobNature?: string;
  logoUrl?: string;
  advtNo?: string;
  advtDate?: string;
  closingDate?: string;
  salary?: string;
  minQualification?: string;
  skillsRequired?: string;
}

interface TJobApplication {
  id: string;
  jobOpportunityId: string;
  jobOpportunity: TJobOpportunity;
  name: string;
  age: number;
  address: string;
  mobile: string;
  email: string;
  qualification: string;
  skills?: string;
  resumeUrl?: string;
  status: "PENDING" | "REVIEWING" | "SHORTLISTED" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [activePrintApp, setActivePrintApp] = useState<TJobApplication | null>(null);

  // 1. Fetch Candidate Profile (for official printout)
  const { data: profileResponse, isLoading: isProfileLoading } = useQuery({
    queryKey: ["recruit-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recruit-user/profile");
      return res.data;
    },
  });

  // 2. Fetch Candidate Applications
  const { data: appsResponse, isLoading: isAppsLoading } = useQuery({
    queryKey: ["recruit-my-applications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recruit-user/applications?limit=100");
      return res.data;
    },
  });

  const profile = profileResponse?.data as Record<string, any> | undefined;
  const applications: TJobApplication[] = useMemo(() => {
    return (appsResponse?.data ?? []) as TJobApplication[];
  }, [appsResponse?.data]);

  // Set initial printable application
  useEffect(() => {
    if (!activePrintApp && applications.length > 0) {
      setActivePrintApp(applications[0]);
    }
  }, [applications, activePrintApp]);

  useEffect(() => {
    document.title = "My Applications | International Institute of Internship™";
  }, []);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (statusFilter !== "ALL" && app.status !== statusFilter) {
        return false;
      }
      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase();
      const jobTitle = (app.jobOpportunity?.postOpportunity || "").toLowerCase();
      const company = (app.jobOpportunity?.companyName || "").toLowerCase();
      const advt = (app.jobOpportunity?.advtNo || "").toLowerCase();
      const appId = (app.id || "").toLowerCase();

      return jobTitle.includes(q) || company.includes(q) || advt.includes(q) || appId.includes(q);
    });
  }, [applications, statusFilter, searchTerm]);

  // Counts
  const counts = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((a) => a.status === "PENDING").length,
      reviewing: applications.filter((a) => a.status === "REVIEWING").length,
      shortlisted: applications.filter((a) => a.status === "SHORTLISTED").length,
      accepted: applications.filter((a) => a.status === "ACCEPTED").length,
      rejected: applications.filter((a) => a.status === "REJECTED").length,
    };
  }, [applications]);

  // Handler to print / save PDF
  const handlePrintApplication = (app: TJobApplication) => {
    setActivePrintApp(app);
    // Give state a tick to update DOM before triggering print
    setTimeout(() => {
      printRecruitRegistrationForm(app.id);
    }, 100);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
            Selected
          </span>
        );
      case "SHORTLISTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-500/20 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800">
            <Sparkles className="size-3.5 text-indigo-600 shrink-0" />
            Shortlisted
          </span>
        );
      case "REVIEWING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-500/20 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800">
            <Clock3 className="size-3.5 text-blue-600 shrink-0" />
            In Review
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-500/20 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
            <AlertCircle className="size-3.5 text-rose-600 shrink-0" />
            Not Selected
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
            <Clock className="size-3.5 text-amber-600 shrink-0" />
            Under Review
          </span>
        );
    }
  };

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case "PENDING":
        return 1;
      case "REVIEWING":
        return 2;
      case "SHORTLISTED":
        return 3;
      case "ACCEPTED":
      case "REJECTED":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6 p-3 sm:p-5 md:p-6 print:m-0 print:max-w-none print:p-0">
      {/* Page Header (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-[#006e52]/10 p-2 text-[#006e52] dark:bg-[#006e52]/20">
              <FileText className="size-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              My Applications
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track status, review details, and download official application forms for all your applied positions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            asChild
            size="sm"
            className="bg-[#006e52] hover:bg-[#005a43] text-white font-semibold text-xs h-9 shadow-xs"
          >
            <Link href="/recruit/openings">
              <Briefcase className="size-3.5 mr-1.5" /> Explore Openings
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Stat Pills (Hidden on Print) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 print:hidden">
        <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4 shadow-2xs">
          <span className="text-[11px] font-medium text-muted-foreground block">
            Total Applications
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5 block">
            {counts.total}
          </span>
        </div>

        <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 dark:bg-amber-950/20 p-3 sm:p-4 shadow-2xs">
          <span className="text-[11px] font-medium text-amber-800 dark:text-amber-300 block">
            Under Review
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-amber-900 dark:text-amber-200 mt-0.5 block">
            {counts.pending + counts.reviewing}
          </span>
        </div>

        <div className="rounded-xl border border-indigo-200/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-3 sm:p-4 shadow-2xs">
          <span className="text-[11px] font-medium text-indigo-800 dark:text-indigo-300 block">
            Shortlisted
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-indigo-900 dark:text-indigo-200 mt-0.5 block">
            {counts.shortlisted}
          </span>
        </div>

        <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 sm:p-4 shadow-2xs">
          <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 block">
            Selected
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-emerald-900 dark:text-emerald-200 mt-0.5 block">
            {counts.accepted}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 print:hidden">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search applied posts, company, or advt no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/70 bg-card pl-9 pr-8 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#006e52] focus:border-[#006e52] transition-colors shadow-2xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { key: "ALL", label: `All (${counts.total})` },
            { key: "PENDING", label: `Under Review (${counts.pending})` },
            { key: "REVIEWING", label: `In Screening (${counts.reviewing})` },
            { key: "SHORTLISTED", label: `Shortlisted (${counts.shortlisted})` },
            { key: "ACCEPTED", label: `Selected (${counts.accepted})` },
            { key: "REJECTED", label: `Not Selected (${counts.rejected})` },
          ].map((pill) => (
            <button
              key={pill.key}
              type="button"
              onClick={() => setStatusFilter(pill.key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                statusFilter === pill.key
                  ? "bg-[#006e52] text-white shadow-2xs"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40",
              )}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area (Hidden on Print) */}
      <div className="space-y-4 print:hidden">
        {isAppsLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <div className="size-8 animate-spin rounded-full border-3 border-[#006e52] border-t-transparent" />
            <p className="text-xs font-medium text-muted-foreground">Loading your applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <Card className="border-border/60 border-dashed bg-card/50">
            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
              <div className="rounded-2xl bg-[#006e52]/10 p-4 text-[#006e52] mb-3">
                <FileCheck2 className="size-8" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                {searchTerm || statusFilter !== "ALL"
                  ? "No matching applications found"
                  : "You have not applied for any job openings yet"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1.5 mb-5 leading-relaxed">
                {searchTerm || statusFilter !== "ALL"
                  ? "Try resetting your search query or filter to view other submitted applications."
                  : "Browse current vacancy listings across institutional partners and submit your application with a single click."}
              </p>
              {searchTerm || statusFilter !== "ALL" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                  }}
                  className="text-xs font-semibold h-8"
                >
                  Reset Filters
                </Button>
              ) : (
                <Button
                  size="sm"
                  asChild
                  className="bg-[#006e52] hover:bg-[#005a43] text-white font-semibold text-xs h-9 px-5 shadow-xs"
                >
                  <Link href="/recruit/openings">
                    <Briefcase className="size-3.5 mr-1.5" /> Explore Current Job Openings
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const job = app.jobOpportunity;
              const appliedDate = app.createdAt
                ? new Date(app.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Recently";

              const stepIdx = getStatusStepIndex(app.status);

              return (
                <Card
                  key={app.id}
                  className="border-border/70 bg-card shadow-xs hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Top Bar: Notice & Applied Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-muted/40 border-b border-border/50 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-semibold text-muted-foreground bg-background px-2 py-0.5 rounded border border-border/60">
                        App ID: {app.id.slice(-8).toUpperCase()}
                      </span>
                      {job?.advtNo && (
                        <span className="text-[11px] font-medium text-foreground bg-background px-2 py-0.5 rounded border border-border/60">
                          Notice: {job.advtNo}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                      <Clock className="size-3 text-muted-foreground/70 shrink-0" />
                      <span>Applied on {appliedDate}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <CardContent className="p-4 sm:p-5 space-y-4">
                    {/* Header Row: Job Title, Company & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">
                          {job?.postOpportunity || "Job Position"}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                          <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                            <Building2 className="size-3.5 text-[#006e52]" />
                            {job?.companyName || "International Institute of Internship"}
                          </span>
                          {job?.jobNature && (
                            <>
                              <span>•</span>
                              <span className="rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium">
                                {job.jobNature}
                              </span>
                            </>
                          )}
                          {job?.salary && (
                            <>
                              <span>•</span>
                              <span className="text-amber-800 dark:text-amber-300 font-semibold text-[11px]">
                                {job.salary}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="self-start sm:self-auto">
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    {/* Application Progress Stepper */}
                    <div className="rounded-xl border border-border/50 bg-background/60 p-3 sm:p-4">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2.5">
                        Application Progress
                      </span>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {/* Step 1: Submitted */}
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                              stepIdx >= 1
                                ? "bg-emerald-600 text-white"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            ✓
                          </div>
                          <span className="text-[11px] font-semibold text-foreground mt-1">
                            Submitted
                          </span>
                        </div>

                        {/* Step 2: Under Review */}
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                              stepIdx >= 2
                                ? "bg-blue-600 text-white"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {stepIdx >= 2 ? "✓" : "2"}
                          </div>
                          <span className="text-[11px] font-semibold text-foreground mt-1">
                            Screening
                          </span>
                        </div>

                        {/* Step 3: Shortlist */}
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                              stepIdx >= 3
                                ? "bg-indigo-600 text-white"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {stepIdx >= 3 ? "✓" : "3"}
                          </div>
                          <span className="text-[11px] font-semibold text-foreground mt-1">
                            Shortlist
                          </span>
                        </div>

                        {/* Step 4: Decision */}
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                              app.status === "ACCEPTED"
                                ? "bg-emerald-600 text-white"
                                : app.status === "REJECTED"
                                ? "bg-rose-600 text-white"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {app.status === "ACCEPTED" ? "✓" : app.status === "REJECTED" ? "✕" : "4"}
                          </div>
                          <span className="text-[11px] font-semibold text-foreground mt-1">
                            {app.status === "ACCEPTED"
                              ? "Selected"
                              : app.status === "REJECTED"
                              ? "Decision"
                              : "Decision"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-border/40">
                      <div className="text-xs text-muted-foreground">
                        <span>Submitted Email: </span>
                        <strong className="text-foreground font-mono">{app.email}</strong>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="h-8 text-xs font-semibold"
                        >
                          <Link href="/recruit/openings">
                            View Opening <ChevronRight className="size-3.5 ml-1" />
                          </Link>
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => handlePrintApplication(app)}
                          className="h-8 text-xs font-semibold bg-[#006e52] hover:bg-[#005a43] text-white shadow-xs"
                        >
                          <Printer className="size-3.5 mr-1.5" />
                          Download Application Form (PDF)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Hidden Vector Printout Component (Only active during window.print) */}
      {profile && activePrintApp && (
        <div className="hidden print:block">
          <RecruitRegistrationPrintout
            data={profile as any}
            education={(profile.academics ?? []) as any}
            experience={(profile.experiences ?? []) as any}
            applicationId={activePrintApp.id}
            advtNo={activePrintApp.jobOpportunity?.advtNo}
            postName={activePrintApp.jobOpportunity?.postOpportunity}
            submittedAt={activePrintApp.createdAt}
          />
        </div>
      )}
    </div>
  );
}
