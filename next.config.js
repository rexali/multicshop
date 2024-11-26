/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
       
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'very-deep-tech-server.onrender.com',
                port: '',
                pathname: '/uploads/**',
                search:''
            }
        ],
        dangerouslyAllowSVG: true,
        domains: ['images.unsplash.com', 'placehold.co', 'very-deep-tech-server.onrender.com', 'localhost'],
    },
}

module.exports = nextConfig
