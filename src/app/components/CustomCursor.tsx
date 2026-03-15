"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate if client-side and not touch device
    if (typeof window === 'undefined' || window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    window.addEventListener('mousemove', moveCursor);

    const addListeners = () => {
        const interactiveElements = document.querySelectorAll('a, button, .btn-cta, input, textarea, select, .interactive, .nav-link');
        interactiveElements.forEach(el => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
    };

    addListeners();
    
    // Observer for new elements (like routed pages)
    const observer = new MutationObserver((mutations) => {
        addListeners();
    });
    
    if(document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, .btn-cta, input, textarea, select, .interactive');
      interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0, 
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        opacity: isVisible ? 1 : 0
      }}
    >
        {/* Main Cursor: Transforms on hover */}
        <motion.div 
            className="cursor-inner"
            style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'white',
                transformOrigin: 'center center',
                position: 'absolute',
                top: '-5px', // Center offset manually since width/height is 10
                left: '-5px'
            }}
            animate={{
                scale: hovered ? 3 : 1,
                rotate: hovered ? 45 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        {/* Semantic Crosshair */}
        <motion.div 
            className="cursor-crosshair horizontal"
            style={{
                height: '1px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '0', 
                left: '50%',
                transform: 'translateX(-50%)'
            }}
            animate={{ width: hovered ? 80 : 40, opacity: hovered ? 0.8 : 0.3 }}
        />
        <motion.div 
            className="cursor-crosshair vertical" 
             style={{
                width: '1px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)' 
            }}
            animate={{ height: hovered ? 80 : 40, opacity: hovered ? 0.8 : 0.3 }}
        />
    </motion.div>
  );
}