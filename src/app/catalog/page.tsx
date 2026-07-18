
// import { getGames } from "@/lib/api";
// import { GameType } from "@/types/game";
// import GameCard from "@/components/games/GameCard";

// export const revalidate = 0;

// // SearchParams
// interface PageProps {
//     searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
// }

// //  (= {}) 
// export default async function CatalogPage({ searchParams }: PageProps = {}) {

//     // searchParams 
//     const resolvedParams = searchParams ? await searchParams : {};
//     const filterParam = resolvedParams?.filter;

//     let allGames: GameType[] = [];

//     try {
//         allGames = await getGames({});
//     } catch (error) {
//         console.error("Failed to load catalog games:", error);
//     }

//     // Dynamic Filtering
//     const displayedGames = filterParam === "bestsellers"
//         ? allGames.filter((game: GameType) => game.isPopular)
//         : allGames;

//     return (
//         <div className="w-full bg-obsidian text-ivory min-h-screen py-12 px-4 sm:px-8">
//             {/* Page Header */}
//             <div className="max-w-7xl mx-auto mb-12 border-b border-gray-850 pb-6">
//                 <h1 className="text-4xl font-extrabold tracking-tight uppercase">
//                     THE GAMING {filterParam === "bestsellers" ? <span className="text-gold">VAULT (BESTSELLERS)</span> : <span className="text-cyan">VAULT</span>} 🏛️
//                 </h1>
//                 <p className="text-fog text-sm mt-2">
//                     {filterParam === "bestsellers"
//                         ? `Showing our top trending premium titles. Total ${displayedGames.length} bestsellers found.`
//                         : `Browse through our complete collection of verified physical game CDs. Total ${displayedGames.length} titles available.`}
//                 </p>
//             </div>

//             {/* Main Content Area */}
//             <div className="max-w-7xl mx-auto">
//                 {displayedGames.length === 0 ? (
//                     <div className="text-center py-20 bg-carbon rounded-xl border border-gray-800">
//                         <p className="text-fog text-lg">No games matching your selection in the vault right now.</p>
//                     </div>
//                 ) : (
//                     /* Game Grid */
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {displayedGames.map((game: GameType) => (
//                             <GameCard key={game._id} game={game} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

//2
import { getGames } from "@/lib/api";
import { GameType } from "@/types/game";
import GameCard from "@/components/games/GameCard";

export const revalidate = 0;

// SearchParams Interface
interface PageProps {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: PageProps = {}) {

    // searchParams রিজলভ করা হচ্ছে
    const resolvedParams = searchParams ? await searchParams : {};
    const filterParam = resolvedParams?.filter;
    const searchParam = resolvedParams?.search; // 🆕 ইউআরএল এর ?search=... কুয়েরি রিড করা হলো

    let allGames: GameType[] = [];

    try {
        // যদি getGames এপিআই সরাসরি অবজেক্ট কুয়েরি নেয়, তবে এভাবে কাজ করবে
        // অথবা সব ডেটা এনে আমরা নিচে ফিল্টার করছি
        allGames = await getGames({});
    } catch (error) {
        console.error("Failed to load catalog games:", error);
    }

    // 🆕 ১. প্রথম ধাপ: সার্চ প্যারামিটার থাকলে নাম (title) দিয়ে ফিল্টার করা
    let filteredGames = allGames;
    if (searchParam && typeof searchParam === "string") {
        const searchOrder = searchParam.toLowerCase();
        filteredGames = allGames.filter((game: GameType) =>
            game.title.toLowerCase().includes(searchOrder)
        );
    }

    // ২. দ্বিতীয় ধাপ: বেস্টসেলার ফিল্টার অ্যাপ্লাই করা
    const displayedGames = filterParam === "bestsellers"
        ? filteredGames.filter((game: GameType) => game.isPopular)
        : filteredGames;

    return (
        <div className="w-full bg-obsidian text-ivory min-h-screen py-12 px-4 sm:px-8">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-12 border-b border-gray-850 pb-6">
                <h1 className="text-4xl font-extrabold tracking-tight uppercase">
                    THE GAMING {filterParam === "bestsellers" ? <span className="text-gold">VAULT (BESTGAMES)</span> : <span className="text-cyan">VAULT</span>} 🏛️
                </h1>

                {/* 🆕 সার্চ রেজাল্ট টেক্সট নোটিফিকেশন */}
                {searchParam && (
                    <p className="text-sm mt-3 text-cyan">
                        Showing results for search: <span className="italic font-bold">&quot;{searchParam}&quot;</span>
                    </p>
                )}

                <p className="text-fog text-sm mt-2">
                    {filterParam === "bestsellers"
                        ? `Showing our top trending premium Games. Total ${displayedGames.length} bestgames found.`
                        : `Browse through our complete collection of verified physical game CDs. Total ${displayedGames.length} games available.`}
                </p>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto">
                {displayedGames.length === 0 ? (
                    <div className="text-center py-20 bg-carbon rounded-xl border border-gray-800">
                        {/* 🆕 সার্চ অনুযায়ী মেসেজ পরিবর্তন */}
                        <p className="text-fog text-lg">
                            {searchParam
                                ? `No games matching "${searchParam}" found in the vault.`
                                : "No games matching your selection in the vault right now."}
                        </p>
                    </div>
                ) : (
                    /* Game Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedGames.map((game: GameType) => (
                            <GameCard key={game._id} game={game} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}