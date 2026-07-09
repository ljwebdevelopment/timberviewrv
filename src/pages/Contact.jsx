import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <div className="page-enter min-h-screen bg-cream">
      <SEO
        title="Contact & Directions"
        path="/contact"
        description="Get in touch with Timber View RV Park. Located at 17611 S Rocky Top Ln, Tahlequah, OK — 3 miles east of town on Hwy 62. Call (918) 457-7224."
      />
      {/* Header */}
      <section className="bg-forest py-12 px-4 text-center">
        <h1 className="font-heading text-white text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-tan text-lg">
          The easiest way to reach us is by phone — we'll help you find the right spot.
        </p>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Contact info */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-heading text-2xl font-bold text-bark-dark mb-4">
                Get In Touch
              </h2>

              {/* Phone */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-widest text-tan-dark font-bold mb-1">
                  Phone
                </p>
                <a href="tel:9184577224"
                   className="text-forest text-2xl font-bold hover:text-forest-light transition-colors">
                  (918) 457-7224
                </a>
                <p className="text-gray-500 text-sm mt-1">Open daily · Close at 8 PM</p>
              </div>

              <a href="tel:9184577224" className="btn-phone w-full justify-center text-lg py-4 mb-5">
                ☎ Call Now to Check Availability
              </a>

              {/* Address */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-widest text-tan-dark font-bold mb-1">
                  Address
                </p>
                <address className="not-italic text-gray-700 leading-relaxed">
                  17611 S Rocky Top Lane<br />
                  Tahlequah, OK 74464
                </address>
                <p className="text-gray-500 text-sm mt-1">
                  3 miles east of Tahlequah on Hwy 62
                </p>
              </div>

              {/* Hours */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-widest text-tan-dark font-bold mb-1">
                  Hours
                </p>
                <p className="text-gray-700">Open daily · Gates close at <strong>8 PM</strong></p>
              </div>

              {/* Corporate & crew stays */}
              <div className="pt-4 border-t border-tan/40">
                <p className="text-xs uppercase tracking-widest text-tan-dark font-bold mb-1">
                  Corporate &amp; Crew Stays
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Managing a crew or coordinating housing for employees? Call us about
                  block reservations and long-term rates — see our{' '}
                  <Link to="/extended-stay#companies" className="text-forest font-bold hover:underline">
                    Companies &amp; Employers
                  </Link>{' '}
                  page for details.
                </p>
              </div>
            </div>
          </div>

          {/* Map embed area */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-heading text-2xl font-bold text-bark-dark mb-4">
                Find Us
              </h2>
              {/* Google Maps embed — replace src with live embed URL from Google Maps */}
              <div className="rounded-xl overflow-hidden border border-tan/40 shadow-inner mb-4"
                   style={{ height: 300 }}>
                <iframe
                  title="Timber View RV Park location"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=17611+S+Rocky+Top+Ln,+Tahlequah,+OK+74464&output=embed"
                  className="w-full h-full border-0"
                />
              </div>
              <a
                href="https://maps.google.com/?q=17611+S+Rocky+Top+Ln,+Tahlequah,+OK+74464"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* Directions */}
            <div className="card bg-parchment border-tan/60">
              <h3 className="font-heading font-bold text-bark-dark text-lg mb-2">
                Directions
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                From downtown Tahlequah, head east on <strong>Hwy 62</strong> for approximately
                3 miles. Turn onto <strong>S Rocky Top Lane</strong> — the park will be on your
                right at <strong>17611</strong>. Look for the Timber View sign.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-bark py-10 px-4 text-center">
        <p className="text-white font-heading text-xl mb-1">Have a question?</p>
        <p className="text-tan/80 mb-4 text-sm">We're happy to help — just give us a call.</p>
        <a href="tel:9184577224"
           className="inline-flex items-center gap-2 bg-white text-bark font-bold
                      text-xl px-8 py-4 rounded-xl hover:bg-tan transition-colors shadow-lg">
          ☎ (918) 457-7224
        </a>
      </section>
    </div>
  );
}
