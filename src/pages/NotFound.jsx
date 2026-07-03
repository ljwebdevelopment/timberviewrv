import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="page-enter min-h-[70vh] flex items-center justify-center px-4 text-center">
      <SEO path="/404" />
      <div>
        <h1 className="font-heading text-bark-dark text-4xl font-bold mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Sorry, we couldn't find that page. Head back to the homepage or check out our RV
          sites and amenities.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/sites"
                className="text-forest border-2 border-forest hover:bg-forest
                           hover:text-white font-bold px-6 py-3 rounded-lg
                           transition-colors text-base">
            View RV Sites
          </Link>
        </div>
      </div>
    </div>
  );
}
