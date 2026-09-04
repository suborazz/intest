"use client";

import type { Metadata } from "next";
import { BookOpen, Calendar, CheckCircle2, Clock as Clock_2, Code, Download, IdCard as IdCardIcon } from "lucide-react";
import React_3 from "react";
import React_2 from "react";
import { useState } from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import axios from "axios";
import { AxiosInstance } from "axios";
import { toast } from "sonner";
import Image_2 from "next/image";
import * as React from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { XIcon } from "lucide-react";
import { Slot } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "@/x/acfb3dca";

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

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

interface EnrollmentIDCard {
  cardNo: string;
  issuedAt: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  studentAddress: string;
  photoUrl?: string;
  internshipId: string;
  internshipTitle: string;
  internshipLocation: string;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/80 duration-100",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <SheetPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 text-xs/relaxed outline-none ring-1 duration-100 sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-2"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </DialogPortal>
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground text-xs/relaxed",
        className,
      )}
      {...props}
    />
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-sm font-medium", className)}
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

type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface DashboardStats {
      totalApplied: number;
      totalEnrolled: number;
      totalCompleted: number;
      totalCertificates: number;
    }

type ApplicationStatus =
      "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "WAITING";

interface DashboardRecentApplication {
      id: string;
      status: ApplicationStatus;
      appliedAt: string;
      internship: {
        id: string;
        title: string;
        companyName: string;
      };
    }

interface DashboardRecentEnrollment {
      id: string;
      createdAt: string;
      internship: {
        id: string;
        title: string;
        companyName: string;
        location: string;
        mode: string;
        duration: string;
        startDate: string | null;
        instructor: { id: string; name: string; email: string } | null;
      };
    }

interface DashboardRecentCertificate {
      id: string;
      certificateNo: string;
      issuedAt: string;
    }

interface DashboardRecentNotice {
      id: string;
      title: string;
      description: string;
      content?: string;
      category: string;
      createdAt: string;
      sender: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }

interface DashboardRecentSubmission {
      id: string;
      projectTitle: string;
      projectUrl: string;
      comments: string | null;
      status: "PENDING" | "GRADED";
      grade: string | null;
      feedback: string | null;
      createdAt: string;
      enrollment: {
        internship: {
          title: string;
        };
      };
      gradedBy: {
        name: string;
      } | null;
    }

interface StudentDashboardData {
      stats: DashboardStats;
      recentApplications: DashboardRecentApplication[];
      recentEnrollments: DashboardRecentEnrollment[];
      recentCertificates: DashboardRecentCertificate[];
      recentNotices: DashboardRecentNotice[];
      recentSubmissions: DashboardRecentSubmission[];
    }

interface GetStudentDashboardResponse {
      success: boolean;
      data: StudentDashboardData;
    }

type TQueryReturnType<TData, TError = Error> = UseQueryResult<
      TData,
      TError
    >;

type InternshipType = "PAID" | "STIPEND" | "FREE";

interface ListInternshipsParams {
      page?: number;
      limit?: number;
      type?: InternshipType;
      search?: string;
      category?: string;
    }

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

type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

interface ApplyForInternshipResponse {
      success: boolean;
      message: string;
      data: {
        id: string;
        status: ApplicationStatus;
        appliedAt: string;
      };
    }

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

interface CheckApplicationStatusResponse {
      success: boolean;
      data: {
        id: string;
        status: ApplicationStatus;
        reviewNote: string | null;
      };
    }

interface ApplicationInternshipSummary {
      id?: string;
      title: string;
      companyName: string;
      type?: InternshipType;
      mode?: string;
      location?: string;
      duration?: string;
    }

interface InternshipApplication {
      id: string;
      status: ApplicationStatus;
      appliedAt: string;
      reviewNote?: string | null;
      internship: ApplicationInternshipSummary;
      studentName?: string;
      address?: string;
      student?: {
        id: string;
        name?: string | null;
        email?: string | null;
        studentRegistration?: {
          fullName?: string | null;
          localAddressLocal?: string | null;
          localAddressBlock?: string | null;
          localAddressDistrict?: string | null;
          localAddressState?: string | null;
          localAddressCountry?: string | null;
          localAddressPinCode?: string | null;
        } | null;
      } | null;
    }

interface ListMyApplicationsResponse {
      success: boolean;
      data: InternshipApplication[];
    }

interface EnrollmentInternshipSummary {
      id: string;
      title: string;
      companyName: string;
      mentor?: { name: string } | null;
    }

interface MyEnrollment {
      id: string;
      createdAt: string;
      completedAt: string | null;
      internship: EnrollmentInternshipSummary;
    }

interface ListMyEnrollmentsResponse {
      success: boolean;
      data: MyEnrollment[];
    }

interface DirectEnrollResponse {
      success: boolean;
      data: {
        enrollmentId: string;
        internshipId: string;
        createdAt: string;
      };
    }

interface MyCertificate {
      id: string;
      certificateNo: string;
      issuedAt: string;
      signatureUrl?: string | null;
      studentId?: string | null;
      grade?: string | null;
      credits?: string | null;
      internship: {
        id: string;
        title: string;
        companyName: string;
        location: string;
        duration: string;
        mode: string;
        credits?: string | null;
      };
      issuedBy: {
        id: string;
        name: string;
      };
    }

interface ListMyCertificatesResponse {
      success: boolean;
      data: MyCertificate[];
    }

interface AssignGradeResponse {
      success: boolean;
      message: string;
      data: {
        id: string;
        certificateNo: string;
        grade: string;
        credits: string | null;
      };
    }

interface AssignGradeRequest {
      grade: string;
    }

type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

interface ListMyPaymentsParams {
      page?: number;
      limit?: number;
      status?: PaymentStatus;
      search?: string;
    }

interface PaymentPublic {
      id: string;
      amount: number;
      currency: string;
      status: PaymentStatus;
      razorpayOrderId: string;
      razorpayPaymentId: string | null;
      razorpaySignature: string | null;
      refundId: string | null;
      createdAt: string;
      updatedAt: string;
      userId: string;
      internshipId: string;
    }

interface ListMyPaymentsResponse {
      success: boolean;
      data: PaymentPublic[];
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }

interface PaymentReceiptData {
      id: string;
      amount: number;
      status: PaymentStatus;
      createdAt: string;
      razorpayOrderId: string;
      razorpayPaymentId: string | null;
      user?: {
        id: string;
        name: string;
        email: string;
      };
      internship?: {
        id: string;
        title: string;
        companyName: string;
        duration: string;
      };
    }

