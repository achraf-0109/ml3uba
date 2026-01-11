import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

const AuthModal = ({ onClose, onLogin, onRegister }) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            onRegister(formData)
        } else {
            onLogin(formData.phone, formData.password)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-md bg-[#1a0000] border border-morocco-gold/30 rounded-[2.5rem] p-8 relative overflow-hidden shadow-glow-gold"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white z-50">
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-morocco-red rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-red">
                        <Trophy className="text-morocco-gold" size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">
                        {isSignUp ? 'Royal Registration' : 'Kingdom Access'}
                    </h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">
                        Morocco 2025 official Portal
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="text-[10px] font-black uppercase text-morocco-gold ml-2 mb-1 block">Full Name</label>
                            <input
                                required
                                type="text"
                                placeholder="Achraf Hakimi"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-morocco-gold outline-none transition-colors"
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-[10px] font-black uppercase text-morocco-gold ml-2 mb-1 block">Phone Number</label>
                        <input
                            required
                            type="tel"
                            placeholder="+212 600000000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-morocco-gold outline-none transition-colors"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-morocco-gold ml-2 mb-1 block">Password</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-morocco-gold outline-none transition-colors"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button className="w-full bg-morocco-red hover:bg-[#a01d22] text-white font-black py-4 rounded-xl mt-6 shadow-glow-red transition-all transform active:scale-95 uppercase text-xs tracking-widest">
                        {isSignUp ? 'Create Royal Identity' : 'Enter the Kingdom'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                        {isSignUp ? 'Already have an identity? Sign In' : 'New subject? Create an account'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default AuthModal;
