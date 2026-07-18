"use client";

import { motion } from "framer-motion";
import GameCard from "@/components/games/GameCard";
import { GameType } from "@/types/game";

export default function MotionGrid({ popularGames }: { popularGames: GameType[] }) {
  // 4 games double loop
  const duplicatedGames = [...popularGames, ...popularGames];

  return (
    <div className="w-full overflow-hidden relative py-4 mask-gradient group/marquee">
      {/* Game Card Container */}
      <motion.div
        className="flex gap-6 w-max transition-all duration-300 [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedGames.map((game: GameType, index) => (
          <div
            key={`${game._id}-${index}`}
            className="w-[280px] sm:w-[320px] flex-shrink-0"
          >
            <GameCard game={game} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}