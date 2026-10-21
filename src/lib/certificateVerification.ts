import { prisma } from "@/x/e3746f45";

export interface VerifiedCertificateResult {
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

export function formatImmersionCode(
  code?: string | null,
  programTitle?: string | null,
): string {
  if (!code) return "IM2026XX10001";
  const trimmed = code.trim();
  if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  const sourceText =
    programTitle && programTitle.trim() ? programTitle : trimmed;
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
  const numericPart = code.replace(/[^0-9]/g, "");
  let index = "81251";
  if (numericPart.length >= 5) {
    index = numericPart.slice(-5);
  } else if (numericPart.length > 0) {
    index = numericPart.padStart(5, "0");
  } else {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = code.charCodeAt(i) + ((hash << 5) - hash);
    }
    index = Math.abs((hash % 90000) + 10000).toString();
  }
  return `IM2026${initials}${index}`;
}

export function formatInternshipCode(
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

  const numericPart = code.replace(/[^0-9]/g, "");
  let index = "81251";
  if (numericPart.length >= 5) {
    index = numericPart.slice(-5);
  } else if (numericPart.length > 0) {
    index = numericPart.padStart(5, "0");
  } else {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = code.charCodeAt(i) + ((hash << 5) - hash);
    }
    index = Math.abs((hash % 90000) + 10000).toString();
  }

  return `IN2026${initials}${index}`;
}

export async function verifyCertificateByIdOrNo(
  query: string,
): Promise<VerifiedCertificateResult | null> {
  const sanitized = query.trim();
  if (!sanitized) return null;

  // 1. First, search Internship Certificates
  const cert = await prisma.certificate.findFirst({
    where: {
      OR: [
        { certificateNo: { equals: sanitized, mode: "insensitive" } },
        { id: { equals: sanitized, mode: "insensitive" } },
      ],
    },
    include: {
      student: {
        select: { id: true, name: true, registrationNo: true, role: true },
      },
      internship: {
        select: {
          id: true,
          title: true,
          companyName: true,
          location: true,
          duration: true,
          mode: true,
        },
      },
      issuedBy: {
        select: { name: true },
      },
    },
  });

  if (cert) {
    // Resolve photo and Student ID
    let displayStudentId = "S2026TS45901";
    let studentPhotoUrl: string | null = null;

    if (cert.student?.role === "IMMERSION_USER") {
      displayStudentId = cert.student.registrationNo || displayStudentId;
      const immProfile = await prisma.immersionParticipantProfile.findUnique({
        where: { userId: cert.studentId },
        select: { passportPhotoUrl: true },
      });
      studentPhotoUrl = immProfile?.passportPhotoUrl || null;
    } else {
      const reg = await prisma.studentRegistration.findUnique({
        where: { userId: cert.studentId },
        select: { studentId: true, photoUrl: true },
      });
      displayStudentId =
        reg?.studentId || cert.student?.registrationNo || displayStudentId;
      studentPhotoUrl = reg?.photoUrl || null;
    }

    if (!studentPhotoUrl) {
      const immFallback = await prisma.immersionParticipantProfile.findUnique({
        where: { userId: cert.studentId },
        select: { passportPhotoUrl: true },
      });
      if (immFallback?.passportPhotoUrl) {
        studentPhotoUrl = immFallback.passportPhotoUrl;
      }
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(cert.issuedAt));

    const programCode = formatInternshipCode(
      cert.internship?.id || "IN2026HT81251",
      cert.internship?.companyName,
    );

    return {
      certificateNo: cert.certificateNo,
      status: "VERIFIED",
      type: "INTERNSHIP",
      typeLabel: "Internship Program",
      studentName: cert.student?.name || "Student",
      studentId: displayStudentId,
      photoUrl: studentPhotoUrl,
      programTitle: cert.internship?.title || "Internship Program",
      programCode,
      companyName:
        cert.internship?.companyName ||
        "International Institute of Internship™",
      location: cert.internship?.location || "India",
      mode: cert.internship?.mode || "Online",
      duration: cert.internship?.duration || "Standard Duration",
      grade: cert.grade || null,
      credits: cert.credits || null,
      issuedAt: cert.issuedAt.toISOString(),
      formattedIssuedAt: formattedDate,
      issuedBy: cert.issuedBy?.name || "Academic Director",
      registeredOffice:
        "Regd. Office: Thekma, District- Azamgarh, Uttar Pradesh (India)",
      verificationPlace: "Thekma, Azamgarh, Uttar Pradesh, India",
      institution: "International Institute of Internship™ [i3]",
      trust: "DPKHRC Trust",
      verificationUrl: `https://www.iiinternship.in/verify?cert=${encodeURIComponent(cert.certificateNo)}`,
      originalId: cert.id,
    };
  }

  // 2. Search Immersion Certificates
  const immCert = await prisma.immersionCertificate.findFirst({
    where: {
      OR: [
        { certificateNo: { equals: sanitized, mode: "insensitive" } },
        { id: { equals: sanitized, mode: "insensitive" } },
      ],
    },
    include: {
      application: {
        include: {
          user: { select: { id: true, name: true, registrationNo: true } },
          immersion: {
            select: { id: true, title: true, location: true, period: true },
          },
        },
      },
      issuedBy: { select: { name: true } },
    },
  });

  if (immCert) {
    const participantUserId = immCert.application?.user.id;
    let studentPhotoUrl: string | null = null;

    if (participantUserId) {
      const immProfile = await prisma.immersionParticipantProfile.findUnique({
        where: { userId: participantUserId },
        select: { passportPhotoUrl: true },
      });
      studentPhotoUrl = immProfile?.passportPhotoUrl || null;

      if (!studentPhotoUrl) {
        const reg = await prisma.studentRegistration.findUnique({
          where: { userId: participantUserId },
          select: { photoUrl: true },
        });
        studentPhotoUrl = reg?.photoUrl || null;
      }
    }

    const displayStudentId =
      immCert.application?.user?.registrationNo || "IM2026HT81251";

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(immCert.issuedAt));

    const programCode = formatImmersionCode(
      immCert.application?.immersion?.id || "IM2026HT81251",
      immCert.application?.immersion?.title,
    );

    return {
      certificateNo: immCert.certificateNo,
      status: "VERIFIED",
      type: "IMMERSION",
      typeLabel: "Global Immersion Program",
      studentName: immCert.application?.user?.name || "Participant",
      studentId: displayStudentId,
      photoUrl: studentPhotoUrl,
      programTitle:
        immCert.application?.immersion?.title || "Global Immersion Program",
      programCode,
      companyName: "International Institute of Internship™",
      location: immCert.application?.immersion?.location || "International",
      mode: "Immersion",
      duration: immCert.application?.immersion?.period || "Program Duration",
      grade: immCert.grade || null,
      credits: immCert.credits || null,
      issuedAt: immCert.issuedAt.toISOString(),
      formattedIssuedAt: formattedDate,
      issuedBy: immCert.issuedBy?.name || "Authorized Signatory",
      registeredOffice:
        "Regd. Office: Thekma, District- Azamgarh, Uttar Pradesh (India)",
      verificationPlace: "Thekma, Azamgarh, Uttar Pradesh, India",
      institution: "International Institute of Internship™ [i3]",
      trust: "DPKHRC Trust",
      verificationUrl: `https://www.iiinternship.in/verify?cert=${encodeURIComponent(immCert.certificateNo)}`,
      originalId: immCert.id,
    };
  }

  return null;
}
