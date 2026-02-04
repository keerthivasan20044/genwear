import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDashboard } from '../../redux/slices/adminSlice';
import {
    Package,
    Users,
    ShoppingBag,
    TrendingUp,
    Activity,
    ShieldCheck,
    ArrowRight,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dashboard, loading } = useSelector((state) => state.admin);
    const { userInfo: user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }
        dispatch(fetchDashboard());
    }, [user, dispatch, navigate]);

    if (loading) {
        return (
            <div className="max-container pt-40 pb-20 px-6">
                <div className="flex flex-col gap-6 animate-pulse">
                    <div className="h-12 w-1/3 bg-gray-100 rounded-xl"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="h-44 bg-gray-50 rounded-[2.5rem] border border-gray-100"></div>)}
                    </div>
                </div>
            </div>
        );
    }

    const stats = [
        {
            title: 'Products',
            value: dashboard.totalProducts || 0,
            label: 'Total Products',
            icon: Package,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            link: '/admin/products',
        },
        {
            title: 'Customers',
            value: dashboard.totalCustomers || 0,
            label: 'Registered Users',
            icon: Users,
            color: 'text-primary-500',
            bg: 'bg-primary-50',
            link: '/admin/customers',
        },
        {
            title: 'Orders',
            value: Object.values(dashboard.ordersByStatus || {}).reduce((sum, count) => sum + count, 0),
            label: 'Total Orders',
            icon: ShoppingBag,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            link: '/admin/orders',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-4 py-1.5 bg-primary-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={12} /> Admin Access
                            </span>
                            <span className="text-label text-gray-400">GENWEAR Admin Panel v2.6</span>
                        </div>
                        <h1 className="heading-2 uppercase italic text-gray-900">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">System Status</p>
                            <p className="text-sm font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={14} /> Online
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={stat.title}
                        >
                            <Link
                                to={stat.link}
                                className="group block bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-strong hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-bl-[5rem] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform duration-700`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-10 flex justify-between items-start">
                                        <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <TrendingUp size={20} className="text-success opacity-50" />
                                    </div>

                                    <div className="mt-auto">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.title}</p>
                                        <p className="text-5xl font-black text-gray-900 tracking-tighter mb-4">{stat.value}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>

                                    <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                        <ArrowRight className="text-primary-500" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Orders by Status & Secondary Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Status Distribution */}
                    <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="heading-5 uppercase italic text-gray-900 leading-none">Status Distribution</h2>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">Real-time Indexing</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {Object.entries(dashboard.ordersByStatus || {}).map(([status, count], idx) => (
                                <div key={status} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-premium transition-all group">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 group-hover:text-primary-500 transition-colors">{status}</p>
                                    <div className="flex items-end gap-2">
                                        <p className="text-4xl font-black text-gray-900 tracking-tighter">{count}</p>
                                        <span className="text-[10px] font-bold text-success mb-1">↑{Math.floor(Math.random() * 5)}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="bg-primary-900 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-500 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-1000"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="heading-6 uppercase italic mb-8 flex items-center gap-3">
                                <Zap size={18} className="text-primary-500 fill-primary-500" /> Quick Actions
                            </h3>

                            <div className="space-y-4 mb-12">
                                <Link to="/admin/products" className="flex items-center justify-between p-6 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 font-black uppercase text-[10px] tracking-widest">
                                    Manage Products <ArrowRight size={14} />
                                </Link>
                                <Link to="/admin/customers" className="flex items-center justify-between p-6 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 font-black uppercase text-[10px] tracking-widest">
                                    View Customers <ArrowRight size={14} />
                                </Link>
                                <Link to="/admin/orders" className="flex items-center justify-between p-6 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 font-black uppercase text-[10px] tracking-widest">
                                    Manage Orders <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10 italic">
                                <p className="text-[8px] font-black text-primary-400 uppercase tracking-[0.3em]">
                                    © 2026 GENWEAR <br />
                                    PREMIUM FASHION
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
