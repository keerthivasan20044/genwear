import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import RealTimeService from './services/RealTimeService.js'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

// Initialize real-time service
const realTimeService = new RealTimeService(io)

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Socket.IO middleware to pass io instance and realTimeService
app.use((req, res, next) => {
    req.io = io
    req.realTimeService = realTimeService
    next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/notifications', notificationRoutes)

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'GENWEAR API is running' })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
})

// Socket.IO connection handling
io.on('connection', (socket) => {
    realTimeService.handleConnection(socket)
})

// Broadcast metrics every 30 seconds
setInterval(() => {
    realTimeService.broadcastDashboardMetrics()
    realTimeService.checkLowStock()
}, 30000)

const PORT = process.env.PORT || 5001

if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
}

export default app