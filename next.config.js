/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
