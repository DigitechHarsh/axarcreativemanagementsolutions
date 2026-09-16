"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Award, Factory, CheckCircle2 } from "lucide-react";

const carouselSlides = [
  {
    id: 1,
    image: "/images/carousel_business_consulting_1788288885191.jpg",
    badge: "YOUR PARTNER FOR INDUSTRIAL EXCELLENCE",
    tagline: "Better Systems • Safer Workplaces • Sustainable Growth",
    title: "World-Class Industrial Consultancy & Management Systems",
    description: "Empowering industrial organizations across Gujarat & India with proven ISO management frameworks, NABL laboratory readiness, workforce safety training, and risk solutions.",
    primaryCtaText: "Explore 7 Core Services",
    primaryCtaLink: "/services",
    secondaryCtaText: "Request a Proposal",
    secondaryCtaLink: "/contact?type=quote",
    stats: [
      { label: "Audit Success", value: "100%" },
      { label: "Sectors Covered", value: "12+" },
      { label: "Standards Supported", value: "20+" }
    ]
  },
  {
    id: 2,
    image: "/images/service_supply_chain_1788290674649.jpg",
    badge: "ISO & IMS CERTIFICATION READINESS",
    tagline: "Quality • Environment • Safety • Energy • IT Security",
    title: "Complete ISO & QMS Consultancy with Zero Paperwork Burden",
    description: "End-to-end guidance for ISO 9001, 14001, 45001, 50001, ISO 20000-1 IT Info & ISO 27001 IT Security. From gap analysis to initial audit clearance.",
    primaryCtaText: "View ISO Standards",
    primaryCtaLink: "/services#iso",
    secondaryCtaText: "Book Gap Assessment",
    secondaryCtaLink: "/contact?type=quote",
    stats: [
      { label: "ISO Standards", value: "9001/14001/45001" },
      { label: "IT Security", value: "ISO 27001 / 20000-1" },
      { label: "Audit Prep", value: "End-to-End" }
    ]
  },
  {
    id: 3,
    image: "/images/service_corporate_strategy_1788290688199.jpg",
    badge: "TESTING LABS & WORKFORCE SAFETY",
    tagline: "Technical Precision • ISO/IEC 17025 • HACCP / GMP",
    title: "NABL Laboratory Setup & Practical QHSE Training",
    description: "From laboratory layout blueprints and equipment selection to Lead Auditor certification, Hazard Identification (HIRA), and food safety management systems.",
    primaryCtaText: "Laboratory & Training Hub",
    primaryCtaLink: "/training",
    secondaryCtaText: "Download Syllabus",
    secondaryCtaLink: "/resources",
    stats: [
      { label: "Accreditation", value: "NABL Ready" },
      { label: "Training Modules", value: "QHSE & HACCP" },
      { label: "Six Sigma", value: "Lean DMAIC" }
    ]
  },
  {
    id: 4,
    image: "/images/carousel_tech_dev_1788288897978.jpg",
    badge: "RISK MITIGATION & GLOBAL TRADE",
    tagline: "Asset Protection • Market Entry • Buyer Connections",
    title: "Industrial Insurance & Export International Marketing",
    description: "Arranging structured risk coverage for plant machinery, fire perils, and liabilities, while connecting Indian manufacturers to verified global buyers.",
    primaryCtaText: "Explore Trade & Insurance",
    primaryCtaLink: "/services#insurance",
    secondaryCtaText: "Get Insurance Review",
    secondaryCtaLink: "/contact?type=quote",
    stats: [
      { label: "Machinery & Fire", value: "Full Cover" },
      { label: "Export Markets", value: "Global Reach" },
      { label: "Collateral", value: "Technical to B2B" }
    ]
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === carouselSlides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? carouselSlides.length - 1 : current - 1);
  };

  const slide = carouselSlides[current];

  return (
    <div className="relative w-full min-h-[620px] md:min-h-[680px] lg:min-h-[720px] overflow-hidden bg-[#0d1117] flex items-center">
      {/* Background Ambient Grid & Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with Dark Gradient Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center opacity-35"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/85 to-[#0d1117]/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10" />

          {/* Slide Content Container */}
          <div className="container mx-auto h-full relative z-20 flex flex-col justify-center items-start text-left px-6 md:px-12 py-16">
            <div className="max-w-4xl space-y-5">
              {/* Badge & Tagline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/30 border border-primary/60 text-white shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-accent" />
                  {slide.badge}
                </span>
                <span className="text-xs font-serif italic text-accent-light hidden sm:inline-block">
                  &ldquo;{slide.tagline}&rdquo;
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight"
              >
                {slide.title}
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm md:text-lg text-text-secondary max-w-2xl font-body leading-relaxed"
              >
                {slide.description}
              </motion.p>
              
              {/* CTAs */}
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-wrap gap-4 items-center pt-2"
              >
                <Link
                  href={slide.primaryCtaLink}
                  className="px-7 py-3.5 font-heading font-bold text-xs md:text-sm text-white bg-gradient-to-r from-primary via-primary-light to-primary rounded-full hover:shadow-[0_0_25px_rgba(179,40,45,0.6)] transition-all duration-300 group inline-flex items-center"
                >
                  {slide.primaryCtaText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="px-7 py-3.5 font-heading font-bold text-xs md:text-sm text-accent-light bg-surface border border-accent/40 rounded-full hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-md inline-flex items-center"
                >
                  {slide.secondaryCtaText}
                </Link>
              </motion.div>

              {/* Stat Badges Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-border/60 max-w-xl"
              >
                {slide.stats.map((st, sIdx) => (
                  <div key={sIdx} className="bg-surface/80 border border-border/80 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm">
                    <div className="text-base sm:text-xl font-heading font-extrabold text-accent">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-text-secondary font-medium truncate">
                      {st.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-surface/80 hover:bg-primary border border-border text-white transition-all backdrop-blur-md cursor-pointer hover:scale-110 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-surface/80 hover:bg-primary border border-border text-white transition-all backdrop-blur-md cursor-pointer hover:scale-110 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              index === current ? "bg-accent w-10 glow-gold" : "bg-white/30 hover:bg-white/60 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
