// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


import Link from "next/link";
import { HiLightningBolt } from "react-icons/hi";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-obsidian py-20 px-6 sm:px-16">

      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />

      {/* Hero Section Wrapper */}
      <div className="w-full max-w-5xl flex flex-col items-start text-left space-y-8 z-10">

        {/* Badge: New Drops */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-carbon/50 text-gold text-sm font-medium tracking-wide">
          <HiLightningBolt className="text-gold animate-pulse" />
          <span>New AAA drops this week</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-ivory max-w-4xl leading-[1.1]">
          Genuine game CDs for every rig, <br />
          <span className="text-cyan">every era</span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-2xl text-lg sm:text-xl text-fog leading-relaxed">
          PS2 through PS5, Xbox and PC — new releases and retro classics, verified and ready to ship.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/catalog"
            className="px-8 py-3.5 bg-cyan text-obsidian font-bold rounded-lg hover:bg-cyan-dark transition-all duration-300 shadow-lg shadow-cyan/20 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Shop bestsellers
          </Link>
          <Link
            href="/catalog?platform=ps5"
            className="px-8 py-3.5 border-2 border-cyan text-cyan font-bold rounded-lg hover:bg-cyan/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore PS5 titles
          </Link>
        </div>

        {/* Platform Tags */}
        <div className="flex flex-wrap gap-3 pt-6">
          <span className="px-4 py-1.5 bg-cyan text-obsidian text-xs font-black rounded uppercase tracking-wider">
            PS5
          </span>
          <span className="px-4 py-1.5 bg-gold text-obsidian text-xs font-black rounded uppercase tracking-wider">
            Xbox Series X
          </span>
          <span className="px-4 py-1.5 bg-crimson text-ivory text-xs font-black rounded uppercase tracking-wider">
            PC premium
          </span>
        </div>

      </div>
    </div>
  );
}
