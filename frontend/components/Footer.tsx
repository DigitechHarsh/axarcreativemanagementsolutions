import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center scale-[1.25] md:scale-[1.50] origin-left">
              <Image
                src="/logo.png"
                alt="Axar Logo"
                width={150}
                height={150}
                className="object-contain h-10 md:h-12 w-auto"
              />
              <Image
                src="/logotext.png"
                alt="Axar Creative Management Solutions Text"
                width={300}
                height={100}
                className="object-contain h-7 md:h-8 w-auto -ml-2"
              />
            </Link>
            <p className="text-sm font-heading font-semibold text-text-primary">
              Better Systems • Safer Workplaces • Sustainable Growth
            </p>
            <p className="font-serif italic text-sm text-text-secondary">
              &quot;Your Partner for Industrial Excellence&quot;
            </p>
            <div className="pt-2 text-xs text-text-secondary space-y-1">
              <p className="font-bold text-text-primary">Ghanshyambhai K Patel</p>
              <p>Proprietor</p>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-text-secondary hover:text-accent transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wider uppercase mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-text-secondary hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-accent transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/industries" className="text-text-secondary hover:text-accent transition-colors">Industries We Serve</Link>
              </li>
              <li>
                <Link href="/training" className="text-text-secondary hover:text-accent transition-colors">Training Programs</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-text-secondary hover:text-accent transition-colors">Projects & Clients</Link>
              </li>
              <li>
                <Link href="/resources" className="text-text-secondary hover:text-accent transition-colors">Resources & Downloads</Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors">Contact Us / Get Quote</Link>
              </li>
            </ul>
          </div>

          {/* 7 Services */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wider uppercase mb-4 text-text-primary">Core Services</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link href="/services#iso" className="text-text-secondary hover:text-accent transition-colors">QMS & ISO Consultancy</Link>
              </li>
              <li>
                <Link href="/services#laboratory" className="text-text-secondary hover:text-accent transition-colors">Laboratory & NABL Accreditation</Link>
              </li>
              <li>
                <Link href="/services#qhse" className="text-text-secondary hover:text-accent transition-colors">QHSE & Food Safety Training</Link>
              </li>
              <li>
                <Link href="/services#insurance" className="text-text-secondary hover:text-accent transition-colors">Industrial Insurance Solutions</Link>
              </li>
              <li>
                <Link href="/services#six-sigma" className="text-text-secondary hover:text-accent transition-colors">Six Sigma Training (DMAIC)</Link>
              </li>
              <li>
                <Link href="/services#marketing" className="text-text-secondary hover:text-accent transition-colors">Marketing & Business Creatives</Link>
              </li>
              <li>
                <Link href="/services#export" className="text-text-secondary hover:text-accent transition-colors">Export & International Marketing</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info (Office & Works) */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wider uppercase mb-4 text-text-primary">Contact Details</h3>
            <ul className="space-y-4 text-xs md:text-sm">
              <li className="flex items-start space-x-3 text-text-secondary">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-text-primary block">Registered Office:</span>
                  <span>26 Ravikiran Complex Banglows, Near Madhuram Party Plot, Zadeshwar Chokdi, Bharuch - 392011, Gujarat, India</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-text-secondary">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-text-primary block">Works Address:</span>
                  <span>Green Park Farm, Bhersam Sayakha Road, Navi Vasahat, Saykha GIDC, Ta Vagra, Dist: Bharuch, Gujarat</span>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href="tel:+919925534751" className="hover:text-accent font-semibold transition-colors">+91 99255 34751</a>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:patelgk4257@gmail.com" className="hover:text-accent transition-colors">patelgk4257@gmail.com</a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-text-secondary">
          <p>© {currentYear} Axar Creative Management Solutions. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
