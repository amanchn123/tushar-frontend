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
      
}

module.exports = nextConfig
