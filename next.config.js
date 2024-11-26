/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost:3001',
                port: '',
                pathname: '/uploads/*'
            }
        ],
        dangerouslyAllowSVG: true,
        domains: ['images.unsplash.com', 'placehold.co', 'very-deep-tech-server.onrender.com', 'localhost'],
    },
}

module.exports = nextConfig
