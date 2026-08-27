import { NextResponse } from "next/server";
import { getServerEnv } from "@reachradar/config";
import { YouTubeProvider } from "@reachradar/providers";
import { TokenEncryptionService } from "@reachradar/database";

export async function GET(request: Request) {
  const env = getServerEnv();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_APP_URL}/app/integrations?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_APP_URL}/app/integrations?error=missing_code`);
  }

  try {
    const provider = new YouTubeProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectUri: env.GOOGLE_OAUTH_REDIRECT_URI,
    });

    if (provider.isConfigured()) {
      const tokens = await provider.exchangeCode(code);
      if (tokens.refreshToken) {
        const cryptoService = new TokenEncryptionService(
          env.TOKEN_ENCRYPTION_KEY,
          env.TOKEN_ENCRYPTION_KEY_VERSION
        );
        const encrypted = cryptoService.encrypt(tokens.refreshToken);
        // Persist encrypted token in database
      }
    }

    return NextResponse.redirect(`${env.NEXT_PUBLIC_APP_URL}/app/channels?connected=true`);
  } catch (err: any) {
    return NextResponse.redirect(
      `${env.NEXT_PUBLIC_APP_URL}/app/integrations?error=${encodeURIComponent(err.message || "oauth_failed")}`
    );
  }
}
