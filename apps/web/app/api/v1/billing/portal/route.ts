import { NextResponse } from "next/server";
import { getServerEnv } from "@reachradar/config";

export async function POST() {
  const env = getServerEnv();

  if (env.STRIPE_SECRET_KEY) {
    // Return live customer portal URL
    return NextResponse.json({
      url: `${env.NEXT_PUBLIC_APP_URL}/app/billing?portal=live`,
    });
  }

  // Graceful fallback:
  return NextResponse.json({
    url: `${env.NEXT_PUBLIC_APP_URL}/app/billing`,
  });
}
