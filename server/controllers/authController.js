import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import logger from '../utils/logger.js'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { firstName, lastName, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        })

        if (user) {
            logger.info(`New user registered: ${user.email}`);
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }
    } catch (error) {
        logger.error('Register error:', { error: error.message, stack: error.stack })
        res.status(500).json({ message: 'Server error' })
    }
}

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user && (await user.comparePassword(password))) {
            if (user.isBlocked) {
                return res.status(403).json({ message: 'Account is blocked. Contact support.' })
            }

            logger.info(`User logged in: ${user.email}`);
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    } catch (error) {
        logger.error('Login error:', { error: error.message })
        res.status(500).json({ message: 'Server error' })
    }
}

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        // req.user is already populated by authMiddleware with password excluded
        res.json(req.user)
    } catch (error) {
        logger.error('Get profile error:', { error: error.message })
        res.status(500).json({ message: 'Server error' })
    }
}
