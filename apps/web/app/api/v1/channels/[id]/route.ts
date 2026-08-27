import { NextResponse } from "next/server";
import { DEMO_CHANNELS } from "@reachradar/providers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const channel = DEMO_CHANNELS.find((c) => c.id === id);

  if (!channel) {
    return NextResponse.json(
      { error: { code: "CHANNEL_NOT_FOUND", message: "Channel not found" } },
      { status: 404 }
    );
  }

  return NextResponse.json({ channel });
}
