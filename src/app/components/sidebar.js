"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- SVG ICONS (Simplified for Minimalist Theme) ---
// Note: We'll render icons directly in the map loop to simplify scope

const LogoIcon = () => (
    <div style={{ padding: '1rem 0', fontWeight: '900', fontSize: '1.5rem', textTransform: 'uppercase', borderBottom: '2px solid black' }}>
        VAST/UNIQUE
    </div>
);

const menuItems = [
  { name: 'Dashboard', icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z", href: '/' },
  { name: 'Menu', icon: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z", href: '/menu' },
  { name: 'Explore', icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z", href: '/explore' },
  { name: 'Orders', icon: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z", href: '/orders' },
  { name: 'Global', icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96z", href: '/global' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Basic mobile detection
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
            className="btn-vast" 
            style={{ 
                position: 'fixed', 
                top: '1rem', 
                right: '1rem', 
                zIndex: 200, 
                padding: '0.5rem 1rem', 
                fontSize: '1rem',
                background: 'white',
                border: '1px solid black',
                cursor: 'pointer'
            }}
            onClick={toggleSidebar}
        >
            {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      )}

      <aside 
        className={`sidebar-root ${isOpen ? 'open' : ''}`}
        style={{
            transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
            transition: 'transform 0.3s ease'
        }}
      >
        <LogoIcon />
        
        <nav style={{ flex: 1, marginTop: '2rem' }}>
          {menuItems.map((item) => (
            <Link 
                key={item.name} 
                href={item.href} 
                className="nav-link" 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }} 
                onClick={() => isMobile && setIsOpen(false)}
            >
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                <path d={item.icon} />
              </svg>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="text-mono" style={{ fontSize: '0.8rem', opacity: 0.5 }}>
            SYSTEM v4.0<br/>EST 2026
        </div>
      </aside>
    </>
  );
}
