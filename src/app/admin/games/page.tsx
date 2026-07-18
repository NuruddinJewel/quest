// "use client";

// import { useEffect, useState } from "react";
// import { getGames } from "@/lib/api";
// import { deleteGame } from "@/lib/adminApi";
// import { GameType } from "@/types/game";
// import DataTable, { Column } from "@/components/admin/DataTable";
// import AddGameModal from "./components/AddGameModal";
// import EditGameModal from "./components/EditGameModal";
// import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
// import { toast } from "react-toastify";

// export default function AdminGamesPage() {
//     const [games, setGames] = useState<GameType[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [editingGame, setEditingGame] = useState<GameType | null>(null);
//     const [deletingId, setDeletingId] = useState<string | null>(null);

//     useEffect(() => {
//         getGames()
//             .then((data) => {
//                 setGames(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, []);

//     const handleDelete = async (id: string, title: string) => {
//         if (!confirm(`Remove "${title}" from the vault? This can't be undone.`)) return;

//         setDeletingId(id);
//         try {
//             await deleteGame(id);
//             toast.success("Game removed from vault. 🗑️", { theme: "dark" });
//             setGames((prev) => prev.filter((g) => g._id !== id));
//         } catch (err) {
//             toast.error(err instanceof Error ? err.message : "Failed to delete game.", { theme: "dark" });
//         } finally {
//             setDeletingId(null);
//         }
//     };

//     const columns: Column<GameType>[] = [
//         { header: "Title", accessor: (g) => <span className="font-bold text-ivory">{g.title}</span> },
//         { header: "Platforms", accessor: (g) => <span className="text-fog text-xs font-mono">{g.platforms.join(", ")}</span> },
//         { header: "Price", accessor: (g) => <span className="text-cyan font-mono">${g.price}</span> },
//         {
//             header: "Stock",
//             accessor: (g) => (
//                 <span className={`font-mono ${g.stock <= 0 ? "text-rose-400" : "text-emerald-400"}`}>
//                     {g.stock <= 0 ? "Out of stock" : g.stock}
//                 </span>
//             ),
//         },
//         {
//             header: "Actions",
//             align: "right",
//             accessor: (g) => (
//                 <div className="flex items-center justify-end gap-2">
//                     <button
//                         onClick={() => setEditingGame(g)}
//                         className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan/10 text-cyan border border-cyan/30 text-xs font-bold hover:bg-cyan/20 transition-all cursor-pointer"
//                     >
//                         <HiOutlinePencil /> Edit
//                     </button>
//                     <button
//                         disabled={deletingId === g._id}
//                         onClick={() => handleDelete(g._id, g.title)}
//                         className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition-all disabled:opacity-40 cursor-pointer"
//                     >
//                         <HiOutlineTrash /> Delete
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="space-y-8 max-w-6xl">
//             <div className="border-l-4 border-cyan bg-obsidian/40 p-6 rounded-r-2xl backdrop-blur-sm flex items-center justify-between flex-wrap gap-4">
//                 <div>
//                     <p className="text-xs font-mono text-cyan uppercase tracking-widest">Inventory Orchestration</p>
//                     <h1 className="text-3xl font-black text-ivory mt-1">CD VAULT</h1>
//                     <p className="text-sm text-fog mt-1 font-mono">{games.length} titles currently listed.</p>
//                 </div>
//                 <button
//                     onClick={() => setShowAddModal(true)}
//                     className="flex items-center gap-2 px-5 py-3 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all cursor-pointer"
//                 >
//                     <HiOutlinePlus /> Add Game
//                 </button>
//             </div>

//             {error && (
//                 <div className="bg-rose-500/10 border border-rose-500/35 rounded-xl p-4 text-rose-400 text-sm font-medium">
//                     ⚠️ {error}
//                 </div>
//             )}

//             <div className="bg-carbon border border-gray-800 rounded-2xl overflow-hidden">
//                 <DataTable
//                     columns={columns}
//                     data={games}
//                     keyField={(g) => g._id}
//                     loading={loading}
//                     emptyMessage="No games in the vault yet. Add your first title."
//                 />
//             </div>

