import { useState } from 'react';
import type { CartItem, Product, ProductCategory } from './types/product';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryPills } from './components/CategoryPills';
import { FlashDealBanner } from './components/FlashDealBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WhyNutritva } from './components/WhyNutritva';
import { Testimonials } from './components/Testimonials';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(['california-almonds']);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state with initial preloaded pack for immediate delightful interaction
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedWeight: '250g',
      price: 299,
      originalPrice: 399,
      quantity: 1,
    },
    {
      product: PRODUCTS[1],
      selectedWeight: '100g',
      price: 149,
      originalPrice: 199,
      quantity: 2,
    },
  ]);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getCartQuantity = (productId: string, weight: string): number => {
    const item = cartItems.find(
      (i) => i.product.id === productId && i.selectedWeight === weight
    );
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (
    product: Product,
    weight: string,
    price: number,
    originalPrice: number
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedWeight === weight
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, selectedWeight: weight, price, originalPrice, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${weight}) to your cart!`);
  };

  const handleUpdateCartQuantity = (
    product: Product,
    weight: string,
    newQty: number
  ) => {
    if (newQty <= 0) {
      setCartItems((prev) =>
        prev.filter((i) => !(i.product.id === product.id && i.selectedWeight === weight))
      );
    } else {
      setCartItems((prev) => {
        const existingIdx = prev.findIndex(
          (i) => i.product.id === product.id && i.selectedWeight === weight
        );
        if (existingIdx > -1) {
          const copy = [...prev];
          copy[existingIdx].quantity = newQty;
          return copy;
        }
        const opt = product.weightOptions.find((w) => w.weight === weight) || product.weightOptions[0];
        return [...prev, { product, selectedWeight: weight, price: opt.price, originalPrice: opt.originalPrice, quantity: newQty }];
      });
    }
  };

  const handleRemoveCartItem = (productId: string, weight: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedWeight === weight))
    );
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        showToast('Removed item from your wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved item to your wishlist ❤️');
        return [...prev, id];
      }
    });
  };

  const handleCheckout = (_appliedCode: string, total: number) => {
    setCheckoutTotal(total);
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    setCartItems([]);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 200,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '14px 22px',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-lg)',
            border: '1.5px solid var(--c-primary)',
            fontSize: '0.9rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <CheckCircle2 size={18} color="var(--c-primary)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modern D2C Header & Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        {/* Full-Bleed Breathable Editorial Hero (NO AI-Card Box) */}
        <Hero
          onShopNow={scrollToCatalog}
          onExploreMakhana={() => {
            setSelectedCategory('MAKHANA');
            scrollToCatalog();
          }}
        />

        {/* Live Deal of the Hour Banner */}
        <FlashDealBanner
          dealProduct={PRODUCTS[1]}
          onAddToCart={handleAddToCart}
        />

        {/* Category Stories Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          getCartQuantity={getCartQuantity}
          onUpdateCartQuantity={handleUpdateCartQuantity}
        />

        {/* Why Nutritva - 4 Pillars of Purity & Media Mentions */}
        <WhyNutritva />

        {/* Testimonials Wall */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={(pid, weight, qty) => {
          const item = cartItems.find((i) => i.product.id === pid && i.selectedWeight === weight);
          if (item) {
            handleUpdateCartQuantity(item.product, weight, qty);
          }
        }}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      {/* Order Confirmed Celebration Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccess}
        onClose={() => setIsCheckoutSuccess(false)}
        orderTotal={checkoutTotal}
      />
    </div>
  );
}

export default App;
