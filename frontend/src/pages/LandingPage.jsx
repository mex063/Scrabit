import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { RecyclablesShowcase } from "@/components/RecyclablesShowcase";
import { ProcessPoster } from "@/components/ProcessPoster";
import { ServiceSections } from "@/components/ServiceSections";
import { WhyScrabit } from "@/components/WhyScrabit";
import { Testimonials } from "@/components/Testimonials";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <RecyclablesShowcase />
      <HowItWorks />
      <ProcessPoster />
      <ServiceSections />
      <WhyScrabit />
      <Testimonials />

      {/* Final CTA */}
      <section className="bg-praxeti py-20 md:py-28" data-testid="final-cta">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
              Toh Aur Kya Sochna? <span className="text-mantis">Grab the Scrap!</span>
            </h2>
            <p className="text-[#525252] mb-8 max-w-lg mx-auto">
              Free doorstep pickup, transparent pricing, aur instant payment. Scrabit karo, befikar raho.
            </p>
            <Link to="/book" data-testid="cta-book-pickup-btn">
              <motion.div
                className="relative inline-flex"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-full bg-mantis/30 animate-pulse-ring" />
                <div className="relative bg-mantis hover:bg-book-green text-white rounded-full px-10 py-4 text-lg font-semibold shadow-lg shadow-mantis/20 transition-all flex items-center gap-2">
                  Book Free Pickup
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
