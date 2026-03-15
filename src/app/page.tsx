"use client"; // Interactive
import Image from "next/image";
import "./styles/global.scss";
import Sidebar from './components/sidebar';
import AnimatedReveal from './components/AnimatedReveal';
import HeroVideo from './components/HeroVideo'; // New Component
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
   <div className="vast-container" style={{ position: 'relative' }}>
    <Sidebar />
    <motion.main 
      className="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <header style={{ 
          height: '100vh', // Hero Section Height
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          position: 'relative' 
      }}>
        <HeroVideo />

        <AnimatedReveal>
            <motion.h1 style={{ y: y1 }} className="vast-title">
            UNIQUE<br/>
            & VAST
            </motion.h1>
        </AnimatedReveal>
        
        <AnimatedReveal delay={0.2}>
            <motion.div style={{ opacity }}>
                <p className="text-mono">
                System v1.0 // Theme: Light // Radius: 0px // Shadow: None
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '10px', height: '10px', background: 'red', borderRadius: '50%' }} className="animate-pulse"></div>
                    <span className="text-mono">LIVE FEED ACTIVE</span>
                </div>
            </motion.div>
        </AnimatedReveal>
      </header>

      <section className="grid-features">
        <AnimatedReveal delay={0.3} style={{ width: '100%' }}>
            <article className="feature-card">
            <h2>Design</h2>
            <p>
                Pure geometry. No distractions. The absence of rounded corners emphasizes structure and logic.
            </p>
            <a href="#" className="btn-cta">Explore System</a>
            </article>
        </AnimatedReveal>

        <AnimatedReveal delay={0.4} style={{ width: '100%' }}>
            <article className="feature-card">
            <h2>Function</h2>
            <p>
                High contrast for maximum legibility. Interactions are instant and precise.
            </p>
            <a href="#" className="btn-cta">View Metrics</a>
            </article>
        </AnimatedReveal>
        
        <AnimatedReveal delay={0.5} style={{ width: '100%' }}>
            <article className="feature-card">
            <h2>Scale</h2>
            <p>
                Built for large datasets and complex operations. The grid adapts to any viewport.
            </p>
            <a href="#" className="btn-cta">Manage Data</a>
            </article>
        </AnimatedReveal>
      </section>

      <section style={{ marginTop: '8rem', borderTop: '2px solid black', padding: '4rem 0' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
            <AnimatedReveal delay={0.2}>
                <div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '1px solid black', display: 'inline-block' }}>Stats</h3>
                    <div className="text-mono" style={{ marginTop: '1rem' }}>
                        Users: 14,204<br/>
                        Uptime: 99.99%<br/>
                        Latency: 12ms<br/>
                        Error Rate: 0.001%
                    </div>
                </div>
            </AnimatedReveal>
            <AnimatedReveal delay={0.3}>
                <div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '1px solid black', display: 'inline-block' }}>Status</h3>
                    <div className="text-mono" style={{ marginTop: '1rem' }}>
                        All Systems Operational<br/>
                        Last Backup: 12m ago<br/>
                        Security: Active<br/>
                        Firewall: Enforced
                    </div>
                </div>
            </AnimatedReveal>
            <AnimatedReveal delay={0.4}>
                <div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '1px solid black', display: 'inline-block' }}>Build Info</h3>
                    <div className="text-mono" style={{ marginTop: '1rem' }}>
                        Version: 2.4.0-alpha<br/>
                        Branch: production<br/>
                        Commit: 8f92a1c<br/>
                        Region: us-east-1
                    </div>
                </div>
            </AnimatedReveal>
         </div>
      </section>

      <section style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
        <AnimatedReveal>
            <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Latest Activity</h2>
        </AnimatedReveal>
        <div style={{ border: '1px solid black' }}>
            {[1, 2, 3, 4, 5].map((i) => (
                <AnimatedReveal key={i} delay={0.1 * i} direction="left">
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', borderBottom: i < 5 ? '1px solid black' : 'none', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <span className="text-mono">0{i}:24:1{i}</span>
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>System Update Module {i}</span>
                        </div>
                        <span className="text-mono">COMPLETED</span>
                    </div>
                </AnimatedReveal>
            ))}
        </div>
      </section>

    </motion.main>
   </div>
  );
}
