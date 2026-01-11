import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Calendar, Clock, MapPin, ChevronRight, Info, Camera, Scan, CheckCircle, Ticket, X, History, Map, AlertCircle, Loader2, ShoppingCart, TrendingUp, Share2, Shirt, Upload, BellRing } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react';
// Dynamic import for face-api from CDN to ensure speed and bypass environment limitations
const FACE_API_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/dist/face-api.esm.js';
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';

// --- Ticket System Components ---

const RoyalNotification = ({ msg, index, onClose }) => (
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
)

const CountdownTimer = ({ targetDate, className = "" }) => {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, expired: false })

    useEffect(() => {
        const calculate = () => {
            const now = new Date().getTime()
            const target = new Date(targetDate).getTime()
            const diff = target - now

            if (diff <= 0) {
                setTimeLeft({ h: 0, m: 0, s: 0, expired: true })
                return
            }

            const h = Math.floor(diff / (1000 * 60 * 60))
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const s = Math.floor((diff % (1000 * 60)) / 1000)
            setTimeLeft({ h, m, s, expired: false })
        }

        const timer = setInterval(calculate, 1000)
        calculate()
        return () => clearInterval(timer)
    }, [targetDate])

    if (timeLeft.expired) return <span className="text-morocco-red font-black">EXPIRED</span>

    return (
        <span className={className}>
            {String(timeLeft.h).padStart(2, '0')}h {String(timeLeft.m).padStart(2, '0')}m {String(timeLeft.s).padStart(2, '0')}s
        </span>
    )
}

