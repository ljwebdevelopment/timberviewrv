import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { faq } from '../data/faq';

const benefits = [
  { icon: '🌲', title: 'Quiet Atmosphere', desc: 'Open countryside instead of a parking lot — a real place to unwind after a shift or a long day on the job.' },
  { icon: '⚡', title: 'Reliable Utilities', desc: 'Full water and electric hookups at every site, so your rig runs the way it should, every day.' },
  { icon: '📐', title: 'Spacious Lots', desc: 'Room for your rig, your truck, and your gear — no squeezing in like an apartment parking spot.' },
  { icon: '💵', title: 'Affordable vs. Hotels', desc: 'Weekly and monthly rates cost a fraction of an extended-stay hotel, with more space and more privacy.' },
  { icon: '🔒', title: 'More Privacy', desc: 'Your own site, your own space — no shared walls, hallways, or neighbors on the other side of a thin door.' },
  { icon: '🚚', title: 'Room for Work Trucks', desc: 'Easy parking for work trucks, trailers, and equipment, with simple in-and-out access from Hwy 62.' },
  { icon: '🛣️', title: 'Convenient Highway Access', desc: 'Right off Highway 62, 3 miles east of Tahlequah — an easy commute to job sites, hospitals, or the university.' },
  { icon: '📶', title: 'Wi-Fi Available', desc: 'Stay connected for remote work, video calls, or checking in after a long shift.' },
  { icon: '🤝', title: 'Long-Term Community', desc: 'A small, family-run park where long-term guests are treated like neighbors, not just a nightly rate.' },
];

