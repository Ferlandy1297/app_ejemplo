/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // Desactiva el caché de webpack en modo desarrollo para prevenir 404s de chunks CSS en Hot Reloading
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
