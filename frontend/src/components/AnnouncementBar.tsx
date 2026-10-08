import { useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck, Tag } from 'lucide-react';

export const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 12, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div
      style={{
        backgroundColor: 'var(--blinkit-yellow)',
        color: '#1c1c1c',
        padding: '8px 16px',
        fontSize: '0.825rem',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Zap size={16} fill="#1c1c1c" />
        <span>DELIVERING HEALTHY CRUNCH IN 10-15 MINS</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#ffffff',
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <Tag size={13} color="var(--blinkit-green)" />
        <span>
          Use Code <strong style={{ color: 'var(--blinkit-green)' }}>BLINK15</strong> for 15% OFF
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Clock size={14} />
        <span>
          Next delivery slot in: <strong>{formatNum(timeLeft.minutes)}m {formatNum(timeLeft.seconds)}s</strong>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ShieldCheck size={16} color="var(--blinkit-green)" />
        <span>100% Farm-Direct Certified</span>
      </div>
    </div>
  );
};
