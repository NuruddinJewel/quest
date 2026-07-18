// export default function StatsTracker() {
//     return (
//         <section className="bg-carbon/50 border-y border-gray-950 py-12 px-4">
//             <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//                 <div>
//                     <h3 className="text-3xl md:text-4xl font-black text-cyan">10K+</h3>
//                     <p className="text-fog text-xs uppercase tracking-widest mt-1">Discs Shipped</p>
//                 </div>
//                 <div>
//                     <h3 className="text-3xl md:text-4xl font-black text-gold">99.4%</h3>
//                     <p className="text-fog text-xs uppercase tracking-widest mt-1">Verification Rate</p>
//                 </div>
//                 <div>
//                     <h3 className="text-3xl md:text-4xl font-black text-crimson">24/7</h3>
//                     <p className="text-fog text-xs uppercase tracking-widest mt-1">Gamer Support</p>
//                 </div>
//                 <div>
//                     <h3 className="text-3xl md:text-4xl font-black text-ivory">500+</h3>
//                     <p className="text-fog text-xs uppercase tracking-widest mt-1">Retro & AAA Titles</p>
//                 </div>
//             </div>
//         </section>
//     );
// }

//2

interface StatsTrackerProps {
    totalTitles?: number;
    discsShipped?: number;
}

export default function StatsTracker({ totalTitles = 500, discsShipped = 10000 }: StatsTrackerProps) {
    return (
        <section className="bg-carbon/50 border-y border-gray-950 py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {/* Disc Ship Counter */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-black text-cyan">
                        {discsShipped >= 10000 ? "10K+" : discsShipped}
                    </h3>
                    <p className="text-fog text-xs uppercase tracking-widest mt-1">Discs Shipped</p>
                </div>

                {/* Verification */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-black text-gold">99.4%</h3>
                    <p className="text-fog text-xs uppercase tracking-widest mt-1">Verification Rate</p>
                </div>

                {/* Gamer Support */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-black text-crimson">24/7</h3>
                    <p className="text-fog text-xs uppercase tracking-widest mt-1">Gamer Support</p>
                </div>

                {/* Total Games */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-black text-ivory">
                        {totalTitles}+
                    </h3>
                    <p className="text-fog text-xs uppercase tracking-widest mt-1">Retro & AAA Titles</p>
                </div>
            </div>
        </section>
    );
}