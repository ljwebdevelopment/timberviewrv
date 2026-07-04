import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParkMap from '../components/ParkMap';
import SEO from '../components/SEO';
import { useSlots } from '../hooks/useSlots';
import { STATUS_COLORS } from '../data/slots';
import { faq } from '../data/faq';
import { faqSchema } from '../lib/structuredData';

export default function Home() {
  const { slots } = useSlots();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const available = slots.filter(s => s.status === 'available').length;

  return (
    <div className="page-enter">
      <SEO path="/" jsonLd={faqSchema(faq)} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] max-h-[860px] flex items-end pb-16">
        <img
          src="/Assets/outsideTVRV.webp"
          alt="Timber View RV Park — quiet RV campground with full hookups near Tahlequah, Oklahoma"
          width="680"
          height="510"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient — darker at bottom so text pops, lighter in middle */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top, rgba(18,35,12,0.82) 0%, rgba(18,35,12,0.35) 45%, rgba(0,0,0,0.08) 100%)' }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <p className="text-tan uppercase tracking-[0.22em] text-sm font-bold mb-3">
            Tahlequah, Oklahoma · Est. family-owned
          </p>
          <h1 className="font-heading text-white font-bold leading-none mb-4"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            Timber View<br />RV Park
          </h1>
          <p className="text-white/70 text-lg mb-7 max-w-md leading-relaxed">
            2 miles east of Tahlequah on Hwy 62. Quiet country. Full hookups.
            Pets welcome.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a href="tel:9184577224"
               className="bg-bark hover:bg-bark-light text-white font-bold
                          text-lg px-7 py-3.5 rounded-lg transition-colors shadow-lg">
              (918) 457-7224
            </a>
            <Link to="/sites"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border
                             border-white/30 text-white font-semibold px-6 py-3.5
                             rounded-lg transition-colors text-base">
              View Sites &amp; Availability →
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-4">Open daily · Gates close at 8 PM</p>
        </div>
      </section>

      {/* ── Info strip ───────────────────────────────────────────── */}
      <section className="bg-forest-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap gap-x-10 gap-y-2 text-sm">
          {[
            ['Full Water & Electric Hookups', null],
            ['Wi-Fi Available', null],
            ['Pet-Friendly', null],
            ['Daily · Weekly · Monthly RV Sites', null],
            [available + ' Sites Available Now', 'text-green-400 font-bold'],
          ].map(([text, cls]) => (
            <span key={text} className={`flex items-center gap-2 ${cls ?? 'text-white/75'}`}>
              <span className="w-1 h-1 rounded-full bg-tan inline-block" />
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* Images — staggered, not a boring grid */}
          <div className="relative hidden lg:block">
            <img src="/Assets/rvsTVRV.webp" alt="RVs parked at full hookup sites at Timber View RV Park near Tahlequah, Oklahoma"
                 width="680" height="510" loading="lazy" decoding="async"
                 className="rounded-xl w-full h-72 object-cover shadow-lg" />
            <img src="/Assets/benchTVRV.webp" alt="Shaded seating area on the grounds of Timber View RV Park"
                 width="800" height="1067" loading="lazy" decoding="async"
                 className="absolute -bottom-8 -right-8 w-2/3 h-44 object-cover
                            rounded-xl shadow-xl border-4 border-cream" />
          </div>

          <div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-bark-dark leading-tight mb-5">
              A quiet spot in<br />
              <span className="text-forest">the Oklahoma hills</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Timber View RV Park is a small, family-run RV park sitting off Highway 62,
              just a few miles east of Tahlequah, Oklahoma. It's an honest, well-kept
              full hookup RV park where you can park your rig, plug in, and actually relax.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We're tucked into the wooded hills of Cherokee County, just minutes from
              downtown Tahlequah, the Illinois River, and Lake Tenkiller — making Timber
              View an easy home base for floating, fishing, or exploring Northeast Oklahoma.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We've got 20 numbered RV sites, full water and electric hookups, Wi-Fi, and
              room for your pets. Whether you're passing through or settling in for a
              long-term monthly stay, you're welcome here.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9184577224"
                 className="bg-bark hover:bg-bark-light text-white font-bold
                            px-6 py-3 rounded-lg transition-colors shadow-md text-base">
                Call Us
              </a>
              <Link to="/amenities"
                    className="text-forest border-2 border-forest hover:bg-forest
                               hover:text-white font-bold px-6 py-3 rounded-lg
                               transition-colors text-base">
                See Amenities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Site Map Section ─────────────────────────────────────── */}
      <section className="bg-parchment py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-bark font-bold uppercase text-xs tracking-widest mb-1">
                Park Layout
              </p>
              <h2 className="font-heading text-3xl font-bold text-bark-dark">
                Find Your RV Site
              </h2>
              <p className="text-gray-500 mt-1">
                {available} of 20 full hookup sites available · Click a site to see status
              </p>
            </div>
            <Link to="/sites"
                  className="text-forest font-bold text-sm hover:underline underline-offset-4 shrink-0">
              Full map &amp; details →
            </Link>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-md border border-tan/30 p-3 sm:p-5">
            <ParkMap slots={slots} onSlotClick={s => setSelectedSlot(s)} />
          </div>

          {/* Selected slot callout */}
          {selectedSlot && (
            <div className="mt-4 max-w-sm flex items-center justify-between gap-4
                            bg-white rounded-xl border-2 px-5 py-4 shadow-sm"
                 style={{ borderColor: STATUS_COLORS[selectedSlot.status]?.bg }}>
              <div>
                <p className="font-heading font-bold text-xl text-bark-dark">
                  Site #{selectedSlot.id}
                </p>
                <p className="text-sm font-bold" style={{ color: STATUS_COLORS[selectedSlot.status]?.bg }}>
                  {STATUS_COLORS[selectedSlot.status]?.label}
                </p>
              </div>
              {selectedSlot.status === 'available' ? (
                <a href="tel:9184577224"
                   className="bg-bark text-white font-bold text-sm px-4 py-2 rounded-lg
                              hover:bg-bark-light transition-colors shrink-0">
                  Call to Book
                </a>
              ) : (
                <span className="text-gray-400 text-xs text-right shrink-0">
                  Check back or<br />call for others
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Photos / feel ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5 items-start">
          <div className="md:col-span-2">
            <img src="/Assets/SunsetTVRV.webp" alt="Sunset over the Oklahoma hills at Timber View RV Park near Lake Tenkiller"
                 width="1200" height="850" loading="lazy" decoding="async"
                 className="w-full h-72 object-cover rounded-xl shadow-md" />
          </div>
          <div className="flex flex-col gap-5">
            <img src="/Assets/campingTVRV.webp" alt="RV and tent camping area at Timber View RV Park, Tahlequah, Oklahoma"
                 width="680" height="510" loading="lazy" decoding="async"
                 className="w-full h-[132px] object-cover rounded-xl shadow-md" />
            <div className="bg-forest rounded-xl p-6 text-white">
              <p className="font-heading font-bold text-xl leading-snug mb-3">
                "Give us a call — we'll get you set up."
              </p>
              <a href="tel:9184577224"
                 className="inline-block bg-white text-forest font-bold text-sm
                            px-5 py-2.5 rounded-lg hover:bg-tan transition-colors">
                (918) 457-7224
              </a>
              <p className="text-white/60 text-xs mt-2">Open daily · Close at 8 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore the Area ────────────────────────────────────── */}
      <section className="py-16 px-6 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <p className="text-bark font-bold uppercase text-xs tracking-widest mb-1">
            Cherokee County, Oklahoma
          </p>
          <h2 className="font-heading text-3xl font-bold text-bark-dark mb-5">
            Explore Tahlequah &amp; the Illinois River Valley
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 leading-relaxed">
            <p>
              <strong className="text-bark-dark">Illinois River floating &amp; fishing</strong> —
              a favorite Oklahoma float trip destination is just a short drive from the park,
              making Timber View a convenient RV camping base for river days.
            </p>
            <p>
              <strong className="text-bark-dark">Lake Tenkiller</strong> — boating, fishing, and
              scuba diving on the lake's clear water are all within easy reach of our
              Tahlequah RV sites.
            </p>
            <p>
              <strong className="text-bark-dark">Downtown Tahlequah</strong> — restaurants,
              shopping, and Cherokee Nation history are about 2 miles west on Hwy 62,
              so you can settle in at the park and still be close to town.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-bark-dark mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faq.map(({ question, answer }) => (
              <div key={question} className="card">
                <h3 className="font-heading font-bold text-bark-dark text-lg mb-2">
                  {question}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location strip ───────────────────────────────────────── */}
      <section className="bg-bark-dark text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center
                        justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-xl mb-0.5">How to Find Us</p>
            <p className="text-white/70 text-sm">
              17611 S Rocky Top Ln · Tahlequah, OK 74464
            </p>
            <p className="text-white/70 text-sm">2 miles east of Tahlequah on Hwy 62</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:9184577224"
               className="bg-bark hover:bg-bark-light text-white font-bold px-5 py-3
                          rounded-lg transition-colors text-sm">
              Call Us
            </a>
            <Link to="/contact"
                  className="border border-white/30 hover:bg-white/10 text-white
                             font-semibold px-5 py-3 rounded-lg transition-colors text-sm">
              Directions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
