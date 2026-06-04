import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onDone }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const doneTimer = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#141E2B',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div style={{ animation: 'splashPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <img
          src="/rayon.jpg"
          alt="Murera FC"
          style={{
            width: 120, height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #FFD700',
            boxShadow: '0 0 40px rgba(255,215,0,0.4)',
          }}
        />
      </div>

      {/* Club name */}
      <div style={{
        marginTop: 20,
        fontFamily: 'Oswald, sans-serif',
        fontSize: 28,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: 3,
        animation: 'splashFadeUp 0.6s 0.3s both',
      }}>
        MURERA FC
      </div>

      {/* Loading bar */}
      <div style={{
        marginTop: 32,
        width: 160,
        height: 4,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
        overflow: 'hidden',
        animation: 'splashFadeUp 0.6s 0.4s both',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #1565C0, #FFD700)',
          borderRadius: 4,
          animation: 'splashBar 2s 0.3s ease-in-out both',
        }} />
      </div>

      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
