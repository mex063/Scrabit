import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Siya Sharma",
    location: "Agra, Uttarpradesh",
    text: "first time experience kafi shi raha, booked time pr team agayi aur kafi professionally kaam kia!",
    rating: 4,
  },
  {
    name: "Shagun Gupta",
    location: "Agra, Uttarpradesh",
    text: "overall experience was good, i wanted to sell my old clinic equipments, the team gave me a good value",
    rating: 5,
  },
  {
    name: "Bharat Kumar",
    location: "Agra, Uttarpradesh",
    text: "दुकान बंद होने पर बहुत सारा कबाड़ पड़ा था। अपॉइंटमेंट बुक कियाा, टीम आई, सब उठा ले गई और तुरंत पैसे मिले। बहुत बढ़िया सेवा!",
    rating: 5,
  },
  {
    name: "Meet Gyamalani",
    location: "Agra, Uttarpradesh",
    text: "Local kabbadiwala se better experience tha, Scrabit first time try kiya, transparent weighing mili overall experience theek rha!",
    rating: 4,
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-white py-20 md:py-28" data-testid="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-mantis font-medium text-sm uppercase tracking-wider">Suniye Humari Pehli Stories</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-3">
            What Our <span className="text-mantis">Early Users</span> Say
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-praxeti rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[#1A1A1A] text-lg md:text-xl leading-relaxed mb-6 font-body">
                "{testimonials[current].text}"
              </p>
              <div>
                <p className="font-heading font-semibold text-[#1A1A1A]">{testimonials[current].name}</p>
                <p className="text-sm text-[#525252]">{testimonials[current].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              data-testid="testimonial-prev"
              onClick={prev}
              className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center hover:bg-mantis/5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  data-testid={`testimonial-dot-${i}`}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'bg-mantis w-6' : 'bg-black/20 w-2'
                  }`}
                />
              ))}
            </div>
            <button
              data-testid="testimonial-next"
              onClick={next}
              className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center hover:bg-mantis/5 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
