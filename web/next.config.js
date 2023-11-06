/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  poweredByHeader: false,
  serverRuntimeConfig: {
    apiUrl:`${process.env.REACT_APP_SERVER_URL}/api`
    // apiUrl:`${process.env.REACT_APP_DOCKER_URL}/api`
  },
  publicRuntimeConfig: {
    apiUrl:`${process.env.REACT_APP_SERVER_URL}/api`
  },
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    APP_UPLOADS_URL: process.env.REACT_APP_UPLOADS_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.REACT_APP_SERVER_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.REACT_APP_UPLOADS_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
