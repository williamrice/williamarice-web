/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
   
  },
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**/*',
      },{
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**/*',
      }
    ]
  }
};

module.exports = nextConfig;
