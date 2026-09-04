"use client";

import { ArrowRight, Award, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React_4 from "react";
import { Check as Check_2, Copy, Download, Edit, Edit2, Printer, ShieldCheck, BookOpen as BookOpen_2, Briefcase, Building, Calendar as Calendar_3, Clock, Compass as Compass_2, GraduationCap, HeartHandshake as HeartHandshake_2, Mail, MapPin, Milestone, Phone, ShieldCheck as ShieldCheck_2, User as User_2, Users } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { useState } from "react";
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

interface TInstructorQualification {
  id?: string;
  highestQualification: string;
  specialization: string;
  universityName: string;
  yearOfCompletion: string;
  percentage: string;
}

interface TInstructorAddress {
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

interface InstructorDashboardStatsData {
      totalInternshipsAssignedByI3: number;
      totalInternshipsPostYourself: number;
      myTotalInterns: number;
      totalInternshipDoneByMe: number;
      totalImmersionDoneByMe: number;
      totalPaymentEarnings: number;
    }

interface StudentApplication {
      id: string;
      internshipId?: string;
      internship?: {
        id: string;
      };
      studentName?: string;
      student?: {
        fullName: string;
        email: string;
      };
      studentEmail?: string;
      appliedAt?: string;
      status?: string;
    }

interface ProjectSubmissionObject {
      id: string;
      enrollmentId: string;
      projectTitle: string;
      projectUrl: string;
      comments: string | null;
      status: "PENDING" | "GRADED";
      grade: string | null;
      feedback: string | null;
      gradedById: string | null;
      gradedAt: string | null;
      createdAt: string;
      updatedAt: string;
      student?: {
        fullName: string;
        email: string;
      };
    }

interface InstructorDashboardStatsResponse {
      success: boolean;
      data: {
        stats: InstructorDashboardStatsData;
        recentApplications: StudentApplication[];
        recentStudents: Record<string, unknown>[];
        assignedInternships: Record<string, unknown>[];
        recentNotices: Record<string, unknown>[];
        recentSubmissions: ProjectSubmissionObject[];
        recentFeedbacks: Record<string, unknown>[];
        assignedImmersions: Record<string, unknown>[];
        recentImmersionRegistrations: Record<string, unknown>[];
      };
    }

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

interface InstructorProfileData {
      qualification: string;
      isApproved: boolean;
      experience?: string;
      specialization?: string;
      bio?: string;
      resumeUrl?: string;
    }

interface InstructorProfileResponse {
      success: boolean;
      data: InstructorProfileData;
    }

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

interface ApiSuccess<T> {
      success: boolean;
      data: T;
      message?: string;
    }

interface ListMyInternshipsParams {
      source?: "i3" | "self";
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

interface ListInternshipsResponse {
      success: boolean;
      data: InternshipPublic[];
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }

interface GetInternshipByIdResponse {
      success: boolean;
      data: InternshipPublic;
    }

interface CreateInternshipPayload {
      title: string;
      description: string;
      companyName: string;
      location: string;
      type: InternshipType;
      price?: number | null;
      stipendAmount?: number | null;
      duration: string;
      startDate?: string | null;
      lastDate?: string | null;
      onboardingDetails?: string | null;
      category: "RUNNING" | "ON_CAMPUS" | "VIRTUAL";

      department?: string;
      modules?: string[] | string;
      tools?: string[] | string;
      skills?: string[] | string;
      projectFocus?: string;
      credits?: number | string;
      contact?: string;

      timePeriod?: string;
      qualification?: string;
      facilities?: string;
      careerOpportunity?: string;
      organizer?: string;
      instructorId?: string;

      mode?: string;
      remoteDetails?: string;
    }

interface ListMyStudentsParams {
      status?: string;
    }

type ImmersionApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

interface ImmersionObject {
      id: string;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      status: "UPCOMING" | "ACTIVE" | "COMPLETED";
      instructorId: string | null;
        instructorApprovalStatus?: ImmersionApprovalStatus;
      instructorApprovedAt?: string | null;
      instructorRemarks?: string | null;
      createdAt: string;
      updatedAt: string;
    }

interface ListImmersionsResponse {
      success: boolean;
      data: ImmersionObject[];
    }

interface ImmersionRegistrationObject {
      id: string;
      status: "PENDING" | "APPROVED" | "REJECTED";
      remarks: string | null;
      registeredAt: string;
      studentId: string;
      immersionId: string;
      student?: {
        fullName: string;
        email: string;
      };
    }

interface UpdateImmersionStatusPayload {
      status: "APPROVED" | "REJECTED";
      remarks?: string;
    }

interface ListSubmissionsResponse {
      success: boolean;
      data: ProjectSubmissionObject[];
    }

interface GradeSubmissionResponse {
      success: boolean;
      message?: string;
      data?: ProjectSubmissionObject;
    }

interface GradeSubmissionPayload {
      grade: string;
      feedback?: string;
    }

interface Notice {
      id: string;
      noticeNumber: string;
      date: string;
      title: string;
      category: string;
      description: string;
      pdfUrl?: string | null;
      pdfPublicId?: string | null;
      senderId: string;
      sender?: {
        id: string;
        name: string;
        email: string;
        role: string;
      } | null;
      createdAt: string;
      updatedAt: string;
      content?: string;
    }

interface ListNoticesResponse {
      success: boolean;
      data: Notice[];
    }

interface CreateNoticeResponse {
      success: boolean;
      data: Notice;
    }

interface CreateNoticePayload {
      title: string;
      content: string;
      category?: string;
      published?: boolean;
    }

interface TicketObject {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "CLOSED";
      createdAt: string;
    }

type ListTicketsResponse = ApiSuccess<TicketObject[]>;

type CreateTicketResponse_2 = ApiSuccess<TicketObject>;

interface CreateTicketPayload_2 {
      title: string;
      description: string;
    }

const INSTRUCTOR_QUERY_KEYS = {
      ALL: ["instructors"] as const,
      STATS: () => ["instructors", "stats"] as const,
      PROFILE: () => ["instructors", "profile"] as const,
      REGISTRATION_ME: () => ["instructors", "registration", "me"] as const,
      INTERNSHIPS: (params?: ListMyInternshipsParams) =>
        ["instructors", "internships", params] as const,
      PENDING_INTERNSHIPS: ["instructors", "internships", "pending"] as const,
      INTERNSHIP_APPLICATIONS: (id: string) =>
        ["instructors", "internship", id, "applications"] as const,
      STUDENTS: (params?: ListMyStudentsParams) =>
        ["instructors", "students", params] as const,
      IMMERSIONS: () => ["instructors", "immersions"] as const,
      IMMERSION_REGS: (immersionId: string) =>
        ["instructors", "immersions", immersionId, "registrations"] as const,
      SUBMISSIONS: () => ["instructors", "submissions"] as const,
      NOTICES: () => ["instructors", "notices"] as const,
      TICKETS: () => ["instructors", "tickets"] as const,
      ID_CARD: () => ["instructors", "id-card"] as const,
    };

interface GetInstructorsParams {
      page?: number;
      limit?: number;
      gender?: string;
      search?: string;
    }

type DeleteInstructorRegistrationResponse = ApiSuccess<{
      message: string;
    }>;

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

interface ListPendingInstructorsResponse {
      success: boolean;
      data: PendingInstructorProfile[];
    }

type ApproveInstructorResponse = ApiSuccess<{ message: string }>;

type RejectInstructorResponse = ApiSuccess<{ message: string }>;

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

interface ProfileHeaderProps {
      fullName: string;
      instructorId: string;
      photoUrl: string | null;
      createdAt: string;
      isApproved: boolean;
      handlePrint: () => void;
      handleEditSubmission: () => void;
    }

const getInitials_3 = (name: string): string => {
      if (!name) return "IN";
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "IN";
      if (parts.length === 1) {
        const word = parts[0];
        return word.length >= 2
          ? word.slice(0, 2).toUpperCase()
          : (word[0] + "N").toUpperCase();
      }
      const first = parts[0][0] || "";
      const last = parts[parts.length - 1][0] || "";
      return (first + last).toUpperCase();
    };

interface ProfileMentorshipProps {
      mentorshipAreas: string;
      preferredInternLevel: string[];
      maxInterns: string;
      mentorshipMode: string[];
      availability: string;
      selfIntroduction: string;
    }

const ProfileMentorship: React_2.FC<ProfileMentorshipProps> = ({
      mentorshipAreas,
      preferredInternLevel,
      maxInterns,
      mentorshipMode,
      availability,
      selfIntroduction,
    }) => {
      const items = [
        {
          label: "Max Interns Capacity",
          value: `${maxInterns} Interns`,
          icon: Users,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Mentorship Mode",
          value: mentorshipMode.join(", "),
          icon: Compass_2,
          color: "text-teal-600 bg-teal-500/10",
        },
        {
          label: "Availability (Slots / Hours)",
          value: availability,
          icon: Clock,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Preferred Intern Levels",
          value: preferredInternLevel.join(", "),
          icon: BookOpen_2,
          color: "text-teal-600 bg-teal-500/10",
        },
      ];

      return (
        <div className="bg-card/85 border-border/50 space-y-5 rounded-2xl border p-4 shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 dark:shadow-emerald-950/[0.05] print:border-0 print:p-0">
          <h3 className="text-foreground border-border/40 mb-4 flex items-center gap-2 border-b pb-2 text-sm font-bold print:pb-1.5">
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:bg-transparent print:p-0">
              <HeartHandshake_2 className="size-3.5" />
            </div>
            Mentorship Preferences & Biography
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="border-border/60 hover:border-foreground/10 flex items-start gap-3 rounded-xl border bg-zinc-50/50 p-3 shadow-inner transition-colors dark:bg-zinc-900/30"
                >
                  <div
                    className={`shrink-0 rounded-lg p-2 ${item.color} print:hidden`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-normal">
                      {item.label}
                    </span>
                    <span className="text-foreground text-xs font-semibold leading-snug">
                      {item.value || "N/A"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-border/60 space-y-1 rounded-xl border bg-zinc-50/50 p-4 shadow-inner dark:bg-zinc-900/30">
              <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-normal">
                Mentorship Areas
              </span>
              <p className="text-foreground text-xs font-medium leading-relaxed">
                {mentorshipAreas}
              </p>
            </div>

            <div className="border-border/60 space-y-1 rounded-xl border bg-zinc-50/50 p-4 shadow-inner dark:bg-zinc-900/30">
              <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-normal">
                Biography / Self Introduction
              </span>
              <p className="text-foreground whitespace-pre-line text-xs font-medium leading-relaxed">
                {selfIntroduction}
              </p>
            </div>
          </div>
        </div>
      );
    };

interface ProfilePersonalProps {
      fatherSpouseName: string;
      dob: string;
      gender: string;
      mobileNo: string;
      alternateMobileNo?: string;
      email: string;
      instructorId: string;
    }

const ProfilePersonal: React_2.FC<ProfilePersonalProps> = ({
      fatherSpouseName,
      dob,
      gender,
      mobileNo,
      alternateMobileNo,
      email,
      instructorId,
    }) => {
      const details = [
        {
          label: "Father's / Spouse's Name",
          value: fatherSpouseName,
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
          label: "Mobile Number",
          value: mobileNo,
          icon: Phone,
          color: "text-teal-600 bg-teal-500/10",
        },
        {
          label: "Alternate Mobile",
          value: alternateMobileNo || "Not Provided",
          icon: Phone,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Primary Email",
          value: email,
          icon: Mail,
          color: "text-teal-600 bg-teal-500/10",
        },
      ];

      return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 print:grid-cols-3">
          {}
          <div className="bg-card/85 border-border/50 rounded-2xl border p-4 shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 lg:col-span-2 dark:shadow-emerald-950/[0.05] print:border-0 print:p-0">
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
                      <span className="text-foreground block text-sm font-medium leading-tight">
                        {item.value || "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {}
          <div className="bg-card/85 border-border/50 relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border p-4 text-center shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 dark:shadow-emerald-950/[0.05] print:justify-start print:border-0 print:p-0">
            <div className="bg-primary/5 pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl" />

            <div className="w-full space-y-3 print:space-y-1">
              <div className="border-border/40 w-full border-b pb-2 print:pb-1">
                <h4 className="text-foreground text-xs font-bold uppercase tracking-wide">
                  Instructor ID Badge
                </h4>
                <p className="text-muted-foreground mt-0.5 text-[9px] font-medium">
                  Scan barcode for registration validation
                </p>
              </div>

              <div className="bg-muted/15 dark:bg-muted/5 border-border/20 flex flex-col items-center gap-1 rounded-xl border py-4 print:border-0 print:bg-transparent print:py-1">
                <img
                  src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${instructorId}&scale=2&rotate=N`}
                  alt="Instructor ID Barcode"
                  className="border-border/40 h-10 w-40 rounded border bg-white object-contain p-1 print:border-0 print:p-0"
                />
                <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">
                  {instructorId}
                </span>
              </div>
            </div>

            <div className="bg-primary/[0.01] border-primary/10 text-muted-foreground mt-3 w-full rounded-xl border p-3 text-left text-[11px] print:hidden">
              <p className="text-foreground text-primary mb-0.5 text-[9px] font-semibold uppercase tracking-wider">
                Verification Statement
              </p>
              This profile represents a verified mentor/instructor within the India
              International Internship framework.
            </div>
          </div>
        </div>
      );
    };

interface ProfileProfessionalProps {
      currentOrganization?: string;
      currentDesignation?: string;
      totalWorkExperience?: string;
      teachingExperience?: string;
      internshipExperience?: string;
    }

const ProfileProfessional: React_2.FC<ProfileProfessionalProps> = ({
      currentOrganization,
      currentDesignation,
      totalWorkExperience,
      teachingExperience,
      internshipExperience,
    }) => {
      const experiences = [
        {
          label: "Current Organization",
          value: currentOrganization || "Not Declared",
          icon: Building,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Designation",
          value: currentDesignation || "Not Declared",
          icon: Briefcase,
          color: "text-teal-600 bg-teal-500/10",
        },
        {
          label: "Total Work Experience",
          value: totalWorkExperience
            ? `${totalWorkExperience} Years`
            : "Not Declared",
          icon: Milestone,
          color: "text-emerald-600 bg-emerald-500/10",
        },
        {
          label: "Teaching Experience",
          value: teachingExperience || "Not Declared",
          icon: ShieldCheck_2,
          color: "text-teal-600 bg-teal-500/10",
        },
      ];

      return (
        <div className="bg-card/85 border-border/50 rounded-2xl border p-4 shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 dark:shadow-emerald-950/[0.05] print:border-0 print:p-0">
          <h3 className="text-foreground border-border/40 mb-4 flex items-center gap-2 border-b pb-2 text-sm font-bold print:pb-1.5">
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:bg-transparent print:p-0">
              <Briefcase className="size-3.5" />
            </div>
            Professional Experience
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div
                  key={idx}
                  className="border-border/60 hover:border-foreground/10 group flex items-start gap-3 rounded-xl border bg-zinc-50/50 p-3 shadow-inner transition-colors dark:bg-zinc-900/30"
                >
                  <div
                    className={`shrink-0 rounded-lg p-2 ${exp.color} print:hidden`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-normal">
                      {exp.label}
                    </span>
                    <span className="text-foreground text-xs font-semibold leading-snug">
                      {exp.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {internshipExperience && (
            <div className="border-border/60 mt-4 space-y-1 rounded-xl border bg-zinc-50/50 p-3.5 shadow-inner dark:bg-zinc-900/30">
              <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-normal">
                Internship / Industry Mentorship Experience
              </span>
              <p className="text-foreground text-xs font-medium leading-relaxed">
                {internshipExperience}
              </p>
            </div>
          )}
        </div>
      );
    };

const handlePrint = () => {
    window.print();
  };


export default function InstructorProfileDashboardPage() {
    interface InstructorRegistrationResponse {
      id: string;
      instructorId: string;
      fullName: string;
      fatherSpouseName: string;
      dob: string;
      gender: string;
      mobileNo: string;
      alternateMobileNo: string | null;
      currentAddressLocal: string;
      currentAddressDistrict: string;
      currentAddressState: string;
      currentAddressCountry: string;
      currentAddressPinCode: string;
      sameAsCurrentAddress: boolean;
      permAddressLocal: string;
      permAddressDistrict: string;
      permAddressState: string;
      permAddressCountry: string;
      permAddressPinCode: string;
      currentOrganization: string;
      currentDesignation: string;
      totalWorkExperience: string;
      teachingExperience: string;
      internshipExperience: string;
      mentorshipAreas: string;
      preferredInternLevel: string[];
      maxInterns: string;
      mentorshipMode: string[];
      availability: string;
      selfIntroduction: string;
      photoUrl: string;
      photoName: string;
      identityProofUrl: string | null;
      identityProofName: string | null;
      educationCertUrl: string | null;
      educationCertName: string | null;
      experienceCertUrl: string | null;
      experienceCertName: string | null;
      agreeTerms: boolean;
      createdAt: string;
      updatedAt: string;
      userId: string;
      qualifications: TInstructorQualification[];
    }

    type GetInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

    type SubmitInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

    interface InstructorRegistrationPayload {
      fullName: string;
      fatherSpouseName: string;
      dob: string;
      gender: "Male" | "Female" | "Transgender";
      mobileNo: string;
      alternateMobileNo?: string;
      currentAddress: TInstructorAddress;
      sameAsCurrentAddress: boolean;
      permanentAddress: TInstructorAddress;
      qualifications: TInstructorQualification[];
      currentOrganization?: string;
      currentDesignation?: string;
      totalWorkExperience?: string;
      teachingExperience?: string;
      internshipExperience?: string;
      mentorshipAreas: string;
      preferredInternLevel: string[];
      maxInterns: string;
      mentorshipMode: string[];
      availability: string;
      selfIntroduction: string;
      photoBase64: string;
      photoName: string;
      identityProofBase64?: string;
      identityProofName?: string;
      educationCertBase64?: string;
      educationCertName?: string;
      experienceCertBase64?: string;
      experienceCertName?: string;
      agreeTerms: boolean;
    }

    type UpdateInstructorRegistrationResponse =
      ApiSuccess<InstructorRegistrationResponse>;

    type InstructorRegistrationUpdatePayload = Partial<
      Omit<
        InstructorRegistrationPayload,
        | "photoBase64"
        | "photoName"
        | "identityProofBase64"
        | "identityProofName"
        | "educationCertBase64"
        | "educationCertName"
        | "experienceCertBase64"
        | "experienceCertName"
      >
    >;

    interface IInstructorDataHooks {
        useInstructorDashboardStats: (
        options?: TQueryOptions<InstructorDashboardStatsResponse, Error>,
      ) => TQueryReturnType<InstructorDashboardStatsResponse, Error>;

      useInstructorProfile: (
        options?: TQueryOptions<InstructorProfileResponse, Error>,
      ) => TQueryReturnType<InstructorProfileResponse, Error>;

      useCreateUpdateInstructorProfile: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          FormData
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, FormData>;

        useInstructorRegistrationMe: (
        options?: TQueryOptions<GetInstructorRegistrationResponse, Error>,
      ) => TQueryReturnType<GetInstructorRegistrationResponse, Error>;

      useSubmitInstructorRegistration: (
        options?: TMutationOptions<
          SubmitInstructorRegistrationResponse,
          Error,
          InstructorRegistrationPayload
        >,
      ) => TMutationReturnType<
        SubmitInstructorRegistrationResponse,
        InstructorRegistrationPayload
      >;

      useUpdateInstructorRegistration: (
        options?: TMutationOptions<
          UpdateInstructorRegistrationResponse,
          Error,
          { id: string; payload: InstructorRegistrationUpdatePayload }
        >,
      ) => TMutationReturnType<
        UpdateInstructorRegistrationResponse,
        { id: string; payload: InstructorRegistrationUpdatePayload }
      >;

        useInstructorInternships: (
        params?: ListMyInternshipsParams,
        options?: TQueryOptions<ListInternshipsResponse, Error>,
      ) => TQueryReturnType<ListInternshipsResponse, Error>;

      usePostInternship: (
        options?: TMutationOptions<
          GetInternshipByIdResponse,
          Error,
          CreateInternshipPayload
        >,
      ) => TMutationReturnType<GetInternshipByIdResponse, CreateInternshipPayload>;

      useCreateRunningInternship: (
        options?: TMutationOptions<
          { success: boolean; data: Record<string, unknown>; message: string },
          Error,
          CreateInternshipPayload | Record<string, unknown>
        >,
      ) => TMutationReturnType<
        { success: boolean; data: Record<string, unknown>; message: string },
        CreateInternshipPayload | Record<string, unknown>
      >;

      useApproveInternshipPosting: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useRejectInternshipPosting: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useInternshipApplications: (
        id: string,
        options?: TQueryOptions<
          { success: boolean; data: StudentApplication[] },
          Error
        >,
      ) => TQueryReturnType<
        { success: boolean; data: StudentApplication[] },
        Error
      >;

      usePendingInternships: (
        options?: TQueryOptions<ListInternshipsResponse, Error>,
      ) => TQueryReturnType<ListInternshipsResponse, Error>;

      useInstructorStudents: (
        params?: ListMyStudentsParams,
        options?: TQueryOptions<
          { success: boolean; data: StudentApplication[] },
          Error
        >,
      ) => TQueryReturnType<
        { success: boolean; data: StudentApplication[] },
        Error
      >;

      useApproveRejectApplication: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          { id: string; appId: string; action: "approve" | "reject" }
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        { id: string; appId: string; action: "approve" | "reject" }
      >;

        useInstructorImmersions: (
        options?: TQueryOptions<ListImmersionsResponse, Error>,
      ) => TQueryReturnType<ListImmersionsResponse, Error>;

      useImmersionRegistrations: (
        immersionId: string,
        options?: TQueryOptions<
          { success: boolean; data: ImmersionRegistrationObject[] },
          Error
        >,
      ) => TQueryReturnType<
        { success: boolean; data: ImmersionRegistrationObject[] },
        Error
      >;

      useUpdateImmersionStatus: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          { regId: string; payload: UpdateImmersionStatusPayload }
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        { regId: string; payload: UpdateImmersionStatusPayload }
      >;

      useAcceptImmersionAssignment: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useRejectImmersionAssignment: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          { id: string; remarks?: string }
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        { id: string; remarks?: string }
      >;

        useInstructorSubmissions: (
        options?: TQueryOptions<ListSubmissionsResponse, Error>,
      ) => TQueryReturnType<ListSubmissionsResponse, Error>;

      useGradeSubmission: (
        options?: TMutationOptions<
          GradeSubmissionResponse,
          Error,
          { id: string; payload: GradeSubmissionPayload }
        >,
      ) => TMutationReturnType<
        GradeSubmissionResponse,
        { id: string; payload: GradeSubmissionPayload }
      >;

      useCompleteEnrollment: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          string
        >,
      ) => TMutationReturnType<{ success: boolean; message: string }, string>;

      useIssueCertificate: (
        options?: TMutationOptions<
          { success: boolean; message: string },
          Error,
          | {
              enrollmentId: string;
              signatureUrl?: string;
              grade?: string;
              credits?: string;
            }
          | string
        >,
      ) => TMutationReturnType<
        { success: boolean; message: string },
        | {
            enrollmentId: string;
            signatureUrl?: string;
            grade?: string;
            credits?: string;
          }
        | string
      >;

        useInstructorNotices: (
        options?: TQueryOptions<ListNoticesResponse, Error>,
      ) => TQueryReturnType<ListNoticesResponse, Error>;

      usePostNotice: (
        options?: TMutationOptions<
          CreateNoticeResponse,
          Error,
          CreateNoticePayload
        >,
      ) => TMutationReturnType<CreateNoticeResponse, CreateNoticePayload>;

        useMyTickets: (
        options?: TQueryOptions<ListTicketsResponse, Error>,
      ) => TQueryReturnType<ListTicketsResponse, Error>;

      useCreateTicket: (
        options?: TMutationOptions<
          CreateTicketResponse_2,
          Error,
          CreateTicketPayload_2
        >,
      ) => TMutationReturnType<CreateTicketResponse_2, CreateTicketPayload_2>;

        useInstructorIDCard: (
        options?: TQueryOptions<{ success: boolean; data: any }, Error>,
      ) => TQueryReturnType<{ success: boolean; data: any }, Error>;

      useDownloadInstructorIDCard: (
        options?: TMutationOptions<Blob, Error, void>,
      ) => TMutationReturnType<Blob, void>;
    }

    type ListInstructorRegistrationsResponse = ApiSuccess<
      InstructorRegistrationResponse[]
    >;

    interface IInstructorService {
        submitRegistration: (
        payload: InstructorRegistrationPayload,
      ) => Promise<SubmitInstructorRegistrationResponse>;
      getMyRegistration: () => Promise<GetInstructorRegistrationResponse>;
      listAllRegistrations: (
        params?: GetInstructorsParams,
      ) => Promise<ListInstructorRegistrationsResponse>;
      getRegistrationById: (
        id: string,
      ) => Promise<GetInstructorRegistrationResponse>;
      updateRegistration: (
        id: string,
        payload: InstructorRegistrationUpdatePayload,
      ) => Promise<UpdateInstructorRegistrationResponse>;
      deleteRegistration: (
        id: string,
      ) => Promise<DeleteInstructorRegistrationResponse>;

        submitOnboardingProfile: (
        formData: FormData,
      ) => Promise<{ success: boolean; message: string }>;
      getMyProfile: () => Promise<InstructorProfileResponse>;
      getPendingProfiles: () => Promise<ListPendingInstructorsResponse>;
      approveProfile: (id: string) => Promise<ApproveInstructorResponse>;
      rejectProfile: (id: string) => Promise<RejectInstructorResponse>;

        getDashboardStats: () => Promise<InstructorDashboardStatsResponse>;

        getMyInternships: (
        params?: ListMyInternshipsParams,
      ) => Promise<ListInternshipsResponse>;
      postInternship: (
        payload: CreateInternshipPayload,
      ) => Promise<GetInternshipByIdResponse>;
      createRunningInternship: (
        payload: CreateInternshipPayload | Record<string, unknown>,
      ) => Promise<{
        success: boolean;
        data: Record<string, unknown>;
        message: string;
      }>;
      getMyStudents: (
        params?: ListMyStudentsParams,
      ) => Promise<{ success: boolean; data: StudentApplication[] }>;
      approveApplication: (
        id: string,
        appId: string,
      ) => Promise<{ success: boolean; message: string }>;
      rejectApplication: (
        id: string,
        appId: string,
      ) => Promise<{ success: boolean; message: string }>;
      approveInternshipPosting: (
        id: string,
      ) => Promise<{ success: boolean; message: string }>;
      rejectInternshipPosting: (
        id: string,
      ) => Promise<{ success: boolean; message: string }>;
      getInternshipApplications: (
        id: string,
      ) => Promise<{ success: boolean; data: StudentApplication[] }>;
      getPendingInternships: () => Promise<ListInternshipsResponse>;

        getMyImmersions: () => Promise<ListImmersionsResponse>;
      getImmersionRegistrations: (
        immersionId: string,
      ) => Promise<{ success: boolean; data: ImmersionRegistrationObject[] }>;
      updateImmersionStatus: (
        regId: string,
        payload: UpdateImmersionStatusPayload,
      ) => Promise<{ success: boolean; message: string }>;
      acceptImmersionAssignment: (
        immersionId: string,
      ) => Promise<{ success: boolean; message: string }>;
      rejectImmersionAssignment: (
        immersionId: string,
        remarks?: string,
      ) => Promise<{ success: boolean; message: string }>;

        getMySubmissions: () => Promise<ListSubmissionsResponse>;
      gradeSubmission: (
        id: string,
        payload: GradeSubmissionPayload,
      ) => Promise<GradeSubmissionResponse>;
      completeEnrollment: (
        enrollmentId: string,
      ) => Promise<{ success: boolean; message: string }>;
      issueCertificate: (
        payload:
          | {
              enrollmentId: string;
              signatureUrl?: string;
              grade?: string;
              credits?: string;
            }
          | string,
      ) => Promise<{ success: boolean; message: string }>;

        listNotices: () => Promise<ListNoticesResponse>;
      createNotice: (payload: CreateNoticePayload) => Promise<CreateNoticeResponse>;

        getMyTickets: () => Promise<ListTicketsResponse>;
      createTicket: (payload: CreateTicketPayload_2) => Promise<CreateTicketResponse_2>;
      getIDCard: () => Promise<{ success: boolean; data: any }>;
      downloadIDCard: () => Promise<Blob>;
    }

    const InstructorService: IInstructorService = {
        async submitRegistration(payload) {
        const response =
          await axiosInstance.post<SubmitInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER,
            payload,
          );
        return response.data;
      },

      async getMyRegistration() {
        const response = await axiosInstance.get<GetInstructorRegistrationResponse>(
          ENDPOINTS.INSTRUCTOR.REGISTER_ME,
        );
        return response.data;
      },

      async listAllRegistrations(params) {
        const response =
          await axiosInstance.get<ListInstructorRegistrationsResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_ADMIN,
            { params },
          );
        return response.data;
      },

      async getRegistrationById(id) {
        const response = await axiosInstance.get<GetInstructorRegistrationResponse>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateRegistration(id, payload) {
        const response =
          await axiosInstance.patch<UpdateInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
            payload,
          );
        return response.data;
      },

      async deleteRegistration(id) {
        const response =
          await axiosInstance.delete<DeleteInstructorRegistrationResponse>(
            ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
          );
        return response.data;
      },

        async submitOnboardingProfile(formData) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.PROFILE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      },

      async getMyProfile() {
        const response = await axiosInstance.get<InstructorProfileResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILE,
        );
        return response.data;
      },

      async getPendingProfiles() {
        const response = await axiosInstance.get<ListPendingInstructorsResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_PENDING,
        );
        return response.data;
      },

      async approveProfile(id) {
        const response = await axiosInstance.patch<ApproveInstructorResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_APPROVE(id),
        );
        return response.data;
      },

      async rejectProfile(id) {
        const response = await axiosInstance.patch<RejectInstructorResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_REJECT(id),
        );
        return response.data;
      },

        async getDashboardStats() {
        const response = await axiosInstance.get<InstructorDashboardStatsResponse>(
          ENDPOINTS.INSTRUCTOR.DASHBOARD,
        );
        return response.data;
      },

        async getMyInternships(params) {
        const response = await axiosInstance.get<ListInternshipsResponse>(
          ENDPOINTS.INSTRUCTOR.MY_INTERNSHIPS,
          { params },
        );
        return response.data;
      },

      async postInternship(payload) {
        const response = await axiosInstance.post<GetInternshipByIdResponse>(
          ENDPOINTS.INTERNSHIPS.BASE,
          payload,
        );
        return response.data;
      },

      async createRunningInternship(payload) {
        const response = await axiosInstance.post<{
          success: boolean;
          data: Record<string, unknown>;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.RUNNING_INTERNSHIPS, payload);
        return response.data;
      },

      async approveInternshipPosting(id) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INTERNSHIPS.APPROVE_POSTING(id));
        return response.data;
      },

      async rejectInternshipPosting(id) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INTERNSHIPS.REJECT_POSTING(id));
        return response.data;
      },

      async getInternshipApplications(id) {
        const response = await axiosInstance.get<{
          success: boolean;
          data: StudentApplication[];
        }>(ENDPOINTS.INTERNSHIPS.APPLICATIONS(id));
        return response.data;
      },

      async getPendingInternships() {
        const response = await axiosInstance.get<ListInternshipsResponse>(
          ENDPOINTS.INTERNSHIPS.PENDING,
        );
        return response.data;
      },

      async getMyStudents(params) {
        const response = await axiosInstance.get<{
          success: boolean;
          data: StudentApplication[];
        }>(ENDPOINTS.INSTRUCTOR.MY_STUDENTS, { params });
        return response.data;
      },

      async approveApplication(id, appId) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.APPROVE_APPLICATION(id, appId));
        return response.data;
      },

      async rejectApplication(id, appId) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.REJECT_APPLICATION(id, appId));
        return response.data;
      },

        async getMyImmersions() {
        const response = await axiosInstance.get<ListImmersionsResponse>(
          ENDPOINTS.INSTRUCTOR.IMMERSIONS,
        );
        return response.data;
      },

      async getImmersionRegistrations(immersionId) {
        void immersionId;
        const response = await axiosInstance.get<{
          success: boolean;
          data: ImmersionRegistrationObject[];
        }>(`/immersion/registrations/my`);
        return response.data;
      },

      async acceptImmersionAssignment(immersionId) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.IMMERSION_ACCEPT(immersionId));
        return response.data;
      },

      async rejectImmersionAssignment(immersionId, remarks) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(ENDPOINTS.INSTRUCTOR.IMMERSION_REJECT(immersionId), { remarks });
        return response.data;
      },

      async updateImmersionStatus(regId, payload) {
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(`/immersion/registrations/${regId}/status`, payload);
        return response.data;
      },

        async getMySubmissions() {
        const response = await axiosInstance.get<ListSubmissionsResponse>(
          ENDPOINTS.INSTRUCTOR.SUBMISSIONS,
        );
        return response.data;
      },

      async gradeSubmission(id, payload) {
        const response = await axiosInstance.post<GradeSubmissionResponse>(
          ENDPOINTS.INSTRUCTOR.SUBMISSIONS_GRADE(id),
          payload,
        );
        return response.data;
      },

      async completeEnrollment(enrollmentId) {
        const response = await axiosInstance.patch<{
          success: boolean;
          message: string;
        }>(`/enrollments/${enrollmentId}/complete`);
        return response.data;
      },

      async issueCertificate(
        payload:
          | {
              enrollmentId: string;
              signatureUrl?: string;
              grade?: string;
              credits?: string;
            }
          | string,
      ) {
        const enrollmentId =
          typeof payload === "string" ? payload : payload.enrollmentId;
        const signatureUrl =
          typeof payload === "object" ? payload.signatureUrl : undefined;
        const grade = typeof payload === "object" ? payload.grade : undefined;
        const credits = typeof payload === "object" ? payload.credits : undefined;
        const response = await axiosInstance.post<{
          success: boolean;
          message: string;
        }>(`/enrollments/${enrollmentId}/issue-certificate`, {
          signatureUrl,
          grade,
          credits,
        });
        return response.data;
      },

        async listNotices() {
        const response = await axiosInstance.get<ListNoticesResponse>(
          ENDPOINTS.NOTICES.BASE,
        );
        return response.data;
      },

      async createNotice(payload) {
        const response = await axiosInstance.post<CreateNoticeResponse>(
          ENDPOINTS.NOTICES.BASE,
          payload,
        );
        return response.data;
      },

        async getMyTickets() {
        const response = await axiosInstance.get<ListTicketsResponse>(
          ENDPOINTS.TICKETS.MY_TICKETS,
        );
        return response.data;
      },

      async createTicket(payload) {
        const response = await axiosInstance.post<CreateTicketResponse_2>(
          ENDPOINTS.TICKETS.BASE,
          payload,
        );
        return response.data;
      },

      async getIDCard() {
        const response = await axiosInstance.get<{ success: boolean; data: any }>(
          ENDPOINTS.INSTRUCTOR.ID_CARD,
        );
        return response.data;
      },

      async downloadIDCard() {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.INSTRUCTOR.DOWNLOAD_ID_CARD,
          { responseType: "blob" },
        );
        return response.data;
      },
    };

    const InstructorDataHooks: IInstructorDataHooks = {
        useInstructorDashboardStats(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
          queryFn: async () => await InstructorService.getDashboardStats(),
          ...options,
        });
      },

        useInstructorProfile(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.PROFILE(),
          queryFn: async () => await InstructorService.getMyProfile(),
          ...options,
        });
      },

      useCreateUpdateInstructorProfile(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (formData) =>
            await InstructorService.submitOnboardingProfile(formData),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PROFILE(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Onboarding profile saved successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit onboarding profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorRegistrationMe(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.REGISTRATION_ME(),
          queryFn: async () => await InstructorService.getMyRegistration(),
          ...options,
        });
      },

      useSubmitInstructorRegistration(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.submitRegistration(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.REGISTRATION_ME(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Instructor registration submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit registration.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useUpdateInstructorRegistration(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await InstructorService.updateRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.REGISTRATION_ME(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update registration.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorInternships(params, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(params),
          queryFn: async () => await InstructorService.getMyInternships(params),
          ...options,
        });
      },

      usePostInternship(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.postInternship(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship listing posted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to post internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useCreateRunningInternship(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.createRunningInternship(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Running Internship proposed successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to propose running internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useApproveInternshipPosting(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await InstructorService.approveInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship posting approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to approve internship posting.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useRejectInternshipPosting(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await InstructorService.rejectInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIPS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship posting rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to reject internship posting.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useInternshipApplications(id, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIP_APPLICATIONS(id),
          queryFn: async () =>
            await InstructorService.getInternshipApplications(id),
          enabled: !!id,
          ...options,
        });
      },

      usePendingInternships(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.PENDING_INTERNSHIPS,
          queryFn: async () => await InstructorService.getPendingInternships(),
          ...options,
        });
      },

      useInstructorStudents(params, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(params),
          queryFn: async () => await InstructorService.getMyStudents(params),
          ...options,
        });
      },

      useApproveRejectApplication(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, appId, action }) => {
            if (action === "approve") {
              return await InstructorService.approveApplication(id, appId);
            } else {
              return await InstructorService.rejectApplication(id, appId);
            }
          },
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.INTERNSHIP_APPLICATIONS(variables.id),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                `Application ${variables.action}d successfully!`,
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(
              error.message || `Failed to ${variables.action} application.`,
            );
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorImmersions(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSIONS(),
          queryFn: async () => await InstructorService.getMyImmersions(),
          ...options,
        });
      },

      useImmersionRegistrations(immersionId, options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSION_REGS(immersionId),
          queryFn: async () =>
            await InstructorService.getImmersionRegistrations(immersionId),
          enabled: !!immersionId,
          ...options,
        });
      },

      useUpdateImmersionStatus(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ regId, payload }) =>
            await InstructorService.updateImmersionStatus(regId, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: INSTRUCTOR_QUERY_KEYS.ALL });
            toast.success(
              (data as { message?: string })?.message ||
                "Immersion status updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update status.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useAcceptImmersionAssignment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await InstructorService.acceptImmersionAssignment(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSIONS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Immersion program accepted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to accept immersion program.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useRejectImmersionAssignment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, remarks }) =>
            await InstructorService.rejectImmersionAssignment(id, remarks),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.IMMERSIONS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Immersion program rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to reject immersion program.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorSubmissions(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.SUBMISSIONS(),
          queryFn: async () => await InstructorService.getMySubmissions(),
          ...options,
        });
      },

      useGradeSubmission(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await InstructorService.gradeSubmission(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.SUBMISSIONS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Submission graded successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to grade submission.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useCompleteEnrollment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (enrollmentId) =>
            await InstructorService.completeEnrollment(enrollmentId),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: ["instructors", "internship"],
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Internship marked as completed!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to complete internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

      useIssueCertificate(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (
            payload:
              | {
                  enrollmentId: string;
                  signatureUrl?: string;
                  grade?: string;
                  credits?: string;
                }
              | string,
          ) => await InstructorService.issueCertificate(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: ["instructors", "internship"],
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STUDENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.STATS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Certificate issued successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to issue certificate.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorNotices(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.NOTICES(),
          queryFn: async () => await InstructorService.listNotices(),
          ...options,
        });
      },

      usePostNotice(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.createNotice(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.NOTICES(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Notice published successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to publish notice.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useMyTickets(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.TICKETS(),
          queryFn: async () => await InstructorService.getMyTickets(),
          ...options,
        });
      },

      useCreateTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await InstructorService.createTicket(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: INSTRUCTOR_QUERY_KEYS.TICKETS(),
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Support ticket raised successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to raise support ticket.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useInstructorIDCard(options) {
        return useQuery({
          queryKey: INSTRUCTOR_QUERY_KEYS.ID_CARD(),
          queryFn: async () => await InstructorService.getIDCard(),
          ...options,
        });
      },

      useDownloadInstructorIDCard(options) {
        return useMutation({
          mutationFn: async () => await InstructorService.downloadIDCard(),
          ...options,
        });
      },
    };

    function useAuth() {
      return useContext(AuthContext);
    }

    interface TInstructorAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

    interface ProfileAddressProps {
      currentAddress: TInstructorAddress;
      permanentAddress: TInstructorAddress;
    }

    const ProfileAddress: React_2.FC<ProfileAddressProps> = ({
      currentAddress,
      permanentAddress,
    }) => {
      return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 print:grid-cols-2">
          {}
          <div className="bg-card/85 border-border/50 group relative overflow-hidden rounded-2xl border p-4 shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 dark:shadow-emerald-950/[0.05] print:border-0 print:p-0">
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-emerald-500/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <h4 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold print:mb-1.5">
              <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:bg-transparent print:p-0">
                <MapPin className="size-3.5" />
              </div>
              Current Address Coordinate
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                  Street / Building
                </span>
                <p className="text-foreground text-xs font-medium leading-tight">
                  {currentAddress.local || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-2.5 print:border-0 print:bg-transparent print:p-0">
                  <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                    District / Pin
                  </span>
                  <p className="text-foreground text-xs font-medium leading-tight">
                    {currentAddress.district} ({currentAddress.pinCode})
                  </p>
                </div>

                <div className="bg-muted/20 dark:bg-muted/10 border-border/15 rounded-xl border p-3 print:border-0 print:bg-transparent print:p-0">
                  <span className="text-muted-foreground mb-0.5 block text-[9px] font-semibold uppercase tracking-normal">
                    State / Country
                  </span>
                  <p className="text-foreground text-xs font-medium leading-tight">
                    {currentAddress.state}, {currentAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="bg-card/85 border-border/50 group relative overflow-hidden rounded-2xl border p-4 shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 dark:shadow-emerald-950/[0.05] print:border-0 print:p-0">
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

    interface TInstructorQualification {
      id?: string;
      highestQualification: string;
      specialization: string;
      universityName: string;
      yearOfCompletion: string;
      percentage: string;
    }

    interface ProfileEducationProps {
      qualifications: TInstructorQualification[];
    }

    const ProfileEducation: React_2.FC<ProfileEducationProps> = ({
      qualifications,
    }) => {
      return (
        <div className="bg-card/85 border-border/50 rounded-2xl border p-4 shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md sm:p-5 dark:shadow-emerald-950/[0.05] print:border-0 print:p-0">
          <h3 className="text-foreground border-border/40 mb-4 flex items-center gap-2 border-b pb-2 text-sm font-bold print:pb-1.5">
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:bg-transparent print:p-0">
              <GraduationCap className="size-3.5" />
            </div>
            Educational Credentials
          </h3>

          <div className="border-border/60 bg-background/50 overflow-hidden rounded-xl border">
            <ScrollArea className="w-full">
              <table className="w-full min-w-[750px] border-collapse text-left text-xs print:min-w-full">
                <TableHeader>
                  <TableRow className="bg-muted/50 dark:bg-muted/15 hover:bg-muted/50 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                    <TableHead className="p-3 font-bold">Qualification</TableHead>
                    <TableHead className="p-3 font-bold">Specialization</TableHead>
                    <TableHead className="p-3 font-bold">
                      Institution / University
                    </TableHead>
                    <TableHead className="p-3 font-bold">
                      Year of Completion
                    </TableHead>
                    <TableHead className="p-3 text-right font-bold">
                      Grade / Percentage
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualifications && qualifications.length > 0 ? (
                    qualifications.map((q, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-muted/15 dark:hover:bg-muted/5 border-border/40 border-b text-[11px] transition-colors last:border-0"
                      >
                        <TableCell className="text-foreground p-3 font-semibold">
                          {q.highestQualification}
                        </TableCell>
                        <TableCell className="text-muted-foreground p-3">
                          <span className="text-foreground text-xs font-semibold">
                            {q.specialization}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground p-3">
                          <span className="text-foreground text-xs font-semibold">
                            {q.universityName}
                          </span>
                        </TableCell>
                        <TableCell className="text-foreground p-3 font-mono font-semibold">
                          {q.yearOfCompletion}
                        </TableCell>
                        <TableCell className="text-foreground p-3 text-right font-medium">
                          {q.percentage}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground p-6 text-center"
                      >
                        No educational qualifications recorded.
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
    const ProfileHeader: React_3.FC<ProfileHeaderProps> = ({
      fullName,
      instructorId,
      photoUrl,
      createdAt,
      isApproved,
      handlePrint,
      handleEditSubmission,
    }) => {
      const [copied, setCopied] = useState(false);
      const [imgError, setImgError] = useState(false);

      const copyToClipboard = () => {
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(instructorId);
          setCopied(true);
          toast.success("Instructor ID copied to clipboard!");
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
        <div className="bg-card/85 border-border/50 relative overflow-hidden rounded-2xl border shadow-lg shadow-emerald-500/[0.02] backdrop-blur-md dark:shadow-emerald-950/[0.05] print:rounded-none print:border-0">
          {}
          <div className="relative h-28 w-full overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-600 sm:h-36 print:hidden">
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
                    {getInitials_3(fullName)}
                  </div>
                )}
              </div>

              {}
              <div className="space-y-1 text-center sm:text-left print:text-left">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                  <h2 className="text-foreground text-xl font-bold leading-none tracking-tight sm:text-2xl">
                    {fullName}
                  </h2>
                  {isApproved ? (
                    <div className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 print:border-emerald-500">
                      <ShieldCheck className="size-3" />
                      Approved
                    </div>
                  ) : (
                    <div className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-amber-500/15 bg-amber-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 print:border-amber-500">
                      <ShieldAlert className="size-3 animate-pulse" />
                      Pending Approval
                    </div>
                  )}
                </div>

                <div className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs sm:justify-start">
                  <span>Instructor ID:</span>
                  <code className="text-primary bg-primary/5 border-primary/10 select-all rounded border px-1.5 py-0.5 font-mono font-semibold tracking-wider print:border-0 print:bg-transparent">
                    {instructorId}
                  </code>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors print:hidden"
                    title="Copy Instructor ID"
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
    InstructorDataHooks.useInstructorRegistrationMe({
      enabled: !!user?.id,
      retry: false,
    });

  const { data: profileResponse, isLoading: isProfileLoading } =
    InstructorDataHooks.useInstructorProfile({
      enabled: !!user?.id,
      retry: false,
    });
  const handleEditSubmission = () => {
    router.push("/instructor/registration?edit=true");
  };

  const isLoading = isRegLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="border-primary size-12 animate-spin rounded-full border-4 border-t-transparent shadow-md" />
        <p className="text-muted-foreground animate-pulse text-sm font-semibold">
          Loading registration profile...
        </p>
      </div>
    );
  }

  const isRegistered =
    regMeResponse && regMeResponse.success && regMeResponse.data;

  if (!isRegistered) {
    return (
      <div className="bg-card/85 border-border/50 animate-in fade-in slide-in-from-bottom-6 duration-400 relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border p-8 shadow-xl shadow-emerald-500/[0.02] backdrop-blur-md dark:shadow-emerald-950/[0.05]">
        <div className="bg-primary/10 pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full blur-3xl" />
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="bg-primary/10 text-primary border-primary/20 flex size-16 items-center justify-center rounded-2xl border shadow-sm">
            <Award className="size-9 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-foreground text-2xl font-extrabold tracking-tight md:text-3xl">
              Instructor Registration Setup
            </h2>
            <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
              You haven&apos;t completed your instructor registration profile
              yet. Please complete your registration to start mentoring and
              evaluating students.
            </p>
          </div>
          <div className="border-border/60 grid w-full max-w-md grid-cols-4 gap-2 border-y py-4">
            {["Profile", "Qualifications", "Mentorship", "Documents"].map(
              (step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center space-y-1 text-center"
                >
                  <div className="bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-full border text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-foreground max-w-full truncate text-[10px] font-bold">
                    {step}
                  </span>
                </div>
              ),
            )}
          </div>
          <Button
            onClick={() => router.push("/instructor/registration")}
            className="bg-primary text-primary-foreground hover:bg-primary/95 active:scale-98 group h-11 w-full max-w-xs gap-2 rounded-xl font-semibold shadow-md transition-all"
          >
            Start Registration Wizard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <ShieldAlert className="text-primary size-4" />
            <span>Takes about 6–10 minutes to complete</span>
          </div>
        </div>
      </div>
    );
  }

  const s = regMeResponse.data;
  const isApproved = !!profileResponse?.data?.isApproved;

    const currentAddress = {
    local: s.currentAddressLocal || "",
    district: s.currentAddressDistrict || "",
    state: s.currentAddressState || "",
    country: s.currentAddressCountry || "India",
    pinCode: s.currentAddressPinCode || "",
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
      {!isApproved && (
        <div className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-600 dark:bg-amber-500/5 dark:text-amber-400 print:hidden">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 animate-pulse" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">
              Profile Pending Admin Verification
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Your onboarding profile is currently pending review by the admin
              team. You will have full access to class rosters, evaluations, and
              certifications once verified.
            </p>
          </div>
        </div>
      )}

      {}
      <ProfileHeader
        fullName={s.fullName}
        instructorId={s.instructorId}
        photoUrl={s.photoUrl}
        createdAt={s.createdAt}
        isApproved={isApproved}
        handlePrint={handlePrint}
        handleEditSubmission={handleEditSubmission}
      />

      {}
      <ProfilePersonal
        fatherSpouseName={s.fatherSpouseName}
        dob={s.dob}
        gender={s.gender}
        mobileNo={s.mobileNo}
        alternateMobileNo={s.alternateMobileNo || undefined}
        email={user?.email || "N/A"}
        instructorId={s.instructorId}
      />

      {}
      <ProfileAddress
        currentAddress={currentAddress}
        permanentAddress={permanentAddress}
      />

      {}
      <ProfileEducation qualifications={s.qualifications || []} />

      {}
      <ProfileProfessional
        currentOrganization={s.currentOrganization}
        currentDesignation={s.currentDesignation}
        totalWorkExperience={s.totalWorkExperience}
        teachingExperience={s.teachingExperience}
        internshipExperience={s.internshipExperience}
      />

      {}
      <ProfileMentorship
        mentorshipAreas={s.mentorshipAreas}
        preferredInternLevel={s.preferredInternLevel || []}
        maxInterns={s.maxInterns}
        mentorshipMode={s.mentorshipMode || []}
        availability={s.availability}
        selfIntroduction={s.selfIntroduction}
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
