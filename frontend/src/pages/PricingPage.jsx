import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, RefreshCw, FileText, Wrench, Recycle, Monitor, Package } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categoryConfig = {
  paper: { icon: FileText, label: "Paper" },
  metal: { icon: Wrench, label: "Metal" },
  plastic: { icon: Recycle, label: "Plastic" },
  ewaste: { icon: Monitor, label: "E-Waste" },
  others: { icon: Package, label: "Others" },
};

export default function PricingPage() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/pricing`)
      .then(res => { setPricing(res.data.pricing); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = [...new Set(pricing.map(p => p.category))];

  return (
    <div className="bg-praxeti min-h-screen py-20 md:py-28" data-testid="pricing-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge className="bg-mantis/10 text-mantis border-mantis/20 mb-4 hover:bg-mantis/10">
            <RefreshCw className="w-3 h-3 mr-1" /> Updated Daily
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
            Scrap <span className="text-mantis">Rates</span>
          </h1>
          <p className="text-[#525252] text-base md:text-lg">Transparent pricing. Sahi daam, koi chupai nahi.</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-[#A3A3A3]">Loading rates...</div>
        ) : (
          <Tabs defaultValue={categories[0] || "paper"} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8" data-testid="pricing-tabs">
              {categories.map(cat => {
                const config = categoryConfig[cat] || { icon: Package, label: cat };
                const Icon = config.icon;
                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    data-testid={`pricing-tab-${cat}`}
                    className="data-[state=active]:bg-mantis data-[state=active]:text-white rounded-full px-6 py-2.5 text-sm font-medium border border-black/10 data-[state=active]:border-mantis transition-all"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {config.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map(cat => (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pricing.filter(p => p.category === cat).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-black/5 p-6 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-semibold text-[#1A1A1A]">{item.item_name}</h3>
                        <div className="flex items-center gap-1 text-mantis">
                          <IndianRupee className="w-4 h-4" />
                          <span className="text-2xl font-heading font-bold">{item.price_per_kg}</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#A3A3A3] mt-1">{item.unit}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-16">
          <p className="text-[#525252] mb-4">Rates better than market? Believe it. <span className="text-mantis font-medium italic">Yeh hai Scrabit ka promise.</span></p>
          <Link to="/book" data-testid="pricing-book-btn">
            <motion.div className="relative inline-flex" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <span className="absolute inset-0 rounded-full bg-mantis/30 animate-pulse-ring" />
              <div className="relative bg-mantis hover:bg-book-green text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg shadow-mantis/20 transition-all flex items-center gap-2">
                Book Pickup Now
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
