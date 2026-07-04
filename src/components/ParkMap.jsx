import { useState } from 'react';
import { STATUS_COLORS } from '../data/slots';

const MAP_COLORS = {
  available: { fill: '#4e8f42', stroke: '#3b6e31', label: 'Available' },
  occupied:  { fill: '#b03530', stroke: '#8a2924', label: 'Occupied'  },
  reserved:  { fill: '#c88500', stroke: '#9e6800', label: 'Reserved'  },
};

// ─── Layout — matches hand-drawn map exactly ─────────────────────────────────
//
//  [Rocky Top Lane] │ [1][2][3][4][5][6][7][8] │ [9]  │ [Dog Park / Open]
//                   │    (upper lot)            │ [10] │
//                   │   ← internal road →       │ [11] │
//                   │  OPEN │ [17][18][19][20]  │ [12] │
//                   │       │  (lower lot)      │ [13] │
//                   │       │                   │ [14] │
//                   │       │                   │ [15] │
//                   │       │                   │ [16] │
//  Hwy 62 East  ════════════════════════════════════════
//
//  Key: slot 9 begins at the right edge of slot 8 (same y level, continuous row)
//       slots 10–16 drop straight down from slot 9
//       no highway entrance — park is entered from Rocky Top Lane

// Slot 8 right edge  = 48 + 8*(66+2) - 2 = 48 + 526 = 574
// Column left edge   = 578  (4px gap from lot edge at 576)
// Column slot x      = 580, w=64 → right edge = 644
// Dog park starts at = 648

// Column: 16 is at the TOP (directly beside slot 8), 9 is at the BOTTOM (back of map)
// Slots 1-8 are h=46 (same as column) so the top line is flush — the "singular line"
// No backing area shown separately; drive aisle is right below the slots
// Lower lot starts immediately after the road strip, minimizing dead space

const SLOT_DEFS = [
  // ── Upper row: slots 1–8 — h=46 matches column so top edge is one clean line ──
  { id: 1, x:  48, y: 36, w: 66, h: 46 },
  { id: 2, x: 116, y: 36, w: 66, h: 46 },
  { id: 3, x: 184, y: 36, w: 66, h: 46 },
  { id: 4, x: 252, y: 36, w: 66, h: 46 },
  { id: 5, x: 320, y: 36, w: 66, h: 46 },
  { id: 6, x: 388, y: 36, w: 66, h: 46 },
  { id: 7, x: 456, y: 36, w: 66, h: 46 },
  { id: 8, x: 524, y: 36, w: 66, h: 46 }, // right edge x=590

  // ── Right column: 16 at top (beside slot 8), down to 9 at bottom ─────────
  // x=594 starts immediately right of slot 8 (590+4px gap)
  // h=46, gap=3 → step=49; 8 slots → total height = 8*46+7*3 = 389px (y=36–425)
  { id: 16, x: 594, y:  36, w: 60, h: 46 }, // top — "directly beside slot 8"
  { id: 15, x: 594, y:  85, w: 60, h: 46 },
  { id: 14, x: 594, y: 134, w: 60, h: 46 },
  { id: 13, x: 594, y: 183, w: 60, h: 46 },
  { id: 12, x: 594, y: 232, w: 60, h: 46 },
  { id: 11, x: 594, y: 281, w: 60, h: 46 },
  { id: 10, x: 594, y: 330, w: 60, h: 46 },
  { id: 9,  x: 594, y: 379, w: 60, h: 46 }, // bottom — "back of map ends at slot 9"

  // ── Lower section: slots 17–20 ────────────────────────────────────────────
  // Starts at y=120 (just below upper lot + thin road), tight to reduce dead space
  { id: 17, x: 238, y: 118, w: 80, h: 148 },
  { id: 18, x: 322, y: 118, w: 80, h: 148 },
  { id: 19, x: 406, y: 118, w: 80, h: 148 },
  { id: 20, x: 490, y: 118, w: 80, h: 148 },
];

