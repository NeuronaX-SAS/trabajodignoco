/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://*.googleapis.com https://firestore.googleapis.com;
              connect-src 'self' https://*.googleapis.com https://*.firebaseio.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              frame-src 'self' https://*.tiktok.com https://www.tiktok.com/;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 