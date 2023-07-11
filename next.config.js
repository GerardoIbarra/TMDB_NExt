/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["image.tmdb.org"],
  },
  nextConfig,
};
