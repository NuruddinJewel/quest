
// Only search_games(query) and check_my_orders()
// import { FunctionDeclaration, Type } from "@google/genai";
// import { GameType } from "@/types/game";
// import { Order } from "@/types/order";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// // 🔧 Gemini-কে বলে দেওয়া হচ্ছে কী কী tool আছে আর কীভাবে কল করতে হবে
// export const chatToolDeclarations: FunctionDeclaration[] = [
//     {
//         name: "search_games",
//         description:
//             "Gaming Oasis vault-এ গেম টাইটেল খোঁজে। ইউজার যখন কোনো গেম আছে কিনা, দাম কত, বা কোন প্ল্যাটফর্মে available জিজ্ঞেস করে তখন এটা ব্যবহার করো।",
//         parameters: {
//             type: Type.OBJECT,
//             properties: {
//                 query: {
//                     type: Type.STRING,
//                     description: "গেমের নাম বা তার অংশ, যেমন 'GTA' বা 'FIFA'",
//                 },
//             },
//             required: ["query"],
//         },
//     },
//     {
//         name: "check_my_orders",
//         description:
//             "লগইন করা ইউজারের নিজের অর্ডার হিস্ট্রি এবং স্ট্যাটাস (pending/approved/rejected) চেক করে। ইউজার নিজের অর্ডার সম্পর্কে জিজ্ঞেস করলে এটা ব্যবহার করো।",
//         parameters: {
//             type: Type.OBJECT,
//             properties: {},
//         },
//     },
// ];

// // 🛠️ আসল ফাংশন যেগুলো Gemini "call" করতে চাইলে আমরা রান করবো
// export async function executeTool(
//     toolName: string,
//     args: Record<string, unknown>,
//     context: { buyerId?: string }
// ): Promise<unknown> {
//     switch (toolName) {
//         case "search_games": {
//             const query = String(args.query || "");
//             const res = await fetch(`${BACKEND_URL}/api/games/search?query=${encodeURIComponent(query)}`);
//             const games = (await res.json()) as GameType[];
//             // মডেলকে কম কিন্তু দরকারি তথ্য দাও, পুরো object না
//             return Array.isArray(games)
//                 ? games.slice(0, 5).map((g: GameType) => ({
//                     title: g.title,
//                     price: g.price,
//                     platforms: g.platforms,
//                     stock: g.stock,
//                 }))
//                 : [];
//         }

//         case "check_my_orders": {
//             if (!context.buyerId) {
//                 return { error: "User is not logged in, cannot fetch orders." };
//             }
//             const res = await fetch(`${BACKEND_URL}/api/orders?buyerId=${context.buyerId}`);
//             const orders = (await res.json()) as Order[];
//             return Array.isArray(orders)
//                 ? orders.map((o: Order) => ({
//                     gameTitle: o.gameTitle,
//                     status: o.status,
//                     quantity: o.quantity,
//                     price: o.price,
//                 }))
//                 : [];
//         }

//         default:
//             return { error: `Unknown tool: ${toolName}` };
//     }
// }

//Updated with price checking Features

import { FunctionDeclaration, Type } from "@google/genai";
import { GameType } from "@/types/game";
import { Order } from "@/types/order";

// const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL as string;
console.log("Backend URL", BACKEND_URL)

