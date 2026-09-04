"use client";

import { Metadata } from "next";
import React_3 from "react";
import { Award, Bell, Briefcase as Briefcase_2, Compass, DollarSign, FilePlus, Info, MessageSquare, RefreshCw, Activity } from "lucide-react";
import * as React from "react";
import React_2 from "react";
import { ReactNode, useLayoutEffect, useContext, Dispatch, SetStateAction, useMemo } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthContext } from "@/x/8789d6dc";
import { LayoutContext } from "@/x/72be5b4f";
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

enum ESlotName {
  APP_SIDEBAR = "app-sidebar",
  BREADCRUMB = "breadcrumb",
  NAV_TABS = "nav-tabs",
  SUB_NAV_TABS = "sub-nav-tabs",
  LEFT_SIDEBAR = "left-sidebar",
  LEFT_FILTER = "left-filter",
  RIGHT_FILTER = "right-filter",
  DETAIL_SIDEBAR = "detail-sidebar",
  PAGE_HEADER = "page-header",
}

interface LayoutContextProps {
  isFilterOpen: boolean;
  isDetailsSidebarOpen: boolean;
  isLeftSidebarOpen: boolean;
  noPadding: boolean;

  setIsFilterOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  setIsDetailsSidebarOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
  setIsLeftSidebarOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
          requestNoPadding: () => () => void;

  slots: Record<ESlotName, React_2.ReactNode>;
  setSlot: (name: ESlotName, content: React_2.ReactNode) => void;
}

const DEFAULT_TEST_SLOTS: Record<ESlotName, React_2.ReactNode> = {
  [ESlotName.APP_SIDEBAR]: null,
  [ESlotName.BREADCRUMB]: null,
  [ESlotName.NAV_TABS]: null,
  [ESlotName.SUB_NAV_TABS]: null,
  [ESlotName.LEFT_FILTER]: null,
  [ESlotName.RIGHT_FILTER]: null,
  [ESlotName.DETAIL_SIDEBAR]: null,
  [ESlotName.PAGE_HEADER]: null,
  [ESlotName.LEFT_SIDEBAR]: null,
};

const DEFAULT_TEST_CONTEXT: LayoutContextProps = {
  isFilterOpen: false,
  isDetailsSidebarOpen: false,
  isLeftSidebarOpen: false,
  noPadding: false,
  setIsFilterOpen: () => {},
  setIsDetailsSidebarOpen: () => {},
  setIsLeftSidebarOpen: () => {},
  requestNoPadding: () => () => {},
  slots: DEFAULT_TEST_SLOTS,
  setSlot: () => {},
};

const useLayoutContext = () => {
  const context = React_2.useContext(LayoutContext);
  if (!context) {
        if (process.env.NODE_ENV === "test") {
      return DEFAULT_TEST_CONTEXT;
    }
    throw new Error(
      "useLayoutContext must be used within a LayoutContextProvider",
    );
  }
  return context;
};

const useSlot = (name: ESlotName, content: React_2.ReactNode) => {
  const { setSlot } = useLayoutContext();
    useLayoutEffect(() => {
    setSlot(name, content);
    return () => setSlot(name, null);
  }, [name, content, setSlot]);
};

const PageHeaderLayout = ({
  children,
}: {
  children: React_2.ReactNode;
}) => {
  const content = React_2.useMemo(
    () => (
      <div className="bg-background flex w-full min-w-0 flex-col border-b px-6 print:hidden">
        {children}
      </div>
    ),
    [children],
  );
  useSlot(ESlotName.PAGE_HEADER, content);
  if (process.env.NODE_ENV === "test") return content;
  return null;
};

interface IHeadingProps {
  title: React.ReactNode;
  description: string;
}

const Heading: React.FunctionComponent<IHeadingProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-1 pb-4">
      <h2 className="text-foreground text-lg font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
};

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
type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

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

interface TInstructorQualification {
      id?: string;
      highestQualification: string;
      specialization: string;
      universityName: string;
      yearOfCompletion: string;
      percentage: string;
    }

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

