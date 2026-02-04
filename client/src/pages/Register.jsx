import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/slices/authSlice';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading, error } = useSelector(state => state.auth);
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

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

    useEffect(() => {
        const password = formData.password;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    }, [formData.password]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        if (!agreedToTerms) {
            toast.error('Please agree to the protocols');
            return;
        }
        const { confirmPassword, ...registerData } = formData;
        dispatch(registerUser(registerData));
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return 'bg-red-500';
        if (passwordStrength <= 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen flex bg-white overflow-hidden">
            {/* Cinematic Right Side (Image side first for variance) */}
            <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
                    alt="Network"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-slate-900 via-slate-900/40 to-transparent" />

                <div className="relative z-10 p-24 flex flex-col justify-between h-full">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6 text-right"
                    >
                        <div className="w-16 h-1 bg-accent rounded-full mb-10 ml-auto" />
                        <h1 className="text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                            Join <br /> <span className="text-accent underline decoration-8 underline-offset-8 decoration-accent/20">Us</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-bold uppercase tracking-tight ml-auto max-w-sm">
                            Create your account and become a member of our exclusive fashion network.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 border-t border-white/5 pt-12">
                        {[
                            { label: 'Global Shipping', val: 'Active', icon: Globe },
                            { label: 'Priority Support', val: 'Level 1', icon: Zap },
                            { label: 'Secure Data', val: 'Encrypted', icon: ShieldCheck },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-6 justify-end">
                                <div className="text-right">
                                    <div className="text-xs font-black text-white uppercase tracking-widest mb-1">{stat.val}</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</div>
                                </div>
                                <div className="text-accent bg-accent/10 p-3 rounded-2xl"><stat.icon size={20} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Left Side */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-12"
                >
                    <div className="space-y-4">
                        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-2 block">GENWEAR SHOP</Link>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Sign <br /> Up</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Enter your details to register</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-950"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-950"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl pl-16 pr-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-950"
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl pl-16 pr-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-950"
                                    placeholder="••••••••"
                                />
                            </div>
                            {formData.password && (
                                <div className="mt-4 space-y-2 px-2">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Password Strength</span>
                                        <span className={passwordStrength > 3 ? 'text-green-500' : 'text-accent'}>{passwordStrength > 3 ? 'SECURE' : 'WEAK'}</span>
                                    </div>
                                    <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            className={`h-full ${getStrengthColor()}`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 font-bold text-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-950"
                                placeholder="••••••••"
                            />
                        </div>

                        <label className="flex items-start gap-4 cursor-pointer group py-2">
                            <div className="mt-1 w-5 h-5 rounded-md border-2 border-slate-100 group-hover:border-accent transition-all flex items-center justify-center shrink-0">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={agreedToTerms}
                                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                                />
                                <div className={`w-2.5 h-2.5 bg-accent rounded-sm transition-opacity ${agreedToTerms ? 'opacity-100' : 'opacity-0'}`} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed">
                                I agree to the <span className="text-slate-900 border-b border-slate-900">Terms of Service</span> and <span className="text-slate-900 border-b border-slate-900">Privacy Policy</span>.
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-4"
                        >
                            {loading ? 'Creating Account...' : (
                                <>Sign Up <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <div className="pt-12 border-t border-slate-100 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Already a member?</p>
                        <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline mt-2 inline-block">Login here</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
