// Mock API service for Vercel deployment (no backend)
const MOCK_USERS = [
  {
    _id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@genwear.com',
    password: 'Admin@123',
    role: 'admin'
  },
  {
    _id: '2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  }
]

const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    category: 'topwear',
    gender: 'men',
    brand: 'GENWEAR',
    colors: ['White', 'Black', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    isActive: true,
    rating: 4.5,
    description: 'High-quality cotton t-shirt perfect for everyday wear.'
  },
  {
    _id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500'],
    category: 'outerwear',
    gender: 'unisex',
    brand: 'GENWEAR',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    isActive: true,
    rating: 4.8,
    description: 'Classic denim jacket with modern fit.'
  },
  {
    _id: '3',
    name: 'Women\'s Floral Dress',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'],
    category: 'topwear',
    gender: 'women',
    brand: 'GENWEAR',
    colors: ['Floral', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 30,
    isActive: true,
    rating: 4.6,
    description: 'Elegant floral dress for special occasions.'
  },
  {
    _id: '4',
    name: 'Men\'s Chino Pants',
    price: 59.99,
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500'],
    category: 'bottomwear',
    gender: 'men',
    brand: 'GENWEAR',
    colors: ['Khaki', 'Navy', 'Black'],
    sizes: ['30', '32', '34', '36'],
    stock: 40,
    isActive: true,
    rating: 4.4,
    description: 'Comfortable chino pants for casual wear.'
  },
  {
    _id: '5',
    name: 'Kids Rainbow Hoodie',
    price: 39.99,
    images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500'],
    category: 'topwear',
    gender: 'kids',
    brand: 'GENWEAR',
    colors: ['Rainbow', 'Pink', 'Blue'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    stock: 20,
    isActive: true,
    rating: 4.7,
    description: 'Colorful hoodie perfect for kids.'
  },
  {
    _id: '6',
    name: 'Leather Sneakers',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'],
    category: 'footwear',
    gender: 'unisex',
    brand: 'GENWEAR',
    colors: ['White', 'Black', 'Brown'],
    sizes: ['7', '8', '9', '10', '11'],
    stock: 35,
    isActive: true,
    rating: 4.9,
    description: 'Premium leather sneakers for style and comfort.'
  },
  {
    _id: '7',
    name: 'Women\'s Yoga Leggings',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1506629905607-d9c297d3d45b?w=500'],
    category: 'bottomwear',
    gender: 'women',
    brand: 'GENWEAR',
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 45,
    isActive: true,
    rating: 4.5,
    description: 'High-performance yoga leggings with moisture-wicking fabric.'
  },
  {
    _id: '8',
    name: 'Classic Watch',
    price: 199.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    category: 'accessories',
    gender: 'unisex',
    brand: 'GENWEAR',
    colors: ['Silver', 'Gold', 'Black'],
    sizes: ['One Size'],
    stock: 15,
    isActive: true,
    rating: 4.8,
    description: 'Elegant timepiece for any occasion.'
  }
]

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
        role: user.role
      },
      token
    }
    
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userData))
    
    return userData
  }

  async register(userData) {
    await this.delay()
    
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
    localStorage.setItem('userInfo', JSON.stringify(responseData))
    
    return responseData
  }

  // Products endpoints
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
          // Default sort by newest (id)
          filteredProducts.sort((a, b) => b._id.localeCompare(a._id))
      }
    }
    
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
      products: filteredProducts,
      pagination: {
        page: 1,
        totalPages: 1,
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
    if (!product) {
      throw new Error('Product not found')
    }
    
    return product
  }

  // Cart endpoints
  async getCart() {
    await this.delay()
    
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "total": 0}')
    return cart
  }

  async addToCart(data) {
    await this.delay()
    
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "total": 0}')
    const existingItem = cart.items.find(item => 
      item.product === data.productId && 
      item.size === data.size && 
      item.color === data.color
    )
    
    if (existingItem) {
      existingItem.quantity += data.quantity
    } else {
      const product = MOCK_PRODUCTS.find(p => p._id === data.productId)
      cart.items.push({
        _id: Date.now().toString(),
        product: data.productId,
        productDetails: product,
        quantity: data.quantity,
        size: data.size,
        color: data.color,
        price: product.price
      })
    }
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    localStorage.setItem('cart', JSON.stringify(cart))
    
    return cart
  }

  // Orders endpoints
  async createOrder(orderData) {
    await this.delay()
    
    const order = {
      _id: Date.now().toString(),
      orderNumber: 'GW' + Date.now().toString().slice(-8),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify({items: [], total: 0}))
    
    return { order }
  }

  async getMyOrders() {
    await this.delay()
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    return { orders }
  }

  // Admin endpoints
  async getDashboard() {
    await this.delay()
    
    return {
      totalProducts: MOCK_PRODUCTS.length,
      totalCustomers: MOCK_USERS.filter(u => u.role === 'user').length,
      ordersByStatus: { pending: 5, processing: 3, shipped: 2, delivered: 10 }
    }
  }
}

// Create singleton instance
const mockAPI = new MockAPI()

// Export for use in API service
export default mockAPI