interface TInstructorAddress {
      local: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

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

type ListInstructorRegistrationsResponse = ApiSuccess<
      InstructorRegistrationResponse[]
    >;

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


export default function InstructorDashboardPage() {
    function useAuth() {
      return useContext(AuthContext);
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

    interface ListSubmissionsResponse {
      success: boolean;
      data: ProjectSubmissionObject[];
    }

    interface GradeSubmissionResponse {
      success: boolean;
      message?: string;
      data?: ProjectSubmissionObject;
    }

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

    interface InstructorDashboardStatsData {
      totalInternshipsAssignedByI3: number;
      totalInternshipsPostYourself: number;
      myTotalInterns: number;
      totalInternshipDoneByMe: number;
      totalImmersionDoneByMe: number;
      totalPaymentEarnings: number;
    }

    interface StatsCardGridProps {
      stats?: InstructorDashboardStatsData;
      isLoading?: boolean;
    }

    function StatsCardGrid_2({
      stats,
      isLoading,
    }: StatsCardGridProps) {
      const cards = [
        {
          id: "stat-assigned-internships",
          title: "Internships Assigned by i3",
          value: isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            (stats?.totalInternshipsAssignedByI3 ?? 0)
          ),
          icon: Briefcase_2,
          color:
            "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          description: "Accepted internships assigned to you by i3",
        },
        {
          id: "stat-posted-internships",
          title: "Internships Posted Yourself",
          value: isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            (stats?.totalInternshipsPostYourself ?? 0)
          ),
          icon: FilePlus,
          color:
            "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          description: "Your internship listings approved by super admin",
        },
        {
          id: "stat-total-immersions",
          title: "Total Immersions (Me)",
          value: isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            (stats?.totalImmersionDoneByMe ?? 0)
          ),
          icon: Compass,
          color:
            "from-cyan-500/10 to-sky-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
          description: "Immersion programs accepted by you",
        },
        {
          id: "stat-total-payments",
          title: "Total Payment",
          value: isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            `₹${(stats?.totalPaymentEarnings || 0).toLocaleString()}`
          ),
          icon: DollarSign,
          color:
            "from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
          description: "Aggregated payments earned",
        },
      ];

      return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className="bg-card/85 border-border/50 group relative overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {}
                <div
                  className={`absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-tr ${card.color} opacity-40 blur-xl transition-transform duration-500 group-hover:scale-125`}
                />

                <div className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <div className="text-foreground text-3xl font-extrabold tracking-tight">
                        {card.value}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`size-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center border shadow-inner`}
                  >
                    <Icon className="size-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 text-xs font-medium leading-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      );
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

    interface ActivitiesFeedProps {
      recentApplications: StudentApplication[];
      recentStudents: any[];
      recentSubmissions: ProjectSubmissionObject[];
      recentNotices: any[];
      recentFeedbacks: any[];
      isLoading?: boolean;
    }

    function ActivitiesFeed_2({
      recentApplications,
      recentSubmissions,
      recentNotices,
      recentFeedbacks,
      isLoading,
    }: ActivitiesFeedProps) {
      const activities: any[] = [];

      if (!isLoading) {
        (recentSubmissions as any[]).forEach((sub) => {
          activities.push({
            id: `sub-${sub.id}`,
            title: "New Project Submission",
            description: `${sub.enrollment?.user?.name || "Student"} submitted a project for "${sub.enrollment?.internship?.title || "Internship"}".`,
            time: new Date(sub.createdAt).toLocaleDateString(),
            dateObj: new Date(sub.createdAt),
            icon: Award,
            color:
              "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          });
        });

        recentApplications.forEach((app) => {
          activities.push({
            id: `app-${app.id}`,
            title: "New Application",
            description: `${app.student?.fullName || "Student"} applied for your internship.`,
            time: app.appliedAt
              ? new Date(app.appliedAt).toLocaleDateString()
              : "Just now",
            dateObj: app.appliedAt ? new Date(app.appliedAt) : new Date(),
            icon: Bell,
            color:
              "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          });
        });

        recentNotices.forEach((notice) => {
          activities.push({
            id: `notice-${notice.id}`,
            title: "Notice Broadcasted",
            description: `Announcement "${notice.title}" posted to student channels.`,
            time: new Date(notice.createdAt).toLocaleDateString(),
            dateObj: new Date(notice.createdAt),
            icon: Bell,
            color:
              "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
          });
        });

        recentFeedbacks.forEach((fb) => {
          activities.push({
            id: `fb-${fb.id}`,
            title: "Feedback Received",
            description: `${fb.sender?.name || "Student"} submitted feedback for your class.`,
            time: new Date(fb.createdAt).toLocaleDateString(),
            dateObj: new Date(fb.createdAt),
            icon: MessageSquare,
            color:
              "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          });
        });

            activities.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
      }

        const displayActivities = activities.slice(0, 5);

      return (
        <div className="bg-card/85 border-border/50 rounded-2xl border p-6 shadow-sm backdrop-blur-md">
          <div className="border-border/60 flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <h3 className="text-foreground text-base font-bold">
                Recent Activity Logs
              </h3>
              <p className="text-muted-foreground text-xs font-medium">
                Keep track of your classes and evaluation pipelines.
              </p>
            </div>
            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              Real-time
            </span>
          </div>

          {isLoading ? (
            <div className="mt-5 space-y-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="size-9 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-10 text-center">
              <Info className="text-muted-foreground size-8" />
              <p className="text-muted-foreground text-xs italic">
                No recent activity logs yet.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              {displayActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    id={act.id}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${act.color}`}
                    >
                      <Icon className="size-4.5 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-foreground group-hover:text-primary truncate text-sm font-semibold transition-colors">
                          {act.title}
                        </span>
                        <span className="text-muted-foreground shrink-0 text-[10px] font-medium">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const { user } = useAuth();
    const {
            data: statsResponse,
            isLoading: isStatsLoading,
            isError: isStatsError,
            refetch: refetchStats,
          } = InstructorDataHooks.useInstructorDashboardStats();
    const handleRefresh = async () => {
            await refetchStats();
          };


  return (
    <main className="min-h-full">
      <h1 className="sr-only">Instructor Dashboard Overview</h1>
      <div className="space-y-8 pb-10">
                    {}
                    <PageHeaderLayout>
                      <div className="flex w-full flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <Heading
                          title={`Welcome Back, ${user?.name || "Mentor"}!`}
                          description="Here is your cohort's evaluation progress overview for today."
                        />
                        <Button
                          id="btn-refresh-dashboard"
                          onClick={handleRefresh}
                          variant="outline"
                          size="sm"
                          className="active:scale-98 h-9 w-full shrink-0 justify-center gap-1.5 font-semibold shadow-sm sm:w-auto"
                        >
                          <RefreshCw className="size-4" />
                          Refresh Stats
                        </Button>
                      </div>
                    </PageHeaderLayout>

                    {isStatsError || (statsResponse && !statsResponse.success) ? (
                      <div className="bg-card/85 border-border/50 mx-auto my-12 flex max-w-md flex-col items-center space-y-4 rounded-2xl border p-6 text-center shadow-sm backdrop-blur-md">
                        <div className="flex size-12 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-500">
                          <RefreshCw className="size-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-foreground text-base font-bold">
                            Syncing Error
                          </h4>
                          <p className="text-muted-foreground text-xs leading-normal">
                            Failed to retrieve your dashboard stats. Please check your network
                            connection and try again.
                          </p>
                        </div>
                        <Button
                          onClick={handleRefresh}
                          variant="outline"
                          size="sm"
                          className="h-9 px-4 font-semibold"
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : (
                      <>
                        {}
                        <StatsCardGrid_2
                          stats={statsResponse?.data?.stats}
                          isLoading={isStatsLoading}
                        />

                        {}
                        <div className="grid grid-cols-1 gap-6">
                          <ActivitiesFeed_2
                            recentApplications={statsResponse?.data?.recentApplications || []}
                            recentStudents={statsResponse?.data?.recentStudents || []}
                            recentSubmissions={statsResponse?.data?.recentSubmissions || []}
                            recentNotices={statsResponse?.data?.recentNotices || []}
                            recentFeedbacks={statsResponse?.data?.recentFeedbacks || []}
                            isLoading={isStatsLoading}
                          />
                        </div>
                      </>
                    )}
                  </div>
    </main>
  );
}
