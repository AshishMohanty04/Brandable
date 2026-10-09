import { useState, useEffect } from 'react';
import type { CartItem, Product, ProductCategory, OrderDTO } from './types/product';
import type { UserDTO } from './types/auth';
import { PRODUCTS } from './data/products';
import { api } from './services/api';
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
import { AuthModal } from './components/AuthModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(['california-almonds']);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Auth & Profile state
  const [user, setUser] = useState<UserDTO | null>(() => api.getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<OrderDTO[]>([]);

  // Cart & checkout state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<OrderDTO | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch real-time catalog from Spring Boot backend on mount
  useEffect(() => {
    api.getProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

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
      selectedWeight: '250g',
      price: 699,
      originalPrice: 899,
      quantity: 1,
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

  // Place order through Spring Boot backend API
  const handleCheckout = async (appliedCode: string, total: number) => {
    try {
      const placedOrder = await api.placeOrder({
        items: cartItems,
        customerName: user?.name,
        customerPhone: user?.phone,
        deliveryAddress: user?.address,
        couponCode: appliedCode,
      });
      setCurrentOrder(placedOrder);
      setRecentOrders((prev) => [placedOrder, ...prev]);
      setCheckoutTotal(placedOrder.grandTotal || total);
      setIsCartOpen(false);
      setIsCheckoutSuccess(true);
      setCartItems([]);
      showToast('Order confirmed! Superfast 10-minute dispatch initiated ⚡');
    } catch (err) {
      console.error('Order checkout error:', err);
      setCheckoutTotal(total);
      setIsCartOpen(false);
      setIsCheckoutSuccess(true);
      setCartItems([]);
    }
  };

  const handleAuthSuccess = (newUser: UserDTO) => {
    setUser(newUser);
    showToast(`Welcome, ${newUser.name}!`);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    showToast('Signed out of your account');
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
            backgroundColor: '#1c1c1c',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            zIndex: 140,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.875rem',
            animation: 'fadeIn 0.2s ease',
            borderLeft: '4px solid var(--blinkit-green)',
          }}
        >
          <CheckCircle2 size={18} color="var(--blinkit-green)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar with Top Right Profile Section */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <main style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
        {/* Farm-to-Table Hero Banner */}
        <Hero
          onShopNow={scrollToCatalog}
          onExploreMakhana={() => {
            setSelectedCategory('MAKHANA');
            scrollToCatalog();
          }}
        />

        {/* Real-time Flash Deals Ticker */}
        <FlashDealBanner
          dealProduct={products[0] || PRODUCTS[0]}
          onAddToCart={handleAddToCart}
        />

        {/* 15 Categories (5 x 3 grid with zero overflow) */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* Product Catalog Grid from Backend */}
        <ProductGrid
          products={products}
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

      {/* Slide-out Cart Drawer with Live Backend Coupon Support */}
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

      {/* Order Confirmed Celebration Modal with Backend Order ID & Details */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccess}
        onClose={() => setIsCheckoutSuccess(false)}
        orderTotal={checkoutTotal}
        order={currentOrder}
      />

      {/* Authentication Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* User Profile Drawer (Orders, Addresses, Account Info) */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
        recentOrders={recentOrders}
        onOpenOrder={(ord) => {
          setCurrentOrder(ord);
          setIsProfileOpen(false);
          setIsCheckoutSuccess(true);
        }}
      />
    </div>
  );
}

export default App;