//             {showAddModal && (
//                 <AddGameModal
//                     onClose={() => setShowAddModal(false)}
//                     onAdded={(newGame) => setGames((prev) => [...prev, newGame])}
//                 />
//             )}

//             {editingGame && (
//                 <EditGameModal
//                     game={editingGame}
//                     onClose={() => setEditingGame(null)}
//                     onUpdated={(updated) =>
//                         setGames((prev) => prev.map((g) => (g._id === updated._id ? updated : g)))
//                     }
//                 />
//             )}
//         </div>
//     );
// }

//2

"use client";

import { useEffect, useState } from "react";
import { getGames } from "@/lib/api";
import { deleteGame } from "@/lib/adminApi";
import { GameType } from "@/types/game";
import { DataTable, Column } from "@/components/admin/DataTable";
import AddGameModal from "./components/AddGameModal";
import EditGameModal from "./components/EditGameModal";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function AdminGamesPage() {
    const [games, setGames] = useState<GameType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingGame, setEditingGame] = useState<GameType | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        getGames()
            .then((data) => {
                setGames(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Remove "${title}" from the vault? This can't be undone.`)) return;

        setDeletingId(id);
        try {
            await deleteGame(id);
            toast.success("Game removed from vault. 🗑️", { theme: "dark" });
            setGames((prev) => prev.filter((g) => g._id !== id));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete game.", { theme: "dark" });
        } finally {
            setDeletingId(null);
        }
    };

    const columns: Column<GameType>[] = [
        { header: "Title", accessor: (g) => <span className="font-bold text-ivory">{g.title}</span> },
        { header: "Platforms", accessor: (g) => <span className="text-fog text-xs font-mono">{g.platforms.join(", ")}</span> },
        { header: "Price", accessor: (g) => <span className="text-cyan font-mono">${g.price}</span> },
        {
            header: "Stock",
            accessor: (g) => (
                <span className={`font-mono ${g.stock <= 0 ? "text-rose-400" : "text-emerald-400"}`}>
                    {g.stock <= 0 ? "Out of stock" : g.stock}
                </span>
            ),
        },
        {
            header: "Actions",
            align: "right",
            accessor: (g) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => setEditingGame(g)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan/10 text-cyan border border-cyan/30 text-xs font-bold hover:bg-cyan/20 transition-all cursor-pointer"
                    >
                        <HiOutlinePencil /> Edit
                    </button>
                    <button
                        disabled={deletingId === g._id}
                        onClick={() => handleDelete(g._id, g.title)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition-all disabled:opacity-40 cursor-pointer"
                    >
                        <HiOutlineTrash /> Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="border-l-4 border-cyan bg-obsidian/40 p-6 rounded-r-2xl backdrop-blur-sm flex items-center justify-between flex-wrap gap-4">
                <div>
                    <p className="text-xs font-mono text-cyan uppercase tracking-widest">Inventory Orchestration</p>
                    <h1 className="text-3xl font-black text-ivory mt-1">CD VAULT</h1>
                    <p className="text-sm text-fog mt-1 font-mono">{games.length} titles currently listed.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all cursor-pointer"
                >
                    <HiOutlinePlus /> Add Game
                </button>
            </div>

            {error && (
                <div className="bg-rose-500/10 border border-rose-500/35 rounded-xl p-4 text-rose-400 text-sm font-medium">
                    ⚠️ {error}
                </div>
            )}

            <div className="bg-carbon border border-gray-800 rounded-2xl overflow-hidden">
                <DataTable
                    columns={columns}
                    data={games}
                    keyField={(g) => g._id}
                    loading={loading}
                    emptyMessage="No games in the vault yet. Add your first title."
                />
            </div>

            {showAddModal && (
                <AddGameModal
                    onClose={() => setShowAddModal(false)}
                    onAdded={(newGame) => setGames((prev) => [...prev, newGame])}
                />
            )}

            {editingGame && (
                <EditGameModal
                    game={editingGame}
                    onClose={() => setEditingGame(null)}
                    onUpdated={(updated) =>
                        setGames((prev) => prev.map((g) => (g._id === updated._id ? updated : g)))
                    }
                />
            )}
        </div>
    );
}