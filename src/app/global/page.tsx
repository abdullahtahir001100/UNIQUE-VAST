"use client";
import React from 'react';
import "../styles/global.scss";
import Sidebar from '../components/sidebar';
import AnimatedReveal from '../components/AnimatedReveal';
import { motion } from "framer-motion";

export default function GlobalPage() {
  return (
    <div className="vast-container">
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '6rem' }}>
          <AnimatedReveal>
            <h1 className="vast-title" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                GLOBAL<br/>NETWORK
            </h1>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2}>
            <p className="text-mono">WORLDWIDE OPERATIONS // LIVE CONNECTION</p>
          </AnimatedReveal>
        </header>

        <AnimatedReveal delay={0.3} style={{ width: '100%' }}>
            <div className="globe-visualization" style={{ 
                width: '100%', 
                height: '60vh', 
                border: '2px solid black', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: '#fff' 
            }}>
                {/* Abstract representation of a globe/map with animation */}
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(20, 1fr)', 
                    gridTemplateRows: 'repeat(10, 1fr)',
                    gap: '1px',
                    position: 'absolute'
                }}>
                    {Array.from({ length: 200 }).map((_, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0.1 }}
                            animate={{ opacity: [0.1, 0.5, 0.1] }}
                            transition={{ 
                                duration: Math.random() * 3 + 2, 
                                repeat: Infinity, 
                                delay: Math.random() * 2 
                            }}
                            style={{ 
                                background: Math.random() > 0.9 ? 'black' : '#eee',
                            }} 
                        />
                    ))}
                </div>
                
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ position: 'relative', zIndex: 10, background: 'white', padding: '2rem', border: '1px solid black' }}
                >
                    <h4 style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '2rem' }}>Status: ONLINE</h4>
                </motion.div>

                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'white', padding: '1rem', border: '1px solid black', zIndex: 10 }}>
                    <h4 style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Active Nodes</h4>
                    <div className="text-mono">NYC / LDN / TOK / SYD / BER</div>
                </div>
            </div>
        </AnimatedReveal>

        <section style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <AnimatedReveal delay={0.4}>
                <motion.div whileHover={{ y: -10 }} style={{ padding: '2rem', border: '1px solid black', background: 'white' }}>
                    <h3 style={{ fontSize: '4rem', lineHeight: '1' }}>24</h3>
                    <p className="text-mono">REGIONS ACTIVE</p>
                </motion.div>
            </AnimatedReveal>
            <AnimatedReveal delay={0.5}>
                <motion.div whileHover={{ y: -10 }} style={{ padding: '2rem', border: '1px solid black', background: 'white' }}>
                    <h3 style={{ fontSize: '4rem', lineHeight: '1' }}>112</h3>
                    <p className="text-mono">PARTNER LOCATIONS</p>
                </motion.div>
            </AnimatedReveal>
            <AnimatedReveal delay={0.6}>
                <motion.div whileHover={{ y: -10 }} style={{ padding: '2rem', border: '1px solid black', background: 'white' }}>
                    <h3 style={{ fontSize: '4rem', lineHeight: '1' }}>0.4s</h3>
                    <p className="text-mono">SYNC LATENCY</p>
                </motion.div>
            </AnimatedReveal>
        </section>

      </main>
    </div>
  );
}