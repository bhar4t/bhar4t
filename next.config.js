const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
  future: {
    webpack5: true,
  },
  env: {
    HELLO: 'Greet to Frontend'
  }
})
