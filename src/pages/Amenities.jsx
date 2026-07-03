import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getPageMeta } from '../seoConfig';

const amenities = [
  {
    icon: '💧',
    title: 'Water Hookups',
    desc:  'Full water hookups available at every site. Stay connected to the essentials without any hassle.',
  },
  {
    icon: '⚡',
    title: 'Electric Hookups',
    desc:  'Power up your rig. We offer electric service so you can run your AC, appliances, and devices comfortably.',
  },
  {
    icon: '📶',
    title: 'Wi-Fi Available',
    desc:  'Stay connected when you need to. Wi-Fi is available at the park for guests.',
  },
  {
    icon: '🐾',
    title: 'Pets Welcome',
    desc:  'We love four-legged guests. Pets are welcome at Timber View — we even have an open pet area on-site.',
  },
  {
    icon: '🌲',
    title: 'Quiet Country Setting',
    desc:  'No city noise. Just open Oklahoma sky, fresh air, and peaceful countryside surroundings.',
  },
  {
    icon: '📍',
    title: 'Easy to Find',
    desc:  'Just 2 miles east of Tahlequah on Highway 62. Easy in, easy out — great for first-timers.',
  },
  {
    icon: '📅',
    title: 'Flexible Stay Options',
    desc:  'Daily, weekly, and monthly stays available. Short trip or long-term — we can work with you.',
  },
  {
    icon: '🏕️',
    title: 'Camping & Storage Area',
    desc:  'Additional camping and storage space available on the property for select guests.',
  },
];

export default function Amenities() {
  return (
    <div className="page-enter min-h-screen bg-cream">
      <SEO path="/amenities" />
      {/* Header */}
      <section className="bg-forest pb-12 px-4 text-center">
        <Breadcrumbs items={getPageMeta('/amenities').breadcrumbs} />
        <div className="pt-8">
          <h1 className="font-heading text-white text-4xl font-bold mb-2">Amenities</h1>
          <p className="text-tan-light text-lg max-w-xl mx-auto">
            Everything you need for a comfortable stay at our full hookup RV park in the
            Oklahoma countryside.
          </p>
        </div>
      </section>

      {/* Amenity cards */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="sr-only">RV Park Amenities in Tahlequah, Oklahoma</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map(a => (
            <div key={a.title} className="card flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="text-4xl">{a.icon}</div>
              <h3 className="font-heading font-bold text-bark-dark text-xl">{a.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{a.desc}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Photo highlight */}
      <section className="bg-parchment py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <img src="/Assets/rvsTVRV.webp" alt="RVs parked at Timber View RV Park's full hookup sites near Tahlequah, Oklahoma"
               width="680" height="510" loading="lazy" decoding="async"
               className="rounded-xl shadow-md w-full h-64 object-cover" />
          <div>
            <h3 className="section-title">Made for RV Living</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Timber View RV Park was built for folks who want a simple, comfortable full
              hookup RV park to park at without the fuss. Whether you're here for a night or
              a long-term monthly stay, we keep things easy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Questions about hookups, rates, or long-term availability? The best way to reach
              us is by phone. We're happy to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9184577224" className="btn-phone">
                ☎ (918) 457-7224
              </a>
              <Link to="/sites"
                    className="text-forest border-2 border-forest hover:bg-forest
                               hover:text-white font-bold px-6 py-3 rounded-lg
                               transition-colors text-base inline-flex items-center">
                Check Live Site Availability
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
