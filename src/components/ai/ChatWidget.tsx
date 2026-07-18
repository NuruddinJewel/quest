"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "./ChatMessage";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiXMark, HiPaperAirplane, HiOutlineTrash } from "react-icons/hi2";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const { messages, sending, sendMessage, resetChat } = useChat();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = input.trim();
        if (!text) return;
        setInput("");
        sendMessage(text);
    };

    return (
        <>
            {/* Floating toggle button */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan text-obsidian flex items-center justify-center shadow-lg shadow-cyan/30 hover:bg-cyan-dark transition-all cursor-pointer"
                aria-label="AI Chat Assistant"
            >
                {open ? <HiXMark className="text-2xl" /> : <IoGameControllerOutline className="text-2xl" />}
            </button>

            {/* Chat panel */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] bg-carbon border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-800 bg-obsidian/60 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-mono text-cyan uppercase tracking-widest">Gaming Oasis</p>
                            <h3 className="text-sm font-bold text-ivory">AI Assistant</h3>
                        </div>
                        <button
                            onClick={resetChat}
                            title="Clear conversation"
                            className="text-fog hover:text-crimson transition-colors cursor-pointer"
                        >
                            <HiOutlineTrash className="text-lg" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center px-4">
                                <p className="text-fog text-sm">
                                    Hi! Ask me to find games, check prices, or look up your order status.🎮
                                </p>
                            </div>
                        ) : (
                            messages.map((m, i) => <ChatMessage key={i} message={m} />)
                        )}
                        {sending && (
                            <div className="flex items-center gap-2 text-fog text-xs font-mono px-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                                Thinking...
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex items-center gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about a game..."
                            className="flex-1 px-4 py-2.5 bg-obsidian text-ivory text-sm border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                        <button
                            type="submit"
                            disabled={sending || !input.trim()}
                            className="w-10 h-10 shrink-0 rounded-lg bg-cyan text-obsidian flex items-center justify-center hover:bg-cyan-dark transition-all disabled:opacity-40 cursor-pointer"
                        >
                            <HiPaperAirplane className="text-sm" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}