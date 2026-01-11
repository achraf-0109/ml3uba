import React from 'react';
import { motion } from 'framer-motion';
import { X, Share2, Camera } from 'lucide-react';

const FanZoneModal = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, rotate: -2 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-full max-w-2xl bg-white p-4 pb-12 rounded-[2rem] shadow-2xl relative transform transition-all hover:rotate-1"
            >
                <button onClick={onClose} className="absolute top-4 right-4 z-50 text-black/50 hover:text-black bg-black/5 p-2 rounded-full">
                    <X size={24} />
                </button>

                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-100 relative mb-6 shadow-inner">
                    <img
                        src="/fan-zone-selfie.png"
                        alt="Royal Fan Selfie"
                        className="w-full h-full object-cover"
                    />

                    {/* Sticker Overlays */}
                    <div className="absolute bottom-6 left-6 bg-morocco-red text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg -rotate-2">
                        CAN 2025 Live
                    </div>
                    <div className="absolute top-6 right-6 bg-morocco-gold text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg rotate-3">
                        #DimaMaghrib
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">My Royal Moment</h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Stadium Zone • VIP Access</p>

                    <div className="flex justify-center gap-4 mt-6">
                        <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors">
                            <Share2 size={16} /> Share on Facebook
                        </button>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                            <Camera size={16} /> Instagram Story
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default FanZoneModal;
