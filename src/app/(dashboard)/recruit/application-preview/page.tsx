"use client";

import { Metadata } from "next";
import React_2 from "react";
import { Download, Eye, FileWarning, Printer, LucideIcon as LucideIcon_2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import * as React_4 from "react";
import React_3 from "react";
import { useEffect, useMemo, useState } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { clsx as clsx_2, ClassValue as ClassValue_2 } from "clsx";
import { twMerge as twMerge_2 } from "tailwind-merge";
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { create } from "zustand";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot } from "radix-ui";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormProvider } from "react-hook-form";
import qrcode from "qrcode-generator";
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

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn(
          "max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded-lg shadow-md ring-1 duration-100 data-[align-trigger=true]:animate-none",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:min-w-(--radix-select-trigger-width) p-1 data-[position=popper]:w-full",
            position === "popper" && "",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex min-h-7 w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input bg-input/20 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex w-fit items-center justify-between gap-1.5 whitespace-nowrap rounded-md border px-3 py-2 text-xs/relaxed outline-none transition-colors focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-3.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

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
const Form = FormProvider;

const XF81bba3e_2 = qrcode;

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

type TRecruitEducationPayload = Omit<
      TRecruitEducation,
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

function generateJobApplicationCode(
      applicationId: string,
      createdAt?: string | Date | null,
    ): string {
      if (!applicationId) return "";
      const date = createdAt ? new Date(createdAt) : new Date();
      const year = String(date.getFullYear()).slice(-2);

      let hash = 0;
      for (let i = 0; i < applicationId.length; i++) {
        hash = (hash * 31 + applicationId.charCodeAt(i)) >>> 0;
      }

      const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const c1 = ALPHA[hash % 26]!;
      const h2 = Math.floor(hash / 26);
      const c2 = ALPHA[h2 % 26]!;

      const h3 = Math.floor(h2 / 26);
      const numeric = String(1000 + (h3 % 9000)).padStart(4, "0");

      return `APP${year}${c1}${c2}${numeric}`;
    }

function normaliseApplication(raw: Record<string, unknown>) {
      const id = typeof raw["id"] === "string" ? raw["id"] : "";
      const submittedAt =
        (raw["submittedAt"] as string) ?? (raw["createdAt"] as string) ?? "";

          const applicationId =
        typeof raw["applicationId"] === "string" && raw["applicationId"]
          ? raw["applicationId"]
          : id
            ? generateJobApplicationCode(id, submittedAt)
            : "";

      const job = (raw["jobOpportunity"] ?? raw["opening"]) as
        Record<string, unknown> | undefined;
      const opening = job
        ? {
            postName: (job["postName"] ?? job["postOpportunity"] ?? "") as string,
            advtNo: (job["advtNo"] ?? job["advtNoAndDate"] ?? "") as string,
            closingDate: (job["closingDate"] ?? "") as string,
            companyName: (job["companyName"] ?? "") as string,
          }
        : undefined;

      return {
        id,
        applicationId,
        status: (raw["status"] as TRecruitApplication["status"]) ?? "SUBMITTED",
        pdfUrl: (raw["pdfUrl"] as string | null) ?? null,
        submittedAt,
        opening,
      };
    }

type TNormalisedApplication = ReturnType<typeof normaliseApplication>;

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

interface TRecruitReference_2 {
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

interface TRecruitSpecificInfo_2 {
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

interface RecruitSectionShellProps {
      title: string;
      description?: string;
      icon?: LucideIcon_2;
        actions?: React_4.ReactNode;
      children: React_4.ReactNode;
      className?: string;
    }

function cn_5(...inputs: ClassValue_2[]) {
      return twMerge_2(clsx_2(inputs));
    }

function RecruitSectionShell({
      title,
      description,
      icon: Icon,
      actions,
      children,
      className,
    }: RecruitSectionShellProps) {
      return (
        <div className={cn_5("mx-auto max-w-6xl space-y-6 p-4 md:p-6", className)}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              {Icon && (
                <div className="bg-primary/10 text-primary hidden rounded-2xl p-2.5 sm:block">
                  <Icon className="size-5" />
                </div>
              )}
              <div className="space-y-0.5">
                <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                  {title}
                </h1>
                {description && (
                  <p className="text-muted-foreground max-w-2xl text-sm">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex shrink-0 items-center gap-2 print:hidden">
                {actions}
              </div>
            )}
          </div>
          {children}
        </div>
      );
    }

interface RecruitProfileGateProps {
      isLoading: boolean;
      hasProfile: boolean;
      children: React.ReactNode;
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

function Select_12({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />;
    }

function SelectValue_12({
      ...props
    }: React_3.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />;
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


export default function RecruitApplicationPreviewPage() {
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

    type TRecruitExperiencePayload = Omit<
      TRecruitExperience,
      "id" | "profileId" | "createdAt"
    >;
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

    function totalExperience(rows: TRecruitExperience[]): string {
      const years = rows.reduce(
        (sum, r) => sum + (Number(r.totalExperience) || 0),
        0,
      );
      if (!years) return "0 Year(s)";
      const whole = Math.floor(years);
      const months = Math.round((years - whole) * 12);
      return months ? `${whole} Year(s) ${months} Month(s)` : `${whole} Year(s)`;
    }

    function RecruitProfileGate({
      isLoading,
      hasProfile,
      children,
    }: RecruitProfileGateProps) {
      if (isLoading) {
        return (
          <div className="space-y-3">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        );
      }

      if (!hasProfile) {
        return (
          <Card className="border-border/60 border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600">
                <FileWarning className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold">
                  Complete your personal information first
                </h3>
                <p className="text-muted-foreground mx-auto max-w-sm text-sm">
                  This section is part of your registration profile. Fill in your
                  personal details to unlock it.
                </p>
              </div>
              <Button asChild size="sm">
                <Link href="/recruit/personal-information">
                  Go to Personal Information
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      }

      return <>{children}</>;
    }

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
      experience: TRecruitExperience[];
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
      references,
      specificInfo,
      applicationId,
      advtNo,
      postName,
      submittedAt,
    }: ApplicationPrintoutProps) {
        const raw = profile as unknown as Record<string, string | null | undefined>;
      const pick = (...keys: string[]) => {
        for (const key of keys) {
          const value = raw[key];
          if (typeof value === "string" && value.trim()) return value;
        }
        return "";
      };

      const name = pick("name", "fullName");
      const mobile = pick("mobile", "mobileNo");
      const aadhaar = pick("adharNo", "aadharNo");
      const languages = pick("languageKnown", "languagesKnown");
      const photoUrl = pick("photoUrl");
      const signatureUrl = pick("signatureUrl");

      const permanent = [
        pick("permAddressLocal"),
        pick("permAddressBlock"),
        [pick("permAddressDistrict"), pick("permAddressState")]
          .filter(Boolean)
          .join(", "),
        [pick("permAddressCountry"), pick("permAddressPinCode")]
          .filter(Boolean)
          .join(" - "),
      ];
      const correspondence = [
        pick("currAddressLocal"),
        pick("currAddressBlock"),
        [pick("currAddressDistrict"), pick("currAddressState")]
          .filter(Boolean)
          .join(", "),
        [pick("currAddressCountry"), pick("currAddressPinCode")]
          .filter(Boolean)
          .join(" - "),
      ];

      const qr = qrDataUrl(applicationId);

        const physicallyChallenged =
        typeof profile.physicalChallenged === "boolean"
          ? profile.physicalChallenged
            ? "Y"
            : "N"
          : pick("physicallyChallenged") === "Yes"
            ? "Y"
            : "N";

      const highestQualification = education.length
        ? formatEnum(education[education.length - 1]!.qualification)
        : "—";

      return (
        <div className="printable-area mx-auto w-full max-w-3xl border border-slate-400 bg-white p-4 text-slate-900 md:p-6 print:border-0 print:p-0">
          {}
          <div className="relative mt-2 flex flex-col items-center justify-center space-y-0.5 text-center">
            {qr && (
              <div className="absolute right-0 top-0">
                <img src={qr} alt="" aria-hidden="true" className="size-16" />
              </div>
            )}
            <h1 className="mt-2 text-[13px] font-bold text-blue-900 md:text-[15px]">
              International Institute of Internship [i3]
            </h1>
            <p className="text-[10px] font-semibold">
              Recruitment Application Form
            </p>
          </div>

          {}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 border-y border-slate-400 py-1 text-[9.5px]">
            <span>
              <b>Advt. No:</b> {advtNo || "—"}
            </span>
            <span>
              <b>Application No:</b>{" "}
              <span className="font-mono font-bold">{applicationId}</span>
            </span>
            <span>
              <b>Position:</b> {postName || "—"}
            </span>
          </div>

          {}
          <Band>Personal Information</Band>
          <div className="flex gap-3">
            <div className="min-w-0 flex-1 border-x border-t border-slate-300">
              <Cell label="Name">{name}</Cell>
              <Cell label="S/O | D/O | W/O">{profile.fatherName}</Cell>
              <Cell label="Mother's Name">{profile.motherName}</Cell>
              <Cell label="Date of Birth">{govDate(profile.dob)}</Cell>
              {}
              <Cell label="Age">{ageBreakdown(profile.dob)}</Cell>
              <Cell label="Gender">{formatEnum(profile.gender)}</Cell>
              <Cell label="Physically Challenged">{physicallyChallenged}</Cell>
              <Cell label="Marital Status">
                {formatEnum(profile.maritalStatus)}
              </Cell>
              <Cell label="Category">{formatEnum(profile.category)}</Cell>
              <Cell label="Religion">{formatEnum(profile.religion)}</Cell>
              <Cell label="Blood Group">{formatEnum(profile.bloodGroup)}</Cell>
              <Cell label="Nationality">{profile.nationality}</Cell>
              <Cell label="Mobile No">{mobile}</Cell>
              <Cell label="Email">{profile.email}</Cell>
              <Cell label="Aadhaar No">{aadhaar}</Cell>
              <Cell label="Language(s) Known">{languages}</Cell>
            </div>
            {}
            <div className="flex h-[104px] w-[84px] shrink-0 items-center justify-center border border-slate-400 bg-slate-50">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Applicant photograph"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="px-1 text-center text-[8px] text-slate-400">
                  Photograph
                </span>
              )}
            </div>
          </div>

          {}
          <div className="mt-2 grid grid-cols-1 border border-slate-300 sm:grid-cols-2">
            <div className="border-b border-slate-300 sm:border-b-0 sm:border-r">
              <div className="border-b border-slate-300 bg-slate-50/80 px-1.5 py-1 text-[9.5px] font-bold">
                Permanent Address
              </div>
              <div className="px-1.5 py-1 text-[9.5px] leading-relaxed">
                {addressLines(permanent)}
              </div>
            </div>
            <div>
              <div className="border-b border-slate-300 bg-slate-50/80 px-1.5 py-1 text-[9.5px] font-bold">
                Correspondence Address
              </div>
              <div className="px-1.5 py-1 text-[9.5px] leading-relaxed">
                {addressLines(correspondence)}
              </div>
            </div>
          </div>

          {}
          <Band>
            Education Qualification Details
            <span className="float-right font-normal normal-case">
              Essential Qualification : {highestQualification}
            </span>
          </Band>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th className="w-[26px] text-center">#</Th>
                <Th>Qualification</Th>
                <Th>Board or University</Th>
                <Th>Subjects</Th>
                <Th className="w-[110px]">Division Marks Year</Th>
              </tr>
            </thead>
            <tbody>
              {education.length === 0 ? (
                <tr>
                  <Td className="text-center text-slate-500">—</Td>
                  <Td className="text-slate-500">No records</Td>
                  <Td>—</Td>
                  <Td>—</Td>
                  <Td>—</Td>
                </tr>
              ) : (
                education.map((row, index) => {
                  const r = row as unknown as Record<string, unknown>;
                  const institute = (r["instituteName"] ??
                    r["schoolInstitute"] ??
                    "") as string;
                  const division = (r["division"] ??
                    r["passingDivision"] ??
                    "") as string;
                  const marks = (r["percentage"] ?? r["passingMarks"] ?? "") as
                    string | number;
                  return (
                    <tr key={row.id ?? index}>
                      <Td className="text-center">{index + 1}</Td>
                      <Td className="font-semibold text-blue-800">
                        {formatEnum(row.qualification)}
                      </Td>
                      <Td>{row.boardUniversity || institute || "—"}</Td>
                      <Td>{row.subject || "—"}</Td>
                      <Td>
                        {[division, marks !== "" ? `${marks}%` : "", row.endYear]
                          .filter(Boolean)
                          .join(" - ") || "—"}
                      </Td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {}
          <Band>
            Work Experience Details
            <span className="float-right font-normal normal-case">
              Total Experience : {totalExperience(experience)}
            </span>
          </Band>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th className="w-[26px] text-center">#</Th>
                <Th className="w-[110px]">Employer Details</Th>
                <Th className="w-[130px]">Employment Details</Th>
                <Th>Nature of Work</Th>
              </tr>
            </thead>
            <tbody>
              {experience.length === 0 ? (
                <tr>
                  <Td className="text-center text-slate-500">—</Td>
                  <Td className="text-slate-500">No records</Td>
                  <Td>—</Td>
                  <Td>—</Td>
                </tr>
              ) : (
                experience.map((row, index) => {
                  const r = row as unknown as Record<string, unknown>;
                  const years = (r["totalExperience"] ??
                    r["experienceYears"] ??
                    "") as string | number;
                  return (
                    <tr key={row.id ?? index}>
                      <Td className="text-center">{index + 1}</Td>
                      <Td className="font-semibold text-blue-800">
                        {row.employerName}
                        {row.postingLocation && (
                          <div className="font-normal text-slate-600">
                            {row.postingLocation}
                          </div>
                        )}
                      </Td>
                      <Td>
                        <div className="font-semibold">{row.designation}</div>
                        <div className="text-slate-600">
                          Tenure: {govDate(row.startDate)} —{" "}
                          {row.endDate ? govDate(row.endDate) : "Present"}
                        </div>
                        {years !== "" && (
                          <div className="text-slate-600">
                            Duration: {years} Year(s)
                          </div>
                        )}
                      </Td>
                      <Td>{row.natureOfWork || "—"}</Td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {}
          <Band>Reference Details</Band>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th className="w-[26px] text-center">#</Th>
                <Th>Name with Designation</Th>
                <Th>Organization Name with Address</Th>
                <Th className="w-[80px]">Mobile</Th>
                <Th className="w-[120px]">Email ID</Th>
              </tr>
            </thead>
            <tbody>
              {references.length === 0 ? (
                <tr>
                  <Td className="text-center text-slate-500">—</Td>
                  <Td className="text-slate-500">No records</Td>
                  <Td>—</Td>
                  <Td>—</Td>
                  <Td>—</Td>
                </tr>
              ) : (
                references.map((row, index) => (
                  <tr key={row.id ?? index}>
                    <Td className="text-center">{index + 1}</Td>
                    <Td className="uppercase">
                      {row.name}
                      {row.designation ? ` (${row.designation})` : ""}
                    </Td>
                    <Td>
                      {row.organisation || "—"}
                      {row.address && (
                        <div className="text-slate-600">{row.address}</div>
                      )}
                    </Td>
                    <Td>{row.mobile || "—"}</Td>
                    <Td className="break-all">{row.email || "—"}</Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {}
          <Band>Application Fee</Band>
          <p className="px-1.5 py-1 text-[9.5px]">No Application fee to be Paid.</p>

          <Band>Additional Documents</Band>
          <ol className="list-inside list-decimal px-1.5 py-1 text-[9.5px]">
            {[
              profile.resumeUrl && "RESUME",
              signatureUrl && "SIGNATURE",
              photoUrl && "PHOTOGRAPH",
            ]
              .filter(Boolean)
              .map((label) => <li key={label as string}>{label}</li>) || null}
            {!profile.resumeUrl && !signatureUrl && !photoUrl && (
              <li className="list-none text-slate-500">No documents uploaded.</li>
            )}
          </ol>

          {}
          <Band>Specific Information</Band>
          <ol className="list-outside list-decimal space-y-1 py-1 pl-6 pr-1.5 text-[9.5px]">
            <li>
              Whether agreeable to undergo thorough training on various issues
              relating to the job to be performed as per the Terms of Reference:{" "}
              <b>{specificInfo ? "Yes" : "—"}</b>
            </li>
            <li>
              Whether agreeable to reside in any State of India or own my
              arrangement, work in the remote rural areas of the allocated
              districts:{" "}
              <b>
                {specificInfo
                  ? specificInfo.willingToRelocate
                    ? "Yes"
                    : "No"
                  : "—"}
              </b>
            </li>
            <li>
              Preference of State/UT for your posting: <b>Not Applicable</b>
            </li>
            <li>
              Language(s) known: <b className="uppercase">{languages || "—"}</b>
            </li>
            {specificInfo?.isGovernmentEmployee && (
              <li>
                Currently employed with a Government / Public Sector organisation:{" "}
                <b>Yes</b>
              </li>
            )}
            {specificInfo?.isEverConvicted && (
              <li>
                Ever convicted by a court of law: <b>Yes</b>
                {specificInfo.convictionDetails
                  ? ` — ${specificInfo.convictionDetails}`
                  : ""}
              </li>
            )}
            {specificInfo?.noticePeriod && (
              <li>
                Notice period: <b>{specificInfo.noticePeriod}</b>
              </li>
            )}
          </ol>

          {}
          <Band>Declaration</Band>
          <p className="px-1.5 py-1 text-[9.5px] leading-relaxed">
            I have carefully gone through the vacancy advertisement and I am well
            aware that the information furnished in the Application Form duly
            supported by the documents in respect of Essential Qualification / Work
            Experience submitted by me will also be assessed by the Selection
            Committee at the time of selection for the post. The information /
            details furnished by me are correct and true to the best of my knowledge
            and no material fact having a bearing on my selection has been
            suppressed / withheld.
          </p>

          {}
          <div className="mt-2 flex items-end justify-between gap-4 border-t border-slate-400 pt-1.5">
            <div className="text-[9px] text-slate-600">
              <div>
                <b>Date:</b> {govDate(submittedAt ?? profile.updatedAt)}
              </div>
              <div>
                <b>Application No:</b>{" "}
                <span className="font-mono">{applicationId}</span>
              </div>
            </div>
            <div className="text-center">
              {signatureUrl ? (
                <img
                  src={signatureUrl}
                  alt="Applicant signature"
                  className="mx-auto h-10 w-28 object-contain"
                />
              ) : (
                <div className="h-10 w-28" />
              )}
              <div className="border-t border-slate-400 pt-0.5 text-[8.5px] font-semibold uppercase">
                Signature of the Applicant
              </div>
            </div>
          </div>
        </div>
      );
    }

    const { data: profileResponse, isLoading: isProfileLoading } =
            RecruitDataHooks.useProfile();
    const { data: applicationsResponse, isLoading: isAppsLoading } =
            RecruitDataHooks.useMyApplications();
    const { data: educationResponse } = RecruitDataHooks.useEducation();
    const { data: experienceResponse } = RecruitDataHooks.useExperience();
    const { data: referencesResponse } = RecruitDataHooks.useReferences();
    const { data: specificInfoResponse } = RecruitDataHooks.useSpecificInfo();
    const profile = profileResponse?.data as TRecruitProfile | undefined;
    const hasProfile = !!profileResponse?.success && !!profile;
    const applications: TNormalisedApplication[] = React_3.useMemo(() => {
            const raw = (applicationsResponse?.data ?? []) as Record<string, unknown>[];
            return raw.map(normaliseApplication).filter((a) => !!a.applicationId);
          }, [applicationsResponse?.data]);
    const education = (educationResponse?.data ?? []) as TRecruitEducation[];
    const experience = (experienceResponse?.data ?? []) as TRecruitExperience_2[];
    const references = (referencesResponse?.data ?? []) as TRecruitReference_2[];
    const specificInfo = specificInfoResponse?.data as
            TRecruitSpecificInfo_2 | undefined;
    const [selectedId, setSelectedId] = React_3.useState<string>("");
    React_3.useEffect(() => {
            if (!selectedId && applications.length > 0) {
              setSelectedId(applications[0]!.applicationId);
            }
          }, [applications, selectedId]);
    const selected = applications.find(
            (application) => application.applicationId === selectedId,
          );


  return (
    <main className="min-h-full">
      <h1 className="sr-only">Application Preview</h1>
      <RecruitSectionShell
                    title="Application Preview"
                    description="A read-only snapshot of everything you have filled in. Print it or save it as a PDF for your records."
                    icon={Eye}
                    actions={
                      hasProfile ? (
                        <>
                          {selected?.pdfUrl && (
                            <Button asChild size="sm" variant="outline">
                              <a href={selected.pdfUrl} target="_blank" rel="noreferrer">
                                <Download className="mr-1.5 size-4" />
                                Download PDF
                              </a>
                            </Button>
                          )}
                          <Button size="sm" onClick={() => window.print()}>
                            <Printer className="mr-1.5 size-4" />
                            Print
                          </Button>
                        </>
                      ) : null
                    }
                  >
                    <RecruitProfileGate isLoading={isProfileLoading} hasProfile={hasProfile}>
                      {profile && (
                        <div className="space-y-6">
                          {}
                          {isAppsLoading ? (
                            <Skeleton className="h-20 w-full rounded-2xl" />
                          ) : applications.length > 0 ? (
                            <Card className="border-border/60 print:hidden">
                              <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-0.5">
                                  <span className="text-muted-foreground block text-xs font-medium">
                                    Previewing Application
                                  </span>
                                  <span className="font-mono text-sm font-bold">
                                    {selected?.applicationId ?? "—"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {selected && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/10"
                                    >
                                      {formatEnum(selected.status)}
                                    </Badge>
                                  )}
                                  <Select_12 value={selectedId} onValueChange={setSelectedId}>
                                    <SelectTrigger className="w-[240px]">
                                      <SelectValue_12 placeholder="Select an application" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {applications.map((application) => (
                                        <SelectItem
                                          key={application.applicationId}
                                          value={application.applicationId}
                                        >
                                          {application.applicationId}
                                          {application.opening?.postName
                                            ? ` — ${application.opening.postName}`
                                            : ""}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select_12>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <div className="rounded-xl border border-dashed px-4 py-3 text-xs font-medium print:hidden">
                              No application submitted yet — this preview shows your saved
                              profile.
                            </div>
                          )}

                          {}
                          <ApplicationPrintout
                            profile={profile}
                            education={education}
                            experience={experience}
                            references={references}
                            specificInfo={specificInfo}
                            applicationId={selected?.applicationId ?? ""}
                            advtNo={selected?.opening?.advtNo}
                            postName={selected?.opening?.postName}
                            submittedAt={selected?.submittedAt ?? profile.updatedAt}
                          />
                        </div>
                      )}
                    </RecruitProfileGate>
                  </RecruitSectionShell>
    </main>
  );
}
