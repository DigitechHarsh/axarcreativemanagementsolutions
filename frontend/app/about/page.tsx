"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <section className="pt-20 pb-4 bg-background">
        <div className="container mx-auto px-6 text-center max-w-4xl mb-12 min-h-[80px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 flex justify-center"
          >
            <TypewriterText text="About Us" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            Bridging traditional business consulting with modern creative and cybersecurity technology.
          </motion.p>
        </div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            {/* Image Placeholder with Gold Ring Hover */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="lg:w-2/5"
            >
              <div className="relative group cursor-pointer w-full max-w-md mx-auto aspect-square">
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-accent group-hover:scale-105 transition-all duration-500 z-10 pointer-events-none" />
                <div className="absolute inset-4 rounded-full overflow-hidden bg-surface-alt">
                  <Image 
                    src="https://placehold.co/800x800/1C1C1C/A0A0A0?text=Founder+Photo" 
                    alt="Founder" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-colors" />
              </div>
            </motion.div>

            {/* Story Text */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="lg:w-3/5"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-8" />
              <div className="space-y-6 text-text-secondary text-lg">
                <p>
                  At Axar Creative Management Solutions, we observed a critical gap in the modern business landscape. Traditional consulting firms excelled in process and compliance but struggled with digital agility, while tech agencies lacked the foundational business acumen to align code with core strategic objectives.
                </p>
                <p>
                  We were founded to bridge this divide. We combine the rigorous methodology of ISO standards and Six Sigma with the cutting-edge capabilities of AI-driven creative production, full-stack web development, and uncompromising cybersecurity.
                </p>
                <p className="font-serif italic text-xl text-text-primary border-l-4 border-accent pl-6 py-2 mt-8">
                  &quot;We don&apos;t just advise; we build, we secure, and we scale. We are your partner for business excellence.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision Two-Column */}
      <section className="py-24 bg-surface-alt border-y border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="bg-background border border-border p-10 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full pointer-events-none" />
              <Target className="w-12 h-12 text-primary mb-6 relative z-10" />
              <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Our Mission</h3>
              <p className="text-text-secondary leading-relaxed relative z-10">
                To empower organizations with comprehensive solutions that streamline operations, elevate brand presence, and secure digital assets. We deliver measurable excellence by merging traditional management consulting with next-generation technology.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
              }}
              className="bg-background border border-border p-10 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full pointer-events-none" />
              <Lightbulb className="w-12 h-12 text-accent mb-6 relative z-10" />
              <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Our Vision</h3>
              <p className="text-text-secondary leading-relaxed relative z-10">
                To be the globally recognized benchmark for integrated business excellence—where visionary strategy, creative innovation, and impenetrable security converge under one trusted partnership.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Approach (3-step stepper) */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Approach</h2>
            <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-border -translate-y-1/2 z-0" />
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "01", title: "Assess & Strategize", desc: "Deep-dive analysis of your current operations, compliance posture, and digital footprint to uncover growth opportunities." },
                { step: "02", title: "Advise & Build", desc: "Execution of tailored consulting frameworks alongside the rapid development of web assets and AI-driven campaigns." },
                { step: "03", title: "Secure & Scale", desc: "Rigorous quality auditing to fortify your infrastructure, enabling sustainable, secure, and confident global expansion." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } },
                  }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 bg-background border-4 border-surface rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300 shadow-xl relative">
                    <span className="font-heading font-bold text-2xl text-text-secondary group-hover:text-primary transition-colors">{item.step}</span>
                    {/* Pulsing ring on hover */}
                    <div className="absolute inset-0 rounded-full border border-primary scale-110 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  </div>
                  <h4 className="text-xl font-heading font-bold mb-4">{item.title}</h4>
                  <p className="text-text-secondary text-sm px-4">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
