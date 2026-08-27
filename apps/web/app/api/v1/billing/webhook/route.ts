import { NextResponse } from "next/server";
import { getServerEnv } from "@reachradar/config";

export const runtime = "nodejs";

// In-memory / DB processed event store for idempotency
const processedEvents = new Set<string>();

export async function POST(request: Request) {
  try {
    const env = getServerEnv();
    const signature = request.headers.get("stripe-signature");
    const rawBody = await request.text();

    // If Stripe webhook secret is configured, verify signature
    if (env.STRIPE_WEBHOOK_SECRET && env.STRIPE_SECRET_KEY) {
      if (!signature) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
      }
      // Signature verification would be checked here using stripe.webhooks.constructEvent
    }

    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const eventId = event.id;
    if (!eventId) {
      return NextResponse.json({ error: "Missing event id" }, { status: 400 });
    }

    // Idempotency check: Ignore already processed events
    if (processedEvents.has(eventId)) {
      return NextResponse.json({ received: true, status: "duplicate_ignored" });
    }

    // Process event types
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data?.object;
        // Update database subscription record
        break;
      }
      case "checkout.session.completed": {
        const session = event.data?.object;
        // Fulfill checkout session
        break;
      }
      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        break;
      }
      default:
        break;
    }

    processedEvents.add(eventId);
    return NextResponse.json({ received: true, eventId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Webhook processing error" }, { status: 500 });
  }
}
