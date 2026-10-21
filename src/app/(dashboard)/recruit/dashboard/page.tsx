"use client";

import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Clock,
  Printer,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Download,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React_2, { useEffect } from "react";
import {
  RecruitRegistrationPrintout,
  printRecruitRegistrationForm,
} from "@/components/recruit/RecruitRegistrationPrintout";
import React_3 from "react";
import * as React from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormProvider } from "react-hook-form";
import qrcode from "qrcode-generator";
import { axiosInstance } from "@/x/acfb3dca";

interface TRecruitReference {
  id: string;
  profileId: string;
  name: string;
  designation: string;
  organisation: string;
  relation: string;
  mobile: string;
  email: string;
  address?: string | null;
  createdAt: string;
}

interface TRecruitSpecificInfo {
  id?: string;
  profileId?: string;
  isGovernmentEmployee: boolean;
  isEverConvicted: boolean;
  convictionDetails?: string | null;
  isEverDismissed: boolean;
  dismissalDetails?: string | null;
  hasRelativeInOrganisation: boolean;
  relativeDetails?: string | null;
  willingToRelocate: boolean;
  expectedSalary?: string | null;
  noticePeriod?: string | null;
  declarationAccepted: boolean;
  updatedAt?: string;
}

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

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card gap-(--card-spacing) bg-card py-(--card-spacing) text-card-foreground ring-foreground/10 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg flex flex-col overflow-hidden rounded-lg text-xs/relaxed ring-1 [--card-spacing:--spacing(4)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)]",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing) grid auto-rows-min items-start gap-1 rounded-t-lg",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  );
}
const RECRUIT_QUERY_KEYS = {
      PROFILE: ["recruit-profile"] as const,
      APPLICATIONS: ["recruit-applications"] as const,
      SETTINGS: ["recruit-settings"] as const,
      OPENINGS: ["recruit-openings"] as const,
      EDUCATION: ["recruit-education"] as const,
      EXPERIENCE: ["recruit-experience"] as const,
      DOCUMENTS: ["recruit-documents"] as const,
      REFERENCES: ["recruit-references"] as const,
      SPECIFIC_INFO: ["recruit-specific-info"] as const,
    };

interface GenericApiResponse<T = undefined> {
      success: boolean;
      message?: string;
      data?: T;
    }

type TGender = "MALE" | "FEMALE" | "TRANSGENDER";

interface TRecruitAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

type TMaritalStatus =
      "MARRIED" | "UNMARRIED" | "DIVORCED" | "WIDOW" | "WIDOWER";

type TReligion =
      | "HINDU"
      | "SIKH"
      | "JAIN"
      | "PARSI"
      | "BUDDHIST"
      | "ISLAM"
      | "CHRISTIAN"
      | "SHINTO"
      | "MONOTHEISM"
      | "PROTESTANTISM"
      | "DEISM"
      | "YAHUDI"
      | "OTHER";

type TCategory = "GENERAL" | "EWS" | "OBC" | "SC" | "ST" | "HUMANITY";

type TBloodGroup =
      | "A_POSITIVE"
      | "A_NEGATIVE"
      | "B_POSITIVE"
      | "B_NEGATIVE"
      | "AB_POSITIVE"
      | "AB_NEGATIVE"
      | "O_POSITIVE"
      | "O_NEGATIVE";

type TQualification =
      | "EIGHTH_PASS"
      | "MATRICULATION"
      | "INTERMEDIATE"
      | "DIPLOMA"
      | "GRADUATION"
      | "POST_GRADUATION"
      | "MPHIL"
      | "PHD"
      | "OTHER";

interface TRecruitEducation {
      id: string;
      profileId: string;
      qualification: TQualification;
      instituteName: string;
      boardUniversity: string;
      startYear: number;
      endYear: number;
      division: string;
      percentage: number;
      subject: string;
      certificateUrl: string;
      createdAt: string;
    }

interface TRecruitExperience {
      id: string;
      profileId: string;
      employerName: string;
      designation: string;
      postingLocation: string;
      startDate: string;
      endDate?: string | null;
      natureOfWork: string;
      totalExperience: number;
      certificateUrl: string;
      createdAt: string;
    }

