import { NextResponse } from "next/server";
import { ShiftSimulatorEngine } from "@reachradar/analytics-engine";
import { PackagingSimulationInput } from "@reachradar/domain";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PackagingSimulationInput;
    const {
      title,
      thumbnailDescription,
      durationMinutes = 10,
      niche = "finance",
      targetFormat = "long_form",
      primaryHookType = "curiosity_gap",
    } = body;

    if (!title || !thumbnailDescription) {
      return NextResponse.json(
        { error: "Title and thumbnailDescription are required" },
        { status: 400 }
      );
    }

    const simulator = new ShiftSimulatorEngine();
    const result = await simulator.simulatePackaging({
      title,
      thumbnailDescription,
      durationMinutes,
      niche,
      targetFormat,
      primaryHookType,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Simulation failed", message: err.message },
      { status: 500 }
    );
  }
}
