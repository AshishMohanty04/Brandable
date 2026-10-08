import { useState } from 'react';
import { Zap } from 'lucide-react';
import { api } from '../services/api';

export const Footer = () => {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      await api.subscribeNewsletter(`${phone.trim()}@sms.nutritva.com`);
      setSubmitted(true);
    }
  };

  return (
    <footer style={{ backgroundColor: '#ffffff', color: '#1c1c1c', borderTop: '1px solid var(--c-border)', paddingTop: '48px', paddingBottom: '28px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Blinkit Quick Link Promo Banner */}
        <div
          style={{
            backgroundColor: 'var(--blinkit-yellow-light)',
            borderRadius: '20px',
            padding: '28px 32px',
            border: '2px solid var(--blinkit-yellow)',
            marginBottom: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--blinkit-green)', fontWeight: 800, fontSize: '0.8rem' }}>
              <Zap size={14} fill="var(--blinkit-green)" />
              <span>SUPERFAST QUICK COMMERCE</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1c1c1c', marginTop: '2px' }}>
              Get ₹100 OFF on your first 10-minute order
            </h3>
            <p style={{ color: '#4b5563', fontSize: '0.85rem', marginTop: '4px' }}>
              Enter your mobile number to get the app link & secret coupon code.
            </p>
          </div>

          <form onSubmit={handleSendLink} style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '380px' }}>
            {submitted ? (
              <div style={{ backgroundColor: 'var(--blinkit-green)', color: '#ffffff', padding: '10px 18px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '0.85rem', width: '100%', textAlign: 'center' }}>
                ✓ App link sent! Enjoy your 10-minute crunch.
              </div>
            ) : (
              <>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    color: '#1c1c1c',
                    fontSize: '0.875rem',
                    outline: 'none',
                    flex: 1,
                  }}
                />
                <button
                  type="submit"
                  className="btn-blinkit-green"
                  style={{ padding: '10px 18px', whiteSpace: 'nowrap' }}
                >
                  Get App Link
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1c1c1c', letterSpacing: '-0.04em' }}>
                nutritva
              </span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--blinkit-yellow)', display: 'inline-block' }} />
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.825rem', lineHeight: 1.55, marginBottom: '12px' }}>
              India's fastest farm-to-door healthy snacking service. Slow-roasted makhanas, California almonds, and premium dry fruits delivered in 10 minutes.
            </p>
            <div style={{ color: 'var(--blinkit-green)', fontSize: '0.78rem', fontWeight: 800 }}>
              FSSAI Lic. 10019011006542
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: '#1c1c1c' }}>
              Munchies in 10 Mins
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: '#4b5563' }}>
              <li>California Almonds (250g/500g/1kg)</li>
              <li>Peri Peri Roasted Makhana</li>
              <li>Jumbo Cashews W240</li>
              <li>7-in-1 Seeds & Berries Mix</li>
              <li>Cream & Onion Makhana</li>
              <li>Festive Gift Hampers</li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: '#1c1c1c' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: '#4b5563' }}>
              <li>About Nutritva Quick</li>
              <li>Partner with Us</li>
              <li>Farmer Network & Sourcing</li>
              <li>Careers</li>
              <li>Press & Media</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: '#1c1c1c' }}>
              Help & Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: '#4b5563' }}>
              <li>Delivery Terms (10 Mins)</li>
              <li>Refund & Cancellation</li>
              <li>Security & Privacy</li>
              <li>Contact Customer Care</li>
              <li>support@nutritva.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--c-border)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#6b7280',
          }}
        >
          <div>
            © {new Date().getFullYear()} Nutritva Commerce Pvt. Ltd. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', fontWeight: 700 }}>
            <span>⚡ 10-Minute Delivery</span>
            <span>•</span>
            <span>🚫 Zero Palm Oil</span>
            <span>•</span>
            <span>🌿 100% Vegetarian</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
