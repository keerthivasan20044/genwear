import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, Star, Check, Truck, Shield, RefreshCcw, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { MOCK_PRODUCTS } from '../services/mockAPI';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get products from Redux
    const { items: apiProducts, loading: apiLoading } = useSelector(state => state.products);

    // Find product in API items or Mock data
    const product = useMemo(() => {
        const found = apiProducts.find(p => p._id === id);
        if (found) return found;
        return MOCK_PRODUCTS.find(p => p._id === id);
    }, [id, apiProducts]);

    const [selectedImg, setSelectedImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // State initialization from product data
    useEffect(() => {
        if (product) {
            // Safe color extraction
            const colors = getColors(product);
            if (colors.length > 0) setSelectedColor(colors[0].name);

            // Safe size extraction
            const sizes = getSizes(product);
            if (sizes.length > 0) setSelectedSize(sizes[0].size);

            setQuantity(1);
            setSelectedImg(0);
        }
    }, [product]);

    // Format Helpers (Consistent with ProductCard)
    function getColors(p) {
        if (!p.colors) return [];
        if (typeof p.colors[0] === 'string') return p.colors.map(c => ({ name: c, hex: c.toLowerCase() }));
        return p.colors;
    }

    function getSizes(p) {
        if (!p.sizes) return [];
        if (typeof p.sizes[0] === 'string') return p.sizes.map(s => ({ size: s }));
        return p.sizes;
    }

    function getImages(p) {
        if (!p.images) return ['https://via.placeholder.com/800'];
        if (Array.isArray(p.images)) return p.images;
        if (p.images.gallery) return p.images.gallery.map(img => typeof img === 'string' ? img : img.url);
        if (p.images.main) return [p.images.main];
        return ['https://via.placeholder.com/800'];
    }

    function getRating(p) {
        if (typeof p.rating === 'number') return { average: p.rating, count: p.reviews || 0 };
        if (p.rating && typeof p.rating === 'object') return { average: p.rating.average || 0, count: p.rating.count || 0 };
        return { average: 0, count: 0 };
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }

        dispatch(addToCart({
            product,
            quantity,
            size: selectedSize,
            color: selectedColor
        }));

        toast.success(`${product.name} added to cart!`, {
            position: "bottom-right",
            theme: "dark"
        });
    };

    const { items: wishlistItems } = useSelector(state => state.wishlist || { items: [] });
    const isWishlisted = product && wishlistItems?.includes(product._id);

    const handleWishlist = () => {
        dispatch(toggleWishlist(product._id));
        toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    };

    if (!product && !apiLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md">
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-500 mb-8 font-medium">The item you're looking for might have been moved or is no longer available.</p>
                    <Link to="/products" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all">
                        <ArrowLeft size={20} /> Back to Collection
                    </Link>
                </div>
            </div>
        );
    }

    if (!product) return (
        <div className="pt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 animate-pulse">
                <div className="aspect-[4/5] bg-gray-100 rounded-[3rem]"></div>
                <div className="space-y-10 py-10">
                    <div className="h-12 bg-gray-100 w-3/4 rounded-2xl"></div>
                    <div className="h-20 bg-gray-100 w-full rounded-2xl"></div>
                    <div className="h-40 bg-gray-100 w-full rounded-[2.5rem]"></div>
                </div>
            </div>
        </div>
    );

    const productImages = getImages(product);
    const rating = getRating(product);
    const colors = getColors(product);
    const sizes = getSizes(product);

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation Header */}
                <div className="flex items-center justify-between mb-12">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                        <ArrowLeft size={18} /> Back
                    </button>
                    <div className="flex gap-4">
                        <button className="p-3 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-all"><Share2 size={20} /></button>
                        <button
                            onClick={handleWishlist}
                            className={`p-3 rounded-2xl transition-all border ${isWishlisted ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'}`}
                        >
                            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Product Images */}
                    <div className="space-y-6">
                        <motion.div
                            layoutId={`img-${product._id}`}
                            className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-gray-50 shadow-2xl shadow-gray-100"
                        >
                            <img
                                src={productImages[selectedImg]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {productImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImg(i)}
                                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all ${selectedImg === i ? 'border-orange-500 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <span className="text-xs font-black text-orange-500 tracking-[0.3em] uppercase block mb-4">
                                {product.category} • {product.subcategory || 'Collection'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-none uppercase">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < Math.floor(rating.average) ? "#fbbf24" : "none"} className={i < Math.floor(rating.average) ? "text-yellow-400" : "text-gray-200"} />
                                    ))}
                                    <span className="ml-2 text-sm font-black text-gray-900">{rating.average}</span>
                                </div>
                                <span className="text-gray-400 font-bold text-sm">({rating.count} Customer Reviews)</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-10 border border-gray-100">
                            <div className="flex items-end gap-4 mb-2">
                                <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
                                {product.originalPrice > product.price && (
                                    <span className="text-lg font-bold text-gray-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                )}
                            </div>
                            {product.originalPrice > product.price && (
                                <span className="inline-block bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                    Save {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}% Today
                                </span>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div className="mb-10">
                            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 uppercase">AVAILABLE COLORS</p>
                            <div className="flex gap-4">
                                {colors.map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-12 h-12 rounded-full border-4 transition-all ${selectedColor === color.name ? 'border-orange-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
                                        title={color.name}
                                    >
                                        <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-10">
                            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 uppercase flex justify-between">
                                <span>SELECT SIZE</span>
                                <button className="text-orange-600 hover:underline">Size Guide</button>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map(s => (
                                    <button
                                        key={s.size}
                                        onClick={() => setSelectedSize(s.size)}
                                        className={`px-8 py-4 rounded-2xl font-black text-sm transition-all border-2 ${selectedSize === s.size ? 'bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}`}
                                    >
                                        {s.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="h-16 bg-gray-100 rounded-2xl flex items-center px-6 self-start">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Minus size={20} /></button>
                                <span className="w-12 text-center font-black text-xl">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Plus size={20} /></button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 h-16 bg-orange-600 text-white rounded-3xl font-black flex items-center justify-center gap-4 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100"
                            >
                                <ShoppingBag /> ADD TO CART
                            </button>
                        </div>

                        {/* Badges Section */}
                        <div className="grid grid-cols-3 gap-4 mt-12 border-t border-gray-100 pt-12">
                            <div className="text-center space-y-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-orange-600"><Truck size={24} /></div>
                                <p className="text-[10px] font-black text-gray-900">FAST DELIVERY</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-orange-600"><Shield size={24} /></div>
                                <p className="text-[10px] font-black text-gray-900">SECURE PAYMENT</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-orange-600"><RefreshCcw size={24} /></div>
                                <p className="text-[10px] font-black text-gray-900">EASY RETURNS</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Description Tabs */}
                <div className="mt-24 border-t border-gray-100 pt-16">
                    <div className="flex gap-12 mb-12">
                        {['description', 'features'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-sm font-black uppercase tracking-[0.2em] relative pb-4 transition-all ${activeTab === tab ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'}`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-full" />}
                            </button>
                        ))}
                    </div>
                    <div className="max-w-3xl">
                        {activeTab === 'description' && (
                            <p className="text-lg text-gray-500 font-medium leading-relaxed uppercase tracking-tight">
                                {product.description || "Premium quality apparel designed for style and comfort. Crafted with the finest materials to ensure a modern fit and lasting durability."}
                            </p>
                        )}
                        {activeTab === 'features' && (
                            <ul className="space-y-4">
                                {(product.tags || ['Premium', 'High Quality', 'Modern Fit', 'Breathable']).map((tag, i) => (
                                    <li key={i} className="flex items-center gap-4 text-sm font-black text-gray-900 uppercase">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