interface GetPaymentReceiptResponse {
      success: boolean;
      data: PaymentReceiptData;
    }

interface CreateOrderResponseData {
      paymentId: string;
      razorpayOrderId: string;
      amount: number;
      currency: string;
      keyId: string;
      isMockMode: boolean;
    }

interface CreateOrderResponse {
      success: boolean;
      data: CreateOrderResponseData;
    }

interface CreateOrderPayload {
      internshipId: string;
    }

interface VerifySignatureResponseData {
      paymentId: string;
      enrollmentId: string;
      status: string;
    }

interface VerifySignatureResponse {
      success: boolean;
      data: VerifySignatureResponseData;
    }

interface VerifySignaturePayload {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    }

interface RefundResponseData {
      id: string;
      paymentId: string;
      amount: number;
      status: string;
      createdAt: string;
    }

interface RefundResponse {
      success: boolean;
      data: RefundResponseData;
    }

interface RefundPayload {
      paymentId: string;
      amount?: number;
    }

interface ListAllPaymentsResponse {
      success: boolean;
      data: PaymentPublic[];
    }

type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface SupportTicket {
      id: string;
      ticketNo: string;
      title: string;
      description: string;
      status: TicketStatus;
      priority: TicketPriority;
      createdAt: string;
      updatedAt: string;
      userId: string;
      subject?: string;
      message?: string;
    }

interface CreateTicketResponse {
      success: boolean;
      data: SupportTicket;
    }

interface CreateTicketPayload {
      title: string;
      description: string;
      priority?: TicketPriority;
    }

interface ListMyTicketsResponse {
      success: boolean;
      data: SupportTicket[];
    }

