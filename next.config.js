/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable for now to avoid double rendering issues
  images: {
    domains: ["images.unsplash.com"],
  },
  // Configure i18n with default locale
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
