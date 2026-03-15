"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/global.scss";
import Sidebar from '../components/sidebar';
import AnimatedReveal from '../components/AnimatedReveal';
import { motion } from "framer-motion";

interface Order {
    id: string;
    date: string;
    status: string;
    total: string;
    items: number;
}

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Deterministic generation based on index to avoid hydration mismatch
        const newOrders = Array.from({ length: 8 }).map((_, i) => ({
            id: `ORD-2026-${8492 + i}`,
            date: `2026-03-${String(15 - i).padStart(2, '0')}`,
            status: i === 0 ? 'Pending' : i === 1 ? 'Processing' : 'Fulfilled',
            total: (100 + (i * 50.5)).toFixed(2), // Deterministic math
            items: (i % 5) + 1
        }));
        setOrders(newOrders);
    }, []);

  return (
    <div className="vast-container">
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '6rem' }}>
          <AnimatedReveal>
            <h1 className="vast-title">
                ORDER<br/>LOGS
            </h1>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2}>
            <p className="text-mono">TRANSACTION HISTORY // REAL-TIME TRACKING</p>
          </AnimatedReveal>
        </header>

        <div className="orders-list">
            {/* Header Row (Desktop Only) */}
            <div className="order-row header hidden-mobile" style={{borderBottom: '2px solid black', padding: '1rem', fontWeight: 'bold', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr', textTransform: 'uppercase'}}>
                <div>Order ID</div>
                <div>Date</div>
                <div>Items</div>
                <div>Status</div>
                <div style={{textAlign: 'right'}}>Total</div>
                <div style={{textAlign: 'center'}}>Action</div>
            </div>

            {orders.map((order, i) => (
                <AnimatedReveal key={order.id} delay={i * 0.1}>
                    <motion.div 
                        className="order-row interactive"
                        whileHover={{ background: 'black', color: 'white', x: 10 }}
                        onClick={() => router.push(`/orders/${order.id}`)}
                        style={{
                            borderBottom: '1px solid #ddd',
                            padding: '1.5rem 1rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', // Responsive Fallback
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    >
                        {/* Desktop Grid Layout via inline-styles override or class */}
                        <div className="cell-id" style={{fontWeight: 'bold'}}>{order.id}</div>
                        <div className="cell-date text-mono">{order.date}</div>
                        <div className="cell-items text-mono">{order.items} ITEMS</div>
                        <div className="cell-status">
                            <span style={{
                                padding: '0.2rem 0.6rem', 
                                border: '1px solid currentColor', 
                                fontSize: '0.8rem', 
                                textTransform: 'uppercase'
                            }}>
                                {order.status}
                            </span>
                        </div>
                        <div className="cell-total" style={{textAlign: 'right', fontWeight: 'bold'}}>${order.total}</div>
                        <div className="cell-action" style={{textAlign: 'center'}}>
                            <span style={{fontSize: '1.5rem'}}>→</span>
                        </div>
                    </motion.div>
                </AnimatedReveal>
            ))}
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
             <AnimatedReveal delay={0.6} direction="left">
                <button className="btn-cta">Export CSV</button>
             </AnimatedReveal>
             <AnimatedReveal delay={0.7} direction="left">
                <button className="btn-cta">Print Manifest</button>
             </AnimatedReveal>
        </div>
      </main>
    </div>
  );
}