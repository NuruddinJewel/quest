import { GameType } from "@/types/game";

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
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    try {
        const res = await fetch(`${BACKEND_URL}/api/games/${id}`, { cache: "no-store" });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch game details:", error);
        return null;
    }
}