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
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Axar Creative Management Solutions"
                width={300}
                height={100}
                className="object-contain h-16 md:h-20 w-auto"
              />
            </Link>
            <p className="font-serif italic text-xl text-text-secondary">
              &quot;your partner for business excellence&quot;
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-accent transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-text-secondary hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-accent transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-text-secondary hover:text-accent transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-text-primary">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#consulting" className="text-text-secondary hover:text-accent transition-colors">Business Consulting</Link>
              </li>
              <li>
                <Link href="/services#iso" className="text-text-secondary hover:text-accent transition-colors">ISO Management</Link>
              </li>
              <li>
                <Link href="/services#video" className="text-text-secondary hover:text-accent transition-colors">AI Video Ads</Link>
              </li>
              <li>
                <Link href="/services#web" className="text-text-secondary hover:text-accent transition-colors">Website Development</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-text-secondary">
                <MapPin size={20} className="text-accent flex-shrink-0 mt-1" />
                <span>Global Headquarters<br />Available for remote engagements</span>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <a href="mailto:info@axarcreative.com" className="hover:text-accent transition-colors">info@axarcreative.com</a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
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
