/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CAD-Exchanger-test-goldobin',
  images: { unoptimized: true },
  assetPrefix: '/CAD-Exchanger-test-goldobin/',
  trailingSlash: true,
  distDir: 'out',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
}