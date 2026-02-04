import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, Search, User, Menu, X, Heart, LogOut, Home, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';
import { setCartOpen } from '../../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.auth);
    const { totalItems, isOpen: cartDrawerOpen } = useSelector(state => state.cart);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
        setSearchOpen(false);
        dispatch(setCartOpen(false));
    }, [location, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setUserMenuOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchOpen(false);
            setSearchTerm('');
        }
    };

    const navLinks = [
        { name: 'COLLECTION', path: '/products' },
        { name: 'MEN', path: '/products?gender=men' },
        { name: 'WOMEN', path: '/products?gender=women' },
        { name: 'NEW', path: '/products?isNew=true' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-gray-100 py-2'
                : 'bg-white py-6 border-b border-gray-50'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Mobile Toggle */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-3 bg-gray-50 rounded-2xl text-gray-900 border border-gray-100"
                            >
                                <Menu size={22} />
                            </button>
                        </div>

                        {/* Navigation - Left */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) => `px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-xl ${isActive
                                        ? 'text-orange-600 bg-orange-50 shadow-inner'
                                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Logo - Center */}
                        <Link to="/" className="flex flex-col items-center group">
                            <div className="flex items-center gap-2">
                                <Zap size={20} className="text-orange-500 fill-orange-500 group-hover:scale-125 transition-transform" />
                                <span className="font-black text-2xl md:text-3xl text-gray-900 tracking-tighter leading-none">GENWEAR</span>
                            </div>
                            <span className="text-[9px] text-gray-400 font-black tracking-[0.5em] mt-1 group-hover:text-orange-500 transition-colors uppercase">Elite Access</span>
                        </Link>

                        {/* Icons - Right */}
                        <div className="flex items-center space-x-1 md:space-x-2">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hidden md:flex p-3 bg-gray-50 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                            >
                                <Search size={22} />
                            </button>

                            <button
                                onClick={() => dispatch(setCartOpen(true))}
                                className="relative p-3 bg-gray-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-gray-200 group"
                            >
                                <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                                <AnimatePresence>
                                    {totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-black rounded-lg w-6 h-6 flex items-center justify-center border-4 border-white shadow-lg"
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="p-3 bg-gray-50 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                                >
                                    <User size={22} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-gray-100 py-2 z-[60] overflow-hidden"
                                        >
                                            {userInfo ? (
                                                <>
                                                    <div className="px-6 py-6 bg-gray-50/50 border-b border-gray-100">
                                                        <p className="text-xs font-black text-gray-400 tracking-widest uppercase mb-1">Account</p>
                                                        <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tighter">{userInfo.firstName} {userInfo.lastName}</p>
                                                    </div>
                                                    <div className="p-2 space-y-1">
                                                        {userInfo.role === 'admin' && (
                                                            <Link to="/admin" className="flex items-center gap-4 px-6 py-4 text-xs font-black text-orange-600 hover:bg-orange-50 rounded-2xl transition-all uppercase tracking-widest border-b border-orange-100/50 mb-1"><ShieldCheck size={18} /> Dashboard</Link>
                                                        )}
                                                        <Link to="/profile" className="flex items-center gap-4 px-6 py-4 text-xs font-black text-gray-600 hover:bg-gray-50 rounded-2xl hover:text-orange-600 transition-all uppercase tracking-widest"><User size={18} /> Profile</Link>
                                                        <Link to="/orders" className="flex items-center gap-4 px-6 py-4 text-xs font-black text-gray-600 hover:bg-gray-50 rounded-2xl hover:text-orange-600 transition-all uppercase tracking-widest"><ShoppingBag size={18} /> Orders</Link>
                                                        <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 text-xs font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all uppercase tracking-widest w-full text-left"><LogOut size={18} /> Logout</button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="p-4 space-y-2">
                                                    <Link to="/login" className="block w-full text-center py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all">Sign In</Link>
                                                    <Link to="/register" className="block w-full text-center py-4 bg-gray-50 text-gray-700 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border border-gray-100 hover:bg-gray-100 transition-all">New User</Link>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Cart Drawer Provider */}
            <CartDrawer isOpen={cartDrawerOpen} onClose={() => dispatch(setCartOpen(false))} />

            {/* Search Overlay - Premium */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-all"
                        >
                            <X size={32} />
                        </button>

                        <div className="w-full max-w-4xl text-center">
                            <p className="text-orange-500 font-black tracking-[0.5em] mb-8 uppercase text-xs">Search our network</p>
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="SEARCH PRODUCTS..."
                                        className="w-full bg-transparent border-b-8 border-white/10 py-10 text-4xl md:text-7xl font-black text-white uppercase focus:outline-none focus:border-orange-500 transition-all placeholder:text-white/10 tracking-tighter"
                                        autoFocus
                                    />
                                    <button type="submit" className="absolute right-0 bottom-10 p-4 text-orange-500 hover:scale-125 transition-transform">
                                        <ArrowRight size={48} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu - Premium */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        className="fixed inset-0 z-[120] bg-white p-8 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <Link to="/" className="flex items-center gap-3">
                                <Zap className="text-orange-500 fill-orange-500" />
                                <span className="font-black text-xl tracking-tighter uppercase">GENWEAR</span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center"><X size={24} /></button>
                        </div>

                        <div className="flex-1 space-y-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none hover:text-orange-600 transition-colors"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-gray-100 flex gap-4">
                            {userInfo ? (
                                <>
                                    <button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }} className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Profile</button>
                                    <button onClick={handleLogout} className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Logout</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Login</button>
                                    <button onClick={() => { navigate('/register'); setMobileMenuOpen(false); }} className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Join</button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
