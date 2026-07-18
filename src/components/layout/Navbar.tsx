// (Search Functionality  (enter))

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation"; // 🆕 useRouter ইমপোর্ট করা হলো
// import { authClient } from "@/lib/auth-client";
// // import { HiOutlineSearch, HiX } from "react-icons/x"; // 🆕 ক্লোজ আইকনের জন্য HiX আনা হলো
// // import { HiOutlineShoppingBag } from "react-icons/hi";
// import { IoGameControllerOutline } from "react-icons/io5";
// import { toast } from "react-toastify";
// import React, { useState } from "react";
// import { HiOutlineSearch } from "react-icons/hi";

// export default function Navbar() {
//     const pathname = usePathname();
//     const router = useRouter(); // 🆕 রাউটার ইনিশিয়েট করা হলো
//     const { data: session, isPending } = authClient.useSession();

//     const [showSearch, setShowSearch] = useState(false);
//     const [searchQuery, setSearchQuery] = useState(""); // 🆕 সার্চ টেক্সট ট্র্যাক করার জন্য স্টেট

//     const handleSignOut = async () => {
//         try {
//             await authClient.signOut({
//                 fetchOptions: {
//                     onSuccess: () => {
//                         toast.success("Successfully logged out. Bye! 👋", {
//                             theme: "dark",
//                             icon: <span>🚪</span>
//                         });
//                     },
//                     onError: () => {
//                         toast.error("Logout failed. Try again.", { theme: "dark" });
//                     },
//                     query: {
//                         callbackURL: "/login",
//                     },
//                 },
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     // 🆕 সার্চ সাবমিট হ্যান্ডলার (ইউজার এন্টার চাপলে বা সার্চ বাটনে ক্লিক করলে)
//     const handleSearchSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!searchQuery.trim()) return;

//         // ক্যাটালগ পেজে সার্চ কোয়েরি সহ পুশ করবে
//         router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);

//         // সার্চ বক্স বন্ধ করা এবং ক্লিয়ার করা (ঐচ্ছিক)
//         setShowSearch(false);
//         setSearchQuery("");
//     };

//     const navLinks = [
//         { name: "Home", href: "/" },
//         { name: "Catalog", href: "/catalog" },
//         { name: "Top sellers", href: "/catalog?filter=bestsellers" },
//     ];

//     return (
//         <nav className="w-full bg-obsidian border-b border-gray-900 sticky top-0 z-50 px-6 py-4 sm:px-16 flex items-center justify-between">
//             {/* Brand Logo */}
//             <Link href="/" className="flex items-center gap-2 text-ivory hover:text-cyan transition-colors">
//                 <IoGameControllerOutline className="text-3xl text-cyan" />
//                 <span className="text-xl font-black tracking-wider font-display">Gaming Oasis</span>
//             </Link>

//             {/* Navigation Links */}
//             <div className="hidden md:flex items-center gap-8">
//                 {navLinks.map((link) => {
//                     const isActive = pathname === link.href;
//                     return (
//                         <Link
//                             key={link.name}
//                             href={link.href}
//                             className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${isActive ? "text-cyan" : "text-fog hover:text-ivory"
//                                 }`}
//                         >
//                             {link.name}
//                             {isActive && (
//                                 <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan rounded-full" />
//                             )}
//                         </Link>
//                     );
//                 })}
//             </div>

//             {/* Right Side Icons & Auth State */}
//             <div className="flex items-center gap-4 sm:gap-6">

//                 {/* 🆕 ডাইনামিক সার্চ এরিয়া লজিক */}
//                 {showSearch ? (
//                     <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-carbon border border-gray-800 px-3 py-1.5 rounded-lg animate-fade-in">
//                         <input
//                             type="text"
//                             placeholder="Search games..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="bg-transparent text-sm text-ivory outline-none w-40 sm:w-60 placeholder-gray-505"
//                             autoFocus
//                         />
//                         <button type="submit" className="text-fog hover:text-cyan text-lg">
//                             <HiOutlineSearch />
//                         </button>
//                         <button type="button" onClick={() => setShowSearch(false)} className="text-gray-500 hover:text-crimson text-sm pl-1 border-l border-gray-850">
//                             Cancel
//                         </button>
//                     </form>
//                 ) : (
//                     /* সার্চ আইকন বাটন (যখন সার্চ বক্স বন্ধ থাকবে) */
//                     <button onClick={() => setShowSearch(true)} className="text-xl text-fog hover:text-cyan transition-colors cursor-pointer">
//                         <HiOutlineSearch />
//                     </button>
//                 )}

//                 {/* User Session / Auth Action */}
//                 <div className="flex items-center border-l border-gray-800 pl-4 sm:pl-6">
//                     {isPending ? (
//                         <div className="w-8 h-8 rounded-full bg-carbon animate-pulse" />
//                     ) : session?.user ? (
//                         <div className="dropdown dropdown-end">
//                             <div tabIndex={0} role="button" className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center font-bold text-ivory uppercase cursor-pointer ring-2 ring-crimson/50 hover:ring-cyan transition-all">
//                                 {session.user.name ? session.user.name[0] : "U"}
//                             </div>
//                             <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-carbon border border-gray-800 rounded-xl w-52 mt-4 text-sm text-fog z-[60]">
//                                 <li className="px-4 py-2 border-b border-gray-800 text-ivory font-medium">
//                                     <p className="truncate max-w-full">{session.user.name}</p>
//                                     <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
//                                 </li>
//                                 <li><Link href="/dashboard" className="hover:text-cyan py-2.5">My Dashboard</Link></li>

//                                 {session.user.role === "admin" && (
//                                     <li><Link href="/admin" className="hover:text-gold py-2.5 font-bold text-gold">Admin Panel</Link></li>
//                                 )}

//                                 <li className="border-t border-gray-800 mt-1">
//                                     <button onClick={handleSignOut} className="hover:text-crimson py-2.5 text-left w-full">
//                                         Log Out
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     ) : (
//                         <Link
//                             href="/login"
//                             className="px-4 py-1.5 bg-transparent border border-cyan text-cyan text-xs font-bold rounded hover:bg-cyan/10 transition-all uppercase tracking-wider"
//                         >
//                             Log In
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </nav >
//     );
// }

// Dynamic Search Functionality
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // 🆕 useSearchParams আনা হলো
import { authClient } from "@/lib/auth-client";
import { HiOutlineSearch } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import React, { useState, useEffect, useTransition } from "react"; // 🆕 useEffect ও useTransition আনা হলো

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams(); // 🆕 বর্তমান ইউআরএল এর প্যারামস রিড করার জন্য
    const [isPendingTransition, startTransition] = useTransition(); // 🆕 টাইপিং ল্যাগ দূর করার জন্য transition
    const { data: session, isPending } = authClient.useSession();

    const [showSearch, setShowSearch] = useState(false);

    // 🆕 ইউআরএল এ অলরেডি কোনো সার্চ থাকলে সেটাকে ডিফল্ট ভ্যালু হিসেবে রাখবে
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    // 🆕 ইউজার যখনই টাইপ করবে, এই ফাংশনটি রান হবে
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        // ইউজার যদি ক্যাটালগ পেজে না থাকে, তবে টাইপ শুরু করলেই ক্যাটালগ পেজে নিয়ে যাবে
        const targetPath = pathname === "/catalog" ? "/catalog" : "/catalog";

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value.trim()) {
                params.set("search", value);
            } else {
                params.delete("search"); // খালি করে দিলে সার্চ প্যারাম মুছে যাবে
            }

            // ইউআরএল আপডেট করা হচ্ছে (টাইপ করার সাথে সাথে)
            router.push(`${targetPath}?${params.toString()}`);
        });
    };

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
        { name: "Top Games", href: "/catalog?filter=bestsellers" },
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

                {/* 🆕 লাইভ সার্চ এরিয়া */}
                {showSearch ? (
                    <div className="flex items-center gap-2 bg-carbon border border-gray-800 px-3 py-1.5 rounded-lg">
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={handleInputChange} // 🆕 প্রতি কি-স্ট্রোকে ইউআরএল চেইঞ্জ হবে
                            className="bg-transparent text-sm text-ivory outline-none w-40 sm:w-60 placeholder-gray-500"
                            autoFocus
                        />
                        <div className="text-fog text-lg">
                            {isPendingTransition ? (
                                <span className="loading loading-spinner loading-xs text-cyan"></span> // DaisyUI স্পিনার (যদি লোডিং ফিল হয়)
                            ) : (
                                <HiOutlineSearch />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setShowSearch(false);
                                setSearchQuery("");
                                router.push("/catalog"); // সার্চ বক্স বন্ধ করলে ফিল্টার রিসেট হবে
                            }}
                            className="text-gray-500 hover:text-crimson text-sm pl-1 border-l border-gray-850"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setShowSearch(true)} className="text-xl text-fog hover:text-cyan transition-colors cursor-pointer">
                        <HiOutlineSearch />
                    </button>
                )}

                {/* User Session / Auth Action */}
                <div className="flex items-center border-l border-gray-800 pl-4 sm:pl-6">
                    {isPending ? (
                        <div className="w-8 h-8 rounded-full bg-carbon animate-pulse" />
                    ) : session?.user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center font-bold text-ivory uppercase cursor-pointer ring-2 ring-crimson/50 hover:ring-cyan transition-all">
                                {session.user.name ? session.user.name[0] : "U"}
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-carbon border border-gray-800 rounded-xl w-52 mt-4 text-sm text-fog z-[60]">
                                <li className="px-4 py-2 border-b border-gray-800 text-ivory font-medium">
                                    <p className="truncate max-w-full">{session.user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                </li>
                                <li><Link href="/dashboard" className="hover:text-cyan py-2.5">My Dashboard</Link></li>

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