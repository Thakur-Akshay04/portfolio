# 🚀 Akshay Singh Thakur - Portfolio Website

Welcome to the source code of my personal portfolio website. This is a highly interactive, responsive, and secure single-page application built on Next.js, React, and Tailwind CSS, featuring modern 3D visual experiences and micro-interactions.

---

## 🛠️ Tech Stack & Architecture

### 🌐 Frontend & UI Frameworks
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### 🎨 3D Graphics & Creative Motion
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis_Scroll-000000?style=for-the-badge&logo=scroll&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=feather&logoColor=white)

### ⚙️ Backend, Cloud & Deployment
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Resend](https://img.shields.io/badge/Resend_Email-000000?style=for-the-badge&logo=mailgun&logoColor=white)

### 🗄️ Databases & Tooling
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

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
