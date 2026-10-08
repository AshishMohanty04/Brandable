import { PackageCheck, Sparkles, X } from 'lucide-react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
}

export const CheckoutSuccessModal = ({
  isOpen,
  onClose,
  orderTotal,
}: CheckoutSuccessModalProps) => {
  if (!isOpen) return null;

  const orderId = 'NUT-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(18, 56, 38, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '500px',
          width: '100%',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-modal)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <X size={20} color="var(--c-text-muted)" />
        </button>

        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            backgroundColor: 'var(--c-brand-light)',
            color: 'var(--c-brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <PackageCheck size={42} />
        </div>

        <h3 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-brand-dark)', marginBottom: '8px' }}>
          Order Confirmed!
        </h3>
        <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px' }}>
          Thank you for choosing wholesome farm snacking! Your fresh harvest is being packed with care.
        </p>

        <div
          style={{
            backgroundColor: 'var(--c-bg-subtle)',
            borderRadius: '14px',
            padding: '16px',
            border: '1px solid var(--c-border)',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'left',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>Order ID</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-brand-dark)' }}>{orderId}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>Total Paid</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-brand-primary)' }}>₹{orderTotal}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>Estimated Delivery</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-brand-gold)' }}>2-3 Days</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
        >
          <Sparkles size={18} />
          Continue Snacking
        </button>
      </div>
    </div>
  );
};
