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
      {/* Top Industrial Meta Bar */}
      <div className="hidden lg:block bg-[#0a0d13] border-b border-[#243042] text-text-secondary text-[11px] py-2 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-accent" />
              <strong className="text-white mr-1.5">Axar Creative:</strong> Better Systems • Safer Workplaces • Sustainable Growth
            </span>
          </div>
          <div className="flex items-center space-x-6 font-medium">
            <a href="tel:+919925534751" className="flex items-center text-text-secondary hover:text-white transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-primary" /> +91 99255 34751
            </a>
            <a href="mailto:patelgk4257@gmail.com" className="flex items-center text-text-secondary hover:text-white transition-colors">
              <Mail className="w-3 h-3 mr-1.5 text-accent" /> patelgk4257@gmail.com
            </a>
            <span className="flex items-center text-text-muted">
              <MapPin className="w-3 h-3 mr-1 text-text-muted" /> Bharuch & Saykha GIDC, Gujarat
            </span>
          </div>
        </div>
      </div>

      {/* Main Developer Header */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? "bg-[#0f141c]/95 backdrop-blur-md border-b border-[#243042] shadow-xl py-2.5" 
          : "bg-[#0f141c] border-b border-[#243042] py-3.5"
      }`}>
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center group">
            <div className="bg-white/95 rounded-md px-2 py-1 shadow-sm flex items-center border border-white/20">
              <Image
                src="/logo.png"
                alt="Axar Logo"
                width={70}
                height={70}
                className="object-contain h-7 md:h-8 w-auto"
                priority
              />
              <Image
                src="/logotext.png"
                alt="Axar Creative Management Solutions"
                width={220}
                height={70}
                className="object-contain h-5 md:h-6 w-auto -ml-1"
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
                  className={`px-3.5 py-1.5 rounded-md text-xs font-heading font-semibold transition-all duration-150 ${
                    isActive
                      ? "text-white bg-[#1f293d] border border-[#3b4d66]"
                      : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
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
              className="inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-background transition-all duration-200 bg-accent rounded-md hover:bg-accent-light active:translate-y-0.5"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-white transition-all duration-200 bg-[#171f2c] border border-[#243042] rounded-md hover:border-primary hover:bg-[#1f293d] active:translate-y-0.5"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="xl:hidden relative z-50 text-text-primary p-2 rounded-md bg-[#171f2c] border border-[#243042] hover:border-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} className="text-accent" /> : <Menu size={22} />}
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
              className="fixed inset-x-0 top-[60px] z-40 bg-[#0f141c] border-b border-[#243042] p-6 shadow-2xl xl:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="space-y-1.5 mb-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-heading font-medium transition-colors ${
                        isActive
                          ? "bg-[#1f293d] text-accent border border-[#3b4d66]"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#243042]">
                <Link
                  href="/contact?type=quote"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center py-2.5 font-heading text-xs font-bold text-background bg-accent hover:bg-accent-light rounded-md"
                >
                  Request a Formal Quote <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center py-2.5 font-heading text-xs font-bold text-white bg-[#171f2c] border border-[#243042] rounded-md"
                >
                  Direct Office Inquiries
                </Link>

                <div className="pt-3 text-center text-xs text-text-secondary space-y-1">
                  <p>Direct Call: <a href="tel:+919925534751" className="text-white font-bold">+91 99255 34751</a></p>
                  <p>Email: <a href="mailto:patelgk4257@gmail.com" className="text-white font-bold">patelgk4257@gmail.com</a></p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
