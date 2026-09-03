"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

type Category = "All" | "Consulting Case Studies" | "AI Video Ads" | "Websites";

const categories: Category[] = [
  "All",
  "Consulting Case Studies",
  "AI Video Ads",
  "Websites"
];

const portfolioItems = [
  {
    id: 1,
    title: "Global Supply Chain Overhaul",
    category: "Consulting Case Studies",
    desc: "Streamlined logistics for a multinational FMCG, saving 15% in operational costs.",
    tagStyle: "bg-primary/20 text-primary border border-primary/30",
  },
  {
    id: 2,
    title: "Cinematic Product Launch",
    category: "AI Video Ads",
    desc: "A fully CGI/AI-generated commercial that drove 300% ROAS on social platforms.",
    tagStyle: "bg-accent/20 text-accent border border-accent/30",
  },
  {
    id: 3,
    title: "E-Commerce Transformation",
    category: "Websites",
    desc: "Next.js & React powered headless commerce solution with 99/100 Core Web Vitals.",
    tagStyle: "bg-accent/20 text-accent border border-accent/30",
  },

  {
    id: 5,
    title: "ISO 27001 Implementation",
    category: "Consulting Case Studies",
    desc: "Guided a tech startup through information security frameworks to achieve ISO certification in 4 months.",
    tagStyle: "bg-primary/20 text-primary border border-primary/30",
  },
  {
    id: 6,
    title: "UGC Social Campaign",
    category: "AI Video Ads",
    desc: "High-volume AI-generated UGC variations for A/B testing at scale.",
    tagStyle: "bg-accent/20 text-accent border border-accent/30",
  }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems = portfolioItems.filter(
    item => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="relative min-h-screen bg-background pb-24">
      {/* Header Section */}
      <section className="pt-20 pb-4 bg-background">
        <div className="container mx-auto px-6 text-center max-w-4xl min-h-[80px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 flex justify-center"
          >
            <TypewriterText text="Featured Work" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            A showcase of our consulting success stories, creative production, and technical excellence.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center md:hidden mb-2 text-text-secondary">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-bold">Filter Categories</span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar space-x-2 md:space-x-4 pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-sm font-heading font-bold whitespace-nowrap transition-colors rounded-full ${
                  activeCategory === cat 
                    ? "text-background" 
                    : "text-text-secondary hover:text-text-primary bg-surface border border-border"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 bg-text-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pt-16">
        <div className="container mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface border border-border rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
                >
                  <div className="aspect-video bg-surface-alt relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary opacity-50 group-hover:scale-110 transition-transform duration-500">
                      <Image 
                        src={`https://placehold.co/800x450/1C1C1C/A0A0A0?text=${item.title.replace(/ /g, '+')}`} 
                        alt={item.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${item.tagStyle}`}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-3">{item.title}</h3>
                    <p className="text-text-secondary text-sm mb-6 flex-grow">{item.desc}</p>
                    
                    <div className="flex items-center text-accent font-semibold text-sm group-hover:text-accent-light transition-colors mt-auto">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State Fallback */}
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-text-secondary"
            >
              No projects found in this category yet.
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
