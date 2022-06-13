/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   env: {
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      MONGODB_URI: process.env.MONGODB_URI,
   },
};

module.exports = nextConfig;
