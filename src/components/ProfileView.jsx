import React from 'react';
import { motion } from 'framer-motion';
import { X, Ticket, ChevronRight } from 'lucide-react';

const ProfileView = ({ user, tickets, onLogout, onClose, onShowTickets, onSellClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-y-0 right-0 w-full max-w-md z-[180] bg-[#0f0202] border-l border-morocco-gold/20 shadow-2xl overflow-y-auto"
        >
            <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">My <span className="text-morocco-gold">Profile</span></h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={24} /></button>
                </div>

                <div className="bg-[#1a0000] border border-morocco-gold/20 rounded-3xl p-6 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-morocco-red/5 rounded-full blur-3xl" />
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-morocco-red to-[#4a0000] rounded-2xl flex items-center justify-center text-3xl font-black shadow-glow-red">
                            {user.fullName[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-morocco-gold tracking-widest mb-1">Authenticated Subject</p>
                            <h4 className="text-2xl font-black text-white">{user.fullName}</h4>
                            <p className="text-zinc-500 text-sm">{user.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h5 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] ml-2">Account Control</h5>
                    <button
                        onClick={onShowTickets}
                        className="w-full flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
                    >
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-morocco-gold">
                            <Ticket size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm">Active Tickets</p>
                            <p className="text-[10px] text-zinc-500">{tickets.length} total purchases</p>
                        </div>
                        <ChevronRight className="ml-auto text-zinc-600" size={16} />
                    </button>

                    <p className="text-[9px] font-black uppercase text-morocco-gold/60 tracking-widest px-4 mt-8 mb-2">My Passes</p>
                    <div className="space-y-3">
                        {tickets.map(t => {
                            const matchTime = new Date(t.isoDate).getTime()
                            const isLocked = matchTime - new Date().getTime() < 24 * 60 * 60 * 1000
                            return (
                                <div key={t.ticketId} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-xs">{t.home} vs {t.away}</p>
                                        <p className="text-[9px] text-zinc-500 uppercase">{t.round}</p>
                                    </div>
                                    <button
                                        disabled={isLocked}
                                        onClick={() => onSellClick(t)}
                                        className="px-4 py-2 bg-morocco-gold/10 hover:bg-morocco-gold/20 text-morocco-gold text-[9px] font-black uppercase rounded-lg disabled:opacity-30 transition-all"
                                    >
                                        {isLocked ? 'LOCKED' : 'SELL'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 bg-morocco-red/10 border border-morocco-red/20 rounded-2xl p-4 hover:bg-morocco-red/20 transition-colors text-morocco-red"
                    >
                        <div className="w-10 h-10 bg-morocco-red/20 rounded-lg flex items-center justify-center">
                            <X size={20} />
                        </div>
                        <p className="font-bold text-sm">Sign Out from Kingdom</p>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProfileView;
