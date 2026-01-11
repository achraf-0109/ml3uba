import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

export const RoyalNotification = ({ msg, index, onClose }) => (
    <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, x: 50 }}
        style={{ top: `${6 + (index * 8)}rem` }}
        className="fixed right-8 z-[300] max-w-sm w-full"
    >
        <div className="bg-[#1a0000] border border-morocco-gold/30 rounded-[2rem] p-6 shadow-glow-gold relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-morocco-gold/5 rounded-full blur-2xl" />

            <div className="flex gap-4">
                <div className="w-12 h-12 bg-morocco-gold rounded-2xl flex items-center justify-center shrink-0 shadow-glow-gold">
                    <Trophy className="text-black" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-1">Royal Decree</h4>
                    <div className="text-[11px] text-zinc-400 font-bold leading-relaxed whitespace-pre-line">
                        {msg}
                    </div>
                </div>
                <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                onAnimationComplete={onClose}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-morocco-gold to-transparent opacity-50"
            />
        </div>
    </motion.div>
);