type TOpeningStatus = "ACTIVE" | "ARCHIVED";

interface TRecruitOpening {
      id: string;
      slNo: number;
      advtNoAndDate: string;
      postName: string;
      jobDescriptionText: string;
      jobDescriptionPdfUrl?: string | null;
      closingDate: string;
      status: TOpeningStatus;
      totalApplications?: number;
      createdAt?: string;
        advtNo?: string | null;
      advtDate?: string | null;
      postOpportunity?: string;
      minQualification?: string;
      jobNature?: string;
      skillsRequired?: string | null;
      jdDocUrl?: string | null;
    }

type TApplicationStatus =
      "SUBMITTED" | "UNDER_REVIEW" | "SHORTLISTED" | "REJECTED" | "SELECTED";

interface TRecruitApplication {
      id: string;
      applicationId: string;
      openingId: string;
      profileId: string;
      opening?: TRecruitOpening;
      status: TApplicationStatus;
      pdfUrl?: string | null;
      submittedAt: string;
      updatedAt: string;
    }

type TRecruitEducationPayload = Omit<
      TRecruitEducation,
      "id" | "profileId" | "createdAt"
    >;

type TRecruitExperiencePayload = Omit<
      TRecruitExperience,
      "id" | "profileId" | "createdAt"
    >;

