"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import "../../styles/global.scss";
import Sidebar from '../../components/sidebar';
import AnimatedReveal from '../../components/AnimatedReveal';
import { motion } from "framer-motion";

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setOrder({
                id: id,
                date: '2026-03-15',
                status: 'Processing',
                customer: {
                    name: 'Alex Vast',
                    email: 'alex.v@example.com',
                    company: 'Vast Systems Inc.'
                },
                items: [
                    { name: "Ribeye 400g", qty: 2, price: 120.00 },
                    { name: "Truffle Fries", qty: 1, price: 18.00 },
                    { name: "Charred Asparagus", qty: 2, price: 24.00 }
                ],
                timeline: [
                    { time: '10:00 AM', event: 'Order Placed' },
                    { time: '10:05 AM', event: 'Payment Confirmed' },
                    { time: '10:30 AM', event: 'Kitchen Preparation' },
                ]
            });
        }, 500);
    }, [id]);

    if (!order) return (
        <div className="vast-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="text-mono">LOADING DATA_STREAM...</div>
        </div>
    );

    return (
        <div className="vast-container">
            <Sidebar />
            <motion.main 
                className="main-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div style={{ marginBottom: '4rem' }}>
                    <button 
                        onClick={() => router.back()} 
                        className="text-mono" 
                        style={{ border: 'none', background: 'none', cursor: 'pointer', marginBottom: '2rem', fontSize: '1.2rem' }}
                    >
                        ← BACK TO LOGS
                    </button>
                    
                    <AnimatedReveal>
                         <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', lineHeight: 0.9 }}>
                            ORDER<br/>{decodeURIComponent(id as string)}
                        </h1>
                    </AnimatedReveal>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
                    
                    {/* LEFT COLUMN: DETAILS */}
                    <AnimatedReveal delay={0.2} style={{ width: '100%' }}>
                        <section style={{ border: '1px solid black', padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid black', paddingBottom: '1rem' }}>DETAILS</h2>
                            <div style={{ marginBottom: '2rem' }}>
                                <div className="text-mono" style={{ color: '#666', marginBottom: '0.5rem' }}>STATUS</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{order.status}</div>
                            </div>
                             <div style={{ marginBottom: '2rem' }}>
                                <div className="text-mono" style={{ color: '#666', marginBottom: '0.5rem' }}>CUSTOMER</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{order.customer.name}</div>
                                <div className="text-mono">{order.customer.company}</div>
                            </div>
                        </section>
                    </AnimatedReveal>
                    
                    {/* RIGHT COLUMN: ITEMS */}
                    <AnimatedReveal delay={0.3} style={{ width: '100%' }}>
                        <section style={{ border: '1px solid black', padding: '2rem', background: '#f9f9f9' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid black', paddingBottom: '1rem' }}>MANIFEST</h2>
                             <table style={{ width: '100%', marginBottom: '2rem' }}>
                                <tbody>
                                    {order.items.map((item: any, i: number) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{item.qty}x {item.name}</td>
                                            <td className="text-mono" style={{ textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', borderTop: '2px solid black', paddingTop: '1rem' }}>
                                <span>TOTAL</span>
                                <span>${order.items.reduce((acc: any, item: any) => acc + item.price, 0).toFixed(2)}</span>
                             </div>
                        </section>
                    </AnimatedReveal>

                    {/* BOTTOM: TIMELINE */}
                     <AnimatedReveal delay={0.4} style={{ width: '100%', gridColumn: '1 / -1' }}>
                         <section style={{ marginTop: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>ACTIVITY LOG</h2>
                            <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem' }}>
                                {order.timeline.map((event: any, i: number) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                        style={{ minWidth: '200px', borderLeft: '2px solid black', paddingLeft: '1rem' }}
                                    >
                                        <div className="text-mono" style={{ marginBottom: '0.5rem' }}>{event.time}</div>
                                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{event.event}</div>
                                    </motion.div>
                                ))}
                                <motion.div 
                                     initial={{ opacity: 0 }}
                                     whileInView={{ opacity: 1 }}
                                     transition={{ delay: 0.8 }}
                                     style={{ minWidth: '200px', borderLeft: '2px dotted #ccc', paddingLeft: '1rem', display: 'flex', alignItems: 'center' }}
                                >
                                    <span className="text-mono" style={{ fontStyle: 'italic' }}>Awaiting Updates...</span>
                                </motion.div>
                            </div>
                         </section>
                     </AnimatedReveal>
                </div>
            </motion.main>
        </div>
    );
}