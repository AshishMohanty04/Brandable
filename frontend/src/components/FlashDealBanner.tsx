import { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types/product';

interface FlashDealBannerProps {
  dealProduct: Product;
  onAddToCart: (product: Product, weight: string, price: number, originalPrice: number) => void;
}

export const FlashDealBanner = ({ dealProduct, onAddToCart }: FlashDealBannerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(15720);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 14400));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');

  const option = dealProduct.weightOptions[0];

  const handleQuickClaim = () => {
    onAddToCart(dealProduct, option.weight, option.price, option.originalPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section style={{ padding: '24px 0 28px 0' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #e5e7eb',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Left Deal Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--blinkit-yellow)',
                color: '#1c1c1c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Zap size={24} fill="#1c1c1c" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: 'var(--blinkit-yellow)',
                    color: '#1c1c1c',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: '0.04em',
                  }}
                >
                  DEAL OF THE HOUR
                </span>
                <span style={{ fontSize: '0.825rem', fontWeight: 900, color: 'var(--blinkit-green)' }}>
                  FLAT 25% OFF
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1c1c1c', marginTop: '4px' }}>
                {dealProduct.name} ({option.weight})
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                Slow roasted in pure olive oil • Limited stock
              </p>
            </div>
          </div>

          {/* Center Countdown Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1c1c1c', fontWeight: 800, fontSize: '0.85rem' }}>
              <Clock size={16} />
              <span>Deal Ends In:</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { val: pad(hours), label: 'HRS' },
                { val: pad(minutes), label: 'MIN' },
                { val: pad(seconds), label: 'SEC' },
              ].map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    padding: '5px 8px',
                    border: '1px solid #e5e7eb',
                    textAlign: 'center',
                    minWidth: '40px',
                    boxShadow: 'none',
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#1c1c1c', lineHeight: 1 }}>
                    {t.val}
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#6b7280' }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Price & Claim Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1c1c1c' }}>
                  ₹{option.price}
                </span>
                <span style={{ fontSize: '0.95rem', color: '#6b7280', textDecoration: 'line-through' }}>
                  ₹{option.originalPrice}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--blinkit-green)', fontWeight: 800 }}>
                Save ₹{option.originalPrice - option.price} instantly
              </span>
            </div>

            <button
              onClick={handleQuickClaim}
              className="btn-blinkit-green"
              style={{ padding: '9px 20px', fontSize: '0.9rem' }}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Grab Deal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
