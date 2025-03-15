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
      {
        protocol: 'http', // Giao thức (http hoặc https)
        hostname: '116.104.51.101', // Hostname của link ảnh
        port: '8080', // Nếu không có port, để trống
        pathname: '/**', // Đường dẫn con của ảnh
      },
    ],
  },
};

export default nextConfig;
