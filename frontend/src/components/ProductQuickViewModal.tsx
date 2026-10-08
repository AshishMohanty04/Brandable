import { useState } from 'react';
import type { Product } from '../types/product';
import { X, Star, CheckCircle, ShoppingBag, Clock } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: string, price: number, originalPrice: number) => void;
}

export const ProductQuickViewModal = ({
  product,
  onClose,
  onAddToCart,
}: ProductQuickViewModalProps) => {
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);

  if (!product) return null;

  const currentOption = product.weightOptions[selectedWeightIdx];
  const discountPercent = Math.round(
    ((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
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
          borderRadius: '20px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          border: '1px solid #e5e7eb',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <X size={18} color="#1c1c1c" />
        </button>

        {/* Left Image & 10 Min Badge */}
        <div>
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              paddingTop: '90%',
              border: '1px solid #e5e7eb',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div
            style={{
              marginTop: '14px',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--blinkit-green-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--blinkit-green)',
              fontSize: '0.825rem',
              fontWeight: 800,
            }}
          >
            <Clock size={16} />
            <span>Delivered in 10 minutes from your nearest hub</span>
          </div>
        </div>

        {/* Right Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  backgroundColor: 'var(--blinkit-yellow)',
                  color: '#1c1c1c',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                {product.categoryLabel}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--blinkit-green)', fontWeight: 800 }}>
                {discountPercent}% OFF
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#1c1c1c',
                lineHeight: 1.25,
                marginTop: '6px',
              }}
            >
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.825rem', fontWeight: 800 }}>{product.rating}</span>
              <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.55 }}>
            {product.description}
          </p>

          {/* Key Benefits */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '6px' }}>
              Why choose this:
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {product.benefits.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: '#374151' }}>
                  <CheckCircle size={14} color="var(--blinkit-green)" style={{ flexShrink: 0 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition Table */}
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              padding: '10px 14px',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem', color: '#6b7280' }}>
              <strong>Nutrition facts per serving</strong>
              <span>({product.nutrition.servingSize})</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1c1c1c' }}>
                  {product.nutrition.calories}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>kcal</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--blinkit-green)' }}>
                  {product.nutrition.protein}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Protein</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#d97706' }}>
                  {product.nutrition.dietaryFiber}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Fiber</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0284c7' }}>
                  {product.nutrition.healthyFats}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Good Fats</div>
              </div>
            </div>
          </div>

          {/* Weight Options */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '6px' }}>
              Pack Size:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.weightOptions.map((opt, idx) => {
                const isSelected = selectedWeightIdx === idx;
                return (
                  <button
                    key={opt.weight}
                    onClick={() => setSelectedWeightIdx(idx)}
                    style={{
                      backgroundColor: isSelected ? 'var(--blinkit-yellow-light)' : '#ffffff',
                      color: '#1c1c1c',
                      border: isSelected ? '2px solid #1c1c1c' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontWeight: isSelected ? 900 : 700,
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                    }}
                  >
                    <div>{opt.weight}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--blinkit-green)', fontWeight: 800 }}>
                      ₹{opt.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Add Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid #e5e7eb',
              marginTop: '4px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1c1c1c' }}>
                  ₹{currentOption.price}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                  ₹{currentOption.originalPrice}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                Inclusive of all taxes
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, currentOption.weight, currentOption.price, currentOption.originalPrice);
                onClose();
              }}
              className="btn-blinkit-green"
              style={{ padding: '11px 24px' }}
            >
              <ShoppingBag size={18} />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
