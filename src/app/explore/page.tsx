"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedReveal from '../components/AnimatedReveal';
import "../styles/global.scss";
import { motion, AnimatePresence } from "framer-motion";

interface ExploreItem {
    id: number;
    w: number;
    h: number;
    color: string;
    label: string;
    description: string;
    code: string;
}

export default function ExplorePage() {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
    const [items, setItems] = useState<ExploreItem[]>([]);

    useEffect(() => {
        // Generate items on client strictly to avoid hydration mismatch with Math.random
        const newItems = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            w: Math.random() > 0.8 ? 2 : 1,
            h: Math.random() > 0.8 ? 2 : 1,
            color: `hsl(0, 0%, ${Math.floor(Math.random() * 90)}%)`,
            label: `ARCHIVE_0${i}`,
            description: "Detailed analysis of structural integrity. Sample collected from Sector 7G. Recommended processing: Immediate sear.",
            code: `XT-${Math.floor(Math.random() * 1000)}`
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="vast-container" style={{ height: '100vh', overflow: 'hidden' }}>
            {/* NO SIDEBAR REQUESTED */}
            
            {/* Custom Exit Button since Sidebar is gone */}
            <button 
                className="btn-cta"
                style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 100, background: 'white', color: 'black' }}
                onClick={() => router.push('/')}
            >
                EXIT EXPLORE
            </button>

            <motion.div 
                className="explore-viewport"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    cursor: 'grab', 
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#f0f0f0' 
                }}
            >
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 50, pointerEvents: 'none' }}>
                    <AnimatedReveal>
                        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.8 }}>EXPLORE<br/>SYSTEM</h1>
                        <p className="text-mono">DRAG TO NAVIGATE DATABASE</p>
                    </AnimatedReveal>
                </div>

                <motion.div 
                    className="explore-grid"
                    drag
                    dragElastic={0.2}
                    dragMomentum={false} // Reduces calculation load
                    style={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '200vw', // Fixed large width instead of huge distinct grid
                        gap: '2px', 
                        padding: '100px',
                        transform: 'translateZ(0)', // GPU Force
                        willChange: 'transform'
                    }}
                >
                    {items.map((item) => (
                        <motion.div 
                            key={item.id}
                            className="explore-item"
                            // Removed layoutId for performance
                            // Removed global onClick
                            style={{ 
                                flex: `0 0 ${item.w === 2 ? '400px' : '200px'}`,
                                height: '200px',
                                background: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid black',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <span className="text-mono" style={{ mixBlendMode: 'difference', color: 'white', fontWeight: 'bold' }}>
                                {item.label}
                            </span>
                            
                            {/* Hover Overlay - Optimized */}
                            <motion.div 
                                className="item-overlay"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }} // Fast transition
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, width: '100%', height: '100%',
                                    background: 'rgba(0,0,0,0.8)',
                                    color: 'white',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <div className="text-mono" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>ID: {item.code}</div>
                                <button 
                                    className="btn-cta" 
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'white', color: 'black', cursor: 'pointer' }}
                                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop click bubble
                                        setSelectedItem(item);
                                    }}
                                >
                                    VIEW DATA
                                </button>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* DETAIL MODAL OVERLAY */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, 
                            left: 0, 
                            width: '100vw', 
                            height: '100vh', 
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflowY: 'auto'
                        }}
                        onClick={() => setSelectedItem(null)} // Click outside to close
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="detail-card"
                            style={{
                                width: '90%',
                                maxWidth: '1000px',
                                background: 'white',
                                padding: '2rem',
                                border: '2px solid black',
                                position: 'relative',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '2rem',
                                color: 'black',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
                        >
                            {/* Left Col: Visual */}
                            <div style={{ background: selectedItem.color, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h2 style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.5)', mixBlendMode: 'difference' }}>
                                    {selectedItem.code}
                                </h2>
                            </div>

                            {/* Right Col: Data */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <AnimatedReveal>
                                    <div className="text-mono" style={{ marginBottom: '1rem' }}>DATA PACKET // {selectedItem.label}</div>
                                    <h2 style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '2rem' }}>STRUCTURAL ANALYSIS</h2>
                                    <p style={{ fontSize: '1.2rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                                        {selectedItem.description}
                                        <br/><br/>
                                        Data confirms high integrity. Suitable for next phase of culinary development.
                                    </p>
                                    
                                    <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem', marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span className="text-mono">DENSITY</span>
                                            <span className="text-mono">89%</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span className="text-mono">PURITY</span>
                                            <span className="text-mono">99.9%</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span className="text-mono">ORIGIN</span>
                                            <span className="text-mono">SECTOR 04</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="btn-cta" 
                                        style={{ marginTop: '2rem', width: '100%' }}
                                        onClick={() => setSelectedItem(null)}
                                    >
                                        CLOSE TERMINAL
                                    </button>
                                </AnimatedReveal>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}