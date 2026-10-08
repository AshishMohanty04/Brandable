import type { Product, CategoryInfo, OrderDTO, CouponResult, CartItem } from '../types/product';
import { PRODUCTS } from '../data/products';

const API_BASE = '/api';

export const api = {
  // Fetch products with optional category and search filters
  async getProducts(category?: string, search?: string): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'ALL') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());

      const url = `${API_BASE}/products${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : PRODUCTS;
    } catch (err) {
      console.warn('Backend unavailable, using local product catalog:', err);
      // Client-side fallback filter
      let result = [...PRODUCTS];
      if (category && category !== 'ALL') {
        result = result.filter(p => p.category === category);
      }
      if (search && search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
        );
      }
      return result;
    }
  },

  // Fetch product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data || null;
    } catch {
      return PRODUCTS.find(p => p.id === id) || null;
    }
  },

  // Fetch categories with counts
  async getCategories(): Promise<CategoryInfo[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend categories unavailable, using local list:', err);
      return [];
    }
  },

  // Validate coupon code
  async validateCoupon(code: string, subtotal: number): Promise<CouponResult> {
    try {
      const res = await fetch(`${API_BASE}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartSubtotal: subtotal }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend coupon validation fallback:', err);
      const cleanCode = code.trim().toUpperCase();
      if (cleanCode === 'BLINK15' || cleanCode === 'FRESH15') {
        return {
          valid: true,
          code: cleanCode,
          discountAmount: Math.round(subtotal * 0.15),
          discountPercentage: 15,
          message: '15% off applied successfully!',
        };
      }
      return {
        valid: false,
        code: cleanCode,
        discountAmount: 0,
        discountPercentage: 0,
        message: 'Invalid code. Try BLINK15 for 15% off.',
      };
    }
  },

  // Place order
  async placeOrder(params: {
    items: CartItem[];
    customerName?: string;
    customerPhone?: string;
    deliveryAddress?: string;
    paymentMethod?: string;
    couponCode?: string;
  }): Promise<OrderDTO> {
    const orderItems = params.items.map(i => ({
      productId: i.product.id,
      productName: i.product.name,
      weight: i.selectedWeight,
      price: i.price,
      originalPrice: i.originalPrice,
      quantity: i.quantity,
      image: i.product.image,
    }));

    const payload = {
      items: orderItems,
      customerName: params.customerName || 'Valued Customer',
      customerPhone: params.customerPhone || '+91 98765 43210',
      customerEmail: 'customer@nutritva.com',
      deliveryAddress: params.deliveryAddress || 'Express Home Delivery (10 mins)',
      paymentMethod: params.paymentMethod || 'UPI',
      couponCode: params.couponCode || '',
    };

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('Backend order placement fallback:', err);
      // Fallback simulated order if backend is not reached
      const subtotal = params.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      const discount = params.couponCode ? Math.round(subtotal * 0.15) : 0;
      const shipping = subtotal >= 299 ? 0 : 25;
      return {
        orderId: 'NUT-' + Math.floor(100000 + Math.random() * 900000),
        items: orderItems,
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        customerEmail: payload.customerEmail,
        deliveryAddress: payload.deliveryAddress,
        paymentMethod: payload.paymentMethod,
        paymentStatus: 'PAID',
        orderStatus: 'CONFIRMED',
        subtotal,
        discountAmount: discount,
        shippingFee: shipping,
        grandTotal: Math.max(0, subtotal - discount + shipping),
        couponCode: params.couponCode,
        estimatedDeliveryMinutes: 10,
        createdAt: new Date().toISOString(),
        trackingMessage: 'Farm-fresh items picked & verified. Rider arriving in 10 minutes.',
      };
    }
  },

  // Get order by ID
  async getOrderById(orderId: string): Promise<OrderDTO | null> {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      return { success: json.success, message: json.message };
    } catch {
      return {
        success: true,
        message: 'Thank you for subscribing to Nutritva Farm News! Use coupon BLINK15 for 15% off.',
      };
    }
  },

  // Backend stats check
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return null;
    }
  },
};
