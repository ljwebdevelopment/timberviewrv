// ─── RV Slot Data ────────────────────────────────────────────────────────────
// status: 'available' | 'occupied' | 'reserved'
//
// To connect to Supabase/Firebase later:
//   1. Replace `initialSlots` load with a fetch from your DB
//   2. Replace localStorage writes in useSlots.js with DB writes
//   3. Add real-time listener if you want live updates

export const initialSlots = [
  { id: 1,  status: 'available', notes: '' },
  { id: 2,  status: 'available', notes: '' },
  { id: 3,  status: 'available', notes: '' },
  { id: 4,  status: 'available', notes: '' },
  { id: 5,  status: 'available', notes: '' },
  { id: 6,  status: 'available', notes: '' },
  { id: 7,  status: 'available', notes: '' },
  { id: 8,  status: 'available', notes: '' },
  { id: 9,  status: 'available', notes: '' },
  { id: 10, status: 'available', notes: '' },
  { id: 11, status: 'available', notes: '' },
  { id: 12, status: 'available', notes: '' },
  { id: 13, status: 'available', notes: '' },
  { id: 14, status: 'available', notes: '' },
  { id: 15, status: 'available', notes: '' },
  { id: 16, status: 'available', notes: '' },
  { id: 17, status: 'available', notes: '' },
  { id: 18, status: 'available', notes: '' },
  { id: 19, status: 'available', notes: '' },
  { id: 20, status: 'available', notes: '' },
];

export const STATUS_COLORS = {
  available: { bg: '#22c55e', text: '#fff', label: 'Available' },
  occupied:  { bg: '#ef4444', text: '#fff', label: 'Occupied'  },
  reserved:  { bg: '#f59e0b', text: '#fff', label: 'Reserved'  },
};
