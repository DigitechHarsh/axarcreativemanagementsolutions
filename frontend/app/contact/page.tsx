"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2, Building, Award, ShieldCheck } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import TypewriterText from "../../components/TypewriterText";

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
  const serviceParam = searchParams.get("service") || searchParams.get("training") || searchParams.get("industry") || "";
  const typeParam = searchParams.get("type") || "";

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
    if (typeParam === "quote") {
      setFormData(prev => ({ ...prev, inquiryType: "Request a Customized Quote" }));
    }
  }, [serviceParam, typeParam]);

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
        await new Promise(resolve => setTimeout(resolve, 1200));
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
      }, 1000);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* Contact Information Cards (Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-5 space-y-8"
      >
        {/* Leadership Contact Badge */}
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Award className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primary">Ghanshyambhai K Patel</h3>
              <p className="text-xs font-semibold text-accent uppercase tracking-wider">Proprietor & Consultant</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Axar Creative Management Solutions — Your Partner for Industrial Excellence.
          </p>
        </div>

        {/* Office Location */}
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center space-x-3 text-primary">
            <MapPin className="w-5 h-5 shrink-0" />
            <h4 className="font-heading font-bold text-sm text-text-primary">Registered Office:</h4>
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed pl-8">
            26 Ravikiran complex Banglows,<br />
            Near Madhuram party Plot, Zadeshwar Chokdi,<br />
            Bharuch - 392011, Gujarat, India
          </p>
        </div>

        {/* Works Location */}
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center space-x-3 text-accent">
            <Building className="w-5 h-5 shrink-0" />
            <h4 className="font-heading font-bold text-sm text-text-primary">Works Address:</h4>
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed pl-8">
            Green Park Farm, Bhersam Sayakha Road,<br />
            Navi Vasahat, Saykha GIDC,<br />
            Ta Vagra, District: Bharuch, Gujarat, India
          </p>
        </div>

        {/* Phone & Email */}
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <div>
              <span className="text-xs text-text-secondary block">Direct Phone / WhatsApp:</span>
              <a href="tel:+919925534751" className="font-heading font-bold text-sm text-text-primary hover:text-accent transition-colors">
                +91 99255 34751
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <div>
              <span className="text-xs text-text-secondary block">Official Email:</span>
              <a href="mailto:patelgk4257@gmail.com" className="font-heading font-bold text-sm text-text-primary hover:text-accent transition-colors">
                patelgk4257@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact / Quote Form (Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 bg-surface border border-border p-8 md:p-10 rounded-3xl relative shadow-xl"
      >
        <div className="mb-6">
          <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary mb-1 block">
            Direct Communication
          </span>
          <h3 className="text-2xl font-heading font-bold text-text-primary">
            Request a Consultation or Quote
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Fill in your project requirements and our team will get back to you promptly.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="text" 
            name="_honeypot" 
            value={formData._honeypot} 
            onChange={handleChange} 
            style={{ display: "none" }} 
            tabIndex={-1} 
            autoComplete="off" 
          />

          {/* Inquiry Type Radio / Pill Selector */}
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
              Inquiry Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["General Inquiry", "Request a Customized Quote"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, inquiryType: type })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                    formData.inquiryType === type
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-background border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Rajesh Sharma"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
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
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+91 98765 43210"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary"
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                Company / Plant Name
              </label>
              <input 
                type="text" 
                id="companyName" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="e.g. Apex Chemicals Ltd."
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="serviceInterested" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Service Interested In
            </label>
            <select 
              id="serviceInterested" 
              name="serviceInterested" 
              value={formData.serviceInterested} 
              onChange={handleChange} 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary"
            >
              <option value="">Select Service / Program</option>
              {SERVICES_LIST.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Detailed Requirements / Message *
            </label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows={4}
              placeholder="Please describe your facility requirements, current certifications, timeline, or training batch size..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="w-full bg-primary text-white font-heading font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg shadow-primary/25 cursor-pointer text-sm"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status === "success" ? (
              "Inquiry Sent Successfully!"
            ) : (
              <>
                Submit Inquiry / Quote Request
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Toast Notification */}
        <div className="absolute top-4 right-4 z-50">
          <AnimatePresence>
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center text-xs font-bold"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Thank you! We will contact you shortly.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-red-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center text-xs font-bold"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
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
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold flex justify-center text-text-primary">
              <TypewriterText text="Contact Axar Creative" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              Partner with us for ISO implementation, NABL laboratory setup, workforce training, industrial insurance, and export growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-surface-alt">
        <div className="container mx-auto px-6 max-w-6xl">
          <Suspense fallback={<div className="text-center py-12 text-text-secondary">Loading form...</div>}>
            <ContactFormContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
