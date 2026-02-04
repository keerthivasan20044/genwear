import express from 'express'
import {
    createOrder,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderStatus
} from '../controllers/orderController.js'
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js'
import { createOrderValidation, mongoIdValidation } from '../middleware/validation.js'

const router = express.Router()

// Customer routes (must come before /:id)
router.post('/', authenticate, createOrderValidation, createOrder)
router.get('/myorders', authenticate, getMyOrders)

// Admin Routes
router.get('/all', authenticate, authorizeAdmin, getOrders)
router.put('/:id/status', authenticate, authorizeAdmin, mongoIdValidation, updateOrderStatus)

// Single order route (must come last)
router.get('/:id', authenticate, mongoIdValidation, getOrderById)

export default router
