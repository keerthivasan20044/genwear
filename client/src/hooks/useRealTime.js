import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/SocketContext'
import { useSelector } from 'react-redux'

// Hook for tracking user analytics
export const useAnalytics = () => {
    const { socket } = useSocket()
    const { userInfo } = useSelector(state => state.auth)

    const trackPageView = (page, referrer = document.referrer) => {
        if (socket) {
            socket.emit('track-page', {
                userId: userInfo?._id,
                page,
                referrer,
                userAgent: navigator.userAgent,
                timestamp: new Date()
            })
        }
    }

    const trackProductView = (productId, category, price) => {
        if (socket) {
            socket.emit('track-product-view', {
                userId: userInfo?._id,
                productId,
                category,
                price,
                timestamp: new Date()
            })
        }
    }

    const trackCartAction = (action, productId, quantity = 1) => {
        if (socket) {
            socket.emit('track-cart-action', {
                userId: userInfo?._id,
                action, // 'add' or 'remove'
                productId,
                quantity,
                timestamp: new Date()
            })
        }
    }

    return {
        trackPageView,
        trackProductView,
        trackCartAction
    }
}

// Hook for real-time notifications
export const useNotifications = () => {
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const { socket } = useSocket()
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (socket && userInfo) {
            // Listen for new notifications
            socket.on(`notification-${userInfo._id}`, (notification) => {
                setNotifications(prev => [notification, ...prev])
                setUnreadCount(prev => prev + 1)
            })

            // Listen for order updates
            socket.on(`order-update-${userInfo._id}`, (orderUpdate) => {
                const notification = {
                    id: Date.now(),
                    type: 'order_update',
                    title: 'Order Status Update',
                    message: `Your order status has been updated to ${orderUpdate.status}`,
                    data: orderUpdate,
                    timestamp: new Date()
                }
                setNotifications(prev => [notification, ...prev])
                setUnreadCount(prev => prev + 1)
            })

            return () => {
                socket.off(`notification-${userInfo._id}`)
                socket.off(`order-update-${userInfo._id}`)
            }
        }
    }, [socket, userInfo])

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
            )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
    }

    const clearAll = () => {
        setNotifications([])
        setUnreadCount(0)
    }

    return {
        notifications,
        unreadCount,
        markAsRead,
        clearAll
    }
}

// Hook for real-time cart sync
export const useCartSync = () => {
    const { socket } = useSocket()
    const { userInfo } = useSelector(state => state.auth)
    const [cartData, setCartData] = useState(null)

    useEffect(() => {
        if (socket && userInfo) {
            socket.on(`cart-sync-${userInfo._id}`, (data) => {
                setCartData(data)
            })

            return () => {
                socket.off(`cart-sync-${userInfo._id}`)
            }
        }
    }, [socket, userInfo])

    return cartData
}

// Hook for admin real-time updates
export const useAdminRealTime = () => {
    const [metrics, setMetrics] = useState({})
    const [newOrders, setNewOrders] = useState([])
    const [lowStockAlerts, setLowStockAlerts] = useState([])
    const [activeUsers, setActiveUsers] = useState(0)
    const { socket } = useSocket()

    useEffect(() => {
        if (socket) {
            // Dashboard metrics
            socket.on('dashboard-metrics', (data) => {
                setMetrics(data)
            })

            // New orders
            socket.on('new-order', (order) => {
                setNewOrders(prev => [order, ...prev.slice(0, 9)])
            })

            // Low stock alerts
            socket.on('low-stock-alert', (alert) => {
                setLowStockAlerts(prev => [...prev, alert])
            })

            // Active users count
            socket.on('active-users-admin', (data) => {
                setActiveUsers(data.count)
            })

            // Product views
            socket.on('product-view', (data) => {
                // Handle real-time product view updates
            })

            return () => {
                socket.off('dashboard-metrics')
                socket.off('new-order')
                socket.off('low-stock-alert')
                socket.off('active-users-admin')
                socket.off('product-view')
            }
        }
    }, [socket])

    return {
        metrics,
        newOrders,
        lowStockAlerts,
        activeUsers
    }
}

// Hook for order tracking
export const useOrderTracking = (orderId) => {
    const [tracking, setTracking] = useState(null)
    const [loading, setLoading] = useState(true)
    const { socket } = useSocket()

    useEffect(() => {
        if (socket && orderId) {
            // Listen for order updates
            socket.on(`order-update-${orderId}`, (update) => {
                setTracking(prev => ({
                    ...prev,
                    status: update.status,
                    timeline: update.tracking
                }))
            })

            return () => {
                socket.off(`order-update-${orderId}`)
            }
        }
    }, [socket, orderId])

    return { tracking, loading }
}

// Hook for live user count
export const useLiveUserCount = () => {
    const [count, setCount] = useState(0)
    const { socket } = useSocket()

    useEffect(() => {
        if (socket) {
            socket.on('active-users', (data) => {
                setCount(data.count)
            })

            return () => {
                socket.off('active-users')
            }
        }
    }, [socket])

    return count
}