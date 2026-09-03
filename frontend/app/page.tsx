"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring, useScroll } from "framer-motion";
import { Briefcase, Code, ShieldCheck, Globe, CheckCircle, ArrowRight } from "lucide-react";

// Helper for generic scroll reveal animations
const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

import HeroCarousel from "../components/HeroCarousel";

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
    title: "E-Commerce Digital Transformation", 
    category_name: "Web Development", 
    description: "Next-generation storefront built with modern responsive architecture.",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-accent/20 text-accent border border-accent/30",
    featured: true
  },
  { 
    title: "AI Video Ad Campaign Launch", 
    category_name: "AI Video Production", 
    description: "High-conversion cinematic UGC & product showcase video series.",
    image_url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-primary/20 text-primary border border-primary/30",
    featured: true
  },
  { 
    title: "Supply Chain & ISO Quality Overhaul", 
    category_name: "Management Consulting", 
    description: "Complete process re-engineering and ISO compliance certification.",
    image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-primary/20 text-primary border border-primary/30",
    featured: true
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
  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <HeroCarousel />


      {/* 2. Trust Strip (Marquee) */}
      <div className="border-y border-border bg-surface-alt overflow-hidden py-4">
        <motion.div
          className="flex whitespace-nowrap space-x-16 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 12, repeat: Infinity }}
        >
          {/* Repeat content to create seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-16 items-center">
              <span className="text-text-secondary font-heading font-semibold tracking-wider text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-accent" /> ISO Management Systems</span>
              <span className="text-text-secondary font-heading font-semibold tracking-wider text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-accent" /> Six Sigma</span>
              <span className="text-text-secondary font-heading font-semibold tracking-wider text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-accent" /> AI Video Ads</span>
              <span className="text-text-secondary font-heading font-semibold tracking-wider text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-accent" /> Full-Stack Development</span>
              <span className="text-text-secondary font-heading font-semibold tracking-wider text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-accent" /> Business Advisory</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Service Pillars */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our Two Pillars</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pillar 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface border border-border p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <Briefcase className="w-12 h-12 text-primary mb-6 relative z-10" />
              <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Business Consulting</h3>
              <p className="text-text-secondary mb-6 relative z-10 line-clamp-3">
                Comprehensive consulting, training, and auditing for ISO standards, Food Safety, Supply Chain, Six Sigma, and specialized business advisory to streamline your operations and drive growth.
              </p>
              <Link href="/services#consulting" className="inline-flex items-center text-accent font-semibold group-hover:text-accent-light transition-colors relative z-10">
                Explore Consulting <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface border border-border p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <Code className="w-12 h-12 text-accent mb-6 relative z-10" />
              <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Technical Expertise</h3>
              <p className="text-text-secondary mb-6 relative z-10 line-clamp-3">
                Cutting-edge digital solutions including AI Video Ads (UGC, CGI, Cinematic) and Static & Dynamic Website Development.
              </p>
              <Link href="/services#technical" className="inline-flex items-center text-accent font-semibold group-hover:text-accent-light transition-colors relative z-10">
                Explore Technical <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Why Axar */}
      <section className="py-24 bg-surface-alt border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Why Axar</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">The unique advantages that set us apart in delivering holistic excellence.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Globe, title: "Cross-domain Expertise", desc: "Bridging the gap between traditional management and modern technology." },
              { icon: ShieldCheck, title: "End-to-end Execution", desc: "From strategic planning through technical implementation and security validation." },
              { icon: Code, title: "Global & Digital Reach", desc: "Empowering businesses worldwide with scalable digital footprints." },
              { icon: Briefcase, title: "Data-driven & Secure", desc: "Decisions backed by analytics and infrastructure fortified by ethical hacking." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={revealVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-background border border-border p-6 rounded-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-primary/50 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h4 className="font-heading font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Featured Work Preview */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealVariants}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Featured Work</h2>
              <p className="text-text-secondary max-w-xl">A glimpse into our successful engagements and digital masterpieces.</p>
            </div>
            <Link href="/portfolio" className="inline-flex items-center text-accent font-semibold mt-4 md:mt-0 hover:text-accent-light transition-colors">
              View All Work <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex overflow-x-auto pb-8 md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory hide-scrollbar">
            {featuredProjects.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                whileHover={{ scale: 1.03 }}
                className="min-w-[85vw] md:min-w-0 snap-center bg-surface border border-border rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
              >
                <div className="aspect-video bg-surface-alt relative overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary opacity-50">
                      <Briefcase className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${item.tag_style || "bg-accent/20 text-accent border border-accent/30"}`}>
                      {item.category_name}
                    </span>
                    <h4 className="text-xl font-heading font-bold mb-2 text-white">{item.title}</h4>
                    <p className="text-text-secondary text-sm line-clamp-2">{item.description}</p>
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

      {/* 6. CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Ready to scale your business and your digital presence?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 font-heading text-lg font-bold text-primary bg-white rounded-full hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get in Touch Today
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
