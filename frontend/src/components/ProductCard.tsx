import { useState } from 'react';
import { Heart, Eye, Plus, Clock } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weight: string, price: number, originalPrice: number) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  cartQuantity: number;
  onUpdateCartQuantity: (product: Product, weight: string, newQty: number) => void;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  cartQuantity,
  onUpdateCartQuantity,
}: ProductCardProps) => {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

  const currentOption = product.weightOptions[selectedWeightIndex];
  const discountPercent = Math.round(
    ((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100
  );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
      className="product-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = '#d1d5db';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      {/* Top Floating Badges */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Blinkit 10-Min Delivery Pill */}
        <div
          style={{
            backgroundColor: '#f3f4f6',
            color: '#1c1c1c',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Clock size={11} color="var(--blinkit-green)" />
          <span>10 MINS</span>
        </div>

        <button
          onClick={() => onToggleWishlist(product.id)}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
            color: isWishlisted ? '#e11d48' : '#9ca3af',
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#e11d48' : 'none'} />
        </button>
      </div>

      {/* Image Container with Quick View */}
      <div
        style={{
          position: 'relative',
          paddingTop: '80%',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = product.category === 'MAKHANA' ? '/images/makhana.jpg' : '/images/almonds.jpg';
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Quick View Button */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(28, 28, 28, 0.85)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Eye size={12} />
          <span>Quick View</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div
        style={{
          padding: '14px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Discount Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span
              style={{
                backgroundColor: 'var(--blinkit-green-light)',
                color: 'var(--blinkit-green)',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {discountPercent}% OFF
            </span>
            {product.badge && (
              <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 700 }}>
                • {product.badge}
              </span>
            )}
          </div>

          {/* Name & Subtitle */}
          <h3
            style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#1c1c1c',
              lineHeight: 1.3,
              marginBottom: '4px',
              minHeight: '2.5rem',
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginBottom: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.tagline}
          </p>

          {/* Weight Option Chips */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {product.weightOptions.map((opt, idx) => {
              const isSelected = selectedWeightIndex === idx;
              return (
                <button
                  key={opt.weight}
                  onClick={() => setSelectedWeightIndex(idx)}
                  style={{
                    backgroundColor: isSelected ? 'var(--blinkit-yellow-light)' : '#f3f4f6',
                    color: isSelected ? '#1c1c1c' : '#4b5563',
                    border: isSelected ? '1.5px solid #1c1c1c' : '1px solid transparent',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '0.725rem',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                  }}
                >
                  {opt.weight}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing & Blinkit Action Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid #f3f4f6',
            gap: '8px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1c1c1c' }}>
                ₹{currentOption.price}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                ₹{currentOption.originalPrice}
              </span>
            </div>
          </div>

          {/* Blinkit Green ADD Button or Quantity Stepper */}
          {cartQuantity > 0 ? (
            <div className="qty-stepper-blinkit">
              <button
                onClick={() =>
                  onUpdateCartQuantity(product, currentOption.weight, cartQuantity - 1)
                }
                title="Decrease"
              >
                -
              </button>
              <span>{cartQuantity}</span>
              <button
                onClick={() =>
                  onUpdateCartQuantity(product, currentOption.weight, cartQuantity + 1)
                }
                title="Increase"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                onAddToCart(product, currentOption.weight, currentOption.price, currentOption.originalPrice)
              }
              className="btn-blinkit-add"
            >
              <Plus size={14} />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
