/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["interactivewallgallery.blob.core.windows.net"],
  },
  api: {
    responseLimit: "8mb",
  },
};

module.exports = nextConfig;