interface DeleteTicketResponse {
      success: boolean;
      message: string;
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

interface Feedback {
      id: string;
      enrollmentId: string;
      senderId: string;
      receiverId: string;
      type: "STUDENT_TO_INSTRUCTOR" | "INSTRUCTOR_TO_STUDENT";
      rating: number;
      comments: string;
      createdAt: string;
      updatedAt: string;
    }

interface FeedbackResponse {
      success: boolean;
      data: Feedback;
      message?: string;
    }

interface FeedbackPayload {
      enrollmentId: string;
      rating: number;
      comments: string;
    }

interface MyFeedbacksResponse {
      success: boolean;
      data: {
        sent: Feedback[];
        received: Feedback[];
      };
    }

interface Review {
      id: string;
      name: string;
      email: string;
      role: string | null;
      rating: number;
      comment: string;
      avatarUrl: string | null;
      isApproved: boolean;
      approvedAt: string | null;
      createdAt: string;
      updatedAt: string;
    }

interface MyReviewsResponse {
      success: boolean;
      data: Review[];
    }

interface VerifyIDCardResponse {
      success: boolean;
      data: {
        cardNo: string;
        status: string;
      };
    }

interface ProjectSubmission {
      id: string;
      enrollmentId: string;
      projectTitle: string;
      projectUrl: string;
      comments: string | null;
      status: "PENDING" | "GRADED";
      grade: string | null;
      feedback: string | null;
      createdAt: string;
      updatedAt: string;
      gradedBy?: {
        name: string;
      } | null;
    }

interface SubmitProjectResponse {
      success: boolean;
      message?: string;
      data: ProjectSubmission;
    }

interface SubmitProjectPayload {
      enrollmentId: string;
      projectTitle: string;
      projectUrl: string;
      comments?: string;
    }

interface ListEnrollmentSubmissionsResponse {
      success: boolean;
      message?: string;
      data: ProjectSubmission[];
    }

interface UpdateSubmissionResponse {
      success: boolean;
      message?: string;
      data: ProjectSubmission;
    }

interface UpdateSubmissionPayload {
      projectTitle: string;
      projectUrl: string;
      comments?: string;
    }

interface DeleteSubmissionResponse {
      success: boolean;
      message?: string;
      data: null;
    }

const STUDENT_QUERY_KEYS = {
      ALL: ["students"] as const,
      DASHBOARD: ["students", "dashboard"] as const,
      INTERNSHIPS: (params?: ListInternshipsParams) =>
        ["students", "internships", params] as const,
      INTERNSHIP: (id: string) => ["students", "internship", id] as const,
      APPLICATION_STATUS: (id: string) =>
        ["students", "application-status", id] as const,
      MY_APPLICATIONS: ["students", "my-applications"] as const,
      MY_ENROLLMENTS: ["students", "my-enrollments"] as const,
      ENROLLMENT_ID_CARD: (id: string) => ["students", "id-card", id] as const,
      MY_CERTIFICATES: ["students", "my-certificates"] as const,
      MY_PAYMENTS: (params?: ListMyPaymentsParams) =>
        ["students", "my-payments", params] as const,
      PAYMENT_RECEIPT: (id: string) => ["students", "payment-receipt", id] as const,
      ALL_PAYMENTS: ["payments"] as const,
      MY_TICKETS: ["students", "my-tickets"] as const,
      NOTICES: ["notices"] as const,
      FEEDBACKS: ["students", "feedbacks"] as const,
      MY_REVIEWS: ["students", "my-reviews"] as const,
      VERIFY_ID_CARD: (id: string) => ["id-card", "verify", id] as const,
      ENROLLMENT_SUBMISSIONS: (id: string) =>
        ["students", "enrollment-submissions", id] as const,
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

interface NoDataFoundProps {
      title: string;
      description?: string;
      action?: React_2.ReactNode;
    }

function NoDataFound_2({
      title,
      description,
      action,
    }: NoDataFoundProps) {
      return (
        <div className="flex flex-col items-center justify-center space-y-5 py-16 text-center">
          <div className="pointer-events-none relative h-52 w-52 select-none">
            <Image_2
              src="/images/no-data-found.png"
              alt="No data found"
              fill
              className="object-contain opacity-90"
              priority={false}
            />
          </div>

          <div className="max-w-xs space-y-2">
            <p className="text-foreground text-base font-bold">{title}</p>
            {description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      );
    }

interface EnrollmentCardProps {
      enrollment: MyEnrollment;
    }

interface IDCardDialogProps {
      enrollmentId: string;
      internshipTitle: string;
      open: boolean;
      onClose: () => void;
    }

function Dialog_8({
      ...props
    }: React_3.ComponentProps<typeof SheetPrimitive.Root>) {
      return <SheetPrimitive.Root data-slot="dialog" {...props} />;
    }

function formatInternshipCode_3(
      code?: string | null,
      companyName?: string | null,
    ): string {
      if (!code) return "IN2026XX10001";

      const trimmed = code.trim();
      if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }

      const sourceText = companyName && companyName.trim() ? companyName : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }

      let hash = 0;
      for (let i = 0; i < trimmed.length; i++) {
        hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
      }
      const numericSuffix = (Math.abs(hash) % 90000) + 10000;

      return `IN2026${initials}${numericSuffix}`;
    }


export default function IDCardsPage() {
    interface GetEnrollmentIDCardResponse {
      success: boolean;
      data: EnrollmentIDCard;
    }

    interface IStudentDataHook {
        useStudentDashboard: (
        options?: TQueryOptions<GetStudentDashboardResponse, Error>,
      ) => TQueryReturnType<GetStudentDashboardResponse, Error>;

        useInternships: (
        params?: ListInternshipsParams,
        options?: TQueryOptions<ListInternshipsResponse, Error>,
      ) => TQueryReturnType<ListInternshipsResponse, Error>;

        useInternship: (
        id: string,
        options?: TQueryOptions<GetInternshipByIdResponse, Error>,
      ) => TQueryReturnType<GetInternshipByIdResponse, Error>;

        useApplyInternship: (
        options?: TMutationOptions<ApplyForInternshipResponse, Error, string>,
      ) => TMutationReturnType<ApplyForInternshipResponse, string>;

        useCheckApplicationStatus: (
        id: string,
        options?: TQueryOptions<CheckApplicationStatusResponse, Error>,
      ) => TQueryReturnType<CheckApplicationStatusResponse, Error>;

        useMyApplications: (
        options?: TQueryOptions<ListMyApplicationsResponse, Error>,
      ) => TQueryReturnType<ListMyApplicationsResponse, Error>;

        useMyEnrollments: (
        options?: TQueryOptions<ListMyEnrollmentsResponse, Error>,
      ) => TQueryReturnType<ListMyEnrollmentsResponse, Error>;

        useDirectEnroll: (
        options?: TMutationOptions<DirectEnrollResponse, Error, string>,
      ) => TMutationReturnType<DirectEnrollResponse, string>;

        useEnrollmentIDCard: (
        id: string,
        options?: TQueryOptions<GetEnrollmentIDCardResponse, Error>,
      ) => TQueryReturnType<GetEnrollmentIDCardResponse, Error>;

        useMyCertificates: (
        options?: TQueryOptions<ListMyCertificatesResponse, Error>,
      ) => TQueryReturnType<ListMyCertificatesResponse, Error>;

        useDownloadCertificate: (
        options?: TMutationOptions<Blob, Error, string>,
      ) => TMutationReturnType<Blob, string>;

        useAssignGrade: (
        options?: TMutationOptions<
          AssignGradeResponse,
          Error,
          { id: string; payload: AssignGradeRequest }
        >,
      ) => TMutationReturnType<
        AssignGradeResponse,
        { id: string; payload: AssignGradeRequest }
      >;

        useDownloadApplicationPDF: (
        options?: TMutationOptions<
          Blob,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) => TMutationReturnType<
        Blob,
        { internshipId: string; applicationId: string }
      >;

        useMyPayments: (
        params?: ListMyPaymentsParams,
        options?: TQueryOptions<ListMyPaymentsResponse, Error>,
      ) => TQueryReturnType<ListMyPaymentsResponse, Error>;

        usePaymentReceipt: (
        id: string,
        options?: TQueryOptions<GetPaymentReceiptResponse, Error>,
      ) => TQueryReturnType<GetPaymentReceiptResponse, Error>;

        useCreatePaymentOrder: (
        options?: TMutationOptions<CreateOrderResponse, Error, CreateOrderPayload>,
      ) => TMutationReturnType<CreateOrderResponse, CreateOrderPayload>;

        useVerifyPaymentSignature: (
        options?: TMutationOptions<
          VerifySignatureResponse,
          Error,
          VerifySignaturePayload
        >,
      ) => TMutationReturnType<VerifySignatureResponse, VerifySignaturePayload>;

        useRefundPayment: (
        options?: TMutationOptions<RefundResponse, Error, RefundPayload>,
      ) => TMutationReturnType<RefundResponse, RefundPayload>;

        useAllPayments: (
        options?: TQueryOptions<ListAllPaymentsResponse, Error>,
      ) => TQueryReturnType<ListAllPaymentsResponse, Error>;

        useCreateSupportTicket: (
        options?: TMutationOptions<
          CreateTicketResponse,
          Error,
          CreateTicketPayload
        >,
      ) => TMutationReturnType<CreateTicketResponse, CreateTicketPayload>;

        useMySupportTickets: (
        options?: TQueryOptions<ListMyTicketsResponse, Error>,
      ) => TQueryReturnType<ListMyTicketsResponse, Error>;

        useDeleteSupportTicket: (
        options?: TMutationOptions<DeleteTicketResponse, Error, string>,
      ) => TMutationReturnType<DeleteTicketResponse, string>;

        useNotices: (
        options?: TQueryOptions<ListNoticesResponse, Error>,
      ) => TQueryReturnType<ListNoticesResponse, Error>;

        useCreateNotice: (
        options?: TMutationOptions<
          CreateNoticeResponse,
          Error,
          CreateNoticePayload
        >,
      ) => TMutationReturnType<CreateNoticeResponse, CreateNoticePayload>;

        useSubmitFeedback: (
        options?: TMutationOptions<FeedbackResponse, Error, FeedbackPayload>,
      ) => TMutationReturnType<FeedbackResponse, FeedbackPayload>;

        useMyFeedbacks: (
        options?: TQueryOptions<MyFeedbacksResponse, Error>,
      ) => TQueryReturnType<MyFeedbacksResponse, Error>;

        useMyReviews: (
        options?: TQueryOptions<MyReviewsResponse, Error>,
      ) => TQueryReturnType<MyReviewsResponse, Error>;

        useVerifyIdCard: (
        id: string,
        options?: TQueryOptions<VerifyIDCardResponse, Error>,
      ) => TQueryReturnType<VerifyIDCardResponse, Error>;

        useSubmitProject: (
        options?: TMutationOptions<
          SubmitProjectResponse,
          Error,
          SubmitProjectPayload
        >,
      ) => TMutationReturnType<SubmitProjectResponse, SubmitProjectPayload>;

        useEnrollmentSubmissions: (
        enrollmentId: string,
        options?: TQueryOptions<ListEnrollmentSubmissionsResponse, Error>,
      ) => TQueryReturnType<ListEnrollmentSubmissionsResponse, Error>;

        useUpdateSubmission: (
        options?: TMutationOptions<
          UpdateSubmissionResponse,
          Error,
          {
            enrollmentId: string;
            submissionId: string;
            payload: UpdateSubmissionPayload;
          }
        >,
      ) => TMutationReturnType<
        UpdateSubmissionResponse,
        {
          enrollmentId: string;
          submissionId: string;
          payload: UpdateSubmissionPayload;
        }
      >;

        useDeleteSubmission: (
        options?: TMutationOptions<
          DeleteSubmissionResponse,
          Error,
          { enrollmentId: string; submissionId: string }
        >,
      ) => TMutationReturnType<
        DeleteSubmissionResponse,
        { enrollmentId: string; submissionId: string }
      >;

        usePublicNewspapers: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicOnlineLinks: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicPhotos: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicVideos: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicPartners: (
        type: "educational-institutes" | "job-placement" | "training-support",
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicBlogs: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicDonations: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      usePublicImmersions: (
        options?: TQueryOptions<Record<string, unknown>[], Error>,
      ) => TQueryReturnType<Record<string, unknown>[], Error>;
      useSubmitInternshipInterest: (
        options?: TMutationOptions<
          Record<string, unknown>,
          Error,
          { id: string; payload: Record<string, unknown> }
        >,
      ) => TMutationReturnType<
        Record<string, unknown>,
        { id: string; payload: Record<string, unknown> }
      >;
      useSubmitPlacementInterest: (
        options?: TMutationOptions<
          Record<string, unknown>,
          Error,
          { id: string; formData: FormData }
        >,
      ) => TMutationReturnType<
        Record<string, unknown>,
        { id: string; formData: FormData }
      >;
    }

    interface IStudentService {
        getDashboardSummary: () => Promise<GetStudentDashboardResponse>;

        listInternships: (
        params?: ListInternshipsParams,
      ) => Promise<ListInternshipsResponse>;
      getInternshipById: (id: string) => Promise<GetInternshipByIdResponse>;

        applyForInternship: (id: string) => Promise<ApplyForInternshipResponse>;
      checkApplicationStatus: (
        id: string,
      ) => Promise<CheckApplicationStatusResponse>;
      listMyApplications: () => Promise<ListMyApplicationsResponse>;
      downloadApplicationPDF: (
        internshipId: string,
        applicationId: string,
      ) => Promise<Blob>;

        listMyEnrollments: () => Promise<ListMyEnrollmentsResponse>;
      directEnroll: (id: string) => Promise<DirectEnrollResponse>;
      getEnrollmentIDCard: (id: string) => Promise<GetEnrollmentIDCardResponse>;

        listMyCertificates: () => Promise<ListMyCertificatesResponse>;
      downloadCertificate: (id: string) => Promise<Blob>;
      assignGrade: (
        id: string,
        payload: AssignGradeRequest,
      ) => Promise<AssignGradeResponse>;

        listMyPayments: (
        params?: ListMyPaymentsParams,
      ) => Promise<ListMyPaymentsResponse>;
      getPaymentReceipt: (id: string) => Promise<GetPaymentReceiptResponse>;
      createPaymentOrder: (
        payload: CreateOrderPayload,
      ) => Promise<CreateOrderResponse>;
      verifyPaymentSignature: (
        payload: VerifySignaturePayload,
      ) => Promise<VerifySignatureResponse>;
      refundPayment: (payload: RefundPayload) => Promise<RefundResponse>;
      listAllPayments: () => Promise<ListAllPaymentsResponse>;

        createSupportTicket: (
        payload: CreateTicketPayload,
      ) => Promise<CreateTicketResponse>;
      listMySupportTickets: () => Promise<ListMyTicketsResponse>;
      deleteSupportTicket: (id: string) => Promise<DeleteTicketResponse>;

        listNotices: () => Promise<ListNoticesResponse>;
      createNotice: (payload: CreateNoticePayload) => Promise<CreateNoticeResponse>;

        submitFeedback: (payload: FeedbackPayload) => Promise<FeedbackResponse>;
      getMyFeedbacks: () => Promise<MyFeedbacksResponse>;
      listMyReviews: () => Promise<MyReviewsResponse>;
      verifyIdCard: (id: string) => Promise<VerifyIDCardResponse>;
      submitProject: (
        payload: SubmitProjectPayload,
      ) => Promise<SubmitProjectResponse>;
      listEnrollmentSubmissions: (
        enrollmentId: string,
      ) => Promise<ListEnrollmentSubmissionsResponse>;
      updateSubmission: (
        enrollmentId: string,
        submissionId: string,
        payload: UpdateSubmissionPayload,
      ) => Promise<UpdateSubmissionResponse>;
      deleteSubmission: (
        enrollmentId: string,
        submissionId: string,
      ) => Promise<DeleteSubmissionResponse>;

        getPublicNewspapers: () => Promise<Record<string, unknown>[]>;
      getPublicOnlineLinks: () => Promise<Record<string, unknown>[]>;
      getPublicPhotos: () => Promise<Record<string, unknown>[]>;
      getPublicVideos: () => Promise<Record<string, unknown>[]>;
      getPublicPartners: (
        type: "educational-institutes" | "job-placement" | "training-support",
      ) => Promise<Record<string, unknown>[]>;
      getPublicBlogs: () => Promise<Record<string, unknown>[]>;
      getPublicDonations: () => Promise<Record<string, unknown>[]>;
      getPublicImmersions: () => Promise<Record<string, unknown>[]>;
      submitInternshipInterest: (
        id: string,
        payload: Record<string, unknown>,
      ) => Promise<Record<string, unknown>>;
      submitPlacementInterest: (
        id: string,
        formData: FormData,
      ) => Promise<Record<string, unknown>>;
    }

    const StudentService: IStudentService = {
        async getDashboardSummary() {
        const response = await axiosInstance.get<GetStudentDashboardResponse>(
          ENDPOINTS.STUDENTS.DASHBOARD,
        );
        return response.data;
      },

        async listInternships(params) {
        const response = await axiosInstance.get<ListInternshipsResponse>(
          ENDPOINTS.INTERNSHIPS.BASE,
          { params },
        );
        return response.data;
      },

      async getInternshipById(id) {
        const response = await axiosInstance.get<GetInternshipByIdResponse>(
          ENDPOINTS.INTERNSHIPS.BY_ID(id),
        );
        return response.data;
      },

        async applyForInternship(id) {
        const response = await axiosInstance.post<ApplyForInternshipResponse>(
          ENDPOINTS.INTERNSHIPS.APPLY(id),
        );
        return response.data;
      },

      async checkApplicationStatus(id) {
        const response = await axiosInstance.get<CheckApplicationStatusResponse>(
          ENDPOINTS.INTERNSHIPS.APPLY(id),
        );
        return response.data;
      },

      async listMyApplications() {
        const response = await axiosInstance.get<ListMyApplicationsResponse>(
          ENDPOINTS.INTERNSHIPS.MY_APPLICATIONS,
        );
        return response.data;
      },

      async downloadApplicationPDF(internshipId, applicationId) {
        const response = await axiosInstance.get<Blob>(
          `/internships/${internshipId}/applications/${applicationId}/download`,
          {
            responseType: "blob",
          },
        );
        return response.data;
      },

        async listMyEnrollments() {
        const response = await axiosInstance.get<ListMyEnrollmentsResponse>(
          ENDPOINTS.ENROLLMENTS.MY_ENROLLMENTS,
        );
        return response.data;
      },

      async directEnroll(id) {
        const response = await axiosInstance.post<DirectEnrollResponse>(
          ENDPOINTS.INTERNSHIPS.ENROLL(id),
        );
        return response.data;
      },

      async getEnrollmentIDCard(id) {
        const response = await axiosInstance.get<GetEnrollmentIDCardResponse>(
          ENDPOINTS.ENROLLMENTS.ID_CARD(id),
        );
        return response.data;
      },

        async listMyCertificates() {
        const response = await axiosInstance.get<ListMyCertificatesResponse>(
          `${ENDPOINTS.CERTIFICATES.MY_CERTIFICATES}?t=${Date.now()}`,
        );
        return response.data;
      },

      async downloadCertificate(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.CERTIFICATES.DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

      async assignGrade(id, payload) {
        const response = await axiosInstance.patch<AssignGradeResponse>(
          ENDPOINTS.CERTIFICATES.GRADE(id),
          payload,
        );
        return response.data;
      },

        async listMyPayments(params) {
        const response = await axiosInstance.get<ListMyPaymentsResponse>(
          ENDPOINTS.PAYMENTS.MY_PAYMENTS,
          { params },
        );
        return response.data;
      },

      async getPaymentReceipt(id) {
        const response = await axiosInstance.get<GetPaymentReceiptResponse>(
          ENDPOINTS.PAYMENTS.RECEIPT(id),
        );
        return response.data;
      },

      async createPaymentOrder(payload) {
        const response = await axiosInstance.post<CreateOrderResponse>(
          ENDPOINTS.PAYMENTS.CREATE_ORDER,
          payload,
        );
        return response.data;
      },

      async verifyPaymentSignature(payload) {
        const response = await axiosInstance.post<VerifySignatureResponse>(
          ENDPOINTS.PAYMENTS.VERIFY_SIGNATURE,
          payload,
        );
        return response.data;
      },

      async refundPayment(payload) {
        const response = await axiosInstance.post<RefundResponse>(
          ENDPOINTS.PAYMENTS.REFUND,
          payload,
        );
        return response.data;
      },

      async listAllPayments() {
        const response = await axiosInstance.get<ListAllPaymentsResponse>(
          ENDPOINTS.PAYMENTS.ADMIN_LIST,
        );
        return response.data;
      },

        async createSupportTicket(payload) {
        const response = await axiosInstance.post<CreateTicketResponse>(
          ENDPOINTS.TICKETS.BASE,
          payload,
        );
        return response.data;
      },

      async listMySupportTickets() {
        const response = await axiosInstance.get<ListMyTicketsResponse>(
          ENDPOINTS.TICKETS.MY_TICKETS,
        );
        return response.data;
      },

      async deleteSupportTicket(id) {
        const response = await axiosInstance.delete<DeleteTicketResponse>(
          ENDPOINTS.TICKETS.BY_ID(id),
        );
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

        async submitFeedback(payload) {
        const response = await axiosInstance.post<FeedbackResponse>(
          ENDPOINTS.FEEDBACK.BASE,
          payload,
        );
        return response.data;
      },

      async getMyFeedbacks() {
        const response = await axiosInstance.get<MyFeedbacksResponse>(
          ENDPOINTS.FEEDBACK.MY_FEEDBACKS,
        );
        return response.data;
      },

      async listMyReviews() {
        const response = await axiosInstance.get<MyReviewsResponse>(
          ENDPOINTS.REVIEWS.MY_REVIEWS,
        );
        return response.data;
      },

      async verifyIdCard(id) {
        const response = await axiosInstance.get<VerifyIDCardResponse>(
          ENDPOINTS.ID_CARDS.BY_ID(id),
        );
        return response.data;
      },

      async submitProject(payload) {
        const response = await axiosInstance.post<SubmitProjectResponse>(
          ENDPOINTS.INSTRUCTOR.SUBMISSIONS,
          payload,
        );
        return response.data;
      },

      async listEnrollmentSubmissions(enrollmentId) {
        const response = await axiosInstance.get<ListEnrollmentSubmissionsResponse>(
          ENDPOINTS.ENROLLMENTS.SUBMISSIONS(enrollmentId),
        );
        return response.data;
      },

      async updateSubmission(enrollmentId, submissionId, payload) {
        const response = await axiosInstance.patch<UpdateSubmissionResponse>(
          ENDPOINTS.ENROLLMENTS.SUBMISSION_BY_ID(enrollmentId, submissionId),
          payload,
        );
        return response.data;
      },

      async deleteSubmission(enrollmentId, submissionId) {
        const response = await axiosInstance.delete<DeleteSubmissionResponse>(
          ENDPOINTS.ENROLLMENTS.SUBMISSION_BY_ID(enrollmentId, submissionId),
        );
        return response.data;
      },

        async getPublicNewspapers() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/newspapers");
        return response.data?.data || [];
      },

      async getPublicOnlineLinks() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/online-links");
        return response.data?.data || [];
      },

      async getPublicPhotos() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/photos");
        return response.data?.data || [];
      },

      async getPublicVideos() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/media/videos");
        return response.data?.data || [];
      },

      async getPublicPartners(type) {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>(`/partners/${type}`);
        const data = response.data?.data || [];
        return data.map((item) => ({
          ...item,
          logoUrl: item.logo || item.logoUrl,
          photoUrl: item.photo || item.photoUrl,
        }));
      },

      async getPublicBlogs() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/blogs");
        return response.data?.data || [];
      },

