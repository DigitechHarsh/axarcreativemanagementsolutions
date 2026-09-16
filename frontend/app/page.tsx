"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  GraduationCap, 
  ShieldAlert, 
  TrendingUp, 
  FileText, 
  Globe2, 
  CheckCircle2, 
  ArrowRight,
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
  Compass,
  FileSpreadsheet,
  Workflow,
  SearchCheck,
  Zap,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

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
    title: "Multi-Site IMS Certification (ISO 9001, 14001, 45001)", 
    category_name: "ISO & QMS Consultancy", 
    description: "Complete Integrated Management System rollout across 3 chemical plants in Gujarat with zero non-conformances on final assessment.",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]",
    featured: true
  },
  { 
    title: "NABL Testing Laboratory Setup & Accreditation", 
    category_name: "Laboratory & NABL", 
    description: "Laboratory layout design, SOP formulation, equipment validation, and NABL accreditation clearance in record 6 months.",
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-[#fefce8] text-[#a16207] border border-[#fef08a]",
    featured: true
  },
  { 
    title: "Plant Risk Assessment & Comprehensive Insurance", 
    category_name: "Industrial Insurance", 
    description: "Risk identification and structured asset coverage covering property, boiler breakdown, and marine transit for an engineering plant.",
    image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    project_url: "",
    tag_style: "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]",
    featured: true
  }
];

const CORE_SERVICES = [
  {
    icon: Award,
    id: "iso",
    title: "QMS & ISO Consultancy",
    desc: "Complete support for management-system implementation, improvement and certification across ISO 9001, 14001, 45001, 50001, 22301, 37001, ISO 20000-1 IT Info & ISO 27001 IT Security.",
    badge: "ISO & IMS Standards",
    link: "/services#iso",
    highlights: ["Integrated Management Systems (IMS)", "CAPA & Internal Audit Support", "Lead Auditor Competency Programs"]
  },
  {
    icon: FlaskConical,
    id: "laboratory",
    title: "Laboratory Consultancy & Accreditation",
    desc: "From laboratory feasibility and layout infrastructure to SOP development, Quality Manuals, and complete NABL accreditation preparation.",
    badge: "NABL & ISO/IEC 17025",
    link: "/services#laboratory",
    highlights: ["Equipment Selection & Calibration", "Quality Manual & SOP Design", "NABL Audit Preparation"]
  },
  {
    icon: GraduationCap,
    id: "qhse",
    title: "QHSE & Food Safety Training",
    desc: "Practical workshops for industrial personnel covering Hazard Identification (HIRA), Workplace Safety, Emergency Preparedness, HACCP, GMP & GHP.",
    badge: "Workforce Competency",
    link: "/services#qhse",
    highlights: ["HIRA & Incident Investigation", "HACCP, GMP & Food Safety Culture", "Internal Auditor Qualification"]
  },
  {
    icon: ShieldAlert,
    id: "insurance",
    title: "Industrial Insurance Solutions",
    desc: "Assisting organizations in identifying and arranging structured risk coverage for plant & machinery, fire perils, marine transit, and employee liabilities.",
    badge: "Risk Identified • Managed",
    link: "/services#insurance",
    highlights: ["Property & Machinery Breakdown", "Marine / Transit & Engineering", "Public & Product Liability Covers"]
  },
  {
    icon: TrendingUp,
    id: "six-sigma",
    title: "Six Sigma Training",
    desc: "Develop a data-driven culture of continuous improvement using Lean Six Sigma, DMAIC methodology, Root Cause Analysis, and variation reduction.",
    badge: "Improve Quality • DMAIC",
    link: "/services#six-sigma",
    highlights: ["DMAIC Process Improvement", "Root Cause & Variation Reduction", "Green Belt Training Arrangements"]
  },
  {
    icon: FileText,
    id: "marketing",
    title: "Marketing Flyers & Business Communication",
    desc: "Converting technical specifications into clear, high-impact flyers, company profiles, brochures, and digital presentations for industrial clients.",
    badge: "Technical into Business",
    link: "/services#marketing",
    highlights: ["Product Flyers & Company Profiles", "Industrial Service Brochures", "Digital Marketing Creatives"]
  },
  {
    icon: Globe2,
    id: "export",
    title: "Export & International Marketing",
    desc: "Helping Indian businesses explore and develop international markets with export research, buyer identification, and global entry assistance.",
    badge: "Local to Global",
    link: "/services#export",
    highlights: ["Export Market & Buyer Research", "Distributor Development Support", "International Inquiry Management"]
  }
];

