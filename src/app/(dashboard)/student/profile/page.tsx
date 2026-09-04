"use client";

import { ArrowRight, GraduationCap, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React_4 from "react";
import { Check as Check_2, CheckCircle, Copy, Download, Edit, Edit2, FileSignature, Printer, ShieldCheck, Target as Target_2, Building, Calendar as Calendar_3, Compass as Compass_2, FileText as FileText_2, Mail, MapPin, Phone, Tag, User as User_2, Users } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import * as z from "zod";
import { toast } from "sonner";
import * as React from "react";
import { useContext } from "react";
import { ScrollArea as ScrollAreaPrimitive, Slot } from "radix-ui";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthContext } from "@/x/8789d6dc";
import { axiosInstance } from "@/x/acfb3dca";

interface TAcademicDetail {
  qualification: string;
  stream: string;
  subject: string;
  instituteName: string;
  universityName: string;
  sessionYear: string;
  gradeDivision: string;
  status: "Pass Out" | "Persuing";
}

interface TAddress {
  local: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
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

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-1.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none select-none p-px transition-colors",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}
type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface ApiSuccess<T> {
      success: boolean;
      data: T;
      message?: string;
    }

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

type DeleteStudentRegistrationResponse = ApiSuccess<{ message: string }>;

const STUDENT_REGISTRATION_QUERY_KEYS = {
      ALL: ["student-registrations"] as const,
      ME: ["student-registrations", "me"] as const,
      LIST: ["student-registrations", "list"] as const,
      DETAILS: (id: string) => ["student-registrations", "details", id] as const,
    };

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

const badgeVariants = cva(
      "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-2.5!",
      {
        variants: {
          variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary:
              "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive:
              "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline:
              "border-border bg-input/20 text-foreground dark:bg-input/30 [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost:
              "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline",
          },
        },
        defaultVariants: {
          variant: "default",
        },
      },
    );

function Badge({
      className,
      variant = "default",
      asChild = false,
      ...props
    }: React.ComponentProps<"span"> &
      VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
      const Comp = asChild ? Slot.Root : "span";

      return (
        <Comp
          data-slot="badge"
          data-variant={variant}
          className={cn(badgeVariants({ variant }), className)}
          {...props}
        />
      );
    }

interface ProfileHeaderProps_2 {
      fullName: string;
      studentId: string;
      photoUrl: string | null;
      createdAt: string;
      handlePrint: () => void;
      handleEditSubmission: () => void;
    }

const getInitials_4 = (name: string): string => {
      if (!name) return "ST";
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "ST";
      if (parts.length === 1) {
        const word = parts[0];
        return word.length >= 2
          ? word.slice(0, 2).toUpperCase()
          : (word[0] + "T").toUpperCase();
      }
      const first = parts[0][0] || "";
      const last = parts[parts.length - 1][0] || "";
      return (first + last).toUpperCase();
    };

interface ProfileObjectivesProps {
      internshipGoal: string;
      signatureUrl: string | null;
    }

