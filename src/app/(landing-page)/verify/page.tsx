"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Loader2,
  MapPin,
  QrCode,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface VerificationData {
  certificateNo: string;
  status: "VERIFIED";
  type: "INTERNSHIP" | "IMMERSION";
  typeLabel: string;
  studentName: string;
  studentId: string;
  photoUrl: string | null;
  programTitle: string;
  programCode: string;
  companyName: string;
  location: string;
  mode: string;
  duration: string;
  grade: string | null;
  credits: string | null;
  issuedAt: string;
  formattedIssuedAt: string;
  issuedBy: string;
  registeredOffice: string;
  verificationPlace: string;
  institution: string;
  trust: string;
  verificationUrl: string;
  originalId: string;
}

function VerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const certParam = searchParams.get("cert") || searchParams.get("id") || "";

  const [inputCert, setInputCert] = useState(certParam);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VerificationData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!certParam.trim()) {
      setData(null);
      setError(null);
      return;
    }

    setInputCert(certParam);
    const fetchVerification = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/v1/certificates/verify?cert=${encodeURIComponent(certParam.trim())}`,
        );
        const json = await res.json();

        if (!res.ok || !json.success) {
          setError(
            json.message ||
              `Certificate "${certParam}" was not found in the official registry.`,
          );
          setData(null);
        } else {
          setData(json.data);
          setError(null);
        }
      } catch (err: any) {
        setError(
          "Network or server error while verifying certificate. Please try again.",
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [certParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCert.trim()) return;
    router.push(`/verify?cert=${encodeURIComponent(inputCert.trim())}`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Institutional Header Banner */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm">
            <ShieldCheck className="size-4 text-emerald-600" />
            Official Credential Verification Portal
          </div>
          <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            International Institute of Internship™ [i3]
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
            Autonomous Unit of DPKHRC Trust • Established for Educational & Professional Excellence
          </p>
        </div>

        {/* Search Bar / Input (Always available) */}
        <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="certificate-search-input"
                type="text"
                value={inputCert}
                onChange={(e) => setInputCert(e.target.value)}
                placeholder="Enter Certificate No (e.g. CERT-2026-0001 or IMC-2026-0002)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button
              id="verify-submit-button"
              type="submit"
              disabled={loading || !inputCert.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="size-4" />
                  Verify Now
                </>
              )}
            </button>
          </form>

          {/* Quick Examples */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Sample Identifiers:</span>
            <button
              type="button"
              onClick={() => {
                setInputCert("CERT-2026-0001");
                router.push("/verify?cert=CERT-2026-0001");
              }}
              className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition"
            >
              CERT-2026-0001
            </button>
            <button
              type="button"
              onClick={() => {
                setInputCert("IMC-2026-0002");
                router.push("/verify?cert=IMC-2026-0002");
              }}
              className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition"
            >
              IMC-2026-0002
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-emerald-50">
              <Loader2 className="size-8 animate-spin text-emerald-600" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Verifying Certificate Authenticity...
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Querying the official International Institute of Internship™ registry
            </p>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600">
                <AlertTriangle className="size-7" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                Certificate Verification Failed
              </h2>
              <p className="mt-2 max-w-md rounded-xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 sm:text-sm">
                {error}
              </p>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-600">
                Please double-check the Certificate Number printed on the physical certificate or scanned via the QR code. If you believe this is an error, contact academic administration.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setInputCert("");
                    setError(null);
                    router.push("/verify");
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                >
                  Clear & Search Again
                </button>
                <Link
                  href="/contact"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition"
                >
                  Contact Registry Support
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Verified Certificate Card */}
        {!loading && data && (
          <div
            id="verified-certificate-card"
            className="overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-white shadow-xl"
          >
            {/* Top Emerald Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#065f46] px-6 py-6 text-white sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold tracking-wide text-emerald-200 ring-1 ring-inset ring-emerald-400/30">
                    <CheckCircle2 className="size-3.5 text-emerald-300" />
                    OFFICIALLY VERIFIED CREDENTIAL
                  </div>
                  <h2 className="mt-2 font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Certificate of Completion
                  </h2>
                  <p className="mt-0.5 text-xs text-emerald-100/90">
                    {data.typeLabel} • {data.trust}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    Certificate Number
                  </span>
                  <div className="mt-0.5 inline-flex items-center gap-1.5 rounded-lg bg-black/30 px-2.5 py-1 font-mono text-sm font-bold text-amber-300 border border-amber-400/30">
                    <span>{data.certificateNo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate & Program Identity Section */}
            <div className="border-b border-slate-100 p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Photo or Avatar */}
                <div className="relative shrink-0 self-center sm:self-start">
                  <div className="relative size-28 overflow-hidden rounded-2xl border-4 border-emerald-100 bg-slate-100 shadow-md">
                    {data.photoUrl ? (
                      <Image
                        src={data.photoUrl}
                        alt={data.studentName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center bg-slate-100 text-slate-400">
                        <GraduationCap className="size-12 text-slate-400" />
                        <span className="text-[10px] font-semibold text-slate-400">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-2 ring-white">
                    <CheckCircle2 className="size-4" />
                  </div>
                </div>

                {/* Candidate Information */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    <UserCheck className="size-3.5" />
                    Verified Candidate
                  </div>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    {data.studentName}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">
                    {data.type === "IMMERSION" ? "Immersion ID" : "Student Registration ID"}:{" "}
                    <span className="font-mono text-slate-800">{data.studentId}</span>
                  </p>

                  <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Awarded For Successful Completion Of
                    </div>
                    <div className="mt-1 text-base font-bold text-emerald-950 sm:text-lg">
                      {data.programTitle}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                      <span className="font-semibold text-slate-700">
                        {data.companyName}
                      </span>
                      <span>•</span>
                      <span className="font-mono font-medium text-emerald-700">
                        ID: {data.programCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credential Specification Grid */}
            <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Calendar className="size-3.5 text-slate-400" />
                  Issue Date
                </span>
                <p className="mt-1 font-semibold text-slate-900">
                  {data.formattedIssuedAt}
                </p>
              </div>

              <div className="bg-white p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Clock className="size-3.5 text-slate-400" />
                  Duration
                </span>
                <p className="mt-1 font-semibold text-slate-900">
                  {data.duration}
                </p>
              </div>

              <div className="bg-white p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Building2 className="size-3.5 text-slate-400" />
                  Training Mode
                </span>
                <p className="mt-1 font-semibold uppercase text-slate-900">
                  {data.mode}
                </p>
              </div>

              <div className="bg-white p-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Award className="size-3.5 text-slate-400" />
                  Evaluation
                </span>
                <p className="mt-1 font-semibold text-emerald-700">
                  {data.grade ? `Grade: ${data.grade}` : "Completed with Distinction"}
                </p>
              </div>
            </div>

            {/* Official Institutional Authority & Registered Office */}
            <div className="bg-slate-50/80 p-6 sm:p-8">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <MapPin className="size-4 text-emerald-600 shrink-0" />
                      <span>Institutional Registry & Registered Office</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                      {data.registeredOffice}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Issued under the seal of {data.institution} • {data.trust}
                    </p>
                    <p className="text-[11px] font-medium text-emerald-800">
                      Place of Issuance: {data.verificationPlace}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-center sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Signatory Authority
                    </span>
                    <p className="mt-0.5 text-xs font-bold text-slate-900">
                      {data.issuedBy}
                    </p>
                    <span className="text-[10px] text-slate-500">Academic Directorate</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                  >
                    <Copy className="size-3.5 text-slate-500" />
                    {copied ? "Link Copied!" : "Copy Verification URL"}
                  </button>

                  <button
                    onClick={() => {
                      setInputCert("");
                      setData(null);
                      router.push("/verify");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                  >
                    <Search className="size-3.5 text-slate-500" />
                    Verify Another
                  </button>
                </div>

                <Link
                  href={
                    data.type === "IMMERSION"
                      ? `/api/v1/immersion/certificates/${data.certificateNo}/download`
                      : `/api/v1/certificates/${data.certificateNo}/download`
                  }
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition"
                >
                  <ExternalLink className="size-3.5" />
                  Download Certified PDF
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Informational Guidance Section if no search yet */}
        {!loading && !data && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <QrCode className="size-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                Direct QR Verification
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Simply scan the QR code printed on the top-left corner of the certificate with your smartphone camera.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                Tamper-Proof Registry
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                All records are cryptographically matched with the active institutional student registry in real time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <HelpCircle className="size-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                Employer & University Use
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Accepted globally by university registrars and corporate HR teams for employment credential checks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CertificateVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-8 animate-spin text-emerald-600" />
            <p className="text-xs font-semibold text-slate-600">
              Loading verification portal...
            </p>
          </div>
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}
