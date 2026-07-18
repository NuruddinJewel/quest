"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiLightningBolt } from "react-icons/hi";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    //Update
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    //Demo Credentials
    const handleFillDemo = () => {
        setEmail("demo@user.com");
        setPassword("Demo@1234");
        toast.info("Demo credentials loaded! ⚡");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authClient.signIn.email({
                email,
                password,
            }, {
                onRequest: () => setLoading(true),
                onSuccess: () => {
                    toast.success("Welcome back to Oasis! 🎮", {
                        theme: "dark",
                        icon: <span>🚀</span>
                    });
                    setTimeout(() => router.push("/dashboard"), 1500);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Invalid credentials! ❌", { theme: "dark" });
                },
            });
        } catch (err) {
            toast.error("An unexpected error occurred.", { theme: "dark" });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            }, {
                onSuccess: () => {
                    toast.success("Connecting with Google... 🌐", { theme: "dark" });
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Google auth failed!", { theme: "dark" });
                }
            });
        } catch (err) {
            toast.error("Google authentication failed.", { theme: "dark" });
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-obsidian px-4 py-12 relative">
            {/* Update */}




            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan/5 blur-[100px] pointer-events-none" />
            <div className="w-full max-w-md z-10">

                {/* Login Alert */}
                {message === "please_login" && (
                    <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/35 rounded-2xl text-amber-400 text-sm font-medium text-center shadow-lg shadow-amber-500/5">
                        🎮 Please login to complete your game purchase!
                    </div>
                )}
                <div className="w-full max-w-md bg-carbon border border-gray-800 rounded-2xl p-8 shadow-2xl z-10">
                    <h2 className="text-3xl font-extrabold text-ivory tracking-tight mb-2">
                        Welcome <span className="text-cyan">Back</span>
                    </h2>
                    <p className="text-fog text-sm mb-6">Enter your credentials to access your gaming vault.</p>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-obsidian text-ivory font-semibold rounded-lg border border-gray-800 hover:bg-gray-900 transition-all mb-6 cursor-pointer"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleFillDemo}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gold/10 hover:bg-gold/20 text-gold font-bold text-xs uppercase tracking-wider rounded-lg border border-gold/30 transition-all mb-6 cursor-pointer"
                    >
                        <HiLightningBolt className="text-sm" />
                        <span>One-Click Demo Login</span>
                    </button>

                    <div className="divider text-xs text-gray-600 uppercase tracking-wider mb-6">or via email</div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-fog mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan transition-colors"
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
                                className="w-full px-4 py-3 bg-obsidian text-ivory border border-gray-800 rounded-lg focus:outline-none focus:border-cyan transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 mt-2 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all shadow-lg shadow-cyan/20 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Authenticating..." : "Log In"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-fog mt-6">
                        New to Gaming Oasis?{" "}
                        <Link href="/register" className="text-crimson hover:underline font-medium">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

