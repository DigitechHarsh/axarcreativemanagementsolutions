"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Building,
  HelpCircle
} from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const SERVICES_DATA = [
  {
    id: "iso",
    icon: Award,
    title: "1. QMS & ISO Consultancy",
    subtitle: "Complete support for management-system implementation, improvement and certification.",
    tagline: "Structured Systems for Operational Excellence",
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
      "Lean Manufacturing & 5S Workplace Organization",
      "DMAIC Methodology Implementation",
      "Process Mapping & Capability Analysis",
      "Root Cause Analysis (RCA) & 5-Why / Fishbone Diagnostics",
      "Variation Reduction & Defect Elimination",
      "Industrial Waste Reduction (Muda Elimination)",
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

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Heading */}
      <section className="pt-20 pb-8 bg-background border-b border-border">
        <div className="container mx-auto px-6 text-center max-w-4xl min-h-[90px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              Axar Solutions Portfolio
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold flex justify-center text-text-primary">
              <TypewriterText text="Our Industrial Services" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              Professional consultancy, laboratory setup, workforce training, risk coverage, and business development designed for industrial excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Service Selector Tabs */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-3">
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
                  className={`px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-accent"
                  }`}
                >
                  <service.icon className="w-3.5 h-3.5" />
                  <span>{service.title.split(". ")[1]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Active Service Detail Section */}
      <section className="py-16 bg-surface-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface border border-border rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden"
          >
            {/* Header / Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <currentService.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20 inline-block mb-1.5">
                    {currentService.badge}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
                    {currentService.title}
                  </h2>
                  <p className="text-text-secondary text-sm mt-1 font-serif italic">
                    &ldquo;{currentService.tagline}&rdquo;
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/contact?service=${encodeURIComponent(currentService.title.split(". ")[1])}&type=quote`}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-heading font-bold text-xs rounded-full shadow-md shadow-primary/30 transition-all inline-flex items-center"
                >
                  Request Quote for this Service <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-10 pt-8">
              {/* Left Column: Description & Applicable Standards */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-base text-text-primary mb-3">
                    Overview & Industrial Relevance
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-text-primary mb-3">
                    Supported Standards & Frameworks
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {currentService.standards.map((std, idx) => (
                      <div key={idx} className="bg-background border border-border p-3 rounded-xl flex items-start space-x-2.5">
                        <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="font-heading font-bold text-xs text-text-primary block">{std.code}</span>
                          <span className="text-[11px] text-text-secondary leading-tight block">{std.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Offerings Checklist */}
              <div className="lg:col-span-6 bg-surface-alt border border-border p-6 rounded-2xl">
                <h3 className="font-heading font-bold text-base text-text-primary mb-4 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Key Scope & Implementation Offerings
                </h3>

                <ul className="space-y-3">
                  {currentService.offerings.map((offering, idx) => (
                    <li key={idx} className="flex items-start text-xs md:text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 shrink-0" />
                      <span>{offering}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-text-secondary">
                    Need customized scope for your facility?
                  </div>
                  <Link
                    href="/contact"
                    className="text-xs font-heading font-bold text-accent hover:underline flex items-center"
                  >
                    Consult our technical advisor <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All 7 Services Card Deck View */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-text-primary mb-3">
              Explore All 7 Specialized Divisions
            </h2>
            <p className="text-sm text-text-secondary">
              Everything under one roof: From ISO compliance and testing lab setup to industrial insurance and export market entry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                id={srv.id}
                className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between hover:border-primary transition-all scroll-mt-28"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <srv.icon className="w-8 h-8 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-alt border border-border text-text-secondary">
                      {srv.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">
                    {srv.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveTab(srv.id);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    View Details & Scope
                  </button>
                  <Link
                    href={`/contact?service=${encodeURIComponent(srv.title.split(". ")[1])}&type=quote`}
                    className="text-xs font-bold text-accent hover:underline flex items-center"
                  >
                    Get Quote <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-surface-alt text-center border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl space-y-5">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
            Looking for a Tailored Industrial Management Solution?
          </h2>
          <p className="text-sm text-text-secondary">
            Reach out to our proprietor Ghanshyambhai K Patel and the Axar team for a comprehensive plant audit and custom roadmap.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-heading font-bold text-sm rounded-full hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
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
