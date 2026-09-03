import React from "react";

export function Win11Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.558L24 0v11.551H10.949V1.891zM0 12.449h9.75v9.451L0 20.551v-8.102zm10.949 0H24V24l-13.051-1.891v-9.66z" fill="#0078D4" />
    </svg>
  );
}

export function Win11FileExplorer({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M4 14C4 11.7909 5.79086 10 8 10H18.3431C19.404 10 20.4214 10.4214 21.1716 11.1716L24.8284 14.8284C25.5786 15.5786 26.596 16 27.6569 16H40C42.2091 16 44 17.7909 44 20V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V14Z" fill="#FFA000" />
      <path d="M4 22C4 19.7909 5.79086 18 8 18H40C42.2091 18 44 19.7909 44 22V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V22Z" fill="#FFCA28" />
      <rect x="10" y="24" width="28" height="12" rx="2" fill="#0288D1" opacity="0.85" />
      <rect x="13" y="27" width="22" height="6" rx="1" fill="#E1F5FE" />
    </svg>
  );
}

export function Win11Terminal({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect width="48" height="48" rx="10" fill="#242424" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#3D3D3D" strokeWidth="2" />
      <path d="M12 16L22 24L12 32" stroke="#4CC2FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="32" x2="36" y2="32" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Win11Edge({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="22" fill="url(#edgeGrad1)" />
      <path d="M24 6C14.0589 6 6 14.0589 6 24C6 29.5 8.5 34.5 12.5 37.5C14.5 39 18 41 22 41C30 41 38 35 38 27C38 21.5 34 18 29 18C23 18 19 23 19 27C19 30 21.5 32 24.5 32C28 32 30 30 30.5 29C29.5 32.5 25 35 21 34C15 32.5 13 26 15 20C17 14 23 9 31 10C37 10.75 41 15 41 20C41 12.268 33.3989 6 24 6Z" fill="url(#edgeGrad2)" />
      <defs>
        <linearGradient id="edgeGrad1" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0C84EB" />
          <stop offset="1" stopColor="#04B4B4" />
        </linearGradient>
        <linearGradient id="edgeGrad2" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#50E6FF" />
          <stop offset="0.5" stopColor="#0C84EB" />
          <stop offset="1" stopColor="#0B5394" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Win11Settings({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect width="48" height="48" rx="10" fill="#005A9E" />
      <circle cx="24" cy="24" r="8" fill="#FFFFFF" />
      <path d="M24 8V12M24 36V40M8 24H12M36 24H40M12.6863 12.6863L15.5147 15.5147M32.4853 32.4853L35.3137 35.3137M12.6863 35.3137L15.5147 32.4853M32.4853 15.5147L35.3137 12.6863" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Win11Mail({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect width="48" height="48" rx="10" fill="#0078D4" />
      <path d="M8 14C8 12.8954 8.89543 12 10 12H38C39.1046 12 40 12.8954 40 14V34C40 35.1046 39.1046 36 38 36H10C8.89543 36 8 35.1046 8 34V14Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M8 14L24 26L40 14" stroke="#0078D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Win11Notepad({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect width="48" height="48" rx="10" fill="#0078D4" />
      <rect x="10" y="8" width="28" height="32" rx="4" fill="#FFFFFF" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="#0078D4" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="22" x2="32" y2="22" stroke="#605E5C" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="28" x2="28" y2="28" stroke="#605E5C" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="34" x2="24" y2="34" stroke="#605E5C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Win11ThisPC({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="6" y="8" width="36" height="24" rx="3" fill="#2B579A" stroke="#4B6EAF" strokeWidth="2" />
      <rect x="9" y="11" width="30" height="18" fill="#4285F4" />
      <path d="M18 36H30M24 32V36" stroke="#C8C8C8" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="38" width="20" height="3" rx="1.5" fill="#8A8A8A" />
    </svg>
  );
}

export function Win11RecycleBin({ className = "w-6 h-6", isFull = false }: { className?: string; isFull?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="10" y="14" width="28" height="26" rx="4" fill="#E6E6E6" stroke="#9E9E9E" strokeWidth="2" />
      <rect x="8" y="10" width="32" height="4" rx="2" fill="#0078D4" />
      <line x1="17" y1="20" x2="17" y2="34" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="20" x2="24" y2="34" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
      <line x1="31" y1="20" x2="31" y2="34" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
      {isFull && (
        <circle cx="24" cy="27" r="5" fill="#4CAF50" opacity="0.7" />
      )}
    </svg>
  );
}

export function Win11Search({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="21" cy="21" r="13" stroke="#0078D4" strokeWidth="4" />
      <path d="M30.5 30.5L41 41" stroke="#0078D4" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Win11Widgets({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="6" y="8" width="16" height="14" rx="3" fill="#0078D4" />
      <rect x="26" y="8" width="16" height="20" rx="3" fill="#2B579A" />
      <rect x="6" y="26" width="16" height="14" rx="3" fill="#4285F4" />
      <rect x="26" y="32" width="16" height="8" rx="2" fill="#00B4FF" />
    </svg>
  );
}

export function Win11VSCode({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M35.6 4.3L13.7 20.8L5.2 14.3L2 15.9L9.5 24L2 32.1L5.2 33.7L13.7 27.2L35.6 43.7C37.5 45.1 40.2 44.5 41.4 42.6C41.8 42 42 41.3 42 40.6V7.4C42 5.2 40.2 3.4 38 3.4C37.1 3.4 36.3 3.7 35.6 4.3Z" fill="#007ACC" />
      <path d="M35.6 4.3L13.7 20.8L22 27L42 12V7.4C42 5.2 40.2 3.4 38 3.4C37.1 3.4 36.3 3.7 35.6 4.3Z" fill="#1F9CF0" />
      <path d="M35.6 43.7L13.7 27.2L22 21L42 36V40.6C42 42.8 40.2 44.6 38 44.6C37.1 44.6 36.3 44.3 35.6 43.7Z" fill="#0065A9" />
    </svg>
  );
}

export function Win11Calculator({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect width="48" height="48" rx="10" fill="#0078D4" />
      <rect x="10" y="8" width="28" height="10" rx="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="16" cy="24" r="2.5" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
      <circle cx="32" cy="24" r="2.5" fill="#FFB900" />
      <circle cx="16" cy="31" r="2.5" fill="#FFFFFF" />
      <circle cx="24" cy="31" r="2.5" fill="#FFFFFF" />
      <circle cx="32" cy="31" r="2.5" fill="#FFB900" />
      <circle cx="16" cy="38" r="2.5" fill="#FFFFFF" />
      <circle cx="24" cy="38" r="2.5" fill="#FFFFFF" />
      <circle cx="32" cy="38" r="2.5" fill="#E81123" />
    </svg>
  );
}
