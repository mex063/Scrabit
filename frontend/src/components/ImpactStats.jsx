import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TreePine, Weight, Wind, Users } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const statConfig = [
  { key: "trees_saved", label: "Trees Saved", labelHi: "Ped Bachaye", icon: TreePine },
  { key: "kg_recycled", label: "KG Recycled", labelHi: "KG Recycle Kiya", icon: Weight },
  { key: "co2_reduced", label: "KG CO2 Reduced", labelHi: "CO2 Kam Kiya", icon: Wind },
  { key: "families_served", label: "Families Served", labelHi: "Parivaar Jude", icon: Users },
];

const AnimatedCounter = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString('en-IN')}{suffix}</span>;
};

export const ImpactStats = () => {
  const [impact, setImpact] = useState(null);

  useEffect(() => {
    axios.get(`${API}/impact`).then(res => setImpact(res.data)).catch(() => {
      setImpact({ trees_saved: 1250, kg_recycled: 85000, co2_reduced: 42000, families_served: 3200 });
    });
  }, []);

  return (
    <section className="bg-book-green py-20 md:py-28" data-testid="impact-stats">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-white/70 font-medium text-sm uppercase tracking-wider">Humara Impact</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3">
            Together, We're Making a Difference
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statConfig.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                {impact ? <AnimatedCounter value={impact[stat.key]} /> : "..."}
              </p>
              <p className="text-white/80 text-sm">{stat.label}</p>
              <p className="text-white/50 text-xs italic">{stat.labelHi}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