interface TRecruitDocuments {
      photoUrl?: string | null;
      signatureUrl?: string | null;
      resumeUrl?: string | null;
      adharUrl?: string | null;
      casteCertificateUrl?: string | null;
      otherDocuments?: { label: string; url: string }[];
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

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

const Form = FormProvider;

const XF81bba3e_2 = qrcode;

function totalExperience(rows: TRecruitExperience_3[]): string {
      const years = rows.reduce(
        (sum, r) => sum + (Number(r.totalExperience) || 0),
        0,
      );
      if (!years) return "0 Year(s)";
      const whole = Math.floor(years);
      const months = Math.round((years - whole) * 12);
      return months ? `${whole} Year(s) ${months} Month(s)` : `${whole} Year(s)`;
    }

interface TRecruitExperience_3 {
      id: string;
      profileId: string;
      employerName: string;
      designation: string;
      postingLocation: string;
      startDate: string;
      endDate?: string | null;
      natureOfWork: string;
      totalExperience: number;
      certificateUrl: string;
      createdAt: string;
    }

interface TRecruitExperience_2 {
      id: string;
      profileId: string;
      employerName: string;
      designation: string;
      postingLocation: string;
      startDate: string;
      endDate?: string | null;
      natureOfWork: string;
      totalExperience: number;
      certificateUrl: string;
      createdAt: string;
    }

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

function qrDataUrl(text: string): string | null {
      if (!text) return null;
      try {
        const qr = XF81bba3e_2(0, "M");
        qr.addData(text);
        qr.make();
        return qr.createDataURL(4, 8);
      } catch {
        return null;
      }
    }

function formatEnum(value?: string | null): string {
      if (!value) return "—";
      return value
        .split("_")
        .map((part) =>
          part.length <= 2
            ? part.toUpperCase()
            : part.charAt(0) + part.slice(1).toLowerCase(),
        )
        .join(" ");
    }

function Band({ children }: { children: React_3.ReactNode }) {
      return (
        <h3 className="mt-3 border-y border-slate-400 bg-slate-100 px-1.5 py-1 text-[10px] font-bold tracking-wide text-slate-900">
          {children}
        </h3>
      );
    }

function Cell({
      label,
      children,
      className = "",
    }: {
      label: string;
      children: React_3.ReactNode;
      className?: string;
    }) {
      return (
        <div className={`flex border-b border-slate-300 ${className}`}>
          <span className="w-[42%] shrink-0 border-r border-slate-300 bg-slate-50/80 px-1.5 py-1 text-[9.5px] font-semibold text-slate-600">
            {label}
          </span>
          <span className="px-1.5 py-1 text-[9.5px] font-medium text-slate-900">
            {children || "—"}
          </span>
        </div>
      );
    }

function govDate(value?: string | null): string {
      if (!value) return "—";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return String(value);
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      return `${dd}/${mm}/${date.getFullYear()}`;
    }

function ageBreakdown(dob?: string | null, asOf?: string | null): string {
      if (!dob) return "—";
      const start = new Date(dob);
      const end = asOf ? new Date(asOf) : new Date();
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "—";
          if (end < start) return "Invalid date of birth";

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
      return `${years} Year(s) ${months} Month(s) ${days} Day(s)`;
    }

function addressLines(parts: (string | null | undefined)[]): React_3.ReactNode {
      const lines = parts.filter((p) => !!p && String(p).trim());
      if (!lines.length) return "—";
      return lines.map((line, i) => <div key={i}>{line}</div>);
    }

function Th({
      children,
      className = "",
    }: {
      children: React_3.ReactNode;
      className?: string;
    }) {
      return (
        <th
          className={`border border-slate-400 bg-slate-100 px-1.5 py-1 text-left text-[9px] font-bold text-slate-800 ${className}`}
        >
          {children}
        </th>
      );
    }

function Td({
      children,
      className = "",
    }: {
      children: React_3.ReactNode;
      className?: string;
    }) {
      return (
        <td
          className={`border border-slate-300 px-1.5 py-1 align-top text-[9.5px] text-slate-900 ${className}`}
        >
          {children}
        </td>
      );
    }


export default function RecruitDashboardPage() {
    interface TRecruitProfile {
      id: string;
      userId: string;
      name: string;
      gender: TGender;
      dob: string;
      fatherName: string;
      motherName: string;
      permanentAddress: TRecruitAddress;
      currentAddress: TRecruitAddress;
      mobile: string;
      email: string;
      maritalStatus: TMaritalStatus;
      nationality: string;
      gotra?: string | null;
      religion: TReligion;
      category: TCategory;
      bloodGroup: TBloodGroup;
      hobby?: string | null;
      languageKnown: string;
      physicalChallenged: boolean;
      adharNo: string;
      profileCompleted: boolean;
      photoUrl?: string | null;
      signatureUrl?: string | null;
      resumeUrl?: string | null;
      createdAt: string;
      updatedAt: string;
      educationDetails?: TRecruitEducation[];
      experienceDetails?: TRecruitExperience[];
      references?: TRecruitReference[];
      specificInfo?: TRecruitSpecificInfo | null;
    }

    type TRecruitReferencePayload = Omit<
      TRecruitReference,
      "id" | "profileId" | "createdAt"
    >;

    type TRecruitSpecificInfoPayload = Omit<
      TRecruitSpecificInfo,
      "id" | "profileId" | "updatedAt"
    >;

    interface IRecruitService {
        submitProfile: (
        payload: Record<string, unknown>,
      ) => Promise<GenericApiResponse<Record<string, unknown>>>;
      getMyProfile: () => Promise<GenericApiResponse<Record<string, unknown>>>;
      updateProfile: (
        payload: Record<string, unknown>,
      ) => Promise<GenericApiResponse<TRecruitProfile>>;

        getOpenings: () => Promise<GenericApiResponse<TRecruitOpening[]>>;
      applyJob: (
        jobOpportunityId: string,
      ) => Promise<GenericApiResponse<Record<string, unknown>>>;
      getMyApplications: () => Promise<
        GenericApiResponse<Record<string, unknown>[]>
      >;
      getApplication: (
        applicationId: string,
      ) => Promise<GenericApiResponse<TRecruitApplication>>;

        getEducation: () => Promise<GenericApiResponse<TRecruitEducation[]>>;
      addEducation: (
        payload: TRecruitEducationPayload,
      ) => Promise<GenericApiResponse<TRecruitEducation>>;
      updateEducation: (
        id: string,
        payload: Partial<TRecruitEducationPayload>,
      ) => Promise<GenericApiResponse<TRecruitEducation>>;
      deleteEducation: (id: string) => Promise<GenericApiResponse<null>>;

        getExperience: () => Promise<GenericApiResponse<TRecruitExperience[]>>;
      addExperience: (
        payload: TRecruitExperiencePayload,
      ) => Promise<GenericApiResponse<TRecruitExperience>>;
      updateExperience: (
        id: string,
        payload: Partial<TRecruitExperiencePayload>,
      ) => Promise<GenericApiResponse<TRecruitExperience>>;
      deleteExperience: (id: string) => Promise<GenericApiResponse<null>>;

        getDocuments: () => Promise<GenericApiResponse<TRecruitDocuments>>;
      saveDocuments: (
        payload: TRecruitDocuments,
      ) => Promise<GenericApiResponse<TRecruitDocuments>>;

        getReferences: () => Promise<GenericApiResponse<TRecruitReference[]>>;
      addReference: (
        payload: TRecruitReferencePayload,
      ) => Promise<GenericApiResponse<TRecruitReference>>;
      updateReference: (
        id: string,
        payload: Partial<TRecruitReferencePayload>,
      ) => Promise<GenericApiResponse<TRecruitReference>>;
      deleteReference: (id: string) => Promise<GenericApiResponse<null>>;

        getSpecificInfo: () => Promise<GenericApiResponse<TRecruitSpecificInfo>>;
      saveSpecificInfo: (
        payload: TRecruitSpecificInfoPayload,
      ) => Promise<GenericApiResponse<TRecruitSpecificInfo>>;

        getSettings: () => Promise<GenericApiResponse<Record<string, unknown>>>;
      saveSettings: (payload: {
        isExperienceCompulsory: boolean;
      }) => Promise<GenericApiResponse<Record<string, unknown>>>;
    }

    const RecruitService: IRecruitService = {
        async submitProfile(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.PROFILE,
          payload,
        );
        return response.data;
      },

      async getMyProfile() {
        try {
          const response = await axiosInstance.get(ENDPOINTS.RECRUIT.PROFILE);
          return response.data;
        } catch (error) {
                                  const response = (
            error as { response?: { status?: number; data?: GenericApiResponse } }
          )?.response;
          if (response?.status === 404 && response.data) return response.data;
          throw error;
        }
      },

      async updateProfile(payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.PROFILE,
          payload,
        );
        return response.data;
      },

