import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const SocketContext = createContext()

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [connected, setConnected] = useState(false)
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo) {
            const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001')

            newSocket.on('connect', () => {
                setConnected(true)
                console.log('Connected to server')

                // Join admin room if user is admin
                if (userInfo.role === 'admin') {
                    newSocket.emit('join-admin')
                }
            })

            newSocket.on('disconnect', () => {
                setConnected(false)
                console.log('Disconnected from server')
            })

            setSocket(newSocket)

            return () => {
                newSocket.close()
            }
        }
    }, [userInfo])

    const value = {
        socket,
        connected
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext