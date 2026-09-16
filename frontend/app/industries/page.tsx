"use client";

import { useState } from "react";
import Link from "next/link";
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
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

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
      <section className="pt-16 pb-12 bg-background border-b border-[#243042]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#171f2c] border border-[#243042] text-accent">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Multi-Sector Expertise
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              Industries We Serve
            </h1>
            <p className="text-xs md:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Domain-specific management systems, compliance consulting, technical training, and risk mitigation across 12 primary industrial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="sticky top-[58px] z-40 bg-[#0f141c] border-b border-[#243042] py-2.5">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#1f293d] border-accent text-white"
                    : "bg-[#171f2c] border-[#243042] text-text-secondary hover:text-white hover:border-[#3b4d66]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-14 bg-[#0c1017]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ind, idx) => (
              <div
                key={idx}
                className="bg-[#171f2c] border border-[#243042] hover:border-[#3b4d66] rounded-lg p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-[#1f293d] border border-[#3b4d66] flex items-center justify-center text-accent">
                      <ind.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0f141c] border border-[#243042] text-text-muted">
                      {ind.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-1">
                    {ind.title}
                  </h3>
                  <p className="text-[11px] text-accent mb-3">
                    {ind.scope}
                  </p>

                  <p className="text-text-secondary text-xs leading-relaxed mb-5">
                    {ind.desc}
                  </p>

                  <div className="space-y-1.5 border-t border-[#243042] pt-4 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                      Applied Solutions:
                    </span>
                    {ind.keyServices.map((srv, sIdx) => (
                      <div key={sIdx} className="flex items-start text-xs text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-accent shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#243042] flex items-center justify-between">
                  <Link
                    href={`/contact?industry=${encodeURIComponent(ind.title)}&type=quote`}
                    className="inline-flex items-center text-xs font-heading font-bold text-accent hover:text-accent-light transition-colors"
                  >
                    Request Sector Scope <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-background border-t border-[#243042] text-center">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-2xl font-heading font-bold text-white">
            Have a Specific Industrial Requirement?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary">
            Our principal consultant Ghanshyambhai K Patel visits facilities across Bharuch, Dahej, Ankleshwar, Jhagadia and nationwide to assess unique plant compliance requirements.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-6 py-2.5 bg-accent text-background font-heading font-bold text-xs rounded-md hover:bg-accent-light transition-colors"
            >
              Request Plant Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
