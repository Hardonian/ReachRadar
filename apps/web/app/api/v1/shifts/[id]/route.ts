import { NextResponse } from "next/server";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const shift = DEMO_PUBLIC_SHIFTS.find((s) => s.id === id || s.slug === id);

  if (!shift) {
    return NextResponse.json(
      { error: { code: "SHIFT_NOT_FOUND", message: "Shift not found" } },
      { status: 404 }
    );
  }

  return NextResponse.json({ shift });
}
