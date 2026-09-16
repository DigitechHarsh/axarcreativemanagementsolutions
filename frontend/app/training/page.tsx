"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  UtensilsCrossed, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Users,
  Clock,
  Briefcase
} from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const TRAINING_STREAMS = [
  {
    id: "lead-auditor",
    icon: Award,
    title: "Lead Auditor & Internal Auditor Training",
    target: "Quality Managers, Technical Leads, Compliance Officers & Engineers",
    badge: "Auditor Certification",
    desc: "Professional training programs designed for personnel seeking to develop rigorous internal-auditor and lead-auditor competencies across international standards.",
    topics: [
      "ISO 9001:2015 Quality Management Systems (QMS) Auditing",
      "ISO 14001:2015 Environmental Management Systems (EMS) Auditing",
      "ISO 45001:2018 Occupational Health & Safety (OH&S) Auditing",
      "ISO 27001 Information Security Management Systems (ISMS) Auditing",
      "ISO 20000-1 IT Service Management (ITSM) Auditing",
      "Audit Planning, Checklist Creation, Opening/Closing Meetings",
      "Non-Conformance Reporting (NCR) and Objective Evidence Evaluation",
      "Corrective & Preventive Action (CAPA) Root-Cause Verification"
    ]
  },
  {
    id: "qhse",
    icon: ShieldCheck,
    title: "QHSE (Quality, Health, Safety & Environment) Training",
    target: "Plant Supervisors, Safety Officers, EHS Teams & Shop-Floor Workers",
    badge: "Industrial Safety",
    desc: "Practical, behavior-based workplace training to ensure employee safety, minimize occupational hazards, and uphold environmental compliance.",
    topics: [
      "Industrial Quality Awareness & Standard Work Principles",
      "Environmental Awareness & Waste Segregation / Spillage Control",
      "Occupational Health & Safety (OH&S) Core Rules & PPE Compliance",
      "Risk Assessment & Hazard Identification (HIRA) Methodology",
      "Workplace Incident Investigation & 5-Why Root Cause Diagnostics",
      "Internal Auditor Skills & Corrective Action (CAPA) Support",
      "Emergency Preparedness, Evacuation Plans & Mock Drill Execution",
      "Shop-Floor Machine Guarding, Chemical Handling & Electrical Safety"
    ]
  },
  {
    id: "food-safety",
    icon: UtensilsCrossed,
    title: "Food Safety & Hygiene Training",
    target: "Food Processors, Kitchen Supervisors, Quality Controllers & Packaging Staff",
    badge: "HACCP & GMP",
    desc: "Comprehensive modules designed to safeguard food products from biological, chemical, and physical contamination throughout the production chain.",
    topics: [
      "Food Safety Awareness & Biological / Allergen Hazard Control",
      "Hazard Analysis and Critical Control Points (HACCP) Implementation",
      "Good Manufacturing Practice (GMP) for Food Facilities",
      "Good Hygiene Practice (GHP) & Personal Sanitation Protocols",
      "Food Safety Management Systems (ISO 22000 / FSSC 22000 Standards)",
      "Food Safety Internal Auditor Competencies",
      "Building a Resilient Food Safety & Sanitation Culture",
      "Pest Control, Water Quality & Cold-Chain Integrity"
    ]
  },
  {
    id: "six-sigma",
    icon: TrendingUp,
    title: "Six Sigma & Continuous Improvement Training",
    target: "Continuous Improvement Managers, Production Heads & Process Engineers",
    badge: "Lean DMAIC",
    desc: "Data-driven problem solving and statistical methodologies to reduce process variation, eliminate shop-floor waste, and maximize throughput.",
    topics: [
      "Six Sigma Awareness & Culture of Continuous Improvement",
      "Lean Manufacturing & 5S Visual Workplace Management",
      "DMAIC Roadmap: Define • Measure • Analyze • Improve • Control",
      "Process Flow Mapping & Value Stream Mapping (VSM)",
      "Root Cause Analysis (RCA) using Ishikawa Fishbone & Pareto Charts",
      "Process Variation Reduction & Statistical Defect Elimination",
      "Industrial Waste Reduction (Eliminating 8 Types of Muda)",
      "Green Belt & Advanced Programs through Specialized Arrangements"
    ]
  }
];

export default function TrainingPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Header */}
      <section className="pt-20 pb-8 bg-background border-b border-border">
        <div className="container mx-auto px-6 text-center max-w-4xl min-h-[90px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Workforce Excellence
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold flex justify-center text-text-primary">
              <TypewriterText text="Industrial Training Programs" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              Practical, competency-driven workshops tailored for industrial personnel, supervisors, engineers, and management teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Pillars Banner */}
      <section className="py-8 bg-surface border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-heading font-bold text-sm text-text-primary">Practical Focus</h4>
              <p className="text-[11px] text-text-secondary">Applied shop-floor case studies</p>
            </div>
            <div className="p-4">
              <Users className="w-6 h-6 text-accent mx-auto mb-2" />
              <h4 className="font-heading font-bold text-sm text-text-primary">On-Site & Customized</h4>
              <p className="text-[11px] text-text-secondary">Tailored to your plant schedule</p>
            </div>
            <div className="p-4">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-heading font-bold text-sm text-text-primary">Flexible Modules</h4>
              <p className="text-[11px] text-text-secondary">1-day, 3-day & Lead Auditor tracks</p>
            </div>
            <div className="p-4">
              <Briefcase className="w-6 h-6 text-accent mx-auto mb-2" />
              <h4 className="font-heading font-bold text-sm text-text-primary">Certified Competency</h4>
              <p className="text-[11px] text-text-secondary">Official training certification</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Training Modules */}
      <section className="py-16 bg-surface-alt">
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          {TRAINING_STREAMS.map((stream, idx) => (
            <motion.div
              key={stream.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={revealVariants}
              className="bg-surface border border-border rounded-3xl p-6 md:p-10 shadow-lg hover:border-accent transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <stream.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20 inline-block mb-1">
                      {stream.badge}
                    </span>
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
                      {stream.title}
                    </h2>
                    <p className="text-xs text-text-secondary mt-1">
                      <strong>Target Audience:</strong> {stream.target}
                    </p>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/contact?training=${encodeURIComponent(stream.title)}&type=quote`}
                    className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-heading font-bold text-xs rounded-full transition-all inline-flex items-center shadow-md shadow-primary/25"
                  >
                    Schedule Training Batch <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="pt-6 grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-3">
                  <h3 className="font-heading font-bold text-sm text-text-primary">Program Overview</h3>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {stream.desc}
                  </p>
                  <div className="p-4 bg-surface-alt rounded-xl border border-border text-xs text-text-secondary">
                    Training is delivered directly at your facility or in structured workshop environments with interactive assessments and real-world mock audits.
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="font-heading font-bold text-sm text-text-primary mb-3 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Key Curriculum Modules Covered:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {stream.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="bg-background border border-border p-3 rounded-xl flex items-start space-x-2 text-xs text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-background text-center border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
            Plan an In-House Industrial Training Workshop
          </h2>
          <p className="text-sm text-text-secondary">
            Equip your operational supervisors and technical managers with certified auditing and safety competencies.
          </p>
          <div className="pt-3">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-heading font-bold text-xs rounded-full hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              Request Training Proposal <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
