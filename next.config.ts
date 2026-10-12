import type { NextConfig } from "next";

// Preview-Deployments (VERCEL_ENV=preview) leben unter Custom-Aliases wie
// domenic-snowy.vercel.app, für die Vercels Default-noindex NICHT greift.
// Wir blocken Indexing für alles außer Production, damit Preview-Inhalt
// nicht mit heilmasseur-domenic.at um SEO konkurriert.
const isProductionDeploy = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: true,
  logging: {
    browserToTerminal: true,
  },
  images: {
    qualities: [75, 85],
    // Profilbilder der Google-Bewertungen. Sie laufen über den Image-Optimizer
    // (/_next/image), damit der Browser keine Verbindung zu Google aufbaut.
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  async headers() {
    // Gelten überall. Kein X-Frame-Options/frame-ancestors, weil das
    // Pixelheld-Portal die Seite im iframe zeigt. "payment" bleibt erlaubt,
    // Stripe braucht es für Apple Pay und Google Pay. HSTS setzt Vercel selbst.
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
    ];
    return [
      {
        source: "/:path*",
        headers: isProductionDeploy
          ? securityHeaders
          : [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
