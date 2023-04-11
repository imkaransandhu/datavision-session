/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    domains: ["interactivewallgallery.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