        async getOpenings() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.OPENINGS);
        return response.data;
      },

      async applyJob(jobOpportunityId) {
        const response = await axiosInstance.post(ENDPOINTS.RECRUIT.APPLICATIONS, {
          jobOpportunityId,
        });
        return response.data;
      },

      async getMyApplications() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.APPLICATIONS);
        return response.data;
      },

      async getApplication(applicationId) {
        const response = await axiosInstance.get(
          ENDPOINTS.RECRUIT.APPLICATION_BY_ID(applicationId),
        );
        return response.data;
      },

        async getEducation() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.EDUCATION);
        return response.data;
      },

      async addEducation(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.EDUCATION,
          payload,
        );
        return response.data;
      },

      async updateEducation(id, payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.EDUCATION_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteEducation(id) {
        const response = await axiosInstance.delete(
          ENDPOINTS.RECRUIT.EDUCATION_BY_ID(id),
        );
        return response.data;
      },

        async getExperience() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.EXPERIENCE);
        return response.data;
      },

      async addExperience(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.EXPERIENCE,
          payload,
        );
        return response.data;
      },

      async updateExperience(id, payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.EXPERIENCE_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteExperience(id) {
        const response = await axiosInstance.delete(
          ENDPOINTS.RECRUIT.EXPERIENCE_BY_ID(id),
        );
        return response.data;
      },

        async getDocuments() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.DOCUMENTS);
        return response.data;
      },

      async saveDocuments(payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.DOCUMENTS,
          payload,
        );
        return response.data;
      },

        async getReferences() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.REFERENCES);
        return response.data;
      },

      async addReference(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.REFERENCES,
          payload,
        );
        return response.data;
      },

      async updateReference(id, payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.REFERENCE_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteReference(id) {
        const response = await axiosInstance.delete(
          ENDPOINTS.RECRUIT.REFERENCE_BY_ID(id),
        );
        return response.data;
      },

        async getSpecificInfo() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.SPECIFIC_INFO);
        return response.data;
      },

      async saveSpecificInfo(payload) {
        const response = await axiosInstance.patch(
          ENDPOINTS.RECRUIT.SPECIFIC_INFO,
          payload,
        );
        return response.data;
      },

        async getSettings() {
        const response = await axiosInstance.get(ENDPOINTS.RECRUIT.SETTINGS);
        return response.data;
      },

      async saveSettings(payload) {
        const response = await axiosInstance.post(
          ENDPOINTS.RECRUIT.SETTINGS,
          payload,
        );
        return response.data;
      },
    };
    const RecruitDataHooks = {
      useProfile() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.PROFILE,
          queryFn: async () => await RecruitService.getMyProfile(),
          retry: false,
        });
      },

      useSubmitProfile(
        options?: TMutationOptions<
          GenericApiResponse<Record<string, unknown>>,
          Error,
          Record<string, unknown>
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: Record<string, unknown>) =>
            await RecruitService.submitProfile(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Profile submitted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to submit profile.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useApplyJob(
        options?: TMutationOptions<
          GenericApiResponse<Record<string, unknown>>,
          Error,
          string
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (jobId: string) => await RecruitService.applyJob(jobId),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.APPLICATIONS,
            });
            toast.success("Applied to job opportunity successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to apply for job.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useMyApplications() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.APPLICATIONS,
          queryFn: async () => await RecruitService.getMyApplications(),
        });
      },

      useSettings() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.SETTINGS,
          queryFn: async () => await RecruitService.getSettings(),
        });
      },

      useSaveSettings(
        options?: TMutationOptions<
          GenericApiResponse<Record<string, unknown>>,
          Error,
          { isExperienceCompulsory: boolean }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: { isExperienceCompulsory: boolean }) =>
            await RecruitService.saveSettings(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.SETTINGS,
            });
            toast.success("Settings updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to save settings.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useOpenings() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.OPENINGS,
          queryFn: async () => await RecruitService.getOpenings(),
        });
      },

        useEducation() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
          queryFn: async () => await RecruitService.getEducation(),
        });
      },

      useAddEducation(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitEducation>,
          Error,
          TRecruitEducationPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitEducationPayload) =>
            await RecruitService.addEducation(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
            });
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Education record added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to add education record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useUpdateEducation(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitEducation>,
          Error,
          { id: string; payload: Partial<TRecruitEducationPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: Partial<TRecruitEducationPayload>;
          }) => await RecruitService.updateEducation(id, payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
            });
            toast.success("Education record updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update education record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useDeleteEducation(
        options?: TMutationOptions<GenericApiResponse<null>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id: string) =>
            await RecruitService.deleteEducation(id),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EDUCATION,
            });
            toast.success("Education record deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to delete education record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useExperience() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
          queryFn: async () => await RecruitService.getExperience(),
        });
      },

      useAddExperience(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitExperience>,
          Error,
          TRecruitExperiencePayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitExperiencePayload) =>
            await RecruitService.addExperience(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
            });
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Experience record added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to add experience record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useUpdateExperience(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitExperience>,
          Error,
          { id: string; payload: Partial<TRecruitExperiencePayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: Partial<TRecruitExperiencePayload>;
          }) => await RecruitService.updateExperience(id, payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
            });
            toast.success("Experience record updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update experience record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useDeleteExperience(
        options?: TMutationOptions<GenericApiResponse<null>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id: string) =>
            await RecruitService.deleteExperience(id),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.EXPERIENCE,
            });
            toast.success("Experience record deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to delete experience record.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useDocuments() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.DOCUMENTS,
          queryFn: async () => await RecruitService.getDocuments(),
        });
      },

      useSaveDocuments(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitDocuments>,
          Error,
          TRecruitDocuments
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitDocuments) =>
            await RecruitService.saveDocuments(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.DOCUMENTS,
            });
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Documents saved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to save documents.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useReferences() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
          queryFn: async () => await RecruitService.getReferences(),
        });
      },

      useAddReference(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitReference>,
          Error,
          TRecruitReferencePayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitReferencePayload) =>
            await RecruitService.addReference(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
            });
            toast.success("Reference added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to add reference.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useUpdateReference(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitReference>,
          Error,
          { id: string; payload: Partial<TRecruitReferencePayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: Partial<TRecruitReferencePayload>;
          }) => await RecruitService.updateReference(id, payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
            });
            toast.success("Reference updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update reference.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useDeleteReference(
        options?: TMutationOptions<GenericApiResponse<null>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id: string) =>
            await RecruitService.deleteReference(id),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.REFERENCES,
            });
            toast.success("Reference deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to delete reference.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useSpecificInfo() {
        return useQuery({
          queryKey: RECRUIT_QUERY_KEYS.SPECIFIC_INFO,
          queryFn: async () => await RecruitService.getSpecificInfo(),
        });
      },

      useSaveSpecificInfo(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitSpecificInfo>,
          Error,
          TRecruitSpecificInfoPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: TRecruitSpecificInfoPayload) =>
            await RecruitService.saveSpecificInfo(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: RECRUIT_QUERY_KEYS.SPECIFIC_INFO,
            });
            toast.success("Information saved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to save information.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

        useUpdateProfile(
        options?: TMutationOptions<
          GenericApiResponse<TRecruitProfile>,
          Error,
          Record<string, unknown>
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload: Record<string, unknown>) =>
            await RecruitService.updateProfile(payload),
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: RECRUIT_QUERY_KEYS.PROFILE });
            toast.success("Profile updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error: Error, variables, context) => {
            toast.error(error.message || "Failed to update profile.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },
    };

    interface TRecruitReference {
      id: string;
      profileId: string;
      name: string;
      designation: string;
      organisation: string;
      relation: string;
      mobile: string;
      email: string;
      address?: string | null;
      createdAt: string;
    }

    interface TRecruitSpecificInfo {
      id?: string;
      profileId?: string;
      isGovernmentEmployee: boolean;
      isEverConvicted: boolean;
      convictionDetails?: string | null;
      isEverDismissed: boolean;
      dismissalDetails?: string | null;
      hasRelativeInOrganisation: boolean;
      relativeDetails?: string | null;
      willingToRelocate: boolean;
      expectedSalary?: string | null;
      noticePeriod?: string | null;
      declarationAccepted: boolean;
      updatedAt?: string;
    }

    interface ApplicationPrintoutProps {
      profile: TRecruitProfile;
      education: TRecruitEducation[];
      experience: TRecruitExperience_3[];
      references: TRecruitReference[];
      specificInfo?: TRecruitSpecificInfo;
      applicationId: string;
      advtNo?: string;
      postName?: string;
      submittedAt?: string;
    }

    function ApplicationPrintout({
      profile,
      education,
      experience,
      applicationId,
      advtNo,
      postName,
      submittedAt,
    }: ApplicationPrintoutProps) {
      return (
        <RecruitRegistrationPrintout
          data={profile as any}
          education={education as any}
          experience={experience as any}
          applicationId={applicationId}
          advtNo={advtNo}
          postName={postName}
          submittedAt={submittedAt}
        />
      );
    }

  const router = useRouter();

    const { data: profileResponse, isLoading: isProfileLoading } =
    RecruitDataHooks.useProfile();
  const { data: applicationsResponse } = RecruitDataHooks.useMyApplications();

  const profile = profileResponse?.data as Record<string, any>;
  const applications = applicationsResponse?.data || [];
  const [dashboardPrintApp, setDashboardPrintApp] = React.useState<any>(null);

  const handlePrintApplication = (app: any) => {
    setDashboardPrintApp(app);
    setTimeout(() => {
      printRecruitRegistrationForm(app.id);
    }, 100);
  };

  const academics = (profile?.academics ?? []) as TRecruitEducation[];
  const experiences = (profile?.experiences ?? []) as TRecruitExperience_2[];

  useEffect(() => {
    if (!isProfileLoading && !profile?.id) {
      router.replace("/recruit/registration");
    }
  }, [profile, isProfileLoading, router]);

  useEffect(() => {
    document.title = "Recruiter Dashboard | International Institute of Internship™";
  }, []);

  const isProfileComplete = !!profile;
  const registrationCode = profile?.id
    ? generateRecruitRegistrationCode(
        profile.id as string,
        (profile.createdAt as string) ?? null,
      )
    : "";

  return (
    <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6 p-3.5 sm:p-5 md:p-6 print:m-0 print:max-w-none print:p-0">
      {/* Recruiter Portal Banner with Quick Action CTAs (Hidden on Print) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950 via-emerald-900 to-zinc-950 p-5 sm:p-6 md:p-8 text-white shadow-xl print:hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Recruiter Portal
            </span>
            {registrationCode && (
              <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-200">
                ID: {registrationCode}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
            Welcome Back, {profile?.fullName || "Recruiter"}
          </h1>
          <p className="max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Manage your official application form, track live job applications,
            and explore newly announced vacancies across institutional partners.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
            <Button
              size="sm"
              onClick={() => router.push("/recruit/openings")}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold shadow-md hover:shadow-lg transition-all justify-center"
            >
              <Briefcase className="size-3.5" /> Explore Openings
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/recruit/profile")}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm justify-center"
            >
              <UserCheck className="size-3.5" /> Edit Profile & Documents
            </Button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex items-center justify-center opacity-10">
          <Briefcase className="-mr-16 size-72" />
        </div>
      </div>

      {/* Interactive Metric Cards (Hidden on Print) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 print:hidden">
        {/* Card 1: Profile Status */}
        <Card
          onClick={() => router.push("/recruit/profile")}
          className="group/metric bg-card/50 hover:bg-card/80 border-border/50 hover:border-emerald-500/50 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
        >
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600 group-hover/metric:bg-emerald-500/20 transition-colors shrink-0">
                <ShieldCheck className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-xs font-medium">
                  Profile Status
                </span>
                <span className="text-foreground block text-base font-bold">
                  {isProfileComplete ? "Verified & Registered" : "Pending Registration"}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium group-hover/metric:underline flex items-center gap-0.5 mt-0.5">
                  Manage profile <ChevronRight className="size-3 shrink-0" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: My Applications */}
        <Card
          onClick={() => router.push("/recruit/applications")}
          className="group/metric bg-card/50 hover:bg-card/80 border-border/50 hover:border-[#006e52]/50 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
        >
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="rounded-2xl bg-[#006e52]/10 p-3 text-[#006e52] group-hover/metric:bg-[#006e52]/20 transition-colors shrink-0">
                <FileText className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-xs font-medium">
                  My Applications
                </span>
                <span className="text-foreground block text-base font-bold">
                  {applications.length} Applied {applications.length === 1 ? "Position" : "Positions"}
                </span>
                <span className="text-[11px] text-[#006e52] font-medium group-hover/metric:underline flex items-center gap-0.5 mt-0.5">
                  Track status & print forms <ChevronRight className="size-3 shrink-0" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Qualifications On Record */}
        <Card
          onClick={() => router.push("/recruit/profile")}
          className="group/metric bg-card/50 hover:bg-card/80 border-border/50 hover:border-amber-500/50 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md sm:col-span-2 lg:col-span-1"
        >
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600 group-hover/metric:bg-amber-500/20 transition-colors shrink-0">
                <TrendingUp className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-xs font-medium">
                  Qualifications On Record
                </span>
                <span className="text-foreground block text-base font-bold">
                  {academics.length} Added
                </span>
                <span className="text-[11px] text-amber-600 font-medium group-hover/metric:underline flex items-center gap-0.5 mt-0.5">
                  View credentials <ChevronRight className="size-3 shrink-0" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Job Applications Section (Hidden on Print) */}
      <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-xs print:hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 p-4 sm:p-5">
          <div className="flex items-start sm:items-center gap-2.5 min-w-0">
            <div className="rounded-xl bg-[#006e52]/10 p-2 text-[#006e52] dark:text-[#006e52] shrink-0 mt-0.5 sm:mt-0">
              <Briefcase className="size-4" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base font-bold">Recent Job Applications</CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Track status and review details of your submitted employment applications.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/recruit/applications")}
            className="flex items-center justify-center gap-1.5 text-xs w-full sm:w-auto shrink-0 font-semibold text-[#006e52] border-[#006e52]/30 hover:bg-[#006e52]/10"
          >
            View All Applications ({applications.length}) <ArrowRight className="size-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          {applications.length > 0 ? (
            <div className="divide-y divide-border/40 rounded-lg border border-border/50 bg-background/50 overflow-hidden">
              {applications.map((app: any, idx: number) => {
                const job = app.jobOpportunity;
                const status = app.status || "PENDING";
                const appliedDate = app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Recently";

                return (
                  <div
                    key={app.id || idx}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-muted/40"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">
                          {job?.postOpportunity || "Job Application"}
                        </span>
                        {job?.advtNo && (
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
                            Advt: {job.advtNo}
                          </span>
                        )}
                        {job?.jobNature && (
                          <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
                            {job.jobNature}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {job?.companyName || "International Institute of Internship"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3 text-muted-foreground" /> Applied on {appliedDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t border-border/30 sm:border-t-0">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                          status === "ACCEPTED"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : status === "SHORTLISTED"
                            ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            : status === "REJECTED"
                            ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/20",
                        )}
                      >
                        {status === "ACCEPTED"
                          ? "Selected"
                          : status === "SHORTLISTED"
                          ? "Shortlisted"
                          : status === "REJECTED"
                          ? "Not Selected"
                          : "Under Review"}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrintApplication(app)}
                          className="h-8 gap-1.5 text-xs font-semibold text-[#006e52] border-[#006e52]/30 hover:bg-[#006e52]/10"
                        >
                          <Download className="size-3" /> Form PDF
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push("/recruit/applications")}
                          className="h-8 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3 text-muted-foreground mb-3">
                <Briefcase className="size-6" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">No Active Job Applications</h4>
              <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-4">
                You haven't submitted applications for any openings yet. Check current vacancy listings to apply.
              </p>
              <Button
                size="sm"
                onClick={() => router.push("/recruit/openings")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs"
              >
                Explore Current Openings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Printable Application Preview Section */}
      <Card className="border-border/60 print:border-0 print:bg-transparent print:p-0 print:shadow-none">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 p-4 sm:p-5 print:hidden">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold">Application Form Preview</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Official 1-page A4 registration form with verified barcode & QR code.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => printRecruitRegistrationForm(registrationCode)}
            className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm w-full sm:w-auto shrink-0"
          >
            <Printer className="size-4" /> Print Application Form
          </Button>
        </CardHeader>
        <CardContent className="p-3 sm:p-5 print:p-0">
          {!profile ? (
            <div className="text-muted-foreground py-6 text-center text-sm">
              No profile data available to preview.
            </div>
          ) : (
            <div className="w-full space-y-2">
              {/* Mobile View Hint */}
              <div className="flex sm:hidden items-center justify-between text-[11px] bg-emerald-50/80 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 px-3 py-2 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="flex items-center gap-1.5 font-medium">
                  ↔️ Swipe horizontally to inspect full A4 form
                </span>
                <span className="font-bold text-[10px] uppercase tracking-wider bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                  Official A4
                </span>
              </div>

              {/* Scrollable Document Canvas with Min-Width Isolation */}
              <div className="w-full overflow-x-auto rounded-xl border border-border/60 bg-slate-100/70 p-2 sm:p-4 shadow-inner print:overflow-visible print:border-0 print:bg-transparent print:p-0">
                <ApplicationPrintout
                  profile={profile as unknown as TRecruitProfile}
                  education={academics}
                  experience={experiences}
                  references={[]}
                  applicationId={dashboardPrintApp?.id || registrationCode}
                  advtNo={dashboardPrintApp?.jobOpportunity?.advtNo}
                  postName={dashboardPrintApp?.jobOpportunity?.postOpportunity}
                  submittedAt={dashboardPrintApp?.createdAt || ((profile.updatedAt as string) ?? undefined)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
