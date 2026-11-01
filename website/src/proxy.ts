import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";
  const isPrefetch = request.headers.has("next-router-prefetch") || request.headers.get("purpose") === "prefetch";

  if (!maintenanceMode && isPrefetch) {
    return NextResponse.next();
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'self' https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'none'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  // Set MAINTENANCE_MODE=true to temporarily replace public pages with this response.
  if (maintenanceMode) {
    const maintenancePage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Temporarily unavailable | PM AZIMELU TECHNOLOGIES</title>
    <style nonce="${nonce}">
      * { box-sizing: border-box; }
      body { min-height: 100vh; margin: 0; display: grid; place-items: center; padding: 2rem; background: radial-gradient(ellipse at 50% 0%, #1b4c82 0, #0c2e56 54%, #071d38 100%); color: #102b4c; font-family: Arial, Helvetica, sans-serif; }
      main { width: min(100%, 44rem); padding: clamp(2rem, 7vw, 4.5rem); border: 1px solid rgba(255, 255, 255, .7); background: #fff; box-shadow: 0 2rem 7rem rgba(0, 0, 0, .28); }
      .brand-logo { display: block; width: min(100%, 18rem); height: auto; }
      .status { display: flex; align-items: center; gap: .65rem; margin: 3.5rem 0 1rem; color: #5d7188; font-size: .7rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
      .status::before { width: .55rem; height: .55rem; border-radius: 50%; background: #397bb7; content: ""; }
      h1 { margin: 0; color: #0b2545; font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 500; letter-spacing: -.06em; line-height: 1.02; }
      p { max-width: 32rem; margin: 1.4rem 0 0; color: #465d76; font-size: 1.05rem; line-height: 1.8; }
      .footer { margin-top: 3rem; padding-top: 1.25rem; border-top: 1px solid #d9e3ee; color: #5d7188; font-size: .75rem; letter-spacing: .08em; }
      @media (max-width: 480px) { body { padding: 1rem; } .status { margin-top: 2.5rem; } }
    </style>
  </head>
  <body>
    <main aria-labelledby="maintenance-title">
      <img class="brand-logo" src="/brand/PM%20AZIMELU%20TECH.PNG" width="720" height="360" alt="PM Azimelu Technologies" />
      <div class="status">WE'RE UNDER MAINTENANCE</div>
      <h1 id="maintenance-title">We'll be back shortly.</h1>
      <p>Our website is currently undergoing maintenance. We're working behind the scenes to improve your experience. We'll be back soon.</p>
      <p>Thank you for your patience.</p>
      <div class="footer">SECURE. CONNECT. PROTECT.</div>
    </main>
  </body>
</html>`;

    return new NextResponse(maintenancePage, {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "Retry-After": "3600",
        "X-Robots-Tag": "noindex, nofollow",
        "Content-Security-Policy": csp,
      },
    });
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: "/((?!api|_next|favicon.ico|brand/PM).*)",
};
