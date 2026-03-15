"use client";
import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const scrollRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    scrollRef.current = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // VAST GRID SYSTEM
    const gridSize = 60;
    const points: {x: number, y: number, z: number}[] = [];
    
    // Create a grid of points
    for (let x = -width; x < width * 2; x += gridSize) {
        for (let y = -height; y < height * 2; y += gridSize) {
            points.push({ x, y, z: Math.random() * 2 });
        }
    }

    const render = () => {
      ctx.fillStyle = '#ffffff'; // Clear with theme bg
      ctx.fillRect(0, 0, width, height);
      
      const scrollFactor = scrollRef.current * 0.5;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; // Very subtle grid lines
      ctx.lineWidth = 1;

      // Draw a distorted grid based on scroll
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Simple parallax movement
        const y = (p.y - scrollFactor * p.z) % (height + 200);
        const displayY = y < -100 ? y + height + 200 : y;

        // Draw point (optional)
        // ctx.fillRect(p.x, displayY, 2, 2);
        
        // Draw lines connecting nearby points (simplified for performance)
        // This is a stylistic choice for "Vast" geometry
        const size = (Math.sin((p.x + scrollRef.current) * 0.002) + 1) * 2;
        
        ctx.save();
        ctx.translate(p.x, displayY);
        // Rotate based on scroll
        ctx.rotate(scrollRef.current * 0.0005 * p.z);
        ctx.strokeRect(-gridSize/2, -gridSize/2, gridSize * size, gridSize * size);
        ctx.restore();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: -1,
            pointerEvents: 'none'
        }} 
    />
  );
}