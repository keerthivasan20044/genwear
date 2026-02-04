import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Shield, Database, Activity } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo, loading, error } = useSelector(state => state.auth);
    const redirect = new URLSearchParams(location.search).get('redirect') || '/dashboard';

    useEffect(() => {
        if (userInfo) navigate(redirect);
        return () => { dispatch(clearError()); };
    }, [userInfo, navigate, redirect, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleChange = (e) => {
        const value = e.target.name === 'email' ? e.target.value.replace(/\s+/g, '') : e.target.value;
        setCredentials({ ...credentials, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({
            email: credentials.email.replace(/\s+/g, ''),
            password: credentials.password
        }));
    };

    return (
        <div className="min-h-screen flex bg-white overflow-hidden">
            {/* Cinematic Left Side */}
            <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?w=1200&q=80"
                    alt="Biological Tech"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/40 to-transparent" />

                <div className="relative z-10 p-24 flex flex-col justify-between h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="w-20 h-1 bg-accent rounded-full mb-10" />
                        <h1 className="text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                            Sign <br /> <span className="text-accent underline decoration-8 underline-offset-8 decoration-accent/20">In</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-bold uppercase tracking-tight max-w-md">
                            Welcome back. Please enter your email and password to access your personalized collection.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
                        {[
                            { label: 'Security', val: 'Verified', icon: Shield },
                            { label: 'Support', val: '24/7', icon: Activity },
                            { label: 'Cloud', val: 'Syncing', icon: Database },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-accent mb-2"><stat.icon size={16} /></div>
                                <div className="text-xs font-black text-white uppercase tracking-widest mb-1">{stat.val}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Right Side */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm space-y-12"
                >
                    <div className="space-y-4">
                        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-2 block">GENWEAR SHOP</Link>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Account <br /> Login</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Enter your details below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-16 bg-slate-50 border-2 border-slate-50 rounded-2xl pl-16 pr-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                                        placeholder="user@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-16 bg-slate-50 border-2 border-slate-50 rounded-2xl pl-16 pr-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 rounded-md border-2 border-slate-100 group-hover:border-accent transition-all flex items-center justify-center">
                                    <div className="w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-40" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Remember Me</span>
                            </label>
                            <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-4"
                        >
                            {loading ? 'Logging in...' : (
                                <>Sign In <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <div className="pt-12 border-t border-slate-100 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">New here?</p>
                            <Link to="/register" className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-accent transition-all">Create Account</Link>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-2xl space-y-3">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Test Credentials</p>
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-slate-500 uppercase">ADMIN: ADMIN@GENWEAR.COM / admin123</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase">USER: john@example.com / User@123</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
