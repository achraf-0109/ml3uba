import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, TrendingUp, Ticket, AlertCircle, BellRing } from 'lucide-react';
import { CountdownTimer } from '../MatchComponents';

const P2PMarketModal = ({ tickets, matches, onClose, onBuy, currentUser, userTickets, onSellClick }) => {
    const [activeTab, setActiveTab] = useState('buy'); // 'buy' | 'sell'

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[170] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-6xl h-[95vh] md:h-[85vh] bg-[#1a0202] border border-morocco-gold/20 rounded-t-[2.5rem] md:rounded-[3rem] flex flex-col overflow-hidden shadow-2xl relative"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-morocco-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />

                <button onClick={onClose} className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-zinc-500 hover:text-white bg-black/50 p-2 md:p-3 rounded-full">
                    <X size={20} />
                </button>

                <div className="p-6 md:p-12 md:pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-morocco-gold to-[#4a3500] rounded-2xl flex items-center justify-center shadow-glow-gold">
                            <ShoppingCart className="text-black" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">P2P <span className="text-morocco-gold italic">Market</span></h2>
                            <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Official Exchange</p>
                        </div>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full lg:w-auto overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('buy')}
                            className={`flex-1 lg:flex-none px-4 md:px-8 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'buy' ? 'bg-morocco-gold text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
                        >
                            <ShoppingCart size={14} /> Buy
                        </button>
                        <button
                            onClick={() => setActiveTab('sell')}
                            className={`flex-1 lg:flex-none px-4 md:px-8 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'sell' ? 'bg-morocco-red text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
                        >
                            <TrendingUp size={14} /> Sell
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12 scrollbar-hide">
                    {activeTab === 'buy' ? (
                        <>
                            {tickets.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <Ticket size={40} className="text-zinc-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 uppercase tracking-widest">Market is Quiet</h3>
                                    <p className="text-sm max-w-xs">No subjects are currently offering their passes for exchange.</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {tickets.filter(t => t.sellerId !== currentUser?.phone).map((t, i) => {
                                        // Robust Match Lookup
                                        let match = matches.find(m => m.id === t.matchId);
                                        if (!match && t.ticketData) {
                                            match = matches.find(m => m.home === t.ticketData.home && m.away === t.ticketData.away);
                                        }
                                        // Safe Data Merge
                                        const rawData = match || t.ticketData || {};
                                        // Ensure defaults are solid
                                        const defaultDate = new Date().toISOString();
                                        const displayMatch = {
                                            ...rawData, // Spread first
                                            home: rawData.home || 'Unknown Team',
                                            away: rawData.away || 'Unknown Team',
                                            isoDate: rawData.isoDate || defaultDate,
                                            homeFlag: rawData.homeFlag || '',
                                            awayFlag: rawData.awayFlag || '',
                                            round: rawData.round || ''
                                        };

                                        // Double check date validity
                                        if (isNaN(new Date(displayMatch.isoDate).getTime())) {
                                            displayMatch.isoDate = defaultDate;
                                        }

                                        const commission = t.type === 'VIP' ? 0.10 : 0.05
                                        // Ensure price is a number
                                        const safePrice = Number(t.price) || 0;
                                        const total = Math.round(safePrice * (1 + commission))

                                        const matchTime = new Date(displayMatch.isoDate).getTime();
                                        const isExpired = matchTime < new Date().getTime()
                                        const isLocked = matchTime - new Date().getTime() < 24 * 60 * 60 * 1000

                                        return (
                                            <motion.div
                                                key={t.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-morocco-gold/30 transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${t.type === 'VIP' ? 'bg-morocco-gold text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                                                        {t.type} PASS
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[9px] font-black uppercase text-morocco-gold mb-1">Total Price</div>
                                                        <div className="text-2xl font-black text-white">{total}<span className="text-sm ml-1 opacity-60">MAD</span></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="flex -space-x-2">
                                                        <img src={displayMatch.homeFlag} className="w-8 h-8 rounded-full border-2 border-[#1a0202] z-10" />
                                                        <img src={displayMatch.awayFlag} className="w-8 h-8 rounded-full border-2 border-[#1a0202]" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-bold text-zinc-500 uppercase">{displayMatch.round}</div>
                                                        <div className="font-black text-sm">{displayMatch.home} vs {displayMatch.away}</div>
                                                    </div>
                                                </div>

                                                <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between mb-6">
                                                    <div className="text-[9px] font-bold text-zinc-500 uppercase">Starts In</div>
                                                    <CountdownTimer targetDate={displayMatch.isoDate} className="text-sm font-black text-white tabular-nums" />
                                                </div>

                                                <button
                                                    disabled={isExpired || isLocked}
                                                    onClick={() => onBuy(t)}
                                                    className="w-full py-3 bg-morocco-gold hover:bg-[#cba000] disabled:opacity-30 disabled:hover:bg-morocco-gold text-black font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-glow-gold transition-all active:scale-95"
                                                >
                                                    {isLocked ? 'EXCHANGE LOCKED' : 'BUY TICKET'}
                                                </button>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        // SELL TAB
                        <div className="h-full">
                            {!currentUser ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <AlertCircle className="text-morocco-gold mb-4" size={48} />
                                    <p className="text-white font-bold mb-4">You must be identified to sell tickets.</p>
                                </div>
                            ) : userTickets.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <Ticket size={48} className="text-zinc-600 mb-4" />
                                    <h3 className="text-xl font-bold mb-2 uppercase tracking-widest">No Tickets Owned</h3>
                                    <p className="text-sm max-w-xs">You have no tickets in your Royal Wallet to sell.</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userTickets.map((t) => {
                                        // Robust Match Lookup
                                        let match = matches.find(m => m.id === t.matchId || (m.home === t.home && m.away === t.away));

                                        // Safe Data Merge
                                        const rawData = match || t || {};
                                        const displayMatch = {
                                            ...rawData, // Spread first
                                            home: rawData.home || 'Unknown Team',
                                            away: rawData.away || 'Unknown Team',
                                            isoDate: rawData.isoDate || new Date().toISOString(),
                                            homeFlag: rawData.homeFlag || '',
                                            awayFlag: rawData.awayFlag || '',
                                            round: rawData.round || ''
                                        };

                                        const matchTime = new Date(displayMatch.isoDate).getTime()
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
                                                        <img src={displayMatch.homeFlag} className="w-8 h-8 rounded-full border-2 border-[#1a0202] z-10 bg-zinc-800" />
                                                        <img src={displayMatch.awayFlag} className="w-8 h-8 rounded-full border-2 border-[#1a0202] bg-zinc-800" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-bold text-zinc-500 uppercase">{displayMatch.round}</div>
                                                        <div className="font-black text-sm">{displayMatch.home} vs {displayMatch.away}</div>
                                                    </div>
                                                </div>

                                                <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between mb-6">
                                                    <div className="text-[9px] font-bold text-zinc-500 uppercase">Starts In</div>
                                                    <CountdownTimer targetDate={displayMatch.isoDate} className="text-sm font-black text-white tabular-nums" />
                                                </div>

                                                <div className="mt-auto">
                                                    <button
                                                        disabled={isLocked}
                                                        onClick={() => onSellClick(t)}
                                                        className="w-full py-3 bg-morocco-red hover:bg-[#a01d22] disabled:opacity-30 disabled:hover:bg-morocco-red text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-glow-red transition-all active:scale-95"
                                                    >
                                                        {isLocked ? 'LOCKED (24H RULE)' : 'LIST FOR SALE'}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Active Listings Section */}
                            {currentUser && (
                                <div className="mt-12 border-t border-white/10 pt-8">
                                    <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                                        <TrendingUp className="text-morocco-gold" size={20} />
                                        My Active Listings
                                    </h3>

                                    {tickets.filter(t => t.sellerId === currentUser.phone).length === 0 ? (
                                        <div className="text-center py-8 opacity-40">
                                            <p className="text-sm">You have no tickets currently listed for sale.</p>
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {tickets.filter(t => t.sellerId === currentUser.phone).map((t, i) => {
                                                // Robust Match Lookup
                                                let match = matches.find(m => m.id === t.matchId);
                                                if (!match && t.ticketData) {
                                                    match = matches.find(m => m.home === t.ticketData.home && m.away === t.ticketData.away);
                                                }
                                                // Safe Data Merge: Ensure we have defaults for missing properties
                                                const rawData = match || t.ticketData || {};
                                                const defaultDate = new Date().toISOString();
                                                const displayMatch = {
                                                    ...rawData, // Spread first
                                                    home: rawData.home || 'Unknown Team',
                                                    away: rawData.away || 'Unknown Team',
                                                    isoDate: rawData.isoDate || defaultDate,
                                                    date: rawData.date || null
                                                };

                                                // Double check date validity
                                                if (isNaN(new Date(displayMatch.isoDate).getTime())) {
                                                    displayMatch.isoDate = defaultDate;
                                                }

                                                // Simulate only the first listed ticket being "Sold/Claimable" for demo
                                                const isClaimable = i === 0

                                                return (
                                                    <div key={t.id} className={`border rounded-2xl p-4 relative transition-all ${isClaimable ? 'bg-morocco-red/10 border-morocco-red/50 shadow-glow-red' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                                        <div className="absolute top-4 right-4 flex items-center gap-2">
                                                            <div className={`text-[9px] font-black px-2 py-1 rounded ${isClaimable ? 'bg-morocco-red text-white animate-pulse' : 'bg-zinc-800 text-zinc-400'}`}>
                                                                {isClaimable ? 'FUNDS READY' : 'LISTED'}
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 pr-16">
                                                            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{displayMatch.date || new Date(displayMatch.isoDate).toLocaleDateString()}</p>
                                                            <h4 className="font-bold text-white mb-2">{displayMatch.home} vs {displayMatch.away}</h4>
                                                            <div className="text-xs font-black text-morocco-gold">{t.price} MAD</div>
                                                        </div>

                                                        <button
                                                            className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isClaimable ? 'bg-morocco-red text-white hover:scale-105 shadow-lg' : 'bg-white/5 text-zinc-500 cursor-not-allowed'}`}
                                                            disabled={!isClaimable}
                                                        >
                                                            {isClaimable ? (
                                                                <>
                                                                    <BellRing size={14} className="animate-bounce" /> Claim Funds
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="w-2 h-2 rounded-full bg-morocco-red/30" /> Awaiting Buyer
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default P2PMarketModal;
