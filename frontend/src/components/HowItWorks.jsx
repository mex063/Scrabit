import { motion } from "framer-motion";
import { CalendarClock, Truck, Scale, Banknote } from "lucide-react";

const steps = [
  {
    icon: CalendarClock,
    title: "Schedule Pickup",
    titleHi: "Booking Karo",
    description: "Choose date, time & scrap type online. It takes just 30 seconds.",
    color: "bg-mantis/10 text-mantis",
  },
  {
    icon: Truck,
    title: "We Arrive",
    titleHi: "Hum Aayenge",
    description: "Our trained pickup partner arrives at your doorstep on time.",
    color: "bg-book-green/10 text-book-green",
  },
  {
    icon: Scale,
    title: "Weigh & Sort",
    titleHi: "Tolo Aur Chhaanto",
    description: "Digital weighing in front of you. No guesswork, no cheating.",
    color: "bg-mantis/10 text-mantis",
  },
  {
    icon: Banknote,
    title: "Get Paid",
    titleHi: "Paisa Lo",
    description: "Instant payment via UPI or cash. Best rates guaranteed.",
    color: "bg-book-green/10 text-book-green",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-white py-20 md:py-28" data-testid="how-it-works">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-mantis font-medium text-sm uppercase tracking-wider">Kaise Kaam Karta Hai?</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-3">
            4 Simple Steps. <span className="text-mantis">Bas Itna Hi.</span>
          </h2>
          <p className="text-[#525252] mt-3 text-base md:text-lg max-w-xl mx-auto">
            Grab the Scrap, book a pickup, aur paisa kamao. Bilkul simple!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-mantis/30" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-mantis text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                {index + 1}
              </div>

              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <step.icon className="w-8 h-8" />
              </div>

              <h3 className="font-heading font-semibold text-[#1A1A1A] text-lg mb-1">{step.title}</h3>
              <p className="text-mantis text-sm font-medium italic mb-2">{step.titleHi}</p>
              <p className="text-[#525252] text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
