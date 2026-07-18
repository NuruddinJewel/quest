// import { GameType } from "@/types/game";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// // All Game Get function
// export async function getGames(filters?: { popular?: boolean; featured?: boolean }): Promise<GameType[]> {
//     let url = `${BACKEND_URL}/api/games`;

//     const params = new URLSearchParams();
//     if (filters?.popular) params.append("popular", "true");
//     if (filters?.featured) params.append("featured", "true");

//     if (params.toString()) {
//         url += `?${params.toString()}`;
//     }

//     const res = await fetch(url, { cache: "no-store" });

//     if (!res.ok) {
//         throw new Error("Failed to fetch games");
//     }

//     return res.json();
// }

// // Single Game get function
// export async function getGameById(id: string): Promise<GameType | null> {
//     const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

//     try {
//         const res = await fetch(`${BACKEND_URL}/api/games/${id}`, { cache: "no-store" });
//         if (!res.ok) return null;
//         return res.json();
//     } catch (error) {
//         console.error("Failed to fetch game details:", error);
//         return null;
//     }
// }
// // Game Order Place function
// // import { Order } from "@/types/order";

// // // 👤 Fetch logged-in user's orders
// // export async function getUserOrders(buyerEmail: string): Promise<Order[]> {
// //     try {
// //         const res = await fetch(`${BACKEND_URL}/api/orders?buyerEmail=${buyerEmail}`, {
// //             cache: "no-store", // রিয়েল-টাইম স্ট্যাটাস দেখার জন্য ক্যাশ অফ রাখলাম
// //         });

// //         const data = await res.json();

// //         if (!res.ok) {
// //             throw new Error(data.error || "Failed to fetch your orders");
// //         }

// //         return data as Order[];
// //     } catch (error: unknown) {
// //         console.error("Fetch user orders error:", error);
// //         if (error instanceof Error) throw error;
// //         throw new Error("An unexpected error occurred");
// //     }
// // }

// //2 Gamer order Place function
// import { Order, PlaceOrderPayload } from "@/types/order";

// // 🛒 Place a new order for a game
// export async function placeOrder(
//     gameId: string,
//     payload: PlaceOrderPayload
// ): Promise<Order> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/orders`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ gameId, ...payload }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.error || "Failed to place order");
//         }

//         return data as Order;
//     } catch (error: unknown) {
//         console.error("Place order error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred while placing your order");
//     }
// }

//2
import { GameType } from "@/types/game";
import { Order, PlaceOrderPayload } from "@/types/order";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// All Game Get function
export async function getGames(filters?: { popular?: boolean; featured?: boolean }): Promise<GameType[]> {
    let url = `${BACKEND_URL}/api/games`;

    const params = new URLSearchParams();
    if (filters?.popular) params.append("popular", "true");
    if (filters?.featured) params.append("featured", "true");

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch games");
    }

    return res.json();
}

// Single Game get function
export async function getGameById(id: string): Promise<GameType | null> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/games/${id}`, { cache: "no-store" });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch game details:", error);
        return null;
    }
}

// 👤 Fetch logged-in user's orders
// export async function getUserOrders(buyerEmail: string): Promise<Order[]> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/orders?buyerEmail=${buyerEmail}`, {
//             cache: "no-store", // রিয়েল-টাইম স্ট্যাটাস দেখার জন্য ক্যাশ অফ রাখলাম
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.error || "Failed to fetch your orders");
//         }

//         return data as Order[];
//     } catch (error: unknown) {
//         console.error("Fetch user orders error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred");
//     }
// }

//2
export async function getUserOrders(buyerId: string): Promise<Order[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/orders?buyerId=${buyerId}`, {
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Failed to fetch your orders");
        }

        return data as Order[];
    } catch (error: unknown) {
        console.error("Fetch user orders error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred");
    }
}

// 🛒 Place a new order for a game
// export async function placeOrder(
//     gameId: string,
//     payload: PlaceOrderPayload
// ): Promise<Order> {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/orders`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ gameId, ...payload }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.error || "Failed to place order");
//         }

//         return data as Order;
//     } catch (error: unknown) {
//         console.error("Place order error:", error);
//         if (error instanceof Error) throw error;
//         throw new Error("An unexpected error occurred while placing your order");
//     }
// }
export async function placeOrder(
    gameId: string,
    payload: PlaceOrderPayload
): Promise<{ message: string; orderId: string }> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/games/${gameId}/buy`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Failed to place order");
        }

        return data;
    } catch (error: unknown) {
        console.error("Place order error:", error);
        if (error instanceof Error) throw error;
        throw new Error("An unexpected error occurred while placing your order");
    }
}