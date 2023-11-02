/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', // Use 'http' if your local server is not using HTTPS
            hostname: 'dainikloksandarbh.com', // Your local server's hostname
            port: '3000', // The port where your local server is running
            pathname: '/images/**', // The path to your local images
          },
        ],
        domains: ['dainikloksandarbh.com'],
      },
      
}

module.exports = nextConfig