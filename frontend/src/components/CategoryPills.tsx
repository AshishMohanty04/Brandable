import type { ProductCategory } from '../types/product';
import { Sparkles, Check } from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export interface CategoryData {
  id: ProductCategory;
  num: number;
  name: string;
  examples: string;
  icon: string;
}

export const CATEGORIES_DATA: CategoryData[] = [
  // Line 1 (1 - 5)
  {
    num: 1,
    id: 'ALMONDS',
    name: 'Almonds (Badam)',
    examples: 'California Almonds, Mamra Almonds',
    icon: '🌰',
  },
  {
    num: 2,
    id: 'CASHEWS',
    name: 'Cashews (Kaju)',
    examples: 'W180, W240, W320, Roasted Cashews',
    icon: '🥜',
  },
  {
    num: 3,
    id: 'PISTACHIOS',
    name: 'Pistachios (Pista)',
    examples: 'Roasted, Salted, Iranian Pistachios',
    icon: '🟢',
  },
  {
    num: 4,
    id: 'WALNUTS',
    name: 'Walnuts (Akhrot)',
    examples: 'Whole Walnuts, Walnut Kernels',
    icon: '🧠',
  },
  {
    num: 5,
    id: 'RAISINS',
    name: 'Raisins (Kishmish)',
    examples: 'Golden Raisins, Black Raisins',
    icon: '🍇',
  },

  // Line 2 (6 - 10)
  {
    num: 6,
    id: 'DATES',
    name: 'Dates (Khajur)',
    examples: 'Ajwa, Medjool, Safawi, Kimia',
    icon: '🌴',
  },
  {
    num: 7,
    id: 'DRIED_FRUITS',
    name: 'Dried Fruits',
    examples: 'Figs, Apricots, Prunes, Cranberries',
    icon: '🍑',
  },
  {
    num: 8,
    id: 'SEEDS',
    name: 'Seeds',
    examples: 'Chia, Flax, Pumpkin, Sunflower',
    icon: '🌱',
  },
  {
    num: 9,
    id: 'EXOTIC_NUTS',
    name: 'Exotic Nuts',
    examples: 'Macadamia, Brazil Nuts, Hazelnuts, Pecan',
    icon: '🥥',
  },
  {
    num: 10,
    id: 'MAKHANA',
    name: 'Makhana',
    examples: 'Plain, Roasted, Flavoured',
    icon: '🍿',
  },

  // Line 3 (11 - 15)
  {
    num: 11,
    id: 'MIXED_DRY_FRUITS',
    name: 'Mixed Dry Fruits',
    examples: 'Panchmeva, Mixed Nuts, Premium Mix',
    icon: '🥣',
  },
  {
    num: 12,
    id: 'ROASTED_FLAVOURED',
    name: 'Roasted & Flavoured',
    examples: 'Peri-peri, Salted, Masala',
    icon: '🌶️',
  },
  {
    num: 13,
    id: 'TRAIL_MIX',
    name: 'Trail Mix & Healthy Snacks',
    examples: 'Nut Mix, Fruit & Nut Mix',
    icon: '🏃',
  },
  {
    num: 14,
    id: 'GIFT_HAMPERS',
    name: 'Gift Hampers 🎁',
    examples: 'Wedding, Birthday, Diwali, Corporate',
    icon: '🎁',
  },
  {
    num: 15,
    id: 'COMBOS_OFFERS',
    name: 'Combos & Offers',
    examples: 'Family Pack, Festive Combo, Value Pack',
    icon: '🏷️',
  },
];

export const CategoryPills = ({ selectedCategory, onSelectCategory }: CategoryPillsProps) => {
  const handleCategoryClick = (catId: ProductCategory) => {
    onSelectCategory(catId);
    const catalogEl = document.getElementById('shop-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="categories-section" style={{ padding: '24px 0 16px 0', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
        {/* Header with Title and 'View All' Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#1c1c1c', letterSpacing: '-0.02em' }}>
                Shop by Category
              </h2>
              <span
                style={{
                  backgroundColor: 'var(--blinkit-yellow)',
                  color: '#1c1c1c',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                15 Categories
              </span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '2px' }}>
              Select any category to view associated products • 5 per row in 3 lines
            </p>
          </div>

          {/* Toggle All Button */}
          <button
            onClick={() => handleCategoryClick('ALL')}
            style={{
              backgroundColor: selectedCategory === 'ALL' ? 'var(--blinkit-green)' : '#ffffff',
              color: selectedCategory === 'ALL' ? '#ffffff' : '#1c1c1c',
              border: selectedCategory === 'ALL' ? '2px solid var(--blinkit-green)' : '1px solid #d1d5db',
              borderRadius: '24px',
              padding: '8px 18px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.15s ease',
            }}
          >
            <Sparkles size={15} />
            <span>Show All Products ({selectedCategory === 'ALL' ? 'Active' : '31 Items'})</span>
          </button>
        </div>

        {/* 5 Categories per line in 3 lines (5 columns x 3 rows grid) with ZERO horizontal overflow */}
        <div className="categories-5x3-grid">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="category-card-btn"
                style={{
                  backgroundColor: isSelected ? 'var(--blinkit-green-light)' : '#ffffff',
                  color: '#1c1c1c',
                  border: isSelected ? '2px solid var(--blinkit-green)' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '10px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isSelected ? '0 4px 12px rgba(12, 131, 31, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  outline: 'none',
                  minWidth: 0,
                  width: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
                title={`${cat.name} (${cat.examples})`}
              >
                {/* Category Icon */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#ffffff' : '#f8f9fa',
                    border: isSelected ? '1px solid var(--blinkit-green)' : '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  {cat.icon}
                </div>

                {/* Category Text & Examples */}
                <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2px' }}>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        color: isSelected ? 'var(--blinkit-green)' : '#9ca3af',
                      }}
                    >
                      #{cat.num}
                    </span>
                    {isSelected && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontSize: '0.6rem',
                          fontWeight: 900,
                          color: 'var(--blinkit-green)',
                          backgroundColor: '#ffffff',
                          padding: '1px 5px',
                          borderRadius: '6px',
                          border: '1px solid var(--blinkit-green)',
                        }}
                      >
                        <Check size={8} /> Active
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: '0.825rem',
                      fontWeight: 800,
                      color: isSelected ? 'var(--blinkit-green)' : '#1c1c1c',
                      lineHeight: 1.2,
                      marginTop: '1px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cat.name}
                  </div>

                  <div
                    style={{
                      fontSize: '0.675rem',
                      color: '#6b7280',
                      marginTop: '2px',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={cat.examples}
                  >
                    {cat.examples}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
