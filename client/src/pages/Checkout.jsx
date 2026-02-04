import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { clearCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';
import { Truck, CreditCard, ShieldCheck, MapPin, ChevronRight, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalPrice } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.auth);

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment

    const [shippingData, setShippingData] = useState({
        addressLine: '',
        city: '',
        state: '',
        pincode: '',
        phone: userInfo?.phone || ''
    });

    const [paymentMethod, setPaymentMethod] = useState('Card');

    const getProductImage = (product) => {
        if (!product.images) return 'https://via.placeholder.com/400';
        if (Array.isArray(product.images)) return product.images[0];
        return product.images.main || product.images.thumbnail || 'https://via.placeholder.com/400';
    };

    const handleInputChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleSubmitOrder = async () => {
        if (!shippingData.addressLine || !shippingData.city || !shippingData.pincode) {
            toast.error('Field validation failed: Complete all shipping protocols');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                orderItems: items.map(item => ({
                    product: item.product._id || item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    image: getProductImage(item.product)
                })),
                shippingAddress: shippingData,
                paymentMethod,
                pricing: {
                    subtotal: totalPrice,
                    shipping: 0,
                    tax: Math.floor(totalPrice * 0.18),
                    discount: 0,
                    total: totalPrice + Math.floor(totalPrice * 0.18)
                }
            };

            const data = await orderAPI.create(orderData);
            dispatch(clearCart());
            toast.success('ORDER PROTOCOL INITIALIZED SUCCESSFULLY!');
            navigate(`/orders/${data._id}`);
        } catch (error) {
            toast.error(error.message || 'Transmission failed');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    const gst = Math.floor(totalPrice * 0.18);
    const grandTotal = totalPrice + gst;

    return (
        <div className="min-h-screen bg-white pt-24 pb-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tactical Header */}
                <div className="mb-20">
                    <span className="text-xs font-black text-orange-500 tracking-[0.4em] uppercase mb-4 block">Secure Transaction Layer</span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                        ORDER <br /> <span className="text-orange-600 underline decoration-8 underline-offset-[-8px]">PROTOCOLS</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Input Phases */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Phase Indicator */}
                        <div className="flex items-center gap-4 mb-12">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex-1 flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${step >= i ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        0{i}
                                    </div>
                                    <div className={`flex-1 h-1.5 rounded-full ${step > i ? 'bg-orange-600' : 'bg-gray-100'}`} />
                                </div>
                            ))}
                        </div>

                        {step === 1 ? (
                            <motion.section
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-10"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gray-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Phase 01: Destination</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Specify coordinate transmission</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Street Address</label>
                                        <input
                                            name="addressLine"
                                            value={shippingData.addressLine}
                                            onChange={handleInputChange}
                                            className="w-full h-16 bg-white border border-gray-200 rounded-2xl px-6 focus:border-orange-500 outline-none font-bold text-sm transition-all shadow-sm"
                                            placeholder="Unit, Street, Sector..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">City Protocol</label>
                                        <input
                                            name="city"
                                            value={shippingData.city}
                                            onChange={handleInputChange}
                                            className="w-full h-16 bg-white border border-gray-200 rounded-2xl px-6 focus:border-orange-500 outline-none font-bold text-sm transition-all shadow-sm"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Area Code</label>
                                        <input
                                            name="pincode"
                                            value={shippingData.pincode}
                                            onChange={handleInputChange}
                                            className="w-full h-16 bg-white border border-gray-200 rounded-2xl px-6 focus:border-orange-500 outline-none font-bold text-sm transition-all shadow-sm"
                                            placeholder="Pincode"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Contact Link</label>
                                        <input
                                            name="phone"
                                            value={shippingData.phone}
                                            onChange={handleInputChange}
                                            className="w-full h-16 bg-white border border-gray-200 rounded-2xl px-6 focus:border-orange-500 outline-none font-bold text-sm transition-all shadow-sm"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full h-20 bg-gray-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-4 group"
                                >
                                    PROCEED TO CLEARANCE <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </motion.section>
                        ) : (
                            <motion.section
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-10"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gray-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Phase 02: Clearance</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select secure credit flow</p>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    {['Card', 'UPI', 'COD'].map((method) => (
                                        <button
                                            key={method}
                                            onClick={() => setPaymentMethod(method)}
                                            className={`p-10 rounded-[2.5rem] border-2 flex items-center justify-between transition-all ${paymentMethod === method ? 'bg-orange-50 border-orange-600 shadow-xl' : 'bg-white border-gray-100 hover:border-orange-200'}`}
                                        >
                                            <div className="flex items-center gap-8 text-left">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${paymentMethod === method ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                                    {method === 'Card' ? <CreditCard size={24} /> : (method === 'UPI' ? <Zap size={24} /> : <ShieldCheck size={24} />)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 uppercase tracking-widest text-sm">{method === 'COD' ? 'Physical Credits' : `${method} Transmission`}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">Secure via GEN-NET Gateway</p>
                                                </div>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-orange-600' : 'border-gray-200'}`}>
                                                {paymentMethod === method && <div className="w-4 h-4 bg-orange-600 rounded-full" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <button onClick={() => setStep(1)} className="flex-1 h-18 bg-white border border-gray-200 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-gray-900 transition-all">
                                        Revert to phase 01
                                    </button>
                                    <button
                                        onClick={handleSubmitOrder}
                                        disabled={loading}
                                        className="flex-[2] h-18 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                                    >
                                        {loading ? 'SYNCHRONIZING...' : <>INITIALIZE ORDER <Lock size={18} /></>}
                                    </button>
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Right: Summary glass */}
                    <aside className="lg:col-span-5 sticky top-32">
                        <div className="bg-gray-900 rounded-[3.5rem] p-10 md:p-12 text-white shadow-2xl shadow-gray-200 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                            <h3 className="text-2xl font-black mb-10 tracking-tight uppercase relative z-10">Manifest</h3>

                            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide relative z-10 mb-10">
                                {items.map((item) => (
                                    <div key={item._id} className="flex gap-6 group">
                                        <div className="w-20 h-28 rounded-2xl overflow-hidden shrink-0 bg-white/10 p-1">
                                            <img src={getProductImage(item.product)} className="w-full h-full object-cover rounded-xl" alt="item" />
                                        </div>
                                        <div className="flex-grow py-1">
                                            <h4 className="text-xs font-black uppercase text-white line-clamp-1">{item.product.name}</h4>
                                            <div className="flex gap-3 mt-2">
                                                <span className="text-[9px] font-black uppercase bg-white/5 px-2 py-1 rounded text-orange-400 tracking-widest">{item.size}</span>
                                                <span className="text-[9px] font-black uppercase bg-white/5 px-2 py-1 rounded text-orange-400 tracking-widest">{item.color}</span>
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase">Qty: {item.quantity}</p>
                                                <p className="text-lg font-black text-white tracking-tighter">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 border-t border-white/5 space-y-6 relative z-10">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                    <span>Base Value</span>
                                    <span className="text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                    <span>Protocol Tax (18%)</span>
                                    <span className="text-white">₹{gst.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Total Credits</span>
                                    <span className="text-4xl font-black text-white tracking-tighter leading-none">₹{grandTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-gray-50 border border-gray-100 p-8 rounded-[2rem] flex items-center gap-6">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-500">
                                <ShieldCheck size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-relaxed">
                                High-integrity encryption active. Your transaction details are secured under GEN-OS protocols.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
