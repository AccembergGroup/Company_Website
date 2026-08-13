/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow real devices on the local network to access the dev server
  allowedDevOrigins: ['192.168.1.33'],
};

export default nextConfig;
