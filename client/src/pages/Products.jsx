import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts as fetchProductsAction } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import ProductSkeleton from '../components/products/ProductSkeleton';
import { SlidersHorizontal, X, Grid, List, Search, RotateCcw, LayoutGrid, LayoutList, ChevronDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productAPI } from '../services/api';
import FilterSidebarNew from '../components/products/FilterSidebarNew';
import SortDropdown from '../components/products/SortDropdown';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    // Fetch products with filters
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const params = Object.fromEntries(searchParams.entries());
            const response = await productAPI.getProducts(params);
            setProducts(response.products || []);
        } catch (err) {
            setError(err || 'Failed to fetch products');
            console.error('Fetch products error:', err);
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (newFilters) => {
        const updatedParams = new URLSearchParams(searchParams);
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && value !== '') {
                updatedParams.set(key, value);
            } else {
                updatedParams.delete(key);
            }
        });
        setSearchParams(updatedParams);
    };

    const handleClearFilters = () => {
        setSearchParams({});
        setSearchTerm('');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        handleFilterChange({ search: searchTerm });
    };

    const activeFilters = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    return (
        <div className="min-h-screen bg-white">
            {/* Optimized Header Section */}
            <section className="relative pt-20 md:pt-28 pb-8 md:pb-12 overflow-hidden bg-black">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=90"
                        alt="Urban Tech Background"
                        className="w-full h-full object-cover grayscale-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-t-t from-black via-transparent to-black/40" />
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-8 h-[2px] bg-orange-500"></span>
                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-[0.5em]">The Network Collection</span>
                            </div>
                            <h1 className="text-3xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter mb-4">
                                Elite <br /> <span className="text-orange-500">Apparel</span>
                            </h1>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tight leading-relaxed max-w-sm">
                                Technically inspired. Street optimized. Discover the latest drops from the Genwear labs.
                            </p>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="bg-white/5 backdrop-blur-xl p-3 rounded-[2.5rem] border border-white/10 flex items-center gap-2">
                                <button
                                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <LayoutGrid size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Grid</span>
                                </button>
                                <button
                                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <LayoutList size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">List</span>
                                </button>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-12 py-6 rounded-[2.5rem] flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] transition-all bg-white text-black shadow-2xl hover:bg-orange-600 hover:text-white`}
                            >
                                <Filter size={20} />
                                {showFilters ? 'Dismiss Filters' : 'Toggle Filters'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Catalog */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar */}
                    <aside className={`w-full lg:w-80 space-y-12 ${!showFilters && 'hidden lg:block'}`}>
                        <FilterSidebarNew
                            filters={{}}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />
                    </aside>

                    {/* Results Area */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">
                                {loading ? 'Searching...' : `${products.length} Products Found`}
                            </span>

                            <SortDropdown
                                value={activeFilters.sort || ''}
                                onChange={(val) => handleFilterChange({ sort: val })}
                            />
                        </div>

                        {error ? (
                            <div className="bg-red-50 border border-red-200 rounded-[2rem] p-12 text-center">
                                <p className="text-red-600 font-bold uppercase mb-6">{error}</p>
                                <button onClick={fetchProducts} className="px-8 py-4 bg-red-600 text-white rounded-xl font-black uppercase text-xs">Reload Protocol</button>
                            </div>
                        ) : loading ? (
                            <ProductSkeleton count={6} />
                        ) : products.length === 0 ? (
                            <div className="bg-gray-50 rounded-[4rem] p-24 text-center border-2 border-dashed border-gray-100">
                                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-orange-600 mx-auto mb-10 shadow-xl">
                                    <Search size={44} />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">No Results</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-tight mb-12 text-sm italic">We couldn't find any products matching your search.</p>
                                <button onClick={handleClearFilters} className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 shadow-2xl transition-all">Clear Filters</button>
                            </div>
                        ) : (
                            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-10`}>
                                {products.map((p, idx) => (
                                    <motion.div
                                        key={p._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <ProductCard product={p} viewMode={viewMode} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
