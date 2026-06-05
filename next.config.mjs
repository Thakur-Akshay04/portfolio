/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self' https://api.web3forms.com;
  worker-src 'self' blob:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' https://api.web3forms.com;
  object-src 'none';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  // Fix: Content Security Policy (CSP) Header Not Set — Medium Risk
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  // Fix: Missing Anti-clickjacking Header — Medium Risk
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Fix: X-Content-Type-Options Header Missing — Low Risk
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Additional: XSS protection for older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Additional: Control referrer information
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Additional: Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig = {
  // Fix: Server Leaks Information via "X-Powered-By" — Low Risk
  poweredByHeader: false,

  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

