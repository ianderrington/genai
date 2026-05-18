'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'managen_lead_capture';
const SCROLL_THRESHOLD = 0.7;
const DELAY_MS = 3000; // 3s after threshold crossed

type StorageState = 'subscribed' | 'dismissed';

function getStorageState(): StorageState | null {
  try {
    return localStorage.getItem(STORAGE_KEY) as StorageState | null;
  } catch {
    return null;
  }
}

function setStorageState(state: StorageState) {
  try {
    localStorage.setItem(STORAGE_KEY, state);
  } catch {}
}

export default function LeadCapture() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (getStorageState()) return; // already dismissed or subscribed

    let timer: ReturnType<typeof setTimeout> | null = null;
    let triggered = false;

    const onScroll = () => {
      if (triggered) return;
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        triggered = true;
        timer = setTimeout(() => setVisible(true), DELAY_MS);
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [mounted]);

  const dismiss = useCallback(() => {
    setStorageState('dismissed');
    setVisible(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('subscribe failed');
      setStatus('success');
      setStorageState('subscribed');
      setTimeout(() => setVisible(false), 2500);
    } catch {
      setStatus('error');
    }
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Newsletter signup"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 60,
        width: 320,
        borderRadius: 16,
        background: '#13143a',
        border: '1px solid rgba(99,102,241,0.35)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
        padding: '20px 20px 18px',
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Close */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: 'absolute',
          top: 12,
          right: 14,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(148,163,184,0.5)',
          fontSize: 18,
          lineHeight: 1,
          padding: 2,
        }}
      >
        ×
      </button>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
          <p style={{ color: '#a5b4fc', fontWeight: 600, margin: 0 }}>You&apos;re in.</p>
          <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 13, marginTop: 4 }}>
            We&apos;ll send you a monthly digest of what&apos;s changed.
          </p>
        </div>
      ) : (
        <>
          <p style={{ color: 'white', fontWeight: 600, fontSize: 15, margin: '0 0 4px' }}>
            AI moves fast. Stay current.
          </p>
          <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 13, margin: '0 0 14px', lineHeight: 1.5 }}>
            Monthly digest of new models, techniques, and what changed in this guide.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: 8,
                padding: '9px 12px',
                color: 'white',
                fontSize: 14,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                border: 'none',
                borderRadius: 8,
                padding: '9px 0',
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
                cursor: status === 'loading' ? 'wait' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Subscribing…' : 'Keep me updated'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#f87171', fontSize: 12, margin: 0, textAlign: 'center' }}>
                Something went wrong — try again.
              </p>
            )}
          </form>
          <button
            onClick={dismiss}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(148,163,184,0.4)',
              fontSize: 12,
              marginTop: 10,
              display: 'block',
              width: '100%',
              textAlign: 'center',
            }}
          >
            No thanks
          </button>
        </>
      )}
    </div>
  );
}
