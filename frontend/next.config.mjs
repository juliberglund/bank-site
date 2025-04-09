import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(), // Adjust 'src' to your project's actual directory
    };
    return config;
  },
};

export default nextConfig;
