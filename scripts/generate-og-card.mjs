// Generates public/og-card.png (1200x630) social share card in the site palette.
// Run: node scripts/generate-og-card.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og-card.png');

const paper = '#f7f6f2';
const muted = '#b8c3bb';
const spruce = '#24422f';
const spruceDeep = '#18301f';
const amber = '#f0a81c';

const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${spruceDeep}"/>
      <stop offset="100%" stop-color="${spruce}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- amber accent bar down the left edge -->
  <rect x="0" y="0" width="14" height="630" fill="${amber}"/>

  <!-- soft amber glow, top-right -->
  <circle cx="1120" cy="90" r="220" fill="${amber}" opacity="0.06"/>

  <g font-family="${font}">
    <!-- wordmark -->
    <text x="80" y="118" fill="${paper}" font-size="30" font-weight="700"
          letter-spacing="6">CHRIS COLBORNE</text>

    <!-- headline -->
    <text x="76" y="300" fill="${paper}" font-size="104" font-weight="800">I build <tspan fill="${amber}">your thing</tspan>.</text>

    <!-- subline -->
    <text x="80" y="372" fill="${muted}" font-size="38" font-weight="500">Custom web apps &#183; dashboards &#183; AI tools</text>

    <!-- CTA pill -->
    <rect x="80" y="470" width="330" height="72" rx="36" fill="${amber}"/>
    <text x="245" y="516" fill="${spruceDeep}" font-size="30" font-weight="700"
          text-anchor="middle">Book a free call</text>

    <!-- location, bottom-right -->
    <text x="1120" y="516" fill="${muted}" font-size="30" font-weight="500"
          text-anchor="end">Brisbane, Australia</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
