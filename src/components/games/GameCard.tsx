import Image from "next/image";
import Link from "next/link";
import { GameType } from "@/types/game";
export default function GameCard({ game }: { game: GameType }) {
    return (
        <div className="bg-carbon border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:border-cyan/50 transition-all flex flex-col group">
            <div className="h-52 bg-gray-900 overflow-hidden relative">
                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold truncate text-ivory mb-1">{game.title}</h3>
                    <p className="text-xs text-cyan/80 font-semibold uppercase tracking-wider mb-3">{game.category || "Gaming CD"}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                        {game.platforms?.map((p: string) => (
                            <span key={p} className="text-[10px] bg-obsidian text-fog px-2 py-0.5 rounded border border-gray-800 font-medium">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800/50">
                    <span className="text-xl font-black text-ivory">${game.price}</span>
                    <Link href={`/game/${game._id}`} className="px-4 py-2 bg-cyan text-obsidian text-xs font-bold rounded-lg hover:bg-cyan/80 transition-all">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}