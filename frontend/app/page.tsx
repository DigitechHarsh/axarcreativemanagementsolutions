"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring, useScroll } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  GraduationCap, 
  ShieldAlert, 
  TrendingUp, 
  FileText, 
  Globe2, 
  CheckCircle, 
  ArrowRight,
  Factory,
  Cpu,
  Flame,
  Pill,
  UtensilsCrossed,
  Microscope,
  HardHat,
  Building2,
  Fuel,
  Truck,
  Ship,
  Sprout,
  Compass,
  FileSpreadsheet,
  Workflow,
  SearchCheck,
  Zap
} from "lucide-react";

import HeroCarousel from "../components/HeroCarousel";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

interface Project {
  id?: number;
  title: string;
  category_name: string;
  description: string;
  image_url: string;
  project_url: string;
  tag_style: string;
  featured: boolean | number;
}

const DEFAULT_FEATURED: Project[] = [
  { 
    title: "Integrated Management System (IMS) Certification", 
    category_name: "ISO & QMS Consultancy", 
    description: "Multi-site ISO 9001, 14001, and 45001 implementation with 100% audit clearance on the initial assessment.",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-primary/20 text-primary border border-primary/30",
    featured: true
  },
  { 
    title: "NABL Testing Laboratory Setup & Accreditation", 
    category_name: "Laboratory & NABL", 
    description: "Complete laboratory layout, equipment calibration framework, SOP preparation, and NABL readiness for a chemical testing lab.",
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-accent/20 text-accent border border-accent/30",
    featured: true
  },
  { 
    title: "Plant Risk Assessment & Comprehensive Insurance", 
    category_name: "Industrial Insurance", 
    description: "Risk identification and structured asset coverage covering property, boiler breakdown, and marine transit for an engineering plant.",
    image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-primary/20 text-primary border border-primary/30",
    featured: true
  }
];

const CORE_SERVICES = [
  {
    icon: Award,
    id: "iso",
    title: "QMS & ISO Consultancy",
    desc: "Complete support for management-system implementation, improvement and certification across ISO 9001, 14001, 45001, 50001, 22301, 37001, ISO 20000-1 IT Info & ISO 27001 IT Security.",
    badge: "ISO & IMS Standards",
    link: "/services#iso",
    highlights: ["Integrated Management Systems (IMS)", "CAPA & Internal Audit Support", "Lead Auditor Competency Programs"]
  },
  {
    icon: FlaskConical,
    id: "laboratory",
    title: "Laboratory Consultancy & Accreditation",
    desc: "From laboratory feasibility and layout infrastructure to SOP development, Quality Manuals, and complete NABL accreditation preparation.",
    badge: "NABL & Testing Setup",
    link: "/services#laboratory",
    highlights: ["Equipment Selection & Calibration", "Quality Manual & SOP Design", "NABL Audit Preparation"]
  },
  {
    icon: GraduationCap,
    id: "qhse",
    title: "QHSE & Food Safety Training",
    desc: "Practical workshops for industrial personnel covering Hazard Identification (HIRA), Workplace Safety, Emergency Preparedness, HACCP, GMP & GHP.",
    badge: "Workforce Competency",
    link: "/services#qhse",
    highlights: ["HIRA & Incident Investigation", "HACCP, GMP & Food Safety Culture", "Internal Auditor Qualification"]
  },
  {
    icon: ShieldAlert,
    id: "insurance",
    title: "Industrial Insurance Solutions",
    desc: "Assisting organizations in identifying and arranging structured risk coverage for plant & machinery, fire perils, marine transit, and employee liabilities.",
    badge: "Risk Identified • Managed",
    link: "/services#insurance",
    highlights: ["Property & Machinery Breakdown", "Marine / Transit & Engineering", "Public & Product Liability Covers"]
  },
  {
    icon: TrendingUp,
    id: "six-sigma",
    title: "Six Sigma Training",
    desc: "Develop a data-driven culture of continuous improvement using Lean Six Sigma, DMAIC methodology, Root Cause Analysis, and variation reduction.",
    badge: "Improve Quality • DMAIC",
    link: "/services#six-sigma",
    highlights: ["DMAIC Process Improvement", "Root Cause & Variation Reduction", "Green Belt Training Arrangements"]
  },
  {
    icon: FileText,
    id: "marketing",
    title: "Marketing Flyers & Business Communication",
    desc: "Converting technical specifications into clear, high-impact flyers, company profiles, brochures, and digital presentations for industrial clients.",
    badge: "Technical into Business",
    link: "/services#marketing",
    highlights: ["Product Flyers & Company Profiles", "Industrial Service Brochures", "Digital Marketing Creatives"]
  },
  {
    icon: Globe2,
    id: "export",
    title: "Export & International Marketing",
    desc: "Helping Indian businesses explore and develop international markets with export research, buyer identification, and global entry assistance.",
    badge: "Local to Global",
    link: "/services#export",
    highlights: ["Export Market & Buyer Research", "Distributor Development Support", "International Inquiry Management"]
  }
];

