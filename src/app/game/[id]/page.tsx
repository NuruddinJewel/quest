// import { getGameById } from "@/lib/api";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { HiOutlineShoppingBag, HiCreditCard } from "react-icons/hi";

// interface GameDetailProps {
//     params: Promise<{ id: string }>;
// }

// export default async function GameDetailPage({ params }: GameDetailProps) {
//     const resolvedParams = await params;
//     const game = await getGameById(resolvedParams.id);

//     // If game not found
//     if (!game) {
//         notFound();
//     }

//     return (
//         <div className="bg-obsidian min-h-screen text-ivory py-16 px-4 sm:px-8">
//             <div className="max-w-6xl mx-auto bg-carbon border border-gray-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 relative">

//                 {/* Decorative Background Glow */}
//                 <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan/5 blur-[80px] pointer-events-none" />

//                 {/* Left Side: Game Image */}
//                 <div className="h-[350px] md:h-[450px] w-full bg-gray-900 rounded-xl overflow-hidden relative border border-gray-800">
//                     <Image
//                         src={game.image}
//                         alt={game.title}
//                         fill
//                         priority
//                         className="object-cover"
//                     />
//                 </div>

//                 {/* Right Side: Game Information */}
//                 <div className="flex flex-col justify-between space-y-6">
//                     <div>
//                         <span className="px-3 py-1 bg-cyan/10 text-cyan text-xs font-bold uppercase tracking-widest rounded-full border border-cyan/20">
//                             {game.category}
//                         </span>
//                         <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-ivory">
//                             {game.title}
//                         </h1>

//                         {/* Price tag */}
//                         <div className="mt-4 flex items-baseline gap-2">
//                             <span className="text-4xl font-black text-cyan">${game.price}</span>
//                             <span className="text-xs text-gray-500 uppercase font-semibold">Verified CD Stock</span>
//                         </div>

//                         <p className="text-fog mt-6 leading-relaxed">
//                             Experience this premium title on your favorite platform. Physical CD delivery includes original box art, game manual, and verified disc keys ready for activation.
//                         </p>

//                         {/* Platforms Info */}
//                         <div className="mt-6">
//                             <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Available Platforms:</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {game.platforms.map((p: string) => (
//                                     <span key={p} className="px-3 py-1 bg-obsidian border border-gray-800 rounded text-xs text-fog font-medium">
//                                         {p}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Stock status */}
//                         <div className="mt-4 text-xs">
//                             {game.stock > 0 ? (
//                                 <p className="text-emerald-400 font-medium">● In Stock ({game.stock} items left)</p>
//                             ) : (
//                                 <p className="text-crimson font-medium">● Out of Stock</p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Action Buttons: Add to Cart & Buy Now */}
//                     <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-800/50">
//                         {/* Add to Cart */}
//                         <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-obsidian border border-cyan text-cyan font-bold rounded-xl hover:bg-cyan/10 transition-all cursor-pointer">
//                             <HiOutlineShoppingBag className="text-lg" />
//                             <span>Add to Cart</span>
//                         </button>

//                         {/* Buy Now */}
//                         <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-cyan text-obsidian font-bold rounded-xl hover:bg-cyan-dark transition-all shadow-lg shadow-cyan/20 cursor-pointer">
//                             <HiCreditCard className="text-lg" />
//                             <span>Buy Now</span>
//                         </button>
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// }

import { getGameById } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import GameActionButtons from "@/components/games/GameActionButtons";

interface GameDetailProps {
    params: Promise<{ id: string }>;
}

export default async function GameDetailPage({ params }: GameDetailProps) {
    const resolvedParams = await params;
    const game = await getGameById(resolvedParams.id);

    if (!game) {
        notFound();
    }

    return (
        <div className="bg-obsidian min-h-screen text-ivory py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto bg-carbon border border-gray-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 relative">

                {/* Decorative Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan/5 blur-[80px] pointer-events-none" />

                {/* Left Side: Game Image */}
                <div className="h-[350px] md:h-[450px] w-full bg-gray-900 rounded-xl overflow-hidden relative border border-gray-800">
                    <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Right Side: Game Information */}
                <div className="flex flex-col justify-between space-y-6">
                    <div>
                        <span className="px-3 py-1 bg-cyan/10 text-cyan text-xs font-bold uppercase tracking-widest rounded-full border border-cyan/20">
                            {game.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-ivory">
                            {game.title}
                        </h1>

                        {/* Price tag */}
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-cyan">${game.price}</span>
                            <span className="text-xs text-gray-500 uppercase font-semibold">Verified CD Stock</span>
                        </div>

                        <p className="text-fog mt-6 leading-relaxed">
                            Experience this premium title on your favorite platform. Physical CD delivery includes original box art, game manual, and verified disc keys ready for activation.
                        </p>

                        {/* Platforms Info */}
                        <div className="mt-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Available Platforms:</h3>
                            <div className="flex flex-wrap gap-2">
                                {game.platforms.map((p: string) => (
                                    <span key={p} className="px-3 py-1 bg-obsidian border border-gray-800 rounded text-xs text-fog font-medium">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stock status */}
                        <div className="mt-4 text-xs">
                            {game.stock > 0 ? (
                                <p className="text-emerald-400 font-medium">● In Stock ({game.stock} items left)</p>
                            ) : (
                                <p className="text-crimson font-medium">● Out of Stock</p>
                            )}
                        </div>
                    </div>

                    {/* Buy Button */}
                    <GameActionButtons game={game} />

                </div>
            </div>
        </div>
    );
}