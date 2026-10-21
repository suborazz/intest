"use client";

import React from "react";
import {
  CheckCircle,
  Download,
  LayoutDashboard,
  Pencil,
} from "lucide-react";

export interface RecruitAcademicItem {
  qualification: string;
  subject: string;
  schoolInstitute?: string | null;
  boardUniversity?: string | null;
  startYear: number | string;
  endYear: number | string;
  passingMarks: number | string;
}

export interface RecruitExperienceItem {
  designation: string;
  employerName: string;
  natureOfWork?: string | null;
  postingLocation?: string | null;
  startDate: string;
  endDate?: string | null;
  experienceYears?: number | string;
}

export interface RecruitAddressData {
  local?: string | null;
  block?: string | null;
  district?: string | null;
  state?: string | null;
  country?: string | null;
  pinCode?: string | null;
}

export interface RecruitRegistrationFormData {
  fullName: string;
  dob: string;
  gender: string;
  mobileNo: string;
  email: string;
  maritalStatus: string;
  religion?: string | null;
  category: string;
  bloodGroup?: string | null;
  nationality?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
  localAddress?: RecruitAddressData | null;
  permanentAddress?: RecruitAddressData | null;
  academics?: RecruitAcademicItem[] | null;
  experiences?: RecruitExperienceItem[] | null;
}

export interface RegistrationPreviewProps {
  data: RecruitRegistrationFormData;
  photoPreview?: string | null;
  signaturePreview?: string | null;
  appId?: string;
  onPrint?: () => void;
  onGoToDashboard?: () => void;
}

export function formatAddress(address?: RecruitAddressData | null): string {
  if (!address) return "—";
  const line = [address.local, address.district, address.state]
    .filter(Boolean)
    .join(", ");
  const parts = [line, address.pinCode].filter(Boolean);
  return parts.length ? parts.join(" - ") : "—";
}

export function mapReligionBack(r: string): string {
  const map: Record<string, string> = {
    Sanatan_Hindu: "Sanatan/Hindu",
  };
  return map[r] ?? r;
}

