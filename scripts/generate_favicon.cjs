const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const inputPath = path.join(__dirname, '..', 'src', 'assets', 'mk_logo.png');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const transparentBuffer = Buffer.from(data);
  for (let i = 0; i < transparentBuffer.length; i += info.channels) {
    const r = transparentBuffer[i];
    const g = transparentBuffer[i + 1];
    const b = transparentBuffer[i + 2];
    // Background is light gray/silver gradient (r,g,b > 180)
    // Logo is dark gray (r,g,b < 120)
    if (r > 190 && g > 190 && b > 190) {
      transparentBuffer[i + 3] = 0; // Transparent
    } else if (r > 130 && g > 130 && b > 130) {
      // Anti-aliased boundary: feather alpha
      const alpha = Math.max(0, Math.min(255, Math.round((190 - r) / 60 * 255)));
      transparentBuffer[i + 3] = alpha;
    }
  }

  const transparentPng = await sharp(transparentBuffer, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .extract({ left: 60, top: 30, width: 165, height: 115 })
    .png()
    .toBuffer();

  // Save transparent logo asset
  await sharp(transparentPng).toFile(path.join(__dirname, '..', 'src', 'assets', 'mk_logo_transparent.png'));

  // 1. Square Favicon with original light silver gradient badge (matches user's image exactly)
  // Background matches original image gradient: #EFF0F1 (top) to #D3D6D9 (bottom)
  const svgFavicon = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F2F4F5" />
          <stop offset="100%" stop-color="#D0D4D8" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="96" fill="url(#silverBg)" />
    </svg>
  `;

  // Scale the transparent logo to sit centered with breathing room inside the 512x512 badge
  const scaledLogo = await sharp(transparentPng)
    .resize(360, 250, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const finalFavicon512 = await sharp(Buffer.from(svgFavicon))
    .composite([{ input: scaledLogo, gravity: 'center' }])
    .png()
    .toBuffer();

  // Save to public directory
  await sharp(finalFavicon512).toFile(path.join(publicDir, 'favicon.png'));
  await sharp(finalFavicon512).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(finalFavicon512).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(finalFavicon512).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(finalFavicon512).resize(192, 192).toFile(path.join(publicDir, 'favicon-192x192.png'));
  await sharp(finalFavicon512).resize(512, 512).toFile(path.join(publicDir, 'favicon-512x512.png'));

  // Also save a copy in src/assets/mk_favicon.png for bundling
  await sharp(finalFavicon512).toFile(path.join(__dirname, '..', 'src', 'assets', 'mk_favicon.png'));

  // Also create a pure favicon.ico
  await sharp(finalFavicon512).resize(32, 32).toFile(path.join(publicDir, 'favicon.ico'));

  console.log('Successfully generated all favicons and assets!');
}

main().catch(console.error);
