import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",           // generates server folder for Lambda
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;