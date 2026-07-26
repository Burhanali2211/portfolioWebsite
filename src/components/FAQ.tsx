import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you take on freelance projects?",
    answer: "Yes, I am currently available for freelance projects. I typically partner with businesses, startups, and institutions to build web applications, IoT solutions, or lead technical workshops.",
  },
  {
    question: "How long does a typical project take?",
    answer: "It depends on the scope. A simple dashboard might take 2-4 weeks, while a complex full-stack or IoT ecosystem can take 2-3 months. I provide clear timelines upfront before we start.",
  },
  {
    question: "What is your pricing structure?",
    answer: "I price based on the project scope and value delivered, rather than hourly. This ensures you know the exact cost upfront. Once we discuss your requirements, I'll provide a fixed-price proposal.",
  },
  {
    question: "Do you provide source code and documentation?",
    answer: "Absolutely. Once the project is completed and fully paid, you own 100% of the source code. I also provide clear documentation so your future developers can easily take over.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, I typically include a bug-fixing warranty period after launch. For long-term updates and maintenance, we can establish an ongoing retainer agreement.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-muted/20 px-6 py-16 md:py-24 border-t-2 border-foreground">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal variant="fade-up" once className="mb-12 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Frequently Asked
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quick answers to common questions about working with me.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-2 border-foreground bg-background"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold uppercase tracking-tight text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent" : "text-muted-foreground"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t-2 border-border/50 p-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
