"use client";

import Link from "next/link";
import { 
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
    <div className="relative overflow-hidden bg-white text-[#0f172a]">
      {/* Hero Header */}
      <section className="pt-16 pb-12 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white border border-[#e2e8f0] text-[#b3282d] shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" /> Workforce Competency & Auditing
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-[#0f172a]">
              Industrial Training Programs
            </h1>
            <p className="text-xs md:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Practical, competency-driven workshops tailored for industrial personnel, supervisors, engineers, and management teams.
            </p>
          </div>
        </div>
      </section>

      {/* Value Pillars Strip */}
      <section className="py-6 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <BookOpen className="w-5 h-5 text-[#b3282d] mx-auto mb-1.5" />
              <h4 className="font-heading font-bold text-xs text-[#0f172a]">Practical Focus</h4>
              <p className="text-[10px] text-[#64748b] mt-0.5">Applied shop-floor case studies</p>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <Users className="w-5 h-5 text-[#a16207] mx-auto mb-1.5" />
              <h4 className="font-heading font-bold text-xs text-[#0f172a]">On-Site Delivery</h4>
              <p className="text-[10px] text-[#64748b] mt-0.5">Tailored to your plant shifts</p>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <Clock className="w-5 h-5 text-[#b3282d] mx-auto mb-1.5" />
              <h4 className="font-heading font-bold text-xs text-[#0f172a]">Flexible Modules</h4>
              <p className="text-[10px] text-[#64748b] mt-0.5">1-day, 3-day & Auditor tracks</p>
            </div>
            <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <Briefcase className="w-5 h-5 text-[#a16207] mx-auto mb-1.5" />
              <h4 className="font-heading font-bold text-xs text-[#0f172a]">Plant-Specific</h4>
              <p className="text-[10px] text-[#64748b] mt-0.5">Custom examples from your sector</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Grid */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-6xl space-y-6">
          {TRAINING_STREAMS.map((stream) => (
            <div
              key={stream.id}
              id={stream.id}
              className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md rounded-lg p-6 md:p-8 transition-all scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-11 h-11 rounded-md bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d] shrink-0">
                    <stream.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] bg-[#f8fafc] px-2 py-0.5 rounded border border-[#e2e8f0] inline-block mb-1">
                      {stream.badge}
                    </span>
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-[#0f172a]">
                      {stream.title}
                    </h2>
                    <p className="text-xs font-medium text-[#b3282d] mt-0.5">
                      Target Audience: {stream.target}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/contact?training=${encodeURIComponent(stream.title)}&type=quote`}
                    className="px-4 py-2 bg-[#b3282d] text-white font-heading font-bold text-xs rounded-md hover:bg-[#8c1e22] transition-colors inline-flex items-center shadow-xs"
                  >
                    Request Training Batch <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="pt-5 space-y-4">
                <p className="text-[#475569] text-xs md:text-sm leading-relaxed">
                  {stream.desc}
                </p>

                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0f172a] mb-3">
                    Key Curriculum Modules:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {stream.topics.map((top, idx) => (
                      <div key={idx} className="bg-[#f8fafc] border border-[#e2e8f0] p-2.5 rounded-md flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b3282d] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#475569]">{top}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-white border-t border-[#e2e8f0] text-center">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-2xl font-heading font-bold text-[#0f172a]">
            Need an In-House Workshop for Your Team?
          </h2>
          <p className="text-xs md:text-sm text-[#475569]">
            We conduct customized training sessions directly at your factory or plant facility in Bharuch, Dahej, Ankleshwar, Jhagadia or online.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-6 py-2.5 bg-[#b3282d] text-white font-heading font-bold text-xs rounded-md hover:bg-[#8c1e22] transition-colors shadow-xs"
            >
              Plan Your Training Schedule <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
