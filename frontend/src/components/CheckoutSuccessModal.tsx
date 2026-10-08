import { PackageCheck, Sparkles, X, Zap, ShieldCheck } from 'lucide-react';
import type { OrderDTO } from '../types/product';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  order?: OrderDTO | null;
}

export const CheckoutSuccessModal = ({
  isOpen,
  onClose,
  orderTotal,
  order,
}: CheckoutSuccessModalProps) => {
  if (!isOpen) return null;

  const displayOrderId = order?.orderId || ('NUT-' + Math.floor(100000 + Math.random() * 900000));
  const finalTotal = order?.grandTotal ?? orderTotal;
  const trackingMsg = order?.trackingMessage || 'Farm-fresh items picked & verified. Rider arriving in 10 minutes.';
  const deliveryMins = order?.estimatedDeliveryMinutes || 10;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '480px',
          width: '100%',
          padding: '32px 24px',
          textAlign: 'center',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          animation: 'slideUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          <X size={18} color="#1c1c1c" />
        </button>

        {/* Blinkit Green Icon Circle */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: '#e6f4ea',
            color: 'var(--blinkit-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <PackageCheck size={38} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eaf8ed', color: '#0c831f', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '8px' }}>
          <Zap size={13} fill="#0c831f" />
          <span>SUPERFAST 10-MIN EXPRESS DISPATCH</span>
        </div>

        <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1c1c1c', marginBottom: '6px' }}>
          Order Confirmed!
        </h3>
        <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.45, marginBottom: '20px' }}>
          {trackingMsg}
        </p>

        {/* Order Details Card */}
        <div
          style={{
            backgroundColor: '#f8f9fc',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 700 }}>Order ID</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#1c1c1c', marginTop: '2px' }}>{displayOrderId}</div>
          </div>
          <div style={{ borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 700 }}>Total Paid</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--blinkit-green)', marginTop: '2px' }}>₹{finalTotal}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 700 }}>Delivery In</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#b45309', marginTop: '2px' }}>{deliveryMins} Mins</div>
          </div>
        </div>

        {/* Purchased Items list if order has items */}
        {order?.items && order.items.length > 0 && (
          <div style={{ textAlign: 'left', marginBottom: '20px', maxHeight: '140px', overflowY: 'auto', background: '#fafafa', padding: '10px 14px', borderRadius: '10px', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Items in this order:</div>
            {order.items.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '3px 0' }}>
                <span style={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                  {it.quantity}x {it.productName} ({it.weight})
                </span>
                <span style={{ fontWeight: 700, color: '#111827' }}>₹{it.price * it.quantity}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: '#6b7280', marginBottom: '20px' }}>
          <ShieldCheck size={16} color="var(--blinkit-green)" />
          <span>Backed by Nutritva 100% Purity & Harvest Freshness Guarantee</span>
        </div>

        <button
          onClick={onClose}
          className="btn-blinkit-green"
          style={{ width: '100%', padding: '13px', fontSize: '0.95rem', justifyContent: 'center', borderRadius: '10px' }}
        >
          <Sparkles size={18} />
          <span>Continue Snacking</span>
        </button>
      </div>
    </div>
  );
};
