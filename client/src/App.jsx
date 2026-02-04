import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Layout from './components/layout/Layout';
import PageLoader from './components/common/PageLoader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopButton from './components/common/ScrollToTopButton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/ProductsNew'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Search = lazy(() => import('./pages/Search'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers'));

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SocketProvider>
                <ScrollToTop />
                <ScrollToTopButton />
                <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* Public Routes */}
                        <Route index element={<Home />} />
                        <Route path="products" element={<Products />} />
                        <Route path="products/:id" element={<ProductDetail />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="wishlist" element={<Wishlist />} />
                        <Route path="search" element={<Search />} />

                        {/* Auth Routes */}
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="checkout" element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        } />

                        <Route path="profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } />

                        <Route path="orders" element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        } />

                        <Route path="orders/:id" element={
                            <ProtectedRoute>
                                <OrderDetail />
                            </ProtectedRoute>
                        } />

                        {/* Admin Routes */}
                        <Route path="admin" element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        } />
                        <Route path="admin/dashboard" element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        } />
                        <Route path="admin/products" element={
                            <AdminRoute>
                                <AdminProducts />
                            </AdminRoute>
                        } />
                        <Route path="admin/orders" element={
                            <AdminRoute>
                                <AdminOrders />
                            </AdminRoute>
                        } />
                        <Route path="admin/customers" element={
                            <AdminRoute>
                                <AdminCustomers />
                            </AdminRoute>
                        } />

                        {/* 404 Route */}
                        <Route path="*" element={
                            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                                <div className="text-center">
                                    <h1 className="text-6xl font-display font-bold text-slate-900 mb-4">404</h1>
                                    <p className="text-xl text-slate-600 mb-8">Page not found</p>
                                    <Link to="/" className="btn-primary">Go Home</Link>
                                </div>
                            </div>
                        } />
                    </Route>
                </Routes>
            </Suspense>
            </SocketProvider>
        </Router>
    );
}

export default App;
