/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http', // Use 'http' if your local server is not using HTTPS
            hostname: 'localhost', // Your local server's hostname
            port: '3000', // The port where your local server is running
            pathname: '/images/**', // The path to your local images
          },
        ],
        domains: ['localhost'],
      },
      devServer: {
        host: '0.0.0.0', // Allow external network connections
        port: 3000, // Your preferred port
      },
}

module.exports = nextConfig
