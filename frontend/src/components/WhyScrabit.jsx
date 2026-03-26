import { motion } from "framer-motion";
import { X, Check, AlertTriangle, Shield } from "lucide-react";

const exploitationPoints = [
  { local: "Kachi taraazu se kam tolte hain - You lose 15-20% weight", scrabit: "Digital scale, accurate to the gram" },
  { local: "Rate bahut kam dete hain - 30-40% below market price", scrabit: "Market ke best rates, transparent pricing" },
  { local: "Kabhi aate hain, kabhi nahi - No time commitment", scrabit: "On-time scheduled pickup, respect your time" },
  { local: "Mixed scrap ka paisa nahi dete - They cherry-pick", scrabit: "Har category ka alag fair price" },
  { local: "No bill, no record - Zero accountability", scrabit: "Digital receipt with full item-wise breakdown" },
  { local: "Haggling aur arguments - Stressful experience", scrabit: "Fixed rates, zero negotiation needed" },
];

export const WhyScrabit = () => {
  return (
    <section className="bg-praxeti py-20 md:py-28" data-testid="why-scrabit">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Jaano Sach!</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            How Local Players <span className="text-red-500">Exploit</span> You
          </h2>
          <p className="text-[#525252] mt-3 max-w-2xl">
            The unorganized scrap market in India is worth over Rs 1 Lakh Crore, but sellers are the ones who suffer.
            Unfair weights, manipulated prices, and zero accountability. Yeh sab band hoga ab.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-red-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#1A1A1A] text-lg">Local Kabbadiwala</h3>
                <p className="text-xs text-red-400">Purana tarika, purani cheating</p>
              </div>
            </div>
            <ul className="space-y-4">
              {exploitationPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="text-sm text-[#525252]">{point.local}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-mantis/20 p-8 ring-2 ring-mantis/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-mantis/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-mantis" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#1A1A1A] text-lg">Scrabit - The Smart Way</h3>
                <p className="text-xs text-mantis">Naya zamana, naya tarika</p>
              </div>
            </div>
            <ul className="space-y-4">
              {exploitationPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mantis/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-mantis" />
                  </div>
                  <span className="text-sm text-[#1A1A1A] font-medium">{point.scrabit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
