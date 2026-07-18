// // import { AdminStats } from "@/types/stats";
// // import { Order } from "@/types/order";
// // import { GameType } from "@/types/game";
// // import { BuyerUser } from "@/types/user";

// // const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// // // 📊 Overview stats
// // export async function getAdminStats(): Promise<AdminStats> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/admin/stats`, { cache: "no-store" });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || "Failed to fetch stats");
// //         return data as AdminStats;
// //     } catch (error: unknown) {
// //         console.error("Fetch admin stats error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// // // 📦 Pending orders queue (backend now supports ?status= filter)
// // export async function getPendingOrders(): Promise<Order[]> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/orders?status=pending`, { cache: "no-store" });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || "Failed to fetch pending orders");
// //         return data as Order[];
// //     } catch (error: unknown) {
// //         console.error("Fetch pending orders error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// // // ✅ / ❌ Update order status — backend uses ONE endpoint for both approve & reject
// // export async function updateOrderStatus(
// //     orderId: string,
// //     status: "approved" | "rejected"
// // ): Promise<{ message: string }> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
// //             method: "PATCH",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ status }),
// //         });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || `Failed to ${status === "approved" ? "approve" : "reject"} order`);
// //         return data;
// //     } catch (error: unknown) {
// //         console.error("Update order status error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// // // 🎮 Add a new game to the vault
// // export async function addGame(payload: Omit<GameType, "_id">): Promise<GameType> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/games`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(payload),
// //         });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || "Failed to add game");
// //         return data as GameType;
// //     } catch (error: unknown) {
// //         console.error("Add game error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// // // ✏️ Update an existing game (price, stock, etc.)
// // export async function updateGame(id: string, payload: Partial<GameType>): Promise<GameType> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/games/${id}`, {
// //             method: "PUT",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(payload),
// //         });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || "Failed to update game");
// //         return data as GameType;
// //     } catch (error: unknown) {
// //         console.error("Update game error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// // // 🗑️ Delete a game
// // export async function deleteGame(id: string): Promise<void> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/games/${id}`, { method: "DELETE" });
// //         if (!res.ok) {
// //             const data = await res.json().catch(() => ({}));
// //             throw new Error(data.error || "Failed to delete game");
// //         }
// //     } catch (error: unknown) {
// //         console.error("Delete game error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// // // 👥 Buyer / customer directory
// // export async function getBuyers(): Promise<BuyerUser[]> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/admin/buyers`, { cache: "no-store" });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || "Failed to fetch buyers");
// //         return data as BuyerUser[];
// //     } catch (error: unknown) {
// //         console.error("Fetch buyers error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// //2
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
// // NOTE: backend returns { message, insertedId } — not the full game object —
// // so we build the GameType locally from the payload + returned id.
// export async function addGame(payload: Omit<GameType, "_id">): Promise<GameType> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/games`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to add game");
//         return { ...payload, _id: data.insertedId } as GameType;
//     } catch (error: unknown) {
//         console.error("Add game error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

// // ✏️ Update an existing game (price, stock, etc.)
// // NOTE: backend returns { message } only — caller should merge the updated
// // fields locally (EditGameModal already does this).
// export async function updateGame(id: string, payload: Partial<GameType>): Promise<{ message: string }> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/games/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Failed to update game");
//         return data;
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

import { AdminStats } from "@/types/stats";
import { Order } from "@/types/order";
import { GameType } from "@/types/game";
import { BuyerUser } from "@/types/user";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// 📊 Overview stats
export async function getAdminStats(): Promise<AdminStats> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/stats`, { cache: "no-store" });

        // 🆕 আগে চেক করুন রেসপন্স ঠিক আছে কিনা, তারপর JSON পার্স করুন
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to fetch stats");
        }

        return await res.json() as AdminStats;
    } catch (error: unknown) {
        console.error("Fetch admin stats error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// 📦 Pending orders queue
export async function getPendingOrders(): Promise<Order[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/orders?status=pending`, { cache: "no-store" });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to fetch pending orders");
        }

        return await res.json() as Order[];
    } catch (error: unknown) {
        console.error("Fetch pending orders error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// ✅ / ❌ Update order status
export async function updateOrderStatus(
    orderId: string,
    status: "approved" | "rejected"
): Promise<{ message: string }> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `Failed to ${status === "approved" ? "approve" : "reject"} order`);

        return data;
    } catch (error: unknown) {
        console.error("Update order status error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// 🎮 Add a new game to the vault
export async function addGame(payload: Omit<GameType, "_id">): Promise<GameType> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/games`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Failed to add game");

        return { ...payload, _id: data.insertedId } as GameType;
    } catch (error: unknown) {
        console.error("Add game error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// ✏️ Update an existing game
export async function updateGame(id: string, payload: Partial<GameType>): Promise<{ message: string }> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/games/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Failed to update game");

        return data;
    } catch (error: unknown) {
        console.error("Update game error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// 🗑️ Delete a game
export async function deleteGame(id: string): Promise<void> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/games/${id}`, { method: "DELETE" });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to delete game");
        }
    } catch (error: unknown) {
        console.error("Delete game error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// 👥 Buyer / customer directory
export async function getBuyers(): Promise<BuyerUser[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/admin/buyers`, { cache: "no-store" });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to fetch buyers");
        }

        return await res.json() as BuyerUser[];
    } catch (error: unknown) {
        console.error("Fetch buyers error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}