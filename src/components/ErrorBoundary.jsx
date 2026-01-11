import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('🚨 Royal Error Boundary Caught:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0f0202] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-[#1a0000] border border-morocco-red/30 rounded-[2rem] p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-morocco-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="text-morocco-red" size={32} />
                        </div>

                        <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
                            Kingdom Error
                        </h1>

                        <p className="text-zinc-400 text-sm mb-6">
                            The Royal System encountered an unexpected issue. The Kingdom's engineers have been notified.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="bg-black/40 rounded-xl p-4 mb-6 text-left">
                                <p className="text-[10px] font-black text-morocco-red uppercase mb-2">Debug Info:</p>
                                <p className="text-[10px] text-zinc-500 font-mono break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-morocco-gold hover:bg-[#cba000] text-black font-black py-3 rounded-xl uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all"
                        >
                            <RefreshCw size={16} /> Reload Kingdom
                        </button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
