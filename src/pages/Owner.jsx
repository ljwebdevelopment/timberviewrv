import { useState, useEffect } from 'react';
import { useSlots } from '../hooks/useSlots';
import { STATUS_COLORS } from '../data/slots';
import SEO from '../components/SEO';

// ─── Owner / Admin Page ───────────────────────────────────────────────────────
// Simple password-protected page for the park owner to manage slot availability.
//
// Password: timber2024
//   → Change this string below (OWNER_PASSWORD) to update the password.
//   → To add a real login system later, replace the password check with an
//     API call: POST /api/auth/login → receive a JWT token stored in localStorage.

const OWNER_PASSWORD = 'timber2024';
const AUTH_KEY       = 'tvpark_owner_auth';

const STATUS_ORDER = ['available', 'occupied', 'reserved'];

function nextStatus(current) {
  const idx = STATUS_ORDER.indexOf(current);
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
}

// ── SlotCard ─────────────────────────────────────────────────────────────────
function SlotCard({ slot, onSave }) {
  const [localStatus, setLocalStatus] = useState(slot.status);
  const [localNotes,  setLocalNotes]  = useState(slot.notes ?? '');
  const [saved,       setSaved]       = useState(false);

  // Keep in sync if parent updates (e.g., reset)
  useEffect(() => { setLocalStatus(slot.status); }, [slot.status]);
  useEffect(() => { setLocalNotes(slot.notes ?? ''); }, [slot.notes]);

  function handleSave() {
    onSave(slot.id, { status: localStatus, notes: localNotes });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const info = STATUS_COLORS[localStatus];

  return (
    <div
      className="bg-white rounded-2xl shadow-md border-4 p-5 flex flex-col gap-4"
      style={{ borderColor: info.bg }}
    >
      {/* Slot number */}
      <div className="flex items-center justify-between">
        <span className="font-heading font-bold text-3xl text-bark-dark">
          Site #{slot.id}
        </span>
        <span
          className="px-4 py-1.5 rounded-full text-base font-bold text-white shadow-sm"
          style={{ background: info.bg }}
        >
          {info.label}
        </span>
      </div>

      {/* Big toggle button */}
      <button
        onClick={() => setLocalStatus(s => nextStatus(s))}
        className="w-full py-4 rounded-xl text-white text-xl font-bold shadow
                   active:scale-95 transition-transform select-none"
        style={{ background: STATUS_COLORS[nextStatus(localStatus)].bg }}
      >
        Change to: {STATUS_COLORS[nextStatus(localStatus)].label}
      </button>

      {/* Notes */}
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-1">
          Notes (optional)
        </label>
        <textarea
          value={localNotes}
          onChange={e => setLocalNotes(e.target.value)}
          placeholder="e.g., John Smith · staying until Friday"
          className="w-full border-2 border-gray-200 rounded-xl p-3 text-base
                     resize-none focus:border-forest focus:outline-none"
          rows={2}
        />
      </div>

      {/* Save button + confirmation */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex-1 py-3 rounded-xl text-white text-lg font-bold bg-forest
                     hover:bg-forest-light active:scale-95 transition-all shadow"
        >
          Save Changes
        </button>
        {saved && (
          <span className="text-green-600 font-bold text-lg">✓ Saved!</span>
        )}
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw,    setPw]    = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === OWNER_PASSWORD) {
      if (remember) localStorage.setItem(AUTH_KEY, '1');
      onLogin();
    } else {
      setError('Wrong password. Try again.');
      setPw('');
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <img src="/TimberviewRVlogo.png" alt="Timber View RV Park logo"
               width="512" height="512"
               className="h-20 w-20 mx-auto rounded-full border-4 border-tan object-cover mb-3" />
          <h1 className="font-heading font-bold text-2xl text-bark-dark">Owner Login</h1>
          <p className="text-gray-500 text-sm mt-1">Timber View RV Park</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="owner-password" className="block text-base font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="owner-password"
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xl
                         focus:border-forest focus:outline-none"
              placeholder="Enter password"
              autoFocus
              aria-describedby={error ? 'owner-password-error' : undefined}
            />
            {error && <p id="owner-password-error" role="alert" className="text-red-500 text-sm mt-1 font-bold">{error}</p>}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={remember}
                   onChange={e => setRemember(e.target.checked)}
                   className="w-5 h-5 accent-forest" />
            <span className="text-base text-gray-600">Stay logged in on this device</span>
          </label>

          <button type="submit"
                  className="w-full bg-forest text-white text-xl font-bold py-4
                             rounded-xl hover:bg-forest-light transition-colors shadow">
            Sign In →
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Owner Page ───────────────────────────────────────────────────────────
export default function Owner() {
  const [authed, setAuthed] = useState(() => !!localStorage.getItem(AUTH_KEY));
  const { slots, updateSlot, resetAll } = useSlots();
  const [filter, setFilter] = useState('all');

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }

  if (!authed) {
    return (
      <>
        <SEO path="/owner" />
        <LoginScreen onLogin={() => setAuthed(true)} />
      </>
    );
  }

  const filtered = filter === 'all'
    ? slots
    : slots.filter(s => s.status === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <SEO path="/owner" />
      {/* Top bar */}
      <div className="bg-forest text-white px-4 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div>
          <div className="font-heading font-bold text-xl leading-tight">Owner Panel</div>
          <div className="text-tan text-xs">Timber View RV Park</div>
        </div>
        <button onClick={handleLogout}
                className="text-white/70 hover:text-white text-sm font-bold border
                           border-white/30 px-3 py-1.5 rounded-lg transition-colors">
          Log Out
        </button>
      </div>

      {/* Summary counts */}
      <div className="max-w-2xl mx-auto px-3 pt-5 pb-2 grid grid-cols-3 gap-3">
        {['available', 'occupied', 'reserved'].map(status => {
          const count = slots.filter(s => s.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(f => f === status ? 'all' : status)}
              className={`rounded-2xl py-4 flex flex-col items-center shadow transition-all
                         border-4 ${filter === status ? 'scale-105' : 'border-transparent'}`}
              style={{
                background: STATUS_COLORS[status].bg,
                borderColor: filter === status ? '#fff' : 'transparent',
              }}
            >
              <span className="text-white text-3xl font-extrabold">{count}</span>
              <span className="text-white/90 text-sm font-bold capitalize">{status}</span>
            </button>
          );
        })}
      </div>

      {/* Filter label */}
      <div className="max-w-2xl mx-auto px-3 pb-1">
        <p className="text-gray-500 text-sm text-center">
          {filter === 'all'
            ? `Showing all ${slots.length} sites`
            : `Showing ${filtered.length} ${filter} site${filtered.length !== 1 ? 's' : ''} — tap again to show all`}
        </p>
      </div>

      {/* Slot cards */}
      <div className="max-w-2xl mx-auto px-3 pb-24 pt-3 grid gap-4">
        {filtered.map(slot => (
          <SlotCard
            key={slot.id}
            slot={slot}
            onSave={(id, changes) => updateSlot(id, changes)}
          />
        ))}
      </div>

      {/* Reset all (hidden unless needed) */}
      <div className="max-w-2xl mx-auto px-3 pb-8 text-center">
        <details className="text-sm text-gray-400">
          <summary className="cursor-pointer hover:text-gray-600">Advanced</summary>
          <div className="mt-3">
            <button
              onClick={() => {
                if (window.confirm('This will set ALL sites back to Available. Are you sure?')) {
                  resetAll();
                }
              }}
              className="border border-red-300 text-red-400 hover:bg-red-50 px-4 py-2
                         rounded-lg text-sm transition-colors"
            >
              Reset all sites to Available
            </button>
          </div>
        </details>
      </div>
    </div>
  );
}
