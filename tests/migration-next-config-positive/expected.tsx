// TODO(tanstack-migrate): next.config semantics detected (rewrites, redirects, basePath); migrate these settings manually.
const nextConfig = {
  redirects: async () => [],
  rewrites: async () => [],
  basePath: "/app",
};

export default nextConfig;
