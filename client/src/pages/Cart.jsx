import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ShieldCheck, Truck, RefreshCcw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalPrice } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.auth);

    const handleUpdateQuantity = (id, currentQty, delta) => {
        const newQty = currentQty + delta;
        dispatch(updateCartItem({ id, quantity: newQty }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    // UI Helpers
    const getProductImage = (product) => {
        if (!product.images) return 'https://via.placeholder.com/400';
        if (Array.isArray(product.images)) return product.images[0];
        return product.images.main || product.images.thumbnail || 'https://via.placeholder.com/400';
    };

    const getColorHex = (product, colorName) => {
        if (!product.colors) return '#ddd';
        if (typeof product.colors[0] === 'string') return colorName.toLowerCase();
        const found = product.colors.find(c => c.name === colorName);
        return found ? found.hex : '#ddd';
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-24 flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-[3.5rem] shadow-xl text-center max-w-lg w-full"
                >
                    <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-orange-600">
                        <ShoppingBag size={44} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
                        Your Bag is Empty
                    </h1>
                    <p className="text-gray-500 mb-10 font-medium text-lg leading-relaxed">
                        Looks like you haven't discovered your style yet. Start exploring our premium collections.
                    </p>
                    <Link to="/products" className="inline-flex items-center justify-center px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                        Start Shopping <ArrowRight size={20} className="ml-3" />
                    </Link>
                </motion.div>
            </div>
        );
    }

    const shipping = 0; // Free shipping
    const gst = Math.floor(totalPrice * 0.18);
    const grandTotal = totalPrice + gst + shipping;

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-black text-orange-500 hover:text-orange-600 transition-all uppercase tracking-[0.2em] mb-4">
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                            My Shopping Bag
                        </h1>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 h-fit">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                            TOTAL ITEMS: <span className="text-gray-900 ml-1">{items.length}</span>
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="group relative bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500"
                                >
                                    <div className="flex flex-col sm:flex-row gap-8">
                                        {/* Image */}
                                        <Link to={`/products/${item.product._id || item.product.id}`} className="block w-full sm:w-40 aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-500">
                                            <img
                                                src={getProductImage(item.product)}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </Link>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">
                                                        {item.product.brand || 'GENWEAR'}
                                                    </p>
                                                    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                                                        {item.product.name}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-4">
                                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                            <span className="text-[10px] font-black text-gray-400">SIZE:</span>
                                                            <span className="text-xs font-black text-gray-900 uppercase">{item.size}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                            <span className="text-[10px] font-black text-gray-400">COLOR:</span>
                                                            <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: getColorHex(item.product, item.color) }} />
                                                            <span className="text-xs font-black text-gray-900 uppercase">{item.color}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>

                                            <div className="mt-auto pt-6 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                {/* Qty Controls */}
                                                <div className="flex items-center bg-gray-50 rounded-2xl p-1 self-start sm:self-auto border border-gray-100">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                                                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-12 text-center font-black text-lg text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-gray-900 tracking-tighter">
                                                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                                    </p>
                                                    <p className="text-[10px] font-black text-gray-400">UNITS: {item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Section */}
                    <aside className="lg:sticky lg:top-28 h-fit">
                        <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-gray-300">
                            <h3 className="text-2xl font-black mb-10 tracking-tight uppercase">Order Summary</h3>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-400 uppercase tracking-widest">SUBTOTAL</span>
                                    <span className="font-black text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-400 uppercase tracking-widest">GST (18%)</span>
                                    <span className="font-black text-lg">₹{gst.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-400 uppercase tracking-widest">DELIVERY</span>
                                    <span className="font-black text-green-400 uppercase">FREE</span>
                                </div>

                                <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
                                    <span className="text-lg font-black tracking-tighter uppercase">Grand Total</span>
                                    <span className="text-3xl font-black text-white tracking-tighter">₹{grandTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full h-18 bg-orange-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-orange-700 transition-all shadow-xl shadow-orange-950/20"
                            >
                                {userInfo ? 'Checkout Now' : 'Login to Checkout'} <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 grid grid-cols-1 gap-4">
                            {[
                                { icon: ShieldCheck, title: 'Secure Gateway', color: 'text-blue-500' },
                                { icon: Truck, title: 'Safe Shipping', color: 'text-orange-500' },
                                { icon: RefreshCcw, title: '30D Returns', color: 'text-green-500' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${item.color}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Cart;
