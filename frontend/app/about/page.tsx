"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Compass, 
  Workflow, 
  FileSpreadsheet, 
  Zap, 
  SearchCheck,
  ArrowRight,
  Building
} from "lucide-react";

const VALUES = [
  { title: "Professionalism", desc: "Rigorous standards, deep technical competence, and uncompromising ethical conduct in every plant engagement." },
  { title: "Practical Solutions", desc: "Straightforward management systems tailored for shop-floor adoption rather than overwhelming paperwork." },
  { title: "Client Focus", desc: "Deeply understanding client operational risks, factory constraints, and commercial goals to deliver measurable value." },
  { title: "Integrity", desc: "Honest, transparent guidance with genuine dedication to employee safety and enterprise longevity." },
  { title: "Continuous Improvement", desc: "Instilling a Kaizen continuous improvement mindset and data-driven methods for sustained progress." }
];

const APPROACH_STEPS = [
  { step: "01", title: "ASSESS", desc: "Understand your current systems, operational risks, and business requirements.", icon: SearchCheck },
  { step: "02", title: "PLAN", desc: "Develop a practical roadmap based on your objectives, deadlines, and resources.", icon: Compass },
  { step: "03", title: "IMPLEMENT", desc: "Support documentation, SOPs, infrastructure setup, and team implementation.", icon: Workflow },
  { step: "04", title: "VERIFY", desc: "Conduct internal audits, identify compliance gaps, and support corrective actions (CAPA).", icon: FileSpreadsheet },
  { step: "05", title: "IMPROVE", desc: "Strengthen the management system through ongoing review and continual improvement.", icon: Zap }
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-white text-[#0f172a]">
      {/* Hero Header */}
      <section className="pt-16 pb-12 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white border border-[#e2e8f0] text-[#b3282d] shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" /> Corporate Profile
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-[#0f172a]">
              About Axar Creative Management Solutions
            </h1>
            <p className="text-xs md:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Empowering organizations across India and global markets with practical management systems, NABL laboratory readiness, workforce training, and sustainable business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Story Section */}
      <section className="py-16 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Card: Proprietor & Credential Badge */}
            <div className="lg:col-span-5 bg-[#f8fafc] border border-[#e2e8f0] p-7 rounded-lg text-center space-y-4 shadow-xs">
              <div className="w-20 h-20 mx-auto rounded-md bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d]">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-[#0f172a]">
                  Ghanshyambhai K Patel
                </h3>
                <p className="text-xs font-bold text-[#b3282d] uppercase tracking-wider mt-1">
                  Proprietor & Principal Consultant
                </p>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Axar Creative Management Solutions
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-md border border-[#e2e8f0] text-xs text-[#475569] text-left space-y-1.5 shadow-xs">
                <div className="flex items-center text-[#0f172a] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d] shrink-0" /> Industrial Consultancy & Systems
                </div>
                <p className="leading-relaxed text-[#64748b]">
                  Specializing in QMS/EMS/OH&S standards, NABL testing laboratory setup, Six Sigma, and international business development across Bharuch industrial belts and nationwide.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-[#b3282d] text-white text-xs font-heading font-bold rounded-md hover:bg-[#8c1e22] transition-colors inline-block shadow-xs"
                >
                  Connect Directly
                </Link>
              </div>
            </div>

            {/* Right Column: Narrative Story */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1 block">
                  Our Mission & Evolution
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0f172a] mb-2">
                  Transforming Industrial Compliance into Business Opportunity
                </h2>
                <div className="w-12 h-0.5 bg-[#b3282d] mb-4" />
              </div>

              <div className="space-y-3.5 text-[#475569] text-xs md:text-sm leading-relaxed">
                <p>
                  <strong className="text-[#0f172a]">Axar Creative Management Solutions</strong> is an industrial consultancy and business-support organization focused on helping companies improve their systems, people and performance.
                </p>
                <p>
                  Led by <strong className="text-[#0f172a]">Ghanshyambhai K Patel, Proprietor</strong>, Axar provides practical solutions combining consultancy, training, compliance support and business-development services.
                </p>
                <p>
                  We work with organizations to develop effective management systems, strengthen operational performance, build competent teams and create new business opportunities across domestic and global markets.
                </p>
                <div className="text-xs text-[#b3282d] font-bold border-l-2 border-[#b3282d] pl-4 py-2 bg-[#f8fafc] rounded-r-md">
                  &ldquo;Better Systems • Safer Workplaces • Sustainable Growth&rdquo;
                </div>
                <p>
                  Our objective is to become a trusted long-term partner for industries that want to improve compliance, efficiency, safety and sustainable business growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1 block">
              Guiding Principles
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0f172a] mb-2">
              Our 5 Core Values
            </h2>
            <div className="w-12 h-0.5 bg-[#b3282d] mx-auto mb-3" />
            <p className="text-xs text-[#64748b] max-w-xl mx-auto">
              Professionalism • Practical Solutions • Client Focus • Integrity • Continuous Improvement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md p-5 rounded-lg transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d] mb-3 font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-heading font-bold text-sm text-[#0f172a] mb-1.5">
                  {val.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Approach Pipeline */}
      <section className="py-16 bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1 block">
              Execution Methodology
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0f172a] mb-2">
              Our 5-Step Implementation Pipeline
            </h2>
            <div className="w-12 h-0.5 bg-[#b3282d] mx-auto mb-3" />
            <p className="text-xs text-[#64748b] max-w-xl mx-auto">
              ASSESS &nbsp;→&nbsp; PLAN &nbsp;→&nbsp; IMPLEMENT &nbsp;→&nbsp; VERIFY &nbsp;→&nbsp; IMPROVE
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
                    <step.icon className="w-5 h-5 text-[#0f172a]" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0f172a] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[#475569] text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Locations (Office & Works) */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1 block">
              Physical Operations
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#0f172a] mb-2">
              Our Office & Works Locations
            </h2>
            <p className="text-xs text-[#64748b]">
              Conveniently located in Gujarat&apos;s premier industrial corridor in Bharuch & Saykha GIDC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Office */}
            <div className="bg-white border border-[#e2e8f0] p-6 rounded-lg space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-[#b3282d]">
                <MapPin className="w-5 h-5 shrink-0" />
                <h3 className="font-heading font-bold text-sm text-[#0f172a]">Registered Office</h3>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">
                26 Ravikiran complex Banglows,<br />
                Near Madhuram party Plot, Zadeshwar Chokdi,<br />
                Bharuch, 392011, Gujarat, India
              </p>
              <div className="pt-1 flex items-center space-x-4 text-xs">
                <a href="tel:+919925534751" className="text-[#b3282d] font-bold hover:underline flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1" /> +91 99255 34751
                </a>
              </div>
            </div>

            {/* Works */}
            <div className="bg-white border border-[#e2e8f0] p-6 rounded-lg space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-[#a16207]">
                <Building className="w-5 h-5 shrink-0" />
                <h3 className="font-heading font-bold text-sm text-[#0f172a]">Works Facility</h3>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">
                Green Park Farm, Bhersam Sayakha Road,<br />
                Navi Vasahat, Saykha GIDC,<br />
                Ta Vagra, District: Bharuch, Gujarat, India
              </p>
              <div className="pt-1 flex items-center space-x-4 text-xs">
                <a href="mailto:patelgk4257@gmail.com" className="text-[#0f172a] font-bold hover:underline flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-[#b3282d]" /> patelgk4257@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-[#b3282d] text-white font-heading font-bold text-xs rounded-md hover:bg-[#8c1e22] transition-colors shadow-xs"
            >
              Contact Us for On-Site Plant Review <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