const INDUSTRIES = [
  { icon: Factory, name: "Manufacturing", desc: "Process optimization, lean flow & ISO standards" },
  { icon: Cpu, name: "Engineering", desc: "QA/QC protocols & machinery breakdown risk" },
  { icon: Flame, name: "Chemical & Petrochemical", desc: "HIRA, EMS compliance & process safety" },
  { icon: Pill, name: "Pharmaceutical & Healthcare", desc: "GMP, cleanroom validation & ISO 13485" },
  { icon: UtensilsCrossed, name: "Food & Beverage", desc: "HACCP, GMP, GHP & food safety culture" },
  { icon: Microscope, name: "Testing & Calibration Labs", desc: "ISO/IEC 17025 compliance & NABL audits" },
  { icon: HardHat, name: "Construction & Infrastructure", desc: "Site safety, OH&S & contractor audits" },
  { icon: Building2, name: "Corporate & Service Sectors", desc: "ISO 27001 ISMS & IT service management" },
  { icon: Fuel, name: "Energy & Utilities", desc: "ISO 50001 energy audits & hazard control" },
  { icon: Truck, name: "Logistics & Warehousing", desc: "Supply chain security & transit risk cover" },
  { icon: Ship, name: "Export-Oriented Units (EOUs)", desc: "Global compliance & buyer audits" },
  { icon: Sprout, name: "Agro & Food Processing", desc: "Organic standards & hygiene certifications" }
];

const APPROACH_STEPS = [
  { step: "01", title: "ASSESS", desc: "Comprehensive gap analysis, operational risk mapping, and standard compliance review.", icon: SearchCheck },
  { step: "02", title: "PLAN", desc: "Structured roadmap with milestones, team resource allocation, and documentation architecture.", icon: Compass },
  { step: "03", title: "IMPLEMENT", desc: "Developing practical SOPs, conducting workforce workshops, and establishing controls.", icon: Workflow },
  { step: "04", title: "VERIFY", desc: "Rigorous internal audit rounds, management review meetings, and CAPA resolution.", icon: FileSpreadsheet },
  { step: "05", title: "IMPROVE", desc: "Continual improvement reviews, surveillance readiness, and sustained efficiency.", icon: Zap }
];

