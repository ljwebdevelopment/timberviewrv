import { useState, useEffect } from 'react';
import { initialSlots } from '../data/slots';

const STORAGE_KEY = 'timberViewSlots';

// ─── useSlots ────────────────────────────────────────────────────────────────
// Reads/writes slot data from localStorage.
//
// TODO (backend): Replace localStorage calls below with your DB read/write:
//   - On mount: fetch('/api/slots') or supabase.from('slots').select()
//   - On update: fetch('/api/slots/:id', { method:'PATCH', body:... })
//     or supabase.from('slots').update(changes).eq('id', id)

export function useSlots() {
  const [slots, setSlots] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return initialSlots;
  });

  useEffect(() => {
    // TODO (backend): remove this localStorage write when using a real DB
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  function updateSlot(id, changes) {
    setSlots(prev =>
      prev.map(s => (s.id === id ? { ...s, ...changes } : s))
    );
  }

  function resetAll() {
    setSlots(initialSlots);
    localStorage.removeItem(STORAGE_KEY);
  }

  return { slots, updateSlot, resetAll };
}
