import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket } from 'lucide-react';
import { CountdownTimer } from './MatchComponents';

const HistorySidebar = ({ tickets = [], matches = [], isOpen, onClose, onSelectTicket, onSellClick }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[140]"
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    className="fixed top-0 right-0 h-screen w-full max-w-sm bg-[#0f0202] z-[150] shadow-2xl p-8 overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-black uppercase tracking-tighter">My <span className="text-morocco-gold italic">Tickets</span></h2>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={24} /></button>
                    </div>

                    <div className="space-y-6">
                        {tickets.length === 0 ? (
                            <div className="text-center py-20 opacity-30">
                                <Ticket className="mx-auto mb-4" size={48} />
                                <p className="text-[10px] font-black uppercase tracking-widest">No match passes found</p>
                            </div>
                        ) : (
                            tickets.map((t) => {
                                // Robust lookup: Try ID first, then fallback to current/safe data
                                const match = (matches && matches.length > 0)
                                    ? (matches.find(m => m.id === t.id) || matches.find(m => m.home === t.home && m.away === t.away))
                                    : null;

                                // Fallback object if match not found in 'matches' array (uses stored ticket data)
                                const displayData = match || { ...t, homeFlag: t.homeFlag || '', awayFlag: t.awayFlag || '' };

                                const matchTime = new Date(displayData.isoDate || t.isoDate || Date.now()).getTime()
                                const isLocked = matchTime - new Date().getTime() < 24 * 60 * 60 * 1000
                                const originalPrice = t.price || 250
                                const passType = t.type || 'Normal'

                                return (
                                    <motion.div
                                        key={t.ticketId}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-morocco-gold/30 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${passType === 'VIP' ? 'bg-morocco-gold text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                                                {passType} PASS
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[9px] font-black uppercase text-morocco-gold mb-1">Original Price</div>
                                                <div className="text-2xl font-black text-white">{originalPrice}<span className="text-sm ml-1 opacity-60">MAD</span></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex -space-x-2">
                                                <img src={displayData.homeFlag} className="w-8 h-8 rounded-full border-2 border-[#1a0202] z-10 bg-zinc-800" />
                                                <img src={displayData.awayFlag} className="w-8 h-8 rounded-full border-2 border-[#1a0202] bg-zinc-800" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-zinc-500 uppercase">{displayData.round}</div>
                                                <div className="font-black text-sm">{displayData.home} vs {displayData.away}</div>
                                            </div>
                                        </div>

                                        <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between mb-6">
                                            <div className="text-[9px] font-bold text-zinc-500 uppercase">Starts In</div>
                                            <CountdownTimer targetDate={displayData.isoDate || t.isoDate} className="text-sm font-black text-white tabular-nums" />
                                        </div>

                                        <button
                                            disabled={isLocked}
                                            onClick={() => onSellClick(t)}
                                            className="w-full py-3 bg-morocco-red hover:bg-[#a01d22] disabled:opacity-30 disabled:hover:bg-morocco-red text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-glow-red transition-all active:scale-95"
                                        >
                                            {isLocked ? 'LOCKED (24H RULE)' : 'LIST FOR SALE'}
                                        </button>
                                    </motion.div>
                                )
                            })
                        )}
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

export default HistorySidebar;
