import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home, Factory, ArrowRight, CheckCircle2,
  Sofa, Newspaper, Tv, ShowerHead, Shirt, Package,
  Cog, HardDrive, Wrench, Container, Truck, Weight
} from "lucide-react";

const householdItems = [
  { icon: Newspaper, label: "Old Newspapers & Books" },
  { icon: Sofa, label: "Furniture & Appliances" },
  { icon: Tv, label: "TV, Laptop, Mobile" },
  { icon: ShowerHead, label: "Kitchen Utensils" },
  { icon: Shirt, label: "Old Clothes & Fabric" },
  { icon: Package, label: "Cardboard & Packaging" },
];

const householdBenefits = [
  "Free doorstep pickup - ghar pe aake lenge",
  "Flexible time slots - aapki suvidha ke hisaab se",
  "Small quantities bhi welcome",
  "UPI / Cash payment options",
];

const factoryItems = [
  { icon: Cog, label: "Machine Parts & Scrap Metal" },
  { icon: HardDrive, label: "IT Equipment & Servers" },
  { icon: Container, label: "Bulk Plastic & Packaging" },
  { icon: Wrench, label: "Steel, Iron, Copper, Brass" },
  { icon: Truck, label: "Vehicle Parts & Tyres" },
  { icon: Weight, label: "Heavy Industrial Waste" },
];

const factoryBenefits = [
  "Dedicated account manager for bulk orders",
  "Scheduled weekly/monthly pickups",
  "Compliance certificates provided",
  "Competitive industrial rates - best in market",
];

export const ServiceSections = () => {
  return (
    <div data-testid="service-sections">
      {/* Households Section */}
      <section className="bg-white py-20 md:py-24" data-testid="household-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-mantis/10 rounded-full px-4 py-1.5 mb-4">
                <Home className="w-4 h-4 text-mantis" />
                <span className="text-sm font-medium text-book-green">Households</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
                Ghar Ka Kabad?{" "}
                <span className="text-mantis">Hum Hain Na!</span>
              </h2>

              <p className="text-[#525252] mb-8 max-w-lg">
                Ghar mein purane newspaper, tuta TV, purani almari - sab ka sahi daam milega.
                Chhoti se chhoti quantity bhi uthayenge. Book karo, hum aa jayenge!
              </p>

              <ul className="space-y-3 mb-8">
                {householdBenefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-mantis mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1A1A1A] font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <Link to="/book" data-testid="household-book-btn">
                <motion.div
                  className="relative inline-flex"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 rounded-full bg-mantis/30 animate-pulse-ring" />
                  <div className="relative bg-mantis hover:bg-book-green text-white rounded-full px-8 py-3.5 font-semibold transition-all flex items-center gap-2">
                    Book Home Pickup
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Right - Item Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {householdItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-praxeti rounded-xl border border-mantis/10 p-4 text-center hover:border-mantis/30 hover:shadow-sm transition-all group"
                  >
                    <div className="w-11 h-11 bg-mantis/10 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:bg-mantis/20 transition-colors">
                      <item.icon className="w-5 h-5 text-mantis" />
                    </div>
                    <p className="text-xs font-medium text-[#1A1A1A]">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-[#A3A3A3] italic">Aur bahut kuch... sab ka price list check karo!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Factories / Industries Section */}
      <section className="bg-book-green/[0.04] py-20 md:py-24 border-t border-b border-book-green/10" data-testid="factory-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Item Grid (reversed order on desktop for visual variety) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {factoryItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl border border-book-green/10 p-4 text-center hover:border-book-green/30 hover:shadow-sm transition-all group"
                  >
                    <div className="w-11 h-11 bg-book-green/10 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:bg-book-green/20 transition-colors">
                      <item.icon className="w-5 h-5 text-book-green" />
                    </div>
                    <p className="text-xs font-medium text-[#1A1A1A]">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-[#A3A3A3] italic">Custom bulk deals available - humse baat karo!</p>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-book-green/10 rounded-full px-4 py-1.5 mb-4">
                <Factory className="w-4 h-4 text-book-green" />
                <span className="text-sm font-medium text-book-green">Factories & Industries</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
                Industrial Scrap?{" "}
                <span className="text-book-green">Bulk Mein Lenge!</span>
              </h2>

              <p className="text-[#525252] mb-8 max-w-lg">
                Factory ka scrap ho ya office clearance - hum handle karenge.
                Dedicated pickup team, best industrial rates, aur proper compliance documentation.
              </p>

              <ul className="space-y-3 mb-8">
                {factoryBenefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-book-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1A1A1A] font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <Link to="/book" data-testid="factory-book-btn">
                <motion.div
                  className="inline-flex items-center gap-2 bg-book-green hover:bg-book-green-700 text-white rounded-full px-8 py-3.5 font-semibold transition-all shadow-lg shadow-book-green/20"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Schedule Bulk Pickup
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
