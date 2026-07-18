"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HiOutlineChartBar,
    HiOutlineClipboardDocumentCheck,
    HiOutlineRectangleStack,
    HiOutlineUsers,
    HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
    { label: "Overview", href: "/admin", icon: HiOutlineChartBar },
    { label: "Order Approval", href: "/admin/orders", icon: HiOutlineClipboardDocumentCheck },
    { label: "Manage Games", href: "/admin/games", icon: HiOutlineRectangleStack },
    { label: "Buyers & Users", href: "/admin/users", icon: HiOutlineUsers },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/login"),
            },
        });
    };

    return (
        <aside className="w-64 shrink-0 min-h-screen bg-carbon border-r border-gray-800 flex flex-col">
            <div className="px-6 py-6 border-b border-gray-800">
                <p className="text-xs font-mono text-cyan uppercase tracking-widest">Control Center</p>
                <h1 className="text-lg font-black text-ivory mt-1">Gaming Oasis</h1>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                ${isActive
                                    ? "bg-cyan/10 text-cyan border border-cyan/30"
                                    : "text-fog hover:bg-obsidian hover:text-ivory border border-transparent"
                                }`}
                        >
                            <Icon className="text-lg" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="px-3 py-6 border-t border-gray-800">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                >
                    <HiOutlineArrowLeftOnRectangle className="text-lg" />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}