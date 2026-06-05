# 🚀 Akshay Singh Thakur - Portfolio Website

Welcome to the source code of my personal portfolio website. This is a highly interactive, responsive, and secure single-page application built on Next.js, React, and Tailwind CSS, featuring modern 3D visual experiences and micro-interactions.

---

## 🛠️ Tech Stack & Technologies

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Libraries**: React 18/19, Three.js (WebGL), `@react-three/fiber`, `@react-three/drei`
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Styling**: Tailwind CSS & Glassmorphism design tokens
- **Email Dispatch**: [Resend API](https://resend.com/)
- **Security & Speed**: Type-safe headers configuration (CSP, clickjacking prevention, X-Content-Type-Options, MIME sniffing disable, X-Powered-By hiding)

---

## ✨ Features

1. **3D WebGL Constellation**: An interactive 3D particle sphere in the About section that floats and wiggles smoothly on mouse movements.
2. **Animated Tech Dock**: A floating horizontal carousel of technology logos that wiggles and auto-cycles every 4.5 seconds.
3. **Interactive Project Showcase**:
   - Concrete, live-updating mockups for featured projects.
   - **CredVault Sandbox**: Interactive credentials mockup generator allowing users to enter custom student names/majors and cryptographically "secure" the certificate.
   - Detailed Case Study Modals with clean, unique tech stack lists (automatic filtering of duplicate logos).
4. **Secure Contact Form**:
   - Server-side rates limiting (maximum 3 emails per 10 minutes per IP).
   - Server-side input escaping to prevent HTML injection.
   - Client-side input validation.
   - Dynamic, banned interaction for the LinkedIn connection button.
5. **Robust Security Configuration**: Fully audited via OWASP ZAP scanner with zero unresolved high/medium vulnerabilities.

---

## ⚙️ Environment Configuration

To run this project locally, create a `.env.local` file in the root directory and add the following keys:

```env
RESEND_API_KEY=your_resend_api_key
PERSONAL_EMAIL=your_inbox_email_address
NEXT_PUBLIC_PERSONAL_EMAIL=your_inbox_email_address
```

---

## 💻 Getting Started

First, install the dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

Next, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📈 Commands Reference

- **Development Server**: `pnpm dev`
- **Production Build**: `pnpm build`
- **Production Start**: `pnpm start`
- **Type Checking (TypeScript)**: `npx tsc --noEmit`
- **Linter Check**: `pnpm lint`
