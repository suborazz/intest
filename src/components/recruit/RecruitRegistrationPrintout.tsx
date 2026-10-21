"use client";

import React, { useMemo } from "react";
import qrcode from "qrcode-generator";

export interface RecruitAcademicRecord {
  id?: string;
  qualification: string;
  subject?: string | null;
  schoolInstitute?: string | null;
  instituteName?: string | null;
  boardUniversity?: string | null;
  startYear?: number | string | null;
  endYear: number | string;
  passingMarks?: number | string | null;
  percentage?: number | string | null;
  passingDivision?: string | null;
  division?: string | null;
}

export interface RecruitExperienceRecord {
  id?: string;
  designation: string;
  employerName: string;
  natureOfWork?: string | null;
  postingLocation?: string | null;
  startDate: string;
  endDate?: string | null;
  experienceYears?: number | string | null;
  totalExperience?: number | string | null;
}

export interface RecruitAddressRecord {
  local?: string | null;
  block?: string | null;
  district?: string | null;
  state?: string | null;
  country?: string | null;
  pinCode?: string | null;
}

export interface RecruitRegistrationData {
  id?: string;
  fullName?: string;
  name?: string;
  dob?: string;
  gender?: string;
  mobileNo?: string;
  mobile?: string;
  email?: string;
  maritalStatus?: string;
  religion?: string | null;
  category?: string;
  bloodGroup?: string | null;
  nationality?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
  aadharNo?: string | null;
  adharNo?: string | null;
  languagesKnown?: string | null;
  languageKnown?: string | null;
  photoUrl?: string | null;
  photoPreview?: string | null;
  photo?: string | null;
  signatureUrl?: string | null;
  signaturePreview?: string | null;
  signature?: string | null;
  localAddress?: RecruitAddressRecord | null;
  permanentAddress?: RecruitAddressRecord | null;
  currAddressLocal?: string | null;
  currAddressDistrict?: string | null;
  currAddressState?: string | null;
  currAddressCountry?: string | null;
  currAddressPinCode?: string | null;
  permAddressLocal?: string | null;
  permAddressDistrict?: string | null;
  permAddressState?: string | null;
  permAddressCountry?: string | null;
  permAddressPinCode?: string | null;
  academics?: RecruitAcademicRecord[] | null;
  experiences?: RecruitExperienceRecord[] | null;
}

export interface RecruitRegistrationPrintoutProps {
  data: RecruitRegistrationData;
  education?: RecruitAcademicRecord[];
  experience?: RecruitExperienceRecord[];
  applicationId?: string;
  advtNo?: string;
  postName?: string;
  submittedAt?: string;
}

// Code 128B Encoding Table (107 patterns)
const CODE128_PATTERNS = [
  "212222","222122","222221","121223","121322","131222","122213","122312","132212","221213",
  "221312","231212","112232","122132","122231","113222","123122","123221","223211","221132",
  "221231","213212","223112","312131","311222","321122","321221","312212","322112","322211",
  "212123","212321","232121","111323","131123","131321","112313","132113","132311","211313",
  "231113","231311","112133","112331","132131","113123","113321","133121","313121","211331",
  "231131","213113","213311","213131","311123","311321","331121","312113","312311","332111",
  "314111","221411","431111","111224","111422","121124","121421","141122","141221","112214",
  "112412","122114","122411","142112","142211","241211","221114","413111","241112","134111",
  "111242","121142","121241","114212","124112","124211","411212","421112","421211","212141",
  "214121","412121","111143","111341","131141","114113","114311","411113","411311","113141",
  "114131","311141","411131","211412","211214","211232","2331112"
];

function encodeCode128B(text: string): string {
  let checksum = 104; // START B
  const codes: number[] = [104];
  for (let i = 0; i < text.length; i++) {
    const val = text.charCodeAt(i) - 32;
    if (val >= 0 && val < 95) {
      codes.push(val);
      checksum += val * (i + 1);
    }
  }
  codes.push(checksum % 103);
  codes.push(106); // STOP
  let modules = "";
  for (const c of codes) {
    const pat = CODE128_PATTERNS[c] || CODE128_PATTERNS[0]!;
    for (let j = 0; j < pat.length; j++) {
      const width = parseInt(pat[j]!, 10);
      modules += (j % 2 === 0 ? "1" : "0").repeat(width);
    }
  }
  return modules;
}

