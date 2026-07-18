"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getUserOrders } from "@/lib/api";
import { Order } from "@/types/order";
import {
    HiCircleStack,
    HiClock,
    HiCheckCircle,
    HiXCircle,
} from "react-icons/hi2";

export default function UserDashboard() {
    const router = useRouter();
    const { data: session, isPending: isSessionPending } = authClient.useSession();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Session Checking
        if (!isSessionPending && !session) {
            router.push("/login?message=please_login");
            return;
        }

        // User Order Data
        if (session?.user?.email) {
            // getUserOrders(session.user.email)
            getUserOrders(session.user.id)
                .then((data) => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [session, isSessionPending, router]);

    if (isSessionPending || loading) {
        return (
            <div className="min-h-screen bg-black text-ivory flex items-center justify-center">
                <p className="text-cyan font-mono animate-pulse text-lg">ACCESSING YOUR VAULT...</p>
            </div>
        );
    }

    // Status Count Calculation
    const pendingCount = orders.filter((o) => o.status === "pending").length;
    const approvedCount = orders.filter((o) => o.status === "approved").length;

    return (
        <div className="min-h-screen bg-black text-ivory p-6 sm:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">

                {/*  WELCOME BANNER */}
                <div className="border-l-4 border-cyan bg-obsidian/40 p-6 rounded-r-2xl backdrop-blur-sm">
                    <p className="text-xs font-mono text-cyan uppercase tracking-widest">Gamer Profile</p>
                    <h1 className="text-3xl font-black text-ivory mt-1">
                        WELCOME BACK, <span className="text-transparent bg-clip-text bg-gradient-to-r flow-cyan-light">{session?.user?.name?.toUpperCase() || "GAMER"}</span>
                    </h1>
                    <p className="text-sm text-fog mt-1 font-mono">{session?.user?.email}</p>
                </div>

                {/*  QUICK STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-obsidian border border-gray-800 p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs font-mono text-fog uppercase">Total Orders</p>
                            <p className="text-2xl font-bold mt-1">{orders.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-fog text-xl">
                            <HiCircleStack />
                        </div>
                    </div>

                    <div className="bg-obsidian border border-amber-500/20 p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs font-mono text-amber-400 uppercase">Pending Vaults</p>
                            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-xl">
                            <HiClock />
                        </div>
                    </div>

                    <div className="bg-obsidian border border-emerald-500/20 p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs font-mono text-emerald-400 uppercase">Approved Games</p>
                            <p className="text-2xl font-bold text-emerald-400 mt-1">{approvedCount}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">
                            <HiCheckCircle />
                        </div>
                    </div>
                </div>

                {/* 🛒 MY ORDERS TABLE */}
                <div className="bg-obsidian border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/40">
                        <h2 className="font-bold text-lg text-ivory tracking-wide">My Order History</h2>
                    </div>

                    {error ? (
                        <div className="p-6 text-center text-rose-400 font-mono text-sm flex items-center justify-center gap-2">
                            <HiXCircle className="text-lg" /> {error}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="p-12 text-center text-fog font-mono space-y-3">
                            <p>No transactions found in your history log.</p>
                            <button onClick={() => router.push("/")} className="text-xs bg-cyan text-obsidian px-4 py-2 rounded-lg font-bold hover:bg-cyan/80 transition-all cursor-pointer">
                                Browse Games Vault
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 text-xs font-mono text-fog uppercase bg-black/30">
                                        <th className="p-4 pl-6">Game Title</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Qty</th>
                                        <th className="p-4 pr-6 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/60 text-sm">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-900/30 transition-colors">
                                            <td className="p-4 pl-6 font-bold text-ivory">{order.gameTitle}</td>
                                            <td className="p-4 text-xs font-mono text-fog">
                                                {new Date(order.purchasedAt).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </td>
                                            <td className="p-4 font-mono text-cyan">${order.price}</td>
                                            <td className="p-4 font-mono text-fog">{order.quantity}</td>
                                            <td className="p-4 pr-6 text-right">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider border
                                                    ${order.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : ""}
                                                    ${order.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : ""}
                                                    ${order.status === "rejected" ? "bg-rose-500/10 text-rose-400 border-rose-500/30" : ""}
                                                `}>
                                                    <span className={`w-1.5 h-1.5 rounded-full 
                                                        ${order.status === "approved" ? "bg-emerald-400" : ""}
                                                        ${order.status === "pending" ? "bg-amber-400" : ""}
                                                        ${order.status === "rejected" ? "bg-rose-400" : ""}
                                                    `} />
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}