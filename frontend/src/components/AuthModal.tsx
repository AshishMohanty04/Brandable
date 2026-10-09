import { useState } from 'react';
import { X, Lock, Mail, Phone, User as UserIcon, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { api } from '../services/api';
import type { UserDTO } from '../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserDTO) => void;
  initialMode?: 'LOGIN' | 'SIGNUP';
}

export const AuthModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'LOGIN',
}: AuthModalProps) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>(initialMode);
  
  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form states
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAddress, setSignupAddress] = useState('');

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your mobile number or email');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.login({
        emailOrPhone: loginIdentifier.trim(),
        password: loginPassword || 'password123',
      });
      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.message || 'Login failed. Please verify your details.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!signupPhone.trim() && !signupEmail.trim()) {
      setErrorMsg('Please enter either mobile number or email');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.signup({
        name: signupName.trim(),
        phone: signupPhone.trim(),
        email: signupEmail.trim(),
        password: signupPassword || 'password123',
        address: signupAddress.trim() || 'Indiranagar, Bengaluru - 560038',
      });
      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.getDemoUser();
      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '440px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          animation: 'slideUp 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div
          style={{
            backgroundColor: 'var(--blinkit-yellow-light)',
            padding: '24px 24px 18px',
            borderBottom: '1px solid #f2e2a8',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <X size={18} color="#1c1c1c" />
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--blinkit-yellow)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 900, color: '#1c1c1c', marginBottom: '8px' }}>
            <Zap size={12} fill="#1c1c1c" />
            <span>10-MINUTE QUICK COMMERCE</span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1c1c1c', margin: 0, letterSpacing: '-0.02em' }}>
            {mode === 'LOGIN' ? 'Welcome Back!' : 'Join Nutritva'}
          </h3>
          <p style={{ color: '#4b5563', fontSize: '0.825rem', marginTop: '4px', marginBottom: 0 }}>
            {mode === 'LOGIN' 
              ? 'Sign in to access your saved addresses & express re-ordering.'
              : 'Create an account to unlock ₹100 off on your first harvest order.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <button
            type="button"
            onClick={() => { setMode('LOGIN'); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '12px',
              fontWeight: 800,
              fontSize: '0.9rem',
              border: 'none',
              background: mode === 'LOGIN' ? '#ffffff' : 'transparent',
              color: mode === 'LOGIN' ? 'var(--blinkit-green)' : '#6b7280',
              borderBottom: mode === 'LOGIN' ? '2.5px solid var(--blinkit-green)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('SIGNUP'); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '12px',
              fontWeight: 800,
              fontSize: '0.9rem',
              border: 'none',
              background: mode === 'SIGNUP' ? '#ffffff' : 'transparent',
              color: mode === 'SIGNUP' ? 'var(--blinkit-green)' : '#6b7280',
              borderBottom: mode === 'SIGNUP' ? '2.5px solid var(--blinkit-green)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Body Form */}
        <div style={{ padding: '24px' }}>
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 600,
                marginBottom: '16px',
                border: '1px solid #fecaca',
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          {mode === 'LOGIN' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '6px' }}>
                  Mobile Number or Email
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Phone size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    placeholder="e.g. 9876543210 or your@email.com"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.875rem',
                      color: '#111827',
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#374151' }}>
                    Password or OTP
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--blinkit-green)', fontWeight: 700, cursor: 'pointer' }}>
                    OTP / Forgot?
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Lock size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
                  <input
                    type="password"
                    placeholder="Enter password or 1234"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.875rem',
                      color: '#111827',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: '3px', display: 'block' }}>
                  Tip: Demo accounts can use <code>password123</code> or any 4-digit OTP.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-blinkit-green"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  justifyContent: 'center',
                  marginTop: '4px',
                }}
              >
                {loading ? 'Verifying...' : 'Login & Continue'}
                <ArrowRight size={17} />
              </button>

              {/* 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#1c1c1c',
                  border: '1px solid #e5e7eb',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={15} color="#b45309" />
                <span>Quick 1-Click Demo Login (Ashish Mohanty)</span>
              </button>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>
                  Full Name
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 12px' }}>
                  <UserIcon size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    placeholder="e.g. Ashish Mohanty"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>
                    Mobile Number
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 10px' }}>
                    <Phone size={15} color="#9ca3af" style={{ marginRight: '6px' }} />
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      required
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>
                    Email
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 10px' }}>
                    <Mail size={15} color="#9ca3af" style={{ marginRight: '6px' }} />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>
                  Delivery Address / City
                </label>
                <input
                  type="text"
                  placeholder="Flat No, Apartment, Indiranagar, Bengaluru"
                  value={signupAddress}
                  onChange={(e) => setSignupAddress(e.target.value)}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    width: '100%',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '4px' }}>
                  Password
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 12px' }}>
                  <Lock size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-blinkit-green"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  justifyContent: 'center',
                  marginTop: '4px',
                }}
              >
                {loading ? 'Creating...' : 'Create Nutritva Account'}
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {/* Bottom Security Guarantee */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: '#6b7280', marginTop: '20px' }}>
            <ShieldCheck size={14} color="var(--blinkit-green)" />
            <span>Encrypted • 100% Purity & Privacy Assured</span>
          </div>
        </div>
      </div>
    </div>
  );
};
