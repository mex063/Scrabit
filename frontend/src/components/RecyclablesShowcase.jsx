import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Droplets, Shirt, Wrench, Monitor, Recycle } from "lucide-react";

const recyclables = [
  { name: "Paper", nameHi: "Kagaz", icon: FileText, items: "Newspaper, Books, Cardboard, Office Paper", position: "top-left" },
  { name: "Plastic", nameHi: "Plastic", icon: Droplets, items: "Bottles, Containers, Hard Plastic", position: "top-right" },
  { name: "Metal", nameHi: "Dhatu", icon: Wrench, items: "Iron, Aluminium, Copper, Brass, Steel", position: "mid-right" },
  { name: "E-Waste", nameHi: "E-Kachra", icon: Monitor, items: "AC, TV, Laptop, Mobile, Washing Machine", position: "bottom-right" },
  { name: "Clothes", nameHi: "Kapde", icon: Shirt, items: "Old Clothes, Fabric, Rags", position: "bottom-left" },
];

export const RecyclablesShowcase = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" data-testid="recyclables-showcase">
      {/* Grid background like the reference */}
      <div className="absolute inset-0 bg-praxeti">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(116,195,101,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(116,195,101,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-mantis/10 rounded-full px-4 py-1.5 mb-4">
            <Recycle className="w-4 h-4 text-mantis" />
            <span className="text-sm font-medium text-book-green">Hum Kya Lete Hain?</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Recyclables <span className="text-mantis">We Accept</span>
          </h2>
          <p className="text-[#525252] mt-3 max-w-lg mx-auto">
            Ghar ka koi bhi kabad ho - hum sab lete hain, sahi daam pe!
          </p>
        </motion.div>

        {/* Poster Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-48 h-48 md:w-56 md:h-56 mb-8 md:mb-0 z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mantis/20 to-book-green/20 rounded-full" />
            <div className="absolute inset-3 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="text-center">
                <Recycle className="w-12 h-12 text-mantis mx-auto mb-2" />
                <p className="font-heading font-bold text-[#1A1A1A] text-sm">Scrabit</p>
                <p className="text-xs text-mantis font-medium">E-Kabbadiwala</p>
              </div>
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-mantis/30 animate-spin" style={{ animationDuration: '20s' }} />
          </motion.div>

          {/* Category cards arranged around the center */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:-mt-16">
            {recyclables.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative ${index === 2 ? 'md:mt-16' : ''}`}
              >
                {/* Arrow connector for desktop */}
                <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2">
                  <svg width="24" height="32" viewBox="0 0 24 32" className="text-mantis">
                    <path d="M12 0 C12 0, 12 20, 12 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                    <path d="M6 16 L12 24 L18 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="bg-white rounded-2xl border border-mantis/15 p-5 text-center hover:shadow-lg hover:border-mantis/30 transition-all h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-mantis/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-mantis/20 group-hover:scale-110 transition-all">
                    <item.icon className="w-7 h-7 text-mantis" />
                  </div>

                  {/* Label with hand-drawn style */}
                  <h3 className="font-heading font-bold text-book-green text-xl mb-0.5">{item.name}</h3>
                  <p className="text-mantis text-xs font-medium italic mb-2">{item.nameHi}</p>

                  {/* Items list */}
                  <p className="text-[#525252] text-xs leading-relaxed">{item.items}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/pricing" data-testid="recyclables-price-list-btn">
            <motion.div
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-book-green text-white rounded-full px-8 py-4 text-lg font-semibold transition-all shadow-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See Full Price List
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
