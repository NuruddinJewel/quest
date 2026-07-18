// "use client";

// import { useState } from "react";
// import { GameType } from "@/types/game";
// import { HiOutlineShoppingBag, HiCreditCard, HiX } from "react-icons/hi";

// interface ActionButtonsProps {
//     game: GameType;
// }

// export default function GameActionButtons({ game }: ActionButtonsProps) {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [ordered, setOrdered] = useState(false);

//     const outOfStock = game.stock <= 0;

//     const handleOrderSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             // 🎯 এখানে পরবর্তীতে আমাদের ব্যাকএন্ড অর্ডার API কল হবে
//             console.log("Submitting order for:", game.title, formData);

//             // ডেমো রেসপন্স ডিলে
//             await new Promise((resolve) => setTimeout(resolve, 1500));
//             setOrdered(true);
//         } catch (error) {
//             console.error("Order failed:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <>
//             {/* অ্যাকশন বাটনসমূহ */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-800/50">
//                 <button
//                     disabled={outOfStock}
//                     onClick={() => alert(`${game.title} added to cart!`)}
//                     className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-obsidian border border-cyan text-cyan font-bold rounded-xl hover:bg-cyan/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     <HiOutlineShoppingBag className="text-lg" />
//                     <span>Add to Cart</span>
//                 </button>

//                 <button
//                     disabled={outOfStock}
//                     onClick={() => setIsModalOpen(true)}
//                     className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-cyan text-obsidian font-bold rounded-xl hover:bg-cyan/90 transition-all shadow-lg shadow-cyan/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     <HiCreditCard className="text-lg" />
//                     <span>Buy Now</span>
//                 </button>
//             </div>

//             {/* 🏛️ ক্যাশ অন ডেলিভারি চেকআউট মডাল (Popup) */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//                     <div className="bg-carbon border border-gray-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">

//                         {/* ক্লোজ বাটন */}
//                         <button
//                             onClick={() => { setIsModalOpen(false); setOrdered(false); }}
//                             className="absolute top-4 right-4 text-gray-400 hover:text-ivory transition-colors"
//                         >
//                             <HiX className="text-xl" />
//                         </button>

//                         {!ordered ? (
//                             <>
//                                 <h2 className="text-xl font-black text-ivory uppercase tracking-tight">
//                                     Express Checkout ⚡
//                                 </h2>
//                                 <p className="text-xs text-fog mt-1">
//                                     You are purchasing <strong>{game.title}</strong> for <span className="text-cyan font-bold">${game.price}</span>.
//                                 </p>

//                                 <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4">
//                                     <div>
//                                         <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name</label>
//                                         <input
//                                             type="text"
//                                             required
//                                             placeholder="John Doe"
//                                             value={formData.name}
//                                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                             className="w-full bg-obsidian border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-cyan transition-colors"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Phone Number</label>
//                                         <input
//                                             type="tel"
//                                             required
//                                             placeholder="01XXXXXXXXX"
//                                             value={formData.phone}
//                                             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                                             className="w-full bg-obsidian border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-cyan transition-colors"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Shipping Address</label>
//                                         <textarea
//                                             required
//                                             rows={3}
//                                             placeholder="Your complete home or office delivery address"
//                                             value={formData.address}
//                                             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                                             className="w-full bg-obsidian border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-cyan transition-colors resize-none"
//                                         />
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         disabled={isSubmitting}
//                                         className="w-full py-3 bg-cyan text-obsidian font-bold rounded-xl hover:bg-cyan/90 transition-all font-bold tracking-wide mt-2 disabled:opacity-50"
//                                     >
//                                         {isSubmitting ? "Processing Order..." : "Confirm Cash on Delivery"}
//                                     </button>
//                                 </form>
//                             </>
//                         ) : (
//                             /* অর্ডার সাকসেসফুল মেসেজ */
//                             <div className="text-center py-6">
//                                 <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
//                                     ✓
//                                 </div>
//                                 <h2 className="text-2xl font-black text-ivory">ORDER PLACED!</h2>
//                                 <p className="text-sm text-fog mt-2 px-4">
//                                     Thank you, <strong>{formData.name}</strong>. Our gaming squad will call you at <strong>{formData.phone}</strong> to verify the physical CD shipment.
//                                 </p>
//                                 <button
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="mt-6 px-6 py-2 bg-obsidian border border-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-900 text-ivory transition-colors"
//                                 >
//                                     Back to Vault
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

//2

"use client";

import { useState } from "react";
import { GameType } from "@/types/game";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { HiOutlineShoppingBag, HiCreditCard, HiCheckCircle } from "react-icons/hi";

interface ActionButtonsProps {
    game: GameType;
}

export default function GameActionButtons({ game }: ActionButtonsProps) {
    const router = useRouter();

    //  Better-Auth Session
    const { data: session, isPending } = authClient.useSession();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const outOfStock = game.stock <= 0;

    // Click Handler
    const handleInstantBuy = async () => {
        //User Login
        if (!session) {
            // alert("Please login to instantly purchase this game!");
            router.push("/login?message=please_login");
            return;
        }

        setIsSubmitting(true);

        try {
            // Backend API
            // Session User and Email
            console.log("Placing instant order for:", {
                gameId: game._id,
                userId: session.user.id,
                userEmail: session.user.email
            });


            await new Promise((resolve) => setTimeout(resolve, 1200));
            setOrderSuccess(true);

            // Success Message
            setTimeout(() => setOrderSuccess(false), 4000);

        } catch (error) {
            console.error("Order failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4 pt-4 border-t border-gray-800/50">

            {/* Order Success Toast */}
            {orderSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/35 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                    <HiCheckCircle className="text-emerald-400 text-2xl shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-ivory">ORDER PLACED SUCCESSFULLY!</p>
                        <p className="text-xs text-fog mt-0.5">Checked out as <span className="text-cyan">{session?.user.email}</span>. Check your mail vault.</p>
                    </div>
                </div>
            )}

            {/* Action Button Group*/}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Add to Cart */}
                <button
                    disabled={outOfStock || isSubmitting || isPending}
                    onClick={() => alert(`${game.title} added to cart!`)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-obsidian border border-cyan text-cyan font-bold rounded-xl hover:bg-cyan/10 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <HiOutlineShoppingBag className="text-lg" />
                    <span>Add to Cart</span>
                </button>

                {/* Click Buy Now */}
                <button
                    disabled={outOfStock || isSubmitting || isPending}
                    onClick={handleInstantBuy}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-cyan text-obsidian font-bold rounded-xl hover:bg-cyan/90 transition-all shadow-lg shadow-cyan/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <HiCreditCard className="text-lg" />
                    <span>
                        {isPending ? "Checking Session..." : isSubmitting ? "Securing Order..." : "Buy Now"}
                    </span>
                </button>
            </div>
        </div>
    );
}