import { NextRequest, NextResponse } from "next/server";
import { verifyCertificateByIdOrNo } from "@/lib/certificateVerification";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const certQuery = searchParams.get("cert") || searchParams.get("id") || "";

    if (!certQuery.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "MISSING_QUERY",
          message: "Certificate number or ID is required (e.g. ?cert=CERT-2026-0001).",
        },
        { status: 400 },
      );
    }

    const verified = await verifyCertificateByIdOrNo(certQuery);

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          error: "NOT_FOUND",
          message: `No active certificate found matching "${certQuery}". Please verify the certificate number and try again.`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: verified,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error: any) {
    console.error("[Certificate Verification API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Failed to verify certificate. Please try again later.",
      },
      { status: 500 },
    );
  }
}
