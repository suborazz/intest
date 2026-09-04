"use client";

import { LayoutGrid, List } from "lucide-react";
import React_3 from "react";
import { Award, BookOpen, Briefcase as Briefcase_2, Building as Building_2, Calendar, CheckCircle2, Clock as Clock_2, Coffee, GraduationCap as GraduationCap_2, Key, Layers, MapPin as MapPin_2, Phone as Phone_2, Send, Share2, Sparkles as Sparkles_2, Terminal, User, Briefcase, Check, Clock, Filter, IndianRupee, Search, Zap as Zap_2 } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import { toast } from "sonner";
import { LucideIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React from "react";
import React_2 from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "@/x/acfb3dca";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-md border",
        className,
      )}
      {...props}
    />
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden px-2 text-xs/relaxed"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) [&_a]:underline-offset-3 [&_a]:hover:text-foreground pb-4 pt-0 [&_a]:underline [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b data-open:bg-muted/50", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between gap-6 border border-transparent p-2 text-left text-xs/relaxed font-medium outline-none transition-all hover:underline disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

interface InternshipIdChipProps extends React_2.HTMLAttributes<HTMLSpanElement> {
  code?: string | null;
  companyName?: string | null;
  className?: string;
}

function formatInternshipCode(
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

function InternshipIdChip({
  code,
  companyName,
  className,
  ...props
}: InternshipIdChipProps) {
  if (!code && !companyName) return null;

  const formattedCode = formatInternshipCode(code, companyName);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-emerald-700 transition-colors dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300",
        className,
      )}
      {...props}
    >
      {formattedCode}
    </span>
  );
}

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
}

