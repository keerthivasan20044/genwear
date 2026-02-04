import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, CheckCircle, ArrowLeft, MapPin, Receipt, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderAPI.getOrderById(id);
                setOrder(data);
            } catch (error) {
                toast.error('Data link severed: Failed to retrieve manifest');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-28 flex flex-col items-center justify-center">
            <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse">Syncing with Network...</p>
        </div>
    );

    if (!order) return (
        <div className="min-h-screen pt-28 text-center px-4">
            <div className="bg-white p-16 rounded-[4rem] shadow-2xl max-w-xl mx-auto border border-gray-100">
                <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">Manifest <br /> <span className="text-orange-600">Untraceable</span></h2>
                <p className="text-gray-500 mb-12 font-bold uppercase text-sm tracking-tight">The requested sequence id does not exist in our primary records.</p>
                <Link to="/orders" className="w-full py-6 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all block">Return to Archives</Link>
            </div>
        </div>
    );

    const StatusStep = ({ icon: Icon, label, active, completed }) => (
        <div className="flex flex-col items-center gap-6 relative flex-1">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 z-10 ${completed ? 'bg-orange-600 text-white shadow-2xl shadow-orange-200' : active ? 'bg-white border-4 border-orange-600 text-orange-600 shadow-xl' : 'bg-gray-100 text-gray-300'
                }`}>
                <Icon size={24} />
            </div>
            <p className={`text-[10px] font-black uppercase tracking-widest text-center ${active || completed ? 'text-gray-900' : 'text-gray-300'}`}>{label}</p>
        </div>
    );

    const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIdx = statuses.indexOf(order.orderStatus || order.status || 'pending');

    return (
        <div className="min-h-screen bg-white pt-24 pb-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Immersive Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div>
                        <Link to="/orders" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-orange-600 transition-all mb-8 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Log
                        </Link>
                        <span className="text-xs font-black text-orange-500 mb-4 uppercase tracking-[0.4em] block">Transaction Manifest</span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                            ORDER <br /> <span className="text-orange-600">#{order.orderNumber || order._id?.slice(-8).toUpperCase() || id.slice(-8).toUpperCase()}</span>
                        </h1>
                    </div>
                    <div className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] shadow-2xl flex items-center gap-6">
                        <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white"><ShieldCheck size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Authentication</p>
                            <p className="text-xs font-black uppercase tracking-widest text-orange-400">Verified Secure</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Tactical Progress & Items */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Phase Tracking */}
                        <div className="p-12 md:p-16 bg-gray-50 rounded-[4rem] border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-16 flex items-center gap-4 relative z-10">
                                <Clock size={18} /> MISSION TRACKING
                            </h3>
                            <div className="flex justify-between relative z-10">
                                <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 -z-0 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-600 transition-all duration-1000"
                                        style={{ width: `${(currentIdx / (statuses.length - 1)) * 100}%` }}
                                    />
                                </div>
                                <StatusStep icon={Receipt} label="Logged" completed={currentIdx >= 0} active={currentIdx === 0} />
                                <StatusStep icon={CheckCircle} label="Ready" completed={currentIdx >= 1} active={currentIdx === 1} />
                                <StatusStep icon={Package} label="Assembled" completed={currentIdx >= 2} active={currentIdx === 2} />
                                <StatusStep icon={Truck} label="In Transit" completed={currentIdx >= 3} active={currentIdx === 3} />
                                <StatusStep icon={CheckCircle} label="Docked" completed={currentIdx >= 4} active={currentIdx === 4} />
                            </div>
                        </div>

                        {/* Inventory Log */}
                        <div className="space-y-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 px-4">ITEM INVENTORY ({(order.items || order.orderItems || []).length})</h3>
                            {(order.items || order.orderItems || []).map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row items-center gap-10 p-10 bg-white border border-gray-100 rounded-[3rem] hover:shadow-2xl hover:border-orange-100 transition-all group">
                                    <div className="w-32 h-40 rounded-[2rem] overflow-hidden bg-gray-50 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-700">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">SKU PROTOCOL</p>
                                        <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">{item.name}</h4>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-gray-900 text-white px-4 py-2 rounded-xl">{item.size}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 text-gray-600 px-4 py-2 rounded-xl">{item.color}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-orange-600/10 text-orange-600 px-4 py-2 rounded-xl">Units: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-gray-900 tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Value Clearance</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operational Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Destination Data */}
                        <div className="p-10 bg-gray-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/20 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-orange-600/30 transition-all" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-10 flex items-center gap-4 relative z-10">
                                <MapPin size={18} /> DESTINATION DATA
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <p className="text-sm font-black text-white leading-relaxed uppercase tracking-tight">
                                        {order.shippingAddress?.addressLine || order.shippingAddress?.street || 'N/A'}<br />
                                        {order.shippingAddress?.city || 'N/A'}, {order.shippingAddress?.state || 'N/A'}<br />
                                        SECTOR: {order.shippingAddress?.pincode || order.shippingAddress?.zipCode || 'N/A'}
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Contact Link:</span>
                                    <span className="text-xs font-black text-orange-400 tracking-widest">{order.shippingAddress?.phone || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Financial Clearance */}
                        <div className="p-10 bg-gray-50 rounded-[3.5rem] border border-gray-100">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10 flex items-center gap-4">
                                <Receipt size={18} /> CLEARANCE SUMMARY
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">₹{(order.pricing?.subtotal || 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-600">{(order.pricing?.shipping || 0) === 0 ? 'ELITE FREE' : `₹${order.pricing?.shipping || 0}`}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 pb-4 border-b border-gray-200">
                                    <span>Protocol Tax (18%)</span>
                                    <span className="text-gray-900">₹{(order.pricing?.tax || 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-end pt-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-orange-600">Total Credits</span>
                                    <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">₹{(order.pricing?.total || order.totalAmount || 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Network Status */}
                        <div className="p-8 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security State</p>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-900">Paid Clear</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-gray-50 rounded-xl text-gray-400 border border-gray-100">{order.paymentMethod || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
