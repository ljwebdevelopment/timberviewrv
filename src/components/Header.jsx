import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/',          label: 'Home'      },
  { to: '/sites',     label: 'RV Sites'  },
  { to: '/amenities', label: 'Amenities' },
  { to: '/contact',   label: 'Contact'   },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-forest shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <img src="/TimberviewRVlogo.png" alt="Timber View RV Park"
               className="h-9 w-9 rounded-full object-cover border border-tan/60 shrink-0" />
          <div className="leading-tight">
            <div className="text-white font-heading font-bold text-base leading-none tracking-wide">
              Timber View RV Park
            </div>
            <div className="text-white/45 text-[10px] tracking-widest uppercase">
              Tahlequah, Oklahoma
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors duration-150 ${
                  isActive ? 'text-tan' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a href="tel:9184577224"
             className="ml-1 bg-bark hover:bg-bark-light text-white text-sm font-bold
                        px-4 py-2 rounded transition-colors">
            (918) 457-7224
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white/80 hover:text-white p-1.5 rounded"
                onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open
            ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="3" x2="19" y2="19"/><line x1="19" y1="3" x2="3" y2="19"/></svg>
            : <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"><line x1="2" y1="7" x2="20" y2="7"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="15" x2="20" y2="15"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-forest-dark border-t border-white/10">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `block px-5 py-3 text-sm font-semibold border-b border-white/10 ${
                  isActive ? 'text-tan' : 'text-white/75 hover:text-white'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <a href="tel:9184577224"
             className="block px-5 py-3 text-sm font-bold text-tan hover:text-white"
             onClick={() => setOpen(false)}>
            (918) 457-7224
          </a>
        </nav>
      )}
    </header>
  );
}
