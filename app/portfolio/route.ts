import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PRIMARY_PORTFOLIO_URL = "https://shishir.click";
const FALLBACK_PORTFOLIO_URL = "https://shishir1290.netlify.app";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(PRIMARY_PORTFOLIO_URL, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);

    // If primary URL responds with any successful or non-server-error HTTP status
    if (res.status < 500) {
      return NextResponse.redirect(PRIMARY_PORTFOLIO_URL, 307);
    }
  } catch {
    // If shishir.click is down, timed out, or DNS fails, redirect to fallback
  }

  return NextResponse.redirect(FALLBACK_PORTFOLIO_URL, 307);
}
