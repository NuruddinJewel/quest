"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/dashboard",
            }, {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    toast.success("Account created successfully!");
                    router.push("/dashboard");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Something went wrong!");
                }
            });
        } catch (err) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-obsidian px-4 py-12 relative">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-crimson/5 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md bg-carbon border border-gray-800 rounded-2xl p-8 shadow-2xl z-10">
                <h2 className="text-3xl font-extrabold text-ivory tracking-tight mb-2">
                    Create <span className="text-crimson">Oasis</span> Account
                </h2>
                <p className="text-fog text-sm mb-6">Join the ultimate retro & modern gaming haven.</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-crimson transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-crimson transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-crimson transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-2 bg-crimson text-ivory font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-crimson/20 disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-fog mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-cyan hover:underline font-medium">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}