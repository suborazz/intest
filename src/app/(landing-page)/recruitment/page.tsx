"use client";

import { Archive, Calendar, ChevronDown, Clock as Clock_2, Download, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { create } from "zustand";
import { axiosInstance } from "@/x/acfb3dca";

interface JobOpportunityPublic {
  id: string;
  companyName: string;
  address: string;
  postOpportunity: string;
  jobNature: string;
  fieldOfEmployment: string;
  minQualification: string;
  skillsRequired?: string;
  totalStaffStrength?: string;
  website?: string;
  logoUrl?: string;
  isActive: boolean;
  advtNo?: string;
  advtDate?: string;
  closingDate?: string;
  jdDocUrl?: string;
  jdDescription?: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}
interface GetJobOpportunitiesParams {
      page?: number;
      limit?: number;
      search?: string;
    }

type TQueryOptions<TData, TError = Error> = Omit<
      UseQueryOptions<TData, TError, TData, readonly unknown[]>,
      "queryKey" | "queryFn"
    >;

interface GenericApiResponse<T = undefined> {
      success: boolean;
      message?: string;
      data?: T;
    }

const SUPER_ADMIN_QUERY_KEYS = {
      ALL: ["super-admin"] as const,
      JOB_OPPORTUNITIES: (params?: any) =>
        ["super-admin", "job-opportunities", params] as const,
      JOB_OPPORTUNITY_DETAIL: (id: string) =>
        ["super-admin", "job-opportunity-detail", id] as const,
      JOB_APPLICATIONS: (params?: any) =>
        ["super-admin", "job-applications", params] as const,
      PENDING_INTERNSHIPS: ["super-admin", "pending-internships"] as const,
      INTERNSHIP_APPLICATIONS: (id: string) =>
        ["super-admin", "internship-applications", id] as const,
      LEAD_INTERESTS: (id: string) =>
        ["super-admin", "lead-interests", id] as const,
      MEDIA_PHOTOS: ["super-admin", "media-photos"] as const,
      MEDIA_VIDEOS: ["super-admin", "media-videos"] as const,
      MEDIA_NEWSPAPERS: ["super-admin", "media-newspapers"] as const,
      MEDIA_ONLINE_LINKS: ["super-admin", "media-online-links"] as const,
      BLOGS: (params?: any) => ["super-admin", "blogs", params] as const,
      BLOG_DETAIL: (id: string) => ["super-admin", "blog-detail", id] as const,
      PENDING_REVIEWS: (params?: any) =>
        ["super-admin", "pending-reviews", params] as const,
      DONATIONS: (params?: any) => ["super-admin", "donations", params] as const,
      STUDENT_REGISTRATIONS: (params?: any) =>
        ["super-admin", "student-registrations", params] as const,
      STUDENT_REGISTRATION_DETAIL: (id: string) =>
        ["super-admin", "student-registration-detail", id] as const,
      INSTRUCTOR_REGISTRATIONS: (params?: any) =>
        ["super-admin", "instructor-registrations", params] as const,
      INSTRUCTOR_REGISTRATION_DETAIL: (id: string) =>
        ["super-admin", "instructor-registration-detail", id] as const,
      PENDING_INSTRUCTOR_PROFILES: [
        "super-admin",
        "pending-instructor-profiles",
      ] as const,
      IMMERSION_APPLICATIONS: ["super-admin", "immersion-applications"] as const,
      IMMERSION_APPLICATION_DETAIL: (id: string) =>
        ["super-admin", "immersion-application-detail", id] as const,
      TICKETS: (params?: any) => ["super-admin", "tickets", params] as const,
      RECRUIT_REGISTRATIONS: (params?: any) =>
        ["super-admin", "recruit-registrations", params] as const,
    };

interface GetJobApplicationsParams {
      page?: number;
      limit?: number;
      jobOpportunityId?: string;
      search?: string;
    }

interface JobApplicationPublic {
      id: string;
      jobOpportunityId: string;
      name: string;
      age: number;
      address: string;
      mobile: string;
      email: string;
      qualification: string;
      skills: string;
      resumeUrl?: string;
      status: string; 
      createdAt: string;
      updatedAt: string;
      userId: string;
      jobOpportunity?: {
        id: string;
        companyName: string;
        postOpportunity: string;
      };
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

interface MediaPhotoPublic {
      id: string;
      url: string;
      title: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaVideoPublic {
      id: string;
      youtubeId: string;
      title: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaVideoPayload {
      youtubeId: string;
      title: string;
      date: string;
      description: string;
    }

interface MediaNewspaperPublic {
      id: string;
      title: string;
      publication: string;
      date: string;
      description: string;
      imageUrl: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaOnlineLinkPublic {
      id: string;
      slNo: string;
      date: string;
      headline: string;
      agency: string;
      link: string;
      createdAt: string;
      updatedAt: string;
    }

interface MediaOnlineLinkPayload {
      slNo: string;
      date: string;
      headline: string;
      agency: string;
      link: string;
    }

interface GetBlogsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface BlogPublic {
      id: string;
      title: string;
      content: string;
      category: string;
      serialNo?: string;
      date: string;
      location?: string;
      authorName: string;
      authorRole?: string;
      authorEmail?: string;
      imageUrl?: string;
      createdAt: string;
      updatedAt: string;
    }

interface GetReviewsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface ReviewPublic {
      id: string;
      name: string;
      email: string;
      role: string;
      rating: number;
      comment: string;
      avatarUrl?: string;
      isApproved: boolean;
      approvedAt?: string;
      createdAt: string;
      updatedAt: string;
    }

interface GetDonationsParams {
      page?: number;
      limit?: number;
      search?: string;
    }

interface DonationAdmin {
      id: string;
      amount: number;
      donorName: string;
      email: string;
      mobile: string;
      address: string;
      notes?: string;
      wants80G: boolean;
      panNumber?: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      status: string; 
      receiptPath?: string;
      createdAt: string;
      updatedAt: string;
    }

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

interface ImmersionApplicationPublic {
      id: string;
      status: "PENDING" | "APPROVED" | "REJECTED";
      remarks: string | null;
      registeredAt: string;
      submittedAt?: string | null;
      createdAt?: string | null;
      studentId: string;
      immersionId: string;
      mentorId?: string | null;
      mentor?: {
        id: string;
        fullName?: string;
        name?: string;
        user?: {
          name?: string;
        };
      } | null;
      student?: {
        fullName: string;
        email: string;
      };
      immersion?: {
        id: string;
        title: string;
        description: string;
      };
      certificate?: {
        id: string;
        certificateNo: string;
        grade?: string | null;
        credits?: string | null;
      } | null;
      user?: {
        id?: string;
        name?: string;
        email?: string;
        registrationNo?: string | null;
      } | null;
    }

interface AssignMentorPayload {
      mentorId: string | null;
    }

interface TicketObject {
      id: string;
      title: string;
      description: string;
      status: "PENDING" | "RESOLVED" | "CLOSED";
      createdAt: string;
    }

interface NoticePayload {
      title: string;
      content: string;
      targetRole?: "STUDENT" | "INSTRUCTOR";
      receiverId?: string;
      internshipIds?: string[];
      immersionIds?: string[];
    }

interface SuperAdminProfileUpdatePayload {
      name: string;
    }

interface SuperAdminProfileUpdateResponse {
      success: boolean;
      message?: string;
      data?: any;
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

interface Opening {
      id: string;
      slNo: number;
      advtNoAndDate: string;
      postName: string;
      jobDescriptionText: string;
      jobDescriptionPdfUrl?: string;
      closingDate: string;
      applyUrl: string;
      status: "active" | "archived";
    }


export default function RecruitmentPage() {
    interface ISuperAdminService {
        getJobOpportunities: (
        params?: GetJobOpportunitiesParams,
      ) => Promise<GenericApiResponse<JobOpportunityPublic[]>>;
      getJobOpportunityById: (
        id: string,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      createJobOpportunity: (
        formData: FormData,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      updateJobOpportunity: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<JobOpportunityPublic>>;
      deleteJobOpportunity: (id: string) => Promise<GenericApiResponse>;
      getJobApplications: (
        params?: GetJobApplicationsParams,
      ) => Promise<GenericApiResponse<JobApplicationPublic[]>>;
      exportJobApplications: (jobOpportunityId: string) => Promise<Blob>;
      updateJobApplicationStatus: (
        id: string,
        payload: {
          status: string;
          message?: string;
          pdfBase64?: string;
          link?: string;
        },
      ) => Promise<GenericApiResponse<any>>;

        getPendingInternships: () => Promise<GenericApiResponse<InternshipPublic[]>>;
      approveInternshipPosting: (id: string) => Promise<GenericApiResponse>;
      getLeadInterests: (
        internshipId: string,
      ) => Promise<GenericApiResponse<any[]>>;
      createInternship: (
        payload: any,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      updateInternship: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      getInternshipById: (
        id: string,
      ) => Promise<GenericApiResponse<InternshipPublic>>;
      deleteInternship: (id: string) => Promise<GenericApiResponse>;
      getInternshipApplications: (
        internshipId: string,
      ) => Promise<GenericApiResponse<any[]>>;
      exportInternshipApplications: (internshipId: string) => Promise<Blob>;
      approveInternshipApplication: (
        internshipId: string,
        applicationId: string,
      ) => Promise<GenericApiResponse<any>>;
      rejectInternshipApplication: (
        internshipId: string,
        applicationId: string,
      ) => Promise<GenericApiResponse<any>>;

        getMediaPhotos: () => Promise<GenericApiResponse<MediaPhotoPublic[]>>;
      createMediaPhoto: (
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaPhotoPublic>>;
      updateMediaPhoto: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaPhotoPublic>>;
      deleteMediaPhoto: (id: string) => Promise<GenericApiResponse>;

      getMediaVideos: () => Promise<GenericApiResponse<MediaVideoPublic[]>>;
      createMediaVideo: (
        payload: MediaVideoPayload,
      ) => Promise<GenericApiResponse<MediaVideoPublic>>;
      updateMediaVideo: (
        id: string,
        payload: Partial<MediaVideoPayload>,
      ) => Promise<GenericApiResponse<MediaVideoPublic>>;
      deleteMediaVideo: (id: string) => Promise<GenericApiResponse>;

      getMediaNewspapers: () => Promise<GenericApiResponse<MediaNewspaperPublic[]>>;
      createMediaNewspaper: (
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaNewspaperPublic>>;
      updateMediaNewspaper: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<MediaNewspaperPublic>>;
      deleteMediaNewspaper: (id: string) => Promise<GenericApiResponse>;

      getMediaOnlineLinks: () => Promise<
        GenericApiResponse<MediaOnlineLinkPublic[]>
      >;
      createMediaOnlineLink: (
        payload: MediaOnlineLinkPayload,
      ) => Promise<GenericApiResponse<MediaOnlineLinkPublic>>;
      updateMediaOnlineLink: (
        id: string,
        payload: Partial<MediaOnlineLinkPayload>,
      ) => Promise<GenericApiResponse<MediaOnlineLinkPublic>>;
      deleteMediaOnlineLink: (id: string) => Promise<GenericApiResponse>;

        getBlogs: (
        params?: GetBlogsParams,
      ) => Promise<GenericApiResponse<BlogPublic[]>>;
      getBlogById: (id: string) => Promise<GenericApiResponse<BlogPublic>>;
      createBlog: (formData: FormData) => Promise<GenericApiResponse<BlogPublic>>;
      updateBlog: (
        id: string,
        formData: FormData,
      ) => Promise<GenericApiResponse<BlogPublic>>;
      deleteBlog: (id: string) => Promise<GenericApiResponse>;

        getPendingReviews: (
        params?: GetReviewsParams,
      ) => Promise<GenericApiResponse<ReviewPublic[]>>;
      approveReview: (id: string) => Promise<GenericApiResponse>;
      deleteReview: (id: string) => Promise<GenericApiResponse>;

        getDonations: (
        params?: GetDonationsParams,
      ) => Promise<GenericApiResponse<DonationAdmin[]>>;
      exportDonations: (params?: GetDonationsParams) => Promise<Blob>;

        getStudentRegistrations: (params?: any) => Promise<GenericApiResponse<any[]>>;
      getStudentRegistrationById: (id: string) => Promise<GenericApiResponse<any>>;
      updateStudentRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;
      deleteStudentRegistration: (id: string) => Promise<GenericApiResponse>;
      downloadStudentRegistration: (id: string) => Promise<Blob>;
      downloadInstructorRegistration: (id: string) => Promise<Blob>;
      downloadImmersionRegistration: (id: string) => Promise<Blob>;
      downloadRecruitRegistration: (id: string) => Promise<Blob>;
      getRecruitProfile: (userId: string) => Promise<GenericApiResponse<any>>;
      getRecruitRegistrations: (params?: any) => Promise<GenericApiResponse<any[]>>;
      deleteRecruitRegistration: (id: string) => Promise<GenericApiResponse>;
      getRecruitRegistrationById: (id: string) => Promise<GenericApiResponse<any>>;
      updateRecruitRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;

        getInstructorRegistrations: (
        params?: any,
      ) => Promise<GenericApiResponse<any[]>>;
      getInstructorRegistrationById: (
        id: string,
      ) => Promise<GenericApiResponse<any>>;
      updateInstructorRegistration: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<any>>;
      deleteInstructorRegistration: (id: string) => Promise<GenericApiResponse>;
      approveInstructorRegistration: (id: string) => Promise<GenericApiResponse>;
      rejectInstructorRegistration: (id: string) => Promise<GenericApiResponse>;

        getPendingInstructorProfiles: () => Promise<
        GenericApiResponse<PendingInstructorProfile[]>
      >;
      approveInstructorProfile: (id: string) => Promise<GenericApiResponse>;
      rejectInstructorProfile: (id: string) => Promise<GenericApiResponse>;

        getImmersionApplications: () => Promise<
        GenericApiResponse<{
          applications: ImmersionApplicationPublic[];
          pagination: any;
        }>
      >;
      getImmersionApplicationById: (
        id: string,
      ) => Promise<GenericApiResponse<ImmersionApplicationPublic>>;
      updateImmersionStatus: (
        id: string,
        payload: { status: "APPROVED" | "REJECTED"; remarks?: string },
      ) => Promise<GenericApiResponse>;
      assignImmersionMentor: (
        id: string,
        payload: AssignMentorPayload,
      ) => Promise<GenericApiResponse>;
      deleteImmersionApplication: (id: string) => Promise<GenericApiResponse>;
      exportImmersionApplications: (immersionId: string) => Promise<Blob>;

        getTickets: (params?: any) => Promise<GenericApiResponse<TicketObject[]>>;
      updateTicket: (
        id: string,
        payload: any,
      ) => Promise<GenericApiResponse<TicketObject>>;
      deleteTicket: (id: string) => Promise<GenericApiResponse>;

        getNotices: (params?: any) => Promise<GenericApiResponse<any[]>>;
      createNotice: (payload: NoticePayload) => Promise<GenericApiResponse>;
      deleteNotice: (id: string) => Promise<GenericApiResponse>;

        completeEnrollment: (id: string) => Promise<GenericApiResponse<any>>;
      issueCertificate: (id: string) => Promise<GenericApiResponse<any>>;
      issueImmersionCertificate: (id: string) => Promise<GenericApiResponse<any>>;

        getAllInternships: () => Promise<GenericApiResponse<any[]>>;
      getImmersions: () => Promise<GenericApiResponse<any[]>>;
      getImmersionById: (id: string) => Promise<GenericApiResponse<any>>;
      createImmersion: (payload: any) => Promise<GenericApiResponse>;
      updateImmersion: (id: string, payload: any) => Promise<GenericApiResponse>;
      deleteImmersion: (id: string) => Promise<GenericApiResponse>;
      getImmersionCategories: () => Promise<GenericApiResponse<any[]>>;
      createImmersionCategory: (payload: {
        name: string;
      }) => Promise<GenericApiResponse>;

        updateProfile: (
        id: string,
        payload: SuperAdminProfileUpdatePayload,
      ) => Promise<SuperAdminProfileUpdateResponse>;
    }

    const SuperAdminService: ISuperAdminService = {
        async getJobOpportunities(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobOpportunityPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITIES, { params });
        return response.data;
      },

      async getJobOpportunityById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id));
        return response.data;
      },

      async createJobOpportunity(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITIES, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateJobOpportunity(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<JobOpportunityPublic>
        >(ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteJobOpportunity(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_BY_ID(id),
        );
        return response.data;
      },

      async getJobApplications(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<JobApplicationPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.JOB_APPLICATIONS, { params });
        return response.data;
      },

      async exportJobApplications(jobOpportunityId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.JOB_OPPORTUNITY_EXPORT_APPLICATIONS(
            jobOpportunityId,
          ),
          { responseType: "blob" },
        );
        return response.data;
      },

      async updateJobApplicationStatus(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.JOB_APPLICATION_STATUS(id),
          payload,
        );
        return response.data;
      },

        async getPendingInternships() {
        const response = await axiosInstance.get<
          GenericApiResponse<InternshipPublic[]>
        >(ENDPOINTS.INTERNSHIPS.PENDING);
        return response.data;
      },

      async approveInternshipPosting(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INTERNSHIPS.APPROVE_POSTING(id),
        );
        return response.data;
      },

      async getLeadInterests(internshipId) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.LEAD_INTERESTS(internshipId),
        );
        return response.data;
      },

      async createInternship(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS, payload);
        return response.data;
      },

      async updateInternship(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id), payload);
        return response.data;
      },

      async getInternshipById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<InternshipPublic>
        >(ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id));
        return response.data;
      },

      async deleteInternship(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.RUNNING_INTERNSHIPS_BY_ID(id),
        );
        return response.data;
      },

      async getInternshipApplications(internshipId) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INTERNSHIPS.APPLICATIONS(internshipId),
        );
        return response.data;
      },

      async exportInternshipApplications(internshipId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.INTERNSHIPS.EXPORT_APPLICATIONS(internshipId),
          { responseType: "blob" },
        );
        return response.data;
      },

      async approveInternshipApplication(internshipId, applicationId) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.APPROVE_APPLICATION(internshipId, applicationId),
        );
        return response.data;
      },

      async rejectInternshipApplication(internshipId, applicationId) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REJECT_APPLICATION(internshipId, applicationId),
        );
        return response.data;
      },

        async getMediaPhotos() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaPhotoPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS);
        return response.data;
      },

      async createMediaPhoto(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaPhotoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateMediaPhoto(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaPhotoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteMediaPhoto(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_PHOTOS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaVideos() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaVideoPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS);
        return response.data;
      },

      async createMediaVideo(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaVideoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS, payload);
        return response.data;
      },

      async updateMediaVideo(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaVideoPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS_BY_ID(id), payload);
        return response.data;
      },

      async deleteMediaVideo(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_VIDEOS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaNewspapers() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaNewspaperPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS);
        return response.data;
      },

      async createMediaNewspaper(formData) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaNewspaperPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async updateMediaNewspaper(id, formData) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaNewspaperPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS_BY_ID(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },

      async deleteMediaNewspaper(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_NEWSPAPERS_BY_ID(id),
        );
        return response.data;
      },

      async getMediaOnlineLinks() {
        const response = await axiosInstance.get<
          GenericApiResponse<MediaOnlineLinkPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS);
        return response.data;
      },

      async createMediaOnlineLink(payload) {
        const response = await axiosInstance.post<
          GenericApiResponse<MediaOnlineLinkPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS, payload);
        return response.data;
      },

      async updateMediaOnlineLink(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<MediaOnlineLinkPublic>
        >(ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS_BY_ID(id), payload);
        return response.data;
      },

      async deleteMediaOnlineLink(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.MEDIA_ONLINE_LINKS_BY_ID(id),
        );
        return response.data;
      },

        async getBlogs(params) {
        const response = await axiosInstance.get<GenericApiResponse<BlogPublic[]>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS,
          { params },
        );
        return response.data;
      },

      async getBlogById(id) {
        const response = await axiosInstance.get<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
        );
        return response.data;
      },

      async createBlog(formData) {
        const response = await axiosInstance.post<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      },

      async updateBlog(id, formData) {
        const response = await axiosInstance.patch<GenericApiResponse<BlogPublic>>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        return response.data;
      },

      async deleteBlog(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.BLOGS_BY_ID(id),
        );
        return response.data;
      },

        async getPendingReviews(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<ReviewPublic[]>
        >(ENDPOINTS.SUPER_ADMIN.REVIEWS_PENDING, { params });
        return response.data;
      },

      async approveReview(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.REVIEW_APPROVE(id),
        );
        return response.data;
      },

      async deleteReview(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.REVIEW_BY_ID(id),
        );
        return response.data;
      },

        async getDonations(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<DonationAdmin[]>
        >(ENDPOINTS.SUPER_ADMIN.DONATIONS_ADMIN, { params });
        return response.data;
      },

      async exportDonations(params) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.DONATIONS_ADMIN_EXPORT,
          { params, responseType: "blob" },
        );
        return response.data;
      },

        async getStudentRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.STUDENTS.REGISTER_ADMIN,
          { params },
        );
        return response.data;
      },

      async getStudentRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateStudentRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteStudentRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.STUDENTS.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async downloadStudentRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.STUDENTS.REGISTER_DOWNLOAD(id),
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadInstructorRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `/instructor/register/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadImmersionRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `/immersion/applications/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async downloadRecruitRegistration(id) {
        const response = await axiosInstance.get<Blob>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}/download`,
          { responseType: "blob" },
        );
        return response.data;
      },

      async getRecruitProfile(userId) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          `${ENDPOINTS.RECRUIT.PROFILE}`,
          { params: { userId } },
        );
        return response.data;
      },

      async getRecruitRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS,
          { params },
        );
        return response.data;
      },

      async deleteRecruitRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
        );
        return response.data;
      },

      async getRecruitRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
        );
        return response.data;
      },

      async updateRecruitRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          `${ENDPOINTS.SUPER_ADMIN.RECRUIT_REGISTRATIONS}/${id}`,
          payload,
        );
        return response.data;
      },

        async getInstructorRegistrations(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_ADMIN,
          { params },
        );
        return response.data;
      },

      async getInstructorRegistrationById(id) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async updateInstructorRegistration(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteInstructorRegistration(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id),
        );
        return response.data;
      },

      async approveInstructorRegistration(id) {
        const response = await axiosInstance.post<GenericApiResponse>(
          `${ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id)}/approve`,
        );
        return response.data;
      },

      async rejectInstructorRegistration(id) {
        const response = await axiosInstance.post<GenericApiResponse>(
          `${ENDPOINTS.INSTRUCTOR.REGISTER_BY_ID(id)}/reject`,
        );
        return response.data;
      },

        async getPendingInstructorProfiles() {
        const response = await axiosInstance.get<
          GenericApiResponse<PendingInstructorProfile[]>
        >(ENDPOINTS.INSTRUCTOR.PROFILES_PENDING);
        return response.data;
      },

      async approveInstructorProfile(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_APPROVE(id),
        );
        return response.data;
      },

      async rejectInstructorProfile(id) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.INSTRUCTOR.PROFILES_REJECT(id),
        );
        return response.data;
      },

        async getImmersionApplications() {
        const response = await axiosInstance.get<
          GenericApiResponse<{
            applications: ImmersionApplicationPublic[];
            pagination: any;
          }>
        >(ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATIONS);
        return response.data;
      },

      async getImmersionApplicationById(id) {
        const response = await axiosInstance.get<
          GenericApiResponse<ImmersionApplicationPublic>
        >(ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATION_BY_ID(id));
        return response.data;
      },

      async updateImmersionStatus(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_STATUS(id),
          payload,
        );
        return response.data;
      },

      async assignImmersionMentor(id, payload) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_ASSIGN_MENTOR(id),
          payload,
        );
        return response.data;
      },

      async deleteImmersionApplication(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_APPLICATION_BY_ID(id),
        );
        return response.data;
      },

      async exportImmersionApplications(immersionId) {
        const response = await axiosInstance.get<Blob>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_EXPORT_APPLICATIONS(immersionId),
          { responseType: "blob" },
        );
        return response.data;
      },

        async getTickets(params) {
        const response = await axiosInstance.get<
          GenericApiResponse<TicketObject[]>
        >(ENDPOINTS.SUPER_ADMIN.TICKETS_ADMIN, { params });
        return response.data;
      },

      async updateTicket(id, payload) {
        const response = await axiosInstance.patch<
          GenericApiResponse<TicketObject>
        >(ENDPOINTS.TICKETS.BY_ID(id), payload);
        return response.data;
      },

      async deleteTicket(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.TICKETS.BY_ID(id),
        );
        return response.data;
      },

        async getNotices(params) {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.NOTICES.BASE,
          { params },
        );
        return response.data;
      },

      async createNotice(payload) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.NOTICES.BASE,
          payload,
        );
        return response.data;
      },

      async deleteNotice(id) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.NOTICES.BY_ID(id),
        );
        return response.data;
      },

        async completeEnrollment(id) {
        const response = await axiosInstance.patch<GenericApiResponse<any>>(
          ENDPOINTS.ENROLLMENTS.COMPLETE(id),
        );
        return response.data;
      },

      async issueCertificate(id) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.ENROLLMENTS.ISSUE_CERTIFICATE(id),
        );
        return response.data;
      },

      async issueImmersionCertificate(applicationId: string) {
        const response = await axiosInstance.post<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_ISSUE_CERTIFICATE(applicationId),
        );
        return response.data;
      },

        async getAllInternships() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.INTERNSHIPS.BASE,
          { params: { limit: 100 } },
        );
        return response.data;
      },

      async getImmersions() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS,
        );
        return response.data;
      },

      async getImmersionById(id: string) {
        const response = await axiosInstance.get<GenericApiResponse<any>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
        );
        return response.data;
      },

      async createImmersion(payload: any) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS,
          payload,
        );
        return response.data;
      },

      async updateImmersion(id: string, payload: any) {
        const response = await axiosInstance.patch<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
          payload,
        );
        return response.data;
      },

      async deleteImmersion(id: string) {
        const response = await axiosInstance.delete<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSIONS_BY_ID(id),
        );
        return response.data;
      },

      async getImmersionCategories() {
        const response = await axiosInstance.get<GenericApiResponse<any[]>>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_CATEGORIES,
        );
        return response.data;
      },

      async createImmersionCategory(payload: { name: string }) {
        const response = await axiosInstance.post<GenericApiResponse>(
          ENDPOINTS.SUPER_ADMIN.IMMERSION_CATEGORIES,
          payload,
        );
        return response.data;
      },

      async updateProfile(id, payload) {
        const response = await axiosInstance.patch<SuperAdminProfileUpdateResponse>(
          ENDPOINTS.USERS.BY_ID(id),
          payload,
        );
        return response.data;
      },
    };
    const SuperAdminDataHooks = {
        useJobOpportunities(
        params?: GetJobOpportunitiesParams,
        options?: TQueryOptions<GenericApiResponse<JobOpportunityPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_OPPORTUNITIES(params),
          queryFn: async () => await SuperAdminService.getJobOpportunities(params),
          ...options,
        });
      },

      useJobOpportunityDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<JobOpportunityPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_OPPORTUNITY_DETAIL(id),
          queryFn: async () => await SuperAdminService.getJobOpportunityById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateJobOpportunity(
        options?: TMutationOptions<
          GenericApiResponse<JobOpportunityPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createJobOpportunity(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateJobOpportunity(
        options?: TMutationOptions<
          GenericApiResponse<JobOpportunityPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateJobOpportunity(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteJobOpportunity(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteJobOpportunity(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Job opportunity deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete job opportunity.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useJobApplications(
        params?: GetJobApplicationsParams,
        options?: TQueryOptions<GenericApiResponse<JobApplicationPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.JOB_APPLICATIONS(params),
          queryFn: async () => await SuperAdminService.getJobApplications(params),
          ...options,
        });
      },

      useExportJobApplications(options?: TMutationOptions<Blob, Error, string>) {
        return useMutation({
          mutationFn: async (jobOpportunityId) =>
            await SuperAdminService.exportJobApplications(jobOpportunityId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateJobApplicationStatus(options?: any) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({
            id,
            payload,
          }: {
            id: string;
            payload: {
              status: string;
              message?: string;
              pdfBase64?: string;
              link?: string;
            };
          }) => await SuperAdminService.updateJobApplicationStatus(id, payload),
          onSuccess: (data: any, variables: any, context: any) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success("Job application status updated successfully!");
            options?.onSuccess?.(data, variables, context);
          },
          onError: (err: any, variables: any, context: any) => {
            toast.error(err.message || "Failed to update job application status.");
            options?.onError?.(err, variables, context);
          },
        });
      },

      useRecruitProfile(userId: string, options?: any) {
        return useQuery({
          queryKey: ["super-admin", "recruit-profile", userId],
          queryFn: async () => await SuperAdminService.getRecruitProfile(userId),
          enabled: !!userId,
          ...options,
        });
      },

        usePendingInternships(
        options?: TQueryOptions<GenericApiResponse<InternshipPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INTERNSHIPS,
          queryFn: async () => await SuperAdminService.getPendingInternships(),
          ...options,
        });
      },

      useInternshipDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<InternshipPublic>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "internship-detail", id],
          queryFn: async () => await SuperAdminService.getInternshipById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateInternship(
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          any
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createInternship(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateInternship(
        options?: TMutationOptions<
          GenericApiResponse<InternshipPublic>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateInternship(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInternshipPosting(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInternshipPosting(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(
              data.message || "Internship posting approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve internship posting.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteInternship(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteInternship(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            queryClient.invalidateQueries({ queryKey: ["internships"] });
            queryClient.invalidateQueries({
              queryKey: ["students", "internships"],
            });
            toast.success(data.message || "Internship deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete internship.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useLeadInterests(
        internshipId: string,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.LEAD_INTERESTS(internshipId),
          queryFn: async () =>
            await SuperAdminService.getLeadInterests(internshipId),
          enabled: !!internshipId,
          ...options,
        });
      },

      useInternshipApplications(
        internshipId: string,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(internshipId),
          queryFn: async () =>
            await SuperAdminService.getInternshipApplications(internshipId),
          enabled: !!internshipId,
          ...options,
        });
      },

      useExportInternshipApplications(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (internshipId) =>
            await SuperAdminService.exportInternshipApplications(internshipId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInternshipApplication(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await SuperAdminService.approveInternshipApplication(
              internshipId,
              applicationId,
            ),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(
                variables.internshipId,
              ),
            });
            toast.success(data.message || "Application approved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve application.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInternshipApplication(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { internshipId: string; applicationId: string }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ internshipId, applicationId }) =>
            await SuperAdminService.rejectInternshipApplication(
              internshipId,
              applicationId,
            ),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.INTERNSHIP_APPLICATIONS(
                variables.internshipId,
              ),
            });
            toast.success(data.message || "Application rejected.");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject application.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useMediaPhotos(
        options?: TQueryOptions<GenericApiResponse<MediaPhotoPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
          queryFn: async () => await SuperAdminService.getMediaPhotos(),
          ...options,
        });
      },

      useCreateMediaPhoto(
        options?: TMutationOptions<
          GenericApiResponse<MediaPhotoPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaPhoto(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item uploaded successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to upload photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaPhoto(
        options?: TMutationOptions<
          GenericApiResponse<MediaPhotoPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateMediaPhoto(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaPhoto(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteMediaPhoto(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_PHOTOS,
            });
            toast.success(data.message || "Photo item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete photo.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaVideos(
        options?: TQueryOptions<GenericApiResponse<MediaVideoPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
          queryFn: async () => await SuperAdminService.getMediaVideos(),
          ...options,
        });
      },

      useCreateMediaVideo(
        options?: TMutationOptions<
          GenericApiResponse<MediaVideoPublic>,
          Error,
          MediaVideoPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaVideo(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to add video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaVideo(
        options?: TMutationOptions<
          GenericApiResponse<MediaVideoPublic>,
          Error,
          { id: string; payload: Partial<MediaVideoPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateMediaVideo(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaVideo(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteMediaVideo(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_VIDEOS,
            });
            toast.success(data.message || "Video item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete video.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaNewspapers(
        options?: TQueryOptions<GenericApiResponse<MediaNewspaperPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
          queryFn: async () => await SuperAdminService.getMediaNewspapers(),
          ...options,
        });
      },

      useCreateMediaNewspaper(
        options?: TMutationOptions<
          GenericApiResponse<MediaNewspaperPublic>,
          Error,
          FormData
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaNewspaper(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item uploaded successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to upload newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaNewspaper(
        options?: TMutationOptions<
          GenericApiResponse<MediaNewspaperPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateMediaNewspaper(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaNewspaper(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteMediaNewspaper(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_NEWSPAPERS,
            });
            toast.success(data.message || "Newspaper item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete newspaper item.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useMediaOnlineLinks(
        options?: TQueryOptions<GenericApiResponse<MediaOnlineLinkPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
          queryFn: async () => await SuperAdminService.getMediaOnlineLinks(),
          ...options,
        });
      },

      useCreateMediaOnlineLink(
        options?: TMutationOptions<
          GenericApiResponse<MediaOnlineLinkPublic>,
          Error,
          MediaOnlineLinkPayload
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) =>
            await SuperAdminService.createMediaOnlineLink(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item added successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to add online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateMediaOnlineLink(
        options?: TMutationOptions<
          GenericApiResponse<MediaOnlineLinkPublic>,
          Error,
          { id: string; payload: Partial<MediaOnlineLinkPayload> }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateMediaOnlineLink(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteMediaOnlineLink(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteMediaOnlineLink(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.MEDIA_ONLINE_LINKS,
            });
            toast.success(data.message || "Online link item deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete online link.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useBlogs(
        params?: GetBlogsParams,
        options?: TQueryOptions<GenericApiResponse<BlogPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.BLOGS(params),
          queryFn: async () => await SuperAdminService.getBlogs(params),
          ...options,
        });
      },

      useBlogDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<BlogPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.BLOG_DETAIL(id),
          queryFn: async () => await SuperAdminService.getBlogById(id),
          enabled: !!id,
          ...options,
        });
      },

      useCreateBlog(
        options?: TMutationOptions<GenericApiResponse<BlogPublic>, Error, FormData>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) => await SuperAdminService.createBlog(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post created successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateBlog(
        options?: TMutationOptions<
          GenericApiResponse<BlogPublic>,
          Error,
          { id: string; formData: FormData }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, formData }) =>
            await SuperAdminService.updateBlog(id, formData),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteBlog(options?: TMutationOptions<GenericApiResponse, Error, string>) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteBlog(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Blog post deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete blog post.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        usePendingReviews(
        params?: GetReviewsParams,
        options?: TQueryOptions<GenericApiResponse<ReviewPublic[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_REVIEWS(params),
          queryFn: async () => await SuperAdminService.getPendingReviews(params),
          ...options,
        });
      },

      useApproveReview(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.approveReview(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Review approved successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve review.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteReview(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteReview(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Review deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete review.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useDonations(
        params?: GetDonationsParams,
        options?: TQueryOptions<GenericApiResponse<DonationAdmin[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.DONATIONS(params),
          queryFn: async () => await SuperAdminService.getDonations(params),
          ...options,
        });
      },

      useExportDonations(
        options?: TMutationOptions<Blob, Error, GetDonationsParams | undefined>,
      ) {
        return useMutation({
          mutationFn: async (params) =>
            await SuperAdminService.exportDonations(params),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export donations ledger.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useStudentRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.STUDENT_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getStudentRegistrations(params),
          ...options,
        });
      },

      useStudentRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.STUDENT_REGISTRATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getStudentRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateStudentRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateStudentRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Student registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update student registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteStudentRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteStudentRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Student registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete student registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadStudentRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadStudentRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to download registration PDF.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadInstructorRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadInstructorRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download instructor registration PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadImmersionRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadImmersionRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download immersion application PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDownloadRecruitRegistration(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.downloadRecruitRegistration(id),
          ...options,
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to download recruit registration PDF.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useInstructorRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INSTRUCTOR_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getInstructorRegistrations(params),
          ...options,
        });
      },

      useInstructorRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.INSTRUCTOR_REGISTRATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getInstructorRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateInstructorRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateInstructorRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useApproveInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration approved successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(
              err.message || "Failed to approve instructor registration.",
            );
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.rejectInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration rejected successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteInstructorRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteInstructorRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Instructor registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete instructor registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useRecruitRegistrations(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.RECRUIT_REGISTRATIONS(params),
          queryFn: async () =>
            await SuperAdminService.getRecruitRegistrations(params),
          ...options,
        });
      },

      useDeleteRecruitRegistration(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteRecruitRegistration(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Recruit registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete recruit registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRecruitRegistrationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "recruit-registration-detail", id],
          queryFn: async () =>
            await SuperAdminService.getRecruitRegistrationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateRecruitRegistration(
        options?: TMutationOptions<
          GenericApiResponse<any>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateRecruitRegistration(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Recruit registration updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update recruit registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        usePendingInstructorProfiles(
        options?: TQueryOptions<GenericApiResponse<PendingInstructorProfile[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
          queryFn: async () =>
            await SuperAdminService.getPendingInstructorProfiles(),
          ...options,
        });
      },

      useApproveInstructorProfile(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.approveInstructorProfile(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
            });
            toast.success(
              data.message || "Instructor onboarding profile approved!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to approve instructor onboarding.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useRejectInstructorProfile(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.rejectInstructorProfile(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.PENDING_INSTRUCTOR_PROFILES,
            });
            toast.success(
              data.message || "Instructor onboarding profile rejected.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to reject instructor onboarding.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useImmersionApplications(
        options?: TQueryOptions<
          GenericApiResponse<{
            applications: ImmersionApplicationPublic[];
            pagination: any;
          }>
        >,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
          queryFn: async () => await SuperAdminService.getImmersionApplications(),
          ...options,
        });
      },

      useExportImmersionApplications(
        options?: TMutationOptions<Blob, Error, string>,
      ) {
        return useMutation({
          mutationFn: async (immersionId) =>
            await SuperAdminService.exportImmersionApplications(immersionId),
          ...options,
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to export applications.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useImmersionApplicationDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<ImmersionApplicationPublic>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(id),
          queryFn: async () =>
            await SuperAdminService.getImmersionApplicationById(id),
          enabled: !!id,
          ...options,
        });
      },

      useUpdateImmersionStatus(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          {
            id: string;
            payload: { status: "APPROVED" | "REJECTED"; remarks?: string };
          }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateImmersionStatus(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(
                variables.id,
              ),
            });
            toast.success(data.message || "Immersion status updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update status.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useAssignImmersionMentor(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: AssignMentorPayload }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.assignImmersionMentor(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATION_DETAIL(
                variables.id,
              ),
            });
            toast.success(data.message || "Mentor assigned successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to assign mentor.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteImmersionApplication(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.deleteImmersionApplication(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            toast.success(
              data.message || "Immersion registration deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete immersion registration.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useTickets(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<TicketObject[]>>,
      ) {
        return useQuery({
          queryKey: SUPER_ADMIN_QUERY_KEYS.TICKETS(params),
          queryFn: async () => await SuperAdminService.getTickets(params),
          ...options,
        });
      },

      useUpdateTicket(
        options?: TMutationOptions<
          GenericApiResponse<TicketObject>,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateTicket(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Ticket updated successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update ticket.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteTicket(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteTicket(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Ticket deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete ticket.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useNotices(
        params?: any,
        options?: TQueryOptions<GenericApiResponse<any[]>, Error>,
      ) {
        return useQuery({
          queryKey: ["notices", params],
          queryFn: async () => await SuperAdminService.getNotices(params),
          ...options,
        });
      },

      useCreateNotice(
        options?: TMutationOptions<GenericApiResponse, Error, NoticePayload>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (data) => await SuperAdminService.createNotice(data),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(
              data.message || "Notice announcement broadcasted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to broadcast notice.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteNotice(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteNotice(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success(data.message || "Notice deleted successfully!");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete notice.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useCompleteEnrollment(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.completeEnrollment(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(
              data.message || "Enrollment marked as completed successfully.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to complete enrollment.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useIssueCertificate(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.issueCertificate(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.ALL });
            toast.success(data.message || "Certificate issued successfully.");
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to issue certificate.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useIssueImmersionCertificate(
        options?: TMutationOptions<GenericApiResponse<any>, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) =>
            await SuperAdminService.issueImmersionCertificate(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: SUPER_ADMIN_QUERY_KEYS.IMMERSION_APPLICATIONS,
            });
            toast.success(
              data.message || "Immersion certificate issued successfully.",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to issue immersion certificate.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

        useAdminInternships(options?: TQueryOptions<GenericApiResponse<any[]>>) {
        return useQuery({
          queryKey: ["super-admin", "all-internships"],
          queryFn: async () => await SuperAdminService.getAllInternships(),
          ...options,
        });
      },

      useAdminImmersions(options?: TQueryOptions<GenericApiResponse<any[]>>) {
        return useQuery({
          queryKey: ["super-admin", "immersions"],
          queryFn: async () => await SuperAdminService.getImmersions(),
          ...options,
        });
      },

      useImmersionDetail(
        id: string,
        options?: TQueryOptions<GenericApiResponse<any>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "immersion-detail", id],
          queryFn: async () => await SuperAdminService.getImmersionById(id),
          ...options,
        });
      },

      useCreateImmersion(
        options?: TMutationOptions<GenericApiResponse, Error, any>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await SuperAdminService.createImmersion(payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program created successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateImmersion(
        options?: TMutationOptions<
          GenericApiResponse,
          Error,
          { id: string; payload: any }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateImmersion(id, payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersion-detail", variables.id],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program updated successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to update immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useDeleteImmersion(
        options?: TMutationOptions<GenericApiResponse, Error, string>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (id) => await SuperAdminService.deleteImmersion(id),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersions"],
            });
            queryClient.invalidateQueries({ queryKey: ["public", "immersions"] });
            toast.success(
              data.message || "Immersion program deleted successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to delete immersion program.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useAdminImmersionCategories(
        options?: TQueryOptions<GenericApiResponse<any[]>>,
      ) {
        return useQuery({
          queryKey: ["super-admin", "immersion-categories"],
          queryFn: async () => await SuperAdminService.getImmersionCategories(),
          ...options,
        });
      },

      useCreateImmersionCategory(
        options?: TMutationOptions<GenericApiResponse, Error, { name: string }>,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) =>
            await SuperAdminService.createImmersionCategory(payload),
          ...options,
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
              queryKey: ["super-admin", "immersion-categories"],
            });
            toast.success(
              data.message || "Immersion category created successfully!",
            );
            options?.onSuccess?.(data, variables, context, undefined as any);
          },
          onError: (err, variables, context) => {
            toast.error(err.message || "Failed to create category.");
            options?.onError?.(err, variables, context, undefined as any);
          },
        });
      },

      useUpdateProfile(
        options?: TMutationOptions<
          SuperAdminProfileUpdateResponse,
          Error,
          { id: string; payload: SuperAdminProfileUpdatePayload }
        >,
      ) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async ({ id, payload }) =>
            await SuperAdminService.updateProfile(id, payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success(data.message || "Profile updated successfully!");
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to update profile.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

    interface JobOpportunityPublic {
      id: string;
      companyName: string;
      address: string;
      postOpportunity: string;
      jobNature: string;
      fieldOfEmployment: string;
      minQualification: string;
      skillsRequired?: string;
      totalStaffStrength?: string;
      website?: string;
      logoUrl?: string;
      isActive: boolean;
      advtNo?: string;
      advtDate?: string;
      closingDate?: string;
      jdDocUrl?: string;
      jdDescription?: string | null;
      createdAt: string;
      updatedAt: string;
      createdById: string;
    }

    function CurrentOpenings() {
      const [isArchiveOpen, setIsArchiveOpen] = useState(false);
      const [highlightedId, setHighlightedId] = useState<string | null>(null);

      useEffect(() => {
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const jobParam = params.get("job");
          if (jobParam) {
            setHighlightedId(jobParam);
            setTimeout(() => {
              const el = document.getElementById(`job-row-${jobParam}`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 300);
          }
        }
      }, []);

      const handleShare = (opening: Opening) => {
        if (typeof window === "undefined") return;
        const shareUrl = `${window.location.origin}/recruitment?job=${opening.id}`;
        const cleanAdvt = opening.advtNoAndDate.replace("\n", " - ");
        const shareText = `Apply for the position of "${opening.postName}" at IIInternship.\nAdvt No: ${cleanAdvt}\nClosing Date: ${opening.closingDate}\n\nApply Link: ${shareUrl}`;

        if (navigator.share) {
          navigator
            .share({
              title: `Job Opening: ${opening.postName}`,
              text: shareText,
              url: shareUrl,
            })
            .catch((err) => {
              console.error("Error sharing:", err);
            });
        } else {
          navigator.clipboard.writeText(shareText);
          toast.success("Job details & apply link copied to clipboard!");
        }
      };

      const { data: jobsResponse, isLoading } =
        SuperAdminDataHooks.useJobOpportunities({
          limit: 100,
        });

      const jobs = jobsResponse?.data || [];

      const mappedOpenings: Opening[] = jobs.map(
        (job: JobOpportunityPublic, index: number) => ({
          id: job.id,
          slNo: index + 1,
          advtNoAndDate: `${job.advtNo || "Advt. No. N/A"}\n${job.advtDate || "Date N/A"}`,
          postName: job.postOpportunity,
          jobDescriptionText: `Required Skills: ${job.skillsRequired || "N/A"}. Qualification: ${job.minQualification}. Nature: ${job.jobNature}.`,
          jobDescriptionPdfUrl: job.jdDocUrl,
          closingDate: job.closingDate || "N/A",
          applyUrl: `/sign-up?role=RECRUIT_USER`,
          status: job.isActive ? "active" : "archived",
        }),
      );

      const activeOpenings = mappedOpenings.filter((o) => o.status === "active");
      const archivedOpenings = mappedOpenings.filter(
        (o) => o.status === "archived",
      );

      if (isLoading) {
        return (
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-3">
            <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
            <p className="text-muted-foreground text-sm font-medium">
              Loading opportunities...
            </p>
          </div>
        );
      }

      return (
        <section className="relative z-10 mx-auto w-full max-w-[1400px] overflow-hidden px-3 pb-12 sm:px-6 md:pb-20 lg:px-8">
          {}
          <div className="mb-8 text-center md:mb-10 md:text-left">
            <h2 className="text-foreground mb-3 text-3xl font-extrabold md:text-4xl">
              Current Openings
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Browse through our active recruitment notices and apply for the
              internships that match your skills.
            </p>
          </div>

          <div className="mb-16 w-full max-w-full overflow-hidden rounded-[20px] border border-white/60 bg-white/40 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] md:rounded-[32px] md:p-2">
            <div className="relative w-full rounded-[16px] bg-white/50 md:rounded-[24px]">
              {}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 rounded-r-[16px] bg-gradient-to-l from-white/80 to-transparent md:hidden" />

              <div
                className="w-full touch-pan-x overflow-x-auto pb-2 md:pb-0"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <table className="w-full min-w-[800px] border-collapse text-left lg:min-w-full">
                  <thead>
                    <tr className="border-b border-white/60 bg-white/60">
                      <th className="text-muted-foreground/80 whitespace-nowrap px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                        SL No.
                      </th>
                      <th className="text-muted-foreground/80 whitespace-nowrap px-4 py-4 text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                        Advt. No. & Date
                      </th>
                      <th className="text-muted-foreground/80 min-w-[200px] px-4 py-4 text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                        Name of the Post
                      </th>
                      <th className="text-muted-foreground/80 min-w-[280px] px-4 py-4 text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                        Job Description
                      </th>
                      <th className="text-muted-foreground/80 whitespace-nowrap px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                        Closing Date
                      </th>
                      <th className="text-muted-foreground/80 whitespace-nowrap px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/40">
                    {activeOpenings.map((opening) => (
                      <tr
                        key={opening.id}
                        id={`job-row-${opening.id}`}
                        className={`group transition-all duration-500 ${
                          highlightedId === opening.id
                            ? "bg-primary/15 ring-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.25)] ring-2"
                            : "hover:bg-white/80"
                        }`}
                      >
                        <td className="text-muted-foreground px-4 py-4 text-center text-sm font-bold md:px-6 md:py-5 md:text-base">
                          {opening.slNo}
                        </td>
                        <td className="text-muted-foreground whitespace-pre-line px-4 py-4 text-xs leading-relaxed md:px-6 md:py-5 md:text-sm">
                          <span className="text-foreground/90 mb-1 inline-block rounded-md border border-white/80 bg-white/60 px-2.5 py-1 font-mono font-semibold">
                            {opening.advtNoAndDate.split("\n")[0]}
                          </span>
                          <br />
                          <div className="text-primary bg-primary/10 border-primary/20 mt-1.5 flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold md:text-xs">
                            <Calendar size={12} strokeWidth={2.5} />
                            <span>{opening.advtNoAndDate.split("\n")[1]}</span>
                          </div>
                        </td>
                        <td className="text-foreground/90 px-4 py-4 text-sm font-bold md:px-6 md:py-5 md:text-[15px]">
                          {opening.postName}
                        </td>
                        <td className="px-4 py-4 md:px-6 md:py-5">
                          <p className="text-muted-foreground/90 mb-3 text-sm leading-relaxed md:text-[14px]">
                            {opening.jobDescriptionText}
                          </p>
                          {opening.jobDescriptionPdfUrl && (
                            <a
                              href={opening.jobDescriptionPdfUrl}
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-bold transition-colors md:text-xs"
                            >
                              <Download size={14} strokeWidth={2.5} />
                              Download JD
                            </a>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold text-red-600/90 md:px-6 md:py-5 md:text-sm">
                          <div className="mx-auto flex w-fit items-center justify-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-red-600">
                            <Clock_2 size={14} strokeWidth={2.5} />
                            {opening.closingDate}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center md:px-6 md:py-5">
                          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                            <Link
                              href="/sign-up?role=RECRUIT_USER"
                              className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-transparent px-4 py-2.5 text-xs font-bold text-white shadow-[0_2px_8px_rgba(var(--primary),0.3)] transition-all hover:shadow-[0_4px_12px_rgba(var(--primary),0.4)] md:px-5 md:text-sm"
                            >
                              Register & Apply
                              <ExternalLink size={14} strokeWidth={2.5} />
                            </Link>
                            <button
                              onClick={() => handleShare(opening)}
                              className="border-primary/20 text-primary hover:bg-primary/10 px-4.5 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border bg-white/60 py-2.5 text-xs font-bold transition-all hover:shadow-[0_2px_8px_rgba(var(--primary),0.05)] md:px-5 md:text-sm"
                              title="Share Job Opening"
                            >
                              <Share2 size={14} strokeWidth={2.5} />
                              Share
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {activeOpenings.length === 0 && (
                  <div className="flex w-full flex-col items-center justify-center px-4 py-16 text-center md:py-24">
                    <svg
                      className="text-muted-foreground/40 mb-4 h-12 w-12 drop-shadow-sm md:h-16 md:w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-foreground/90 mb-2 text-lg font-bold md:text-xl">
                      No active openings
                    </h3>
                    <p className="text-muted-foreground/80 text-center text-sm font-medium md:text-base">
                      Please check back later for new recruitment drives.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {}
          {archivedOpenings.length > 0 && (
            <div className="mt-8 w-full max-w-full">
              {}
              <div
                onClick={() => setIsArchiveOpen(!isArchiveOpen)}
                className="group flex cursor-pointer select-none items-center justify-between rounded-[20px] border border-white/60 bg-white/40 p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.12)] md:rounded-[32px] md:p-6"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                    <Archive size={28} className="md:h-8 md:w-8" />
                  </div>
                  <div>
                    <h2 className="text-foreground mb-1 text-xl font-extrabold md:text-3xl">
                      Archives
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Past openings whose application deadlines have passed.
                    </p>
                  </div>
                </div>
                <div
                  className={`bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isArchiveOpen ? "rotate-180" : ""}`}
                >
                  <ChevronDown size={24} />
                </div>
              </div>

              {}
              {isArchiveOpen && (
                <div className="animate-in slide-in-from-top-2 fade-in mt-4 w-full max-w-full overflow-hidden rounded-[20px] border border-white/60 bg-white/40 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl duration-300 md:rounded-[32px] md:p-2">
                  <div className="relative w-full rounded-[16px] bg-white/50 md:rounded-[24px]">
                    {}
                    <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 rounded-r-[16px] bg-gradient-to-l from-white/80 to-transparent md:hidden" />

                    <div
                      className="w-full touch-pan-x overflow-x-auto pb-2 md:pb-0"
                      style={{ WebkitOverflowScrolling: "touch" }}
                    >
                      <table className="w-full min-w-[700px] border-collapse text-left lg:min-w-full">
                        <thead>
                          <tr className="border-b border-white/60 bg-white/40">
                            <th className="text-muted-foreground/60 whitespace-nowrap px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                              SL No.
                            </th>
                            <th className="text-muted-foreground/60 whitespace-nowrap px-4 py-4 text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                              Advt. No. & Date
                            </th>
                            <th className="text-muted-foreground/60 min-w-[200px] px-4 py-4 text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                              Name of the Post
                            </th>
                            <th className="text-muted-foreground/60 min-w-[280px] px-4 py-4 text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                              Job Description
                            </th>
                            <th className="text-muted-foreground/60 whitespace-nowrap px-4 py-4 text-center text-[11px] font-bold uppercase tracking-widest md:px-6 md:text-xs">
                              Closing Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/40">
                          {archivedOpenings.map((opening) => (
                            <tr
                              key={opening.id}
                              className="group transition-colors duration-300 hover:bg-white/80"
                            >
                              <td className="text-muted-foreground px-4 py-4 text-center text-sm font-bold md:px-6 md:py-5 md:text-base">
                                {opening.slNo}
                              </td>
                              <td className="text-muted-foreground whitespace-pre-line px-4 py-4 text-xs leading-relaxed md:px-6 md:py-5 md:text-sm">
                                <span className="text-foreground/90 mb-1 inline-block rounded-md border border-white/80 bg-white/60 px-2.5 py-1 font-mono font-semibold">
                                  {opening.advtNoAndDate.split("\n")[0]}
                                </span>
                                <br />
                                <div className="text-primary bg-primary/10 border-primary/20 mt-1.5 flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold md:text-xs">
                                  <Calendar size={12} strokeWidth={2.5} />
                                  <span>
                                    {opening.advtNoAndDate.split("\n")[1]}
                                  </span>
                                </div>
                              </td>
                              <td className="text-foreground/90 px-4 py-4 text-sm font-bold md:px-6 md:py-5 md:text-[15px]">
                                {opening.postName}
                              </td>
                              <td className="px-4 py-4 md:px-6 md:py-5">
                                <p className="text-muted-foreground/90 mb-3 text-xs leading-relaxed md:text-[13px]">
                                  {opening.jobDescriptionText}
                                </p>
                                {opening.jobDescriptionPdfUrl && (
                                  <a
                                    href={opening.jobDescriptionPdfUrl}
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-bold transition-colors md:text-xs"
                                  >
                                    <Download size={14} strokeWidth={2.5} />
                                    Download JD
                                  </a>
                                )}
                              </td>
                              <td className="whitespace-nowrap px-4 py-4 text-center text-xs font-semibold text-red-600/90 md:px-6 md:py-5 md:text-sm">
                                <div className="mx-auto flex w-fit items-center justify-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-red-600">
                                  <Clock_2 size={14} strokeWidth={2.5} />
                                  {opening.closingDate} (Closed)
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      );
    }

  return (
    <main className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <section className="to-primary relative isolate min-h-[520px] overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 pb-[130px] pt-[20px] md:pt-[2px]">
                    <div className="pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
                    {}
                    <div
                      className="absolute inset-0 -z-[3]"
                      style={{
                        background: `radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.04), transparent 34%), radial-gradient(circle at 81% 12%, rgba(255, 255, 255, 0.04), transparent 30%)`,
                      }}
                    />

                    {}
                    <img
                      src="/images/bg-lines.png"
                      alt=""
                      className="absolute inset-0 -z-[2] h-full w-full object-cover opacity-[0.14]"
                    />

                    <div className="relative mx-auto grid w-[min(1300px,calc(100%-56px))] grid-cols-1 items-center gap-8 text-center lg:grid-cols-2 lg:gap-0 lg:text-left">
                      {}
                      <div className="relative z-30 mx-auto w-full max-w-[560px] lg:mx-0">
                        <div
                          className="relative mx-auto mb-[10px] h-[52px] w-[82px] lg:mx-0"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute left-0 top-[14px] h-[28px] w-[28px] text-yellow-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                          </svg>

                          <svg
                            className="absolute left-[44px] top-[1px] h-[16px] w-[16px] text-yellow-300/80"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                          </svg>
                        </div>

                        {}
                        <h1 className="text-primary-foreground font-[family-name:var(--font-playfair-display,'Playfair_Display',serif)] text-[clamp(2.3rem,6vw,5rem)] leading-[1.1]">
                          Internship Recruitment
                        </h1>

                        {}
                        <p className="text-primary-foreground/85 mx-auto mt-[12px] max-w-[500px] text-left text-[0.9rem] leading-[1.6] sm:text-[1.1rem] lg:mx-0">
                          Aapke career ki shuruaat yahan se hoti hai! Join our Industrial
                          Internship program to get hands-on experience, learn from industry
                          experts, and work on real-world projects. Be a part of our next
                          batch of interns.
                        </p>
                      </div>

                      {}
                      <div className="relative mt-[20px] flex justify-center lg:mt-0 lg:translate-y-[60px] lg:justify-end xl:translate-y-[80px]">
                        <div className="absolute left-1/2 top-[20px] h-[260px] w-[300px] -translate-x-1/2 rotate-[10deg] rounded-[20px] bg-yellow-400 lg:left-auto lg:right-[60px] lg:translate-x-0"></div>

                        <img
                          src="/images/Breadcrum-iit.webp"
                          alt="Students learning together"
                          className="relative z-10 w-full max-w-[500px] lg:max-w-[550px]"
                        />
                      </div>
                    </div>

                    {}
                    <div
                      className="pointer-events-none absolute bottom-[-6px] left-0 z-20 w-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 1440 180"
                        preserveAspectRatio="none"
                        className="h-[280px] w-full"
                      >
                        <path
                          d="M0,125 C260,145 520,78 790,92 C1020,104 1225,70 1440,62 L1440,180 L0,180 Z"
                          className="fill-background"
                        />
                      </svg>
                    </div>
                  </section>

      {}
      <div className="bg-primary pointer-events-none absolute left-[-5%] top-[300px] z-0 h-[300px] w-[300px] rounded-full opacity-30 mix-blend-multiply blur-[100px] filter md:h-[400px] md:w-[400px] md:blur-[120px]"></div>
      <div className="bg-primary pointer-events-none absolute bottom-[10%] right-[-5%] z-0 h-[400px] w-[400px] rounded-full opacity-20 mix-blend-multiply blur-[120px] filter md:h-[500px] md:w-[500px] md:blur-[150px]"></div>

      <div className="relative z-10 w-full flex-1">
        <CurrentOpenings />
      </div>
    </main>
  );
}
