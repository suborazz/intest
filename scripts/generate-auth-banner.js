const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
  const mapSvgPath = path.join(publicImagesDir, 'Map.svg');
  
  let mapContent = '';
  if (fs.existsSync(mapSvgPath)) {
    const rawMap = fs.readFileSync(mapSvgPath, 'utf8');
    // Extract everything between <svg ...> and </svg>
    const match = rawMap.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (match && match[1]) {
      // Replace fill colors to emerald / mint
      mapContent = match[1].replace(/fill="#D9D9D9"/g, 'fill="#34d399"');
    }
  }

  const width = 1920;
  const height = 1080;

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Rich Emerald & Navy Tech Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#021f14" />
      <stop offset="25%" stop-color="#063b27" />
      <stop offset="60%" stop-color="#032519" />
      <stop offset="100%" stop-color="#01140c" />
    </linearGradient>

    <!-- Radial Volumetric Glows -->
    <radialGradient id="glowCenter" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.22" />
      <stop offset="45%" stop-color="#059669" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#021f14" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glowTopLeft" cx="15%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#021f14" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glowBottomRight" cx="85%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#059669" stop-opacity="0.25" />
      <stop offset="60%" stop-color="#047857" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#01140c" stop-opacity="0" />
    </radialGradient>

    <!-- Tech Grid Pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" stroke-width="0.7" stroke-opacity="0.07" />
      <circle cx="60" cy="0" r="1.5" fill="#34d399" fill-opacity="0.15" />
    </pattern>

    <!-- Glowing Filters -->
    <filter id="blurGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Background Layers -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#glowCenter)" />
  <rect width="${width}" height="${height}" fill="url(#glowTopLeft)" />
  <rect width="${width}" height="${height}" fill="url(#glowBottomRight)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- 2. Scaled Dotted World Map in Subtle Emerald Glow -->
  <g opacity="0.32" transform="translate(300, 216) scale(1)">
    ${mapContent}
  </g>

  <!-- 3. Global Orbital Geometries -->
  <ellipse cx="960" cy="540" rx="720" ry="300" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.2" stroke-dasharray="10 8" transform="rotate(-12 960 540)" />
  <ellipse cx="960" cy="540" rx="800" ry="340" stroke="#34d399" stroke-width="1" stroke-opacity="0.12" transform="rotate(22 960 540)" />
  <circle cx="960" cy="540" r="450" stroke="#10b981" stroke-width="1" stroke-opacity="0.12" stroke-dasharray="4 8" />
  <circle cx="960" cy="540" r="300" stroke="#059669" stroke-width="0.8" stroke-opacity="0.18" />

  <!-- 4. Interconnected International Flight & Internship Pathways -->
  <!-- London to New Delhi -->
  <path d="M 680 430 Q 880 290 1140 490" fill="none" stroke="#34d399" stroke-width="3" stroke-opacity="0.45" filter="url(#softGlow)" />
  <path d="M 680 430 Q 880 290 1140 490" fill="none" stroke="#a7f3d0" stroke-width="1.2" stroke-opacity="0.75" stroke-dasharray="6 8" />

  <!-- New York to Tokyo -->
  <path d="M 450 470 Q 980 160 1520 440" fill="none" stroke="#10b981" stroke-width="2.5" stroke-opacity="0.3" filter="url(#softGlow)" />

  <!-- Singapore to Sydney -->
  <path d="M 1280 580 Q 1420 700 1600 740" fill="none" stroke="#34d399" stroke-width="2" stroke-opacity="0.35" stroke-dasharray="5 7" />

  <!-- Dubai to Europe -->
  <path d="M 1040 520 Q 820 360 640 390" fill="none" stroke="#059669" stroke-width="2.2" stroke-opacity="0.35" />

  <!-- 5. Global Hub Pulsing Beacons -->
  <!-- New York -->
  <circle cx="450" cy="470" r="16" fill="#10b981" fill-opacity="0.2" filter="url(#blurGlow)" />
  <circle cx="450" cy="470" r="7" fill="#34d399" fill-opacity="0.75" />
  <circle cx="450" cy="470" r="3" fill="#ffffff" />

  <!-- London -->
  <circle cx="680" cy="430" r="18" fill="#10b981" fill-opacity="0.25" filter="url(#blurGlow)" />
  <circle cx="680" cy="430" r="8" fill="#34d399" fill-opacity="0.85" />
  <circle cx="680" cy="430" r="3.5" fill="#ffffff" />

  <!-- Dubai -->
  <circle cx="1040" cy="520" r="16" fill="#10b981" fill-opacity="0.25" filter="url(#blurGlow)" />
  <circle cx="1040" cy="520" r="7" fill="#34d399" fill-opacity="0.8" />
  <circle cx="1040" cy="520" r="3" fill="#ffffff" />

  <!-- New Delhi Hub -->
  <circle cx="1140" cy="490" r="28" fill="#10b981" fill-opacity="0.3" filter="url(#blurGlow)" />
  <circle cx="1140" cy="490" r="12" fill="#34d399" fill-opacity="0.95" />
  <circle cx="1140" cy="490" r="5" fill="#ffffff" />
  <circle cx="1140" cy="490" r="42" stroke="#34d399" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="4 4" />

  <!-- Singapore -->
  <circle cx="1280" cy="580" r="16" fill="#10b981" fill-opacity="0.25" filter="url(#blurGlow)" />
  <circle cx="1280" cy="580" r="7" fill="#34d399" fill-opacity="0.8" />
  <circle cx="1280" cy="580" r="3" fill="#ffffff" />

  <!-- Tokyo -->
  <circle cx="1520" cy="440" r="18" fill="#10b981" fill-opacity="0.25" filter="url(#blurGlow)" />
  <circle cx="1520" cy="440" r="8" fill="#34d399" fill-opacity="0.85" />
  <circle cx="1520" cy="440" r="3.5" fill="#ffffff" />

  <!-- 6. Stardust & Academic Constellation Points -->
  <g fill="#a7f3d0" fill-opacity="0.55">
    <circle cx="280" cy="220" r="2.5" />
    <circle cx="360" cy="170" r="2" />
    <circle cx="530" cy="280" r="3" />
    <circle cx="620" cy="210" r="2" />
    <circle cx="840" cy="180" r="2.5" />
    <circle cx="940" cy="250" r="2" />
    <circle cx="1220" cy="200" r="3" />
    <circle cx="1360" cy="260" r="2" />
    <circle cx="1480" cy="180" r="2.5" />
    <circle cx="1660" cy="280" r="3" />
    <circle cx="1740" cy="190" r="2" />
    
    <circle cx="260" cy="840" r="2.5" />
    <circle cx="410" cy="760" r="2" />
    <circle cx="610" cy="880" r="3" />
    <circle cx="780" cy="800" r="2" />
    <circle cx="950" cy="910" r="2.5" />
    <circle cx="1220" cy="840" r="3" />
    <circle cx="1410" cy="770" r="2" />
    <circle cx="1580" cy="860" r="2.5" />
    <circle cx="1720" cy="810" r="2" />
  </g>

  <g stroke="#34d399" stroke-width="0.8" stroke-opacity="0.22">
    <line x1="280" y1="220" x2="360" y2="170" />
    <line x1="360" y1="170" x2="530" y2="280" />
    <line x1="840" y1="180" x2="940" y2="250" />
    <line x1="1220" y1="200" x2="1360" y2="260" />
    <line x1="1480" y1="180" x2="1660" y2="280" />
    
    <line x1="260" y1="840" x2="410" y2="760" />
    <line x1="610" y1="880" x2="780" y2="800" />
    <line x1="1410" y1="770" x2="1580" y2="860" />
  </g>

  <!-- 7. Corner Architectural HUD Brackets -->
  <path d="M 60 120 L 60 60 L 120 60" fill="none" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" />
  <path d="M 60 960 L 60 1020 L 120 1020" fill="none" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" />
  <path d="M 1860 120 L 1860 60 L 1800 60" fill="none" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" />
  <path d="M 1860 960 L 1860 1020 L 1800 1020" fill="none" stroke="#10b981" stroke-width="2" stroke-opacity="0.3" />

  <!-- 8. Platform Labels -->
  <text x="80" y="85" fill="#34d399" fill-opacity="0.5" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2.5">INTERNATIONAL INSTITUTE OF INTERNSHIP</text>
  <text x="80" y="1000" fill="#34d399" fill-opacity="0.45" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="1.8">GLOBAL PLACEMENT &amp; RESEARCH NETWORK</text>
  <text x="1840" y="1000" text-anchor="end" fill="#34d399" fill-opacity="0.45" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="1.8">UGC 2024 &#8226; NEP 2020 COMPLIANT</text>
</svg>
`;

  const buffer = Buffer.from(svg);

  // Generate WebP
  await sharp(buffer)
    .webp({ quality: 95 })
    .toFile(path.join(publicImagesDir, 'auth-banner.webp'));

  // Generate PNG
  await sharp(buffer)
    .png({ quality: 95 })
    .toFile(path.join(publicImagesDir, 'auth-banner.png'));

  // Also update auth-bg.png
  await sharp(buffer)
    .png({ quality: 95 })
    .toFile(path.join(publicImagesDir, 'auth-bg.png'));

  // Clear Next.js image cache if exists
  const nextImageCache = path.join(__dirname, '..', '.next', 'cache', 'images');
  if (fs.existsSync(nextImageCache)) {
    fs.rmSync(nextImageCache, { recursive: true, force: true });
  }

  console.log('Successfully generated auth-banner.webp, auth-banner.png, and auth-bg.png with Map and Emerald theme!');
}

generate().catch(console.error);
