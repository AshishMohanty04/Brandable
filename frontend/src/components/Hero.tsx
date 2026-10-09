import { useState, useRef } from 'react';
import { ArrowRight, Flame, Star, Check, Play, Pause, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreMakhana: () => void;
}

export const Hero = ({ onShopNow, onExploreMakhana }: HeroProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false, mouseX: 50, mouseY: 50 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroTabs = [
    {
      title: 'Farm-Fresh Almonds & Roasted Makhanas',
      desc: 'Craving clean, guilt-free crunch? Experience slow-roasted lotus seeds and whole California almonds harvested at peak nutrition and delivered in 10 minutes.',
      image: '/images/hero_banner.jpg',
      floatTitle: 'Assorted Harvest Munchies',
      floatSubtitle: 'California Almonds & Roasted Makhanas',
      badge: '100% PURE HARVEST',
      calories: '164 kcal / serving',
    },
    {
      title: 'Spicy Peri Peri Makhana in Cold-Pressed Olive Oil',
      desc: 'Crispy popped lotus seeds tossed in fiery peri-peri spices. Zero palm oil, zero trans fat, low calorie and high in clean plant calcium.',
      image: '/images/makhana.jpg',
      floatTitle: 'Peri Peri Roasted Makhana',
      floatSubtitle: 'Zero Palm Oil • High Plant Protein',
      badge: 'POPULAR CRUNCH',
      calories: '110 kcal / serving',
    },
    {
      title: 'Crunchy California Almonds Packed with Vitamin E',
      desc: 'Handpicked Grade A whole almonds with rich natural oil concentration. Perfect for daily morning soaked rituals and midday brain fuel.',
      image: '/images/almonds.jpg',
      floatTitle: 'California Almonds Grade A',
      floatSubtitle: '100% Whole & Handpicked',
      badge: 'CHEF GRADE A',
      calories: '160 kcal / serving',
    },
  ];

  const current = heroTabs[activeTab];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const x = xRatio - 0.5;
    const y = yRatio - 0.5;
    
    // Tilt between -14 and +14 degrees
    setTilt({
      x: -(y * 22),
      y: x * 22,
      active: true,
      mouseX: Math.round(xRatio * 100),
      mouseY: Math.round(yRatio * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false, mouseX: 50, mouseY: 50 });
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#07150c',
        color: '#ffffff',
        overflow: 'hidden',
        minHeight: '620px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 0 24px 0',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Cinematic Background Video Layer */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_banner.jpg"
          className="hero-video-media"
        >
          <source src="/golden_harvest.webm" type="video/webm" />
          <source src="/harvest_bg.webm" type="video/webm" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* Floating 3D Ambient Video Controller */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <button
          onClick={toggleVideoPlayback}
          className="glass-panel-3d"
          style={{
            padding: '7px 14px',
            borderRadius: '20px',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 800,
            transition: 'all 0.2s ease',
          }}
          title={isVideoPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isVideoPlaying ? <Pause size={13} fill="#f8cb46" color="#f8cb46" /> : <Play size={13} fill="#f8cb46" color="#f8cb46" />}
          <span>{isVideoPlaying ? '3D Video On' : 'Video Paused'}</span>
        </button>
      </div>

      {/* 2. Main 3D Hero Foreground */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            alignItems: 'center',
            gap: '48px',
            minHeight: '460px',
            paddingBottom: '36px',
          }}
        >
          {/* Left Column: 3D Layered Typography & Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', transformStyle: 'preserve-3d' }}>
            {/* 3D Glass Pill Tag */}
            <div
              className="glass-panel-3d"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '30px',
                width: 'fit-content',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--blinkit-yellow)',
                  boxShadow: '0 0 10px var(--blinkit-yellow)',
                }}
              />
              <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--blinkit-yellow)' }}>
                ⚡ 10-Minute Express Farm Delivery
              </span>
            </div>

            {/* Main 3D Title */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                color: '#ffffff',
                letterSpacing: '-0.035em',
                textShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
                margin: 0,
              }}
            >
              {current.title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.88)',
                lineHeight: 1.6,
                maxWidth: '540px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                margin: 0,
              }}
            >
              {current.desc}
            </p>

            {/* 3D Elevated CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
              <button
                onClick={onShopNow}
                className="btn-3d-primary"
                style={{
                  fontSize: '1rem',
                  padding: '13px 26px',
                  borderRadius: '12px',
                }}
              >
                <span>Order Now (10 Mins)</span>
                <ArrowRight size={19} />
              </button>

              <button
                onClick={onExploreMakhana}
                className="btn-3d-gold"
                style={{
                  fontSize: '1rem',
                  padding: '13px 24px',
                  borderRadius: '12px',
                }}
              >
                <Flame size={19} color="#b45309" fill="#b45309" />
                <span>Explore Makhanas</span>
              </button>
            </div>

            {/* 3D Slide Switcher Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              {heroTabs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    width: activeTab === idx ? '36px' : '10px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: activeTab === idx ? 'var(--blinkit-yellow)' : 'rgba(255, 255, 255, 0.35)',
                    boxShadow: activeTab === idx ? '0 0 10px var(--blinkit-yellow)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0,
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* 3D Glass Social Proof Ticker */}
            <div
              className="glass-panel-3d"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 18px',
                borderRadius: '16px',
                width: 'fit-content',
                marginTop: '6px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--blinkit-yellow)" color="var(--blinkit-yellow)" />
                ))}
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                4.9/5 Rating <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span> 5 Lakh+ Orders
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(12, 131, 31, 0.35)',
                  border: '1px solid rgba(12, 131, 31, 0.8)',
                  color: '#4ade80',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                <Check size={13} /> 100% Whole Guaranteed
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Parallax Showcase Card */}
          <div
            className="perspective-container"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient Behind Glow Aura */}
            <div
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(248, 203, 70, 0.45) 0%, rgba(12, 131, 31, 0.3) 50%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Floating 3D Top Badge */}
            <div
              className="floating-3d-chip glass-panel-3d"
              style={{
                position: 'absolute',
                top: '-18px',
                right: '12px',
                zIndex: 12,
                padding: '8px 16px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(18, 56, 38, 0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              <Sparkles size={16} color="var(--blinkit-yellow)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#ffffff' }}>
                {current.badge}
              </span>
            </div>

            {/* Floating 3D Calorie / Nutrition Chip */}
            <div
              className="floating-3d-chip-alt glass-panel-3d"
              style={{
                position: 'absolute',
                bottom: '84px',
                left: '-20px',
                zIndex: 12,
                padding: '8px 16px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#1c1c1c',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.35)',
              }}
            >
              <Zap size={15} fill="var(--blinkit-green)" color="var(--blinkit-green)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>
                {current.calories}
              </span>
            </div>

            {/* The 3D Interactive Tilting Showcase Card */}
            <div
              className="card-3d-wrapper"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                borderRadius: '26px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: tilt.active
                  ? '0 35px 70px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(248, 203, 70, 0.3)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.active ? 1.03 : 1}, ${tilt.active ? 1.03 : 1}, 1)`,
              }}
            >
              {/* Dynamic 3D Specular Light Flare */}
              <div
                className="card-3d-shine"
                style={{
                  '--mouse-x': `${tilt.mouseX}%`,
                  '--mouse-y': `${tilt.mouseY}%`,
                } as React.CSSProperties}
              />

              <img
                src={current.image}
                alt={current.title}
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
              />

              {/* Bottom 3D Glass Info Bar */}
              <div
                className="glass-panel-3d-light"
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  padding: '14px 18px',
                  borderRadius: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#1c1c1c' }}>
                    {current.floatTitle}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--blinkit-green)', fontWeight: 800, marginTop: '2px' }}>
                    {current.floatSubtitle}
                  </div>
                </div>

                <button
                  onClick={onShopNow}
                  className="btn-blinkit-add"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: 900,
                    fontSize: '0.88rem',
                    boxShadow: '0 4px 12px rgba(12, 131, 31, 0.25)',
                  }}
                >
                  <span>ADD</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 4-Pillar Trust Bar Transformed into 3D Glass Tiles */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { icon: '⚡', title: 'Express 10-Min Delivery', desc: 'Direct from nearby dark store' },
            { icon: '🌾', title: '100% Whole Sun-Dried', desc: 'Harvested from 5,000+ growers' },
            { icon: '🍿', title: 'Slow Roasted in Olive Oil', desc: 'Zero palm oil, zero trans fat' },
            { icon: '💰', title: 'Direct Value Packs', desc: 'Best price purity guarantee' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel-3d"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--blinkit-yellow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <div
                style={{
                  fontSize: '1.6rem',
                  lineHeight: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#ffffff' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.72)', marginTop: '2px' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
