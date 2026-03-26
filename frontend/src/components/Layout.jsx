import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, Recycle, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/book", label: "Book Pickup" },
  { to: "/track", label: "Track" },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-praxeti">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
              <div className="w-9 h-9 bg-mantis rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-[#1A1A1A]">Scrabit</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-mantis'
                      : 'text-[#525252] hover:text-book-green'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                to="/book"
                data-testid="header-book-btn"
                className="hidden md:inline-flex items-center gap-2 bg-mantis hover:bg-book-green text-white rounded-full px-5 py-2 text-sm font-semibold transition-all"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                data-testid="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#1A1A1A]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-black/5"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm font-medium ${
                      location.pathname === link.to ? 'text-mantis' : 'text-[#525252]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-mantis rounded-xl flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading text-xl font-bold text-[#1A1A1A]">Scrabit</span>
              </div>
              <p className="text-[#525252] text-sm max-w-md mb-2">
                India ka apna E-Kabbadiwala. We buy your scrap at the best prices, pick it up from your doorstep, and ensure it reaches the right recyclers.
              </p>
              <p className="text-[#A3A3A3] text-xs italic">"Sahi Daam, Sahi Kaam"</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-[#1A1A1A] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-[#525252] hover:text-mantis transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-[#1A1A1A] mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-[#525252]">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-mantis" /> +91 63970 06374</li>
                <li>Customer Support Available : 10AM - 6PM</li>
                <li>Agra,Uttarpradesh</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#A3A3A3]">&copy; 2025 Scrabit. All rights reserved.</p>
            <p className="text-xs text-[#A3A3A3] italic">Grab the Scrap! Kabad becho, planet bachao.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
