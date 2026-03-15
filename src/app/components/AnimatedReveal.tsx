"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string; // Allow passing standard classes
  style?: React.CSSProperties; // Allow custom styles
}

export default function AnimatedReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  duration = 0.8,
  className = "",
  style = {}
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        ease: [0.25, 0.4, 0.25, 1], // Cubic bezier for smooth, luxury feel
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    //   variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}