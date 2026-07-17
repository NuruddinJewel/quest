import { getGames } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { HiLightningBolt } from "react-icons/hi";

export default async function Home() {
  // Dynamic Data from backend
  const popularGames = await getGames({ popular: true });
  console.log("Fetched Games from Backend:", popularGames)

  return (
    <div className="w-full bg-obsidian text-ivory min-h-screen">

      {/*  Hero Section */}
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

          <div className="flex flex-wrap gap-3 pt-6">
            <span className="px-4 py-1.5 bg-cyan text-obsidian text-xs font-black rounded uppercase tracking-wider">PS5</span>
            <span className="px-4 py-1.5 bg-gold text-obsidian text-xs font-black rounded uppercase tracking-wider">Xbox Series X</span>
            <span className="px-4 py-1.5 bg-crimson text-ivory text-xs font-black rounded uppercase tracking-wider">PC premium</span>
          </div>
        </div>
      </div>

      {/* Dynamic Game Section (MongoDB Data) */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
          POPULAR <span className="text-cyan">GAMES</span> 🎮
        </h2>
        <p className="text-fog mb-8 text-sm">Top trending premium gaming CDs currently in our vault.</p>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularGames.map((game) => (
            <div key={game._id} className="bg-carbon border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:border-cyan/50 transition-all flex flex-col group">
              {/* Game Image */}
              {/* <div className="h-52 bg-gray-900 overflow-hidden relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div> */}
              <div className="h-52 bg-gray-900 overflow-hidden relative">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Game Details */}
              <div className="flex flex-wrap gap-1 mb-4">
                {game.platforms.map((p: string) => (
                  <span key={p} className="text-[10px] bg-obsidian text-fog px-2 py-0.5 rounded border border-gray-800 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