      async getPublicDonations() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/donations");
        return response.data?.data || [];
      },

      async getPublicImmersions() {
        const response = await axiosInstance.get<{
          data: Record<string, unknown>[];
        }>("/immersion");
        return response.data?.data || [];
      },

      async submitInternshipInterest(id, payload) {
        const response = await axiosInstance.post(
          `/internships/${id}/interest`,
          payload,
        );
        return response.data;
      },

      async submitPlacementInterest(id, formData) {
        const response = await axiosInstance.post(
          `/partners/job-placement/${id}/interest`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        return response.data;
      },
    };

    const StudentDataHook: IStudentDataHook = {
        useStudentDashboard(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
          queryFn: async () => await StudentService.getDashboardSummary(),
          ...options,
        });
      },

        useInternships(params, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.INTERNSHIPS(params),
          queryFn: async () => await StudentService.listInternships(params),
          ...options,
        });
      },

        useInternship(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.INTERNSHIP(id),
          queryFn: async () => await StudentService.getInternshipById(id),
          enabled: !!id,
          ...options,
        });
      },

        useApplyInternship(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await StudentService.applyForInternship(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Application submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to apply for internship.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useCheckApplicationStatus(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.APPLICATION_STATUS(id),
          queryFn: async () => await StudentService.checkApplicationStatus(id),
          enabled: !!id,
          ...options,
        });
      },

        useMyApplications(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_APPLICATIONS,
          queryFn: async () => await StudentService.listMyApplications(),
          ...options,
        });
      },

        useMyEnrollments(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
          queryFn: async () => await StudentService.listMyEnrollments(),
          ...options,
        });
      },

        useDirectEnroll(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await StudentService.directEnroll(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message || "Enrolled successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to enroll.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useEnrollmentIDCard(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_ID_CARD(id),
          queryFn: async () => await StudentService.getEnrollmentIDCard(id),
          enabled: !!id,
          ...options,
        });
      },

        useMyCertificates(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_CERTIFICATES,
          queryFn: async () => await StudentService.listMyCertificates(),
          ...options,
        });
      },

        useDownloadCertificate(options) {
        return useMutation({
          mutationFn: async (id) => await StudentService.downloadCertificate(id),
          ...options,
        });
      },

        useAssignGrade(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await StudentService.assignGrade(id, payload),
          onSuccess: async (data, variables, context) => {
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ["instructors"] }),
              queryClient.invalidateQueries({ queryKey: ["students"] }),
              queryClient.invalidateQueries({ queryKey: ["emersion"] }),
              queryClient.invalidateQueries({ queryKey: ["super-admin"] }),
            ]);
            if (options?.onSuccess) {
              await (options.onSuccess as any)(data, variables, context);
            }
          },
          ...options,
        });
      },

        useDownloadApplicationPDF(options) {
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await StudentService.downloadApplicationPDF(
              internshipId,
              applicationId,
            ),
          ...options,
        });
      },

        useMyPayments(params, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_PAYMENTS(params),
          queryFn: async () => await StudentService.listMyPayments(params),
          ...options,
        });
      },

        usePaymentReceipt(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.PAYMENT_RECEIPT(id),
          queryFn: async () => await StudentService.getPaymentReceipt(id),
          enabled: !!id,
          ...options,
        });
      },

        useCreatePaymentOrder(options) {
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.createPaymentOrder(payload),
          ...options,
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to create payment order.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useVerifyPaymentSignature(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.verifyPaymentSignature(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_PAYMENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Payment verified! You are now enrolled.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to verify payment.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useRefundPayment(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.refundPayment(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_PAYMENTS(),
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.ALL_PAYMENTS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Refund processed successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to process refund.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useAllPayments(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.ALL_PAYMENTS,
          queryFn: async () => await StudentService.listAllPayments(),
          ...options,
        });
      },

        useCreateSupportTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.createSupportTicket(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_TICKETS,
            });
            toast.success(
              (data as { message?: string })?.message ||
                "Support ticket created successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to create support ticket.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useMySupportTickets(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_TICKETS,
          queryFn: async () => await StudentService.listMySupportTickets(),
          ...options,
        });
      },

        useDeleteSupportTicket(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await StudentService.deleteSupportTicket(id),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_TICKETS,
            });
            toast.success(
              (data as { message?: string })?.message || "Support ticket deleted.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to delete support ticket.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useNotices(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.NOTICES,
          queryFn: async () => await StudentService.listNotices(),
          ...options,
        });
      },

        useCreateNotice(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) => await StudentService.createNotice(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEYS.NOTICES });
            toast.success(
              (data as { message?: string })?.message ||
                "Notice posted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to post notice.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useSubmitFeedback(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.submitFeedback(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.FEEDBACKS,
            });
            toast.success(
              (data.message as string) || "Feedback submitted successfully.",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit feedback.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useMyFeedbacks(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.FEEDBACKS,
          queryFn: async () => await StudentService.getMyFeedbacks(),
          ...options,
        });
      },

        useMyReviews(options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.MY_REVIEWS,
          queryFn: async () => await StudentService.listMyReviews(),
          ...options,
        });
      },

        useVerifyIdCard(id, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.VERIFY_ID_CARD(id),
          queryFn: async () => await StudentService.verifyIdCard(id),
          enabled: !!id,
          ...options,
        });
      },

        useSubmitProject(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await StudentService.submitProject(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_ENROLLMENTS,
            });
            toast.success(
              (data.message as string) || "Project submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit project.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useEnrollmentSubmissions(enrollmentId, options) {
        return useQuery({
          queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_SUBMISSIONS(enrollmentId),
          queryFn: async () =>
            await StudentService.listEnrollmentSubmissions(enrollmentId),
          enabled: !!enrollmentId,
          ...options,
        });
      },

        useUpdateSubmission(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ enrollmentId, submissionId, payload }) =>
            await StudentService.updateSubmission(
              enrollmentId,
              submissionId,
              payload,
            ),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_SUBMISSIONS(
                variables.enrollmentId,
              ),
            });
            toast.success(data.message || "Submission updated successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update submission.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        useDeleteSubmission(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ enrollmentId, submissionId }) =>
            await StudentService.deleteSubmission(enrollmentId, submissionId),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.ENROLLMENT_SUBMISSIONS(
                variables.enrollmentId,
              ),
            });
            toast.success(data.message || "Submission deleted successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to delete submission.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },

        usePublicNewspapers(options) {
        return useQuery({
          queryKey: ["public", "newspapers"],
          queryFn: async () => await StudentService.getPublicNewspapers(),
          ...options,
        });
      },

      usePublicOnlineLinks(options) {
        return useQuery({
          queryKey: ["public", "online-links"],
          queryFn: async () => await StudentService.getPublicOnlineLinks(),
          ...options,
        });
      },

      usePublicPhotos(options) {
        return useQuery({
          queryKey: ["public", "photos"],
          queryFn: async () => await StudentService.getPublicPhotos(),
          ...options,
        });
      },

      usePublicVideos(options) {
        return useQuery({
          queryKey: ["public", "videos"],
          queryFn: async () => await StudentService.getPublicVideos(),
          ...options,
        });
      },

      usePublicPartners(type, options) {
        return useQuery({
          queryKey: ["public", "partners", type],
          queryFn: async () => await StudentService.getPublicPartners(type),
          ...options,
        });
      },

      usePublicBlogs(options) {
        return useQuery({
          queryKey: ["public", "blogs"],
          queryFn: async () => await StudentService.getPublicBlogs(),
          ...options,
        });
      },

      usePublicDonations(options) {
        return useQuery({
          queryKey: ["public", "donations"],
          queryFn: async () => await StudentService.getPublicDonations(),
          ...options,
        });
      },

      usePublicImmersions(options) {
        return useQuery({
          queryKey: ["public", "immersions"],
          queryFn: async () => await StudentService.getPublicImmersions(),
          ...options,
        });
      },

      useSubmitInternshipInterest(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await StudentService.submitInternshipInterest(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.MY_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data.message as string) || "Application submitted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error, variables, context) => {
            toast.error(error.message || "Failed to submit application.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },

      useSubmitPlacementInterest(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await StudentService.submitPlacementInterest(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
            });
            toast.success(
              (data.message as string) || "Interest registered successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as never);
          },
          onError: (error, variables, context) => {
            toast.error(error.message || "Failed to submit interest.");
            options?.onError?.(error, variables, context, undefined as never);
          },
        });
      },
    };

    interface EnrollmentIDCard {
      cardNo: string;
      issuedAt: string;
      studentId: string;
      studentName: string;
      studentEmail: string;
      studentMobile: string;
      studentAddress: string;
      photoUrl?: string;
      internshipId: string;
      internshipTitle: string;
      internshipLocation: string;
    }

    function IDCardDialog_2({
      enrollmentId,
      internshipTitle,
      open,
      onClose,
    }: IDCardDialogProps) {
      const { data, isLoading, isError } = StudentDataHook.useEnrollmentIDCard(
        open ? enrollmentId : "",
      );
      const card: EnrollmentIDCard | undefined = data?.data;

      const handleDownload = async () => {
        try {
          toast.loading("Generating PDF...");
          const response = await axiosInstance.get(
            `/id-cards/${enrollmentId}/download`,
            { responseType: "blob" },
          );
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `id_card_${card?.cardNo || enrollmentId}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          toast.dismiss();
          toast.success("Download started!");
        } catch (error) {
          console.error(error);
          toast.dismiss();
          toast.error("Failed to download PDF.");
        }
      };

      return (
        <Dialog_8 open={open} onOpenChange={(o) => !o && onClose()}>
          <DialogContent className="max-w-[440px] p-3">
            <DialogHeader className="px-1.5">
              <DialogTitle className="text-foreground flex items-center gap-2 text-sm">
                <IdCardIcon className="text-primary size-4" /> Intern ID Card
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs leading-tight">
                {internshipTitle}
              </DialogDescription>
            </DialogHeader>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <span className="border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            ) : isError ? (
              <p className="text-destructive py-4 text-center text-sm">
                Failed to load ID card.
              </p>
            ) : card ? (
              <div className="mt-1">
                <div
                  id={`id-card-${enrollmentId}`}
                  className="relative flex h-[350px] w-full select-none flex-col overflow-hidden rounded-2xl border border-emerald-500 bg-white font-sans text-zinc-900 shadow-sm"
                >
                  {}
                  <div className="h-1 w-full bg-[#022c22]" />

                  {}
                  <div className="flex flex-col items-center justify-center border-b border-zinc-100 pb-2 pt-2.5">
                    {}
                    <img
                      src="/logo.png"
                      alt="iiInternship Logo"
                      className="mb-0.5 h-10 w-auto object-contain"
                    />
                    {}
                    <h1 className="mt-0.5 text-[8.5px] font-bold uppercase leading-none tracking-wide text-[#022c22]">
                      International Institute of Internship™
                    </h1>
                    <p className="mt-0.5 text-[6px] font-medium italic leading-none text-zinc-500">
                      Learn Today, Lead Tomorrow
                    </p>
                    <p className="text-[5.5px] font-medium italic leading-none text-zinc-400">
                      A Unit of DPKHRC Trust
                    </p>
                    <a
                      href="http://www.iiinternship.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 text-[6.5px] font-bold leading-none text-emerald-600 hover:underline"
                    >
                      www.iiinternship.in
                    </a>
                  </div>

                  {}
                  <div className="flex flex-1 gap-3 p-3">
                    {}
                    <div className="flex w-16 shrink-0 flex-col items-center gap-3">
                      {}
                      <div
                        className={`relative flex h-20 w-16 items-center justify-center overflow-hidden rounded-md bg-zinc-50 text-sm font-bold text-zinc-600 ${!card.photoUrl ? "border border-zinc-200 shadow-sm" : ""}`}
                      >
                        {card.photoUrl ? (
                          <img
                            src={card.photoUrl}
                            alt={card.studentName}
                            className="size-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : card.studentName ? (
                          card.studentName
                            .trim()
                            .split(/\s+/)
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        ) : (
                          "ST"
                        )}
                      </div>

                      {}
                      <div className="flex size-14 items-center justify-center rounded-lg border border-zinc-200 bg-white p-1">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                            typeof window !== "undefined"
                              ? `${window.location.origin}/login`
                              : `https://www.iiinternship.in/login`,
                          )}`}
                      alt="Verification QR Code"
                      className="size-full object-contain"
                    />
                  </div>
                </div>

                {}
                <div className="flex-1 space-y-1 text-left text-[9.5px] leading-tight">
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">Student ID</span>
                    <span className="text-zinc-400">:</span>
                    <span className="truncate font-medium text-zinc-800">
                      {card.studentId || "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">
                      Student Name
                    </span>
                    <span className="text-zinc-400">:</span>
                    <span className="truncate font-bold text-zinc-900">
                      {card.studentName}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">
                      Student Address
                    </span>
                    <span className="text-zinc-400">:</span>
                    <span
                      className="line-clamp-2 font-medium text-zinc-800"
                      title={card.studentAddress}
                    >
                      {card.studentAddress || "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">Mobile No.</span>
                    <span className="text-zinc-400">:</span>
                    <span className="font-medium text-zinc-800">
                      {card.studentMobile || "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">Email ID</span>
                    <span className="text-zinc-400">:</span>
                    <span
                      className="truncate font-medium text-zinc-800"
                      title={card.studentEmail}
                    >
                      {card.studentEmail}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">
                      Internship Name
                    </span>
                    <span className="text-zinc-400">:</span>
                    <span
                      className="text-zinc-850 truncate font-medium"
                      title={card.internshipTitle}
                    >
                      {card.internshipTitle}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">
                      Internship ID
                    </span>
                    <span className="text-zinc-400">:</span>
                    <span className="truncate font-medium text-zinc-800">
                      {card.internshipId
                        ? formatInternshipCode_3(
                            card.internshipId,
                            card.internshipTitle,
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">
                      Internship Location
                    </span>
                    <span className="text-zinc-400">:</span>
                    <span className="truncate font-medium text-zinc-800">
                      {card.internshipLocation || "Remote"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_6px_1fr] items-start">
                    <span className="font-bold text-[#022c22]">
                      Issued Date
                    </span>
                    <span className="text-zinc-400">:</span>
                    <span className="font-medium text-zinc-800">
                      {new Date(card.issuedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {}
              <div className="bg-[#022c22] py-1.5 text-center">
                <span className="text-[7.5px] font-semibold uppercase tracking-wide text-emerald-100">
                  This ID Card is Computer Generated. Signature Not Required.
                </span>
              </div>
            </div>

            <Button
              id={`download-id-card-${enrollmentId}`}
              variant="outline"
              className="text-foreground hover:bg-muted mt-4 w-full gap-2 font-semibold"
              onClick={handleDownload}
            >
              <Download className="size-4" /> Download ID Card (PDF)
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center text-sm">
            ID card not available yet.
          </p>
        )}
      </DialogContent>
    </Dialog_8>
  );
}

function EnrollmentCard_2({ enrollment }: EnrollmentCardProps) {
  const [showCard, setShowCard] = useState(false);
  const isCompleted = !!enrollment.completedAt;

  return (
    <>
      <div className="bg-card/60 border-border/40 space-y-4 rounded-2xl border p-5 shadow-[0_8px_32_0_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32_0_rgba(0,0,0,0.37)] dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
              <BookOpen className="size-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-foreground text-sm font-bold">
                {enrollment.internship.title}
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                {enrollment.internship.companyName}
              </p>
              {enrollment.internship.mentor && (
                <p className="text-muted-foreground text-[10px]">
                  Mentor: {enrollment.internship.mentor.name}
                </p>
              )}
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                  isCompleted
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:border-emerald-800/30 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:border-blue-800/30 dark:bg-blue-950/20 dark:text-blue-400"
                }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="size-3" />
            ) : (
              <Clock_2 className="size-3" />
            )}
            {isCompleted ? "Completed" : "Active"}
          </span>
        </div>

        <div className="text-muted-foreground border-border/50 flex items-center justify-between border-t pt-1 text-xs">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            Enrolled{" "}
            {new Date(enrollment.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          {enrollment.completedAt && (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-emerald-500" />
              Completed{" "}
              {new Date(enrollment.completedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <div className="flex w-full gap-2">
          <Button
            id={`view-id-card-${enrollment.id}`}
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary w-full gap-2 font-semibold transition-all hover:text-white"
            onClick={() => setShowCard(true)}
          >
            <IdCardIcon className="size-4" /> View ID Card
          </Button>
        </div>
      </div>

      <IDCardDialog_2
        enrollmentId={enrollment.id}
        internshipTitle={enrollment.internship.title}
        open={showCard}
        onClose={() => setShowCard(false)}
      />
    </>
  );
}

function WorkspaceEnrollments_2() {
  const { data, isLoading, isError } = StudentDataHook.useMyEnrollments();
  const enrollments: MyEnrollment[] = data?.data ?? [];

  if (isLoading) return (<div className="grid animate-pulse grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 w-full rounded-2xl" />
            ))}
          </div>);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 py-16 text-center">
        <p className="text-destructive text-sm font-medium">
          Failed to load enrollments. Please try again.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <NoDataFound_2
        title="No Active Enrollments"
        description="Once your application is approved and you complete any required enrollment steps, your internships will appear here."
        action={
          <Button
            onClick={() => window.location.assign("/student/applications")}
          >
            View Applications
          </Button>
        }
      />
    );
  }

  const active = enrollments.filter((e) => !e.completedAt);
  const completed = enrollments.filter((e) => !!e.completedAt);

  return (
    <div className="space-y-8">
      {active.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-foreground flex items-center gap-2 text-base font-bold">
            <Clock_2 className="size-4 text-blue-500" /> Active ({active.length})
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((e) => (
              <EnrollmentCard_2 key={e.id} enrollment={e} />
            ))}
          </div>
        </section>
      )}
      {completed.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-foreground flex items-center gap-2 text-base font-bold">
            <CheckCircle2 className="size-4 text-emerald-500" /> Completed (
            {completed.length})
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((e) => (
              <EnrollmentCard_2 key={e.id} enrollment={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

  return (
    <div className="mx-auto space-y-6 p-4 px-0">
      <div>
        <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
          My ID Cards
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Access your digital ID cards for your active and completed internship
          enrollments.
        </p>
      </div>
      <WorkspaceEnrollments_2 />
    </div>
  );
}
