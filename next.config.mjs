/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CAD-Exchanger-test-goldobin',
  images: { unoptimized: true },
  assetPrefix: 'https://pixelshino.github.io/CAD-Exchanger-test-goldobin',
  distDir: 'out',
};

export default nextConfig;