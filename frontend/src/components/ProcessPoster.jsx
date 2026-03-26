import { motion } from "framer-motion";
import { Smartphone, Truck, Scale, Banknote, ArrowRight, Recycle } from "lucide-react";

const processSteps = [
  {
    num: "01",
    icon: Smartphone,
    title: "Aap Book Karo",
    subtitle: "You Schedule Online",
    description: "Apne phone se 30 second mein booking karo. Scrap type choose karo, date-time select karo, bas!",
    image: "https://images.unsplash.com/photo-1659353741017-aa112e7a854d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=400",
    color: "from-mantis/20 to-mantis/5",
    borderColor: "border-mantis/30",
  },
  {
    num: "02",
    icon: Truck,
    title: "Hum Aayenge",
    subtitle: "We Come to Your Doorstep",
    description: "Humare trained pickup partners aapke ghar aayenge. On time, with a smile. Koi wait nahi!",
    image: "https://images.unsplash.com/photo-1551825687-f9de1603ed8b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=400",
    color: "from-book-green/20 to-book-green/5",
    borderColor: "border-book-green/30",
  },
  {
    num: "03",
    icon: Scale,
    title: "Tolo Aur Chhaanto",
    subtitle: "We Weigh & Sort Transparently",
    description: "Digital taraazu se aapke saamne tolenge. Har item alag, har rate transparent. No dhoka, no jhol!",
    image: "https://images.pexels.com/photos/10009678/pexels-photo-10009678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
    color: "from-mantis/20 to-mantis/5",
    borderColor: "border-mantis/30",
  },
  {
    num: "04",
    icon: Banknote,
    title: "Paisa Lo, Khush Raho",
    subtitle: "Get Paid Instantly",
    description: "UPI ya cash, aapki marzi. Turant payment, koi deeri nahi. Aur hum aapka scrap sahi recycler tak pahuchayenge.",
    image: "https://images.pexels.com/photos/6901511/pexels-photo-6901511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
    color: "from-book-green/20 to-book-green/5",
    borderColor: "border-book-green/30",
  },
];

export const ProcessPoster = () => {
  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden" data-testid="process-poster">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-mantis/10 rounded-full px-4 py-1.5 mb-4">
            <Recycle className="w-4 h-4 text-mantis" />
            <span className="text-sm font-medium text-book-green">Hamara Process</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2">
            Kabad Bechna <span className="text-mantis">Itna Aasan</span> Kabhi Nahi Tha
          </h2>
          <p className="text-[#525252] mt-3 max-w-xl mx-auto">
            From booking to payment - everything happens at your doorstep. No middlemen, no hassle.
          </p>
        </motion.div>

        {/* Process Steps - Poster Style */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 z-0">
            <svg className="w-full h-4" viewBox="0 0 1000 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8 L1000 8" stroke="#74C365" strokeWidth="2" strokeDasharray="8 8" strokeOpacity="0.4" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className={`bg-gradient-to-b ${step.color} rounded-2xl border ${step.borderColor} p-1 h-full`}>
                  <div className="bg-white rounded-xl p-5 h-full flex flex-col">
                    {/* Step Number + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-heading font-bold text-mantis/20">{step.num}</span>
                      <div className="w-12 h-12 bg-mantis/10 rounded-xl flex items-center justify-center group-hover:bg-mantis/20 transition-colors">
                        <step.icon className="w-6 h-6 text-mantis" />
                      </div>
                    </div>

                    {/* Image */}
                    <div className="rounded-xl overflow-hidden mb-4 aspect-[4/3] bg-praxeti">
                      <img
                        src={step.image}
                        alt={step.subtitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-lg">{step.title}</h3>
                    <p className="text-mantis text-sm font-medium mb-2">{step.subtitle}</p>
                    <p className="text-[#525252] text-sm leading-relaxed flex-1">{step.description}</p>

                    {/* Arrow indicator for desktop */}
                    {index < 3 && (
                      <div className="hidden lg:flex justify-end mt-3">
                        <ArrowRight className="w-5 h-5 text-mantis/40" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#525252] text-sm">
            Simple. Transparent. <span className="text-mantis font-semibold italic">Bilkul Jhaanjhat-Free.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
