"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";

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
      {/* Top Quick Info Bar (Desktop) */}
      <div className="hidden lg:block bg-surface border-b border-border/60 text-text-secondary text-xs py-1.5 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-accent" />
              <strong className="text-text-primary mr-1">Axar Creative:</strong> Better Systems • Safer Workplaces • Sustainable Growth
            </span>
          </div>
          <div className="flex items-center space-x-6 font-medium">
            <a href="tel:+919925534751" className="flex items-center hover:text-accent transition-colors">
              <Phone className="w-3 h-3 mr-1.5 text-primary" /> +91 99255 34751
            </a>
            <a href="mailto:patelgk4257@gmail.com" className="flex items-center hover:text-accent transition-colors">
              <Mail className="w-3 h-3 mr-1.5 text-accent" /> patelgk4257@gmail.com
            </a>
            <span className="text-text-muted">Bharuch & Saykha GIDC, Gujarat</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0d1117]/90 backdrop-blur-xl border-b border-border/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2" 
          : "bg-[#0d1117]/75 backdrop-blur-lg border-b border-border/50 py-3"
      }`}>
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
          {/* Logo with White/Gold Backing for supreme visibility */}
          <Link href="/" className="relative z-50 flex items-center group scale-[1.05] md:scale-[1.2] origin-left transition-transform">
            <div className="bg-white/95 rounded-lg p-1.5 shadow-md flex items-center">
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
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white bg-primary/20 border border-primary/40 shadow-sm shadow-primary/20"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={isActive ? "text-accent-light font-bold" : ""}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-primary/10 border border-primary/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/contact?type=quote"
              className="group relative inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-background transition-all duration-300 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-white transition-all duration-300 bg-primary rounded-full hover:bg-primary-dark shadow-md shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="xl:hidden relative z-50 text-text-primary p-2 rounded-xl bg-surface border border-border hover:border-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} className="text-accent" /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-16 z-40 bg-[#0d1117]/95 backdrop-blur-2xl border-b border-border p-6 shadow-2xl xl:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="space-y-3 mb-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-heading font-bold transition-colors ${
                        isActive
                          ? "bg-primary/20 text-accent border border-primary/40"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <Link
                  href="/contact?type=quote"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center py-3 font-heading text-xs font-bold text-background bg-gradient-to-r from-accent to-accent-light rounded-xl shadow-lg shadow-accent/20"
                >
                  Get a Customized Quote <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center py-3 font-heading text-xs font-bold text-white bg-primary rounded-xl"
                >
                  Contact Office Directly
                </Link>

                <div className="pt-3 text-center text-xs text-text-secondary space-y-1">
                  <p>Direct Call: <a href="tel:+919925534751" className="text-accent font-bold">+91 99255 34751</a></p>
                  <p>Email: <a href="mailto:patelgk4257@gmail.com" className="text-accent font-bold">patelgk4257@gmail.com</a></p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
