// import { IconType } from "react-icons";

// interface StatCardProps {
//     label: string;
//     value: string;
//     icon: IconType;
//     accent?: "cyan" | "gold" | "crimson" | "emerald";
// }

// const ACCENT_STYLES: Record<string, { border: string; text: string; iconBg: string }> = {
//     cyan: { border: "border-cyan/20", text: "text-cyan", iconBg: "bg-cyan/10" },
//     gold: { border: "border-gold/20", text: "text-gold", iconBg: "bg-gold/10" },
//     crimson: { border: "border-crimson/20", text: "text-crimson", iconBg: "bg-crimson/10" },
//     emerald: { border: "border-emerald-500/20", text: "text-emerald-400", iconBg: "bg-emerald-500/10" },
// };

// export default function StatCard({ label, value, icon: Icon, accent = "cyan" }: StatCardProps) {
//     const styles = ACCENT_STYLES[accent];

//     return (
//         <div className={`bg-carbon border ${styles.border} p-5 rounded-xl flex items-center justify-between`}>
//             <div>
//                 <p className="text-xs font-mono text-fog uppercase tracking-wider">{label}</p>
//                 <p className={`text-2xl font-black mt-1 ${styles.text}`}>{value}</p>
//             </div>
//             <div className={`w-11 h-11 rounded-lg ${styles.iconBg} flex items-center justify-center ${styles.text} text-xl`}>
//                 <Icon />
//             </div>
//         </div>
//     );
// }

import { IconType } from "react-icons";

interface StatCardProps {
    label: string;
    value: string;
    icon: IconType;
    accent?: "cyan" | "gold" | "crimson" | "emerald";
}

const ACCENT_STYLES: Record<string, { border: string; text: string; iconBg: string }> = {
    cyan: { border: "border-cyan/20", text: "text-cyan", iconBg: "bg-cyan/10" },
    gold: { border: "border-gold/20", text: "text-gold", iconBg: "bg-gold/10" },
    crimson: { border: "border-crimson/20", text: "text-crimson", iconBg: "bg-crimson/10" },
    emerald: { border: "border-emerald-500/20", text: "text-emerald-400", iconBg: "bg-emerald-500/10" },
};

export default function StatCard({ label, value, icon: Icon, accent = "cyan" }: StatCardProps) {
    const styles = ACCENT_STYLES[accent];

    return (
        <div className={`bg-carbon border ${styles.border} p-5 rounded-xl flex items-center justify-between`}>
            <div>
                <p className="text-xs font-mono text-fog uppercase tracking-wider">{label}</p>
                <p className={`text-2xl font-black mt-1 ${styles.text}`}>{value}</p>
            </div>
            <div className={`w-11 h-11 rounded-lg ${styles.iconBg} flex items-center justify-center ${styles.text} text-xl`}>
                <Icon />
            </div>
        </div>
    );
}