import { useState } from 'react';
import type { Product, ProductCategory } from '../types/product';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { CATEGORIES_DATA } from './CategoryPills';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onAddToCart: (product: Product, weight: string, price: number, originalPrice: number) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  getCartQuantity: (productId: string, weight: string) => number;
  onUpdateCartQuantity: (product: Product, weight: string, newQty: number) => void;
}

export const ProductGrid = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  getCartQuantity,
  onUpdateCartQuantity,
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState<'FEATURED' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING'>('FEATURED');

  const activeCategoryInfo = CATEGORIES_DATA.find((c) => c.id === selectedCategory);

  // Filter products matching search query
  const searchFiltered = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  });

  const sortItems = (items: Product[]) => {
    return [...items].sort((a, b) => {
      if (sortBy === 'PRICE_LOW') {
        return a.weightOptions[0].price - b.weightOptions[0].price;
      }
      if (sortBy === 'PRICE_HIGH') {
        return b.weightOptions[0].price - a.weightOptions[0].price;
      }
      if (sortBy === 'RATING') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  const isCategoryFiltered = selectedCategory !== 'ALL';
  const categoryProducts = isCategoryFiltered
    ? searchFiltered.filter((p) => p.category === selectedCategory)
    : searchFiltered;
  const otherProducts = isCategoryFiltered
    ? searchFiltered.filter((p) => p.category !== selectedCategory)
    : [];

  const sortedCategoryProducts = sortItems(categoryProducts);
  const sortedOtherProducts = sortItems(otherProducts);

  return (
    <section id="shop-catalog" style={{ padding: '24px 0 60px 0' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header & Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#1c1c1c', marginTop: '2px' }}>
                {searchQuery
                  ? `Search Results for "${searchQuery}" (${searchFiltered.length} items)`
                  : isCategoryFiltered
                  ? `${activeCategoryInfo ? `${activeCategoryInfo.icon} ${activeCategoryInfo.name}` : 'Category Products'} (${categoryProducts.length} items)`
                  : `All Products Listed (${products.length} Items)`}
              </h2>

              {isCategoryFiltered && (
                <button
                  onClick={() => onSelectCategory('ALL')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                  title="Clear category filter"
                >
                  <X size={12} />
                  <span>Show All</span>
                </button>
              )}
            </div>

            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '4px' }}>
              {isCategoryFiltered
                ? `Showing ${categoryProducts.length} products in ${activeCategoryInfo?.name || 'this category'}. Scroll down to see all other listed products.`
                : `Showing all ${products.length} products available for 10-minute delivery.`}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={15} color="#6b7280" />
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: 'var(--radius-md)',
                padding: '7px 14px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#1c1c1c',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="FEATURED">Relevance</option>
              <option value="PRICE_LOW">Price (Low to High)</option>
              <option value="PRICE_HIGH">Price (High to Low)</option>
              <option value="RATING">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Primary Product Grid (Filtered Category or All Products) */}
        {sortedCategoryProducts.length === 0 ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '48px 24px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '6px' }}>
              No products found in this category
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '16px' }}>
              Explore other categories or view all products below.
            </p>
            <button
              onClick={() => onSelectCategory('ALL')}
              className="btn-blinkit-green"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {sortedCategoryProducts.map((product) => {
              const selectedWeight = product.weightOptions[0].weight;
              const qty = getCartQuantity(product.id, selectedWeight);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  cartQuantity={qty}
                  onUpdateCartQuantity={onUpdateCartQuantity}
                />
              );
            })}
          </div>
        )}

        {/* When a specific category is filtered, also show ALL OTHER products below it */}
        {isCategoryFiltered && sortedOtherProducts.length > 0 && (
          <div style={{ marginTop: '54px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--c-border)',
                marginBottom: '24px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--blinkit-green)" />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#1c1c1c' }}>
                    All Other Products Listed ({sortedOtherProducts.length} items)
                  </h3>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '2px' }}>
                  Browse our complete range of healthy dry fruits, roasted makhanas & hampers
                </p>
              </div>

              <button
                onClick={() => onSelectCategory('ALL')}
                className="btn-blinkit-add"
                style={{ padding: '8px 16px', fontSize: '0.825rem' }}
              >
                <span>View All 30 Items</span>
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {sortedOtherProducts.map((product) => {
                const selectedWeight = product.weightOptions[0].weight;
                const qty = getCartQuantity(product.id, selectedWeight);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    cartQuantity={qty}
                    onUpdateCartQuantity={onUpdateCartQuantity}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
