import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Giao thức (http hoặc https)
        hostname: 'fruitio.monamedia.net', // Hostname của link ảnh
        port: '', // Nếu không có port, để trống
        pathname: '/wp-content/uploads/**', // Đường dẫn con của ảnh
      },
    ],
  },
};

export default nextConfig;
