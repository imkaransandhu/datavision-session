/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["interactivewallgallery.blob.core.windows.net"],
     unoptimized: true,
  },
  api: {
    responseLimit: "20mb",
  },
};

module.exports = nextConfig;
