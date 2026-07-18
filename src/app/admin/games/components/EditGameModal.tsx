"use client";

import { useState } from "react";
import { updateGame } from "@/lib/adminApi";
import { GameType } from "@/types/game";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";

interface EditGameModalProps {
    game: GameType;
    onClose: () => void;
    onUpdated: (game: GameType) => void;
}

export default function EditGameModal({ game, onClose, onUpdated }: EditGameModalProps) {
    const [price, setPrice] = useState(String(game.price));
    const [stock, setStock] = useState(String(game.stock));
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await updateGame(game._id, {
                price: Number(price),
                stock: Number(stock),
            });

            toast.success("Game updated. 💾", { theme: "dark" });
            onUpdated({ ...game, price: Number(price), stock: Number(stock) });
            onClose();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update game.", { theme: "dark" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-carbon border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-ivory">Edit {game.title}</h2>
                    <button onClick={onClose} className="text-fog hover:text-ivory cursor-pointer">
                        <HiXMark className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Stock Qty</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 mt-2 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}