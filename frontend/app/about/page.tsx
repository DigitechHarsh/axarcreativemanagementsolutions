"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Compass, 
  Workflow, 
  FileSpreadsheet, 
  Zap, 
  SearchCheck,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2
} from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const VALUES = [
  { title: "Professionalism", desc: "Rigorous standards, deep technical competence, and uncompromising ethical conduct in every plant engagement." },
  { title: "Practical Solutions", desc: "Straightforward management systems tailored for shop-floor adoption rather than overwhelming paperwork." },
  { title: "Client Focus", desc: "Deeply understanding client operational risks, factory constraints, and commercial goals to deliver measurable value." },
  { title: "Integrity", desc: "Honest, transparent guidance with genuine dedication to employee safety and enterprise longevity." },
  { title: "Continuous Improvement", desc: "Instilling a Kaizen continuous improvement mindset and data-driven methods for sustained progress." }
];

const APPROACH_STEPS = [
  { step: "01", title: "ASSESS", desc: "Understand your current systems, operational risks, and business requirements.", icon: SearchCheck },
  { step: "02", title: "PLAN", desc: "Develop a practical roadmap based on your objectives, deadlines, and resources.", icon: Compass },
  { step: "03", title: "IMPLEMENT", desc: "Support documentation, SOPs, infrastructure setup, and team implementation.", icon: Workflow },
  { step: "04", title: "VERIFY", desc: "Conduct internal audits, identify compliance gaps, and support corrective actions (CAPA).", icon: FileSpreadsheet },
  { step: "05", title: "IMPROVE", desc: "Strengthen the management system through ongoing review and continual improvement.", icon: Zap }
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Header */}
      <section className="pt-20 pb-10 bg-background border-b border-border relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accent/10 border border-accent/30 text-accent">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> About Axar Creative Management Solutions
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              <TypewriterText text="Your Partner for Industrial Excellence" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              Empowering organizations across India and global markets with practical management systems, NABL laboratory readiness, workforce training, and sustainable business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership & Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Card: Proprietor & Credential Badge */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="lg:col-span-5"
            >
              <div className="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center space-y-6 border border-border">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/20 border border-accent/40 flex items-center justify-center text-accent glow-gold">
                  <Award className="w-12 h-12" />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-white">
                    Ghanshyambhai K Patel
                  </h3>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mt-1">
                    Proprietor & Principal Consultant
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Axar Creative Management Solutions
                  </p>
                </div>

                <div className="p-4 bg-surface rounded-2xl border border-border text-xs text-text-secondary text-left space-y-2">
                  <div className="flex items-center text-white font-bold">
                    <ShieldCheck className="w-4 h-4 mr-2 text-accent shrink-0" /> Industrial Consultancy & Systems
                  </div>
                  <p>
                    Specializing in QMS/EMS/OH&S standards, NABL testing laboratory setup, Six Sigma, and international business development across Bharuch industrial belts and nationwide.
                  </p>
                </div>

                <div className="flex justify-center space-x-4 pt-2">
                  <Link
                    href="/contact"
                    className="px-6 py-2.5 bg-gradient-to-r from-accent to-accent-light text-background text-xs font-heading font-bold rounded-full hover:scale-105 transition-transform"
                  >
                    Connect Directly
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative Story */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary mb-2 block">
                  Our Mission & Evolution
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-4">
                  Transforming Industrial Compliance into Business Opportunity
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full mb-6 glow-gold" />
              </div>

              <div className="space-y-4 text-text-secondary text-xs md:text-sm leading-relaxed">
                <p>
                  <strong className="text-white">Axar Creative Management Solutions</strong> is an industrial consultancy and business-support organization focused on helping companies improve their systems, people and performance.
                </p>
                <p>
                  Led by <strong className="text-white">Ghanshyambhai K Patel, Proprietor</strong>, Axar provides practical solutions combining consultancy, training, compliance support and business-development services.
                </p>
                <p>
                  We work with organizations to develop effective management systems, strengthen operational performance, build competent teams and create new business opportunities across domestic and global markets.
                </p>
                <p className="font-serif italic text-sm md:text-base text-accent-light border-l-4 border-accent pl-5 py-3 my-4 bg-surface rounded-r-xl">
                  &ldquo;Better Systems • Safer Workplaces • Sustainable Growth&rdquo;
                </p>
                <p>
                  Our objective is to become a trusted long-term partner for industries that want to improve compliance, efficiency, safety and sustainable business growth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-surface-alt border-y border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-accent mb-2 block">
              Guiding Principles
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-white mb-3">
              Our 5 Core Values
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-xs md:text-sm text-text-secondary max-w-xl mx-auto">
              Professionalism • Practical Solutions • Client Focus • Integrity • Continuous Improvement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.08 } }
                }}
                className="glass-card glass-card-hover p-6 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4 font-heading font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Approach Pipeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary mb-2 block">
              Proven Execution Flow
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-white mb-3">
              Our 5-Step Implementation Pipeline
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4 glow-gold" />
            <p className="text-xs md:text-sm text-text-secondary max-w-xl mx-auto">
              ASSESS &nbsp;→&nbsp; PLAN &nbsp;→&nbsp; IMPLEMENT &nbsp;→&nbsp; VERIFY &nbsp;→&nbsp; IMPROVE
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {APPROACH_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-extrabold text-2xl text-accent">
                      {step.step}
                    </span>
                    <step.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Locations (Office & Works) */}
      <section className="py-20 bg-surface-alt border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-accent mb-2 block">
              Physical Presence & Reach
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Our Office & Works Locations
            </h2>
            <p className="text-xs text-text-secondary">
              Conveniently located in Gujarat&apos;s premier industrial corridor in Bharuch & Saykha GIDC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Office */}
            <div className="glass-card p-8 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3 text-accent">
                <MapPin className="w-6 h-6 shrink-0" />
                <h3 className="font-heading font-bold text-base text-white">Registered Office</h3>
              </div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                26 Ravikiran complex Banglows,<br />
                Near Madhuram party Plot, Zadeshwar Chokdi,<br />
                Bharuch, 392011, Gujarat, India
              </p>
              <div className="pt-2 flex items-center space-x-4 text-xs">
                <a href="tel:+919925534751" className="text-accent font-bold hover:underline flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1" /> +91 99255 34751
                </a>
              </div>
            </div>

            {/* Works */}
            <div className="glass-card p-8 rounded-2xl space-y-4">
              <div className="flex items-center space-x-3 text-primary">
                <Building className="w-6 h-6 shrink-0" />
                <h3 className="font-heading font-bold text-base text-white">Works Facility</h3>
              </div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                Green Park Farm, Bhersam Sayakha Road,<br />
                Navi Vasahat, Saykha GIDC,<br />
                Ta Vagra, District: Bharuch, Gujarat, India
              </p>
              <div className="pt-2 flex items-center space-x-4 text-xs">
                <a href="mailto:patelgk4257@gmail.com" className="text-primary font-bold hover:underline flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1" /> patelgk4257@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-accent to-accent-light text-background font-heading font-bold text-xs rounded-full hover:scale-105 transition-transform shadow-lg shadow-accent/20"
            >
              Contact Us for On-Site Plant Review <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
