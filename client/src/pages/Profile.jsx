import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Package, Heart, MapPin, Settings, LogOut, Camera,
    Shield, Terminal, Cpu, Database, ChevronRight, Edit3, Save
} from 'lucide-react';
import { logout, updateUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setFormData({
                firstName: userInfo.firstName || '',
                lastName: userInfo.lastName || '',
                email: userInfo.email || '',
                phone: userInfo.phone || ''
            });
        }
    }, [userInfo, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Successfully logged out');
        navigate('/');
    };

    const handleSave = (e) => {
        e.preventDefault();

        const updatedUser = {
            ...userInfo,
            ...formData
        };

        // Update Redux
        dispatch(updateUser(updatedUser));

        // Update local storage
        const fullInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        localStorage.setItem('userInfo', JSON.stringify({
            ...fullInfo,
            user: updatedUser
        }));

        toast.success('PROFILE DATA SYNCHRONIZED SUCCESSFULLY');
        setIsEditing(false);
    };

    const sidebarItems = [
        { id: 'profile', name: 'My Profile', icon: User, label: 'View Details' },
        { id: 'orders', name: 'My Orders', icon: Package, label: 'Order History' },
        { id: 'wishlist', name: 'Wishlist', icon: Heart, label: 'Saved Items' },
        { id: 'addresses', name: 'Addresses', icon: MapPin, label: 'Shipping Address' },
        { id: 'settings', name: 'Settings', icon: Settings, label: 'Account Settings' },
    ];

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-white pt-24 pb-40">
            {/* Background Background elements */}
            <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-primary-500/5 blur-[120px] -z-0"></div>
            <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-slate-500/5 blur-[120px] -z-0"></div>

            <div className="max-container relative z-10 pt-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar / Tactical Panel */}
                    <aside className="lg:w-80 flex-shrink-0">
                        <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            {/* User Info Header */}
                            <div className="relative mb-12 text-center">
                                <div className="w-24 h-24 mx-auto rounded-[2.5rem] bg-white/10 p-1 mb-6 relative group">
                                    <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-slate-800 flex items-center justify-center text-primary-400 border border-white/10">
                                        <User size={40} />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">{userInfo.firstName} {userInfo.lastName}</h2>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-accent mt-2">Verified Member</p>
                            </div>

                            {/* Nav */}
                            <nav className="space-y-2">
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                if (item.id === 'wishlist') navigate('/wishlist');
                                                else if (item.id === 'orders') navigate('/orders');
                                                else setActiveTab(item.id);
                                            }}
                                            className={`w-full group flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all ${isActive
                                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <Icon size={18} className={isActive ? 'text-white' : 'group-hover:text-primary-400 transition-colors'} />
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest">{item.name}</p>
                                                <p className={`text-[8px] uppercase tracking-widest opacity-40 ${isActive ? 'text-white' : 'text-slate-500'}`}>{item.label}</p>
                                            </div>
                                            {isActive && <ChevronRight size={14} />}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleLogout}
                                    className="w-full group flex items-center gap-4 px-6 py-5 rounded-2xl text-left border-t border-white/5 mt-6 text-red-500 hover:bg-red-500/10 transition-all"
                                >
                                    <LogOut size={18} />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-wider">Logout</p>
                                        <p className="text-[10px] uppercase tracking-widest opacity-40">Sign out</p>
                                    </div>
                                </button>
                            </nav>
                        </div>

                        {/* Tactical Stats Panel */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] text-center">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisitions</p>
                                <p className="text-xl font-black text-slate-900 tracking-tighter">04</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] text-center">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Rank</p>
                                <p className="text-xl font-black text-orange-600 tracking-tighter italic">VETERAN</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Interface Content */}
                    <main className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="flex justify-between items-end pb-8 border-b border-slate-100 mb-12">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Profile Settings</p>
                                        <h1 className="heading-2 uppercase italic text-slate-900">
                                            {sidebarItems.find(i => i.id === activeTab)?.name}
                                        </h1>
                                    </div>
                                    {activeTab === 'profile' && !isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-3 px-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 border border-slate-100 hover:bg-white hover:shadow-soft transition-all"
                                        >
                                            <Edit3 size={16} /> Edit Data
                                        </button>
                                    )}
                                </div>

                                {activeTab === 'profile' && (
                                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                        <DataField
                                            label="First Name"
                                            value={formData.firstName}
                                            editing={isEditing}
                                            onChange={(val) => setFormData({ ...formData, firstName: val })}
                                            icon={User}
                                        />
                                        <DataField
                                            label="Last Name"
                                            value={formData.lastName}
                                            editing={isEditing}
                                            onChange={(val) => setFormData({ ...formData, lastName: val })}
                                            icon={User}
                                        />
                                        <DataField
                                            label="Email Address"
                                            value={formData.email}
                                            editing={isEditing}
                                            onChange={(val) => setFormData({ ...formData, email: val })}
                                            icon={Database}
                                        />
                                        <DataField
                                            label="Phone Number"
                                            value={formData.phone || 'N/A'}
                                            editing={isEditing}
                                            onChange={(val) => setFormData({ ...formData, phone: val })}
                                            icon={Shield}
                                        />

                                        {isEditing && (
                                            <div className="md:col-span-2 pt-8 flex gap-4">
                                                <button
                                                    type="submit"
                                                    className="flex-1 h-16 bg-primary-500 text-white rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-primary-600 transition-all"
                                                >
                                                    <Save size={18} /> Update Profile
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-10 h-16 bg-slate-900 border border-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-bold uppercase tracking-wider text-xs hover:bg-black transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                )}

                                {activeTab === 'addresses' && (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {(userInfo.addresses || []).map((addr, idx) => (
                                            <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative group hover:bg-white hover:shadow-soft transition-all">
                                                <div className="flex justify-between mb-6">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-500">Saved Address 0{idx + 1}</span>
                                                    {addr.isDefault && <Shield size={14} className="text-primary-500" />}
                                                </div>
                                                <p className="text-sm font-bold text-slate-900 leading-relaxed mb-6">
                                                    {addr.addressLine}<br />
                                                    {addr.city}, {addr.state} - {addr.pincode}
                                                </p>
                                                <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-500 transition-colors">Edit Address</button>
                                            </div>
                                        ))}
                                        <button className="p-8 bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-primary-500 hover:border-primary-500 transition-all group">
                                            <MapPin size={24} className="group-hover:translate-y-[-4px] transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Add New Address</span>
                                        </button>
                                    </div>
                                )}

                                {activeTab === 'settings' && (
                                    <div className="space-y-6">
                                        <SettingToggle title="Email Notifications" desc="Receive updates about your orders and offers" active={true} />
                                        <SettingToggle title="Personalized Content" desc="Get recommendations based on your style" active={false} />
                                        <SettingToggle title="Biometric Login" desc="Use FaceID or TouchID for faster access" active={true} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

const DataField = ({ label, value, editing, onChange, icon: Icon }) => (
    <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-2 flex items-center gap-3">
            <Icon size={12} className="text-primary-500" /> {label}
        </label>
        {editing ? (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 focus:border-primary-500 focus:bg-white outline-none font-bold text-slate-900 transition-all placeholder:text-slate-300"
            />
        ) : (
            <div className="w-full h-16 bg-white border border-slate-50 rounded-2xl px-8 flex items-center font-black text-slate-900 tracking-tight text-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                {value}
            </div>
        )}
    </div>
);

const SettingToggle = ({ title, desc, active }) => (
    <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-soft transition-all group">
        <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{desc}</p>
        </div>
        <div className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 ${active ? 'bg-primary-500' : 'bg-slate-200'}`}>
            <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    </div>
);

export default Profile;
