import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Camera } from 'lucide-react';

export const CountdownTimer = ({ targetDate, className = "" }) => {
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
};

export const MatchCard = ({ match, upcoming, onBuyTicket }) => {
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
};
