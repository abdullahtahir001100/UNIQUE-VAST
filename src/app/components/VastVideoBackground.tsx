"use client";
import React, { useRef, useEffect } from 'react';

export default function VastVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // VAST PARTICLES
    const particles: {x: number, y: number, size: number, speed: number, offset: number}[] = [];
    const particleCount = 150; // Dense

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 300 + 50, // MASSIVE PARTICLES
            speed: Math.random() * 0.2 + 0.05, // Slow, heavy movement
            offset: Math.random() * 100
        });
    }

    const render = () => {
      // Trail effect for "Video" feel
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; 
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      particles.forEach(p => {
          // Complex organic movement
          p.y -= p.speed * 2;
          p.x += Math.sin(time + p.offset) * 0.5;

          if (p.y < -p.size) {
              p.y = height + p.size;
              p.x = Math.random() * width;
          }

          // Draw Abstract Shapes (The "Video")
          ctx.beginPath();
          // Using strict geometric rectangles as per theme, but flowing
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.rect(p.x, p.y, p.size / 10, p.size); // Tall pillars
          ctx.fill();
          
          if (p.size > 250) {
             ctx.strokeStyle = 'rgba(0,0,0,0.2)';
             ctx.lineWidth = 2;
             ctx.strokeRect(p.x - 20, p.y + 50, p.size / 5, p.size / 2);
          }
      });
      
      // Post-processing-like overlay (Scanlines)
      ctx.fillStyle = 'rgba(0,0,0,0.02)';
      for(let y=0; y<height; y+=4) {
          ctx.fillRect(0, y, width, 1);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', background: 'white' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}