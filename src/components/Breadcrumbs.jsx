import { Link } from 'react-router-dom';

// Visible breadcrumb trail — must mirror the BreadcrumbList JSON-LD emitted
// by <SEO breadcrumbs=... /> for the same route (Google requires structured
// data to match visible content).
export default function Breadcrumbs({ items }) {
  if (!items || items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-4 text-xs text-white/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-tan-light font-semibold">{item.name}</span>
              ) : (
                <Link to={item.path} className="hover:text-white transition-colors">{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
