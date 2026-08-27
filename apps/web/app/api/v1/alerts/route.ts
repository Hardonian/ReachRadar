import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    alerts: [
      { id: "alt-1", name: "Global YouTube Weather > 60", isEnabled: true },
      { id: "alt-2", name: "Finance Shift Strong Signal", isEnabled: true },
    ],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      alert: {
        id: `alt-${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: { code: "INVALID_REQUEST", message: err.message } },
      { status: 400 }
    );
  }
}
