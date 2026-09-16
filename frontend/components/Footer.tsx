import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0e14] border-t border-border mt-auto relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center group">
              <div className="bg-white/95 rounded-lg p-1.5 shadow-md flex items-center">
                <Image
                  src="/logo.png"
                  alt="Axar Logo"
                  width={80}
                  height={80}
                  className="object-contain h-8 w-auto"
                />
                <Image
                  src="/logotext.png"
                  alt="Axar Creative Management Solutions Text"
                  width={240}
                  height={80}
                  className="object-contain h-6 w-auto -ml-1"
                />
              </div>
            </Link>

            <p className="text-sm font-heading font-semibold text-accent-light">
              Better Systems • Safer Workplaces • Sustainable Growth
            </p>

            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              Axar Creative Management Solutions provides professional industrial consultancy, ISO & QMS certifications, testing laboratory accreditation, QHSE training, and export business development.
            </p>

            <div className="p-3.5 bg-surface/70 border border-border/80 rounded-2xl flex items-center space-x-3 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-bold text-xs text-white block">Ghanshyambhai K Patel</span>
                <span className="text-[11px] text-accent block">Proprietor & Principal Consultant</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-1">
              <a href="#" className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Col 5-6) */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs tracking-widest uppercase mb-5 text-accent">Quick Links</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-text-secondary hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/industries" className="text-text-secondary hover:text-white transition-colors">Industries We Serve</Link>
              </li>
              <li>
                <Link href="/training" className="text-text-secondary hover:text-white transition-colors">Training Programs</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-text-secondary hover:text-white transition-colors">Projects & Clients</Link>
              </li>
              <li>
                <Link href="/resources" className="text-text-secondary hover:text-white transition-colors">Resources & Guides</Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/contact?type=quote" className="text-accent font-bold hover:underline transition-colors">Get a Quote</Link>
              </li>
            </ul>
          </div>

          {/* 7 Services (Col 7-9) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-xs tracking-widest uppercase mb-5 text-accent">Core Services</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services#iso" className="text-text-secondary hover:text-white transition-colors">QMS & ISO Consultancy (IMS)</Link>
              </li>
              <li>
                <Link href="/services#laboratory" className="text-text-secondary hover:text-white transition-colors">Laboratory & NABL Setup</Link>
              </li>
              <li>
                <Link href="/services#qhse" className="text-text-secondary hover:text-white transition-colors">QHSE & Food Safety Training</Link>
              </li>
              <li>
                <Link href="/services#insurance" className="text-text-secondary hover:text-white transition-colors">Industrial Insurance Solutions</Link>
              </li>
              <li>
                <Link href="/services#six-sigma" className="text-text-secondary hover:text-white transition-colors">Six Sigma Training (DMAIC)</Link>
              </li>
              <li>
                <Link href="/services#marketing" className="text-text-secondary hover:text-white transition-colors">Marketing Flyers & Profiles</Link>
              </li>
              <li>
                <Link href="/services#export" className="text-text-secondary hover:text-white transition-colors">Export & Global Marketing</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-xs tracking-widest uppercase mb-5 text-accent">Office & Works</h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start space-x-3 text-text-secondary">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Registered Office:</span>
                  <span>26 Ravikiran complex Banglows, Near Madhuram party Plot, Zadeshwar Chokdi, Bharuch, 392011 Gujarat</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-text-secondary">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Works Address:</span>
                  <span>Green Park Farm, Bhersam Sayakha Road, Navi Vasahat, Saykha GIDC, Ta Vagra, Dist: Bharuch, Gujarat</span>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+919925534751" className="hover:text-accent font-bold text-white transition-colors">+91 99255 34751</a>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:patelgk4257@gmail.com" className="hover:text-accent text-white transition-colors">patelgk4257@gmail.com</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border/80 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted gap-4">
          <p>© {currentYear} Axar Creative Management Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/admin" className="hover:text-accent transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
