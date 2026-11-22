import type { NextConfig } from "next";

/**
 * Deployed as a fully static export.
 *
 * On a custom domain (demo.pulplabs.…) leave BASE_PATH unset.
 * On a GitHub Pages project URL (user.github.io/vvce-demo) set
 * BASE_PATH=/vvce-demo so assets and links resolve under the subpath.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
