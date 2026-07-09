import { useEffect } from 'react';

export default function FAQ({ items, title = 'Frequently Asked Questions' }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [items]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title text-center mb-8">{title}</h2>
        <div className="space-y-3">
          {items.map(({ q, a }) => (
            <details key={q} className="card group">
              <summary className="font-heading font-bold text-bark-dark text-lg cursor-pointer
                                   list-none flex items-center justify-between gap-4">
                {q}
                <span className="text-forest text-xl shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-600 leading-relaxed mt-3">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
