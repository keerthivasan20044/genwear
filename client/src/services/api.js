import axios from 'axios';
import mockAPI from './mockAPI.js';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_URL = BASE_URL.includes('/api') ? BASE_URL : `${BASE_URL}/api`;

// Check if we're in production without a backend
// Check if we're in production without a backend
const USE_MOCK_API = true; // Force usage of improved Mock API with Enhanced Products


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

        // Handle token expiration
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            localStorage.removeItem('userInfo');
            // Optional: window.location.href = '/login';
        }

        return Promise.reject(message);
    }
);

export default api;

export const authAPI = {
    login: (credentials) => USE_MOCK_API ? mockAPI.login(credentials) : api.post('/auth/login', credentials),
    register: (userData) => USE_MOCK_API ? mockAPI.register(userData) : api.post('/auth/register', userData),
    getProfile: () => USE_MOCK_API ? Promise.resolve({}) : api.get('/auth/me'),
};

export const productAPI = {
    getProducts: (params) => USE_MOCK_API ? mockAPI.getProducts(params) : api.get('/products', { params }),
    getProductById: (id) => USE_MOCK_API ? mockAPI.getProductById(id) : api.get(`/products/${id}`),
    search: (q) => USE_MOCK_API ? mockAPI.getProducts({ search: q }) : api.get('/products/search', { params: { q } }),
};

export const cartAPI = {
    getCart: () => USE_MOCK_API ? mockAPI.getCart() : api.get('/cart'),
    addToCart: (data) => USE_MOCK_API ? mockAPI.addToCart(data) : api.post('/cart', data),
    updateItem: (itemId, quantity) => USE_MOCK_API ? Promise.resolve({}) : api.put(`/cart/${itemId}`, { quantity }),
    removeItem: (itemId) => USE_MOCK_API ? Promise.resolve({}) : api.delete(`/cart/${itemId}`),
    clear: () => USE_MOCK_API ? Promise.resolve({}) : api.post('/cart/clear'),
};

export const orderAPI = {
    create: (orderData) => USE_MOCK_API ? mockAPI.createOrder(orderData) : api.post('/orders', orderData),
    getMyOrders: () => USE_MOCK_API ? mockAPI.getMyOrders() : api.get('/orders/myorders'),
    getOrderById: (id) => USE_MOCK_API ? mockAPI.getOrderById(id) : api.get(`/orders/${id}`),
};

export const adminAPI = {
    getDashboard: () => USE_MOCK_API ? mockAPI.getDashboard() : api.get('/admin/dashboard'),
    getOrders: () => USE_MOCK_API ? mockAPI.getOrders() : api.get('/orders/all'),
    updateOrderStatus: (id, status) => USE_MOCK_API ? Promise.resolve({}) : api.put(`/orders/${id}/status`, { status }),
    getCustomers: () => USE_MOCK_API ? mockAPI.getCustomers() : api.get('/admin/customers'),
    toggleBlockCustomer: (id) => USE_MOCK_API ? Promise.resolve({}) : api.put(`/admin/customers/${id}/block`),
    createProduct: (data) => USE_MOCK_API ? Promise.resolve({}) : api.post('/products', data),
    updateProduct: (id, data) => USE_MOCK_API ? Promise.resolve({}) : api.put(`/products/${id}`, data),
    deleteProduct: (id) => USE_MOCK_API ? Promise.resolve({}) : api.delete(`/products/${id}`),
};
