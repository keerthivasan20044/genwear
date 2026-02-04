// Mock API service for Vercel deployment (no backend)
import ENHANCED_PRODUCTS from './enhancedProducts.js';

export const MOCK_USERS = [
  {
    _id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@genwear.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1234567890',
    address: {
      street: '123 Admin St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  }
]

// Use enhanced products database
export const MOCK_PRODUCTS = ENHANCED_PRODUCTS;


class MockAPI {
  constructor() {
    this.baseURL = window.location.origin
    this.token = localStorage.getItem('token')
  }

  // Simulate network delay
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Auth endpoints
  async login(credentials) {
    await this.delay()

    const user = MOCK_USERS.find(u =>
      u.email === credentials.email && u.password === credentials.password
    )

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = 'mock_jwt_token_' + Date.now()
    const userData = {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      token
    }

    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userData.user))

    return userData
  }

  async register(userData) {
    await this.delay()

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      role: 'user'
    }

    MOCK_USERS.push(newUser)

    const token = 'mock_jwt_token_' + Date.now()
    const responseData = {
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      },
      token
    }

    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(responseData.user))

    return responseData
  }

  // Product endpoints
  async getProducts(params = {}) {
    await this.delay()

    let filteredProducts = [...MOCK_PRODUCTS]

    // Category filter
    if (params.category) {
      filteredProducts = filteredProducts.filter(p => p.category === params.category)
    }

    // Gender filter
    if (params.gender) {
      filteredProducts = filteredProducts.filter(p => p.gender === params.gender || p.gender === 'unisex')
    }

    // Price range filter
    if (params.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(params.minPrice))
    }
    if (params.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(params.maxPrice))
    }

    // New arrivals filter
    if (params.isNew === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isNew === true)
    }

    // Brand filter
    if (params.brand) {
      filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase().includes(params.brand.toLowerCase()))
    }

    // Color filter
    if (params.color) {
      filteredProducts = filteredProducts.filter(p =>
        p.colors && p.colors.some(color => color.toLowerCase().includes(params.color.toLowerCase()))
      )
    }

    // Size filter
    if (params.size) {
      filteredProducts = filteredProducts.filter(p =>
        p.sizes && p.sizes.includes(params.size)
      )
    }

    // Search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
      )
    }

    // Sort products
    if (params.sort) {
      switch (params.sort) {
        case 'newest':
          filteredProducts.sort((a, b) => b._id.localeCompare(a._id))
          break
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          filteredProducts.sort((a, b) => b._id.localeCompare(a._id))
      }
    }

    // Pagination
    const page = parseInt(params.page) || 1
    const limit = parseInt(params.limit) || 12
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    // Get unique filter options
    const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))]
    const brands = [...new Set(MOCK_PRODUCTS.map(p => p.brand))]
    const colors = [...new Set(MOCK_PRODUCTS.flatMap(p => p.colors || []))]
    const sizes = [...new Set(MOCK_PRODUCTS.flatMap(p => p.sizes || []))]
    const priceRange = {
      min: Math.min(...MOCK_PRODUCTS.map(p => p.price)),
      max: Math.max(...MOCK_PRODUCTS.map(p => p.price))
    }

    return {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalProducts: filteredProducts.length
      },
      filters: {
        categories,
        brands,
        colors,
        sizes,
        priceRange
      }
    }
  }

  async getProductById(id) {
    await this.delay()
    const product = MOCK_PRODUCTS.find(p => p._id === id)
    if (!product) throw new Error('Product not found')
    return product
  }

  // Order endpoints
  async createOrder(orderData) {
    await this.delay()

    const order = {
      _id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    return order
  }

  async getOrders() {
    await this.delay()
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    return orders
  }

  async getUserOrders(userId) {
    await this.delay()
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    return orders.filter(o => o.user === userId)
  }

  async getMyOrders() {
    await this.delay()
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')

    // Filter orders by current user
    if (userInfo._id) {
      return orders.filter(o => o.user === userInfo._id || o.userId === userInfo._id)
    }

    return orders
  }

  async updateOrderStatus(orderId, status) {
    await this.delay()
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const orderIndex = orders.findIndex(o => o._id === orderId)

    if (orderIndex === -1) throw new Error('Order not found')

    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()

    localStorage.setItem('orders', JSON.stringify(orders))
    return orders[orderIndex]
  }

  // Admin endpoints
  async getAdminStats() {
    await this.delay()
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')

    return {
      totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
      totalOrders: orders.length,
      totalProducts: MOCK_PRODUCTS.length,
      totalCustomers: MOCK_USERS.length,
      recentOrders: orders.slice(-5).reverse(),
      ordersByStatus: { pending: 5, processing: 3, shipped: 2, delivered: 10 }
    }
  }

  async getOrderById(id) {
    await this.delay()
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const order = orders.find(o => o._id === id || o.id === id)
    if (!order) throw new Error('Order not found in records')
    return order
  }

  async getDashboard() {
    return this.getAdminStats()
  }
}

// Create singleton instance
const mockAPI = new MockAPI()

// Export for use in API service
export default mockAPI