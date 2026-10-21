"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
  Printer,
  Pencil,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  School,
  Building2,
  Clock,
  Globe,
  Heart,
  FileWarning,
  Sparkles,
  Check,
  Eye,
  FileCheck,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "@/x/acfb3dca";
import {
  RecruitRegistrationPrintout,
  printRecruitRegistrationForm,
} from "@/components/recruit/RecruitRegistrationPrintout";

/* =========================================================================
   UTILITIES & PRIMITIVES
   ========================================================================= */

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-xs font-semibold transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 active:bg-emerald-900",
        outline:
          "border-border/70 bg-card hover:bg-muted/70 text-foreground shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted/60 text-muted-foreground hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        default: "h-9 px-4 gap-2",
        sm: "h-8 px-3 gap-1.5 text-xs",
        lg: "h-10 px-5 gap-2 text-sm",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

/* =========================================================================
   DATA TYPES & INTERFACES
   ========================================================================= */

interface TRecruitAcademic {
  id: string;
  qualification: string;
  schoolInstitute: string;
  boardUniversity: string;
  startYear: string;
  endYear: string;
  passingDivision: string;
  passingMarks: number;
  subject: string;
  certificateUrl?: string;
  certificateName?: string;
}

interface TRecruitExperience {
  id: string;
  employerName: string;
  designation: string;
  postingLocation: string;
  startDate: string;
  endDate?: string | null;
  natureOfWork: string;
  experienceYears: number;
  certUrl?: string;
  certName?: string;
}

