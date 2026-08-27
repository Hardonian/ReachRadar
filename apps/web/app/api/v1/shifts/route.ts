import { NextResponse } from "next/server";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";

export async function GET() {
  return NextResponse.json({
    shifts: DEMO_PUBLIC_SHIFTS,
    total: DEMO_PUBLIC_SHIFTS.length,
    generatedAt: new Date().toISOString(),
  });
}
