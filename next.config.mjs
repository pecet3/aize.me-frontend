/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/ping',
                destination: 'http://127.0.0.1:8090/api/v1/auth/ping',
            },
            {
                source: '/api/v1/:path*',
                destination: 'http://127.0.0.1:8090/api/v1/:path*',
            },
            {
                source: '/api/v1/users/:path*',
                destination: 'http://127.0.0.1:8090/api/v1/users/:path*',
            }
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                pathname: '*',
            },
        ],
    },
    reactStrictMode: false,
};
export default nextConfig;
