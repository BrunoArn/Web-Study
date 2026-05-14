/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      toRemotePattern(process.env.CMS_IMAGE_PATTERN)
    ]
  }
};

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