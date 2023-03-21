/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["uploads-ssl.webflow.com"],
  },
  experimental: {
    appDir: true,
  },
};
