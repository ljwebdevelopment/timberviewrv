import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white/80 pt-10 pb-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="font-heading text-white text-xl font-bold mb-2">Timber View RV Park</h3>
          <p className="text-sm leading-relaxed text-white/60">
            A quiet country escape just outside Tahlequah, Oklahoma. Family-owned and operated.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-tan font-bold mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            {[['/', 'Home'], ['/sites', 'RV Sites'], ['/amenities', 'Amenities'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-tan transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-tan font-bold mb-3 text-sm uppercase tracking-wider">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:9184577224" className="hover:text-tan transition-colors font-bold text-base">
                ☎ (918) 457-7224
              </a>
            </li>
            <li className="text-white/60">
              17611 S Rocky Top Ln<br />Tahlequah, OK 74464
            </li>
            <li className="text-white/60">Open daily · Close at 8 PM</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Timber View RV Park. All rights reserved.</span>
        <span>2 miles east of Tahlequah on Hwy 62</span>
      </div>
    </footer>
  );
}
