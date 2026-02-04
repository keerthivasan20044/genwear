import React, { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderAPI.getMyOrders();
                setOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const StatusBadge = ({ status }) => {
        const styles = {
            pending: 'bg-yellow-50 text-yellow-600 border-yellow-100',
            confirmed: 'bg-blue-50 text-blue-600 border-blue-100',
            processing: 'bg-purple-50 text-purple-600 border-purple-100',
            shipped: 'bg-indigo-50 text-indigo-600 border-indigo-100',
            delivered: 'bg-green-50 text-green-600 border-green-100',
            cancelled: 'bg-red-50 text-red-600 border-red-100',
        };

        return (
            <span className={`px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] ${styles[status] || styles.pending}`}>
                {status}
            </span>
        );
    };

    if (loading) return (
        <div className="pt-40 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 animate-pulse">
                <Package size={32} className="text-slate-200" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">Extracting Transaction Logs...</p>
        </div>
    );

    return (
        <div className="pt-32 pb-40 bg-white min-h-screen">
            <div className="max-container">
                <div className="mb-20">
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4 underline decoration-4 underline-offset-8">Account Protocol</p>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic">Transaction <span className="text-accent">Archive</span></h1>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[4rem] border border-slate-100">
                        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-100 mb-8 shadow-sm">
                            <Package size={48} strokeWidth={1} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">No Historical Data</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Your transaction logs are currently empty.</p>
                        <Link to="/products" className="btn-primary px-12">Initialize Acquisition</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {orders.map((order) => (
                            <Link
                                key={order._id}
                                to={`/orders/${order._id}`}
                                className="block p-10 bg-slate-50 rounded-[3rem] hover:bg-white border-2 border-transparent hover:border-slate-100 transition-all hover:shadow-strong group"
                            >
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
                                    <div className="flex items-center gap-10">
                                        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-primary-500 shadow-soft group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                            <Package size={28} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-mono">CODE: {order.orderNumber || order._id?.slice(-8) || 'N/A'}</p>
                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                                                {(order.orderItems || order.items || []).length} Component System{(order.orderItems || order.items || []).length !== 1 ? 's' : ''}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-12 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-8 lg:pt-0 border-slate-200">
                                        <div className="text-left lg:text-right">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Timestamp</p>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                            </p>
                                        </div>
                                        <div className="text-left lg:text-right">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Yield</p>
                                            <p className="text-xl font-black text-slate-900">
                                                ₹{((order.pricing?.total || order.totalAmount || order.total || 0)).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                        <StatusBadge status={order.orderStatus || order.status || 'pending'} />
                                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all">
                                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
