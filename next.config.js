/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};

module.exports = nextConfig;
