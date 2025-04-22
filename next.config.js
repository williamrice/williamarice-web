/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "williamarice-web.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "api.badgr.io",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.credly.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; script-src-elem 'self' 'unsafe-inline' https://cdn.credly.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; frame-src 'self' https://api.badgr.io https://www.credly.com https://www.google.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
