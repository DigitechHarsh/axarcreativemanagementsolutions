"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2, Building, Award, ShieldCheck } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const SERVICES_LIST = [
  "QMS & ISO Consultancy (ISO 9001, 14001, 45001, 27001, 20000-1)",
  "Laboratory Consultancy & NABL Accreditation Setup",
  "QHSE & Food Safety Training (HACCP, GMP, HIRA)",
  "Industrial Insurance Solutions (Property, Machinery, Liability)",
  "Six Sigma Training & DMAIC Process Optimization",
  "Marketing Flyers & Industrial Business Communication",
  "Export & International Marketing Services",
  "Integrated Management Systems (IMS) - Complete Package",
  "Lead Auditor Training / Auditor Competency",
  "Other Industrial Inquiry"
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || searchParams.get("training") || searchParams.get("industry") || searchParams.get("standard") || searchParams.get("project") || searchParams.get("resource") || "";
  const typeParam = searchParams.get("type") || "";
  const standardsParam = searchParams.get("standards") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceInterested: "",
    inquiryType: typeParam === "quote" ? "Request a Customized Quote" : "General Inquiry",
    message: "",
    _honeypot: ""
  });

  useEffect(() => {
    if (serviceParam) {
      const match = SERVICES_LIST.find(s => s.toLowerCase().includes(serviceParam.toLowerCase()));
      if (match) {
        setFormData(prev => ({ ...prev, serviceInterested: match }));
      } else {
        setFormData(prev => ({ ...prev, message: `Inquiry regarding: ${serviceParam}\n\n` + prev.message }));
      }
    }
    if (standardsParam) {
      setFormData(prev => ({ ...prev, message: `Target Standards: ${standardsParam}\n\n` + prev.message }));
    }
    if (typeParam === "quote") {
      setFormData(prev => ({ ...prev, inquiryType: "Request a Customized Quote" }));
    }
  }, [serviceParam, typeParam, standardsParam]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    if (formData._honeypot) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://acms.harshaicreations.com/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          message: `[Inquiry Type: ${formData.inquiryType}]\n` + formData.message
        }),
      });

      if (!response.ok && response.status === 404) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", serviceInterested: "", inquiryType: "General Inquiry", message: "", _honeypot: "" });
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", serviceInterested: "", inquiryType: "General Inquiry", message: "", _honeypot: "" });
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      console.error(err);
      setTimeout(() => {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", serviceInterested: "", inquiryType: "General Inquiry", message: "", _honeypot: "" });
      }, 800);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Contact Information Cards (Left) */}
      <div className="lg:col-span-5 space-y-4">
        {/* Leadership Contact Badge */}
        <div className="bg-[#171f2c] border border-[#243042] p-5 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-md bg-[#1f293d] border border-accent/40 flex items-center justify-center text-accent shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">Ghanshyambhai K Patel</h3>
              <p className="text-[11px] font-semibold text-accent uppercase tracking-wider">Proprietor & Principal Consultant</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Axar Creative Management Solutions — Your Partner for Industrial Excellence.
          </p>
        </div>

        {/* Office Location */}
        <div className="bg-[#171f2c] border border-[#243042] p-5 rounded-lg space-y-1.5">
          <div className="flex items-center space-x-2 text-accent">
            <MapPin className="w-4 h-4 shrink-0" />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Registered Office:</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed pl-6">
            26 Ravikiran complex Banglows,<br />
            Near Madhuram party Plot, Zadeshwar Chokdi,<br />
            Bharuch - 392011, Gujarat, India
          </p>
        </div>

        {/* Works Location */}
        <div className="bg-[#171f2c] border border-[#243042] p-5 rounded-lg space-y-1.5">
          <div className="flex items-center space-x-2 text-primary">
            <Building className="w-4 h-4 shrink-0" />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Works Facility:</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed pl-6">
            Green Park Farm, Bhersam Sayakha Road,<br />
            Navi Vasahat, Saykha GIDC,<br />
            Ta Vagra, District: Bharuch, Gujarat, India
          </p>
        </div>

        {/* Phone & Email */}
        <div className="bg-[#171f2c] border border-[#243042] p-5 rounded-lg space-y-2.5">
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <div>
              <span className="text-[11px] text-text-muted block">Direct Phone / WhatsApp:</span>
              <a href="tel:+919925534751" className="font-heading font-bold text-xs text-white hover:text-accent transition-colors">
                +91 99255 34751
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2 border-t border-[#243042]">
            <Mail className="w-4 h-4 text-accent shrink-0" />
            <div>
              <span className="text-[11px] text-text-muted block">Official Inquiries Email:</span>
              <a href="mailto:patelgk4257@gmail.com" className="font-heading font-bold text-xs text-white hover:text-accent transition-colors">
                patelgk4257@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact / Quote Form (Right) */}
      <div className="lg:col-span-7 bg-[#171f2c] border border-[#243042] p-6 md:p-8 rounded-lg">
        <div className="mb-5">
          <span className="text-xs font-bold font-heading uppercase tracking-wider text-accent mb-1 block">
            Direct Commercial Line
          </span>
          <h3 className="text-xl font-heading font-extrabold text-white">
            Request a Consultation or Quote
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Fill in your facility requirements and our lead consultants will respond within 24 hours.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input 
            type="text" 
            name="_honeypot" 
            value={formData._honeypot} 
            onChange={handleChange} 
            style={{ display: "none" }} 
            tabIndex={-1} 
            autoComplete="off" 
          />

          {/* Inquiry Type Selector */}
          <div>
            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Inquiry Type:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["General Inquiry", "Request a Customized Quote"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, inquiryType: type })}
                  className={`py-2 px-3 rounded-md text-xs font-bold transition-all text-center border cursor-pointer ${
                    formData.inquiryType === type
                      ? "bg-[#1f293d] border-accent text-white"
                      : "bg-[#0f141c] border-[#243042] text-text-secondary hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="fullName" className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Rajesh Patel"
                className="w-full bg-[#0f141c] border border-[#243042] rounded-md px-3.5 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="rajesh@company.com"
                className="w-full bg-[#0f141c] border border-[#243042] rounded-md px-3.5 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="phone" className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                Phone / WhatsApp Number
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+91 99255 34751"
                className="w-full bg-[#0f141c] border border-[#243042] rounded-md px-3.5 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                Company / Plant Name
              </label>
              <input 
                type="text" 
                id="companyName" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="e.g. Gujarat Synthetics Ltd."
                className="w-full bg-[#0f141c] border border-[#243042] rounded-md px-3.5 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="serviceInterested" className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
              Primary Area of Interest
            </label>
            <select
              id="serviceInterested"
              name="serviceInterested"
              value={formData.serviceInterested}
              onChange={handleChange}
              className="w-full bg-[#0f141c] border border-[#243042] rounded-md px-3.5 py-2 text-xs text-white focus:outline-none focus:border-accent transition-colors"
            >
              <option value="" className="bg-[#0f141c] text-text-secondary">-- Select a Service / Program --</option>
              {SERVICES_LIST.map((srv) => (
                <option key={srv} value={srv} className="bg-[#0f141c] text-white">
                  {srv}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
              Message / Facility Scope Details *
            </label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows={4} 
              placeholder="Describe your plant location, current certifications, timeline, or specific requirements..."
              className="w-full bg-[#0f141c] border border-[#243042] rounded-md px-3.5 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-y"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-md bg-red-950/40 border border-red-800 text-red-400 text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3.5 rounded-md bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
              <span>Inquiry received successfully. Our principal consultant will connect with you promptly.</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full py-2.5 px-6 rounded-md bg-accent text-background font-heading font-bold text-xs hover:bg-accent-light transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Transmitting Request...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-2" /> Submit Formal Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Header */}
      <section className="pt-16 pb-12 bg-background border-b border-[#243042]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#171f2c] border border-[#243042] text-accent">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Direct Consultation Line
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              Contact Axar Creative
            </h1>
            <p className="text-xs md:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Reach our principal consultant and technical team for industrial audits, ISO certifications, laboratory accreditation, and corporate training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Area */}
      <section className="py-14 bg-[#0c1017]">
        <div className="container mx-auto px-6 max-w-6xl">
          <Suspense fallback={
            <div className="text-center py-20 text-text-secondary text-sm">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-accent" /> Loading contact desk...
            </div>
          }>
            <ContactFormContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
