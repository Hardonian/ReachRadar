import { NextResponse } from "next/server";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";

export async function GET() {
  const payload = {
    platform: "youtube",
    overallScore: 27,
    overallStatus: "CALM",
    surfaces: {
      browse: { score: 18, status: "CALM", delta24hPct: -1.2 },
      suggested: { score: 31, status: "NORMAL", delta24hPct: 3.4 },
      search: { score: 22, status: "NORMAL", delta24hPct: -0.5 },
      shorts: { score: 74, status: "ELEVATED", delta24hPct: -14.8 },
    },
    activeShifts: DEMO_PUBLIC_SHIFTS,
    privacyThresholdsMet: true,
    generatedAt: new Date().toISOString(),
    dataThrough: new Date().toISOString().split("T")[0],
    scoringVersion: "1.0.0",
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
