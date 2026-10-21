import { NextRequest, NextResponse } from "next/server";
import { verifyCertificateByIdOrNo } from "@/lib/certificateVerification";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id || !id.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "MISSING_ID",
          message: "Certificate ID is required.",
        },
        { status: 400 },
      );
    }

    const verified = await verifyCertificateByIdOrNo(id);

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          error: "NOT_FOUND",
          message: `No active certificate found matching "${id}".`,
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
    console.error("[Certificate Verification API [id]] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Failed to verify certificate.",
      },
      { status: 500 },
    );
  }
}
