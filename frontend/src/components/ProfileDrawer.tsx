import { X, LogOut, Package, MapPin, Phone, Mail, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import type { UserDTO } from '../types/auth';
import type { OrderDTO } from '../types/product';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDTO | null;
  onLogout: () => void;
  recentOrders?: OrderDTO[];
  onOpenOrder?: (order: OrderDTO) => void;
}

export const ProfileDrawer = ({
  isOpen,
  onClose,
  user,
  onLogout,
  recentOrders = [],
  onOpenOrder,
}: ProfileDrawerProps) => {
  if (!isOpen || !user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 155,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#f8f9fc',
          width: '100%',
          maxWidth: '400px',
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
            padding: '20px 24px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1c1c1c', margin: 0 }}>
              My Profile
            </h3>
            <span
              style={{
                backgroundColor: '#e6f4ea',
                color: 'var(--blinkit-green)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 800,
              }}
            >
              Verified
            </span>
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

        {/* User Card */}
        <div style={{ padding: '20px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--blinkit-yellow)',
                color: '#1c1c1c',
                fontWeight: 900,
                fontSize: '1.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(248, 203, 70, 0.35)',
                border: '2px solid #ffffff',
              }}
            >
              {initials}
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1c1c1c' }}>
                {user.name}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
                <Phone size={13} />
                <span>{user.phone || '+91 98765 43210'}</span>
              </div>
              {user.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#6b7280', marginTop: '2px' }}>
                  <Mail size={13} />
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Member Banner */}
          <div
            style={{
              backgroundColor: 'var(--blinkit-yellow-light)',
              border: '1px solid #f2e2a8',
              borderRadius: '12px',
              padding: '10px 14px',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Zap size={16} fill="var(--blinkit-green)" color="var(--blinkit-green)" />
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1c1c1c' }}>
              Nutritva VIP • 10-Minute Instant Delivery Active
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Saved Address */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>
              <MapPin size={15} color="var(--blinkit-green)" />
              <span>Default Delivery Address</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#1f2937', lineHeight: 1.45, fontWeight: 600 }}>
              {user.address || 'Flat 402, Green Meadows, Indiranagar, Bengaluru - 560038'}
            </p>
          </div>

          {/* Recent Orders Section */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>
                <Package size={15} color="var(--blinkit-green)" />
                <span>My Orders</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--blinkit-green)', fontWeight: 800 }}>
                {recentOrders.length > 0 ? `${recentOrders.length} Order(s)` : 'Live Tracking'}
              </span>
            </div>

            {recentOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '16px 8px', color: '#6b7280', fontSize: '0.825rem' }}>
                No past orders found. Orders you place will show here with live 10-min rider tracking!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recentOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    onClick={() => onOpenOrder && onOpenOrder(ord)}
                    style={{
                      border: '1px solid #f3f4f6',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      backgroundColor: '#f9fafb',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#111827' }}>
                        {ord.orderId}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
                        ₹{ord.grandTotal} • {ord.items?.length || 1} item(s)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--blinkit-green)', fontWeight: 800, marginTop: '2px' }}>
                        ● Delivered in 10 Mins
                      </div>
                    </div>
                    <ChevronRight size={16} color="#9ca3af" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guarantee Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#6b7280', padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
            <ShieldCheck size={18} color="var(--blinkit-green)" />
            <span>Nutritva Purity Promise: 100% whole, unadulterated & tested harvest.</span>
          </div>
        </div>

        {/* Footer with Logout */}
        <div style={{ padding: '16px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.15s ease',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out of Nutritva</span>
          </button>
        </div>
      </div>
    </div>
  );
};
