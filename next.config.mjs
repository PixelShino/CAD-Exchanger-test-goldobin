/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  // basePath: '/CAD-Exchanger-test-goldobin',
  images: { unoptimized: true },

  // assetPrefix: '/CAD-Exchanger-test-goldobin/',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // "deploy": "gh-pages -d out --dotfiles"
};
export default nextConfig;
