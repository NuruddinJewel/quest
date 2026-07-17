import { getGames } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function AllGamesPage() {
    // All games
    const allGames = await getGames();

    return (
        <div className="bg-obsidian min-h-screen text-ivory py-16 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">
                            THE GAMING <span className="text-cyan">VAULT</span>
                        </h1>
                        <p className="text-fog text-sm mt-2">Explore our complete collection of genuine physical CDs.</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-4 md:mt-0 bg-carbon border border-gray-800 px-4 py-2 rounded-lg">
                        Showing {allGames.length} Premium Titles
                    </div>
                </div>

                {/* All Games Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allGames.map((game) => (
                        <div key={game._id} className="bg-carbon border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:border-cyan/50 transition-all flex flex-col group">
                            {/* Image */}
                            <div className="h-52 bg-gray-900 overflow-hidden relative">
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold truncate text-ivory mb-1">{game.title}</h3>
                                    <p className="text-xs text-cyan/80 font-semibold uppercase tracking-wider mb-3">{game.category}</p>

                                    {/* Platforms */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {game.platforms.map((p: string) => (
                                            <span key={p} className="text-[10px] bg-obsidian text-fog px-2 py-0.5 rounded border border-gray-800 font-medium">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800/50">
                                    <span className="text-xl font-black text-ivory">${game.price}</span>
                                    <Link href={`/game/${game._id}`} className="px-4 py-2 bg-cyan text-obsidian text-xs font-bold rounded-lg hover:bg-cyan-dark transition-all">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}