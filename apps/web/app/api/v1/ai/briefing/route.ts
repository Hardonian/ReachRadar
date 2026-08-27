import { NextResponse } from "next/server";
import { MorningBriefingEngine } from "@reachradar/analytics-engine";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";

export async function GET() {
  try {
    const briefingEngine = new MorningBriefingEngine();
    const briefing = briefingEngine.generateBriefing(DEMO_PUBLIC_SHIFTS, 44.8, 3.2);

    return NextResponse.json(briefing);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate briefing", message: err.message },
      { status: 500 }
    );
  }
}
