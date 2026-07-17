import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-display", // map to theme display font
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-body", // map to theme body font
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Oasis | Genuine Game CDs for Every Era",
  description: "Find original PS2 to PS5, Xbox, and PC premium gaming titles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-ivory selection:bg-cyan selection:text-obsidian">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}