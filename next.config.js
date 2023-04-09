/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["uploads-ssl.webflow.com", "upload.wikimedia.org"],
  },
  experimental: {
    appDir: true,
  },
};
