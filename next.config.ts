const nextConfig = {
  images: {
    domains: ["localhost"],
    minimumCacheTTL: 60,
    formats: ["image/webp", "image/avif"],
  },
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig

