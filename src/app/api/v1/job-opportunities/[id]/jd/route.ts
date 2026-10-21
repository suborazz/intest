import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";
import fs from "fs";
import { join } from "path";
import { generateJobDescriptionPDF } from "@/lib/jdPdfGenerator";
import { formatJobOpportunityId } from "@/x/a85a9c0c";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const job = await prisma.jobOpportunity.findFirst({
      where: {
        OR: [{ id }, { id: id.toUpperCase() }],
        deletedAt: null,
      },
    });

    if (!job) {
      return new NextResponse("Job Opportunity Not Found", { status: 404 });
    }

    const formattedId = formatJobOpportunityId(job.id, job.createdAt);
    const safeFilename = `Job_Description_${formattedId}.pdf`;

    // 1. If jdDocUrl is an external Cloudinary / HTTP URL, attempt to stream it
    if (job.jdDocUrl && /^https?:\/\//i.test(job.jdDocUrl)) {
      try {
        const upstreamRes = await fetch(job.jdDocUrl);
        if (upstreamRes.ok) {
          const arrayBuffer = await upstreamRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          return new NextResponse(new Uint8Array(buffer), {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="${safeFilename}"`,
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      } catch (err) {
        console.warn(
          `[JD Proxy] Upstream fetch failed for ${job.jdDocUrl}, falling back to dynamic PDF generation.`,
          err,
        );
      }
    }

    // 2. If jdDocUrl is a local public file, check if it exists on disk
    if (job.jdDocUrl && job.jdDocUrl.startsWith("/")) {
      const localFilePath = join(
        process.cwd(),
        "public",
        job.jdDocUrl.replace(/^\//, ""),
      );
      if (fs.existsSync(localFilePath)) {
        const fileBuffer = fs.readFileSync(localFilePath);
        return new NextResponse(new Uint8Array(fileBuffer), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${safeFilename}"`,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    }

    // 3. Fallback: Dynamically generate executive-grade verified branded Job Description PDF!
    const generatedBuffer = await generateJobDescriptionPDF({
      jobId: formattedId,
      companyName: job.companyName,
      postOpportunity: job.postOpportunity,
      jobNature: job.jobNature,
      fieldOfEmployment: job.fieldOfEmployment,
      minQualification: job.minQualification,
      skillsRequired: job.skillsRequired,
      totalStaffStrength: job.totalStaffStrength,
      website: job.website,
      advtNo: job.advtNo,
      advtDate: job.advtDate,
      closingDate: job.closingDate,
      salary: (job as { salary?: string | null }).salary,
      jdDescription: job.jdDescription,
    });

    return new NextResponse(new Uint8Array(generatedBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[JD Download Error]:", error);
    return new NextResponse(
      "Internal Error Generating Job Description PDF",
      {
        status: 500,
      },
    );
  }
}
