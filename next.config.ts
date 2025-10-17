import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://*.googleapis.com https://*.gstatic.com",
              "connect-src 'self' https://*.googleapis.com https://*.google.com",
              "frame-src 'self' https://www.google.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
