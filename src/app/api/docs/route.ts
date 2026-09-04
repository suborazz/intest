import { NextResponse } from "next/server";
import * as React from "react";
import Razorpay from "razorpay";
import { create } from "zustand";
import Image from "next/image";
import { format } from "date-fns";
import { Check, Search } from "lucide-react";
import Link from "next/link";
import { v2 as cloudinary } from "cloudinary";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
    const openApiSpec = {
      openapi: "3.0.3",
      info: {
        title: "IIInternship Backend API",
        version: "0.1.0",
        description: "REST API — Next.js 16 · TypeScript · Prisma · JWT Auth",
      },
      servers: [
        {
          url: "https://ii-internship-backend.vercel.app",
          description: "Vercel Production Server",
        },
        {
          url: "https://ii-internship-backend-hjwg.vercel.app",
          description: "Vercel Deployment Server",
        },
        {
          url: "http://localhost:3001",
          description: "Local Development Server",
        },
      ],
      tags: [
        { name: "Health", description: "Server health & monitoring" },
        {
          name: "Authentication",
          description: "Register, login, and token management",
        },
        {
          name: "Job Opportunities",
          description: "Job Placement & Opportunities management",
        },
        {
          name: "Job Applications",
          description: "Express Interest / Applications management",
        },
        {
          name: "Media Management",
          description:
            "Management of Photos, Videos, Press releases and Online links",
        },
        {
          name: "Internship Applications",
          description: "Student internship apply and approval management",
        },
        {
          name: "Enrollments & Certificates",
          description:
            "Student active enrollments, completion, and certificate management",
        },
        {
          name: "Student Dashboard",
          description: "Student central status and analytics dashboard summary",
        },
        {
          name: "Instructor Management",
          description: "Instructor profiles, verification, onboarding and listings",
        },
        {
          name: "ID Cards",
          description: "Student ID card issuance and verification",
        },
        { name: "Blogs", description: "Management of Success Stories and Blogs" },
        {
          name: "Reviews",
          description:
            "Public submissions and admin moderation of reviews/testimonials",
        },
        {
          name: "Donations",
          description:
            "Voluntary donations payments and 80G tax exemption certificate management",
        },
        {
          name: "Student Registration",
          description:
            "Student self-registration profile with personal info, address, academics, photo & signature",
        },
        {
          name: "Instructor Registration",
          description:
            "Instructor self-registration profile with qualifications, teaching details, professional background, photo & documents",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "JWT access token obtained from /api/v1/auth/login",
          },
        },
        schemas: {
                ApiSuccess: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              data: { description: "Response payload" },
              message: { type: "string", example: "Operation successful" },
            },
            required: ["success", "data"],
          },
          ApiError: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              error: {
                type: "object",
                properties: {
                  code: { type: "string", example: "VALIDATION_ERROR" },
                  message: { type: "string", example: "Request validation failed" },
                  details: { description: "Field-level error details" },
                },
                required: ["code", "message"],
              },
            },
            required: ["success", "error"],
          },
                UserPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              email: {
                type: "string",
                format: "email",
                example: "user@example.com",
              },
              name: { type: "string", nullable: true, example: "John Doe" },
              role: {
                type: "string",
                enum: ["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "SUPER_ADMIN"],
                example: "STUDENT",
              },
              isActive: { type: "boolean", example: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
                AuthTokens: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              refreshToken: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              expiresIn: {
                type: "number",
                example: 604800,
                description: "Seconds until access token expires",
              },
            },
          },
          RegisterRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "user@example.com",
              },
              password: {
                type: "string",
                minLength: 8,
                example: "SecurePass123",
                description: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
              },
              name: { type: "string", example: "John Doe" },
              role: {
                type: "string",
                enum: ["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "SUPER_ADMIN"],
                default: "STUDENT",
                example: "STUDENT",
              },
            },
          },
          LoginRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "user@example.com",
              },
              password: { type: "string", example: "SecurePass123" },
            },
          },
          RefreshRequest: {
            type: "object",
            required: ["refreshToken"],
            properties: {
              refreshToken: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
          ForgotPasswordRequest: {
            type: "object",
            required: ["email"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "user@example.com",
              },
            },
          },
          ResetPasswordRequest: {
            type: "object",
            required: ["token", "password"],
            properties: {
              token: { type: "string", example: "a1b2c3d4..." },
              password: { type: "string", minLength: 8, example: "SecurePass123" },
            },
          },
          UserUpdatePayload: {
            type: "object",
            properties: {
              name: { type: "string", example: "John Doe Updated" },
              role: {
                type: "string",
                enum: ["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "SUPER_ADMIN"],
                example: "STUDENT",
              },
              isActive: { type: "boolean", example: true },
            },
          },
          ChangePasswordRequest: {
            type: "object",
            required: ["currentPassword", "newPassword"],
            properties: {
              currentPassword: { type: "string", example: "OldSecure123" },
              newPassword: {
                type: "string",
                minLength: 8,
                example: "NewSecure123",
              },
            },
          },
          AdminCreateUserRequest: {
            type: "object",
            required: ["email"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "newuser@example.com",
              },
              name: { type: "string", example: "Jane Doe" },
              role: {
                type: "string",
                enum: ["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "SUPER_ADMIN"],
                default: "STUDENT",
                example: "STUDENT",
              },
            },
          },
          InternshipPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              title: { type: "string", example: "Node.js Developer Intern" },
              description: {
                type: "string",
                example: "Backend engineering internship...",
              },
              companyName: { type: "string", example: "Hilux Technologies" },
              location: { type: "string", example: "Remote" },
              type: {
                type: "string",
                enum: ["PAID", "STIPEND", "FREE"],
                example: "STIPEND",
              },
              price: { type: "number", nullable: true, example: null },
              stipendAmount: { type: "number", nullable: true, example: 5000 },
              duration: { type: "string", example: "6 Months" },
              isActive: { type: "boolean", example: true },
              startDate: { type: "string", format: "date-time", nullable: true },
              onboardingDetails: { type: "string", nullable: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              createdById: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              instructorId: {
                type: "string",
                nullable: true,
                example: "clxxxxxxxxxxxxxxxx",
              },
              instructor: {
                type: "object",
                nullable: true,
                properties: {
                  id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
                  name: { type: "string", example: "Jane Instructor" },
                  email: {
                    type: "string",
                    format: "email",
                    example: "instructor@example.com",
                  },
                },
              },
            },
          },
          CreateInternshipRequest: {
            type: "object",
            required: [
              "title",
              "description",
              "companyName",
              "location",
              "type",
              "duration",
            ],
            properties: {
              title: { type: "string", example: "Node.js Developer Intern" },
              description: {
                type: "string",
                example: "Backend engineering internship...",
              },
              companyName: { type: "string", example: "Hilux Technologies" },
              location: { type: "string", example: "Remote" },
              type: {
                type: "string",
                enum: ["PAID", "STIPEND", "FREE"],
                example: "STIPEND",
              },
              price: {
                type: "number",
                example: 1000,
                description: "Required if type is PAID",
              },
              stipendAmount: {
                type: "number",
                example: 5000,
                description: "Required if type is STIPEND",
              },
              duration: { type: "string", example: "6 Months" },
              startDate: {
                type: "string",
                format: "date-time",
                description: "Optional commencement date",
              },
              onboardingDetails: {
                type: "string",
                description:
                  "Private onboarding steps visible only to enrolled students",
              },
              instructorId: {
                type: "string",
                nullable: true,
                description: "Optional ID of the assigned instructor (INSTRUCTOR)",
              },
            },
          },
          UpdateInternshipRequest: {
            type: "object",
            properties: {
              title: { type: "string", example: "Node.js Developer Intern" },
              description: {
                type: "string",
                example: "Backend engineering internship...",
              },
              companyName: { type: "string", example: "Hilux Technologies" },
              location: { type: "string", example: "Remote" },
              type: {
                type: "string",
                enum: ["PAID", "STIPEND", "FREE"],
                example: "STIPEND",
              },
              price: { type: "number", example: 1000 },
              stipendAmount: { type: "number", example: 5000 },
              duration: { type: "string", example: "6 Months" },
              startDate: { type: "string", format: "date-time" },
              onboardingDetails: { type: "string" },
              instructorId: { type: "string", nullable: true },
            },
          },
          CreateOrderRequest: {
            type: "object",
            required: ["internshipId"],
            properties: {
              internshipId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
            },
          },
          VerifySignatureRequest: {
            type: "object",
            required: ["razorpayOrderId", "razorpayPaymentId", "razorpaySignature"],
            properties: {
              razorpayOrderId: { type: "string", example: "order_DBt748xyz..." },
              razorpayPaymentId: { type: "string", example: "pay_DBt748abc..." },
              razorpaySignature: { type: "string", example: "d452d3a339d6cf..." },
            },
          },
          RefundPaymentRequest: {
            type: "object",
            required: ["paymentId"],
            properties: {
              paymentId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              amount: {
                type: "number",
                example: 1000,
                description: "Optional partial refund amount",
              },
            },
          },
          PaymentPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              amount: { type: "number", example: 1000 },
              currency: { type: "string", example: "INR" },
              status: {
                type: "string",
                enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
                example: "COMPLETED",
              },
              razorpayOrderId: { type: "string", example: "order_DBt748xyz..." },
              razorpayPaymentId: {
                type: "string",
                nullable: true,
                example: "pay_DBt748abc...",
              },
              razorpaySignature: {
                type: "string",
                nullable: true,
                example: "d452d3a339d6cf...",
              },
              refundId: { type: "string", nullable: true, example: null },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              userId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              internshipId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
            },
          },
          EnrollmentPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              createdAt: { type: "string", format: "date-time" },
              userId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              internshipId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              paymentId: {
                type: "string",
                nullable: true,
                example: "clxxxxxxxxxxxxxxxx",
              },
              internship: { $ref: "#/components/schemas/InternshipPublic" },
            },
          },
          JobOpportunityPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              companyName: { type: "string", example: "Tech Corp Innovations" },
              address: { type: "string", example: "Cyber City, Phase 2, Gurugram" },
              postOpportunity: { type: "string", example: "Software Engineer" },
              jobNature: { type: "string", example: "Full Time" },
              fieldOfEmployment: {
                type: "string",
                example: "IT / Software Development",
              },
              minQualification: { type: "string", example: "B.Tech / MCA" },
              skillsRequired: {
                type: "string",
                nullable: true,
                example: "React, Node.js, TypeScript",
              },
              totalStaffStrength: {
                type: "string",
                nullable: true,
                example: "500+ Staff",
              },
              website: {
                type: "string",
                nullable: true,
                example: "https://techcorp.example.com",
              },
              logoUrl: {
                type: "string",
                nullable: true,
                example: "/uploads/logos/logo-12345.png",
              },
              isActive: { type: "boolean", example: true },
              advtNo: { type: "string", nullable: true, example: "II/2026/01" },
              advtDate: { type: "string", nullable: true, example: "15-May-2026" },
              closingDate: {
                type: "string",
                nullable: true,
                example: "30-June-2026",
              },
              jdDocUrl: {
                type: "string",
                nullable: true,
                example: "https://res.cloudinary.com/...",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              createdById: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
            },
          },
          JobApplicationPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              jobOpportunityId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              name: { type: "string", example: "John Doe" },
              age: { type: "integer", example: 22 },
              address: { type: "string", example: "123 Main St, New Delhi" },
              mobile: { type: "string", example: "+919999999999" },
              email: {
                type: "string",
                format: "email",
                example: "john.doe@example.com",
              },
              qualification: {
                type: "string",
                example: "B.Tech in Computer Science",
              },
              skills: {
                type: "string",
                nullable: true,
                example: "React, Node.js, Python",
              },
              resumeUrl: {
                type: "string",
                example: "/uploads/resumes/resume-12345.pdf",
              },
              status: {
                type: "string",
                enum: ["PENDING", "REVIEWING", "SHORTLISTED", "REJECTED"],
                example: "PENDING",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              userId: {
                type: "string",
                nullable: true,
                example: "clxxxxxxxxxxxxxxxx",
              },
              jobOpportunity: {
                type: "object",
                properties: {
                  companyName: { type: "string", example: "Tech Corp Innovations" },
                  postOpportunity: { type: "string", example: "Software Engineer" },
                },
              },
            },
          },
          MediaPhotoPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              url: {
                type: "string",
                example: "/uploads/media/photos/photo-12345.png",
              },
              title: { type: "string", example: "Annual Tech Summit 2026" },
              date: { type: "string", example: "June 10, 2026" },
              description: {
                type: "string",
                example: "Glimpses from our annual tech summit...",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          MediaVideoPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              youtubeId: { type: "string", example: "dQw4w9WgXcQ" },
              title: {
                type: "string",
                example: "How to Land Your Dream Internship",
              },
              date: { type: "string", example: "June 26, 2026" },
              description: {
                type: "string",
                example: "In this comprehensive guide, we discuss...",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          MediaNewspaperPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              title: {
                type: "string",
                example: "IIInternship Revolutionizes Student Placements",
              },
              publication: { type: "string", example: "The Daily Tech" },
              date: { type: "string", example: "June 15, 2026" },
              description: {
                type: "string",
                example: "How the new platform is changing the way...",
              },
              imageUrl: {
                type: "string",
                example: "/uploads/media/newspapers/newspaper-12345.png",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          MediaOnlineLinkPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              slNo: { type: "string", example: "01" },
              date: { type: "string", example: "June 20, 2026" },
              headline: {
                type: "string",
                example: "Startup of the Month: IIInternship",
              },
              agency: { type: "string", example: "TechCrunch" },
              link: {
                type: "string",
                format: "uri",
                example: "https://techcrunch.com/iiinternship",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          BlogPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              title: {
                type: "string",
                example: "Three-Day Atma Utkarsh Meditation-Yoga Camp",
              },
              content: { type: "string", example: "Unique Records of Universe..." },
              category: { type: "string", example: "YOGA AND MEDITATION" },
              serialNo: { type: "string", nullable: true, example: "ESI No. 3" },
              date: { type: "string", example: "Thu Mar 19 2026" },
              location: {
                type: "string",
                nullable: true,
                example: "Thekma, Azamgarh, Uttar Pradesh",
              },
              authorName: { type: "string", example: "Dr. Avishek Kumar" },
              authorRole: {
                type: "string",
                nullable: true,
                example: "Chief Managing Director",
              },
              authorEmail: {
                type: "string",
                nullable: true,
                example: "author@example.com",
              },
              imageUrl: {
                type: "string",
                nullable: true,
                example: "/uploads/blogs/blog-12345.png",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          ReviewPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              name: { type: "string", example: "Jane Doe" },
              email: {
                type: "string",
                format: "email",
                example: "jane@example.com",
              },
              role: { type: "string", nullable: true, example: "Student" },
              rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
              comment: {
                type: "string",
                example: "The internship was a great learning experience...",
              },
              avatarUrl: {
                type: "string",
                nullable: true,
                example: "/uploads/avatars/avatar.png",
              },
              isApproved: { type: "boolean", example: true },
              approvedAt: { type: "string", format: "date-time", nullable: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          CreateDonationOrderRequest: {
            type: "object",
            required: ["amount", "donorName", "email", "mobile", "address"],
            properties: {
              amount: { type: "number", minimum: 1, example: 500 },
              donorName: { type: "string", example: "Vishakha Sane" },
              email: {
                type: "string",
                format: "email",
                example: "vishakha@example.com",
              },
              mobile: { type: "string", example: "9472351693" },
              wants80G: { type: "boolean", default: false, example: true },
              panNumber: {
                type: "string",
                pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                example: "ABCDE1234F",
                nullable: true,
              },
              address: { type: "string", example: "H.No 661, Goa, India" },
              notes: { type: "string", example: "Happy to help!", nullable: true },
            },
          },
          VerifyDonationRequest: {
            type: "object",
            required: ["razorpayOrderId", "razorpayPaymentId", "razorpaySignature"],
            properties: {
              razorpayOrderId: { type: "string", example: "order_DA123456789" },
              razorpayPaymentId: { type: "string", example: "pay_DA123456789" },
              razorpaySignature: { type: "string", example: "d0e3a4..." },
            },
          },
          DonationPublic: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              amount: { type: "number", example: 500 },
              donorName: { type: "string", example: "Vishakha Sane" },
              address: { type: "string", example: "Goa, India" },
              notes: { type: "string", nullable: true, example: "Happy to help!" },
              razorpayPaymentId: {
                type: "string",
                nullable: true,
                example: "pay_DA123456789",
              },
              createdAt: { type: "string", format: "date-time" },
            },
          },
          DonationAdmin: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              amount: { type: "number", example: 500 },
              donorName: { type: "string", example: "Vishakha Sane" },
              email: {
                type: "string",
                format: "email",
                example: "vishakha@example.com",
              },
              mobile: { type: "string", example: "9472351693" },
              address: { type: "string", example: "H.No 661, Goa, India" },
              notes: { type: "string", nullable: true, example: "Happy to help!" },
              wants80G: { type: "boolean", example: true },
              panNumber: { type: "string", nullable: true, example: "ABCDE1234F" },
              razorpayOrderId: { type: "string", example: "order_DA123456789" },
              razorpayPaymentId: {
                type: "string",
                nullable: true,
                example: "pay_DA123456789",
              },
              razorpaySignature: {
                type: "string",
                nullable: true,
                example: "d0e3a4...",
              },
              status: { type: "string", example: "COMPLETED" },
              receiptPath: {
                type: "string",
                nullable: true,
                example: "/uploads/receipts/receipt-12345.pdf",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
                AddressObject: {
            type: "object",
            required: ["local", "district", "state", "country", "pinCode"],
            properties: {
              local: {
                type: "string",
                minLength: 3,
                example: "Flat No. 402, Green Apartments, Boring Road",
              },
              district: { type: "string", minLength: 2, example: "Patna" },
              state: { type: "string", minLength: 2, example: "Bihar" },
              country: { type: "string", minLength: 2, example: "India" },
              pinCode: { type: "string", pattern: "^\\d{6}$", example: "800001" },
            },
          },
          AcademicDetailObject: {
            type: "object",
            required: [
              "qualification",
              "stream",
              "subject",
              "instituteName",
              "universityName",
              "sessionYear",
              "gradeDivision",
              "status",
            ],
            properties: {
              qualification: { type: "string", example: "Graduate Pass Out" },
              stream: { type: "string", example: "B.Tech" },
              subject: {
                type: "string",
                example: "Computer Science & Engineering",
              },
              instituteName: {
                type: "string",
                example: "National Institute of Technology",
              },
              universityName: { type: "string", example: "NIT University" },
              sessionYear: { type: "string", example: "2020-2024" },
              gradeDivision: { type: "string", example: "8.5 CGPA" },
              status: {
                type: "string",
                enum: ["Pass Out", "Persuing"],
                example: "Pass Out",
              },
            },
          },
          StudentRegistrationCreate: {
            type: "object",
            required: [
              "fullName",
              "fatherName",
              "motherName",
              "dob",
              "gender",
              "category",
              "localAddress",
              "sameAsLocal",
              "permanentAddress",
              "mobileNo",
              "academics",
              "internshipGoal",
              "photoBase64",
              "photoName",
              "signatureBase64",
              "signatureName",
              "agreeTerms",
            ],
            properties: {
              fullName: { type: "string", minLength: 2, example: "Amit Kumar" },
              fatherName: { type: "string", minLength: 2, example: "Rajesh Kumar" },
              motherName: { type: "string", minLength: 2, example: "Sunita Devi" },
              dob: {
                type: "string",
                pattern: "^\\d{4}-\\d{2}-\\d{2}$",
                example: "2002-08-15",
              },
              gender: {
                type: "string",
                enum: ["Male", "Female", "Transgender"],
                example: "Male",
              },
              category: { type: "string", example: "General" },
              localAddress: { $ref: "#/components/schemas/AddressObject" },
              sameAsLocal: {
                type: "boolean",
                example: true,
                description: "If true, permanentAddress mirrors localAddress",
              },
              permanentAddress: { $ref: "#/components/schemas/AddressObject" },
              mobileNo: {
                type: "string",
                pattern: "^\\d{10}$",
                example: "9472351693",
              },
              academics: {
                type: "array",
                minItems: 1,
                items: { $ref: "#/components/schemas/AcademicDetailObject" },
              },
              internshipGoal: {
                type: "string",
                enum: [
                  "Job",
                  "Freelancing",
                  "Higher Studies",
                  "Startup",
                  "Skill Enhancement",
                  "Other",
                ],
                example: "Job",
              },
              aadharNo: {
                type: "string",
                pattern: "^\\d{12}$",
                example: "123456789012",
                description: "Optional — 12-digit Aadhar number",
              },
              photoBase64: {
                type: "string",
                description: "Base64-encoded photo image (max 500 KB)",
                example: "data:image/jpeg;base64,/9j/4AAQ...",
              },
              photoName: { type: "string", example: "amit_photo.jpg" },
              signatureBase64: {
                type: "string",
                description: "Base64-encoded signature image (max 500 KB)",
                example: "data:image/jpeg;base64,/9j/4AAQ...",
              },
              signatureName: { type: "string", example: "amit_signature.jpg" },
              agreeTerms: { type: "boolean", enum: [true], example: true },
            },
          },
          StudentRegistrationPublic: {
            type: "object",
            description:
              "Registration record with photo and signature URLs (stored on disk)",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              studentId: { type: "string", example: "S2026AK45901" },
              fullName: { type: "string", example: "Amit Kumar" },
              fatherName: { type: "string", example: "Rajesh Kumar" },
              motherName: { type: "string", example: "Sunita Devi" },
              dob: { type: "string", example: "2002-08-15" },
              gender: {
                type: "string",
                enum: ["Male", "Female", "Transgender"],
                example: "Male",
              },
              category: { type: "string", example: "General" },
              localAddressLocal: {
                type: "string",
                example: "Flat No. 402, Green Apartments",
              },
              localAddressDistrict: { type: "string", example: "Patna" },
              localAddressState: { type: "string", example: "Bihar" },
              localAddressCountry: { type: "string", example: "India" },
              localAddressPinCode: { type: "string", example: "800001" },
              sameAsLocal: { type: "boolean", example: true },
              permAddressLocal: {
                type: "string",
                example: "Flat No. 402, Green Apartments",
              },
              permAddressDistrict: { type: "string", example: "Patna" },
              permAddressState: { type: "string", example: "Bihar" },
              permAddressCountry: { type: "string", example: "India" },
              permAddressPinCode: { type: "string", example: "800001" },
              mobileNo: { type: "string", example: "9472351693" },
              internshipGoal: { type: "string", example: "Job" },
              aadharNo: { type: "string", nullable: true, example: "123456789012" },
              photoUrl: {
                type: "string",
                example: "/uploads/students/photo-S2026AK45901-1234567.jpg",
              },
              photoName: { type: "string", example: "amit_photo.jpg" },
              signatureUrl: {
                type: "string",
                example: "/uploads/students/sig-S2026AK45901-1234567.jpg",
              },
              signatureName: { type: "string", example: "amit_signature.jpg" },
              agreeTerms: { type: "boolean", example: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              userId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              academics: {
                type: "array",
                items: { $ref: "#/components/schemas/AcademicDetailObject" },
              },
            },
          },
          StudentRegistrationFull: {
            allOf: [{ $ref: "#/components/schemas/StudentRegistrationPublic" }],
          },
                InstructorQualificationObject: {
            type: "object",
            required: [
              "highestQualification",
              "specialization",
              "universityName",
              "yearOfCompletion",
              "percentage",
            ],
            properties: {
              highestQualification: { type: "string", example: "Ph.D" },
              specialization: {
                type: "string",
                example: "Artificial Intelligence & Machine Learning",
              },
              universityName: {
                type: "string",
                example: "Indian Institute of Technology, Delhi",
              },
              yearOfCompletion: { type: "string", example: "2021" },
              percentage: { type: "string", example: "9.2 CGPA" },
            },
          },
          InstructorRegistrationCreate: {
            type: "object",
            required: [
              "fullName",
              "fatherSpouseName",
              "dob",
              "gender",
              "mobileNo",
              "currentAddress",
              "sameAsCurrentAddress",
              "permanentAddress",
              "qualifications",
              "currentOrganization",
              "currentDesignation",
              "totalWorkExperience",
              "teachingExperience",
              "internshipExperience",
              "mentorshipAreas",
              "preferredInternLevel",
              "maxInterns",
              "mentorshipMode",
              "availability",
              "selfIntroduction",
              "photoBase64",
              "photoName",
              "identityProofBase64",
              "identityProofName",
              "educationCertBase64",
              "educationCertName",
              "agreeTerms",
            ],
            properties: {
              fullName: { type: "string", example: "Rajan Kumar" },
              fatherSpouseName: { type: "string", example: "Suresh Kumar" },
              dob: {
                type: "string",
                pattern: "^\\d{4}-\\d{2}-\\d{2}$",
                example: "1994-08-15",
              },
              gender: {
                type: "string",
                enum: ["Male", "Female", "Transgender"],
                example: "Male",
              },
              mobileNo: {
                type: "string",
                pattern: "^\\d{10}$",
                example: "9472351693",
              },
              alternateMobileNo: {
                type: "string",
                pattern: "^\\d{10}$",
                example: "9123456789",
              },
              currentAddress: { $ref: "#/components/schemas/AddressObject" },
              sameAsCurrentAddress: { type: "boolean", example: true },
              permanentAddress: { $ref: "#/components/schemas/AddressObject" },
              qualifications: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/InstructorQualificationObject",
                },
              },
              currentOrganization: { type: "string", example: "Aegis Tech Labs" },
              currentDesignation: { type: "string", example: "Lead AI Scientist" },
              totalWorkExperience: { type: "string", example: "8 Years" },
              teachingExperience: { type: "string", example: "3 Years" },
              internshipExperience: { type: "string", example: "2 Years" },
              mentorshipAreas: {
                type: "string",
                example: "Supervising projects on Deep Learning, NLP, and Next.js.",
              },
              preferredInternLevel: {
                type: "array",
                items: { type: "string" },
                example: ["Graduate Level", "Postgraduate Level"],
              },
              maxInterns: { type: "string", example: "5" },
              mentorshipMode: {
                type: "array",
                items: { type: "string" },
                example: ["Online", "Hybrid"],
              },
              availability: {
                type: "string",
                example: "Saturdays 10:00 AM - 2:00 PM",
              },
              selfIntroduction: {
                type: "string",
                example:
                  "I am a passionate AI Researcher with over 8 years of industry experience.",
              },
              photoBase64: { type: "string", example: "data:image/png;base64,..." },
              photoName: { type: "string", example: "passport_photo.png" },
              identityProofBase64: {
                type: "string",
                example: "data:application/pdf;base64,...",
              },
              identityProofName: { type: "string", example: "aadhaar_card.pdf" },
              educationCertBase64: {
                type: "string",
                example: "data:application/pdf;base64,...",
              },
              educationCertName: { type: "string", example: "phd_degree.pdf" },
              experienceCertBase64: {
                type: "string",
                example: "data:application/pdf;base64,...",
              },
              experienceCertName: { type: "string", example: "exp_letter.pdf" },
              agreeTerms: { type: "boolean", enum: [true], example: true },
            },
          },
          InstructorRegistrationPublic: {
            type: "object",
            description:
              "Registration record for instructors with relative URL document paths (stored on local disk)",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              instructorId: { type: "string", example: "I2026RK54321" },
              fullName: { type: "string", example: "Rajan Kumar" },
              fatherSpouseName: { type: "string", example: "Suresh Kumar" },
              dob: { type: "string", example: "1994-08-15" },
              gender: { type: "string", example: "Male" },
              mobileNo: { type: "string", example: "9472351693" },
              alternateMobileNo: {
                type: "string",
                nullable: true,
                example: "9123456789",
              },
              currentAddressLocal: {
                type: "string",
                example: "Flat 405, Sector 12",
              },
              currentAddressDistrict: { type: "string", example: "Dwarka" },
              currentAddressState: { type: "string", example: "Delhi" },
              currentAddressCountry: { type: "string", example: "India" },
              currentAddressPinCode: { type: "string", example: "110075" },
              sameAsCurrentAddress: { type: "boolean", example: true },
              permAddressLocal: { type: "string", example: "Flat 405, Sector 12" },
              permAddressDistrict: { type: "string", example: "Dwarka" },
              permAddressState: { type: "string", example: "Delhi" },
              permAddressCountry: { type: "string", example: "India" },
              permAddressPinCode: { type: "string", example: "110075" },
              currentOrganization: { type: "string", example: "Aegis Tech Labs" },
              currentDesignation: { type: "string", example: "Lead AI Scientist" },
              totalWorkExperience: { type: "string", example: "8 Years" },
              teachingExperience: { type: "string", example: "3 Years" },
              internshipExperience: { type: "string", example: "2 Years" },
              mentorshipAreas: {
                type: "string",
                example: "Supervising projects on Deep Learning, NLP, and Next.js.",
              },
              preferredInternLevel: {
                type: "array",
                items: { type: "string" },
                example: ["Graduate Level", "Postgraduate Level"],
              },
              maxInterns: { type: "string", example: "5" },
              mentorshipMode: {
                type: "array",
                items: { type: "string" },
                example: ["Online", "Hybrid"],
              },
              availability: {
                type: "string",
                example: "Saturdays 10:00 AM - 2:00 PM",
              },
              selfIntroduction: {
                type: "string",
                example:
                  "I am a passionate AI Researcher with over 8 years of industry experience.",
              },
              photoUrl: {
                type: "string",
                example: "/uploads/students/inst-photo-I2026RK54321-12345.png",
              },
              photoName: { type: "string", example: "passport_photo.png" },
              identityProofUrl: {
                type: "string",
                example: "/uploads/students/inst-id-I2026RK54321-12345.pdf",
              },
              identityProofName: { type: "string", example: "aadhaar_card.pdf" },
              educationCertUrl: {
                type: "string",
                example: "/uploads/students/inst-edu-I2026RK54321-12345.pdf",
              },
              educationCertName: { type: "string", example: "phd_degree.pdf" },
              experienceCertUrl: {
                type: "string",
                nullable: true,
                example: "/uploads/students/inst-exp-I2026RK54321-12345.pdf",
              },
              experienceCertName: {
                type: "string",
                nullable: true,
                example: "exp_letter.pdf",
              },
              agreeTerms: { type: "boolean", example: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              userId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              qualifications: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/InstructorQualificationObject",
                },
              },
            },
          },
          InstructorRegistrationFull: {
            allOf: [{ $ref: "#/components/schemas/InstructorRegistrationPublic" }],
          },
          FeedbackObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              enrollmentId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              senderId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              receiverId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              type: {
                type: "string",
                enum: ["STUDENT_TO_INSTRUCTOR", "INSTRUCTOR_TO_STUDENT"],
                example: "STUDENT_TO_INSTRUCTOR",
              },
              rating: { type: "integer", example: 5 },
              comments: {
                type: "string",
                example: "Great mentorship experience. Highly recommended!",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          SupportTicketObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              ticketNo: { type: "string", example: "TKT-123456" },
              title: { type: "string", example: "Payment issue" },
              description: {
                type: "string",
                example:
                  "My Razorpay payment succeeded but the status still shows pending.",
              },
              status: {
                type: "string",
                enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
                example: "OPEN",
              },
              priority: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                example: "MEDIUM",
              },
              userId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          NoticeObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              title: { type: "string", example: "System Scheduled Maintenance" },
              content: {
                type: "string",
                example: "The system will undergo maintenance on Saturday.",
              },
              senderId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              targetRole: {
                type: "string",
                nullable: true,
                enum: ["STUDENT", "INSTRUCTOR"],
                example: "STUDENT",
              },
              receiverId: {
                type: "string",
                nullable: true,
                example: "clxxxxxxxxxxxxxxxx",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          ImmersionObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              title: {
                type: "string",
                example: "Advanced ML Specialization Immersion",
              },
              description: {
                type: "string",
                example:
                  "Hands-on immersion program focusing on training and deploying models.",
              },
              startDate: { type: "string", format: "date-time" },
              endDate: { type: "string", format: "date-time" },
              status: {
                type: "string",
                enum: ["UPCOMING", "ACTIVE", "COMPLETED"],
                example: "ACTIVE",
              },
              instructorId: {
                type: "string",
                nullable: true,
                example: "clxxxxxxxxxxxxxxxx",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
          ImmersionRegistrationObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              status: {
                type: "string",
                enum: ["PENDING", "APPROVED", "REJECTED"],
                example: "PENDING",
              },
              remarks: {
                type: "string",
                nullable: true,
                example: "Excellent background.",
              },
              registeredAt: { type: "string", format: "date-time" },
              studentId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              immersionId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
            },
          },
          ImmersionCertificateObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              certificateNo: { type: "string", example: "IMC-2026-0001" },
              issuedAt: { type: "string", format: "date-time" },
              registrationId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              issuedById: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
            },
          },
          ProjectSubmissionObject: {
            type: "object",
            properties: {
              id: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              enrollmentId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
              projectTitle: {
                type: "string",
                example: "IIIT Backend Portal Development",
              },
              projectUrl: {
                type: "string",
                example: "https://github.com/user/project",
              },
              comments: {
                type: "string",
                nullable: true,
                example: "Completed basic routing and security.",
              },
              status: {
                type: "string",
                enum: ["PENDING", "GRADED"],
                example: "PENDING",
              },
              grade: { type: "string", nullable: true, example: "A+" },
              feedback: {
                type: "string",
                nullable: true,
                example: "Excellent architecture and code modularity.",
              },
              gradedById: {
                type: "string",
                nullable: true,
                example: "clxxxxxxxxxxxxxxxx",
              },
              gradedAt: { type: "string", format: "date-time", nullable: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        responses: {
          Unauthorized: {
            description: "Authentication required or token invalid",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiError" },
                example: {
                  success: false,
                  error: {
                    code: "UNAUTHORIZED",
                    message: "Authentication required",
                  },
                },
              },
            },
          },
          ValidationError: {
            description: "Request validation failed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiError" },
                example: {
                  success: false,
                  error: {
                    code: "VALIDATION_ERROR",
                    message: "Request validation failed",
                    details: { email: ["Invalid email address"] },
                  },
                },
              },
            },
          },
          InternalError: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiError" },
                example: {
                  success: false,
                  error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "An internal server error occurred",
                  },
                },
              },
            },
          },
        },
      },
      paths: {
            "/api/health": {
          get: {
            tags: ["Health"],
            summary: "Health Check",
            description:
              "Returns server health status, database connectivity, uptime, and latency.",
            operationId: "getHealth",
            responses: {
              "200": {
                description: "Server is healthy",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: { type: "boolean", example: true },
                        status: {
                          type: "string",
                          enum: ["ok", "degraded"],
                          example: "ok",
                        },
                        timestamp: { type: "string", format: "date-time" },
                        uptime: {
                          type: "number",
                          example: 3600,
                          description: "Server uptime in seconds",
                        },
                        version: { type: "string", example: "0.1.0" },
                        environment: { type: "string", example: "development" },
                        latencyMs: { type: "number", example: 12 },
                        services: {
                          type: "object",
                          properties: {
                            database: {
                              type: "object",
                              properties: {
                                status: { type: "string", enum: ["ok", "error"] },
                                latencyMs: { type: "number", example: 5 },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              "503": {
                description: "Server is degraded (DB unreachable)",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                  },
                },
              },
            },
          },
        },

            "/api/v1/auth/register": {
          post: {
            tags: ["Authentication"],
            summary: "Register",
            description:
              "Create a new user account. Returns the user profile and JWT tokens.",
            operationId: "register",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RegisterRequest" },
                },
              },
            },
            responses: {
              "201": {
                description: "Account created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                user: { $ref: "#/components/schemas/UserPublic" },
                                tokens: { $ref: "#/components/schemas/AuthTokens" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "409": {
                description: "Email already taken",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "EMAIL_TAKEN",
                        message: "An account with this email already exists",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },

            "/api/v1/auth/login": {
          post: {
            tags: ["Authentication"],
            summary: "Login",
            description:
              "Authenticate with email & password. Returns access and refresh tokens.",
            operationId: "login",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Login successful",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                user: { $ref: "#/components/schemas/UserPublic" },
                                tokens: { $ref: "#/components/schemas/AuthTokens" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": {
                description: "Invalid credentials",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "INVALID_CREDENTIALS",
                        message: "Invalid email or password",
                      },
                    },
                  },
                },
              },
              "403": {
                description: "Account deactivated / suspended",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "ACCOUNT_DEACTIVATED",
                        message:
                          "Your account has been deactivated. Please contact support.",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },

            "/api/v1/auth/refresh": {
          post: {
            tags: ["Authentication"],
            summary: "Refresh Token",
            description: "Exchange a valid refresh token for a new access token.",
            operationId: "refreshToken",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RefreshRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "New access token issued",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                accessToken: { type: "string" },
                                expiresIn: { type: "number", example: 604800 },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },

            "/api/v1/auth/me": {
          get: {
            tags: ["Authentication"],
            summary: "Get Current User Profile",
            description:
              "Retrieve profile details of the currently authenticated user.",
            operationId: "getCurrentUser",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "Profile retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                user: { $ref: "#/components/schemas/UserPublic" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "404": {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: { code: "USER_NOT_FOUND", message: "User not found" },
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },

            "/api/v1/auth/forgot-password": {
          post: {
            tags: ["Authentication"],
            summary: "Forgot Password",
            description: "Request a password reset link for a user account.",
            operationId: "forgotPassword",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ForgotPasswordRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Reset request received",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            message: {
                              type: "string",
                              example:
                                "If the email exists, a password reset link has been sent.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },

            "/api/v1/auth/reset-password": {
          post: {
            tags: ["Authentication"],
            summary: "Reset Password",
            description: "Reset user password using a valid reset token.",
            operationId: "resetPassword",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Password reset successful",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            message: {
                              type: "string",
                              example: "Password has been reset successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": {
                description: "Invalid or expired token",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "INVALID_OR_EXPIRED_TOKEN",
                        message: "Reset token is invalid or has expired",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/auth/change-password": {
          post: {
            tags: ["Authentication"],
            summary: "Change Password",
            description: "Update the password of the currently authenticated user.",
            operationId: "changePassword",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ChangePasswordRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Password changed successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            message: {
                              type: "string",
                              example: "Password changed successfully",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": {
                description: "Incorrect current password",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "INVALID_PASSWORD",
                        message: "The current password you entered is incorrect",
                      },
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/auth/logout": {
          post: {
            tags: ["Authentication"],
            summary: "Logout",
            description: "Terminate session and clear client-side token cookies.",
            operationId: "logout",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "Logged out successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            message: {
                              type: "string",
                              example: "Logged out successfully",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
            "/api/v1/users": {
          get: {
            tags: ["User Management"],
            summary: "List Users",
            description:
              "Retrieve a paginated, filterable list of all users. SUPER_ADMIN credentials required.",
            operationId: "listUsers",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "role",
                in: "query",
                schema: {
                  type: "string",
                  enum: ["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "SUPER_ADMIN"],
                },
              },
              {
                name: "search",
                in: "query",
                schema: { type: "string" },
                description: "Search term matching name or email",
              },
            ],
            responses: {
              "200": {
                description: "List retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/UserPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Administrator privileges required.",
                      },
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["User Management"],
            summary: "Admin Create User",
            description:
              "Manually register a new user and email their credentials. SUPER_ADMIN credentials required.",
            operationId: "adminCreateUser",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AdminCreateUserRequest" },
                },
              },
            },
            responses: {
              "201": {
                description: "User account created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/UserPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Administrator privileges required.",
                      },
                    },
                  },
                },
              },
              "409": {
                description: "Email already taken",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "USER_ALREADY_EXISTS",
                        message: "A user with this email already exists.",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
            "/api/v1/users/{id}": {
          get: {
            tags: ["User Management"],
            summary: "Get User Profile Detail",
            description:
              "Retrieve detailed profile parameters for a specific user. Accessible by profile owner or SUPER_ADMIN.",
            operationId: "getUserById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "User details retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                user: { $ref: "#/components/schemas/UserPublic" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description:
                  "Forbidden - Requester is neither owner nor SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. You can only view your own profile.",
                      },
                    },
                  },
                },
              },
              "404": {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: { code: "USER_NOT_FOUND", message: "User not found" },
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          patch: {
            tags: ["User Management"],
            summary: "Update User Profile",
            description:
              "Modify user profile. Owner can update name. SUPER_ADMIN can update all properties.",
            operationId: "updateUserById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserUpdatePayload" },
                },
              },
            },
            responses: {
              "200": {
                description: "User profile updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                user: { $ref: "#/components/schemas/UserPublic" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description:
                  "Forbidden - Attempted unauthorized role/status change or wrong user profile",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Only administrators can update roles or status.",
                      },
                    },
                  },
                },
              },
              "404": {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: { code: "USER_NOT_FOUND", message: "User not found" },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["User Management"],
            summary: "Delete User Account",
            description:
              "Remove user account from database completely. SUPER_ADMIN only.",
            operationId: "deleteUserById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "User account deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            message: {
                              type: "string",
                              example:
                                "User account has been deleted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Administrator privileges required to delete users.",
                      },
                    },
                  },
                },
              },
              "404": {
                description: "User not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: { code: "USER_NOT_FOUND", message: "User not found" },
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/internships": {
          get: {
            tags: ["Internships"],
            summary: "List Internships",
            description:
              "Retrieve a paginated list of active internship listings. Publicly accessible.",
            operationId: "listInternships",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "type",
                in: "query",
                schema: { type: "string", enum: ["PAID", "STIPEND", "FREE"] },
              },
              {
                name: "search",
                in: "query",
                schema: { type: "string" },
                description: "Search term matching title, company, or location",
              },
            ],
            responses: {
              "200": {
                description: "List retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/InternshipPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Internships"],
            summary: "Post Internship",
            description:
              "Publish a new internship listing. SUPER_ADMIN privileges required.",
            operationId: "createInternship",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CreateInternshipRequest" },
                },
              },
            },
            responses: {
              "201": {
                description: "Internship posted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/InternshipPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Administrator privileges required.",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/internships/{id}": {
          get: {
            tags: ["Internships"],
            summary: "Get Internship Details",
            description:
              "Retrieve details of a specific internship listing. Publicly accessible.",
            operationId: "getInternshipById",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Details retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/InternshipPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "404": {
                description: "Internship not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "INTERNSHIP_NOT_FOUND",
                        message: "Internship not found",
                      },
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          patch: {
            tags: ["Internships"],
            summary: "Update Internship Details",
            description:
              "Modify details of an internship listing. SUPER_ADMIN privileges required.",
            operationId: "updateInternshipById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UpdateInternshipRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Internship updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/InternshipPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Administrator privileges required.",
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Internship not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "INTERNSHIP_NOT_FOUND",
                        message: "Internship not found",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Internships"],
            summary: "Delete Internship Listing",
            description:
              "Soft delete an internship listing. SUPER_ADMIN privileges required.",
            operationId: "deleteInternshipById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Internship deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            message: {
                              type: "string",
                              example: "Internship deleted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "FORBIDDEN",
                        message:
                          "Access denied. Administrator privileges required.",
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Internship not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "INTERNSHIP_NOT_FOUND",
                        message: "Internship not found",
                      },
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/payments/create-order": {
          post: {
            tags: ["Payments"],
            summary: "Create Razorpay Order",
            description:
              "Initialize a payment transaction for a paid internship. Generates Razorpay Order ID.",
            operationId: "createOrder",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CreateOrderRequest" },
                },
              },
            },
            responses: {
              "201": {
                description: "Order created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                paymentId: { type: "string" },
                                razorpayOrderId: { type: "string" },
                                amount: { type: "integer" },
                                currency: { type: "string" },
                                keyId: { type: "string" },
                                isMockMode: { type: "boolean" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": {
                description: "Invalid internship type or price",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "409": {
                description: "Already enrolled",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/payments/verify-signature": {
          post: {
            tags: ["Payments"],
            summary: "Verify Razorpay Signature",
            description:
              "Confirm the payment success cryptographically and register the user enrollment.",
            operationId: "verifySignature",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/VerifySignatureRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Payment verified and enrollment completed",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                paymentId: { type: "string" },
                                enrollmentId: { type: "string" },
                                status: { type: "string", example: "COMPLETED" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": {
                description: "Signature verification failed",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/payments/refund": {
          post: {
            tags: ["Payments"],
            summary: "Refund Completed Payment",
            description:
              "Issue partial or full refund for a payment and cancel the user enrollment. SUPER_ADMIN only.",
            operationId: "refundPayment",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RefundPaymentRequest" },
                },
              },
            },
            responses: {
              "200": {
                description:
                  "Refund successfully completed and enrollment canceled",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                paymentId: { type: "string" },
                                refundId: { type: "string" },
                                refundedAmount: { type: "number" },
                                status: { type: "string", example: "REFUNDED" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": {
                description: "Forbidden - Requester is not a SUPER_ADMIN",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                  },
                },
              },
              "404": {
                description: "Payment record not found",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/payments": {
          get: {
            tags: ["Payments"],
            summary: "List All Payments (Admin)",
            description:
              "Retrieve a paginated, filterable, searchable list of all payments. SUPER_ADMIN only.",
            operationId: "listPayments",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "status",
                in: "query",
                schema: {
                  type: "string",
                  enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
                },
              },
              { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
              "200": {
                description: "List of payments retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/PaymentPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/payments/my-payments": {
          get: {
            tags: ["Payments"],
            summary: "List My Payments (Student)",
            description:
              "Retrieve a paginated list of payments for the authenticated student.",
            operationId: "listMyPayments",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "status",
                in: "query",
                schema: {
                  type: "string",
                  enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
                },
              },
              { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
              "200": {
                description: "My payments retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/PaymentPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/payments/webhook": {
          post: {
            tags: ["Payments"],
            summary: "Razorpay Webhook Callback",
            description:
              "Handles asynchronous payment capture/failure notifications directly from Razorpay. Cryptographically verified.",
            operationId: "razorpayWebhook",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      event: { type: "string", example: "payment.captured" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Webhook successfully processed",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                received: { type: "boolean", example: true },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Invalid signature or payload" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/internships/{id}/enroll": {
          post: {
            tags: ["Enrollments"],
            summary: "Direct Internship Enrollment (Free/Stipend)",
            description:
              "Enroll directly in a Free or Stipend-based internship program. Paid internships will be rejected.",
            operationId: "enrollInInternship",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "201": {
                description: "Successfully enrolled",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                enrollmentId: { type: "string" },
                                internshipId: { type: "string" },
                                createdAt: { type: "string", format: "date-time" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": {
                description: "Paid internship requires payment or invalid request",
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "404": { description: "Internship not found" },
              "409": { description: "Already enrolled" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/enrollments/my-enrollments": {
          get: {
            tags: ["Enrollments"],
            summary: "List My Enrollments (Student)",
            description:
              "Retrieve a paginated list of all active enrollments for the logged-in student, including timelines.",
            operationId: "listMyEnrollments",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "My enrollments retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/EnrollmentPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/job-opportunities": {
          get: {
            tags: ["Job Opportunities"],
            summary: "List Job Opportunities",
            description:
              "Retrieve a paginated list of job opportunities. Public users see only active jobs, SUPER_ADMIN sees all.",
            operationId: "listJobOpportunities",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "search",
                in: "query",
                schema: { type: "string" },
                description:
                  "Search term for company name, role title, skills or field",
              },
            ],
            responses: {
              "200": {
                description: "List of job opportunities",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/JobOpportunityPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Job Opportunities"],
            summary: "Post a New Job Opportunity (Super Admin)",
            description:
              "Create a new job opportunity. Must upload details and optional company logo as multipart/form-data.",
            operationId: "createJobOpportunity",
            security: [{ BearerAuth: [] }],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: [
                      "companyName",
                      "address",
                      "postOpportunity",
                      "jobNature",
                      "fieldOfEmployment",
                      "minQualification",
                    ],
                    properties: {
                      companyName: { type: "string" },
                      address: { type: "string" },
                      postOpportunity: { type: "string" },
                      jobNature: { type: "string" },
                      fieldOfEmployment: { type: "string" },
                      minQualification: { type: "string" },
                      skillsRequired: { type: "string" },
                      totalStaffStrength: { type: "string" },
                      website: { type: "string", format: "url" },
                      logo: {
                        type: "string",
                        format: "binary",
                        description: "Logo image file",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Job opportunity created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/JobOpportunityPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/job-opportunities/{id}": {
          get: {
            tags: ["Job Opportunities"],
            summary: "Get Job Opportunity Details",
            description: "Retrieve details of a specific job opportunity.",
            operationId: "getJobOpportunity",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Job details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/JobOpportunityPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "404": { description: "Job Opportunity not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          patch: {
            tags: ["Job Opportunities"],
            summary: "Update Job Opportunity (Super Admin)",
            description:
              "Modify details of an existing job posting (multipart/form-data).",
            operationId: "updateJobOpportunity",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      companyName: { type: "string" },
                      address: { type: "string" },
                      postOpportunity: { type: "string" },
                      jobNature: { type: "string" },
                      fieldOfEmployment: { type: "string" },
                      minQualification: { type: "string" },
                      skillsRequired: { type: "string" },
                      totalStaffStrength: { type: "string" },
                      website: { type: "string", format: "url" },
                      logo: { type: "string", format: "binary" },
                      isActive: { type: "string", enum: ["true", "false"] },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Updated job opportunity details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/JobOpportunityPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Job Opportunity not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Job Opportunities"],
            summary: "Delete Job Opportunity (Super Admin)",
            description: "Soft delete a job opportunity.",
            operationId: "deleteJobOpportunity",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Job Opportunity not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/job-opportunities/{id}/apply": {
          post: {
            tags: ["Job Applications"],
            summary: "Express Interest / Apply (Public)",
            description:
              "Submit an application/interest for a job opportunity (multipart/form-data). Requires attaching a resume.",
            operationId: "applyToJobOpportunity",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: [
                      "name",
                      "age",
                      "address",
                      "mobile",
                      "email",
                      "qualification",
                      "resume",
                    ],
                    properties: {
                      name: { type: "string" },
                      age: { type: "integer" },
                      address: { type: "string" },
                      mobile: { type: "string" },
                      email: { type: "string", format: "email" },
                      qualification: { type: "string" },
                      skills: { type: "string" },
                      resume: {
                        type: "string",
                        format: "binary",
                        description: "Resume file (PDF/DOC/DOCX, max 5MB)",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Application submitted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/JobApplicationPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "404": { description: "Job Opportunity not found or inactive" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/job-applications": {
          get: {
            tags: ["Job Applications"],
            summary: "List All Job Applications (Super Admin)",
            description:
              "Retrieve a paginated list of all job applications/expressions of interest.",
            operationId: "listJobApplications",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "jobOpportunityId",
                in: "query",
                schema: { type: "string" },
                description: "Filter by specific Job Opportunity ID",
              },
              {
                name: "search",
                in: "query",
                schema: { type: "string" },
                description: "Search term for name, email, mobile or qualification",
              },
            ],
            responses: {
              "200": {
                description: "List of job applications",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/JobApplicationPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/photos": {
          get: {
            tags: ["Media Management"],
            summary: "List Media Photos",
            description:
              "Retrieve a paginated list of photo gallery items (Public).",
            operationId: "listMediaPhotos",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "List of photos",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/MediaPhotoPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Media Management"],
            summary: "Upload Photo Item (Super Admin)",
            description: "Upload a new photo to the gallery (multipart/form-data).",
            operationId: "createMediaPhoto",
            security: [{ BearerAuth: [] }],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: ["title", "date", "description", "photo"],
                    properties: {
                      title: { type: "string" },
                      date: { type: "string" },
                      description: { type: "string" },
                      photo: {
                        type: "string",
                        format: "binary",
                        description: "Photo image file (max 5MB)",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Photo created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/MediaPhotoPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/photos/{id}": {
          patch: {
            tags: ["Media Management"],
            summary: "Update Photo Item (Super Admin)",
            description: "Modify details or replace image of a photo item.",
            operationId: "updateMediaPhoto",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      date: { type: "string" },
                      description: { type: "string" },
                      photo: { type: "string", format: "binary" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Updated photo details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/MediaPhotoPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Photo not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Media Management"],
            summary: "Delete Photo Item (Super Admin)",
            description: "Soft delete a photo from the gallery.",
            operationId: "deleteMediaPhoto",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Photo not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/videos": {
          get: {
            tags: ["Media Management"],
            summary: "List Media Videos",
            description: "Retrieve a paginated list of video items (Public).",
            operationId: "listMediaVideos",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "List of videos",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/MediaVideoPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Media Management"],
            summary: "Add Video Item (Super Admin)",
            description: "Create a new YouTube video entry (JSON).",
            operationId: "createMediaVideo",
            security: [{ BearerAuth: [] }],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["youtubeId", "title", "date", "description"],
                    properties: {
                      youtubeId: { type: "string", example: "dQw4w9WgXcQ" },
                      title: { type: "string" },
                      date: { type: "string" },
                      description: { type: "string" },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Video added successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/MediaVideoPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/videos/{id}": {
          patch: {
            tags: ["Media Management"],
            summary: "Update Video Item (Super Admin)",
            description: "Modify details of a video item.",
            operationId: "updateMediaVideo",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      youtubeId: { type: "string" },
                      title: { type: "string" },
                      date: { type: "string" },
                      description: { type: "string" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Updated video details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/MediaVideoPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Video not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Media Management"],
            summary: "Delete Video Item (Super Admin)",
            description: "Soft delete a video item.",
            operationId: "deleteMediaVideo",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Video not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/newspapers": {
          get: {
            tags: ["Media Management"],
            summary: "List Media Newspapers",
            description:
              "Retrieve a paginated list of newspaper clipping items (Public).",
            operationId: "listMediaNewspapers",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "List of newspaper items",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/MediaNewspaperPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Media Management"],
            summary: "Add Newspaper Item (Super Admin)",
            description: "Upload a newspaper clipping (multipart/form-data).",
            operationId: "createMediaNewspaper",
            security: [{ BearerAuth: [] }],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: [
                      "title",
                      "publication",
                      "date",
                      "description",
                      "image",
                    ],
                    properties: {
                      title: { type: "string" },
                      publication: { type: "string" },
                      date: { type: "string" },
                      description: { type: "string" },
                      image: {
                        type: "string",
                        format: "binary",
                        description: "Newspaper clipping image (max 5MB)",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Newspaper item created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/MediaNewspaperPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/newspapers/{id}": {
          patch: {
            tags: ["Media Management"],
            summary: "Update Newspaper Item (Super Admin)",
            description:
              "Modify details or replace image of a newspaper clipping item.",
            operationId: "updateMediaNewspaper",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      publication: { type: "string" },
                      date: { type: "string" },
                      description: { type: "string" },
                      image: { type: "string", format: "binary" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Updated newspaper details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/MediaNewspaperPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Newspaper item not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Media Management"],
            summary: "Delete Newspaper Item (Super Admin)",
            description: "Soft delete a newspaper item.",
            operationId: "deleteMediaNewspaper",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Newspaper item not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/online-links": {
          get: {
            tags: ["Media Management"],
            summary: "List Media Online Links",
            description:
              "Retrieve a paginated list of external news links (Public).",
            operationId: "listMediaOnlineLinks",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "List of online links",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/MediaOnlineLinkPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Media Management"],
            summary: "Add Online Link Item (Super Admin)",
            description: "Create a new external media link (JSON).",
            operationId: "createMediaOnlineLink",
            security: [{ BearerAuth: [] }],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["slNo", "date", "headline", "agency", "link"],
                    properties: {
                      slNo: { type: "string", example: "01" },
                      date: { type: "string" },
                      headline: { type: "string" },
                      agency: { type: "string" },
                      link: {
                        type: "string",
                        format: "uri",
                        example: "https://example.com",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Online link created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/MediaOnlineLinkPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/media/online-links/{id}": {
          patch: {
            tags: ["Media Management"],
            summary: "Update Online Link Item (Super Admin)",
            description: "Modify details of an online link item.",
            operationId: "updateMediaOnlineLink",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      slNo: { type: "string" },
                      date: { type: "string" },
                      headline: { type: "string" },
                      agency: { type: "string" },
                      link: { type: "string", format: "uri" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Updated online link details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/MediaOnlineLinkPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Online link not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Media Management"],
            summary: "Delete Online Link Item (Super Admin)",
            description: "Soft delete an online link item.",
            operationId: "deleteMediaOnlineLink",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Online link not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/blogs": {
          get: {
            tags: ["Blogs"],
            summary: "List Blog Posts",
            description:
              "Retrieve a paginated list of blog posts / success stories (Public).",
            operationId: "listBlogs",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              { name: "category", in: "query", schema: { type: "string" } },
              { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
              "200": {
                description: "List of blogs",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/BlogPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Blogs"],
            summary: "Create Blog Post (Super Admin)",
            description:
              "Create a new blog post / success story with rich content and banner image (multipart/form-data).",
            operationId: "createBlog",
            security: [{ BearerAuth: [] }],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    required: [
                      "title",
                      "content",
                      "category",
                      "date",
                      "authorName",
                    ],
                    properties: {
                      title: { type: "string" },
                      content: {
                        type: "string",
                        description: "Rich HTML text content",
                      },
                      category: { type: "string" },
                      serialNo: { type: "string" },
                      date: { type: "string" },
                      location: { type: "string" },
                      authorName: { type: "string" },
                      authorRole: { type: "string" },
                      authorEmail: { type: "string" },
                      image: {
                        type: "string",
                        format: "binary",
                        description: "Header/banner image (max 5MB)",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Blog post created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/BlogPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/blogs/{id}": {
          get: {
            tags: ["Blogs"],
            summary: "Get Blog Post Details",
            description: "Retrieve details of a single blog post (Public).",
            operationId: "getBlog",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Blog post details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/BlogPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "404": { description: "Blog post not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          patch: {
            tags: ["Blogs"],
            summary: "Update Blog Post (Super Admin)",
            description:
              "Update metadata or content of an existing blog post (multipart/form-data).",
            operationId: "updateBlog",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      content: { type: "string" },
                      category: { type: "string" },
                      serialNo: { type: "string" },
                      date: { type: "string" },
                      location: { type: "string" },
                      authorName: { type: "string" },
                      authorRole: { type: "string" },
                      authorEmail: { type: "string" },
                      image: { type: "string", format: "binary" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Updated blog post details",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/BlogPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Blog post not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Blogs"],
            summary: "Delete Blog Post (Super Admin)",
            description: "Soft delete a blog post.",
            operationId: "deleteBlog",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Blog post deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Blog post not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/reviews/my-reviews": {
          get: {
            tags: ["Reviews"],
            summary: "List Authenticated User Reviews",
            description:
              "Retrieve all reviews (pending and approved) submitted by the logged-in user.",
            operationId: "listMyReviews",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of user reviews",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/ReviewPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/reviews": {
          get: {
            tags: ["Reviews"],
            summary: "List Approved Reviews",
            description:
              "Retrieve a paginated list of all approved reviews/testimonials (Public).",
            operationId: "listApprovedReviews",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "List of approved reviews",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/ReviewPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Reviews"],
            summary: "Submit a Review (Public)",
            description:
              "Submit a new review/testimonial. Reviews are pending moderation by default (Public).",
            operationId: "createReview",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["name", "email", "rating", "comment"],
                    properties: {
                      name: { type: "string", example: "Jane Doe" },
                      email: {
                        type: "string",
                        format: "email",
                        example: "jane@example.com",
                      },
                      role: { type: "string", example: "Student" },
                      rating: {
                        type: "integer",
                        minimum: 1,
                        maximum: 5,
                        example: 5,
                      },
                      comment: {
                        type: "string",
                        example: "Great learning platform!",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Review submitted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/ReviewPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/reviews/pending": {
          get: {
            tags: ["Reviews"],
            summary: "List Pending Reviews (Super Admin)",
            description:
              "Retrieve a paginated list of pending (unapproved) reviews for moderation.",
            operationId: "listPendingReviews",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
            ],
            responses: {
              "200": {
                description: "List of pending reviews",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/ReviewPublic" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/reviews/{id}/approve": {
          patch: {
            tags: ["Reviews"],
            summary: "Approve Review (Super Admin)",
            description:
              "Approve a review to make it visible on the public website.",
            operationId: "approveReview",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Review approved successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/ReviewPublic" },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Review not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/reviews/{id}": {
          delete: {
            tags: ["Reviews"],
            summary: "Delete Review (Super Admin)",
            description: "Soft delete or reject a review/testimonial.",
            operationId: "deleteReview",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Review deleted successfully",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiSuccess" },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "404": { description: "Review not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/donations/create-order": {
          post: {
            tags: ["Donations"],
            summary: "Create Donation Order",
            description:
              "Initialize a donation payment and return a Razorpay Order ID.",
            operationId: "createDonationOrder",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateDonationOrderRequest",
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Donation order created successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                donationId: { type: "string" },
                                razorpayOrderId: { type: "string" },
                                amount: { type: "number" },
                                keyId: { type: "string" },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/donations/verify": {
          post: {
            tags: ["Donations"],
            summary: "Verify Donation Signature",
            description:
              "Verify Razorpay signature and generate 80G tax exemption certificate.",
            operationId: "verifyDonation",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/VerifyDonationRequest" },
                },
              },
            },
            responses: {
              "200": {
                description: "Payment verified and receipt generated",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                donationId: { type: "string" },
                                amount: { type: "number" },
                                donorName: { type: "string" },
                                status: { type: "string", example: "COMPLETED" },
                                receiptUrl: { type: "string", nullable: true },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Invalid signature / processed status" },
              "404": { description: "Donation record not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/donations": {
          get: {
            tags: ["Donations"],
            summary: "List Completed Donations (Transparency Board)",
            description:
              "Retrieve a paginated, searchable list of completed donations.",
            operationId: "listPublicDonations",
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
              "200": {
                description: "List of completed donations",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/DonationPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/donations/admin": {
          get: {
            tags: ["Donations"],
            summary: "List All Donations (Super Admin)",
            description:
              "Retrieve all donations (including pending/failed) with full details.",
            operationId: "listAdminDonations",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
              "200": {
                description: "List of all donations",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/DonationAdmin" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Access denied" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },

            "/api/v1/student/register": {
          post: {
            tags: ["Student Registration"],
            summary: "Submit Student Registration",
            description:
              "Authenticated student submits their complete registration profile. Returns a system-generated Student ID. One registration per student account.",
            operationId: "createStudentRegistration",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/StudentRegistrationCreate",
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Registration submitted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/StudentRegistrationPublic",
                            },
                            message: {
                              type: "string",
                              example:
                                "Registration successful. Your Student ID is S2026AK45901.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only STUDENT role allowed" },
              "409": {
                description: "Student already registered",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ApiError" },
                    example: {
                      success: false,
                      error: {
                        code: "ALREADY_REGISTERED",
                        message: "You have already submitted a registration.",
                      },
                    },
                  },
                },
              },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/student/register/me": {
          get: {
            tags: ["Student Registration"],
            summary: "Get My Registration",
            description:
              "Returns the authenticated student's own registration profile, including academic records.",
            operationId: "getMyStudentRegistration",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "Registration profile retrieved",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/StudentRegistrationFull",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only STUDENT role allowed" },
              "404": { description: "No registration found for this account" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/student/register/admin": {
          get: {
            tags: ["Student Registration"],
            summary: "List All Registrations (Super Admin)",
            description:
              "Paginated list of all non-deleted student registrations. Base64 image fields are excluded for performance.",
            operationId: "listStudentRegistrationsAdmin",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
                description: "Page number",
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
                description: "Items per page (max 100)",
              },
              {
                name: "gender",
                in: "query",
                schema: { type: "string", enum: ["Male", "Female", "Transgender"] },
                description: "Filter by gender",
              },
              {
                name: "category",
                in: "query",
                schema: { type: "string" },
                description: "Filter by category (case-insensitive)",
              },
              {
                name: "goal",
                in: "query",
                schema: {
                  type: "string",
                  enum: [
                    "Job",
                    "Freelancing",
                    "Higher Studies",
                    "Startup",
                    "Skill Enhancement",
                    "Other",
                  ],
                },
                description: "Filter by internship goal",
              },
              {
                name: "search",
                in: "query",
                schema: { type: "string" },
                description: "Search by fullName, studentId, or mobileNo",
              },
            ],
            responses: {
              "200": {
                description: "Paginated list of student registrations",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/StudentRegistrationPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/student/register/{id}": {
          get: {
            tags: ["Student Registration"],
            summary: "Get Registration by ID (Super Admin)",
            description:
              "Returns the full registration record including Base64 photo and signature for admin review.",
            operationId: "getStudentRegistrationById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Registration record ID (cuid)",
              },
            ],
            responses: {
              "200": {
                description: "Full registration record",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/StudentRegistrationFull",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Registration not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          patch: {
            tags: ["Student Registration"],
            summary: "Update Registration (Super Admin)",
            description:
              "Partially update a student registration. Academic records are replaced when provided. Image fields cannot be updated via PATCH.",
            operationId: "updateStudentRegistration",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Registration record ID (cuid)",
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    description:
                      "Any subset of StudentRegistrationCreate fields (excluding image and agreeTerms)",
                    properties: {
                      fullName: { type: "string", example: "Amit Kumar Updated" },
                      fatherName: { type: "string", example: "Rajesh Kumar" },
                      motherName: { type: "string", example: "Sunita Devi" },
                      dob: { type: "string", example: "2002-08-15" },
                      gender: {
                        type: "string",
                        enum: ["Male", "Female", "Transgender"],
                      },
                      category: { type: "string", example: "OBC" },
                      mobileNo: { type: "string", example: "9472351693" },
                      aadharNo: { type: "string", example: "123456789012" },
                      internshipGoal: {
                        type: "string",
                        enum: [
                          "Job",
                          "Freelancing",
                          "Higher Studies",
                          "Startup",
                          "Skill Enhancement",
                          "Other",
                        ],
                      },
                      localAddress: { $ref: "#/components/schemas/AddressObject" },
                      sameAsLocal: { type: "boolean" },
                      permanentAddress: {
                        $ref: "#/components/schemas/AddressObject",
                      },
                      academics: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/AcademicDetailObject",
                        },
                        description: "If provided, replaces all existing academics",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Registration updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/StudentRegistrationPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Registration not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Student Registration"],
            summary: "Delete Registration (Super Admin)",
            description:
              "Soft-deletes the registration by setting deletedAt. The record is preserved in the database.",
            operationId: "deleteStudentRegistration",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Registration record ID (cuid)",
              },
            ],
            responses: {
              "200": {
                description: "Registration deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { nullable: true, example: null },
                            message: {
                              type: "string",
                              example: "Registration deleted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Registration not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
            "/api/v1/instructor/register": {
          post: {
            tags: ["Instructor Registration"],
            summary: "Submit Instructor Registration",
            description:
              "Submit detailed instructor profile with documents. One registration per instructor account.",
            operationId: "createInstructorRegistration",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/InstructorRegistrationCreate",
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Registration submitted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/InstructorRegistrationPublic",
                            },
                            message: {
                              type: "string",
                              example:
                                "Registration submitted successfully. Your Instructor ID is I2026RK54321.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only INSTRUCTOR role allowed" },
              "409": { description: "Instructor already registered" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/instructor/register/me": {
          get: {
            tags: ["Instructor Registration"],
            summary: "Get My Registration",
            description:
              "Returns the authenticated instructor's own registration profile.",
            operationId: "getMyInstructorRegistration",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "Registration profile retrieved",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/InstructorRegistrationFull",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only INSTRUCTOR role allowed" },
              "404": { description: "No registration found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/instructor/register/admin": {
          get: {
            tags: ["Instructor Registration"],
            summary: "List All Registrations (Super Admin)",
            description: "Paginated list of all instructor registrations.",
            operationId: "listInstructorRegistrationsAdmin",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "gender",
                in: "query",
                schema: { type: "string", enum: ["Male", "Female", "Transgender"] },
              },
              {
                name: "search",
                in: "query",
                schema: { type: "string" },
                description: "Search by name, ID, mobile, or organization",
              },
            ],
            responses: {
              "200": {
                description: "Paginated list of instructor registrations",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/InstructorRegistrationPublic",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/instructor/register/{id}": {
          get: {
            tags: ["Instructor Registration"],
            summary: "Get Instructor Registration by ID (Super Admin)",
            description: "Returns the full instructor registration record.",
            operationId: "getInstructorRegistrationById",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Full registration record",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/InstructorRegistrationFull",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Registration not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          patch: {
            tags: ["Instructor Registration"],
            summary: "Update Instructor Registration (Super Admin)",
            description:
              "Partially update metadata fields. Qualifications list is replaced if provided.",
            operationId: "updateInstructorRegistration",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      fullName: { type: "string", example: "Rajan Kumar Updated" },
                      fatherSpouseName: { type: "string", example: "Suresh Kumar" },
                      dob: { type: "string", example: "1994-08-15" },
                      gender: {
                        type: "string",
                        enum: ["Male", "Female", "Transgender"],
                      },
                      mobileNo: { type: "string", example: "9472351693" },
                      alternateMobileNo: { type: "string", example: "9123456789" },
                      currentOrganization: {
                        type: "string",
                        example: "Aegis Tech Labs",
                      },
                      currentDesignation: {
                        type: "string",
                        example: "Lead AI Scientist",
                      },
                      totalWorkExperience: { type: "string", example: "8 Years" },
                      teachingExperience: { type: "string", example: "3 Years" },
                      internshipExperience: { type: "string", example: "2 Years" },
                      mentorshipAreas: {
                        type: "string",
                        example: "Supervising Deep Learning",
                      },
                      preferredInternLevel: {
                        type: "array",
                        items: { type: "string" },
                      },
                      maxInterns: { type: "string", example: "5" },
                      mentorshipMode: { type: "array", items: { type: "string" } },
                      availability: {
                        type: "string",
                        example: "Saturdays 10:00 AM - 2:00 PM",
                      },
                      selfIntroduction: {
                        type: "string",
                        example: "AI Scientist with industry experience",
                      },
                      currentAddress: {
                        $ref: "#/components/schemas/AddressObject",
                      },
                      sameAsCurrentAddress: { type: "boolean" },
                      permanentAddress: {
                        $ref: "#/components/schemas/AddressObject",
                      },
                      qualifications: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/InstructorQualificationObject",
                        },
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Registration updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/InstructorRegistrationPublic",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Registration not found" },
              "422": { $ref: "#/components/responses/ValidationError" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Instructor Registration"],
            summary: "Delete Instructor Registration (Super Admin)",
            description: "Soft-deletes the instructor registration.",
            operationId: "deleteInstructorRegistration",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Registration deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { nullable: true, example: null },
                            message: {
                              type: "string",
                              example: "Registration deleted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Registration not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/feedback": {
          post: {
            tags: ["Feedback Management"],
            summary: "Submit Feedback (Student <-> Instructor)",
            description:
              "Allows a student to submit feedback for their instructor or an instructor to submit feedback for their student regarding a specific enrollment.",
            operationId: "submitFeedback",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["enrollmentId", "rating", "comments"],
                    properties: {
                      enrollmentId: {
                        type: "string",
                        example: "clxxxxxxxxxxxxxxxx",
                      },
                      rating: {
                        type: "integer",
                        minimum: 1,
                        maximum: 5,
                        example: 5,
                      },
                      comments: {
                        type: "string",
                        example: "Outstanding commitment to learning.",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Feedback submitted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/FeedbackObject" },
                            message: {
                              type: "string",
                              example: "Feedback submitted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Bad request / validation failed" },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — user not belongs to enrollment" },
              "409": { description: "Conflict — feedback already submitted" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/feedback/my-feedbacks": {
          get: {
            tags: ["Feedback Management"],
            summary: "Get My Feedbacks (Sent and Received)",
            description:
              "Retrieves all feedbacks sent and received by the currently logged-in user.",
            operationId: "getMyFeedbacks",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of sent and received feedbacks",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "object",
                              properties: {
                                sent: {
                                  type: "array",
                                  items: {
                                    $ref: "#/components/schemas/FeedbackObject",
                                  },
                                },
                                received: {
                                  type: "array",
                                  items: {
                                    $ref: "#/components/schemas/FeedbackObject",
                                  },
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/feedback/enrollment/{enrollmentId}": {
          get: {
            tags: ["Feedback Management"],
            summary: "Get Feedback for Specific Enrollment",
            description:
              "Retrieves feedback details associated with a specific enrollment. Accessible by the Student, Instructor, or Super Admin.",
            operationId: "getEnrollmentFeedback",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "enrollmentId",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Feedbacks for enrollment",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/FeedbackObject",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — Access denied" },
              "404": { description: "Enrollment not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/tickets": {
          post: {
            tags: ["Support Ticket Management"],
            summary: "Raise Support Ticket",
            description:
              "Allows an authenticated user to raise a new support ticket.",
            operationId: "raiseTicket",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["title", "description"],
                    properties: {
                      title: { type: "string", example: "Payment issue" },
                      description: {
                        type: "string",
                        example:
                          "Razorpay payment went through but dashboard is still unpaid.",
                      },
                      priority: {
                        type: "string",
                        enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                        default: "MEDIUM",
                        example: "HIGH",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Ticket raised successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/SupportTicketObject",
                            },
                            message: {
                              type: "string",
                              example: "Support ticket raised successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Bad request / validation failed" },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/tickets/my-tickets": {
          get: {
            tags: ["Support Ticket Management"],
            summary: "Get My Tickets",
            description:
              "Retrieves all active support tickets raised by the currently logged-in user.",
            operationId: "getMyTickets",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of user tickets",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/SupportTicketObject",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/tickets/admin": {
          get: {
            tags: ["Support Ticket Management"],
            summary: "Search Tickets (Admin)",
            description:
              "Retrieves support tickets with pagination, status, and search filters. Restricted to Super Admins.",
            operationId: "searchTicketsAdmin",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1 },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 20 },
              },
              {
                name: "status",
                in: "query",
                schema: {
                  type: "string",
                  enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
                },
              },
              { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
              "200": {
                description: "Paginated tickets list",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/SupportTicketObject",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/tickets/{id}": {
          patch: {
            tags: ["Support Ticket Management"],
            summary: "Update Ticket (Admin)",
            description:
              "Updates a support ticket status or priority. Restricted to Super Admins.",
            operationId: "updateTicketAdmin",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["status"],
                    properties: {
                      status: {
                        type: "string",
                        enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
                      },
                      priority: {
                        type: "string",
                        enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Ticket updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/SupportTicketObject",
                            },
                            message: {
                              type: "string",
                              example: "Ticket updated successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — only SUPER_ADMIN role allowed" },
              "404": { description: "Ticket not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          delete: {
            tags: ["Support Ticket Management"],
            summary: "Soft Delete Support Ticket",
            description:
              "Deletes a support ticket. Restricted to the ticket creator or Super Admins.",
            operationId: "deleteTicket",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": {
                description: "Ticket deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { nullable: true, example: null },
                            message: {
                              type: "string",
                              example: "Ticket deleted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — Access denied" },
              "404": { description: "Ticket not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/notices": {
          get: {
            tags: ["Announcement & Notice Management"],
            summary: "Get Notices/Announcements",
            description:
              "Retrieves notices targeting the logged-in user role or specific user ID.",
            operationId: "getNotices",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of notices",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: { $ref: "#/components/schemas/NoticeObject" },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Announcement & Notice Management"],
            summary: "Post Announcement/Notice",
            description:
              "Allows Super Admins or Instructors to post notices targetting specific roles or users.",
            operationId: "postNotice",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["title", "content"],
                    properties: {
                      title: {
                        type: "string",
                        example: "Upcoming Project Submission Deadline",
                      },
                      content: {
                        type: "string",
                        example: "Please submit your backend portals by Friday.",
                      },
                      targetRole: {
                        type: "string",
                        enum: ["STUDENT", "INSTRUCTOR"],
                        example: "STUDENT",
                      },
                      receiverId: { type: "string", example: "clxxxxxxxxxxxxxxxx" },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Notice posted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: { $ref: "#/components/schemas/NoticeObject" },
                            message: {
                              type: "string",
                              example: "Notice posted successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Bad request" },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/instructor/immersions": {
          get: {
            tags: ["Immersion Program Management"],
            summary: "Get Assigned Immersions (Instructor)",
            description:
              "Lists all immersion programs assigned to the logged-in instructor.",
            operationId: "getAssignedImmersions",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of assigned immersions",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/ImmersionObject",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden — Instructor privileges required" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/instructor/submissions": {
          get: {
            tags: ["Project Submission & Evaluation"],
            summary: "List Intern Submissions (Instructor)",
            description:
              "Lists all project submissions uploaded by interns enrolled under the instructor.",
            operationId: "getInternSubmissions",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of submissions",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/ProjectSubmissionObject",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
          post: {
            tags: ["Project Submission & Evaluation"],
            summary: "Submit Internship Project (Student)",
            description:
              "Allows an enrolled student to submit their internship project url/files for grading.",
            operationId: "submitProjectStudent",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["enrollmentId", "projectTitle", "projectUrl"],
                    properties: {
                      enrollmentId: {
                        type: "string",
                        example: "clxxxxxxxxxxxxxxxx",
                      },
                      projectTitle: {
                        type: "string",
                        example: "Next.js E-Commerce Integration",
                      },
                      projectUrl: {
                        type: "string",
                        example: "https://github.com/student/e-comm",
                      },
                      comments: {
                        type: "string",
                        example: "Configured dashboard routes and state.",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Project submitted successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/ProjectSubmissionObject",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Bad request" },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
        "/api/v1/instructor/submissions/{id}/grade": {
          post: {
            tags: ["Project Submission & Evaluation"],
            summary: "Grade Project Submission (Instructor)",
            description:
              "Allows the assigned instructor to grade and add feedback for an intern's project submission.",
            operationId: "gradeProjectSubmission",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["grade", "feedback"],
                    properties: {
                      grade: { type: "string", example: "A+" },
                      feedback: {
                        type: "string",
                        example:
                          "Excellent architecture and clean component layouts.",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Graded successfully",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              $ref: "#/components/schemas/ProjectSubmissionObject",
                            },
                            message: {
                              type: "string",
                              example: "Submission graded successfully.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "400": { description: "Bad request" },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "403": { description: "Forbidden" },
              "404": { description: "Submission not found" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
            "/api/v1/immersion/certificates/my": {
          get: {
            tags: ["Immersion Program Management"],
            summary: "Get My Issued Immersion Certificates",
            description: "Lists all issued certificates for approved immersions.",
            operationId: "getMyImmersionCertificates",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "List of certificates",
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/ApiSuccess" },
                        {
                          type: "object",
                          properties: {
                            data: {
                              type: "array",
                              items: {
                                $ref: "#/components/schemas/ImmersionCertificateObject",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              "401": { $ref: "#/components/responses/Unauthorized" },
              "500": { $ref: "#/components/responses/InternalError" },
            },
          },
        },
      },
      security: [],
    };

    const openApiExtensions = {
      "/api/v1/recruit-user/register": {
        post: {
          tags: ["Recruit User Auth"],
          summary: "Register Recruit User",
          description: "Register as a recruit user to apply for job opportunities.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password", "name"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "recruit@example.com",
                    },
                    password: { type: "string", example: "Pass1234" },
                    name: { type: "string", example: "Rahul Sharma" },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Registered successfully" },
          },
        },
      },
      "/api/v1/recruit-user/login": {
        post: {
          tags: ["Recruit User Auth"],
          summary: "Login Recruit User",
          description: "Login using email or registration number.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["identifier", "password"],
                  properties: {
                    identifier: { type: "string", example: "REG-2026-0001" },
                    password: { type: "string", example: "Pass1234" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Logged in successfully" },
          },
        },
      },
      "/api/v1/recruit-user/applications": {
        get: {
          tags: ["Recruit User Auth"],
          summary: "List Recruit User Job Applications",
          description:
            "Get list of jobs applied for by the logged-in recruit user.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": { description: "List retrieved successfully" },
          },
        },
      },
      "/api/v1/recruit-user/profile": {
        get: {
          tags: ["Recruit User Auth"],
          summary: "Get Recruit User Profile",
          description: "Get logged-in recruit user profile data.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": { description: "Profile retrieved successfully" },
          },
        },
      },
      "/api/v1/recruit-user/dashboard": {
        get: {
          tags: ["Recruit User Auth"],
          summary: "Get Recruit User Dashboard",
          description:
            "Get aggregate stats count and recent job applications for recruit user.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": { description: "Dashboard metrics retrieved successfully" },
          },
        },
      },
      "/api/v1/internships/pending": {
        get: {
          tags: ["Job Opportunities"],
          summary: "List Pending Internships Awaiting Approval (Super Admin)",
          description:
            "Retrieve all internships posted by Instructors that are not yet approved/live.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Pending internships list retrieved",
            },
          },
        },
      },
      "/api/v1/internships/{id}/approve-posting": {
        patch: {
          tags: ["Job Opportunities"],
          summary: "Approve Instructor Internship Posting (Super Admin)",
          description:
            "Approve a submitted internship to make it public and active.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Internship approved and live",
            },
          },
        },
      },
      "/api/v1/instructor/dashboard": {
        get: {
          tags: ["Instructor Management"],
          summary: "Get Instructor Dashboard Summary (Instructor)",
          description:
            "Returns stats count and recent pending applications, active students, and assigned internships.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Dashboard summary retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          stats: {
                            type: "object",
                            properties: {
                              totalAssignedInternships: {
                                type: "integer",
                                example: 3,
                              },
                              totalActiveStudents: { type: "integer", example: 12 },
                              totalCompletedStudents: {
                                type: "integer",
                                example: 5,
                              },
                              pendingApplicationsCount: {
                                type: "integer",
                                example: 2,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "403": { description: "Access denied. Instructor account required." },
          },
        },
      },
      "/api/v1/student/dashboard": {
        get: {
          tags: ["Student Dashboard"],
          summary: "Get Student Dashboard Summary (Student)",
          description:
            "Returns stats count and recent applications, enrollments, and certificates.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Dashboard summary retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          stats: {
                            type: "object",
                            properties: {
                              totalApplied: { type: "integer", example: 5 },
                              totalEnrolled: { type: "integer", example: 2 },
                              totalCompleted: { type: "integer", example: 1 },
                              totalCertificates: { type: "integer", example: 1 },
                            },
                          },
                          recentApplications: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "string", example: "clxxxxxxxx" },
                                status: { type: "string", example: "UNDER_REVIEW" },
                                appliedAt: { type: "string", format: "date-time" },
                                internship: {
                                  type: "object",
                                  properties: {
                                    id: { type: "string" },
                                    title: {
                                      type: "string",
                                      example: "Web Developer Intern",
                                    },
                                    companyName: {
                                      type: "string",
                                      example: "Hilux Technology",
                                    },
                                  },
                                },
                              },
                            },
                          },
                          recentEnrollments: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "string" },
                                createdAt: { type: "string", format: "date-time" },
                                internship: {
                                  type: "object",
                                  properties: {
                                    id: { type: "string" },
                                    title: {
                                      type: "string",
                                      example: "Backend developer",
                                    },
                                    instructor: {
                                      type: "object",
                                      properties: {
                                        name: {
                                          type: "string",
                                          example: "Dr. John",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          recentCertificates: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "string" },
                                certificateNo: {
                                  type: "string",
                                  example: "CERT-2026-0001",
                                },
                                issuedAt: { type: "string", format: "date-time" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "403": { description: "Access denied. Student account required." },
          },
        },
      },
      "/api/v1/internships/{id}/apply": {
        post: {
          tags: ["Internship Applications"],
          summary: "Apply for Internship (Student)",
          description: "Creates a pending application in UNDER_REVIEW state.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "201": {
              description: "Application submitted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example:
                          "Application submitted successfully. Under review.",
                      },
                      data: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "clxxxxxxxx" },
                          status: { type: "string", example: "UNDER_REVIEW" },
                          appliedAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "409": { description: "Conflict (Already applied or enrolled)" },
          },
        },
        get: {
          tags: ["Internship Applications"],
          summary: "Check Application Status (Student)",
          description:
            "Retrieve logged-in student application status for a specific internship.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Application details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "clxxxx" },
                          status: { type: "string", example: "UNDER_REVIEW" },
                          reviewNote: { type: "string", nullable: true },
                        },
                      },
                    },
                  },
                },
              },
            },
            "404": { description: "Application not found" },
          },
        },
      },
      "/api/v1/internships/{id}/interest": {
        post: {
          tags: ["Internship Lead Interests"],
          summary: "Submit Lead Interest Form (Public)",
          description:
            "Capture interested candidate lead details for On-Campus or Virtual Internships.",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "address", "education", "mobile", "email"],
                  properties: {
                    name: { type: "string", example: "Lead Candidate" },
                    address: { type: "string", example: "123 Campus Lane" },
                    education: { type: "string", example: "Under Graduate" },
                    mobile: { type: "string", example: "9472351693" },
                    email: { type: "string", example: "lead@example.com" },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Interest request submitted successfully" },
            "422": { description: "Validation error" },
          },
        },
      },
      "/api/v1/internships/{id}/interests": {
        get: {
          tags: ["Internship Lead Interests"],
          summary: "List Lead Interests (Super Admin)",
          description:
            "Fetch all interest lead submission forms for a specific internship.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } },
          ],
          responses: {
            "200": { description: "List of submissions retrieved successfully" },
            "403": { description: "Access denied" },
          },
        },
      },
      "/api/v1/internships/{id}/applications": {
        get: {
          tags: ["Internship Applications"],
          summary: "List Applicants for Internship (Admin/Instructor)",
          description: "List all students who applied for this internship.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
            {
              name: "status",
              in: "query",
              schema: {
                type: "string",
                enum: ["UNDER_REVIEW", "APPROVED", "REJECTED"],
              },
            },
          ],
          responses: {
            "200": {
              description: "Applications list retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            status: { type: "string", example: "UNDER_REVIEW" },
                            appliedAt: { type: "string", format: "date-time" },
                            student: {
                              type: "object",
                              properties: {
                                id: { type: "string" },
                                name: { type: "string", example: "Student Name" },
                                email: {
                                  type: "string",
                                  example: "student@example.com",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "403": {
              description: "Access denied. Admin or assigned Instructor required.",
            },
          },
        },
      },
      "/api/v1/internships/{id}/applications/{appId}/approve": {
        patch: {
          tags: ["Internship Applications"],
          summary: "Approve Application (Admin/Instructor)",
          description:
            "Approves application, creates enrollment, and auto-generates ID card.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
            {
              name: "appId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    reviewNote: {
                      type: "string",
                      example: "Solid profile, approved.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Application approved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example:
                          "Application approved. Enrollment & ID Card created successfully.",
                      },
                    },
                  },
                },
              },
            },
            "403": { description: "Access denied" },
          },
        },
      },
      "/api/v1/internships/{id}/applications/{appId}/reject": {
        patch: {
          tags: ["Internship Applications"],
          summary: "Reject Application (Admin/Instructor)",
          description:
            "Rejects application. Rejection reason is required. Rolls back any active enrollment.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
            {
              name: "appId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["reviewNote"],
                  properties: {
                    reviewNote: {
                      type: "string",
                      minLength: 5,
                      example: "Qualification does not match requirements.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Application rejected successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example:
                          "Application rejected. Any active enrollment was rolled back.",
                      },
                    },
                  },
                },
              },
            },
            "422": { description: "Validation error (missing note)" },
          },
        },
      },
      "/api/v1/internships/{id}/applications/{appId}/status": {
        patch: {
          tags: ["Internship Applications"],
          summary: "Update Application Status (Admin/Instructor)",
          description:
            "Updates application status directly to APPROVED, REJECTED, or WAITING. Handles auto-enrollment/ID Card creation if approved, or rollbacks.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
            {
              name: "appId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: {
                      type: "string",
                      enum: ["UNDER_REVIEW", "APPROVED", "REJECTED", "WAITING"],
                      example: "WAITING",
                    },
                    reviewNote: {
                      type: "string",
                      example: "Added to waiting list",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Application status updated successfully" },
            "403": { description: "Access denied" },
          },
        },
      },
      "/api/v1/internships/{id}/applications/{appId}/download": {
        get: {
          tags: ["Internship Applications"],
          summary: "Download Application PDF Receipt (Student/Instructor/Admin)",
          description:
            "Generates and returns the PDF download URL path for this internship application form.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
            {
              name: "appId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "PDF download details returned successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      pdfUrl: {
                        type: "string",
                        example:
                          "/uploads/internship_apps/internship-app-clxxxx.pdf",
                      },
                    },
                  },
                },
              },
            },
            "403": { description: "Access denied" },
          },
        },
      },
      "/api/v1/internships/applications/my-applications": {
        get: {
          tags: ["Internship Applications"],
          summary: "List My Applications (Student)",
          description: "Retrieve logged-in student applications list.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "List retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            status: { type: "string", example: "UNDER_REVIEW" },
                            appliedAt: { type: "string", format: "date-time" },
                            internship: {
                              type: "object",
                              properties: {
                                title: { type: "string" },
                                companyName: { type: "string" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/enrollments/my-enrollments": {
        get: {
          tags: ["Enrollments & Certificates"],
          summary: "List My Enrollments (Student)",
          description: "Retrieve active enrollments for logged-in student.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "List retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            completedAt: {
                              type: "string",
                              format: "date-time",
                              nullable: true,
                            },
                            internship: {
                              type: "object",
                              properties: {
                                id: { type: "string" },
                                title: { type: "string" },
                                companyName: { type: "string" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/enrollments/{id}/complete": {
        patch: {
          tags: ["Enrollments & Certificates"],
          summary: "Mark Internship Completed (Admin/Instructor)",
          description: "Set completedAt timestamp for student enrollment.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Completed status updated",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example: "Enrollment marked as completed successfully.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/enrollments/{id}/issue-certificate": {
        post: {
          tags: ["Enrollments & Certificates"],
          summary: "Issue Certificate (Admin/Instructor)",
          description:
            "Generates unique certificate number (CERT-YYYY-NNNN) for completed enrollments.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "201": {
              description: "Certificate issued successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          certificateNo: {
                            type: "string",
                            example: "CERT-2026-0001",
                          },
                          issuedAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/enrollments/{id}/id-card": {
        get: {
          tags: ["ID Cards"],
          summary: "View Enrollment ID Card (Student/Instructor/Admin)",
          description: "Get ID card credentials and data for the enrollment.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "ID card details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          cardNo: { type: "string", example: "ID-2026-0001" },
                          issuedAt: { type: "string", format: "date-time" },
                          studentName: { type: "string", example: "John Doe" },
                          studentEmail: {
                            type: "string",
                            example: "john@example.com",
                          },
                          internshipTitle: {
                            type: "string",
                            example: "Web Intern",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/certificates/my-certificates": {
        get: {
          tags: ["Enrollments & Certificates"],
          summary: "List My Certificates (Student)",
          description: "Lists all certificates issued for the logged-in student.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Certificates retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            certificateNo: {
                              type: "string",
                              example: "CERT-2026-0001",
                            },
                            issuedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/certificates/{id}": {
        get: {
          tags: ["Enrollments & Certificates"],
          summary: "Publicly Verify Certificate (Public)",
          description:
            "Retrieve certificate information by Certificate ID or Certificate Number.",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Verified certificate details",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          cardNo: { type: "string", example: "CERT-2026-0001" },
                          status: { type: "string", example: "VERIFIED" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "404": { description: "Certificate not found" },
          },
        },
      },
      "/api/v1/id-cards/{id}": {
        get: {
          tags: ["ID Cards"],
          summary: "Publicly Verify ID Card (Public)",
          description:
            "Retrieve student ID Card information by Card ID or Card Number.",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Verified ID card details",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          cardNo: { type: "string", example: "ID-2026-0001" },
                          status: { type: "string", example: "VERIFIED" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "404": { description: "ID Card not found" },
          },
        },
      },
      "/api/v1/instructor/profile": {
        post: {
          tags: ["Instructor Management"],
          summary: "Create/Update Instructor Onboarding Profile (Instructor)",
          description:
            "Submit qualification, experience, specialization, and upload resume PDF.",
          security: [{ BearerAuth: [] }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["qualification", "experience", "specialization"],
                  properties: {
                    qualification: { type: "string", example: "M.Tech in CS" },
                    experience: { type: "string", example: "5 Years" },
                    specialization: {
                      type: "string",
                      example: "Full Stack Development",
                    },
                    bio: { type: "string", example: "Experienced teacher & coder" },
                    resume: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Onboarding profile saved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example:
                          "Instructor profile updated successfully. Awaiting Super Admin approval.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["Instructor Management"],
          summary: "View Logged-in Instructor Profile (Instructor)",
          description:
            "Retrieve onboarded instructor profile parameters and approval status.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Profile details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          qualification: { type: "string" },
                          isApproved: { type: "boolean", example: false },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/instructor/profiles/pending": {
        get: {
          tags: ["Instructor Management"],
          summary: "List Pending Instructor Requests (Super Admin)",
          description: "List all onboarding instructors awaiting approval.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Pending requests retrieved",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            isApproved: { type: "boolean", example: false },
                            qualification: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/instructor/profiles/{id}/approve": {
        patch: {
          tags: ["Instructor Management"],
          summary: "Approve Instructor (Super Admin)",
          description:
            "Verifies the instructor profile. Verified instructors can then be assigned to internships.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Instructor verified successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example: "Instructor profile approved successfully.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/instructor/profiles/{id}/reject": {
        patch: {
          tags: ["Instructor Management"],
          summary: "Reject Onboarding Request (Super Admin)",
          description: "Clears profile and deletes resume from server disk.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Onboarding request rejected",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: {
                        type: "string",
                        example:
                          "Instructor profile rejected and cleared successfully.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/instructor/my-internships": {
        get: {
          tags: ["Instructor Management"],
          summary: "List Assigned Internships (Instructor)",
          description: "Retrieve internships assigned to the current instructor.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Assigned internships list retrieved",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            title: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/instructor/my-students": {
        get: {
          tags: ["Instructor Management"],
          summary: "List Instructor Interns/Students (Instructor)",
          description:
            "Retrieve students enrolled in the instructor's assigned internships.",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "Enrolled students list retrieved",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            user: {
                              type: "object",
                              properties: {
                                name: { type: "string" },
                                email: { type: "string" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/payments/{id}": {
        get: {
          tags: ["Payments"],
          summary: "Get Specific Transaction Receipt (Student/Admin)",
          description: "Fetch details of a payment by ID.",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Receipt details retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          amount: { type: "number", example: 499 },
                          status: { type: "string", example: "COMPLETED" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "403": { description: "Access denied" },
          },
        },
      },
      "/api/v1/immersion-participant/register": {
        post: {
          tags: ["Immersion Participant Auth"],
          summary: "Register Immersion Participant",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string", example: "Rahul Kumar" },
                    email: {
                      type: "string",
                      format: "email",
                      example: "rahul@example.com",
                    },
                    password: { type: "string", example: "Password123" },
                  },
                },
              },
            },
          },
          responses: { "201": { description: "Registered successfully" } },
        },
      },
      "/api/v1/immersion-participant/profile": {
        get: {
          tags: ["Immersion Participant Profile"],
          summary: "Get Participant Profile",
          security: [{ BearerAuth: [] }],
          responses: { "200": { description: "Profile details" } },
        },
        patch: {
          tags: ["Immersion Participant Profile"],
          summary: "Update Participant Profile",
          security: [{ BearerAuth: [] }],
          description:
            "Accepts application/json or multipart/form-data with passportPhoto, resume, noc files.",
          responses: { "200": { description: "Profile updated" } },
        },
      },
      "/api/v1/immersion-participant/application": {
        post: {
          tags: ["Immersion Participant Application"],
          summary: "Submit 9-Section Application Form",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "academicDetails",
                    "preferredDuration",
                    "preferredStartDate",
                    "expectedLearning",
                    "languagesKnown",
                    "presenceType",
                    "fieldVisitsComfort",
                    "workType",
                    "emergencyContactName",
                    "emergencyRelationship",
                    "emergencyMobile",
                    "declarationAccepted",
                    "rulesAccepted",
                  ],
                  properties: {
                    academicDetails: { type: "array", items: { type: "object" } },
                    preferredDuration: { type: "string", example: "DAYS_30" },
                    preferredStartDate: { type: "string", format: "date-time" },
                    expectedLearning: {
                      type: "string",
                      example: "I want to learn governance.",
                    },
                    languagesKnown: { type: "string", example: "English, Hindi" },
                    presenceType: { type: "string", example: "FULL_TIME" },
                    fieldVisitsComfort: { type: "boolean", example: true },
                    workType: { type: "string", example: "STUDENT" },
                    emergencyContactName: {
                      type: "string",
                      example: "Suresh Kumar",
                    },
                    emergencyRelationship: { type: "string", example: "Father" },
                    emergencyMobile: { type: "string", example: "9472351693" },
                    declarationAccepted: { type: "boolean", example: true },
                    rulesAccepted: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Application submitted successfully" },
          },
        },
      },
      "/api/v1/immersion-participant/application/my": {
        get: {
          tags: ["Immersion Participant Application"],
          summary: "View My Application",
          security: [{ BearerAuth: [] }],
          responses: { "200": { description: "Application details" } },
        },
      },
      "/api/v1/immersion-participant/application-status": {
        get: {
          tags: ["Immersion Participant Application"],
          summary: "Get Application Status",
          security: [{ BearerAuth: [] }],
          responses: { "200": { description: "Status info" } },
        },
      },
      "/api/v1/immersion-participant/application/download": {
        get: {
          tags: ["Immersion Participant Application"],
          summary: "Download Submitted Application Form as PDF",
          security: [{ BearerAuth: [] }],
          responses: {
            "200": {
              description: "PDF file returned",
              content: {
                "application/pdf": {},
              },
            },
          },
        },
      },
      "/api/v1/immersion-participant/dashboard": {
        get: {
          tags: ["Immersion Participant Dashboard"],
          summary: "Get Dashboard Data",
          security: [{ BearerAuth: [] }],
          responses: { "200": { description: "All dashboard metrics and data" } },
        },
      },
      "/api/v1/immersion/applications": {
        get: {
          tags: ["Immersion Applications Admin"],
          summary: "List All Immersion Applications",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "status", in: "query", schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } },
          ],
          responses: { "200": { description: "List retrieved successfully" } },
        },
      },
      "/api/v1/immersion/applications/{id}": {
        get: {
          tags: ["Immersion Applications Admin"],
          summary: "View Specific Application Details",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: { "200": { description: "Application details" } },
        },
      },
      "/api/v1/immersion/applications/{id}/status": {
        patch: {
          tags: ["Immersion Applications Admin"],
          summary: "Approve / Reject Application",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: {
                      type: "string",
                      enum: ["UNDER_REVIEW", "APPROVED", "REJECTED"],
                    },
                    remarks: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Status updated" } },
        },
      },
      "/api/v1/immersion/applications/{id}/assign-mentor": {
        patch: {
          tags: ["Immersion Applications Admin"],
          summary: "Assign Instructor as Mentor",
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["mentorId"],
                  properties: {
                    mentorId: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Mentor assigned" } },
        },
      },
    };

  const fullSpec = {
    ...openApiSpec,
    paths: {
      ...openApiSpec.paths,
      ...openApiExtensions,
    },
  };

  return NextResponse.json(fullSpec, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Type": "application/json",
    },
  });
}
