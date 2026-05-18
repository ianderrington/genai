import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'The Living Guide to Generative AI';
  const description = searchParams.get('description') || '';
  const section = searchParams.get('section') || '';

  const [fontBold, fontRegular] = await Promise.all([
    fetch(new URL('./Inter-Bold.woff', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('./Inter-Regular.woff', import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  // Truncate long text to fit the card
  const safeTitle = title.length > 72 ? title.slice(0, 70) + '…' : title;
  const safeDesc =
    description.length > 140 ? description.slice(0, 138) + '…' : description;

  // Constellation dots — fixed positions so the card looks the same every render
  const dots = [
    { x: 980, y: 60, r: 2, o: 0.6 },
    { x: 1050, y: 110, r: 1.5, o: 0.4 },
    { x: 1100, y: 50, r: 1, o: 0.5 },
    { x: 1140, y: 90, r: 2.5, o: 0.35 },
    { x: 1020, y: 160, r: 1.5, o: 0.45 },
    { x: 1080, y: 200, r: 1, o: 0.3 },
    { x: 1160, y: 150, r: 2, o: 0.5 },
    { x: 940, y: 140, r: 1.5, o: 0.3 },
    { x: 1120, y: 250, r: 1, o: 0.25 },
    { x: 50, y: 500, r: 1.5, o: 0.2 },
    { x: 80, y: 560, r: 1, o: 0.15 },
    { x: 120, y: 510, r: 2, o: 0.2 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0a0b1a',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'Inter',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 800,
            height: 800,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Constellation dots */}
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: d.x,
              top: d.y,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: '50%',
              background: `rgba(129,140,248,${d.o})`,
            }}
          />
        ))}

        {/* Top bar: site name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '40px 56px 0',
            gap: 12,
          }}
        >
          {/* Logo mark — stylised M */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: 'white',
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'rgba(165,180,252,0.9)',
              letterSpacing: '-0.01em',
            }}
          >
            ManaGen AI
          </span>

          {/* Section badge */}
          {section && (
            <div
              style={{
                marginLeft: 16,
                padding: '4px 14px',
                borderRadius: 20,
                border: '1px solid rgba(99,102,241,0.4)',
                background: 'rgba(99,102,241,0.1)',
                fontSize: 14,
                color: '#a5b4fc',
                display: 'flex',
              }}
            >
              {section}
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 56px 0',
            flex: 1,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: safeTitle.length > 45 ? 52 : 64,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 960,
            }}
          >
            {safeTitle}
          </div>

          {/* Description */}
          {safeDesc && (
            <div
              style={{
                marginTop: 28,
                fontSize: 24,
                fontWeight: 400,
                color: 'rgba(203,213,225,0.75)',
                lineHeight: 1.5,
                maxWidth: 880,
              }}
            >
              {safeDesc}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 56px 40px',
          }}
        >
          {/* Gradient accent line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #38bdf8 100%)',
            }}
          />

          <span
            style={{
              fontSize: 18,
              color: 'rgba(148,163,184,0.6)',
              fontWeight: 400,
            }}
          >
            managen.ai
          </span>

          <span
            style={{
              fontSize: 16,
              color: 'rgba(99,102,241,0.7)',
              fontWeight: 400,
            }}
          >
            The Living Guide to Generative AI
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
