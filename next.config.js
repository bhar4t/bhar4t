const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
  webpack5: true,
  env: {
    PRE_TITLE: 'welcome to',
    TITLE: 'Webkoof.in',
  }
})