export default function ExtendedStay() {
  return (
    <div className="page-enter min-h-screen bg-cream">
      <SEO
        title="Extended Stay, Travel Nurse & Workforce Housing"
        path="/extended-stay"
        description="Monthly RV sites near Tahlequah, Oklahoma for travel nurses, construction and utility crews, and companies needing employee housing. Affordable long-term stays with full hookups, close to Cherokee Nation W.W. Hastings Hospital and Northeastern State University. Call (918) 457-7224."
      />

      {/* Header */}
      <section className="bg-forest py-14 px-4 text-center">
        <p className="text-tan uppercase tracking-[0.2em] text-xs font-bold mb-3">
          Weekly · Monthly · Long-Term
        </p>
        <h1 className="font-heading text-white text-4xl md:text-5xl font-bold mb-4">
          Extended Stay &amp; Workforce Housing
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          Timber View RV Park isn't just a place to stop for the night. We're a quiet,
          affordable alternative to hotels and apartments for travel nurses, work crews,
          and anyone settling in near Tahlequah, Oklahoma for a temporary assignment or a
          long-term relocation.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <a href="tel:9184577224"
             className="bg-bark hover:bg-bark-light text-white font-bold px-6 py-3
                        rounded-lg transition-colors shadow-lg">
            ☎ (918) 457-7224
          </a>
          <a href="#companies"
             className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30
                        text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Corporate &amp; Crew Housing →
          </a>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-parchment border-b border-tan/40 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-bold text-forest">
          <a href="#travel-nurses" className="hover:underline underline-offset-4">Travel Nurses</a>
          <a href="#workforce" className="hover:underline underline-offset-4">Construction &amp; Utility Crews</a>
          <a href="#companies" className="hover:underline underline-offset-4">Companies &amp; Employers</a>
          <a href="#faq" className="hover:underline underline-offset-4">FAQ</a>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-bark font-bold uppercase text-xs tracking-widest mb-1">
              Corporate Housing Alternative
            </p>
            <h2 className="section-title">Why Working Professionals Choose Timber View</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(b => (
              <div key={b.title} className="card flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="text-4xl">{b.icon}</div>
                <h3 className="font-heading font-bold text-bark-dark text-lg">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Nurses */}
      <section id="travel-nurses" className="bg-parchment py-16 px-4 scroll-mt-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-bark font-bold uppercase text-xs tracking-widest mb-1">
              Healthcare Professionals
            </p>
            <h2 className="section-title mb-4">Housing for Travel Nurses</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Travel nurses and healthcare workers on assignment need somewhere quiet to
              recover between shifts — not a noisy hotel hallway. Timber View is a short
              drive from <strong>Cherokee Nation W.W. Hastings Hospital</strong> and other
              Tahlequah medical facilities, with peaceful surroundings and flexible stay
              lengths built around your contract.
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              {[
                'Close to local hospitals and clinics',
                'Comfortable, quiet accommodations after long shifts',
                'Flexible stay lengths — weekly or monthly',
                'Reliable Wi-Fi and full hookups',
                'Safe, well-kept surroundings',
                'More affordable than extended-stay hotels',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
            <a href="tel:9184577224" className="btn-phone">☎ Ask About Nurse Housing</a>
          </div>
          <img src="/Assets/SunsetTVRV.jpg" alt="Quiet evenings at Timber View RV Park"
               className="rounded-xl shadow-md w-full h-72 object-cover" />
        </div>
      </section>

      {/* Construction & Utility Workers */}
      <section id="workforce" className="py-16 px-4 scroll-mt-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img src="/Assets/outsideTVRV.png" alt="Room for work trucks and trailers"
               className="rounded-xl shadow-md w-full h-72 object-cover order-2 md:order-1" />
          <div className="order-1 md:order-2">
            <p className="text-bark font-bold uppercase text-xs tracking-widest mb-1">
              Workforce Housing
            </p>
            <h2 className="section-title mb-4">Construction, Utility &amp; Industrial Crews</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pipeline, fiber, wind and solar, road and bridge, linemen, surveyors, railroad,
              oil &amp; gas, FEMA and disaster response — if your crew is working a temporary
              job near Tahlequah, Timber View is built for it. Easy access off Hwy 62, plenty
              of room to park a work truck or trailer, and quiet evenings to actually rest up.
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              {[
                'Easy highway access, easy in and out',
                'Large, level sites for trucks and trailers',
                'Quiet evenings after a long day on site',
                'Flexible stays — days, weeks, or months',
                'Affordable monthly rates for crews',
                'Clean grounds, reliable utilities',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-forest font-bold mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
            <a href="tel:9184577224" className="btn-phone">☎ Ask About Crew Rates</a>
          </div>
        </div>
      </section>

      {/* Companies & Employers */}
      <section id="companies" className="bg-forest text-white py-16 px-4 scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-tan font-bold uppercase text-xs tracking-widest mb-2">
            Employers &amp; Contractors
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Companies &amp; Employers
          </h2>
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
            We work with companies that need accommodations for employees — block
            reservations across multiple RV sites, long-term arrangements, and flexible
            billing so your team can focus on the job instead of finding housing every few
            weeks.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-9 text-left">
            {[
              ['Block Reservations', 'Reserve several sites at once for a crew or relocating team.'],
              ['Long-Term Arrangements', 'Open-ended or fixed-term stays built around your project timeline.'],
              ['Flexible Billing', 'Simple communication to set up billing that works for your company.'],
            ].map(([t, d]) => (
              <div key={t} className="bg-white/10 rounded-xl p-5">
                <h3 className="font-heading font-bold text-lg mb-1.5">{t}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <a href="tel:9184577224"
             className="inline-flex items-center gap-2 bg-white text-forest font-bold
                        text-lg px-8 py-4 rounded-xl hover:bg-tan transition-colors shadow-lg">
            ☎ Contact Us for Corporate Stays
          </a>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="scroll-mt-16">
        <FAQ items={faq} />
      </div>

      {/* Closing CTA */}
      <section className="bg-bark-dark text-white py-10 px-4 text-center">
        <p className="font-heading text-xl mb-1">Need a site for a week, a month, or longer?</p>
        <p className="text-white/60 mb-4 text-sm">Give us a call — we'll help you find the right fit.</p>
        <a href="tel:9184577224"
           className="inline-flex items-center gap-2 bg-white text-bark font-bold
                      text-xl px-8 py-4 rounded-xl hover:bg-tan transition-colors shadow-lg">
          ☎ (918) 457-7224
        </a>
      </section>
    </div>
  );
}
