// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import AdminSidebar from "@/components/admin/AdminSidebar";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//     const router = useRouter();
//     const { data: session, isPending } = authClient.useSession();

//     useEffect(() => {
//         if (isPending) return;

//         if (!session) {
//             router.push("/login?message=please_login");
//             return;
//         }

//         // NOTE: assumes better-auth user object has a `role` field.
//         // If your schema stores role differently, adjust this check.
//         if (session.user.role !== "admin") {
//             router.push("/dashboard");
//         }
//     }, [session, isPending, router]);

//     if (isPending || !session || session.user.role !== "admin") {
//         return (
//             <div className="min-h-screen bg-black text-ivory flex items-center justify-center">
//                 <p className="text-cyan font-mono animate-pulse text-lg">VERIFYING CLEARANCE...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex min-h-screen bg-black">
//             <AdminSidebar />
//             <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">{children}</main>
//         </div>
//     );
// }

//2

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.push("/login?message=please_login");
            return;
        }

        //  assumes better-auth user object has a `role` field.
        //  schema stores role differently, adjust this check.
        if (session.user.role !== "admin") {
            router.push("/dashboard");
        }
    }, [session, isPending, router]);

    if (isPending || !session || session.user.role !== "admin") {
        return (
            <div className="min-h-screen bg-black text-ivory flex items-center justify-center">
                <p className="text-cyan font-mono animate-pulse text-lg">VERIFYING CLEARANCE...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-black">
            <AdminSidebar />
            <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">{children}</main>
        </div>
    );
}