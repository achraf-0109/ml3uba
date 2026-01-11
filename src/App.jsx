import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Calendar, Clock, MapPin, ChevronRight, Share2, Info, Camera, Scan, CheckCircle, Ticket, X, History, Download, Map, AlertCircle, Loader2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react';

// Dynamic import for face-api from CDN to ensure speed and bypass environment limitations
const FACE_API_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/dist/face-api.esm.js';
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';

// --- Ticket System Components ---

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

                    <div className="mt-8 flex gap-4">
                        <button className="flex-1 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-morocco-gold transition-colors">
                            <Download size={18} /> DOWNLOAD PASS
                        </button>
                        <button className="w-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Share2 size={18} />
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

const ProfileView = ({ user, tickets, onLogout, onClose, onShowTickets }) => {
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
                        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Royal FaceID</h3>
                        <p className="text-zinc-500 text-[10px] mb-8 uppercase tracking-[0.3em] font-bold">Secure Kingdom Verification</p>

                        <div className="relative w-72 h-72 mx-auto rounded-[2.5rem] overflow-hidden border-2 border-morocco-gold/30 shadow-glow-gold mb-8 bg-zinc-900 group">
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
                className="w-full max-w-5xl h-[90vh] bg-[#1a0000] border border-morocco-gold/30 rounded-[2.5rem] flex flex-col overflow-hidden shadow-glow-gold relative"
            >
                <button onClick={onClose} className="absolute top-8 right-8 z-50 text-zinc-500 hover:text-white bg-black/40 p-2 rounded-full backdrop-blur-md">
                    <X size={24} />
                </button>

                <div className="p-10 pb-6 border-b border-morocco-gold/10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Tournament <span className="text-morocco-gold">Fixtures</span></h2>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">Official Morocco 2025 Schedule</p>
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

                <div className="flex-1 overflow-y-auto p-10 pt-6 scrollbar-hide">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

const HistorySidebar = ({ tickets, isOpen, onClose, onSelectTicket }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    className="fixed top-0 right-0 bottom-0 z-[120] w-full max-sm:w-full max-w-sm bg-[#0f0202] border-l border-morocco-gold/20 p-8 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <History className="text-morocco-gold" size={24} />
                            TICKET <span className="text-morocco-gold">HISTORY</span>
                        </h3>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={24} /></button>
                    </div>

                    {tickets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[60%] text-center opacity-50">
                            <Ticket size={64} className="mb-4 text-zinc-700" />
                            <p className="text-sm font-bold uppercase tracking-widest text-zinc-600">No tickets found</p>
                        </div>
                    ) : (
                        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                            {tickets.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => onSelectTicket(t)}
                                    className="bg-[#1a0000] border border-morocco-red/30 rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:border-morocco-gold hover:shadow-glow-red transition-all"
                                >
                                    <div className="absolute top-0 right-0 bg-morocco-red text-[8px] font-black px-3 py-1 text-white uppercase tracking-tighter">
                                        {t.ticketId}
                                    </div>
                                    <h4 className="font-bold text-sm mb-1">{t.home} vs {t.away}</h4>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase mb-4">{t.stadium}</p>

                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] font-bold text-morocco-gold">
                                            PURCHASED: {t.purchaseDate}
                                        </div>
                                        <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                                            <RealQRCode value={t.ticketId} size={40} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="absolute bottom-8 left-8 right-8">
                        <button className="w-full border border-morocco-gold/30 hover:border-morocco-gold text-morocco-gold font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all">
                            Download All (PDF)
                        </button>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
)

// --- Main App Components ---

const MatchCard = ({ match, upcoming = false, onBuyTicket }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a0505] to-[#1a0000] p-6 border border-morocco-red/30 hover:border-morocco-gold/50 transition-all duration-300 shadow-glow-red hover:shadow-glow-gold"
    >
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-morocco-gold/5 rounded-full blur-3xl group-hover:bg-morocco-gold/10 transition-colors" />

        <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-morocco-gold/80 flex items-center gap-1">
                <MapPin size={12} /> {match.stadium}
            </span>
            <span className="text-[10px] bg-morocco-red/20 text-morocco-red px-2 py-0.5 rounded border border-morocco-red/30 font-bold uppercase">
                {match.round}
            </span>
        </div>

        <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 rounded-full bg-[#3d0808] border-2 border-morocco-red/20 flex items-center justify-center mb-2 group-hover:border-morocco-gold/40 transition-colors">
                    <img src={match.homeFlag} alt={match.home} className="w-10 h-10 object-contain" />
                </div>
                <span className="font-bold text-sm tracking-wide text-center">{match.home}</span>
            </div>

            <div className="flex flex-col items-center">
                {upcoming ? (
                    <div className="flex flex-col items-center">
                        <span className="text-morocco-gold font-black text-xl leading-none">{match.time}</span>
                        <span className="text-[10px] text-zinc-500 uppercase mt-1">{match.date}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-white group-hover:text-morocco-gold transition-colors">{match.homeScore}</span>
                        <span className="text-morocco-red font-bold text-xl">:</span>
                        <span className="text-3xl font-black text-white group-hover:text-morocco-gold transition-colors">{match.awayScore}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 rounded-full bg-[#3d0808] border-2 border-morocco-red/20 flex items-center justify-center mb-2 group-hover:border-morocco-gold/40 transition-colors">
                    <img src={match.awayFlag} alt={match.away} className="w-10 h-10 object-contain" />
                </div>
                <span className="font-bold text-sm tracking-wide text-center">{match.away}</span>
            </div>
        </div>

        {upcoming ? (
            <div className="mt-6 flex gap-3">
                <button
                    onClick={() => onBuyTicket(match)}
                    className="flex-1 bg-morocco-gold hover:bg-yellow-500 text-black font-black py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                    <Camera size={14} /> Buy Ticket
                </button>
                <button className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                    <Share2 size={14} />
                </button>
            </div>
        ) : (
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium italic">Full Time</span>
            </div>
        )}
    </motion.div>
)

const Header = ({ onOpenHistory, ticketCount, currentUser, onAuthClick, onProfileClick }) => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0202]/80 backdrop-blur-md border-b border-morocco-gold/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-morocco-red to-[#800000] rounded-lg flex items-center justify-center shadow-glow-red">
                    <Trophy className="text-morocco-gold" size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
                        CAN <span className="text-morocco-gold">MOROCCO</span> 2025
                    </h1>
                    <p className="text-[10px] text-morocco-gold/60 font-bold uppercase tracking-[0.3em]">Royal Dashboard</p>
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                <a href="#" className="text-morocco-gold border-b border-morocco-gold pb-1 transition-all">Home</a>
                <button onClick={onProfileClick} className="hover:text-white transition-colors">Fixtures</button>
                {currentUser && (
                    <div
                        onClick={onOpenHistory}
                        className="relative cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                    >
                        My Tickets
                        {ticketCount > 0 && (
                            <span className="absolute -top-1 -right-4 w-4 h-4 bg-morocco-red text-[8px] flex items-center justify-center rounded-full text-white font-black animate-pulse">
                                {ticketCount}
                            </span>
                        )}
                    </div>
                )}
            </nav>

            <div className="flex items-center gap-4">
                {currentUser ? (
                    <button
                        onClick={onProfileClick}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        <div className="w-6 h-6 bg-morocco-gold rounded-full flex items-center justify-center text-black text-[10px]">
                            {currentUser.fullName[0].toUpperCase()}
                        </div>
                        {currentUser.fullName.split(' ')[0]}
                    </button>
                ) : (
                    <button
                        onClick={onAuthClick}
                        className="bg-morocco-gold text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-glow-gold hover:bg-yellow-500 transition-all"
                    >
                        Kingdom Access
                    </button>
                )}
            </div>
        </div>
    </header>
)

const App = () => {
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [viewTicket, setViewTicket] = useState(null)
    const [historyOpen, setHistoryOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)
    const [fixturesOpen, setFixturesOpen] = useState(false)
    const [purchasedTickets, setPurchasedTickets] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([]) // Simple local storage for demo
    const [faceapi, setFaceapi] = useState(null)
    const [isModelsLoaded, setIsModelsLoaded] = useState(false)

    // Load Face-API on app mount
    useEffect(() => {
        const loadModels = async () => {
            try {
                console.log("Initializing Global Face-API...");
                const module = await import(FACE_API_URL);
                const fa = module.default || module;
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
        loadModels();
    }, []);

    const handleRegister = (data) => {
        const existing = users.find(u => u.phone === data.phone);
        if (existing) {
            alert("Subject already registered in our archives.");
            return;
        }
        setUsers([...users, data]);
        setCurrentUser(data);
        setAuthOpen(false);
    }

    const handleLogin = (phone, password) => {
        const user = users.find(u => u.phone === phone && u.password === password);
        if (user) {
            setCurrentUser(user);
            setAuthOpen(false);
        } else {
            alert("Invalid credentials. Please verify your identity.");
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

    // Filter tickets for current user
    const userTickets = purchasedTickets.filter(t => t.userId === currentUser?.phone);

    const recentMatches = [
        { id: 1, home: "Morocco", away: "Senegal", homeScore: 2, awayScore: 1, stadium: "Stade Adrar, Agadir", round: "Semi-Final", homeFlag: "https://flagcdn.com/ma.svg", awayFlag: "https://flagcdn.com/sn.svg" },
        { id: 2, home: "Egypt", away: "Nigeria", homeScore: 0, awayScore: 1, stadium: "Complex Moulay Abdellah", round: "Quarter-Final", homeFlag: "https://flagcdn.com/eg.svg", awayFlag: "https://flagcdn.com/ng.svg" },
        { id: 5, home: "Algeria", away: "Cameroon", homeScore: 1, awayScore: 1, stadium: "Stade de Tanger", round: "Quarter-Final", homeFlag: "https://flagcdn.com/dz.svg", awayFlag: "https://flagcdn.com/cm.svg" },
        { id: 6, home: "Tunisia", away: "Ghana", homeScore: 3, awayScore: 2, stadium: "Stade de Marrakech", round: "Last 16", homeFlag: "https://flagcdn.com/tn.svg", awayFlag: "https://flagcdn.com/gh.svg" },
        { id: 7, home: "Mali", away: "Ivory Coast", homeScore: 0, awayScore: 2, stadium: "Stade d'Agadir", round: "Last 16", homeFlag: "https://flagcdn.com/ml.svg", awayFlag: "https://flagcdn.com/ci.svg" },
        { id: 8, home: "DR Congo", away: "Guinea", homeScore: 1, awayScore: 0, stadium: "Stade Moulay Hassan", round: "Group Stage", homeFlag: "https://flagcdn.com/cd.svg", awayFlag: "https://flagcdn.com/gn.svg" },
        { id: 9, home: "Burkina Faso", away: "Angola", homeScore: 2, awayScore: 2, stadium: "Stade Berrechid", round: "Group Stage", homeFlag: "https://flagcdn.com/bf.svg", awayFlag: "https://flagcdn.com/ao.svg" },
        { id: 10, home: "Zambia", away: "South Africa", homeScore: 1, awayScore: 3, stadium: "Stade El Abdi", round: "Group Stage", homeFlag: "https://flagcdn.com/zm.svg", awayFlag: "https://flagcdn.com/za.svg" }
    ]

    const upcomingMatches = [
        { id: 3, home: "Morocco", away: "Nigeria", date: "Sunday, Feb 15", time: "20:00", stadium: "Stade de Marrakech", round: "The Final", homeFlag: "https://flagcdn.com/ma.svg", awayFlag: "https://flagcdn.com/ng.svg" },
        { id: 4, home: "Ivory Coast", away: "Cameroon", date: "Saturday, Feb 14", time: "18:00", stadium: "Grand Stade de Tanger", round: "3rd Place", homeFlag: "https://flagcdn.com/ci.svg", awayFlag: "https://flagcdn.com/cm.svg" },
        { id: 11, home: "Egypt", away: "Senegal", date: "Friday, Feb 13", time: "16:00", stadium: "Stade d'Agadir", round: "Play-off", homeFlag: "https://flagcdn.com/eg.svg", awayFlag: "https://flagcdn.com/sn.svg" },
        { id: 12, home: "Ghana", away: "Algeria", date: "Monday, Feb 16", time: "21:00", stadium: "Stade Moulay Abdellah", round: "Final B", homeFlag: "https://flagcdn.com/gh.svg", awayFlag: "https://flagcdn.com/dz.svg" },
        { id: 13, home: "South Africa", away: "Mali", date: "Tuesday, Feb 17", time: "19:00", stadium: "Complex Sportif Fes", round: "Exhibition", homeFlag: "https://flagcdn.com/za.svg", awayFlag: "https://flagcdn.com/ml.svg" },
        { id: 14, home: "Nigeria", away: "Tunisia", date: "Wednesday, Feb 18", time: "20:30", stadium: "Stade Larbi Zaouli", round: "Pre-Season", homeFlag: "https://flagcdn.com/ng.svg", awayFlag: "https://flagcdn.com/tn.svg" },
        { id: 15, home: "Guinea", away: "Angola", date: "Thursday, Feb 19", time: "17:00", stadium: "Stade Oujda", round: "Friendly", homeFlag: "https://flagcdn.com/gn.svg", awayFlag: "https://flagcdn.com/ao.svg" },
        { id: 16, home: "Cameroon", away: "Zambia", date: "Friday, Feb 20", time: "15:00", stadium: "Stade El Bachir", round: "Friendly", homeFlag: "https://flagcdn.com/cm.svg", awayFlag: "https://flagcdn.com/zm.svg" }
    ]

    const handlePurchase = (ticket) => {
        setPurchasedTickets([ticket, ...purchasedTickets])
        setHistoryOpen(true)
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-x-hidden relative">
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
                />

                <section className="mb-16 relative">
                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-7xl font-black mb-4 leading-none tracking-tighter"
                        >
                            WITNESS THE <br />
                            <span className="text-morocco-gold italic gold-text-glow">GLORY OF AFRICA</span>
                        </motion.h2>
                        <p className="text-zinc-400 max-w-xl text-sm md:text-base mb-8">
                            Experience the 2025 Africa Cup of Nations hosted in the Kingdom of Morocco.
                            Secure your digital ticket today with our royal facial recognition system.
                        </p>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-morocco-gold transition-colors">
                                View Schedule <ChevronRight size={18} />
                            </button>
                            <button
                                onClick={() => currentUser ? setProfileOpen(true) : setAuthOpen(true)}
                                className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                            >
                                {currentUser ? 'My Profile' : 'Sign In'} <History size={18} />
                            </button>
                        </div>
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
            />
        </div>
    )
}

export default App
