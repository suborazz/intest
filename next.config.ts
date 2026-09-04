import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit reads its AFM font metric files off disk relative to its own
  // package directory at runtime. When bundled by Next.js, __dirname gets
  // rewritten and those reads 404 (ENOENT .../pdfkit/js/data/Helvetica.afm).
  // Marking it external keeps it loaded via plain `require` from
  // node_modules instead, where its relative paths resolve correctly.
  serverExternalPackages: ["pdfkit"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
