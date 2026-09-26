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
  }
})
