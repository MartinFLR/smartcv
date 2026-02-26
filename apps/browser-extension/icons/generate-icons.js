const fs = require('fs');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="24" fill="url(#bg)"/>
  <rect x="32" y="22" width="64" height="84" rx="6" fill="none" stroke="#2dd4bf" stroke-width="3"/>
  <rect x="32" y="22" width="64" height="20" rx="6" fill="#2dd4bf" opacity="0.2"/>
  <line x1="44" y1="56" x2="84" y2="56" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="68" x2="78" y2="68" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="80" x2="72" y2="80" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="92" x2="66" y2="92" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <circle cx="96" cy="96" r="20" fill="#2dd4bf"/>
  <path d="M89 96 l5 5 l9-9" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Write SVG file for reference
fs.writeFileSync(path.join(__dirname, 'icon.svg'), svg);
console.log('SVG icon generated');
