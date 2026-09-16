"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center scale-[1.1] md:scale-[1.3] origin-left">
          <Image
            src="/logo.png"
            alt="Axar Logo"
            width={90}
            height={90}
            className="object-contain h-9 md:h-11 w-auto"
            priority
          />
          <Image
            src="/logotext.png"
            alt="Axar Creative Management Solutions Text"
            width={280}
            height={90}
            className="object-contain h-6 md:h-7 w-auto -ml-2"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className="relative text-xs lg:text-sm font-semibold font-heading transition-colors hover:text-accent"
              >
                <span className={isActive ? "text-accent" : "text-text-primary"}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            className="group relative inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-white transition-all duration-300 bg-accent rounded-full hover:bg-accent-light shadow-md shadow-accent/20"
          >
            <span>Get a Quote</span>
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-bold text-white transition-all duration-300 bg-primary rounded-full hover:bg-primary-dark shadow-md shadow-primary/20"
          >
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center h-screen w-full"
          >
            <nav className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={closeMenu}
                    className={`text-3xl font-heading font-bold ${
                      pathname === link.path ? "text-accent" : "text-text-primary"
                    } hover:text-accent-light transition-colors`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                className="pt-8"
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="px-8 py-4 font-heading text-lg font-bold text-white bg-primary rounded-full"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
