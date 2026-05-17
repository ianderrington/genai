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
          className="group rounded-xl p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 border border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f23]">
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <p className="text-sm leading-relaxed text-slate-400/70">{desc}</p>
          <span className="text-sm font-medium mt-auto text-indigo-400">Explore →</span>
        </Link>
      ))}
    </div>
  );
}
