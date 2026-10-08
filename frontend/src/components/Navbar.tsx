import { useState } from 'react';
import { ShoppingBag, Search, Heart, Zap, MapPin, X } from 'lucide-react';
import type { ProductCategory } from '../types/product';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  wishlistCount: number;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar = ({
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: NavbarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navCategories: Array<{ label: string; cat: ProductCategory }> = [
    { label: 'All Products', cat: 'ALL' },
    { label: 'Almonds (Badam)', cat: 'ALMONDS' },
    { label: 'Cashews (Kaju)', cat: 'CASHEWS' },
    { label: 'Pistachios (Pista)', cat: 'PISTACHIOS' },
    { label: 'Walnuts (Akhrot)', cat: 'WALNUTS' },
    { label: 'Dates (Khajur)', cat: 'DATES' },
    { label: 'Makhana', cat: 'MAKHANA' },
    { label: 'Gift Hampers 🎁', cat: 'GIFT_HAMPERS' },
    { label: 'Combos & Offers', cat: 'COMBOS_OFFERS' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--c-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Brand & Blinkit Delivery Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            onClick={() => onSelectCategory('ALL')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontSize: '1.9rem',
                fontWeight: 900,
                color: '#1c1c1c',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              nutritva
            </span>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--blinkit-yellow)',
                display: 'inline-block',
                marginTop: '6px',
              }}
            />
          </div>

          {/* Blinkit Signature Delivery Speed Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1.5px solid var(--c-border)',
              paddingLeft: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 900, color: '#1c1c1c' }}>
              <Zap size={15} fill="var(--blinkit-green)" color="var(--blinkit-green)" />
              <span>Delivery in 10 minutes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6b7280' }}>
              <MapPin size={12} />
              <span>Deliver to: Sector 45, Gurgaon ▾</span>
            </div>
          </div>
        </div>

        {/* Center: Blinkit Large Search Input */}
        <div
          style={{
            flex: 1,
            maxWidth: '560px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: isSearchFocused ? '#ffffff' : '#f8f9fa',
              borderRadius: 'var(--radius-md)',
              padding: '9px 16px',
              border: isSearchFocused ? '1.5px solid var(--blinkit-green)' : '1px solid var(--c-border)',
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(12, 131, 31, 0.12)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Search size={18} color="#6b7280" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search 'california almonds', 'peri peri makhana', 'cashews'..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem',
                color: '#1c1c1c',
                fontWeight: 500,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                }}
              >
                <X size={16} color="#6b7280" />
              </button>
            )}
          </div>
        </div>

        {/* Right Wishlist & Iconic Blinkit Cart Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Wishlist Icon */}
          <div
            onClick={() => {}}
            style={{
              position: 'relative',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              color: wishlistCount > 0 ? '#e11d48' : '#4b5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Wishlist"
          >
            <Heart size={22} fill={wishlistCount > 0 ? '#e11d48' : 'none'} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#e11d48',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Blinkit Green Cart Button */}
          <button
            id="open-cart-drawer-btn"
            onClick={onOpenCart}
            className="btn-blinkit-green"
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.925rem',
              fontWeight: 800,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={20} />
              <span>{cartCount > 0 ? `${cartCount} items` : 'My Cart'}</span>
            </div>
            {cartCount > 0 && (
              <>
                <span style={{ opacity: 0.5 }}>|</span>
                <span>₹{cartTotal}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub-nav Category Strip */}
      <div
        style={{
          borderTop: '1px solid var(--c-border-subtle)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '4px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
          }}
        >
          {navCategories.map((c) => {
            const isActive = selectedCategory === c.cat && !searchQuery;
            return (
              <button
                key={c.cat}
                onClick={() => {
                  onSelectCategory(c.cat);
                  onSearchChange('');
                }}
                style={{
                  background: isActive ? 'var(--blinkit-yellow-light)' : 'transparent',
                  color: isActive ? '#1c1c1c' : '#4b5563',
                  border: 'none',
                  borderBottom: isActive ? '2.5px solid var(--blinkit-green)' : '2.5px solid transparent',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
