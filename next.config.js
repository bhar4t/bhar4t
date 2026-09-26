const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  // Large, rarely-needed assets shouldn't be precached on every visit.
  publicExcludes: ['!noprecache/**/*', '!images/404.gif'],
})

module.exports = withPWA({
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    PRE_TITLE: 'welcome to',
    TITLE: 'Webkoof.in',
  },
  // Baseline hardening. A full Content-Security-Policy is deliberately deferred:
  // this app relies on inline scripts (theme boot, JSON-LD), next-pwa's SW registration,
  // and a Google Docs iframe embed (/resume) that all need careful live testing first.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
})