function Input({ className, type, icon: Icon, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-input/20 file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border px-3 py-1.5 text-sm outline-none transition-colors file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xs/relaxed",
        Icon && "pl-8",
        className,
      )}
      {...props}
    />
  );

  if (!Icon) return input;

  return (
    <div className="relative flex w-full items-center">
      <Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4" />
      {input}
    </div>
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

interface GetEnrollmentIDCardResponse {
      success: boolean;
      data: EnrollmentIDCard;
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

type RunningInternshipType = "Full Time" | "Part Time" | "Virtual";

type RunningInternshipCategory =
      "By Paying Fees" | "Free of Cost" | "Stipend";

type RunningTimePeriod = "Non-Residential" | "Residential";

interface RunningInternship {
      id: string;
      adId: string; 
      companyName?: string;
      title: string;
      description: string;
      department?: string;
      modules?: string[];
      project?: string;
      tools?: string[];
      type: RunningInternshipType;
      credits?: string;
      location: string;
      duration: string;
      qualification: string;
      skills?: string[];
      category: RunningInternshipCategory;
      timePeriod: RunningTimePeriod;
      facilities?: string;
      careerOpportunity?: string;
      startDate: string;
      fee?: string;
      lastDate: string;
      mentor?: string;
      contact: string;
      organizer: string;
    }

interface RunningInternshipCardProps {
      internship: RunningInternship;
      viewMode?: "grid" | "list";
    }


export default function RunningInternshipPage() {
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
    const RunningInternshipCard = ({
      internship,
      viewMode = "grid",
    }: RunningInternshipCardProps) => {
      const isList = viewMode === "list";

      return (
        <div
          className={`hover:border-primary/30 group flex h-fit flex-col rounded-2xl border border-white/60 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:border-white/20 ${
            isList ? "w-full md:flex-row md:items-stretch md:gap-6" : "gap-3"
          }`}
        >
          {}
          <div className={`flex flex-col gap-3 ${isList ? "flex-1" : ""}`}>
            {}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 border-primary/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
                <Briefcase_2 className="w-5.5 h-5.5 text-primary" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="text-foreground group-hover:text-primary text-base font-bold leading-tight transition-colors">
                  {internship.title}
                </h3>
              </div>
            </div>

            {}
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
              <InternshipIdChip
                code={internship.id}
                companyName={internship.companyName}
              />
              <span className="inline-block rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400">
                {internship.type}
              </span>
              <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                {internship.category}
              </span>
              <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400">
                {internship.timePeriod}
              </span>
              {internship.department && (
                <span className="inline-block rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-400">
                  {internship.department}
                </span>
              )}
            </div>

            {}
            <div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {internship.description?.replace(/<[^>]*>/g, "")}
              </p>
            </div>

            {}
            {internship.project && (
              <div className="bg-linear-to-r to-primary/[0.03] dark:to-primary/5 rounded-lg border border-dashed border-emerald-500/15 from-emerald-500/[0.03] p-2.5 dark:from-emerald-500/10">
                <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-emerald-500/10 bg-emerald-500/10">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  Project Focus
                </span>
                <span className="text-foreground/90 line-clamp-1 block pl-6 text-xs font-semibold sm:text-sm">
                  {internship.project}
                </span>
              </div>
            )}

            {}
            {internship.modules && internship.modules.length > 0 && (
              <div>
                <span className="text-muted-foreground mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-blue-500/10 bg-blue-500/10">
                    <Layers className="h-3 w-3 text-blue-500" />
                  </span>
                  Key Modules
                </span>
                <div className="flex flex-wrap gap-1 pl-6">
                  {internship.modules.map((mod) => (
                    <span
                      key={mod}
                      className="text-foreground/80 rounded-md border border-zinc-200/50 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium dark:border-zinc-700/50 dark:bg-zinc-800/60"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {}
            {internship.tools && internship.tools.length > 0 && (
              <div>
                <span className="text-muted-foreground mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-500/10 bg-amber-500/10">
                    <Terminal className="h-3 w-3 text-amber-500" />
                  </span>
                  Tools & Tech
                </span>
                <div className="flex flex-wrap gap-1 pl-6">
                  {internship.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-primary/10 text-primary border-primary/5 rounded-md border px-2.5 py-0.5 text-[11px] font-semibold"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {}
          <div
            className={`flex flex-col gap-3 ${
              isList
                ? "shrink-0 justify-between md:w-[320px] md:border-l md:border-zinc-200/50 md:pl-6 dark:md:border-zinc-800/60"
                : ""
            }`}
          >
            {}
            <div className="space-y-1">
              <div className="flex items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/[0.04] p-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10">
                  <Sparkles_2 className="h-3 w-3 text-amber-600" />
                </span>
                <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  Facilitation & Package Fee:
                </span>
                <span className="text-foreground text-sm font-extrabold text-amber-600 dark:text-amber-500">
                  {internship.fee || "Free"}
                </span>
              </div>
              {internship.fee && internship.fee !== "Free" && (
                <p className="text-muted-foreground mt-1.5 pl-1 text-xs font-medium leading-relaxed">
                  The internship program is completely free of charge. The
                  contribution fee being collected is for the special personal
                  amenities and other essential services provided during the
                  internship.
                </p>
              )}
            </div>

            {}
            <Accordion type="single" collapsible className="w-full border-none">
              <AccordionItem
                value="details"
                className="data-open:bg-transparent border-b-0"
              >
                <AccordionTrigger className="text-primary justify-start gap-1 py-1 text-xs font-bold hover:no-underline sm:text-sm">
                  <span>View Internship Details & Requirements</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2">
                  {}
                  <div className="border-border/40 grid grid-cols-2 gap-3 border-t pt-2">
                    {}
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-emerald-500/10 bg-emerald-500/10">
                        <MapPin_2 className="h-3 w-3 text-emerald-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Location
                        </span>
                        <span className="text-foreground/90 block truncate text-xs font-semibold sm:text-sm">
                          {internship.location}
                        </span>
                      </div>
                    </div>

                    {}
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-blue-500/10 bg-blue-500/10">
                        <Clock_2 className="h-3 w-3 text-blue-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Duration
                        </span>
                        <span className="text-foreground/90 block truncate text-xs font-semibold sm:text-sm">
                          {internship.duration}
                        </span>
                      </div>
                    </div>

                    {}
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-violet-500/10 bg-violet-500/10">
                        <Calendar className="h-3 w-3 text-violet-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Start Date
                        </span>
                        <span className="text-foreground/90 block truncate text-xs font-semibold sm:text-sm">
                          {internship.startDate}
                        </span>
                      </div>
                    </div>

                    {}
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-rose-500/10 bg-rose-500/10">
                        <Calendar className="h-3 w-3 text-rose-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Last Date To Apply
                        </span>
                        <span className="block truncate text-xs font-semibold text-rose-600 sm:text-sm dark:text-rose-400">
                          {internship.lastDate}
                        </span>
                      </div>
                    </div>

                    {}
                    {internship.credits && (
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-500/10 bg-cyan-500/10">
                          <Award className="h-3 w-3 text-cyan-600" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                            No. of Credits
                          </span>
                          <span className="text-foreground/90 block truncate text-xs font-semibold sm:text-sm">
                            {internship.credits}
                          </span>
                        </div>
                      </div>
                    )}

                    {}
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-indigo-500/10 bg-indigo-500/10">
                        <GraduationCap_2 className="h-3 w-3 text-indigo-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Qualification Required
                        </span>
                        <span className="text-foreground/90 block text-xs font-semibold sm:text-sm">
                          {internship.qualification}
                        </span>
                      </div>
                    </div>

                    {}
                    {internship.skills && internship.skills.length > 0 && (
                      <div className="col-span-2 flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-teal-500/10 bg-teal-500/10">
                          <BookOpen className="h-3 w-3 text-teal-600" />
                        </span>
                        <div className="w-full min-w-0">
                          <span className="text-muted-foreground mb-1 block text-[10px] font-bold uppercase tracking-wider">
                            Skill Required
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {internship.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-teal-500/5 bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {}
                    {internship.mentor && (
                      <div className="col-span-2 flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-orange-500/10 bg-orange-500/10">
                          <User className="h-3 w-3 text-orange-600" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                            Mentor / Instructor Name
                          </span>
                          <span className="text-foreground/90 block text-xs font-semibold sm:text-sm">
                            {internship.mentor}
                          </span>
                        </div>
                      </div>
                    )}

                    {}
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-teal-500/10 bg-teal-500/10">
                        <Phone_2 className="h-3 w-3 text-teal-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Contact Person & Mobile No.
                        </span>
                        <span className="text-foreground/90 block text-xs font-semibold sm:text-sm">
                          {internship.contact}
                        </span>
                      </div>
                    </div>

                    {}
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-sky-500/10 bg-sky-500/10">
                        <Building_2 className="h-3 w-3 text-sky-600" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                          Organizer
                        </span>
                        <span className="text-foreground/90 block text-xs font-semibold sm:text-sm">
                          {internship.organizer}
                        </span>
                      </div>
                    </div>

                    {}
                    {internship.facilities && (
                      <div className="col-span-2 flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-500/10 bg-amber-500/10">
                          <Coffee className="h-3 w-3 text-amber-600" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                            Facilities Provided During Internship
                          </span>
                          <span className="text-foreground/90 block text-xs font-semibold sm:text-sm">
                            {internship.facilities}
                          </span>
                        </div>
                      </div>
                    )}

                    {}
                    {internship.careerOpportunity && (
                      <div className="col-span-2 flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-emerald-500/10 bg-emerald-500/10">
                          <Sparkles_2 className="h-3 w-3 text-emerald-600" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">
                            Career Opportunity
                          </span>
                          <span className="text-foreground/90 block text-xs font-semibold sm:text-sm">
                            {internship.careerOpportunity}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {}
            <div className="group/btn -mt-1 flex w-full items-center gap-2">
              <Link
                href={`/internship/${internship.id}`}
                className="border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 flex flex-1 cursor-pointer items-center justify-center rounded-lg border py-1.5 text-xs font-semibold transition-all duration-300 sm:text-sm"
              >
                View Detail
              </Link>
              <Link
                href="/sign-up?role=STUDENT"
                className="bg-linear-to-r from-primary hover:from-primary/90 text-primary-foreground flex flex-1 cursor-pointer items-center justify-between whitespace-nowrap rounded-lg border-0 to-emerald-500 py-1.5 pl-4 pr-1.5 text-xs font-semibold transition-all duration-300 hover:to-emerald-500/90 sm:text-sm"
              >
                <span className="flex-1 pr-2 text-center">Apply Now</span>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/20 transition-colors group-hover/btn:bg-white/30">
                  <Send className="h-3 w-3 text-white" />
                </div>
              </Link>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/internship/${internship.id}`;
                  const shareText = `Check out this Internship Opportunity: "${internship.title}"\n📍 Location: ${internship.location}\n⏳ Duration: ${internship.duration}\n💰 Category: ${internship.category}${internship.fee ? ` (Fee: ${internship.fee})` : ""}\n\nApply Link: ${url}`;
                  if (navigator.share) {
                    navigator
                      .share({
                        title: internship.title,
                        text: shareText,
                        url: url,
                      })
                      .catch(console.error);
                  } else {
                    navigator.clipboard.writeText(shareText);
                    toast.success("Internship details & apply link copied!");
                  }
                }}
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 transition-all duration-200 hover:bg-zinc-200 dark:border-zinc-700/60 dark:bg-zinc-800/80 dark:hover:bg-zinc-700"
                title="Share Internship"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      );
    };

  const { data: res, isLoading } = StudentDataHook.useInternships();
  const [viewMode, setViewMode] = React_3.useState<"grid" | "list">("grid");

    const runningInternships = React_3.useMemo(() => {
    const internships = res?.data || [];
    return (internships || [])
      .filter((i) => i.category === "RUNNING")
      .map(
        (
          i: InternshipPublic & {
            timePeriod?: string;
            facilities?: string;
            careerOpportunity?: string;
            organizer?: string;
            contact?: string | null;
            qualification?: string;
            lastDate?: string | null;
            credits?: string | number | null;
            instructor?: { name?: string };
          },
        ) => {
          let categoryLabel = "Free of Cost";
          if (i.type === "PAID") categoryLabel = "By Paying Fees";
          else if (i.type === "STIPEND") categoryLabel = "Stipend";

          let typeLabel = "Full Time";
          if (i.mode === "ONLINE") typeLabel = "Virtual";
          else if (i.mode === "HYBRID") typeLabel = "Part Time";

          const formatDate = (dateStr: string | null | undefined) => {
            if (!dateStr) return "";
            try {
              return new Date(dateStr).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
            } catch (_e) {
              return String(dateStr);
            }
          };

          return {
            id: i.id,
            adId: i.id,
            title: i.title,
            description: i.description,
            department: i.department || "Engineering",
            modules: Array.isArray(i.modules)
              ? i.modules
              : i.modules
                ? [i.modules]
                : [],
            project: i.projectFocus || "",
            tools: Array.isArray(i.tools) ? i.tools : i.tools ? [i.tools] : [],
            type: typeLabel,
            credits: i.credits || "4 Credits",
            location: i.location || "Remote",
            duration: i.duration || "8 Weeks",
            qualification: i.qualification || "B.Tech/M.Tech (CS/IT)",
            skills: i.skills || [],
            category: categoryLabel,
            timePeriod: i.timePeriod || "Non-Residential",
            facilities: i.facilities || "",
            careerOpportunity: i.careerOpportunity || "",
            startDate: formatDate(i.startDate),
            fee: i.price ? `₹${i.price.toLocaleString()}` : "Free",
            lastDate: formatDate(i.lastDate),
            mentor: i.instructor?.name || i.mentor?.name || "Senior Instructor",
            contact: i.contact || "Program Desk (+91 9472351693)",
            organizer: i.organizer || "IIIT Center of Excellence",
          };
        },
      );
  }, [res]);

  return (
    <main className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <section className="to-primary relative isolate flex min-h-[400px] items-center overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 pb-16 pt-12 md:pb-24 md:pt-16">
                    {}
                    <div className="pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
                    <div className="pointer-events-none absolute right-[-10%] top-[-20%] -z-[3] h-[500px] w-[500px] rounded-full bg-yellow-400 opacity-20 mix-blend-multiply blur-[150px] filter"></div>

                    <div className="relative z-10 mx-auto mt-4 grid w-[min(1300px,calc(100%-56px))] grid-cols-1 items-center gap-8 text-center md:mt-8 lg:grid-cols-2 lg:gap-0 lg:text-left">
                      {}
                      <div className="relative z-30 mx-auto w-full max-w-[560px] lg:mx-0">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                          <Zap_2 className="h-4 w-4 text-yellow-300" />
                          Rolling Admissions
                        </div>

                        <h1 className="text-primary-foreground mb-6 font-[family-name:var(--font-playfair-display,'Playfair_Display',serif)] text-[clamp(2.3rem,5vw,4rem)] leading-[1.1]">
                          Running Internships
                        </h1>

                        <p className="text-primary-foreground/85 mx-auto max-w-[500px] text-[1rem] leading-[1.6] sm:text-[1.1rem] lg:mx-0">
                          Join our ongoing rolling internship programs. Flexible start dates
                          designed for students and professionals looking to upskill anytime.
                        </p>
                      </div>

                      {}
                      <div className="relative mt-[20px] flex justify-center lg:mt-0 lg:translate-y-[20px] lg:justify-end">
                        <div className="absolute left-1/2 top-[20px] h-[260px] w-[300px] -translate-x-1/2 rotate-[10deg] rounded-[20px] bg-yellow-400 lg:left-auto lg:right-[60px] lg:translate-x-0"></div>
                        <img
                          src="/images/running-hero.jpg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/F-img.webp";
                          }}
                          alt="Running Internships"
                          className="relative z-10 aspect-[4/3] w-full max-w-[450px] rounded-[20px] border-[6px] border-white/10 object-cover shadow-2xl lg:max-w-[500px]"
                        />
                      </div>
                    </div>

                    {}
                    <div
                      className="pointer-events-none absolute bottom-[-6px] left-0 z-20 w-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        className="h-[80px] w-full md:h-[120px]"
                      >
                        <path
                          d="M0,60 C320,120 420,0 740,40 C1060,80 1280,20 1440,60 L1440,120 L0,120 Z"
                          className="fill-background"
                        />
                      </svg>
                    </div>
                  </section>
      <div className="relative z-10 flex w-full flex-col">
        <section className="relative z-10 mx-auto w-full max-w-[1300px] px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          {}
          <div className="pointer-events-none absolute left-[-10%] top-40 h-[300px] w-[300px] rounded-full bg-yellow-400 opacity-10 mix-blend-multiply blur-[120px] filter"></div>
          <div className="bg-primary pointer-events-none absolute bottom-40 right-[-10%] h-[400px] w-[400px] rounded-full opacity-10 mix-blend-multiply blur-[150px] filter"></div>

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row">
            {}
            <div className="w-full shrink-0 space-y-6 lg:w-[320px]">
                                {}
                                <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/20 dark:bg-black/40">
                                  <div className="bg-primary/10 pointer-events-none absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full mix-blend-multiply blur-xl filter"></div>
                                  <h3 className="text-foreground mb-4 text-base font-bold">
                                    Quick Search
                                  </h3>
                                  <div className="relative">
                                    <Search className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                      placeholder="e.g. Software Engineer"
                                      className="focus-visible:ring-primary h-11 rounded-xl border-white/40 bg-white/70 pl-10 shadow-inner dark:border-white/10 dark:bg-black/50"
                                    />
                                  </div>
                                </div>

                                {}
                                <div className="relative space-y-7 overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/20 dark:bg-black/40">
                                  <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 mix-blend-multiply blur-xl filter"></div>

                                  <div className="border-border/40 relative z-10 flex items-center justify-between border-b pb-4">
                                    <h3 className="text-foreground flex items-center gap-2 text-base font-bold">
                                      <Filter className="text-primary h-4 w-4" />
                                      Filters
                                    </h3>
                                    <button className="text-muted-foreground hover:text-primary bg-secondary/50 rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors">
                                      Clear All
                                    </button>
                                  </div>

                                  {}
                                  <div className="relative z-10 space-y-4">
                                    <h4 className="text-foreground flex items-center gap-2.5 text-sm font-bold">
                                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10">
                                        <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
                                      </div>
                                      Domain
                                    </h4>
                                    <div className="space-y-3">
                                      {["Engineering", "Design", "Marketing", "Data Science"].map(
                                        (item) => (
                                          <label
                                            key={item}
                                            className="group flex cursor-pointer items-center gap-3"
                                          >
                                            <input
                                              type="checkbox"
                                              className="text-primary focus:ring-primary accent-primary h-4 w-4 rounded border-gray-300 bg-white/50 shadow-sm dark:border-white/20 dark:bg-black/50"
                                            />
                                            <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
                                              {item}
                                            </span>
                                          </label>
                                        ),
                                      )}
                                    </div>
                                  </div>

                                  <div className="bg-border/40 h-[1px] w-full" />

                                  {}
                                  <div className="relative z-10 space-y-4">
                                    <h4 className="text-foreground flex items-center gap-2.5 text-sm font-bold">
                                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-500/10">
                                        <Clock className="h-3.5 w-3.5 text-blue-600" />
                                      </div>
                                      Duration
                                    </h4>
                                    <div className="space-y-3">
                                      {["1-2 Months", "3-4 Months", "6 Months", "Flexible"].map(
                                        (item) => (
                                          <label
                                            key={item}
                                            className="group flex cursor-pointer items-center gap-3"
                                          >
                                            <input
                                              type="checkbox"
                                              className="text-primary focus:ring-primary accent-primary h-4 w-4 rounded border-gray-300 bg-white/50 shadow-sm dark:border-white/20 dark:bg-black/50"
                                            />
                                            <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
                                              {item}
                                            </span>
                                          </label>
                                        ),
                                      )}
                                    </div>
                                  </div>

                                  <div className="bg-border/40 h-[1px] w-full" />

                                  {}
                                  <div className="relative z-10 space-y-4">
                                    <h4 className="text-foreground flex items-center gap-2.5 text-sm font-bold">
                                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10">
                                        <IndianRupee className="h-3.5 w-3.5 text-amber-600" />
                                      </div>
                                      Stipend
                                    </h4>
                                    <div className="space-y-3">
                                      {["Paid", "Unpaid", "Performance Based"].map((item) => (
                                        <label
                                          key={item}
                                          className="group flex cursor-pointer items-center gap-3"
                                        >
                                          <input
                                            type="checkbox"
                                            className="text-primary focus:ring-primary accent-primary h-4 w-4 rounded border-gray-300 bg-white/50 shadow-sm dark:border-white/20 dark:bg-black/50"
                                          />
                                          <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
                                            {item}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

            {}
            <div className="min-w-0 flex-1">
              {}
              <div className="border-border/40 mb-6 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-foreground text-2xl font-bold">
                    Showing {runningInternships.length} Running Internships
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm font-medium">
                    Explore ongoing, live practice internships and join
                    directly.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-zinc-200/60 bg-zinc-50/50 p-1 dark:border-zinc-800/60 dark:bg-zinc-900/50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "text-primary shadow-xs bg-white dark:bg-zinc-800"
                        : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${
                      viewMode === "list"
                        ? "text-primary shadow-xs bg-white dark:bg-zinc-800"
                        : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    }`}
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
                </div>
              ) : runningInternships.length === 0 ? (
                <div className="text-muted-foreground py-12 text-center font-semibold">
                  No active running internships available.
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 items-start gap-5 md:grid-cols-2"
                      : "flex flex-col items-stretch gap-5"
                  }
                >
                  {runningInternships.map((internship) => (
                    <RunningInternshipCard
                      key={internship.id}
                      viewMode={viewMode}
                      internship={
                        {
                          ...internship,
                                                    type: "Running",
                        } as unknown as RunningInternship
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