const JerseyAiModal = ({ onClose }) => {
    const [step, setStep] = useState('input') // input, generating, result
    const [selectedTeam, setSelectedTeam] = useState('Morocco')

    const handleGenerate = () => {
        setStep('generating')
        setTimeout(() => {
            setStep('result')
        }, 3000)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[190] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-full max-w-xl bg-[#1a0000] border border-morocco-gold/30 rounded-t-[2rem] md:rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden shadow-glow-gold"
            >
                <button onClick={onClose} className="absolute top-6 right-6 z-50 text-white/50 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md">
                    <X size={20} />
                </button>

                <div className="text-center mb-6 md:mb-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-morocco-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
                        <Shirt className="text-black" size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">Jersey AI</h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Wear the Colors of Glory</p>
                </div>

                {step === 'input' && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-morocco-gold ml-2 block">Select National Team</label>
                            <select
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-morocco-gold transition-colors"
                            >
                                <option value="Morocco">Morocco</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Ivory Coast">Ivory Coast</option>
                            </select>
                        </div>

                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-morocco-gold/30 transition-colors cursor-pointer bg-white/5">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                <Upload className="text-zinc-400" size={24} />
                            </div>
                            <p className="text-sm font-bold text-zinc-400 text-center">Upload your photo here <br /><span className="text-[10px] font-normal opacity-60">or drag and drop</span></p>
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full bg-morocco-gold hover:bg-[#cba000] text-black font-black py-4 rounded-xl shadow-glow-gold transition-all transform active:scale-95 uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                        >
                            <Scan size={16} /> Generate Jersey Look
                        </button>
                    </div>
                )}

                {step === 'generating' && (
                    <div className="py-12 text-center">
                        <Loader2 className="w-16 h-16 text-morocco-gold animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-black text-white uppercase tracking-widest animate-pulse">Weaving Digital Fabric...</h3>
                        <p className="text-zinc-500 text-xs mt-2 font-bold">Fitting {selectedTeam} Kit...</p>
                    </div>
                )}

                {step === 'result' && (
                    <div className="space-y-6">
                        <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-900 relative shadow-2xl border border-white/10">
                            <img
                                src="/jersey-ai-result.png"
                                alt="Generated Jersey Look"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <p className="text-white font-black uppercase text-xl">{selectedTeam} Official Kit</p>
                                <p className="text-morocco-gold text-[10px] font-bold uppercase tracking-widest">CAN 2025 Edition</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 bg-white text-black font-black py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors">
                                Download
                            </button>
                            <button
                                onClick={() => setStep('input')}
                                className="flex-1 bg-white/5 border border-white/10 text-white font-black py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
                            >
                                Try Another
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

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

const RealQRCode = ({ value, size = 120 }) => {
    return (
        <div className="bg-white p-3 rounded-xl shadow-lg inline-block">
            <QRCodeSVG
                value={value}
                size={size}
                fgColor="#000000"
                imageSettings={{
                    src: "https://flagcdn.com/ma.svg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                }}
            />
        </div>
    )
}

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
                    <X size={24} />
                </button>

                <div className="p-6 md:p-12 md:pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-morocco-gold to-[#4a3500] rounded-2xl flex items-center justify-center shadow-glow-gold">
                            <ShoppingCart className="text-black" size={32} />
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
                                    {userTickets.map((t, idx) => {
                                        // Safety: ensure ticket has required properties
                                        if (!t) return null;

                                        // Robust Match Lookup
                                        let match = matches.find(m => m.id === (t.matchId || t.id) || (m.home === t.home && m.away === t.away));

                                        // Safe Data Merge
                                        const rawData = match || t || {};
                                        const displayMatch = {
                                            ...rawData, // Spread first
                                            home: rawData.home || t.home || 'Unknown Team',
                                            away: rawData.away || t.away || 'Unknown Team',
                                            isoDate: rawData.isoDate || t.isoDate || new Date().toISOString(),
                                            homeFlag: rawData.homeFlag || t.homeFlag || '',
                                            awayFlag: rawData.awayFlag || t.awayFlag || '',
                                            round: rawData.round || t.round || 'Match'
                                        };

                                        const matchTime = new Date(displayMatch.isoDate).getTime()
                                        const isLocked = matchTime - new Date().getTime() < 24 * 60 * 60 * 1000
                                        const originalPrice = t.price || 250
                                        const passType = t.type || 'Normal'

                                        return (
                                            <motion.div
                                                key={t.ticketId || t.id || `ticket-${idx}`}
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
                                                        <img src={displayMatch.homeFlag || ''} alt="" className="w-8 h-8 rounded-full border-2 border-[#1a0202] z-10 bg-zinc-800" />
                                                        <img src={displayMatch.awayFlag || ''} alt="" className="w-8 h-8 rounded-full border-2 border-[#1a0202] bg-zinc-800" />
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

const SellTicketModal = ({ ticket, onClose, onList }) => {
    const [price, setPrice] = useState(250)
    const originalPrice = ticket.price || 250
    const markup = price / originalPrice

    // Royal Tiering Logic:
    // > 1.05 markup = VIP (10% commission)
    // <= 1.05 markup = Normal (5% commission)
    const isVIP = markup > 1.05
    const commission = isVIP ? 0.10 : 0.05
    const total = Math.round(price * (1 + commission))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[210] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-md bg-[#1a0000] border border-morocco-gold/30 rounded-[2.5rem] p-8 relative overflow-hidden shadow-glow-gold"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
                    <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-morocco-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
                        <TrendingUp className="text-black" size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">List Ticket</h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">Kingdom Market Listing</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-morocco-red rounded-lg flex items-center justify-center text-white font-black">
                            <Ticket size={24} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold uppercase text-morocco-gold">{ticket.round}</p>
                            <p className="font-bold text-sm">{ticket.home} vs {ticket.away}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase text-morocco-gold ml-2 mb-2 block">Set Your Price (MAD)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xl font-black text-center focus:border-morocco-gold outline-none transition-colors"
                        />
                    </div>

                    <div className="bg-black/60 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-zinc-500">Subject Price</span>
                            <span>{price} MAD</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-zinc-500">Royal Commission ({commission * 100}%)</span>
                            <span className="text-morocco-gold">+{Math.round(price * commission)} MAD</span>
                        </div>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex justify-between text-lg font-black uppercase">
                            <span>Buyer Pays</span>
                            <span className="text-white">{total} MAD</span>
                        </div>
                    </div>

                    <button
                        onClick={() => onList(price, isVIP ? 'VIP' : 'Normal')}
                        className="w-full bg-morocco-gold hover:bg-[#cba000] text-black font-black py-4 rounded-xl shadow-glow-gold transition-all transform active:scale-95 uppercase text-xs tracking-[0.2em]"
                    >
                        Place in Blind Market
                    </button>

                    <p className="text-[9px] text-center text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                        By listing, you agree to the Kingdom's 24h safety cutoff rule. <br />
                        Listing is irreversible once a match is found.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

const TicketDetailModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-lg bg-[#1a0000] border border-morocco-gold/30 rounded-[2.5rem] overflow-hidden shadow-glow-gold relative"
            >
                <button onClick={onClose} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md">
                    <X size={20} />
                </button>

                {/* Ticket Header Graphic */}
                <div className="h-40 bg-gradient-to-br from-morocco-red to-[#4a0000] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -right-20 -top-20 w-64 h-64 bg-morocco-gold/10 rounded-full blur-3xl"
                    />
                    <div className="text-center relative z-10">
                        <Trophy className="text-morocco-gold mx-auto mb-2" size={48} />
                        <h2 className="text-2xl font-black tracking-tighter">OFFICIAL MATCH PASS</h2>
                        <p className="text-morocco-gold/80 text-[10px] uppercase font-bold tracking-[0.4em]">Morocco 2025</p>
                    </div>
                </div>

                <div className="p-8 -mt-6 bg-[#1a0000] rounded-t-3xl relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <img src={ticket.homeFlag} className="w-12 h-12 rounded-full border-2 border-morocco-gold/20" alt={ticket.home} />
                            <span className="font-black text-xl italic uppercase">VS</span>
                            <img src={ticket.awayFlag} className="w-12 h-12 rounded-full border-2 border-white/10" alt={ticket.away} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Match ID</p>
                            <p className="text-morocco-gold font-black">{ticket.ticketId.split('-')[1] || '001'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-1">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase flex items-center gap-1">
                                <Map size={10} className="text-morocco-red" /> Stadium
                            </p>
                            <p className="font-bold text-sm text-white">{ticket.stadium}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase flex items-center gap-1">
                                <Calendar size={10} className="text-morocco-red" /> Date & Time
                            </p>
                            <p className="font-bold text-sm text-white">{ticket.date} • {ticket.time}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Gate / Section</p>
                            <p className="font-bold text-sm text-white">GATE 4A • VIP 12</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Seat Number</p>
                            <p className="font-bold text-sm text-morocco-gold text-lg">ROYAL-VIP-042</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                        <div className="relative z-10 flex flex-col items-center">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Digital Access Code</p>
                            <RealQRCode value={`TICKET-VERIFY-${ticket.ticketId}`} size={160} />
                            <p className="mt-4 text-[10px] font-mono text-zinc-400 bg-black/40 px-4 py-1 rounded-full">{ticket.ticketId}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                        <button
                            onClick={onClose}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-morocco-gold transition-colors shadow-lg"
                        >
                            RETURN TO KINGDOM
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

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

const TicketModal = ({ match, onClose, onPurchase, existingTickets, faceapi, isModelsLoaded, currentUser }) => {
    const [step, setStep] = useState(isModelsLoaded ? 'camera' : 'loading') // loading, camera, success
    const [isFaceDetected, setIsFaceDetected] = useState(false)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const [detectionMessage, setDetectionMessage] = useState("Initializing Royal FaceID...")
    const videoRef = useRef(null)
    const [stream, setStream] = useState(null)
    const [currentDescriptor, setCurrentDescriptor] = useState(null)
    const detectionInterval = useRef(null)

    useEffect(() => {
        if (isModelsLoaded && step === 'loading') {
            setStep('camera');
        }
    }, [isModelsLoaded, step]);

    useEffect(() => {
        if (step === 'camera') {
            startCamera();
        }
        return () => {
            stopCamera();
            if (detectionInterval.current) clearInterval(detectionInterval.current);
        };
    }, [step]);

    const startCamera = async () => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: "user"
                }
            });
            setStream(s);
            if (videoRef.current) {
                videoRef.current.srcObject = s;
            }
        } catch (err) {
            console.error("Camera access error:", err);
            alert("Royal Camera access denied. Ticket verification impossible.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const onVideoPlay = () => {
        if (detectionInterval.current) clearInterval(detectionInterval.current);

        detectionInterval.current = setInterval(async () => {
            if (videoRef.current && faceapi && !videoRef.current.paused && !videoRef.current.ended) {
                try {
                    const result = await faceapi.detectSingleFace(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.5 })
                    ).withFaceLandmarks().withFaceDescriptor();

                    if (result) {
                        const descriptor = result.descriptor;
                        setCurrentDescriptor(descriptor);
                        setIsFaceDetected(true);

                        // Check for duplicates (One ticket per face PER MATCH)
                        const threshold = 0.55;
                        let duplicateFound = false;

                        if (existingTickets && existingTickets.length > 0) {
                            for (const ticket of existingTickets) {
                                // Only block if it's the SAME match AND a matching face
                                if (ticket.id === match.id && ticket.faceDescriptor) {
                                    const storedDescriptor = new Float32Array(ticket.faceDescriptor);
                                    const distance = faceapi.euclideanDistance(descriptor, storedDescriptor);
                                    if (distance < threshold) {
                                        duplicateFound = true;
                                        break;
                                    }
                                }
                            }
                        }

                        setIsDuplicate(duplicateFound);
                        if (duplicateFound) {
                            setDetectionMessage("DUPLICATE SUBJECT DETECTED");
                        } else {
                            setDetectionMessage("ROYAL SUBJECT IDENTIFIED");
                        }
                    } else {
                        setIsFaceDetected(false);
                        setIsDuplicate(false);
                        setCurrentDescriptor(null);
                        setDetectionMessage("STAY WITHIN THE CIRCLE");
                    }
                } catch (err) {
                    console.error("Detection error:", err);
                }
            }
        }, 400);
    };

    const handleScan = () => {
        if (!isFaceDetected || isDuplicate) return;
        setStep('success');
        stopCamera();
    };

    const handleFinalize = () => {
        const ticketId = 'CAN-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        onPurchase({
            ...match,
            ticketId,
            purchaseDate: new Date().toLocaleDateString(),
            faceDescriptor: Array.from(currentDescriptor),
            userId: currentUser.phone // Link ticket to user
        })
        onClose()
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-[#0f0202]/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
            <div className="w-full max-w-md bg-[#1a0000] border border-morocco-gold/30 rounded-[2rem] p-8 relative overflow-hidden shadow-glow-gold">
                <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white z-50">
                    <X size={24} />
                </button>

                {step === 'loading' && (
                    <div className="text-center py-12">
                        <Loader2 className="w-16 h-16 text-morocco-gold animate-spin mx-auto mb-8 shadow-glow-gold" />
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">ROYAL AUTHENTICATOR</h3>
                        <p className="text-morocco-gold font-bold animate-pulse uppercase text-[10px] tracking-[0.2em]">{detectionMessage}</p>
                    </div>
                )}

                {step === 'camera' && (
                    <div className="text-center">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tighter uppercase">Royal FaceID</h3>
                        <p className="text-zinc-500 text-[8px] md:text-[10px] mb-6 md:mb-8 uppercase tracking-[0.3em] font-bold">Secure Kingdom Verification</p>

                        <div className="relative w-full aspect-square max-w-[280px] md:max-w-[320px] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-2 border-morocco-gold/30 shadow-glow-gold mb-6 md:mb-8 bg-zinc-900 group">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                onPlay={onVideoPlay}
                                className="w-full h-full object-cover scale-x-[-1]"
                            />

                            {/* Face Frame UI */}
                            <div className={`absolute inset-0 border-[2px] transition-colors duration-500 ${isDuplicate ? 'border-morocco-red shadow-[inset_0_0_50px_rgba(244,63,94,0.4)]' :
                                isFaceDetected ? 'border-green-500/50 shadow-[inset_0_0_50px_rgba(34,197,94,0.3)]' :
                                    'border-morocco-red/20'
                                }`} />

                            <AnimatePresence>
                                {isFaceDetected && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    >
                                        <div className={`w-[80%] h-[80%] border-2 border-dashed rounded-full animate-pulse ${isDuplicate ? 'border-morocco-red' : 'border-green-500'}`} />
                                        <div className={`absolute top-4 left-4 text-black text-[8px] font-black px-2 py-0.5 rounded uppercase ${isDuplicate ? 'bg-morocco-red' : 'bg-green-500'}`}>
                                            {isDuplicate ? 'DUPLICATE DETECTED' : 'FACE DETECTED'}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-morocco-gold to-transparent shadow-[0_0_15px_#FFD700] z-10"
                            />
                        </div>

                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 transition-colors duration-300 ${isDuplicate ? 'text-morocco-red' :
                            isFaceDetected ? 'text-green-500' :
                                'text-zinc-600'
                            }`}>
                            {detectionMessage}
                        </p>

                        {isDuplicate && (
                            <div className="mb-6 p-4 bg-morocco-red/10 border border-morocco-red/30 rounded-xl flex items-center gap-3 text-left">
                                <AlertCircle className="text-morocco-red flex-shrink-0" size={16} />
                                <p className="text-[10px] text-morocco-red font-bold uppercase tracking-wider leading-tight">
                                    This identity is already registered for a ticket. One ticket per subject.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleScan}
                            disabled={!isFaceDetected || isDuplicate}
                            className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 ${isFaceDetected && !isDuplicate
                                ? 'bg-morocco-red text-white shadow-glow-red hover:bg-[#a01d22]'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                                }`}
                        >
                            {isDuplicate ? <><History size={20} /> IDENTITY USED</> :
                                isFaceDetected ? <><Camera size={20} /> GENERATE ROYAL TICKET</> :
                                    <><AlertCircle size={20} /> LOOK AT THE CAMERA</>}
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                        >
                            <CheckCircle size={40} />
                        </motion.div>
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">VERIFIED</h3>
                        <p className="text-zinc-500 text-sm mb-8">Access granted to the stadium</p>

                        <div className="bg-gradient-to-br from-white to-zinc-200 text-black rounded-2xl p-6 mb-8 text-left shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-morocco-red/10 rotate-45 translate-x-12 -translate-y-12" />
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-morocco-red tracking-widest">Official Pass</p>
                                    <h4 className="font-black text-lg">{match.home} vs {match.away}</h4>
                                </div>
                                <Trophy size={20} className="text-morocco-red" />
                            </div>

                            <div className="flex items-center justify-between border-t border-zinc-300 pt-4">
                                <RealQRCode value="FINAL-TICKET-SECURE" size={60} />
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-zinc-500 uppercase">Verification</p>
                                    <p className="text-xs font-black text-green-600">ENCRYPTED</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleFinalize}
                            className="w-full bg-black text-white font-black py-4 rounded-2xl transition-all hover:bg-zinc-900 shadow-xl"
                        >
                            ADD TO ROYAL WALLET
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

const FullFixturesModal = ({ recent, upcoming, onClose, onBuyTicket }) => {
    const [filter, setFilter] = useState('upcoming') // upcoming, recent

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-5xl h-[95vh] md:h-[90vh] bg-[#1a0000] border border-morocco-gold/30 rounded-t-[2.5rem] md:rounded-[2.5rem] flex flex-col overflow-hidden shadow-glow-gold relative"
            >
                <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 z-50 text-zinc-500 hover:text-white bg-black/40 p-2 rounded-full backdrop-blur-md">
                    <X size={24} />
                </button>

                <div className="p-6 md:p-10 md:pb-6 border-b border-morocco-gold/10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-2">Tournament <span className="text-morocco-gold">Fixtures</span></h2>
                            <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Official Schedule</p>
                        </div>
                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                            <button
                                onClick={() => setFilter('upcoming')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'upcoming' ? 'bg-morocco-gold text-black' : 'text-zinc-400 hover:text-white'}`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setFilter('recent')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'recent' ? 'bg-morocco-red text-white' : 'text-zinc-400 hover:text-white'}`}
                            >
                                Results
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-6 scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(filter === 'upcoming' ? upcoming : recent).map(match => (
                            <MatchCard
                                key={match.id}
                                match={match}
                                upcoming={filter === 'upcoming'}
                                onBuyTicket={(m) => {
                                    onBuyTicket(m);
                                    onClose();
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-black/40 border-t border-morocco-gold/10 text-center">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">All times shown in local Morocco time (GMT+1)</p>
                </div>
            </motion.div>
        </motion.div>
    )
}

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
)

// --- Main App Components ---

const MatchCard = ({ match, upcoming = false, onBuyTicket }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a0505] to-[#1a0000] p-6 border border-morocco-red/30 hover:border-morocco-gold/50 transition-all duration-300 shadow-glow-red hover:shadow-glow-gold"
        >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-morocco-gold/5 rounded-full blur-3xl group-hover:bg-morocco-gold/10 transition-colors" />

            {upcoming && (
                <div className="absolute top-4 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10">
                    <Clock size={10} className="text-morocco-gold animate-pulse" />
                    <CountdownTimer targetDate={match.isoDate} className="text-[9px] font-black text-white/80 tabular-nums" />
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-morocco-gold/80 flex items-center gap-1">
                    <MapPin size={12} /> {match.stadium}
                </span>
                <span className="text-[10px] bg-morocco-red/20 text-morocco-red px-2 py-0.5 rounded border border-morocco-red/30 font-bold uppercase">
                    {match.round}
                </span>
            </div>

            <div className="flex justify-between items-center gap-2 md:gap-4">
                <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#3d0808] border border-morocco-red/20 flex items-center justify-center mb-2 group-hover:border-morocco-gold/40 transition-colors">
                        <img src={match.homeFlag} alt={match.home} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    </div>
                    <span className="font-bold text-[11px] md:text-sm tracking-wide text-center">{match.home}</span>
                </div>

                <div className="flex flex-col items-center">
                    {upcoming ? (
                        <div className="flex flex-col items-center">
                            <span className="text-morocco-gold font-black text-lg md:text-xl leading-none">{match.time}</span>
                            <span className="text-[8px] md:text-[10px] text-zinc-500 uppercase mt-1">{match.date}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-2xl md:text-3xl font-black text-white group-hover:text-morocco-gold transition-colors">{match.homeScore}</span>
                            <span className="text-morocco-red font-bold text-lg md:text-xl">:</span>
                            <span className="text-2xl md:text-3xl font-black text-white group-hover:text-morocco-gold transition-colors">{match.awayScore}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#3d0808] border border-morocco-red/20 flex items-center justify-center mb-2 group-hover:border-morocco-gold/40 transition-colors">
                        <img src={match.awayFlag} alt={match.away} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    </div>
                    <span className="font-bold text-[11px] md:text-sm tracking-wide text-center">{match.away}</span>
                </div>
            </div>

            {upcoming ? (
                <div className="mt-6">
                    <button
                        onClick={() => onBuyTicket(match)}
                        className="w-full bg-morocco-gold hover:bg-yellow-500 text-black font-black py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        <Camera size={14} /> Buy Ticket
                    </button>
                </div>
            ) : (
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium italic">Full Time</span>
                </div>
            )}
        </motion.div>
    )
}

const MobileNav = ({ onFixturesClick, onMarketClick, onFanZoneClick, onJerseyAiClick, onOpenHistory, ticketCount }) => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0f0202]/90 backdrop-blur-lg border-t border-morocco-gold/10 px-4 py-3 pb-8">
        <div className="flex justify-between items-center max-w-lg mx-auto">
            <button onClick={onFixturesClick} className="flex flex-col items-center gap-1 text-zinc-400">
                <Calendar size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Fixtures</span>
            </button>
            <button onClick={onMarketClick} className="flex flex-col items-center gap-1 text-morocco-gold">
                <ShoppingCart size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Market</span>
            </button>
            <button onClick={onFanZoneClick} className="flex flex-col items-center gap-1 text-morocco-red">
                <Camera size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Fan Zone</span>
            </button>
            <button onClick={onJerseyAiClick} className="flex flex-col items-center gap-1 text-white">
                <Shirt size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">AI Kit</span>
            </button>
            <button onClick={onOpenHistory} className="flex flex-col items-center gap-1 text-zinc-400 relative">
                <Ticket size={20} />
                {ticketCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-morocco-red text-[7px] flex items-center justify-center rounded-full text-white font-black">
                        {ticketCount}
                    </span>
                )}
                <span className="text-[8px] font-bold uppercase tracking-widest">Tickets</span>
            </button>
        </div>
    </div>
)

const Header = ({ onOpenHistory, ticketCount, currentUser, onAuthClick, onProfileClick, onFixturesClick, onMarketClick, onFanZoneClick, onJerseyAiClick }) => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0202]/80 backdrop-blur-md border-b border-morocco-gold/10 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-zinc-400">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-morocco-red to-[#800000] rounded-lg flex items-center justify-center shadow-glow-red">
                    <Trophy className="text-morocco-gold" size={18} />
                </div>
                <div>
                    <h1 className="text-sm md:text-xl font-black tracking-tighter flex items-center gap-1 md:gap-2">
                        CAN <span className="text-morocco-gold font-bold">2025</span>
                    </h1>
                </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                <a href="#" className="text-morocco-gold border-b border-morocco-gold pb-1 transition-all">Home</a>
                <button onClick={onFixturesClick} className="hover:text-white transition-colors">Fixtures</button>
                <button
                    onClick={onMarketClick}
                    className="flex items-center gap-2 text-morocco-gold bg-morocco-gold/5 px-4 py-2 rounded-full border border-morocco-gold/20 hover:bg-morocco-gold/10 transition-all font-black"
                >
                    <ShoppingCart size={14} />
                    P2P Market
                </button>
                <button
                    onClick={onFanZoneClick}
                    className="flex items-center gap-2 text-morocco-red bg-morocco-red/5 px-4 py-2 rounded-full border border-morocco-red/20 hover:bg-morocco-red/10 transition-all font-black"
                >
                    <Camera size={14} />
                    Fan Zone
                </button>
                <button
                    onClick={onJerseyAiClick}
                    className="flex items-center gap-2 text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all font-black"
                >
                    <Shirt size={14} />
                    Jersey AI
                </button>
                {currentUser && (
                    <div
                        onClick={onOpenHistory}
                        className="relative cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                    >
                        My Tickets
                        {ticketCount > 0 && (
                            <span className="absolute -top-2 -right-4 w-4 h-4 bg-morocco-red text-[8px] flex items-center justify-center rounded-full text-white font-black animate-pulse">
                                {ticketCount}
                            </span>
                        )}
                    </div>
                )}
            </nav>

            <div className="flex items-center gap-3">
                {currentUser ? (
                    <button
                        onClick={onProfileClick}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-morocco-gold rounded-full flex items-center justify-center text-black">
                            {currentUser.fullName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="hidden sm:inline">{currentUser.fullName?.split(' ')[0] || 'User'}</span>
                    </button>
                ) : (
                    <button
                        onClick={onAuthClick}
                        className="bg-morocco-gold text-black px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-glow-gold hover:bg-yellow-500 transition-all"
                    >
                        Access
                    </button>
                )}
            </div>
        </div>
    </header>
)

const App = () => {
    const recentMatches = [
        { id: 1, home: "Morocco", away: "Senegal", homeScore: 2, awayScore: 1, stadium: "Stade Adrar, Agadir", round: "Semi-Final", homeFlag: "https://flagcdn.com/ma.svg", awayFlag: "https://flagcdn.com/sn.svg", isoDate: "2026-02-10T18:00:00", price: 250 },
        { id: 2, home: "Egypt", away: "Nigeria", homeScore: 0, awayScore: 1, stadium: "Complex Moulay Abdellah", round: "Quarter-Final", homeFlag: "https://flagcdn.com/eg.svg", awayFlag: "https://flagcdn.com/ng.svg", isoDate: "2026-02-09T20:00:00", price: 200 },
        { id: 5, home: "Algeria", away: "Cameroon", homeScore: 1, awayScore: 1, stadium: "Stade de Tanger", round: "Quarter-Final", homeFlag: "https://flagcdn.com/dz.svg", awayFlag: "https://flagcdn.com/cm.svg", isoDate: "2026-02-08T17:00:00", price: 200 },
        { id: 6, home: "Tunisia", away: "Ghana", homeScore: 3, awayScore: 2, stadium: "Stade de Marrakech", round: "Last 16", homeFlag: "https://flagcdn.com/tn.svg", awayFlag: "https://flagcdn.com/gh.svg", isoDate: "2026-02-05T19:00:00", price: 150 },
        { id: 7, home: "Mali", away: "Ivory Coast", homeScore: 0, awayScore: 2, stadium: "Stade d'Agadir", round: "Last 16", homeFlag: "https://flagcdn.com/ml.svg", awayFlag: "https://flagcdn.com/ci.svg", isoDate: "2026-02-04T18:00:00", price: 150 },
        { id: 8, home: "DR Congo", away: "Guinea", homeScore: 1, awayScore: 0, stadium: "Stade Moulay Hassan", round: "Group Stage", homeFlag: "https://flagcdn.com/cd.svg", awayFlag: "https://flagcdn.com/gn.svg", isoDate: "2026-02-01T20:00:00", price: 100 },
        { id: 9, home: "Burkina Faso", away: "Angola", homeScore: 2, awayScore: 2, stadium: "Stade Berrechid", round: "Group Stage", homeFlag: "https://flagcdn.com/bf.svg", awayFlag: "https://flagcdn.com/ao.svg", isoDate: "2026-01-30T17:00:00", price: 100 },
        { id: 10, home: "Zambia", away: "South Africa", homeScore: 1, awayScore: 3, stadium: "Stade El Abdi", round: "Group Stage", homeFlag: "https://flagcdn.com/zm.svg", awayFlag: "https://flagcdn.com/za.svg", isoDate: "2026-01-28T19:00:00", price: 100 }
    ]

    const upcomingMatches = [
        { id: 3, home: "Morocco", away: "Nigeria", date: "Wednesday, Jan 14", time: "07:30", stadium: "Stade de Marrakech", round: "The Final", homeFlag: "https://flagcdn.com/ma.svg", awayFlag: "https://flagcdn.com/ng.svg", isoDate: "2026-01-14T07:30:00", price: 500 },
        { id: 4, home: "Ivory Coast", away: "Cameroon", date: "Saturday, Feb 14", time: "18:00", stadium: "Grand Stade de Tanger", round: "3rd Place", homeFlag: "https://flagcdn.com/ci.svg", awayFlag: "https://flagcdn.com/cm.svg", isoDate: "2026-02-14T18:00:00", price: 300 },
        { id: 11, home: "Egypt", away: "Senegal", date: "Friday, Feb 13", time: "16:00", stadium: "Stade d'Agadir", round: "Play-off", homeFlag: "https://flagcdn.com/eg.svg", awayFlag: "https://flagcdn.com/sn.svg", isoDate: "2026-02-13T16:00:00", price: 250 },
        { id: 12, home: "Ghana", away: "Algeria", date: "Monday, Feb 16", time: "21:00", stadium: "Stade Moulay Abdellah", round: "Final B", homeFlag: "https://flagcdn.com/gh.svg", awayFlag: "https://flagcdn.com/dz.svg", isoDate: "2026-02-16T21:00:00", price: 200 },
        { id: 13, home: "South Africa", away: "Mali", date: "Tuesday, Feb 17", time: "19:00", stadium: "Complex Sportif Fes", round: "Exhibition", homeFlag: "https://flagcdn.com/za.svg", awayFlag: "https://flagcdn.com/ml.svg", isoDate: "2026-02-17T19:00:00", price: 150 },
        { id: 14, home: "Nigeria", away: "Tunisia", date: "Wednesday, Feb 18", time: "20:30", stadium: "Stade Larbi Zaouli", round: "Pre-Season", homeFlag: "https://flagcdn.com/ng.svg", awayFlag: "https://flagcdn.com/tn.svg", isoDate: "2026-02-18T20:30:00", price: 100 },
        { id: 15, home: "Guinea", away: "Angola", date: "Thursday, Feb 19", time: "17:00", stadium: "Stade Oujda", round: "Friendly", homeFlag: "https://flagcdn.com/gn.svg", awayFlag: "https://flagcdn.com/ao.svg", isoDate: "2026-02-19T17:00:00", price: 100 },
        { id: 16, home: "Cameroon", away: "Zambia", date: "Friday, Feb 20", time: "15:00", stadium: "Stade El Bachir", round: "Friendly", homeFlag: "https://flagcdn.com/cm.svg", awayFlag: "https://flagcdn.com/zm.svg", isoDate: "2026-02-20T15:00:00", price: 100 }
    ]

    const [selectedMatch, setSelectedMatch] = useState(null)
    const [viewTicket, setViewTicket] = useState(null)
    const [historyOpen, setHistoryOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)
    const [fixturesOpen, setFixturesOpen] = useState(false)
    const [marketOpen, setMarketOpen] = useState(false)
    const [fanZoneOpen, setFanZoneOpen] = useState(false)
    const [jerseyAiOpen, setJerseyAiOpen] = useState(false)
    const [sellingTicket, setSellingTicket] = useState(null)
    const [purchasedTickets, setPurchasedTickets] = useState([])
    const [marketTickets, setMarketTickets] = useState([
        { id: 'MARKET-INIT-1', matchId: 5, sellerId: '0600000000', price: 220, type: 'Normal', ticketData: { home: "Algeria", away: "Cameroon", ticketId: "PRE-LISTED-1" } },
        { id: 'MARKET-INIT-2', matchId: 1, sellerId: '0611111111', price: 300, type: 'VIP', ticketData: { home: "Morocco", away: "Senegal", ticketId: "PRE-LISTED-2" } },
        { id: 'MARKET-INIT-3', matchId: 3, sellerId: '0622222222', price: 550, type: 'VIP', ticketData: { home: "Morocco", away: "Nigeria", ticketId: "PRE-LISTED-3" } },
        { id: 'MARKET-INIT-4', matchId: 2, sellerId: '0633333333', price: 210, type: 'Normal', ticketData: { home: "Egypt", away: "Nigeria", ticketId: "PRE-LISTED-4" } },
        { id: 'MARKET-INIT-5', matchId: 6, sellerId: '0644444444', price: 160, type: 'Normal', ticketData: { home: "Tunisia", away: "Ghana", ticketId: "PRE-LISTED-5" } },
        { id: 'MARKET-INIT-6', matchId: 11, sellerId: '0655555555', price: 280, type: 'VIP', ticketData: { home: "Egypt", away: "Senegal", ticketId: "PRE-LISTED-6" } },
        { id: 'MARKET-INIT-7', matchId: 4, sellerId: '0666666666', price: 320, type: 'Normal', ticketData: { home: "Ivory Coast", away: "Cameroon", ticketId: "PRE-LISTED-7" } },
        { id: 'MARKET-INIT-8', matchId: 12, sellerId: '0677777777', price: 190, type: 'Normal', ticketData: { home: "Ghana", away: "Algeria", ticketId: "PRE-LISTED-8" } },
        { id: 'MARKET-INIT-9', matchId: 1, sellerId: '0688888888', price: 260, type: 'Normal', ticketData: { home: "Morocco", away: "Senegal", ticketId: "PRE-LISTED-9" } }
    ])
    const [currentUser, setCurrentUser] = useState(null)
    const [notifications, setNotifications] = useState([])

    const showNotification = (msg) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, msg }]);
    }
    const [users, setUsers] = useState([]) // Simple local storage for demo
    const [faceapi, setFaceapi] = useState(null)
    const [isModelsLoaded, setIsModelsLoaded] = useState(false)

    // Load Dependencies on app mount
    useEffect(() => {
        const loadDependencies = async () => {
            try {
                // Load face-api
                console.log("Initializing Global Face-API...");
                const faceModule = await import(FACE_API_URL);
                const fa = faceModule.default || faceModule;
                setFaceapi(fa);

                await Promise.all([
                    fa.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    fa.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    fa.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
                ]);

                console.log("Global Models Loaded");

                // Pre-warm the neural net with a dummy detection to prime the cache
                try {
                    const dummyCanvas = document.createElement('canvas');
                    dummyCanvas.width = 160;
                    dummyCanvas.height = 160;
                    await fa.detectSingleFace(dummyCanvas, new fa.TinyFaceDetectorOptions({ inputSize: 160 }));
                    console.log("Neural Net Pre-warmed");
                } catch (e) {
                    console.warn("Pre-warm failed (non-critical):", e);
                }

                setIsModelsLoaded(true);
            } catch (err) {
                console.error("Global Model Loading Failed:", err);
            }
        };
        loadDependencies();
    }, []);

    const handleRegister = (data) => {
        const existing = users.find(u => u.phone === data.phone);
        if (existing) {
            showNotification("The Royal Archives already contain this identity. Please sign in.");
            return;
        }
        setUsers([...users, data]);
        setCurrentUser(data);
        setAuthOpen(false);
        showNotification(`Welcome to the Kingdom, ${data.fullName.split(' ')[0]}! Your royal identity has been verified.`);
    }

    const handleLogin = (phone, password) => {
        const user = users.find(u => u.phone === phone && u.password === password);
        if (user) {
            setCurrentUser(user);
            setAuthOpen(false);
            showNotification(`Welcome back, ${user.fullName.split(' ')[0]}! The Kingdom awaited your return.`);
        } else {
            showNotification("Invalid credentials. The Royal Guard cannot verify your identity.");
        }
    }

    const handleLogout = () => {
        setCurrentUser(null);
        setProfileOpen(false);
    }

    const handleBuyTicket = (match) => {
        if (!currentUser) {
            setAuthOpen(true);
            return;
        }
        setSelectedMatch(match);
    }

    const handleSellConfirm = (price, type) => {
        try {
            if (!sellingTicket) {
                console.warn('No ticket selected for sale');
                return;
            }

            if (!currentUser) {
                showNotification('⚠️ Authentication Required\n\nPlease sign in to list tickets.');
                return;
            }

            const originalPrice = sellingTicket.price || 250;
            const normalMax = originalPrice * 1.05;
            const vipMax = originalPrice * 1.10;

            let finalType = type;
            if (price > vipMax) {
                showNotification(`⚖️ Royal Blockade!\n\nEven VIP tiers cannot exceed 10% markup (${Math.round(vipMax)} MAD).\n\nTransaction Denied.`);
                return;
            } else if (price > normalMax) {
                finalType = 'VIP';
            }

            // Robust Match ID resolution & Data Hydration
            let matchId = sellingTicket.id || sellingTicket.matchId;
            let matchData = {};

            // Hydrate data from global matches if possible
            const allMatches = [...recentMatches, ...upcomingMatches];
            let foundMatch = null;

            if (matchId) {
                foundMatch = allMatches.find(m => m.id === matchId);
            } else if (sellingTicket.home && sellingTicket.away) {
                foundMatch = allMatches.find(m => m.home === sellingTicket.home && m.away === sellingTicket.away);
                if (foundMatch) matchId = foundMatch.id;
            }

            // Merge found match data to ensure completeness (prevents "blank" listings)
            if (foundMatch) {
                matchData = { ...foundMatch };
            }

            const newListing = {
                id: 'MARKET-' + Date.now(),
                matchId: matchId,
                sellerId: currentUser.phone,
                price,
                type: finalType,
                // crucial: bake the match data INTO the ticket data so it survives independent of lookups
                ticketData: {
                    ...matchData,
                    ...sellingTicket,
                    matchId: matchId, // Ensure matchId is present in ticketData
                    home: sellingTicket.home || matchData.home || 'Unknown',
                    away: sellingTicket.away || matchData.away || 'Unknown',
                    homeFlag: sellingTicket.homeFlag || matchData.homeFlag || '',
                    awayFlag: sellingTicket.awayFlag || matchData.awayFlag || '',
                    round: sellingTicket.round || matchData.round || 'Match',
                    isoDate: matchData.isoDate || sellingTicket.isoDate || new Date().toISOString()
                }
            };

            setMarketTickets([...marketTickets, newListing]);
            setPurchasedTickets(purchasedTickets.filter(t => t.ticketId !== sellingTicket.ticketId));
            setSellingTicket(null);
            setHistoryOpen(false);

            showNotification(`🏆 Royal Success! \n\nYour pass for ${sellingTicket.home || 'Unknown'} vs ${sellingTicket.away || 'Unknown'} is now in the Blind Market.\n\n🏷️ Tier: ${finalType} PASS\n💰 Price: ${price} MAD\n🛡️ Status: PROTECTED`);
        } catch (error) {
            console.error('❌ Sell Confirm Error:', error);
            showNotification(`⚠️ Listing Failed\n\nAn error occurred while listing your ticket. Please try again.\n\nError: ${error.message}`);
        }
    }

    const handleMarketBuy = (listing) => {
        if (!currentUser) {
            setAuthOpen(true);
            return;
        }

        // Transfer listing to current user
        // Transfer listing to current user
        // Ensure we keep ALL the data that made the listing valid
        const newTicket = {
            ...listing.ticketData, // Inherit all hydrated data
            id: listing.matchId, // Persist Match ID for future lookups
            matchId: listing.matchId, // redundancy for safety
            ticketId: 'TRF-' + listing.id.split('-')[1],
            userId: currentUser.phone,
            purchaseDate: new Date().toLocaleDateString()
        };

        setPurchasedTickets([...purchasedTickets, newTicket]);
        setMarketTickets(marketTickets.filter(t => t.id !== listing.id));
        showNotification(`💎 Imperial Transfer Complete!\n\nThe Royal Pass for ${listing.ticketData.home} vs ${listing.ticketData.away} has been successfully bound to your identity.`);
    }

    // Filter tickets for current user
    const userTickets = purchasedTickets.filter(t => t.userId === currentUser?.phone);

    // Find next match for hero
    const nextMatch = upcomingMatches.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate))[0];

    const handlePurchase = (ticket) => {
        setPurchasedTickets([ticket, ...purchasedTickets])
        setHistoryOpen(true)
    }

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-32 px-4 md:px-8 max-w-7xl mx-auto overflow-x-hidden relative">
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-morocco-red/10 rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-morocco-gold/5 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Header
                    onOpenHistory={() => setHistoryOpen(true)}
                    ticketCount={userTickets.length}
                    currentUser={currentUser}
                    onAuthClick={() => setAuthOpen(true)}
                    onProfileClick={() => setProfileOpen(true)}
                    onFixturesClick={() => setFixturesOpen(true)}
                    onMarketClick={() => setMarketOpen(true)}
                    onFanZoneClick={() => setFanZoneOpen(true)}
                    onJerseyAiClick={() => setJerseyAiOpen(true)}
                />

                <section className="mb-10 md:mb-16 relative">
                    {nextMatch && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-morocco-gold/10 border border-morocco-gold/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:inline-flex items-center gap-4 sm:gap-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-morocco-gold rounded-full animate-ping" />
                                <p className="text-[10px] font-black uppercase text-morocco-gold tracking-widest leading-none">Next Grand Arrival</p>
                            </div>
                            <div className="hidden sm:block h-4 w-px bg-morocco-gold/20" />
                            <CountdownTimer targetDate={nextMatch.isoDate} className="text-sm font-black text-white tabular-nums tracking-wider" />
                        </motion.div>
                    )}
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-7xl font-black mb-4 leading-none tracking-tighter"
                    >
                        <span className="text-morocco-gold italic gold-text-glow">Ml3ouba</span>
                    </motion.h2>
                    <p className="text-zinc-400 max-w-xl text-xs md:text-base mb-8 leading-relaxed">
                        Experience the 2025 Africa Cup of Nations hosted in the Kingdom of Morocco.
                        Secure your digital ticket today with our royal facial recognition system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-morocco-gold transition-colors w-full sm:w-auto">
                            View Schedule <ChevronRight size={18} />
                        </button>
                        <button
                            onClick={() => currentUser ? setProfileOpen(true) : setAuthOpen(true)}
                            className="flex items-center justify-center gap-2 border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
                        >
                            {currentUser ? 'My Profile' : 'Sign In'} <History size={18} />
                        </button>
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">Recent <span className="text-morocco-red">Results</span></h3>
                                    <div className="h-1 w-12 bg-morocco-red mt-2" />
                                </div>
                                <button
                                    onClick={() => setFixturesOpen(true)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#FFD700] flex items-center gap-1 group"
                                >
                                    See all <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {recentMatches.slice(0, 4).map(match => (
                                    <MatchCard key={match.id} match={match} />
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">Upcoming <span className="text-morocco-gold">Fixtures</span></h3>
                                    <div className="h-1 w-12 bg-morocco-gold mt-2" />
                                </div>
                                <button
                                    onClick={() => setFixturesOpen(true)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#FFD700] flex items-center gap-1 group"
                                >
                                    Full Calendar <Calendar size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {upcomingMatches.slice(0, 4).map(match => (
                                    <MatchCard key={match.id} match={match} upcoming onBuyTicket={handleBuyTicket} />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#2a0505]/40 rounded-3xl p-8 border border-morocco-red/20 shadow-glow-red">
                            <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
                                <Clock className="text-morocco-gold" size={20} />
                                LIVE STATUS
                            </h4>
                            <div className="space-y-6">
                                <div className="border-l-2 border-morocco-red pl-4 py-1">
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ongoing Match</p>
                                    <p className="text-sm font-bold">Nigeria vs South Africa</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-black text-red-500">LIVE: 74'</span>
                                        <span className="text-xs font-black ml-auto">1 - 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Modals & Sidebar */}
            <AnimatePresence>
                {historyOpen && (
                    <HistorySidebar
                        tickets={userTickets}
                        matches={[...recentMatches, ...upcomingMatches]}
                        isOpen={historyOpen}
                        onClose={() => setHistoryOpen(false)}
                        onSelectTicket={(t) => {
                            setHistoryOpen(false);
                            setViewTicket(t);
                        }}
                        onSellClick={(t) => {
                            setSellingTicket(t);
                            setHistoryOpen(false);
                        }}
                    />
                )}
                {authOpen && (
                    <AuthModal
                        onClose={() => setAuthOpen(false)}
                        onLogin={handleLogin}
                        onRegister={handleRegister}
                    />
                )}
                {fixturesOpen && (
                    <FullFixturesModal
                        recent={recentMatches}
                        upcoming={upcomingMatches}
                        onClose={() => setFixturesOpen(false)}
                        onBuyTicket={handleBuyTicket}
                    />
                )}
                {marketOpen && (
                    <P2PMarketModal
                        tickets={marketTickets}
                        matches={[...recentMatches, ...upcomingMatches]}
                        onClose={() => setMarketOpen(false)}
                        onBuy={handleMarketBuy}
                        currentUser={currentUser}
                        userTickets={userTickets}
                        onSellClick={(t) => setSellingTicket(t)}
                    />
                )}
                {fanZoneOpen && (
                    <FanZoneModal onClose={() => setFanZoneOpen(false)} />
                )}
                {jerseyAiOpen && (
                    <JerseyAiModal onClose={() => setJerseyAiOpen(false)} />
                )}
                {sellingTicket && (
                    <SellTicketModal
                        ticket={sellingTicket}
                        onClose={() => setSellingTicket(null)}
                        onList={handleSellConfirm}
                    />
                )}
                {selectedMatch && (
                    <TicketModal
                        match={selectedMatch}
                        onClose={() => setSelectedMatch(null)}
                        onPurchase={handlePurchase}
                        existingTickets={purchasedTickets}
                        faceapi={faceapi}
                        isModelsLoaded={isModelsLoaded}
                        currentUser={currentUser}
                    />
                )}
                {profileOpen && currentUser && (
                    <ProfileView
                        user={currentUser}
                        tickets={userTickets}
                        onLogout={handleLogout}
                        onClose={() => setProfileOpen(false)}
                        onShowTickets={() => {
                            setProfileOpen(false);
                            setHistoryOpen(true);
                        }}
                        onSellClick={(t) => {
                            setProfileOpen(false);
                            setSellingTicket(t);
                        }}
                    />
                )}
                {viewTicket && (
                    <TicketDetailModal
                        ticket={viewTicket}
                        onClose={() => setViewTicket(null)}
                    />
                )}
            </AnimatePresence>

            <HistorySidebar
                tickets={userTickets}
                isOpen={historyOpen}
                onClose={() => setHistoryOpen(false)}
                onSelectTicket={(t) => setViewTicket(t)}
                onSellClick={(t) => setSellingTicket(t)}
            />
            <AnimatePresence>
                {notifications.map((n, i) => (
                    <RoyalNotification
                        key={n.id}
                        msg={n.msg}
                        index={i}
                        onClose={() => setNotifications(prev => prev.filter(x => x.id !== n.id))}
                    />
                ))}
            </AnimatePresence>

            <MobileNav
                onFixturesClick={() => setFixturesOpen(true)}
                onMarketClick={() => setMarketOpen(true)}
                onFanZoneClick={() => setFanZoneOpen(true)}
                onJerseyAiClick={() => setJerseyAiOpen(true)}
                onOpenHistory={() => setHistoryOpen(true)}
                ticketCount={userTickets.length}
            />
        </div>
    )
}

export default App