import { NextResponse } from "next/server";
import { getEnvDiagnostics } from "@reachradar/config";

export async function GET() {
  const diagnostics = getEnvDiagnostics();
  return NextResponse.json({
    status: "ok",
    service: "ReachRadar API",
    version: "1.0.0",
    scoringVersion: "1.0.0",
    timestamp: new Date().toISOString(),
    diagnostics,
  });
}
