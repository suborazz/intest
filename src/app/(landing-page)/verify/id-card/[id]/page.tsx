"use client";

import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React_3, { useEffect, useState } from "react";
import * as React from "react";
import React_2 from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";

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

export default function IDCardVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVerification = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/v1/id-cards/${encodeURIComponent(id)}`);
        const json = await res.json();

        if (!res.ok || !json.success) {
          setError(json.message || "Invalid Student ID or Card not found.");
        } else {
          setData(json.data);
        }
      } catch (err: any) {
        setError(
          "Failed to query verification service. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [id]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-xl">
        {}
        <div className="h-2 w-full bg-[#10b981]" />

        {}
        <div className="flex flex-col items-center justify-center border-b border-zinc-100 bg-slate-50/30 py-6">
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold leading-none text-white">
            i3
          </div>
          <h1 className="mt-2 text-center text-xs font-bold uppercase tracking-wide text-[#022c22] sm:text-sm">
            International Institute of Internship™
          </h1>
          <p className="mt-1 text-[9px] font-medium italic leading-none text-zinc-500">
            Learn Today, Lead Tomorrow
          </p>
          <a
            href="https://www.iiinternship.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-[9px] font-bold text-emerald-600 hover:underline"
          >
            www.iiinternship.in
          </a>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-16">
            <Loader2 className="size-8 animate-spin text-emerald-600" />
            <p className="text-muted-foreground text-xs font-medium">
              Querying secure registration database...
            </p>
          </div>
        ) : error || !data ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full border border-red-200 bg-red-50">
              <AlertTriangle className="size-7 text-red-600" />
            </div>
            <h2 className="font-heading text-lg font-bold text-zinc-900">
              Verification Failed
            </h2>
            <p className="mt-2 w-full max-w-sm rounded-2xl border border-red-100/50 bg-red-50/50 px-4 py-2.5 text-sm font-medium text-red-600">
              {error || "Invalid Student ID"}
            </p>
            <p className="text-muted-foreground mt-3 max-w-sm text-xs leading-relaxed">
              We could not find any active student registration matching this
              ID/Card number. Please check the URL parameters or scanned link
              for typos.
            </p>
            <Button
              className="mt-6 rounded-2xl bg-zinc-900 px-6 text-xs text-white hover:bg-zinc-800"
              onClick={() => router.push("/")}
            >
              Go to Home Page
            </Button>
          </div>
        ) : (
          <div className="space-y-6 p-6 sm:p-8">
            {}
            <div className="flex flex-col items-center justify-center pb-2 text-center">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50">
                <ShieldCheck className="size-6 text-emerald-600" />
              </div>
              <h2 className="text-base font-extrabold uppercase tracking-wide text-emerald-950">
                {data.isInstructor
                  ? "Verified Instructor Record"
                  : "Verified Student Record"}
              </h2>
              <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                <span className="size-1.5 rounded-full bg-emerald-600" />
                {data.isInstructor ? "Active Association" : "Active Enrollment"}
              </span>
            </div>

            {}
            <div className="space-y-4">
              {}
              <div className="border-t border-zinc-100 pt-4">
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-950">
                  <User className="size-4 text-emerald-600" />
                  {data.isInstructor
                    ? "Instructor Information"
                    : "Candidate Information"}
                </h3>
                <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground text-[10px] font-semibold">
                      {data.isInstructor ? "Instructor ID" : "Student ID"}
                    </span>
                    <p className="font-semibold text-zinc-900">
                      {data.studentId}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground text-[10px] font-semibold">
                      {data.isInstructor ? "Instructor Name" : "Student Name"}
                    </span>
                    <p className="font-semibold text-zinc-900">
                      {data.studentName}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground text-[10px] font-semibold">
                      Mobile Number
                    </span>
                    <p className="font-semibold text-zinc-950">
                      {data.studentMobile}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground text-[10px] font-semibold">
                      Email ID
                    </span>
                    <p
                      className="truncate font-semibold text-zinc-900"
                      title={data.studentEmail}
                    >
                      {data.studentEmail}
                    </p>
                  </div>
                  <div className="space-y-0.5 sm:col-span-2">
                    <span className="text-muted-foreground text-[10px] font-semibold">
                      {data.isInstructor
                        ? "Instructor Address"
                        : "Student Address"}
                    </span>
                    <p className="font-medium leading-relaxed text-zinc-800">
                      {data.studentAddress}
                    </p>
                  </div>
                </div>
              </div>

              {}
              {!data.isInstructor ? (
                <div className="border-t border-zinc-100 pt-4">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-950">
                    <GraduationCap className="size-4 text-emerald-600" />
                    Internship Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Internship Track
                      </span>
                      <p className="font-semibold text-zinc-900">
                        {data.internshipTitle}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Internship ID
                      </span>
                      <div className="pt-0.5">
                        <InternshipIdChip code={data.internshipId} />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Location / Mode
                      </span>
                      <p className="font-semibold text-zinc-900">
                        {data.internshipLocation} / {data.internshipMode}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Issued Date
                      </span>
                      <p className="font-semibold text-zinc-900">
                        {new Date(data.issuedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-zinc-100 pt-4">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-950">
                    <Calendar className="size-4 text-emerald-600" />
                    Association Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Issued Date
                      </span>
                      <p className="font-semibold text-zinc-900">
                        {new Date(data.issuedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {}
            <div className="border-t border-zinc-100 pt-5 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                This ID Card is Computer Generated. Signature Not Required.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