const INDUSTRIES = [
  { icon: Factory, name: "Manufacturing", desc: "Process optimization & ISO standards" },
  { icon: Cpu, name: "Engineering", desc: "Quality assurance & machinery risk" },
  { icon: Flame, name: "Chemical & Petrochemical", desc: "HIRA, EMS & process safety" },
  { icon: Pill, name: "Pharmaceutical & Healthcare", desc: "GMP, cleanroom & ISO compliance" },
  { icon: UtensilsCrossed, name: "Food & Beverage", desc: "HACCP, GMP & food safety culture" },
  { icon: Microscope, name: "Laboratory & Testing", desc: "NABL accreditation & ISO 17025" },
  { icon: HardHat, name: "Construction", desc: "Site safety, OHS & risk control" },
  { icon: Building2, name: "Infrastructure", desc: "Large-scale project compliance" },
  { icon: Fuel, name: "Oil & Gas", desc: "Stringent safety & emergency frameworks" },
  { icon: Truck, name: "Logistics & Services", desc: "Supply chain & transit insurance" },
  { icon: Ship, name: "Export & Trading", desc: "International buyer compliance" },
  { icon: Sprout, name: "Agriculture & Allied", desc: "Sustainable practices & certification" }
];

const APPROACH_STEPS = [
  {
    step: "01",
    title: "ASSESS",
    desc: "Understand your current management systems, operational risks, compliance gaps, and business objectives.",
    icon: SearchCheck
  },
  {
    step: "02",
    title: "PLAN",
    desc: "Develop a practical, tailored roadmap with clear timelines, resource allocation, and milestone targets.",
    icon: Compass
  },
  {
    step: "03",
    title: "IMPLEMENT",
    desc: "Support SOP documentation, infrastructure readiness, employee training, and practical system execution.",
    icon: Workflow
  },
  {
    step: "04",
    title: "VERIFY",
    desc: "Conduct thorough internal audits, identify non-conformances, and drive corrective actions (CAPA).",
    icon: FileSpreadsheet
  },
  {
    step: "05",
    title: "IMPROVE",
    desc: "Strengthen the management system through ongoing review, management audits, and continual improvement.",
    icon: Zap
  }
];

