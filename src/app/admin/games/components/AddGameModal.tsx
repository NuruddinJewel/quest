"use client";

import { useState } from "react";
import { addGame } from "@/lib/adminApi";
import { GameType } from "@/types/game";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";

interface AddGameModalProps {
    onClose: () => void;
    onAdded: (game: GameType) => void;
}

export default function AddGameModal({ onClose, onAdded }: AddGameModalProps) {
    const [form, setForm] = useState({
        title: "",
        price: "",
        stock: "",
        platforms: "", // কমা দিয়ে আলাদা করা string, submit করার সময় array-তে split হবে
        category: "",
        image: "",
        isPopular: false,
        isFeatured: false,
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload: Omit<GameType, "_id"> = {
                title: form.title,
                price: Number(form.price),
                stock: Number(form.stock),
                platforms: form.platforms.split(",").map((p) => p.trim()).filter(Boolean),
                category: form.category,
                image: form.image,
                isPopular: form.isPopular,
                isFeatured: form.isFeatured,
            };

            const newGame = await addGame(payload);

            toast.success("Game added to the vault! 🎮", { theme: "dark" });
            onAdded(newGame);
            onClose();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add game.", { theme: "dark" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="w-full max-w-md bg-carbon border border-gray-800 rounded-2xl p-6 shadow-2xl my-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-ivory">Add New Game</h2>
                    <button onClick={onClose} className="text-fog hover:text-ivory cursor-pointer">
                        <HiXMark className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Stock Qty</label>
                            <input
                                name="stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">
                            Platforms <span className="normal-case text-fog/60">(comma separated: PS5, Xbox One, PC)</span>
                        </label>
                        <input
                            name="platforms"
                            value={form.platforms}
                            onChange={handleChange}
                            placeholder="PS5, Xbox Series X, PC"
                            required
                            className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Category</label>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Action, Racing, Sports..."
                            required
                            className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Image URL</label>
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://..."
                            required
                            className="w-full px-4 py-2.5 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan"
                        />
                    </div>

                    <div className="flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 text-sm text-fog cursor-pointer">
                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={form.isPopular}
                                onChange={handleChange}
                                className="accent-cyan"
                            />
                            Popular
                        </label>
                        <label className="flex items-center gap-2 text-sm text-fog cursor-pointer">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={form.isFeatured}
                                onChange={handleChange}
                                className="accent-cyan"
                            />
                            Featured
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 mt-2 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {submitting ? "Adding..." : "Add Game"}
                    </button>
                </form>
            </div>
        </div>
    );
}