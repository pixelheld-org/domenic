import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const passThrough = () => NextResponse.next();

  const password = process.env.SITE_PASSWORD;

  // If no password is set, allow access (e.g. local dev)
  if (!password) {
    return passThrough();
  }

  const authCookie = request.cookies.get("site-auth")?.value;
  if (authCookie === password) {
    return passThrough();
  }

  const url = request.nextUrl.clone();

  // Handle password submission
  if (url.pathname === "/api/auth" && request.method === "POST") {
    return; // Let the route handler deal with it
  }

  // Serve a password form
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Passwort erforderlich</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, sans-serif; background: #0d4f4f; color: white; }
    .card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 1.5rem; padding: 3rem; max-width: 400px; width: 90%; text-align: center; backdrop-filter: blur(12px); }
    h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { font-size: 0.875rem; color: rgba(255,255,255,0.6); margin-bottom: 1.5rem; }
    input { width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); color: white; font-size: 1rem; outline: none; margin-bottom: 1rem; }
    input::placeholder { color: rgba(255,255,255,0.3); }
    input:focus { border-color: #f2a93b; }
    button { width: 100%; padding: 0.75rem; border-radius: 9999px; border: none; background: linear-gradient(135deg, #e8654a, #f2a93b); color: white; font-weight: 700; font-size: 1rem; cursor: pointer; }
    button:hover { opacity: 0.9; }
    .error { color: #e8654a; font-size: 0.875rem; margin-bottom: 1rem; display: none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Zugang geschützt</h1>
    <p>Diese Seite ist passwortgeschützt.</p>
    <div class="error" id="error">Falsches Passwort</div>
    <form id="form">
      <input type="password" name="password" placeholder="Passwort eingeben" autofocus required />
      <button type="submit">Zugang</button>
    </form>
  </div>
  <script>
    document.getElementById('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const pw = e.target.password.value;
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        document.getElementById('error').style.display = 'block';
      }
    });
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
