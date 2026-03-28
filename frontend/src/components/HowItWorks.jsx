import { motion } from "framer-motion";

export const HowItWorks = () => {
  return (
    <section className="bg-white py-20 md:py-28" data-testid="how-it-works">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-3">
            Kabad Bechna{" "}
            <span className="text-mantis">Itna Aasan</span>{" "}
            Kabhi Nahi Tha
          </h2>
          <p className="text-[#525252] mt-3 text-base md:text-lg max-w-xl mx-auto">
            From booking to payment - everything happens at your doorstep. No middlemen, no hassle.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="/images/hero.png"
            alt="How Scrabit Works"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};