const STANDARDS_DIRECTORY = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System (QMS)",
    category: "Management Systems",
    timeline: "2 to 4 Months",
    keyDeliverable: "Quality Manual, SOPs, Internal Audit, Management Review",
    summary: "Standardizes operations, enhances customer satisfaction, and ensures consistent product/service delivery."
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management System (EMS)",
    category: "Environment & Safety",
    timeline: "2 to 4 Months",
    keyDeliverable: "Aspect-Impact Register, Legal Matrix, Environmental Objectives",
    summary: "Systematic control over environmental impacts, waste minimization, and statutory compliance."
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety (OH&S)",
    category: "Environment & Safety",
    timeline: "2 to 4 Months",
    keyDeliverable: "HIRA Register, Emergency Preparedness Plan, Incident Protocols",
    summary: "Proactive hazard prevention, accident reduction, and safer industrial workplace conditions."
  },
  {
    code: "ISO/IEC 17025:2017",
    title: "Testing & Calibration Laboratories",
    category: "Laboratory & NABL",
    timeline: "4 to 6 Months",
    keyDeliverable: "Measurement Uncertainty, PT/ILC Protocols, Quality Manual",
    summary: "NABL readiness demonstrating technical competence and reliable test/calibration results."
  },
  {
    code: "ISO 27001:2022",
    title: "Information Security Management (ISMS)",
    category: "IT & Cybersecurity",
    timeline: "3 to 5 Months",
    keyDeliverable: "Statement of Applicability (SoA), Risk Treatment Plan",
    summary: "Protects sensitive organizational data, intellectual property, and client data integrity."
  },
  {
    code: "ISO 20000-1:2018",
    title: "IT Service Management System (ITSM)",
    category: "IT & Cybersecurity",
    timeline: "3 to 4 Months",
    keyDeliverable: "Service Catalogue, SLA Architecture, Incident & Problem SOPs",
    summary: "Aligns IT delivery with industrial business demands for high availability and reliability."
  }
];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(DEFAULT_FEATURED);
  const [activeStandardTab, setActiveStandardTab] = useState(0);

  useEffect(() => {
    fetch("https://acms.harshaicreations.com/api.php?type=projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featured = data.filter((p: any) => p.featured == 1 || p.featured === true);
          if (featured.length > 0) {
            setFeaturedProjects(featured.slice(0, 3));
          } else {
            setFeaturedProjects(data.slice(0, 3));
          }
        }
      })
      .catch(() => {
        // Fallback to default
      });
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-[#0f172a]">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Technical Credential Strip */}
      <div className="bg-white border-b border-[#e2e8f0] py-3 px-6 overflow-x-auto">
        <div className="container mx-auto flex items-center justify-between min-w-[760px] text-xs text-[#475569]">
          <span className="flex items-center text-[#0f172a] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#b3282d] mr-2" />
            ISO 9001 • 14001 • 45001 • 50001
          </span>
          <span className="text-[#cbd5e1]">|</span>
          <span className="flex items-center text-[#0f172a] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#a16207] mr-2" />
            ISO/IEC 17025 / NABL Readiness
          </span>
          <span className="text-[#cbd5e1]">|</span>
          <span className="flex items-center text-[#0f172a] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#b3282d] mr-2" />
            ISO 27001 (ISMS) & 20000-1 (ITSM)
          </span>
          <span className="text-[#cbd5e1]">|</span>
          <span className="flex items-center text-[#0f172a] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#a16207] mr-2" />
            Six Sigma & Industrial Insurance
          </span>
        </div>
      </div>

      {/* 3. Introduction & Value Proposition */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#f8fafc] border border-[#e2e8f0] text-[#b3282d]">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" /> Your Partner for Industrial Excellence
            </div>
            
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0f172a] leading-tight">
              &ldquo;Better Systems • Safer Workplaces • Sustainable Growth&rdquo;
            </h2>

            <p className="text-sm md:text-base text-[#475569] max-w-3xl mx-auto leading-relaxed">
              Axar Creative Management Solutions provides professional consultancy, training and business-support services to industries seeking improved quality, safety, environmental performance, regulatory compliance and sustainable commercial growth.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <Link
                href="/services"
                className="px-6 py-2.5 bg-[#b3282d] text-white font-heading font-bold text-xs md:text-sm rounded-md hover:bg-[#8c1e22] transition-all inline-flex items-center shadow-sm"
              >
                Explore 7 Core Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact?type=quote"
                className="px-6 py-2.5 bg-white border border-[#cbd5e1] text-[#0f172a] hover:bg-[#f8fafc] hover:border-[#94a3b8] font-heading font-bold text-xs md:text-sm rounded-md transition-all shadow-xs"
              >
                Request a Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Services (7 Pillars Grid) */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1.5 block">
              Core Capabilities
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0f172a] mb-2.5">
              Our 7 Core Services
            </h2>
            <div className="w-12 h-0.5 bg-[#b3282d] mx-auto mb-3" />
            <p className="text-[#64748b] max-w-2xl mx-auto text-xs md:text-sm">
              Comprehensive consulting, accreditation, training, risk management, and market expansion solutions for modern enterprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md rounded-lg p-6 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d]">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#0f172a] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-[#475569] text-xs leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <div className="space-y-1.5 border-t border-[#f1f5f9] pt-4 mb-5">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-[#475569]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#b3282d] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={service.link}
                  className="inline-flex items-center text-xs font-heading font-bold text-[#b3282d] hover:text-[#8c1e22] transition-colors mt-auto pt-2"
                >
                  View Details & Scope <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Standards Directory & Scope Explorer */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1.5 block">
              Standards & Implementation Frameworks
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0f172a]">
              Technical Specifications Directory
            </h2>
            <p className="text-xs md:text-sm text-[#64748b] max-w-xl mx-auto mt-2">
              Review implementation requirements, typical delivery timelines, and audit scope for primary industrial standards.
            </p>
          </div>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6">
            {/* Standards Tab Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6 border-b border-[#e2e8f0] pb-4">
              {STANDARDS_DIRECTORY.map((item, idx) => (
                <button
                  key={item.code}
                  onClick={() => setActiveStandardTab(idx)}
                  className={`px-3 py-2 rounded-md text-xs font-heading font-bold transition-all text-center border cursor-pointer ${
                    activeStandardTab === idx
                      ? "bg-white border-[#b3282d] text-[#b3282d] shadow-xs"
                      : "bg-white border-[#e2e8f0] text-[#64748b] hover:text-[#0f172a] hover:border-[#cbd5e1]"
                  }`}
                >
                  {item.code}
                </button>
              ))}
            </div>

            {/* Selected Standard Details */}
            {STANDARDS_DIRECTORY[activeStandardTab] && (
              <div className="space-y-5 bg-white p-5 rounded-md border border-[#e2e8f0]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#b3282d] uppercase tracking-wider block">
                      {STANDARDS_DIRECTORY[activeStandardTab].category}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-[#0f172a] mt-0.5">
                      {STANDARDS_DIRECTORY[activeStandardTab].code}: {STANDARDS_DIRECTORY[activeStandardTab].title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 bg-[#f8fafc] border border-[#e2e8f0] rounded text-xs text-[#475569]">
                      Est. Timeline: <strong className="text-[#0f172a]">{STANDARDS_DIRECTORY[activeStandardTab].timeline}</strong>
                    </span>
                    <Link
                      href={`/contact?type=quote&standard=${encodeURIComponent(STANDARDS_DIRECTORY[activeStandardTab].code)}`}
                      className="px-4 py-2 bg-[#b3282d] text-white text-xs font-heading font-bold rounded-md hover:bg-[#8c1e22] transition-colors shadow-xs"
                    >
                      Request Scope
                    </Link>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-[#475569] leading-relaxed bg-[#f8fafc] p-4 rounded-md border border-[#e2e8f0]">
                  {STANDARDS_DIRECTORY[activeStandardTab].summary}
                </p>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 bg-[#f8fafc] rounded-md border border-[#e2e8f0]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                      Key Deliverables:
                    </span>
                    <p className="text-xs text-[#0f172a]">
                      {STANDARDS_DIRECTORY[activeStandardTab].keyDeliverable}
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#f8fafc] rounded-md border border-[#e2e8f0]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                      Audit Readiness:
                    </span>
                    <p className="text-xs text-[#0f172a]">
                      Stage 1 documentation review + Stage 2 certification body audit support.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Industries We Serve (12 Sectors Grid) */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1.5 block">
              Multi-Sector Experience
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0f172a] mb-2.5">
              Industries We Serve
            </h2>
            <div className="w-12 h-0.5 bg-[#b3282d] mx-auto mb-3" />
            <p className="text-[#64748b] max-w-2xl mx-auto text-xs md:text-sm">
              Providing sector-specific compliance, safety systems, and growth frameworks across key industrial hubs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={i}
                className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-xs p-4 rounded-lg flex flex-col justify-center items-center text-center transition-all group"
              >
                <div className="w-10 h-10 rounded-md bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d] mb-2.5">
                  <ind.icon className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-xs md:text-sm text-[#0f172a] mb-1">
                  {ind.name}
                </h4>
                <p className="text-[11px] text-[#64748b] line-clamp-2">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/industries"
              className="inline-flex items-center text-xs font-heading font-bold px-5 py-2.5 rounded-md bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0f172a] transition-all shadow-xs"
            >
              View Sector Solutions <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 5-Step Approach Pipeline */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1.5 block">
              Structured Methodology
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0f172a] mb-2.5">
              Our 5-Step Approach
            </h2>
            <div className="w-12 h-0.5 bg-[#b3282d] mx-auto mb-3" />
            <p className="text-[#64748b] max-w-2xl mx-auto text-xs md:text-sm">
              A systematic pipeline engineered for seamless audit readiness and sustainable operational success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {APPROACH_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbd5e1] p-5 rounded-lg flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-extrabold text-lg text-[#b3282d]">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-white border border-[#e2e8f0] flex items-center justify-center text-[#0f172a] shadow-xs">
                      <step.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0f172a] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[#64748b] text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#e2e8f0] flex items-center text-[10px] font-bold text-[#94a3b8] uppercase">
                  <span>Phase {idx + 1} of 5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Founder Credential & Regional Presence */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Founder Card */}
            <div className="lg:col-span-5 bg-white border border-[#e2e8f0] p-6 rounded-2xl text-center space-y-4 shadow-xs group">
              <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden relative border-2 border-[#b3282d] shadow-xs">
                <Image
                  src="/team/ghanshyam.jpeg"
                  alt="Ghanshyambhai K Patel"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-[#0f172a]">
                  Ghanshyambhai K Patel
                </h3>
                <p className="text-xs font-semibold text-[#b3282d] mt-0.5">
                  Proprietor & Principal Consultant
                </p>
                <p className="text-xs text-[#64748b] mt-0.5">
                  B.Sc. Tech • Certified Lead Auditor
                </p>
              </div>

              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0] text-xs text-[#475569] text-left space-y-1.5">
                <p className="text-[#0f172a] font-bold">30+ Years Industrial Experience</p>
                <p className="text-[11px] leading-relaxed text-[#64748b]">
                  Extensive expertise in petrochemicals, pharmaceuticals, chemical manufacturing, safety compliance, and ISO/NABL systems across Gujarat industrial corridors.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href="tel:+919925534751"
                  className="px-4 py-2 bg-[#b3282d] text-white text-xs font-heading font-bold rounded-md hover:bg-[#8c1e22] transition-colors inline-flex items-center justify-center shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5" /> +91 99255 34751
                </a>
                <a
                  href="mailto:patelgk4257@gmail.com"
                  className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#0f172a] text-xs font-heading font-bold rounded-md hover:bg-[#f8fafc] transition-colors inline-flex items-center justify-center"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" /> Email Direct
                </a>
              </div>
            </div>

            {/* Right: Regional Footprint & Works */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1 block">
                  Gujarat Industrial Belt Operations
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-[#0f172a]">
                  Strategic Presence in Bharuch & Saykha GIDC
                </h3>
              </div>

              <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                Positioned in the heart of Gujarat&apos;s petrochemical and industrial manufacturing zone, Axar Creative provides rapid on-site consulting, emergency audit preparedness, and regular management system audits across Bharuch, Dahej, Ankleshwar, Jhagadia, Saykha, and Panoli.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-white border border-[#e2e8f0] rounded-lg shadow-xs">
                  <span className="text-xs font-bold text-[#0f172a] block mb-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" /> Bharuch City Office
                  </span>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    26 Ravikiran complex Banglows, Near Madhuram party Plot, Zadeshwar Chokdi, Bharuch - 392011, Gujarat
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#e2e8f0] rounded-lg shadow-xs">
                  <span className="text-xs font-bold text-[#0f172a] block mb-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#a16207]" /> Saykha GIDC Branch
                  </span>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    Green Park Farm, Bhersam Sayakha Road, Navi Vasahat, Saykha GIDC, Ta Vagra, District Bharuch, Gujarat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Featured Projects / Client Implementations */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1.5 block">
                Track Record
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0f172a]">
                Featured Implementations
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-xs font-heading font-bold text-[#b3282d] hover:text-[#8c1e22] transition-colors mt-3 md:mt-0"
            >
              View Full Projects Archive <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((p, idx) => (
              <div
                key={p.id || idx}
                className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all"
              >
                <div className="relative h-44 w-full bg-[#f1f5f9]">
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${p.tag_style}`}>
                      {p.category_name}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-heading font-bold text-[#0f172a] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#64748b] leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                    <span className="text-[#64748b] text-[11px] font-medium">Audit: 100% Passed</span>
                    <Link
                      href="/portfolio"
                      className="text-[#b3282d] hover:text-[#8c1e22] font-bold inline-flex items-center"
                    >
                      Case details <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Direct CTA Banner */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-white border border-[#e2e8f0] p-8 md:p-10 rounded-lg space-y-4 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0f172a]">
              Ready to Upgrade Your Industrial Systems?
            </h2>
            <p className="text-xs md:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Contact our Bharuch office for a comprehensive gap audit, ISO roadmap planning, NABL laboratory design, or workforce safety training proposals.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/contact?type=quote"
                className="px-6 py-2.5 bg-[#b3282d] text-white font-heading font-bold text-xs md:text-sm rounded-md hover:bg-[#8c1e22] transition-colors shadow-xs"
              >
                Request Proposal
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-white border border-[#cbd5e1] text-[#0f172a] hover:bg-[#f8fafc] text-xs md:text-sm font-heading font-bold rounded-md transition-colors"
              >
                Direct Office Inquiries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