const ProfileObjectives: React_3.FC<ProfileObjectivesProps> = ({
      internshipGoal,
      signatureUrl,
    }) => {
      const [sigError, setSigError] = React_3.useState(false);

      React_3.useEffect(() => {
        setSigError(false);
      }, [signatureUrl]);

      return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 print:grid-cols-2">
          {}
          <div className="bg-card border-border/60 group relative overflow-hidden rounded-2xl border p-4 sm:p-5 print:border-0 print:p-0">
            <div className="bg-primary/5 pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-110" />

            <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold print:mb-1.5">
              <div className="bg-primary/10 text-primary rounded-lg p-1.5 print:bg-transparent print:p-0">
                <Target_2 className="size-3.5" />
              </div>
              Post-Internship Objectives
            </h4>

            <div className="mt-3.5 space-y-3 text-xs">
              <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-normal">
                Primary Career / Professional Goal:
              </p>
              <div className="bg-primary/5 dark:bg-primary/10 border-primary/25 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 print:border-0 print:p-0">
                <CheckCircle className="text-primary size-3.5 shrink-0" />
                <span className="text-foreground text-sm font-bold leading-none tracking-tight">
                  {internshipGoal || "N/A"}
                </span>
              </div>
              <p className="text-muted-foreground text-[10px] leading-relaxed">
                This objective guides internship matches and virtual workspace
                specialization paths.
              </p>
            </div>
          </div>

          {}
          <div className="bg-card border-border/60 group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-5 print:justify-start print:border-0 print:p-0">
            <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-teal-500/5 blur-2xl transition-transform duration-500 group-hover:scale-110" />

            <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold print:mb-1.5">
              <div className="rounded-lg bg-teal-500/10 p-1.5 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 print:bg-transparent print:p-0">
                <FileSignature className="size-3.5" />
              </div>
              Signed Declaration
            </h4>

            <div className="bg-muted/20 dark:bg-muted/10 border-border/15 mt-3 flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border p-3 print:items-start print:border-0 print:bg-transparent print:p-0">
              {signatureUrl && !sigError ? (
                <div className="flex flex-col items-center gap-1.5 print:items-start">
                  <img
                    src={signatureUrl}
                    alt="Student Signature"
                    onError={() => setSigError(true)}
                    className="border-border/40 h-8 w-auto max-w-full rounded border bg-white object-contain p-1 dark:bg-white print:border-0 print:p-0"
                  />
                  <span className="text-muted-foreground text-[9px] font-semibold uppercase tracking-wider print:hidden">
                    Digitally Signed & Validated
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground text-xs font-medium">
                  Signature Image Unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      );
    };

interface ProfilePersonalProps_2 {
      fatherName: string;
      motherName: string;
      dob: string;
      gender: string;
      category: string;
      aadharNo?: string;
      mobileNo: string;
      email: string;
      studentId: string;
    }

const ProfilePersonal_2: React_2.FC<ProfilePersonalProps_2> = ({
      fatherName,
      motherName,
      dob,
      gender,
      category,
      aadharNo,
      mobileNo,
      email,
      studentId,
    }) => {
        const formatAadhar = (no?: string) => {
        if (!no) return "Not Declared";
        const clean = no.replace(/\s+/g, "");
        if (clean.length < 12) return clean;
        return `XXXX - XXXX - ${clean.slice(-4)}`;
      };

      const details = [
        {
          label: "Father's Name",
          value: fatherName,
          icon: User_2,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Mother's Name",
          value: motherName,
          icon: User_2,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Date of Birth",
          value: dob,
          icon: Calendar_3,
          color: "text-teal-600 bg-teal-500/10",
        },
        {
          label: "Gender",
          value: gender,
          icon: Users,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Category / Stream",
          value: category,
          icon: Tag,
          color: "text-teal-600 bg-teal-500/10",
        },
        {
          label: "Aadhar ID Number",
          value: formatAadhar(aadharNo),
          icon: FileText_2,
          color: "text-emerald-600 bg-emerald-500/10",
          className: "font-mono",
        },
        {
          label: "Mobile Number",
          value: mobileNo,
          icon: Phone,
          color: "text-teal-600 bg-teal-500/10",
        },
        {
          label: "Primary Email",
          value: email,
          icon: Mail,
          color: "text-emerald-600 bg-emerald-500/10",
        },
      ];

      return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 print:grid-cols-3">
          {}
          <div className="bg-card border-border/60 rounded-2xl border p-4 sm:p-5 lg:col-span-2 print:border-0 print:p-0">
            <h3 className="text-foreground border-border/40 mb-4 border-b pb-2 text-base font-bold print:pb-1">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
              {details.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="hover:bg-muted/20 group flex items-start gap-2.5 rounded-xl p-2 transition-colors duration-200 print:p-0 print:hover:bg-transparent"
                  >
                    <div
                      className={`shrink-0 rounded-lg p-2 ${item.color} print:hidden`}
                    >
                      <Icon className="size-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground block text-[10px] font-semibold uppercase tracking-normal">
                        {item.label}
                      </span>
                      <span
                        className={`text-foreground block text-sm font-medium leading-tight ${item.className || ""}`}
                      >
                        {item.value || "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {}
          <div className="bg-card border-border/60 relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border p-4 text-center sm:p-5 print:justify-start print:border-0 print:p-0">
            <div className="bg-primary/5 pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl" />

            <div className="w-full space-y-3 print:space-y-1">
              <div className="border-border/40 w-full border-b pb-2 print:pb-1">
                <h4 className="text-foreground text-xs font-bold uppercase tracking-wide">
                  Student ID Badge
                </h4>
                <p className="text-muted-foreground mt-0.5 text-[9px] font-medium">
                  Scan barcode for registration validation
                </p>
              </div>

              <div className="bg-muted/15 dark:bg-muted/5 border-border/20 flex flex-col items-center gap-1 rounded-xl border py-4 print:border-0 print:bg-transparent print:py-1">
                <img
                  src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${studentId}&scale=2&rotate=N`}
                  alt="Student ID Barcode"
                  className="border-border/40 h-10 w-40 rounded border bg-white object-contain p-1 print:border-0 print:p-0"
                />
                <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">
                  {studentId}
                </span>
              </div>
            </div>

            <div className="bg-primary/[0.01] border-primary/10 text-muted-foreground mt-3 w-full rounded-xl border p-3 text-left text-[11px] print:hidden">
              <p className="text-foreground text-primary mb-0.5 text-[9px] font-semibold uppercase tracking-wider">
                Verification Statement
              </p>
              This profile represents a verified candidate enrolled in the India
              International Internship framework.
            </div>
          </div>
        </div>
      );
    };

const handlePrint = () => {
    window.print();
  };


export default function StudentRegistrationDashboardPage() {
    interface StudentRegistrationResponse {
      id: string;
      studentId: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      category: string;
      localAddressLocal: string;
      localAddressDistrict: string;
      localAddressState: string;
      localAddressCountry: string;
      localAddressPinCode: string;
      sameAsLocal: boolean;
      permAddressLocal: string;
      permAddressDistrict: string;
      permAddressState: string;
      permAddressCountry: string;
      permAddressPinCode: string;
      mobileNo: string;
      internshipGoal:
        | "Job"
        | "Freelancing"
        | "Higher Studies"
        | "Startup"
        | "Skill Enhancement"
        | "Other";
      aadharNo?: string;
      photoUrl: string;
      photoName: string;
      signatureUrl: string;
      signatureName: string;
      agreeTerms: boolean;
      createdAt: string;
      updatedAt: string;
      userId: string;
      academics: TAcademicDetail[];
      skills?: any[];
    }

    type GetStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;
    type SubmitStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

    interface StudentRegistrationPayload {
      fullName: string;
      fatherName: string;
      motherName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      category: string;
      localAddress: TAddress;
      sameAsLocal: boolean;
      permanentAddress: TAddress;
      mobileNo: string;
      academics: TAcademicDetail[];
      internshipGoal:
        | "Job"
        | "Freelancing"
        | "Higher Studies"
        | "Startup"
        | "Skill Enhancement"
        | "Other";
      aadharNo?: string;
      photoBase64: string;
      photoName: string;
      signatureBase64: string;
      signatureName: string;
      agreeTerms: boolean;
    }

    type ListStudentRegistrationsResponse = ApiSuccess<
      StudentRegistrationResponse[]
    >;

    type UpdateStudentRegistrationResponse =
      ApiSuccess<StudentRegistrationResponse>;

    type StudentRegistrationUpdatePayload =
      Partial<StudentRegistrationPayload>;

    interface IStudentRegistrationDataHooks {
      useStudentRegistrationMe: (
        options?: TQueryOptions<GetStudentRegistrationResponse, Error>,
      ) => TQueryReturnType<GetStudentRegistrationResponse, Error>;

      useStudentRegistrationSubmit: (
        options?: TMutationOptions<
          SubmitStudentRegistrationResponse,
          Error,
          StudentRegistrationPayload
        >,
      ) => TMutationReturnType<
        SubmitStudentRegistrationResponse,
        StudentRegistrationPayload
      >;

      useStudentRegistrationAdminList: (
        options?: TQueryOptions<ListStudentRegistrationsResponse, Error>,
      ) => TQueryReturnType<ListStudentRegistrationsResponse, Error>;

      useStudentRegistrationDetails: (
        id: string,
        options?: TQueryOptions<GetStudentRegistrationResponse, Error>,
      ) => TQueryReturnType<GetStudentRegistrationResponse, Error>;

      useStudentRegistrationUpdate: (
        options?: TMutationOptions<
          UpdateStudentRegistrationResponse,
          Error,
          { id: string; payload: StudentRegistrationUpdatePayload }
        >,
      ) => TMutationReturnType<
        UpdateStudentRegistrationResponse,
        { id: string; payload: StudentRegistrationUpdatePayload }
      >;

      useStudentRegistrationDelete: (
        options?: TMutationOptions<
          DeleteStudentRegistrationResponse,
          Error,
          string
        >,
      ) => TMutationReturnType<DeleteStudentRegistrationResponse, string>;
    }

    interface IStudentRegistrationService {
      submitRegistration: (
        payload: StudentRegistrationPayload,
      ) => Promise<SubmitStudentRegistrationResponse>;
      getMyRegistration: () => Promise<GetStudentRegistrationResponse>;
      listAllRegistrations: () => Promise<ListStudentRegistrationsResponse>;
      getRegistrationById: (id: string) => Promise<GetStudentRegistrationResponse>;
      updateRegistration: (
        id: string,
        payload: StudentRegistrationUpdatePayload,
      ) => Promise<UpdateStudentRegistrationResponse>;
      deleteRegistration: (
        id: string,
      ) => Promise<DeleteStudentRegistrationResponse>;
    }

    const StudentRegistrationService: IStudentRegistrationService = {
      async submitRegistration(payload) {
        const response =
          await axiosInstance.post<SubmitStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER,
            payload,
          );
        return response.data;
      },

      async getMyRegistration() {
        const response = await axiosInstance.get<GetStudentRegistrationResponse>(
          ENDPOINTS.STUDENTS.REGISTER_ME,
        );
        return response.data;
      },

      async listAllRegistrations() {
        const response = await axiosInstance.get<ListStudentRegistrationsResponse>(
          ENDPOINTS.STUDENTS.REGISTER_ADMIN,
        );
        return response.data;
      },

      async getRegistrationById(id) {
        const response = await axiosInstance.get<GetStudentRegistrationResponse>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateRegistration(id, payload) {
        const response =
          await axiosInstance.patch<UpdateStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
            payload,
          );
        return response.data;
      },

      async deleteRegistration(id) {
        const response =
          await axiosInstance.delete<DeleteStudentRegistrationResponse>(
            ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
          );
        return response.data;
      },
    };

    const StudentRegistrationDataHooks: IStudentRegistrationDataHooks = {
      useStudentRegistrationMe(options) {
        return useQuery({
          queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
          queryFn: async () => await StudentRegistrationService.getMyRegistration(),
          ...options,
        });
      },

      useStudentRegistrationSubmit(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentRegistrationService.submitRegistration(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Profile registration completed successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit registration.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useStudentRegistrationAdminList(options) {
        return useQuery({
          queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
          queryFn: async () =>
            await StudentRegistrationService.listAllRegistrations(),
          ...options,
        });
      },

      useStudentRegistrationDetails(id, options) {
        return useQuery({
          queryKey: STUDENT_REGISTRATION_QUERY_KEYS.DETAILS(id),
          queryFn: async () =>
            await StudentRegistrationService.getRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useStudentRegistrationUpdate(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await StudentRegistrationService.updateRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.DETAILS(variables.id),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Registration profile updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update registration profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useStudentRegistrationDelete(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await StudentRegistrationService.deleteRegistration(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.ME,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.LIST,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_REGISTRATION_QUERY_KEYS.DETAILS(variables),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Registration profile deleted successfully.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to delete registration profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

    function useAuth() {
      return useContext(AuthContext);
    }

    interface TAcademicDetail {
      qualification: string;
      stream: string;
      subject: string;
      instituteName: string;
      universityName: string;
      sessionYear: string;
      gradeDivision: string;
      status: "Pass Out" | "Persuing";
    }

    interface ProfileAcademicsProps {
      academics: TAcademicDetail[];
    }

    const ProfileAcademics: React_2.FC<ProfileAcademicsProps> = ({
      academics,
    }) => {
      return (
        <div className="bg-card border-border/60 rounded-2xl border p-4 sm:p-5 print:border-0 print:p-0">
          <h3 className="text-foreground border-border/40 mb-4 flex items-center gap-2 border-b pb-2 text-sm font-bold print:pb-1.5">
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:bg-transparent print:p-0">
              <GraduationCap className="size-3.5" />
            </div>
            Academic Credentials
          </h3>

          <div className="border-border/60 bg-background/50 overflow-hidden rounded-xl border">
            <ScrollArea className="w-full">
              <table className="w-full min-w-[750px] border-collapse text-left text-xs print:min-w-full">
                <TableHeader>
                  <TableRow className="bg-muted/50 dark:bg-muted/15 hover:bg-muted/50 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                    <TableHead className="p-3 font-bold">Qualification</TableHead>
                    <TableHead className="p-3 font-bold">
                      Degree / Specialization
                    </TableHead>
                    <TableHead className="p-3 font-bold">
                      Institution / University
                    </TableHead>
                    <TableHead className="p-3 font-bold">Session / Year</TableHead>
                    <TableHead className="p-3 font-bold">Grade / Score</TableHead>
                    <TableHead className="p-3 text-right font-bold">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academics && academics.length > 0 ? (
                    academics.map((ac, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-muted/15 dark:hover:bg-muted/5 border-border/40 border-b text-[11px] transition-colors last:border-0"
                      >
                        <TableCell className="text-foreground p-3 font-semibold">
                          {ac.qualification}
                        </TableCell>
                        <TableCell className="text-muted-foreground p-3">
                          <span className="text-foreground text-xs font-semibold">
                            {ac.stream}
                          </span>
                          <span className="text-muted-foreground mt-0.5 block text-[9px] font-medium">
                            Major: {ac.subject}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground p-3">
                          <span className="text-foreground text-xs font-semibold">
                            {ac.instituteName}
                          </span>
                          <span className="text-muted-foreground mt-0.5 block text-[9px] font-medium">
                            Univ: {ac.universityName}
                          </span>
                        </TableCell>
                        <TableCell className="text-foreground p-3 font-mono font-semibold">
                          {ac.sessionYear}
                        </TableCell>
                        <TableCell className="text-foreground p-3 font-medium">
                          {ac.gradeDivision}
                        </TableCell>
                        <TableCell className="p-3 text-right">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              ac.status === "Persuing"
                                ? "border border-amber-500/10 bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                                : "border border-emerald-500/10 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                            }`}
                          >
                            <span
                              className={`size-1 rounded-full ${
                                ac.status === "Persuing"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                            />
                            {ac.status === "Persuing" ? "Pursuing" : "Passed"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-muted-foreground p-6 text-center"
                      >
                        No academic qualifications recorded.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      );
    };

    interface TAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

    interface ProfileAddressProps_2 {
      localAddress: TAddress;
      permanentAddress: TAddress;
    }

    const ProfileAddress_2: React_2.FC<ProfileAddressProps_2> = ({
      localAddress,
      permanentAddress,
    }) => {
      return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 print:grid-cols-2">
          {}
          <div className="bg-card border-border/60 group relative overflow-hidden rounded-2xl border p-4 sm:p-5 print:border-0 print:p-0">
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-emerald-500/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold print:mb-1.5">
              <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:bg-transparent print:p-0">
                <MapPin className="size-3.5" />
              </div>
              Local Address Coordinate
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                  Street / Building
                </span>
                <p className="text-foreground text-xs font-medium leading-tight">
                  {localAddress.local || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                  <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                    District / Pin
                  </span>
                  <p className="text-foreground text-xs font-medium leading-tight">
                    {localAddress.district} ({localAddress.pinCode})
                  </p>
                </div>

                <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-3 print:border-0 print:bg-transparent print:p-0">
                  <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                    State / Country
                  </span>
                  <p className="text-foreground text-xs font-medium leading-tight">
                    {localAddress.state}, {localAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="bg-card border-border/60 group relative overflow-hidden rounded-2xl border p-4 sm:p-5 print:border-0 print:p-0">
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-teal-500/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold print:mb-1.5">
              <div className="rounded-lg bg-teal-500/10 p-1.5 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 print:bg-transparent print:p-0">
                <Compass_2 className="size-3.5" />
              </div>
              Permanent Address Coordinate
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                  Street / Building
                </span>
                <p className="text-foreground text-xs font-medium leading-tight">
                  {permanentAddress.local || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                  <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                    District / Pin
                  </span>
                  <p className="text-foreground text-xs font-medium leading-tight">
                    {permanentAddress.district} ({permanentAddress.pinCode})
                  </p>
                </div>

                <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                  <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                    State / Country
                  </span>
                  <p className="text-foreground text-xs font-medium leading-tight">
                    {permanentAddress.state}, {permanentAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const ProfileHeader_2: React_3.FC<ProfileHeaderProps_2> = ({
      fullName,
      studentId,
      photoUrl,
      createdAt,
      handlePrint,
      handleEditSubmission,
    }) => {
      const [copied, setCopied] = useState(false);
      const [imgError, setImgError] = useState(false);

      React_3.useEffect(() => {
        setImgError(false);
      }, [photoUrl]);

      const copyToClipboard = () => {
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(studentId);
          setCopied(true);
          toast.success("Student ID copied to clipboard!");
          setTimeout(() => setCopied(false), 2000);
        }
      };

      const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : new Date().toLocaleDateString("en-US");

      return (
        <div className="bg-card border-border/60 relative overflow-hidden rounded-2xl border print:rounded-none print:border-0">
          {}
          <div className="relative h-28 w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 sm:h-36 print:hidden">
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          {}
          <div className="relative flex flex-col items-start justify-between gap-4 px-5 pb-5 pt-3 sm:flex-row sm:items-end sm:px-6 sm:pb-6 print:px-0 print:pb-2 print:pt-4">
            {}
            <div className="z-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:items-end print:mt-0 print:flex-row">
              {}
              <div className="border-card bg-muted z-10 -mt-12 flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 sm:-mt-16 sm:size-28 print:mt-0 print:size-20 print:border-2">
                {photoUrl && !imgError ? (
                  <img
                    src={photoUrl}
                    alt={fullName}
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-emerald-500/10 text-xl font-bold uppercase tracking-wide text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    {getInitials_4(fullName)}
                  </div>
                )}
              </div>

              {}
              <div className="space-y-1 text-center sm:text-left print:text-left">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                  <h2 className="text-foreground text-xl font-bold leading-none tracking-tight sm:text-2xl">
                    {fullName}
                  </h2>
                  <div className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:border-emerald-500">
                    <ShieldCheck className="size-3" />
                    Verified
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs sm:justify-start">
                  <span>Student ID:</span>
                  <code className="text-primary bg-primary/5 border-primary/10 select-all rounded border px-1.5 py-0.5 font-mono font-semibold tracking-wider print:border-0 print:bg-transparent">
                    {studentId}
                  </code>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors print:hidden"
                    title="Copy Student ID"
                  >
                    {copied ? (
                      <Check_2 className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>

                <p className="text-muted-foreground text-[10px] font-semibold">
                  Registered on:{" "}
                  <span className="text-foreground">{formattedDate}</span>
                </p>
              </div>
            </div>

            {}
            <div className="z-10 flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto print:hidden">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="border-border/80 hover:border-foreground/20 hover:bg-muted active:scale-98 h-9 flex-1 gap-1.5 rounded-lg px-4 text-xs font-medium transition-all sm:flex-initial"
              >
                <Printer className="text-muted-foreground size-3.5" />
                Download PDF
              </Button>
              <Button
                onClick={handleEditSubmission}
                className="bg-primary hover:bg-primary/95 text-primary-foreground active:scale-98 h-9 flex-1 gap-1.5 rounded-lg px-4 text-xs font-medium transition-all sm:flex-initial"
              >
                <Edit2 className="size-3" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      );
    };
  const router = useRouter();
  const { user } = useAuth();

  const { data: regMeResponse, isLoading: isRegLoading } =
    StudentRegistrationDataHooks.useStudentRegistrationMe({
      enabled: !!user?.id,
      retry: false,
    });
  const handleEditSubmission = () => {
    router.push("/student/registration?edit=true");
  };

  if (isRegLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="border-primary size-12 animate-spin rounded-full border-4 border-t-transparent shadow-md" />
        <p className="text-muted-foreground animate-pulse text-sm font-semibold">
          Loading registration profile...
        </p>
      </div>
    );
  }

  const s = regMeResponse?.data;

  if (!s) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground text-sm font-semibold">
          No profile data found.
        </p>
      </div>
    );
  }

    const localAddress = {
    local: s.localAddressLocal || "",
    district: s.localAddressDistrict || "",
    state: s.localAddressState || "",
    country: s.localAddressCountry || "India",
    pinCode: s.localAddressPinCode || "",
  };

  const permanentAddress = {
    local: s.permAddressLocal || "",
    district: s.permAddressDistrict || "",
    state: s.permAddressState || "",
    country: s.permAddressCountry || "India",
    pinCode: s.permAddressPinCode || "",
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-7xl space-y-5 px-4 py-5 duration-300 md:px-6">
      {}
      <ProfileHeader_2
        fullName={s.fullName}
        studentId={s.studentId}
        photoUrl={s.photoUrl}
        createdAt={s.createdAt}
        handlePrint={handlePrint}
        handleEditSubmission={handleEditSubmission}
      />

      {}
      <ProfilePersonal_2
        fatherName={s.fatherName}
        motherName={s.motherName}
        dob={s.dob}
        gender={s.gender}
        category={s.category}
        aadharNo={s.aadharNo}
        mobileNo={s.mobileNo}
        email={user?.email || "N/A"}
        studentId={s.studentId}
      />

      {}
      <ProfileAddress_2
        localAddress={localAddress}
        permanentAddress={permanentAddress}
      />

      {}
      <ProfileAcademics academics={s.academics || []} />

      {}
      <ProfileObjectives
        internshipGoal={s.internshipGoal}
        signatureUrl={s.signatureUrl}
      />

      {}
      <div className="hidden items-center justify-between border-t-2 border-emerald-600 bg-white pb-1 pt-3 print:fixed print:bottom-0 print:left-0 print:right-0 print:flex">
        <p className="text-muted-foreground text-[10px]">
          © {new Date().getFullYear()} iiInternship. All rights reserved.
        </p>
        <p className="text-muted-foreground text-[10px]">
          This is a system-generated profile summary.
        </p>
      </div>
    </div>
  );
}
