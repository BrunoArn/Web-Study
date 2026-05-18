/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      toRemotePattern(process.env.CMS_IMAGE_PATTERN)
    ]
  }
}

export default nextConfig;

function toRemotePattern(urlStrin) {
  const url = new URL(urlStrin)
  return (
    {
      protocol: url.protocol.slice(0, -1),
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
    }
  );
}