function TreeGroup({ cx, cy, n = 3, r = 8, spread = 15 }) {
  const pts = [
    [0, 0], [-spread * 0.7, spread * 0.5], [spread * 0.65, spread * 0.55],
    [-spread * 0.15, -spread * 0.75], [spread * 0.85, -spread * 0.25],
    [spread * 0.35, spread * 1.05],
  ].slice(0, n);
  return (
    <g opacity="0.52">
      {pts.map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy}
                r={r + (i % 3 === 0 ? 0 : -1.5)}
                fill="#4a7a30" stroke="#366020" strokeWidth="0.7" />
      ))}
    </g>
  );
}

export default function ParkMap({ slots, onSlotClick, readOnly = false }) {
  const [hovered, setHovered] = useState(null);
  const slotMap = Object.fromEntries(slots.map(s => [s.id, s]));

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 1000 455"
        className="w-full block"
        style={{ minWidth: 340, fontFamily: "'Lato', sans-serif" }}
        aria-label="Timber View RV Park — site map"
      >
        <defs>
          <filter id="lotShad" x="-2%" y="-2%" width="104%" height="106%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#00000016" />
          </filter>
          <filter id="slotLift" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0000003a" />
          </filter>
          <filter id="photoShad" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#00000045" />
          </filter>
          <clipPath id="dogPhotoClip">
            <rect x="-50" y="-57" width="100" height="92" rx="2" />
          </clipPath>
        </defs>

        {/* ── Base ground ── */}
        <rect width="1000" height="455" fill="#ddd6bc" />
        {/* Grass */}
        <rect x="44" y="0" width="956" height="428" fill="#d2e4a2" />

        {/* ══ ROCKY TOP LANE ══ */}
        <rect x="0" y="0" width="44" height="455" fill="#bdb090" />
        <line x1="44" y1="0" x2="44" y2="455" stroke="#9c8e6e" strokeWidth="1" />
        <line x1="22" y1="0" x2="22" y2="428"
              stroke="#d4c88e" strokeWidth="1.5" strokeDasharray="18 11" opacity="0.6" />
        <text x="22" y="214" textAnchor="middle" fontSize="8.5" fontWeight="700"
              fill="#7a6038" letterSpacing="1.5" transform="rotate(-90 22 214)">
          ROCKY TOP LANE
        </text>

        {/* ══ HWY 62 EAST ══ */}
        <rect x="0" y="428" width="1000" height="27" fill="#bdb090" />
        <line x1="0" y1="428" x2="1000" y2="428" stroke="#9c8e6e" strokeWidth="1" />
        <line x1="0" y1="441" x2="1000" y2="441"
              stroke="#d4c88e" strokeWidth="1.5" strokeDasharray="24 14" opacity="0.6" />
        <text x="500" y="447" textAnchor="middle" fontSize="9" fontWeight="700"
              fill="#7a6038" letterSpacing="2.5">HWY 62 EAST</text>

        {/* ══ UPPER LOT ══  x=44–592, y=30–100
             Slots 1–8 at y=36–82 (h=46), drive aisle y=82–100. No backing area. */}
        <rect x="44" y="30" width="548" height="70" rx="2"
              fill="#d0c8aa" filter="url(#lotShad)" />
        {/* Drive aisle stripe */}
        <rect x="44" y="82" width="548" height="18" fill="#bfb78c" />
        <line x1="44"  y1="82"  x2="592" y2="82"  stroke="#a89e78" strokeWidth="0.8" />
        <line x1="44"  y1="100" x2="592" y2="100" stroke="#a89e78" strokeWidth="0.8" />
        {/* Slot dividers between 1–8, from lot top to aisle */}
        {[114, 182, 250, 318, 386, 454, 522].map(x => (
          <line key={x} x1={x} y1="30" x2={x} y2="100"
                stroke="#a89e78" strokeWidth="0.7" opacity="0.4" />
        ))}

        {/* ══ ENTRANCE ROAD ══  x=44–592, y=100–118  (thin strip from Rocky Top Ln) */}
        <rect x="44" y="100" width="548" height="18" fill="#b8b090" />
        <line x1="44"  y1="100" x2="592" y2="100" stroke="#9c8e6e" strokeWidth="0.8" />
        <line x1="44"  y1="118" x2="592" y2="118" stroke="#9c8e6e" strokeWidth="0.8" />
        <text x="128" y="112" textAnchor="middle" fontSize="7.5" fontWeight="700"
              fill="#6a5028" letterSpacing="0.8">ENTRANCE ▶</text>

        {/* ══ LOWER LOT ══  x=44–592, y=118–428 */}
        <rect x="44" y="118" width="548" height="310" rx="2"
              fill="#d0c8aa" filter="url(#lotShad)" />

        {/* OPEN area — left of lower lot */}
        <rect x="44" y="118" width="186" height="310" rx="2" fill="#c8c0a2" />
        <text x="137" y="278" textAnchor="middle" fontSize="11" fontWeight="700"
              fill="#7a6038" letterSpacing="1">OPEN</text>

        {/* Divider between open area and slots 17–20 */}
        <line x1="230" y1="118" x2="230" y2="428"
              stroke="#a89e78" strokeWidth="0.8" opacity="0.5" />

        {/* Slot dividers between 17–20  (x at right edge of each slot: 318, 402, 486) */}
        {[318, 402, 486].map(x => (
          <line key={x} x1={x} y1="118" x2={x} y2="266"
                stroke="#a89e78" strokeWidth="0.7" opacity="0.4" />
        ))}

        {/* ══ RIGHT COLUMN (16 top → 9 bottom) ══
             x=592–658, y=28–428  — single column, full map height */}
        <rect x="592" y="28" width="66" height="400" rx="2"
              fill="#d0c8aa" filter="url(#lotShad)" />
        {/* Row dividers at the gap between each slot (step=49, gap starts at y=82) */}
        {[83, 132, 181, 230, 279, 328, 377].map(y => (
          <line key={y} x1="592" y1={y} x2="658" y2={y}
                stroke="#a89e78" strokeWidth="0.7" opacity="0.4" />
        ))}

        {/* ══ DOG PARK / OPEN AREA ══
             x=662–1000, y=18–428 */}
        <rect x="662" y="18" width="338" height="410" rx="3"
              fill="#bcd898" filter="url(#lotShad)" />
        <rect x="662" y="18" width="338" height="24" rx="3" fill="#aac882" />
        <text x="831" y="34" textAnchor="middle" fontSize="8.5" fontWeight="800"
              fill="#2d5a1a" letterSpacing="1.2">DOG PARK</text>

        {/* Trees — all within dog park bounds (x=680–990, y=55–390) */}
        <TreeGroup cx={700} cy={80}  n={4} r={9}  spread={15} />
        <TreeGroup cx={820} cy={65}  n={3} r={8}  spread={14} />
        <TreeGroup cx={940} cy={85}  n={3} r={7}  spread={12} />
        <TreeGroup cx={695} cy={185} n={4} r={9}  spread={15} />
        <TreeGroup cx={840} cy={175} n={3} r={8}  spread={13} />
        <TreeGroup cx={955} cy={200} n={2} r={7}  spread={11} />
        <TreeGroup cx={710} cy={295} n={4} r={9}  spread={15} />
        <TreeGroup cx={855} cy={305} n={3} r={8}  spread={14} />
        <TreeGroup cx={955} cy={310} n={2} r={7}  spread={11} />
        <TreeGroup cx={760} cy={378} n={3} r={8}  spread={13} />
        <TreeGroup cx={910} cy={370} n={3} r={7}  spread={12} />

        {/* Camping & Storage label (lower dog park / bottom right zone) */}
        <text x="831" y="408" textAnchor="middle" fontSize="7.5" fontWeight="600"
              fill="#366020" letterSpacing="1" opacity="0.7">CAMPING &amp; STORAGE AREA</text>

        {/* Pinned photo — dog park resident */}
        <g transform="translate(845, 255) rotate(-4)" filter="url(#photoShad)">
          <rect x="-58" y="-65" width="116" height="130" rx="4" fill="#fff" />
          <image href="/Assets/dogTVRV.webp" x="-50" y="-57" width="100" height="92"
                 preserveAspectRatio="xMidYMid slice" clipPath="url(#dogPhotoClip)" />
          <rect x="-50" y="-57" width="100" height="92" rx="2" fill="none"
                stroke="#e8e2cf" strokeWidth="1" />
          <text x="0" y="55" textAnchor="middle" fontSize="9" fontWeight="700"
                fill="#5a4a2a" fontFamily="'Playfair Display', serif" fontStyle="italic">
            A park regular
          </text>
        </g>

        {/* ══ SLOT RECTANGLES ══ */}
        {SLOT_DEFS.map(def => {
          const slot  = slotMap[def.id];
          const color = MAP_COLORS[slot?.status ?? 'available'];
          const cx    = def.x + def.w / 2;
          const cy    = def.y + def.h / 2;
          const isHov = hovered === def.id;
          const fontSize = def.w >= 70 ? 20 : def.w >= 55 ? 16 : 13;

          return (
            <g key={def.id}
               onClick={() => !readOnly && onSlotClick?.(slot)}
               onMouseEnter={() => setHovered(def.id)}
               onMouseLeave={() => setHovered(null)}
               onFocus={() => setHovered(def.id)}
               onBlur={() => setHovered(null)}
               onKeyDown={e => {
                 if (!readOnly && (e.key === 'Enter' || e.key === ' ')) {
                   e.preventDefault();
                   onSlotClick?.(slot);
                 }
               }}
               tabIndex={readOnly ? undefined : 0}
               style={{ cursor: readOnly ? 'default' : 'pointer' }}
               filter={isHov ? 'url(#slotLift)' : undefined}
               role={readOnly ? 'img' : 'button'}
               aria-label={`Site ${def.id} — ${color.label}`}
            >
              <rect x={def.x} y={def.y} width={def.w} height={def.h}
                    fill={color.fill}
                    stroke={isHov ? '#fff' : color.stroke}
                    strokeWidth={isHov ? 2 : 1}
                    rx="3"
                    opacity={isHov ? 0.87 : 1} />
              {/* Top highlight */}
              <rect x={def.x + 1} y={def.y + 1} width={def.w - 2} height={5}
                    fill="rgba(255,255,255,0.17)" rx="2"
                    style={{ pointerEvents: 'none' }} />
              {/* Number */}
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                    fontSize={fontSize} fontWeight="800" fill="#fff"
                    style={{ userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.5px' }}>
                {def.id}
              </text>
            </g>
          );
        })}

        {/* ══ HOVER TOOLTIP ══ */}
        {hovered && !readOnly && (() => {
          const def   = SLOT_DEFS.find(d => d.id === hovered);
          const slot  = slotMap[hovered];
          const color = MAP_COLORS[slot?.status ?? 'available'];
          const above = def.y + def.h / 2 > 230;
          const tx    = Math.min(Math.max(def.x + def.w / 2, 80), 920);
          const ty    = above ? def.y - 6 : def.y + def.h + 6;
          return (
            <g pointerEvents="none">
              <rect x={tx - 52} y={above ? ty - 28 : ty}
                    width="104" height="26" rx="4" fill="#1a2e10" opacity="0.92" />
              <text x={tx} y={above ? ty - 15 : ty + 11}
                    textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">
                Site #{hovered}
              </text>
              <text x={tx} y={above ? ty - 3 : ty + 22}
                    textAnchor="middle" fontSize="8.5" fill={color.fill}>
                ● {color.label}
              </text>
            </g>
          );
        })()}

        {/* ══ LEGEND ══ — inside dog park, lower-left corner */}
        <g transform="translate(668, 398)">
          <rect x="-2" y="-14" width="218" height="22" rx="3"
                fill="#a8c878" opacity="0.7" />
          {Object.entries(MAP_COLORS).map(([status, c], i) => (
            <g key={status} transform={`translate(${i * 72}, 0)`}>
              <rect width="12" height="12" rx="2" fill={c.fill} y="-11" />
              <text x="16" y="0" fontSize="9.5" fill="#2a4a18" fontWeight="700">
                {c.label}
              </text>
            </g>
          ))}
        </g>

      </svg>
    </div>
  );
}
