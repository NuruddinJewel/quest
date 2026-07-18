"use client";

import { useEffect, useState } from "react";
import { getBuyers } from "@/lib/adminApi";
import { BuyerUser } from "@/types/user";
import { DataTable, Column } from "@/components/admin/DataTable";

export default function AdminUsersPage() {
    const [buyers, setBuyers] = useState<BuyerUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getBuyers()
            .then((data) => {
                setBuyers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const columns: Column<BuyerUser>[] = [
        { header: "Name", accessor: (b) => <span className="font-bold text-ivory">{b.name || "—"}</span> },
        { header: "Email", accessor: (b) => <span className="text-fog text-xs font-mono">{b.email}</span> },
        { header: "Total Orders", accessor: (b) => <span className="font-mono text-cyan">{b.totalOrders}</span> },
        { header: "Total Spent", accessor: (b) => <span className="font-mono text-gold">${b.totalSpent.toFixed(2)}</span> },
        {
            header: "Last Purchase",
            accessor: (b) =>
                b.lastPurchase
                    ? new Date(b.lastPurchase).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "—",
            className: "text-xs font-mono text-fog",
        },
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="border-l-4 border-cyan bg-obsidian/40 p-6 rounded-r-2xl backdrop-blur-sm">
                <p className="text-xs font-mono text-cyan uppercase tracking-widest">User Governance</p>
                <h1 className="text-3xl font-black text-ivory mt-1">BUYERS & CUSTOMERS</h1>
                <p className="text-sm text-fog mt-1 font-mono">{buyers.length} unique buyers tracked.</p>
            </div>

            {error && (
                <div className="bg-rose-500/10 border border-rose-500/35 rounded-xl p-4 text-rose-400 text-sm font-medium">
                    ⚠️ {error}
                </div>
            )}

            <div className="bg-carbon border border-gray-800 rounded-2xl overflow-hidden">
                <DataTable
                    columns={columns}
                    data={buyers}
                    keyField={(b) => b._id}
                    loading={loading}
                    emptyMessage="No buyer activity recorded yet."
                />
            </div>
        </div>
    );
}