import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    reviews: {
      stale: 300,       // 5 mins: Client can serve old cache while fetching a fresh one
      revalidate: 900,  // 15 mins: The server will attempt to revalidate the data
      expire: 3600,     // 1 hour: Max lifetime. Cache is forcefully cleared after this
    },
    relatedProducts: {
        stale: 300,
      revalidate: 900,
      expire: 3600,
    }
  },
};

export default nextConfig;
