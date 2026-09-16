"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  CheckSquare, 
  ShieldCheck, 
  FlaskConical, 
  TrendingUp, 
  Globe2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

const RESOURCES = [
  {
    icon: ShieldCheck,
    title: "ISO Management Systems Implementation Checklist",
    category: "QMS & Compliance",
    desc: "A step-by-step readiness matrix covering ISO 9001, 14001, 45001, 27001, and 20000-1 gap analysis and audit preparation.",
    tags: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"]
  },
  {
    icon: FlaskConical,
    title: "NABL Laboratory Setup & Accreditation Blueprint",
    category: "Laboratory Standards",
    desc: "Comprehensive guidelines detailing laboratory layout, environmental controls, equipment calibration logs, and SOP structures.",
    tags: ["ISO/IEC 17025", "NABL Readiness", "Quality Manual"]
  },
  {
    icon: CheckSquare,
    title: "Hazard Identification & Risk Assessment (HIRA) Guide",
    category: "QHSE & Safety",
    desc: "Standard industrial risk scoring matrix, 5-Why root cause methodology, and CAPA resolution workflows for safety managers.",
    tags: ["HIRA", "Incident Investigation", "CAPA"]
  },
  {
    icon: TrendingUp,
    title: "Lean Six Sigma DMAIC Process Toolkit",
    category: "Operational Excellence",
    desc: "Practical templates for Process Capability (Cp/Cpk), Value Stream Mapping, 8D problem solving, and 5S audit scoresheets.",
    tags: ["DMAIC", "Lean 5S", "RCA Ishikawa"]
  },
  {
    icon: FileText,
    title: "Industrial Plant Insurance Coverage Checklist",
    category: "Risk Management",
    desc: "Summary checklist for assessing asset values across fire perils, machinery breakdown, transit marine covers, and employee liability.",
    tags: ["Asset Protection", "MBD Insurance", "Liability Covers"]
  },
  {
    icon: Globe2,
    title: "Export Market Readiness & Buyer Identification Guide",
    category: "International Trade",
    desc: "Strategic guide for Indian manufacturers preparing company profiles, technical flyers, and international inquiry handling protocols.",
    tags: ["Export Trade", "B2B Marketing", "Buyer Inquiries"]
  }
];

export default function ResourcesPage() {
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
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Knowledge Center & Downloads
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              <TypewriterText text="Industrial Resources & Guides" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              Complimentary checklists, compliance blueprints, and operational toolkits curated by Axar Creative Management Solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-surface-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((res, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <res.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                      {res.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white mb-2">
                    {res.title}
                  </h3>

                  <p className="text-text-secondary text-xs leading-relaxed mb-4">
                    {res.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {res.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-surface px-2 py-0.5 rounded-md border border-border text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <Link
                    href={`/contact?resource=${encodeURIComponent(res.title)}&type=quote`}
                    className="inline-flex items-center text-xs font-heading font-bold text-accent hover:text-accent-light transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Request Resource Copy
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Consulting Assistance */}
      <section className="py-20 bg-background text-center border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
            Need Dedicated Guidance for Your Audit?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary">
            Our team of certified auditors and consultants can perform an on-site mock audit and gap assessment for your facility.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-accent to-accent-light text-background font-heading font-bold text-xs rounded-full shadow-lg shadow-accent/20 hover:scale-105 transition-transform"
            >
              Book an On-Site Gap Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
