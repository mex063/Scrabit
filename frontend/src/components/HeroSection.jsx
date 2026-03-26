import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Scale, IndianRupee } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-praxeti" data-testid="hero-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-mantis/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-book-green/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-mantis/10 rounded-full px-4 py-1.5 mb-8">
              <Leaf className="w-4 h-4 text-mantis" />
              <span className="text-sm font-medium text-book-green">India's Smartest E-Kabbadiwala</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-4">
              Grab the Scrap!{" "}
              <span className="text-mantis">Kabad Bechna</span>{" "}
              Hua Aasan.
            </h1>

            <p className="text-book-green font-heading font-semibold text-lg md:text-xl italic mb-6">
              "Sahi Daam, Seedha Account Mein"
            </p>

            <p className="text-base md:text-lg text-[#525252] mb-10 max-w-lg">
              India ka apna E-Kabbadiwala. Ghar baithe kabad becho, best rates pao, aur instant payment lo. No more haggling with local kabbadiwala.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book" data-testid="hero-book-pickup-btn">
                <motion.div
                  className="relative inline-flex"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 rounded-full bg-mantis/30 animate-pulse-ring" />
                  <div className="relative bg-mantis hover:bg-book-green text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg shadow-mantis/20 transition-all flex items-center gap-2">
                    Book Pickup
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>
              <Link
                to="/pricing"
                data-testid="hero-check-rates-btn"
                className="inline-flex items-center justify-center bg-white border-2 border-mantis text-mantis hover:bg-mantis/5 rounded-full px-8 py-4 text-lg font-medium transition-all"
              >
                Check Rates
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 bg-mantis/10 rounded-xl flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-mantis" />
                </div>
                <h3 className="font-heading font-semibold text-[#1A1A1A] mb-1">Transparent Weighing</h3>
                <p className="text-sm text-[#525252]">Digital taraazu, no dhoka</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm mt-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-12 h-12 bg-book-green/10 rounded-xl flex items-center justify-center mb-4">
                  <IndianRupee className="w-6 h-6 text-book-green" />
                </div>
                <h3 className="font-heading font-semibold text-[#1A1A1A] mb-1">Best Prices</h3>
                <p className="text-sm text-[#525252]">Market se zyada rates</p>
              </motion.div>

              <motion.div
                className="bg-mantis rounded-2xl p-6 col-span-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Our Mission</p>
                    <p className="text-white text-2xl font-heading font-bold">Kabad se Azaadi!</p>
                    <p className="text-white/70 text-sm mt-1">Scrap becho, planet bachao</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
