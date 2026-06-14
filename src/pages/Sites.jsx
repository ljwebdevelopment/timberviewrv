import { useState } from 'react';
import ParkMap from '../components/ParkMap';
import { useSlots } from '../hooks/useSlots';
import { STATUS_COLORS } from '../data/slots';

export default function Sites() {
  const { slots } = useSlots();
  const [selected, setSelected] = useState(null);

  const counts = {
    available: slots.filter(s => s.status === 'available').length,
    occupied:  slots.filter(s => s.status === 'occupied').length,
    reserved:  slots.filter(s => s.status === 'reserved').length,
  };

  return (
    <div className="page-enter min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-forest py-12 px-4 text-center">
        <h1 className="font-heading text-white text-4xl font-bold mb-2">RV Sites</h1>
        <p className="text-tan text-lg">
          20 numbered sites · Click any site on the map for details
        </p>
      </section>

      {/* Status summary */}
      <section className="bg-parchment border-b border-tan/40 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 text-sm font-bold">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block"
                    style={{ background: STATUS_COLORS[status].bg }} />
              <span className="text-bark-dark capitalize">{status}:</span>
              <span className="text-forest font-extrabold text-base">{count}</span>
            </div>
          ))}
          <div className="text-gray-500 font-normal ml-2">
            · {counts.available} site{counts.available !== 1 ? 's' : ''} open right now
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card p-4 md:p-6">
            <ParkMap slots={slots} onSlotClick={slot => setSelected(slot)} />
          </div>
        </div>
      </section>

      {/* Selected slot detail */}
      {selected && (
        <section className="pb-8 px-4">
          <div className="max-w-md mx-auto card border-2"
               style={{ borderColor: STATUS_COLORS[selected.status].bg }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-2xl font-bold text-bark-dark">
                Site #{selected.id}
              </h2>
              <span className="px-3 py-1 rounded-full text-sm font-bold text-white"
                    style={{ background: STATUS_COLORS[selected.status].bg }}>
                {STATUS_COLORS[selected.status].label}
              </span>
            </div>
            {selected.notes && (
              <p className="text-gray-600 text-sm mb-4 italic">
                {selected.notes}
              </p>
            )}
            {selected.status === 'available' ? (
              <a href="tel:9184577224"
                 className="btn-phone w-full justify-center text-base py-3">
                ☎ Call to Reserve – (918) 457-7224
              </a>
            ) : (
              <p className="text-gray-500 text-sm text-center py-2">
                This site is currently {selected.status}. Call us to ask about other openings.
              </p>
            )}
            <button onClick={() => setSelected(null)}
                    className="mt-3 text-xs text-gray-400 hover:text-gray-600 w-full text-center underline">
              Close
            </button>
          </div>
        </section>
      )}

      {/* Call CTA */}
      <section className="bg-forest py-10 px-4 text-center">
        <p className="text-white font-heading text-xl mb-3">
          Not sure which site is right for you?
        </p>
        <a href="tel:9184577224"
           className="inline-flex items-center gap-2 bg-white text-forest
                      font-bold text-lg px-7 py-3 rounded-xl hover:bg-tan transition-colors shadow">
          ☎ (918) 457-7224
        </a>
        <p className="text-white/50 text-sm mt-2">Open daily · Close at 8 PM</p>
      </section>
    </div>
  );
}
