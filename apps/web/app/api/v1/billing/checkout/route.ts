import { NextResponse } from "next/server";
import { getServerEnv, getPlan } from "@reachradar/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId, billingPeriod = "monthly" } = body;
    const plan = getPlan(planId);
    const env = getServerEnv();

    // If Stripe is configured in live production:
    if (env.STRIPE_SECRET_KEY) {
      // Create live Stripe Checkout session here
      return NextResponse.json({
        url: `${env.NEXT_PUBLIC_APP_URL}/app/billing?session_id=mock_stripe_checkout_${Date.now()}`,
      });
    }

    // Graceful fallback for development / test mode:
    return NextResponse.json({
      url: `${env.NEXT_PUBLIC_APP_URL}/app?checkout=success&plan=${plan.id}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: { code: "INVALID_REQUEST", message: err.message || "Failed to create checkout" } },
      { status: 400 }
    );
  }
}
