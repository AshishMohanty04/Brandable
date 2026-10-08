import { useState, useEffect } from 'react';
import type { CartItem } from '../types/product';
import { X, Trash2, ArrowRight, Zap, Check, Tag } from 'lucide-react';
import { api } from '../services/api';

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
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<string>('15% off applied successfully!');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 299;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Recalculate coupon discount whenever subtotal changes
  useEffect(() => {
    if (isCouponApplied && couponCode) {
      api.validateCoupon(couponCode, subtotal).then(res => {
        if (res.valid) {
          setDiscountAmount(res.discountAmount);
          setCouponMsg(res.message);
          setCouponError(null);
        } else {
          setIsCouponApplied(false);
          setDiscountAmount(0);
        }
      });
    } else {
      setDiscountAmount(0);
    }
  }, [subtotal, isCouponApplied, couponCode]);

  if (!isOpen) return null;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    setIsValidating(true);
    setCouponError(null);
    try {
      const res = await api.validateCoupon(couponCode, subtotal);
      if (res.valid) {
        setIsCouponApplied(true);
        setDiscountAmount(res.discountAmount);
        setCouponMsg(res.message);
        setCouponError(null);
      } else {
        setIsCouponApplied(false);
        setDiscountAmount(0);
        setCouponError(res.message || 'Invalid coupon code.');
      }
    } catch {
      setCouponError('Failed to validate coupon with server.');
    } finally {
      setIsValidating(false);
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
            backgroundColor: '#ffffff',
            padding: '10px 20px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700 }}>
            {isFreeShipping ? (
              <span style={{ color: 'var(--blinkit-green)' }}>
                🎉 Yay! You get FREE 10-min Delivery
              </span>
            ) : (
              <span style={{ color: '#4b5563' }}>
                Add <strong>₹{amountNeededForFreeShip}</strong> more for FREE delivery
              </span>
            )}
            <span style={{ color: 'var(--blinkit-green)', fontWeight: 800 }}>
              {isFreeShipping ? 'FREE' : '₹25 fee'}
            </span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${freeShipPercent}%`,
                height: '100%',
                backgroundColor: 'var(--blinkit-green)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {cartItems.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '2rem',
                }}
              >
                🛒
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1c1c1c' }}>
                Your cart is empty
              </h4>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', maxWidth: '240px' }}>
                Explore fresh California almonds, creamy W240 cashews, and dates to get started!
              </p>
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '14px', border: '1px solid var(--c-border)' }}>
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: idx < cartItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      backgroundColor: '#f9fafb',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#1c1c1c',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.product.name}
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
                      {item.selectedWeight} • ₹{item.price} each
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1c1c1c' }}>
                        ₹{item.price * item.quantity}
                      </span>
                      {item.originalPrice > item.price && (
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ₹{item.originalPrice * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--blinkit-green-light)',
                      border: '1px solid var(--blinkit-green)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          onRemoveItem(item.product.id, item.selectedWeight);
                        } else {
                          onUpdateQty(item.product.id, item.selectedWeight, item.quantity - 1);
                        }
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--blinkit-green)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        width: '28px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.quantity === 1 ? <Trash2 size={13} color="var(--blinkit-green)" /> : '−'}
                    </button>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: 'var(--blinkit-green)',
                        padding: '0 6px',
                        minWidth: '18px',
                        textAlign: 'center',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.selectedWeight, item.quantity + 1)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--blinkit-green)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        width: '28px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid var(--c-border)',
              boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Promo Code Input */}
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
                  disabled={isValidating}
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
                  {isValidating ? '...' : isCouponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {isCouponApplied && (
                <div style={{ fontSize: '0.725rem', color: 'var(--blinkit-green)', fontWeight: 800, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={13} /> {couponMsg} (Saved ₹{discountAmount})
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
              {isCouponApplied && discountAmount > 0 && (
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
              onClick={() => onCheckout(isCouponApplied ? couponCode : '', finalTotal)}
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
