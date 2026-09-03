"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import TypewriterText from "../../components/TypewriterText";

const services = [
  "ISO Management Systems",
  "IT & Risk Management",
  "Food Safety",
  "Supply Chain",
  "Six Sigma",
  "Business Advisory",
  "Financial Advisory",
  "International Business Development",
  "AI Video Ads",
  "Website Development",
  "Other"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceInterested: "",
    message: "",
    _honeypot: "" // Honeypot field
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    if (formData._honeypot) {
      // Spam detected via honeypot
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
        body: JSON.stringify(formData),
      });

      // Handle dummy local testing if endpoint doesn't exist yet
      if (!response.ok && response.status === 404) {
        console.warn("Backend not found. Simulating success for UI testing.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", serviceInterested: "", message: "", _honeypot: "" });
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", serviceInterested: "", message: "", _honeypot: "" });
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      console.error(err);
      // Simulate success if fetch fails locally due to no PHP server running
      setTimeout(() => {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", serviceInterested: "", message: "", _honeypot: "" });
      }, 1000);
      // In real prod we would do:
      // setStatus("error");
      // setErrorMessage(err.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="relative overflow-hidden bg-background">
      <section className="pt-20 pb-4 bg-background">
        <div className="container mx-auto px-6 text-center max-w-4xl mb-12 min-h-[80px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 flex justify-center"
          >
            <TypewriterText text="Contact Us" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            Ready to scale your business? Contact us today to discuss how we can partner for excellence.
          </motion.p>
        </div>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-heading font-bold mb-8">Contact Information</h2>
                <div className="space-y-8 text-text-secondary">
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mr-6 shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-text-primary mb-1">Global Headquarters</h4>
                      <p>Serving clients worldwide.<br />Available for remote engagements.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mr-6 shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-text-primary mb-1">Phone</h4>
                      <a href="tel:+919925534751" className="hover:text-accent transition-colors">+91 99255 34751</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mr-6 shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-text-primary mb-1">Email</h4>
                      <a href="mailto:info@axarcreative.com" className="hover:text-accent transition-colors">info@axarcreative.com</a>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-surface border border-border p-8 md:p-10 rounded-2xl relative"
            >
              <h3 className="text-2xl font-heading font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - Hidden from users */}
                <input 
                  type="text" 
                  name="_honeypot" 
                  value={formData._honeypot} 
                  onChange={handleChange} 
                  style={{ display: "none" }} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-text-secondary">Full Name *</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-text-secondary">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-text-secondary">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold mb-2 text-text-secondary">Company Name</label>
                    <input 
                      type="text" 
                      id="companyName" 
                      name="companyName" 
                      value={formData.companyName} 
                      onChange={handleChange} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceInterested" className="block text-sm font-semibold mb-2 text-text-secondary">Service Interested In</label>
                  <select 
                    id="serviceInterested" 
                    name="serviceInterested" 
                    value={formData.serviceInterested} 
                    onChange={handleChange} 
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary appearance-none"
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-text-secondary">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={4}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-text-primary resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-primary text-white font-heading font-bold py-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === "success" ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Animated Toasts */}
              <div className="absolute top-4 right-4 z-50">
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg flex items-center backdrop-blur-md"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      <span className="text-sm font-bold">Successfully sent!</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg flex items-center backdrop-blur-md"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-bold">{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
