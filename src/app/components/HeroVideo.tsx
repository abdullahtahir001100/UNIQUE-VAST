"use client";
import React, { useRef, useEffect } from 'react';

export default function HeroVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let animationId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // High Contrast Lines ("Data Stream")
    const lines: {x: number, y: number, speed: number, width: number, length: number}[] = [];
    const lineCount = 150; // Increased density for "Large" feel

    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: Math.random() * 8 + 2, // Slower, heavier
            width: Math.random() * 4 + 1, // Thicker
            length: Math.random() * 400 + 100 // Much longer lines
        });
    }

    const render = () => {
      // Clear with very slight fade for motion blur effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Longer trails
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#000000'; // Black lines on white

      for (let i = 0; i < lines.length; i++) {
          const l = lines[i];
          l.y += l.speed;
          l.x += Math.sin(frame * 0.005 + i) * 0.2; // Organic drift

          if (l.y > height) {
              l.y = -l.length;
              l.x = Math.random() * width;
          }

          ctx.fillRect(l.x, l.y, l.width, l.length);
      }
      
      // Add "Noise" overlay
      if(frame % 3 === 0) {
          const noiseCount = 50;
          for(let j=0; j<noiseCount; j++) {
              const x = Math.random() * width;
              const y = Math.random() * height;
              ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.5)' : 'rgba(200,200,200,0.5)';
              ctx.fillRect(x, y, 2, 2); 
          }
      }
      
      frame++;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        {/* Overlay gradient to fade out bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '30%', background: 'linear-gradient(to bottom, transparent, white)' }} />
    </div>
  );
}