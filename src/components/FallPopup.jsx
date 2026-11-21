import { useEffect, useState } from 'react';

// ─── Seasonal fall / Thanksgiving greeting ─────────────────────────────────
//
// Shows once per browser session, only between SHOW_FROM and SHOW_UNTIL
// (month is 1-12, inclusive). To turn it off early, set ENABLED = false.
// To preview it any time of year, add ?fall to the URL.
const ENABLED = true;
const SHOW_FROM  = { month: 10, day: 15 };
const SHOW_UNTIL = { month: 11, day: 30 };
const STORAGE_KEY = 'tv-fall-popup-seen';

const LEAF_COLORS = ['#c2410c', '#d97706', '#b45309', '#9a3412', '#ca8a04', '#7c2d12'];

function inSeason(now = new Date()) {
  const md = (now.getMonth() + 1) * 100 + now.getDate();
  return md >= SHOW_FROM.month * 100 + SHOW_FROM.day &&
         md <= SHOW_UNTIL.month * 100 + SHOW_UNTIL.day;
}

function alreadySeen() {
  try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
}

function markSeen() {
  try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* storage blocked */ }
}

// Leaf positions are generated once so they don't reshuffle on re-render.
const LEAVES = Array.from({ length: 22 }, (_, i) => ({
  left: Math.random() * 100,
  size: 18 + Math.random() * 22,
  duration: 7 + Math.random() * 7,
  delay: -Math.random() * 14,
  sway: 30 + Math.random() * 60,
  color: LEAF_COLORS[i % LEAF_COLORS.length],
  maple: i % 3 !== 0,
}));

function MapleLeaf({ color }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <path
        fill={color}
        d="M32 2l5 12 8-4-2 12 10-3-4 9 9 4-12 7 3 6-12-2-2 10h-6l-2-10-12 2 3-6-12-7 9-4-4-9 10 3-2-12 8 4z"
      />
      <path stroke="#5b2a0d" strokeWidth="2" strokeLinecap="round" d="M32 30v32" />
    </svg>
  );
}

function OvalLeaf({ color }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <path fill={color} d="M32 4C48 16 52 36 32 56 12 36 16 16 32 4z" />
      <path stroke="#5b2a0d" strokeWidth="2" strokeLinecap="round" fill="none"
            d="M32 10v52M32 26l-8-6M32 26l8-6M32 38l-10-7M32 38l10-7" />
    </svg>
  );
}

function Turkey() {
  // Simple cartoon turkey — tail fan, body, head, wattle, little feet.
  const feathers = ['#9a3412', '#c2410c', '#d97706', '#ca8a04', '#d97706', '#c2410c', '#9a3412'];
  return (
    <svg viewBox="0 0 120 110" width="100%" height="100%" role="img" aria-label="A friendly turkey">
      {/* Tail feathers */}
      {feathers.map((c, i) => {
        const angle = -75 + i * 25;
        return (
          <ellipse key={i} cx="60" cy="28" rx="11" ry="28" fill={c}
                   stroke="#7c2d12" strokeWidth="1.5"
                   transform={`rotate(${angle} 60 58)`} />
        );
      })}
      {/* Feet */}
      <path d="M50 96l-4 10M50 96l0 11M50 96l4 10M70 96l-4 10M70 96l0 11M70 96l4 10"
            stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="60" cy="74" rx="26" ry="24" fill="#6b4226" stroke="#4a2c18" strokeWidth="2" />
      <ellipse cx="60" cy="80" rx="15" ry="13" fill="#8b5e3c" />
      {/* Head */}
      <circle cx="60" cy="46" r="13" fill="#8b5e3c" stroke="#4a2c18" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="55" cy="43" r="3.2" fill="#fff" />
      <circle cx="65" cy="43" r="3.2" fill="#fff" />
      <circle cx="55.6" cy="43.6" r="1.6" fill="#1f1f1f" />
      <circle cx="65.6" cy="43.6" r="1.6" fill="#1f1f1f" />
      {/* Beak */}
      <path d="M56 49l4 6 4-6z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
      {/* Wattle */}
      <path d="M61 53c3 2 3 8-1 10-3-2-2-7 1-10z" fill="#dc2626" />
    </svg>
  );
}

export default function FallPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has('fall');
    if (preview || (ENABLED && inSeason() && !alreadySeen())) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function close() {
    markSeen();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 fall-overlay"
      style={{ background: 'rgba(30, 20, 10, 0.55)' }}
      onClick={close}
    >
      {/* Falling leaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {LEAVES.map((l, i) => (
          <div
            key={i}
            className="fall-leaf"
            style={{
              left: `${l.left}%`,
              width: l.size,
              height: l.size,
              animationDuration: `${l.duration}s`,
              animationDelay: `${l.delay}s`,
              '--sway': `${l.sway}px`,
            }}
          >
            {l.maple ? <MapleLeaf color={l.color} /> : <OvalLeaf color={l.color} />}
          </div>
        ))}
      </div>

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fall-popup-title"
        className="relative w-full max-w-md rounded-2xl border-2 border-tan bg-cream shadow-2xl
                   mt-20 px-7 pt-8 pb-7 text-center fall-card"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full text-bark hover:bg-parchment
                     text-2xl leading-none transition-colors"
        >
          ×
        </button>

        {/* Turkey standing on top of the card */}
        <div className="absolute bottom-full left-5 -mb-3 w-24 h-24 sm:w-28 sm:h-28 fall-turkey">
          <Turkey />
        </div>

        <p className="text-orange-700 uppercase tracking-[0.2em] text-xs font-bold mb-2">
          🍂 Happy Fall, Y'all 🍂
        </p>
        <h2 id="fall-popup-title" className="font-heading text-2xl sm:text-3xl font-bold text-bark-dark leading-tight mb-3">
          Happy Thanksgiving<br />from <span className="whitespace-nowrap">Timber View RV Park</span>
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 text-balance">
          We're thankful for every guest who parks with us. Wishing you and yours
          a cozy, safe, and happy holiday season.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:9184577224" className="btn-phone justify-center">
            Call (918) 457-7224
          </a>
          <button type="button" onClick={close}
                  className="px-6 py-3 rounded-lg font-semibold text-bark border border-tan
                             hover:bg-parchment transition-colors">
            Thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
