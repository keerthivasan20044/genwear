import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RefreshCcw, Award, Play, Star, Zap } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockAPI';

const Home = () => {
    const dispatch = useDispatch();
    const { items: apiProducts, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ limit: 8 }));
    }, [dispatch]);

    // Use mock products if API is empty
    const trendingProducts = useMemo(() => {
        const source = (apiProducts && apiProducts.length > 0) ? apiProducts : MOCK_PRODUCTS;
        return source.slice(0, 4); // Get first 4 for trending
    }, [apiProducts]);

    const features = [
        { icon: Truck, title: 'Express Delivery', desc: 'Secure global shipping' },
        { icon: Shield, title: 'Secure Payment', desc: 'Protected data flow' },
        { icon: RefreshCcw, title: 'Easy Returns', desc: '30-day return policy' },
        { icon: Award, title: 'Premium Grade', desc: 'Top tier materials' }
    ];

    const collections = [
        {
            title: "MEN'S ELITE",
            subtitle: "PREMIUM SELECTION",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
            path: "/products?gender=men",
            size: "large"
        },
        {
            title: "WOMEN'S STUDIO",
            subtitle: "ELEGANT DESIGNS",
            image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=80",
            path: "/products?gender=women",
            size: "medium"
        },
        {
            title: "KIDS' RANGE",
            subtitle: "FUN & COLORFUL",
            image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=80",
            path: "/products?gender=kids",
            size: "medium"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Refined Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=90"
                        alt="Hero background"
                        className="w-full h-full object-cover grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Zap className="text-orange-500 fill-orange-500" size={20} />
                            <p className="text-xs font-black text-orange-500 uppercase tracking-[0.4em]">GENWEAR VOL. 2026</p>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-6">
                            STREET <br /> <span className="text-orange-500">LEGACY</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-300 mb-10 max-w-lg font-bold uppercase tracking-tight leading-relaxed">
                            Elite technical apparel for the modern world. Engineered for performance, designed for style.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link to="/products" className="px-12 py-5 bg-orange-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-orange-950/20 hover:bg-orange-700 transition-all flex items-center gap-4 group">
                                EXPLORE SHOP <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Scroll Label */}
                <div className="absolute right-10 bottom-24 origin-right rotate-90 hidden lg:block">
                    <p className="text-[10px] font-black text-white/40 tracking-[0.5em] uppercase">Scroll to Discover</p>
                </div>
            </section>

            {/* Feature Cards */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 text-orange-500 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">{feature.title}</h3>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-tight">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collections Grid - Massive */}
            <section className="py-32 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <p className="text-xs font-black text-orange-500 uppercase tracking-[0.4em] mb-4">The Archives</p>
                            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">CORE <br /> COLLECTIONS</h2>
                        </div>
                        <p className="max-w-xs text-sm font-bold text-gray-400 uppercase tracking-tight leading-relaxed">Technical essentials curated for every environment. Browse the elite range.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 auto-rows-[500px]">
                        {collections.map((col, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`${col.size === 'large' ? 'lg:col-span-8' : 'lg:col-span-4'} relative rounded-[3rem] overflow-hidden group shadow-2xl shadow-gray-200`}
                            >
                                <img src={col.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0" alt={col.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12">
                                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.4em] mb-4">{col.subtitle}</p>
                                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8 leading-none">{col.title}</h3>
                                    <Link to={col.path} className="px-8 py-3 md:px-10 md:py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-orange-600 hover:text-white transition-all inline-flex items-center gap-3">
                                        VIEW NOW <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-20">
                        <div>
                            <p className="text-xs font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Elite Drops</p>
                            <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">TRENDING</h2>
                        </div>
                        <Link to="/products" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] hover:text-orange-600 transition-all">
                            SEE ALL RELEASES <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all"><ArrowRight size={18} /></div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                        {loading && apiProducts.length === 0 ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-6 animate-pulse">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-[3rem]" />
                                    <div className="h-4 bg-gray-100 w-2/3 rounded-full" />
                                </div>
                            ))
                        ) : (
                            trendingProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter - Massive */}
            <section className="py-32 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black relative rounded-[5rem] p-16 md:p-32 overflow-hidden border border-white/5">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] -z-10" />
                        <div className="max-w-3xl mx-auto text-center relative z-10">
                            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-8 leading-none">JOIN THE <br /> <span className="text-orange-500">NETWORK</span></h2>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mb-16">Priority access to drop info and elite benefits.</p>
                            <form className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-[2.5rem] border border-white/10">
                                <input
                                    type="email"
                                    placeholder="YOUR@EMAIL.COM"
                                    className="flex-1 px-8 py-6 bg-transparent text-white font-black text-sm focus:outline-none border-none"
                                    required
                                />
                                <button type="submit" className="px-12 py-6 bg-orange-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[12px] hover:bg-orange-700 transition-all shadow-2xl shadow-orange-950/20">
                                    SUBSCRIBE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
