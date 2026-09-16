"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Award, 
  FlaskConical, 
  GraduationCap, 
  ShieldAlert, 
  TrendingUp, 
  FileText, 
  Globe2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";

const SERVICES_DATA = [
  {
    id: "iso",
    icon: Award,
    title: "1. QMS & ISO Consultancy",
    subtitle: "Complete support for management-system implementation, improvement and certification.",
    tagline: "Better Systems • Safer Workplaces • Sustainable Growth",
    badge: "ISO & IMS Standards",
    description: "We provide end-to-end consultancy for organizations aiming to achieve international management standards. From initial gap assessments and system design to internal audits and certification readiness, we ensure your management systems enhance operational efficiency without burdensome paperwork.",
    standards: [
      { code: "ISO 9001", name: "Quality Management System (QMS)" },
      { code: "ISO 14001", name: "Environmental Management System (EMS)" },
      { code: "ISO 45001", name: "Occupational Health & Safety (OH&S)" },
      { code: "ISO 50001", name: "Energy Management System (EnMS)" },
      { code: "ISO 22301", name: "Business Continuity Management (BCMS)" },
      { code: "ISO 37001", name: "Anti-Bribery Management System (ABMS)" },
      { code: "ISO 20000-1", name: "IT Service Management System (ITSM)" },
      { code: "ISO 27001", name: "Information Security Management System (ISMS)" },
      { code: "IMS", name: "Integrated Management Systems (ISO 9001 + 14001 + 45001)" }
    ],
    offerings: [
      "Initial Gap Analysis & Comprehensive System Design",
      "Standard Operating Procedures (SOP) & Documentation Development",
      "Internal Audit Support & Mock Compliance Audits",
      "Management Review Support & Leadership Facilitation",
      "Certification Body Preparation & Audit Coordination",
      "Corrective Action / CAPA (Corrective & Preventive Action) Support",
      "Lead Auditor & Internal Auditor Competency Training"
    ]
  },
  {
    id: "laboratory",
    icon: FlaskConical,
    title: "2. Laboratory Consultancy & Accreditation",
    subtitle: "From laboratory planning to operational readiness and accreditation support.",
    tagline: "Build a laboratory that is technically capable, compliant and ready for accreditation.",
    badge: "NABL & ISO/IEC 17025",
    description: "Setting up and maintaining an accredited testing or calibration laboratory requires strict infrastructure, equipment qualification, and meticulous SOP compliance. Axar guides you step-by-step from layout blueprinting through successful NABL accreditation.",
    standards: [
      { code: "ISO/IEC 17025", name: "General Requirements for Testing & Calibration Laboratories" },
      { code: "NABL", name: "National Accreditation Board for Testing and Calibration Laboratories" },
      { code: "GLP", name: "Good Laboratory Practice & Safety Guidelines" }
    ],
    offerings: [
      "Laboratory Feasibility & Strategic Planning",
      "Laboratory Layout & Infrastructure Guidance",
      "Testing Equipment Selection & Calibration Support",
      "SOP & Technical Method Documentation Development",
      "Quality Manual & Management System Implementation",
      "Internal Audit Preparation & Inter-Laboratory Comparisons",
      "NABL-Related Consultancy, Documentation & Audit Preparation",
      "Testing Laboratory Commissioning & Operational Setup Support"
    ]
  },
  {
    id: "qhse",
    icon: GraduationCap,
    title: "3. QHSE & Food Safety Training",
    subtitle: "Practical training designed for industrial personnel, supervisors, managers and management teams.",
    tagline: "Empowering Personnel with Applied Workplace Safety & Food Hygiene Competencies",
    badge: "QHSE & HACCP",
    description: "Workforce competency is the cornerstone of industrial safety and regulatory compliance. Our hands-on training programs bridge theoretical knowledge with practical shop-floor application, fostering a proactive safety and quality culture.",
    standards: [
      { code: "QHSE", name: "Quality, Health, Safety & Environmental Management" },
      { code: "HACCP", name: "Hazard Analysis and Critical Control Points" },
      { code: "GMP / GHP", name: "Good Manufacturing Practice & Good Hygiene Practice" },
      { code: "ISO 22000 / FSSC", name: "Food Safety Management Systems" }
    ],
    offerings: [
      "Quality & Environmental Awareness Training",
      "Occupational Health & Safety (OHS) Workshops",
      "Risk Assessment & Hazard Identification (HIRA)",
      "Incident Investigation & Root Cause Analysis (RCA)",
      "Internal Auditor Training & Corrective Action (CAPA)",
      "Emergency Preparedness & Response Mock Drills",
      "Food Safety Awareness, HACCP, GMP & GHP Implementation",
      "Food Safety Management Systems & Culture Building"
    ]
  },
  {
    id: "insurance",
    icon: ShieldAlert,
    title: "4. Industrial Insurance Solutions",
    subtitle: "We assist industrial organizations in identifying and arranging appropriate insurance solutions through suitable insurance partners.",
    tagline: "Risk identified. Risk understood. Risk managed.",
    badge: "Industrial Risk Cover",
    description: "Industrial enterprises face critical asset, operational, and liability risks. We evaluate your plant vulnerabilities and facilitate tailored insurance arrangements through established partner networks.",
    standards: [
      { code: "Property Risk", name: "Asset & Plant Infrastructure Protection" },
      { code: "Machinery Cover", name: "Breakdown, Boilers & Mechanical Systems" },
      { code: "Liability Risk", name: "Public, Product & Workmen Compensation" }
    ],
    offerings: [
      "Industrial Property Insurance",
      "Plant & Machinery Coverage",
      "Fire and Special Perils Protection",
      "Machinery Breakdown (MBD) Risk Cover",
      "Marine / Transit & Cargo Insurance",
      "Public Liability & Product Liability Solutions",
      "Employee-Related Covers & Workmen Compensation",
      "Engineering Insurance & Project Erection Risks",
      "Comprehensive Industrial Risk Review"
    ]
  },
  {
    id: "six-sigma",
    icon: TrendingUp,
    title: "5. Six Sigma Training",
    subtitle: "Develop a data-driven culture of continuous improvement.",
    tagline: "Improve quality • Reduce variation • Increase efficiency",
    badge: "Lean & DMAIC",
    description: "Empower your engineering and production teams with quantitative problem-solving tools. Our Six Sigma training focuses on eliminating process bottlenecks, minimizing product defects, and driving substantial operational cost savings.",
    standards: [
      { code: "Lean Six Sigma", name: "Waste Reduction & Flow Optimization" },
      { code: "DMAIC", name: "Define • Measure • Analyze • Improve • Control" },
      { code: "Green Belt", name: "Applied Project Execution & Statistical Analysis" }
    ],
    offerings: [
      "Six Sigma Awareness for Leadership & Teams",
      "Lean Manufacturing & 5S Visual Workplace Management",
      "DMAIC Methodology Implementation",
      "Process Mapping & Capability Analysis",
      "Root Cause Analysis (RCA) & 5-Why / Fishbone Diagnostics",
      "Variation Reduction & Defect Elimination",
      "Industrial Waste Reduction (Eliminating 8 Types of Muda)",
      "Green Belt & Advanced Programs through Specialized Arrangements"
    ]
  },
  {
    id: "marketing",
    icon: FileText,
    title: "6. Marketing Flyers & Business Communication",
    subtitle: "Professional marketing support for industrial and business organizations.",
    tagline: "We convert technical information into clear, professional business communication.",
    badge: "Industrial Collateral",
    description: "Industrial products and B2B services require crisp, technically sound marketing collateral. We translate complex engineering specifications into high-impact corporate brochures, product flyers, and digital presentations.",
    standards: [
      { code: "B2B Collateral", name: "Technical Flyers & Data Sheets" },
      { code: "Corporate Profiles", name: "Investor & Client Presentations" },
      { code: "Digital Assets", name: "Brochures, Catalogues & Web Creatives" }
    ],
    offerings: [
      "Industrial Product Flyers & Technical Data Summaries",
      "Comprehensive Company Profiles & Capability Decks",
      "Industrial Service Brochures & Catalogues",
      "Digital Marketing Creatives & Social Media Graphics",
      "Presentation Materials & Sales Pitch Decks",
      "Product & Service Value Proposition Communication",
      "Trade Show & Industrial Promotional Material"
    ]
  },
  {
    id: "export",
    icon: Globe2,
    title: "7. Export & International Marketing Services",
    subtitle: "Helping Indian businesses explore and develop international markets.",
    tagline: "From local capability to global opportunity.",
    badge: "Global Market Entry",
    description: "Expanding into international trade requires targeted market intelligence, buyer trust, and cross-border compliance. We assist manufacturing and trading businesses in establishing strong footholds across global markets.",
    standards: [
      { code: "Market Entry", name: "Global Trade Analysis & Target Geography" },
      { code: "Buyer Matching", name: "B2B Partner & Distributor Identification" },
      { code: "Compliance", name: "Export Product Presentation & Trade Inquiries" }
    ],
    offerings: [
      "Export Market Research & Country-Wise Feasibility",
      "International Buyer & Importer Identification",
      "Export-Ready Product Presentation & Cataloging",
      "Export Marketing Materials & Global Branding",
      "Business Introduction & B2B Matchmaking Support",
      "International Market-Entry Strategic Assistance",
      "Global Inquiry Management & Follow-Up Support",
      "Overseas Distributor & Channel Partner Development"
    ]
  }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("iso");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && SERVICES_DATA.some(s => s.id === hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const currentService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  const filteredServices = SERVICES_DATA.filter(s => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.standards.some(std => std.code.toLowerCase().includes(query) || std.name.toLowerCase().includes(query)) ||
      s.offerings.some(off => off.toLowerCase().includes(query))
    );
  });

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Header */}
      <section className="pt-16 pb-12 bg-background border-b border-[#243042]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#171f2c] border border-[#243042] text-accent">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Comprehensive Industrial Spectrum
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              Our 7 Core Services
            </h1>
            <p className="text-xs md:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Professional consultancy, laboratory setup, workforce training, risk coverage, and business development designed for industrial excellence.
            </p>

            {/* Quick Search */}
            <div className="pt-3 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search standards (e.g. 27001, NABL, HACCP, Six Sigma)..."
                  className="w-full bg-[#171f2c] border border-[#243042] rounded-md pl-10 pr-4 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Selector Tabs */}
      <section className="sticky top-[58px] z-40 bg-[#0f141c] border-b border-[#243042] py-2.5">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-1">
            {SERVICES_DATA.map((service) => {
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveTab(service.id);
                    window.location.hash = service.id;
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 border ${
                    isActive
                      ? "bg-[#1f293d] border-accent text-white"
                      : "bg-[#171f2c] border-[#243042] text-text-secondary hover:text-white hover:border-[#3b4d66]"
                  }`}
                >
                  <service.icon className="w-3.5 h-3.5 text-accent" />
                  <span>{service.title.split(". ")[1]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Active Service Detail Explorer */}
      <section className="py-12 bg-[#0c1017]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-[#171f2c] border border-[#243042] rounded-lg p-6 md:p-8">
            {/* Header / Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#243042]">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-md bg-[#1f293d] border border-[#3b4d66] flex items-center justify-center text-accent shrink-0">
                  <currentService.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted bg-[#0f141c] px-2 py-0.5 rounded border border-[#243042] inline-block mb-1">
                    {currentService.badge}
                  </span>
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
                    {currentService.title}
                  </h2>
                  <p className="text-accent text-xs mt-0.5 font-mono">
                    // {currentService.tagline}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/contact?service=${encodeURIComponent(currentService.title.split(". ")[1])}&type=quote`}
                  className="px-5 py-2.5 bg-accent text-background font-heading font-bold text-xs rounded-md hover:bg-accent-light transition-colors inline-flex items-center"
                >
                  Request Formal Scope <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 pt-6">
              {/* Left Column: Description & Applicable Standards */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-accent mb-2">
                    Scope & Methodology
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-2.5">
                    Standards & Frameworks Covered:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {currentService.standards.map((std, idx) => (
                      <div key={idx} className="bg-[#0f141c] border border-[#243042] p-2.5 rounded-md flex items-start space-x-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono font-bold text-xs text-white block">{std.code}</span>
                          <span className="text-[11px] text-text-secondary leading-tight block">{std.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Offerings Checklist */}
              <div className="lg:col-span-6 bg-[#0f141c] border border-[#243042] p-5 rounded-md">
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-3 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-accent" /> Key Deliverables & Activities:
                </h3>

                <ul className="space-y-2">
                  {currentService.offerings.map((offering, idx) => (
                    <li key={idx} className="flex items-start text-xs text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2.5 shrink-0" />
                      <span>{offering}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-[#243042] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-text-muted">Need an on-site gap assessment?</span>
                  <Link
                    href="/contact"
                    className="text-xs font-heading font-bold text-accent hover:underline flex items-center"
                  >
                    Schedule Plant Visit <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All 7 Services Grid */}
      <section className="py-16 bg-background border-t border-[#243042]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-2">
              All 7 Specialized Divisions
            </h2>
            <p className="text-xs md:text-sm text-text-secondary">
              Everything under one roof: From ISO compliance and testing lab setup to industrial insurance and export market entry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                id={srv.id}
                className="bg-[#171f2c] border border-[#243042] hover:border-[#3b4d66] p-5 rounded-lg flex flex-col justify-between transition-colors scroll-mt-24"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-md bg-[#1f293d] border border-[#3b4d66] flex items-center justify-center text-accent">
                      <srv.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0f141c] border border-[#243042] text-text-secondary">
                      {srv.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mb-1.5">
                    {srv.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">
                    {srv.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#243042] flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setActiveTab(srv.id);
                      window.scrollTo({ top: 320, behavior: "smooth" });
                    }}
                    className="font-bold text-accent hover:underline cursor-pointer"
                  >
                    View Scope & Standards
                  </button>
                  <Link
                    href={`/contact?service=${encodeURIComponent(srv.title.split(". ")[1])}&type=quote`}
                    className="font-bold text-white hover:text-accent flex items-center"
                  >
                    Get Quote <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-[#0c1017] text-center border-t border-[#243042]">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
            Looking for a Tailored Industrial Management Solution?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary">
            Reach out to our proprietor Ghanshyambhai K Patel and the Axar team for a comprehensive plant audit and custom roadmap.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-6 py-2.5 bg-accent text-background font-heading font-bold text-xs rounded-md hover:bg-accent-light transition-colors"
            >
              Request a Consultation / Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
