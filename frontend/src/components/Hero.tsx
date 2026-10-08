import { useState } from 'react';
import { ArrowRight, Flame, Star, Check } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreMakhana: () => void;
}

export const Hero = ({ onShopNow, onExploreMakhana }: HeroProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const heroTabs = [
    {
      title: 'Farm-Fresh Almonds & Roasted Makhanas',
      desc: 'Craving clean, guilt-free crunch? Get slow-roasted fox nuts and whole California almonds delivered straight to your doorstep before your tea cools down.',
      image: '/images/hero_banner.jpg',
      floatTitle: 'Assorted Harvest Munchies',
      floatSubtitle: 'Almonds, Walnuts & Roasted Makhanas',
    },
    {
      title: 'Spicy Peri Peri Makhana, Roasted in Pure Olive Oil',
      desc: 'Crispy popped lotus seeds tossed in spicy peri peri seasonings. Zero palm oil, zero trans fat, low calorie and high in plant calcium.',
      image: '/images/makhana.jpg',
      floatTitle: 'Peri Peri Roasted Makhana',
      floatSubtitle: 'Zero Palm Oil • High Plant Protein',
    },
    {
      title: 'Crunchy California Almonds Packed with Vitamin E',
      desc: 'Handpicked Grade A whole almonds with high natural oil content. Perfect for daily morning soaked almonds and clean midday energy.',
      image: '/images/almonds.jpg',
      floatTitle: 'California Almonds Grade A',
      floatSubtitle: '100% Whole & Handpicked',
    },
  ];

  const current = heroTabs[activeTab];

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--c-border)',
        padding: '36px 0 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* 2-Column Wide Immersive Hero Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            alignItems: 'center',
            gap: '40px',
            minHeight: '400px',
            paddingBottom: '36px',
          }}
        >
          {/* Left Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1
              style={{
                fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.12,
                color: '#1c1c1c',
                letterSpacing: '-0.03em',
              }}
            >
              {current.title}
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#4b5563',
                lineHeight: 1.6,
                maxWidth: '520px',
              }}
            >
              {current.desc}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '4px' }}>
              <button onClick={onShopNow} className="btn-blinkit-green">
                <span>Order Now</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onExploreMakhana} className="btn-blinkit-yellow">
                <Flame size={18} />
                <span>Explore Makhanas</span>
              </button>
            </div>

            {/* Slide Navigation Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              {heroTabs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    width: activeTab === idx ? '28px' : '10px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === idx ? 'var(--blinkit-green)' : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: 0,
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Quality & Trust Ticker */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--c-border)',
                marginTop: '8px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" />
                ))}
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c1c1c' }}>
                4.9/5 Rating <span style={{ color: '#9ca3af', fontWeight: 400 }}>•</span> 5 Lakh+ Orders Delivered
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'var(--blinkit-green-light)',
                  color: 'var(--blinkit-green)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                }}
              >
                <Check size={14} /> 100% Genuine Quality
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '440px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--c-border)',
                backgroundColor: '#ffffff',
              }}
            >
              <img
                src={current.image}
                alt={current.title}
                style={{
                  width: '100%',
                  height: '440px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Bottom Image Info Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 900, color: '#1c1c1c' }}>
                    {current.floatTitle}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blinkit-green)', fontWeight: 800 }}>
                    {current.floatSubtitle}
                  </div>
                </div>

                <button
                  onClick={onShopNow}
                  className="btn-blinkit-add"
                >
                  <span>ADD</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Trust Bar */}
        <div
          style={{
            borderTop: '1px solid var(--c-border)',
            padding: '20px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { icon: '⚡', title: 'Express Delivery', desc: 'From nearby dark stores' },
            { icon: '🌾', title: '100% Farm Sourced', desc: 'Direct from 5,000+ growers' },
            { icon: '🍿', title: 'Zero Palm Oil', desc: 'Slow roasted in olive oil' },
            { icon: '💰', title: 'Best Price Always', desc: 'Direct farmer value packs' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
              }}
            >
              <div
                style={{
                  fontSize: '1.6rem',
                  lineHeight: 1,
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '8px',
                  border: '1px solid var(--c-border)',
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1c1c1c' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
