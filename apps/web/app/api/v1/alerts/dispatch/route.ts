import { NextResponse } from "next/server";
import { AlertDispatcher } from "@reachradar/analytics-engine";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import { AlertRule } from "@reachradar/domain";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { webhookUrl, channels = ["in_app", "email"] } = body;

    const dispatcher = new AlertDispatcher();
    const mockRule: AlertRule = {
      id: "rule-instant-dispatch",
      organizationId: "demo-org-1",
      channelId: null,
      name: "Immediate Platform Shift Dispatch",
      conditionType: "niche_shift_detected",
      thresholdValue: 60,
      surfaceFilter: "browse",
      channels,
      emailRecipients: ["team@reachradar.io"],
      webhookUrl: webhookUrl || null,
      cooldownHours: 6,
      lastTriggeredAt: null,
      isEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const results = await dispatcher.dispatchShiftAlert(mockRule, DEMO_PUBLIC_SHIFTS[0]);

    return NextResponse.json({
      success: true,
      shiftTitle: DEMO_PUBLIC_SHIFTS[0].title,
      dispatchedResults: results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Dispatch failed", message: err.message },
      { status: 500 }
    );
  }
}
