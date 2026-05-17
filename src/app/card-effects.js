'use client';

// This script adds a glow effect to cards when hovering
export function initCardEffects() {
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('a.block');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  });
}

// Initialize the card effects when the component mounts
if (typeof window !== 'undefined') {
  initCardEffects();
  
  // Re-initialize when the route changes (for Next.js)
  document.addEventListener('nextjs:afterPageTransition', initCardEffects);
} 