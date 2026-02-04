import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Verify JWT and attach user to request
export const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Ensure we handle both id and userId if needed, but standardize on id
        req.user = await User.findById(decoded.id || decoded.userId).select('-password')

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' })
        }

        if (req.user.isBlocked) {
            return res.status(403).json({ message: 'Account is blocked. Contact support.' })
        }

        next()
    } catch (error) {
        console.error('Auth middleware error:', error.message)
        res.status(401).json({ message: 'Token is invalid or expired' })
    }
}

// Check if user is admin
export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' })
    }
}

// Alias for adminOnly
export const adminOnly = authorizeAdmin

// Check if user is standard user
export const authorizeUser = (req, res, next) => {
    if (req.user && (req.user.role === 'customer' || req.user.role === 'admin')) {
        next()
    } else {
        res.status(403).json({ message: 'Access denied.' })
    }
}