export function Code128BarcodeSvg({
  text,
  height = 24,
  className,
}: {
  text: string;
  height?: number;
  className?: string;
}) {
  const modules = useMemo(() => encodeCode128B(text), [text]);
  const barWidth = 1;
  const width = modules.length * barWidth;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ width: "100%", height }}
      shapeRendering="crispEdges"
      aria-label={`Barcode for ${text}`}
    >
      <rect width={width} height={height} fill="#ffffff" />
      {modules.split("").map((bit, idx) =>
        bit === "1" ? (
          <rect
            key={idx}
            x={idx * barWidth}
            y={0}
            width={barWidth}
            height={height}
            fill="#000000"
          />
        ) : null,
      )}
    </svg>
  );
}

export function printRecruitRegistrationForm(applicationId?: string) {
  if (typeof window === "undefined") return;
  const originalTitle = document.title;
  if (applicationId) {
    document.title = `Recruit_Application_${applicationId.trim()}`;
  }
  window.print();
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

export const printRecruitRegistration = printRecruitRegistrationForm;

function formatAddress(
  address?: RecruitAddressRecord | null,
  fallbackFlat?: {
    local?: string | null;
    district?: string | null;
    state?: string | null;
    country?: string | null;
    pinCode?: string | null;
  },
): string {
  const local = address?.local || fallbackFlat?.local || "";
  const district = address?.district || fallbackFlat?.district || "";
  const state = address?.state || fallbackFlat?.state || "";
  const pinCode = address?.pinCode || fallbackFlat?.pinCode || "";

  const textParts = [local, district, state].filter(Boolean).join(", ");
  if (textParts && pinCode) {
    return `${textParts} - ${pinCode}`;
  }
  return textParts || pinCode || "—";
}

function cleanEnum(val?: string | null): string {
  if (!val) return "—";
  return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatBloodGroup(val?: string | null): string {
  if (!val) return "—";
  const map: Record<string, string> = {
    A_POS: "A+",
    A_NEG: "A-",
    B_POS: "B+",
    B_NEG: "B-",
    AB_POS: "AB+",
    AB_NEG: "AB-",
    O_POS: "O+",
    O_NEG: "O-",
  };
  return map[val] || val;
}

export const RecruitRegistrationPrintout: React.FC<RecruitRegistrationPrintoutProps> = ({
  data,
  education,
  experience,
  applicationId,
  advtNo,
  postName,
  submittedAt,
}) => {
  const regId = applicationId || data.id || "REG26KUK26029";
  const fullName = data.fullName || data.name || "—";
  const mobile = data.mobileNo || data.mobile || "—";
  const email = data.email || "—";
  const dob = data.dob || "—";
  const gender = cleanEnum(data.gender);
  const maritalStatus = cleanEnum(data.maritalStatus);
  const category = cleanEnum(data.category);
  const religion = cleanEnum(data.religion);
  const bloodGroup = formatBloodGroup(data.bloodGroup);
  const nationality = data.nationality || "Indian";
  const fatherName = data.fatherName || "—";
  const motherName = data.motherName || "—";
  const aadharNo = data.aadharNo || data.adharNo || "";
  const languages = data.languagesKnown || data.languageKnown || "";

  const raw = data as Record<string, any>;
  const photo = raw.photoUrl || raw.photoPreview || raw.photo || null;
  const signature = raw.signatureUrl || raw.signaturePreview || raw.signature || null;

  const academicList =
    education && education.length > 0
      ? education
      : data.academics && data.academics.length > 0
      ? data.academics
      : [];

  const experienceList =
    experience && experience.length > 0
      ? experience
      : data.experiences && data.experiences.length > 0
      ? data.experiences
      : [];

  const localAddrFormatted = formatAddress(data.localAddress, {
    local: data.currAddressLocal,
    district: data.currAddressDistrict,
    state: data.currAddressState,
    country: data.currAddressCountry,
    pinCode: data.currAddressPinCode,
  });

  const permAddrFormatted = formatAddress(data.permanentAddress, {
    local: data.permAddressLocal,
    district: data.permAddressDistrict,
    state: data.permAddressState,
    country: data.permAddressCountry,
    pinCode: data.permAddressPinCode,
  });

  // Offline QR code generation
  const qrDataUrl = useMemo(() => {
    try {
      const qr = qrcode(0, "M");
      qr.addData(`https://www.iiinternship.in/verify/id-card/${regId}`);
      qr.make();
      return qr.createDataURL(3, 0);
    } catch {
      return null;
    }
  }, [regId]);

  const isJobSpecific = !!(advtNo || postName);

  return (
    <div className="w-full">
      {/* Strict Print Stylesheet to Guarantee Exact 1-Page Fit & Total Layout Isolation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 4mm 6mm !important;
          }
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
          }
          /* Hide EVERYTHING in dashboard except the printable registration card */
          header, footer, nav, aside, [role="navigation"], .site-header, .site-footer,
          [data-slot="sidebar-inset"] > header,
          [data-slot="card-header"],
          .print\\:hidden,
          .no-print {
            display: none !important;
          }
          #recruit-registration-print-card {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: 1.5px solid #065f46 !important;
            border-radius: 4px !important;
            padding: 6px 10px !important;
            margin: 0 !important;
            background: #ffffff !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          #recruit-registration-print-card * {
            box-sizing: border-box !important;
          }
        }
      `,
        }}
      />

      {/* Official Printable Registration Form Card */}
      <div
        id="recruit-registration-print-card"
        className="printable-registration-card mx-auto min-w-[760px] max-w-4xl w-full rounded-xl border-2 border-slate-300 bg-white p-5 text-left font-sans text-slate-900 shadow-sm print:min-w-0 print:w-full print:border-emerald-800 print:p-2"
      >
        {/* Header: Institutional Branding, Title & Barcode */}
        <div className="border-b-2 border-emerald-800 pb-2.5 print:pb-1.5">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Institute Logo & Name */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <img
                src="/logo.png"
                alt="i3 Logo"
                className="h-11 w-auto object-contain print:h-9 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="min-w-0">
                <h1 className="font-serif text-base font-bold tracking-tight text-emerald-950 sm:text-lg print:text-sm">
                  International Institute of Internship™ [i3]
                </h1>
                <p className="text-[9.5px] font-semibold tracking-wider text-slate-600 uppercase print:text-[8px]">
                  Autonomous Unit of DPKHRC Trust • Regd. Office: Thekma, Azamgarh, UP (India)
                </p>
                <div className="mt-0.5 inline-block rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[8.5px] font-bold text-emerald-800 print:text-[7.5px]">
                  {isJobSpecific
                    ? "OFFICIAL RECRUITMENT APPLICATION FORM"
                    : "JOB APPLICATION & REGISTRATION FORM"}
                </div>
              </div>
            </div>

            {/* Right: Pure Offline Vector Barcode + QR Code + Reg ID */}
            <div className="flex flex-col items-end text-right shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="h-6 w-32 bg-white object-contain print:h-5 print:w-28 flex items-center justify-center overflow-hidden">
                    <Code128BarcodeSvg text={regId} height={24} />
                  </div>
                  <span className="font-mono text-[8.5px] font-bold tracking-wider text-slate-800 print:text-[7.5px]">
                    ID: {regId}
                  </span>
                </div>
                {qrDataUrl && (
                  <img
                    src={qrDataUrl}
                    alt="Verify QR"
                    className="size-9 border border-slate-200 bg-white p-0.5 object-contain print:size-7"
                  />
                )}
              </div>
              <span className="mt-0.5 text-[8.5px] font-medium text-slate-500 print:text-[7.5px]">
                Date:{" "}
                {submittedAt
                  ? new Date(submittedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : new Date().toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
              </span>
            </div>
          </div>

          {/* If specific job application, show Advertisement & Position Bar */}
          {isJobSpecific && (
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 border-t border-slate-200 pt-1 text-[9px] font-medium text-slate-700 print:text-[8px] print:pt-0.5">
              <span>
                <b>Advt. No:</b> {advtNo || "General/Open"}
              </span>
              <span>
                <b>Post Applied:</b>{" "}
                <span className="font-bold text-emerald-900">
                  {postName || "Direct Applicant"}
                </span>
              </span>
              <span>
                <b>Reg. No:</b> <span className="font-mono font-bold">{regId}</span>
              </span>
            </div>
          )}
        </div>

        {/* Main Application Form Content */}
        <div className="space-y-2.5 pt-2 print:space-y-1.5 print:pt-1">
          {/* 1. Personal Details + Passport Photo Grid */}
          <div>
            <div className="flex items-center gap-1 border-b border-emerald-700/40 pb-0.5 text-[11px] font-bold tracking-wider text-emerald-900 uppercase print:text-[9px]">
              <span>1. Personal Details</span>
            </div>

            <div className="mt-1.5 grid grid-cols-12 items-start gap-2.5 print:mt-1 print:gap-1.5">
              {/* Left: 2-Column Key-Value Grid */}
              <div className="col-span-12 grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:col-span-9 lg:col-span-10 print:gap-y-0.5 print:text-[9px]">
                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Full Name:</span>
                  <span className="font-bold text-slate-900">{fullName}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Mobile No:</span>
                  <span className="font-mono font-bold text-slate-900">{mobile}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Date of Birth:</span>
                  <span className="font-semibold text-slate-900">{dob}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Email ID:</span>
                  <span className="max-w-[200px] truncate font-semibold text-slate-900">{email}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Gender:</span>
                  <span className="font-semibold text-slate-900">{gender}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Marital Status:</span>
                  <span className="font-semibold text-slate-900">{maritalStatus}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-900">{category}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Religion:</span>
                  <span className="font-semibold text-slate-900">{religion}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Blood Group:</span>
                  <span className="font-bold text-emerald-800">{bloodGroup}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="w-24 shrink-0 font-medium text-slate-500">Nationality:</span>
                  <span className="font-semibold text-slate-900">{nationality}</span>
                </div>

                {fatherName && fatherName !== "—" && (
                  <div className="flex items-baseline gap-1">
                    <span className="w-24 shrink-0 font-medium text-slate-500">Father's Name:</span>
                    <span className="font-semibold text-slate-900">{fatherName}</span>
                  </div>
                )}
                {motherName && motherName !== "—" && (
                  <div className="flex items-baseline gap-1">
                    <span className="w-24 shrink-0 font-medium text-slate-500">Mother's Name:</span>
                    <span className="font-semibold text-slate-900">{motherName}</span>
                  </div>
                )}
                {aadharNo && (
                  <div className="flex items-baseline gap-1">
                    <span className="w-24 shrink-0 font-medium text-slate-500">Aadhaar No:</span>
                    <span className="font-mono font-semibold text-slate-900">{aadharNo}</span>
                  </div>
                )}
                {languages && (
                  <div className="flex items-baseline gap-1">
                    <span className="w-24 shrink-0 font-medium text-slate-500">Languages:</span>
                    <span className="font-semibold text-slate-900">{languages}</span>
                  </div>
                )}
              </div>

              {/* Right: Passport Photo Box */}
              <div className="col-span-12 flex flex-col items-center justify-center sm:col-span-3 lg:col-span-2">
                <div
                  style={{ width: "80px", height: "96px", overflow: "hidden" }}
                  className="relative overflow-hidden rounded border-2 border-slate-300 bg-slate-50 p-0.5 shadow-xs print:h-20 print:w-16"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt="Applicant Photograph"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      className="size-full rounded object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center text-slate-400">
                      <span className="text-center text-[8px] font-semibold">
                        Photo
                        <br />
                        Verified
                      </span>
                    </div>
                  )}
                </div>
                <span className="mt-0.5 text-[7.5px] font-bold tracking-wider text-slate-500 uppercase">
                  Passport Photo
                </span>
              </div>
            </div>
          </div>

          {/* 2. Address Details: 2-Column Side-by-Side Cards */}
          <div>
            <div className="flex items-center gap-1 border-b border-emerald-700/40 pb-0.5 text-[11px] font-bold tracking-wider text-emerald-900 uppercase print:text-[9px]">
              <span>2. Address Details</span>
            </div>

            <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2 print:mt-1 print:gap-1.5">
              <div className="rounded border border-slate-200 bg-slate-50/70 p-1.5 text-xs print:p-1 print:text-[8.5px]">
                <span className="block text-[8.5px] font-bold tracking-wider text-emerald-800 uppercase print:text-[7.5px]">
                  Current / Local Address
                </span>
                <p className="mt-0.5 font-medium leading-tight text-slate-800">
                  {localAddrFormatted}
                </p>
              </div>

              <div className="rounded border border-slate-200 bg-slate-50/70 p-1.5 text-xs print:p-1 print:text-[8.5px]">
                <span className="block text-[8.5px] font-bold tracking-wider text-emerald-800 uppercase print:text-[7.5px]">
                  Permanent Address
                </span>
                <p className="mt-0.5 font-medium leading-tight text-slate-800">
                  {permAddrFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Educational Qualifications: Formatted in 7-Column Table */}
          <div>
            <div className="flex items-center justify-between border-b border-emerald-700/40 pb-0.5 text-[11px] font-bold tracking-wider text-emerald-900 uppercase print:text-[9px]">
              <span>3. Educational Qualifications</span>
              <span className="text-[8.5px] font-semibold text-slate-500 lowercase print:text-[7.5px]">
                ({academicList.length} record{academicList.length === 1 ? "" : "s"})
              </span>
            </div>

            <div className="mt-1.5 overflow-hidden rounded border border-slate-300 print:mt-1">
              <table className="w-full border-collapse text-left text-xs print:text-[8.5px]">
                <thead className="border-b border-slate-300 bg-slate-100 font-bold text-slate-800">
                  <tr>
                    <th className="w-7 border-r border-slate-200 px-1.5 py-1 text-center print:py-0.5">#</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Qualification / Level</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Subject / Stream</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">School / Institute</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Board / University</th>
                    <th className="w-20 border-r border-slate-200 px-1.5 py-1 text-center print:py-0.5">Session</th>
                    <th className="w-16 px-1.5 py-1 text-right print:py-0.5">Marks / %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {academicList.length > 0 ? (
                    academicList.map((ac, idx) => {
                      const marksVal = ac.passingMarks ?? ac.percentage ?? "";
                      const instituteVal = ac.schoolInstitute || ac.instituteName || "—";
                      const sessionVal = ac.startYear
                        ? `${ac.startYear} - ${ac.endYear}`
                        : String(ac.endYear || "—");
                      return (
                        <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-center font-mono text-slate-500">
                            {idx + 1}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 font-bold text-slate-900">
                            {cleanEnum(ac.qualification)}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-slate-800">
                            {ac.subject || "General"}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-slate-700">
                            {instituteVal}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-slate-700">
                            {ac.boardUniversity || "—"}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-center font-mono text-slate-700 whitespace-nowrap">
                            {sessionVal}
                          </td>
                          <td className="px-1.5 py-0.5 text-right font-mono font-bold text-emerald-800 whitespace-nowrap">
                            {marksVal !== "" ? `${marksVal}%` : "—"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-1.5 text-center text-slate-400 italic">
                        No academic qualification records declared.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Work Experience: Formatted in 7-Column Table */}
          <div>
            <div className="flex items-center justify-between border-b border-emerald-700/40 pb-0.5 text-[11px] font-bold tracking-wider text-emerald-900 uppercase print:text-[9px]">
              <span>4. Work Experience</span>
              <span className="text-[8.5px] font-semibold text-slate-500 lowercase print:text-[7.5px]">
                ({experienceList.length} record{experienceList.length === 1 ? "" : "s"})
              </span>
            </div>

            <div className="mt-1.5 overflow-hidden rounded border border-slate-300 print:mt-1">
              <table className="w-full border-collapse text-left text-xs print:text-[8.5px]">
                <thead className="border-b border-slate-300 bg-slate-100 font-bold text-slate-800">
                  <tr>
                    <th className="w-7 border-r border-slate-200 px-1.5 py-1 text-center print:py-0.5">#</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Designation / Role</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Organization / Employer</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Nature of Work</th>
                    <th className="border-r border-slate-200 px-1.5 py-1 print:py-0.5">Posting Location</th>
                    <th className="w-32 border-r border-slate-200 px-1.5 py-1 text-center print:py-0.5">Period</th>
                    <th className="w-20 px-1.5 py-1 text-right print:py-0.5">Experience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {experienceList.length > 0 ? (
                    experienceList.map((exp, idx) => {
                      const expYears = exp.experienceYears ?? exp.totalExperience ?? "—";
                      return (
                        <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-center font-mono text-slate-500">
                            {idx + 1}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 font-bold text-slate-900">
                            {exp.designation}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-slate-800">
                            {exp.employerName}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-slate-700">
                            {exp.natureOfWork || "Field Work"}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-slate-700">
                            {exp.postingLocation || "—"}
                          </td>
                          <td className="border-r border-slate-200 px-1.5 py-0.5 text-center font-mono text-slate-700 whitespace-nowrap">
                            {exp.startDate} to {exp.endDate || "Present"}
                          </td>
                          <td className="px-1.5 py-0.5 text-right font-mono font-bold text-emerald-800 whitespace-nowrap">
                            {expYears !== "—" ? `${expYears} Yrs` : "—"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-1.5 text-center text-slate-400 italic">
                        No prior employment history declared / Fresher candidate.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Declaration & Signature Section */}
          <div className="border-t border-slate-300 pt-2 print:pt-1">
            <div className="flex items-end justify-between gap-3">
              {/* Left: Declaration text & Office details */}
              <div className="max-w-lg space-y-0.5 text-[9px] text-slate-600 print:text-[8px]">
                <p className="italic">
                  <strong>Declaration:</strong> I hereby declare that all information furnished in this application form is true, complete, and correct to the best of my knowledge and belief.
                </p>
                <p className="font-semibold text-slate-700">
                  Regd. Office: Thekma, District- Azamgarh, Uttar Pradesh (India) • DPKHRC Trust
                </p>
                <div className="flex items-center gap-3 font-medium text-emerald-900 pt-0.5">
                  <span>Place: Thekma, Azamgarh (U.P.)</span>
                  <span>•</span>
                  <span>
                    Date:{" "}
                    {submittedAt
                      ? new Date(submittedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : new Date().toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                  </span>
                </div>
              </div>

              {/* Right: Signature Box */}
              <div className="flex shrink-0 flex-col items-center">
                <div
                  style={{ width: "112px", height: "38px", overflow: "hidden" }}
                  className="flex items-center justify-center overflow-hidden rounded border border-slate-300 bg-slate-50 p-0.5 print:h-8 print:w-24"
                >
                  {signature ? (
                    <img
                      src={signature}
                      alt="Applicant Signature"
                      style={{ maxHeight: "34px", maxWidth: "108px", objectFit: "contain" }}
                      className="max-h-full max-w-full object-contain"
                      loading="eager"
                    />
                  ) : (
                    <span className="text-[7.5px] text-slate-400 italic">Verified Signature</span>
                  )}
                </div>
                <span className="mt-0.5 text-[8px] font-bold tracking-wider text-slate-800 uppercase print:text-[7px]">
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



