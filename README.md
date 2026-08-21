# 🚀 Akshay Singh Thakur - Portfolio Website

Welcome to the source code of my personal portfolio website. This is a highly interactive, responsive, and secure single-page application built on Next.js, React, and Tailwind CSS, featuring modern 3D visual experiences and micro-interactions.

---

## 🛠️ Tech Stack & Technologies Used

### 🌐 Core & Framework
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### 🎨 Styling & UI
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=feather&logoColor=white)

### 🔮 3D Graphics & Animations
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis_Scroll-000000?style=for-the-badge&logo=scroll&logoColor=white)

### 🛡️ Services & Security
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)
![Cloudflare Turnstile](https://img.shields.io/badge/Cloudflare_Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

### 🚀 Deployment & DevOps
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![OpenNext](https://img.shields.io/badge/OpenNext-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

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
NEXT_PUBLIC_GITHUB_URL=your_github_profile_url
NEXT_PUBLIC_LINKEDIN_URL=your_linkedin_profile_url
NEXT_PUBLIC_RESUME_URL=your_resume_google_drive_link
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
