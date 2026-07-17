import { getGames } from "@/lib/api";
import { GameType } from "@/types/game";
import GameCard from "@/components/games/GameCard";

// Next.js dynamic rendering 
export const revalidate = 0;

export default async function CatalogPage() {
    // All games
    let allGames: GameType[] = [];

    try {
        allGames = await getGames({});
    } catch (error) {
        console.error("Failed to load catalog games:", error);
    }

    return (
        <div className="w-full bg-obsidian text-ivory min-h-screen py-12 px-4 sm:px-8">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-12 border-b border-gray-850 pb-6">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    THE GAMING <span className="text-cyan">VAULT</span> 🏛️
                </h1>
                <p className="text-fog text-sm mt-2">
                    Browse through our complete collection of verified physical game CDs. Total {allGames.length} titles available.
                </p>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto">
                {allGames.length === 0 ? (
                    <div className="text-center py-20 bg-carbon rounded-xl border border-gray-800">
                        <p className="text-fog text-lg">No games found in the vault right now.</p>
                    </div>
                ) : (
                    /* Game Grid - Rendering all 14+ games cleanly */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allGames.map((game: GameType) => (
                            <GameCard key={game._id} game={game} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}