interface TRecruitProfile {
  id: string;
  userId: string;
  fullName: string;
  gender: string;
  dob: string;
  fatherName: string;
  motherName: string;
  permAddressLocal: string;
  permAddressDistrict: string;
  permAddressState: string;
  permAddressCountry: string;
  permAddressPinCode: string;
  currAddressLocal: string;
  currAddressDistrict: string;
  currAddressState: string;
  currAddressCountry: string;
  currAddressPinCode: string;
  mobileNo: string;
  email: string;
  maritalStatus: string;
  nationality: string;
  gotra?: string | null;
  religion: string;
  category: string;
  bloodGroup: string;
  hobby?: string | null;
  languagesKnown: string;
  physicallyChallenged: boolean;
  aadharNo?: string | null;
  photoUrl?: string | null;
  photoName?: string | null;
  signatureUrl?: string | null;
  signatureName?: string | null;
  resumeUrl?: string | null;
  resumeName?: string | null;
  createdAt: string;
  updatedAt: string;
  academics?: TRecruitAcademic[];
  experiences?: TRecruitExperience[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/* =========================================================================
   FORMATTING & CALCULATIONS
   ========================================================================= */

function generateRecruitRegistrationCode(
  profileId: string,
  createdAt?: string | Date | null,
): string {
  if (!profileId) return "";
  const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

  let hash = 0;
  for (let i = 0; i < profileId.length; i++) {
    hash = (hash * 31 + profileId.charCodeAt(i)) >>> 0;
  }

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;
  const h3 = Math.floor(h2 / 26);
  const c3 = ALPHA[h3 % 26]!;

  const h4 = Math.floor(h3 / 26);
  const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

  return `REG${year}${c1}${c2}${c3}${numeric}`;
}

function formatBloodGroup(val?: string | null): string {
  if (!val) return "—";
  const map: Record<string, string> = {
    A_POS: "A+",
    A_NEG: "A-",
    B_POS: "B+",
    B_NEG: "B-",
    AB_POS: "AB+",
    AB_NEG: "AB-",
    O_POS: "O+",
    O_NEG: "O-",
  };
  return map[val] ?? val;
}

function formatEnum(val?: string | null): string {
  if (!val) return "—";
  return val
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(val?: string | null): string {
  if (!val) return "—";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return String(val);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calculateAgeBreakdown(dob?: string | null): string {
  if (!dob) return "—";
  const start = new Date(dob);
  const end = new Date();
  if (Number.isNaN(start.getTime())) return "—";

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} Year(s), ${months} Month(s)`;
}

/* =========================================================================
   PAGE SKELETON
   ========================================================================= */

function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-44 w-full rounded-2xl bg-muted/60" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="h-64 rounded-xl bg-muted/50" />
        <div className="h-64 rounded-xl bg-muted/50" />
        <div className="h-64 rounded-xl bg-muted/50" />
      </div>
    </div>
  );
}

/* =========================================================================
   EMPTY PROFILE STATE
   ========================================================================= */

function EmptyProfileGate() {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card p-8 md:p-12 text-center shadow-xs">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 mb-4">
        <FileWarning className="size-7" />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-foreground">
        Registration Profile Not Completed
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        You have not yet completed your Job Applicant Registration form. Complete
        your official profile to unlock application submissions, identity ID, and
        verification badges.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild size="default" className="w-full sm:w-auto">
          <Link href="/recruit/registration">
            <Sparkles className="size-4 mr-2" /> Complete Registration Profile
          </Link>
        </Button>
        <Button asChild variant="outline" size="default" className="w-full sm:w-auto">
          <Link href="/recruit/openings">
            Explore Openings <ArrowRight className="size-4 ml-1.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export default function RecruitProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "application-form">("profile");

  const { data: profileResponse, isLoading } = useQuery<ApiResponse<TRecruitProfile>>({
    queryKey: ["recruit-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recruit-user/profile");
      return res.data;
    },
    retry: false,
  });

  const profile = profileResponse?.data;
  const hasProfile = Boolean(profileResponse?.success && profile?.id);
  const academics = (profile?.academics ?? []) as TRecruitAcademic[];
  const experiences = (profile?.experiences ?? []) as TRecruitExperience[];

  const profileRegCode = profile?.id
    ? generateRecruitRegistrationCode(profile.id, profile.createdAt)
    : "";

  return (
    <main className="min-h-full p-3.5 sm:p-5 md:p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">My Recruiter Profile</h1>

      {isLoading ? (
        <ProfileSkeleton />
      ) : !hasProfile || !profile ? (
        <EmptyProfileGate />
      ) : (
        <>
          {/* =============================================================
              1. HERO IDENTITY CARD (MOBILE-FIRST)
              ============================================================= */}
          <section className="relative overflow-hidden rounded-2xl border border-emerald-900/20 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-4 sm:p-6 text-white shadow-lg">
            {/* Ambient Background Aura */}
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute right-1/3 -bottom-16 size-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Left Identity Block */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Photo / Avatar */}
                <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-emerald-400/30 bg-slate-800 shadow-md shrink-0">
                  {profile.photoUrl ? (
                    <Image
                      src={profile.photoUrl}
                      alt={profile.fullName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-emerald-900/40 text-emerald-200 text-2xl font-black">
                      {profile.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div
                    className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-400 border-2 border-slate-900"
                    title="Profile Verified"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-400/20">
                      <ShieldCheck className="size-3" />
                      Verified Applicant
                    </span>
                    <span className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-slate-300 border border-slate-700/60">
                      ID: {profileRegCode}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white truncate">
                    {profile.fullName}
                  </h2>

                  {/* Demographic & Contact Chips */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300">
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-1 hover:text-emerald-300 transition-colors"
                    >
                      <Mail className="size-3.5 text-emerald-400" />
                      <span className="truncate max-w-[200px]">{profile.email}</span>
                    </a>
                    <a
                      href={`tel:${profile.mobileNo}`}
                      className="inline-flex items-center gap-1 hover:text-emerald-300 transition-colors"
                    >
                      <Phone className="size-3.5 text-emerald-400" />
                      <span>{profile.mobileNo}</span>
                    </a>
                    <span className="inline-flex items-center gap-1 text-slate-300">
                      <MapPin className="size-3.5 text-emerald-400" />
                      <span>
                        {profile.currAddressDistrict}, {profile.currAddressState}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t border-slate-800/60 md:border-t-0">
                <Button
                  onClick={() => printRecruitRegistrationForm(profileRegCode)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:bg-emerald-700 font-semibold"
                >
                  <Printer className="size-4 mr-1.5" />
                  Print Application Form
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white hover:text-emerald-300 font-semibold shadow-xs"
                >
                  <Link href="/recruit/registration?edit=true">
                    <Pencil className="size-4 mr-1.5" />
                    Edit Profile Details
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* =============================================================
              2. VIEW SWITCHER TABS
              ============================================================= */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="inline-flex rounded-xl bg-muted/60 p-1 border border-border/50">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                  activeTab === "profile"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <User className="size-3.5" />
                Digital Profile View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("application-form")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                  activeTab === "application-form"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <FileText className="size-3.5" />
                Official Application Form
                <span className="ml-1 rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  A4
                </span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>Registered on: {formatDate(profile.createdAt)}</span>
            </div>
          </div>

          {/* =============================================================
              3. TAB 1: INTERACTIVE DIGITAL PROFILE VIEW
              ============================================================= */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Row 1: Personal Details & Address Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <User className="size-4" />
                      </div>
                      <h3 className="text-sm font-bold tracking-tight text-foreground">
                        Personal & Demographic Details
                      </h3>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-xs">
                    <div>
                      <dt className="text-muted-foreground font-medium">Full Name</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.fullName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Date of Birth</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {formatDate(profile.dob)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Age Breakdown</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {calculateAgeBreakdown(profile.dob)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Gender</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.gender}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Father&apos;s Name</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.fatherName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Mother&apos;s Name</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.motherName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Category</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        <span className="rounded bg-muted px-2 py-0.5 font-bold">
                          {profile.category}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Blood Group</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        <span className="rounded bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 font-bold">
                          {formatBloodGroup(profile.bloodGroup)}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Marital Status</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.maritalStatus}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Religion</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {formatEnum(profile.religion)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Nationality</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.nationality}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Languages Known</dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.languagesKnown || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">Aadhaar Card No.</dt>
                      <dd className="font-mono font-semibold text-foreground mt-0.5">
                        {profile.aadharNo
                          ? `XXXX-XXXX-${profile.aadharNo.slice(-4)}`
                          : "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium">
                        Physically Challenged
                      </dt>
                      <dd className="font-semibold text-foreground mt-0.5">
                        {profile.physicallyChallenged ? "Yes" : "No"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Residential Addresses */}
                <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-400">
                          <MapPin className="size-4" />
                        </div>
                        <h3 className="text-sm font-bold tracking-tight text-foreground">
                          Residential & Domicile Addresses
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {/* Local / Current */}
                      <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                          Current / Local Address
                        </span>
                        <p className="mt-1 text-xs text-foreground font-medium leading-relaxed">
                          {profile.currAddressLocal}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {profile.currAddressDistrict}, {profile.currAddressState} –{" "}
                          <span className="font-mono font-semibold">
                            {profile.currAddressPinCode}
                          </span>
                          , {profile.currAddressCountry}
                        </p>
                      </div>

                      {/* Permanent */}
                      <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                          Permanent Address
                        </span>
                        <p className="mt-1 text-xs text-foreground font-medium leading-relaxed">
                          {profile.permAddressLocal}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {profile.permAddressDistrict}, {profile.permAddressState} –{" "}
                          <span className="font-mono font-semibold">
                            {profile.permAddressPinCode}
                          </span>
                          , {profile.permAddressCountry}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2.5 text-[11px] text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      Addresses verified as per official government identification records.
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Academic Credentials */}
              <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                      <School className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-foreground">
                        Educational & Professional Qualifications
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        Verified academic qualifications on official registration record.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400 self-start sm:self-auto">
                    {academics.length} Record{academics.length === 1 ? "" : "s"}
                  </span>
                </div>

                {academics.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-3">
                    No academic records found on file.
                  </p>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto rounded-xl border border-border/60">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-muted/60 border-b border-border/60 text-muted-foreground font-semibold">
                            <th className="py-2.5 px-3">#</th>
                            <th className="py-2.5 px-3">Qualification</th>
                            <th className="py-2.5 px-3">Subject / Stream</th>
                            <th className="py-2.5 px-3">School / Institute</th>
                            <th className="py-2.5 px-3">Board / University</th>
                            <th className="py-2.5 px-3">Session</th>
                            <th className="py-2.5 px-3 text-right">Marks / Div</th>
                            <th className="py-2.5 px-3 text-center">Certificate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {academics.map((row, idx) => (
                            <tr key={row.id || idx} className="hover:bg-muted/20">
                              <td className="py-2.5 px-3 font-mono text-muted-foreground">
                                {idx + 1}
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-foreground">
                                {row.qualification}
                              </td>
                              <td className="py-2.5 px-3 text-muted-foreground">
                                {row.subject || "—"}
                              </td>
                              <td className="py-2.5 px-3 text-foreground">
                                {row.schoolInstitute}
                              </td>
                              <td className="py-2.5 px-3 text-muted-foreground">
                                {row.boardUniversity}
                              </td>
                              <td className="py-2.5 px-3 font-mono">
                                {row.startYear} - {row.endYear}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                  {row.passingMarks}%
                                </span>{" "}
                                <span className="text-[11px] text-muted-foreground">
                                  ({row.passingDivision})
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                {row.certificateUrl ? (
                                  <a
                                    href={row.certificateUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 rounded bg-muted hover:bg-muted/80 px-2 py-1 text-[11px] font-semibold text-primary transition-colors"
                                  >
                                    <Eye className="size-3" /> View
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card Feed View */}
                    <div className="block md:hidden space-y-3">
                      {academics.map((row, idx) => (
                        <div
                          key={row.id || idx}
                          className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-bold text-foreground text-sm">
                                {row.qualification}
                              </span>
                              <p className="text-muted-foreground text-[11px]">
                                {row.subject || "General"}
                              </p>
                            </div>
                            <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-700 dark:text-emerald-400">
                              {row.passingMarks}% ({row.passingDivision})
                            </span>
                          </div>

                          <div className="space-y-1 text-muted-foreground pt-1 border-t border-border/40">
                            <p>
                              <strong className="text-foreground">Institute:</strong>{" "}
                              {row.schoolInstitute}
                            </p>
                            <p>
                              <strong className="text-foreground">Board:</strong>{" "}
                              {row.boardUniversity}
                            </p>
                            <p>
                              <strong className="text-foreground">Session:</strong>{" "}
                              {row.startYear} – {row.endYear}
                            </p>
                          </div>

                          {row.certificateUrl && (
                            <a
                              href={row.certificateUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-card py-1.5 text-xs font-semibold text-primary shadow-2xs hover:bg-muted"
                            >
                              <Eye className="size-3.5" /> View Educational Certificate
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Row 3: Work Experience History */}
              <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      <Briefcase className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-foreground">
                        Work Experience & Professional History
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        Documented employment, positions held, and verified tenures.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400 self-start sm:self-auto">
                    {experiences.length} Position{experiences.length === 1 ? "" : "s"}
                  </span>
                </div>

                {experiences.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-3">
                    No work experience listed (Fresher applicant).
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experiences.map((exp, idx) => (
                      <div
                        key={exp.id || idx}
                        className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3 text-xs flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-sm text-foreground">
                                {exp.designation}
                              </h4>
                              <p className="text-muted-foreground font-medium">
                                {exp.employerName}
                              </p>
                            </div>
                            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap">
                              {exp.experienceYears} Yrs
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-[11px]">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3 text-muted-foreground" />
                              {exp.postingLocation}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="size-3 text-muted-foreground" />
                              {formatDate(exp.startDate)} –{" "}
                              {exp.endDate ? formatDate(exp.endDate) : "Present"}
                            </span>
                          </div>

                          {exp.natureOfWork && (
                            <p className="text-muted-foreground text-xs leading-relaxed pt-1">
                              {exp.natureOfWork}
                            </p>
                          )}
                        </div>

                        {exp.certUrl && (
                          <a
                            href={exp.certUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-card py-1.5 text-xs font-semibold text-primary shadow-2xs hover:bg-muted"
                          >
                            <Eye className="size-3.5" /> View Experience Certificate
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 4: Uploaded Documents & Credentials Vault */}
              <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-400">
                    <FileCheck className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-foreground">
                      Uploaded Documents & Credentials Vault
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Access and download your verified registration attachments.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Passport Photo */}
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center text-center space-y-3">
                    <div className="relative size-20 rounded-xl overflow-hidden border border-border/70 bg-card shadow-2xs">
                      {profile.photoUrl ? (
                        <Image
                          src={profile.photoUrl}
                          alt="Passport Photo"
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <User className="size-8" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-foreground">
                        Official Passport Photo
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                        {profile.photoName || "photo.jpg"}
                      </p>
                    </div>
                    {profile.photoUrl && (
                      <a
                        href={profile.photoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        <ExternalLink className="size-3" /> View Full Image
                      </a>
                    )}
                  </div>

                  {/* Signature */}
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center text-center space-y-3">
                    <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-border/70 bg-card shadow-2xs flex items-center justify-center p-2">
                      {profile.signatureUrl ? (
                        <Image
                          src={profile.signatureUrl}
                          alt="Signature"
                          fill
                          className="object-contain p-1"
                          sizes="128px"
                        />
                      ) : (
                        <div className="text-muted-foreground text-xs italic">
                          No signature
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-foreground">
                        Applicant Signature
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                        {profile.signatureName || "signature.png"}
                      </p>
                    </div>
                    {profile.signatureUrl && (
                      <a
                        href={profile.signatureUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        <ExternalLink className="size-3" /> View Signature
                      </a>
                    )}
                  </div>

                  {/* Resume / CV */}
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center text-center space-y-3 justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mt-2">
                      <FileText className="size-7" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-foreground">
                        Resume / Curriculum Vitae
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                        {profile.resumeName || "Uploaded Resume"}
                      </p>
                    </div>
                    {profile.resumeUrl ? (
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 text-xs font-semibold shadow-xs"
                      >
                        <Download className="size-3.5" /> Download Resume
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        Not uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================
              4. TAB 2: OFFICIAL A4 APPLICATION FORM PREVIEW & PRINT ENGINE
              ============================================================= */}
          {activeTab === "application-form" && (
            <div className="space-y-4">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Official 1-Page A4 Registration Form
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Institutional verification format with certified barcode & QR code.
                  </p>
                </div>
                <Button
                  onClick={() => printRecruitRegistrationForm(profileRegCode)}
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm shrink-0 font-semibold"
                >
                  <Printer className="size-4 mr-1.5" /> Print Application Form
                </Button>
              </div>

              {/* Mobile Swipe Navigation Hint */}
              <div className="flex sm:hidden items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <span>↔️ Swipe horizontally to inspect full A4 form</span>
                <span className="rounded bg-emerald-700 text-white px-1.5 py-0.5 text-[10px] font-bold">
                  OFFICIAL A4
                </span>
              </div>

              {/* Viewport Isolated Horizontal Scroll Canvas */}
              <div className="overflow-x-auto rounded-xl border border-border/70 bg-slate-50/50 dark:bg-slate-900/30 p-2 sm:p-4 shadow-inner">
                <div className="min-w-[760px] print:min-w-0 mx-auto">
                  <RecruitRegistrationPrintout
                    data={profile as any}
                    education={academics as any}
                    experience={experiences as any}
                    applicationId={profileRegCode}
                    submittedAt={profile.updatedAt ?? undefined}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
