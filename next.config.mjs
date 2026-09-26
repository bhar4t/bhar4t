import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.js",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  // `glob`'s negation patterns (e.g. "!images/404.gif") aren't supported inline anymore
  // (removed in glob v6+), so precaching is scoped to an explicit allowlist of small,
  // universally-needed assets instead of "everything in public/ minus a few exceptions".
  // This deliberately excludes the large 404 illustration and all per-article cover images.
  globPublicPatterns: [
    "favicon.ico",
    "manifest.json",
    "browserconfig.xml",
    "fonts/**/*.woff2",
    "images/android-icon-*.png",
    "images/apple-icon-*.png",
    "images/favicon-*.png",
    "images/ms-icon-*.png",
  ],
  // We register the service worker ourselves (components/RegisterServiceWorker.js),
  // since it needs to work under the App Router.
  register: false,
});

export default withSerwist({
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    PRE_TITLE: "welcome to",
    TITLE: "Webkoof.in",
  },
  // Baseline hardening. A full Content-Security-Policy is deliberately deferred:
  // this app relies on inline scripts (theme boot, JSON-LD), a service worker,
  // and a Google Docs iframe embed (/resume) that all need careful live testing first.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
});
