import { useState } from 'react';
import type { CartItem } from '../types/product';
import { X, Trash2, ArrowRight, Zap, Check, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, weight: string, newQty: number) => void;
  onRemoveItem: (productId: string, weight: string) => void;
  onCheckout: (appliedCode: string, finalTotal: number) => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) => {
  const [couponCode, setCouponCode] = useState('BLINK15');
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 299;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const discountAmount = isCouponApplied ? Math.round(subtotal * 0.15) : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'BLINK15' || couponCode.trim().toUpperCase() === 'FRESH15') {
      setIsCouponApplied(true);
      setCouponError(null);
    } else {
      setIsCouponApplied(false);
      setCouponError('Invalid code. Try BLINK15 for 15% off.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 120,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#f4f6fb',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          boxShadow: '-6px 0 25px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideDrawer 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--c-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1c1c1c' }}>
                My Cart
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--blinkit-green)', fontWeight: 800, marginTop: '2px' }}>
              <Zap size={13} fill="var(--blinkit-green)" />
              <span>Delivering in 10 minutes</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
            }}
          >
            <X size={18} color="#1c1c1c" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--c-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#1c1c1c' }}>
            <span>
              {isFreeShipping && subtotal > 0
                ? "🎉 You've unlocked FREE Delivery!"
                : `Add ₹${amountNeededForFreeShip} more for FREE Delivery`}
            </span>
            <span style={{ color: 'var(--blinkit-green)' }}>₹{subtotal} / ₹{FREE_SHIPPING_THRESHOLD}</span>
          </div>

          <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${freeShipPercent}%`,
                backgroundColor: 'var(--blinkit-green)',
                borderRadius: '999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛍️</div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '4px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '16px' }}>
                Your favorite snacks delivered in 10 minutes!
              </p>
              <button onClick={onClose} className="btn-blinkit-green">
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: '1px solid #f3f4f6',
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h5
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#1c1c1c',
                        lineHeight: 1.25,
                      }}
                    >
                      {item.product.name}
                    </h5>
                    <div style={{ fontSize: '0.725rem', color: '#6b7280', marginTop: '2px' }}>
                      {item.selectedWeight}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <strong style={{ fontSize: '0.95rem', color: '#1c1c1c', fontWeight: 900 }}>
                          ₹{item.price * item.quantity}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ₹{item.originalPrice * item.quantity}
                        </span>
                      </div>

                      {/* Blinkit Quantity Stepper */}
                      <div className="qty-stepper-blinkit">
                        <button
                          onClick={() =>
                            onUpdateQty(item.product.id, item.selectedWeight, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQty(item.product.id, item.selectedWeight, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedWeight)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9ca3af',
                      padding: '4px',
                    }}
                    title="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill Details & Proceed to Pay */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid var(--c-border)',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <Tag size={15} color="var(--blinkit-green)" style={{ marginRight: '6px' }} />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. BLINK15)"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.825rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      width: '100%',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: isCouponApplied ? 'var(--blinkit-green-light)' : '#1c1c1c',
                    color: isCouponApplied ? 'var(--blinkit-green)' : '#ffffff',
                    border: isCouponApplied ? '1px solid var(--blinkit-green)' : 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  {isCouponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {isCouponApplied && (
                <div style={{ fontSize: '0.725rem', color: 'var(--blinkit-green)', fontWeight: 800, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={13} /> Code 'BLINK15' applied! Saved ₹{discountAmount}
                </div>
              )}
              {couponError && (
                <div style={{ fontSize: '0.725rem', color: '#dc2626', fontWeight: 800, marginTop: '4px' }}>
                  {couponError}
                </div>
              )}
            </form>

            {/* Bill Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.825rem', marginBottom: '14px' }}>
              <div style={{ fontWeight: 800, color: '#1c1c1c', marginBottom: '2px' }}>
                Bill details
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
                <span>Items total</span>
                <span>₹{subtotal}</span>
              </div>
              {isCouponApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--blinkit-green)', fontWeight: 800 }}>
                  <span>Coupon discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
                <span>Delivery charge</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--blinkit-green)' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '8px',
                  fontSize: '1rem',
                  fontWeight: 900,
                  color: '#1c1c1c',
                }}
              >
                <span>Grand total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Iconic Blinkit Proceed to Pay Button */}
            <button
              onClick={() => onCheckout(isCouponApplied ? 'BLINK15' : '', finalTotal)}
              className="btn-blinkit-green"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.975rem',
                justifyContent: 'space-between',
                borderRadius: '10px',
              }}
            >
              <span>₹{finalTotal} • TOTAL</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Proceed to Pay</span>
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
