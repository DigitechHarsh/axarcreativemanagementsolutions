"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
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
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Filter
} from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

const INDUSTRIES_DETAILED = [
  {
    icon: Factory,
    title: "Manufacturing",
    category: "Heavy & Engineering",
    scope: "Heavy Machinery, Assembly Lines & Discrete Production",
    desc: "From lean layout design and Six Sigma process optimization to ISO 9001 and ISO 14001 certification, we streamline manufacturing shop floors for higher throughput and lower defects.",
    keyServices: ["ISO 9001 QMS & ISO 14001 EMS", "Lean Six Sigma & DMAIC Defect Reduction", "Plant & Machinery Breakdown Insurance", "Internal Quality Auditor Competency"]
  },
  {
    icon: Cpu,
    title: "Engineering",
    category: "Heavy & Engineering",
    scope: "Precision Fabrication, Electrical & Mechanical Units",
    desc: "We assist engineering units in developing robust Quality Assurance (QA/QC) documentation, precision calibration protocols, and comprehensive risk management.",
    keyServices: ["Integrated Management Systems (IMS)", "Equipment Calibration & Layout Readiness", "Engineering & Project Risk Insurance", "Workplace Safety & OHS Training"]
  },
  {
    icon: Flame,
    title: "Chemical & Petrochemical",
    category: "Process & Chemicals",
    scope: "Specialty Chemicals, Polymers & Bulk Reagents",
    desc: "High-hazard chemical processing plants require stringent Hazard Identification and Risk Assessment (HIRA), Environmental Management (ISO 14001), and emergency preparedness.",
    keyServices: ["HIRA & Process Safety Audits", "ISO 45001 & ISO 14001 Certification", "Emergency Preparedness & Mock Drills", "Special Perils & Chemical Transit Insurance"]
  },
  {
    icon: Pill,
    title: "Pharmaceutical & Healthcare",
    category: "Life Sciences",
    scope: "Formulations, APIs & Medical Devices",
    desc: "Strict compliance with Good Manufacturing Practices (GMP), ISO 13485 / ISO 9001, cleanroom protocols, and testing laboratory readiness.",
    keyServices: ["GMP / GLP Documentation & Audit Prep", "Testing Laboratory ISO/IEC 17025 Setup", "CAPA & Cleanroom SOP Development", "Product Liability & Cold-Chain Transit Cover"]
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    category: "Life Sciences",
    scope: "Food Processing, Packaging & Dairy",
    desc: "Ensuring uncompromising hygiene and regulatory compliance through HACCP, GMP, GHP, and ISO 22000 / FSSC 22000 food safety management systems.",
    keyServices: ["HACCP & Food Safety Culture Training", "GMP / GHP Inspection & Gap Analysis", "ISO 22000 FSMS Certification Support", "Export Readiness for Processed Foods"]
  },
  {
    icon: Microscope,
    title: "Laboratory & Testing",
    category: "Life Sciences",
    scope: "Analytical, Chemical, Calibration & R&D Labs",
    desc: "Complete operational and technical readiness for laboratories aiming for NABL accreditation, ISO/IEC 17025 compliance, and testing excellence.",
    keyServices: ["NABL Accreditation Consultancy", "Quality Manual & Method SOP Development", "Inter-Laboratory Testing Comparisons", "Equipment Qualification & Selection Support"]
  },
  {
    icon: HardHat,
    title: "Construction",
    category: "Infrastructure",
    scope: "Commercial, Industrial & Residential Projects",
    desc: "Managing high-risk construction environments with robust site safety plans, ISO 45001 systems, incident investigation, and contractor risk coverage.",
    keyServices: ["Site Safety Inspection & HIRA Protocols", "Contractor & Worker Safety Training", "Public Liability & Contractor's All Risk (CAR)", "Environmental Management for Sites"]
  },
  {
    icon: Building2,
    title: "Infrastructure",
    category: "Infrastructure",
    scope: "Roadways, Power Grids & Industrial Estates",
    desc: "Supporting large-scale infrastructure consortiums in establishing integrated management systems, energy management (ISO 50001), and regulatory approvals.",
    keyServices: ["ISO 50001 Energy Management", "Integrated Management Systems (IMS)", "Large-Scale Project Risk Review", "Business Continuity Management (ISO 22301)"]
  },
  {
    icon: Fuel,
    title: "Oil & Gas",
    category: "Process & Chemicals",
    scope: "Refineries, Pipelines, Distribution & Storage",
    desc: "Zero-compromise occupational safety, asset integrity, process hazard analysis, and international quality governance across oil and gas facilities.",
    keyServices: ["Stringent OHS & Incident Investigation", "Fire & Special Perils Insurance Reviews", "Internal Audit & Regulatory Compliance", "Technical Data & Safety Brochures"]
  },
  {
    icon: Truck,
    title: "Logistics & Services",
    category: "Trade & Services",
    scope: "Warehousing, Freight Forwarding & Fleet Operations",
    desc: "Optimizing supply chain resilience, transit safety, ISO 9001 service quality, and marine cargo risk solutions.",
    keyServices: ["Marine Transit & Cargo Insurance", "Supply Chain SOPs & Warehouse 5S", "ISO 9001 Service Quality Systems", "Fleet Driver Safety & Emergency Response"]
  },
  {
    icon: Ship,
    title: "Export & Trading",
    category: "Trade & Services",
    scope: "Merchant Exporters, B2B Traders & Global Sourcing",
    desc: "Helping Indian businesses enter international markets with targeted market research, buyer identification, product catalogs, and trade compliance.",
    keyServices: ["Export Market Feasibility & Research", "Overseas Buyer & Importer Matching", "International Inquiry Management", "Export Marketing Flyers & Company Profiles"]
  },
  {
    icon: Sprout,
    title: "Agriculture & Allied Industries",
    category: "Process & Chemicals",
    scope: "Agro-processing, Seeds, Fertilizers & Irrigation",
    desc: "Bridging traditional agricultural production with modern quality standards, environmental safety, and sustainable export practices.",
    keyServices: ["Agro-Product Quality Standards", "Environmental Compliance & Waste Reduction", "Export Packaging & Presentation Material", "Storage & Crop Protection Insurance"]
  }
];

