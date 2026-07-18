"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-ivory">
            {/* Background Subtle Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan/10 blur-[80px] pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-crimson/5 blur-[60px] pointer-events-none" />

            {/* Spinner & Gaming Elements */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                {/* Outer Cyan Ring */}
                <motion.div
                    className="absolute w-full h-full border-4 border-transparent border-t-cyan border-b-cyan rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Crimson Ring (Counter-rotating) */}
                <motion.div
                    className="absolute w-16 h-16 border-4 border-transparent border-l-crimson border-r-crimson rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Gold Dot / Core */}
                <motion.div
                    className="w-4 h-4 bg-gold rounded-full shadow-lg shadow-gold/50"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Loading Text */}
            <div className="text-center z-10">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-ivory/90 mb-1">
                    Accessing <span className="text-cyan">Vault</span>
                </h2>
                <motion.p
                    className="text-[10px] font-medium tracking-widest text-fog uppercase"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    Loading game data...
                </motion.p>
            </div>
        </div>
    );
}