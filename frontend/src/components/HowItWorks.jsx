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
          <span className="text-mantis font-medium text-sm uppercase tracking-wider">Kaise Kaam Karta Hai?</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-3">
            4 Simple Steps. <span className="text-mantis">Bas Itna Hi.</span>
          </h2>
          <p className="text-[#525252] mt-3 text-base md:text-lg max-w-xl mx-auto">
            Grab the Scrap, book a pickup, aur paisa kamao. Bilkul simple!
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
            src="https://i.ibb.co/8Gy7WwH/Firefly-Gemini-Flash-A-clean-modern-hero-image-for-a-scrap-pickup-startup-called-Scrabit-Show-a-f.png"
            alt="How Scrabit Works"
            className="w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};
```

---

## Now Update Your Website

### Step 1 — Replace the code
- Open **HowItWorks.jsx** in VS Code
- Select all (**Ctrl + A**)
- Delete and paste the new code above

### Step 2 — Push to GitHub
Open Command Prompt and type:
```
cd Documents\GitHub\Scrabit
git add .
git commit -m "updated how it works section"
git push origin main
