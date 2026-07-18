// import { getGames } from "@/lib/api";
// import Link from "next/link";
// import { HiLightningBolt } from "react-icons/hi";
// import GameCard from "@/components/games/GameCard";
// import StatsTracker from "@/components/home/StatsTracker";
// import Testimonials from "@/components/home/Testimonials";
// import FAQSection from "@/components/home/FAQSection";
// import { GameType } from "@/types/game";
// import MotionGrid from "@/components/games/MotionGrid";

// export default async function Home() {
//   // Data Fetch from backend
//   const allGames = await getGames({ popular: true });

//   //  Game data
//   const popularGames = allGames.slice(0, 4);

//   return (
//     <div className="w-full bg-obsidian text-ivory min-h-screen">

//       {/* Hero Section */}
//       <div className="w-full flex flex-col items-center justify-center relative overflow-hidden py-20 px-6 sm:px-16 border-b border-gray-950">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />

//         <div className="w-full max-w-5xl flex flex-col items-start text-left space-y-8 z-10">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-carbon/50 text-gold text-sm font-medium tracking-wide">
//             <HiLightningBolt className="text-gold animate-pulse" />
//             <span>New AAA drops this week</span>
//           </div>

//           <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
//             Genuine game CDs for every rig, <br />
//             <span className="text-cyan">every era</span>
//           </h1>

//           <p className="max-w-2xl text-lg sm:text-xl text-fog leading-relaxed">
//             PS2 through PS5, Xbox and PC — new releases and retro classics, verified and ready to ship.
//           </p>

//           <div className="flex flex-wrap gap-4 pt-4">
//             <Link href="/catalog" className="px-8 py-3.5 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all duration-300 shadow-lg shadow-cyan/20 transform hover:-translate-y-0.5">
//               Shop bestsellers
//             </Link>
//             <Link href="/catalog?platform=ps5" className="px-8 py-3.5 border-2 border-cyan text-cyan font-bold rounded-lg hover:bg-cyan/10 transition-all duration-300 transform hover:-translate-y-0.5">
//               Explore PS5 titles
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Dynamic Game Section */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="flex justify-between items-end mb-8">
//           <div>
//             <h2 className="text-3xl font-extrabold tracking-tight">
//               POPULAR <span className="text-cyan">GAMES</span> 🎮
//             </h2>
//             <p className="text-fog text-sm mt-1">Top trending premium gaming CDs currently in our vault.</p>
//           </div>
//           <Link href="/catalog" className="text-cyan text-sm font-bold hover:underline">
//             View All Games &rarr;
//           </Link>
//         </div>

//         {/* Game Grid - Render limited 4 cards */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {popularGames.map((game: GameType) => (
//             <GameCard key={game._id} game={game} />
//           ))}
//         </div> */}
//         <MotionGrid popularGames={popularGames} />
//       </div>

//       {/* Additional Sections matching previous layout */}
//       <StatsTracker />
//       <Testimonials />
//       <FAQSection />

//     </div>
//   );
// }

//2

import { getGames } from "@/lib/api";
import Link from "next/link";
import { HiLightningBolt } from "react-icons/hi";
import { IoSparklesOutline } from "react-icons/io5";
import GameCard from "@/components/games/GameCard";
import StatsTracker from "@/components/home/StatsTracker";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import MotionGrid from "@/components/games/MotionGrid";
import { GameType } from "@/types/game";

export default async function Home() {
  // Backend Game
  const allGames = await getGames();

  // Popular Games
  const popularGames = allGames.filter((game: GameType) => game.isPopular).slice(0, 4);

  // Featured Games
  const featuredGames = allGames.filter((game: GameType) => game.isFeatured).slice(0, 4);

  return (
    <div className="w-full bg-obsidian text-ivory min-h-screen">

      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center relative overflow-hidden py-20 px-6 sm:px-16 border-b border-gray-950">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-5xl flex flex-col items-start text-left space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-carbon/50 text-gold text-sm font-medium tracking-wide">
            <HiLightningBolt className="text-gold animate-pulse" />
            <span>New AAA drops this week</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
            Genuine game CDs for every rig, <br />
            <span className="text-cyan">every era</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-fog leading-relaxed">
            PS2 through PS5, Xbox and PC — new releases and retro classics, verified and ready to ship.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/catalog" className="px-8 py-3.5 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all duration-300 shadow-lg shadow-cyan/20 transform hover:-translate-y-0.5">
              Shop bestsellers
            </Link>
            <Link href="/catalog?platform=ps5" className="px-8 py-3.5 border-2 border-cyan text-cyan font-bold rounded-lg hover:bg-cyan/10 transition-all duration-300 transform hover:-translate-y-0.5">
              Explore PS5 titles
            </Link>
          </div>
        </div>
      </div>

      {/* POPULAR GAMES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              POPULAR <span className="text-cyan">GAMES</span> 🎮
            </h2>
            <p className="text-fog text-sm mt-1">Top trending premium gaming CDs currently in our vault.</p>
          </div>
          <Link href="/catalog?filter=bestsellers" className="text-cyan text-sm font-bold hover:underline">
            View All Bestsellers &rarr;
          </Link>
        </div>

        <MotionGrid popularGames={popularGames} />
      </div>

      {/* Stats Tracker Section */}
      <StatsTracker totalTitles={allGames.length} />

      {/* FEATURED TITLES SECTION  */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-900/50">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              FEATURED <span className="text-gold">Games</span> <IoSparklesOutline className="text-gold" />
            </h2>
            <p className="text-fog text-sm mt-1">Handpicked masterworks you absolutely cannot miss.</p>
          </div>
          <Link href="/catalog" className="text-cyan text-sm font-bold hover:underline">
            Explore Full Catalog &rarr;
          </Link>
        </div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredGames.map((game: GameType) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>

      {/* Additional Sections */}
      <Testimonials />
      <FAQSection />

    </div>
  );
}
