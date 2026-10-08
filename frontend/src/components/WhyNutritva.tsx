import { Zap } from 'lucide-react';

export const WhyNutritva = () => {
  const perks = [
    {
      title: 'Superfast 10-Minute Delivery',
      desc: 'Packed fresh at neighborhood dark stores and delivered to your doorstep in 10-15 minutes.',
      icon: '⚡',
      badge: '10 Mins',
    },
    {
      title: '100% Zero Palm Oil Guarantee',
      desc: 'Our makhanas and dry fruits are gently roasted with olive oil. Absolutely 0% trans fat and 0% palm oil.',
      icon: '🍿',
      badge: 'Zero Palm Oil',
    },
    {
      title: 'Direct From 5,000+ Farmers',
      desc: 'No middleman markups. Sourced directly from verified growers in California, Kashmir, and Bihar.',
      icon: '🌾',
      badge: 'Farm Direct',
    },
    {
      title: 'Strict 21-Point Quality Check',
      desc: 'Aflatoxin tested, unbleached, and vacuum-sealed immediately so you get the freshest crunch every time.',
      icon: '🔬',
      badge: 'Lab Tested',
    },
  ];

  return (
    <section style={{ padding: '48px 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--blinkit-green)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <Zap size={14} fill="var(--blinkit-green)" />
            <span>THE QUICK-COMMERCE CRUNCH PROMISE</span>
          </div>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#1c1c1c', marginTop: '4px' }}>
            Why buy your snacks on Nutritva?
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.925rem', marginTop: '6px' }}>
            Delivering clean, honest dry fruits and roasted munchies faster than anyone else.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {perks.map((p, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--c-bg)',
                borderRadius: '16px',
                padding: '24px 20px',
                border: '1px solid var(--c-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    fontSize: '1.8rem',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--c-border)',
                  }}
                >
                  {p.icon}
                </div>
                <span
                  style={{
                    backgroundColor: 'var(--blinkit-green-light)',
                    color: 'var(--blinkit-green)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {p.badge}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '6px' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
