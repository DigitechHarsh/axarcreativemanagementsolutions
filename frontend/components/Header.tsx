"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Industries", path: "/industries" },
  { name: "Training", path: "/training" },
  { name: "Projects", path: "/portfolio" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Top Industrial Meta Bar (Light) */}
      <div className="hidden lg:block bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] text-[11px] py-2 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" />
              <strong className="text-[#0f172a] mr-1.5">Axar Creative:</strong> Better Systems • Safer Workplaces • Sustainable Growth
            </span>
          </div>
          <div className="flex items-center space-x-6 font-medium">
            <a href="tel:+919925534751" className="flex items-center text-[#475569] hover:text-[#0f172a] transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-[#b3282d]" /> +91 99255 34751
            </a>
            <a href="mailto:patelgk4257@gmail.com" className="flex items-center text-[#475569] hover:text-[#0f172a] transition-colors">
              <Mail className="w-3 h-3 mr-1.5 text-[#a16207]" /> patelgk4257@gmail.com
            </a>
            <span className="flex items-center text-[#64748b]">
              <MapPin className="w-3 h-3 mr-1 text-[#94a3b8]" /> Bharuch & Saykha GIDC, Gujarat
            </span>
          </div>
        </div>
      </div>

      {/* Main Developer Header (White Theme) */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-sm py-2.5" 
          : "bg-white border-b border-[#e2e8f0] py-3.5"
      }`}>
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center group">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Axar Logo"
                width={70}
                height={70}
                className="object-contain h-8 md:h-9 w-auto"
                priority
              />
              <Image
                src="/logotext.png"
                alt="Axar Creative Management Solutions"
                width={220}
                height={70}
                className="object-contain h-6 md:h-7 w-auto ml-1"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-1.5 rounded-md text-[13.5px] lg:text-[14px] font-heading font-medium tracking-normal transition-all duration-150 ${
                    isActive
                      ? "text-[#b3282d] font-bold bg-[#fef2f2] border border-[#fecaca]"
                      : "text-[#334155] hover:text-[#b3282d] hover:bg-[#f8fafc] border border-transparent"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-white transition-all duration-200 bg-[#b3282d] rounded-md hover:bg-[#8c1e22] shadow-sm active:translate-y-0.5"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-[#0f172a] transition-all duration-200 bg-white border border-[#cbd5e1] rounded-md hover:bg-[#f8fafc] hover:border-[#94a3b8] active:translate-y-0.5"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="xl:hidden relative z-50 text-[#0f172a] p-2 rounded-md bg-[#f8fafc] border border-[#cbd5e1] hover:border-[#b3282d] transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} className="text-[#b3282d]" /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-x-0 top-[65px] z-40 bg-white border-b border-[#e2e8f0] p-6 shadow-xl xl:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="space-y-1.5 mb-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-heading font-medium transition-colors ${
                        isActive
                          ? "bg-[#fef2f2] text-[#b3282d] font-bold border border-[#fecaca]"
                          : "text-[#334155] hover:text-[#0f172a] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#b3282d]" />}
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#e2e8f0]">
                <Link
                  href="/contact?type=quote"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center py-2.5 font-heading text-xs font-bold text-white bg-[#b3282d] hover:bg-[#8c1e22] rounded-md shadow-sm"
                >
                  Request a Formal Quote <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center py-2.5 font-heading text-xs font-bold text-[#0f172a] bg-white border border-[#cbd5e1] rounded-md"
                >
                  Direct Office Inquiries
                </Link>

                <div className="pt-3 text-center text-xs text-[#64748b] space-y-1">
                  <p>Direct Call: <a href="tel:+919925534751" className="text-[#0f172a] font-bold">+91 99255 34751</a></p>
                  <p>Email: <a href="mailto:patelgk4257@gmail.com" className="text-[#0f172a] font-bold">patelgk4257@gmail.com</a></p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