export default function IndustriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Heavy & Engineering", "Process & Chemicals", "Life Sciences", "Infrastructure", "Trade & Services"];

  const filtered = selectedCategory === "All" 
    ? INDUSTRIES_DETAILED 
    : INDUSTRIES_DETAILED.filter(i => i.category === selectedCategory);

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
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Sector Specialization
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              <TypewriterText text="Industries We Serve" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              Delivering customized ISO systems, NABL laboratory readiness, workforce safety training, and risk management across 12 vital industrial domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="sticky top-16 md:top-20 z-40 bg-[#0d1117]/90 backdrop-blur-xl border-b border-border/80 py-3 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-accent to-accent-light text-background font-extrabold shadow-md shadow-accent/20"
                    : "bg-surface border border-border text-text-secondary hover:text-white hover:border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-surface-alt">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                      <ind.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {ind.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-accent block">
                        {ind.scope}
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-xs leading-relaxed mb-5">
                    {ind.desc}
                  </p>

                  <div className="border-t border-border/80 pt-4 mb-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2.5 flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-accent" /> Key Services Delivered:
                    </h4>
                    <ul className="space-y-2">
                      {ind.keyServices.map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start text-xs text-text-secondary">
                          <CheckCircle className="w-3 h-3 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?industry=${encodeURIComponent(ind.title)}&type=quote`}
                    className="inline-flex items-center text-xs font-heading font-bold text-accent hover:text-accent-light transition-colors"
                  >
                    Request Sector Roadmap <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 bg-background text-center border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
            Don&apos;t See Your Specific Sector Listed?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary">
            Our management frameworks and ISO methodologies are universally adaptable to custom commercial operations and specialty manufacturing units.
          </p>
          <div className="pt-3">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-accent to-accent-light text-background font-heading font-bold text-xs rounded-full shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
            >
              Discuss Your Facility Requirements <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
