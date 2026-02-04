import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ShoppingBag, Heart, Package, TrendingUp, ArrowRight,
    Clock, CheckCircle, Truck, Star, Award, Zap, User
} from 'lucide-react';
import { orderAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import { MOCK_PRODUCTS } from '../services/mockAPI';

const Dashboard = () => {
    const { userInfo } = useSelector(state => state.auth);
    const { items: cartItems } = useSelector(state => state.cart);
    const { items: wishlistIds } = useSelector(state => state.wishlist);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await orderAPI.getMyOrders();
                setOrders(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userInfo, navigate]);

    // Get recommended products (new arrivals)
    const recommendedProducts = MOCK_PRODUCTS.filter(p => p.isNewArrival || p.isNew).slice(0, 4);

    const stats = [
        {
            icon: Package,
            label: 'Total Orders',
            value: orders.length,
            color: 'bg-blue-500',
            link: '/orders'
        },
        {
            icon: Heart,
            label: 'Wishlist Items',
            value: wishlistIds.length,
            color: 'bg-pink-500',
            link: '/wishlist'
        },
        {
            icon: ShoppingBag,
            label: 'Cart Items',
            value: cartItems.length,
            color: 'bg-orange-500',
            link: '/cart'
        },
        {
            icon: Award,
            label: 'Member Status',
            value: 'ELITE',
            color: 'bg-purple-500',
            link: '/profile'
        }
    ];

    const quickActions = [
        { icon: ShoppingBag, label: 'Browse Products', link: '/products', color: 'bg-gray-900' },
        { icon: Package, label: 'Track Orders', link: '/orders', color: 'bg-blue-600' },
        { icon: Heart, label: 'My Wishlist', link: '/wishlist', color: 'bg-pink-600' },
        { icon: User, label: 'Edit Profile', link: '/profile', color: 'bg-purple-600' }
    ];

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
            <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${styles[status] || styles.pending}`}>
                {status}
            </span>
        );
    };

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-white pt-24 pb-40">
            {/* Background Elements */}
            <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-primary-500/5 blur-[120px] -z-0"></div>
            <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-slate-500/5 blur-[120px] -z-0"></div>

            <div className="max-container relative z-10">
                {/* Welcome Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <Zap className="text-primary-500 fill-primary-500" size={20} />
                        <p className="text-xs font-black text-primary-500 uppercase tracking-[0.4em]">DASHBOARD</p>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-4"
                    >
                        Welcome Back, <br />
                        <span className="text-primary-500">{userInfo.firstName}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-bold text-slate-400 uppercase tracking-tight"
                    >
                        Your personalized shopping command center
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <Link
                                to={stat.link}
                                className="block p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-strong hover:border-primary-100 transition-all group"
                            >
                                <div className={`w-14 h-14 ${stat.color} rounded-[1.5rem] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-16">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Recent Orders</h2>
                            <Link to="/orders" className="text-xs font-black text-primary-500 uppercase tracking-wider hover:text-primary-600 transition-colors flex items-center gap-2">
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-24 bg-slate-50 rounded-[2rem] animate-pulse"></div>
                                ))}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="p-16 bg-slate-50 rounded-[3rem] text-center border border-slate-100">
                                <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-slate-200 mx-auto mb-6">
                                    <Package size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">No Orders Yet</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-8">Start shopping to see your orders here</p>
                                <Link to="/products" className="btn-primary inline-flex items-center gap-3">
                                    Browse Products <ArrowRight size={16} />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <Link
                                        key={order._id}
                                        to={`/orders/${order._id}`}
                                        className="block p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-soft border border-transparent hover:border-slate-100 transition-all group"
                                    >
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center text-primary-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                                                        ORDER #{order.orderNumber || order._id?.slice(-8) || 'N/A'}
                                                    </p>
                                                    <p className="text-sm font-black text-slate-900">
                                                        {(order.orderItems || order.items || []).length} Items
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-xs font-black text-slate-900">
                                                        ₹{((order.pricing?.total || order.totalAmount || 0)).toLocaleString('en-IN')}
                                                    </p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'N/A'}
                                                    </p>
                                                </div>
                                                <StatusBadge status={order.orderStatus || order.status || 'pending'} />
                                                <ArrowRight size={16} className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8">Quick Actions</h2>
                        <div className="space-y-4">
                            {quickActions.map((action, idx) => (
                                <Link
                                    key={idx}
                                    to={action.link}
                                    className="block p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-soft border border-transparent hover:border-slate-100 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${action.color} rounded-[1rem] flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                            <action.icon size={20} />
                                        </div>
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight flex-1">{action.label}</p>
                                        <ArrowRight size={16} className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recommended Products */}
                <div className="mb-16">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-xs font-black text-primary-500 uppercase tracking-[0.4em] mb-2">Just For You</p>
                            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Recommended</h2>
                        </div>
                        <Link to="/products" className="text-xs font-black text-primary-500 uppercase tracking-wider hover:text-primary-600 transition-colors flex items-center gap-2">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recommendedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
