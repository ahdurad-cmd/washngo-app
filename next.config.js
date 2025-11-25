/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com", "images.pexels.com"],
  },
  i18n: {
    locales: ["da"],
    defaultLocale: "da"
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
module.exports = nextConfig
