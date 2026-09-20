<div align="center">

# 🌌 Akshay Singh Thakur — Portfolio

**Full-Stack / MERN Developer & AI Integration Enthusiast**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.7-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

<p align="center">
  A state-of-the-art developer portfolio engineered with <b>Next.js 16 App Router</b>, <b>React 19</b>, <b>Framer Motion</b>, and <b>Tailwind CSS</b>. Features dynamic animated SVG path scenes, interactive project showcases, rate-limited email delivery, and smooth micro-interactions.
</p>

[View Live Portfolio](https://thakurakshay.dev/) • [Explore Projects](#-featured-projects) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Featured Projects](#-featured-projects)
- [Tech Stack](#-tech-stack)
- [Architecture & Project Structure](#-architecture--project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development & Build Commands](#development--build-commands)
- [Deployment](#-deployment)
- [Security & Performance](#-security--performance)
- [Connect With Me](#-connect-with-me)
- [License](#-license)

---

## 🌟 Overview

This repository houses the source code for the personal portfolio of **Akshay Singh Thakur**. Designed and built from scratch, the platform demonstrates full-stack software engineering capabilities, modern frontend architecture, high-performance animations, and seamless AI integration.

The portfolio is structured across modular App Router pages with responsive navigation, fluid Lenis smooth scrolling, accessible motion preferences (`prefers-reduced-motion`), and serverless edge deployment capabilities on Cloudflare Workers via OpenNext.

---

## ✨ Key Features

### 🌌 Ambient Vector Motion & Path Physics
- **Ambient Floating Paths**: Deterministic animated SVG floating paths engineered with Framer Motion for high frame-rates across mobile and desktop devices with zero hydration delay.

### 💼 Interactive Project Showcases & Sandboxes
- **Live Interactive Demos**: Interactive sandboxes embedded directly in project views (including live interactive certificate generation for CredVault and rich UI preview toggles).
- **Comprehensive Case Studies**: Detailed breakdowns of architectural challenges, technical solutions, database decisions, and tech stacks for every featured project.

### 🛡️ Production-Grade Contact System
- **Serverless API Route**: Built on Next.js App Router (`/api/contact`) with the **Resend** email service.
- **Bot & Abuse Prevention**:
  - In-memory rate limiting (max 3 submissions per 10 minutes per IP).
  - Disposable email domain blocking via `disposable-email-domains`.
  - Strict input sanitization and HTML escaping to prevent XSS and injection attacks.
  - Client-side validation and responsive error/success feedback animations.

### ⚡ Fluid Micro-Interactions & Accessibility
- **Framer Motion Orchestration**: Staggered fades, 3D tilt cards, folding page transitions, and smooth hover state feedbacks.
- **Lenis Smooth Scrolling**: Decoupled momentum scrolling for a synchronized visual experience.
- **Reduced Motion Support**: Custom hooks (`useSafeReducedMotion`) respecting user system accessibility preferences.
- **SEO & Social Cards**: Optimized `robots.ts`, semantic HTML5 hierarchy, and OpenGraph-ready metadata.

---

## 🚀 Featured Projects

| Project | Description | Core Stack | Links |
| :--- | :--- | :--- | :--- |
| **Luminote** | AI-powered productivity workspace supporting rich text, canvas drawing pads, voice memos with Whisper transcription, vector-based semantic search (`pgvector`), and interactive LLM Q&A. | `Next.js`, `FastAPI`, `PostgreSQL`, `pgvector`, `Redis`, `Groq API` | [GitHub](https://github.com/Thakur-Akshay04/Luminote) |
| **ResuCraft** | AI resume builder & ATS optimizer with live split-screen print-ready PDF generation, Meta Llama-3 bullet rewriting, and keyword density auditing. | `React 19`, `Node.js`, `Express`, `Puppeteer`, `MongoDB`, `Llama-3` | [GitHub](https://github.com/Thakur-Akshay04/Res_AI) |
| **CredVault** | Decentralized academic certificate registry and verification system on Ethereum utilizing smart contracts for immutable, tamper-proof credential verification. | `React`, `Solidity`, `Ethers.js`, `Node.js`, `Express`, `MongoDB` | [GitHub](https://github.com/Thakur-Akshay04/CredValut) |

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/), PostCSS
- **Icons**: [Lucide React](https://lucide.dev/)

### Animation & Motion
- **Motion**: [Framer Motion 12](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)

### Backend & Cloud Services
- **Runtime**: Node.js & Edge Runtime
- **Email Delivery**: [Resend API](https://resend.com/)
- **Spam Filtering**: `disposable-email-domains`
- **Deployment Platform**: [Cloudflare Workers](https://workers.cloudflare.com/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) & [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

---

## 📂 Architecture & Project Structure

```text
portfolio/
├── app/
│   ├── about/              # About Me page & 3D Constellation Sphere
│   ├── api/
│   │   └── contact/        # Secure Resend email API route with rate-limiting
│   ├── contact/            # Interactive contact form page
│   ├── experience/         # Professional work experience & milestones
│   ├── projects/           # Showcase of full-stack & AI projects
│   ├── skills/             # Categorized technical skill matrix & docks
│   ├── globals.css         # Custom animations, scanlines & design tokens
│   ├── layout.tsx          # Root layout with Navbar, Footer & Lenis provider
│   ├── page.tsx            # Home / Hero landing page
│   └── robots.ts           # Dynamic SEO robots configuration
├── components/
│   ├── icons/              # Custom brand SVG icons & tech stack badges
│   ├── layout/             # Navbar, Footer, PageFoldWrapper & Headings
│   ├── sections/           # Section-specific components (Hero, Projects, Skills, etc.)
│   └── ui/                 # Reusable UI primitives (Buttons, Cards, Inputs)
├── constants/
│   └── data.ts             # Centralized portfolio data (Projects, Bio, Experience)
├── lib/
│   └── hooks.ts            # Custom React hooks (motion preference, window resize)
├── public/                 # Static assets, project mockups & illustrations
├── package.json            # Scripts & dependencies
├── tailwind.config.ts      # Tailwind design system configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Thakur-Akshay04/portfolio.git
   cd portfolio
   ```

2. Install project dependencies:
   ```bash
   pnpm install
   # or: npm install / yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Resend API Credentials
RESEND_API_KEY=your_resend_api_key_here

# Recipient Email Configuration
PERSONAL_EMAIL=your_email@example.com
NEXT_PUBLIC_PERSONAL_EMAIL=your_email@example.com

# Social & External Links
NEXT_PUBLIC_GITHUB_URL=https://github.com/Thakur-Akshay04
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile
NEXT_PUBLIC_RESUME_URL=https://drive.google.com/your-resume-link
```

### Development & Build Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the local development server at `http://localhost:3000` |
| `pnpm dev:webpack` | Starts the dev server utilizing Webpack fallback |
| `pnpm build` | Compiles the production build |
| `pnpm start` | Runs the compiled production server |
| `pnpm lint` | Runs ESLint analysis across the project |
| `pnpm build:cf` | Builds the Cloudflare Workers bundle with OpenNext |
| `pnpm deploy:cf` | Builds and deploys the portfolio to Cloudflare Workers via Wrangler |

---

## ☁️ Deployment

This portfolio is configured for dual-target deployment:

### 1. Cloudflare Workers (Edge Deployment)
The application leverages OpenNext Cloudflare adapter to run Next.js App Router on Cloudflare's global edge network:
```bash
pnpm deploy:cf
```

### 2. Vercel / Standard Node.js Hosting
Standard Next.js deployment supported natively with zero configuration:
```bash
pnpm build
```

---

## 🔒 Security & Performance

- **Zero Client Secrets**: All sensitive API keys (`RESEND_API_KEY`) remain strictly on the server-side runtime.
- **Input Sanitization**: User inputs are HTML-escaped and validated prior to email dispatch to prevent template and injection attacks.
- **Rate Limiting**: IP-based rate limiting safeguards against automated submission spam and DoS attempts.
- **Optimized Bundle Sizes**: Dynamic imports and lazy loading for heavy 3D canvases and visual effects.
- **Smooth 60FPS Animations**: Hardware-accelerated CSS transforms and lightweight WebGL rendering.

---

<div align="center">
  <sub>Crafted with "La pasión" by <b>Akshay Singh Thakur</b>.</sub>
</div>
