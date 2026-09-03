"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypewriterText from "../../components/TypewriterText";
import ServiceFlipCard from "../../components/ServiceFlipCard";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

interface ServiceItem {
  id?: number;
  title: string;
  category?: string;
  desc: string;
  image: string;
  details: React.ReactNode;
}

const defaultConsultingServices: ServiceItem[] = [
  { 
    title: "ISO Management Systems", 
    desc: "End-to-end implementation and auditing for ISO 9001, 14001, 27001, and more.",
    image: "/images/carousel_business_consulting_1788288885191.jpg",
    details: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Gap analysis and system design</li>
        <li>Documentation and standard operating procedures (SOPs)</li>
        <li>Internal auditor training and mock audits</li>
        <li>Certification body coordination</li>
      </ul>
    )
  },
  { 
    title: "IT & Risk Management", 
    desc: "Comprehensive IT governance, risk assessments, and compliance frameworks.",
    image: "/images/service_corporate_strategy_1788290688199.jpg",
    details: (
      <ul className="list-disc pl-5 space-y-2">
        <li>IT infrastructure security assessments</li>
        <li>Business continuity and disaster recovery planning</li>
        <li>Compliance with global privacy frameworks (GDPR, HIPAA)</li>
        <li>Vendor risk management</li>
      </ul>
    )
  },
  { 
    title: "Supply Chain", 
    desc: "Optimization of logistics, vendor management, and supply chain resilience.",
    image: "/images/service_supply_chain_1788290674649.jpg",
    details: (
      <ul className="list-disc pl-5 space-y-2">
        <li>End-to-end logistics mapping</li>
        <li>Cost reduction and route optimization</li>
        <li>Supplier quality audits and performance tracking</li>
        <li>Inventory management and forecasting models</li>
      </ul>
    )
  },
  { 
    title: "Six Sigma", 
    desc: "Process improvement methodologies to minimize defects and maximize efficiency.",
    image: "/images/carousel_business_consulting_1788288885191.jpg",
    details: (
      <ul className="list-disc pl-5 space-y-2">
        <li>DMAIC methodology implementation</li>
        <li>Lean manufacturing practices</li>
        <li>Waste reduction and continuous improvement</li>
        <li>Staff training and certification (Green/Black Belts)</li>
      </ul>
    )
  },
];

const defaultTechnicalServices: ServiceItem[] = [
  {
    title: "AI Video Ads & Creative",
    desc: "User-Generated Content, CGI, and Cinematic narrative ads powered by AI generation.",
    image: "/images/carousel_ai_video_1788289531842.jpg",
    details: (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-text-primary mb-1">UGC Style</h4>
          <p>Authentic, relatable content designed to drive engagement on social platforms.</p>
        </div>
        <div>
          <h4 className="font-bold text-text-primary mb-1">CGI & 3D</h4>
          <p>Computer-Generated Imagery for mind-bending visual hooks and product showcases.</p>
        </div>
        <div>
          <h4 className="font-bold text-text-primary mb-1">Cinematic</h4>
          <p>High-production value narrative commercials generated with advanced AI video models.</p>
        </div>
      </div>
    )
  },
  {
    title: "Website Development",
    desc: "Static portfolios, dynamic web apps, and CMS-driven portals built for scale.",
    image: "/images/carousel_tech_dev_1788288897978.jpg",
    details: (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-text-primary mb-1">Static Sites</h4>
          <p>Lightning-fast, SEO-optimized landing pages and brochures.</p>
        </div>
        <div>
          <h4 className="font-bold text-text-primary mb-1">Dynamic Web Apps</h4>
          <p>React/Next.js platforms with complex state, databases, and APIs.</p>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="font-mono text-xs text-primary mb-2">TECH STACK:</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-surface rounded">Next.js</span>
            <span className="px-2 py-1 bg-surface rounded">React</span>
            <span className="px-2 py-1 bg-surface rounded">PHP</span>
            <span className="px-2 py-1 bg-surface rounded">MySQL</span>
          </div>
        </div>
      </div>
    )
  }
];

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState<"consulting" | "technical">("consulting");
  const [consultingServices, setConsultingServices] = useState<ServiceItem[]>(defaultConsultingServices);
  const [technicalServices, setTechnicalServices] = useState<ServiceItem[]>(defaultTechnicalServices);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("https://acms.harshaicreations.com/services");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiConsulting: ServiceItem[] = [];
          const apiTechnical: ServiceItem[] = [];

          data.data.forEach((item: { id: number; title: string; category: string; short_desc: string; image_url?: string; details?: string }) => {
            const lines = (item.details || "").split("\n").map(l => l.trim()).filter(Boolean);
            const formattedItem: ServiceItem = {
              id: item.id,
              title: item.title,
              category: item.category,
              desc: item.short_desc,
              image: item.image_url || (item.category === "Technical Expertise" ? "/images/carousel_tech_dev_1788288897978.jpg" : "/images/carousel_business_consulting_1788288885191.jpg"),
              details: lines.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {lines.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-secondary">{item.short_desc}</p>
              )
            };

            if (item.category === "Technical Expertise") {
              apiTechnical.push(formattedItem);
            } else {
              apiConsulting.push(formattedItem);
            }
          });

          if (apiConsulting.length > 0) setConsultingServices(apiConsulting);
          if (apiTechnical.length > 0) setTechnicalServices(apiTechnical);
        }
      } catch (err) {
        console.warn("Using fallback static services:", err);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="relative overflow-hidden bg-background">
      <section className="pt-20 pb-4 bg-background">
        <div className="container mx-auto px-6 text-center max-w-4xl min-h-[80px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 flex justify-center"
          >
            <TypewriterText text="Our Services" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            Delivering holistic business excellence through expert consulting and cutting-edge technical solutions.
          </motion.p>
        </div>
      </section>

      {/* Sticky Sub-Nav */}
      <div className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-6 flex justify-center space-x-8 py-4">
          <a 
            href="#consulting" 
            onClick={() => setActiveSection("consulting")}
            className={`font-heading font-bold transition-colors ${activeSection === "consulting" ? "text-primary" : "text-text-secondary hover:text-text-primary"}`}
          >
            Business Consulting
          </a>
          <a 
            href="#technical" 
            onClick={() => setActiveSection("technical")}
            className={`font-heading font-bold transition-colors ${activeSection === "technical" ? "text-accent" : "text-text-secondary hover:text-text-primary"}`}
          >
            Technical Expertise
          </a>
        </div>
      </div>

      {/* SECTION A: Business Consulting */}
      <section id="consulting" className="py-24 scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Business Consulting, Training & Auditing</h2>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {consultingServices.map((service, i) => (
              <motion.div key={service.id || i} variants={revealVariants} className="h-full">
                <ServiceFlipCard 
                  title={service.title}
                  frontDesc={service.desc}
                  imageSrc={service.image}
                  backDetails={service.details}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION B: Technical Expertise */}
      <section id="technical" className="py-24 bg-surface-alt border-t border-border scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Technical Expertise Division</h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
            <p className="mt-4 text-text-secondary max-w-2xl">Specialized founder-led services blending creative production with rigorous methodology.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {technicalServices.map((service, i) => (
              <motion.div key={service.id || i} variants={revealVariants} className="h-full">
                <ServiceFlipCard 
                  title={service.title}
                  frontDesc={service.desc}
                  imageSrc={service.image}
                  backDetails={service.details}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-background text-center border-t border-border">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Need a tailored solution?</h2>
        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-colors">
          Discuss Your Project
        </Link>
      </section>
    </div>
  );
}
