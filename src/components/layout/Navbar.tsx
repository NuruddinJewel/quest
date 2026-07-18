"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
// import { useCart } from "@/hooks/useCart"; // assuming cart hook handles items length
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineBell } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    // const { cart } = useCart(); // Cart item counts

    // const handleSignOut = async () => {
    //     await authClient.signOut({
    //         callbackURL: "/login",
    //     });
    // };


    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Successfully logged out. Bye! 👋", {
                            theme: "dark",
                            icon: <span>🚪</span>
                        });
                    },
                    onError: () => {
                        toast.error("Logout failed. Try again.", { theme: "dark" });
                    },
                    query: {
                        callbackURL: "/login",
                    },
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Catalog", href: "/catalog" },
        { name: "Top sellers", href: "/catalog?filter=bestsellers" },
        // { name: "Insights", href: "/admin/analytics" }, // Adjust based on requirement
    ];

    return (
        <nav className="w-full bg-obsidian border-b border-gray-900 sticky top-0 z-50 px-6 py-4 sm:px-16 flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 text-ivory hover:text-cyan transition-colors">
                <IoGameControllerOutline className="text-3xl text-cyan" />
                <span className="text-xl font-black tracking-wider font-display">Gaming Oasis</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${isActive ? "text-cyan" : "text-fog hover:text-ivory"
                                }`}
                        >
                            {link.name}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Right Side Icons & Auth State */}
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Search Icon */}
                <button className="text-xl text-fog hover:text-cyan transition-colors cursor-pointer">
                    <HiOutlineSearch />
                </button>

                {/* Notifications Icon */}
                <button className="text-xl text-fog hover:text-cyan transition-colors relative cursor-pointer">
                    <HiOutlineBell />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-crimson rounded-full" />
                </button>

                {/* Cart Icon */}
                {/* <Link href="/cart" className="text-xl text-fog hover:text-cyan transition-colors relative p-1">
                    <HiOutlineShoppingBag />
                    {cart && cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-cyan text-obsidian text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    )}
                </Link> */}

                {/* User Session / Auth Action */}
                <div className="flex items-center border-l border-gray-800 pl-4 sm:pl-6">
                    {isPending ? (
                        <div className="w-8 h-8 rounded-full bg-carbon animate-pulse" />
                    ) : session?.user ? (
                        /* User Dropdown Menu (DaisyUI Dropdown) */
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center font-bold text-ivory uppercase cursor-pointer ring-2 ring-crimson/50 hover:ring-cyan transition-all">
                                {session.user.name ? session.user.name[0] : "U"}
                            </div>
                            {/* <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-carbon border border-gray-800 rounded-xl w-52 mt-4 text-sm text-fog z-[60]">
                                <li className="px-4 py-2 border-b border-gray-800 text-ivory font-medium">
                                    <p className="truncate max-w-full">{session.user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                </li>
                                <li><Link href="/dashboard" className="hover:text-cyan py-2.5">My Dashboard</Link></li>
                                <li><Link href="/dashboard/orders" className="hover:text-cyan py-2.5">My Orders</Link></li> */}
                            {/* Optional Admin Link checking roles */}
                            {/* <li><Link href="/admin" className="hover:text-gold py-2.5">Admin Panel</Link></li>
                            <li className="border-t border-gray-800 mt-1">
                                <button onClick={handleSignOut} className="hover:text-crimson py-2.5 text-left w-full">
                                    Log Out
                                </button>
                            </li> */}
                            {/* </ul> */}
                            {/* //2 */}
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-carbon border border-gray-800 rounded-xl w-52 mt-4 text-sm text-fog z-[60]">
                                <li className="px-4 py-2 border-b border-gray-800 text-ivory font-medium">
                                    <p className="truncate max-w-full">{session.user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                </li>
                                <li><Link href="/dashboard" className="hover:text-cyan py-2.5">My Dashboard</Link></li>
                                <li><Link href="/dashboard/orders" className="hover:text-cyan py-2.5">My Orders</Link></li>

                                {/* \For Admin Role */}
                                {session.user.role === "admin" && (
                                    <li><Link href="/admin" className="hover:text-gold py-2.5 font-bold text-gold">Admin Panel</Link></li>
                                )}

                                <li className="border-t border-gray-800 mt-1">
                                    <button onClick={handleSignOut} className="hover:text-crimson py-2.5 text-left w-full">
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* Login Action Button if no Session */
                        <Link
                            href="/login"
                            className="px-4 py-1.5 bg-transparent border border-cyan text-cyan text-xs font-bold rounded hover:bg-cyan/10 transition-all uppercase tracking-wider"
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </nav >
    );
}