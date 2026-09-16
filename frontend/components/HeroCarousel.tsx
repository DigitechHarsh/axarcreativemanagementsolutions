"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

const carouselSlides = [
  {
    id: 1,
    image: "/images/carousel_business_consulting_1788288885191.jpg",
    badge: "YOUR PARTNER FOR INDUSTRIAL EXCELLENCE",
    tagline: "Better Systems • Safer Workplaces • Sustainable Growth",
    title: "Industrial Consultancy & Management Systems",
    description: "Empowering industrial organizations across Gujarat & India with proven ISO management frameworks, NABL laboratory readiness, workforce safety training, and risk solutions.",
    primaryCtaText: "Explore 7 Core Services",
    primaryCtaLink: "/services",
    secondaryCtaText: "Request a Proposal",
    secondaryCtaLink: "/contact?type=quote",
    stats: [
      { label: "Audit Success", value: "100%" },
      { label: "Industrial Sectors", value: "12+" },
      { label: "Standards Covered", value: "20+" }
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
      { label: "Core IMS Suite", value: "9001 • 14001" },
      { label: "Cyber Security", value: "ISO 27001" },
      { label: "Implementation", value: "Step-by-Step" }
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
      { label: "Lab Readiness", value: "NABL / 17025" },
      { label: "Workforce Training", value: "QHSE & Safety" },
      { label: "Process Excellence", value: "Lean Six Sigma" }
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
      { label: "Plant Asset Cover", value: "Fire & Machinery" },
      { label: "Global Reach", value: "Export Markets" },
      { label: "Business Profiles", value: "B2B Collaterals" }
    ]
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 8000);
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
    <div className="relative w-full min-h-[500px] md:min-h-[540px] lg:min-h-[580px] overflow-hidden bg-[#f8fafc] flex items-center border-b border-[#e2e8f0]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {/* Subtle Photographic Background with Light Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center opacity-10"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/95 to-[#f8fafc]/70 z-10" />

          {/* Slide Content Container */}
          <div className="container mx-auto h-full relative z-20 flex flex-col justify-center items-start text-left px-8 sm:px-14 md:px-16 lg:px-20 py-10 md:py-12">
            <div className="max-w-3xl space-y-4">
              {/* Badge & Tagline */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white border border-[#cbd5e1] text-[#b3282d] shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" />
                  {slide.badge}
                </span>
                <span className="text-xs text-[#64748b] hidden sm:inline-block font-medium">
                  {slide.tagline}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.25rem] font-heading font-extrabold text-[#0f172a] leading-[1.15] tracking-tight">
                {slide.title}
              </h1>
              
              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-[#475569] max-w-2xl font-body leading-relaxed">
                {slide.description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-3 items-center pt-2">
                <Link
                  href={slide.primaryCtaLink}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 font-heading font-bold text-xs md:text-sm text-white bg-[#b3282d] rounded-md hover:bg-[#8c1e22] transition-all duration-150 group inline-flex items-center shadow-sm active:translate-y-0.5"
                >
                  {slide.primaryCtaText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 font-heading font-bold text-xs md:text-sm text-[#0f172a] bg-white border border-[#cbd5e1] rounded-md hover:bg-[#f1f5f9] hover:border-[#94a3b8] transition-all duration-150 inline-flex items-center shadow-xs"
                >
                  {slide.secondaryCtaText}
                </Link>
              </div>

              {/* Stat Badges Grid - Fixed width & overflow prevention */}
              <div className="pt-4 grid grid-cols-3 gap-2.5 sm:gap-4 border-t border-[#e2e8f0] w-full max-w-lg">
                {slide.stats.map((st, sIdx) => (
                  <div key={sIdx} className="bg-white border border-[#e2e8f0] p-2.5 sm:p-3 rounded-lg shadow-xs min-w-0">
                    <div className="text-xs sm:text-sm md:text-base font-heading font-bold text-[#b3282d] truncate">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#64748b] font-medium truncate mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls with clean positioning and no text overlap */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 items-center justify-center rounded-md bg-white/95 hover:bg-white border border-[#cbd5e1] text-[#0f172a] shadow-sm transition-all cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 items-center justify-center rounded-md bg-white/95 hover:bg-white border border-[#cbd5e1] text-[#0f172a] shadow-sm transition-all cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              index === current ? "bg-[#b3282d] w-8" : "bg-[#cbd5e1] hover:bg-[#94a3b8] w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
