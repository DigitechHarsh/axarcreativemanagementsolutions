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
    title: "ISO Systems & Business Advisory",
    description: "End-to-end implementation and auditing for ISO standards, Six Sigma, and corporate growth strategies.",
    ctaText: "Explore Consulting",
    ctaLink: "/services#consulting"
  },
  {
    id: 2,
    image: "/images/carousel_tech_dev_1788288897978.jpg",
    title: "Full-Stack Website Development",
    description: "Dynamic web applications, e-commerce solutions, and headless CMS architecture built for scale.",
    ctaText: "Explore Development",
    ctaLink: "/services#technical"
  },
  {
    id: 3,
    image: "/images/carousel_ai_video_1788289531842.jpg",
    title: "AI Video Ads & Creative",
    description: "Cinematic, CGI, and UGC-style artificial intelligence video generation that drives massive engagement.",
    ctaText: "Explore Creative",
    ctaLink: "/services#technical"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === carouselSlides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? carouselSlides.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-[55vh] min-h-[420px] overflow-hidden bg-black">
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
              className="object-cover opacity-60"
              priority
            />
          </div>

          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-left px-12 md:px-24 pt-12">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 max-w-4xl"
            >
              {carouselSlides[current].title}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base md:text-xl text-gray-300 mb-6 max-w-2xl font-body"
            >
              {carouselSlides[current].description}
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link
                href={carouselSlides[current].ctaLink}
                className="px-6 py-3 font-heading font-bold text-sm md:text-base text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-300 shadow-[0_0_20px_rgba(179,40,45,0.4)] hover:shadow-[0_0_30px_rgba(179,40,45,0.6)] group inline-flex items-center"
              >
                {carouselSlides[current].ctaText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