export const RegistrationPreview: React.FC<RegistrationPreviewProps> = ({
  data,
  photoPreview,
  signaturePreview,
  appId,
  onPrint,
  onGoToDashboard,
}) => {
  const regIdFormatted = appId || "REG26RJK26029";
  const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(regIdFormatted)}&scale=2&rotate=N`;
  const qrCodeUrl = `https://bwipjs-api.metafloor.com/?bcid=qrcode&text=${encodeURIComponent(`https://www.iiinternship.in/verify/id-card/${regIdFormatted}`)}&scale=2`;

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else if (typeof window !== "undefined") {
      const originalTitle = document.title;
      if (regIdFormatted) {
        document.title = `Recruit_Application_${regIdFormatted}`;
      }
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      {/* Print Stylesheet to Guarantee Exact 1-Page Fit */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 5mm 8mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          header, footer, nav, aside, [role="navigation"], .site-header, .site-footer {
            display: none !important;
          }
          .no-print, .print-hidden-section {
            display: none !important;
          }
          .printable-registration-card {
            box-shadow: none !important;
            border: 1.5px solid #065f46 !important;
            border-radius: 6px !important;
            padding: 8px 12px !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      ` }} />

      {/* Screen-Only Success Congratulations Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm print:hidden">
        <div className="flex justify-center">
          <CheckCircle className="size-12 text-emerald-500 animate-in zoom-in" />
        </div>
        <h2 className="mt-2 text-xl font-extrabold text-slate-900 md:text-2xl">
          Registration Profile Completed
        </h2>
        <p className="mx-auto mt-1 max-w-xl text-xs text-slate-600 md:text-sm">
          Your job applicant registration profile is successfully recorded. Review your official registration form below and keep a copy for verification.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition"
          >
            <Download className="size-4" /> Download PDF Form
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/recruit/registration?edit=true";
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <Pencil className="size-3.5" /> Edit Details
          </button>
          <button
            type="button"
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <LayoutDashboard className="size-3.5" /> Go to Dashboard
          </button>
        </div>
      </div>

      {/* Official Printable Registration Form Card */}
      <div
        id="recruit-registration-print-card"
        className="printable-registration-card mx-auto max-w-4xl rounded-2xl border-2 border-slate-300 bg-white p-6 text-left font-sans text-slate-900 shadow-md print:p-2.5 print:border-emerald-800"
      >
        {/* Header: Institutional Branding, Title & Barcode */}
        <div className="border-b-2 border-emerald-800 pb-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Institute Logo & Name */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="i3 Logo"
                className="h-12 w-auto object-contain print:h-10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div>
                <h1 className="font-serif text-lg font-bold tracking-tight text-emerald-950 sm:text-xl print:text-base">
                  International Institute of Internship™ [i3]
                </h1>
                <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider print:text-[9px]">
                  Autonomous Unit of DPKHRC Trust • Regd. Office: Thekma, Azamgarh, UP (India)
                </p>
                <div className="inline-block mt-0.5 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-200">
                  JOB APPLICANT PROFILE REGISTRATION FORM
                </div>
              </div>
            </div>

            {/* Right: Barcode + QR Code + Reg ID */}
            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <img
                    src={barcodeUrl}
                    alt="Applicant Barcode"
                    className="h-8 w-36 object-contain bg-white print:h-7 print:w-32"
                  />
                  <span className="font-mono text-[9px] font-bold tracking-wider text-slate-800 print:text-[8px]">
                    ID: {regIdFormatted}
                  </span>
                </div>
                <img
                  src={qrCodeUrl}
                  alt="Verify QR"
                  className="size-10 object-contain border border-slate-200 bg-white p-0.5 print:size-8"
                />
              </div>
              <span className="mt-0.5 text-[9px] text-slate-500 font-medium">
                Date: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Main Registration Form Content */}
        <div className="space-y-3.5 pt-3 print:space-y-2 print:pt-2">

          {/* 1. Basic Information + Photo Grid */}
          <div>
            <div className="flex items-center gap-1.5 border-b border-emerald-700/40 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-900 print:text-[10px]">
              <span>1. Basic Personal Information</span>
            </div>

            <div className="mt-2 grid grid-cols-12 gap-3 items-start print:mt-1 print:gap-2">
              {/* Left 10 Columns: Personal Details 2-Column Key-Value Grid */}
              <div className="col-span-12 sm:col-span-9 lg:col-span-10 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs print:text-[9.5px] print:gap-y-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Full Name:</span>
                  <span className="font-bold text-slate-900">{data.fullName || "—"}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Mobile No:</span>
                  <span className="font-mono font-bold text-slate-900">{data.mobileNo || "—"}</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Date of Birth:</span>
                  <span className="font-semibold text-slate-900">{data.dob || "—"}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Email ID:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[190px]">{data.email || "—"}</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Gender:</span>
                  <span className="font-semibold text-slate-900">{data.gender || "—"}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Marital Status:</span>
                  <span className="font-semibold text-slate-900">{data.maritalStatus || "—"}</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Category:</span>
                  <span className="font-semibold text-slate-900">{data.category || "—"}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Religion:</span>
                  <span className="font-semibold text-slate-900">{mapReligionBack(data.religion || "—")}</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Blood Group:</span>
                  <span className="font-bold text-emerald-800">{data.bloodGroup || "—"}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="w-24 text-slate-500 font-medium shrink-0">Nationality:</span>
                  <span className="font-semibold text-slate-900">{data.nationality || "Indian"}</span>
                </div>

                {data.fatherName && (
                  <div className="flex items-baseline gap-1.5">
                    <span className="w-24 text-slate-500 font-medium shrink-0">Father's Name:</span>
                    <span className="font-semibold text-slate-900">{data.fatherName}</span>
                  </div>
                )}
                {data.motherName && (
                  <div className="flex items-baseline gap-1.5">
                    <span className="w-24 text-slate-500 font-medium shrink-0">Mother's Name:</span>
                    <span className="font-semibold text-slate-900">{data.motherName}</span>
                  </div>
                )}
              </div>

              {/* Right 2-3 Columns: Passport Photo */}
              <div className="col-span-12 sm:col-span-3 lg:col-span-2 flex flex-col items-center justify-center">
                <div className="relative size-24 overflow-hidden rounded-lg border-2 border-slate-300 bg-slate-50 p-0.5 shadow-sm print:size-20">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Applicant Passport Photo"
                      className="size-full rounded object-cover"
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center text-slate-400">
                      <span className="text-[9px] font-semibold text-center">Photo<br/>Unavailable</span>
                    </div>
                  )}
                </div>
                <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-slate-500">
                  Passport Photo
                </span>
              </div>
            </div>
          </div>

          {/* 2. Address Details: 2-Column Side-by-Side Cards */}
          <div>
            <div className="flex items-center gap-1.5 border-b border-emerald-700/40 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-900 print:text-[10px]">
              <span>2. Residential Address Details</span>
            </div>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 print:mt-1 print:gap-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2 text-xs print:p-1.5 print:text-[9.5px]">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[9px] block text-emerald-800">
                  Current / Local Address
                </span>
                <p className="mt-0.5 font-medium text-slate-800 leading-relaxed">
                  {formatAddress(data.localAddress)}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2 text-xs print:p-1.5 print:text-[9.5px]">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[9px] block text-emerald-800">
                  Permanent Address
                </span>
                <p className="mt-0.5 font-medium text-slate-800 leading-relaxed">
                  {formatAddress(data.permanentAddress)}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Educational Qualifications: Formatted in Columns Table! */}
          <div>
            <div className="flex items-center justify-between border-b border-emerald-700/40 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-900 print:text-[10px]">
              <span>3. Educational Qualifications</span>
              <span className="text-[9px] font-semibold text-slate-500 lowercase">
                ({(data.academics ?? []).length} records)
              </span>
            </div>

            <div className="mt-2 overflow-hidden rounded-lg border border-slate-300 print:mt-1">
              <table className="w-full text-left text-xs border-collapse print:text-[9px]">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="py-1.5 px-2 border-r border-slate-200 w-8 text-center print:py-1">#</th>
                    <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Qualification / Level</th>
                    <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Subject / Stream</th>
                    <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">School / Institute</th>
                    <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Board / University</th>
                    <th className="py-1.5 px-2 border-r border-slate-200 text-center w-24 print:py-1">Session</th>
                    <th className="py-1.5 px-2 text-right w-20 print:py-1">Marks / %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(data.academics && data.academics.length > 0) ? (
                    data.academics.map((ac, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                        <td className="py-1 px-2 border-r border-slate-200 font-mono text-center text-slate-500 print:py-0.5">
                          {idx + 1}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 font-bold text-slate-900 print:py-0.5">
                          {ac.qualification}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 text-slate-800 print:py-0.5">
                          {ac.subject}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 text-slate-700 print:py-0.5">
                          {ac.schoolInstitute || "—"}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 text-slate-700 print:py-0.5">
                          {ac.boardUniversity || "—"}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 font-mono text-center text-slate-700 print:py-0.5 whitespace-nowrap">
                          {ac.startYear} - {ac.endYear}
                        </td>
                        <td className="py-1 px-2 font-mono font-bold text-emerald-800 text-right print:py-0.5 whitespace-nowrap">
                          {ac.passingMarks}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-2 text-center text-slate-400 italic">
                        No academic records declared.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Work History: Formatted in Columns Table! */}
          {data.experiences && data.experiences.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b border-emerald-700/40 pb-1 text-xs font-bold uppercase tracking-wider text-emerald-900 print:text-[10px]">
                <span>4. Work History & Professional Experience</span>
                <span className="text-[9px] font-semibold text-slate-500 lowercase">
                  ({data.experiences.length} records)
                </span>
              </div>

              <div className="mt-2 overflow-hidden rounded-lg border border-slate-300 print:mt-1">
                <table className="w-full text-left text-xs border-collapse print:text-[9px]">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <tr>
                      <th className="py-1.5 px-2 border-r border-slate-200 w-8 text-center print:py-1">#</th>
                      <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Designation / Role</th>
                      <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Organization / Employer</th>
                      <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Nature of Work</th>
                      <th className="py-1.5 px-2 border-r border-slate-200 print:py-1">Posting Location</th>
                      <th className="py-1.5 px-2 border-r border-slate-200 text-center w-36 print:py-1">Working Period</th>
                      <th className="py-1.5 px-2 text-right w-24 print:py-1">Experience</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.experiences.map((exp, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                        <td className="py-1 px-2 border-r border-slate-200 font-mono text-center text-slate-500 print:py-0.5">
                          {idx + 1}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 font-bold text-slate-900 print:py-0.5">
                          {exp.designation}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 text-slate-800 print:py-0.5">
                          {exp.employerName}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 text-slate-700 print:py-0.5">
                          {exp.natureOfWork || "Field Work"}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 text-slate-700 print:py-0.5">
                          {exp.postingLocation || "—"}
                        </td>
                        <td className="py-1 px-2 border-r border-slate-200 font-mono text-center text-slate-700 print:py-0.5 text-[10px] whitespace-nowrap">
                          {exp.startDate} to {exp.endDate || "Present"}
                        </td>
                        <td className="py-1 px-2 font-mono font-bold text-emerald-800 text-right print:py-0.5 whitespace-nowrap">
                          {exp.experienceYears} Years
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Declaration & Signature Section */}
          <div className="border-t border-slate-300 pt-2.5 print:pt-1.5">
            <div className="flex items-end justify-between gap-4">
              {/* Left: Declaration text & Office details */}
              <div className="space-y-1 text-[9.5px] text-slate-600 max-w-lg print:text-[8.5px] print:space-y-0.5">
                <p className="italic">
                  <strong>Self-Declaration:</strong> I hereby declare that all information submitted in this application is true, complete, and correct to the best of my knowledge and belief.
                </p>
                <p className="font-semibold text-slate-700">
                  Regd. Office: Thekma, District- Azamgarh, Uttar Pradesh (India) • DPKHRC Trust
                </p>
                <p className="font-medium text-emerald-800">
                  Place of Issuance: Thekma, Azamgarh, Uttar Pradesh, India
                </p>
              </div>

              {/* Right: Signature Box */}
              <div className="flex flex-col items-center shrink-0">
                <div className="flex h-11 w-32 items-center justify-center border border-slate-300 bg-slate-50 p-1 rounded print:h-9 print:w-28">
                  {signaturePreview ? (
                    <img
                      src={signaturePreview}
                      alt="Applicant Signature"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-[8px] text-slate-400 italic">Verified Signature</span>
                  )}
                </div>
                <span className="mt-0.5 text-[8.5px] font-bold text-slate-800 uppercase tracking-wider print:text-[7.5px]">
                  Applicant Signature
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
