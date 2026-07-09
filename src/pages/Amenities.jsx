import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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
    desc:  'Stay connected when you need to. Wi-Fi is available at the park for guests — handy for remote work and video calls, too.',
  },
  {
    icon: '🚚',
    title: 'Room for Work Trucks',
    desc:  'Spacious sites with easy in-and-out access, plenty of room for work trucks, trailers, and equipment.',
  },
  {
    icon: '🐾',
    title: 'Dogs Welcome',
    desc:  'We love four-legged guests. Dogs are welcome at Timber View — we even have an open dog area on-site.',
  },
  {
    icon: '🌲',
    title: 'Quiet Country Setting',
    desc:  'No city noise. Just open Oklahoma sky, fresh air, and peaceful countryside surroundings.',
  },
  {
    icon: '📍',
    title: 'Easy to Find',
    desc:  'Just 3 miles east of Tahlequah on Highway 62. Easy in, easy out — great for first-timers.',
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
      <SEO
        title="Amenities"
        path="/amenities"
        description="Full water & electric hookups, Wi-Fi, dog-friendly sites, room for work trucks, and a quiet country setting. Explore the amenities at Timber View RV Park in Tahlequah, Oklahoma — ideal for RV travelers, travel nurses, and workforce crews alike."
      />
      {/* Header */}
      <section className="bg-forest py-12 px-4 text-center">
        <h1 className="font-heading text-white text-4xl font-bold mb-2">Amenities</h1>
        <p className="text-tan text-lg max-w-xl mx-auto">
          Everything you need for a comfortable stay in the Oklahoma countryside.
        </p>
      </section>

      {/* Amenity cards */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map(a => (
            <div key={a.title} className="card flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="text-4xl">{a.icon}</div>
              <h3 className="font-heading font-bold text-bark-dark text-xl">{a.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo highlight */}
      <section className="bg-parchment py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <img src="/Assets/rv'sTVRV.png" alt="RVs at Timber View"
               className="rounded-xl shadow-md w-full h-64 object-cover" />
          <div>
            <h2 className="section-title">Made for RV Living</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Timber View RV Park was built for folks who want a simple, comfortable place to
              park without the fuss. Whether you're here for a night or a few months, we keep
              things easy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Questions about hookups, rates, or long-term availability? The best way to reach
              us is by phone. We're happy to help — including travel nurses and work crews
              looking for <Link to="/extended-stay" className="text-forest font-bold hover:underline">extended stay housing</Link>.
            </p>
            <a href="tel:9184577224" className="btn-phone">
              ☎ (918) 457-7224
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
