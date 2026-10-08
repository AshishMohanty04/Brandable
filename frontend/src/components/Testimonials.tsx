import { Star, CheckCircle } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Pooja Sharma',
      city: 'Mumbai',
      tag: 'Verified Buyer',
      rating: 5,
      product: 'California Almonds (1kg)',
      text: 'The crunch of Nutritva almonds is genuinely unmatched. You can immediately tell they are fresh and not sitting on grocery shelves for months. No bitter almonds at all!',
    },
    {
      name: 'Rohan Deshmukh',
      city: 'Bengaluru',
      tag: 'Verified Buyer',
      rating: 5,
      product: 'Peri Peri Roasted Makhana',
      text: 'My go-to 4 PM office snack! Knowing there is zero palm oil and cooked in olive oil gives me peace of mind. The peri peri seasoning is wonderfully spicy and authentic.',
    },
    {
      name: 'Dr. Ananya Sen',
      city: 'Delhi NCR',
      tag: 'Nutritionist & Mother',
      rating: 5,
      product: '7-in-1 Super Seeds & Berries',
      text: 'I recommend Nutritva to all my clients looking for clean plant protein. No sugar syrup added to the berries, and the pumpkin seeds are perfectly toasted.',
    },
  ];

  return (
    <section style={{ padding: '60px 0', backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span style={{ color: 'var(--c-brand-gold)', fontSize: '0.825rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Customer Love
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--c-brand-dark)', marginTop: '6px' }}>
            Real Reviews From Real Snackers
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid var(--c-border)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', color: '#f59e0b' }}>
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} size={16} fill="#f59e0b" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      color: 'var(--c-brand-primary)',
                      backgroundColor: 'var(--c-brand-light)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle size={12} /> {r.tag}
                  </span>
                </div>

                <p style={{ fontSize: '0.925rem', color: 'var(--c-text-primary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '16px' }}>
                  "{r.text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '12px' }}>
                <div style={{ fontWeight: 700, color: 'var(--c-brand-dark)', fontSize: '0.95rem' }}>
                  {r.name} • <span style={{ color: 'var(--c-text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>{r.city}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--c-brand-gold)', fontWeight: 600, marginTop: '2px' }}>
                  Purchased: {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
