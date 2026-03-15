"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import "../../styles/global.scss";
import Sidebar from '../../components/sidebar';
import AnimatedReveal from '../../components/AnimatedReveal';
import VastVideoBackground from '../../components/VastVideoBackground';
import { motion, useScroll, useTransform } from "framer-motion";

export default function MenuItemPage() {
    const params = useParams();
    const router = useRouter();
    const slug = typeof params.slug === 'string' ? decodeURIComponent(params.slug) : '';
    const { scrollY } = useScroll();
    
    // Parallax for content
    const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <div className="vast-container">
            <Sidebar />
            
            <motion.main 
                className="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ padding: 0 }} // Full width for this page
            >
                {/* LARGE HERO VIDEO SECTION */}
                <section className="item-hero">
                    <VastVideoBackground />
                    
                    <motion.div className="item-hero-wrapper" style={{ y: yHero, opacity: opacityHero }}>
                        <AnimatedReveal>
                            <div className="text-mono" style={{ marginBottom: '1rem', background: 'black', color: 'white', display: 'inline-block', padding: '0.2rem 0.5rem' }}>
                                CULINARY ARCHIVE // ITEM 004
                            </div>
                        </AnimatedReveal>
                        <AnimatedReveal delay={0.2}>
                            <h1 className="item-title">
                                {slug.replace(/-/g, ' ')}
                            </h1>
                        </AnimatedReveal>
                        <AnimatedReveal delay={0.4}>
                             <div className="item-meta-row">
                                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>$48.00</span>
                                <span className="text-mono">PREPARATION: 24 MIN</span>
                                <button className="btn-cta">ORDER NOW</button>
                             </div>
                        </AnimatedReveal>
                    </motion.div>
                </section>

                {/* LARGE CONTENT SECTION */}
                <div className="item-content-bg">
                    <div className="item-container">
                        
                        <div className="item-grid">
                            {/* Intro Text */}
                            <div className="item-main-col">
                                <AnimatedReveal>
                                    <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textTransform: 'uppercase' }}>Composition</h2>
                                    <p style={{ fontSize: '1.5rem', lineHeight: 1.4, marginBottom: '2rem' }}>
                                        A study in texture and absolute flavor. Sourced from the high-altitude pastures of the distinct northern regions, this dish represents the pinnacle of our minimalist philosophy. Every element serves a structural purpose.
                                    </p>
                                    <p style={{ fontSize: '1.5rem', lineHeight: 1.4 }}>
                                        Served on heated stone to maintain the temperature gradient. The reduction is prepared over 48 hours to achieve maximum viscosity without artificial thickeners.
                                    </p>
                                </AnimatedReveal>
                            </div>

                            {/* Sidebar Info */}
                            <div className="item-sidebar-col">
                                <AnimatedReveal delay={0.2}>
                                    <div style={{ borderTop: '2px solid black', paddingTop: '1rem', marginBottom: '2rem' }}>
                                        <h3 style={{ textTransform: 'uppercase', marginBottom: '0.5rem' }}>Ingredients</h3>
                                        <ul className="text-mono" style={{ listStyle: 'none' }}>
                                            <li>- Primary Protein (Grade A5)</li>
                                            <li>- Organic Root Vegetables</li>
                                            <li>- Black Garlic Essence</li>
                                            <li>- Sea Salt Crystal</li>
                                        </ul>
                                    </div>
                                    <div style={{ borderTop: '2px solid black', paddingTop: '1rem' }}>
                                        <h3 style={{ textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pairing</h3>
                                        <p className="text-mono">
                                            Recommended with robust structured reds or our house mineral water, carbonated to 4.5 vol.
                                        </p>
                                    </div>
                                </AnimatedReveal>
                            </div>
                        </div>

                        {/* Visual Breakdown "Gallery" */}
                        <section style={{ marginTop: '8rem' }}>
                            <AnimatedReveal>
                                <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.8, textTransform: 'uppercase', marginBottom: '4rem', opacity: 0.1 }}>
                                    PROCESS
                                </h2>
                            </AnimatedReveal>
                            
                            <div className="item-gallery">
                                <AnimatedReveal style={{ height: '600px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="text-mono">[ IMG_SOURCE: SEAR_TECHNIQUE_01 ]</span>
                                </AnimatedReveal>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                     <AnimatedReveal delay={0.2} style={{ height: '284px', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="text-mono">[ IMG_SOURCE: PLATING_GRID ]</span>
                                    </AnimatedReveal>
                                     <AnimatedReveal delay={0.3} style={{ height: '284px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="text-mono">[ IMG_SOURCE: TEXTURE_MACRO ]</span>
                                    </AnimatedReveal>
                                </div>
                            </div>
                        </section>

                         <section style={{ marginTop: '8rem', borderTop: '4px solid black', paddingTop: '4rem' }}>
                            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', textTransform: 'uppercase' }}>Chef's Manifest</h2>
                            <div style={{  fontSize: '1.2rem', fontFamily: 'Courier New', borderLeft: '2px solid black', paddingLeft: '2rem' }}>
                                "The radius is zero. The flavor is infinite. We removed the garnish to reveal the truth of the ingredient. No shadows to hide imperfections. Only light and form." -- Head of Culinary Architecture
                            </div>
                         </section>

                    </div>
                </div>
                
                <footer className="item-footer">
                    <div>
                        <div className="text-mono">NEXT ITEM</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>GRILLED OCTOPUS</div>
                    </div>
                    <button style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '1rem 2rem', textTransform: 'uppercase', cursor: 'pointer' }} onClick={() => router.push('/menu')}>
                        Back to Index
                    </button>
                </footer>

            </motion.main>
        </div>
    );
}