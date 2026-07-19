import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaDiscord, FaGamepad } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-carbon border-t border-gray-800 text-fog text-sm mt-auto">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand Section */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-wider text-ivory">
                        <FaGamepad className="text-cyan text-2xl" />
                        GAMING<span className="text-cyan">OASIS</span>
                    </Link>
                    <p className="text-gray-400 leading-relaxed">
                        Your ultimate vault for genuine retro and modern gaming CDs. Relive the golden era and explore new worlds.
                    </p>
                    {/* Social Icons */}
                    <div className="flex items-center gap-3 pt-2">
                        <a href="#" className="w-8 h-8 rounded-lg bg-obsidian flex items-center justify-center border border-gray-800 text-gray-400 hover:text-cyan hover:border-cyan transition-all">
                            <FaFacebookF size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-obsidian flex items-center justify-center border border-gray-800 text-gray-400 hover:text-cyan hover:border-cyan transition-all">
                            <FaTwitter size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-obsidian flex items-center justify-center border border-gray-800 text-gray-400 hover:text-cyan hover:border-cyan transition-all">
                            <FaInstagram size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-obsidian flex items-center justify-center border border-gray-800 text-gray-400 hover:text-cyan hover:border-cyan transition-all">
                            <FaDiscord size={14} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-ivory font-bold uppercase tracking-wider text-xs mb-4 border-l-2 border-cyan pl-2">Quick Navigation</h3>
                    <ul className="space-y-2.5">
                        <li><Link href="/" className="hover:text-cyan transition-colors">Browse Shop</Link></li>
                        <li><Link href="/catalog" className="hover:text-cyan transition-colors">Categories</Link></li>
                        <li><Link href="#" className="hover:text-cyan transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-cyan transition-colors">Contact Support</Link></li>
                    </ul>
                </div>

                {/* Support & Policies */}
                <div>
                    <h3 className="text-ivory font-bold uppercase tracking-wider text-xs mb-4 border-l-2 border-crimson pl-2">Support</h3>
                    <ul className="space-y-2.5">
                        <li><Link href="#" className="hover:text-crimson transition-colors">FAQs</Link></li>
                        <li><Link href="#" className="hover:text-crimson transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-crimson transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="hover:text-crimson transition-colors">Return & Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-ivory font-bold uppercase tracking-wider text-xs mb-4 border-l-2 border-gold pl-2">Store Info</h3>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-center gap-3">
                            <HiOutlineLocationMarker className="text-gold text-lg flex-shrink-0" />
                            <span>456 Gaming Street, Chattogram, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <HiOutlinePhone className="text-gold text-lg flex-shrink-0" />
                            <span>+880 18xxxxxxxxx</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <HiOutlineMail className="text-gold text-lg flex-shrink-0" />
                            <span>support@gamingoasis.com</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-900 bg-obsidian py-4 text-center text-xs text-gray-500">
                <p>© {currentYear} Gaming Oasis. Built for true gamers. All Rights Reserved.</p>
            </div>
        </footer>
    );
}