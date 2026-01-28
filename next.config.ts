import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploads.onecompiler.io',
            },
        ],
    },
};

export default nextConfig;
