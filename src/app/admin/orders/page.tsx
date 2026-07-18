// import { AdminStats } from "@/types/stats";
// import { Order } from "@/types/order";
// import { GameType } from "@/types/game";
// import { BuyerUser } from "@/types/user";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// // 📊 Overview stats
// export async function getAdminStats(): Promise<AdminStats> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/admin/stats`, { cache: "no-store" });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to fetch stats");
//         return data as AdminStats;
//     } catch (error: unknown) {
//         console.error("Fetch admin stats error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // 📦 Pending orders queue (backend now supports ?status= filter)
// export async function getPendingOrders(): Promise<Order[]> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/orders?status=pending`, { cache: "no-store" });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to fetch pending orders");
//         return data as Order[];
//     } catch (error: unknown) {
//         console.error("Fetch pending orders error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // ✅ / ❌ Update order status — backend uses ONE endpoint for both approve & reject
// export async function updateOrderStatus(
//     orderId: string,
//     status: "approved" | "rejected"
// ): Promise<{ message: string }> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status }),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || `Failed to ${status === "approved" ? "approve" : "reject"} order`);
//         return data;
//     } catch (error: unknown) {
//         console.error("Update order status error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // 🎮 Add a new game to the vault
// export async function addGame(payload: Omit<GameType, "_id">): Promise<GameType> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/games`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to add game");
//         return data as GameType;
//     } catch (error: unknown) {
//         console.error("Add game error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // ✏️ Update an existing game (price, stock, etc.)
// export async function updateGame(id: string, payload: Partial<GameType>): Promise<GameType> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/games/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to update game");
//         return data as GameType;
//     } catch (error: unknown) {
//         console.error("Update game error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // 🗑️ Delete a game
// export async function deleteGame(id: string): Promise<void> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/games/${id}`, { method: "DELETE" });
//         if (!res.ok) {
//             const data = await res.json().catch(() => ({}));
//             throw new Error(data.error || "Failed to delete game");
//         }
//     } catch (error: unknown) {
//         console.error("Delete game error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // 👥 Buyer / customer directory
// export async function getBuyers(): Promise<BuyerUser[]> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/admin/buyers`, { cache: "no-store" });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to fetch buyers");
//         return data as BuyerUser[];
//     } catch (error: unknown) {
//         console.error("Fetch buyers error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

//2
"use client";

import { useEffect, useState } from "react";
import { getPendingOrders, updateOrderStatus } from "@/lib/adminApi";
import { Order } from "@/types/order";
// import {DataTable,  Column } from "@/components/admin/DataTable";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { Column, DataTable } from "@/components/admin/DataTable";
// import { DataTable, Column } from "@/components/admin/DataTable";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const loadOrders = () => {
        setLoading(true);
        getPendingOrders()
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleDecision = async (orderId: string, status: "approved" | "rejected") => {
        setProcessingId(orderId);
        try {
            await updateOrderStatus(orderId, status);
            toast.success(
                status === "approved" ? "Order approved. Stock updated. ✅" : "Order rejected. 🚫",
                { theme: "dark" }
            );

            setOrders((prev) => prev.filter((o) => o._id !== orderId));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Action failed.", { theme: "dark" });
        } finally {
            setProcessingId(null);
        }
    };

    const columns: Column<Order>[] = [
        { header: "Game Title", accessor: (o) => <span className="font-bold text-ivory">{o.gameTitle}</span> },
        { header: "Buyer", accessor: (o) => <span className="text-fog text-xs font-mono">{o.buyerEmail}</span> },
        {
            header: "Date",
            accessor: (o) =>
                new Date(o.purchasedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            className: "text-xs font-mono text-fog",
        },
        { header: "Price", accessor: (o) => <span className="text-cyan font-mono">${o.price}</span> },
        { header: "Qty", accessor: (o) => <span className="text-fog font-mono">{o.quantity}</span> },
        {
            header: "Action",
            align: "right",
            accessor: (o) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        disabled={processingId === o._id}
                        onClick={() => handleDecision(o._id, "approved")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-all disabled:opacity-40 cursor-pointer"
                    >
                        <HiOutlineCheck /> Approve
                    </button>
                    <button
                        disabled={processingId === o._id}
                        onClick={() => handleDecision(o._id, "rejected")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition-all disabled:opacity-40 cursor-pointer"
                    >
                        <HiOutlineXMark /> Reject
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="border-l-4 border-cyan bg-obsidian/40 p-6 rounded-r-2xl backdrop-blur-sm">
                <p className="text-xs font-mono text-cyan uppercase tracking-widest">Order Management</p>
                <h1 className="text-3xl font-black text-ivory mt-1">PENDING APPROVALS</h1>
                <p className="text-sm text-fog mt-1 font-mono">
                    {orders.length} order{orders.length !== 1 ? "s" : ""} awaiting your decision.
                </p>
            </div>

            {error && (
                <div className="bg-rose-500/10 border border-rose-500/35 rounded-xl p-4 text-rose-400 text-sm font-medium">
                    ⚠️ {error}
                </div>
            )}

            <div className="bg-carbon border border-gray-800 rounded-2xl overflow-hidden">
                <DataTable
                    columns={columns}
                    data={orders}
                    keyField={(o) => o._id}
                    loading={loading}
                    emptyMessage="No pending orders right now. Vault is clear. ✅"
                />
            </div>
        </div>
    );
}