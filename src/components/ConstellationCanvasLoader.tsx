'use client';

import dynamic from 'next/dynamic';

// ssr:false is only allowed inside Client Components
const ConstellationCanvas = dynamic(
  () => import('@/components/ConstellationCanvas'),
  { ssr: false }
);

export default function ConstellationCanvasLoader() {
  return <ConstellationCanvas />;
}
