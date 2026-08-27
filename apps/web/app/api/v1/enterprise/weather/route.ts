import { NextResponse } from "next/server";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer rr_")) {
    return NextResponse.json(
      { error: { code: "AUTH_REQUIRED", message: "Valid Enterprise API key required (Bearer rr_live_...)" } },
      { status: 401 }
    );
  }

  return NextResponse.json({
    platform: "youtube",
    overallScore: 27,
    overallStatus: "CALM",
    activeShifts: DEMO_PUBLIC_SHIFTS,
    requestedAt: new Date().toISOString(),
  });
}
