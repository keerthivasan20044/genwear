import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockAPI';

function Wishlist() {
    const wishlistIds = useSelector((state) => state.wishlist.items);
    const { items: apiProducts } = useSelector((state) => state.products);

    // Get product details for the IDs in wishlist
    const wishlistProducts = useMemo(() => {
        const source = (apiProducts && apiProducts.length > 0) ? apiProducts : MOCK_PRODUCTS;
        return source.filter(p => wishlistIds.includes(p._id) || wishlistIds.includes(p.id));
    }, [wishlistIds, apiProducts]);

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-black text-orange-500 hover:text-orange-600 transition-all uppercase tracking-[0.2em] mb-4">
                            <ArrowLeft size={16} /> BACK TO SHOP
                        </Link>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                            MY WISHLIST
                        </h1>
                    </div>
                    <div className="bg-gray-900 px-8 py-5 rounded-[2rem] flex items-center gap-6 shadow-2xl shadow-gray-200">
                        <Heart className="text-orange-500 fill-orange-500" size={24} />
                        <span className="text-sm font-black uppercase tracking-widest text-white">{wishlistIds.length} ITEMS SAVED</span>
                    </div>
                </div>

                {wishlistProducts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[4rem] text-center border border-gray-100 px-8"
                    >
                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-gray-200 mb-10 shadow-xl border border-gray-50 mx-auto">
                            <Heart size={44} strokeWidth={1} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Your List is Clear</h2>
                        <p className="text-gray-400 mb-12 max-w-sm mx-auto font-bold uppercase tracking-tight leading-relaxed text-xs">
                            You haven't added any items to your wishlist yet. Explore the elite range.
                        </p>
                        <Link
                            to="/products"
                            className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
                        >
                            EXPLORE SHOP <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <AnimatePresence mode="popLayout">
                            {wishlistProducts.map((product) => (
                                <motion.div
                                    key={product._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
