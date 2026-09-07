import sharp from 'sharp'

/**
 * Generates a soft gradient placeholder so seeded campaigns have real image
 * files without shipping binaries in the repo. Replace via the admin UI.
 */
export async function makePlaceholderImage(initials: string, hue: number): Promise<Buffer> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue}, 32%, 26%)"/>
        <stop offset="100%" stop-color="hsl(${hue + 18}, 38%, 12%)"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="1200" fill="url(#g)"/>
    <circle cx="800" cy="520" r="230" fill="rgba(217,169,78,0.12)"/>
    <text x="800" y="600" font-family="Georgia, serif" font-size="220"
          fill="rgba(246,221,164,0.85)" text-anchor="middle">${initials}</text>
  </svg>`

  return sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toBuffer()
}