// Tools
export const chatToolDeclarations: FunctionDeclaration[] = [
    {
        name: "search_games",
        description:
            "Gaming Oasis vault-এ গেম টাইটেল খোঁজে। ইউজার যখন কোনো গেম আছে কিনা, দাম কত, বা কোন প্ল্যাটফর্মে available জিজ্ঞেস করে তখন এটা ব্যবহার করো।",
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: {
                    type: Type.STRING,
                    description: "গেমের নাম বা তার অংশ, যেমন 'GTA' বা 'FIFA'",
                },
            },
            required: ["query"],
        },
    },
    {
        name: "check_my_orders",
        description:
            "লগইন করা ইউজারের নিজের অর্ডার হিস্ট্রি এবং স্ট্যাটাস (pending/approved/rejected) চেক করে। ইউজার নিজের অর্ডার সম্পর্কে জিজ্ঞেস করলে এটা ব্যবহার করো।",
        parameters: {
            type: Type.OBJECT,
            properties: {},
        },
    },
    {
        name: "browse_games",
        description:
            "গেম ক্যাটালগ ব্রাউজ করে — দাম অনুযায়ী sort (সবচেয়ে সস্তা/দামি), category বা platform অনুযায়ী filter, অথবা নির্দিষ্ট বাজেটের মধ্যে গেম খোঁজার জন্য ব্যবহার করো। নির্দিষ্ট নাম দিয়ে খোঁজার জন্য এটা না — সেক্ষেত্রে search_games ব্যবহার করো।",
        parameters: {
            type: Type.OBJECT,
            properties: {
                sortBy: {
                    type: Type.STRING,
                    description: "'price_asc' (সস্তা থেকে দামি) অথবা 'price_desc' (দামি থেকে সস্তা)",
                },
                category: {
                    type: Type.STRING,
                    description: "যেমন Action, Racing, Sports — exact match না, partial ও কাজ করবে",
                },
                platform: {
                    type: Type.STRING,
                    description: "যেমন PS5, Xbox One, PC",
                },
                maxPrice: {
                    type: Type.NUMBER,
                    description: "এর নিচে দামের গেম দেখাবে",
                },
                limit: {
                    type: Type.NUMBER,
                    description: "কতগুলো রেজাল্ট দরকার, ডিফল্ট 5",
                },
            },
        },
    },
];

// Call
export async function executeTool(
    toolName: string,
    args: Record<string, unknown>,
    context: { buyerId?: string }
): Promise<unknown> {
    switch (toolName) {
        case "search_games": {
            const query = String(args.query || "");
            const res = await fetch(`${BACKEND_URL}/api/games/search?query=${encodeURIComponent(query)}`);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error("search_games tool: backend returned error", res.status, errorData);
                return { error: `Search failed: ${errorData.error || res.statusText}` };
            }

            const games = (await res.json()) as GameType[];

            if (!Array.isArray(games)) {
                console.error("search_games tool: unexpected response shape", games);
                return { error: "Search returned an unexpected response." };
            }

            // Necessary Info
            return games.slice(0, 5).map((g: GameType) => ({
                title: g.title,
                price: g.price,
                platforms: g.platforms,
                stock: g.stock,
            }));
        }

        case "check_my_orders": {
            if (!context.buyerId) {
                return { error: "User is not logged in, cannot fetch orders." };
            }
            const res = await fetch(`${BACKEND_URL}/api/orders?buyerId=${context.buyerId}`);
            const orders = (await res.json()) as Order[];
            return Array.isArray(orders)
                ? orders.map((o: Order) => ({
                    gameTitle: o.gameTitle,
                    status: o.status,
                    quantity: o.quantity,
                    price: o.price,
                }))
                : [];
        }

        case "browse_games": {
            const res = await fetch(`${BACKEND_URL}/api/games`);

            if (!res.ok) {
                console.error("browse_games tool: backend returned error", res.status);
                return { error: "Could not fetch the game catalog." };
            }

            let games = (await res.json()) as GameType[];

            // 🔎 filter
            if (args.category) {
                const cat = String(args.category).toLowerCase();
                games = games.filter((g) => g.category?.toLowerCase().includes(cat));
            }
            if (args.platform) {
                const plat = String(args.platform).toLowerCase();
                games = games.filter((g) => g.platforms?.some((p) => p.toLowerCase().includes(plat)));
            }
            if (args.maxPrice !== undefined) {
                const max = Number(args.maxPrice);
                games = games.filter((g) => g.price <= max);
            }

            // ↕ sort
            if (args.sortBy === "price_asc") {
                games = [...games].sort((a, b) => a.price - b.price);
            } else if (args.sortBy === "price_desc") {
                games = [...games].sort((a, b) => b.price - a.price);
            }

            const limit = args.limit ? Number(args.limit) : 5;

            return games.slice(0, limit).map((g: GameType) => ({
                title: g.title,
                price: g.price,
                category: g.category,
                platforms: g.platforms,
                stock: g.stock,
            }));
        }

        default:
            return { error: `Unknown tool: ${toolName}` };
    }
}