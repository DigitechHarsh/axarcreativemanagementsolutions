"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const carouselSlides = [
  {
    id: 1,
    image: "/images/carousel_business_consulting_1788288885191.jpg",
    badge: "YOUR PARTNER FOR INDUSTRIAL EXCELLENCE",
    title: "Better Systems • Safer Workplaces • Sustainable Growth",
    description: "Professional consultancy, training and business-support services to industries seeking improved quality, safety, regulatory compliance and sustainable growth.",
    primaryCtaText: "Explore Our Services",
    primaryCtaLink: "/services",
    secondaryCtaText: "Get a Quote",
    secondaryCtaLink: "/contact?type=quote"
  },
  {
    id: 2,
    image: "/images/service_supply_chain_1788290674649.jpg",
    badge: "QMS, EMS, OHS & IT GOVERNANCE",
    title: "ISO Consultancy & NABL Laboratory Setup",
    description: "Complete implementation for ISO 9001, 14001, 45001, 50001, ISO 20000-1, ISO 27001, IMS, plus full testing laboratory infrastructure and NABL accreditation readiness.",
    primaryCtaText: "ISO & Lab Consultancy",
    primaryCtaLink: "/services#iso",
    secondaryCtaText: "Inquire Now",
    secondaryCtaLink: "/contact"
  },
  {
    id: 3,
    image: "/images/service_corporate_strategy_1788290688199.jpg",
    badge: "WORKFORCE COMPETENCY & LEAN DMAIC",
    title: "QHSE, Food Safety & Six Sigma Training",
    description: "Practical Lead Auditor programs, Risk Assessment (HIRA), HACCP, GMP, and DMAIC continuous improvement designed for supervisors, managers, and operational teams.",
    primaryCtaText: "View Training Programs",
    primaryCtaLink: "/training",
    secondaryCtaText: "Download Brochure",
    secondaryCtaLink: "/resources"
  },
  {
    id: 4,
    image: "/images/carousel_tech_dev_1788288897978.jpg",
    badge: "RISK MITIGATION & GLOBAL EXPANSION",
    title: "Industrial Insurance & Export Marketing",
    description: "Comprehensive risk coverage for plant, machinery, transit, and liability alongside research, buyer identification, and market entry for international trade.",
    primaryCtaText: "Insurance & Export Support",
    primaryCtaLink: "/services#insurance",
    secondaryCtaText: "Get a Quote",
    secondaryCtaLink: "/contact?type=quote"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === carouselSlides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? carouselSlides.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-[65vh] min-h-[480px] md:min-h-[520px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with low opacity */}
          <div className="absolute inset-0 z-0 bg-black">
            <Image
              src={carouselSlides[current].image}
              alt={carouselSlides[current].title}
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>

          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 z-10" />

          {/* Content */}
          <div className="container mx-auto h-full relative z-20 flex flex-col justify-center items-start text-left px-6 md:px-12 pt-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/30 border border-primary/50 text-accent mb-4"
            >
              {carouselSlides[current].badge}
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-5xl font-heading font-extrabold text-white mb-4 max-w-4xl leading-tight"
            >
              {carouselSlides[current].title}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm md:text-lg text-gray-200 mb-8 max-w-2xl font-body leading-relaxed"
            >
              {carouselSlides[current].description}
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link
                href={carouselSlides[current].primaryCtaLink}
                className="px-6 py-3 font-heading font-bold text-xs md:text-sm text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-300 shadow-[0_0_20px_rgba(179,40,45,0.4)] hover:shadow-[0_0_30px_rgba(179,40,45,0.6)] group inline-flex items-center"
              >
                {carouselSlides[current].primaryCtaText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={carouselSlides[current].secondaryCtaLink}
                className="px-6 py-3 font-heading font-bold text-xs md:text-sm text-text-primary bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all duration-300 backdrop-blur-sm inline-flex items-center text-white"
              >
                {carouselSlides[current].secondaryCtaText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-3">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-primary w-8" : "bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
