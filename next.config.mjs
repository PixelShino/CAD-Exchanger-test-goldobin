/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CAD-Exchanger-test-goldobin',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/CAD-Exchanger-test-goldobin/',
  trailingSlash: true,
};

export default nextConfig;