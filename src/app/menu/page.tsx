"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/global.scss";
import Sidebar from '../components/sidebar';
import AnimatedReveal from '../components/AnimatedReveal';
import { motion } from "framer-motion";

export default function MenuPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuCategories = [
    { title: "Starters & Small Plates", items: ["Truffle Arancini", "Burrata & Heirloom", "Beef Carpaccio", "Grilled Octopus"] },
    { title: "Mains & Butcher's Cuts", items: ["Ribeye 400g", "Tomahawk Steering", "Lamb Rack", "Wagyu A5 Flight"] },
    { title: "Sides & Accompaniments", items: ["Truffle Fries", "Creamed Spinach", "Charred Asparagus", "Bone Marrow Mash"] },
  ];

  if (!mounted) return null;

  return (
    <div className="vast-container">
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '6rem' }}>
          <AnimatedReveal>
            <h1 className="vast-title" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                THE<br/>MENU
            </h1>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2}>
            <p className="text-mono">SEASON 04 // 2026 // CULINARY INDEX</p>
          </AnimatedReveal>
        </header>

        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {menuCategories.map((category, index) => (
            <AnimatedReveal key={index} delay={0.2 * index} style={{ width: '100%' }}>
                <section className="menu-category" style={{ borderTop: '4px solid black', paddingTop: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textTransform: 'uppercase' }}>0{index + 1} / {category.title}</h2>
                <ul style={{ listStyle: 'none' }}>
                    {category.items.map((item, i) => (
                    <motion.li 
                        key={i} 
                        whileHover={{ x: 10, backgroundColor: "#000", color: "#fff" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => router.push(`/menu/${encodeURIComponent(item.replace(/\s+/g, '-').toLowerCase())}`)}
                        style={{ 
                            padding: '1.5rem 1rem', // Added padding for hover effect
                            borderBottom: '1px solid #ddd', 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            marginLeft: '-1rem', // Compensate for padding
                            marginRight: '-1rem'
                        }}
                    >
                        <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item}</span>
                        <span className="text-mono">$ {(20 + item.length * 1.5).toFixed(2)}</span>
                    </motion.li>
                    ))}
                </ul>
                </section>
            </AnimatedReveal>
          ))}
        </div>
        
        <AnimatedReveal delay={0.5}>
            <div style={{ marginTop: '8rem', border: '1px solid black', padding: '4rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '3rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Dietary Index</h3>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                    All allergens are strictly monitored. Please consult the digital manifest for detailed ingredient breakdowns.
                </p>
                <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "transparent", color: "black" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-cta" 
                    style={{ marginTop: '2rem' }}
                >
                    Download PDF
                </motion.button>
            </div>
        </AnimatedReveal>
      </main>
    </div>
  );
}