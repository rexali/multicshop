/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
            {
                source: '/',
                destination: '/api/tenant',
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'very-deep-tech-server.onrender.com',
                port: '',
                pathname: '/uploads/**'
            }
        ],
        dangerouslyAllowSVG: true,
        domains: ['images.unsplash.com', 'placehold.co', 'very-deep-tech-server.onrender.com', 'localhost'],
    },
}

module.exports = nextConfig
