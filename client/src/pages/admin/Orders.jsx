import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services/apiService'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'

function AdminOrders() {
    const navigate = useNavigate()
    const { userInfo: user } = useSelector((state) => state.auth)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login')
            return
        }
        fetchOrders()
    }, [user, navigate])

    const fetchOrders = async () => {
        try {
            const data = await apiService.getOrders()
            // Backend returns { orders, pagination }
            setOrders(data.orders || data)
            setLoading(false)
        } catch (error) {
            toast.error('Failed to fetch orders')
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`/api/orders/${orderId}/status`, { status: newStatus })
            const updatedOrders = orders.map(o => (o._id || o.id) === orderId ? { ...o, status: newStatus } : o)
            setOrders(updatedOrders)
            toast.success(`Order status updated to ${newStatus}`)
        } catch (error) {
            toast.error('Failed to update order status')
        }
    }

    const STATUS_MAP = {
        'Pending': { icon: FiClock, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
        'Processing': { icon: FiPackage, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        'Shipped': { icon: FiTruck, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        'Delivered': { icon: FiCheckCircle, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
        'Cancelled': { icon: FiXCircle, color: 'text-error', bg: 'bg-error/10', border: 'border-error/20' },
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                <div className="animate-pulse space-y-6">
                    <div className="h-12 bg-gray-100 rounded-2xl w-1/4"></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-48 bg-gray-100 rounded-[3rem]"></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
            <div className="mb-8">
                <h1 className="font-heading text-3xl font-black text-primary uppercase tracking-tighter">
                    Manage <span className="text-accent underline decoration-8 underline-offset-[-4px]">Orders</span>
                </h1>
                <p className="text-[10px] font-black text-muted uppercase tracking-widest mt-2">Order Management Center — Global List</p>
            </div>

            <div className="space-y-8 animate-in">
                {orders.map((order) => {
                    const statusConfig = STATUS_MAP[order.status] || STATUS_MAP['Pending']
                    return (
                        <div key={order._id || order.id} className="bg-white rounded-[3rem] shadow-soft p-10 border-2 border-gray-50 hover:shadow-strong transition-all overflow-hidden group">
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Order Metadata */}
                                <div className="lg:w-1/3 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 ${statusConfig.bg} ${statusConfig.color} rounded-2xl flex items-center justify-center`}>
                                            <statusConfig.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Order Details</p>
                                            <p className="text-xs font-black text-primary uppercase tracking-tight truncate w-40">#{String(order._id || order.id).slice(-12)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-gray-50">
                                        <div className="flex items-center gap-3 text-primary">
                                            <FiUser className="text-accent" />
                                            <span className="text-xs font-black uppercase tracking-tight">{order.user?.firstName} {order.user?.lastName}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted">
                                            <FiClock />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    {/* Status Controller */}
                                    <div className="pt-6">
                                        <label className="text-[9px] font-black text-muted uppercase tracking-widest mb-2 block">Change Status</label>
                                        <div className="relative">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id || order.id, e.target.value)}
                                                className={`w-full ${statusConfig.bg} ${statusConfig.color} px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 ${statusConfig.border} appearance-none cursor-pointer focus:ring-4 focus:ring-accent/10 outline-none transition-all`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="flex-1 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-all">
                                                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 shadow-soft">
                                                    <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest truncate">{item.name}</p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-[9px] font-bold text-muted uppercase">Qty: {item.quantity}</span>
                                                        <span className="text-xs font-black text-accent tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-gray-50 items-start md:items-end justify-between">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <FiMapPin className="text-accent" size={16} />
                                                <div>
                                                    <p className="text-[8px] font-black text-muted uppercase tracking-widest">Shipping Address</p>
                                                    <p className="text-[10px] font-bold text-primary max-w-xs">{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiPhone className="text-accent" size={16} />
                                                <span className="text-[10px] font-black text-primary">{order.shippingAddress.phone}</span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Total Amount</p>
                                            <p className="text-4xl font-black text-primary tracking-tighter">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminOrders
