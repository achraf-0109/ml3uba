import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Shirt, Upload, Scan, Loader2 } from 'lucide-react';

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

export default JerseyAiModal;