const WHY_CHOOSE = [
  {
    title: "Practical Industrial Experience",
    desc: "Solutions designed around real-world industrial shop-floor and laboratory requirements, not just textbook theory."
  },
  {
    title: "Integrated Services",
    desc: "Consultancy, training, laboratory accreditation, insurance, and business development under one unified platform."
  },
  {
    title: "Customized Approach",
    desc: "Every system and training program is tailored to your organization's specific size, sector, and commercial goals."
  },
  {
    title: "Training with Practical Focus",
    desc: "Workforce competency programs designed to help employees immediately apply safety and quality principles at the workplace."
  },
  {
    title: "Long-Term Partnership",
    desc: "Our objective is not only achieving certification—it is helping organizations maintain and continuously improve year after year."
  }
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(DEFAULT_FEATURED);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        const res = await fetch("https://acms.harshaicreations.com/projects.php");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const featured = data.data.filter((p: Project) => Boolean(p.featured));
          if (featured.length > 0) {
            setFeaturedProjects(featured.slice(0, 6));
          } else {
            setFeaturedProjects(data.data.slice(0, 3));
          }
        }
      } catch (err) {
        console.log("Using default featured projects fallback");
      }
    }
    fetchFeaturedProjects();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Trust Strip (Industrial Marquee) */}
      <div className="border-y border-border bg-surface-alt overflow-hidden py-3.5">
        <motion.div
          className="flex whitespace-nowrap space-x-12 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 18, repeat: Infinity }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-12 items-center">
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-accent" /> ISO 9001 / 14001 / 45001 (IMS)
              </span>
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-primary" /> ISO 27001 IT Security & ISO 20000-1
              </span>
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-accent" /> NABL Testing Laboratory Setup
              </span>
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-primary" /> QHSE & Food Safety (HACCP/GMP)
              </span>
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-accent" /> Six Sigma DMAIC Process Optimization
              </span>
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-primary" /> Industrial Insurance Solutions
              </span>
              <span className="text-text-secondary font-heading font-bold text-xs tracking-wider flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-2 text-accent" /> Export Market & Buyer Identification
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Introduction & Tagline Banner */}
      <section className="py-20 bg-background border-b border-border relative">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accent/10 border border-accent/30 text-accent">
              Your Partner for Industrial Excellence
            </div>
            
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-text-primary leading-tight">
              &ldquo;Better Systems • Safer Workplaces • Sustainable Growth&rdquo;
            </h2>

            <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Axar Creative Management Solutions provides professional consultancy, training and business-support services to industries seeking improved quality, safety, environmental performance, regulatory compliance and sustainable commercial growth.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/services"
                className="px-8 py-3.5 bg-primary text-white font-heading font-bold text-sm rounded-full hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all inline-flex items-center"
              >
                Explore Our Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact?type=quote"
                className="px-8 py-3.5 bg-surface border border-border text-text-primary font-heading font-bold text-sm rounded-full hover:border-accent hover:text-accent transition-all"
              >
                Get a Customized Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Core Services (7 Pillars Grid) */}
      <section className="py-24 bg-surface-alt">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary mb-2 block">
              Comprehensive Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our Core Services</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
            <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
              From international ISO certifications and laboratory setups to workforce training and risk management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }
                }}
                whileHover={{ y: -6 }}
                className="bg-surface border border-border rounded-2xl p-7 flex flex-col justify-between hover:border-accent hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-alt border border-border text-text-secondary">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <div className="space-y-2 border-t border-border pt-4 mb-6">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 mr-2 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={service.link}
                  className="inline-flex items-center text-xs font-heading font-bold text-accent group-hover:text-accent-light transition-colors mt-auto pt-2"
                >
                  Learn More & Explore <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries We Serve (12 Sectors) */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-accent mb-2 block">
              Multi-Sector Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Industries We Serve</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
              Providing sector-specific compliance, safety systems, and growth frameworks across key industrial hubs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: i * 0.04 } }
                }}
                whileHover={{ y: -4, borderColor: "var(--accent)" }}
                className="bg-surface border border-border p-5 rounded-xl flex flex-col justify-center items-center text-center group transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-surface-alt border border-border flex items-center justify-center text-primary group-hover:text-accent group-hover:border-accent transition-colors mb-3">
                  <ind.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-sm text-text-primary mb-1 group-hover:text-accent transition-colors">
                  {ind.name}
                </h4>
                <p className="text-[11px] text-text-secondary line-clamp-2">
                  {ind.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/industries"
              className="inline-flex items-center text-xs font-heading font-bold px-6 py-2.5 rounded-full bg-surface border border-border hover:border-accent text-text-primary hover:text-accent transition-all"
            >
              View Detailed Industry Solutions <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Our 5-Step Approach Pipeline */}
      <section className="py-24 bg-surface-alt border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary mb-2 block">
              Structured Methodology
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our 5-Step Approach</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
            <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
              A systematic pipeline engineered for seamless audit readiness and sustainable operational success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {APPROACH_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                }}
                className="bg-surface border border-border p-6 rounded-2xl relative flex flex-col justify-between group hover:border-primary transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-extrabold text-2xl text-accent/80">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                  <span>Phase {idx + 1}</span>
                  {idx < 4 && <ArrowRight className="ml-auto w-3 h-3 text-accent hidden lg:block" />}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-surface border border-border rounded-2xl text-center max-w-3xl mx-auto">
            <span className="font-heading font-extrabold text-sm md:text-base text-text-primary tracking-wide">
              ASSESS &nbsp;→&nbsp; PLAN &nbsp;→&nbsp; IMPLEMENT &nbsp;→&nbsp; VERIFY &nbsp;→&nbsp; IMPROVE
            </span>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Axar */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-xs font-bold font-heading uppercase tracking-widest text-accent">
                The Axar Advantage
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary leading-tight">
                Why Choose Axar Creative Management Solutions?
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Led by <strong>Ghanshyambhai K Patel (Proprietor)</strong>, we combine technical industrial experience with practical consultancy, making quality and safety frameworks effortless to adopt and maintain.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center text-xs font-heading font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  Learn more about our team and values <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="lg:col-span-7 space-y-4"
            >
              {WHY_CHOOSE.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={revealVariants}
                  className="bg-surface border border-border p-5 rounded-xl hover:border-accent hover:shadow-md transition-all flex items-start space-x-4"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-text-primary mb-1">
                      {item.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Our Commitment Banner */}
      <section className="py-20 bg-gradient-to-r from-primary/95 to-red-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-black/30 px-3 py-1 rounded-full border border-accent/30 inline-block">
            Our Core Commitment
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold leading-snug">
            &ldquo;We believe that management systems should not become a burden of paperwork.&rdquo;
          </h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl mx-auto">
            They should actively help organizations achieve: <strong>Better Quality, Safer Workplaces, Lower Risk, Greater Efficiency, Customer Satisfaction, and Sustainable Growth.</strong>
          </p>
        </div>
      </section>

      {/* 9. Featured Projects / Client Showcase */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary mb-2 block">
                Demonstrated Results
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-2">Projects & Client Engagements</h2>
              <p className="text-text-secondary max-w-xl text-sm">
                Case studies demonstrating industrial excellence and compliance achievements.
              </p>
            </div>
            <Link href="/portfolio" className="inline-flex items-center text-accent font-semibold text-sm mt-4 md:mt-0 hover:text-accent-light transition-colors">
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                whileHover={{ y: -6 }}
                className="bg-surface border border-border rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
              >
                <div className="aspect-video bg-surface-alt relative overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary opacity-50">
                      <ShieldCheck className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full mb-3 ${item.tag_style || "bg-primary/20 text-primary border border-primary/30"}`}>
                      {item.category_name}
                    </span>
                    <h4 className="text-lg font-heading font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  {item.project_url && (
                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs font-bold text-accent hover:underline mt-4"
                    >
                      View Live Project <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Call to Action / Get a Quote */}
      <section className="py-24 bg-surface-alt border-t border-border relative">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary">
              Let&apos;s Build a Better Future Together
            </h2>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Whether you are planning ISO certification, setting up a testing laboratory, improving QHSE performance, training your workforce or exploring international markets, Axar Creative Management Solutions can support you with practical and professional solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/contact?type=quote"
                className="px-8 py-4 font-heading text-sm font-bold text-white bg-primary rounded-full hover:bg-primary-dark shadow-xl shadow-primary/30 transition-all inline-flex items-center"
              >
                Request a Proposal / Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 font-heading text-sm font-bold text-text-primary bg-surface border border-border rounded-full hover:border-accent hover:text-accent transition-all inline-flex items-center"
              >
                Contact Our Office
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
