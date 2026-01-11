import React from 'react';
import { Trophy, Calendar, ShoppingCart, Camera, Shirt, Ticket } from 'lucide-react';

export const MobileNav = ({ onFixturesClick, onMarketClick, onFanZoneClick, onJerseyAiClick, onOpenHistory, ticketCount }) => (
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
);

export const Header = ({ onOpenHistory, ticketCount, currentUser, onAuthClick, onProfileClick, onFixturesClick, onMarketClick, onFanZoneClick, onJerseyAiClick }) => (
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
                            {currentUser.fullName[0].toUpperCase()}
                        </div>
                        <span className="hidden sm:inline">{currentUser.fullName.split(' ')[0]}</span>
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
);
