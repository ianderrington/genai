'use client';

import Link from 'next/link';

const SECTIONS = [
  { href: '/Understanding', label: 'Understanding', desc: 'Foundations, architectures, agents, and the latest research.' },
  { href: '/Using', label: 'Using', desc: 'Practical guides, strategic deployment, and real-world patterns.' },
  { href: '/Managenai', label: 'ManaGen AI', desc: 'About the project, contributing, and the road ahead.' },
];

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SECTIONS.map(({ href, label, desc }) => (
        <Link key={href} href={href}
          className="group rounded-2xl p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
          style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.05)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)')}>
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>{desc}</p>
          <span className="text-sm font-medium mt-auto" style={{ color: '#818cf8' }}>Explore →</span>
        </Link>
      ))}
    </div>
  );
}
