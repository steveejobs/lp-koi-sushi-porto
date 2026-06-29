/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 86, 88, 90, 92],
  },
};

export default nextConfig;
