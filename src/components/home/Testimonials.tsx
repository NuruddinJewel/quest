export default function Testimonials() {
    const reviews = [
        { id: 1, name: "Steve Henry", role: "PS5 Collector", text: "Got my original Silent Hill disc in pristine condition! Proper bubble wrap." },
        { id: 2, name: "Larry Jane", role: "PC Retro Gamer", text: "The Steam activation key inside the physical box worked flawlessly. Highly recommended!" }
    ];

    return (
        <section className="py-16 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-center text-ivory mb-10">
                LOVED BY <span className="text-crimson">GAMERS</span> 🕹️
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((r) => (
                    <div key={r.id} className="bg-carbon border border-gray-800 p-6 rounded-xl">
                        <p className="text-fog italic text-sm mb-4">&quot;{r.text}&quot;</p>
                        <h4 className="text-ivory font-bold text-sm">{r.name}</h4>
                        <span className="text-xs text-cyan">{r.role}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}