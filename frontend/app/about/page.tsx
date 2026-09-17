"use client";

import { useState } from "react";
import Image from "next/image";
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
  Building,
  CheckCircle2,
  Users,
  X,
  GraduationCap,
  Briefcase,
  BadgeCheck,
  ExternalLink
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  subRole?: string;
  qualification: string;
  experience: string;
  image: string;
  bio: string;
  fullBio: string;
  credentials?: string[];
  imsCompetency?: string;
  auditExposure?: string;
  specialties: string[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ghanshyam Patel",
    role: "ISO 20001 IT information & ISO 27001 IT security Expert",
    subRole: "Proprietor & Principal Consultant",
    qualification: "B.Sc. Tech • Certified Lead Auditor",
    experience: "30+ Years Industrial & IT Consulting Experience",
    image: "/team/ghanshyam.jpeg",
    bio: "Specializing in ISO 20000-1 IT Information Management, ISO 27001 IT Security frameworks, and Integrated Management Systems across Gujarat and national industries.",
    fullBio: "Ghanshyambhai K. Patel is the Proprietor and Principal Consultant at Axar Creative Management Solutions. With over three decades of industrial leadership, he guides enterprises in implementing robust Information Security (ISO 27001), IT Service Management (ISO 20000-1), Integrated Management Systems (ISO 9001/14001/45001), and Six Sigma methodologies.",
    credentials: [
      "Certified Lead Auditor for ISO 9001 / 14001 / 45001",
      "ISO 27001 IT Security Management Systems Specialist",
      "ISO 20000-1 IT Service Management Consultant",
      "B.Sc. Technology Graduate with 30+ Years Industry Leadership"
    ],
    specialties: ["ISO 20001 IT Information", "ISO 27001 IT Security", "IMS (9001/14001/45001)"]
  },
  {
    name: "Narendra J. Patel, CSP",
    role: "QHSE expert and lead auditor for ISO certification",
    subRole: "Certified Safety Professional (CSP®) • Associate Safety Professional (ASP®)",
    qualification: "CSP®, ASP®, MBA (Safety Management), NEBOSH IGC, B.Sc. Chemistry",
    experience: "21+ Years Progressive Experience (Kuwait & India)",
    image: "/team/narenda.jpeg",
    bio: "Seasoned HSE professional with 21+ years experience in Kuwait & India across petrochemical, heavy chemical, petroleum coke, and construction environments.",
    fullBio: "Narendra J. Patel, CSP is a seasoned Health, Safety & Environment (HSE) professional with more than 21 years of progressive experience, including extensive experience in Kuwait and India across petrochemical, heavy chemical, petroleum coke processing/manufacturing, and construction environments. For the past 10+ years, he has been leading HSE departmental functions, with responsibility for HSE management systems, operational safety, compliance, workforce engagement, audits, risk management, incident prevention, emergency preparedness, and continual improvement.",
    credentials: [
      "Certified Safety Professional (CSP®) - Board of Certified Safety Professionals (BCSP, USA)",
      "Associate Safety Professional (ASP®)",
      "Certified PHA–HAZOP Leader",
      "MBA in Safety Management",
      "NEBOSH International General Certificate (NEBOSH IGC)",
      "B.Sc. in Chemistry",
      "Diploma in Industrial Safety & Diploma in Fire & Safety",
      "Diploma in Business Management"
    ],
    imsCompetency: "Possesses strong competency in ISO-based Integrated Management Systems (IMS) and is trained as an Internal Auditor for ISO 9001 (QMS), ISO 14001 (EMS), and ISO 45001 (OH&S). Practical experience in planning, conducting, and participating in comprehensive IMS audits in both Kuwait and India.",
    auditExposure: "Assessment of management-system implementation, legal and statutory compliance, operational controls, risk and opportunity management, HSE documentation, competency and awareness, emergency preparedness, incident management, corrective actions (CAPA), compliance monitoring, audit findings closure, and continual improvement.",
    specialties: ["QHSE & ISO Lead Auditing", "Certified Safety Professional (CSP/ASP)", "PHA–HAZOP & IMS Audits"]
  },
  {
    name: "Dr Mehul Patel",
    role: "Lab expert/ lab accreditation and lab consultant ISO 17025",
    subRole: "Laboratory Testing & Calibration Specialist",
    qualification: "Testing & Calibration Specialist • ISO 17025 Expert",
    experience: "Senior Laboratory Consultant",
    image: "/team/mehul.jpeg",
    bio: "Lab expert and consultant specializing in ISO/IEC 17025 laboratory accreditation, NABL readiness, testing & calibration protocols, and GLP method SOP development.",
    fullBio: "Dr. Mehul Patel is a distinguished Lab Expert, Accreditation Specialist, and Laboratory Consultant with extensive experience in ISO/IEC 17025 accreditation, NABL audit readiness, testing & calibration infrastructure setup, measurement uncertainty estimation, and GLP compliance.",
    credentials: [
      "ISO/IEC 17025 Laboratory Accreditation Consultant",
      "NABL Audit Readiness & Quality Manual Preparation",
      "Measurement Uncertainty & Calibration Protocols Specialist",
      "Standard Operating Procedure (SOP) & GLP Developer"
    ],
    specialties: ["ISO 17025 Lab Accreditation", "Lab Consultant & NABL Setup", "GLP & Method SOP Development"]
  },
  {
    name: "Harsh Patel",
    role: "AI Creation expert",
    subRole: "AI Architect & Digital Automation Specialist",
    qualification: "AI Architect • Digital Systems Specialist",
    experience: "AI Solutions & Enterprise Technologies",
    image: "/team/harsh2.jpeg",
    bio: "AI Creation expert pioneering intelligent automated workflows, smart digital business systems, enterprise process automation, and next-generation technology integration.",
    fullBio: "Harsh Patel is an AI Creation Expert dedicated to developing smart enterprise architectures, automated intelligence pipelines, system integrations, and modern digital capabilities for industrial and commercial organizations.",
    credentials: [
      "AI Systems Architecture & Autonomous Agent Workflows",
      "Enterprise Process Automation & Integration",
      "Digital Transformation & Smart Systems Engineering",
      "Data Security & High-Efficiency Cloud Implementations"
    ],
    specialties: ["AI Creation expert", "Automated Workflows", "Digital Systems Architecture"]
  }
];

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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
            <div className="lg:col-span-5 bg-[#f8fafc] border border-[#e2e8f0] p-6 md:p-7 rounded-2xl text-center space-y-4 shadow-xs">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d]">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-[#0f172a]">
                  Ghanshyam Patel
                </h3>
                <p className="text-xs font-bold text-[#b3282d] uppercase tracking-wider mt-1">
                  Proprietor & Principal Consultant
                </p>
                <p className="text-xs text-[#64748b] mt-0.5">
                  ISO 20001 IT information & ISO 27001 IT security Expert
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#e2e8f0] text-xs text-[#475569] text-left space-y-1.5 shadow-xs">
                <div className="flex items-center text-[#0f172a] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d] shrink-0" /> Industrial Consultancy & Systems
                </div>
                <p className="leading-relaxed text-[#64748b]">
                  Specializing in ISO 27001 IT Security, ISO 20001 IT Information, QMS/EMS/OH&S standards, NABL laboratory setup, and corporate governance across Gujarat and nationwide.
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
                  Led by <strong className="text-[#0f172a]">Ghanshyam Patel, Proprietor</strong>, Axar provides practical solutions combining consultancy, training, compliance support and business-development services.
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

      {/* Core Team Members Section (4 Core Team Grid with B&W to Color Hover + Modal) */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-[#b3282d] mb-1.5 block flex items-center justify-center">
              <Users className="w-3.5 h-3.5 mr-1.5" /> Technical Leadership
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#0f172a] mb-2.5">
              Meet Our Core Team
            </h2>
            <div className="w-12 h-0.5 bg-[#b3282d] mx-auto mb-3" />
            <p className="text-xs md:text-sm text-[#64748b] max-w-2xl mx-auto">
              Experienced lead auditors, laboratory specialists, safety professionals, and technology consultants dedicated to your operational excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="group bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-lg rounded-2xl p-5 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Square image frame with rounded corners & clean B&W -> Color Hover */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f1f5f9] border border-[#e2e8f0] mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
                    />
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#0f172a] group-hover:text-[#b3282d] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-bold text-[#b3282d] mt-0.5 leading-snug line-clamp-2">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-[#64748b] font-medium my-2">
                    {member.qualification}
                  </p>

                  <p className="text-xs text-[#475569] leading-relaxed mb-3">
                    {member.bio}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="pt-3 border-t border-[#f1f5f9] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                      Key Areas:
                    </span>
                    {member.specialties.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center text-[11px] text-[#475569]">
                        <CheckCircle2 className="w-3 h-3 mr-1.5 text-[#b3282d] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white text-[#0f172a] border border-[#e2e8f0] hover:border-[#b3282d] text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center group/btn"
                  >
                    <span>View Full Profile</span>
                    <ArrowRight className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Details Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e2e8f0] shadow-2xl p-6 md:p-8 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#e2e8f0] pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#f1f5f9] border border-[#e2e8f0] shrink-0">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#0f172a]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs font-bold text-[#b3282d] mt-0.5">
                    {selectedMember.role}
                  </p>
                  <p className="text-[11px] text-[#64748b] font-medium">
                    {selectedMember.experience}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-xs text-[#475569]">
              {/* Executive Overview */}
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0f172a] flex items-center mb-2">
                  <Briefcase className="w-4 h-4 mr-2 text-[#b3282d]" /> Professional Overview
                </h4>
                <p className="leading-relaxed bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0] whitespace-pre-line text-[#334155]">
                  {selectedMember.fullBio}
                </p>
              </div>

              {/* Credentials & Qualifications */}
              {selectedMember.credentials && selectedMember.credentials.length > 0 && (
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0f172a] flex items-center mb-2">
                    <GraduationCap className="w-4 h-4 mr-2 text-[#b3282d]" /> Credentials & Certifications
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2 bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
                    {selectedMember.credentials.map((cred, cIdx) => (
                      <div key={cIdx} className="flex items-start space-x-2 text-[11px] text-[#334155]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b3282d] shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* IMS Competency (Specifically for Narendra J Patel or others) */}
              {selectedMember.imsCompetency && (
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0f172a] flex items-center mb-2">
                    <BadgeCheck className="w-4 h-4 mr-2 text-[#b3282d]" /> ISO & Integrated Management System Competency
                  </h4>
                  <p className="leading-relaxed bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0] text-[#334155]">
                    {selectedMember.imsCompetency}
                  </p>
                </div>
              )}

              {/* Audit Exposure */}
              {selectedMember.auditExposure && (
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0f172a] flex items-center mb-2">
                    <ShieldCheck className="w-4 h-4 mr-2 text-[#b3282d]" /> Audit & Implementation Exposure
                  </h4>
                  <p className="leading-relaxed bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0] text-[#334155]">
                    {selectedMember.auditExposure}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#e2e8f0]">
              <Link
                href="/contact"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-[#b3282d] text-white text-xs font-heading font-bold rounded-lg hover:bg-[#8c1e22] transition-colors inline-flex items-center shadow-xs"
              >
                <span>Consult with {selectedMember.name.split(" ")[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-[#f1f5f9] text-[#475569] hover:text-[#0f172a] text-xs font-bold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Core Values Section */}
      <section className="py-16 bg-white border-b border-[#e2e8f0]">
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
                className="bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md p-5 rounded-xl transition-all"
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
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
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
                className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] p-5 rounded-xl flex flex-col justify-between transition-all"
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
      <section className="py-16 bg-white">
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
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 rounded-xl space-y-3 shadow-xs">
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
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 rounded-xl space-y-3 shadow-xs">
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
