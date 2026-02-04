import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-gray-600 mb-8">
                            We're sorry for the inconvenience. Please try refreshing the page or go back to home.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh Page
                            </button>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Go Home
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-8 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                                    Error Details (Development)
                                </summary>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-xs font-mono text-gray-700 overflow-auto">
                                    <div className="mb-2">
                                        <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                                    </div>
                                    <div>
                                        <strong>Stack:</strong>
                                        <pre className="whitespace-pre-wrap">
                                            {this.state.errorInfo?.componentStack}
                                        </pre>
                                    </div>
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary