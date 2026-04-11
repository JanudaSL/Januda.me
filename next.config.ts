/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      // Medium
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
      { protocol: "https", hostname: "*.medium.com" },
      // ImageKit & Unsplash
      { protocol: "https", hostname: "ik.imagekit.io", port: "", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
      // Avatars
      { protocol: "https", hostname: "www.gravatar.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "ui-avatars.com", port: "", pathname: "/**" },
      // Google
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "lh4.googleusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "lh5.googleusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "lh6.googleusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "googleusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "*.googleusercontent.com", port: "", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;