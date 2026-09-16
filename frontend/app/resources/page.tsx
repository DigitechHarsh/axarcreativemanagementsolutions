"use client";

import Link from "next/link";
import { 
  FileText, 
  Download, 
  CheckSquare, 
  ShieldCheck, 
  FlaskConical, 
  TrendingUp, 
  Globe2, 
  ArrowRight
} from "lucide-react";

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
      <section className="pt-16 pb-12 bg-background border-b border-[#243042]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#171f2c] border border-[#243042] text-accent">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Technical Center & Documentation
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              Industrial Resources & Guides
            </h1>
            <p className="text-xs md:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Checklists, compliance blueprints, and operational toolkits curated by Axar Creative Management Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-14 bg-[#0c1017]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((res, idx) => (
              <div
                key={idx}
                className="bg-[#171f2c] border border-[#243042] hover:border-[#3b4d66] p-6 rounded-lg flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-[#1f293d] border border-[#3b4d66] flex items-center justify-center text-accent">
                      <res.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted bg-[#0f141c] px-2 py-0.5 rounded border border-[#243042]">
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
                      <span key={tIdx} className="text-[10px] font-mono bg-[#0f141c] px-2 py-0.5 rounded border border-[#243042] text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#243042]">
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

      {/* Bottom CTA */}
      <section className="py-14 bg-background border-t border-[#243042] text-center">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-2xl font-heading font-bold text-white">
            Need Customized Documentation for Your Facility?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary">
            Axar Creative authors plant-specific Standard Operating Procedures (SOPs), Quality Manuals, and Audit Checklists directly aligned with your manufacturing processes.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-6 py-2.5 bg-accent text-background font-heading font-bold text-xs rounded-md hover:bg-accent-light transition-colors"
            >
              Consult on Custom SOPs <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
