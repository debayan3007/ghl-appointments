/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    console.log("=====================================")
    console.log(JSON.stringify(defaultPathMap, null, 2));
    console.log("=====================================")
    console.log(JSON.stringify({ dev, dir, outDir, distDir, buildId }, null, 2))
    console.log("=====================================")
    return {
      '/': { page: '/' },
      '/appointments': { page: '/appointments' },
      // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  }
}

module.exports = nextConfig
